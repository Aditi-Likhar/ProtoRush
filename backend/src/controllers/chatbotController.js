const asyncHandler = require("../middleware/asyncHandler");
const { askGroqText } = require("../services/groqService");

// Kept as a safety-net fallback if Groq API fails (rate limit, no internet, etc.)
const knowledgeBase = [
  {
    keywords: ["hotel", "stay", "accommodation"],
    reply:
      "I can help you find places to stay! Based on your destination, I recommend checking budget-friendly stays near city centers for easy access to attractions.",
  },
  {
    keywords: ["food", "eat", "restaurant", "cuisine"],
    reply:
      "Great choice exploring local food! Try the most popular local restaurants near your current location — check the Nearby Attractions section for options.",
  },
  {
    keywords: ["transport", "bus", "metro", "taxi", "travel"],
    reply:
      "For getting around, check the Smart Transportation section — it shows real-time options like Metro, Bus, Taxi, and Bike Rentals with estimated time and price.",
  },
  {
    keywords: ["safe", "safety", "emergency", "police", "hospital"],
    reply:
      "Your safety matters! Visit the Safety & Emergency section for nearby police stations, hospitals, and helpline numbers available 24x7.",
  },
  {
    keywords: ["budget", "cheap", "cost", "price"],
    reply:
      "Looking for budget-friendly options? I can filter recommendations by low budget — just let me know your destination and I'll suggest the best value spots.",
  },
  {
    keywords: ["weather", "season", "climate"],
    reply:
      "Weather can make or break a trip! Check the recommendation cards — each destination lists the best season to visit along with current weather info.",
  },
  {
    keywords: ["hi", "hello", "hey"],
    reply:
      "Hey there! 👋 I'm your AI travel assistant. Ask me about attractions, transport, safety, or budget-friendly recommendations for your trip!",
  },
];

const defaultReply =
  "I'm still learning! Try asking me about nearby attractions, transport options, safety tips, or travel recommendations.";

const fallbackReply = (message) => {
  const lowerMsg = message.toLowerCase();
  const match = knowledgeBase.find((entry) =>
    entry.keywords.some((keyword) => lowerMsg.includes(keyword))
  );
  return match ? match.reply : defaultReply;
};

// @desc    Handle chatbot message via Groq, with keyword fallback
// @route   POST /api/chatbot
// @access  Public
const handleChatMessage = asyncHandler(async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message || typeof message !== "string") {
    res.status(400);
    throw new Error("Message is required and must be a string");
  }

  let botReply;
  let source = "groq";

  try {
    const systemPrompt = `You are the AI travel assistant for "TravelMate AI", a smart travel companion app.
Answer the user's travel-related question helpfully and concisely (max 60 words).
Cover topics like: destinations, attractions, transport options, safety tips, budgeting, and trip planning.
If asked something completely unrelated to travel, politely redirect to travel topics.
Keep a warm, helpful, concierge-like tone. Do not use markdown formatting.`;

    // Include limited recent history for context, if provided
    const historyContext = history
      .slice(-4)
      .map((h) => `${h.role === "user" ? "User" : "Assistant"}: ${h.content}`)
      .join("\n");

    const userPrompt = historyContext
      ? `${historyContext}\nUser: ${message}`
      : message;

    botReply = await askGroqText(systemPrompt, userPrompt);

    if (!botReply) throw new Error("Empty response from Groq");
  } catch (err) {
    console.error("Groq chatbot failed, using fallback:", err.message);
    botReply = fallbackReply(message);
    source = "fallback";
  }

  res.status(200).json({
    success: true,
    data: {
      userMessage: message,
      botReply,
      source, // "groq" or "fallback" — useful for you to verify which path was used during testing
      timestamp: new Date().toISOString(),
    },
  });
});

module.exports = { handleChatMessage };