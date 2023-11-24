import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config({ path: ".env" });

const app = express();

// Middleware's
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);
let limit = process.env.DATA_LIMIT;

app.use(express.json({ limit }));
app.use(express.urlencoded({ extended: true, limit }));
app.use(express.static("public"));
app.use(cookieParser());

// import routs
import userRoute from "./routes/user.routes.js";
import createEmpRoute from "./routes/emp.routes.js";

app.use("/api/v1/users", userRoute);
app.use("/api/v1/emp", createEmpRoute);

export { app };
