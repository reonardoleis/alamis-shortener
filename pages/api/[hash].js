import { connectToDatabase } from "../../database/database.js";

export default async (req, res) => {
  const { hash } = req.query;
  if (req.method === "GET") {
    const { db, client } = await connectToDatabase();

    let desiredURL = await db.collection("URL").findOne({ hash });

    if (!desiredURL) {
      return res.status(400).send({ error: true, message: "HASH_NOT_FOUND" });
    }
    return res.status(200).send({ done: true, url: desiredURL.url });
  } else {
    return res.status(400).send({ error: true, message: "METHOD_NOT_ALLOWED" });
  }
};
