// backend/routes/tradeRoutes.js
import express from "express";
import { openTrade, closeTrade, getTrades } from "../controllers/tradeController.js";

const router = express.Router();

// Open a new trade
router.post("/open", openTrade);

// Close an existing trade
router.post("/close", closeTrade);

// Get all trades for a user
router.get("/:userId", getTrades);

export default router;
