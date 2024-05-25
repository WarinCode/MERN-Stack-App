import { Router } from "express";
import { client } from "../database/connect.js";
import { configDotenv } from "dotenv";
import { ObjectId } from "mongodb";
import multer, { diskStorage } from "multer";
import { readFile } from "fs/promises";

const router = Router();
const upload = multer({
  storage: diskStorage({
    destination: (req, file, callback) => {
      callback(null, "src/database/uploads");
    },
    filename: (req, file, callback) => {
      callback(null, file.fieldname + ".json");
    },
  }),
});
configDotenv();
const { DATABASE_NAME, COLLECTION_NAME } = process.env;

router.get("/api/data", async (req, res, next) => {
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
  "/api/delete/name=:name&ISBN=:ISBN&id=:id",
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

router.post(
  "/api/upload",
  upload.single("dbfile"),
  async ({ file }, res, next) => {
    // const products = JSON.parse(Buffer.from(file.buffer).toString());
    const path = import.meta.dirname.replace("src\\router", file.path);
    const jsonString = await readFile(path, { encoding: "utf8" });
    const products = JSON.parse(jsonString);
    // console.log(products);
    try {
      await client.connect();
      const db = client.db(DATABASE_NAME);
      const collection = db.collection(COLLECTION_NAME);
      const result = await collection.insertMany(products);
      // console.log(result);
      res
        .status(200)
        .send(
          "<span>อัปโหลดไฟล์ฐานข้อมูลสำเร็จ <a href='http://localhost:5173/'>คลิกกลับไปที่หน้าหลัก</a></span>"
        );
    } catch (e) {
      console.error(e?.name, e?.message);
      res.end();
    } finally {
      await client.close();
    }
  }
);

router.get("/api/get-all-isbns", async (req, res, next) => {
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);
    const result = (await collection.find({}).toArray()).map((doc) => doc.ISBN);
    res.status(200).type("json").json(result);
  } catch (e) {
    console.error(e?.name, e?.message);
    res.end();
  } finally {
    await client.close();
  }
})

export default router;
