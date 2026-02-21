import { useEffect, useRef, useState } from "react";

// ─── SITE CONFIG & DATA ──────────────────────────────────────────────────────

const siteConfig = {
  name: "TechEra",
  tagline: "CONNECT · INNOVATE · BUILD",
  heroHeadline: "The Community Where Builders Belong",
  heroSubline:
    "TechEra is a student-led tech community organizing events, hackathons, workshops, and collaborations that shape the next generation of innovators.",
  ctaJoin: "Join TechEra",
  ctaExplore: "Explore Events",
  missionTitle: "Why TechEra Exists",
  missionDescription:
    "We believe every student deserves access to a powerful network, real-world experience, and the encouragement to build without limits. TechEra is that place.",
};

const founders = [
  {
    id: 1,
    name: "Aryan Mehta",
    role: "Founder & Visionary",
    bio: "Full-stack developer and community builder passionate about democratizing tech education across India.",
    initials: "AM",
    github: "#",
    linkedin: "#",
    twitter: "#",
    tag: "Founder",
    accentColor: "#00EEFF",
    borderColor: "rgba(0,238,255,0.25)",
    glowColor: "rgba(0,238,255,0.12)",
    gradStart: "#00EEFF",
    gradEnd: "#4F46E5",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Co-Founder & Design Lead",
    bio: "UI/UX designer turning complex problems into delightful digital experiences for growing communities.",
    initials: "PS",
    github: "#",
    linkedin: "#",
    twitter: "#",
    tag: "Co-Founder",
    accentColor: "#A78BFA",
    borderColor: "rgba(167,139,250,0.25)",
    glowColor: "rgba(167,139,250,0.12)",
    gradStart: "#4F46E5",
    gradEnd: "#A78BFA",
  },
  {
    id: 3,
    name: "Rohan Verma",
    role: "Co-Founder & Tech Lead",
    bio: "Open-source contributor and backend engineer building scalable systems that power TechEra's ecosystem.",
    initials: "RV",
    github: "#",
    linkedin: "#",
    twitter: "#",
    tag: "Co-Founder",
    accentColor: "#06B6D4",
    borderColor: "rgba(6,182,212,0.25)",
    glowColor: "rgba(6,182,212,0.12)",
    gradStart: "#A78BFA",
    gradEnd: "#00EEFF",
  },
];

const missionPoints = [
  {
    id: 1,
    icon: "⚡",
    title: "Connect",
    description:
      "Bridge the gap between passionate learners, experienced mentors, and industry leaders in a thriving network.",
    accentColor: "#00EEFF",
    hoverBorder: "rgba(0,238,255,0.3)",
    barGrad: "linear-gradient(#00EEFF,#4F46E5)",
  },
  {
    id: 2,
    icon: "🚀",
    title: "Innovate",
    description:
      "Host hackathons, workshops, and ideathons that push the boundaries of what student developers can build.",
    accentColor: "#4F46E5",
    hoverBorder: "rgba(79,70,229,0.4)",
    barGrad: "linear-gradient(#4F46E5,#A78BFA)",
  },
  {
    id: 3,
    icon: "🛠️",
    title: "Build",
    description:
      "From side projects to startups — we give members the resources, mentorship, and community to ship real products.",
    accentColor: "#A78BFA",
    hoverBorder: "rgba(167,139,250,0.3)",
    barGrad: "linear-gradient(#A78BFA,#00EEFF)",
  },
];

const stats = [
  { id: 1, value: "500+", label: "Members" },
  { id: 2, value: "30+", label: "Events" },
  { id: 3, value: "20+", label: "Collaborations" },
  { id: 4, value: "10+", label: "Departments" },
];

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Team", href: "#team" },
  { label: "Mission", href: "#mission" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#join" },
];

// ─── SVG ICONS ───────────────────────────────────────────────────────────────

const GitHubIcon = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const ArrowRight = ({ size = 16 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const ChevronRight = ({ size = 14 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .nav-link {
          padding: 8px 14px;
          border-radius: 10px;
          color: #64748B;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.2s;
          font-weight: 500;
        }
        .nav-link:hover { color: white; background: rgba(255,255,255,0.06); }
        .mobile-nav-link {
          display: block;
          padding: 12px 16px;
          border-radius: 12px;
          color: #94A3B8;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .mobile-nav-link:hover { color: white; background: rgba(255,255,255,0.05); }
        .join-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          color: #050D1A;
          background: linear-gradient(135deg, #00EEFF, #4F46E5);
          text-decoration: none;
          transition: all 0.3s;
        }
        .join-btn:hover { transform: scale(1.04); box-shadow: 0 0 24px rgba(0,238,255,0.35); }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .desktop-join { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        @media (min-width: 768px) {
          .mobile-toggle { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        transition: "all 0.4s",
        background: scrolled ? "rgba(5,13,26,0.93)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
      }}>
        <nav style={{ maxWidth: 1152, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#00EEFF,#4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 16px rgba(0,238,255,0.3)" }}>
              <span style={{ color: "#050D1A", fontWeight: 900, fontSize: 11, fontFamily: "monospace", letterSpacing: "0.05em" }}>TE</span>
            </div>
            <span style={{ fontWeight: 900, color: "white", fontSize: 18, letterSpacing: "-0.02em" }}>{siteConfig.name}</span>
          </a>

          {/* Desktop links */}
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a href="#join" className="join-btn desktop-join">Join Now <ArrowRight size={14} /></a>

          {/* Mobile toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setOpen(!open)}
            style={{ display: "none", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, width: 40, height: 40, background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
            aria-label="Toggle menu"
          >
            <span style={{ width: 22, height: 2, background: "#94A3B8", display: "block", borderRadius: 2, transition: "all 0.3s", transform: open ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ width: 22, height: 2, background: "#94A3B8", display: "block", borderRadius: 2, transition: "all 0.3s", opacity: open ? 0 : 1 }} />
            <span style={{ width: 22, height: 2, background: "#94A3B8", display: "block", borderRadius: 2, transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className="mobile-menu" style={{
          overflow: "hidden", maxHeight: open ? 400 : 0, transition: "max-height 0.35s ease",
          background: "rgba(10,22,40,0.97)", backdropFilter: "blur(20px)",
          borderTop: open ? "1px solid rgba(255,255,255,0.05)" : "none",
        }}>
          <div style={{ padding: "8px 16px 16px" }}>
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="mobile-nav-link" onClick={() => setOpen(false)}>{l.label}</a>
            ))}
            <a href="#join" onClick={() => setOpen(false)} style={{
              display: "block", marginTop: 12, padding: "13px", textAlign: "center",
              borderRadius: 14, fontWeight: 800, fontSize: 15, color: "#050D1A",
              background: "linear-gradient(135deg,#00EEFF,#4F46E5)", textDecoration: "none",
            }}>Join Now</a>
          </div>
        </div>
      </header>
    </>
  );
}

// ─── HERO SECTION ────────────────────────────────────────────────────────────

function HeroSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.5, alpha: Math.random() * 0.4 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,238,255,${p.alpha})`; ctx.fill();
      });
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 110) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,238,255,${0.06 * (1 - d / 110)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <>
      <style>{`
        @keyframes shimmer { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse-glow { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes scan-line { 0% { transform: translateY(-100vh); } 100% { transform: translateY(100vh); } }
        .hero-fade-1 { animation: fadeUp 0.7s ease-out 0.1s both; }
        .hero-fade-2 { animation: fadeUp 0.7s ease-out 0.25s both; }
        .hero-fade-3 { animation: fadeUp 0.7s ease-out 0.4s both; }
        .hero-fade-4 { animation: fadeUp 0.7s ease-out 0.55s both; }
        .hero-fade-5 { animation: fadeUp 0.7s ease-out 0.7s both; }
        .shimmer-text {
          background: linear-gradient(90deg, #00EEFF 0%, #4F46E5 40%, #A78BFA 70%, #00EEFF 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .hero-cta-primary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 32px; border-radius: 14px; font-weight: 800; font-size: 15px;
          color: #050D1A; background: linear-gradient(135deg,#00EEFF,#4F46E5);
          text-decoration: none; transition: all 0.3s;
        }
        .hero-cta-primary:hover { transform: scale(1.05); box-shadow: 0 0 40px rgba(0,238,255,0.4); }
        .hero-cta-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; border-radius: 14px; font-weight: 700; font-size: 15px;
          color: #00EEFF; border: 1px solid rgba(0,238,255,0.3); background: rgba(0,238,255,0.05);
          text-decoration: none; transition: all 0.3s; backdrop-filter: blur(8px);
        }
        .hero-cta-secondary:hover { border-color: rgba(0,238,255,0.6); background: rgba(0,238,255,0.1); transform: scale(1.03); }
        .stat-card {
          padding: 16px 8px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.05);
          background: rgba(255,255,255,0.02); text-align: center; cursor: default; transition: all 0.3s;
        }
        .stat-card:hover { border-color: rgba(0,238,255,0.2); background: rgba(0,238,255,0.05); }
        @media (max-width: 640px) {
          .hero-ctas { flex-direction: column !important; }
          .hero-cta-primary, .hero-cta-secondary { justify-content: center; width: 100%; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#050D1A" }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />

        {/* Glows */}
        <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translate(-50%,-50%)", width: "min(700px,90vw)", height: "min(700px,90vw)", borderRadius: "50%", background: "rgba(79,70,229,0.12)", filter: "blur(120px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "15%", width: "min(380px,50vw)", height: "min(380px,50vw)", borderRadius: "50%", background: "rgba(0,238,255,0.06)", filter: "blur(90px)", pointerEvents: "none" }} />

        {/* Grid */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(0,238,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,238,255,0.025) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Scan line */}
        <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(0,238,255,0.12),transparent)", animation: "scan-line 10s linear infinite", pointerEvents: "none" }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10, maxWidth: 900, margin: "0 auto", padding: "80px 20px 40px", textAlign: "center", width: "100%" }}>

          {/* Pill */}
          <div className="hero-fade-1" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, border: "1px solid rgba(0,238,255,0.2)", background: "rgba(0,238,255,0.05)", marginBottom: 28, backdropFilter: "blur(8px)" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00EEFF", animation: "pulse-glow 2s ease-in-out infinite", display: "inline-block", flexShrink: 0 }} />
            <span style={{ color: "#00EEFF", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", fontFamily: "monospace" }}>{siteConfig.tagline}</span>
          </div>

          {/* Headline */}
          <h1 className="hero-fade-2" style={{ fontSize: "clamp(36px,7.5vw,82px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 20, letterSpacing: "-0.03em" }}>
            <span style={{ color: "white" }}>The Community Where</span>
            <br />
            <span className="shimmer-text">Builders Belong</span>
          </h1>

          <p className="hero-fade-3" style={{ color: "#94A3B8", fontSize: "clamp(15px,2.2vw,19px)", maxWidth: 620, margin: "0 auto 44px", lineHeight: 1.75 }}>
            {siteConfig.heroSubline}
          </p>

          {/* CTAs */}
          <div className="hero-fade-4 hero-ctas" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}>
            <a href="#join" className="hero-cta-primary">{siteConfig.ctaJoin} <ArrowRight /></a>
            <a href="#events" className="hero-cta-secondary">{siteConfig.ctaExplore} <ChevronRight size={16} /></a>
          </div>

          {/* Stats */}
          <div className="hero-fade-5 stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, maxWidth: 520, margin: "0 auto" }}>
            {stats.map(s => (
              <div key={s.id} className="stat-card">
                <div style={{ fontSize: "clamp(18px,3vw,26px)", fontWeight: 900, color: "#00EEFF", fontFamily: "monospace" }}>{s.value}</div>
                <div style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4 }}>
          <span style={{ fontSize: 10, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.15em" }}>Scroll</span>
          <div style={{ width: 1, height: 36, background: "linear-gradient(#00EEFF,transparent)", animation: "pulse-glow 2s ease-in-out infinite" }} />
        </div>
      </section>
    </>
  );
}

// ─── FOUNDERS SECTION ────────────────────────────────────────────────────────

function FounderCard({ founder }) {
  const [hov, setHov] = useState(false);

  return (
    <>
      <style>{`
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .social-btn {
          width: 36px; height: 36px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          display: flex; align-items: center; justify-content: center;
          color: #475569; text-decoration: none; transition: all 0.2s;
        }
        .social-btn:hover { transform: scale(1.1); }
      `}</style>

      <article
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position: "relative", borderRadius: 24,
          border: hov ? `1px solid ${founder.borderColor}` : "1px solid rgba(255,255,255,0.05)",
          background: "#0A1628", overflow: "hidden",
          transition: "all 0.45s cubic-bezier(0.23,1,0.32,1)",
          transform: hov ? "translateY(-10px)" : "translateY(0)",
          boxShadow: hov ? `0 24px 60px ${founder.glowColor}` : "0 0 0 transparent",
        }}
      >
        {/* Top bar */}
        <div style={{ height: 3, background: `linear-gradient(90deg,${founder.gradStart},${founder.gradEnd})`, opacity: hov ? 1 : 0.5, transition: "opacity 0.3s" }} />

        {/* Hover glow bg */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at top, ${founder.glowColor}, transparent 60%)`, opacity: hov ? 1 : 0, transition: "opacity 0.5s", pointerEvents: "none" }} />

        {/* Avatar area */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 36, paddingBottom: 16, position: "relative" }}>
          {/* Avatar circle */}
          <div style={{
            width: 88, height: 88, borderRadius: "50%",
            background: `linear-gradient(135deg,${founder.gradStart},${founder.gradEnd})`,
            padding: 2.5, marginBottom: 14,
            animation: hov ? "float 3s ease-in-out infinite" : "none",
            boxShadow: hov ? `0 8px 32px ${founder.glowColor}` : "none",
            transition: "box-shadow 0.3s",
          }}>
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#0D1F3C", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 26, fontWeight: 900, fontFamily: "monospace", color: founder.accentColor }}>{founder.initials}</span>
            </div>
          </div>

          {/* Tag */}
          <span style={{
            padding: "4px 14px", borderRadius: 999, fontSize: 11, fontWeight: 700,
            color: founder.accentColor, border: `1px solid ${founder.borderColor}`,
            background: `${founder.accentColor}14`,
          }}>{founder.tag}</span>
        </div>

        {/* Content */}
        <div style={{ padding: "0 28px 28px", textAlign: "center" }}>
          <h3 style={{ fontSize: 20, fontWeight: 900, color: "white", marginBottom: 4 }}>{founder.name}</h3>
          <p style={{ fontSize: 12, color: "#6366F1", fontWeight: 700, marginBottom: 14, fontFamily: "monospace" }}>{founder.role}</p>
          <p style={{ color: "#64748B", fontSize: 14, lineHeight: 1.75, marginBottom: 22 }}>{founder.bio}</p>

          {/* Socials */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
            {[
              { href: founder.github, label: "GitHub", icon: <GitHubIcon />, key: "gh" },
              { href: founder.linkedin, label: "LinkedIn", icon: <LinkedInIcon />, key: "li" },
              { href: founder.twitter, label: "Twitter", icon: <TwitterIcon />, key: "tw" },
            ].map(({ href, label, icon, key }) => (
              <a
                key={key}
                href={href}
                aria-label={label}
                className="social-btn"
                style={{ "--accent": founder.accentColor }}
                onMouseEnter={e => { e.currentTarget.style.color = founder.accentColor; e.currentTarget.style.borderColor = founder.borderColor; e.currentTarget.style.background = `${founder.accentColor}12`; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#475569"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
              >{icon}</a>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}

function FoundersSection() {
  return (
    <>
      <style>{`
        .founders-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1023px) {
          .founders-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 639px) {
          .founders-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="team" style={{ position: "relative", padding: "clamp(60px,10vw,112px) 20px", background: "#050D1A", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "min(800px,100%)", height: 1, background: "linear-gradient(90deg,transparent,rgba(0,238,255,0.25),transparent)" }} />
        <div style={{ position: "absolute", top: 60, right: 30, width: "min(280px,40vw)", height: "min(280px,40vw)", borderRadius: "50%", background: "rgba(79,70,229,0.07)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 60, left: 30, width: "min(200px,35vw)", height: "min(200px,35vw)", borderRadius: "50%", background: "rgba(0,238,255,0.05)", filter: "blur(60px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "clamp(40px,6vw,64px)" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, border: "1px solid rgba(79,70,229,0.3)", background: "rgba(79,70,229,0.1)", marginBottom: 18 }}>
              <span style={{ color: "#A78BFA", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", fontFamily: "monospace" }}>MEET THE TEAM</span>
            </div>
            <h2 style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: 900, color: "white", letterSpacing: "-0.03em", marginBottom: 14 }}>
              The People Behind{" "}
              <span style={{ background: "linear-gradient(135deg,#00EEFF,#4F46E5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>TechEra</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: "clamp(15px,2vw,18px)", maxWidth: 480, margin: "0 auto" }}>
              Driven by curiosity. Built on community. Meet the founders who started it all.
            </p>
          </div>

          <div className="founders-grid">
            {founders.map(f => <FounderCard key={f.id} founder={f} />)}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── MISSION SECTION ─────────────────────────────────────────────────────────

function MissionCard({ point }) {
  const [hov, setHov] = useState(false);

  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", display: "flex", gap: 18, padding: "22px 24px", borderRadius: 20,
        border: hov ? `1px solid ${point.hoverBorder}` : "1px solid rgba(255,255,255,0.05)",
        background: "#0A1628", overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hov ? "0 12px 40px rgba(0,0,0,0.3)" : "none",
      }}
    >
      {/* Left accent bar */}
      <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: hov ? 48 : 0, borderRadius: "0 4px 4px 0", background: point.barGrad, transition: "height 0.3s ease" }} />

      {/* Icon box */}
      <div style={{
        flexShrink: 0, width: 54, height: 54, borderRadius: 16,
        background: `${point.accentColor}14`, border: `1px solid ${point.accentColor}30`,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
      }}>{point.icon}</div>

      <div>
        <h3 style={{ fontSize: 17, fontWeight: 900, color: "white", marginBottom: 6 }}>{point.title}</h3>
        <p style={{ color: "#64748B", fontSize: 14, lineHeight: 1.75 }}>{point.description}</p>
      </div>
    </article>
  );
}

function MissionSection() {
  return (
    <>
      <style>{`
        .mission-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(32px,5vw,64px);
          align-items: center;
        }
        @media (max-width: 1023px) {
          .mission-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="mission" style={{ position: "relative", padding: "clamp(60px,10vw,112px) 20px", background: "linear-gradient(180deg,#050D1A 0%,#060D1C 50%,#050D1A 100%)", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "min(800px,100%)", height: 1, background: "linear-gradient(90deg,transparent,rgba(79,70,229,0.3),transparent)" }} />
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "min(800px,100%)", height: 1, background: "linear-gradient(90deg,transparent,rgba(0,238,255,0.2),transparent)" }} />

        {/* Decorative SVG */}
        <svg style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", opacity: 0.025, width: "min(500px,40vw)", height: "min(500px,40vw)", pointerEvents: "none" }} viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="90" stroke="#00EEFF" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="70" stroke="#4F46E5" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="50" stroke="#00EEFF" strokeWidth="0.5" />
          <line x1="10" y1="100" x2="190" y2="100" stroke="#00EEFF" strokeWidth="0.5" />
          <line x1="100" y1="10" x2="100" y2="190" stroke="#00EEFF" strokeWidth="0.5" />
        </svg>

        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <div className="mission-grid">
            {/* Left */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, border: "1px solid rgba(0,238,255,0.2)", background: "rgba(0,238,255,0.05)", marginBottom: 22 }}>
                <span style={{ color: "#00EEFF", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", fontFamily: "monospace" }}>OUR MISSION</span>
              </div>

              <h2 style={{ fontSize: "clamp(26px,4.5vw,50px)", fontWeight: 900, color: "white", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 20 }}>
                Why TechEra{" "}
                <span style={{ background: "linear-gradient(135deg,#4F46E5,#00EEFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Exists</span>
              </h2>

              <p style={{ color: "#64748B", fontSize: "clamp(15px,1.8vw,18px)", lineHeight: 1.75, marginBottom: 28 }}>{siteConfig.missionDescription}</p>

              {/* Terminal */}
              <div style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "#0A1628", overflow: "hidden" }}>
                <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 8 }}>
                  {["#FF5F57","#FEBC2E","#28C840"].map((c,i) => <span key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c, display: "inline-block" }} />)}
                  <span style={{ color: "#475569", fontSize: 12, marginLeft: 8, fontFamily: "monospace" }}>techera.config.js</span>
                </div>
                <div style={{ padding: "18px 20px", fontFamily: "monospace", fontSize: "clamp(11px,1.5vw,13px)" }}>
                  <div style={{ marginBottom: 6 }}>
                    <span style={{ color: "#4F46E5" }}>const </span>
                    <span style={{ color: "#00EEFF" }}>community</span>
                    <span style={{ color: "white" }}> = </span>
                    <span style={{ color: "#A78BFA" }}>"TechEra"</span>
                    <span style={{ color: "white" }}>;</span>
                  </div>
                  <div style={{ marginBottom: 4 }}>
                    <span style={{ color: "#4F46E5" }}>const </span>
                    <span style={{ color: "#00EEFF" }}>mission</span>
                    <span style={{ color: "white" }}> = [</span>
                  </div>
                  {["Connect","Innovate","Build"].map((v,i) => (
                    <div key={i} style={{ paddingLeft: 20, marginBottom: 4 }}>
                      <span style={{ color: "#A78BFA" }}>"{v}"</span>
                      <span style={{ color: "white" }}>,</span>
                    </div>
                  ))}
                  <div style={{ marginBottom: 8 }}><span style={{ color: "white" }}>];</span></div>
                  <div style={{ color: "#475569", marginBottom: 8 }}>// Building the future, together</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#00EEFF" }}>❯</span>
                    <span style={{ color: "white" }}>npm run</span>
                    <span style={{ color: "#A78BFA" }}> build-community</span>
                    <span style={{ width: 8, height: 16, background: "#00EEFF", display: "inline-block", animation: "blink 1s step-end infinite", opacity: 0.8 }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {missionPoints.map(pt => <MissionCard key={pt.id} point={pt} />)}
            </div>
          </div>
        </div>

        <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
      </section>
    </>
  );
}

// ─── CTA SECTION ─────────────────────────────────────────────────────────────

function CTASection() {
  const perks = ["Free Events", "Mentorship", "Hackathons", "Networking", "Real Projects"];

  return (
    <>
      <style>{`
        @keyframes ping-cta { 75%,100% { transform: scale(2.2); opacity: 0; } }
        .cta-btn-primary {
          display: inline-flex; align-items: center; gap: 10px; justify-content: center;
          padding: 16px 40px; border-radius: 16px; font-weight: 900; font-size: 16px;
          color: #050D1A; background: linear-gradient(135deg,#00EEFF,#4F46E5);
          text-decoration: none; transition: all 0.3s; border: none; cursor: pointer;
        }
        .cta-btn-primary:hover { transform: scale(1.04); box-shadow: 0 0 50px rgba(0,238,255,0.35); }
        .cta-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px; justify-content: center;
          padding: 16px 40px; border-radius: 16px; font-weight: 700; font-size: 16px;
          color: #94A3B8; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03);
          text-decoration: none; transition: all 0.3s; backdrop-filter: blur(8px);
        }
        .cta-btn-secondary:hover { color: white; border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.06); }
        .cta-btns { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; }
        @media (max-width: 480px) {
          .cta-btns { flex-direction: column; }
          .cta-btn-primary, .cta-btn-secondary { width: 100%; }
        }
      `}</style>

      <section id="join" style={{ position: "relative", padding: "clamp(60px,10vw,112px) 20px", background: "#050D1A", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "min(800px,100%)", height: 1, background: "linear-gradient(90deg,transparent,rgba(0,238,255,0.15),transparent)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(600px,80vw)", height: "min(600px,80vw)", borderRadius: "50%", background: "rgba(79,70,229,0.1)", filter: "blur(100px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 896, margin: "0 auto", position: "relative" }}>
          <div style={{ position: "relative", borderRadius: 32, border: "1px solid rgba(255,255,255,0.06)", background: "#0A1628", overflow: "hidden" }}>
            {/* Inner gradient */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(79,70,229,0.1) 0%,transparent 50%,rgba(0,238,255,0.08) 100%)", pointerEvents: "none" }} />
            {/* Dots */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(0,238,255,0.05) 1px,transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }} />

            {/* Corner accents */}
            {[
              { top: 0, left: 0, borderTop: "2px solid rgba(0,238,255,0.15)", borderLeft: "2px solid rgba(0,238,255,0.15)", borderRadius: "24px 0 0 0" },
              { top: 0, right: 0, borderTop: "2px solid rgba(79,70,229,0.15)", borderRight: "2px solid rgba(79,70,229,0.15)", borderRadius: "0 24px 0 0" },
              { bottom: 0, left: 0, borderBottom: "2px solid rgba(79,70,229,0.15)", borderLeft: "2px solid rgba(79,70,229,0.15)", borderRadius: "0 0 0 24px" },
              { bottom: 0, right: 0, borderBottom: "2px solid rgba(0,238,255,0.15)", borderRight: "2px solid rgba(0,238,255,0.15)", borderRadius: "0 0 24px 0" },
            ].map((s, i) => (
              <div key={i} style={{ position: "absolute", width: 60, height: 60, ...s }} />
            ))}

            <div style={{ position: "relative", padding: "clamp(36px,7vw,80px)", textAlign: "center" }}>
              {/* Status badge */}
              <div style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", borderRadius: 999, border: "1px solid rgba(0,238,255,0.2)", background: "rgba(0,238,255,0.05)", marginBottom: 28 }}>
                <span style={{ position: "absolute", left: 14, width: 8, height: 8, borderRadius: "50%", background: "#00EEFF", opacity: 0.5, animation: "ping-cta 1.8s cubic-bezier(0,0,0.2,1) infinite" }} />
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00EEFF", display: "inline-block", marginLeft: 4 }} />
                <span style={{ color: "#00EEFF", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", fontFamily: "monospace", marginLeft: 4 }}>NOW RECRUITING</span>
              </div>

              <h2 style={{ fontSize: "clamp(28px,6vw,64px)", fontWeight: 900, color: "white", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 20 }}>
                Ready to Build<br />
                <span style={{ background: "linear-gradient(135deg,#00EEFF,#4F46E5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Something Great?
                </span>
              </h2>

              <p style={{ color: "#64748B", fontSize: "clamp(15px,1.8vw,18px)", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.75 }}>
                Join hundreds of passionate builders, designers, and thinkers shaping the future of tech — together.
              </p>

              {/* Perks */}
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginBottom: 36 }}>
                {perks.map(p => (
                  <span key={p} style={{ padding: "6px 16px", borderRadius: 999, fontSize: 12, fontWeight: 700, color: "#A78BFA", border: "1px solid rgba(167,139,250,0.2)", background: "rgba(167,139,250,0.05)" }}>✦ {p}</span>
                ))}
              </div>

              <div className="cta-btns">
                <a href="#" className="cta-btn-primary">
                  Join the Community <ArrowRight />
                </a>
                <a href="#" className="cta-btn-secondary">
                  Follow on Instagram
                </a>
              </div>
            </div>
          </div>

          <p style={{ textAlign: "center", color: "#1E3A5F", fontSize: 13, marginTop: 28, fontFamily: "monospace" }}>
            © 2025 TechEra Community · Built by builders, for builders.
          </p>
        </div>
      </section>
    </>
  );
}

// ─── HOME (DEFAULT EXPORT) ───────────────────────────────────────────────────

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#050D1A", fontFamily: "system-ui, -apple-system, sans-serif", overflowX: "hidden" }}>
      <Navbar />
      <main>
        <HeroSection />
        <FoundersSection />
        <MissionSection />
        <CTASection />
      </main>
    </div>
  );
}