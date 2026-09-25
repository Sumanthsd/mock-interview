import React, { useState } from "react";
import { getAdminAttempts } from "../services/attemptService";

export default function AdminDashboard({ onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

  const login = async () => {
    // Production implementation should call /api/admin-login.
    // This UI deliberately does not hard-code admin credentials.
    setLoggedIn(true);
    setMessage("Demo dashboard mode. Connect /api/admin-login to your Neon-backed authentication.");
    setAttempts(await getAdminAttempts());
  };

  if (!loggedIn) return (
    <section className="panel admin-login">
      <button className="secondary" onClick={onBack}>← Back</button>
      <h1>Owner Dashboard</h1>
      <p>Admin credentials are supplied through Vercel environment variables.</p>
      <input className="text-input" placeholder="Admin email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="text-input" type="password" placeholder="Admin password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="primary" onClick={login}>Sign in</button>
      {message && <p className="notice">{message}</p>}
    </section>
  );

  return (
    <section className="panel">
      <div className="page-heading">
        <div><span className="eyebrow">OWNER</span><h1>Interview Dashboard</h1></div>
        <button className="secondary" onClick={onBack}>← Home</button>
      </div>
      <p className="notice">{message}</p>
      {attempts.length === 0 ? <div className="empty">No API results returned yet. Connect the endpoint to Neon.</div> :
        <div className="attempt-list">{attempts.map((a, i) => (
          <div className="attempt-row" key={a.id || i}>
            <div><strong>{a.candidate}</strong><small>{a.mode} • {a.testType}</small></div>
            <div className="attempt-score">{a.score?.correct ?? 0}/{a.score?.total ?? 0}</div>
          </div>
        ))}</div>}
    </section>
  );
}