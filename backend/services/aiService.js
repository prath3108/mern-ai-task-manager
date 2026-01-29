const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const enhanceTask = async ({ title, description }) => {
  const prompt = `
You are a task planning assistant.

Return STRICT JSON only. No explanation.

Format:
{
  "improvedDescription": string,
  "suggestedPriority": "Low" | "Medium" | "High",
  "suggestedDueDate": "YYYY-MM-DD",
  "subtasks": string[]
}

Task title: ${title}
Task description: ${description || "N/A"}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3
  });

  const text = response.choices[0].message.content.trim();

  // Safety: ensure valid JSON
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error("AI returned invalid JSON");
  }
};

module.exports = { enhanceTask };
