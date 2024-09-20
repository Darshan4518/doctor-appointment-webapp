const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    images: [
      {
        imageUrl: { type: String, required: true },
        cloudinaryId: { type: String, required: true },
      },
    ],
    phoneNumber: { type: String, required: true },
    website: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    category: [
      {
        type: String,
        required: true,
      },
    ],
    isPremium: { type: Boolean, default: false },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Hospital", hospitalSchema);
