const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connected to MongoDB");
}).catch(err => {
  console.error("❌ MongoDB connection failed:", err);
});

app.use('/api/auth', authRoutes);
app.use("/api/auth", require("./routes/auth"));


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
