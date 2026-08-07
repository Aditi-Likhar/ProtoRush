const Destination = require("../models/Destination");
const asyncHandler = require("../middleware/asyncHandler");
const { askGroqJSON } = require("../services/groqService");

// Fallback: formula-based match score if Groq is unavailable (keeps demo safe)
const fallbackRank = (destinations, filters) => {
  return destinations
    .map((d) => {
      let score = 60;
      if (filters.budget && d.budget === filters.budget) score += 15;
      if (filters.preferredSeason && d.bestSeason === filters.preferredSeason)
        score += 10;
      if (
        filters.travelStyle &&
        d.travelStyle.includes(filters.travelStyle)
      )
        score += 10;
      if (filters.tripDuration && d.travelDuration === filters.tripDuration)
        score += 5;
      score = Math.min(score, 99);

      return {
        ...d.toObject(),
        aiMatchScore: score,
        aiReason: `This destination matches your ${
          filters.travelStyle || "travel"
        } style with a ${d.budget} budget, ideal for a ${
          d.travelDuration
        } trip during ${d.bestSeason}.`,
      };
    })
    .sort((a, b) => b.aiMatchScore - a.aiMatchScore);
};

// @desc    AI Concierge — ranked, explained recommendations
// @route   POST /api/recommendations/concierge
// @access  Public
const getConciergeRecommendations = asyncHandler(async (req, res) => {
  const {
    destinationType = "Any",
    budget,
    tripDuration,
    travelStyle,
    preferredSeason,
  } = req.body;

  // Step 1: Build a loose DB filter to get a candidate pool (not too strict —
  // we want Groq to have real options to rank, not zero results)
  const filter = {};
  if (destinationType && destinationType !== "Any type" && destinationType !== "Any") {
    filter.destinationType = destinationType;
  }

  let candidates = await Destination.find(filter).limit(20);

  // If too few candidates with strict filter, widen the pool
  if (candidates.length < 4) {
    candidates = await Destination.find().limit(20);
  }

  if (candidates.length === 0) {
    return res.status(200).json({ success: true, count: 0, data: [] });
  }

  const filters = { destinationType, budget, tripDuration, travelStyle, preferredSeason };

  let ranked;

  try {
    // Step 2: Send candidate destinations + user filters to Groq for ranking + reasoning
    const candidateSummary = candidates.map((d) => ({
      id: d._id.toString(),
      name: d.name,
      country: d.country,
      budget: d.budget,
      bestSeason: d.bestSeason,
      travelDuration: d.travelDuration,
      travelStyle: d.travelStyle,
      destinationType: d.destinationType,
      tags: d.tags,
    }));

    const systemPrompt = `You are a travel recommendation engine for "TravelMate AI".
You will receive a user's travel preferences and a list of real candidate destinations from a database.
Your job: rank the destinations by how well they fit the user's preferences, and write a short (max 25 words), specific, non-generic reason for each match referencing the destination's actual attributes.
Return ONLY valid JSON in this exact shape:
{
  "results": [
    { "id": "<destination id>", "aiMatchScore": <number 0-100>, "aiReason": "<short reason>" }
  ]
}
Rules:
- Only include destinations from the provided candidate list, using their exact "id".
- Order results by aiMatchScore descending.
- aiMatchScore must reflect genuine fit based on budget, season, duration, and travel style overlap.
- Do not invent destinations not in the candidate list.`;

    const userPrompt = `User preferences: ${JSON.stringify(filters)}

Candidate destinations: ${JSON.stringify(candidateSummary)}`;

    const aiResponse = await askGroqJSON(systemPrompt, userPrompt);
    const resultsMap = new Map(
      (aiResponse.results || []).map((r) => [r.id, r])
    );

    ranked = candidates
      .map((d) => {
        const aiData = resultsMap.get(d._id.toString());
        return {
          ...d.toObject(),
          aiMatchScore: aiData?.aiMatchScore ?? 70,
          aiReason:
            aiData?.aiReason ||
            `A strong fit based on your ${filters.travelStyle || "trip"} preferences.`,
        };
      })
      .sort((a, b) => b.aiMatchScore - a.aiMatchScore);
  } catch (err) {
    console.error("Groq concierge ranking failed, using fallback:", err.message);
    ranked = fallbackRank(candidates, filters);
  }

  res.status(200).json({
    success: true,
    count: ranked.length,
    data: ranked.slice(0, 6), // top 6 for the card grid
  });
});

// @desc    Get featured/top destinations (used for homepage without filters)
// @route   GET /api/recommendations/featured
// @access  Public
const getFeaturedDestinations = asyncHandler(async (req, res) => {
  const featured = await Destination.find({ isFeatured: true }).sort({
    popularity: -1,
  });

  res.status(200).json({ success: true, count: featured.length, data: featured });
});

// @desc    Create destination (used for seeding/admin)
// @route   POST /api/recommendations
// @access  Public
const createDestination = asyncHandler(async (req, res) => {
  const destination = await Destination.create(req.body);
  res.status(201).json({ success: true, data: destination });
});

module.exports = {
  getConciergeRecommendations,
  getFeaturedDestinations,
  createDestination,
};