require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");

const Destination = require("../models/Destination");
const Attraction = require("../models/Attraction");
const Emergency = require("../models/Emergency");

const { destinations, attractions, emergencyContacts } = require("./seedData");

const runSeed = async () => {
  try {
    await connectDB();

    console.log("Clearing existing data...");
    await Destination.deleteMany();
    await Attraction.deleteMany();
    await Emergency.deleteMany();

    console.log("Inserting destinations...");
    await Destination.insertMany(destinations);

    console.log("Inserting attractions...");
    await Attraction.insertMany(attractions);

    console.log("Inserting emergency contacts...");
    await Emergency.insertMany(emergencyContacts);

    console.log("✅ Seed data inserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }
};

runSeed();