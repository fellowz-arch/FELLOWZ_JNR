import http from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import tradeRoutes from "./routes/tradeRoutes.js";
import priceRoutes from "./routes/priceRoutes.js";
import { startPriceFeed } from "./priceFeed.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/trade", tradeRoutes);
app.use("/api/price", priceRoutes);

// DB Connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Server
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

startPriceFeed(server);
