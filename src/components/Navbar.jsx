import { useState, useEffect } from "react";

// ── Shared font injection (call once from Navbar, used everywhere) ──────────
export function useSharedFonts() {
  useEffect(() => {
    if (document.getElementById("te-shared-fonts")) return;
    const link = document.createElement("link");
    link.id = "te-shared-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

const NAV_LINKS = [
  { label: "Home",      href: "/"         },
  { label: "Events",    href: "/events"    },
  { label: "Team",      href: "/team"      },
  { label: "Projects",  href: "/projects"  },
  { label: "Blog",      href: "/blog"      },
];

export default function Navbar() {
  useSharedFonts();

  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeLink,  setActiveLink]  = useState("/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    setActiveLink(window.location.pathname);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navBase = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: "background .35s, border-color .35s, box-shadow .35s, backdrop-filter .35s",
    background: scrolled
      ? "rgba(5,13,26,0.82)"
      : "transparent",
    backdropFilter: scrolled ? "blur(18px) saturate(1.4)" : "none",
    borderBottom: scrolled
      ? "1px solid rgba(0,238,255,0.09)"
      : "1px solid transparent",
    boxShadow: scrolled
      ? "0 4px 32px rgba(0,0,0,0.38)"
      : "none",
  };

  const inner = {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 28px",
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  return (
    <>
      {/* ── Navbar ── */}
      <nav style={navBase} role="navigation" aria-label="Main navigation">
        <div style={inner}>

          {/* Logo */}
          <a
            href="/"
            style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
            aria-label="TechEra home"
          >
            <div
  style={{
    width: 42,
    height: 42,
    borderRadius: 10,
    overflow: "hidden",          // 👈 important
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  }}
>
  <img
    src="/images/logo.jpg"
    alt="TechEra Logo"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain",   // 👈 logo ke liye best
    }}
  />
</div>
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 18,
                color: "white",
                letterSpacing: "-0.02em",
              }}
            >
              TechEra
            </span>
          </a>

          {/* Desktop links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
            className="te-nav-desktop"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <NavLink key={link.href} link={link} isActive={isActive} />
              );
            })}
          </div>

          {/* CTA + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a
              href="#join"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "8px 18px",
                borderRadius: 10,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                color: "#050D1A",
                background: "linear-gradient(135deg,#00EEFF,#4F46E5)",
                textDecoration: "none",
                transition: "transform .25s, box-shadow .25s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 0 22px rgba(0,238,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
              className="te-nav-cta"
            >
              Join Now
            </a>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              style={{
                display: "none",
                width: 38,
                height: 38,
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
              className="te-hamburger"
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <MobileDrawer
        open={menuOpen}
        links={NAV_LINKS}
        activeLink={activeLink}
        onClose={() => setMenuOpen(false)}
      />

      {/* ── Responsive styles ── */}
      <style>{`
        @media (max-width: 768px) {
          .te-nav-desktop { display: none !important; }
          .te-hamburger   { display: flex !important; }
        }
        @media (min-width: 769px) {
          .te-nav-cta { display: inline-flex !important; }
        }
        @media (max-width: 480px) {
          .te-nav-cta { display: none !important; }
        }
      `}</style>
    </>
  );
}

// ── Desktop nav link ──────────────────────────────────────────────────────────
function NavLink({ link, isActive }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={link.href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        padding: "6px 14px",
        borderRadius: 9,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: isActive ? 600 : 500,
        fontSize: 14,
        color: isActive ? "white" : hov ? "white" : "#94A3B8",
        textDecoration: "none",
        background: isActive
          ? "rgba(0,238,255,0.07)"
          : hov
          ? "rgba(255,255,255,0.04)"
          : "transparent",
        border: isActive
          ? "1px solid rgba(0,238,255,0.18)"
          : "1px solid transparent",
        transition: "all .22s",
        display: "flex",
        alignItems: "center",
        gap: 5,
      }}
    >
      {link.label}
      {isActive && (
        <span
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#00EEFF",
            display: "inline-block",
            boxShadow: "0 0 6px #00EEFF",
          }}
        />
      )}
    </a>
  );
}

// ── Hamburger icon ────────────────────────────────────────────────────────────
function HamburgerIcon({ open }) {
  const bar = (rotation, y) => ({
    position: "absolute",
    left: 7,
    width: 18,
    height: 1.5,
    borderRadius: 2,
    background: "white",
    transition: "transform .28s, opacity .28s",
    transformOrigin: "center",
    transform: open
      ? rotation
      : `translateY(${y}px)`,
    opacity: open && rotation === "" ? 0 : 1,
  });
  return (
    <div style={{ position: "relative", width: 32, height: 16 }}>
      <span style={{ ...bar("rotate(45deg) translate(5px, 5px)", -5) }} />
      <span style={{ ...bar("", 0), top: 7 }} />
      <span style={{ ...bar("rotate(-45deg) translate(5px, -5px)", 5), top: 14 }} />
    </div>
  );
}

// ── Mobile drawer ─────────────────────────────────────────────────────────────
function MobileDrawer({ open, links, activeLink, onClose }) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 998,
          background: "rgba(5,13,26,0.6)",
          backdropFilter: "blur(4px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .3s",
        }}
      />
      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 64,
          left: 0,
          right: 0,
          zIndex: 999,
          background: "rgba(5,13,26,0.97)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(0,238,255,0.1)",
          transform: open ? "translateY(0)" : "translateY(-16px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "transform .32s cubic-bezier(.23,1,.32,1), opacity .28s",
          padding: "16px 20px 24px",
        }}
      >
        {links.map((link, i) => {
          const isActive = activeLink === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "13px 14px",
                borderRadius: 12,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: isActive ? 700 : 500,
                fontSize: 15,
                color: isActive ? "white" : "#94A3B8",
                textDecoration: "none",
                background: isActive ? "rgba(0,238,255,0.07)" : "transparent",
                border: isActive
                  ? "1px solid rgba(0,238,255,0.15)"
                  : "1px solid transparent",
                marginBottom: 4,
                transition: "all .2s",
                animationDelay: `${i * 0.05}s`,
              }}
            >
              {link.label}
              {isActive && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#00EEFF",
                    boxShadow: "0 0 8px #00EEFF",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
              )}
            </a>
          );
        })}

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 12, paddingTop: 16 }}>
          <a
            href="https://chat.whatsapp.com/L5i3gkwI7gSErhUivmShMO"
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "13px",
              borderRadius: 12,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "#050D1A",
              background: "linear-gradient(135deg,#00EEFF,#4F46E5)",
              textDecoration: "none",
            }}
          >
            Join Now
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}