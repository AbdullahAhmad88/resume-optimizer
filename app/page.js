"use client";
import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0a0a0f;
    --paper: #faf9f6;
    --cream: #f2efe8;
    --gold: #c9a84c;
    --gold-light: #e8d5a3;
    --violet: #4a3f7a;
    --violet-light: #7b6fb0;
    --muted: #7a7670;
    --border: #ddd9d0;
  }

  body { background: var(--paper); color: var(--ink); font-family: 'DM Sans', sans-serif; }

  .page { min-height: 100vh; position: relative; overflow-x: hidden; }

  .hero {
    position: relative;
    text-align: center;
    padding: 80px 20px 60px;
    border-bottom: 1px solid var(--border);
  }

  .hero-label {
    display: inline-block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    border: 1px solid var(--gold-light);
    padding: 5px 14px;
    border-radius: 999px;
    margin-bottom: 28px;
  }

  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(42px, 8vw, 80px);
    font-weight: 900;
    line-height: 1.05;
    color: var(--ink);
    margin-bottom: 20px;
  }

  .hero h1 em {
    font-style: italic;
    color: var(--violet);
  }

  .hero-sub {
    font-size: clamp(15px, 3vw, 17px);
    color: var(--muted);
    font-weight: 300;
    max-width: 480px;
    margin: 0 auto 36px;
    line-height: 1.7;
  }

  .demo-btn {
    background: var(--ink);
    color: var(--paper);
    border: none;
    padding: 12px 28px;
    border-radius: 999px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: background 0.2s, transform 0.15s;
  }

  .demo-btn:hover { background: var(--violet); transform: translateY(-1px); }

  .main { max-width: 1000px; margin: 0 auto; padding: 60px 20px; position: relative; z-index: 1; }

  .input-card {
    background: white;
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 40px;
    margin-bottom: 24px;
    box-shadow: 0 2px 20px rgba(0,0,0,0.04);
  }

  .input-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
  }

  .section-num {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--ink);
    color: var(--paper);
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--ink);
  }

  .textareas {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  @media (max-width: 640px) { .textareas { grid-template-columns: 1fr; } }

  .field-wrap { display: flex; flex-direction: column; gap: 8px; }

  .field-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
  }

  textarea {
    width: 100%;
    height: 200px;
    padding: 16px;
    border: 1px solid var(--border);
    border-radius: 4px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    line-height: 1.6;
    color: var(--ink);
    background: var(--paper);
    resize: vertical;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }

  textarea:focus {
    border-color: var(--violet);
    box-shadow: 0 0 0 3px rgba(74,63,122,0.08);
  }

  textarea::placeholder { color: #bbb5aa; }

  .optimize-btn {
    display: block;
    width: 100%;
    margin-top: 24px;
    padding: 18px;
    background: var(--violet);
    color: white;
    border: none;
    border-radius: 4px;
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    font-style: italic;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    position: relative;
    overflow: hidden;
  }

  .optimize-btn:hover:not(:disabled) { background: var(--ink); transform: translateY(-1px); }
  .optimize-btn:disabled { opacity: 0.7; cursor: not-allowed; }

  .optimize-btn .shimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
    transform: translateX(-100%);
    animation: shimmer 1.8s infinite;
  }

  @keyframes shimmer { to { transform: translateX(100%); } }

  .result-card {
    background: white;
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 2px 20px rgba(0,0,0,0.04);
    animation: fadeUp 0.5s ease;
  }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

  .score-bar {
    background: var(--ink);
    padding: 32px 40px;
    display: flex;
    align-items: center;
    gap: 32px;
    flex-wrap: wrap;
  }

  .score-item { text-align: center; }

  .score-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    margin-bottom: 6px;
  }

  .score-value {
    font-family: 'Playfair Display', serif;
    font-size: 52px;
    font-weight: 900;
    color: white;
    line-height: 1;
  }

  .score-value.gold { color: var(--gold); }
  .score-divider { width: 1px; height: 60px; background: rgba(255,255,255,0.12); flex-shrink: 0; }
  .score-arrow { font-size: 24px; color: rgba(255,255,255,0.3); flex-shrink: 0; }

  .score-note {
    color: rgba(255,255,255,0.6);
    font-size: 14px;
    line-height: 1.6;
    flex: 1;
    min-width: 140px;
  }

  .score-note strong { color: var(--gold); font-weight: 600; }

  .output-section { padding: 36px 40px; }

  .output-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .output-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }

  pre {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    line-height: 1.8;
    color: var(--ink);
    white-space: pre-wrap;
    word-break: break-word;
    background: var(--paper);
    padding: 24px;
    border-radius: 4px;
    border: 1px solid var(--border);
  }

  .section { max-width: 1000px; margin: 0 auto; padding: 0 20px 70px; }

  .section-header { text-align: center; margin-bottom: 48px; }

  .section-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 12px;
  }

  .section-heading {
    font-family: 'Playfair Display', serif;
    font-size: clamp(28px, 5vw, 42px);
    font-weight: 900;
    color: var(--ink);
  }

  .steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
  }

  @media (max-width: 700px) { .steps { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 420px) { .steps { grid-template-columns: 1fr; } }

  .step {
    padding: 32px 24px;
    border-right: 1px solid var(--border);
    background: white;
    transition: background 0.2s;
  }

  .step:last-child { border-right: none; }
  .step:hover { background: var(--cream); }

  .step-icon { font-size: 28px; margin-bottom: 16px; }

  .step-num {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: var(--gold);
    margin-bottom: 8px;
  }

  .step-title {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 8px;
  }

  .step-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  @media (max-width: 700px) { .features-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 420px) { .features-grid { grid-template-columns: 1fr; } }

  .feature {
    background: white;
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 28px 24px;
    transition: border-color 0.2s, transform 0.15s;
  }

  .feature:hover { border-color: var(--violet-light); transform: translateY(-2px); }
  .feature-icon { font-size: 24px; margin-bottom: 14px; }
  .feature-title { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; margin-bottom: 6px; color: var(--ink); }
  .feature-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }

  .faq-list { display: flex; flex-direction: column; gap: 2px; max-width: 720px; margin: 0 auto; }

  .faq-item {
    background: white;
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
  }

  .faq-q {
    width: 100%;
    background: none;
    border: none;
    padding: 20px 24px;
    text-align: left;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    color: var(--ink);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    transition: background 0.2s;
  }

  .faq-q:hover { background: var(--cream); }
  .faq-chevron { font-size: 18px; color: var(--muted); transition: transform 0.25s; flex-shrink: 0; }
  .faq-chevron.open { transform: rotate(180deg); }

  .faq-a {
    padding: 16px 24px 20px;
    font-size: 14px;
    color: var(--muted);
    line-height: 1.7;
    border-top: 1px solid var(--border);
  }

  .footer {
    border-top: 1px solid var(--border);
    text-align: center;
    padding: 40px 20px;
    color: var(--muted);
    font-size: 13px;
    line-height: 1.8;
  }

  .footer strong { color: var(--ink); font-weight: 600; }
`;

const faqs = [
  { q: "What is an ATS score?", a: "ATS stands for Applicant Tracking System. Most companies filter resumes through ATS software before a human ever sees them. Your score measures how well your resume matches the job description." },
  { q: "Is my resume data saved?", a: "No. Your resume and job description are only used to generate the optimized result and are never stored on our servers." },
  { q: "How accurate is the AI optimization?", a: "Our AI uses advanced keyword analysis to match your resume to the job description. Optimized resumes statistically perform better in ATS filters." },
  { q: "Can I use this for any job type?", a: "Yes! Whether you're in tech, marketing, finance, healthcare, or any field — it works by matching your resume to any job description you provide." },
];

export default function Home() {
  const [resume, setResume] = useState("");
  const [job, setJob] = useState("");
  const [result, setResult] = useState("");
  const [displayed, setDisplayed] = useState("");
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const indexRef = useRef(0);

  const fillDemo = () => {
    setResume(`Ali Khan\nComputer Science student with frontend experience. Built responsive websites using HTML, CSS, JavaScript and React.`);
    setJob(`Frontend Developer\nLooking for React, JavaScript, CSS, teamwork, and problem-solving skills.`);
  };

  const optimize = async () => {
    if (!resume.trim() || !job.trim()) { setResult("❌ Please enter both fields"); return; }
    setLoading(true); setResult(""); setDisplayed("");
    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription: job }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setResult(data.result);
    } catch (err) { setResult("❌ " + err.message); }
    setLoading(false);
  };

  useEffect(() => {
    if (!result) return;
    indexRef.current = 0; setDisplayed("");
    const interval = setInterval(() => {
      if (indexRef.current >= result.length) { clearInterval(interval); return; }
      setDisplayed((prev) => prev + result[indexRef.current]);
      indexRef.current++;
    }, 5);
    return () => clearInterval(interval);
  }, [result]);

  const beforeScore = Number(result.match(/BEFORE SCORE:\s*(\d+)/)?.[1] ?? 60);
  const afterScore = Number(result.match(/AFTER SCORE:\s*(\d+)/)?.[1] ?? 85);
  const radius = 36;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (Math.min(afterScore, 100) / 100) * circ;

  return (
    <>
      <style>{styles}</style>
      <div className="page">

        {/* HERO */}
        <div className="hero">
          <div className="hero-label">✦ AI-Powered · Free · Instant</div>
          <h1>Resume that<br /><em>gets noticed</em></h1>
          <p className="hero-sub">
            Beat ATS filters and land more interviews with AI-powered resume optimization tailored to every job.
          </p>
          <button className="demo-btn" onClick={fillDemo}>Try with demo data →</button>
        </div>

        {/* INPUT */}
        <div className="main">
          <div className="input-card">
            <div className="input-card-header">
              <div className="section-num">1</div>
              <div className="section-title">Paste your details</div>
            </div>
            <div className="textareas">
              <div className="field-wrap">
                <div className="field-label">Your Resume</div>
                <textarea placeholder="Paste your current resume here..." value={resume} onChange={(e) => setResume(e.target.value)} />
              </div>
              <div className="field-wrap">
                <div className="field-label">Job Description</div>
                <textarea placeholder="Paste the job listing here..." value={job} onChange={(e) => setJob(e.target.value)} />
              </div>
            </div>
            <button className="optimize-btn" onClick={optimize} disabled={loading}>
              {loading && <span className="shimmer" />}
              {loading ? "Analyzing your resume..." : "Optimize My Resume"}
            </button>
          </div>

          {/* RESULT */}
          {displayed && (
            <div className="result-card">
              <div className="score-bar">
                <div className="score-item">
                  <div className="score-label">Before</div>
                  <div className="score-value">{beforeScore}</div>
                </div>
                <div className="score-arrow">→</div>
                <div className="score-item">
                  <div className="score-label">After</div>
                  <div className="score-value gold">{afterScore}</div>
                </div>
                <div className="score-divider" />
                <svg width="90" height="90" style={{flexShrink: 0}}>
                  <circle cx="45" cy="45" r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth="7" fill="none" />
                  <circle cx="45" cy="45" r={radius} stroke="#c9a84c" strokeWidth="7" fill="none"
                    strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
                    transform="rotate(-90 45 45)" style={{ transition: "stroke-dashoffset 1.2s ease" }}
                  />
                  <text x="45" y="50" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="'Playfair Display', serif">{afterScore}%</text>
                </svg>
                <div className="score-note">
                  <strong>+{afterScore - beforeScore} points</strong> improvement<br />ATS compatibility score
                </div>
              </div>
              <div className="output-section">
                <div className="output-label">Optimized Resume</div>
                <pre>{displayed}</pre>
              </div>
            </div>
          )}
        </div>

        {/* HOW IT WORKS */}
        <div className="section">
          <div className="section-header">
            <div className="section-eyebrow">The Process</div>
            <div className="section-heading">How It Works</div>
          </div>
          <div className="steps">
            {[
              { icon: "📋", step: "Step 01", title: "Paste Resume", desc: "Copy and paste your current resume into the input field." },
              { icon: "🎯", step: "Step 02", title: "Add Job Post", desc: "Paste the job listing you want to apply for." },
              { icon: "⚡", step: "Step 03", title: "AI Analyzes", desc: "AI scans for keyword gaps and ATS compatibility issues." },
              { icon: "✅", step: "Step 04", title: "Get Results", desc: "Receive a tailored resume with a higher ATS score." },
            ].map((item) => (
              <div className="step" key={item.step}>
                <div className="step-icon">{item.icon}</div>
                <div className="step-num">{item.step}</div>
                <div className="step-title">{item.title}</div>
                <div className="step-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <div className="section">
          <div className="section-header">
            <div className="section-eyebrow">Why Choose Us</div>
            <div className="section-heading">Built for job seekers</div>
          </div>
          <div className="features-grid">
            {[
              { icon: "🤖", title: "AI-Powered", desc: "Smart keyword matching tailored to each specific job listing." },
              { icon: "📊", title: "ATS Score", desc: "Know your chances before you hit submit." },
              { icon: "⚡", title: "Instant Results", desc: "Optimize in seconds, not hours." },
              { icon: "🔒", title: "Private & Secure", desc: "Your data is never stored or shared." },
              { icon: "🌍", title: "Any Industry", desc: "Works for all job types and fields worldwide." },
              { icon: "💡", title: "Tips Included", desc: "Actionable suggestions to improve your resume further." },
            ].map((f) => (
              <div className="feature" key={f.title}>
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="section">
          <div className="section-header">
            <div className="section-eyebrow">FAQ</div>
            <div className="section-heading">Common questions</div>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div className="faq-item" key={i}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <span className={`faq-chevron ${openFaq === i ? "open" : ""}`}>⌄</span>
                </button>
                {openFaq === i && <div className="faq-a">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="footer">
          <p>© {new Date().getFullYear()} <strong>AI Resume Optimizer</strong> · All rights reserved.</p>
          <p>Built with care to help you land your dream job.</p>
        </div>

      </div>
    </>
  );
}