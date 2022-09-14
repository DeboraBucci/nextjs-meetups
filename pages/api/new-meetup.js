// /api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // NEVER USE ON CLIENT SIDE ->
    const client = await MongoClient.connect(
      "mongodb+srv://Max:panqueques123@cluster0.alrbrza.mongodb.net/meetups"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    client.close();

    res.status(201).json({
      message: "Meetup inserted!",
    });
  }
}

export default handler;
