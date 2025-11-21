import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Fix OverwriteModelError
export default mongoose.models.Wallet || mongoose.model("Wallet", walletSchema);
