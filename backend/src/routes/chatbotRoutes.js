const express = require("express");
const router = express.Router();
const { handleChatMessage } = require("../controllers/chatbotController");
const validateRequest = require("../middleware/validateRequest");

router.post("/", validateRequest(["message"]), handleChatMessage);

module.exports = router;