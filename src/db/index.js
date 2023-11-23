import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const dbConnection = async () => {
  try {
    let initialConnection = await mongoose.connect(
      `${process.env.MONGO_DB_URL}/${DB_NAME}`
    );
    console.log("SUCCESSFULLY MONGO DB CONNECTED ! :",initialConnection.connection.host);
  } catch (error) {
    console.log("MONGO DB CONNECTION FAILED !! : ", error);
  }
};

export default dbConnection;
