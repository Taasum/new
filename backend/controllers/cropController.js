const path = require("path");
const fs = require("fs");

// Dummy grading function abhi ke liye
function gradeCrop(imagePath) {
  // 👇 yahan aap apna agrichain_dataset wala model connect karoge
  // Filhaal ke liye random grade return kar dete hain
  const grades = ["A", "B", "C"];
  return grades[Math.floor(Math.random() * grades.length)];
}

// Dummy price table (baad mein dataset/API se connect hoga)
const PRICE_TABLE = {
  "A": 2000,
  "B": 1500,
  "C": 1000
};

const addCrop = (req, res) => {
  try {
    const { name, weight } = req.body;
    const imagePath = req.file.path;

    // Grade nikalna
    const grade = gradeCrop(imagePath);

    // Price assign karna
    const price = PRICE_TABLE[grade] * (weight / 100); // example calc

    res.json({
      success: true,
      crop: name,
      weight,
      grade,
      price,
      image: imagePath
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { addCrop };
