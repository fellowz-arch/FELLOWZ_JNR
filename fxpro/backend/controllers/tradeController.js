import Trade from "../models/Trade.js";
import Wallet from "../models/Wallet.js";

// Open trade
export const openTrade = async (req, res) => {
  try {
    const { userId, amount, type } = req.body;
    // simulate trade
    const trade = await Trade.create({ user: userId, amount, type, status: "open" });
    // update wallet
    const wallet = await Wallet.findOne({ user: userId });
    wallet.balance -= amount;
    await wallet.save();
    res.json({ success: true, trade, walletBalance: wallet.balance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Close trade
export const closeTrade = async (req, res) => {
  try {
    const { tradeId, resultAmount } = req.body;
    const trade = await Trade.findById(tradeId);
    trade.status = "closed";
    await trade.save();
    const wallet = await Wallet.findOne({ user: trade.user });
    wallet.balance += resultAmount;
    await wallet.save();
    res.json({ success: true, trade, walletBalance: wallet.balance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get trades
export const getTrades = async (req, res) => {
  try {
    const trades = await Trade.find({ user: req.params.userId });
    res.json(trades);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
