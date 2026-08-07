const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

/**
 * Generic JSON-mode chat call to Groq.
 * Always instructs the model to return ONLY valid JSON.
 */
const askGroqJSON = async (systemPrompt, userPrompt) => {
  const completion = await groq.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.6,
    response_format: { type: "json_object" },
  });

  const raw = completion.choices[0]?.message?.content || "{}";
  return JSON.parse(raw);
};

/**
 * Plain text chat call (used by chatbot later).
 */
const askGroqText = async (systemPrompt, userPrompt) => {
  const completion = await groq.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 300,
  });

  return completion.choices[0]?.message?.content?.trim() || "";
};

module.exports = { askGroqJSON, askGroqText };