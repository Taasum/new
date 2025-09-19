const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { addCrop } = require("../controllers/cropController");

router.post("/add", upload.single("image"), addCrop);

module.exports = router;
