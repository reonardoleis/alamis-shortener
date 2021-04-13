import { connectToDatabase } from "../../database/database.js";
import { hashUrl } from './utils/hashing';

export default async (req, res) => {
  const { url } = req.body;
  if (req.method === 'POST') {
    const { db, client } = await connectToDatabase();

    let hash = await hashUrl(url);
    let existenceVerify = await db.collection('URL').findOne({ hash });
    if (existenceVerify) {
      while (existenceVerify) {
        hash = await hashUrl(url);
        existenceVerify = await db.collection('URL').findOne({ hash });
      }
    }

    if (client.isConnected()) {
      await db.collection('URL').insertOne({
        url: url,
        hash: hash
      });
    }

    return res.status(200).send({done: true, hash: hash});
  } else {
    return res.status(400).send({error: true, message: 'METHOD_NOT_ALLOWED'})
  }
}
