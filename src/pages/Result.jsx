import React, { useMemo } from "react";
import ScoreCard from "../components/ScoreCard";
import { scoreInterview } from "../utils/scoring";

export default function Result({ result, onHome }) {
  const score = useMemo(
    () => scoreInterview(result.interview, result.answers),
    [result]
  );

  return (
    <div className="result">
      <section className="panel result-header">
        <span className="eyebrow">INTERVIEW COMPLETE</span>
        <h1>Results for {result.candidate}</h1>
        <p>{result.config.mode} • {result.config.testType}</p>
        <ScoreCard score={score} />
        <button className="primary" onClick={onHome}>Back to Main Screen</button>
      </section>

      <section className="panel">
        <h2>Review Answers</h2>
        {result.interview.map((q, i) => {
          const r = score.details[i];
          return (
            <div className={`review ${r.correct ? "correct" : "wrong"}`} key={q.id}>
              <div className="review-title">
                <b>Q{i + 1}. {q.question}</b>
                <span>{r.correct ? "Correct" : "Wrong"}</span>
              </div>
              {q.type === "mcq" && (
                <>
                  <p><b>Your answer:</b> {r.userAnswer ?? "Not answered"}</p>
                  <p><b>Correct answer:</b> {q.options[q.answer]}</p>
                </>
              )}
              <p className="explanation"><b>Why:</b> {q.explanation}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}