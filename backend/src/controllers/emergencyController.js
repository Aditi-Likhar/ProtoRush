const Emergency = require("../models/Emergency");
const asyncHandler = require("../middleware/asyncHandler");

// @desc    Get all emergency contacts (optionally filter by city)
// @route   GET /api/emergency?city=Mumbai
// @access  Public
const getAllEmergencyContacts = asyncHandler(async (req, res) => {
  const { city, type } = req.query;

  const filter = {};
  if (city) filter.city = city;
  if (type) filter.type = type;

  const contacts = await Emergency.find(filter);

  res.status(200).json({
    success: true,
    count: contacts.length,
    data: contacts,
  });
});

// @desc    Get emergency contacts by type
// @route   GET /api/emergency/type/:type
// @access  Public
const getEmergencyByType = asyncHandler(async (req, res) => {
  const contacts = await Emergency.find({ type: req.params.type });

  res.status(200).json({
    success: true,
    count: contacts.length,
    data: contacts,
  });
});

// @desc    Create emergency contact (used for seeding/admin)
// @route   POST /api/emergency
// @access  Public
const createEmergencyContact = asyncHandler(async (req, res) => {
  const contact = await Emergency.create(req.body);
  res.status(201).json({ success: true, data: contact });
});

module.exports = {
  getAllEmergencyContacts,
  getEmergencyByType,
  createEmergencyContact,
};