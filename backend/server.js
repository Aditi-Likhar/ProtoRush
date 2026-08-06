import express from "express";
import dotenv from "dotenv";
import cors from "cors";


// Load env variables
dotenv.config();

const app = express();


// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));



// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});