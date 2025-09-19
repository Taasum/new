const express = require("express");
const multer = require("multer");
const path = require("path");
const Crop = require("../models/crop");
const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");

// Make sure uploads folder exists
const fs = require("fs");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// In-memory array to store crops
const crops = [];

// Upload crop
router.post("/upload", upload.single("image"), (req, res) => {
  const { name, weight, location } = req.body;
  if (!name || !weight || !location || !req.file)
    return res.status(400).json({ message: "All fields required" });

  const crop = new Crop({
    name,
    weight,
    location,
    image: `/uploads/${req.file.filename}`,
  });

  crops.push(crop);
  res.json({ success: true, crop });
});

// Get all crops
router.get("/warehouse", (req, res) => {
  res.json(crops);
});

module.exports = router;
