import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
  try {
    if (typeof process.env.MONGODB_URL === "string") {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("connect successfully!");
    }
  } catch (error) {
    console.log("Connect Failed");
  }
};
