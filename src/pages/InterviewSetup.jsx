import React, { useState } from "react";

const sections = [
  ["manual", "Manual QA", "Testing fundamentals, test design, defects, Agile and scenarios."],
  ["automation", "Automation", "Selenium, Playwright, frameworks, waits, POM and CI/CD."],
  ["programming", "Programming", "Java fundamentals, collections, OOP and coding problems."],
  ["api", "API Testing", "REST, HTTP, authentication, validation and API automation."],
  ["general", "General QA", "General QA knowledge and practical engineering questions."]
];

export default function InterviewSetup({ candidate, onBack, onStart }) {
  const [mode, setMode] = useState("automation");
  const [testType, setTestType] = useState("mcq");
  const [selected, setSelected] = useState(["manual", "automation", "programming", "api", "general"]);
  const [count, setCount] = useState(15);

  const toggle = (id) => {
    setSelected((old) => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);
  };

  const submit = () => {
    const finalSections = mode === "both"
      ? selected
      : selected.filter(s => mode === "automation" ? ["automation", "programming", "api", "general"].includes(s) : s === "manual");
    onStart({ mode, testType, sections: finalSections.length ? finalSections : ["general"], count });
  };

  return (
    <div className="setup panel">
      <div className="page-heading">
        <div><span className="eyebrow">INTERVIEW SETUP</span><h1>Configure the interview</h1><p>Candidate: <b>{candidate}</b></p></div>
        <button className="secondary" onClick={onBack}>← Back</button>
      </div>

      <h3>Choose coverage</h3>
      <div className="choice-grid">
        {[
          ["manual", "Manual", "Manual QA only"],
          ["automation", "Automation", "Automation-focused"],
          ["both", "Both", "Manual + Automation"]
        ].map(([id, title, desc]) => (
          <button key={id} className={`choice ${mode === id ? "active" : ""}`} onClick={() => setMode(id)}>
            <b>{title}</b><span>{desc}</span>
          </button>
        ))}
      </div>

      <h3>Answer format</h3>
      <div className="choice-grid three">
        {[
          ["mcq", "Multiple Choice", "Select one answer"],
          ["written", "Write Answer", "Explain in your own words"],
          ["mixed", "Both", "MCQ + written questions"]
        ].map(([id, title, desc]) => (
          <button key={id} className={`choice ${testType === id ? "active" : ""}`} onClick={() => setTestType(id)}>
            <b>{title}</b><span>{desc}</span>
          </button>
        ))}
      </div>

      <h3>Sections</h3>
      <div className="section-select">
        {sections.map(([id, title, desc]) => (
          <label key={id} className={`section-option ${selected.includes(id) ? "checked" : ""}`}>
            <input type="checkbox" checked={selected.includes(id)} onChange={() => toggle(id)} />
            <span><b>{title}</b><small>{desc}</small></span>
          </label>
        ))}
      </div>

      <div className="setup-footer">
        <label className="field-label">Approximate questions</label>
        <select value={count} onChange={(e) => setCount(Number(e.target.value))}>
          <option value={10}>10</option><option value={15}>15</option><option value={20}>20</option><option value={25}>25</option>
        </select>
        <button className="primary" onClick={submit}>Start Interview →</button>
      </div>
    </div>
  );
}