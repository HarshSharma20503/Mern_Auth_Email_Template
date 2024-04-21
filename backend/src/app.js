import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" })); // to parse json in body
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // to parse url
app.use(express.static("public")); // to use static public folder
app.use(cookieParser()); // to enable CRUD operation on browser cookies

// auth routes
import authRouter from "./routes/auth.routes.js";
app.use("/api/auth", authRouter);

// user routes
import userRouter from "./routes/user.routes.js";
app.use("/api/user", userRouter);

export { app };
