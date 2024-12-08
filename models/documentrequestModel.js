
const mongoose = require("mongoose");

const DocumentRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["new", "update"], required: true },
  documentName: { type: String, required: true },
  details: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DocumentRequest", DocumentRequestSchema);
