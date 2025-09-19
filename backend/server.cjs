// server.js
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
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ------------------
// Crop Upload Route (Fixed Price Demo)
// ------------------
app.post("/upload", upload.single("image"), (req, res) => {
  const { name, weight, location } = req.body;
  if (!name || !weight || !location || !req.file)
    return res.status(400).json({ message: "All fields required" });

  const fixedPricePerUnit = 2862; // Fixed Modal Price from first CSV row
  const w = parseFloat(weight);
  const totalPrice = fixedPricePerUnit * w;

  res.json({
    success: true,
    crop: name,
    weight: w,
    price: fixedPricePerUnit,
    totalPrice,
    location,
    image: req.file.path,
    note: "Demo using fixed price 2862",
  });
});

// ------------------
// Serve uploads
// ------------------
app.use("/uploads", express.static(uploadDir));

// ------------------
// Optional: Test route
// ------------------
app.get("/", (req, res) => {
  res.send("🚀 Backend is running. POST /upload to test crop price calculation.");
});

// ------------------
// Start server
// ------------------
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running at http://127.0.0.1:${PORT}`));
