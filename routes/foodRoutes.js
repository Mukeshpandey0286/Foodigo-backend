import express from "express";
import { authMiddelware } from "../middlewares/authMiddleware.js";
import {
  createFoodController,
  deleteFoodController,
  getAllFoodsController,
  getFoodByResturantController,
  getSingleFoodController,
  orderStatusController,
  placeOrderController,
  updateFoodController,
} from "../controllers/foodController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// routes
// CREATE FOOD || POST
router.post("/create", authMiddelware, createFoodController);

// GET ALL FOOD || GET
router.get("/getAll", getAllFoodsController);

// GET FOOD BY ID || GET
router.get("/get/:id", getSingleFoodController);

// GET FOOD BY RESTURANT ID || GET
router.get("/getByResturant/:id", getFoodByResturantController);

// UPDATE FOOD BY ID || PUT
router.put("/update/:id", authMiddelware, updateFoodController);

// DELETE FOOD || DELETE
router.delete("/delete/:id", authMiddelware, deleteFoodController);

// PLACE ORDER
router.post("/placeorder", authMiddelware, placeOrderController);

// ORDER STATUS
router.post(
  "/orderStatus/:id",
  authMiddelware,
  adminMiddleware,
  orderStatusController
);

// export
export { router };
