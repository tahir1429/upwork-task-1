import { NextResponse } from "next/server";
import clientPromise from '@/app/lib/mongodb';
import { Webhook } from 'svix';

export async function POST( req: any ) {
    try {
        const payload = await req.json();
        const body = JSON.stringify(payload);

        const svixHeaders = {
            "svix-id": req.headers.get("svix-id"),
            "svix-timestamp": req.headers.get("svix-timestamp"),
            "svix-signature": req.headers.get("svix-signature"),
        };

        // Verify Webhook Signatrue
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY!);
        const evt: any = wh.verify(body, svixHeaders);

        // Get Event Data
        const { id, email_addresses, first_name, last_name, image_url, profile_image_url } = evt.data;

        // Connect Database
        const client = await clientPromise;
        const db = client.db(process.env.DATABASE_NAME);
        const collection = db.collection('users');

        // Prepare User 
        const user : any = {
            clerkId: id,
            email: (email_addresses && email_addresses.length > 0) ? email_addresses[0].email_address : null,
            firstName: first_name,
            lastName: last_name,
            photo: image_url,
        };

        switch ( evt.type ) {
            case 'user.created':
            case 'user.updated':
                await collection.findOneAndUpdate( {clerkId : user.clerkId}, { $set : {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    photo: user.photo,
                } }, { upsert: true });
               break;

            case 'user.deleted':
                await collection.deleteOne( {clerkId : user.clerkId} );
                break;
        
            default:
                break;
        }

        return NextResponse.json({ success: true, text: 'Webhook received' });;
      } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message },  { status: 400, statusText: "Error"});
      }
}