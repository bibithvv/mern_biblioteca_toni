import "dotenv/config";

import path from "path";
import express from "express";

import { connectToDatabase } from "./config/db.js";
import bookRouter from "./routes/book.routes.js";

const port = process.env.PORT || 3000;
const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  try {
    res.status(200).send("Server is running");
  } catch (error) {
    console.error("Error checking server health:", error);
    res.status(500).send("Server is not running");
  }
});

app.use("/api/v1/books", bookRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectToDatabase();
});


  //senha GU1qdX7LlDuK0kx0
