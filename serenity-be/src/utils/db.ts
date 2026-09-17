import mongoose from "mongoose";

export const connectDb = async () => {
  const dbUri = process.env.DATABASE_URI;
  if (!dbUri) throw new Error("Mongodb URI not provided");
  await mongoose.connect(dbUri);
  console.log("mongo connected");
};
