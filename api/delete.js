export default async function handler(req, res) {
  if (req.method !== "DELETE") return res.status(405).json({ error: "Method not allowed" });
  // TODO: Verify admin session and delete the requested attempt from Neon.
  return res.status(200).json({ ok: true });
}