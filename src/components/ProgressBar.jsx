import React from "react";

export default function ProgressBar({ current, total }) {
  const percent = Math.round((current / total) * 100);
  return (
    <div className="progress-wrap">
      <div className="progress-label">
        <span>Progress</span><span>{percent}%</span>
      </div>
      <div className="progress"><div style={{ width: `${percent}%` }} /></div>
    </div>
  );
}