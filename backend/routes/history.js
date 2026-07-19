import express from "express";
import supabase from "../config/supabase.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

// GET /api/history?limit=20&offset=0
// The user id comes from the verified session, not the URL, so a
// user can only ever fetch their OWN history — previously anyone
// could pass any userId here and read someone else's summaries.
router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
    const offset = parseInt(req.query.offset, 10) || 0;

    const { data, error, count } = await supabase
      .from("user_summaries")
      .select(
        `
id,
video_id,
title,
channel,
thumbnail,
summary,
created_at
`,
        { count: "exact" }
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    res.json({
      success: true,
      history: data,
      pagination: { limit, offset, total: count },
    });
  })
);

// DELETE /api/history/:id
// Now scoped to the signed-in user's own rows (.eq("user_id", userId)).
// Previously this deleted ANY row matching :id with no ownership
// check at all — any user could delete any other user's summary.
router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("user_summaries")
      .delete()
      .eq("id", id)
      .eq("user_id", userId)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Summary not found or you don't have permission to delete it.",
      });
    }

    res.json({ success: true, message: "Summary deleted successfully" });
  })
);

export default router;
