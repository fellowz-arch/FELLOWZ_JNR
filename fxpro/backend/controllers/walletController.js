import Wallet from "../models/walletModel.js";

export const getBalance = async (req, res) => {
  let wallet = await Wallet.findOne({ user: req.user.id });
  if (!wallet) wallet = await Wallet.create({ user: req.user.id });

  res.json({ wallet: wallet.balance });
};

export const deposit = async (req, res) => {
  const { amount } = req.body;

  const wallet = await Wallet.findOne({ user: req.user.id });
  wallet.balance += Number(amount);
  await wallet.save();

  res.json({ message: "Deposit successful" });
};

export const withdraw = async (req, res) => {
  const { amount } = req.body;

  const wallet = await Wallet.findOne({ user: req.user.id });

  if (wallet.balance < amount)
    return res.status(400).json({ message: "Insufficient funds" });

  wallet.balance -= Number(amount);
  await wallet.save();

  res.json({ message: "Withdrawal successful" });
};
