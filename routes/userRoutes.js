import express from "express";
import {
  deleteUserController,
  getUserInfoController,
  resetPasswordController,
  updatePasswordController,
  updateUserController,
} from "../controllers/userController.js";
import { authMiddelware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// routes
// GET USER INFO || GET
router.get("/getUser", authMiddelware, getUserInfoController);

// UPDATE USER || PUT
router.put("/updateUser", authMiddelware, updateUserController);

// UPDATE PASSWORD || POST
router.post("/updatePassword", authMiddelware, updatePasswordController);

// RESET PASSWORD || POST
router.post("/resetPassword", authMiddelware, resetPasswordController);

// DELETE USER || DELETE
router.delete("/deleteUser/:id", authMiddelware, deleteUserController);
// export
export { router };
