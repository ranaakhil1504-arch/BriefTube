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
You are an expert YouTube video summarizer.

Summarize the following transcript in clear bullet points.

Transcript:

${text}
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}