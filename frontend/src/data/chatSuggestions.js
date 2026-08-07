// src/data/chatSuggestions.js

export const CHAT_SUGGESTIONS = [
  "Plan My Trip",
  "Nearby Attractions",
  "Emergency Help",
  "Budget Travel",
  "Luxury Destinations",
  "Family Vacation",
  "Food Recommendations",
  "Transport Guide",
];

export const FLOATING_CARDS = [
  { icon: "🧳", label: "Trip Planning" },
  { icon: "📍", label: "Nearby Places" },
  { icon: "🛡", label: "Safety Tips" },
];

export const SAMPLE_CONVERSATION = [
  {
    id: 1,
    role: "user",
    text: "Suggest places to visit in Jaipur.",
  },
  {
    id: 2,
    role: "ai",
    text: "Here are the top picks for Jaipur:",
    list: ["Amber Fort", "Hawa Mahal", "Jal Mahal", "City Palace"],
    footer: [
      { label: "Best time to visit", value: "Oct – Mar" },
      { label: "Estimated budget", value: "₹3,500 / day" },
    ],
  },
];

export const AI_FEATURES = [
  {
    icon: "🎯",
    title: "Personalized Planning",
    desc: "Itineraries tailored to your pace, budget, and interests.",
  },
  {
    icon: "⚡",
    title: "Real-time Suggestions",
    desc: "Live recommendations based on weather, crowds, and season.",
  },
  {
    icon: "🛡",
    title: "Safety Guidance",
    desc: "Instant access to local safety tips and emergency info.",
  },
  {
    icon: "✨",
    title: "Smart Recommendations",
    desc: "AI-curated stays, food, and experiences near you.",
  },
];
