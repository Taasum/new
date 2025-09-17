// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Temporary in-memory DB
// let users = [];

// // Registration
// app.post("/register", (req, res) => {
//   const {
//     fullName, aadhar, kccId, contact, email,
//     address, bankUpi, password, confirmPassword
//   } = req.body;

//   if (!fullName || !password || !confirmPassword) {
//     return res.status(400).json({ message: "Full Name, Password and Confirm Password are required" });
//   }

//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: "Passwords do not match" });
//   }

//   const exists = users.find(u => u.fullName === fullName);
//   if (exists) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   users.push({ fullName, aadhar, kccId, contact, email, address, bankUpi, password });
//   res.json({ message: "Registered Successfully" });
// });

// // Login route
// app.post("/login", (req, res) => {
//   const { fullName, password } = req.body;

//   const user = users.find(
//     (u) => u.fullName === fullName && u.password === password
//   );

//   if (user) {
//     return res.json({ success: true, message: "Login successful" });
//   } else {
//     return res.json({ success: false, message: "User not registered" });
//   }
// });

// // Start server
// app.listen(5000, () => {
//   console.log("✅ Backend running on http://localhost:5000");
// });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for registered users
let users = [];

// Registration route
app.post("/register", (req, res) => {
  const { fullName, aadhar, kccId, contact, email, address, bankUpi, password, confirmPassword } = req.body;

  if (!fullName || !password || !confirmPassword) {
    return res.status(400).json({ message: "Full Name, Password and Confirm Password are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const exists = users.find(u => u.fullName === fullName);
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ fullName, aadhar, kccId, contact, email, address, bankUpi, password });
  res.json({ message: "Registered Successfully" });
});

// ⬅️ Add login route here
app.post("/login", (req, res) => {
  const { fullName, password } = req.body;

  if (!fullName || !password) {
    return res.json({ success: false, message: "Full Name and Password are required" });
  }

  const user = users.find(u => u.fullName === fullName && u.password === password);

  if (user) {
    return res.json({ success: true, message: "Login successful" });
  } else {
    return res.json({ success: false, message: "User not registered" });
  }
});

// Start server
app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
