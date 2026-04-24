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
Computer Science student with basic web development skills. Built projects using HTML, CSS, and JavaScript. Interested in frontend development.`);
    
    setJob(`Junior Frontend Developer
Looking for HTML, CSS, JavaScript, React. Must have teamwork and problem-solving skills.`);
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

  const beforeScore = result.match(/BEFORE SCORE:\s*(\d+)/)?.[1] ?? "60";
  const afterScore = result.match(/AFTER SCORE:\s*(\d+)/)?.[1] ?? "85";

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
          Improve your resume instantly with AI and increase your chances of getting hired.
        </p>

        <button onClick={fillDemo} style={{
          marginTop: "18px",
          padding: "10px 20px",
          background: "#6366f1",
          color: "white",
          border: "none",
          borderRadius: "999px",
          cursor: "pointer"
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

          <h3 style={{ marginBottom: "15px" }}>Enter Details</h3>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>

            {/* RESUME */}
            <textarea
              placeholder="Paste your resume..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              style={{
                flex: 1,
                minWidth: "300px",
                height: "180px",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #cbd5f5"
              }}
            />

            {/* JOB */}
            <textarea
              placeholder="Paste job description..."
              value={job}
              onChange={(e) => setJob(e.target.value)}
              style={{
                flex: 1,
                minWidth: "300px",
                height: "180px",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #cbd5f5"
              }}
            />
          </div>

          {/* BUTTON */}
          <div style={{ textAlign: "center" }}>
            <button onClick={optimize} style={{
              marginTop: "20px",
              padding: "14px 40px",
              background: "linear-gradient(90deg,#6366f1,#7c3aed)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontWeight: "700",
              cursor: "pointer"
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
            
            {/* SCORE CARD */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px"
            }}>
              <h2>ATS Score: {afterScore}/100</h2>
              <span style={{ color: "#64748b" }}>
                Improved from {beforeScore}
              </span>
            </div>

            {/* RESULT TEXT */}
            <pre style={{
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