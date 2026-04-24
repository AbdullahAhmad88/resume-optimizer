"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [resume, setResume] = useState("");
  const [job, setJob] = useState("");
  const [result, setResult] = useState("");
  const [displayed, setDisplayed] = useState("");
  const [loading, setLoading] = useState(false);

  const indexRef = useRef(0);

  const fillDemo = () => {
    setResume(`Ali Khan
Computer Science student with frontend experience. Built responsive websites using HTML, CSS, JavaScript and React.`);

    setJob(`Frontend Developer
Looking for React, JavaScript, CSS, teamwork, and problem-solving skills.`);
  };

  const optimize = async () => {
    if (!resume.trim() || !job.trim()) {
      setResult("❌ Please enter both fields");
      return;
    }

    setLoading(true);
    setResult("");
    setDisplayed("");

    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription: job }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");

      setResult(data.result);
    } catch (err) {
      setResult("❌ " + err.message);
    }

    setLoading(false);
  };

  // ✨ TYPEWRITER EFFECT
  useEffect(() => {
    if (!result) return;

    indexRef.current = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      if (indexRef.current >= result.length) {
        clearInterval(interval);
        return;
      }
      setDisplayed((prev) => prev + result[indexRef.current]);
      indexRef.current++;
    }, 5);

    return () => clearInterval(interval);
  }, [result]);

  const beforeScore = Number(result.match(/BEFORE SCORE:\s*(\d+)/)?.[1] ?? 60);
  const afterScore = Number(result.match(/AFTER SCORE:\s*(\d+)/)?.[1] ?? 85);

  // 🔥 PIE CHART (FIXED + SMOOTH)
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(afterScore, 0), 100);
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div style={{
      fontFamily: "system-ui",
      background: "linear-gradient(135deg,#eef2ff,#f8fafc)",
      minHeight: "100vh"
    }}>

      {/* HERO */}
      <div style={{
        textAlign: "center",
        padding: "90px 20px 60px"
      }}>
        <h1 style={{
          fontSize: "56px",
          fontWeight: "800",
          background: "linear-gradient(90deg,#6366f1,#7c3aed)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          AI Resume Optimizer
        </h1>

        <p style={{
          marginTop: "10px",
          color: "#64748b",
          fontSize: "18px"
        }}>
          Beat ATS systems & get more interviews 🚀
        </p>

        <button onClick={fillDemo} style={{
          marginTop: "20px",
          padding: "10px 22px",
          borderRadius: "999px",
          border: "none",
          background: "#6366f1",
          color: "white",
          fontWeight: "600",
          cursor: "pointer"
        }}>
          ⚡ Try Demo
        </button>
      </div>

      {/* MAIN CARD */}
      <div style={{ maxWidth: "1100px", margin: "auto", padding: "20px" }}>

        <div style={{
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.8)",
          borderRadius: "18px",
          padding: "25px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
        }}>

          <h3 style={{ marginBottom: "15px" }}>Paste your data</h3>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>

            <textarea
              placeholder="Your Resume..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              style={{
                flex: 1,
                minWidth: "300px",
                height: "180px",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0"
              }}
            />

            <textarea
              placeholder="Job Description..."
              value={job}
              onChange={(e) => setJob(e.target.value)}
              style={{
                flex: 1,
                minWidth: "300px",
                height: "180px",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0"
              }}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <button onClick={optimize} style={{
              marginTop: "20px",
              padding: "14px 40px",
              borderRadius: "12px",
              border: "none",
              fontWeight: "700",
              color: "white",
              background: "linear-gradient(90deg,#6366f1,#7c3aed)",
              cursor: "pointer",
              boxShadow: "0 10px 20px rgba(99,102,241,0.4)"
            }}>
              {loading ? "Processing..." : "⚡ Optimize Resume"}
            </button>
          </div>
        </div>

        {/* RESULT */}
        {displayed && (
          <div style={{
            marginTop: "25px",
            background: "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
          }}>

            {/* SCORE */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
              flexWrap: "wrap"
            }}>

              {/* CHART */}
              <div style={{ position: "relative", width: "140px", height: "140px" }}>
                <svg width="140" height="140">
                  <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    stroke="#e2e8f0"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    stroke="url(#grad)"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 70 70)"
                    style={{ transition: "stroke-dashoffset 1s ease" }}
                  />

                  <defs>
                    <linearGradient id="grad">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                </svg>

                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontWeight: "700",
                  fontSize: "20px"
                }}>
                  {afterScore}%
                </div>
              </div>

              {/* TEXT */}
              <div>
                <h2>ATS Score: {afterScore}/100</h2>
                <p style={{ color: "#64748b" }}>
                  Improved from {beforeScore}
                </p>
              </div>
            </div>

            {/* OUTPUT */}
            <pre style={{
              marginTop: "20px",
              background: "#f8fafc",
              padding: "15px",
              borderRadius: "12px",
              whiteSpace: "pre-wrap"
            }}>
              {displayed}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}