import React from "react";
import { getLocalAttempts } from "../utils/storage";

export default function RecentAttempts({ candidate }) {
  const attempts = getLocalAttempts(candidate);
  return (
    <section className="panel">
      <div className="section-heading">
        <div><h3>Recent Attempts</h3><p>Attempts saved on this browser.</p></div>
      </div>
      {attempts.length === 0 ? (
        <div className="empty">No previous attempts for this candidate.</div>
      ) : (
        <div className="attempt-list">
          {attempts.slice(0, 8).map((a) => (
            <div className="attempt-row" key={a.id}>
              <div>
                <strong>{a.mode} • {a.testType}</strong>
                <small>{new Date(a.date).toLocaleString()}</small>
              </div>
              <div className="attempt-score">{a.correct}/{a.total} • {a.percentage}%</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}