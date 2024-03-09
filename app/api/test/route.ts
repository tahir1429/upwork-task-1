import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";
import clientPromise from '@/app/lib/mongodb';

export async function GET( req: NextApiRequest ) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DATABASE_NAME);
        await client.connect();
        return NextResponse.json({ text: 'Hello Next Api! DB CONNECTED' });;
      } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong!' },  { status: 404, statusText: "invalid URL"});
      }
}