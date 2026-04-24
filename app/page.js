"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [resume, setResume] = useState("");
  const [job, setJob] = useState("");
  const [result, setResult] = useState("");
  const [displayed, setDisplayed] = useState("");
  const [loading, setLoading] = useState(false);

  const fillDemo = () => {
    setResume(`Ali Khan
Computer Science student with basic web development skills. Built small projects using HTML, CSS, and JavaScript. Interested in frontend development and problem solving.`);

    setJob(`Junior Frontend Developer

We are looking for someone with HTML, CSS, JavaScript, and React knowledge. Must have problem-solving skills and teamwork ability.`);
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

  const indexRef = useRef(0);

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
    }, 8);

    return () => clearInterval(interval);
  }, [result]);

  const beforeScore = result.match(/BEFORE SCORE:\s*(\d+)/)?.[1] ?? "60";
  const afterScore = result.match(/AFTER SCORE:\s*(\d+)/)?.[1] ?? "85";

  return (
    <div style={{ fontFamily: "system-ui", background: "#f8fafc", color: "#0f172a" }}>
      
      {/* 🔥 HERO (UPGRADED) */}
      <section style={{
        textAlign: "center",
        padding: "100px 20px 60px",
        background: "linear-gradient(180deg,#f8fafc,#eef2ff)"
      }}>
        <h1 style={{
          fontSize: "56px",
          fontWeight: "800",
          lineHeight: "1.1"
        }}>
          Resume Optimizer
          <span style={{
            display: "block",
            background: "linear-gradient(90deg,#6366f1,#7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Powered by AI
          </span>
        </h1>

        <p style={{
          marginTop: "18px",
          fontSize: "18px",
          color: "#64748b",
          maxWidth: "600px",
          marginInline: "auto"
        }}>
          Analyze your resume against any job description and instantly improve your chances of getting hired.
        </p>

        <button style={{
          marginTop: "22px",
          padding: "10px 22px",
          background: "rgba(124,58,237,0.1)",
          color: "#6d28d9",
          border: "1px solid rgba(124,58,237,0.2)",
          borderRadius: "999px",
          fontWeight: "600",
          backdropFilter: "blur(8px)"
        }}>
          ⚡ Demo Mode
        </button>
      </section>

      {/* MAIN CARD */}
      <section style={{ maxWidth: "1100px", margin: "auto", padding: "20px" }}>
        <div style={{
          background: "white",
          padding: "25px",
          borderRadius: "18px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
        }}>

          {/* HEADER */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3>Paste your content below</h3>

            <button onClick={fillDemo} style={{
              padding: "8px 14px",
              background: "#0ea5e9",
              color: "white",
              borderRadius: "8px",
              border: "none"
            }}>
              ⚡ Load Example
            </button>
          </div>

          {/* INPUTS */}
          <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>

            <div style={{
              flex: 1,
              minWidth: "300px",
              background: "#f8fafc",
              borderRadius: "16px",
              padding: "14px",
              border: "1px solid #e2e8f0"
            }}>
              <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "6px" }}>
                📄 YOUR RESUME
              </div>
              <textarea
                placeholder="Paste your resume here..."
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                style={{
                  width: "100%",
                  height: "180px",
                  border: "none",
                  outline: "none",
                  background: "transparent"
                }}
              />
            </div>

            <div style={{
              flex: 1,
              minWidth: "300px",
              background: "#f8fafc",
              borderRadius: "16px",
              padding: "14px",
              border: "1px solid #e2e8f0"
            }}>
              <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "6px" }}>
                💼 JOB DESCRIPTION
              </div>
              <textarea
                placeholder="Paste job description..."
                value={job}
                onChange={(e) => setJob(e.target.value)}
                style={{
                  width: "100%",
                  height: "180px",
                  border: "none",
                  outline: "none",
                  background: "transparent"
                }}
              />
            </div>
          </div>

          {/* BUTTON */}
          <div style={{ textAlign: "center" }}>
            <button onClick={optimize} style={{
              marginTop: "25px",
              padding: "16px 40px",
              background: "linear-gradient(90deg,#6366f1,#7c3aed)",
              color: "white",
              borderRadius: "14px",
              border: "none",
              fontWeight: "700",
              boxShadow: "0 10px 25px rgba(99,102,241,0.4)"
            }}>
              {loading ? "Processing..." : "⚡ Run AI Optimization →"}
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
            <h2>ATS Score: {afterScore}/100</h2>
            <p style={{ color: "#64748b" }}>Improved from {beforeScore}</p>

            <pre style={{
              marginTop: "15px",
              background: "#f1f5f9",
              padding: "15px",
              borderRadius: "10px"
            }}>
              {displayed}
            </pre>
          </div>
        )}
      </section>
    </div>
  );
}