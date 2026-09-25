const KEY = "qa_mock_interview_attempts";

export function getLocalAttempts(candidate = "") {
  try {
    const all = JSON.parse(localStorage.getItem(KEY) || "[]");
    return all.filter(a => !candidate || a.candidate.toLowerCase() === candidate.toLowerCase())
      .sort((a,b) => new Date(b.date) - new Date(a.date));
  } catch {
    return [];
  }
}

export function saveLocalAttempt(payload) {
  const all = JSON.parse(localStorage.getItem(KEY) || "[]");
  const score = payload.score;
  all.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    candidate: payload.candidate,
    mode: payload.config.mode,
    testType: payload.config.testType,
    correct: score.correct,
    total: score.total,
    percentage: score.percentage,
    date: payload.date
  });
  localStorage.setItem(KEY, JSON.stringify(all.slice(0, 100)));
}