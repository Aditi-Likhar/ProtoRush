const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },

    bestSeason: { type: String, required: true }, // "Winter", "Spring", etc.
    budget: {
      type: String,
      required: true,
      enum: ["₹5k-10k", "₹10k-20k", "₹20k-50k", "₹50k+"],
    },
    travelDuration: { type: String, required: true }, // "Weekend", "3 Days", "1 Week", "2 Weeks"
    travelStyle: {
      type: [String], // ["Family","Solo","Friends","Couple","Business"]
      default: [],
    },
    destinationType: {
      type: String, // "Beach","Mountain","Heritage","Adventure","Wildlife","City" etc.
      default: "Any",
    },

    rating: { type: Number, min: 0, max: 5, default: 4.5 },
    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Challenging"],
      default: "Easy",
    },
    badge: {
      type: String, // "Best AI Match","Most Popular","Luxury Pick","Eco Tourism","Trending"
      default: "",
    },

    weather: {
      temp: { type: Number, default: 25 },
      condition: { type: String, default: "Clear" }, // "Humid","Mild","Warm"
    },

    popularity: { type: Number, default: 50 },
    tags: { type: [String], default: [] },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Destination", destinationSchema);