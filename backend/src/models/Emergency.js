const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema(
  {
    type: {
      type: String, // "Police", "Hospital", "Ambulance", "Women Helpline", "Tourist Helpline"
      required: true,
      enum: [
        "Police",
        "Hospital",
        "Ambulance",
        "Women Helpline",
        "Tourist Helpline",
      ],
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    isAvailable24x7: {
      type: Boolean,
      default: true,
    },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Emergency", emergencySchema);