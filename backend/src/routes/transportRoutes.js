const express = require("express");
const router = express.Router();
const { searchRoute, compareByDistance } = require("../controllers/transportController");

router.post("/route", searchRoute);
router.get("/compare", compareByDistance);

module.exports = router;