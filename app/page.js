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
        padding: "60px 16px 40px"
      }}>
        <h1 style={{
          fontSize: "clamp(32px, 8vw, 56px)",
          fontWeight: "800",
          background: "linear-gradient(90deg,#6366f1,#7c3aed)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: "1.2",
          margin: "0 0 10px"
        }}>
          AI Resume Optimizer
        </h1>

        <p style={{
          marginTop: "10px",
          color: "#64748b",
          fontSize: "clamp(15px, 4vw, 18px)",
          padding: "0 10px"
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
          cursor: "pointer",
          fontSize: "15px"
        }}>
          ⚡ Try Demo
        </button>
      </div>

      {/* MAIN CARD */}
      <div style={{ maxWidth: "1100px", margin: "auto", padding: "0 16px 20px" }}>

        <div style={{
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.8)",
          borderRadius: "18px",
          padding: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
        }}>

          <h3 style={{ marginBottom: "15px", marginTop: 0 }}>Paste your data</h3>

          <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <textarea
                placeholder="Your Resume..."
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: "min(300px, 100%)",
                  width: "100%",
                  height: "180px",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  resize: "vertical"
                }}
              />

              <textarea
                placeholder="Job Description..."
                value={job}
                onChange={(e) => setJob(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: "min(300px, 100%)",
                  width: "100%",
                  height: "180px",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  resize: "vertical"
                }}
              />
            </div>
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
              boxShadow: "0 10px 20px rgba(99,102,241,0.4)",
              fontSize: "16px",
              width: "100%",
              maxWidth: "320px"
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
            padding: "20px",
            borderRadius: "18px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
          }}>

            {/* SCORE */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
              justifyContent: "center"
            }}>

              {/* CHART */}
              <div style={{ position: "relative", width: "140px", height: "140px", flexShrink: 0 }}>
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
              <div style={{ textAlign: "center" }}>
                <h2 style={{ margin: "0 0 6px" }}>ATS Score: {afterScore}/100</h2>
                <p style={{ color: "#64748b", margin: 0 }}>
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
              whiteSpace: "pre-wrap",
              fontSize: "clamp(12px, 3.5vw, 14px)",
              overflowX: "auto",
              wordBreak: "break-word"
            }}>
              {displayed}
            </pre>
          </div>
        )}
      </div>

      {/* ───────────────── HOW IT WORKS ───────────────── */}
      <div style={{
        maxWidth: "1100px",
        margin: "40px auto 0",
        padding: "0 16px 20px"
      }}>
        <div style={{
          background: "white",
          borderRadius: "18px",
          padding: "30px 20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
        }}>
          <h2 style={{
            textAlign: "center",
            fontSize: "clamp(22px, 5vw, 30px)",
            fontWeight: "800",
            background: "linear-gradient(90deg,#6366f1,#7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginTop: 0,
            marginBottom: "30px"
          }}>
            How It Works
          </h2>

          <div style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center"
          }}>
            {[
              { step: "1", icon: "📋", title: "Paste Your Resume", desc: "Copy and paste your current resume text into the input field." },
              { step: "2", icon: "🎯", title: "Add Job Description", desc: "Paste the job listing you want to apply for." },
              { step: "3", icon: "⚡", title: "AI Analyzes", desc: "Our AI scans for keyword matches and ATS compatibility." },
              { step: "4", icon: "✅", title: "Get Optimized", desc: "Receive a tailored resume with improved ATS score." },
            ].map((item) => (
              <div key={item.step} style={{
                flex: "1",
                minWidth: "200px",
                maxWidth: "240px",
                textAlign: "center",
                padding: "20px 16px",
                borderRadius: "14px",
                background: "#f8fafc",
                border: "1px solid #e2e8f0"
              }}>
                <div style={{ fontSize: "32px", marginBottom: "10px" }}>{item.icon}</div>
                <div style={{
                  display: "inline-block",
                  background: "linear-gradient(90deg,#6366f1,#7c3aed)",
                  color: "white",
                  borderRadius: "999px",
                  width: "24px",
                  height: "24px",
                  lineHeight: "24px",
                  fontSize: "13px",
                  fontWeight: "700",
                  marginBottom: "8px"
                }}>
                  {item.step}
                </div>
                <h4 style={{ margin: "8px 0 6px", fontSize: "16px" }}>{item.title}</h4>
                <p style={{ margin: 0, color: "#64748b", fontSize: "14px", lineHeight: "1.5" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ───────────────── FEATURES ───────────────── */}
      <div style={{
        maxWidth: "1100px",
        margin: "30px auto 0",
        padding: "0 16px 20px"
      }}>
        <div style={{
          background: "linear-gradient(135deg,#6366f1,#7c3aed)",
          borderRadius: "18px",
          padding: "30px 20px",
          boxShadow: "0 10px 30px rgba(99,102,241,0.3)"
        }}>
          <h2 style={{
            textAlign: "center",
            fontSize: "clamp(22px, 5vw, 30px)",
            fontWeight: "800",
            color: "white",
            marginTop: 0,
            marginBottom: "24px"
          }}>
            Why Use AI Resume Optimizer?
          </h2>

          <div style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center"
          }}>
            {[
              { icon: "🤖", title: "AI-Powered", desc: "Smart keyword matching tailored to each job" },
              { icon: "📊", title: "ATS Score", desc: "Know your chances before you apply" },
              { icon: "⚡", title: "Instant Results", desc: "Optimize in seconds, not hours" },
              { icon: "🔒", title: "Private & Secure", desc: "Your data is never stored" },
              { icon: "🌍", title: "Any Industry", desc: "Works for all job types and fields" },
              { icon: "💡", title: "Tips Included", desc: "Actionable suggestions to improve further" },
            ].map((f) => (
              <div key={f.title} style={{
                flex: "1",
                minWidth: "150px",
                maxWidth: "180px",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "14px",
                padding: "18px 14px",
                textAlign: "center",
                backdropFilter: "blur(6px)"
              }}>
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>{f.icon}</div>
                <h4 style={{ color: "white", margin: "0 0 6px", fontSize: "15px" }}>{f.title}</h4>
                <p style={{ color: "rgba(255,255,255,0.8)", margin: 0, fontSize: "13px", lineHeight: "1.4" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ───────────────── FAQ ───────────────── */}
      <div style={{
        maxWidth: "1100px",
        margin: "30px auto 0",
        padding: "0 16px 20px"
      }}>
        <div style={{
          background: "white",
          borderRadius: "18px",
          padding: "30px 20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
        }}>
          <h2 style={{
            textAlign: "center",
            fontSize: "clamp(22px, 5vw, 30px)",
            fontWeight: "800",
            background: "linear-gradient(90deg,#6366f1,#7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginTop: 0,
            marginBottom: "24px"
          }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "720px", margin: "0 auto" }}>
            {[
              { q: "What is an ATS score?", a: "ATS stands for Applicant Tracking System. Most companies use ATS software to filter resumes before a human ever sees them. Your ATS score measures how well your resume matches the job description." },
              { q: "Is my resume data saved?", a: "No. Your resume and job description are only used to generate the optimized result and are never stored on our servers." },
              { q: "How accurate is the AI optimization?", a: "Our AI uses advanced keyword analysis to match your resume to the job description. While no tool guarantees a job, optimized resumes statistically perform better in ATS filters." },
              { q: "Can I use this for any job type?", a: "Yes! Whether you're applying for tech, marketing, finance, healthcare, or any other field, the optimizer works by matching your resume to any job description you provide." },
            ].map((faq, i) => (
              <div key={i} style={{
                padding: "16px 18px",
                borderRadius: "12px",
                background: "#f8fafc",
                border: "1px solid #e2e8f0"
              }}>
                <h4 style={{ margin: "0 0 8px", fontSize: "15px", color: "#1e293b" }}>❓ {faq.q}</h4>
                <p style={{ margin: 0, color: "#64748b", fontSize: "14px", lineHeight: "1.6" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ───────────────── FOOTER ───────────────── */}
      <div style={{
        textAlign: "center",
        padding: "40px 16px 30px",
        color: "#94a3b8",
        fontSize: "14px"
      }}>
        <p style={{ margin: 0 }}>© {new Date().getFullYear()} AI Resume Optimizer. All rights reserved.</p>
        <p style={{ margin: "6px 0 0" }}>Built with ❤️ to help you land your dream job.</p>
      </div>

    </div>
  );
}