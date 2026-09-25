import React from "react";
import RecentAttempts from "../components/RecentAttempts";

export default function Home({ candidate, setCandidate, onStart, onAdmin }) {
  return (
    <div className="home-grid">
      <section className="hero panel">
        <span className="eyebrow">INTERVIEW PRACTICE PLATFORM</span>
        <h1>QA Automation Mock Interview</h1>
        <p className="hero-copy">
          Practice Manual QA, Automation, Selenium, Playwright, API, Java,
          CI/CD, SQL and real-world testing scenarios.
        </p>

        <label className="field-label">Who is taking the test?</label>
        <input
          className="text-input"
          value={candidate}
          onChange={(e) => setCandidate(e.target.value)}
          placeholder="Enter candidate name"
        />

        <div className="hero-actions">
          <button className="primary" disabled={!candidate.trim()} onClick={onStart}>
            Start Mock Interview
          </button>
          <button className="secondary" onClick={onAdmin}>Owner Dashboard</button>
        </div>

        <div className="feature-grid">
          <div><b>MCQ</b><span>Randomized options</span></div>
          <div><b>Written</b><span>Scenario answers</span></div>
          <div><b>Both</b><span>Mixed interview</span></div>
          <div><b>Review</b><span>Why answers are correct</span></div>
        </div>
      </section>
      <RecentAttempts candidate={candidate} />
    </div>
  );
}