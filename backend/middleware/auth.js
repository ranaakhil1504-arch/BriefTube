import supabase from "../config/supabase.js";

function extractToken(req) {
  const authHeader = req.headers.authorization || "";
  return authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
}

// Blocks the request unless a valid Supabase session token is present.
// Use on routes that must know exactly which user is calling (history).
export async function requireAuth(req, res, next) {
  try {
    const token = extractToken(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Missing or invalid Authorization header.",
      });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired session.",
      });
    }

    req.user = data.user;
    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Authentication check failed.",
    });
  }
}

// Attaches req.user if a valid token is present, but never blocks the
// request. Use on routes that work for guests too (summarize), where
// logged-in users just get extra behavior (saved history).
export async function attachUserIfPresent(req, res, next) {
  try {
    const token = extractToken(req);

    if (!token) {
      req.user = null;
      return next();
    }

    const { data, error } = await supabase.auth.getUser(token);

    req.user = !error && data?.user ? data.user : null;
    next();
  } catch {
    req.user = null;
    next();
  }
}
