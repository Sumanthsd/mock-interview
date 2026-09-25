import React, { useMemo, useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import InterviewSetup from "./pages/InterviewSetup";
import Interview from "./pages/Interview";
import Result from "./pages/Result";
import AdminDashboard from "./pages/AdminDashboard";
import { buildInterview } from "./utils/questionUtils";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [candidate, setCandidate] = useState("");
  const [config, setConfig] = useState(null);
  const [interview, setInterview] = useState(null);
  const [result, setResult] = useState(null);

  const startInterview = (setup) => {
    const built = buildInterview(setup);
    setConfig(setup);
    setInterview(built);
    setScreen("interview");
  };

  const finishInterview = (answers) => {
    setResult({ candidate, config, interview, answers });
    setScreen("result");
  };

  const resetToHome = () => {
    setConfig(null);
    setInterview(null);
    setResult(null);
    setScreen("home");
  };

  return (
    <div className="app-shell">
      <Header
        candidate={candidate}
        onHome={resetToHome}
        onAdmin={() => setScreen("admin")}
      />
      <main className="container">
        {screen === "home" && (
          <Home
            candidate={candidate}
            setCandidate={setCandidate}
            onStart={() => setScreen("setup")}
            onAdmin={() => setScreen("admin")}
          />
        )}
        {screen === "setup" && (
          <InterviewSetup
            candidate={candidate}
            onBack={() => setScreen("home")}
            onStart={startInterview}
          />
        )}
        {screen === "interview" && interview && (
          <Interview
            candidate={candidate}
            config={config}
            interview={interview}
            onFinish={finishInterview}
            onExit={resetToHome}
          />
        )}
        {screen === "result" && result && (
          <Result result={result} onHome={resetToHome} />
        )}
        {screen === "admin" && (
          <AdminDashboard onBack={() => setScreen("home")} />
        )}
      </main>
    </div>
  );
}