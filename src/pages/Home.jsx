  import { useEffect, useRef, useState } from "react";
  import Navbar from "../components/Navbar";
  import Footer from "../components/Footer";

  // ─── DATA ────────────────────────────────────────────────────────────────────

  const siteConfig = {
    tagline: "CONNECT · INNOVATE · BUILD",
    heroSubline:
      "TechEra is a student-led tech community organizing events, hackathons, workshops, and collaborations that shape the next generation of innovators.",
    ctaJoin: "Join TechEra",
    ctaExplore: "Explore Events",
    missionDescription:
      "We believe every student deserves access to a powerful network, real-world experience, and the encouragement to build without limits. TechEra is that place.",
  };

  const founders = [
    { id: 1, name: "Aditya Choubey",  role: "Founder & Visionary",       bio: "A passionate community builder and tech enthusiast focused on empowering developers through events, collaborations, and real-world opportunities. Dedicated to creating impactful ecosystems where students, innovators, and industry leaders connect, learn, and grow together.",          initials: "AM", github: "https://github.com/Adityachoubey26", linkedin: "https://www.linkedin.com/in/aditya-c-366b90305", instagram: "https://www.instagram.com/aditya_choubey26?igsh=cTcyYXRvaHNodzgw", tag: "Founder", image: "/images/founder-techera.jpg" , accent: "#00EEFF", grad: "linear-gradient(135deg,#00EEFF,#4F46E5)" },
    { id: 2, name: "Arnav Das", role: "Co-Founder",   bio: "UI/UX designer turning complex problems into delightful digital experiences for growing communities.",           initials: "PS", github: "#", linkedin: "#", instagram: "#", tag: "Co-Founder", image: "/images/cofounder-1.jpg" , accent: "#A78BFA", grad: "linear-gradient(135deg,#4F46E5,#A78BFA)" },
    { id: 3, name: "Amrita Singh",  role: "Co-Founder",     bio: "Co-Founder at TechEra, passionate about building tech communities and creating opportunities for innovation and collaboration. Frontend Developer focused on turning ideas into impactful digital experiences.",  image: "/images/cofounder-2.jpg",        initials: "RV", github: "https://github.com/Amritas851203", linkedin: "https://www.linkedin.com/in/amrita-singh-579262331?utm_source=share_via&utm_content=profile&utm_medium=member_android", instagram: "https://www.instagram.com/amrita_singh.leads?igsh=MTFpNG80ZGtxOG1xMg==", tag: "Co-Founder",    accent: "#06B6D4", grad: "linear-gradient(135deg,#A78BFA,#00EEFF)" },
  ];

  const missionPoints = [
    { id: 1, icon: "⚡", title: "Connect",  description: "Bridge the gap between passionate learners, experienced mentors, and industry leaders in a thriving network.", accent: "#00EEFF" },
    { id: 2, icon: "🚀", title: "Innovate", description: "Host hackathons, workshops, and ideathons that push the boundaries of what student developers can build.",     accent: "#4F46E5" },
    { id: 3, icon: "🛠️", title: "Build",    description: "From side projects to startups — we give members the resources, mentorship, and community to ship real products.", accent: "#A78BFA" },
  ];

  const stats = [
    { id: 1, value: "1500+", label: "Members" },
    { id: 2, value: "30+",  label: "Events"  },
    { id: 3, value: "20+",  label: "Collabs" },
    { id: 4, value: "7+",  label: "Depts"   },
  ];

  // ─── GLOBAL STYLES (fonts injected by Navbar, same family as Team page) ──────

  const GlobalStyles = () => (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html, body { overflow-x: hidden; max-width: 100%; background: #050D1A; }

      /* ── Shared font aliases (mirrors Team page) ── */
      .te-display { font-family: 'Syne', sans-serif !important; }
      .te-mono    { font-family: 'JetBrains Mono', monospace !important; }
      .te-body    { font-family: 'DM Sans', sans-serif !important; }

      @keyframes shimmer    { 0%{background-position:0% center}100%{background-position:200% center} }
      @keyframes fadeUp     { from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)} }
      @keyframes pulseGlow  { 0%,100%{opacity:0.5}50%{opacity:1} }
      @keyframes blink      { 0%,100%{opacity:1}50%{opacity:0} }
      @keyframes pingAnim   { 75%,100%{transform:scale(2.1);opacity:0} }
      @keyframes te-glow    { 0%,100%{opacity:.45}50%{opacity:1} }

      .f1{animation:fadeUp .6s ease-out .08s both}
      .f2{animation:fadeUp .6s ease-out .2s both}
      .f3{animation:fadeUp .6s ease-out .32s both}
      .f4{animation:fadeUp .6s ease-out .44s both}
      .f5{animation:fadeUp .6s ease-out .56s both}

      .shimmer-text{
        background:linear-gradient(90deg,#00EEFF 0%,#4F46E5 40%,#A78BFA 70%,#00EEFF 100%);
        background-size:200% auto;
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        animation:shimmer 4s linear infinite;
      }
      .grad-text{
        background:linear-gradient(135deg,#00EEFF,#4F46E5);
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
      }

      /* ── HERO ── */
      .hero{position:relative;min-height:100vh;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;background:#050D1A}
      .hero canvas{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;display:block}
      .hero-content{position:relative;z-index:10;width:100%;max-width:920px;margin:0 auto;padding:96px 24px 56px;text-align:center}
      .hero-pill{display:inline-flex;align-items:center;gap:8px;padding:6px 18px;border-radius:999px;border:1px solid rgba(0,238,255,.2);background:rgba(0,238,255,.05);margin-bottom:26px;backdrop-filter:blur(8px)}
      .hero-pill-dot{width:8px;height:8px;border-radius:50%;background:#00EEFF;animation:te-glow 2s ease-in-out infinite;flex-shrink:0}
      .hero-pill-text{color:#00EEFF;font-size:11px;font-weight:700;letter-spacing:.16em;font-family:'JetBrains Mono',monospace}
      .hero-h1{font-size:clamp(32px,7vw,80px);font-weight:800;line-height:1.05;letter-spacing:-.03em;margin-bottom:20px;color:white;font-family:'Syne',sans-serif}
      .hero-sub{color:#94A3B8;font-size:clamp(15px,2vw,18px);max-width:600px;margin:0 auto 44px;line-height:1.78;font-family:'DM Sans',sans-serif}
      .hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
      .btn-primary{display:inline-flex;align-items:center;gap:9px;padding:13px 30px;border-radius:14px;font-weight:700;font-size:15px;color:#050D1A;background:linear-gradient(135deg,#00EEFF,#4F46E5);text-decoration:none;transition:transform .28s,box-shadow .28s;font-family:'DM Sans',sans-serif}
      .btn-primary:hover{transform:scale(1.05);box-shadow:0 0 38px rgba(0,238,255,.4)}
      .btn-secondary{display:inline-flex;align-items:center;gap:8px;padding:13px 30px;border-radius:14px;font-weight:600;font-size:15px;color:#00EEFF;border:1px solid rgba(0,238,255,.3);background:rgba(0,238,255,.05);text-decoration:none;transition:transform .28s,border-color .28s,background .28s;backdrop-filter:blur(8px);font-family:'DM Sans',sans-serif}
      .btn-secondary:hover{transform:scale(1.04);border-color:rgba(0,238,255,.6);background:rgba(0,238,255,.1)}
      .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;max-width:520px;margin:0 auto}
      .stat-card{padding:16px 8px;border-radius:14px;border:1px solid rgba(255,255,255,.05);background:rgba(255,255,255,.025);text-align:center;transition:border-color .3s,background .3s}
      .stat-card:hover{border-color:rgba(0,238,255,.2);background:rgba(0,238,255,.05)}
      .stat-val{font-size:clamp(18px,3vw,26px);font-weight:900;color:#00EEFF;font-family:'JetBrains Mono',monospace}
      .stat-lbl{font-size:10px;color:#475569;text-transform:uppercase;letter-spacing:.12em;margin-top:4px;font-family:'DM Sans',sans-serif}
      .scroll-ind{position:absolute;bottom:24px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;opacity:.35;pointer-events:none}
      .scroll-line{width:1px;height:32px;background:linear-gradient(#00EEFF,transparent);animation:pulseGlow 2s ease-in-out infinite}

      /* ── FOUNDERS ── */
      .sec-founders{position:relative;padding:clamp(56px,9vw,108px) 24px;background:#050D1A;overflow:hidden}
      .founders-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
      .founder-card{position:relative;border-radius:22px;border:1px solid rgba(255,255,255,.05);background:#0A1628;overflow:hidden;transition:transform .4s cubic-bezier(.23,1,.32,1),border-color .4s,box-shadow .4s}
      .founder-card:hover{transform:translateY(-10px)}
      .founder-top{height:3px;width:100%}
      .founder-avatar-area{display:flex;flex-direction:column;align-items:center;padding:32px 20px 14px}
      .founder-ring{width:86px;height:86px;border-radius:50%;padding:2.5px;margin-bottom:14px;transition:box-shadow .35s,transform .35s}
      .founder-card:hover .founder-ring{transform:translateY(-4px)}
      .founder-inner{width:100%;height:100%;border-radius:50%;background:#0D1F3C;display:flex;align-items:center;justify-content:center}
      .founder-initials{font-size:26px;font-weight:900;font-family:'JetBrains Mono',monospace}
      .founder-tag{padding:4px 14px;border-radius:999px;font-size:10px;font-weight:700;font-family:'JetBrains Mono',monospace;letter-spacing:.06em}
      .founder-body{padding:4px 24px 26px;text-align:center}
      .founder-name{font-size:19px;font-weight:700;color:white;margin-bottom:4px;font-family:'Syne',sans-serif}
      .founder-role{font-size:11px;color:#6366F1;font-weight:600;margin-bottom:12px;font-family:'JetBrains Mono',monospace;letter-spacing:.04em}
      .founder-bio{color:#64748B;font-size:13.5px;line-height:1.75;margin-bottom:20px;font-family:'DM Sans',sans-serif}
      .socials{display:flex;justify-content:center;gap:10px}
      .soc-btn{width:36px;height:36px;border-radius:10px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.025);display:flex;align-items:center;justify-content:center;color:#475569;text-decoration:none;transition:color .2s,border-color .2s,background .2s,transform .2s}
      .soc-btn:hover{transform:scale(1.12)}

      /* ── MISSION ── */
      .sec-mission{position:relative;padding:clamp(56px,9vw,108px) 24px;background:linear-gradient(180deg,#050D1A 0%,#060D1D 50%,#050D1A 100%);overflow:hidden}
      .mission-layout{display:grid;grid-template-columns:1fr 1fr;gap:clamp(32px,5vw,72px);align-items:center}
      .mission-card{position:relative;display:flex;gap:18px;padding:22px 24px;border-radius:20px;border:1px solid rgba(255,255,255,.05);background:#0A1628;overflow:hidden;transition:transform .3s,border-color .3s,box-shadow .3s}
      .mission-card:hover{transform:translateY(-4px)}
      .mission-bar{position:absolute;left:0;top:50%;transform:translateY(-50%);width:3px;height:0;border-radius:0 4px 4px 0;transition:height .3s ease}
      .mission-card:hover .mission-bar{height:46px}
      .mission-icon{flex-shrink:0;width:52px;height:52px;border-radius:15px;display:flex;align-items:center;justify-content:center;font-size:22px}
      .mission-title{font-size:17px;font-weight:700;color:white;margin-bottom:6px;font-family:'Syne',sans-serif}
      .mission-desc{color:#64748B;font-size:13.5px;line-height:1.75;font-family:'DM Sans',sans-serif}
      .terminal{border-radius:16px;border:1px solid rgba(255,255,255,.06);background:#0A1628;overflow:hidden}
      .term-bar{padding:10px 16px;border-bottom:1px solid rgba(255,255,255,.05);display:flex;align-items:center;gap:8px}
      .term-dot{width:12px;height:12px;border-radius:50%;display:inline-block;flex-shrink:0}
      .term-body{padding:18px 20px;font-family:'JetBrains Mono',monospace;font-size:clamp(11px,1.4vw,13px);line-height:1.9}

      /* ── CTA ── */
      .sec-cta{position:relative;padding:clamp(56px,9vw,108px) 24px;background:#050D1A;overflow:hidden}
      .cta-card{position:relative;border-radius:30px;border:1px solid rgba(255,255,255,.06);background:#0A1628;overflow:hidden}
      .cta-inner{position:relative;padding:clamp(36px,7vw,84px) clamp(22px,6vw,80px);text-align:center}
      .cta-h2{font-size:clamp(26px,5.5vw,62px);font-weight:800;color:white;line-height:1.06;letter-spacing:-.03em;margin-bottom:18px;font-family:'Syne',sans-serif}
      .cta-sub{color:#64748B;font-size:clamp(14px,1.8vw,17px);max-width:460px;margin:0 auto 32px;line-height:1.75;font-family:'DM Sans',sans-serif}
      .perks-row{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:32px}
      .perk-tag{padding:6px 16px;border-radius:999px;font-size:12px;font-weight:700;color:#A78BFA;border:1px solid rgba(167,139,250,.2);background:rgba(167,139,250,.05);font-family:'DM Sans',sans-serif}
      .cta-btns{display:flex;flex-wrap:wrap;gap:14px;justify-content:center}
      .cta-btn-p{display:inline-flex;align-items:center;gap:9px;justify-content:center;padding:15px 38px;border-radius:16px;font-weight:700;font-size:15px;color:#050D1A;background:linear-gradient(135deg,#00EEFF,#4F46E5);text-decoration:none;transition:transform .28s,box-shadow .28s;font-family:'DM Sans',sans-serif}
      .cta-btn-p:hover{transform:scale(1.04);box-shadow:0 0 46px rgba(0,238,255,.36)}
      .cta-btn-s{display:inline-flex;align-items:center;gap:9px;justify-content:center;padding:15px 38px;border-radius:16px;font-weight:600;font-size:15px;color:#94A3B8;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);text-decoration:none;transition:color .25s,border-color .25s,background .25s;backdrop-filter:blur(8px);font-family:'DM Sans',sans-serif}
      .cta-btn-s:hover{color:white;border-color:rgba(255,255,255,.16);background:rgba(255,255,255,.06)}

      /* SHARED */
      .sec-head{text-align:center;margin-bottom:clamp(36px,5vw,60px)}
      .sec-pill{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:999px;margin-bottom:16px}
      .sec-pill-text{font-size:11px;font-weight:700;letter-spacing:.2em;font-family:'JetBrains Mono',monospace}
      .sec-h2{font-size:clamp(26px,4.5vw,50px);font-weight:800;color:white;letter-spacing:-.03em;margin-bottom:12px;line-height:1.1;font-family:'Syne',sans-serif}
      .sec-sub{color:#64748B;font-size:clamp(14px,1.8vw,17px);max-width:480px;margin:0 auto;line-height:1.7;font-family:'DM Sans',sans-serif}
      .sec-divider{position:absolute;top:0;left:50%;transform:translateX(-50%);width:min(800px,90%);height:1px}

      /* grid bg (shared with team page) */
      .te-grid-bg{
        background-image:
          linear-gradient(rgba(0,238,255,.022) 1px,transparent 1px),
          linear-gradient(90deg,rgba(0,238,255,.022) 1px,transparent 1px);
        background-size:60px 60px;
      }

      /* RESPONSIVE */
      @media(max-width:1023px){
        .founders-grid{grid-template-columns:repeat(2,1fr)}
        .mission-layout{grid-template-columns:1fr}
      }
      @media(max-width:767px){
        .founders-grid{grid-template-columns:1fr;max-width:400px;margin:0 auto}
        .stats-grid{grid-template-columns:repeat(2,1fr)!important}
        .hero-ctas{flex-direction:column;align-items:center}
        .btn-primary,.btn-secondary{width:100%;max-width:320px;justify-content:center}
        .cta-btns{flex-direction:column;align-items:center}
        .cta-btn-p,.cta-btn-s{width:100%;max-width:320px}
      }
      @media(max-width:479px){
        .sec-founders,.sec-mission,.sec-cta{padding-left:14px;padding-right:14px}
        .hero-content{padding-left:16px;padding-right:16px}
      }
    `}</style>
  );

  // ─── ICONS ───────────────────────────────────────────────────────────────────

  const GitHubIcon   = () => <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>;
  const LinkedInIcon = () => <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
  const InstaIcon    = () => <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
  const ArrowRight   = () => <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ flexShrink: 0 }}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>;
  const ChevRight    = () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ flexShrink: 0 }}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>;

  // ─── HERO ────────────────────────────────────────────────────────────────────

  function HeroSection() {
    const canvasRef = useRef(null);
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      let raf;
      const resize = () => {
        const parent = canvas.parentElement;
        canvas.width  = parent.clientWidth;
        canvas.height = parent.clientHeight;
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas.parentElement);

      const pts = Array.from({ length: 50 }, () => ({
        x: Math.random(), y: Math.random(),
        vx: (Math.random() - .5) * .00035, vy: (Math.random() - .5) * .00035,
        r: Math.random() * 1.3 + .4, a: Math.random() * .35 + .1,
      }));

      const draw = () => {
        const w = canvas.width, h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        pts.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > 1) p.vx *= -1;
          if (p.y < 0 || p.y > 1) p.vy *= -1;
          ctx.beginPath();
          ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,238,255,${p.a})`;
          ctx.fill();
        });
        const thresh = Math.min(w, h) * .11;
        pts.forEach((a, i) => {
          const ax = a.x * w, ay = a.y * h;
          pts.slice(i + 1).forEach(b => {
            const d = Math.hypot(ax - b.x * w, ay - b.y * h);
            if (d < thresh) {
              ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(b.x * w, b.y * h);
              ctx.strokeStyle = `rgba(0,238,255,${.05 * (1 - d / thresh)})`;
              ctx.lineWidth = .5; ctx.stroke();
            }
          });
        });
        raf = requestAnimationFrame(draw);
      };
      draw();
      return () => { cancelAnimationFrame(raf); ro.disconnect(); };
    }, []);

    return (
      <section className="hero te-grid-bg">
        <canvas ref={canvasRef} />
        <div style={{ position:"absolute", top:"22%", left:"50%", transform:"translate(-50%,-50%)", width:"min(680px,85vw)", height:"min(680px,85vw)", borderRadius:"50%", background:"rgba(79,70,229,.11)", filter:"blur(120px)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"20%", right:"10%", width:"min(360px,45vw)", height:"min(360px,45vw)", borderRadius:"50%", background:"rgba(0,238,255,.06)", filter:"blur(90px)", pointerEvents:"none" }} />

        <div className="hero-content">
          <div className="f1">
            <div className="hero-pill">
              <span className="hero-pill-dot" />
              <span className="hero-pill-text">{siteConfig.tagline}</span>
            </div>
          </div>
          <h1 className="hero-h1 f2">The Community Where<br /><span className="shimmer-text">Builders Belong</span></h1>
          <p className="hero-sub f3">{siteConfig.heroSubline}</p>
          <div className="hero-ctas f4">
            <a href="https://chat.whatsapp.com/L5i3gkwI7gSErhUivmShMO" className="btn-primary">{siteConfig.ctaJoin} <ArrowRight /></a>
            <a href="/events" className="btn-secondary">{siteConfig.ctaExplore} <ChevRight /></a>
          </div>
          <div className="stats-grid f5">
            {stats.map(s => (
              <div key={s.id} className="stat-card">
                <div className="stat-val">{s.value}</div>
                <div className="stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-ind">
          <span style={{ fontSize:10, color:"#64748B", textTransform:"uppercase", letterSpacing:".14em", fontFamily:"'DM Sans',sans-serif" }}>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>
    );
  }

  // ─── FOUNDERS ────────────────────────────────────────────────────────────────

  function FounderCard({ f }) {
    const [hov, setHov] = useState(false);
    return (
      <article className="founder-card"
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ borderColor: hov ? `${f.accent}33` : "rgba(255,255,255,.05)", boxShadow: hov ? `0 20px 56px ${f.accent}1a` : "none" }}
      >
        <div className="founder-top" style={{ background: f.grad }} />
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:`radial-gradient(ellipse at top,${f.accent}0e,transparent 55%)`, opacity: hov ? 1 : 0, transition:"opacity .45s" }} />
        <div className="founder-avatar-area">
          <div className="founder-ring" style={{ background: f.grad, boxShadow: hov ? `0 6px 28px ${f.accent}28` : "none" }}>
            <div className="founder-inner" style={{ overflow: "hidden" }}>
              {f.image ? (
                <img
                  src={f.image}
                  alt={f.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",      // 👈 image crop & fill karega circle
                    objectPosition: "center",// 👈 face center rahega
                    borderRadius: "50%",
                    boxShadow: "0 0 20px rgba(0,0,0,0.4)" // 👈 yaha add karna hai
                  }}
                />
              ) : (
                <span
                  className="founder-initials"
                  style={{ color: f.accent }}
                >
                  {f.initials}
                </span>
              )}
            </div>
          </div>
          <span className="founder-tag" style={{ color: f.accent, border:`1px solid ${f.accent}35`, background:`${f.accent}11` }}>{f.tag}</span>
        </div>
        <div className="founder-body">
          <div className="founder-name">{f.name}</div>
          <div className="founder-role">{f.role}</div>
          <div className="founder-bio">{f.bio}</div>
          <div className="socials">
            {[
              { href: f.github,    label: "GitHub",    Icon: GitHubIcon },
              { href: f.linkedin,  label: "LinkedIn",  Icon: LinkedInIcon },
              { href: f.instagram, label: "Instagram", Icon: InstaIcon },
            ].map(({ href, label, Icon }) => (
              <a key={label} href={href} aria-label={label} className="soc-btn"
                onMouseEnter={e => { e.currentTarget.style.color=f.accent; e.currentTarget.style.borderColor=`${f.accent}35`; e.currentTarget.style.background=`${f.accent}11`; }}
                onMouseLeave={e => { e.currentTarget.style.color="#475569"; e.currentTarget.style.borderColor="rgba(255,255,255,.07)"; e.currentTarget.style.background="rgba(255,255,255,.025)"; }}
              ><Icon /></a>
            ))}
          </div>
        </div>
      </article>
    );
  }

  function FoundersSection() {
    return (
      <section id="team" className="sec-founders">
        <div className="sec-divider" style={{ background:"linear-gradient(90deg,transparent,rgba(0,238,255,.22),transparent)" }} />
        <div style={{ position:"absolute", top:50, right:20, width:"min(240px,36vw)", height:"min(240px,36vw)", borderRadius:"50%", background:"rgba(79,70,229,.07)", filter:"blur(80px)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:50, left:20, width:"min(180px,30vw)", height:"min(180px,30vw)", borderRadius:"50%", background:"rgba(0,238,255,.05)", filter:"blur(60px)", pointerEvents:"none" }} />
        <div style={{ maxWidth:1152, margin:"0 auto", position:"relative" }}>
          <div className="sec-head">
            <div className="sec-pill" style={{ border:"1px solid rgba(79,70,229,.3)", background:"rgba(79,70,229,.1)" }}>
              <span className="sec-pill-text" style={{ color:"#A78BFA" }}>MEET THE TEAM</span>
            </div>
            <h2 className="sec-h2">The People Behind <span className="grad-text">TechEra</span></h2>
            <p className="sec-sub">Driven by curiosity. Built on community. Meet the founders who started it all.</p>
          </div>
          <div className="founders-grid">
            {founders.map(f => <FounderCard key={f.id} f={f} />)}
          </div>
        </div>
      </section>
    );
  }

  // ─── MISSION ─────────────────────────────────────────────────────────────────

  function MissionCard({ pt }) {
    const [hov, setHov] = useState(false);
    return (
      <article className="mission-card"
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ borderColor: hov ? `${pt.accent}3a` : "rgba(255,255,255,.05)", boxShadow: hov ? "0 10px 36px rgba(0,0,0,.28)" : "none" }}
      >
        <div className="mission-bar" style={{ background:`linear-gradient(${pt.accent},#4F46E5)` }} />
        <div className="mission-icon" style={{ background:`${pt.accent}12`, border:`1px solid ${pt.accent}28` }}>{pt.icon}</div>
        <div>
          <div className="mission-title">{pt.title}</div>
          <div className="mission-desc">{pt.description}</div>
        </div>
      </article>
    );
  }

  function MissionSection() {
    return (
      <section id="mission" className="sec-mission">
        <div className="sec-divider" style={{ background:"linear-gradient(90deg,transparent,rgba(79,70,229,.28),transparent)" }} />
        <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:"min(800px,90%)", height:1, background:"linear-gradient(90deg,transparent,rgba(0,238,255,.18),transparent)" }} />
        <svg style={{ position:"absolute", right:0, top:"50%", transform:"translateY(-50%)", opacity:.022, width:"min(460px,38vw)", height:"min(460px,38vw)", pointerEvents:"none" }} viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="90" stroke="#00EEFF" strokeWidth=".5"/>
          <circle cx="100" cy="100" r="70" stroke="#4F46E5" strokeWidth=".5"/>
          <circle cx="100" cy="100" r="50" stroke="#00EEFF" strokeWidth=".5"/>
          <line x1="10" y1="100" x2="190" y2="100" stroke="#00EEFF" strokeWidth=".5"/>
          <line x1="100" y1="10" x2="100" y2="190" stroke="#00EEFF" strokeWidth=".5"/>
        </svg>
        <div style={{ maxWidth:1152, margin:"0 auto", position:"relative" }}>
          <div className="mission-layout">
            <div>
              <div className="sec-pill" style={{ border:"1px solid rgba(0,238,255,.2)", background:"rgba(0,238,255,.05)", display:"inline-flex", marginBottom:20 }}>
                <span className="sec-pill-text" style={{ color:"#00EEFF" }}>OUR MISSION</span>
              </div>
              <h2 className="sec-h2" style={{ marginBottom:18 }}>
                Why TechEra{" "}
                <span style={{ background:"linear-gradient(135deg,#4F46E5,#00EEFF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Exists</span>
              </h2>
              <p style={{ color:"#64748B", fontSize:"clamp(14px,1.8vw,17px)", lineHeight:1.78, marginBottom:28, fontFamily:"'DM Sans',sans-serif" }}>{siteConfig.missionDescription}</p>
              <div className="terminal">
                <div className="term-bar">
                  {["#FF5F57","#FEBC2E","#28C840"].map((c,i) => <span key={i} className="term-dot" style={{ background:c }} />)}
                  <span style={{ color:"#475569", fontSize:12, marginLeft:8, fontFamily:"'JetBrains Mono',monospace" }}>techera.config.js</span>
                </div>
                <div className="term-body">
                  <div><span style={{color:"#4F46E5"}}>const </span><span style={{color:"#00EEFF"}}>community</span><span style={{color:"white"}}> = </span><span style={{color:"#A78BFA"}}>"TechEra"</span><span style={{color:"white"}}>;</span></div>
                  <div><span style={{color:"#4F46E5"}}>const </span><span style={{color:"#00EEFF"}}>mission</span><span style={{color:"white"}}> = [</span></div>
                  {["Connect","Innovate","Build"].map((v,i) => (
                    <div key={i} style={{paddingLeft:18}}><span style={{color:"#A78BFA"}}>"{v}"</span><span style={{color:"white"}}>,</span></div>
                  ))}
                  <div><span style={{color:"white"}}>];</span></div>
                  <div style={{color:"#475569",marginTop:4}}>// Building the future, together</div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}>
                    <span style={{color:"#00EEFF"}}>❯</span>
                    <span style={{color:"white"}}>npm run</span>
                    <span style={{color:"#A78BFA"}}>build-community</span>
                    <span style={{width:7,height:15,background:"#00EEFF",display:"inline-block",animation:"blink 1s step-end infinite",opacity:.8,flexShrink:0}} />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {missionPoints.map(pt => <MissionCard key={pt.id} pt={pt} />)}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ─── CTA ─────────────────────────────────────────────────────────────────────

  function CTASection() {
    const perks = ["Free Events","Mentorship","Hackathons","Networking","Real Projects"];
    return (
      <section id="join" className="sec-cta">
        <div className="sec-divider" style={{ background:"linear-gradient(90deg,transparent,rgba(0,238,255,.13),transparent)" }} />
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"min(540px,78vw)", height:"min(540px,78vw)", borderRadius:"50%", background:"rgba(79,70,229,.09)", filter:"blur(100px)", pointerEvents:"none" }} />
        <div style={{ maxWidth:880, margin:"0 auto", position:"relative" }}>
          <div className="cta-card">
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(79,70,229,.09) 0%,transparent 50%,rgba(0,238,255,.07) 100%)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle,rgba(0,238,255,.042) 1px,transparent 1px)", backgroundSize:"24px 24px", pointerEvents:"none" }} />
            {[
              {top:0,left:0,borderTop:"2px solid rgba(0,238,255,.14)",borderLeft:"2px solid rgba(0,238,255,.14)",borderRadius:"24px 0 0 0"},
              {top:0,right:0,borderTop:"2px solid rgba(79,70,229,.14)",borderRight:"2px solid rgba(79,70,229,.14)",borderRadius:"0 24px 0 0"},
              {bottom:0,left:0,borderBottom:"2px solid rgba(79,70,229,.14)",borderLeft:"2px solid rgba(79,70,229,.14)",borderRadius:"0 0 0 24px"},
              {bottom:0,right:0,borderBottom:"2px solid rgba(0,238,255,.14)",borderRight:"2px solid rgba(0,238,255,.14)",borderRadius:"0 0 24px 0"},
            ].map((s,i) => <div key={i} style={{ position:"absolute", width:56, height:56, ...s }} />)}

            <div className="cta-inner">
              <div style={{ position:"relative", display:"inline-flex", alignItems:"center", gap:8, padding:"6px 18px", borderRadius:999, border:"1px solid rgba(0,238,255,.2)", background:"rgba(0,238,255,.05)", marginBottom:24 }}>
                <span style={{ position:"absolute", left:14, width:8, height:8, borderRadius:"50%", background:"#00EEFF", opacity:.42, animation:"pingAnim 1.9s cubic-bezier(0,0,0.2,1) infinite" }} />
                <span style={{ width:8, height:8, borderRadius:"50%", background:"#00EEFF", display:"inline-block", marginLeft:4, flexShrink:0 }} />
                <span style={{ color:"#00EEFF", fontSize:11, fontWeight:700, letterSpacing:".15em", fontFamily:"'JetBrains Mono',monospace", marginLeft:4 }}>NOW RECRUITING</span>
              </div>
              <h2 className="cta-h2">Ready to Build<br /><span style={{ background:"linear-gradient(135deg,#00EEFF,#4F46E5)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Something Great?</span></h2>
              <p className="cta-sub">Join hundreds of passionate builders, designers, and thinkers shaping the future of tech — together.</p>
              <div className="perks-row">
                {perks.map(p => <span key={p} className="perk-tag">✦ {p}</span>)}
              </div>
              <div className="cta-btns">
                <a href="https://chat.whatsapp.com/L5i3gkwI7gSErhUivmShMO" className="cta-btn-p">Join the Community <ArrowRight /></a>
                <a href="https://www.instagram.com/tech__eraa?igsh=ZTNlcXBobWZ0NG16" className="cta-btn-s"><InstaIcon /> Follow on Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ─── PAGE ─────────────────────────────────────────────────────────────────────

  export default function Home() {
    return (
      <div style={{ minHeight:"100vh", background:"#050D1A", fontFamily:"'DM Sans', sans-serif", overflowX:"hidden", width:"100%" }}>
        <GlobalStyles />
        <Navbar />
        <main>
          <HeroSection />
          <FoundersSection />
          <MissionSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    );
  }