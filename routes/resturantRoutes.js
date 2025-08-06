import express from "express";
import { authMiddelware } from "../middlewares/authMiddleware.js";
import {
  createResturantController,
  deleteResturantController,
  getAllResturantController,
  getResturantByIdController,
} from "../controllers/resturantController.js";

const router = express.Router();

// routes
// CREATE RESTURANT || POST
router.post("/create", authMiddelware, createResturantController);

// GET ALL RESTURANT || GET
router.get("/getAll", getAllResturantController);

// GET RESTURANT BY ID || GET
router.get("/get/:id", getResturantByIdController);

// DELETE RESTURANT || DELETE
router.delete("/delete/:id", authMiddelware, deleteResturantController);
// export
export { router };
