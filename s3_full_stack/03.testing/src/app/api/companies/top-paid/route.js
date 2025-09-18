import clientPromise from '@/app/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const limit = Math.min(parseInt(url.searchParams.get('limit') || '10', 10), 100);
        const skip = Math.max(parseInt(url.searchParams.get('skip') || '0', 10), 0);

        const client = await clientPromise;
        const db = client.db("test");
        const coll = db.collection("companies");

        const total = await coll.countDocuments();

        const items = await coll.find().sort({ 'salaryBand.base': -1 }).limit(5).skip(skip).toArray();

        return NextResponse.json({ total, items }, { status: 200 });
    } catch (err) {
        console.error('GET /api/companies error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
