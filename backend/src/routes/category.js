const express = require("express");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const Category = require("../models/category.js");

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "image_categories",
    allowed_formats: ["jpg", "png"],
  },
});

const upload = multer({ storage: storage });

// Create a new category
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name } = req.body;
    const imageUrl = req.file.path;

    const newCategory = new Category({ name, imageUrl });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const categories = await Category.findOne({ _id: id });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a category
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    let updateData = { name };

    if (req.file) {
      const category = await Category.findById(id);
      await cloudinary.uploader.destroy(category.imageUrl);
      updateData.imageUrl = req.file.path;
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a category
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    await cloudinary.uploader.destroy(category.imageUrl);
    await Category.findByIdAndDelete(id);

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
