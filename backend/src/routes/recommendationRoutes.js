const express = require("express");
const router = express.Router();
const {
  getConciergeRecommendations,
  getFeaturedDestinations,
  createDestination,
} = require("../controllers/recommendationController");

router.post("/concierge", getConciergeRecommendations);
router.get("/featured", getFeaturedDestinations);
router.post("/", createDestination);

module.exports = router;