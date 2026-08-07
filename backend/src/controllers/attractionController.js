const Attraction = require("../models/Attraction");
const asyncHandler = require("../middleware/asyncHandler");
const { geocodeLocation } = require("../services/routingService");
const { getCurrentWeather } = require("../services/weatherService");

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// @desc    Get all attractions (with optional category filter)
// @route   GET /api/attractions?category=Temple
// @access  Public
const getAllAttractions = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filter = {};
  if (category && category !== "All") filter.category = category;

  const attractions = await Attraction.find(filter).sort({ rating: -1 });
  res.status(200).json({ success: true, count: attractions.length, data: attractions });
});

// @desc    Get nearby attractions — by coords OR a place name, with live weather
// @route   POST /api/attractions/nearby
// @access  Public
// Body: { lat, lng } OR { location: "Jaipur, India" }, optional: { radius, category }
const getNearbyAttractions = asyncHandler(async (req, res) => {
  const { lat, lng, location, radius = 10, category } = req.body;

  let userLat, userLng;

  if (lat && lng) {
    userLat = parseFloat(lat);
    userLng = parseFloat(lng);
  } else if (location) {
    const geo = await geocodeLocation(location);
    userLat = geo.lat;
    userLng = geo.lng;
  } else {
    res.status(400);
    throw new Error("Provide either { lat, lng } or { location }");
  }

  const filter = {};
  if (category && category !== "All") filter.category = category;

  const allAttractions = await Attraction.find(filter);

  const nearby = allAttractions
    .map((a) => {
      const distance = getDistance(userLat, userLng, a.location.lat, a.location.lng);
      return { ...a.toObject(), distanceKm: parseFloat(distance.toFixed(1)) };
    })
    .filter((a) => a.distanceKm <= parseFloat(radius))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, 12); // cap results for performance

  // Fetch live weather for each attraction in parallel
  const withWeather = await Promise.all(
    nearby.map(async (a) => {
      const weather = await getCurrentWeather(a.location.lat, a.location.lng);
      return { ...a, currentTemp: weather.temp };
    })
  );

  res.status(200).json({
    success: true,
    userLocation: { lat: userLat, lng: userLng },
    count: withWeather.length,
    data: withWeather,
  });
});

// @desc    Get single attraction by ID
// @route   GET /api/attractions/:id
// @access  Public
const getAttractionById = asyncHandler(async (req, res) => {
  const attraction = await Attraction.findById(req.params.id);
  if (!attraction) {
    res.status(404);
    throw new Error("Attraction not found");
  }
  res.status(200).json({ success: true, data: attraction });
});

// @desc    Create attraction (seeding/admin)
// @route   POST /api/attractions
// @access  Public
const createAttraction = asyncHandler(async (req, res) => {
  const attraction = await Attraction.create(req.body);
  res.status(201).json({ success: true, data: attraction });
});

module.exports = {
  getAllAttractions,
  getNearbyAttractions,
  getAttractionById,
  createAttraction,
};