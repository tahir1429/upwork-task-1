import { NextResponse } from "next/server";
import clientPromise from '@/app/lib/mongodb';
import { getAuth } from "@clerk/nextjs/server";
import mongoose from 'mongoose';


const AGENTS_COLLECTION = 'agents';

export async function GET( req: any ) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
          return NextResponse.json({ message: 'Not authenticated' },  { status: 401, statusText: "Not authenticated"});
        }

        let findQuery = { userId: userId, _id: new mongoose.Types.ObjectId(req.nextUrl.searchParams.get("id")) };
        const client = await clientPromise;
        const db = client.db(process.env.DATABASE_NAME);
        const collection = db.collection(AGENTS_COLLECTION);
        const agent = await collection.findOne(findQuery);
        return NextResponse.json({ text: 'Data found', agent: agent });
      } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong!' },  { status: 400, statusText: "invalid URL"});
      }
  }