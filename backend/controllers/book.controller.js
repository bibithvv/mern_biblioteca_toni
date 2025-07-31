import mongoose from "mongoose";
import { Book } from "../models/book.model.js";

export const createBook = async (req, res) => {
  const { title, subtitle, author, genre, cover } = req.body;

  try {
    const book = new Book({ title, subtitle, author, genre, cover });
    await book.save();
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    console.error("Error saving book: ", error);
    res.status(500).json({ success: false, error: "Error saving book" });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    console.error("Error fetching books: ", error);
    res.status(500).json({ success: false, error: "Error fetching books" });
  }
};

export const getBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, error: "Invalid ID" });
  }

  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ success: false, error: "Book not found" });
    }

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    console.error("Error fetching book: ", error);
    res.status(500).json({ success: false, error: "Error fetching book" });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, error: "Invalid ID" });
  }

  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ success: false, error: "Book not found" });
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true, // garante que as validações do schema sejam aplicadas
    });

    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    console.error("Error updating book: ", error);
    res.status(500).json({ success: false, error: "Error updating book" });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, error: "Invalid ID" });
  }

  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ success: false, error: "Book not found" });
    }

    await Book.findByIdAndDelete(id);

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error("Error deleting book: ", error);
    res.status(500).json({ success: false, error: "Error deleting book" });
  }
};