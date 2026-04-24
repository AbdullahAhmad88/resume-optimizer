"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [resume, setResume] = useState("");
  const [job, setJob] = useState("");
  const [result, setResult] = useState("");
  const [displayed, setDisplayed] = useState("");
  const [loading, setLoading] = useState(false);

  // 🚀 DEMO FILL
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume,
          jobDescription: job,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }

      setResult(data.result);
    } catch (err) {
      setResult("❌ " + err.message);
    }

    setLoading(false);
  };

  // ✨ TYPEWRITER
  useEffect(() => {
    if (!result) return;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + result[i]);
      i++;
      if (i >= result.length) clearInterval(interval);
    }, 8);

    return () => clearInterval(interval);
  }, [result]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert("Copied!");
  };

  const downloadText = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "optimized_resume.txt";
    a.click();
  };

  return (
    <div style={{ fontFamily: "system-ui", background: "#f8fafc", color: "#0f172a" }}>
      
      {/* ANIMATIONS */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid #cbd5f5;
          border-top: 3px solid #2563eb;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          display: inline-block;
          margin-right: 8px;
        }
      `}</style>

      {/* HERO */}
      <section style={{ textAlign: "center", padding: "120px 20px 80px", animation: "fadeUp 0.8s ease" }}>
        
        <h1 style={{
          fontSize: "56px",
          fontWeight: "800",
          maxWidth: "900px",
          margin: "auto",
          lineHeight: "1.1"
        }}>
          AI Resume Optimizer

          <span style={{
            display: "block",
            background: "linear-gradient(90deg,#2563eb,#7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Demo Version
          </span>
        </h1>

        <p style={{ marginTop: "16px", fontSize: "18px", color: "#475569" }}>
          Try how AI improves resumes instantly. Full AI coming soon.
        </p>

        <button
          onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}
          style={{
            marginTop: "24px",
            padding: "14px 32px",
            background: "linear-gradient(90deg,#2563eb,#4f46e5)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600",
            boxShadow: "0 10px 25px rgba(37,99,235,0.3)"
          }}
        >
          ⚡ Try Demo →
        </button>

        <p style={{ marginTop: "10px", color: "#64748b" }}>
          🚀 Demo version — no signup required
        </p>
      </section>

      {/* TOOL */}
      <section style={{ maxWidth: "1100px", margin: "auto", padding: "40px 20px" }}>
        <div style={{
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          animation: "fadeUp 1s ease"
        }}>
          
          {/* DEMO BUTTON */}
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            <button
              onClick={fillDemo}
              style={{
                padding: "10px 20px",
                background: "#0ea5e9",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              ⚡ Try Demo Instantly
            </button>
          </div>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <textarea
              placeholder="Paste your resume..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              style={{ flex: 1, minWidth: "300px", height: "200px", padding: "12px" }}
            />

            <textarea
              placeholder="Paste job description..."
              value={job}
              onChange={(e) => setJob(e.target.value)}
              style={{ flex: 1, minWidth: "300px", height: "200px", padding: "12px" }}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              onClick={optimize}
              disabled={loading}
              style={{
                marginTop: "20px",
                padding: "14px 30px",
                background: loading ? "#94a3b8" : "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "600"
              }}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Processing...
                </>
              ) : (
                "⚡ Run Demo Optimization"
              )}
            </button>
          </div>
        </div>

        {/* RESULT */}
        {displayed && (
          <div style={{
            marginTop: "30px",
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            animation: "fadeUp 0.6s ease"
          }}>
            <div style={{ marginBottom: "10px" }}>
              <button onClick={copyToClipboard}>📋 Copy</button>
              <button onClick={downloadText} style={{ marginLeft: "10px" }}>
                ⬇ Download
              </button>
            </div>

            <pre style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
              {displayed
                .replace(/BEFORE SCORE:/g, "🔴 BEFORE SCORE:")
                .replace(/AFTER SCORE:/g, "🟢 AFTER SCORE:")}
            </pre>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "40px",
        textAlign: "center",
        background: "#0f172a",
        color: "#cbd5f5"
      }}>
        <p><b>Abdullah Ahmad</b></p>
        <p>abdullahahmadmirza@gmail.com</p>
        <p>Demo Version • AI Upgrade Coming Soon</p>
      </footer>
    </div>
  );
}