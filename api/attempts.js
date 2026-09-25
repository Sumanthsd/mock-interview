import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    const rows = await sql`
      SELECT
        id,
        candidate_name,
        interview_type,
        section,
        mode,
        difficulty,
        score,
        correct,
        total,
        failed,
        duration_seconds,
        time_up,
        failed_questions,
        answers,
        created_at
      FROM interview_attempts
      ORDER BY created_at DESC
    `;

    return res.status(200).json(rows.map((row) => ({
      id: row.id,
      candidate: row.candidate_name,
      testType: row.interview_type,
      section: row.section,
      mode: row.mode,
      difficulty: row.difficulty,
      score: {
        percentage: Number(row.score) || 0,
        correct: Number(row.correct) || 0,
        total: Number(row.total) || 0,
        failed: Number(row.failed) || 0
      },
      durationSeconds: row.duration_seconds,
      timeUp: row.time_up,
      failedQuestions: row.failed_questions,
      answers: row.answers,
      createdAt: row.created_at
    })));
  } catch (error) {
    console.error("ATTEMPTS ERROR:", error);
    return res.status(500).json({ error: "Failed to fetch interview attempts" });
  }
}
