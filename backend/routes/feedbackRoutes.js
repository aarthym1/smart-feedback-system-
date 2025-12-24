const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

router.post("/", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    const saved = await feedback.save();
    res.status(201).json(saved);  // send saved feedback object back
  } catch (err) {
    res.status(500).json({ message: "Failed to save feedback" });
  }
});

module.exports = router;
