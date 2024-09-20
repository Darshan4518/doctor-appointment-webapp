const { Router } = require("express");
const Hospital = require("../models/hospital.js");
const router = Router();
const Doctor = require("../models/doctor.js");

router.get("/hospitals", async (req, res) => {
  try {
    const hospitals = await Hospital.find({
      category: { $in: req.query.catName },
    });
    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find({
      category: req.query.catName,
    });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
