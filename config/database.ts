import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
  try {
    console.log(process.env.MONGODB_URL);
    if (process.env.MONGODB_URL) {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("connect successfully!");
    }
  } catch (error) {
    console.log("Connect Failed");
  }
};
