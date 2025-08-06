import express from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
import { authMiddelware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// routes
// CREATE CATEGORY || POST
router.post("/create", authMiddelware, createCategoryController);

// GET ALL CATEGORY || GET
router.get("/getAll", getAllCategoryController);

// UPDATE CATEGORY || PUT
router.put("/update/:id", authMiddelware, updateCategoryController);

// DELETE CATEGORY || DELETE
router.delete("/delete/:id", authMiddelware, deleteCategoryController);
export { router };
