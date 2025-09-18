// s3_full_stack/01.api_routes/src/app/api/companies/[name]/route.js
import { MongoClient } from "mongodb";

const MONGODB_URI = "mongodb+srv://Jatan:fBIIhNkKflFPXvX7@cluster0.zexd9it.mongodb.net/";
const client = new MongoClient(MONGODB_URI);

export async function GET(request, { params }) {
  try {
    // connect (re-use client if already connected)
    if (!client.topology?.isConnected()) {
      await client.connect();
    }

    const db = client.db("test"); // your DB name
    const coll = db.collection("companies");

    // get company name from URL param
    const companyName = params.name;

    const doc = await coll.findOne({ name: companyName });

    if (!doc) {
      return new Response(JSON.stringify({ error: "Company not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // convert _id to string for JSON
    doc._id = doc._id.toString();

    return new Response(JSON.stringify(doc), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching company:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}