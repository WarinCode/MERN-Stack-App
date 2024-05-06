import { MongoClient, ServerApiVersion } from "mongodb";
import { configDotenv } from "dotenv";

configDotenv();
const { CONNECTION_STRING } = process.env;

export const client = new MongoClient(String(CONNECTION_STRING), {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectToDB = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    await client.close();
  }
};

export default connectToDB;
