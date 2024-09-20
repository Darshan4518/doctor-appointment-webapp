const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const Doctor = require("../models/doctor.js");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "doctor_images",
    allowed_formats: ["jpg", "png"],
  },
});

const upload = multer({ storage: storage });

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific doctor
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (doctor == null) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new doctor
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const doctor = new Doctor({
      name: req.body.name,
      address: req.body.address,
      yearsOfExperience: req.body.yearsOfExperience,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      about: req.body.about,
      image: req.file.path,
      category: req.body.category,
    });

    const newDoctor = await doctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a doctor
// router.put("/:id", upload.single("image"), async (req, res) => {
//   try {
//     const doctor = new Doctor({
//       name: req.body.name,
//       address: req.body.address,
//       yearsOfExperience: req.body.yearsOfExperience,
//       startTime: req.body.startTime,
//       endTime: req.body.endTime,
//       about: req.body.about,
//       image: req.file.path,
//       category: req.body.category,
//     });
//     if (doctor == null) {
//       return res.status(404).json({ message: "Doctor not found" });
//     }

//     const updatedDoctor = await doctor.save();
//     res.json(updatedDoctor);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (doctor == null) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Update fields only if they are present in the request body
    if (req.body.name != null) {
      doctor.name = req.body.name;
    }
    if (req.body.address != null) {
      doctor.address = req.body.address;
    }
    if (req.body.yearsOfExperience != null) {
      doctor.yearsOfExperience = req.body.yearsOfExperience;
    }
    if (req.body.startTime != null) {
      doctor.startTime = req.body.startTime;
    }
    if (req.body.endTime != null) {
      doctor.endTime = req.body.endTime;
    }
    if (req.body.about != null) {
      doctor.about = req.body.about;
    }
    if (req.body.category != null) {
      doctor.category = req.body.category;
    }

    // Handle the image update
    if (req.file != null) {
      // Optionally, delete the old image from Cloudinary here
      if (doctor.image) {
        await cloudinary.uploader.destroy(doctor.image);
      }
      doctor.image = req.file.path;
    }

    const updatedDoctor = await doctor.save();
    res.json(updatedDoctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a doctor
router.delete("/:id", async (req, res) => {
  try {
    if (doctor == null) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    await cloudinary.uploader.destroy(doctor.imageUrl);
    await Doctor.findByIdAndDelete(id);
    res.json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
