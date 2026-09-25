export function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing Environment Variable: ${name}`);
  return value;
}

export function isAdminRequest(req) {
  // Replace with your production session/token verification.
  // Never expose ADMIN_PASSWORD or ADMIN_TOKEN_SECRET to the browser.
  return req.headers["x-admin-token"] === process.env.ADMIN_TOKEN_SECRET;
}