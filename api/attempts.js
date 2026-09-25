export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  // TODO: Authenticate admin and SELECT attempts from Neon.
  return res.status(200).json([]);
}