export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  const candidate = req.query?.candidate || "";
  // TODO: SELECT candidate-specific attempts from Neon.
  return res.status(200).json({ candidate, attempts: [] });
}