const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");

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
// Pseudo-blockchain setup
// ------------------
let blockchain = [];

// Genesis block
const genesisBlock = {
  index: 0,
  timestamp: new Date().toISOString(),
  farmer: "Genesis",
  crop: "None",
  weight: 0,
  location: "N/A",
  price: 0,
  previousHash: "0",
  hash: "genesis123",
};
blockchain.push(genesisBlock);

// Hash generator (demo only)
function generateHash() {
  return Math.random().toString(36).substring(2, 10);
}

// Create new block
function createBlock(prevBlock, cropData) {
  return {
    index: prevBlock.index + 1,
    timestamp: new Date().toISOString(),
    ...cropData,
    previousHash: prevBlock.hash,
    hash: generateHash(),
  };
}

// ------------------
// Upload Crop
// ------------------
app.post("/upload", upload.single("image"), (req, res) => {
  const { name, weight, location } = req.body;
  if (!name || !weight || !location || !req.file) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const pricePerUnit = 2862; // fixed price for demo
  const w = parseFloat(weight);

  const crop = {
    id: Date.now(),
    crop: name,
    farmer: "Demo Farmer",
    weight: w,
    location,
    price: pricePerUnit,
    totalPrice: pricePerUnit * w,
    status: "Pending", // initial status
    deliveryDate: null, // set by warehouse
    image: `/uploads/${req.file.filename}`,
  };

  crops.push(crop);

  // Add to blockchain
  const newBlock = createBlock(blockchain[blockchain.length - 1], crop);
  blockchain.push(newBlock);

  res.json({ success: true, crop, block: newBlock });
});

// ------------------
// Warehouse accept crop
// ------------------
app.post("/warehouse/accept/:id", (req, res) => {
  const cropId = parseInt(req.params.id);
  const crop = crops.find((c) => c.id === cropId);
  if (!crop) return res.status(404).json({ message: "Crop not found" });

  crop.status = "Accepted";
  crop.deliveryDate = "21 Sep 2025";

  // Add blockchain record for acceptance
  const newBlock = createBlock(blockchain[blockchain.length - 1], crop);
  blockchain.push(newBlock);

  res.json({ success: true, message: `Crop accepted. Delivery date: ${crop.deliveryDate}`, crop });
});

// ------------------
// Warehouse mark delivered + release payment
// ------------------
app.post("/warehouse/deliver/:id", (req, res) => {
  const cropId = parseInt(req.params.id);
  const crop = crops.find((c) => c.id === cropId);
  if (!crop) return res.status(404).json({ message: "Crop not found" });

  crop.status = "Delivered";

  // Payment message
  const paymentMessage = `💰 Payment of ₹${crop.totalPrice} released to ${crop.farmer}`;

  // Add blockchain record for delivery/payment
  const newBlock = createBlock(blockchain[blockchain.length - 1], crop);
  blockchain.push(newBlock);

  res.json({ success: true, message: paymentMessage, crop, block: newBlock });
});

// ------------------
// Get all crops for warehouse
// ------------------
app.get("/api/warehouse", (req, res) => {
  res.json(crops);
});

// ------------------
// Get blockchain (for demo)
app.get("/api/blockchain", (req, res) => {
  res.json(blockchain);
});

// ------------------
// Mandi prices route
// ------------------
app.get("/api/mandi/prices", (req, res) => {
  const { state, market, commodity, grade } = req.query;
  const results = [];
  const csvFilePath = path.join(__dirname, "mandi_prices.csv");

  if (!fs.existsSync(csvFilePath)) {
    return res.status(404).json({ message: "CSV file not found" });
  }

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      if (
        (!state || row.State.toLowerCase() === state.toLowerCase()) &&
        (!market || row.Market.toLowerCase() === market.toLowerCase()) &&
        (!commodity || row.Commodity.toLowerCase() === commodity.toLowerCase()) &&
        (!grade || row.Grade.toLowerCase() === grade.toLowerCase())
      ) {
        results.push({
          state: row.State,
          district: row.District,
          market: row.Market,
          commodity: row.Commodity,
          variety: row.Variety,
          grade: row.Grade,
          date: row.Arrival_Date,
          minPrice: parseFloat(row.Min_Price),
          maxPrice: parseFloat(row.Max_Price),
          modalPrice: parseFloat(row.Modal_Price),
        });
      }
    })
    .on("end", () => res.json(results))
    .on("error", (err) => {
      console.error(err);
      res.status(500).json({ message: "CSV read error" });
    });
});
// ------------------
// Verify QR -> return crop details
// ------------------
app.get("/api/qr/:id", (req, res) => {
  const cropId = parseInt(req.params.id);
  const crop = crops.find((c) => c.id === cropId);

  if (!crop) {
    return res.status(404).json({ success: false, message: "Invalid QR or crop not found" });
  }

  res.json({ success: true, crop });
});
// ------------------
// Serve uploads folder
// ------------------
app.use("/uploads", express.static(uploadDir));

// ------------------
// Test route
// ------------------
app.get("/", (req, res) => {
  res.send(
    "🚀 Backend running. Use POST /upload to add crop, POST /warehouse/accept/:id to accept, POST /warehouse/deliver/:id to deliver & release payment, GET /api/warehouse for crops."
  );
});

// ------------------
// Start server
// ------------------
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Backend running at http://127.0.0.1:${PORT}`)
);
