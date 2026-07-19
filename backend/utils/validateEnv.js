const REQUIRED_ENV_VARS = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"];

export function validateEnv() {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  const hasAnyAiProvider =
    process.env.GEMINI_API_KEY ||
    process.env.GROQ_API_KEY ||
    process.env.OPENROUTER_API_KEY;

  if (!hasAnyAiProvider) {
    throw new Error(
      "At least one AI provider key is required (GEMINI_API_KEY, GROQ_API_KEY, or OPENROUTER_API_KEY)."
    );
  }
}
