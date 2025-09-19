// server_test_csv.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ------------------
// CSV Path (test_csv)
// ------------------
const csvFilePath = path.join(
  "C:/Users/Tabassum/SIHCodeEthics/agrichain_dataset/data/mandi_prices/mandi_today_2025-09-19.csv"
);

// ------------------
// Mandi Prices Route
// ------------------
app.get("/mandi_prices", (req, res) => {
  if (!fs.existsSync(csvFilePath)) return res.json([]);

  const results = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv({ mapHeaders: ({ header }) => header.trim() }))
    .on("data", (row) => {
      results.push({
        State: row.State,
        District: row.District,
        Market: row.Market,
        Commodity: row.Commodity,
        Variety: row.Variety,
        Grade: row.Grade,
        Arrival_Date: row.Arrival_Date,
        Min_Price: row.Min_Price,
        Max_Price: row.Max_Price,
        Modal_Price: row.Modal_Price,
        Commodity_Code: row.Commodity_Code,
      });
    })
    .on("end", () => res.json(results.slice(0, 50))) // ✅ limit 50 rows
    .on("error", () => res.status(500).json({ message: "CSV read error" }));
});

// ------------------
// Start server
// ------------------
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Test CSV Backend running at http://127.0.0.1:${PORT}`)
);
