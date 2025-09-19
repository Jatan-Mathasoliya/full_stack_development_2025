import clientPromise from '@/app/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const min = parseInt(url.searchParams.get('min') || '0', 10);
    const max = url.searchParams.get('max') ? parseInt(url.searchParams.get('max'), 10) : null;

    const filter = { headcount: { $gte: min } };
    if (max !== null) {
      filter.headcount.$lte = max;
    }

    const client = await clientPromise;
    const db = client.db('test');
    const coll = db.collection('companies');

    const items = await coll.find(filter).toArray();

    return NextResponse.json({ count: items.length, items }, { status: 200 });
  } catch (err) {
    console.error('GET /api/companies/headcount-range error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
