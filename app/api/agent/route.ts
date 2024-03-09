import { NextResponse } from "next/server";
import clientPromise from '@/app/lib/mongodb';
import { getAuth } from "@clerk/nextjs/server";
import mongoose from 'mongoose';

const AGENTS_COLLECTION = 'agents';

export async function POST( req: any ) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
          return NextResponse.json({ message: 'Not authenticated' },  { status: 401, statusText: "Not authenticated"});
        }

        let payload = await req.json();
        payload.userId = userId;
        const client = await clientPromise;
        const db = client.db(process.env.DATABASE_NAME);
        const collection = db.collection(AGENTS_COLLECTION);
        const agent = await collection.insertOne(payload);
        return NextResponse.json({ text: 'Hello Next Api! DB CONNECTED', agent: agent });;
      } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong!' },  { status: 404, statusText: "invalid URL"});
      }
}

export async function PUT( req: any ) {
  try {
      const { userId } = getAuth(req);
      if (!userId) {
        return NextResponse.json({ message: 'Not authenticated' },  { status: 401, statusText: "Not authenticated"});
      }

      let payload = await req.json();
      const docId = new mongoose.Types.ObjectId(payload._id);
      delete payload._id;

      const client = await clientPromise;
      const db = client.db(process.env.DATABASE_NAME);
      const collection = db.collection(AGENTS_COLLECTION);
      const agent = await collection.findOneAndUpdate({ _id: docId, userId: userId}, { $set: payload });
      return NextResponse.json({ text: 'Hello Next Api! DB CONNECTED', agent: agent });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: 'Something went wrong!' },  { status: 404, statusText: "invalid URL"});
    }
}

export async function GET( req: any ) {
  try {
      const { userId } = getAuth(req);
      if (!userId) {
        return NextResponse.json({ message: 'Not authenticated' },  { status: 401, statusText: "Not authenticated"});
      }

      let findQuery = { userId: userId };

      const client = await clientPromise;
      const db = client.db(process.env.DATABASE_NAME);
      const collection = db.collection(AGENTS_COLLECTION);
      const agents = await collection.find(findQuery).toArray();
      return NextResponse.json({ text: 'Data found', agents: agents });;
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: 'Something went wrong!' },  { status: 400, statusText: "invalid URL"});
    }
}

export async function DELETE( req: any ) {
  try {
      const { userId } = getAuth(req);
      if (!userId) {
        return NextResponse.json({ message: 'Not authenticated' },  { status: 401, statusText: "Not authenticated"});
      }

      let payload = await req.json();
      const docId = new mongoose.Types.ObjectId(payload.id);

      let deleteQuery = { userId: userId, _id: docId };

      const client = await clientPromise;
      const db = client.db(process.env.DATABASE_NAME);
      const collection = db.collection(AGENTS_COLLECTION);
      const output = await collection.deleteOne(deleteQuery);
      console.log(output);
      return NextResponse.json({ text: 'Deleted', output: output });;
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: 'Something went wrong!' },  { status: 400, statusText: "invalid URL"});
    }
}