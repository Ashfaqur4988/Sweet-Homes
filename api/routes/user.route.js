import express from "express";
import {
  deleteUser,
  getNotifyNumber,
  getSingleUser,
  getUsers,
  profilePosts,
  savePost,
  updateUser,
} from "../controller/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getUsers);
// router.get("/:id", verifyToken, getSingleUser);
router.put("/:id", verifyToken, updateUser);
router.delete(":id", verifyToken, deleteUser);
router.post("/save", verifyToken, savePost);
router.get("/profilePosts", verifyToken, profilePosts);
router.get("/notification", verifyToken, getNotifyNumber);

export default router;
