import dotenv from "dotenv";
import dbConnection from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

let port = process.env.PORT || 8000;


// DB connection Function Call
dbConnection()
  .then(
    app.listen(port, () => {
      console.log("SERVER IS RUNNING ON THE PORT : ", port);
    })
  )
  .catch((err) => console.log("MONGO DB CONNECTION :", err));
