// Wraps an async route handler so any thrown error / rejected promise
// is passed to next(err), instead of needing a try/catch block in
// every single route.
export function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}
