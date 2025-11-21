import mongoose from "mongoose";

const tradeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    direction: { type: String, enum: ["buy", "sell"], required: true },
    status: { type: String, enum: ["open", "closed"], default: "open" },
    open_price: Number,
    close_price: Number,
    profit: Number,
  },
  { timestamps: true }
);

const Trade = mongoose.model("Trade", tradeSchema);
export default Trade;
