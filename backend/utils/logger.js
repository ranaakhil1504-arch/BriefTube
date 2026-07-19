const LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };
const CURRENT_LEVEL = LEVELS[process.env.LOG_LEVEL] ?? LEVELS.info;

function log(level, message, meta) {
  if (LEVELS[level] > CURRENT_LEVEL) return;

  const entry = {
    time: new Date().toISOString(),
    level,
    message,
    ...(meta ? { meta } : {}),
  };

  const line = JSON.stringify(entry);

  if (level === "error") {
    console.error(line);
  } else if (level === "warn") {
    console.warn(line);
  } else {
    console.log(line);
  }
}

export default {
  error: (message, meta) => log("error", message, meta),
  warn: (message, meta) => log("warn", message, meta),
  info: (message, meta) => log("info", message, meta),
  debug: (message, meta) => log("debug", message, meta),
};
