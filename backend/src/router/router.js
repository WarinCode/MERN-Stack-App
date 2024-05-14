import { Router, urlencoded } from "express";
import { client } from "../database/connect.js";
import { configDotenv } from "dotenv";
import { ObjectId } from "mongodb";
import { readJsonFile } from "../utils/index.js";

configDotenv();
const { DATABASE_NAME, COLLECTION_NAME } = process.env;
const router = Router();

router.get("/api/product", async (req, res, next) => {
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);
    const docs = await collection.find({}).toArray();
    res.status(200).type("json").json(docs);
  } catch (e) {
    console.error(e?.name, e?.message);
    res.end();
  } finally {
    await client.close();
  }
});

router.post("/api/insert", async ({ body }, res, next) => {
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);
    const result = await collection.insertOne({ ...body });
    res.status(200).type("json").json(result);
  } catch (e) {
    console.error(e?.name, e?.message);
    res.end();
  } finally {
    await client.close();
  }
});

router.put(
  "/api/update",
  async (
    { body: { _id, productName, img, author, ISBN, productPrice, remain } },
    res,
    next
  ) => {
    const filter = { _id: new ObjectId(_id) };
    const updateBook = {
      $set: { productName, img, author, ISBN, productPrice, remain },
    };
    try {
      await client.connect();
      const db = client.db(DATABASE_NAME);
      const collection = db.collection(COLLECTION_NAME);
      const result = await collection.updateOne(filter, updateBook);
      console.log(result);
      res.status(200).type("json").json(result);
    } catch (e) {
      console.error(e?.name, e?.message);
      res.end();
    } finally {
      await client.close();
    }
  }
);

router.delete(
  "/api/delete-product/name=:name&ISBN=:ISBN&id=:id",
  async ({ params: { name, ISBN, id } }, res, next) => {
    try {
      await client.connect();
      const db = client.db(DATABASE_NAME);
      const collection = db.collection(COLLECTION_NAME);
      const result = await collection.deleteOne({
        productName: name,
        ISBN: parseInt(ISBN),
        _id: new ObjectId(id),
      });
      res.status(200).type("json").json(result);
    } catch (e) {
      console.error(e?.name, e?.message);
      res.end();
    } finally {
      await client.close();
    }
  }
);

router.get("/api/search", async ({ query }, res, next) => {
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);
    const result = await collection.findOne({ ISBN: parseInt(query.ISBN) });
    res.status(200).type("json").json(result);
  } catch (e) {
    console.error(e?.name, e?.message);
    res.end();
  } finally {
    await client.close();
  }
});

// router.post("/api/upload", async (req, res, next) => {
//   try {
//     await client.connect();
//     const db = client.db(DATABASE_NAME);
//     const collection = db.collection(COLLECTION_NAME);
//     readJsonFile(req.body.jsonFile);
//     console.log(res.body);
//     res.end();
//   } catch (e) {
//     console.error(e?.name, e?.message);
//     res.end();
//   } finally {
//     await client.close();
//   }
// });

router.get("/api/connect", async (req, res, next) => {
  try {
    await client.connect();
    res.type("json").json({
      databaseStatus: {
        ok: true,
      },
    });
  } catch (e) {
    console.error(e?.name, e?.message);
    res.type("json").json({
      databaseStatus: {
        ok: false,
      },
    });
  } finally {
    await client.close();
  }
});

export default router;
