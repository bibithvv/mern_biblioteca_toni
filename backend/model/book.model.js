import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    subtitle: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    genre: {
      type: String,
      required: true,
    },

    cover: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); //ele vai criar o campo createdAt, updateAt automaticamente

export const Book = mongoose.model("Book", bookSchema);