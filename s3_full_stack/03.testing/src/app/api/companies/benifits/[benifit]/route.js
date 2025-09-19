import clientPromise from '@/app/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const url = new URL(request.url);
        const { benifit } = params;

        const limit = Math.min(parseInt(url.searchParams.get('limit') || '10', 10), 100);
        const skip = Math.max(parseInt(url.searchParams.get('skip') || '0', 10), 0);


        const client = await clientPromise;
        const db = client.db("test");
        const coll = db.collection("companies");

        // const total = await coll.countDocuments({ 'hiringCriteria.skills': name });

        const items = await coll.find({
            'benefits': { $regex: benifit, $options: 'i' }
        }).limit(limit).skip(skip).toArray();

        return NextResponse.json({ items }, { status: 200 });
    } catch (err) {
        console.error('GET /api/companies error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
