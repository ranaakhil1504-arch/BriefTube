import logger from "../utils/logger.js";

export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

// Every route now funnels errors here via asyncHandler, instead of
// each route formatting its own error response.
export function errorHandler(err, req, res, next) {
  logger.error(err.message, { path: req.originalUrl, stack: err.stack });

  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: status === 500 ? "Something went wrong." : err.message,
  });
}
