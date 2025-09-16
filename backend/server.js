import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Temporary in-memory user storage
const users = [];

// Register API
app.post("/register", (req, res) => {
  const { fullName, email, password } = req.body;

  // Validate fields
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if email already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already registered" });
  }

  // Save user
  users.push({ fullName, email, password });
  console.log("Registered users:", users);

  res.json({ message: "✅ User registered successfully" });
});

// Root route for testing
app.get("/", (req, res) => {
  res.send("🚀 Backend is running!");
});

// Start server
app.listen(5000, () => console.log("🚀 Backend running on http://localhost:5000"));
