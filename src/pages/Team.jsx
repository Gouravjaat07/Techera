import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const managers = [
  {
    id: "mg1",
    name: "Biswamohan Singh",
    role: "Manager",
    bio: "A strategic leader overseeing TechEra's operations, ensuring every department aligns with the community's vision and members thrive in a collaborative environment.",
    initials: "MN",
    github: "https://github.com/Biswa5570",
    linkedin: "https://www.linkedin.com/in/bb-shark/",
    instagram: "patronus_shark_2412",
    tag: "Community Manager",
    image: "/images/senior-coordinator-2.jpg",
    accent: "#00EEFF",
    grad: "linear-gradient(135deg,#00EEFF,#4F46E5)",
  },
];

const seniorCoordinators = [
  {
    id: "sc1",
    name: "Raj",
    role: "Senior Coordinator",
    bio: "Coordinating events, outreach, and cross-team efforts with meticulous attention to detail — keeping TechEra's operations running smoothly from planning to execution. 'BELIEVE ACT ACHIEVE REPEAT'",
    initials: "SC",
    github: "#",
    linkedin: "https://www.linkedin.com/in/raj-mishra-030b04327?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    instagram: "https://www.instagram.com/raj_.ov?igsh=MjNldDd5a3FrMmI2",
    tag: "Sr. Coordinator",
    image: "/images/senior-coordinator-1.jpg",
    accent: "#34D399",
    grad: "linear-gradient(135deg,#34D399,#06B6D4)",
  },
];

const departments = [
  {
    id: "tech", name: "Tech & Development", icon: "⚡", color: "#00EEFF",
    gradient: "linear-gradient(135deg,rgba(0,238,255,0.10),rgba(79,70,229,0.10))",
    description: "Building the digital backbone of TechEra — from the website to internal tools and automation.",
    lead:   { id: "t1", name: "Gourav",  role: "Tech Lead", initials: "GJ", linkedin: "https://www.linkedin.com/in/gourav-jaat/", github: "https://github.com/Gouravjaat07", skills: ["React", "Full Stack", "AWS"], image: "/images/Gourav_IMG_2.png" },
    coLead: { id: "t2", name: "Kartik", role: "Co-Lead",   initials: "KT", linkedin: "https://www.linkedin.com/in/kartik-chilkoti", github: "https://github.com/chilkotiKartik", skills: ["Vue.js", "MongoDB", "Docker"], image: "/images/tech-colead.jpeg" },
    members: [
      { id: "tm1", name: "Sudesh",        role: "Frontend Dev", initials: "SD", linkedin: "https://www.linkedin.com/in/sudesh-tanwar-a406a7338?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
      { id: "tm2", name: "Aditya Sharma", role: "DevOps",       initials: "AS", linkedin: "https://www.linkedin.com/in/aditya-sharma-8b2aa9244?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
      { id: "tm3", name: "Rewa Gupta",    role: "Frontend Dev", initials: "RG", linkedin: "#" },
      { id: "tm4", name: "Shubham",       role: "Backend",      initials: "SH", linkedin: "https://www.linkedin.com/in/shubham-saini-630502379?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
    ],
  },
  {
    id: "design", name: "Design & Creatives", icon: "🎨", color: "#A78BFA",
    gradient: "linear-gradient(135deg,rgba(167,139,250,0.10),rgba(236,72,153,0.08))",
    description: "Crafting TechEra's visual identity through graphics, motion design, and brand storytelling.",
    lead:   { id: "d1", name: "Harsh Sharma",  role: "Design Lead", initials: "HS", linkedin: "https://www.linkedin.com/in/harsh-sharma-786779334?utm_source=share_via&utm_content=profile&utm_medium=member_android", github: "#", skills: ["Figma", "After Effects", "Brand"], image: "/images/graphics-lead.jpg" },
    coLead: { id: "d2", name: "Abhijna Laxmi", role: "Co-Lead",     initials: "AL", linkedin: "#", github: "#", skills: ["Illustrator", "Motion", "3D"], image: "/images/Design-colead.png" },
    members: [
      { id: "dm1", name: "Rahul",    role: "UI Designer",   initials: "RH", linkedin: "#" },
      { id: "dm2", name: "Ajit",     role: "Motion Design", initials: "AJ", linkedin: "#" },
      { id: "dm3", name: "Darshika", role: "Brand Design",  initials: "DK", linkedin: "#" },
      { id: "dm4", name: "Ritu",     role: "UI Design",     initials: "RT", linkedin: "#" },
    ],
  },
  {
    id: "events", name: "Events & Operations", icon: "🚀", color: "#F59E0B",
    gradient: "linear-gradient(135deg,rgba(245,158,11,0.10),rgba(239,68,68,0.07))",
    description: "Orchestrating hackathons, workshops, and community meetups that bring members together.",
    lead:   { id: "e1", name: "Shambhavi Chaudhary", role: "Events Lead", initials: "SK", linkedin: "https://www.linkedin.com/in/shambhavi-chaudhary-5a891b307?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", github: "#", skills: ["Event Mgmt", "Logistics", "Ops"], image: "/images/event-lead.jpg" },
    coLead: { id: "e2", name: "Kritika Sharma",       role: "Co-Lead",    initials: "AS", linkedin: "#", github: "#", skills: ["Planning", "Marketing", "Budgeting"], image: "/images/event-colead.jpg" },
    members: [
      { id: "em1", name: "Pushp Sharma",     role: "Logistics",      initials: "HT", linkedin: "https://www.linkedin.com/in/pushp-sharma-95b233376?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
      { id: "em2", name: "Vansh Chaudhari",  role: "Outreach",       initials: "RP", linkedin: "https://www.linkedin.com/in/vansh-chaudhari9370?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
      { id: "em7", name: "Gaurav Kumar",     role: "Event planning & scheduling",     initials: "S",  linkedin: "https://www.linkedin.com/in/sejal-baisla-63b6b639a?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
      { id: "em3", name: "Pragati Jain",     role: "Coordinator",    initials: "YM", linkedin: "https://www.linkedin.com/in/pragati-jain-7b3b62368?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
      { id: "em4", name: "Bhavya Jain",      role: "Volunteer Head", initials: "AK", linkedin: "https://www.linkedin.com/in/bhavya-jain-01b776341?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
      { id: "em5", name: "Karthik Chilkori", role: "Outreach", initials: "KC", linkedin: "https://www.linkedin.com/in/kartik-chilkoti" },
      { id: "em6", name: "Sejal",            role: "Management",     initials: "S",  linkedin: "https://www.linkedin.com/in/sejal-baisla-63b6b639a?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
    ],
  },
  {
    id: "marketing", name: "Marketing & Social", icon: "📣", color: "#FB923C",
    gradient: "linear-gradient(135deg,rgba(251,146,60,0.10),rgba(245,158,11,0.07))",
    description: "Amplifying TechEra's voice across platforms, growing reach and community engagement.",
    lead:   { id: "m1", name: "Parth Jain",    role: "Marketing Lead", initials: "ZQ", linkedin: "https://www.linkedin.com/in/parth-jain-529378347?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", github: "#", skills: ["Content", "SEO", "Analytics"], image: "/images/marketing-lead.jpg" },
    coLead: { id: "m2", name: "Saurya Kapoor", role: "Co-Lead",        initials: "NB", linkedin: "#", github: "#", skills: ["Social Media", "Ads", "Reels"] },
    members: [
      { id: "mm1", name: "Ishaan V.", role: "Content Writer", initials: "IV", linkedin: "#" },
      { id: "mm2", name: "Prachi G.", role: "Instagram",      initials: "PG", linkedin: "#" },
      { id: "mm3", name: "Kiran M.",  role: "Photography",    initials: "KM", linkedin: "#" },
    ],
  },
  {
    id: "video-editing", name: "Video Editing", icon: "🎬", color: "#F472B6",
    gradient: "linear-gradient(135deg,rgba(244,114,182,0.10),rgba(167,139,250,0.07))",
    description: "Planning, editing, and producing high-quality video content including event highlights, promotional reels, tutorials, and social media creatives while maintaining strong storytelling and brand consistency.",
    lead:   { id: "v1", name: "Raj",     role: "Video Editing Lead", initials: "RJ", linkedin: "https://www.linkedin.com/in/raj-mishra-030b04327?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", github: "#", skills: ["Premiere Pro", "After Effects", "Storyboarding"], image: "/images/senior-coordinator-1.jpg" },
    coLead: { id: "v2", name: "Kaashvi", role: "Co-Lead",            initials: "KR", linkedin: "https://www.linkedin.com/in/kaashvi-gupta?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", github: "#", skills: ["Color Grading", "Sound Design", "Motion Graphics"], image: "/images/videoediting-colead.jpeg" },
    members: [
      { id: "ve1", name: "Pari Singh", role: "Video Editor",         initials: "PS", linkedin: "#" },
      { id: "ve2", name: "Varun K.",   role: "Motion Designer",      initials: "VK", linkedin: "#" },
      { id: "ve3", name: "Manya D.",   role: "Content Videographer", initials: "MD", linkedin: "#" },
    ],
  },
  {
    id: "content", name: "Content & Blog", icon: "✍️", color: "#60A5FA",
    gradient: "linear-gradient(135deg,rgba(96,165,250,0.10),rgba(167,139,250,0.07))",
    description: "Writing, curating, and publishing technical articles, project showcases, and community stories.",
    lead:   { id: "b1", name: "Raja",      role: "Content Lead", initials: "RJ", linkedin: "https://www.linkedin.com/in/raja-polamarasetti?fromQR=1", github: "#", skills: ["Writing", "Research", "SEO"], image: "/images/raja.jpg" },
    coLead: { id: "b2", name: "Kunal Roy", role: "Co-Lead",      initials: "KR", linkedin: "#", github: "#", skills: ["Tech Writing", "Editing", "WordPress"] },
    members: [
      { id: "bm1", name: "Pari Singh", role: "Tech Writer", initials: "PS", linkedin: "#" },
      { id: "bm2", name: "Varun K.",   role: "Editor",      initials: "VK", linkedin: "#" },
      { id: "bm3", name: "Manya D.",   role: "Blogger",     initials: "MD", linkedin: "#" },
    ],
  },
  {
    id: "collab", name: "Collaborations", icon: "🤝", color: "#34D399",
    gradient: "linear-gradient(135deg,rgba(52,211,153,0.10),rgba(6,182,212,0.07))",
    description: "Building bridges with organizations, colleges, and industry partners for mutual growth.",
    lead:   { id: "c1", name: "Aditya",     role: "Collab Lead", initials: "AD", linkedin: "#", github: "#", skills: ["Networking", "BD", "Partnerships"] },
    coLead: { id: "c2", name: "Lavanya R.", role: "Co-Lead",     initials: "LR", linkedin: "#", github: "#", skills: ["Communication", "Strategy", "Outreach"] },
    members: [
      { id: "cm1", name: "Soham T.", role: "BD Exec",    initials: "ST", linkedin: "#" },
      { id: "cm2", name: "Divya N.", role: "PR & Comms", initials: "DN", linkedin: "#" },
    ],
  },
];

// ════════════════════════════════════════════════════════════
//  GLOBAL STYLES
// ════════════════════════════════════════════════════════════

const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { overflow-x: hidden; max-width: 100%; background: #050D1A; }

  .te-display { font-family: 'Syne', sans-serif; }
  .te-mono    { font-family: 'JetBrains Mono', monospace; }

  .te-page { font-family: 'DM Sans', sans-serif; background: #050D1A; color: white; min-height: 100vh; overflow-x: hidden; width: 100%; -webkit-font-smoothing: antialiased; }

  @keyframes te-shimmer { 0%{background-position:0% center} 100%{background-position:200% center} }
  @keyframes te-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes te-glow    { 0%,100%{opacity:.45} 50%{opacity:1} }
  @keyframes te-scan    { 0%{top:-1px} 100%{top:100%} }
  @keyframes te-orbit   { from{transform:rotate(0deg) translateX(90px) rotate(0deg)} to{transform:rotate(360deg) translateX(90px) rotate(-360deg)} }
  @keyframes te-orbitR  { from{transform:rotate(0deg) translateX(70px) rotate(0deg)} to{transform:rotate(-360deg) translateX(70px) rotate(360deg)} }
  @keyframes te-fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

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

  /* filter bar */
  .te-filter-btn {
    border:1px solid rgba(255,255,255,.07); background:rgba(255,255,255,.02);
    color:#64748B; padding:8px 18px; border-radius:999px; font-size:13px;
    font-weight:600; cursor:pointer; transition:all .25s; white-space:nowrap;
    font-family:'DM Sans',sans-serif;
  }
  .te-filter-btn:hover { color:white; border-color:rgba(0,238,255,.25); background:rgba(0,238,255,.05); }
  .te-filter-btn.active { color:#050D1A; background:linear-gradient(135deg,#00EEFF,#4F46E5); border-color:transparent; box-shadow:0 0 20px rgba(0,238,255,.22); }

  .te-btn {
    display:inline-flex; align-items:center; gap:8px; padding:11px 24px; border-radius:12px;
    font-weight:700; font-size:14px; color:#050D1A;
    background:linear-gradient(135deg,#00EEFF,#4F46E5);
    text-decoration:none; border:none; cursor:pointer; transition:all .3s; font-family:'DM Sans',sans-serif;
  }
  .te-btn:hover { transform:scale(1.04); box-shadow:0 0 28px rgba(0,238,255,.35); }

  .te-card-lift { transition:all .4s cubic-bezier(.23,1,.32,1); }
  .te-card-lift:hover { transform:translateY(-8px); }

  /* ── Management cards ── */
  .mgmt-card {
    position:relative; border-radius:22px;
    border:1px solid rgba(255,255,255,.05); background:#0A1628;
    overflow:hidden;
    transition:transform .4s cubic-bezier(.23,1,.32,1), border-color .4s, box-shadow .4s;
  }
  .mgmt-card:hover { transform:translateY(-10px); }
  .mgmt-top  { height:3px; width:100%; }
  .mgmt-avatar-area { display:flex; flex-direction:column; align-items:center; padding:28px 20px 12px; }
  .mgmt-ring { width:82px; height:82px; border-radius:50%; padding:2.5px; margin-bottom:12px; transition:box-shadow .35s, transform .35s; }
  .mgmt-card:hover .mgmt-ring { transform:translateY(-4px); }
  .mgmt-inner { width:100%; height:100%; border-radius:50%; background:#0D1F3C; display:flex; align-items:center; justify-content:center; overflow:hidden; }
  .mgmt-initials { font-size:22px; font-weight:900; font-family:'JetBrains Mono',monospace; }
  .mgmt-tag { padding:4px 14px; border-radius:999px; font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; letter-spacing:.06em; }
  .mgmt-body { padding:4px 22px 24px; text-align:center; }
  .mgmt-name { font-size:18px; font-weight:700; color:white; margin-bottom:4px; font-family:'Syne',sans-serif; }
  .mgmt-role { font-size:11px; font-weight:600; margin-bottom:10px; font-family:'JetBrains Mono',monospace; letter-spacing:.04em; }
  .mgmt-bio  { color:#64748B; font-size:13px; line-height:1.75; margin-bottom:18px; font-family:'DM Sans',sans-serif; }
  .mgmt-socials { display:flex; justify-content:center; gap:10px; }
  .mgmt-soc-btn {
    width:34px; height:34px; border-radius:10px;
    border:1px solid rgba(255,255,255,.07); background:rgba(255,255,255,.025);
    display:flex; align-items:center; justify-content:center;
    color:#475569; text-decoration:none;
    transition:color .2s, border-color .2s, background .2s, transform .2s;
  }
  .mgmt-soc-btn:hover { transform:scale(1.12); }

  /* ── Combined management layout: side-by-side on desktop ── */
  .mgmt-combined-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: start;
    justify-items: center;
  }

  /* Each column (Managers / Sr. Coordinators) */
  .mgmt-column {
    width: 100%;
    max-width: 400px;
  }

  /* Cards within each column */
  .mgmt-column-cards {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  /* Responsive: tablet → single column, centered */
  @media (max-width: 860px) {
    .mgmt-combined-row {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .mgmt-column {
      max-width: 420px;
      margin: 0 auto;
    }
  }

  @media (max-width:900px) {
    .te-hero-orbit { display:none !important; }
    .te-hero-grid  { grid-template-columns:1fr !important; }
  }
  @media (max-width:600px) {
    .te-hero-pad { padding:90px 16px 48px !important; }
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

function Pill({ text, color }) {
  return (
    <span className="te-mono" style={{ padding:"3px 10px", borderRadius:999, fontSize:10, fontWeight:700, color, border:`1px solid ${color}28`, background:`${color}10`, letterSpacing:"0.06em" }}>
      {text}
    </span>
  );
}

function SkillTag({ text }) {
  return (
    <span style={{ padding:"2px 9px", borderRadius:7, fontSize:11, color:"#64748B", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", fontFamily:"'DM Sans',sans-serif" }}>
      {text}
    </span>
  );
}

function LinkedInBtn({ href, color, size = 30 }) {
  const [hov, setHov] = useState(false);
  const ok = href && href !== "#";
  return (
    <a href={ok ? href : undefined} target={ok ? "_blank" : undefined} rel="noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ width:size, height:size, borderRadius:Math.round(size*.3), display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none", border:hov?`1px solid ${color}40`:"1px solid rgba(255,255,255,0.07)", background:hov?`${color}12`:"rgba(255,255,255,0.025)", color:hov?color:"#475569", transition:"all .2s", cursor:ok?"pointer":"default", flexShrink:0 }}>
      <svg width={size*.4} height={size*.4} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    </a>
  );
}

function GitHubBtn({ href, color, size = 30 }) {
  const [hov, setHov] = useState(false);
  const ok = href && href !== "#";
  return (
    <a href={ok ? href : undefined} target={ok ? "_blank" : undefined} rel="noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ width:size, height:size, borderRadius:Math.round(size*.3), display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none", border:hov?`1px solid ${color}40`:"1px solid rgba(255,255,255,0.07)", background:hov?`${color}12`:"rgba(255,255,255,0.025)", color:hov?color:"#475569", transition:"all .2s", cursor:ok?"pointer":"default", flexShrink:0 }}>
      <svg width={size*.42} height={size*.42} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    </a>
  );
}

const GHIcon  = () => <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>;
const LIIcon  = () => <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const IGIcon  = () => <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;

// ════════════════════════════════════════════════════════════
//  TEAM HERO
// ════════════════════════════════════════════════════════════

function TeamHero() {
  const totalMembers = departments.reduce((a, d) => a + 2 + d.members.length, 0);
  const orbitIcons = departments.slice(0, 4).map((d) => d.icon);
  return (
    <section style={{ position:"relative", width:"100%", overflow:"hidden", background:"#050D1A" }}>
      <div className="te-grid-bg" style={{ position:"absolute", inset:0, pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"30%", left:"18%", width:520, height:520, borderRadius:"50%", background:"rgba(79,70,229,0.10)", filter:"blur(130px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"15%", right:"8%", width:280, height:280, borderRadius:"50%", background:"rgba(0,238,255,0.06)", filter:"blur(80px)", pointerEvents:"none" }} />

      <div className="te-hero-grid" style={{ position:"relative", maxWidth:1200, margin:"0 auto", width:"100%", padding:"clamp(80px,10vw,120px) 28px clamp(56px,7vw,80px)", display:"grid", gridTemplateColumns:"1fr auto", gap:60, alignItems:"center" }}>
        <div>
          <div className="te-fadeUp" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px", borderRadius:999, border:"1px solid rgba(0,238,255,0.2)", background:"rgba(0,238,255,0.06)", marginBottom:24 }}>
            <span className="te-glow" style={{ width:7, height:7, borderRadius:"50%", background:"#00EEFF", display:"inline-block" }} />
            <span className="te-mono" style={{ color:"#00EEFF", fontSize:11, fontWeight:700, letterSpacing:"0.18em" }}>THE TEAM</span>
          </div>
          <h1 className="te-display te-fadeUp" style={{ fontSize:"clamp(38px,5.5vw,72px)", fontWeight:800, lineHeight:1.04, letterSpacing:"-0.03em", marginBottom:24, animationDelay:"0.08s", opacity:0 }}>
            <span style={{ color:"white" }}>People who</span><br />
            <span className="te-shimmer" style={{ background:"linear-gradient(90deg,#00EEFF 0%,#4F46E5 45%,#A78BFA 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              make it happen
            </span>
          </h1>
          <p className="te-fadeUp" style={{ color:"#64748B", fontSize:"clamp(15px,1.6vw,18px)", lineHeight:1.75, maxWidth:540, marginBottom:40, animationDelay:"0.15s", opacity:0, fontFamily:"'DM Sans',sans-serif" }}>
            TechEra runs on passion and collaboration. Every department is led by dedicated members who give their time, skills, and creativity to build something worth being part of.
          </p>
          <div className="te-fadeUp" style={{ display:"flex", gap:36, flexWrap:"wrap", animationDelay:"0.22s", opacity:0 }}>
            {[
              { val:`${totalMembers}+`, label:"Total Members", color:"#00EEFF" },
              { val:`${departments.length}`, label:"Departments", color:"#A78BFA" },
              { val:"3", label:"Founders", color:"#4F46E5" },
            ].map((s,i) => (
              <div key={i}>
                <div className="te-mono" style={{ fontSize:36, fontWeight:900, color:s.color, lineHeight:1 }}>{s.val}</div>
                <div style={{ fontSize:11, color:"#475569", marginTop:5, textTransform:"uppercase", letterSpacing:"0.1em", fontFamily:"'DM Sans',sans-serif" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="te-hero-orbit" style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
          <div style={{ position:"relative", width:230, height:230 }}>
            <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:80, height:80, borderRadius:"50%", background:"rgba(0,238,255,0.12)", filter:"blur(22px)" }} />
            <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:60, height:60, borderRadius:18, background:"linear-gradient(135deg,#00EEFF,#4F46E5)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span className="te-mono" style={{ color:"#050D1A", fontWeight:900, fontSize:16 }}>TE</span>
            </div>
            {[[0.78,0.11,"solid","rgba(0,238,255,0.10)"],[1.05,-0.025,"dashed","rgba(79,70,229,0.12)"],[1.32,-0.16,"solid","rgba(0,238,255,0.07)"]].map(([sc,off,st,cl],i)=>(
              <div key={i} style={{ position:"absolute", width:`${sc*100}%`, height:`${sc*100}%`, top:`${off*100}%`, left:`${off*100}%`, borderRadius:"50%", border:`1px ${st} ${cl}` }} />
            ))}
            <div style={{ position:"absolute", top:"50%", left:"50%", marginLeft:-4, marginTop:-4, width:8, height:8, borderRadius:"50%", background:"#00EEFF", boxShadow:"0 0 8px #00EEFF", animation:"te-orbit 8s linear infinite" }} />
            <div style={{ position:"absolute", top:"50%", left:"50%", marginLeft:-4, marginTop:-4, width:7, height:7, borderRadius:"50%", background:"#A78BFA", boxShadow:"0 0 8px #A78BFA", animation:"te-orbitR 12s linear infinite" }} />
            {orbitIcons.map((icon,i)=>{
              const angle=(i*90*Math.PI)/180, r=96;
              return (
                <div key={i} style={{ position:"absolute", top:"50%", left:"50%", width:36, height:36, borderRadius:11, background:"rgba(10,22,40,0.92)", border:"1px solid rgba(0,238,255,0.14)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, transform:`translate(-50%,-50%) translate(${Math.cos(angle)*r}px,${Math.sin(angle)*r}px)`, animation:`te-float ${3+i*.5}s ease-in-out infinite`, animationDelay:`${i*.4}s` }}>
                  {icon}
                </div>
              );
            })}
          </div>
          <p className="te-mono" style={{ color:"#1E3A5F", fontSize:11, marginTop:22, letterSpacing:"0.14em" }}>// techera.departments</p>
        </div>
      </div>


    </section>
  );
}

// ════════════════════════════════════════════════════════════
//  MANAGEMENT CARD
// ════════════════════════════════════════════════════════════

function ManagementCard({ person }) {
  const [hov, setHov] = useState(false);
  return (
    <article className="mgmt-card"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ borderColor:hov?`${person.accent}33`:"rgba(255,255,255,.05)", boxShadow:hov?`0 20px 56px ${person.accent}1a`:"none" }}
    >
      <div className="mgmt-top" style={{ background:person.grad }} />
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:`radial-gradient(ellipse at top,${person.accent}0e,transparent 55%)`, opacity:hov?1:0, transition:"opacity .45s" }} />

      <div className="mgmt-avatar-area">
        <div className="mgmt-ring" style={{ background:person.grad, boxShadow:hov?`0 6px 28px ${person.accent}28`:"none" }}>
          <div className="mgmt-inner">
            {person.image
              ? <img src={person.image} alt={person.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", borderRadius:"50%" }} />
              : <span className="mgmt-initials" style={{ color:person.accent }}>{person.initials}</span>
            }
          </div>
        </div>
        <span className="mgmt-tag" style={{ color:person.accent, border:`1px solid ${person.accent}35`, background:`${person.accent}11` }}>{person.tag}</span>
      </div>

      <div className="mgmt-body">
        <div className="mgmt-name">{person.name}</div>
        <div className="mgmt-role" style={{ color:person.accent }}>{person.role}</div>
        <div className="mgmt-bio">{person.bio}</div>
        <div className="mgmt-socials">
          {[
            { href:person.github,    label:"GitHub",    Icon:GHIcon },
            { href:person.linkedin,  label:"LinkedIn",  Icon:LIIcon },
            { href:person.instagram, label:"Instagram", Icon:IGIcon },
          ].map(({ href, label, Icon }) => {
            const ok = href && href !== "#";
            return (
              <a key={label} href={ok?href:undefined} target={ok?"_blank":undefined} rel="noreferrer"
                aria-label={label} className="mgmt-soc-btn" style={{ cursor:ok?"pointer":"default" }}
                onMouseEnter={e=>{ e.currentTarget.style.color=person.accent; e.currentTarget.style.borderColor=`${person.accent}35`; e.currentTarget.style.background=`${person.accent}11`; }}
                onMouseLeave={e=>{ e.currentTarget.style.color="#475569"; e.currentTarget.style.borderColor="rgba(255,255,255,.07)"; e.currentTarget.style.background="rgba(255,255,255,.025)"; }}
              ><Icon /></a>
            );
          })}
        </div>
      </div>
    </article>
  );
}

// ════════════════════════════════════════════════════════════
//  MANAGEMENT SECTION  — side-by-side on laptop, stacked on mobile
// ════════════════════════════════════════════════════════════

function ManagementSection() {
  const hasManagers = managers.length > 0;
  const hasCoords   = seniorCoordinators.length > 0;

  return (
    <section style={{ position:"relative", padding:"clamp(56px,8vw,100px) 28px", background:"#050D1A", overflow:"hidden" }}>
      {/* top divider */}
      <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"min(800px,90%)", height:1, background:"linear-gradient(90deg,transparent,rgba(0,238,255,.18),transparent)" }} />
      {/* ambient blobs */}
      <div style={{ position:"absolute", top:60, right:0, width:"min(300px,40vw)", height:"min(300px,40vw)", borderRadius:"50%", background:"rgba(79,70,229,.07)", filter:"blur(90px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:40, left:0, width:"min(240px,35vw)", height:"min(240px,35vw)", borderRadius:"50%", background:"rgba(0,238,255,.05)", filter:"blur(70px)", pointerEvents:"none" }} />

      <div style={{ maxWidth:1200, margin:"0 auto", position:"relative" }}>

        {/* ── Section heading ── */}
        <div style={{ textAlign:"center", marginBottom:"clamp(36px,5vw,56px)" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px", borderRadius:999, border:"1px solid rgba(79,70,229,.3)", background:"rgba(79,70,229,.1)", marginBottom:16 }}>
            <span className="te-mono" style={{ color:"#A78BFA", fontSize:11, fontWeight:700, letterSpacing:"0.2em" }}>LEADERSHIP</span>
          </div>
          <h2 className="te-display" style={{ fontSize:"clamp(26px,4.5vw,50px)", fontWeight:800, color:"white", letterSpacing:"-.03em", lineHeight:1.1, marginBottom:12 }}>
            Managers &amp;{" "}
            <span style={{ background:"linear-gradient(135deg,#00EEFF,#4F46E5)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Senior Coordinators
            </span>
          </h2>
          <p style={{ color:"#64748B", fontSize:"clamp(14px,1.8vw,16px)", maxWidth:460, margin:"0 auto", lineHeight:1.7, fontFamily:"'DM Sans',sans-serif" }}>
            The core ops layer — driving strategy, alignment, and execution across TechEra.
          </p>
        </div>

        {/* ── Side-by-side columns ── */}
        <div className="mgmt-combined-row">

          {/* Left column — Managers */}
          {hasManagers && (
            <div className="mgmt-column">
              {/* Column label */}
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"4px 12px", borderRadius:999, border:"1px solid rgba(0,238,255,.18)", background:"rgba(0,238,255,.05)", flexShrink:0 }}>
                  <span className="te-mono" style={{ color:"#00EEFF", fontSize:10, fontWeight:700, letterSpacing:"0.16em" }}>MANAGERS</span>
                </div>
                <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(0,238,255,.15),transparent)" }} />
              </div>
              {/* Cards */}
              <div className="mgmt-column-cards">
                {managers.map(m => <ManagementCard key={m.id} person={m} />)}
              </div>
            </div>
          )}

          {/* Right column — Senior Coordinators */}
          {hasCoords && (
            <div className="mgmt-column">
              {/* Column label */}
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"4px 12px", borderRadius:999, border:"1px solid rgba(52,211,153,.18)", background:"rgba(52,211,153,.05)", flexShrink:0 }}>
                  <span className="te-mono" style={{ color:"#34D399", fontSize:10, fontWeight:700, letterSpacing:"0.16em" }}>SR. COORDINATORS</span>
                </div>
                <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(52,211,153,.15),transparent)" }} />
              </div>
              {/* Cards */}
              <div className="mgmt-column-cards">
                {seniorCoordinators.map(sc => <ManagementCard key={sc.id} person={sc} />)}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
//  DEPARTMENTS
// ════════════════════════════════════════════════════════════

function LeadCard({ person, label, color, showGithub = false }) {
  const [hov, setHov] = useState(false);
  return (
    <div className="te-card-lift"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position:"relative", borderRadius:22, overflow:"hidden", background:"rgba(10,22,40,0.9)", backdropFilter:"blur(20px)", border:hov?`1px solid ${color}2e`:"1px solid rgba(255,255,255,0.06)", boxShadow:hov?`0 16px 50px rgba(0,0,0,0.4),0 0 30px ${color}08`:"none" }}>
      <div style={{ height:3, background:`linear-gradient(90deg,${color},transparent)`, opacity:hov?1:0.4, transition:"opacity .3s" }} />
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:`radial-gradient(ellipse at top left,${color}09,transparent 60%)`, opacity:hov?1:0, transition:"opacity .45s" }} />
      <div style={{ position:"relative", display:"flex", alignItems:"stretch", padding:"20px 20px 20px 22px", minHeight:160 }}>
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:10, paddingRight:16, minWidth:0 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4, flexWrap:"wrap" }}>
              <h4 className="te-display" style={{ fontSize:18, fontWeight:700, color:"white", lineHeight:1.2 }}>{person.name}</h4>
              <Pill text={label} color={color} />
            </div>
            <p className="te-mono" style={{ fontSize:10.5, color, fontWeight:600, letterSpacing:"0.05em" }}>{person.role}</p>
          </div>
          <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
            {person.skills && person.skills.map(s => <SkillTag key={s} text={s} />)}
          </div>
          <div style={{ display:"flex", gap:8, marginTop:"auto", paddingTop:6 }}>
            <LinkedInBtn href={person.linkedin} color={color} size={30} />
            {showGithub && <GitHubBtn href={person.github} color={color} size={30} />}
          </div>
        </div>
        <div style={{ width:110, height:130, borderRadius:16, overflow:"hidden", flexShrink:0, background:`linear-gradient(135deg,${color}18,${color}06)`, border:`1.5px solid ${color}20`, alignSelf:"center" }}>
          {person.image
            ? <img src={person.image} alt={person.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }} />
            : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}><span className="te-mono" style={{ fontSize:34, fontWeight:900, color, opacity:0.55 }}>{person.initials}</span></div>
          }
        </div>
      </div>
    </div>
  );
}

function MemberChip({ member, color }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 14px", borderRadius:14, cursor:"default", transition:"all .22s", border:hov?`1px solid ${color}25`:"1px solid rgba(255,255,255,0.05)", background:hov?`${color}07`:"rgba(255,255,255,0.02)" }}>
      <div style={{ width:38, height:38, borderRadius:11, background:`${color}14`, border:`1px solid ${color}24`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        <span className="te-mono" style={{ fontSize:11, fontWeight:800, color }}>{member.initials}</span>
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13.5, fontWeight:600, color:hov?"white":"#CBD5E1", transition:"color .2s", fontFamily:"'DM Sans',sans-serif", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{member.name}</div>
        <div style={{ fontSize:11, color:"#475569", marginTop:1, fontFamily:"'DM Sans',sans-serif" }}>{member.role}</div>
      </div>
      <LinkedInBtn href={member.linkedin} color={color} size={28} />
    </div>
  );
}

function DepartmentBlock({ dept }) {
  const [expanded, setExpanded] = useState(false);
  const PREVIEW = 4;
  const shown = expanded ? dept.members : dept.members.slice(0, PREVIEW);
  const extra = dept.members.length - PREVIEW;
  const isTech = dept.id === "tech";
  return (
    <div style={{ marginBottom:52 }}>
      <div style={{ position:"relative", borderRadius:20, padding:"26px 30px", marginBottom:24, border:"1px solid rgba(255,255,255,0.05)", overflow:"hidden", background:dept.gradient }}>
        <div style={{ position:"absolute", left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${dept.color}35,transparent)`, animation:"te-scan 7s linear infinite", pointerEvents:"none" }} />
        <div style={{ display:"flex", alignItems:"flex-start", gap:18, position:"relative" }}>
          <div style={{ width:52, height:52, borderRadius:16, background:`${dept.color}18`, border:`1.5px solid ${dept.color}2e`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{dept.icon}</div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:6, flexWrap:"wrap" }}>
              <h3 className="te-display" style={{ fontSize:20, fontWeight:800, color:"white", letterSpacing:"-0.01em" }}>{dept.name}</h3>
              <div style={{ padding:"2px 10px", borderRadius:999, background:`${dept.color}12`, border:`1px solid ${dept.color}22` }}>
                <span className="te-mono" style={{ fontSize:10, fontWeight:700, color:dept.color }}>{dept.members.length+2} members</span>
              </div>
            </div>
            <p style={{ color:"#64748B", fontSize:13.5, lineHeight:1.65, fontFamily:"'DM Sans',sans-serif" }}>{dept.description}</p>
          </div>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16, marginBottom:20 }}>
        <LeadCard person={dept.lead}   label="LEAD"    color={dept.color} showGithub={isTech} />
        <LeadCard person={dept.coLead} label="CO-LEAD" color={dept.color} showGithub={isTech} />
      </div>
      {dept.members.length > 0 && (
        <>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
            <span className="te-mono" style={{ fontSize:10, color:"#334155", textTransform:"uppercase", letterSpacing:"0.12em" }}>Members</span>
            <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.04)" }} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:10 }}>
            {shown.map(m => <MemberChip key={m.id} member={m} color={dept.color} />)}
          </div>
          {extra > 0 && (
            <button onClick={() => setExpanded(!expanded)}
              style={{ marginTop:12, padding:"7px 16px", borderRadius:10, cursor:"pointer", border:`1px solid ${dept.color}25`, background:`${dept.color}08`, color:dept.color, fontSize:12, fontWeight:700, fontFamily:"'JetBrains Mono',monospace", transition:"background .2s", display:"flex", alignItems:"center", gap:6 }}>
              {expanded ? "Show less ↑" : `+${extra} more ↓`}
            </button>
          )}
        </>
      )}
    </div>
  );
}

function DeptFilterBar({ active, onChange }) {
  const all = [{ id:"all", label:"All", icon:"✦" }, ...departments.map(d => ({ id:d.id, label:d.name.split(" ")[0], icon:d.icon }))];
  return (
    <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center" }}>
      {all.map(f => (
        <button key={f.id} className={`te-filter-btn${active===f.id?" active":""}`} onClick={() => onChange(f.id)}>
          <span style={{ marginRight:6 }}>{f.icon}</span>{f.label}
        </button>
      ))}
    </div>
  );
}

function DepartmentsSection() {
  const [active, setActive] = useState("all");
  const visible = active === "all" ? departments : departments.filter(d => d.id === active);
  return (
    <section style={{ padding:"0 0 96px", position:"relative", background:"#050D1A", width:"100%" }}>
      <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"90%", maxWidth:900, height:1, background:"linear-gradient(90deg,transparent,rgba(0,238,255,.18),transparent)" }} />
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"56px 28px 0" }}>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:36 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"5px 14px", borderRadius:999, border:"1px solid rgba(0,238,255,0.2)", background:"rgba(0,238,255,0.06)" }}>
            <span className="te-mono" style={{ color:"#00EEFF", fontSize:10, fontWeight:700, letterSpacing:"0.18em" }}>DEPARTMENTS</span>
          </div>
          <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(0,238,255,.22),transparent)" }} />
        </div>
        <div style={{ marginBottom:52 }}><DeptFilterBar active={active} onChange={setActive} /></div>
        <div key={active}>
          {visible.map((dept,i) => (
            <div key={dept.id} className="te-fadeUp" style={{ animationDelay:`${i*.06}s`, opacity:0 }}>
              <DepartmentBlock dept={dept} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
//  JOIN CTA
// ════════════════════════════════════════════════════════════

function TeamCTA() {
  return (
    <section id="join" style={{ padding:"0 0 100px", background:"#050D1A", width:"100%" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 28px" }}>
        <div style={{ position:"relative", borderRadius:28, overflow:"hidden", border:"1px solid rgba(255,255,255,0.06)", background:"linear-gradient(135deg,rgba(79,70,229,0.12) 0%,rgba(10,22,40,0.92) 50%,rgba(0,238,255,0.08) 100%)" }}>
          <div className="te-dot-bg" style={{ position:"absolute", inset:0, pointerEvents:"none" }} />
          {[
            { pos:{top:0,left:0},     borderTop:"1.5px solid rgba(0,238,255,0.15)", borderLeft:"1.5px solid rgba(0,238,255,0.15)",  borderRadius:"22px 0 0 0" },
            { pos:{top:0,right:0},    borderTop:"1.5px solid rgba(0,238,255,0.15)", borderRight:"1.5px solid rgba(0,238,255,0.15)", borderRadius:"0 22px 0 0" },
            { pos:{bottom:0,left:0},  borderBottom:"1.5px solid rgba(0,238,255,0.15)", borderLeft:"1.5px solid rgba(0,238,255,0.15)", borderRadius:"0 0 0 22px" },
            { pos:{bottom:0,right:0}, borderBottom:"1.5px solid rgba(0,238,255,0.15)", borderRight:"1.5px solid rgba(0,238,255,0.15)", borderRadius:"0 0 22px 0" },
          ].map(({pos,...styles},i) => <div key={i} style={{ position:"absolute", ...pos, width:48, height:48, ...styles }} />)}
          <div style={{ position:"relative", padding:"clamp(40px,6vw,72px) clamp(32px,5vw,56px)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:32, flexWrap:"wrap" }}>
            <div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"5px 14px", borderRadius:999, border:"1px solid rgba(0,238,255,0.18)", background:"rgba(0,238,255,0.06)", marginBottom:18 }}>
                <span className="te-glow" style={{ width:7, height:7, borderRadius:"50%", background:"#00EEFF", display:"inline-block" }} />
                <span className="te-mono" style={{ color:"#00EEFF", fontSize:10, fontWeight:700, letterSpacing:"0.15em" }}>OPEN RECRUITMENT</span>
              </div>
              <h3 className="te-display" style={{ fontSize:"clamp(24px,3vw,38px)", fontWeight:800, color:"white", letterSpacing:"-0.02em", marginBottom:10 }}>Want to join the team?</h3>
              <p style={{ color:"#64748B", fontSize:15, maxWidth:480, lineHeight:1.7, fontFamily:"'DM Sans',sans-serif" }}>We're always looking for passionate people. Pick a department, bring your skills, and help us build something meaningful.</p>
            </div>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", flexShrink:0 }}>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSehz9Yy6i5WFw1O3tDYtEkb414jtoWGlf1FFKYlbZG_W8Useg/viewform" className="te-btn">
                Apply Now
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
              <a href="/" style={{ padding:"11px 24px", borderRadius:12, fontWeight:600, fontSize:14, color:"#64748B", border:"1px solid rgba(255,255,255,0.08)", background:"rgba(255,255,255,0.03)", textDecoration:"none", transition:"all .22s", fontFamily:"'DM Sans',sans-serif" }}
                onMouseEnter={e=>{ e.currentTarget.style.color="white"; e.currentTarget.style.borderColor="rgba(255,255,255,0.15)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.color="#64748B"; e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; }}>
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
        <ManagementSection />
        <DepartmentsSection />
        <TeamCTA />
      </main>
      <Footer />
    </div>
  );
}