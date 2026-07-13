export async function generateWithGroq(transcript) {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
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


  console.log("✅ Summary generated with Groq");

  
  return data.choices[0].message.content;
}