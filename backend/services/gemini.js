import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateSummary(text) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

 const prompt = `
You are BriefTube AI.

Your job is to convert a YouTube transcript into clean, easy-to-read study notes.

Return ONLY valid Markdown.

Follow this structure EXACTLY.

# Executive Summary

Write a concise summary in 3-5 sentences.

# Key Points

- Write 5-8 important bullet points.
- Each point should be one sentence.

# Key Takeaways

- Write 3-5 practical lessons.
- Keep each takeaway short.

# Quick Summary

Write a 2-3 sentence version that can be read in under 30 seconds.

# Action Items

- Write 3-5 actions the reader can apply immediately.

Rules:

- Return ONLY Markdown.
- Do NOT use emojis.
- Do NOT use code blocks.
- Do NOT wrap the response in triple backticks.
- Every heading must start with "# ".
- Every bullet must start with "- ".
- Leave exactly one blank line after every heading.
- Keep the formatting consistent.

Transcript:

${text}
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}