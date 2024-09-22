import express from "express";
import {
  deleteUser,
  getSingleUser,
  getUsers,
  updateUser,
} from "../controller/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", verifyToken, getSingleUser);
router.put("/:id", verifyToken, updateUser);
router.delete(":id", verifyToken, deleteUser);

export default router;
