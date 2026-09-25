import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    // Read the existing table without assuming optional column names beyond
    // the columns used by the submit endpoint. This preserves compatibility
    // with the user's existing Neon schema.
    const rows = await sql`
      SELECT *
      FROM interview_attempts
      ORDER BY id DESC
    `;

    return res.status(200).json(rows.map((row) => ({
      id: row.id,
      candidate: row.candidate_name ?? row.candidate ?? "",
      testType: row.interview_type ?? row.test_type ?? "",
      section: row.section,
      mode: row.mode,
      difficulty: row.difficulty,
      score: {
        percentage: Number(row.score) || 0,
        correct: Number(row.correct) || 0,
        total: Number(row.total) || 0,
        failed: Number(row.failed) || 0
      },
      durationSeconds: row.duration_seconds ?? row.durationSeconds ?? 0,
      timeUp: row.time_up ?? row.timeUp ?? false,
      failedQuestions: row.failed_questions,
      answers: row.answers,
      createdAt: row.created_at ?? row.createdAt ?? null
    })));
  } catch (error) {
    console.error("ATTEMPTS ERROR:", error);
    return res.status(500).json({
      error: "Failed to fetch interview attempts",
      detail: error.message
    });
  }
}
