import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// inside .env write multiple origins with comma in between
const origins = process.env.CORS_ORIGIN.split(",");

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origins.includes(origin)) {
        callback(null, true); // allow the request
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
