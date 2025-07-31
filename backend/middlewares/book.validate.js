import { z } from "zod";

const bookSchema = z.object({
  title: z.string().min(3).max(100),
  subtitle: z.string().optional(),
  genre: z.string().min(3).max(50),
  author: z.string().min(3).max(100),
  cover: z.string().url(),
});

const partialBookSchema = bookSchema.partial(); // todos os campos se tornam opcionais

export const validateBook = async (req, res, next) => {
  try {
    bookSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ success: false, error: error.errors });
  }
};

export const validatePartialBook = async (req, res, next) => {
  try {
    partialBookSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ success: false, error: error.errors });
  }
};