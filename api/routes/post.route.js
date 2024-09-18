import express from "express";
const router = express.Router();

router.get("/posts", (req, res) => {
  res.send("posts working");
});

export default router;
