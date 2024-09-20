const express = require("express");
const router = express.Router();
const Hospital = require("../models/hospital.js");
const Appointment = require("../models/appointment.js");

router.post("/appointments", async (req, res) => {
  try {
    const { userName, email, date, time, note, hospitalId } = req.body;
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }
    const newAppointment = new Appointment({
      userName,
      email,
      date,
      time,
      note,
      hospital: hospital._id,
    });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Get all appointments
router.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("hospital");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Get a single appointment by ID
router.get("/appointments/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate(
      "hospital"
    );
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - Update an appointment by ID
router.put("/appointments/:id", async (req, res) => {
  try {
    const { userName, email, date, time, note, hospitalId } = req.body;
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        userName,
        email,
        date,
        time,
        note,
        hospital: hospital._id,
      },
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Delete an appointment by ID
router.delete("/appointments/:id", async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
