import React from "react";

export default function ScoreCard({ score }) {
  return (
    <div className="score-grid">
      <div><strong>{score.correct}</strong><span>Correct</span></div>
      <div><strong>{score.wrong}</strong><span>Wrong</span></div>
      <div><strong>{score.unanswered}</strong><span>Unanswered</span></div>
      <div><strong>{score.percentage}%</strong><span>Score</span></div>
    </div>
  );
}