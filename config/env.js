function readBoolean(value, defaultValue) {
  if (value === undefined) {
    return defaultValue;
  }

  return value === 'true';
}

const port = Number(process.env.PORT || 3000);

const env = {
  baseURL: process.env.BASE_URL || `http://127.0.0.1:${port}`,
  port,
  headless: readBoolean(process.env.HEADLESS, true)
};

module.exports = { env };
