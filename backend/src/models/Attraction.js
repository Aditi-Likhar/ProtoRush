const mongoose = require("mongoose");

const attractionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: "Destination" },
    category: { type: String, required: true }, // Nature, Museum, Temple, Historical, Adventure, Beach, Wildlife, Parks, Food, Shopping
    description: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 4.0, min: 0, max: 5 },

    openingHours: { type: String, required: true },
    isOpenNow: { type: Boolean, default: true },
    entryFee: { type: String, default: "Free" },

    crowdLevel: {
      type: String,
      enum: ["Less Crowded", "Moderate", "Crowded"],
      default: "Moderate",
    },
    aiSuggested: { type: Boolean, default: false },

    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attraction", attractionSchema);