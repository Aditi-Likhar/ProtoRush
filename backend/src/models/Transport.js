const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema(
  {
    type: {
      type: String, // "Metro", "Bus", "Taxi", "Bike Rental", "Walking"
      required: true,
      enum: ["Metro", "Bus", "Taxi", "Bike Rental", "Walking"],
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
    },
    estimatedTime: {
      type: String, // e.g. "15 mins"
      required: true,
    },
    price: {
      type: String, // e.g. "₹30" or "Free"
      required: true,
    },
    availability: {
      type: String, // e.g. "Available", "Busy", "Low Availability"
      default: "Available",
    },
    icon: {
      type: String, // icon name/key used by frontend, e.g. "metro-icon"
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transport", transportSchema);