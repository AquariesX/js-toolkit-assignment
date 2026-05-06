const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing in the .env file");
  }

  mongoose.set("strictQuery", true);

  // Keep the timeout explicit so deployment failures surface quickly.
  const connection = await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000
  });

  console.log(`MongoDB connected: ${connection.connection.host}`);
};

module.exports = connectDB;
