import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import { app } from "./app.js";

// Load environment variables from .env file
dotenv.config();

// Define the port for the server to listen on, defaulting to 8000 if not provided in the environment
const port = process.env.PORT || 8000;

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the backend");
});

// Connect to the database and start the server
connectDB()
  .then(() => {
    console.log("Database connected");
    // Start the server and listen on the defined port
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
