// Speed (km/h), price-per-km (₹), and quality scores for each transport mode.
// These are reasonable Indian-city averages used to derive realistic estimates
// from the real route distance.
const MODE_PROFILES = {
  Metro: {
    speedKmh: 32,
    pricePerKm: 4.3,
    minPrice: 10,
    comfort: 80,
    availability: 92,
    ecoScore: 95,
    badge: "Fastest Route",
    icon: "metro",
  },
  Bus: {
    speedKmh: 18,
    pricePerKm: 2.1,
    minPrice: 10,
    comfort: 60,
    availability: 85,
    ecoScore: 80,
    badge: "Cheapest",
    icon: "bus",
  },
  Taxi: {
    speedKmh: 28,
    pricePerKm: 14,
    minPrice: 60,
    comfort: 100,
    availability: 96,
    ecoScore: 35,
    badge: "Most Comfortable",
    icon: "taxi",
  },
  Auto: {
    speedKmh: 24,
    pricePerKm: 12,
    minPrice: 40,
    comfort: 60,
    availability: 90,
    ecoScore: 55,
    badge: "Recommended",
    icon: "auto",
  },
  "Bike Rental": {
    speedKmh: 20,
    pricePerKm: 3,
    minPrice: 20,
    comfort: 40,
    availability: 70,
    ecoScore: 100,
    badge: "Eco Friendly",
    icon: "bike",
  },
  Walking: {
    speedKmh: 4.8,
    pricePerKm: 0,
    minPrice: 0,
    comfort: 40,
    availability: 100,
    ecoScore: 100,
    badge: "",
    icon: "walk",
  },
};

/**
 * Given a real route distance (km), compute time/cost/comfort/eco for every mode.
 * Walking is only realistic under ~6km — still shown, but flagged with a longer time.
 */
const buildTransportComparison = (distanceKm) => {
  const results = Object.entries(MODE_PROFILES).map(([type, profile]) => {
    const timeHours = distanceKm / profile.speedKmh;
    const timeMin = Math.round(timeHours * 60);

    const rawCost = distanceKm * profile.pricePerKm;
    const cost =
      profile.pricePerKm === 0 ? 0 : Math.max(Math.round(rawCost), profile.minPrice);

    return {
      type,
      icon: profile.icon,
      distanceKm,
      estimatedTimeMin: timeMin,
      price: cost === 0 ? "Free" : `₹${cost}`,
      comfort: profile.comfort,
      availability: profile.availability,
      ecoScore: profile.ecoScore,
      badge: profile.badge,
    };
  });

  // Mark the actual fastest / cheapest dynamically (in case profiles change)
  const fastest = [...results].sort((a, b) => a.estimatedTimeMin - b.estimatedTimeMin)[0];
  const cheapest = [...results]
    .filter((r) => r.price !== "Free")
    .sort((a, b) => parseInt(a.price.replace("₹", "")) - parseInt(b.price.replace("₹", "")))[0];

  return results.map((r) => ({
    ...r,
    badge:
      r.type === fastest.type
        ? "Fastest Route"
        : r.type === cheapest?.type
        ? "Cheapest"
        : r.badge,
  }));
};

module.exports = { buildTransportComparison, MODE_PROFILES };