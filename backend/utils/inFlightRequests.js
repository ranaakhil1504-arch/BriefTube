const inFlight = new Map();

// If two users request a summary for the same brand-new (uncached)
// video at the same moment, this makes the second one wait for the
// first's in-progress work instead of triggering its own duplicate
// transcript fetch + paid AI call.
export function dedupe(key, fn) {
  if (inFlight.has(key)) {
    return inFlight.get(key);
  }

  const promise = fn().finally(() => {
    inFlight.delete(key);
  });

  inFlight.set(key, promise);

  return promise;
}
