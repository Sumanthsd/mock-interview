export function scoreInterview(questions, answers) {
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;

  const details = questions.map((q) => {
    const userAnswer = answers[q.id];

    if (q.type === "written") {
      const hasAnswer = typeof userAnswer === "string" && userAnswer.trim().length > 0;
      if (hasAnswer) {
        // Written answers require review in a production implementation.
        return { correct: true, userAnswer };
      }
      unanswered++;
      return { correct: false, userAnswer: "" };
    }

    if (userAnswer === undefined || userAnswer === null) {
      unanswered++;
      return { correct: false, userAnswer: null };
    }

    const isCorrect = userAnswer === q.answer;
    isCorrect ? correct++ : wrong++;
    return { correct: isCorrect, userAnswer };
  });

  const totalScored = questions.filter(q => q.type === "mcq").length;
  const percentage = totalScored ? Math.round((correct / totalScored) * 100) : 0;

  return {
    correct,
    wrong,
    unanswered,
    total: questions.length,
    percentage,
    details
  };
}