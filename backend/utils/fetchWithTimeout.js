// Same as fetch(), but aborts the request if it takes longer than
// timeoutMs. Without this, a slow/hanging AI provider could leave a
// request open indefinitely with no way for the user to know.
export async function fetchWithTimeout(url, options = {}, timeoutMs = 20000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error(`Request timed out after ${timeoutMs}ms: ${url}`);
    }

    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}
