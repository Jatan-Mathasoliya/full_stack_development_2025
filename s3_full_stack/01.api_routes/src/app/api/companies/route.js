// app/api/companies/route.js
import { MongoClient, ObjectId } from "mongodb";

const MONGODB_URI = "mongodb+srv://Jatan:fBIIhNkKflFPXvX7@cluster0.zexd9it.mongodb.net/";
const client = new MongoClient(MONGODB_URI);

export async function GET(req) {
  try {
    await client.connect();
    const db = client.db("test");
    const coll = db.collection("companies");

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit")) || 0;
    const page = parseInt(searchParams.get("page")) || 1;

    const skip = limit ? (page - 1) * limit : 0;

    const docs = await coll.find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    const cleanDocs = docs.map(d => ({ ...d, _id: d._id.toString() }));

    return new Response(JSON.stringify(cleanDocs), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Error in GET /api/companies:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  } finally {
    await client.close();
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    await client.connect();
    const db = client.db("test");
    const coll = db.collection("companies");

    const result = await coll.insertOne(body);

    return new Response(JSON.stringify({ insertedId: result.insertedId.toString() }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Error in POST /api/companies:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  } finally {
    await client.close();
  }
}
