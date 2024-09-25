import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addChat,
  getChats,
  getSingleChat,
  readChat,
} from "../controller/chat.controller.js";

const router = express.Router();

router.get("/", verifyToken, getChats);
router.get("/:id", verifyToken, getSingleChat);
router.post("/", verifyToken, addChat);
router.put("/read/:id", verifyToken, readChat);

export default router;
