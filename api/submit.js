export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // TODO: Insert payload into your Neon PostgreSQL table.
  // Keep DATABASE_URL server-side only.
  const payload = req.body;
  if (!payload?.candidate || !payload?.score) {
    return res.status(400).json({ error: "Invalid attempt payload" });
  }

  // This starter endpoint acknowledges the request.
  // Replace with your Neon INSERT once your schema is finalized.
  return res.status(200).json({ ok: true, shared: true });
}