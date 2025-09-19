const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");

// GET /api/mandi/prices?state=STATE&market=MARKET&commodity=CROP&grade=GRADE
router.get("/prices", (req, res) => {
  const { state, market, commodity, grade } = req.query;
  const results = [];
  const csvFilePath = path.join(__dirname, "../mandi_prices.csv");

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      // filter rows if query params exist
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
    .on("end", () => {
      res.json(results);
    })
    .on("error", (err) => {
      console.error(err);
      res.status(500).json({ message: "CSV read error" });
    });
});

module.exports = router;
