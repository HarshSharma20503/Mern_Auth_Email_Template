import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Split CORS origins from environment variable
const origins = process.env.CORS_ORIGIN.split(",");

// Set up CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Check if the request origin is allowed
      if (!origin || origins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow sending cookies across domains
  })
);

// Middleware to parse JSON in request body
app.use(express.json({ limit: "16kb" }));

// Middleware to parse URL-encoded data in request body
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Middleware to serve static files from the public folder
app.use(express.static("public"));

// Middleware to enable CRUD operations on browser cookies
app.use(cookieParser());

// Import and use auth routes
import authRouter from "./routes/auth.routes.js";
app.use("/api/auth", authRouter);

// Import and use user routes
import userRouter from "./routes/user.routes.js";
app.use("/api/user", userRouter);

// Export the configured Express app
export { app };
