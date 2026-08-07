// src/data/emergency.js

export const SAFETY_STATUS = {
  destination: "Bali, Indonesia",
  safetyScore: 8.6,
  safetyLabel: "Very Safe",
  weather: "Clear · 29°C",
  advisory: "Normal Precautions",
  emergencyAvailability: "24/7 Active",
};

export const EMERGENCY_CONTACTS = [
  {
    id: "police",
    icon: "👮",
    title: "Police",
    number: "+62 112",
    availability: "24/7",
    responseTime: "~8 min",
  },
  {
    id: "hospital",
    icon: "🏥",
    title: "Hospital",
    number: "+62 118",
    availability: "24/7",
    responseTime: "~12 min",
  },
  {
    id: "ambulance",
    icon: "🚑",
    title: "Ambulance",
    number: "+62 119",
    availability: "24/7",
    responseTime: "~10 min",
  },
  {
    id: "fire",
    icon: "🚒",
    title: "Fire Department",
    number: "+62 113",
    availability: "24/7",
    responseTime: "~9 min",
  },
  {
    id: "women-helpline",
    icon: "👩",
    title: "Women Helpline",
    number: "+62 129",
    availability: "24/7",
    responseTime: "~6 min",
  },
  {
    id: "tourist-helpline",
    icon: "☎",
    title: "Tourist Helpline",
    number: "+62 24 3548 815",
    availability: "6 AM – 12 AM",
    responseTime: "~5 min",
  },
];

export const SAFETY_GUIDELINES = [
  "Carry ID",
  "Save Emergency Contacts",
  "Use Licensed Transport",
  "Respect Local Culture",
  "Stay Hydrated",
  "Avoid Isolated Areas",
  "Secure Valuables",
];

export const AI_SAFETY_INSIGHT = {
  confidenceScore: 94,
  safetyLevel: "High",
  recommendation:
    "Coastal areas are calm this week. Avoid Kuta's back alleys after 11 PM and keep offline maps downloaded before heading to Nusa Penida.",
};

export const QUICK_ACTIONS = [
  { id: "share-location", icon: "📍", label: "Share My Location" },
  { id: "nearest-hospital", icon: "🏥", label: "Nearest Hospital" },
  { id: "emergency-contacts", icon: "📇", label: "Emergency Contacts" },
  { id: "offline-guide", icon: "📥", label: "Offline Safety Guide" },
];
