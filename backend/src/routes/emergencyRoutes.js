const express = require("express");
const router = express.Router();
const {
  getAllEmergencyContacts,
  getEmergencyByType,
  createEmergencyContact,
} = require("../controllers/emergencyController");

router.get("/", getAllEmergencyContacts);
router.get("/type/:type", getEmergencyByType);
router.post("/", createEmergencyContact);

module.exports = router;