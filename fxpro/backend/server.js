import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import userRoutes from "./routes/userRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import tradeRoutes from "./routes/tradeRoutes.js";
import priceRoutes from "./routes/priceRoutes.js";

// WebSocket price feed
import { startPriceFeed } from "./priceFeed.js";

dotenv.config();

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Create the app first ---
const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Healthcheck route (after app is created) ---
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: Date.now() });
});

// --- API routes ---
app.use("/api/user", userRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/trade", tradeRoutes);
app.use("/api/price", priceRoutes);

// --- Serve frontend static files ---
app.use(express.static(path.join(__dirname, "../frontend")));

// Fallback to index.html for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// --- MongoDB connection ---
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- Start WebSocket price feed ---
startPriceFeed();

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
