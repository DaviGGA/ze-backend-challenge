import mongoose from "mongoose";
import { config } from "../config/config";
import { MongoMemoryServer } from "mongodb-memory-server"

export async function connectDatabase() {
  mongoose.connection.on("close", () => {
    console.log("Mongoose connection closed.")
  })

  mongoose.connection.on("error", error => {
    console.log("Couldn't connect to Mongo database: ", error)
  })

  mongoose.connection.on('connected', () => {
    console.log("Successfully conected to your Mongo database.")
});

  await mongoose.connect(config.MONGO_URI)
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
}

export async function connectMemoryDatabase() {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(
    mongoServer.getUri(),
    {dbName: "ze-bank-test"}
  )
}