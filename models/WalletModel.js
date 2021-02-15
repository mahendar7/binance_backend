const mongoose = require("mongoose");
const walletSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  coinId: { type: String, required: true },
  // icon: { type: String },
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  slug: { type: String },
  // order: { type: [] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  amt: { type: Number, required: true, default: 0 },
});
module.exports = User = mongoose.model("wallet/123", walletSchema);

// [0, 1, 2];
