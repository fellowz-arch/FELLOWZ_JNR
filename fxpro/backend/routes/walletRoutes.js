import express from "express";
import { getBalance, deposit, withdraw } from "../controllers/walletController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/balance", protect, getBalance);
router.post("/deposit", protect, deposit);
router.post("/withdraw", protect, withdraw);

export default router;
