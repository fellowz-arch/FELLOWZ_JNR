import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  const price = 100 + Math.random() * 5;
  res.json({ price });
});

export default router;
