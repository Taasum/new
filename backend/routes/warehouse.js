const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

module.exports = (crops) => {
  const router = express.Router();

  // Upload folder
  const uploadDir = path.join(__dirname, "../uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
  });
  const upload = multer({ storage });

  // 1️⃣ Farmer uploads a crop
  router.post("/upload", upload.single("image"), (req, res) => {
    const { name, weight, location } = req.body;
    if (!name || !weight || !location || !req.file)
      return res.status(400).json({ message: "All fields required" });

    const fixedPrice = 2862;
    const totalPrice = fixedPrice * parseFloat(weight);

    const crop = {
      id: Date.now(),
      crop: name,
      farmer: "Demo Farmer", // backend placeholder
      weight,
      pricePerUnit: fixedPrice,
      totalPrice,
      location,
      status: "Pending",
      image: `/uploads/${req.file.filename}`,
    };

    crops.push(crop); // Add to memory

    res.json({ success: true, crop });
  });

  // 2️⃣ Warehouse fetches all crops
  router.get("/", (req, res) => {
    res.json(crops);
  });

  return router;
};
