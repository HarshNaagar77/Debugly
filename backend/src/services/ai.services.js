const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getResponse(prompt) {
  const chatCompletion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
      {
        role: "system",
        content: `
        You are an expert programming code reviewer. For the given code, respond with a detailed review using markdown formatting for maximum readability. Always use:
        - Headings for each section (## Suggestions, ## Improved Code, ## Time and Space Complexities, ## Personalized Learning Links)
        - Fenced code blocks for all code (e.g., \`\`\`python)
        - Tables for suggestions and complexity analysis
        - Bulleted or numbered lists for suggestions
        Do not return any JSON. Only return markdown-formatted text as described above.`,
      },
        ],
        });

    // Just return the markdown response from the LLM
    return chatCompletion.choices[0].message.content;
}

module.exports = getResponse;
