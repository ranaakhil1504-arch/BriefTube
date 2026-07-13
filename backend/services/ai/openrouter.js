const MODELS = [
  "openai/gpt-oss-20b:free",
    "meta-llama/llama-3.3-70b-instruct:free",
  "google/gemma-2-9b-it:free",
  
  "qwen/qwen3-coder:free",
];

export async function generateWithOpenRouter(transcript) {
  for (const model of MODELS) {
    try {
      console.log(`🚀 Trying OpenRouter model: ${model}`);

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            messages: [
              {
                role: "system",
                content:
                  "You are an expert YouTube summarizer. Produce a structured summary with Executive Summary, Key Points, Key Takeaways, Quick Summary and Action Items.",
              },
              {
                role: "user",
                content: transcript,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();

      console.log(`✅ Success with ${model}`);

      return data.choices[0].message.content;

    } catch (err) {
      console.log(`❌ ${model} failed`);
    }
  }

  throw new Error("All OpenRouter models failed.");
}