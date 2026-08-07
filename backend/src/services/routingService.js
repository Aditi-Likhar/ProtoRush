const axios = require("axios");

// Geocode a place name to { lat, lng } using Nominatim (OpenStreetMap)
const geocodeLocation = async (placeName) => {
  const url = `https://nominatim.openstreetmap.org/search`;

  const { data } = await axios.get(url, {
    params: { q: placeName, format: "json", limit: 1 },
    headers: { "User-Agent": "TravelMateAI/1.0" }, // required by Nominatim usage policy
  });

  if (!data || data.length === 0) {
    throw new Error(`Location not found: ${placeName}`);
  }

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
    displayName: data[0].display_name,
  };
};

// Get real driving route distance (km) and duration (min) between two coordinates using OSRM
const getRouteDistance = async (from, to) => {
  const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}`;

  const { data } = await axios.get(url, {
    params: { overview: "false" },
  });

  if (!data.routes || data.routes.length === 0) {
    throw new Error("No route found between these locations");
  }

  const route = data.routes[0];

  return {
    distanceKm: parseFloat((route.distance / 1000).toFixed(1)),
    durationMin: Math.round(route.duration / 60),
  };
};

module.exports = { geocodeLocation, getRouteDistance };