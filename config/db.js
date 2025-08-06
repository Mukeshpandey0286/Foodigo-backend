import mongoose from "mongoose";
import colors from "colors";

// mongodb connection function
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database is connected ${mongoose.connection.useDb.name}`);
  } catch (err) {
    console.log("Error in database!", err);
  }
};

export { connectDb };
