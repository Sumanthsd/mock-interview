import React from "react";

export default function Header({ candidate, onHome, onAdmin }) {
  return (
    <header className="topbar">
      <div className="brand" onClick={onHome}>
        <div className="brand-mark">QA</div>
        <div>
          <strong>QA Mock Interview</strong>
          <small>Manual • Automation • Programming</small>
        </div>
      </div>
      <div className="header-actions">
        {candidate && <span className="candidate-pill">{candidate}</span>}
        <button className="link-button" onClick={onHome}>Home</button>
        <button className="link-button" onClick={onAdmin}>Admin</button>
      </div>
    </header>
  );
}