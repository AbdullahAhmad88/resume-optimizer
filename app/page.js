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
Computer Science student with basic web development skills. Built projects using HTML, CSS, and JavaScript.`);
    
    setJob(`Junior Frontend Developer
Looking for HTML, CSS, JavaScript, React.`);
  };

  const optimize = async () => {
    if (!resume.trim() || !job.trim()) {
      setResult("❌ Please enter both resume and job description");
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
    }, 6);

    return () => clearInterval(interval);
  }, [result]);

  const beforeScore = Number(result.match(/BEFORE SCORE:\s*(\d+)/)?.[1] ?? 60);
  const afterScore = Number(result.match(/AFTER SCORE:\s*(\d+)/)?.[1] ?? 85);

  // 🎯 PIE CHART LOGIC
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (afterScore / 100) * circumference;

  return (
    <div style={{ fontFamily: "system-ui", background: "#f1f5f9", minHeight: "100vh" }}>
      
      {/* HERO */}
      <div style={{
        textAlign: "center",
        padding: "80px 20px",
        background: "linear-gradient(180deg,#eef2ff,#f8fafc)"
      }}>
        <h1 style={{ fontSize: "50px", fontWeight: "800" }}>
          Resume Optimizer
        </h1>

        <p style={{
          marginTop: "12px",
          color: "#64748b",
          maxWidth: "600px",
          marginInline: "auto"
        }}>
          Improve your resume instantly with AI.
        </p>

        <button onClick={fillDemo} style={{
          marginTop: "18px",
          padding: "10px 20px",
          background: "#6366f1",
          color: "white",
          border: "none",
          borderRadius: "999px"
        }}>
          ⚡ Try Demo
        </button>
      </div>

      {/* MAIN */}
      <div style={{ maxWidth: "1100px", margin: "auto", padding: "20px" }}>
        
        <div style={{
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
        }}>

          <h3>Enter Details</h3>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "15px" }}>

            <textarea
              placeholder="Resume..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              style={{
                flex: 1,
                minWidth: "300px",
                height: "180px",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ddd"
              }}
            />

            <textarea
              placeholder="Job description..."
              value={job}
              onChange={(e) => setJob(e.target.value)}
              style={{
                flex: 1,
                minWidth: "300px",
                height: "180px",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ddd"
              }}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <button onClick={optimize} style={{
              marginTop: "20px",
              padding: "14px 40px",
              background: "linear-gradient(90deg,#6366f1,#7c3aed)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontWeight: "700"
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
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
          }}>
            
            {/* SCORE + CHART */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
              flexWrap: "wrap"
            }}>
              
              {/* PIE CHART */}
              <div style={{ position: "relative", width: "150px", height: "150px" }}>
                <svg width="150" height="150">
                  <circle
                    cx="75"
                    cy="75"
                    r={radius}
                    stroke="#e2e8f0"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="75"
                    cy="75"
                    r={radius}
                    stroke="#6366f1"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 75 75)"
                    style={{ transition: "stroke-dashoffset 1s ease" }}
                  />
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

            {/* RESULT TEXT */}
            <pre style={{
              marginTop: "20px",
              background: "#f8fafc",
              padding: "15px",
              borderRadius: "10px",
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