import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ════════════════════════════════════════════════════════════
//  TEAM DATA
// ════════════════════════════════════════════════════════════

const founders = [
  { id: "f1", name: "Aditya Choubey",  role: "Founder & Visionary", initials: "AM", tag: "Founder",    bio: "A passionate community builder and tech enthusiast focused on empowering developers through events, collaborations, and real-world opportunities. Dedicated to creating impactful ecosystems where students, innovators, and industry leaders connect, learn, and grow together.", github: "https://github.com/Adityachoubey26", linkedin: "https://www.linkedin.com/in/aditya-c-366b90305", image: "/images/founder-techera.jpg" , color: "#00EEFF", skills: ["React", "Node.js", "Community"] },
  { id: "f2", name: "Arnav Das", role: "Co-Founder",   initials: "PS", tag: "Co-Founder", bio: "UI/UX designer turning complex problems into delightful digital experiences for growing communities.",               linkedin: "#", github: "#", color: "#A78BFA", skills: ["Figma", "Branding", "UX Research"] },
  { id: "f3", name: "Amrita Singh",  role: "Co-Founder",     bio: "Co-Founder at TechEra, passionate about building tech communities and creating opportunities for innovation and collaboration. Frontend Developer focused on turning ideas into impactful digital experiences.",  image: "/images/cofounder-2.jpg",        initials: "RV", github: "https://github.com/Amritas851203", linkedin: "https://www.linkedin.com/in/amrita-singh-579262331?utm_source=share_via&utm_content=profile&utm_medium=member_android", color: "#06B6D4", skills: ["Python", "DevOps", "Open Source"] },
];

// { id: 1, name: "Aditya Choubey",  role: "Founder & Visionary",       bio: "A passionate community builder and tech enthusiast focused on empowering developers through events, collaborations, and real-world opportunities. Dedicated to creating impactful ecosystems where students, innovators, and industry leaders connect, learn, and grow together.",          initials: "AM", github: "https://github.com/Adityachoubey26", linkedin: "https://www.linkedin.com/in/aditya-c-366b90305", instagram: "https://www.instagram.com/aditya_choubey26?igsh=cTcyYXRvaHNodzgw", tag: "Founder", image: "/images/founder-techera.jpg" , accent: "#00EEFF", grad: "linear-gradient(135deg,#00EEFF,#4F46E5)" },
//   { id: 2, name: "Arnav Das", role: "Co-Founder",   bio: "UI/UX designer turning complex problems into delightful digital experiences for growing communities.",           initials: "PS", github: "#", linkedin: "#", instagram: "#", tag: "Co-Founder", image: "/images/cofounder-1.jpg" , accent: "#A78BFA", grad: "linear-gradient(135deg,#4F46E5,#A78BFA)" },
//   { id: 3, name: "Amrita Singh",  role: "Co-Founder",     bio: "Co-Founder at TechEra, passionate about building tech communities and creating opportunities for innovation and collaboration. Frontend Developer focused on turning ideas into impactful digital experiences.",  image: "/images/cofounder-2.jpg",        initials: "RV", github: "https://github.com/Amritas851203", linkedin: "https://www.linkedin.com/in/amrita-singh-579262331?utm_source=share_via&utm_content=profile&utm_medium=member_android", instagram: "https://www.instagram.com/amrita_singh.leads?igsh=MTFpNG80ZGtxOG1xMg==", tag: "Co-Founder",    accent: "#06B6D4", grad: "linear-gradient(135deg,#A78BFA,#00EEFF)" },

const departments = [
  {
    id: "tech", name: "Tech & Development", icon: "⚡", color: "#00EEFF",
    gradient: "linear-gradient(135deg,rgba(0,238,255,0.10),rgba(79,70,229,0.10))",
    description: "Building the digital backbone of TechEra — from the website to internal tools and automation.",
    lead:   { id: "t1", name: "Kabir Nair",   role: "Tech Lead", initials: "KN", linkedin: "#", github: "#", skills: ["React", "TypeScript", "AWS"] },
    coLead: { id: "t2", name: "Sneha Joshi",  role: "Co-Lead",   initials: "SJ", linkedin: "#", github: "#", skills: ["Vue.js", "MongoDB", "Docker"] },
    members: [
      { id: "tm1", name: "Dev Patel",   role: "Frontend Dev", initials: "DP" },
      { id: "tm2", name: "Aanya Singh", role: "Backend Dev",  initials: "AS" },
      { id: "tm3", name: "Ravi Kumar",  role: "Full Stack",   initials: "RK" },
      { id: "tm4", name: "Meera Iyer",  role: "DevOps",       initials: "MI" },
    ],
  },
  {
    id: "design", name: "Design & Creatives", icon: "🎨", color: "#A78BFA",
    gradient: "linear-gradient(135deg,rgba(167,139,250,0.10),rgba(236,72,153,0.08))",
    description: "Crafting TechEra's visual identity through graphics, motion design, and brand storytelling.",
    lead:   { id: "d1", name: "Nisha Kapoor", role: "Design Lead", initials: "NK", linkedin: "#", github: "#", skills: ["Figma", "After Effects", "Brand"] },
    coLead: { id: "d2", name: "Arjun Das",    role: "Co-Lead",     initials: "AD", linkedin: "#", github: "#", skills: ["Illustrator", "Motion", "3D"] },
    members: [
      { id: "dm1", name: "Tanya Rao", role: "UI Designer",   initials: "TR" },
      { id: "dm2", name: "Vikram S.", role: "Motion Design", initials: "VS" },
      { id: "dm3", name: "Pooja M.",  role: "Brand Design",  initials: "PM" },
    ],
  },
  {
    id: "events", name: "Events & Operations", icon: "🚀", color: "#F59E0B",
    gradient: "linear-gradient(135deg,rgba(245,158,11,0.10),rgba(239,68,68,0.07))",
    description: "Orchestrating hackathons, workshops, and community meetups that bring members together.",
    lead:   { id: "e1", name: "Simran Kaur", role: "Events Lead", initials: "SK", linkedin: "#", github: "#", skills: ["Event Mgmt", "Logistics", "Ops"] },
    coLead: { id: "e2", name: "Aarav Shah",  role: "Co-Lead",     initials: "AS", linkedin: "#", github: "#", skills: ["Planning", "Marketing", "Budgeting"] },
    members: [
      { id: "em1", name: "Harsh T.",  role: "Logistics",      initials: "HT" },
      { id: "em2", name: "Ritika P.", role: "Outreach",        initials: "RP" },
      { id: "em3", name: "Yash M.",   role: "Coordinator",    initials: "YM" },
      { id: "em4", name: "Ananya K.", role: "Volunteer Head", initials: "AK" },
    ],
  },
  {
    id: "marketing", name: "Marketing & Social", icon: "📣", color: "#FB923C",
    gradient: "linear-gradient(135deg,rgba(251,146,60,0.10),rgba(245,158,11,0.07))",
    description: "Amplifying TechEra's voice across platforms, growing reach and community engagement.",
    lead:   { id: "m1", name: "Zara Qureshi", role: "Marketing Lead", initials: "ZQ", linkedin: "#", github: "#", skills: ["Content", "SEO", "Analytics"] },
    coLead: { id: "m2", name: "Nikhil Bose",  role: "Co-Lead",        initials: "NB", linkedin: "#", github: "#", skills: ["Social Media", "Ads", "Reels"] },
    members: [
      { id: "mm1", name: "Ishaan V.", role: "Content Writer", initials: "IV" },
      { id: "mm2", name: "Prachi G.", role: "Instagram",      initials: "PG" },
      { id: "mm3", name: "Kiran M.",  role: "Photography",   initials: "KM" },
    ],
  },
  {
    id: "collab", name: "Collaborations", icon: "🤝", color: "#34D399",
    gradient: "linear-gradient(135deg,rgba(52,211,153,0.10),rgba(6,182,212,0.07))",
    description: "Building bridges with organizations, colleges, and industry partners for mutual growth.",
    lead:   { id: "c1", name: "Dhruv Jain",  role: "Collab Lead", initials: "DJ", linkedin: "#", github: "#", skills: ["Networking", "BD", "Partnerships"] },
    coLead: { id: "c2", name: "Lavanya R.",  role: "Co-Lead",     initials: "LR", linkedin: "#", github: "#", skills: ["Communication", "Strategy", "Outreach"] },
    members: [
      { id: "cm1", name: "Soham T.", role: "BD Exec",    initials: "ST" },
      { id: "cm2", name: "Divya N.", role: "PR & Comms", initials: "DN" },
    ],
  },
  {
    id: "content", name: "Content & Blog", icon: "✍️", color: "#60A5FA",
    gradient: "linear-gradient(135deg,rgba(96,165,250,0.10),rgba(167,139,250,0.07))",
    description: "Writing, curating, and publishing technical articles, project showcases, and community stories.",
    lead:   { id: "b1", name: "Aditi Sharma", role: "Content Lead", initials: "AS", linkedin: "#", github: "#", skills: ["Writing", "Research", "SEO"] },
    coLead: { id: "b2", name: "Kunal Roy",    role: "Co-Lead",      initials: "KR", linkedin: "#", github: "#", skills: ["Tech Writing", "Editing", "WordPress"] },
    members: [
      { id: "bm1", name: "Pari Singh", role: "Tech Writer", initials: "PS" },
      { id: "bm2", name: "Varun K.",   role: "Editor",      initials: "VK" },
      { id: "bm3", name: "Manya D.",   role: "Blogger",     initials: "MD" },
    ],
  },
];

// ════════════════════════════════════════════════════════════
//  GLOBAL STYLES
//  Fonts are loaded by Navbar — no duplicate @import here.
// ════════════════════════════════════════════════════════════

const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { overflow-x: hidden; max-width: 100%; background: #050D1A; }

  /* ── Font shorthand classes (same as Home page) ── */
  .te-display { font-family: 'Syne', sans-serif; }
  .te-mono    { font-family: 'JetBrains Mono', monospace; }
  .te-body    { font-family: 'DM Sans', sans-serif; }

  .te-page { font-family: 'DM Sans', sans-serif; background: #050D1A; color: white; min-height: 100vh; overflow-x: hidden; width: 100%; -webkit-font-smoothing: antialiased; }

  @keyframes te-shimmer  { 0%{background-position:0% center} 100%{background-position:200% center} }
  @keyframes te-float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes te-glow     { 0%,100%{opacity:.45} 50%{opacity:1} }
  @keyframes te-scan     { 0%{top:-1px} 100%{top:100%} }
  @keyframes te-orbit    { from{transform:rotate(0deg) translateX(90px) rotate(0deg)} to{transform:rotate(360deg) translateX(90px) rotate(-360deg)} }
  @keyframes te-orbitR   { from{transform:rotate(0deg) translateX(70px) rotate(0deg)} to{transform:rotate(-360deg) translateX(70px) rotate(360deg)} }
  @keyframes te-fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes te-pulse    { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:0} }

  .te-shimmer { background-size:200% auto; animation:te-shimmer 5s linear infinite; }
  .te-float   { animation:te-float 3.5s ease-in-out infinite; }
  .te-glow    { animation:te-glow 2s ease-in-out infinite; }
  .te-fadeUp  { animation:te-fadeUp .7s ease-out forwards; }

  .te-grid-bg {
    background-image:
      linear-gradient(rgba(0,238,255,.022) 1px,transparent 1px),
      linear-gradient(90deg,rgba(0,238,255,.022) 1px,transparent 1px);
    background-size:60px 60px;
  }
  .te-dot-bg {
    background-image:radial-gradient(rgba(0,238,255,.06) 1px,transparent 1px);
    background-size:26px 26px;
  }

  .te-filter-btn {
    border:1px solid rgba(255,255,255,.07);
    background:rgba(255,255,255,.02);
    color:#64748B;
    padding:8px 18px;
    border-radius:999px;
    font-size:13px;
    font-weight:600;
    cursor:pointer;
    transition:all .25s;
    white-space:nowrap;
    font-family:'DM Sans',sans-serif;
  }
  .te-filter-btn:hover { color:white; border-color:rgba(0,238,255,.25); background:rgba(0,238,255,.05); }
  .te-filter-btn.active {
    color:#050D1A;
    background:linear-gradient(135deg,#00EEFF,#4F46E5);
    border-color:transparent;
    box-shadow:0 0 20px rgba(0,238,255,.22);
  }

  .te-btn {
    display:inline-flex; align-items:center; gap:8px;
    padding:11px 24px; border-radius:12px;
    font-weight:700; font-size:14px; color:#050D1A;
    background:linear-gradient(135deg,#00EEFF,#4F46E5);
    text-decoration:none; border:none; cursor:pointer;
    transition:all .3s; font-family:'DM Sans',sans-serif;
  }
  .te-btn:hover { transform:scale(1.04); box-shadow:0 0 28px rgba(0,238,255,.35); }

  .te-card-lift { transition:all .4s cubic-bezier(.23,1,.32,1); }
  .te-card-lift:hover { transform:translateY(-8px); }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .te-hero-orbit { display: none !important; }
    .te-hero-grid  { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 600px) {
    .te-hero-pad { padding: 90px 16px 48px !important; }
  }
`;

function useGlobalStyles() {
  useEffect(() => {
    if (document.getElementById("te-team-styles")) return;
    const el = document.createElement("style");
    el.id = "te-team-styles";
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);
}

// ════════════════════════════════════════════════════════════
//  SHARED ATOMS
// ════════════════════════════════════════════════════════════

function Avatar({ initials, color, size = 48 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.33, background: `${color}18`, border: `1.5px solid ${color}32`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span className="te-mono" style={{ fontSize: size * 0.3, fontWeight: 800, color }}>{initials}</span>
    </div>
  );
}

function Pill({ text, color }) {
  return (
    <span className="te-mono" style={{ padding: "3px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700, color, border: `1px solid ${color}28`, background: `${color}10`, letterSpacing: "0.06em" }}>
      {text}
    </span>
  );
}

function SkillTag({ text }) {
  return (
    <span style={{ padding: "2px 9px", borderRadius: 7, fontSize: 11, color: "#64748B", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", fontFamily: "'DM Sans', sans-serif" }}>
      {text}
    </span>
  );
}

function LinkedInBtn({ href, color }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ width: 30, height: 30, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", border: hov ? `1px solid ${color}40` : "1px solid rgba(255,255,255,0.07)", background: hov ? `${color}12` : "rgba(255,255,255,0.025)", color: hov ? color : "#475569", transition: "all .2s" }}>
      <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    </a>
  );
}

function GitHubBtn({ href, color }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ width: 30, height: 30, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", border: hov ? `1px solid ${color}40` : "1px solid rgba(255,255,255,0.07)", background: hov ? `${color}12` : "rgba(255,255,255,0.025)", color: hov ? color : "#475569", transition: "all .2s" }}>
      <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
    </a>
  );
}

// ════════════════════════════════════════════════════════════
//  SECTION 1 — TEAM HERO
// ════════════════════════════════════════════════════════════

function TeamHero() {
  const totalMembers = founders.length + departments.reduce((a, d) => a + 2 + d.members.length, 0);
  const orbitIcons   = departments.slice(0, 4).map((d) => d.icon);

  return (
    <section style={{ position: "relative", minHeight: "100vh", width: "100%", display: "flex", alignItems: "center", overflow: "hidden", background: "#050D1A" }}>
      <div className="te-grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "30%", left: "18%", width: 520, height: 520, borderRadius: "50%", background: "rgba(79,70,229,0.10)", filter: "blur(130px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "15%", right: "8%",  width: 280, height: 280, borderRadius: "50%", background: "rgba(0,238,255,0.06)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div className="te-hero-grid" style={{ position: "relative", maxWidth: 1200, margin: "0 auto", width: "100%", padding: "100px 28px 64px", display: "grid", gridTemplateColumns: "1fr auto", gap: 60, alignItems: "center" }}>
        {/* LEFT */}
        <div>
          <div className="te-fadeUp" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, border: "1px solid rgba(0,238,255,0.2)", background: "rgba(0,238,255,0.06)", marginBottom: 24 }}>
            <span className="te-glow" style={{ width: 7, height: 7, borderRadius: "50%", background: "#00EEFF", display: "inline-block" }} />
            <span className="te-mono" style={{ color: "#00EEFF", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em" }}>THE TEAM</span>
          </div>
          <h1 className="te-display te-fadeUp" style={{ fontSize: "clamp(38px,5.5vw,72px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.03em", marginBottom: 24, animationDelay: "0.08s", opacity: 0 }}>
            <span style={{ color: "white" }}>People who</span><br />
            <span className="te-shimmer" style={{ background: "linear-gradient(90deg,#00EEFF 0%,#4F46E5 45%,#A78BFA 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              make it happen
            </span>
          </h1>
          <p className="te-fadeUp" style={{ color: "#64748B", fontSize: "clamp(15px,1.6vw,18px)", lineHeight: 1.75, maxWidth: 540, marginBottom: 40, animationDelay: "0.15s", opacity: 0, fontFamily: "'DM Sans', sans-serif" }}>
            TechEra runs on passion and collaboration. Every department is led by dedicated members who give their time, skills, and creativity to build something worth being part of.
          </p>
          <div className="te-fadeUp" style={{ display: "flex", gap: 36, flexWrap: "wrap", animationDelay: "0.22s", opacity: 0 }}>
            {[
              { val: `${totalMembers}+`, label: "Total Members", color: "#00EEFF" },
              { val: `${departments.length}`,  label: "Departments",   color: "#A78BFA" },
              { val: `${founders.length}`,     label: "Founders",      color: "#4F46E5" },
            ].map((s, i) => (
              <div key={i}>
                <div className="te-mono" style={{ fontSize: 36, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "#475569", marginTop: 5, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT ORBIT */}
        <div className="te-hero-orbit" style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
          <div style={{ position: "relative", width: 230, height: 230 }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 80, height: 80, borderRadius: "50%", background: "rgba(0,238,255,0.12)", filter: "blur(22px)" }} />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 60, height: 60, borderRadius: 18, background: "linear-gradient(135deg,#00EEFF,#4F46E5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="te-mono" style={{ color: "#050D1A", fontWeight: 900, fontSize: 16 }}>TE</span>
            </div>
            {[[0.78, 0.11, "solid", "rgba(0,238,255,0.10)"], [1.05, -0.025, "dashed", "rgba(79,70,229,0.12)"], [1.32, -0.16, "solid", "rgba(0,238,255,0.07)"]].map(([sc, off, style, color], i) => (
              <div key={i} style={{ position: "absolute", width: `${sc * 100}%`, height: `${sc * 100}%`, top: `${off * 100}%`, left: `${off * 100}%`, borderRadius: "50%", border: `1px ${style} ${color}` }} />
            ))}
            <div style={{ position: "absolute", top: "50%", left: "50%", marginLeft: -4, marginTop: -4, width: 8, height: 8, borderRadius: "50%", background: "#00EEFF", boxShadow: "0 0 8px #00EEFF", animation: "te-orbit 8s linear infinite" }} />
            <div style={{ position: "absolute", top: "50%", left: "50%", marginLeft: -4, marginTop: -4, width: 7, height: 7, borderRadius: "50%", background: "#A78BFA", boxShadow: "0 0 8px #A78BFA", animation: "te-orbitR 12s linear infinite" }} />
            {orbitIcons.map((icon, i) => {
              const angle = (i * 90 * Math.PI) / 180;
              const r = 96;
              return (
                <div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: 36, height: 36, borderRadius: 11, background: "rgba(10,22,40,0.92)", border: "1px solid rgba(0,238,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, transform: `translate(-50%,-50%) translate(${Math.cos(angle) * r}px,${Math.sin(angle) * r}px)`, animation: `te-float ${3 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }}>
                  {icon}
                </div>
              );
            })}
          </div>
          <p className="te-mono" style={{ color: "#1E3A5F", fontSize: 11, marginTop: 22, letterSpacing: "0.14em" }}>// techera.departments</p>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", opacity: 0.35 }}>
        <div className="te-glow" style={{ width: 1, height: 48, background: "linear-gradient(#00EEFF,transparent)" }} />
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
//  SECTION 2 — FOUNDERS STRIP
// ════════════════════════════════════════════════════════════

function FounderCard({ founder }) {
  const [hov, setHov] = useState(false);
  return (
    <article className="te-card-lift" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: "relative", borderRadius: 24, overflow: "hidden", background: "rgba(10,22,40,0.88)", backdropFilter: "blur(20px)", border: hov ? `1px solid ${founder.color}2e` : "1px solid rgba(255,255,255,0.06)", boxShadow: hov ? `0 24px 60px rgba(0,0,0,0.5), 0 0 48px ${founder.color}08` : "none" }}>
      <div style={{ height: 2, background: `linear-gradient(90deg,${founder.color},#4F46E5)`, opacity: hov ? 1 : 0.35, transition: "opacity .3s" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse at top left, ${founder.color}08, transparent 60%)`, opacity: hov ? 1 : 0, transition: "opacity .5s" }} />
      <div style={{ padding: 28, position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <Avatar initials={founder.initials} color={founder.color} size={56} />
          <Pill text={founder.tag} color={founder.color} />
        </div>
        <h3 className="te-display" style={{ fontSize: 19, fontWeight: 700, color: "white", marginBottom: 3 }}>{founder.name}</h3>
        <p className="te-mono" style={{ fontSize: 11, color: founder.color, fontWeight: 600, marginBottom: 14, letterSpacing: "0.04em" }}>{founder.role}</p>
        <p style={{ color: "#64748B", fontSize: 13.5, lineHeight: 1.65, marginBottom: 18, fontFamily: "'DM Sans', sans-serif" }}>{founder.bio}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
          {founder.skills.map((s) => <SkillTag key={s} text={s} />)}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <LinkedInBtn href={founder.linkedin} color={founder.color} />
          <GitHubBtn href={founder.github} color={founder.color} />
        </div>
      </div>
    </article>
  );
}

function FoundersStrip() {
  return (
    <section style={{ position: "relative", padding: "80px 0", background: "#050D1A", width: "100%" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "90%", maxWidth: 900, height: 1, background: "linear-gradient(90deg,transparent,rgba(0,238,255,0.2),transparent)" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(79,70,229,0.3)", background: "rgba(79,70,229,0.08)" }}>
            <span className="te-mono" style={{ color: "#A78BFA", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em" }}>FOUNDERS</span>
          </div>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(79,70,229,0.3),transparent)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
          {founders.map((f) => <FounderCard key={f.id} founder={f} />)}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
//  SECTION 3 — DEPARTMENTS
// ════════════════════════════════════════════════════════════

function LeadCard({ person, label, color }) {
  const [hov, setHov] = useState(false);
  return (
    <div className="te-card-lift" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: "relative", borderRadius: 22, overflow: "hidden", background: "rgba(10,22,40,0.9)", backdropFilter: "blur(20px)", border: hov ? `1px solid ${color}2e` : "1px solid rgba(255,255,255,0.06)", boxShadow: hov ? `0 16px 50px rgba(0,0,0,0.4), 0 0 30px ${color}06` : "none", padding: 24 }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 22, pointerEvents: "none", background: `radial-gradient(ellipse at top, ${color}06, transparent 65%)`, opacity: hov ? 1 : 0, transition: "opacity .45s" }} />
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <Avatar initials={person.initials} color={color} size={50} />
          <Pill text={label} color={color} />
        </div>
        <h4 className="te-display" style={{ fontSize: 17, fontWeight: 700, color: "white", marginBottom: 2 }}>{person.name}</h4>
        <p className="te-mono" style={{ fontSize: 10.5, color, fontWeight: 600, marginBottom: 12, letterSpacing: "0.05em" }}>{person.role}</p>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
          {person.skills.map((s) => <SkillTag key={s} text={s} />)}
        </div>
        <LinkedInBtn href={person.linkedin} color={color} />
      </div>
    </div>
  );
}

function MemberChip({ member, color }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 14, cursor: "default", transition: "all .22s", border: hov ? `1px solid ${color}25` : "1px solid rgba(255,255,255,0.05)", background: hov ? `${color}07` : "rgba(255,255,255,0.02)" }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}14`, border: `1px solid ${color}24`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span className="te-mono" style={{ fontSize: 10.5, fontWeight: 800, color }}>{member.initials}</span>
      </div>
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: hov ? "white" : "#CBD5E1", transition: "color .2s", fontFamily: "'DM Sans', sans-serif" }}>{member.name}</div>
        <div style={{ fontSize: 11, color: "#475569", marginTop: 1, fontFamily: "'DM Sans', sans-serif" }}>{member.role}</div>
      </div>
    </div>
  );
}

function DepartmentBlock({ dept }) {
  const [expanded, setExpanded] = useState(false);
  const PREVIEW = 4;
  const shown = expanded ? dept.members : dept.members.slice(0, PREVIEW);
  const extra = dept.members.length - PREVIEW;

  return (
    <div style={{ marginBottom: 52 }}>
      <div style={{ position: "relative", borderRadius: 20, padding: "26px 30px", marginBottom: 24, border: "1px solid rgba(255,255,255,0.05)", overflow: "hidden", background: dept.gradient }}>
        <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${dept.color}35,transparent)`, animation: "te-scan 7s linear infinite", pointerEvents: "none" }} />
        <div style={{ display: "flex", alignItems: "flex-start", gap: 18, position: "relative" }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: `${dept.color}18`, border: `1.5px solid ${dept.color}2e`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{dept.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
              <h3 className="te-display" style={{ fontSize: 20, fontWeight: 800, color: "white", letterSpacing: "-0.01em" }}>{dept.name}</h3>
              <div style={{ padding: "2px 10px", borderRadius: 999, background: `${dept.color}12`, border: `1px solid ${dept.color}22` }}>
                <span className="te-mono" style={{ fontSize: 10, fontWeight: 700, color: dept.color }}>{dept.members.length + 2} members</span>
              </div>
            </div>
            <p style={{ color: "#64748B", fontSize: 13.5, lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif" }}>{dept.description}</p>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14, marginBottom: 20 }}>
        <LeadCard person={dept.lead}   label="LEAD"    color={dept.color} />
        <LeadCard person={dept.coLead} label="CO-LEAD" color={dept.color} />
      </div>

      {dept.members.length > 0 && (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span className="te-mono" style={{ fontSize: 10, color: "#334155", textTransform: "uppercase", letterSpacing: "0.12em" }}>Members</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.04)" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10 }}>
            {shown.map((m) => <MemberChip key={m.id} member={m} color={dept.color} />)}
          </div>
          {extra > 0 && (
            <button onClick={() => setExpanded(!expanded)} style={{ marginTop: 12, padding: "7px 16px", borderRadius: 10, cursor: "pointer", border: `1px solid ${dept.color}25`, background: `${dept.color}08`, color: dept.color, fontSize: 12, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", transition: "background .2s", display: "flex", alignItems: "center", gap: 6 }}>
              {expanded ? "Show less ↑" : `+${extra} more ↓`}
            </button>
          )}
        </>
      )}
    </div>
  );
}

function DeptFilterBar({ active, onChange }) {
  const all = [{ id: "all", label: "All", icon: "✦" }, ...departments.map((d) => ({ id: d.id, label: d.name.split(" ")[0], icon: d.icon }))];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
      {all.map((f) => (
        <button key={f.id} className={`te-filter-btn${active === f.id ? " active" : ""}`} onClick={() => onChange(f.id)}>
          <span style={{ marginRight: 6 }}>{f.icon}</span>{f.label}
        </button>
      ))}
    </div>
  );
}

function DepartmentsSection() {
  const [active, setActive] = useState("all");
  const visible = active === "all" ? departments : departments.filter((d) => d.id === active);

  return (
    <section style={{ padding: "0 0 96px", position: "relative", background: "#050D1A", width: "100%" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "90%", maxWidth: 900, height: 1, background: "linear-gradient(90deg,transparent,rgba(0,238,255,0.18),transparent)" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 28px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(0,238,255,0.2)", background: "rgba(0,238,255,0.06)" }}>
            <span className="te-mono" style={{ color: "#00EEFF", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em" }}>DEPARTMENTS</span>
          </div>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(0,238,255,0.22),transparent)" }} />
        </div>
        <div style={{ marginBottom: 52 }}>
          <DeptFilterBar active={active} onChange={setActive} />
        </div>
        <div key={active}>
          {visible.map((dept, i) => (
            <div key={dept.id} className="te-fadeUp" style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}>
              <DepartmentBlock dept={dept} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
//  SECTION 4 — JOIN CTA
// ════════════════════════════════════════════════════════════

function TeamCTA() {
  return (
    <section id="join" style={{ padding: "0 0 100px", background: "#050D1A", width: "100%" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
        <div style={{ position: "relative", borderRadius: 28, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", background: "linear-gradient(135deg,rgba(79,70,229,0.12) 0%,rgba(10,22,40,0.92) 50%,rgba(0,238,255,0.08) 100%)" }}>
          <div className="te-dot-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
          {[
            { pos: { top: 0, left: 0 },     borderTop:    "1.5px solid rgba(0,238,255,0.15)", borderLeft:  "1.5px solid rgba(0,238,255,0.15)", borderRadius: "22px 0 0 0"  },
            { pos: { top: 0, right: 0 },    borderTop:    "1.5px solid rgba(0,238,255,0.15)", borderRight: "1.5px solid rgba(0,238,255,0.15)", borderRadius: "0 22px 0 0"  },
            { pos: { bottom: 0, left: 0 },  borderBottom: "1.5px solid rgba(0,238,255,0.15)", borderLeft:  "1.5px solid rgba(0,238,255,0.15)", borderRadius: "0 0 0 22px"  },
            { pos: { bottom: 0, right: 0 }, borderBottom: "1.5px solid rgba(0,238,255,0.15)", borderRight: "1.5px solid rgba(0,238,255,0.15)", borderRadius: "0 0 22px 0"  },
          ].map(({ pos, ...styles }, i) => (
            <div key={i} style={{ position: "absolute", ...pos, width: 48, height: 48, ...styles }} />
          ))}

          <div style={{ position: "relative", padding: "clamp(40px,6vw,72px) clamp(32px,5vw,56px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(0,238,255,0.18)", background: "rgba(0,238,255,0.06)", marginBottom: 18 }}>
                <span className="te-glow" style={{ width: 7, height: 7, borderRadius: "50%", background: "#00EEFF", display: "inline-block" }} />
                <span className="te-mono" style={{ color: "#00EEFF", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em" }}>OPEN RECRUITMENT</span>
              </div>
              <h3 className="te-display" style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 10 }}>Want to join the team?</h3>
              <p style={{ color: "#64748B", fontSize: 15, maxWidth: 480, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>We're always looking for passionate people. Pick a department, bring your skills, and help us build something meaningful.</p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", flexShrink: 0 }}>
              <a href="#" className="te-btn">
                Apply Now
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a href="#" style={{ padding: "11px 24px", borderRadius: 12, fontWeight: 600, fontSize: 14, color: "#64748B", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", textDecoration: "none", transition: "all .22s", fontFamily: "'DM Sans',sans-serif" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#64748B"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
//  PAGE
// ════════════════════════════════════════════════════════════

export default function Team() {
  useGlobalStyles();
  return (
    <div className="te-page">
      <Navbar />
      <main>
        <TeamHero />
        <FoundersStrip />
        <DepartmentsSection />
        <TeamCTA />
      </main>
      <Footer />
    </div>
  );
}