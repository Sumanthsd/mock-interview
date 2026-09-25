import React, { useState } from "react";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import { scoreInterview } from "../utils/scoring";
import { saveLocalAttempt } from "../utils/storage";
import { submitAttempt } from "../services/attemptService";

export default function Interview({
                                    candidate,
                                    config,
                                    interview,
                                    onFinish,
                                    onExit
                                  }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const question = interview[index];

  const setAnswer = (value) => {
    setAnswers((a) => ({
      ...a,
      [question.id]: value
    }));
  };

  const next = async () => {
    // Go to the next question
    if (index < interview.length - 1) {
      setIndex(index + 1);
      return;
    }

    // Last question - calculate the result
    const score = scoreInterview(interview, answers);

    // Build list of failed/unanswered questions
    const failedQuestions = interview
        .map((question, questionIndex) => {
          const detail = score.details[questionIndex];

          if (!detail.correct) {
            return {
              id: question.id,
              question: question.question,
              type: question.type,
              correctAnswer: question.answer ?? null,
              userAnswer: detail.userAnswer
            };
          }

          return null;
        })
        .filter(Boolean);

    // Payload sent to Vercel API -> Neon
    const payload = {
      candidate: candidate,

      interviewType: config?.testType || "",
      section: config?.sections?.join(",") || "",
      mode: config?.mode || "",
      difficulty: config?.difficulty || "Medium",

      score: score.percentage,
      correct: score.correct,
      total: score.total,
      failed: score.wrong + score.unanswered,

      durationSeconds: 0,
      timeUp: false,

      failedQuestions: failedQuestions,

      answers: answers
    };

    console.log("Submitting interview attempt:", payload);

    // Keep local history working
    saveLocalAttempt({
      candidate,
      config,
      questions: interview,
      answers,
      score,
      date: new Date().toISOString()
    });

    // Save to Neon through Vercel API
    const sharedResult = await submitAttempt(payload);

    console.log("Shared Neon submission:", sharedResult);

    // Finish the interview
    onFinish(answers);
  };

  return (
      <div className="interview-layout">
        <section>
          <div className="panel compact">
            <div className="interview-top">
              <div>
                <b>{candidate}</b>
                <span>
                {config?.mode} • {config?.testType}
              </span>
              </div>

              <button
                  className="link-button"
                  onClick={onExit}
              >
                Exit
              </button>
            </div>

            <ProgressBar
                current={index + 1}
                total={interview.length}
            />
          </div>

          <QuestionCard
              question={question}
              index={index}
              total={interview.length}
              value={answers[question.id]}
              onChange={setAnswer}
          />

          <div className="nav-buttons">
            <button
                className="secondary"
                disabled={index === 0}
                onClick={() => setIndex(index - 1)}
            >
              ← Previous
            </button>

            <button
                className="primary"
                onClick={next}
            >
              {index === interview.length - 1
                  ? "Submit Interview"
                  : "Next →"}
            </button>
          </div>
        </section>

        <aside className="panel tips">
          <h3>Interview tips</h3>

          <ul>
            <li>
              Read the whole question before answering.
            </li>

            <li>
              For scenarios, explain your reasoning and
              validation approach.
            </li>

            <li>
              Do not use browser Back during the interview.
            </li>

            <li>
              Your result is calculated after submission.
            </li>
          </ul>
        </aside>
      </div>
  );
}
