require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const attractionRoutes = require("./src/routes/attractionRoutes");
const transportRoutes = require("./src/routes/transportRoutes");
const emergencyRoutes = require("./src/routes/emergencyRoutes");
const recommendationRoutes = require("./src/routes/recommendationRoutes");
const chatbotRoutes = require("./src/routes/chatbotRoutes");

const { notFound, errorHandler } = require("./src/middleware/errorHandler");

const app = express();

// Connect to MongoDB
connectDB();

// Core middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TravelMate AI backend is running 🚀",
  });
});

// Mount routes
app.use("/api/attractions", attractionRoutes);
app.use("/api/transport", transportRoutes);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/chatbot", chatbotRoutes);

// Error handling (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;