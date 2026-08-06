import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});