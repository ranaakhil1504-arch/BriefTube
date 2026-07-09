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

Return ONLY valid Markdown.

The format MUST be exactly like this:

# 📌 Overview

Write 2-3 sentences here.

# 🎯 Key Points

- Point one
- Point two
- Point three
- Point four
- Point five

# 💡 Key Takeaways

- Lesson one
- Lesson two
- Lesson three

# ⚡ 30-Second Summary

Write one short paragraph.

IMPORTANT RULES:

- Put ONE BLANK LINE after every heading.
- Never put paragraph text on the same line as a heading.
- Every bullet MUST start with "- ".
- Return ONLY Markdown.
- No introduction.
- No conclusion.
- No code block.
- Do not wrap the Markdown in triple backticks.

Transcript:
console.log(result.response.text());
${text}
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}