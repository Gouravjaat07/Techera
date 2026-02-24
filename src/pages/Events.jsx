import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar"; // ← uses your existing Navbar

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { overflow-x: hidden; max-width: 100%; background: #050D1A; }

    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap');

    @keyframes shimmer     { 0%{background-position:0% center}100%{background-position:200% center} }
    @keyframes pulseGlow   { 0%,100%{opacity:.45}50%{opacity:1} }
    @keyframes slideIn     { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
    @keyframes accordionOpen{ from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)} }
    @keyframes modalIn     { from{opacity:0;transform:scale(.96) translateY(12px)}to{opacity:1;transform:scale(1) translateY(0)} }
    @keyframes fadeIn      { from{opacity:0}to{opacity:1} }
    @keyframes pingAnim    { 75%,100%{transform:scale(2.1);opacity:0} }

    .ev-page { font-family: 'Manrope', system-ui, sans-serif; background: #050D1A; color: white; min-height: 100vh; }
    .shimmer-text { background: linear-gradient(90deg,#00EEFF 0%,#4F46E5 40%,#A78BFA 70%,#00EEFF 100%); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 4s linear infinite; }
    .grad-text { background: linear-gradient(135deg,#00EEFF,#4F46E5); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

    /* ── EVENTS LISTING ── */
    .evl-hero { padding: 100px 28px 48px; max-width: 1200px; margin: 0 auto; }
    .evl-hero-top { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; flex-wrap: wrap; margin-bottom: 36px; }
    .evl-pill { display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px; border-radius: 999px; border: 1px solid rgba(0,238,255,.2); background: rgba(0,238,255,.05); font-size: 11px; font-weight: 700; letter-spacing: .2em; color: #00EEFF; font-family: 'Space Mono', monospace; margin-bottom: 14px; }
    .evl-title { font-family: 'Syne', sans-serif; font-size: clamp(30px,5vw,56px); font-weight: 900; line-height: 1.05; letter-spacing: -.03em; color: white; }
    .evl-sub { color: #64748B; font-size: 15px; line-height: 1.75; max-width: 460px; margin-top: 10px; }
    .evl-create-btn { display: inline-flex; align-items: center; gap: 9px; padding: 13px 26px; border-radius: 14px; font-weight: 800; font-size: 14px; color: #050D1A; background: linear-gradient(135deg,#00EEFF,#4F46E5); border: none; cursor: pointer; transition: transform .25s, box-shadow .25s; font-family: 'Manrope', sans-serif; white-space: nowrap; flex-shrink: 0; }
    .evl-create-btn:hover { transform: scale(1.05); box-shadow: 0 0 36px rgba(0,238,255,.35); }

    .evl-filters { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 36px; padding: 0 28px; max-width: 1200px; margin-left: auto; margin-right: auto; }
    .evl-filter-btn { padding: 7px 18px; border-radius: 999px; font-size: 12px; font-weight: 700; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.03); color: #64748B; cursor: pointer; transition: all .2s; font-family: 'Manrope', sans-serif; }
    .evl-filter-btn:hover { border-color: rgba(0,238,255,.25); color: #94A3B8; }
    .evl-filter-btn.active { border-color: rgba(0,238,255,.35); background: rgba(0,238,255,.08); color: #00EEFF; }

    .evl-search-wrap { position: relative; max-width: 340px; width: 100%; }
    .evl-search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #475569; pointer-events: none; }
    .evl-search { width: 100%; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 11px 16px 11px 40px; color: white; font-size: 14px; font-family: 'Manrope', sans-serif; outline: none; transition: border-color .2s; }
    .evl-search:focus { border-color: rgba(0,238,255,.3); }
    .evl-search::placeholder { color: #334155; }

    .evl-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 1200px; margin: 0 auto; padding: 0 28px 80px; }
    .ev-card { position: relative; border-radius: 20px; border: 1px solid rgba(255,255,255,.05); background: #0A1628; overflow: hidden; cursor: pointer; transition: transform .35s cubic-bezier(.23,1,.32,1), border-color .35s, box-shadow .35s; }
    .ev-card:hover { transform: translateY(-6px); }
    .ev-card-banner { width: 100%; height: 180px; overflow: hidden; position: relative; }
    .ev-card-mode-badge { position: absolute; top: 12px; right: 12px; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; font-family: 'Space Mono', monospace; backdrop-filter: blur(8px); }
    .ev-card-body { padding: 18px 20px 20px; }
    .ev-card-org { font-size: 11px; font-weight: 700; color: #4F46E5; letter-spacing: .1em; text-transform: uppercase; font-family: 'Space Mono', monospace; margin-bottom: 6px; }
    .ev-card-name { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 800; color: white; line-height: 1.3; margin-bottom: 12px; }
    .ev-card-meta { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; }
    .ev-card-meta-item { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #64748B; }
    .ev-card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid rgba(255,255,255,.05); }
    .ev-card-view-btn { padding: 7px 16px; border-radius: 9px; font-size: 12px; font-weight: 700; background: rgba(0,238,255,.08); border: 1px solid rgba(0,238,255,.2); color: #00EEFF; cursor: pointer; transition: background .2s, transform .2s; font-family: 'Manrope', sans-serif; }
    .ev-card-view-btn:hover { background: rgba(0,238,255,.15); transform: scale(1.04); }

    /* ── EVENT DETAIL ── */
    .evd-header { padding: 84px 28px 0; max-width: 1200px; margin: 0 auto; }
    .evd-back-btn { display: inline-flex; align-items: center; gap: 7px; padding: 7px 14px; border-radius: 10px; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.03); color: #64748B; font-size: 13px; font-weight: 600; cursor: pointer; transition: color .2s, border-color .2s; margin-bottom: 24px; font-family: 'Manrope', sans-serif; }
    .evd-back-btn:hover { color: #00EEFF; border-color: rgba(0,238,255,.25); }
    .evd-org-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 999px; border: 1px solid rgba(0,238,255,.2); background: rgba(0,238,255,.05); font-size: 13px; font-weight: 700; color: #00EEFF; margin-bottom: 10px; font-family: 'Space Mono', monospace; }
    .evd-title { font-family: 'Syne', sans-serif; font-size: clamp(26px,5vw,52px); font-weight: 900; line-height: 1.05; letter-spacing: -.02em; }
    .evd-attendee-badge { display: flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 999px; border: 1px solid rgba(167,139,250,.2); background: rgba(167,139,250,.06); font-size: 13px; font-weight: 700; color: #A78BFA; font-family: 'Space Mono', monospace; white-space: nowrap; }
    .evd-cover { width: 100%; height: clamp(220px,35vw,420px); border-radius: 22px; overflow: hidden; border: 1px solid rgba(255,255,255,.06); position: relative; margin: 22px 0; }
    .evd-cover-badge { position: absolute; top: 18px; right: 18px; padding: 8px 16px; border-radius: 12px; background: rgba(5,13,26,.8); border: 1px solid rgba(0,238,255,.2); color: #00EEFF; font-size: 12px; font-weight: 700; font-family: 'Space Mono', monospace; backdrop-filter: blur(8px); }
    .evd-meta-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 28px; }
    .evd-meta-pill { display: flex; flex-direction: column; align-items: flex-start; padding: 12px 18px; border-radius: 14px; border: 1px solid rgba(255,255,255,.06); background: #0A1628; min-width: 100px; transition: border-color .3s, background .3s; cursor: default; }
    .evd-meta-pill:hover { border-color: rgba(0,238,255,.2); background: rgba(0,238,255,.04); }
    .evd-meta-label { font-size: 10px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: .14em; font-family: 'Space Mono', monospace; margin-bottom: 4px; }
    .evd-meta-val { font-size: 14px; font-weight: 800; color: white; }

    .evd-tabs-wrap { position: sticky; top: 64px; z-index: 50; background: rgba(5,13,26,.92); backdrop-filter: blur(14px); border-bottom: 1px solid rgba(255,255,255,.05); }
    .evd-tabs { max-width: 1200px; margin: 0 auto; display: flex; overflow-x: auto; padding: 0 28px; scrollbar-width: none; }
    .evd-tabs::-webkit-scrollbar { display: none; }
    .evd-tab { padding: 16px 20px; font-size: 13px; font-weight: 700; color: #475569; border: none; background: none; cursor: pointer; border-bottom: 2px solid transparent; transition: color .25s, border-color .25s; white-space: nowrap; font-family: 'Manrope', sans-serif; }
    .evd-tab:hover { color: #94A3B8; }
    .evd-tab.active { color: #00EEFF; border-bottom-color: #00EEFF; }

    .evd-section { max-width: 1200px; margin: 0 auto; padding: 48px 28px 72px; animation: slideIn .4s ease-out both; }
    .evd-sec-head { margin-bottom: 28px; }
    .evd-sec-pill { display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px; border-radius: 999px; margin-bottom: 12px; font-size: 11px; font-weight: 700; letter-spacing: .2em; font-family: 'Space Mono', monospace; }
    .evd-sec-h2 { font-family: 'Syne', sans-serif; font-size: clamp(22px,3.5vw,34px); font-weight: 900; color: white; letter-spacing: -.02em; margin-bottom: 8px; }
    .evd-sec-sub { color: #64748B; font-size: 14px; max-width: 480px; line-height: 1.7; }
    .evd-divider { height: 1px; background: linear-gradient(90deg,transparent,rgba(0,238,255,.18),transparent); margin: 40px 0; }

    .evd-form-card { border-radius: 20px; border: 1px solid rgba(255,255,255,.06); background: #0A1628; overflow: hidden; }
    .evd-form-header { padding: 24px 28px 20px; border-bottom: 1px solid rgba(255,255,255,.05); display: flex; align-items: center; gap: 12px; }
    .evd-form-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
    .evd-form-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 900; color: white; }
    .evd-form-subtitle { color: #64748B; font-size: 13px; margin-top: 2px; }
    .evd-form-body { padding: 28px; }
    .evd-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
    .evd-form-group { display: flex; flex-direction: column; gap: 6px; }
    .evd-form-label { font-size: 12px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: .1em; font-family: 'Space Mono', monospace; }
    .evd-input { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 12px 16px; color: white; font-size: 14px; font-family: 'Manrope', sans-serif; transition: border-color .2s, background .2s; outline: none; width: 100%; }
    .evd-input:focus { border-color: rgba(0,238,255,.4); background: rgba(0,238,255,.04); }
    .evd-input::placeholder { color: #334155; }
    .evd-select { appearance: none; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 12px 16px; color: white; font-size: 14px; font-family: 'Manrope', sans-serif; transition: border-color .2s; outline: none; cursor: pointer; width: 100%; }
    .evd-select:focus { border-color: rgba(0,238,255,.4); }
    .evd-select option { background: #0A1628; }
    .evd-textarea { resize: vertical; min-height: 100px; }
    .evd-submit-btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 32px; border-radius: 14px; font-weight: 800; font-size: 15px; color: #050D1A; background: linear-gradient(135deg,#00EEFF,#4F46E5); border: none; cursor: pointer; transition: transform .25s, box-shadow .25s; font-family: 'Manrope', sans-serif; }
    .evd-submit-btn:hover { transform: scale(1.04); box-shadow: 0 0 36px rgba(0,238,255,.35); }
    .evd-submit-btn:disabled { opacity: .45; cursor: not-allowed; transform: none; box-shadow: none; }

    .evd-agenda-list { display: flex; flex-direction: column; gap: 10px; }
    .evd-agenda-item { display: flex; align-items: center; gap: 16px; padding: 16px 22px; border-radius: 16px; border: 1px solid; transition: transform .25s; }
    .evd-agenda-item:hover { transform: translateX(4px); }
    .evd-agenda-time { font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 700; min-width: 160px; flex-shrink: 0; }
    .evd-agenda-title { font-size: 15px; font-weight: 700; color: white; }
    .evd-agenda-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

    .evd-people-section { margin-bottom: 40px; }
    .evd-people-section-title { display: flex; align-items: center; gap: 12px; font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: white; margin-bottom: 20px; padding: 16px 20px; border-radius: 14px; border: 1px solid rgba(255,255,255,.06); background: #0A1628; }
    .evd-people-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; }
    .evd-person-card { display: flex; align-items: center; gap: 14px; padding: 16px 18px; border-radius: 16px; border: 1px solid rgba(255,255,255,.05); background: #0A1628; transition: border-color .3s, transform .3s, box-shadow .3s; }
    .evd-person-card:hover { transform: translateY(-3px); }
    .evd-person-avatar { width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Space Mono', monospace; font-size: 15px; font-weight: 700; flex-shrink: 0; }
    .evd-person-name { font-size: 15px; font-weight: 800; color: white; margin-bottom: 2px; }
    .evd-person-tagline { font-size: 12px; color: #64748B; margin-bottom: 6px; }
    .evd-person-socials { display: flex; gap: 8px; }
    .evd-soc { width: 26px; height: 26px; border-radius: 7px; border: 1px solid rgba(255,255,255,.07); background: rgba(255,255,255,.03); display: flex; align-items: center; justify-content: center; color: #475569; text-decoration: none; font-size: 10px; transition: color .2s, border-color .2s; }
    .evd-soc:hover { color: #00EEFF; border-color: rgba(0,238,255,.3); }

    .evd-faq-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 40px; }
    .evd-faq-item { border-radius: 16px; border: 1px solid rgba(255,255,255,.06); background: #0A1628; overflow: hidden; transition: border-color .3s; }
    .evd-faq-item.open { border-color: rgba(0,238,255,.2); }
    .evd-faq-q { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 18px 22px; cursor: pointer; font-size: 15px; font-weight: 700; color: white; }
    .evd-faq-chevron { width: 20px; height: 20px; border-radius: 6px; border: 1px solid rgba(255,255,255,.1); display: flex; align-items: center; justify-content: center; transition: transform .3s, background .3s; flex-shrink: 0; }
    .evd-faq-item.open .evd-faq-chevron { transform: rotate(180deg); background: rgba(0,238,255,.1); }
    .evd-faq-a { padding: 0 22px 18px; color: #64748B; font-size: 14px; line-height: 1.75; animation: accordionOpen .25s ease-out both; }

    .evd-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
    .evd-contact-info { display: flex; flex-direction: column; gap: 16px; }
    .evd-contact-info-card { padding: 18px 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,.06); background: #0A1628; }

    /* ── CREATE MODAL ── */
    .modal-overlay { position: fixed; inset: 0; z-index: 2000; background: rgba(5,13,26,.9); backdrop-filter: blur(14px); display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn .22s ease-out; }
    .modal-box { background: #0A1628; border: 1px solid rgba(255,255,255,.08); border-radius: 28px; width: 100%; max-width: 720px; max-height: 90vh; overflow-y: auto; animation: modalIn .32s cubic-bezier(.23,1,.32,1); scrollbar-width: thin; scrollbar-color: rgba(0,238,255,.2) transparent; }
    .modal-box::-webkit-scrollbar { width: 4px; }
    .modal-box::-webkit-scrollbar-thumb { background: rgba(0,238,255,.2); border-radius: 2px; }
    .modal-header { padding: 28px 32px 20px; border-bottom: 1px solid rgba(255,255,255,.05); display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; background: #0A1628; z-index: 1; border-radius: 28px 28px 0 0; }
    .modal-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 900; color: white; }
    .modal-close { width: 36px; height: 36px; border-radius: 10px; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.04); display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748B; transition: color .2s, border-color .2s; font-size: 16px; line-height: 1; }
    .modal-close:hover { color: white; border-color: rgba(255,255,255,.2); }
    .modal-body { padding: 28px 32px 32px; }

    .banner-upload-area { width: 100%; height: 170px; border-radius: 16px; border: 2px dashed rgba(0,238,255,.2); background: rgba(0,238,255,.03); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; cursor: pointer; transition: border-color .2s, background .2s; position: relative; overflow: hidden; margin-bottom: 20px; }
    .banner-upload-area:hover { border-color: rgba(0,238,255,.4); background: rgba(0,238,255,.06); }
    .banner-upload-area.has-image { border-style: solid; border-color: rgba(0,238,255,.25); }
    .banner-preview-img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }
    .banner-hover-overlay { position: absolute; inset: 0; background: rgba(5,13,26,.65); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; opacity: 0; transition: opacity .2s; }
    .banner-upload-area:hover .banner-hover-overlay { opacity: 1; }

    /* FOOTER */
    .ev-footer { background: #050D1A; border-top: 1px solid rgba(255,255,255,.04); padding: 48px 28px 28px; }
    .ev-footer-inner { max-width: 1200px; margin: 0 auto; }
    .ev-footer-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(180px,1fr)); gap: 32px; margin-bottom: 40px; }
    .ev-footer-bottom { border-top: 1px solid rgba(255,255,255,.05); padding-top: 20px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; }

    /* RESPONSIVE */
    @media(max-width:1023px) { .evl-grid { grid-template-columns: repeat(2,1fr); } }
    @media(max-width:767px) {
      .evl-grid { grid-template-columns: 1fr; padding: 0 14px 60px; }
      .evd-form-row { grid-template-columns: 1fr; }
      .evd-people-grid { grid-template-columns: 1fr; }
      .evd-contact-grid { grid-template-columns: 1fr; }
      .evd-agenda-time { min-width: 110px; font-size: 10px; }
      .evd-header { padding-top: 80px; }
      .evl-hero { padding-left: 14px; padding-right: 14px; }
      .evl-filters { padding: 0 14px; }
      .evl-hero-top { align-items: flex-start; }
      .modal-body, .modal-header { padding-left: 18px; padding-right: 18px; }
    }
    @media(max-width:479px) {
      .evd-section { padding: 32px 14px 56px; }
      .evd-tabs { padding: 0 14px; }
      .evd-tab { padding: 14px 10px; font-size: 11px; }
    }
  `}</style>
);

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const AGENDA_TYPE_STYLES = {
  logistics: { color:"#94A3B8", bg:"rgba(148,163,184,.1)",  border:"rgba(148,163,184,.2)" },
  keynote:   { color:"#FEBC2E", bg:"rgba(254,188,46,.08)",  border:"rgba(254,188,46,.2)"  },
  session:   { color:"#00EEFF", bg:"rgba(0,238,255,.08)",   border:"rgba(0,238,255,.2)"   },
  break:     { color:"#4ADE80", bg:"rgba(74,222,128,.08)",  border:"rgba(74,222,128,.2)"  },
  workshop:  { color:"#A78BFA", bg:"rgba(167,139,250,.08)", border:"rgba(167,139,250,.2)" },
  panel:     { color:"#F97316", bg:"rgba(249,115,22,.08)",  border:"rgba(249,115,22,.2)"  },
  qa:        { color:"#4F46E5", bg:"rgba(79,70,229,.08)",   border:"rgba(79,70,229,.2)"   },
};
const DETAIL_TABS = ["Event Descriptions","Agenda / Track","People & Partners","FAQ & Contact Us"];

// ─── ICONS ────────────────────────────────────────────────────────────────────
const GitHubIcon   = () => <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>;
const LinkedInIcon = () => <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const InstaIcon    = () => <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
const WebIcon      = () => <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const ChevDown     = () => <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>;
const SendIcon     = () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{flexShrink:0}}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const PlusIcon     = () => <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{flexShrink:0}}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const CalIcon      = () => <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const LocIcon      = () => <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>;
const UserIcon     = () => <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const UploadIcon   = () => <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>;
const ArrowLeft    = () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{flexShrink:0}}><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7"/></svg>;

// ─── INITIAL EVENTS DATA ──────────────────────────────────────────────────────
const INITIAL_EVENTS = [
  {
    id:1, name:"OSCode Open Source Conclave 2025", organizer:"OSCode Community",
    date:"15 March 2025", day:"Saturday", time:"11:30 AM", fees:"Free", mode:"Hybrid",
    location:"Noida, UP", attendees:"500+", category:"Open Source",
    bannerUrl:null, bannerGradient:"linear-gradient(135deg,#050D1A 0%,#0D1F3C 60%,#050D1A 100%)", accentColor:"#00EEFF",
    description:`The event features focused learning sessions on Open Source and a combined AI + GitHub Copilot track, where participants will explore modern development workflows, contribution pathways, and how AI-powered tools are transforming the way developers build.\n\nAlongside the sessions, the conclave will host a General Tech Panel Discussion covering:\n• How AI is reshaping the tech landscape\n• Opportunities in AI, Web3, and Blockchain\n• Building strong early-career portfolios\n• The role of communities in career growth\n\nYou'll also get insights into how OSCode is driving change in student communities across India through chapters, hackathons, mentorship, and project-first learning. Expect learning, discussions, networking, and collaboration with like-minded builders.`,
    links:{ website:"https://www.oscode.co.in/", linkedin:"https://linkedin.com/company/oscode", instagram:"https://www.instagram.com/oscode_community" },
    agenda:[
      {time:"11:30 AM – 12:00 PM",title:"Verification & Check-in",type:"logistics"},
      {time:"12:00 PM – 12:30 PM",title:"Welcome & Opening Remarks",type:"keynote"},
      {time:"12:30 PM – 1:30 PM", title:"Understanding Fabric Data Agents",type:"session"},
      {time:"1:30 PM – 2:00 PM",  title:"Lunch Break",type:"break"},
      {time:"2:00 PM – 3:30 PM",  title:"Guided Hands-on / Demo-Assisted Session",type:"workshop"},
      {time:"3:30 PM – 4:30 PM",  title:"General Tech Panel Discussion",type:"panel"},
      {time:"4:30 PM – 5:00 PM",  title:"Q&A, Learning Paths & Certifications",type:"qa"},
    ],
    organiserTeam:[
      {name:"Aryan Mehta",  tagline:"Event Lead",       initials:"AM",accent:"#00EEFF"},
      {name:"Priya Sharma", tagline:"Design Head",      initials:"PS",accent:"#A78BFA"},
      {name:"Rohan Verma",  tagline:"Tech Coordinator", initials:"RV",accent:"#4F46E5"},
      {name:"Sneha Gupta",  tagline:"Outreach Manager", initials:"SG",accent:"#06B6D4"},
    ],
    speakers:[
      {name:"Dr. Ankit Rao",tagline:"AI Researcher, Google",     initials:"AR",accent:"#00EEFF"},
      {name:"Meera Iyer",   tagline:"Open Source Lead, Red Hat", initials:"MI",accent:"#A78BFA"},
      {name:"Vikram Nair",  tagline:"Web3 Engineer, Polygon",    initials:"VN",accent:"#4F46E5"},
      {name:"Sara Kapoor",  tagline:"DevRel, GitHub",            initials:"SK",accent:"#06B6D4"},
    ],
    sponsors:[
      {name:"TechCorp India",tagline:"Gold Sponsor",      initials:"TC",accent:"#FEBC2E"},
      {name:"CloudBase",     tagline:"Silver Sponsor",    initials:"CB",accent:"#94A3B8"},
      {name:"DevSeed",       tagline:"Community Sponsor", initials:"DS",accent:"#00EEFF"},
      {name:"InnoVentures",  tagline:"Bronze Sponsor",    initials:"IV",accent:"#A78BFA"},
    ],
    communityPartners:[
      {name:"GDG Noida",     tagline:"Google Dev Group", initials:"GN",accent:"#4F46E5"},
      {name:"MLSA India",    tagline:"Microsoft Learn",  initials:"ML",accent:"#00EEFF"},
      {name:"HackClub India",tagline:"Student Hackers",  initials:"HC",accent:"#A78BFA"},
      {name:"OpenForge",     tagline:"OSS Community",    initials:"OF",accent:"#06B6D4"},
    ],
    faqs:[
      {q:"Is this event free to attend?",        a:"Yes! Completely free for all registered attendees. Just sign up and show up."},
      {q:"Who can attend?",                       a:"Anyone passionate about open source, AI, Web3, or tech. Students, developers, designers, and founders are all welcome."},
      {q:"Will sessions be recorded?",            a:"Selected sessions will be recorded and shared with registered attendees after the event via email."},
      {q:"How do I become a speaker or sponsor?", a:"Use the contact form on this page to reach out. Our team will get back to you within 48 hours."},
      {q:"Is there a networking session?",        a:"Absolutely! Post the formal agenda, there's dedicated networking time for all attendees, speakers, and partners."},
      {q:"What should I bring?",                  a:"Just your laptop, curiosity, and energy! We'll handle the rest including lunch for all in-person attendees."},
    ],
  },
  {
    id:2, name:"TechEra Hackathon 2025", organizer:"TechEra Community",
    date:"5 April 2025", day:"Saturday", time:"9:00 AM", fees:"₹200", mode:"In-Person",
    location:"Delhi, NCR", attendees:"200+", category:"Hackathon",
    bannerUrl:null, bannerGradient:"linear-gradient(135deg,#1a050d 0%,#3c0d1f 60%,#1a050d 100%)", accentColor:"#A78BFA",
    description:"A 24-hour hackathon for the best builders in India. Build, pitch, and win amazing prizes while connecting with top engineers and founders.\n\nTheme: AI for Social Good\n\n• Teams of 2–4 members\n• ₹5L+ in prizes\n• Mentorship from industry leaders\n• Recruitment opportunities on the spot",
    links:{website:"#",linkedin:"#",instagram:"#"},
    agenda:[
      {time:"9:00 AM – 9:30 AM",  title:"Registration & Kickoff",    type:"logistics"},
      {time:"9:30 AM – 10:00 AM", title:"Opening & Theme Reveal",    type:"keynote"},
      {time:"10:00 AM – 8:00 PM", title:"Hacking Begins",            type:"workshop"},
      {time:"8:00 PM – 9:00 PM",  title:"Dinner & Networking",       type:"break"},
      {time:"9:00 AM – 10:00 AM", title:"Final Submissions",         type:"session"},
      {time:"10:00 AM – 12:00 PM",title:"Judging & Presentations",   type:"panel"},
      {time:"12:00 PM – 1:00 PM", title:"Awards & Closing Ceremony", type:"qa"},
    ],
    organiserTeam:[
      {name:"Aryan Mehta", tagline:"Hackathon Lead",initials:"AM",accent:"#A78BFA"},
      {name:"Priya Sharma",tagline:"Design Head",   initials:"PS",accent:"#00EEFF"},
    ],
    speakers:[
      {name:"Rajesh Kumar",tagline:"CTO, Razorpay",    initials:"RK",accent:"#A78BFA"},
      {name:"Nisha Verma", tagline:"Partner, Sequoia", initials:"NV",accent:"#00EEFF"},
    ],
    sponsors:[
      {name:"Razorpay",tagline:"Title Sponsor",initials:"RP",accent:"#00EEFF"},
      {name:"GitHub",  tagline:"Gold Sponsor", initials:"GH",accent:"#A78BFA"},
    ],
    communityPartners:[
      {name:"DevFolio",   tagline:"Platform Partner",initials:"DF",accent:"#4F46E5"},
      {name:"HackClub IN",tagline:"Community",       initials:"HC",accent:"#A78BFA"},
    ],
    faqs:[
      {q:"What's the team size?",      a:"Teams of 2–4 members. Solo participation is also allowed."},
      {q:"Is accommodation provided?", a:"Yes, for outstation participants. Please mention in registration."},
    ],
  },
  {
    id:3, name:"AI & Web3 Summit", organizer:"BuilderDAO",
    date:"20 April 2025", day:"Sunday", time:"10:00 AM", fees:"Free", mode:"Online",
    location:"Virtual", attendees:"1000+", category:"Summit",
    bannerUrl:null, bannerGradient:"linear-gradient(135deg,#050d1a 0%,#0f2c1a 60%,#050d1a 100%)", accentColor:"#4ADE80",
    description:"A global virtual summit bringing together the top minds in AI and Web3 to share insights on decentralized AI, blockchain development, and the future of the open internet.\n\nWhat to expect:\n• Keynotes from AI researchers and Web3 founders\n• Live demos and hands-on workshops\n• Panel discussions on the future of tech\n• Networking with 1000+ global builders",
    links:{website:"#",linkedin:"#",instagram:"#"},
    agenda:[
      {time:"10:00 AM – 10:30 AM",title:"Welcome & Keynote",       type:"keynote"},
      {time:"10:30 AM – 12:00 PM",title:"AI Track Sessions",       type:"session"},
      {time:"12:00 PM – 1:00 PM", title:"Web3 Deep Dive Workshop", type:"workshop"},
      {time:"1:00 PM – 2:00 PM",  title:"Lunch & Virtual Networking",type:"break"},
      {time:"2:00 PM – 3:30 PM",  title:"Panel: Future of AI+Web3",type:"panel"},
      {time:"3:30 PM – 4:00 PM",  title:"Q&A & Closing",           type:"qa"},
    ],
    organiserTeam:[
      {name:"Alice Chen",  tagline:"Summit Director",initials:"AC",accent:"#4ADE80"},
      {name:"Bob Nakamura",tagline:"Tech Lead",      initials:"BN",accent:"#00EEFF"},
    ],
    speakers:[
      {name:"Dr. Sarah Kim",tagline:"AI Lab, OpenAI",    initials:"SK",accent:"#4ADE80"},
      {name:"Marco Rossi",  tagline:"Co-founder, Uniswap",initials:"MR",accent:"#00EEFF"},
    ],
    sponsors:[
      {name:"OpenAI", tagline:"Title Sponsor",initials:"OA",accent:"#4ADE80"},
      {name:"Polygon",tagline:"Web3 Partner", initials:"PL",accent:"#A78BFA"},
    ],
    communityPartners:[
      {name:"ETHIndia",tagline:"Web3 Community",initials:"EI",accent:"#4F46E5"},
      {name:"AI Forum", tagline:"Research",     initials:"AF",accent:"#4ADE80"},
    ],
    faqs:[
      {q:"How do I get the meeting link?",a:"You'll receive it via email after registration."},
      {q:"Is it recorded?",               a:"Yes, all sessions will be available on demand post event."},
    ],
  },
];

// ─── ANIMATED CANVAS COVER ────────────────────────────────────────────────────
function AnimatedCover({ accentColor="#00EEFF", bannerUrl }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (bannerUrl) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); let raf;
    const resize = () => { canvas.width=canvas.parentElement.clientWidth; canvas.height=canvas.parentElement.clientHeight; };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas.parentElement);
    const r=parseInt(accentColor.slice(1,3),16), g=parseInt(accentColor.slice(3,5),16), b=parseInt(accentColor.slice(5,7),16);
    const pts = Array.from({length:28},()=>({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.0004,vy:(Math.random()-.5)*.0004,rad:Math.random()*1.2+.4,a:Math.random()*.26+.08}));
    const draw = () => {
      const w=canvas.width,h=canvas.height; ctx.clearRect(0,0,w,h);
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>1)p.vx*=-1; if(p.y<0||p.y>1)p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x*w,p.y*h,p.rad,0,Math.PI*2);
        ctx.fillStyle=`rgba(${r},${g},${b},${p.a})`; ctx.fill();
      });
      const thresh=Math.min(w,h)*.14;
      pts.forEach((a,i)=>pts.slice(i+1).forEach(b2=>{
        const d=Math.hypot((a.x-b2.x)*w,(a.y-b2.y)*h);
        if(d<thresh){ctx.beginPath();ctx.moveTo(a.x*w,a.y*h);ctx.lineTo(b2.x*w,b2.y*h);ctx.strokeStyle=`rgba(${r},${g},${b},${.04*(1-d/thresh)})`;ctx.lineWidth=.4;ctx.stroke();}
      }));
      raf=requestAnimationFrame(draw);
    };
    draw();
    return ()=>{cancelAnimationFrame(raf);ro.disconnect();};
  },[accentColor,bannerUrl]);
  if(bannerUrl) return <img src={bannerUrl} alt="banner" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} />;
  return <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}} />;
}

// ─── PERSON CARD ──────────────────────────────────────────────────────────────
function PersonCard({ person }) {
  const [hov,setHov]=useState(false);
  return (
    <div className="evd-person-card"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{borderColor:hov?`${person.accent}33`:"rgba(255,255,255,.05)",boxShadow:hov?`0 8px 28px ${person.accent}14`:"none"}}
    >
      <div className="evd-person-avatar" style={{background:`${person.accent}18`,border:`1.5px solid ${person.accent}35`,color:person.accent}}>{person.initials}</div>
      <div>
        <div className="evd-person-name">{person.name}</div>
        <div className="evd-person-tagline">{person.tagline}</div>
        <div className="evd-person-socials">
          {[{Icon:GitHubIcon,l:"GH"},{Icon:LinkedInIcon,l:"LI"},{Icon:InstaIcon,l:"IG"}].map(({Icon,l})=>(
            <a key={l} href="#" className="evd-soc" aria-label={l}
              onMouseEnter={e=>{e.currentTarget.style.color=person.accent;e.currentTarget.style.borderColor=`${person.accent}40`;}}
              onMouseLeave={e=>{e.currentTarget.style.color="#475569";e.currentTarget.style.borderColor="rgba(255,255,255,.07)";}}
            ><Icon /></a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── DETAIL TAB PANELS ────────────────────────────────────────────────────────
function DescriptionTab({ev}) {
  return (
    <div className="evd-section">
      <div className="evd-sec-head">
        <div className="evd-sec-pill" style={{border:"1px solid rgba(167,139,250,.2)",background:"rgba(167,139,250,.06)",color:"#A78BFA"}}>ABOUT THE EVENT</div>
        <h2 className="evd-sec-h2">Event <span className="grad-text">Description</span></h2>
      </div>
      <div className="evd-form-card" style={{padding:"32px"}}>
        <div style={{position:"relative"}}>
          <div style={{position:"absolute",top:0,left:0,width:"3px",height:"100%",background:"linear-gradient(#00EEFF,#4F46E5,#A78BFA)",borderRadius:"0 2px 2px 0"}} />
          <p style={{paddingLeft:24,color:"#94A3B8",fontSize:15,lineHeight:1.85,whiteSpace:"pre-line"}}>{ev.description}</p>
        </div>
        <div className="evd-divider" />
        <p style={{color:"#64748B",fontSize:14,marginBottom:14}}>🔗 Learn more & stay connected:</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
          {[{Icon:WebIcon,label:"Website",href:ev.links.website},{Icon:LinkedInIcon,label:"LinkedIn",href:ev.links.linkedin},{Icon:InstaIcon,label:"Instagram",href:ev.links.instagram}].map(({Icon,label,href})=>(
            <a key={label} href={href} target="_blank" rel="noreferrer"
              style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 16px",borderRadius:10,border:"1px solid rgba(255,255,255,.08)",background:"rgba(255,255,255,.03)",color:"#94A3B8",fontSize:13,fontWeight:600,textDecoration:"none",transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.color="#00EEFF";e.currentTarget.style.borderColor="rgba(0,238,255,.25)";e.currentTarget.style.background="rgba(0,238,255,.06)";}}
              onMouseLeave={e=>{e.currentTarget.style.color="#94A3B8";e.currentTarget.style.borderColor="rgba(255,255,255,.08)";e.currentTarget.style.background="rgba(255,255,255,.03)";}}
            ><Icon />{label}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

function AgendaTab({ev}) {
  return (
    <div className="evd-section">
      <div className="evd-sec-head">
        <div className="evd-sec-pill" style={{border:"1px solid rgba(254,188,46,.2)",background:"rgba(254,188,46,.06)",color:"#FEBC2E"}}>SCHEDULE</div>
        <h2 className="evd-sec-h2">Event <span className="grad-text">Agenda / Track</span></h2>
        <p className="evd-sec-sub">A full day of learning, building, and connecting — curated for builders.</p>
      </div>
      {ev.agenda.length === 0
        ? <div style={{padding:"48px 24px",textAlign:"center",border:"1px dashed rgba(255,255,255,.08)",borderRadius:16,color:"#475569"}}>
            <div style={{fontSize:32,marginBottom:10}}>📋</div>
            <div style={{fontWeight:700,color:"#64748B",marginBottom:4}}>No agenda added yet</div>
            <div style={{fontSize:13}}>Check back later or contact the organizer</div>
          </div>
        : <>
          <div className="evd-agenda-list">
            {ev.agenda.map((item,i)=>{const s=AGENDA_TYPE_STYLES[item.type];return(
              <div key={i} className="evd-agenda-item" style={{background:s.bg,borderColor:s.border}}>
                <div className="evd-agenda-dot" style={{background:s.color,boxShadow:`0 0 8px ${s.color}60`}} />
                <div className="evd-agenda-time" style={{color:s.color}}>{item.time}</div>
                <div className="evd-agenda-title">{item.title}</div>
                <div style={{marginLeft:"auto",padding:"4px 12px",borderRadius:"999px",fontSize:11,fontWeight:700,fontFamily:"Space Mono,monospace",color:s.color,border:`1px solid ${s.border}`,background:s.bg,whiteSpace:"nowrap"}}>{item.type.toUpperCase()}</div>
              </div>
            );})}
          </div>
          <div style={{marginTop:24,display:"flex",flexWrap:"wrap",gap:8}}>
            {Object.entries(AGENDA_TYPE_STYLES).map(([type,s])=>(
              <div key={type} style={{display:"flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:999,border:`1px solid ${s.border}`,background:s.bg}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:s.color}} />
                <span style={{fontSize:10,fontWeight:700,color:s.color,fontFamily:"Space Mono,monospace",textTransform:"uppercase"}}>{type}</span>
              </div>
            ))}
          </div>
        </>
      }
    </div>
  );
}

function PeopleTab({ev}) {
  const sections=[
    {title:"Event Organisers Team",  icon:"🌐",people:ev.organiserTeam,     accent:"#00EEFF"},
    {title:"Our Speakers",           icon:"🎤",people:ev.speakers,          accent:"#A78BFA"},
    {title:"Our Sponsors",           icon:"🤝",people:ev.sponsors,          accent:"#FEBC2E"},
    {title:"Our Community Partners", icon:"🌍",people:ev.communityPartners, accent:"#4F46E5"},
  ];
  return (
    <div className="evd-section">
      <div className="evd-sec-head">
        <div className="evd-sec-pill" style={{border:"1px solid rgba(79,70,229,.2)",background:"rgba(79,70,229,.06)",color:"#A78BFA"}}>THE COMMUNITY</div>
        <h2 className="evd-sec-h2">People & <span className="grad-text">Partners</span></h2>
        <p className="evd-sec-sub">The brilliant minds organizing, speaking, sponsoring, and partnering to make this happen.</p>
      </div>
      {sections.map(({title,icon,people,accent})=>(
        <div key={title} className="evd-people-section">
          <div className="evd-people-section-title">
            <div style={{width:36,height:36,borderRadius:10,background:`${accent}14`,border:`1px solid ${accent}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{icon}</div>
            <span>{title}</span>
          </div>
          {people.length===0
            ? <div style={{padding:"24px",textAlign:"center",border:"1px dashed rgba(255,255,255,.06)",borderRadius:12,color:"#475569",fontSize:13}}>Not announced yet</div>
            : <div className="evd-people-grid">{people.map(p=><PersonCard key={p.name} person={p} />)}</div>
          }
        </div>
      ))}
    </div>
  );
}

function FAQContactTab({ev}) {
  const [openIdx,setOpenIdx]=useState(null);
  const [cf,setCf]=useState({name:"",email:"",phone:"",type:"",message:""});
  const setC=k=>e=>setCf(p=>({...p,[k]:e.target.value}));
  return (
    <div className="evd-section">
      <div className="evd-sec-head">
        <div className="evd-sec-pill" style={{border:"1px solid rgba(0,238,255,.2)",background:"rgba(0,238,255,.06)",color:"#00EEFF"}}>FREQUENTLY ASKED</div>
        <h2 className="evd-sec-h2">Got <span className="grad-text">Questions?</span></h2>
        <p className="evd-sec-sub">Find quick answers to common questions below.</p>
      </div>
      {ev.faqs.length===0
        ? <div style={{padding:"40px 24px",textAlign:"center",border:"1px dashed rgba(255,255,255,.06)",borderRadius:16,color:"#475569",marginBottom:40}}>
            <div style={{fontSize:28,marginBottom:8}}>❓</div>
            <div style={{fontWeight:700,color:"#64748B"}}>No FAQs yet — contact the organizer below</div>
          </div>
        : <div className="evd-faq-list">
            {ev.faqs.map((faq,i)=>(
              <div key={i} className={`evd-faq-item${openIdx===i?" open":""}`}>
                <div className="evd-faq-q" onClick={()=>setOpenIdx(openIdx===i?null:i)}>
                  <span>{faq.q}</span>
                  <div className="evd-faq-chevron"><ChevDown /></div>
                </div>
                {openIdx===i&&<div className="evd-faq-a">{faq.a}</div>}
              </div>
            ))}
          </div>
      }
      <div className="evd-divider" />
      <div className="evd-sec-head">
        <div className="evd-sec-pill" style={{border:"1px solid rgba(167,139,250,.2)",background:"rgba(167,139,250,.06)",color:"#A78BFA"}}>LET'S CONNECT</div>
        <h2 className="evd-sec-h2">Contact <span className="grad-text">Us</span></h2>
        <p className="evd-sec-sub">For mentorship help, internship support, partnerships, or anything else.</p>
      </div>
      <div className="evd-contact-grid">
        <div className="evd-contact-info">
          {[{icon:"📧",label:"Email",val:"ravi@mentorravirautela.com",accent:"#00EEFF"},{icon:"📞",label:"Phone",val:"+91 99100 99925",accent:"#A78BFA"},{icon:"📍",label:"Location",val:"Noida, Uttar Pradesh, India",accent:"#4F46E5"}].map(({icon,label,val,accent})=>(
            <div key={label} className="evd-contact-info-card" style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:44,height:44,borderRadius:13,background:`${accent}14`,border:`1px solid ${accent}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{icon}</div>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:".1em",fontFamily:"Space Mono,monospace",marginBottom:3}}>{label}</div>
                <div style={{fontSize:14,fontWeight:700,color:"white"}}>{val}</div>
              </div>
            </div>
          ))}
          <div className="evd-contact-info-card">
            <div style={{fontSize:12,fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:".1em",fontFamily:"Space Mono,monospace",marginBottom:12}}>Quick Links</div>
            {["Browse Events","Our Courses","About Us","Success Stories","Become a Mentor"].map(l=>(
              <a key={l} href="#" style={{color:"#64748B",fontSize:14,fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",gap:6,marginBottom:8,transition:"color .2s"}}
                onMouseEnter={e=>e.currentTarget.style.color="#00EEFF"} onMouseLeave={e=>e.currentTarget.style.color="#64748B"}
              ><span style={{color:"#4F46E5"}}>›</span>{l}</a>
            ))}
          </div>
        </div>
        <div className="evd-form-card">
          <div className="evd-form-header">
            <div className="evd-form-icon" style={{background:"rgba(167,139,250,.1)",border:"1px solid rgba(167,139,250,.2)"}}>✉️</div>
            <div><div className="evd-form-title">Send a Message</div><div className="evd-form-subtitle">We'll get back to you within 24 hours</div></div>
          </div>
          <div className="evd-form-body">
            <div className="evd-form-row">
              <div className="evd-form-group"><label className="evd-form-label">Full Name</label><input className="evd-input" placeholder="Your name" value={cf.name} onChange={setC("name")} /></div>
              <div className="evd-form-group"><label className="evd-form-label">Email Address</label><input className="evd-input" type="email" placeholder="you@example.com" value={cf.email} onChange={setC("email")} /></div>
            </div>
            <div className="evd-form-group" style={{marginBottom:16}}><label className="evd-form-label">Mobile Number</label><input className="evd-input" placeholder="+91 XXXXX XXXXX" value={cf.phone} onChange={setC("phone")} /></div>
            <div className="evd-form-group" style={{marginBottom:16}}>
              <label className="evd-form-label">Type of Query</label>
              <select className="evd-select" value={cf.type} onChange={setC("type")}>
                <option value="">Select Your Query</option>
                <option value="mentorship">Mentorship</option>
                <option value="internship">Internship Support</option>
                <option value="sponsorship">Sponsorship</option>
                <option value="speaker">Speaking Opportunity</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="evd-form-group" style={{marginBottom:24}}><label className="evd-form-label">Message</label><textarea className="evd-input evd-textarea" placeholder="Tell us how we can help..." value={cf.message} onChange={setC("message")} /></div>
            <button className="evd-submit-btn">Send Message <SendIcon /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── EVENT DETAIL ─────────────────────────────────────────────────────────────
function EventDetail({ev, onBack}) {
  const [activeTab,setActiveTab]=useState(0);
  const panels=[<DescriptionTab key="d" ev={ev}/>,<AgendaTab key="a" ev={ev}/>,<PeopleTab key="p" ev={ev}/>,<FAQContactTab key="f" ev={ev}/>];
  return (
    <div style={{animation:"slideIn .35s ease-out both"}}>
      <div className="evd-header">
        <button className="evd-back-btn" onClick={onBack}><ArrowLeft /> Back to Events</button>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:12}}>
          <div>
            <div className="evd-org-badge">
              <div style={{width:8,height:8,borderRadius:"50%",background:ev.accentColor,animation:"pulseGlow 2s ease-in-out infinite",flexShrink:0}} />
              By: {ev.organizer}
            </div>
            <h1 className="evd-title"><span className="shimmer-text">{ev.name}</span></h1>
          </div>
          <div className="evd-attendee-badge">
            <span style={{width:8,height:8,borderRadius:"50%",background:"#A78BFA",display:"inline-block"}} />
            {ev.attendees} Attendees
          </div>
        </div>
        <div className="evd-cover" style={{background:ev.bannerGradient}}>
          <AnimatedCover accentColor={ev.accentColor} bannerUrl={ev.bannerUrl} />
          <div style={{position:"absolute",top:"30%",left:"30%",transform:"translate(-50%,-50%)",width:"40%",height:"60%",borderRadius:"50%",background:`${ev.accentColor}12`,filter:"blur(60px)",pointerEvents:"none"}} />
          <div className="evd-cover-badge">🟢 Registrations Open</div>
        </div>
        <div className="evd-meta-row">
          {[{label:"Event Date",val:ev.date,icon:"📅"},{label:"Event Day",val:ev.day,icon:"📆"},{label:"Event Time",val:ev.time,icon:"⏰"},{label:"Event Fees",val:ev.fees,icon:"🎟"},{label:"Event Mode",val:ev.mode,icon:"💻"},{label:"Location",val:ev.location,icon:"📍"}].map(({label,val,icon})=>(
            <div key={label} className="evd-meta-pill"><span className="evd-meta-label">{label}</span><span className="evd-meta-val">{icon} {val}</span></div>
          ))}
        </div>
      </div>
      <div className="evd-tabs-wrap">
        <div className="evd-tabs">
          {DETAIL_TABS.map((tab,i)=>(
            <button key={tab} className={`evd-tab${activeTab===i?" active":""}`} onClick={()=>setActiveTab(i)}>{tab}</button>
          ))}
        </div>
      </div>
      <div key={activeTab}>{panels[activeTab]}</div>
    </div>
  );
}

// ─── CREATE EVENT MODAL ───────────────────────────────────────────────────────
function CreateEventModal({onClose, onSubmit}) {
  const fileRef = useRef(null);
  const [step,setStep]=useState(1);
  const [bannerPreview,setBannerPreview]=useState(null);
  const [form,setForm]=useState({name:"",organizer:"",date:"",day:"",time:"",fees:"",mode:"",location:"",attendees:"",category:"",description:"",website:"",linkedin:"",instagram:""});
  const set=k=>e=>setForm(p=>({...p,[k]:e.target.value}));

  const handleBanner = e => {
    const file=e.target.files[0]; if(!file) return;
    const reader=new FileReader();
    reader.onload=ev=>setBannerPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    onSubmit({
      id:Date.now(), ...form,
      bannerUrl:bannerPreview,
      bannerGradient:"linear-gradient(135deg,#050D1A 0%,#0D1F3C 60%,#050D1A 100%)",
      accentColor:"#00EEFF",
      links:{website:form.website||"#",linkedin:form.linkedin||"#",instagram:form.instagram||"#"},
      agenda:[], organiserTeam:[], speakers:[], sponsors:[], communityPartners:[], faqs:[],
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="modal-box">
        <div className="modal-header">
          <div>
            <div style={{fontSize:11,fontWeight:700,color:"#4F46E5",letterSpacing:".15em",fontFamily:"Space Mono,monospace",marginBottom:4}}>NEW EVENT · STEP {step}/2</div>
            <div className="modal-title">Create <span className="grad-text">Event</span></div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{display:"flex",gap:6}}>
              {[1,2].map(s=><div key={s} style={{width:28,height:5,borderRadius:3,background:step>=s?"linear-gradient(135deg,#00EEFF,#4F46E5)":"rgba(255,255,255,.07)",transition:"background .3s"}} />)}
            </div>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="modal-body">
          {step===1&&(
            <div style={{animation:"slideIn .28s ease-out both"}}>
              <p style={{color:"#64748B",fontSize:13,marginBottom:22}}>Step 1 — Basic info & banner</p>

              {/* Banner upload */}
              <label className="evd-form-label" style={{marginBottom:8,display:"block"}}>Event Banner</label>
              <div className={`banner-upload-area${bannerPreview?" has-image":""}`} onClick={()=>fileRef.current?.click()}>
                {bannerPreview
                  ?<><img src={bannerPreview} alt="preview" className="banner-preview-img" /><div className="banner-hover-overlay"><UploadIcon /><span style={{color:"#00EEFF",fontSize:13,fontWeight:700,fontFamily:"Space Mono,monospace"}}>Change Banner</span></div></>
                  :<><div style={{color:"#475569"}}><UploadIcon /></div><span style={{fontSize:13,fontWeight:700,color:"#00EEFF",fontFamily:"Space Mono,monospace"}}>Upload Event Banner</span><span style={{fontSize:11,color:"#475569"}}>PNG, JPG, WEBP — 1200×630px recommended</span></>
                }
                <input ref={fileRef} type="file" accept="image/*" onChange={handleBanner} style={{display:"none"}} />
              </div>

              <div className="evd-form-row">
                <div className="evd-form-group"><label className="evd-form-label">Event Name *</label><input className="evd-input" placeholder="TechEra Hackathon 2025" value={form.name} onChange={set("name")} /></div>
                <div className="evd-form-group"><label className="evd-form-label">Organizer *</label><input className="evd-input" placeholder="TechEra Community" value={form.organizer} onChange={set("organizer")} /></div>
              </div>
              <div className="evd-form-row">
                <div className="evd-form-group"><label className="evd-form-label">Event Date *</label><input className="evd-input" type="date" value={form.date} onChange={set("date")} /></div>
                <div className="evd-form-group">
                  <label className="evd-form-label">Event Day</label>
                  <select className="evd-select" value={form.day} onChange={set("day")}>
                    <option value="">Select Day</option>
                    {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(d=><option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="evd-form-row">
                <div className="evd-form-group"><label className="evd-form-label">Time *</label><input className="evd-input" type="time" value={form.time} onChange={set("time")} /></div>
                <div className="evd-form-group">
                  <label className="evd-form-label">Mode *</label>
                  <select className="evd-select" value={form.mode} onChange={set("mode")}>
                    <option value="">Select Mode</option>
                    {["In-Person","Online","Hybrid"].map(m=><option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              <div className="evd-form-row">
                <div className="evd-form-group"><label className="evd-form-label">Location</label><input className="evd-input" placeholder="Delhi, NCR / Virtual" value={form.location} onChange={set("location")} /></div>
                <div className="evd-form-group"><label className="evd-form-label">Entry Fees</label><input className="evd-input" placeholder="Free / ₹200" value={form.fees} onChange={set("fees")} /></div>
              </div>
              <div className="evd-form-row">
                <div className="evd-form-group">
                  <label className="evd-form-label">Category</label>
                  <select className="evd-select" value={form.category} onChange={set("category")}>
                    <option value="">Select Category</option>
                    {["Open Source","Hackathon","Summit","Workshop","Meetup","Conference","Webinar"].map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="evd-form-group"><label className="evd-form-label">Expected Attendees</label><input className="evd-input" placeholder="500+" value={form.attendees} onChange={set("attendees")} /></div>
              </div>
              <div style={{display:"flex",justifyContent:"flex-end",marginTop:6}}>
                <button className="evd-submit-btn" onClick={()=>setStep(2)} disabled={!form.name||!form.organizer}>Next: Details →</button>
              </div>
            </div>
          )}
          {step===2&&(
            <div style={{animation:"slideIn .28s ease-out both"}}>
              <p style={{color:"#64748B",fontSize:13,marginBottom:22}}>Step 2 — Description & links</p>
              <div className="evd-form-group" style={{marginBottom:16}}>
                <label className="evd-form-label">Event Description *</label>
                <textarea className="evd-input evd-textarea" style={{minHeight:130}} placeholder="Describe what attendees can expect — topics, sessions, networking opportunities..." value={form.description} onChange={set("description")} />
              </div>
              <div style={{fontSize:12,fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:".1em",fontFamily:"Space Mono,monospace",marginBottom:12}}>Social & Links</div>
              <div className="evd-form-group" style={{marginBottom:12}}><label className="evd-form-label">Website URL</label><input className="evd-input" placeholder="https://your-event.com" value={form.website} onChange={set("website")} /></div>
              <div className="evd-form-row">
                <div className="evd-form-group"><label className="evd-form-label">LinkedIn</label><input className="evd-input" placeholder="https://linkedin.com/..." value={form.linkedin} onChange={set("linkedin")} /></div>
                <div className="evd-form-group"><label className="evd-form-label">Instagram</label><input className="evd-input" placeholder="https://instagram.com/..." value={form.instagram} onChange={set("instagram")} /></div>
              </div>
              <div style={{marginTop:6,marginBottom:24,padding:"14px 18px",borderRadius:14,border:"1px solid rgba(0,238,255,.1)",background:"rgba(0,238,255,.04)",display:"flex",alignItems:"flex-start",gap:10}}>
                <span style={{fontSize:16,flexShrink:0}}>ℹ️</span>
                <span style={{fontSize:13,color:"#64748B",lineHeight:1.6}}>After creating the event, you can add Agenda, Team, Speakers, Sponsors & FAQs from the event detail page.</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",gap:12}}>
                <button onClick={()=>setStep(1)}
                  style={{padding:"12px 22px",borderRadius:12,border:"1px solid rgba(255,255,255,.08)",background:"rgba(255,255,255,.03)",color:"#64748B",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"Manrope,sans-serif",transition:"all .2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.color="white";e.currentTarget.style.borderColor="rgba(255,255,255,.2)";}}
                  onMouseLeave={e=>{e.currentTarget.style.color="#64748B";e.currentTarget.style.borderColor="rgba(255,255,255,.08)";}}
                >← Back</button>
                <button className="evd-submit-btn" onClick={handleSubmit} disabled={!form.description}>🚀 Create Event</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── EVENT CARD ───────────────────────────────────────────────────────────────
function EventCard({ev, onClick}) {
  const [hov,setHov]=useState(false);
  const modeC={"In-Person":{c:"#4ADE80",bg:"rgba(74,222,128,.12)"},"Online":{c:"#00EEFF",bg:"rgba(0,238,255,.1)"},"Hybrid":{c:"#A78BFA",bg:"rgba(167,139,250,.1)"}}[ev.mode]||{c:"#00EEFF",bg:"rgba(0,238,255,.1)"};
  return (
    <div className="ev-card" onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={onClick}
      style={{borderColor:hov?`${ev.accentColor}30`:"rgba(255,255,255,.05)",boxShadow:hov?`0 16px 48px ${ev.accentColor}14`:"none"}}
    >
      <div className="ev-card-banner" style={{background:ev.bannerGradient,position:"relative"}}>
        <AnimatedCover accentColor={ev.accentColor} bannerUrl={ev.bannerUrl} />
        <div className="ev-card-mode-badge" style={{color:modeC.c,background:modeC.bg,border:`1px solid ${modeC.c}30`}}>{ev.mode}</div>
      </div>
      <div className="ev-card-body">
        <div className="ev-card-org">{ev.organizer}</div>
        <div className="ev-card-name">{ev.name}</div>
        <div className="ev-card-meta">
          <div className="ev-card-meta-item"><CalIcon />{ev.date}</div>
          <div className="ev-card-meta-item"><LocIcon />{ev.location}</div>
        </div>
        <div className="ev-card-footer">
          <div>
            <div style={{fontSize:10,fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:".1em",fontFamily:"Space Mono,monospace",marginBottom:3}}>Entry</div>
            <div style={{fontSize:14,fontWeight:800,color:ev.fees==="Free"?"#4ADE80":"#FEBC2E"}}>{ev.fees}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:"#475569"}}><UserIcon />{ev.attendees}</div>
            <button className="ev-card-view-btn">View →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── EVENTS LISTING PAGE ──────────────────────────────────────────────────────
function EventsListing({events, onViewEvent, onCreateEvent}) {
  const [filter,setFilter]=useState("All");
  const [search,setSearch]=useState("");
  const FILTERS=["All","Open Source","Hackathon","Summit","Workshop","Meetup"];
  const filtered=events.filter(ev=>(filter==="All"||ev.category===filter)&&(!search||ev.name.toLowerCase().includes(search.toLowerCase())||ev.organizer.toLowerCase().includes(search.toLowerCase())));

  return (
    <div>
      <div className="evl-hero">
        <div className="evl-hero-top">
          <div>
            <div className="evl-pill"><div style={{width:8,height:8,borderRadius:"50%",background:"#00EEFF",animation:"pulseGlow 2s ease-in-out infinite"}} />EVENTS / COMMUNITY</div>
            <h1 className="evl-title">Discover &<br /><span className="shimmer-text">Join Events</span></h1>
            <p className="evl-sub">Explore hackathons, summits, workshops, and more — curated for builders like you.</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12,alignItems:"flex-end"}}>
            {/* <button className="evl-create-btn" onClick={onCreateEvent}><PlusIcon /> Create Event</button> */}
            <div className="evl-search-wrap">
              <span className="evl-search-icon"><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
              <input className="evl-search" placeholder="Search events…" value={search} onChange={e=>setSearch(e.target.value)} />
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
          {[{val:`${events.length}`,lbl:"Total Events"},{val:"50+",lbl:"Speakers"},{val:"2K+",lbl:"Community"},{val:"10+",lbl:"Partners"}].map(({val,lbl})=>(
            <div key={lbl} style={{padding:"11px 20px",borderRadius:14,border:"1px solid rgba(255,255,255,.05)",background:"#0A1628",textAlign:"center"}}>
              <div style={{fontSize:20,fontWeight:900,color:"#00EEFF",fontFamily:"Space Mono,monospace"}}>{val}</div>
              <div style={{fontSize:10,color:"#475569",textTransform:"uppercase",letterSpacing:".12em",marginTop:3}}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="evl-filters">
        {FILTERS.map(f=><button key={f} className={`evl-filter-btn${filter===f?" active":""}`} onClick={()=>setFilter(f)}>{f}</button>)}
      </div>

      <div className="evl-grid">
        {filtered.length===0
          ?<div style={{gridColumn:"1/-1",textAlign:"center",padding:"60px 20px",color:"#475569"}}>
              <div style={{fontSize:40,marginBottom:12}}>🔍</div>
              <div style={{fontSize:16,fontWeight:700,color:"#64748B",marginBottom:6}}>No events found</div>
              <div style={{fontSize:13}}>Try a different search or filter</div>
            </div>
          :filtered.map(ev=><EventCard key={ev.id} ev={ev} onClick={()=>onViewEvent(ev)} />)
        }
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="ev-footer">
      <div className="ev-footer-inner">
        <div className="ev-footer-grid">
          <div>
            <div style={{fontFamily:"Syne,sans-serif",fontSize:24,fontWeight:900,background:"linear-gradient(135deg,#00EEFF,#4F46E5)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",marginBottom:10}}>TechEra</div>
            <p style={{color:"#475569",fontSize:13,lineHeight:1.75,maxWidth:240}}>Transforming education through creative events, collaborative learning, and expert mentorship.</p>
            <div style={{display:"flex",gap:10,marginTop:14}}>
              {[LinkedInIcon,InstaIcon,GitHubIcon].map((Icon,i)=>(
                <a key={i} href="#" style={{width:32,height:32,borderRadius:9,border:"1px solid rgba(255,255,255,.07)",background:"rgba(255,255,255,.03)",display:"flex",alignItems:"center",justifyContent:"center",color:"#475569",textDecoration:"none",transition:"color .2s,border-color .2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.color="#00EEFF";e.currentTarget.style.borderColor="rgba(0,238,255,.3)";}}
                  onMouseLeave={e=>{e.currentTarget.style.color="#475569";e.currentTarget.style.borderColor="rgba(255,255,255,.07)";}}
                ><Icon /></a>
              ))}
            </div>
          </div>
          {[{title:"Quick Links",links:["Browse Events","Our Courses","About Us","Success Stories","Become a Mentor"]},{title:"Resources",links:["Help Center","Event Guidelines","Community Forum","Blog","Privacy Policy"]}].map(({title,links})=>(
            <div key={title}>
              <div style={{fontSize:13,fontWeight:800,color:"white",marginBottom:14,textTransform:"uppercase",letterSpacing:".1em",fontFamily:"Space Mono,monospace"}}>{title}</div>
              {links.map(l=><a key={l} href="#" style={{color:"#475569",fontSize:13,textDecoration:"none",display:"block",marginBottom:8,transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color="#00EEFF"} onMouseLeave={e=>e.currentTarget.style.color="#475569"}>{l}</a>)}
            </div>
          ))}
          <div>
            <div style={{fontSize:13,fontWeight:800,color:"white",marginBottom:14,textTransform:"uppercase",letterSpacing:".1em",fontFamily:"Space Mono,monospace"}}>Stay Updated</div>
            {["📧 ravi@mentorravirautela.com","📞 +91 99100 99925","📍 Noida, Uttar Pradesh, India"].map(item=>(
              <div key={item} style={{color:"#475569",fontSize:13,marginBottom:6}}>{item}</div>
            ))}
            <div style={{marginTop:14}}>
              <div style={{fontSize:12,fontWeight:700,color:"#475569",marginBottom:8}}>Subscribe to newsletter</div>
              <div style={{display:"flex",gap:8}}>
                <input placeholder="Your email" style={{flex:1,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:10,padding:"8px 12px",color:"white",fontSize:13,outline:"none"}} />
                <button style={{padding:"8px 16px",borderRadius:10,background:"linear-gradient(135deg,#4F46E5,#00EEFF)",color:"#050D1A",fontWeight:800,fontSize:13,border:"none",cursor:"pointer"}}>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        <div className="ev-footer-bottom">
          <span style={{color:"#475569",fontSize:12}}>© 2025 MentorRaviRautela. All rights reserved.</span>
          <div style={{display:"flex",gap:20}}>
            {["Terms of Service","Privacy Policy","Cookie Policy"].map(l=>(
              <a key={l} href="#" style={{color:"#475569",fontSize:12,textDecoration:"none",transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color="#94A3B8"} onMouseLeave={e=>e.currentTarget.style.color="#475569"}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function EventsPage() {
  const [events,setEvents]       = useState(INITIAL_EVENTS);
  const [selected,setSelected]   = useState(null);
  const [showCreate,setShowCreate]= useState(false);

  return (
    <div className="ev-page">
      <GlobalStyles />
      <Navbar /> {/* Your existing Navbar — /events route is already in NAV_LINKS */}

      {selected
        ? <EventDetail ev={selected} onBack={()=>{ setSelected(null); window.scrollTo(0,0); }} />
        : <EventsListing events={events} onViewEvent={ev=>{ setSelected(ev); window.scrollTo(0,0); }} onCreateEvent={()=>setShowCreate(true)} />
      }

      <Footer />

      {showCreate&&(
        <CreateEventModal
          onClose={()=>setShowCreate(false)}
          onSubmit={newEv=>setEvents(prev=>[newEv,...prev])}
        />
      )}
    </div>
  );
}