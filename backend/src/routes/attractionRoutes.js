const express = require("express");
const router = express.Router();
const {
  getAllAttractions,
  getNearbyAttractions,
  getAttractionById,
  createAttraction,
} = require("../controllers/attractionController");

router.get("/", getAllAttractions);
router.post("/nearby", getNearbyAttractions);
router.get("/:id", getAttractionById);
router.post("/", createAttraction);

module.exports = router;