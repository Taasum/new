const mongoose = require("mongoose");

const CropSchema = new mongoose.Schema({
  farmerName: String,
  cropName: String,
  variety: String,
  grade: String,
  quantity: Number,
  pricePerUnit: Number,
  location: String, // Location field
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Crop", CropSchema);
