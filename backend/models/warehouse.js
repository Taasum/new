// backend/models/Warehouse.js
const mongoose = require("mongoose");

const WarehouseSchema = new mongoose.Schema({
  crop: { type: String, required: true },
  farmer: { type: String, required: true },
  weight: { type: Number, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
  price: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  image: { type: String },
  entryDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Warehouse", WarehouseSchema);
