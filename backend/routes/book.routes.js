import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../backend/controllers/book.controller.js";
import { validateBook, validatePartialBook } from "../middlewares/book.validate.js";

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/", validateBook, createBook);
router.put("/:id", validatePartialBook, updateBook); // <- aqui está o ajuste
router.delete("/:id", deleteBook);

export default router;