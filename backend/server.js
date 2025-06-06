import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import { connectToDatabase } from "./config/db.js";
import { Book } from "./model/book.model.js";

const app = express();

app.use(express.json());

app.post("/api/v1/books", async (req, res) => {
  const { title, subtitle, author, genre, cover } = req.body;

  try {
    const book = new Book({ title, subtitle, author, genre, cover });
    await book.save();
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    console.error("Error saving book: ", error);
    res.status(500).json({ success: false, error: "Error saving book" });
  }
});

app.get("/api/v1/books", async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json({ success: true, data: books });
    } catch (error) {
      console.error("Error fetching books: ", error);
      res.status(500).json({ sucess: false, error: "Error fetching books" });
    }
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  connectToDatabase();
});


//senha GU1qdX7LlDuK0kx0