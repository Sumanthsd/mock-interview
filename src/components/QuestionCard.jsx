import React from "react";

export default function QuestionCard({
  question, index, total, value, onChange
}) {
  return (
    <section className="question-card">
      <div className="question-meta">
        <span>Question {index + 1} of {total}</span>
        <span className={`difficulty ${question.difficulty}`}>{question.difficulty}</span>
      </div>
      <h2>{question.question}</h2>

      {question.type === "mcq" ? (
        <div className="options">
          {question.options.map((option, i) => (
            <label key={option} className={`option ${value === i ? "selected" : ""}`}>
              <input
                type="radio"
                name={`question-${question.id}`}
                checked={value === i}
                onChange={() => onChange(i)}
              />
              <span className="option-letter">{String.fromCharCode(65 + i)}</span>
              <span>{option}</span>
            </label>
          ))}
        </div>
      ) : (
        <textarea
          className="answer-box"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your answer here..."
          rows={8}
        />
      )}
    </section>
  );
}