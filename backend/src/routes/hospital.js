const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Hospital = require("../models/hospital.js");

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hospital-images",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage: storage });

// Get all hospitals

router.get("/", async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const hospitals = await Hospital.findOne({ _id: id });
    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upload a hospital with images

router.post("/upload", upload.array("images", 10), async (req, res) => {
  try {
    const images = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      images.push({
        imageUrl: result.secure_url,
        cloudinaryId: result.public_id,
      });
    }
    const hospital = new Hospital({
      name: req.body.name,
      images: images,
      phoneNumber: req.body.phoneNumber,
      website: req.body.website,
      address: req.body.address,
      email: req.body.email,
      description: req.body.description,
      category: req.body.category,
      isPremium: req.body.isPremium || false,
    });
    await hospital.save();
    res.json(hospital);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a hospital

router.put("/:id", upload.array("images", 10), async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (req.files.length > 0) {
      for (const image of hospital.images) {
        await cloudinary.uploader.destroy(image.cloudinaryId);
      }
      const images = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        images.push({
          imageUrl: result.secure_url,
          cloudinaryId: result.public_id,
        });
      }
      req.body.images = images;
    }
    const updatedHospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedHospital);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a hospital

router.delete("/:id", async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    for (const image of hospital.images) {
      await cloudinary.uploader.destroy(image.cloudinaryId);
    }
    await Hospital.findByIdAndDelete(req.params.id);
    res.json({ message: "Hospital deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
