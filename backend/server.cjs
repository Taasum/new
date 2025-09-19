// server.cjs
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// ------------------
// Upload setup
// ------------------
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ------------------
// In-memory storage for demo crops
// ------------------
const crops = [];

// ------------------
// Upload Crop
// ------------------
app.post("/upload", upload.single("image"), (req, res) => {
  const { name, weight, location } = req.body;
  if (!name || !weight || !location || !req.file) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const pricePerUnit = 2862; // fixed price
  const w = parseFloat(weight);
  const totalPrice = pricePerUnit * w;

  const crop = {
    id: Date.now(),
    crop: name,
    farmer: "Demo Farmer", // replace with login later
    weight: w,
    location,
    price: pricePerUnit,
    totalPrice,
    status: "Pending",
    image: `/uploads/${req.file.filename}`,
  };

  crops.push(crop);
  res.json({ success: true, crop });
});

// ------------------
// Get all crops for warehouse
// ------------------
app.get("/api/warehouse", (req, res) => {
  res.json(crops);
});

// ------------------
// Serve uploads folder
// ------------------
app.use("/uploads", express.static(uploadDir));

// ------------------
// Start server
// ------------------
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Backend running at http://127.0.0.1:${PORT}`)
);
