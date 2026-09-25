import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed"
    });
  }

  try {
    if (!process.env.DATABASE_URL) {
      return res.status(503).json({
        ok: false,
        shared: false,
        error: "DATABASE_URL is not configured for this deployment"
      });
    }

    const sql = neon(process.env.DATABASE_URL);
    const payload = req.body;

    if (!payload) {
      return res.status(400).json({
        error: "Request body is missing"
      });
    }

    const {
      candidate,
      interviewType,
      section,
      mode,
      difficulty,
      score,
      correct,
      total,
      failed,
      durationSeconds,
      timeUp,
      failedQuestions,
      answers
    } = payload;

    if (!candidate) {
      return res.status(400).json({
        error: "Candidate Name is Required"
      });
    }

    const result = await sql`
      INSERT INTO interview_attempts (
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
        answers
      )
      VALUES (
               ${candidate},
               ${interviewType || ""},
               ${section || ""},
               ${mode || ""},
               ${difficulty || "Medium"},
               ${Number(score) || 0},
               ${Number(correct) || 0},
               ${Number(total) || 0},
               ${Number(failed) || 0},
               ${Number(durationSeconds) || 0},
               ${Boolean(timeUp)},
               ${JSON.stringify(failedQuestions || [])}::jsonb,
               ${JSON.stringify(answers || [])}::jsonb
             )
        RETURNING id, created_at
    `;

    console.log("Interview Attempt Saved:", result[0]);

    return res.status(200).json({
      ok: true,
      shared: true,
      attempt: result[0]
    });

  } catch (error) {
    console.error("SUBMIT ERROR:", error);

    return res.status(500).json({
      ok: false,
      shared: false,
      error: "Failed to save Interview Attempt"
    });
  }
}
