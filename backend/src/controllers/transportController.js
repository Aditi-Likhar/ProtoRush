const asyncHandler = require("../middleware/asyncHandler");
const { geocodeLocation, getRouteDistance } = require("../services/routingService");
const { buildTransportComparison } = require("../utils/transportProfiles");

// @desc    Search route between two locations and compare all transport modes
// @route   POST /api/transport/route
// @access  Public
// Body: { from: "Current Location" | "Mumbai, India", to: "Santorini, Greece", fromCoords?: {lat,lng} }
const searchRoute = asyncHandler(async (req, res) => {
  const { from, to, fromCoords } = req.body;

  if (!to) {
    res.status(400);
    throw new Error("Destination ('to') is required");
  }

  // Resolve "from" — either raw coords from browser geolocation, or a place name to geocode
  let fromLocation;
  if (fromCoords && fromCoords.lat && fromCoords.lng) {
    fromLocation = { lat: fromCoords.lat, lng: fromCoords.lng, displayName: "Current Location" };
  } else if (from) {
    fromLocation = await geocodeLocation(from);
  } else {
    res.status(400);
    throw new Error("Provide either 'from' (place name) or 'fromCoords' (lat/lng)");
  }

  const toLocation = await geocodeLocation(to);

  const route = await getRouteDistance(fromLocation, toLocation);

  const transportOptions = buildTransportComparison(route.distanceKm);

  res.status(200).json({
    success: true,
    data: {
      from: fromLocation,
      to: toLocation,
      distanceKm: route.distanceKm,
      etaMin: route.durationMin,
      transportOptions,
    },
  });
});

// @desc    Get transport comparison directly from a known distance (no geocoding)
// @route   GET /api/transport/compare?distanceKm=9.2
// @access  Public
const compareByDistance = asyncHandler(async (req, res) => {
  const { distanceKm } = req.query;

  if (!distanceKm || isNaN(parseFloat(distanceKm))) {
    res.status(400);
    throw new Error("A valid distanceKm query param is required");
  }

  const transportOptions = buildTransportComparison(parseFloat(distanceKm));

  res.status(200).json({ success: true, data: { distanceKm: parseFloat(distanceKm), transportOptions } });
});

module.exports = { searchRoute, compareByDistance };