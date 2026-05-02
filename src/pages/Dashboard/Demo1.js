import React, { useState, useEffect } from "react";

// ─── Theme — Navy Blue · Light / Dark Mode ────────────────────────────────────
const THEMES = {
  dark: {
    bg:"#070D1A", bgCard:"#0D1525", bgPanel:"#101C2E", bgDeep:"#050C17",
    border:"#1A2D4A", borderHi:"#1E3660",
    navy:"#0F2457", navyMid:"#1A3A7A", navyLight:"#2352A8",
    accent:"#F59E0B", accentGlow:"#F59E0B14", accentSoft:"#FCD34D",
    blue:"#4F8EF7", blueGlow:"#4F8EF718",
    green:"#10B981", greenGlow:"#10B98118",
    red:"#F05252", redGlow:"#F0525218",
    orange:"#FB923C", orangeGlow:"#FB923C18",
    purple:"#A78BFA", purpleGlow:"#A78BFA18",
    cyan:"#22D3EE", cyanGlow:"#22D3EE18",
    yellow:"#FBBF24",
    text:"#E8EDF5", textSub:"#8BA4C4", textMuted:"#344D6E",
    sidebarBg:"#040D1A", sidebarBorder:"#122040",
  },
  light: {
    bg:"#F0F4FA", bgCard:"#FFFFFF", bgPanel:"#EBF0FA", bgDeep:"#E4EAF5",
    border:"#C8D8EE", borderHi:"#A8C0E0",
    navy:"#0F2457", navyMid:"#1A3A7A", navyLight:"#2352A8",
    accent:"#D97706", accentGlow:"#D9770614", accentSoft:"#F59E0B",
    blue:"#1D56C4", blueGlow:"#1D56C414",
    green:"#059669", greenGlow:"#05966914",
    red:"#DC2626", redGlow:"#DC262614",
    orange:"#EA580C", orangeGlow:"#EA580C14",
    purple:"#7C3AED", purpleGlow:"#7C3AED14",
    cyan:"#0891B2", cyanGlow:"#0891B214",
    yellow:"#D97706",
    text:"#0F1F3D", textSub:"#3D5A8A", textMuted:"#8BA0BE",
    sidebarBg:"#0B1D40", sidebarBorder:"#1A3470",
  }
};

let T = THEMES.dark;

const buildCSS = (t) => `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:${t.bg};font-family:'DM Sans',sans-serif;color:${t.text};font-size:14px;transition:background .25s,color .25s;}
::-webkit-scrollbar{width:4px;height:4px;}
::-webkit-scrollbar-track{background:${t.bg};}
::-webkit-scrollbar-thumb{background:${t.border};border-radius:2px;}
.rj{font-family:'Rajdhani',sans-serif;}.mono{font-family:'JetBrains Mono',monospace;}
.app{display:flex;min-height:100vh;}
.sidebar{background:${t.sidebarBg};border-right:1px solid ${t.sidebarBorder};width:236px;min-height:100vh;flex-shrink:0;display:flex;flex-direction:column;position:sticky;top:0;height:100vh;overflow-y:auto;}
.main{flex:1;overflow-y:auto;min-height:100vh;background:${t.bg};}
.pad{padding:24px 28px;}
.nav-section{font-size:9px;font-weight:700;letter-spacing:.14em;color:#3D5A7A;padding:14px 16px 4px;text-transform:uppercase;}
.nav-item{display:flex;align-items:center;gap:10px;padding:8px 14px;cursor:pointer;font-size:12.5px;color:#8BA8C8;border-radius:8px;margin:1px 6px;transition:all .15s;}
.nav-item:hover{background:rgba(255,255,255,.07);color:#C8D8F0;}
.nav-item.active{background:${t.accent}18;color:${t.accent};border:1px solid ${t.accent}30;}
.nav-badge{margin-left:auto;background:${t.red}22;color:${t.red};font-size:10px;padding:1px 7px;border-radius:10px;font-weight:700;}
.nav-badge-o{margin-left:auto;background:${t.orange}22;color:${t.orange};font-size:10px;padding:1px 7px;border-radius:10px;font-weight:700;}
.card{background:${t.bgCard};border:1px solid ${t.border};border-radius:12px;padding:18px;transition:background .2s,border .2s;}
.card-sm{background:${t.bgCard};border:1px solid ${t.border};border-radius:10px;padding:12px 14px;}
.stat{background:${t.bgCard};border:1px solid ${t.border};border-radius:12px;padding:16px;}
.stat-v{font-family:'Rajdhani',sans-serif;font-size:30px;font-weight:700;line-height:1;}
.stat-l{font-size:10px;color:${t.textSub};margin-top:3px;text-transform:uppercase;letter-spacing:.07em;}
.badge{display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600;}
.bg{background:${t.green}20;color:${t.green};}.br{background:${t.red}20;color:${t.red};}.ba{background:${t.accent}20;color:${t.accent};}
.bb{background:${t.blue}20;color:${t.blue};}.bp{background:${t.purple}20;color:${t.purple};}.bo{background:${t.orange}20;color:${t.orange};}.bc{background:${t.cyan}20;color:${t.cyan};}
.btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:8px;font-size:12.5px;font-weight:500;cursor:pointer;border:none;transition:all .15s;font-family:'DM Sans',sans-serif;}
.btn-p{background:${t.accent};color:#0F1F3D;font-weight:700;}.btn-p:hover{background:${t.accentSoft};}
.btn-navy{background:${t.navyLight};color:#fff;font-weight:600;}.btn-navy:hover{background:${t.navyMid};}
.btn-g{background:${t.green}20;color:${t.green};border:1px solid ${t.green}30;}
.btn-b{background:${t.blue}20;color:${t.blue};border:1px solid ${t.blue}30;}
.btn-r{background:${t.red}20;color:${t.red};border:1px solid ${t.red}30;}
.btn-o{background:${t.orange}20;color:${t.orange};border:1px solid ${t.orange}30;}
.btn-c{background:${t.cyan}20;color:${t.cyan};border:1px solid ${t.cyan}30;}
.btn-gh{background:transparent;color:${t.textSub};border:1px solid ${t.border};}.btn-gh:hover{background:${t.bgPanel};color:${t.text};}
.tbl{width:100%;border-collapse:collapse;}
.tbl th{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:${t.textMuted};padding:9px 12px;text-align:left;border-bottom:1px solid ${t.border};background:${t.bgPanel};}
.tbl td{padding:10px 12px;font-size:12.5px;color:${t.textSub};border-bottom:1px solid ${t.border}18;}
.tbl tr:hover td{background:${t.bgPanel};color:${t.text};}.tbl tr:last-child td{border-bottom:none;}
.pbar{height:4px;background:${t.border};border-radius:4px;overflow:hidden;}.pfill{height:100%;border-radius:4px;transition:width .4s;}
input,select,textarea{background:${t.bgPanel};border:1px solid ${t.border};border-radius:8px;color:${t.text};padding:7px 11px;font-size:12.5px;font-family:'DM Sans',sans-serif;outline:none;width:100%;transition:background .2s,border .2s;}
input:focus,select:focus,textarea:focus{border-color:${t.accent}66;}
select option{background:${t.bgPanel};color:${t.text};}textarea{resize:vertical;}
.flabel{font-size:10px;font-weight:700;color:${t.textSub};text-transform:uppercase;letter-spacing:.07em;margin-bottom:5px;display:block;}
.frow{display:grid;gap:12px;margin-bottom:14px;}.fr2{grid-template-columns:1fr 1fr;}.fr3{grid-template-columns:1fr 1fr 1fr;}.fr4{grid-template-columns:1fr 1fr 1fr 1fr;}
.ov{position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(8px);}
.modal{background:${t.bgCard};border:1px solid ${t.borderHi};border-radius:16px;width:100%;max-width:900px;max-height:92vh;overflow-y:auto;}
.mhdr{padding:16px 22px;border-radius:16px 16px 0 0;display:flex;align-items:center;justify-content:space-between;}.mbdy{padding:22px;}
.tabs{display:flex;gap:2px;border-bottom:1px solid ${t.border};margin-bottom:18px;flex-wrap:wrap;}
.tab{padding:8px 14px;font-size:12.5px;cursor:pointer;color:${t.textMuted};border-bottom:2px solid transparent;transition:all .15s;}
.tab.on{color:${t.accent};border-bottom-color:${t.accent};}.tab:hover{color:${t.text};}
.arow{display:flex;align-items:center;gap:12px;padding:9px 12px;background:${t.bgPanel};border-radius:8px;border-left:3px solid;margin-bottom:6px;}
.kpi-row{display:grid;gap:12px;margin-bottom:18px;}
.sep{height:1px;background:${t.border};margin:14px 0;}
.ledger-dr{color:${t.red};font-weight:600;}.ledger-cr{color:${t.green};font-weight:600;}
.section-title{font-size:11px;font-weight:700;color:${t.textMuted};text-transform:uppercase;letter-spacing:.1em;margin-bottom:12px;}
.grd2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}.grd3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;}
.risk-high{color:${t.red};background:${t.red}15;border:1px solid ${t.red}30;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;}
.risk-med{color:${t.orange};background:${t.orange}15;border:1px solid ${t.orange}30;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;}
.risk-low{color:${t.green};background:${t.green}15;border:1px solid ${t.green}30;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;}
.toggle-pill{display:flex;background:${t.bgPanel};border:1px solid ${t.border};border-radius:20px;padding:2px;gap:2px;}
.toggle-opt{padding:4px 14px;border-radius:16px;font-size:12px;cursor:pointer;font-weight:500;transition:all .15s;color:${t.textSub};}
.toggle-opt.on{background:${t.accent};color:#0F1F3D;font-weight:700;}
.kanban-col{background:${t.bgPanel};border:1px solid ${t.border};border-radius:12px;min-width:190px;padding:12px;}
.kanban-card{background:${t.bgCard};border:1px solid ${t.border};border-radius:8px;padding:11px;margin-bottom:8px;cursor:pointer;transition:border-color .15s;}
.kanban-card:hover{border-color:${t.accent}55;}
.vtype-btn{display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:10px;cursor:pointer;border:1px solid ${t.border};background:${t.bgPanel};transition:all .15s;}
.vtype-btn:hover,.vtype-btn.sel{border-color:${t.accent};background:${t.accentGlow};}
.truck-card{padding:10px 14px;border-radius:10px;cursor:pointer;border:1px solid ${t.border};background:${t.bgPanel};display:flex;align-items:center;justify-content:space-between;transition:all .15s;margin-bottom:8px;}
.truck-card:hover{border-color:${t.accent}66;}.truck-card.sel{border-color:${t.accent};background:${t.accentGlow};}
.journey-card{padding:13px 15px;border-radius:12px;cursor:pointer;border:1px solid ${t.border};background:${t.bgPanel};transition:all .15s;}
.journey-card:hover,.journey-card.sel{border-color:${t.accent};background:${t.accentGlow};}
.leg-block{background:${t.bgPanel};border:1px solid ${t.border};border-radius:10px;padding:14px;margin-bottom:12px;}
.inspect-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px;}
.inspect-item{display:flex;align-items:center;justify-content:space-between;padding:8px 11px;background:${t.bgPanel};border-radius:8px;border:1px solid ${t.border};}
`.trim();


// ─── Icons ────────────────────────────────────────────────────────────────────
const Ic = ({ n, s = 15, c = "currentColor" }) => {
  const d = {
    x:<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    plus:<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    check:<><polyline points="20 6 9 17 4 12"/></>,
    arrow:<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    wallet:<><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>,
    truck:<><path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3"/><rect x="9" y="11" width="14" height="10" rx="2"/><circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/></>,
    driver:<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></>,
    tyre:<><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="22"/><line x1="2" y1="12" x2="8" y2="12"/><line x1="16" y1="12" x2="22" y2="12"/></>,
    agent:<><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></>,
    fleet:<><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
    finance:<><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></>,
    chart:<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    shield:<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    bell:<><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
    trips:<><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></>,
    dash:<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    eye:<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    edit:<><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    rotate:<><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></>,
    recycle:<><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></>,
    alert:<><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    doc:<><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></>,
    percent:<><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></>,
    phone:<><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></>,
    wrench:<><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></>,
    parts:<><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M12 2v2M12 20v2M2 12h2M20 12h2"/></>,
    brain:<><path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-2.5 2.5H7a2.5 2.5 0 01-2.5-2.5V7A2.5 2.5 0 017 4.5M14.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 002.5 2.5H17a2.5 2.5 0 002.5-2.5V7A2.5 2.5 0 0017 4.5"/></>,
    vendor:<><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    fuel:<><path d="M3 22V8l7-6 7 6v14"/><path d="M17 22v-4M17 14V8M17 8l3 2M3 12h14"/></>,
    map:<><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></>,
    cpu:<><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></>,
    pretrip:<><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></>,
    posttrip:<><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></>,
    clipboard:<><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></>,
    route:<><circle cx="5" cy="6" r="3"/><path d="M5 9v12"/><circle cx="5" cy="21" r="3"/><path d="M13 6h4a2 2 0 012 2v8a2 2 0 01-2 2h-4"/></>,
  };
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{d[n]||null}</svg>;
};

// ═══════════════════════════════════════════════════════════════════════════════
// VEHICLE SCHEMA (from v2)
// ═══════════════════════════════════════════════════════════════════════════════
const VEHICLE_SCHEMA = [
  { id:"tripper", label:"Tripper", icon:"🚛", desc:"Tipping body for bulk material (sand, gravel, coal)", color:"#F59E0B",
    subtypes:[{ id:"tripper_live", label:"Live Axle", wheels:["12 Wheelers","14 Wheelers","16 Wheelers"], capacity:"10–20T" },{ id:"tripper_lift", label:"Lift Axle", wheels:["14 Wheelers","16 Wheelers"], capacity:"15–25T" }],
    specs:{ make:"Tata / Ashok Leyland / BharatBenz", fuelEconomy:"4–5 km/l", avgSpeed:"55–65 kmph" } },
  { id:"openbody", label:"Open Body", icon:"🚚", desc:"Flatbed open carrier for general goods, machinery", color:"#3B82F6",
    subtypes:[{ id:"openbody_std", label:"Standard", wheels:["12 Wheelers","14 Wheelers","16 Wheelers"], capacity:"10–24T" },{ id:"openbody_liftaxle", label:"Lift Axle", wheels:["14 Wheelers","16 Wheelers"], capacity:"18–28T" }],
    specs:{ make:"Tata / EICHER / Mahindra", fuelEconomy:"5–7 km/l", avgSpeed:"60 kmph" } },
  { id:"trailer", label:"Trailer", icon:"🚜", desc:"Long-haul semi-trailer for heavy/oversized loads", color:"#8B5CF6",
    subtypes:[{ id:"trailer_single", label:"Single Trailer", wheels:["2 Axle","3 Axle"], capacity:"20–30T" },{ id:"trailer_double", label:"Double Trailer", wheels:["4 Axle","5 Axle"], capacity:"30–45T" }],
    specs:{ make:"Tata Prima / Volvo / Scania", fuelEconomy:"3–4 km/l", avgSpeed:"55 kmph" } },
  { id:"flatbed", label:"Flatbed", icon:"🛻", desc:"Low-deck flatbed for steel coils, pipes, heavy cargo", color:"#10B981",
    subtypes:[{ id:"flatbed_std", label:"Standard", wheels:["12 Wheelers","14 Wheelers","16 Wheelers"], capacity:"15–30T" },{ id:"flatbed_lowbed", label:"Low Bed", wheels:["6 Axle","8 Axle"], capacity:"30–80T" }],
    specs:{ make:"Tata / KAMA / BharatBenz", fuelEconomy:"4–5 km/l", avgSpeed:"55 kmph" } },
  { id:"container", label:"Container", icon:"📦", desc:"Enclosed container for finished goods, FMCG", color:"#F97316",
    subtypes:[{ id:"container_20ft", label:"20 FT", wheels:["6 Wheeler","10 Wheeler"], capacity:"15–18T" },{ id:"container_32ft", label:"32 FT", wheels:["12 Wheeler","14 Wheeler"], capacity:"20–25T" },{ id:"container_40ft", label:"40 FT HQ", wheels:["16 Wheeler","18 Wheeler"], capacity:"25–30T" }],
    specs:{ make:"Tata / VECV / MAN", fuelEconomy:"6–8 km/l", avgSpeed:"65 kmph" } },
  { id:"lcv", label:"LCV / SCV", icon:"🚐", desc:"Light/small commercial vehicle for last-mile delivery", color:"#94A3B8",
    subtypes:[{ id:"lcv_mini", label:"Mini Truck", wheels:["4 Wheeler"], capacity:"1–2T" },{ id:"lcv_pickup", label:"Pickup", wheels:["4 Wheeler"], capacity:"0.5–1T" }],
    specs:{ make:"Tata Ace / Mahindra Jeeto / Force", fuelEconomy:"12–18 km/l", avgSpeed:"60 kmph" } },
];

const JOURNEY_TYPES = [
  { id:"oneway", label:"One-Way Load", icon:"→", color:"#3B82F6", desc:"Truck goes A→B with load. Returns empty or on its own.", legs:["Origin → Destination"], tag:"Single Leg" },
  { id:"roundtrip", label:"Round Trip", icon:"⇄", color:"#10B981", desc:"A→B with load, B→A with return load from another party.", legs:["Origin → Destination","Destination → Origin (Return Load)"], tag:"2 Legs" },
  { id:"multileg", label:"Multi-Leg (Hub & Spoke)", icon:"⟳", color:"#F59E0B", desc:"A→B→C. Deliver at B, pick new load to C, then return.", legs:["Origin → Stop 1","Stop 1 → Stop 2","Stop 2 → Origin"], tag:"3 Legs" },
  { id:"crossregion", label:"Cross-Region Relay", icon:"↬", color:"#8B5CF6", desc:"Long-haul trip with driver relay handoff at midpoint depot.", legs:["Origin → Relay Point","Relay Point → Destination"], tag:"Driver Relay" },
  { id:"dedicated", label:"Dedicated Fleet Run", icon:"∞", color:"#F97316", desc:"Fixed route, recurring trips for one customer.", legs:["Fixed Route (Repeating)"], tag:"Recurring" },
];

const INSPECTION_ITEMS = [
  "Brakes","Lights","Fuel Level","Windshield Wipers","Flashlight","Muffler",
  "Oil Pressure","Engine","Battery Water Level","Engine Oil","Gear Box Oil",
  "Electricals","Horn","Radiator","Air Filter","Steering System",
  "Suspension","Emergency Equipment","Belts","Radiator Water Level",
  "Crown Oil","Filter Cleaning","Tyre (FL)","Tyre (FR)","Tyre (RL)","Tyre (RR)",
];

const CUSTOMERS = ["Ramco Cements","TVS Motors","Asian Paints","Pepsico India","Godrej Industries","Raj Textiles","SKS Logistics","Global Freight","Deccan Traders","North India Corp"];

// ─── Seed Data ────────────────────────────────────────────────────────────────
const DRIVERS_DATA = [
  { id:"DRV-001", name:"Mani Kumar", phone:"+91 98765 43210", cdl:"Class A", score:88, status:"Available", advanceBalance:4500, totalTrips:34, kmDriven:284000, licenseExp:"2027-03-15" },
  { id:"DRV-002", name:"Selvam R", phone:"+91 87654 32109", cdl:"Class B", score:76, status:"On Settlement", advanceBalance:0, totalTrips:21, kmDriven:168000, licenseExp:"2026-07-22" },
  { id:"DRV-003", name:"Ramesh P", phone:"+91 76543 21098", cdl:"Class A", score:62, status:"On Trip", advanceBalance:8000, totalTrips:18, kmDriven:142000, licenseExp:"2025-12-31" },
  { id:"DRV-004", name:"Arjun D", phone:"+91 65432 10987", cdl:"Class A", score:94, status:"Available", advanceBalance:2300, totalTrips:28, kmDriven:231000, licenseExp:"2028-11-10" },
  { id:"DRV-005", name:"Vinoth S", phone:"+91 54321 09876", cdl:"Class B", score:71, status:"On Trip", advanceBalance:6700, totalTrips:15, kmDriven:118000, licenseExp:"2029-04-05" },
  { id:"DRV-006", name:"Karthik M", phone:"+91 43210 98765", cdl:"Class A", score:85, status:"Available", advanceBalance:1200, totalTrips:22, kmDriven:195000, licenseExp:"2028-08-20" },
];

const FLEET_DATA = [
  { id:"VH-001", num:"TN69 GH4789", typeId:"tripper", subtypeId:"tripper_live", wheels:"16 Wheelers", model:"Tata LPT 2518", make:"Tata", year:2017, status:"Active", health:87, ownership:"Owned", purchaseCost:2800000, purchaseDate:"2017-04-10", insurance:"Valid", fc:"Valid", tax:"Due in 12d", km:74875, revenue:4820000, cost:3640000, fuel:"5.2 km/l", speed:"60 kmph" },
  { id:"VH-002", num:"TN59 AB1234", typeId:"openbody", subtypeId:"openbody_std", wheels:"14 Wheelers", model:"Ashok Leyland 2518", make:"Ashok Leyland", year:2019, status:"Active", health:73, ownership:"Owned", purchaseCost:2600000, purchaseDate:"2019-08-15", insurance:"Expiring in 7d", fc:"Valid", tax:"Paid", km:92340, revenue:3950000, cost:3120000, fuel:"4.8 km/l", speed:"58 kmph" },
  { id:"VH-003", num:"TN45 CD5678", typeId:"trailer", subtypeId:"trailer_single", wheels:"3 Axle", model:"Tata Prima 4928", make:"Tata Prima", year:2016, status:"Maintenance", health:45, ownership:"Leased", purchaseCost:4200000, purchaseDate:"2016-02-20", insurance:"Valid", fc:"Expired", tax:"Paid", km:124000, revenue:6200000, cost:5800000, fuel:"4.1 km/l", speed:"55 kmph" },
  { id:"VH-004", num:"TN38 EF9012", typeId:"flatbed", subtypeId:"flatbed_std", wheels:"12 Wheelers", model:"BharatBenz 3523", make:"BharatBenz", year:2020, status:"Active", health:91, ownership:"Owned", purchaseCost:3100000, purchaseDate:"2020-11-05", insurance:"Valid", fc:"Valid", tax:"Paid", km:54220, revenue:2870000, cost:1950000, fuel:"5.8 km/l", speed:"60 kmph" },
  { id:"VH-005", num:"TN71 GH3456", typeId:"container", subtypeId:"container_32ft", wheels:"14 Wheeler", model:"VECV Eicher 6016", make:"VECV", year:2018, status:"On Trip", health:68, ownership:"Owned", purchaseCost:2200000, purchaseDate:"2018-06-22", insurance:"Valid", fc:"Valid", tax:"Due in 45d", km:88910, revenue:5100000, cost:3980000, fuel:"7.5 km/l", speed:"65 kmph" },
  { id:"VH-006", num:"TN22 IJ7890", typeId:"lcv", subtypeId:"lcv_mini", wheels:"4 Wheeler", model:"Tata Ace Gold", make:"Tata", year:2021, status:"Active", health:82, ownership:"Owned", purchaseCost:680000, purchaseDate:"2021-03-10", insurance:"Valid", fc:"Valid", tax:"Paid", km:31440, revenue:820000, cost:560000, fuel:"15 km/l", speed:"60 kmph" },
];

const VENDORS = [
  { id:"VND-001", name:"Sri Murugan Transport", contact:"Vijay K", phone:"+91 99001 23456", city:"Coimbatore", vehicles:3, rating:4.2, status:"Active", totalTrips:18, totalFreight:890000, ratePerKm:42, kycDone:true },
  { id:"VND-002", name:"Annamalai Lorry Service", contact:"Selvam A", phone:"+91 98002 34567", city:"Salem", vehicles:2, rating:3.8, status:"Active", totalTrips:12, totalFreight:540000, ratePerKm:38, kycDone:true },
  { id:"VND-003", name:"KPR Fleet Solutions", contact:"Krishnan P", phone:"+91 97003 45678", city:"Madurai", vehicles:5, rating:4.5, status:"Active", totalTrips:29, totalFreight:1450000, ratePerKm:44, kycDone:true },
];

const VENDOR_VEHICLES = [
  { id:"VVH-001", vendor:"Sri Murugan Transport", num:"TN32 XY7821", model:"Tata LPT 2518", type:"Tripper", status:"Available", ratePerKm:42 },
  { id:"VVH-002", vendor:"KPR Fleet Solutions", num:"TN58 AB1100", model:"Tata Prima", type:"Trailer", status:"Available", ratePerKm:44 },
  { id:"VVH-003", vendor:"Annamalai Lorry Service", num:"TN72 CD4400", model:"BharatBenz", type:"Flatbed", status:"Available", ratePerKm:38 },
];

const AGENTS = [
  { id:"AGT-001", name:"Raja Broker", company:"Raja Transport Agency", city:"Chennai", commType:"percent", commValue:5, status:"Active", totalTrips:34, totalFreight:1820000 },
  { id:"AGT-002", name:"Suresh Agency", company:"Suresh Logistics", city:"Coimbatore", commType:"fixed", commValue:3000, status:"Active", totalTrips:21, totalFreight:980000 },
  { id:"AGT-003", name:"Kumar Freight", company:"Kumar Freight Solutions", city:"Madurai", commType:"percent", commValue:4, status:"Active", totalTrips:18, totalFreight:762000 },
];

// TIN = Tyre Identification Number — manufacturer's unique serial stamped on sidewall
// Format: [Brand prefix 3 chars][Plant code 2][Week 2][Year 2][Seq 4] e.g. MRF-CH-17-23-0042
const TYRES = [
  { id:"TYR-001", tin:"MRF-CH-17-23-0042", code:"QR88201", brand:"MRF", size:"315/80 R22.5", pattern:"STEEL MUSCLE", purchaseCost:28000, purchaseDate:"2023-01-10", status:"active", vehicle:"TN69 GH4789", position:"FL", fitOdo:68000, currentOdo:74875, retreads:0, condition:"Good", warrantyKm:80000 },
  { id:"TYR-002", tin:"CEA-MA-08-23-1187", code:"QR88202", brand:"CEAT", size:"315/80 R22.5", pattern:"WINMILE", purchaseCost:25000, purchaseDate:"2023-01-10", status:"active", vehicle:"TN69 GH4789", position:"FR", fitOdo:68000, currentOdo:74875, retreads:0, condition:"Good", warrantyKm:80000 },
  { id:"TYR-003", tin:"APL-NA-32-22-0891", code:"QR77301", brand:"Apollo", size:"295/80 R22.5", pattern:"ENDURE TH", purchaseCost:22000, purchaseDate:"2022-08-15", status:"retread", vehicle:null, position:null, fitOdo:null, currentOdo:92000, retreads:1, condition:"Worn", warrantyKm:60000 },
  { id:"TYR-004", tin:"MRF-CH-21-23-0318", code:"QR77302", brand:"MRF", size:"315/80 R22.5", pattern:"STEEL MUSCLE", purchaseCost:28000, purchaseDate:"2023-05-20", status:"active", vehicle:"TN59 AB1234", position:"RL1", fitOdo:85000, currentOdo:92340, retreads:0, condition:"Good", warrantyKm:80000 },
  { id:"TYR-005", tin:"BRG-PU-06-24-0077", code:"QR55102", brand:"Bridgestone", size:"315/80 R22.5", pattern:"M788", purchaseCost:32000, purchaseDate:"2024-02-14", status:"inventory", vehicle:null, position:null, fitOdo:null, currentOdo:0, retreads:0, condition:"New", warrantyKm:100000 },
];

const WORK_ORDERS = [
  { id:"WO-001", vehicle:"TN45 CD5678", workshop:"Ganesh Auto Works", type:"Corrective", category:"Engine", issue:"Engine overheating during long haul", odometer:124000, status:"In Progress", created:"2025-04-10", partsUsed:[{name:"Radiator Hose",cost:2800},{name:"Coolant 5L",cost:1200}], labourCost:4500, totalCost:8500, invoiceStatus:"Pending" },
  { id:"WO-002", vehicle:"TN59 AB1234", workshop:"Power Electricals", type:"Corrective", category:"Electrical", issue:"Battery not charging — alternator fault", odometer:92340, status:"Open", created:"2025-04-14", partsUsed:[{name:"Alternator",cost:8500}], labourCost:2500, totalCost:11000, invoiceStatus:"Pending" },
  { id:"WO-003", vehicle:"TN69 GH4789", workshop:"Sri Ram Tyre Centre", type:"Preventive", category:"Tyre System", issue:"Scheduled tyre rotation & alignment", odometer:74875, status:"Completed", created:"2025-04-08", partsUsed:[{name:"Alignment",cost:800}], labourCost:1200, totalCost:2000, invoiceStatus:"Paid" },
];

const SPARE_PARTS = [
  { id:"SP-001", name:"Engine Oil 20W-50 (5L)", category:"Engine", quantity:24, unit:"Can", unitCost:1200, reorderLevel:10, vendor:"Castrol India" },
  { id:"SP-002", name:"Brake Pads (Axle Set)", category:"Brake System", quantity:4, unit:"Set", unitCost:6500, reorderLevel:2, vendor:"TVS Brakes" },
  { id:"SP-003", name:"Alternator", category:"Electrical", quantity:1, unit:"Pcs", unitCost:8500, reorderLevel:1, vendor:"Bosch India" },
  { id:"SP-004", name:"Clutch Plate Kit", category:"Gearbox", quantity:3, unit:"Set", unitCost:12000, reorderLevel:2, vendor:"Valeo India" },
  { id:"SP-005", name:"Air Filter", category:"Engine", quantity:2, unit:"Pcs", unitCost:850, reorderLevel:3, vendor:"Mann Filter" },
];

const AI_PREDICTIONS = [
  { vehicle:"TN45 CD5678", riskScore:"HIGH", riskValue:84, predictions:[{ component:"Clutch", type:"failure", inDays:6, kmLeft:null, confidence:0.83 },{ component:"Brake System", type:"maintenance", inDays:12, kmLeft:null, confidence:0.77 }], expectedCost30d:28000 },
  { vehicle:"TN59 AB1234", riskScore:"HIGH", riskValue:72, predictions:[{ component:"Alternator", type:"failure", inDays:3, kmLeft:null, confidence:0.91 },{ component:"Tyre (RL1)", type:"replacement", inDays:null, kmLeft:5200, confidence:0.78 }], expectedCost30d:18000 },
  { vehicle:"TN69 GH4789", riskScore:"MEDIUM", riskValue:48, predictions:[{ component:"Engine Oil", type:"maintenance", inDays:18, kmLeft:null, confidence:0.95 }], expectedCost30d:8000 },
  { vehicle:"TN38 EF9012", riskScore:"LOW", riskValue:22, predictions:[{ component:"All Systems", type:"ok", inDays:null, kmLeft:null, confidence:0.92 }], expectedCost30d:4000 },
];

// ─── Trip Status Config ───────────────────────────────────────────────────────
const STATUS_COLORS = {
  "Pre-Trip Pending":T.orange, "Pre-Trip Done":T.blue,
  "Started":T.green, "In Transit":T.blue, "Arrived":T.accent,
  "Post-Trip Pending":T.orange, "Post-Trip Done":T.purple,
  "Invoiced":T.orange, "Closed":T.green, "In Maintenance":T.purple,
  "Settled":T.green, "Pending Settlement":T.orange, "Booked":T.cyan,
};
const TRIP_LIFECYCLE = ["Pre-Trip Pending","Pre-Trip Done","Started","In Transit","Arrived","Post-Trip Pending","Post-Trip Done","Invoiced","Closed"];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");
const pct = (a, b) => b > 0 ? ((a / b) * 100).toFixed(1) + "%" : "0%";
const tripExpTotal = (exp) => Object.values(exp).reduce((s, v) => s + v, 0);
const riskBadge = (r) => {
  if (r === "HIGH") return <span className="risk-high">HIGH RISK</span>;
  if (r === "MEDIUM") return <span className="risk-med">MEDIUM</span>;
  return <span className="risk-low">LOW RISK</span>;
};

// ═══════════════════════════════════════════════════════════════════════════════
// VEHICLE TYPE SELECTOR (from v2)
// ═══════════════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════════════
// JOURNEY TYPE SELECTOR (from v2)
// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
// TRIP GENERATOR MODAL — 6-step wizard (from v2, styled for v4)
// ═══════════════════════════════════════════════════════════════════════════════
// ─── Trip asset type definitions ─────────────────────────────────────────────


// ═══════════════════════════════════════════════════════════════════════════════
// FLEET CONTRACT ENGINE
// Unified contract model for Truck / Equipment / Bus
// Contract → Trip Sheet pre-fill → Billing → Settlement
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Contract type definitions per asset ─────────────────────────────────────
const CONTRACT_TYPE_DEFS = {
  truck: [
    { id:"DEDICATED_FLEET",    label:"Dedicated Fleet",      icon:"🚛", color:"#3B82F6", desc:"Specific vehicles + drivers exclusively assigned to one client. Monthly retainer + per-trip rate.", billingFields:["monthlyRetainer","ratePerKm","includedKm","extraKmRate"] },
    { id:"RATE_CONTRACT",      label:"Rate Contract",        icon:"📋", color:"#F59E0B", desc:"Agreed per-trip rates for specified routes. Pay per trip completed. Most common in India.", billingFields:["ratePerTrip","ratePerKm","loadType","routes"] },
    { id:"MONTHLY_RETAINER",   label:"Monthly Retainer",     icon:"📅", color:"#10B981", desc:"Fixed monthly payment regardless of trips. Client guarantees minimum business volume.", billingFields:["monthlyRate","includedTrips","extraTripRate"] },
    { id:"SPOT_RATE",          label:"Spot / Ad-hoc Rate",   icon:"⚡", color:"#8B5CF6", desc:"One-off rate agreed per trip. No long-term commitment. Higher rate for flexibility.", billingFields:["ratePerTrip"] },
  ],
  equipment: [
    { id:"HOURLY",   label:"Hourly Rate",      icon:"⏱️", color:"#3B82F6", desc:"Charge per running hour. Minimum hours per day applies. Best for short jobs.", billingFields:["hourlyRate","minHoursPerDay","idleChargeable"] },
    { id:"DAILY",    label:"Daily / Shift",    icon:"📅", color:"#F59E0B", desc:"Fixed daily rate + overtime beyond shift hours. Site-based work.", billingFields:["dailyRate","shiftHours","overtimeRate"] },
    { id:"MONTHLY",  label:"Monthly Contract", icon:"📆", color:"#10B981", desc:"Fixed monthly rent includes X running hours. Extra hours charged separately.", billingFields:["monthlyRate","includedHours","overtimeRate"] },
    { id:"HYBRID",   label:"Hybrid (Best)",    icon:"🔁", color:"#F97316", desc:"Min guarantee hours at hourly rate + overtime premium. Protects both parties.", billingFields:["hourlyRate","minGuarantee","includedHours","overtimeRate"] },
  ],
  bus: [
    { id:"MONTHLY_CONTRACT",  label:"Monthly Contract",  icon:"📅", color:"#10B981", desc:"Fixed monthly payment for staff/school transport. Fixed routes, fixed schedule.", billingFields:["monthlyRate","includedTrips","routeKm"] },
    { id:"PER_TRIP",          label:"Per Trip Rate",     icon:"🎫", color:"#3B82F6", desc:"Charge per completed trip. Suitable for one-time and regular contract carriage.", billingFields:["ratePerTrip","perSeatRate","minPax"] },
    { id:"ANNUAL_CONTRACT",   label:"Annual Contract",   icon:"📆", color:"#8B5CF6", desc:"Annual agreement with fixed payment. Schools, corporates. Best rate for client.", billingFields:["annualRate","monthlyBreakdown","includedTrips"] },
    { id:"SPOT_BOOKING",      label:"Spot Booking",      icon:"⚡", color:"#F59E0B", desc:"One-off trip rate. Tourist, event, emergency transport. Premium pricing.", billingFields:["ratePerTrip","perKmRate"] },
  ],
};

// ─── Fleet contract seed data — all 3 asset types ────────────────────────────
const FLEET_CONTRACTS_DATA_INIT = [
  // ── TRUCK CONTRACTS ──
  {
    id:"FC-001", assetType:"truck", contractTypeId:"DEDICATED_FLEET",
    client:"Ramco Cement Ltd", clientPhone:"044-28510000",
    vehicles:["TN69 GH4789","TN59 AB1234"], drivers:["Mani Kumar","Selvam R"],
    routes:[{ from:"Chennai", to:"Coimbatore", km:500 },{ from:"Chennai", to:"Madurai", km:460 }],
    startDate:"2025-01-01", endDate:"2025-12-31",
    monthlyRetainer:120000, ratePerKm:null, ratePerTrip:null,
    includedKm:8000, extraKmRate:22,
    includedTrips:null, extraTripRate:null,
    monthlyRate:null, annualRate:null,
    advanceCollected:240000, totalBilled:480000, totalTrips:42,
    status:"ACTIVE", billingCycle:"MONTHLY", paymentTerms:"30 days net",
    notes:"2 dedicated trucks for cement distribution Tamil Nadu circuit",
  },
  {
    id:"FC-002", assetType:"truck", contractTypeId:"RATE_CONTRACT",
    client:"Blue Dart Express", clientPhone:"1800-111-345",
    vehicles:[], drivers:[],
    routes:[{ from:"Chennai", to:"Bangalore", km:350 },{ from:"Chennai", to:"Hyderabad", km:630 }],
    startDate:"2025-02-01", endDate:"2025-07-31",
    monthlyRetainer:null, ratePerKm:45, ratePerTrip:null,
    includedKm:null, extraKmRate:null,
    includedTrips:null, extraTripRate:null,
    monthlyRate:null, annualRate:null,
    advanceCollected:50000, totalBilled:218000, totalTrips:18,
    status:"ACTIVE", billingCycle:"WEEKLY", paymentTerms:"15 days",
    notes:"Express courier loads Chennai hub. Any available vehicle.",
  },
  {
    id:"FC-003", assetType:"truck", contractTypeId:"MONTHLY_RETAINER",
    client:"Ashok Leyland Spare Parts", clientPhone:"044-25361000",
    vehicles:["TN45 CD5678"], drivers:["Ramesh P"],
    routes:[{ from:"Chennai", to:"Pan Tamil Nadu", km:null }],
    startDate:"2025-03-01", endDate:"2025-08-31",
    monthlyRetainer:null, ratePerKm:null, ratePerTrip:null,
    includedKm:null, extraKmRate:null,
    includedTrips:12, extraTripRate:3500,
    monthlyRate:38000, annualRate:null,
    advanceCollected:76000, totalBilled:152000, totalTrips:28,
    status:"ACTIVE", billingCycle:"MONTHLY", paymentTerms:"30 days",
    notes:"Parts distribution across TN. 12 trips included, extra at ₹3,500/trip",
  },
  // ── EQUIPMENT CONTRACTS ──
  {
    id:"FC-004", assetType:"equipment", contractTypeId:"HYBRID",
    client:"NHAI Road Works", clientPhone:"011-23400100",
    vehicles:["EQ-001"], drivers:["Kannan S"],
    routes:[{ from:"Madurai", to:"Madurai Bypass NH7", km:14 }],
    startDate:"2025-03-01", endDate:"2025-05-31",
    monthlyRetainer:null, ratePerKm:null, ratePerTrip:null,
    hourlyRate:900, dailyRate:null, monthlyRate:null,
    minGuaranteeHours:180, includedHours:180, overtimeRate:1200,
    shiftHours:8, idleChargeable:false, fuelIncluded:false,
    advanceCollected:100000, totalBilled:287000, totalTrips:null,
    totalHoursRun:310, status:"ACTIVE", billingCycle:"MONTHLY",
    paymentTerms:"30 days net",
    notes:"JCB 3DX for highway trench excavation. Min 180 hrs/month guarantee.",
  },
  {
    id:"FC-005", assetType:"equipment", contractTypeId:"MONTHLY",
    client:"L&T Construction", clientPhone:"044-71770770",
    vehicles:["EQ-003"], drivers:["Murugan V"],
    routes:[{ from:"Chennai", to:"Chennai Port Road", km:8 }],
    startDate:"2025-02-15", endDate:"2025-06-15",
    monthlyRetainer:null, ratePerKm:null, ratePerTrip:null,
    hourlyRate:700, dailyRate:null, monthlyRate:140000,
    minGuaranteeHours:null, includedHours:200, overtimeRate:900,
    shiftHours:8, idleChargeable:false, fuelIncluded:false,
    advanceCollected:80000, totalBilled:196000, totalTrips:null,
    totalHoursRun:218, status:"ACTIVE", billingCycle:"MONTHLY",
    paymentTerms:"30 days",
    notes:"JCB Roller for road compaction. ₹1.4L/month includes 200 hrs.",
  },
  // ── BUS CONTRACTS ──
  {
    id:"FC-006", assetType:"bus", contractTypeId:"MONTHLY_CONTRACT",
    client:"Cognizant Technology Solutions", clientPhone:"044-42096000",
    vehicles:["TN22 IJ7890"], drivers:["Arjun D"],
    routes:[{ from:"Sholinganallur", to:"Siruseri IT Park", km:18 }],
    startDate:"2025-01-01", endDate:"2025-12-31",
    monthlyRetainer:null, ratePerKm:null, ratePerTrip:null,
    monthlyRate:52000, includedTrips:46, extraTripRate:1200,
    annualRate:null, routeKm:18, minPax:null, perSeatRate:null,
    advanceCollected:104000, totalBilled:208000, totalTrips:89,
    passengerCount:32, status:"ACTIVE", billingCycle:"MONTHLY",
    paymentTerms:"30 days",
    notes:"Corporate shuttle. AM/PM shift. 46 trips/month included (Mon-Sat).",
  },
];

// ─── Contract revenue projector ───────────────────────────────────────────────
function monthlyRevProj(contract) {
  if (contract.assetType==="truck") {
    if (contract.contractTypeId==="DEDICATED_FLEET") return contract.monthlyRetainer||0;
    if (contract.contractTypeId==="MONTHLY_RETAINER") return contract.monthlyRate||0;
    if (contract.contractTypeId==="RATE_CONTRACT") return (contract.ratePerKm||0)*(contract.includedKm||5000);
    return 0;
  }
  if (contract.assetType==="equipment") {
    if (contract.contractTypeId==="MONTHLY") return contract.monthlyRate||0;
    if (contract.contractTypeId==="HYBRID"||contract.contractTypeId==="HOURLY") return (contract.hourlyRate||0)*(contract.minGuaranteeHours||contract.includedHours||180);
    if (contract.contractTypeId==="DAILY") return (contract.dailyRate||0)*26;
    return 0;
  }
  if (contract.assetType==="bus") {
    if (contract.contractTypeId==="MONTHLY_CONTRACT") return contract.monthlyRate||0;
    if (contract.contractTypeId==="PER_TRIP") return (contract.ratePerTrip||0)*(contract.includedTrips||20);
    if (contract.contractTypeId==="ANNUAL_CONTRACT") return Math.round((contract.annualRate||0)/12);
    return 0;
  }
  return 0;
}

// ═══════════════════════════════════════════════════════════════════════════════
// FLEET CONTRACT WIZARD — 6-step, asset-type adaptive
// ═══════════════════════════════════════════════════════════════════════════════
const FleetContractWizard = ({ initialAssetType="truck", onClose, onSave }) => {
  const [assetType,setAssetType]=useState(initialAssetType);
  const [ctId,setCtId]=useState("");
  const [step,setStep]=useState(0);
  const [form,setForm]=useState({client:"",clientPhone:"",startDate:"",endDate:"",billingCycle:"MONTHLY",paymentTerms:"30 days net",monthlyRetainer:"",ratePerKm:"",hourlyRate:"",minGuarantee:"",overtimeRate:"",monthlyRate:"",busMonthlyRate:"",busIncludedTrips:"",includedHours:""});
  const rf=(k,v)=>setForm(f=>({...f,[k]:v}));
  const contractTypes=CONTRACT_TYPE_DEFS[assetType]||[];
  const ctDef=contractTypes.find(c=>c.id===ctId);
  const ac={truck:T.blue,equipment:T.orange,bus:T.green}[assetType]||T.blue;
  const projRev=monthlyRevProj({...form,assetType,contractTypeId:ctId,monthlyRetainer:parseInt(form.monthlyRetainer)||0,monthlyRate:parseInt(form.monthlyRate||form.busMonthlyRate)||0,hourlyRate:parseInt(form.hourlyRate)||0,ratePerKm:parseInt(form.ratePerKm)||0,includedKm:5000,minGuaranteeHours:parseInt(form.minGuarantee)||0,includedHours:parseInt(form.includedHours)||0,includedTrips:parseInt(form.busIncludedTrips)||20});
  return (
    <div className="ov" style={{ alignItems:"flex-start",paddingTop:20 }}>
      <div className="modal" style={{ maxWidth:600,width:"100%",margin:"0 auto" }}>
        <div className="mhdr" style={{ background:`linear-gradient(135deg,#080B10,${ac}22)`,borderBottom:`1px solid ${ac}33` }}>
          <div className="rj" style={{ fontSize:18,fontWeight:700,color:ac }}>{ctDef?.icon||"📋"} {step===0?"New Fleet Contract":ctDef?.label+" Contract"}</div>
          <button className="btn" style={{ background:"rgba(255,255,255,.08)",padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub}/></button>
        </div>
        <div className="mbdy">
          {step===0&&<div>
            <label className="flabel">Asset Type</label>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginTop:6,marginBottom:14 }}>
              {[["truck","🚛","Truck"],["equipment","🏗️","Equipment"],["bus","🚌","Bus"]].map(([id,ic,lb])=>(
                <div key={id} onClick={()=>{setAssetType(id);setCtId("");}} style={{ padding:"12px",borderRadius:10,cursor:"pointer",border:`2px solid ${assetType===id?{truck:T.blue,equipment:T.orange,bus:T.green}[id]:T.border}`,background:assetType===id?{truck:T.blue,equipment:T.orange,bus:T.green}[id]+"14":T.bgPanel,textAlign:"center" }}>
                  <div style={{ fontSize:24 }}>{ic}</div><div style={{ fontSize:12,fontWeight:700,color:assetType===id?{truck:T.blue,equipment:T.orange,bus:T.green}[id]:T.text,marginTop:4 }}>{lb}</div>
                </div>
              ))}
            </div>
            <label className="flabel">Contract Model *</label>
            <div style={{ display:"flex",flexDirection:"column",gap:7,marginTop:6,marginBottom:14 }}>
              {contractTypes.map(ct=>(
                <div key={ct.id} onClick={()=>setCtId(ct.id)} style={{ padding:"10px 12px",borderRadius:9,cursor:"pointer",border:`2px solid ${ctId===ct.id?ct.color:T.border}`,background:ctId===ct.id?ct.color+"14":T.bgPanel,display:"flex",gap:10,alignItems:"center" }}>
                  <span style={{ fontSize:18 }}>{ct.icon}</span>
                  <div style={{ flex:1 }}><div style={{ fontSize:12,fontWeight:700,color:ctId===ct.id?ct.color:T.text }}>{ct.label}</div><div style={{ fontSize:11,color:T.textSub }}>{ct.desc}</div></div>
                  {ctId===ct.id&&<span>✅</span>}
                </div>
              ))}
            </div>
            <div style={{ display:"flex",justifyContent:"flex-end",gap:8 }}>
              <button className="btn btn-gh" onClick={onClose}>Cancel</button>
              <button className="btn btn-p" disabled={!ctId} onClick={()=>setStep(1)} style={{ opacity:ctId?1:0.5 }}>Continue → {ctDef?.label}</button>
            </div>
          </div>}
          {step===1&&<div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12 }}>
              <div><label className="flabel">Client *</label><input value={form.client} onChange={e=>rf("client",e.target.value)} placeholder="Company name"/></div>
              <div><label className="flabel">Phone</label><input value={form.clientPhone} onChange={e=>rf("clientPhone",e.target.value)}/></div>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12 }}>
              <div><label className="flabel">Start Date</label><input type="date" value={form.startDate} onChange={e=>rf("startDate",e.target.value)}/></div>
              <div><label className="flabel">End Date</label><input type="date" value={form.endDate} onChange={e=>rf("endDate",e.target.value)}/></div>
            </div>
            {assetType==="truck"&&ctId==="DEDICATED_FLEET"&&<div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12 }}><div><label className="flabel">Monthly Retainer (₹)</label><input value={form.monthlyRetainer} onChange={e=>rf("monthlyRetainer",e.target.value)} placeholder="120000"/></div><div><label className="flabel">Rate/km (₹)</label><input value={form.ratePerKm} onChange={e=>rf("ratePerKm",e.target.value)}/></div></div>}
            {assetType==="truck"&&ctId==="RATE_CONTRACT"&&<div style={{ marginBottom:12 }}><label className="flabel">Rate per KM (₹)</label><input value={form.ratePerKm} onChange={e=>rf("ratePerKm",e.target.value)} placeholder="45"/></div>}
            {assetType==="truck"&&ctId==="MONTHLY_RETAINER"&&<div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12 }}><div><label className="flabel">Monthly Rate (₹)</label><input value={form.monthlyRate} onChange={e=>rf("monthlyRate",e.target.value)} placeholder="38000"/></div><div><label className="flabel">Included Trips</label><input onChange={e=>rf("includedTrips",e.target.value)} placeholder="12"/></div></div>}
            {assetType==="equipment"&&(ctId==="HOURLY"||ctId==="HYBRID")&&<div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:12 }}><div><label className="flabel">Rate/hr (₹)</label><input value={form.hourlyRate} onChange={e=>rf("hourlyRate",e.target.value)} placeholder="900"/></div><div><label className="flabel">Min Guarantee Hrs</label><input value={form.minGuarantee} onChange={e=>rf("minGuarantee",e.target.value)} placeholder="180"/></div><div><label className="flabel">OT Rate (₹/hr)</label><input value={form.overtimeRate} onChange={e=>rf("overtimeRate",e.target.value)} placeholder="1200"/></div></div>}
            {assetType==="bus"&&<div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12 }}><div><label className="flabel">Monthly Rate (₹)</label><input value={form.busMonthlyRate} onChange={e=>rf("busMonthlyRate",e.target.value)} placeholder="52000"/></div><div><label className="flabel">Included Trips/Month</label><input value={form.busIncludedTrips} onChange={e=>rf("busIncludedTrips",e.target.value)} placeholder="46"/></div></div>}
            {projRev>0&&<div style={{ background:T.greenGlow,border:`1px solid ${T.green}33`,borderRadius:8,padding:10,marginBottom:12,fontSize:11,color:T.textSub }}>Monthly Revenue: <strong style={{ color:T.green }}>{fmt(projRev)}</strong> · Annual: <strong style={{ color:T.accent }}>{fmt(projRev*12)}</strong></div>}
            <div style={{ display:"flex",justifyContent:"space-between",marginTop:16 }}>
              <button className="btn btn-gh" onClick={()=>setStep(0)}>← Back</button>
              <button className="btn btn-p" onClick={()=>{onSave&&onSave({id:`FC-${String(Math.floor(Math.random()*900)+100).padStart(3,"0")}`,assetType,contractTypeId:ctId,...form,hourlyRate:parseInt(form.hourlyRate)||null,monthlyRetainer:parseInt(form.monthlyRetainer)||null,monthlyRate:parseInt(form.monthlyRate||form.busMonthlyRate)||null,overtimeRate:parseInt(form.overtimeRate)||null,minGuaranteeHours:parseInt(form.minGuarantee)||null,advanceCollected:0,totalBilled:0,totalTrips:0,status:"ACTIVE"});onClose();}}>✅ Activate Contract</button>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
};
// ═══════════════════════════════════════════════════════════════════════════════
// FLEET CONTRACTS PAGE — master register for all contract types
// ═══════════════════════════════════════════════════════════════════════════════
const FleetContractsPage = () => {
  const [contracts, setContracts] = useState(FLEET_CONTRACTS_DATA_INIT);
  const [showWizard, setShowWizard] = useState(false);
  const [wizardAsset, setWizardAsset] = useState("truck");
  const [selContract, setSelContract] = useState(null);
  const [filterAsset, setFilterAsset] = useState("all");
  const [filterStatus, setFilterStatus] = useState("ACTIVE");

  const typeColor = { DEDICATED_FLEET:T.blue, RATE_CONTRACT:T.accent, MONTHLY_RETAINER:T.green, SPOT_RATE:T.purple, HOURLY:T.blue, DAILY:T.accent, MONTHLY:T.green, HYBRID:T.orange, MONTHLY_CONTRACT:T.green, PER_TRIP:T.blue, ANNUAL_CONTRACT:T.purple, SPOT_BOOKING:T.accent };
  const assetColor = { truck:T.blue, equipment:T.orange, bus:T.green };
  const assetIcon  = { truck:"🚛", equipment:"🏗️", bus:"🚌" };

  const filtered = contracts.filter(c=>(filterAsset==="all"||c.assetType===filterAsset)&&(filterStatus==="all"||c.status===filterStatus));
  const totalMthRevenue = contracts.filter(c=>c.status==="ACTIVE").reduce((s,c)=>s+monthlyRevProj(c),0);

  return (
    <div>
      {showWizard && <FleetContractWizard initialAssetType={wizardAsset} onClose={()=>setShowWizard(false)} onSave={c=>setContracts(cs=>[...cs,c])} />}

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Fleet Contracts</h1>
          <p style={{ color:T.textSub, fontSize:12 }}>Unified contract engine · Truck / Equipment / Bus · Pre-fills trip sheets automatically</p>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {["truck","equipment","bus"].map(at=>(
            <button key={at} className="btn" style={{ fontSize:11, background:assetColor[at]+"22", color:assetColor[at], border:`1px solid ${assetColor[at]}44` }} onClick={()=>{ setWizardAsset(at); setShowWizard(true); }}>
              {assetIcon[at]} New {at==="truck"?"Truck":at==="equipment"?"Equipment":"Bus"} Contract
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(6,1fr)", marginBottom:18 }}>
        {[
          { l:"Total Contracts",  v:contracts.length,                                  c:T.blue   },
          { l:"Active",          v:contracts.filter(c=>c.status==="ACTIVE").length,    c:T.green  },
          { l:"Truck Contracts", v:contracts.filter(c=>c.assetType==="truck").length,  c:T.blue   },
          { l:"Equip Contracts", v:contracts.filter(c=>c.assetType==="equipment").length, c:T.orange },
          { l:"Bus Contracts",   v:contracts.filter(c=>c.assetType==="bus").length,    c:T.green  },
          { l:"MTD Revenue",     v:fmt(totalMthRevenue),                              c:T.accent },
        ].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}>
            <div className="stat-v" style={{ color:k.c }}>{k.v}</div>
            <div className="stat-l">{k.l}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
        <div className="tabs" style={{ marginBottom:0 }}>
          {["all","truck","equipment","bus"].map(t=>(
            <div key={t} className={`tab ${filterAsset===t?"on":""}`} onClick={()=>setFilterAsset(t)} style={{ fontSize:11, textTransform:"capitalize" }}>
              {t==="all"?"All Assets":assetIcon[t]+" "+t.charAt(0).toUpperCase()+t.slice(1)}
            </div>
          ))}
        </div>
        <div className="toggle-pill" style={{ marginLeft:"auto" }}>
          {["ACTIVE","COMPLETED","all"].map(s=>(
            <div key={s} className={`toggle-opt ${filterStatus===s?"on":""}`} onClick={()=>setFilterStatus(s)} style={{ fontSize:11 }}>{s==="all"?"All":s==="ACTIVE"?"Active":"Completed"}</div>
          ))}
        </div>
      </div>

      {/* Contract cards */}
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {filtered.map(c => {
          const ctDef = CONTRACT_TYPE_DEFS[c.assetType]?.find(x=>x.id===c.contractTypeId);
          const ac = assetColor[c.assetType];
          const mthRev = monthlyRevProj(c);
          return (
            <div key={c.id} className="card" style={{ border:`1px solid ${ac}22`, cursor:"pointer" }} onClick={()=>setSelContract(c)}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                  <div style={{ width:44, height:44, borderRadius:10, background:ac+"18", border:`2px solid ${ac}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{assetIcon[c.assetType]}</div>
                  <div>
                    <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:3 }}>
                      <span className="mono" style={{ fontSize:12, fontWeight:700, color:T.accent }}>{c.id}</span>
                      <span className="badge" style={{ background:(typeColor[c.contractTypeId]||T.textMuted)+"22", color:typeColor[c.contractTypeId]||T.textMuted, fontSize:10 }}>{ctDef?.label||c.contractTypeId}</span>
                      <span className={`badge ${c.status==="ACTIVE"?"bg":"ba"}`} style={{ fontSize:10 }}>{c.status}</span>
                    </div>
                    <div style={{ fontSize:14, fontWeight:700 }}>{c.client}</div>
                    <div style={{ fontSize:11, color:T.textSub }}>{c.startDate} → {c.endDate} · {c.billingCycle} billing · {c.paymentTerms}</div>
                  </div>
                </div>
                <div style={{ textAlign:"right", flexShrink:0 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:T.green }}>{fmt(mthRev)}<span style={{ fontSize:10, color:T.textMuted }}>/mo</span></div>
                  <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>Billed: {fmt(c.totalBilled)}</div>
                  <div style={{ fontSize:10, color:T.textMuted }}>Adv: {fmt(c.advanceCollected)}</div>
                </div>
              </div>

              {/* Contract terms pills */}
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:10 }}>
                {c.monthlyRetainer && <span style={{ fontSize:11, background:T.bgPanel, padding:"3px 8px", borderRadius:6 }}>Retainer: ₹{(c.monthlyRetainer/1000).toFixed(0)}k/mo</span>}
                {c.hourlyRate && <span style={{ fontSize:11, background:T.bgPanel, padding:"3px 8px", borderRadius:6 }}>₹{c.hourlyRate}/hr</span>}
                {c.dailyRate && <span style={{ fontSize:11, background:T.bgPanel, padding:"3px 8px", borderRadius:6 }}>₹{c.dailyRate}/day</span>}
                {c.monthlyRate && <span style={{ fontSize:11, background:T.bgPanel, padding:"3px 8px", borderRadius:6 }}>₹{(c.monthlyRate/1000).toFixed(0)}k/mo</span>}
                {c.ratePerKm && <span style={{ fontSize:11, background:T.bgPanel, padding:"3px 8px", borderRadius:6 }}>₹{c.ratePerKm}/km</span>}
                {c.includedKm && <span style={{ fontSize:11, background:T.bgPanel, padding:"3px 8px", borderRadius:6 }}>{c.includedKm.toLocaleString()} km incl.</span>}
                {c.minGuaranteeHours && <span style={{ fontSize:11, background:T.orange+"18", color:T.orange, padding:"3px 8px", borderRadius:6 }}>Min {c.minGuaranteeHours} hrs</span>}
                {c.includedHours && <span style={{ fontSize:11, background:T.green+"18", color:T.green, padding:"3px 8px", borderRadius:6 }}>{c.includedHours} hrs incl.</span>}
                {c.overtimeRate && <span style={{ fontSize:11, background:T.red+"18", color:T.red, padding:"3px 8px", borderRadius:6 }}>OT ₹{c.overtimeRate}/hr</span>}
                {c.includedTrips && <span style={{ fontSize:11, background:T.green+"18", color:T.green, padding:"3px 8px", borderRadius:6 }}>{c.includedTrips} trips incl.</span>}
                {c.idleChargeable && <span style={{ fontSize:11, background:T.textMuted+"18", color:T.textMuted, padding:"3px 8px", borderRadius:6 }}>Idle chargeable</span>}
              </div>

              {/* Assigned assets */}
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:10 }}>
                {(c.vehicles||[]).map(v=><span key={v} className="badge bb" style={{ fontSize:10 }}>🚛 {v}</span>)}
                {(c.drivers||[]).map(d=><span key={d} className="badge bg" style={{ fontSize:10 }}>👤 {d}</span>)}
              </div>

              {/* Revenue progress bar */}
              {c.totalBilled>0 && (
                <div>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:T.textMuted, marginBottom:3 }}>
                    <span>Revenue collected: {fmt(c.totalBilled)}</span>
                    <span>{c.totalTrips?`${c.totalTrips} trips`:c.totalHoursRun?`${c.totalHoursRun} hrs run`:""}</span>
                  </div>
                  <div className="pbar" style={{ height:4 }}><div className="pfill" style={{ width:`${Math.min((c.totalBilled/Math.max(mthRev*6,1))*100,100)}%` }} /></div>
                </div>
              )}

              {/* Quick actions */}
              <div style={{ display:"flex", gap:6, marginTop:10 }} onClick={e=>e.stopPropagation()}>
                <button className="btn btn-p" style={{ fontSize:10, padding:"4px 10px" }} onClick={()=>{ /* trigger trip generator from contract */ }}>
                  🚀 Create Trip from Contract
                </button>
                <button className="btn btn-b" style={{ fontSize:10, padding:"4px 10px" }}>📄 Invoice</button>
                <button className="btn btn-gh" style={{ fontSize:10, padding:"4px 10px" }}>Edit</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};



// ═══════════════════════════════════════════════════════════════════════════════
// TRIP REVENUE MODEL ENGINE
// 3 Models: TRANSPORT_ONLY | MATERIAL_SALE | MULTI_CONSIGNMENT
// Digital delivery confirmation: Truck + Equipment (hours sheet) + Bus (manifest)
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Revenue model definitions ───────────────────────────────────────────────
const REVENUE_MODELS = {
  TRANSPORT_ONLY: {
    label:"Transport Only",    icon:"🚛", color:"#3B82F6",
    desc:"You are the transporter. One client pays a fixed trip charge. Single invoice.",
    useCase:"Standard freight movement. Party hires your truck for a fixed rate.",
  },
  MATERIAL_SALE: {
    label:"Material + Transport", icon:"⛏️", color:"#F59E0B",
    desc:"You own and sell the material AND transport it. Revenue = material margin + transport charge.",
    useCase:"Sand, blue metal, gravel, aggregate dealers who own trucks. Two revenue streams per trip.",
  },
  MULTI_CONSIGNMENT: {
    label:"Multi-Consignment (LCL)", icon:"📦", color:"#10B981",
    desc:"One truck, multiple parties. Each consignment billed separately. Separate POD per party.",
    useCase:"Part-load (LTL/LCL) trips. Multiple small shippers share a truck. Common for retail distribution.",
  },
};

// ─── Seed consignment data (linked to trips) ─────────────────────────────────
const CONSIGNMENTS_INIT = [
  // TRP-2025-0041 — TRANSPORT_ONLY
  { id:"CSG-001", tripId:"TRP-2025-0041", revenueModel:"TRANSPORT_ONLY", consignor:"Ramco Cements Ltd", consignee:"Coimbatore Cement Depot", material:"Portland Cement (53 Grade)", qty:18, unit:"MT", rateType:"PER_TON", rate:2333, billingParty:"Ramco Cements Ltd", revenueAmount:42000, costPrice:null, sellingPrice:null, transportCharge:42000, status:"DELIVERED", podId:"POD-001", invoiceId:"INV-2025-001", paidAmount:20000, balanceDue:22000 },
  // TRP-2025-0042 — MATERIAL_SALE
  { id:"CSG-002", tripId:"TRP-2025-0042", revenueModel:"MATERIAL_SALE", consignor:"Own Stock", consignee:"Godrej Industries — Madurai", material:"M-Sand (Manufactured Sand)", qty:22, unit:"MT", rateType:"PER_TON", rate:1727, billingParty:"Godrej Industries", revenueAmount:38000, costPrice:950, sellingPrice:1727, transportCharge:8000, status:"IN_TRANSIT", podId:null, invoiceId:null, paidAmount:18000, balanceDue:20000 },
  // TRP-2025-0044 — MULTI_CONSIGNMENT (3 parties)
  { id:"CSG-003", tripId:"TRP-2025-0044", revenueModel:"MULTI_CONSIGNMENT", consignor:"Pepsico Warehouse, Salem", consignee:"Metro Cash & Carry, Hyderabad", material:"FMCG Beverages", qty:8, unit:"MT", rateType:"PER_TON", rate:1500, billingParty:"Pepsico India", revenueAmount:12000, costPrice:null, sellingPrice:null, transportCharge:12000, status:"BILLED", podId:"POD-003", invoiceId:"INV-2025-003", paidAmount:12000, balanceDue:0 },
  { id:"CSG-004", tripId:"TRP-2025-0044", revenueModel:"MULTI_CONSIGNMENT", consignor:"D-Mart Salem", consignee:"D-Mart Hyderabad Hub", material:"FMCG Dry Goods", qty:3, unit:"MT", rateType:"PER_TON", rate:1667, billingParty:"Avenue Supermarts Ltd", revenueAmount:5000, costPrice:null, sellingPrice:null, transportCharge:5000, status:"BILLED", podId:"POD-004", invoiceId:"INV-2025-004", paidAmount:0, balanceDue:5000 },
  { id:"CSG-005", tripId:"TRP-2025-0044", revenueModel:"MULTI_CONSIGNMENT", consignor:"ITC Ltd Salem Depot", consignee:"ITC Distributor Hyderabad", material:"ITC Packaged Foods", qty:3, unit:"MT", rateType:"PER_TON", rate:2667, billingParty:"ITC Limited", revenueAmount:8000, costPrice:null, sellingPrice:null, transportCharge:8000, status:"PENDING", podId:null, invoiceId:null, paidAmount:0, balanceDue:8000 },
];

// ─── Equipment hours sheet / work confirmation ────────────────────────────────
const EQ_WORK_CONFIRMATIONS_INIT = [
  { id:"EWC-001", eqId:"EQ-001", contractId:"FC-004", date:"2025-04-15", siteManager:"Ravi Shankar", siteManagerPhone:"9876543210", startHours:4277, endHours:4286.5, workingHours:9.5, idleHours:1.0, workDone:"Trench excavation — 200m pipeline route, hard laterite soil. Depth: 2.8m avg.", minHours:8, billedHours:9.5, ratePerHour:900, billAmount:8550, otp:"7421", otpVerified:true, signatureCaptured:true, locked:true, gpsLat:9.9252, gpsLng:78.1198 },
  { id:"EWC-002", eqId:"EQ-003", contractId:"FC-005", date:"2025-04-15", siteManager:"Narayanan K", siteManagerPhone:"9944332211", startHours:6110, endHours:6120, workingHours:10, idleHours:1.0, workDone:"Road compaction — WBM layer km 4.0 to 4.8", minHours:8, billedHours:10, ratePerHour:700, billAmount:7000, otp:"", otpVerified:false, signatureCaptured:false, locked:false, gpsLat:13.0827, gpsLng:80.2707 },
];

// ─── Bus trip manifest / passenger confirmation ───────────────────────────────
const BUS_CONFIRMATIONS_INIT = [
  { id:"BMF-001", contractId:"FC-006", date:"2025-04-15", tripType:"Morning Shift", busNo:"TN22 IJ7890", driver:"Arjun D", route:"Sholinganallur → Siruseri IT Park", scheduledPax:35, actualPax:32, noShows:3, reportingManager:"Priya S", rmPhone:"9811223344", departTime:"08:45", arrivalTime:"09:22", otpVerified:true, signatureCaptured:true, locked:true, notes:"3 employees on leave. On-time arrival." },
  { id:"BMF-002", contractId:"FC-006", date:"2025-04-15", tripType:"Evening Shift", busNo:"TN22 IJ7890", driver:"Arjun D", route:"Siruseri IT Park → Sholinganallur", scheduledPax:32, actualPax:30, noShows:2, reportingManager:"Priya S", rmPhone:"9811223344", departTime:"18:15", arrivalTime:"18:58", otpVerified:false, signatureCaptured:false, locked:false, notes:"" },
];

// ─── Revenue model engine functions ──────────────────────────────────────────
function calcTripRevenue(trip, consignments) {
  const csgList = consignments.filter(c=>c.tripId===trip.id);
  if (!csgList.length) return { total:trip.freight||0, profit:0, consignments:[] };
  const totalRevenue   = csgList.reduce((s,c)=>s+c.revenueAmount,0);
  const totalTransport = csgList.reduce((s,c)=>s+(c.transportCharge||0),0);
  const totalCost      = csgList.reduce((s,c)=>s+((c.costPrice||0)*(c.qty||1)),0);
  const totalExpenses  = Object.values(trip.expenses||{}).reduce((s,v)=>s+v,0);
  const profit         = totalRevenue - totalCost - totalExpenses;
  return { total:totalRevenue, transport:totalTransport, materialMargin:totalRevenue-totalTransport-totalCost, expenses:totalExpenses, profit, consignments:csgList };
}

// ─── Consignment Entry Form (used inside TripGeneratorModal step 2/3) ─────────
const ConsignmentForm = ({ tripId, revenueModel, onAdd, onClose }) => {
  const [f,sf]=useState({ party:"", material:"", weight:"", freight:"", from:"", to:"", ewayBill:"", remarks:"" });
  const lf=(k,v)=>sf(x=>({...x,[k]:v}));
  return (
    <div className="ov"><div className="modal" style={{ maxWidth:480 }}>
      <div className="mhdr">
        <div className="rj" style={{ fontSize:16,fontWeight:700 }}>📦 Add Consignment — {tripId}</div>
        <button className="btn" style={{ padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub}/></button>
      </div>
      <div className="mbdy" style={{ display:"grid",gap:10 }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
          <div><label className="flabel">Consignee / Party</label><input value={f.party} onChange={e=>lf("party",e.target.value)} placeholder="Company name"/></div>
          <div><label className="flabel">Material</label><input value={f.material} onChange={e=>lf("material",e.target.value)} placeholder="Steel, Cement…"/></div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
          <div><label className="flabel">Weight (T)</label><input type="number" value={f.weight} onChange={e=>lf("weight",e.target.value)}/></div>
          <div><label className="flabel">Freight (₹)</label><input type="number" value={f.freight} onChange={e=>lf("freight",e.target.value)}/></div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
          <div><label className="flabel">From</label><input value={f.from} onChange={e=>lf("from",e.target.value)} placeholder="City"/></div>
          <div><label className="flabel">To</label><input value={f.to} onChange={e=>lf("to",e.target.value)} placeholder="City"/></div>
        </div>
        <div><label className="flabel">E-way Bill No. (optional)</label><input value={f.ewayBill} onChange={e=>lf("ewayBill",e.target.value)} placeholder="EWB-XXXXXXXXXXXX"/></div>
        <div><label className="flabel">Remarks</label><input value={f.remarks} onChange={e=>lf("remarks",e.target.value)}/></div>
      </div>
      <div className="mftr">
        <button className="btn btn-gh" onClick={onClose}>Cancel</button>
        <button className="btn btn-p" disabled={!f.party||!f.material} onClick={()=>{onAdd&&onAdd({id:"CON-"+String(Date.now()).slice(-4),tripId,...f,freight:parseInt(f.freight)||0,weight:parseFloat(f.weight)||0});onClose();}}>📦 Add Consignment</button>
      </div>
    </div></div>
  );
};

// ─── Delivery Confirmation Modal — TRUCK (digital POD + consignment sign-off) ─
const TruckDeliveryConfirmModal = ({ trip, consignments, onClose, onConfirm }) => {
  const [f,sf]=useState(Object.fromEntries((consignments||[]).map(c=>[c.id,{deliveredQty:c.qty,shortage:0,damaged:false,receiverName:"",receiverPhone:"",otp:"",otpSent:false,otpVerified:false,signatureCaptured:false}])));
  const df=(id,k,v)=>sf(x=>({...x,[id]:{...x[id],[k]:v}}));
  const csg=(consignments||[])[0]||{};
  const form=f[csg.id]||{};
  const allSigned=(consignments||[]).every(c=>f[c.id]?.signatureCaptured&&f[c.id]?.otpVerified);
  return (<div className="ov"><div className="modal" style={{ maxWidth:520 }}>
    <div className="mhdr" style={{ background:"linear-gradient(135deg,#064E3B,#065F46)",borderBottom:`1px solid ${T.green}33` }}>
      <div className="rj" style={{ fontSize:16,fontWeight:700,color:T.green }}>✅ Delivery Confirmation — {trip?.id}</div>
      <button className="btn" style={{ padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub}/></button>
    </div>
    <div className="mbdy">
      {(consignments||[]).length>1&&<div style={{ display:"flex",gap:8,marginBottom:14,flexWrap:"wrap" }}>
        {(consignments||[]).map(c=><div key={c.id} style={{ padding:"5px 10px",borderRadius:7,background:T.bgPanel,border:`1px solid ${f[c.id]?.signatureCaptured?T.green:T.border}`,fontSize:11 }}>
          {c.consignee?.split("—")[0]||c.id} {f[c.id]?.signatureCaptured?"✅":""}
        </div>)}
      </div>}
      <div style={{ background:T.bgPanel,borderRadius:8,padding:10,marginBottom:12,fontSize:11 }}>
        <div style={{ display:"flex",gap:16 }}><span>Material: <strong>{csg.material}</strong></span><span>Qty: <strong>{csg.qty} {csg.unit}</strong></span></div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10 }}>
        <div><label className="flabel">Receiver Name *</label><input value={form.receiverName||""} onChange={e=>df(csg.id,"receiverName",e.target.value)}/></div>
        <div><label className="flabel">Phone (OTP)</label><input value={form.receiverPhone||""} onChange={e=>df(csg.id,"receiverPhone",e.target.value)}/></div>
      </div>
      <div style={{ background:T.bgPanel,borderRadius:8,padding:10,marginBottom:10 }}>
        {!form.otpVerified?(!form.otpSent
          ?<button className="btn btn-b" style={{ fontSize:11 }} onClick={()=>df(csg.id,"otpSent",true)}>📱 Send OTP to {form.receiverPhone||"receiver"}</button>
          :<div style={{ display:"flex",gap:8 }}><input value={form.otp||""} onChange={e=>df(csg.id,"otp",e.target.value)} placeholder="OTP" maxLength={6} style={{ textAlign:"center",letterSpacing:4,fontSize:16 }}/><button className="btn btn-g" onClick={()=>(form.otp||"").length>=4&&df(csg.id,"otpVerified",true)}>Verify</button></div>
        ):<div style={{ color:T.green,fontWeight:700 }}>✅ OTP Verified</div>}
      </div>
      {!form.signatureCaptured
        ?<div onClick={()=>form.otpVerified&&df(csg.id,"signatureCaptured",true)} style={{ background:T.bgCard,border:`2px dashed ${form.otpVerified?T.green:T.border}`,borderRadius:8,height:70,display:"flex",alignItems:"center",justifyContent:"center",cursor:form.otpVerified?"crosshair":"not-allowed",fontSize:12,color:form.otpVerified?T.textMuted:T.red,marginBottom:10 }}>{form.otpVerified?"✍️ Tap to sign":"🔒 Verify OTP first"}</div>
        :<div style={{ background:T.greenGlow,borderRadius:8,padding:8,marginBottom:10,fontSize:11,color:T.green }}>✅ Signed by {form.receiverName}</div>
      }
      <div style={{ display:"flex",justifyContent:"flex-end",gap:8 }}>
        <button className="btn btn-gh" onClick={onClose}>Cancel</button>
        <button className="btn" style={{ background:allSigned?T.green:"rgba(255,255,255,.05)",color:allSigned?"#fff":T.textMuted,fontWeight:700 }} onClick={()=>{if(allSigned){onConfirm&&onConfirm(f);onClose();}}}>🔒 Lock & Confirm</button>
      </div>
    </div>
  </div></div>);
};
// ─── Equipment Hours Sheet Confirmation Modal ─────────────────────────────────
const EquipmentHoursConfirmModal = ({ eq, contractId, onClose, onSave }) => {
  const [f,sf]=useState({date:new Date().toISOString().split("T")[0],startHours:"",endHours:"",idleHours:"0",workDone:"",siteManager:"",smPhone:"",otp:"",otpSent:false,otpVerified:false,signatureCaptured:false});
  const hf=(k,v)=>sf(x=>({...x,[k]:v}));
  const worked=f.startHours&&f.endHours?Math.max(0,parseFloat(f.endHours)-parseFloat(f.startHours)-parseFloat(f.idleHours||0)):0;
  const contract=EQ_CONTRACTS_INIT.find(c=>c.id===contractId);
  const billed=Math.max(worked,contract?.shiftHoursPerDay||8);
  const billAmt=billed*(contract?.hourlyRate||900);
  return (<div className="ov"><div className="modal" style={{ maxWidth:520 }}>
    <div className="mhdr" style={{ background:"linear-gradient(135deg,#1C1000,#3D2200)",borderBottom:`1px solid ${T.orange}33` }}>
      <div className="rj" style={{ fontSize:16,fontWeight:700,color:T.orange }}>⏱️ Hours Sheet — {eq?.regNo}</div>
      <button className="btn" style={{ padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub}/></button>
    </div>
    <div className="mbdy">
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:10 }}>
        <div><label className="flabel">Date</label><input type="date" value={f.date} onChange={e=>hf("date",e.target.value)}/></div>
        <div><label className="flabel">Start Hrs</label><input type="number" value={f.startHours} onChange={e=>hf("startHours",e.target.value)} placeholder={eq?.engineHours||4277}/></div>
        <div><label className="flabel">End Hrs</label><input type="number" value={f.endHours} onChange={e=>hf("endHours",e.target.value)}/></div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10 }}>
        <div><label className="flabel">Idle Hrs</label><input type="number" value={f.idleHours} onChange={e=>hf("idleHours",e.target.value)}/></div>
        <div><label className="flabel">Fuel (L)</label><input type="number"/></div>
      </div>
      <div style={{ marginBottom:10 }}><label className="flabel">Work Done</label><textarea value={f.workDone} onChange={e=>hf("workDone",e.target.value)} placeholder="Describe work performed today..." style={{ height:55 }}/></div>
      {worked>0&&<div style={{ background:T.orangeGlow,border:`1px solid ${T.orange}33`,borderRadius:8,padding:10,marginBottom:10 }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,fontSize:11 }}>
          {[["Worked",`${worked.toFixed(1)}h`],["Billed",`${billed.toFixed(1)}h`],["Rate",`₹${contract?.hourlyRate||900}/hr`],["Amount",fmt(billAmt)]].map(([l,v])=>(
            <div key={l} style={{ background:T.bgPanel,borderRadius:7,padding:"5px 8px" }}><div style={{ fontSize:9,color:T.textMuted }}>{l}</div><div style={{ fontWeight:700 }}>{v}</div></div>
          ))}
        </div>
      </div>}
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10 }}>
        <div><label className="flabel">Site Manager Name *</label><input value={f.siteManager} onChange={e=>hf("siteManager",e.target.value)}/></div>
        <div><label className="flabel">Phone (OTP) *</label><input value={f.smPhone} onChange={e=>hf("smPhone",e.target.value)}/></div>
      </div>
      <div style={{ background:T.bgPanel,borderRadius:8,padding:10,marginBottom:10 }}>
        {!f.otpVerified?(!f.otpSent
          ?<button className="btn btn-b" style={{ fontSize:11 }} onClick={()=>hf("otpSent",true)}>📱 Send OTP to Site Manager</button>
          :<div style={{ display:"flex",gap:8 }}><input value={f.otp} onChange={e=>hf("otp",e.target.value)} placeholder="OTP" maxLength={6} style={{ textAlign:"center",letterSpacing:4,fontSize:16 }}/><button className="btn btn-g" onClick={()=>f.otp.length>=4&&hf("otpVerified",true)}>Verify</button></div>
        ):<div style={{ color:T.green,fontWeight:700 }}>✅ Site Manager OTP Verified</div>}
      </div>
      {!f.signatureCaptured
        ?<div onClick={()=>f.otpVerified&&hf("signatureCaptured",true)} style={{ background:T.bgCard,border:`2px dashed ${f.otpVerified?T.green:T.border}`,borderRadius:8,height:70,display:"flex",alignItems:"center",justifyContent:"center",cursor:f.otpVerified?"crosshair":"not-allowed",fontSize:12,color:f.otpVerified?T.textMuted:T.red,marginBottom:10 }}>{f.otpVerified?`✍️ ${f.siteManager||"Site manager"} — tap to sign`:"🔒 Verify OTP first"}</div>
        :<div style={{ background:T.greenGlow,borderRadius:8,padding:8,marginBottom:10,fontSize:11,color:T.green }}>✅ Signed by {f.siteManager} · Hours: {worked.toFixed(1)}h · Billed: {billed.toFixed(1)}h · {fmt(billAmt)}</div>
      }
      <div style={{ display:"flex",justifyContent:"flex-end",gap:8 }}>
        <button className="btn btn-gh" onClick={onClose}>Cancel</button>
        <button className="btn" style={{ background:f.signatureCaptured&&f.otpVerified?T.orange:"rgba(255,255,255,.05)",color:f.signatureCaptured&&f.otpVerified?"#080B10":T.textMuted,fontWeight:700 }} onClick={()=>{if(f.signatureCaptured&&f.otpVerified){onSave&&onSave({...f,workingHours:worked,billedHours:billed,billAmt,eqId:eq?.id,contractId});onClose();}}}>🔒 Lock Hours Sheet</button>
      </div>
    </div>
  </div></div>);
};
// ─── Bus Trip Completion Modal ────────────────────────────────────────────────
const BusTripConfirmModal = ({ bus, contractId, onClose, onSave }) => {
  const [f,sf]=useState({date:new Date().toISOString().split("T")[0],tripType:"Morning Shift",scheduledPax:"",actualPax:"",departTime:"",arrivalTime:"",reportingManager:"",rmPhone:"",otp:"",otpSent:false,otpVerified:false,signatureCaptured:false,onTime:true,notes:""});
  const bf=(k,v)=>sf(x=>({...x,[k]:v}));
  return (<div className="ov"><div className="modal" style={{ maxWidth:500 }}>
    <div className="mhdr" style={{ background:"linear-gradient(135deg,#064E3B,#065F46)",borderBottom:`1px solid ${T.green}33` }}>
      <div className="rj" style={{ fontSize:16,fontWeight:700,color:T.green }}>🚌 Bus Trip Confirmation — {bus?.busNo||"Bus"}</div>
      <button className="btn" style={{ padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub}/></button>
    </div>
    <div className="mbdy">
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:10 }}>
        <div><label className="flabel">Date</label><input type="date" value={f.date} onChange={e=>bf("date",e.target.value)}/></div>
        <div><label className="flabel">Trip Type</label><select value={f.tripType} onChange={e=>bf("tripType",e.target.value)}><option>Morning Shift</option><option>Evening Shift</option><option>Night Shift</option><option>Special Trip</option></select></div>
        <div><label className="flabel">Scheduled Pax</label><input type="number" value={f.scheduledPax} onChange={e=>bf("scheduledPax",e.target.value)} placeholder="35"/></div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10 }}>
        <div><label className="flabel">Actual Boarded</label><input type="number" value={f.actualPax} onChange={e=>bf("actualPax",e.target.value)}/></div>
        <div><label className="flabel">Depart Time</label><input type="time" value={f.departTime} onChange={e=>bf("departTime",e.target.value)}/></div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10 }}>
        <div><label className="flabel">HR Manager Name *</label><input value={f.reportingManager} onChange={e=>bf("reportingManager",e.target.value)}/></div>
        <div><label className="flabel">Phone (OTP) *</label><input value={f.rmPhone} onChange={e=>bf("rmPhone",e.target.value)}/></div>
      </div>
      <div style={{ background:T.bgPanel,borderRadius:8,padding:10,marginBottom:10 }}>
        {!f.otpVerified?(!f.otpSent
          ?<button className="btn btn-b" style={{ fontSize:11 }} onClick={()=>bf("otpSent",true)}>📱 Send OTP to HR</button>
          :<div style={{ display:"flex",gap:8 }}><input value={f.otp} onChange={e=>bf("otp",e.target.value)} placeholder="OTP" maxLength={6} style={{ textAlign:"center",letterSpacing:4,fontSize:16 }}/><button className="btn btn-g" onClick={()=>f.otp.length>=4&&bf("otpVerified",true)}>Verify</button></div>
        ):<div style={{ color:T.green,fontWeight:700 }}>✅ HR Verified</div>}
      </div>
      {!f.signatureCaptured
        ?<div onClick={()=>f.otpVerified&&bf("signatureCaptured",true)} style={{ background:T.bgCard,border:`2px dashed ${f.otpVerified?T.green:T.border}`,borderRadius:8,height:70,display:"flex",alignItems:"center",justifyContent:"center",cursor:f.otpVerified?"crosshair":"not-allowed",fontSize:12,color:f.otpVerified?T.textMuted:T.red,marginBottom:10 }}>{f.otpVerified?"✍️ HR sign to confirm trip":"🔒 Verify OTP first"}</div>
        :<div style={{ background:T.greenGlow,borderRadius:8,padding:8,marginBottom:10,fontSize:11,color:T.green }}>✅ {f.reportingManager} confirmed · {f.actualPax}/{f.scheduledPax} pax</div>
      }
      <div style={{ display:"flex",justifyContent:"flex-end",gap:8 }}>
        <button className="btn btn-gh" onClick={onClose}>Cancel</button>
        <button className="btn" style={{ background:f.signatureCaptured&&f.otpVerified?T.green:"rgba(255,255,255,.05)",color:f.signatureCaptured&&f.otpVerified?"#fff":T.textMuted,fontWeight:700 }} onClick={()=>{if(f.signatureCaptured&&f.otpVerified){onSave&&onSave(f);onClose();}}}>🔒 Lock Trip Sheet</button>
      </div>
    </div>
  </div></div>);
};
const TRIP_ASSET_TYPES = {
  truck: {
    label:"Truck / Lorry",   icon:"🚛", color:"#3B82F6",
    desc:"6–18 wheeler, trailer, container, LCV — freight transport",
    steps:["Journey Type","Vehicle","Load & Freight","Driver & Crew","Costs & P&L","Review"],
    loadTypes:["FTL","LTL","ODC","Bulk","Liquid","Hazmat","Perishable"],
    billingBasis:"Per trip / per km / contract rate",
  },
  equipment: {
    label:"Heavy Equipment",  icon:"🏗️", color:"#F97316",
    desc:"JCB, Excavator, Crane, Roller, Grader — site deployment",
    steps:["Deployment Info","Equipment Select","Operator & Crew","Hours & Billing","Site Costs","Review"],
    loadTypes:["Earthmoving","Excavation","Compaction","Lifting","Grading","Concrete","Demolition"],
    billingBasis:"Per hour / daily minimum hours",
  },
  bus: {
    label:"Bus / Passenger",  icon:"🚌", color:"#10B981",
    desc:"Staff bus, school bus, contract carriage — passenger transport",
    steps:["Route Info","Bus Select","Driver & Crew","Passenger Details","Costs & Revenue","Review"],
    loadTypes:["Staff Transport","School Runs","Contract Carriage","Tourist","Daily Commute","Special Event"],
    billingBasis:"Per trip / monthly contract / per seat",
  },
};

const TripGeneratorModal = ({ onClose, onCreated }) => {
  const [step, setStep] = useState(0);
  const [tripMode, setTripMode] = useState("new");           // "from_contract" | "new"
  const [assetType, setAssetType] = useState("truck");       // "truck" | "equipment" | "bus"
  const [selContractId, setSelContractId] = useState(null);

  const [f, sf] = useState({
    revenueModel:"TRANSPORT_ONLY", journeyType:"oneway",
    vehicleType:"own", vehicle:"", driverId:"", driver:"",
    vendor:"", vendorVehicle:"", vendorRatePerKm:"",
    // Truck route
    fromCity:"", toCity:"", distanceKm:"", startDate:new Date().toISOString().split("T")[0],
    loadType:"FTL", commodity:"", weight:"",
    customer:"", agent:"", lrNumber:"",
    freight:"", advance:"", paymentType:"To Pay",
    // Driver crew
    driverAdvance:"", driverAdvance2:"", driverPayMode:"Cash",
    driverRental:"", cleanerName:"", cleanerPhone:"", cleanerPay:"",
    tripDuration:"1",
    // Equipment fields
    site:"", workType:"Earth Moving", contractType:"Hourly",
    // Bus fields
    passengerCount:"", contractFare:"", perSeatFare:"",
    // Expenses
    expenses:{ diesel:"", dieselLitres:"", toll:"", loading:"", unloading:"", misc:"",
               agentCommission:"", agentName:"", vendorMobilization:"" },
    startOdometer:"", vehicleLabel:"", notes:"",
  });
  const lf = (k,v) => sf(x=>({...x,[k]:v}));
  const lfe = (k,v) => sf(x=>({...x, expenses:{...x.expenses,[k]:v}}));

  const activeContracts = FLEET_CONTRACTS_DATA_INIT.filter(c=>c.status==="ACTIVE");

  const applyContractPrefill = (c) => {
    const asCol = c.assetType||"truck";
    setAssetType(asCol);
    sf(x=>({...x,
      customer: c.client||"",
      fromCity: c.routes?.[0]?.from||"",
      toCity:   c.routes?.[0]?.to||"",
      distanceKm: c.routes?.[0]?.km||"",
      freight: c.monthlyRetainer||c.monthlyRate||"",
      vehicle: c.vehicles?.[0]||"",
      vendorRatePerKm: c.ratePerKm||"",
      site: c.site||"",
      vehicleLabel: asCol==="equipment"?"Equipment":"",
    }));
  };

  const selVehicle = FLEET_DATA.find(v=>v.num===f.vehicle||v.regNo===f.vehicle);
  const selDriver  = DRIVERS_DATA.find(d=>d.id===f.driverId);
  const totalExp   = Object.entries(f.expenses).reduce((s,[k,v])=>
    ['diesel','toll','loading','unloading','misc','agentCommission','vendorMobilization'].includes(k)?s+(parseInt(v)||0):s, 0);
  const netProfit = (parseInt(f.freight)||0) - totalExp;
  const margin    = parseInt(f.freight)>0 ? Math.round((netProfit/(parseInt(f.freight)))*100) : 0;

  const ASSET_COLORS = { truck:T.blue, equipment:T.orange, bus:T.green };
  const ASSET_ICONS  = { truck:"🚛", equipment:"🏗️", bus:"🚌" };
  const ac = ASSET_COLORS[assetType];

  const handleCreate = () => {
    const id = `TRP-${new Date().getFullYear()}-${String(Math.floor(Math.random()*9000)+1000)}`;
    onCreated && onCreated({
      id, assetType, revenueModel:f.revenueModel, vehicleType:f.vehicleType, journeyType:f.journeyType,
      vehicle:f.vehicleType==="own"?f.vehicle:null,
      vendor:f.vehicleType==="vendor"?f.vendor:null,
      vendorVehicle:f.vehicleType==="vendor"?f.vendorVehicle:null,
      vendorRatePerKm:parseInt(f.vendorRatePerKm)||null,
      driver:f.driver, driverId:f.driverId,
      route:`${f.fromCity||f.site} → ${f.toCity||"Site"}`,
      fromCity:f.fromCity, toCity:f.toCity, distanceKm:parseInt(f.distanceKm)||0,
      loadType:f.loadType, commodity:f.commodity, weight:f.weight,
      customer:f.customer, agent:f.agent||"Direct",
      freight:parseInt(f.freight)||0, advance:parseInt(f.advance)||0,
      paymentType:f.paymentType,
      driverRental:parseInt(f.driverRental)||0,
      cleanerName:f.cleanerName, cleanerPay:parseInt(f.cleanerPay)||0,
      tripDuration:parseInt(f.tripDuration)||1,
      agentCommission:parseInt(f.expenses.agentCommission)||0,
      expenses:{
        diesel:parseInt(f.expenses.diesel)||0, toll:parseInt(f.expenses.toll)||0,
        loading:parseInt(f.expenses.loading)||0, unloading:parseInt(f.expenses.unloading)||0,
        misc:parseInt(f.expenses.misc)||0,
      },
      lrNumber:f.lrNumber||`LR-${id}`,
      startOdometer:parseInt(f.startOdometer)||0, startDate:f.startDate,
      vehicleLabel:f.vehicleLabel, notes:f.notes,
      status:"Pre-Trip Pending", dateCreated:new Date().toISOString().split("T")[0],
    });
    onClose();
  };

  const stepLabels = ["Mode & Type","Revenue & Journey","Vehicle & Driver","Cargo & Customer","Advances & Crew","Expenses","Review & Create"];
  const canNext = step===0?(tripMode==="from_contract"?!!selContractId:!!assetType):
                  step===1?(!!f.revenueModel&&!!f.journeyType):
                  step===2?(f.vehicleType==="own"?!!f.vehicle:!!f.vendor):
                  step===3?(!!f.customer&&!!f.freight): true;

  return (
    <div className="ov" style={{ alignItems:"flex-start", paddingTop:16, overflowY:"auto" }}>
      <div style={{ background:T.bgCard, border:`1px solid ${T.borderHi}`, borderRadius:16, width:"100%", maxWidth:680, margin:"0 auto", maxHeight:"94vh", overflowY:"auto" }}>

        {/* Header */}
        <div style={{ background:`linear-gradient(135deg,#040D1A,#0F2457,#1A3A7A)`, padding:"16px 22px", borderRadius:"16px 16px 0 0", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${T.blue}33` }}>
          <div>
            <div className="rj" style={{ fontSize:20, fontWeight:700, color:T.accent, letterSpacing:1 }}>
              {ASSET_ICONS[assetType]} New Trip Booking
            </div>
            <div style={{ fontSize:11, color:T.textMuted }}>Step {step+1}/{stepLabels.length} — {stepLabels[step]}</div>
          </div>
          <button className="btn" style={{ padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub}/></button>
        </div>

        {/* Progress */}
        <div style={{ display:"flex", gap:3, padding:"10px 22px 0", background:T.bgPanel }}>
          {stepLabels.map((_,i)=>(
            <div key={i} style={{ flex:1, height:3, borderRadius:2, background:i<step?T.accent:i===step?T.accent+"88":T.border, transition:"background .2s" }}/>
          ))}
        </div>

        <div style={{ padding:"20px 22px" }}>

          {/* ── STEP 0: Mode & Asset Type ── */}
          {step===0&&(
            <div>
              {/* Mode toggle */}
              <div style={{ marginBottom:18 }}>
                <div className="section-title">Trip Creation Mode</div>
                <div className="toggle-pill" style={{ width:"100%" }}>
                  {[["from_contract","📋 From Contract","Use existing rate contract — auto-fills rates, routes, vehicle"],
                    ["new","✏️ New Ad-hoc Trip","Create a one-off trip manually"]].map(([m,l,d])=>(
                    <div key={m} className={`toggle-opt ${tripMode===m?"on":""}`} style={{ flex:1, textAlign:"center", padding:"8px 0" }} onClick={()=>setTripMode(m)}>
                      <div style={{ fontWeight:600 }}>{l}</div>
                      <div style={{ fontSize:9, marginTop:2, opacity:.7 }}>{d}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FROM CONTRACT */}
              {tripMode==="from_contract"&&(
                <div>
                  <div style={{ fontSize:11, color:T.textSub, marginBottom:10 }}>Select an active contract — routes, rates, vehicle, and driver will be pre-filled.</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:7, maxHeight:280, overflowY:"auto", marginBottom:14 }}>
                    {activeContracts.length===0&&<div style={{ color:T.textMuted, fontSize:12, padding:10 }}>No active contracts. Use New Ad-hoc Trip instead.</div>}
                    {activeContracts.map(c=>{
                      const ctDef = CONTRACT_TYPE_DEFS[c.assetType]?.find(x=>x.id===c.contractTypeId);
                      const colr = ASSET_COLORS[c.assetType]||T.blue;
                      const sel  = selContractId===c.id;
                      return (
                        <div key={c.id} onClick={()=>{ setSelContractId(c.id); applyContractPrefill(c); }}
                          style={{ padding:"11px 14px", borderRadius:10, cursor:"pointer",
                            border:`2px solid ${sel?colr:T.border}`,
                            background:sel?colr+"14":T.bgPanel,
                            display:"flex", gap:10, alignItems:"center" }}>
                          <div style={{ fontSize:22 }}>{ASSET_ICONS[c.assetType]||"🚛"}</div>
                          <div style={{ flex:1 }}>
                            <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:2 }}>
                              <span className="mono" style={{ fontSize:11, color:T.accent }}>{c.id}</span>
                              <span className="badge" style={{ background:colr+"22", color:colr, fontSize:9 }}>{ctDef?.label||c.contractTypeId}</span>
                            </div>
                            <div style={{ fontSize:13, fontWeight:700 }}>{c.client}</div>
                            <div style={{ fontSize:11, color:T.textSub }}>
                              {c.routes?.[0]?.from&&c.routes?.[0]?.to?`${c.routes[0].from} → ${c.routes[0].to}`:c.site||""}
                              {c.hourlyRate?` · ₹${c.hourlyRate}/hr`:c.monthlyRetainer?` · ₹${(c.monthlyRetainer/1000).toFixed(0)}k/mo retainer`:c.monthlyRate?` · ₹${(c.monthlyRate/1000).toFixed(0)}k/mo`:""}
                            </div>
                          </div>
                          {sel&&<span style={{ fontSize:20 }}>✅</span>}
                        </div>
                      );
                    })}
                  </div>
                  {selContractId&&<div style={{ background:T.greenGlow, border:`1px solid ${T.green}33`, borderRadius:8, padding:10, fontSize:11, color:T.green }}>✅ Contract selected — trip sheet will be pre-filled. You can still override any field.</div>}
                </div>
              )}

              {/* NEW AD-HOC — Asset type selector */}
              {tripMode==="new"&&(
                <div>
                  <div className="section-title">Asset Type</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                    {[["truck","🚛","Truck / Lorry","Freight & goods transport"],
                      ["equipment","🏗️","Heavy Equipment","JCB, excavator, crane, roller"],
                      ["bus","🚌","Bus / Passenger","Corporate, school, tourism, stage"]].map(([id,ic,lb,desc])=>(
                      <div key={id} onClick={()=>setAssetType(id)}
                        style={{ padding:"14px 12px", borderRadius:10, cursor:"pointer", textAlign:"center",
                          border:`2px solid ${assetType===id?ASSET_COLORS[id]:T.border}`,
                          background:assetType===id?ASSET_COLORS[id]+"14":T.bgPanel }}>
                        <div style={{ fontSize:30, marginBottom:6 }}>{ic}</div>
                        <div style={{ fontSize:12, fontWeight:700, color:assetType===id?ASSET_COLORS[id]:T.text }}>{lb}</div>
                        <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>{desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 1: Revenue Model + Journey Type ── */}
          {step===1&&(
            <div>
              <div style={{ marginBottom:16 }}>
                <div className="section-title">Revenue Model</div>
                <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                  {Object.entries(REVENUE_MODELS).map(([k,rm])=>(
                    <div key={k} onClick={()=>lf("revenueModel",k)}
                      style={{ padding:"10px 14px", borderRadius:10, cursor:"pointer",
                        border:`2px solid ${f.revenueModel===k?rm.color:T.border}`,
                        background:f.revenueModel===k?rm.color+"12":T.bgPanel,
                        display:"flex", gap:10, alignItems:"center" }}>
                      <span style={{ fontSize:20 }}>{rm.icon}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:12, fontWeight:700, color:f.revenueModel===k?rm.color:T.text }}>{rm.label}</div>
                        <div style={{ fontSize:10, color:T.textSub }}>{rm.desc}</div>
                      </div>
                      {f.revenueModel===k&&<span style={{ fontSize:16 }}>✅</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Journey type (truck only) */}
              {assetType==="truck"&&(
                <div>
                  <div className="section-title">Journey Type</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    {JOURNEY_TYPES.map(jt=>(
                      <div key={jt.id} onClick={()=>lf("journeyType",jt.id)}
                        style={{ padding:"10px 12px", borderRadius:10, cursor:"pointer",
                          border:`2px solid ${f.journeyType===jt.id?jt.color:T.border}`,
                          background:f.journeyType===jt.id?jt.color+"12":T.bgPanel }}>
                        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:2 }}>
                          <span style={{ fontSize:12, fontWeight:700, color:f.journeyType===jt.id?jt.color:T.text }}>{jt.icon} {jt.label}</span>
                          <span className="badge" style={{ background:jt.color+"20", color:jt.color, fontSize:9 }}>{jt.tag}</span>
                        </div>
                        <div style={{ fontSize:10, color:T.textSub }}>{jt.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Equipment deployment details */}
              {assetType==="equipment"&&(
                <div style={{ display:"grid", gap:10, marginTop:10 }}>
                  <div className="section-title">Deployment Details</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    <div><label className="flabel">Deployment Site / Project *</label><input value={f.site} onChange={e=>lf("site",e.target.value)} placeholder="Site name or project"/></div>
                    <div><label className="flabel">Client / Contractor *</label><input value={f.customer} onChange={e=>lf("customer",e.target.value)} placeholder="Client name"/></div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                    <div><label className="flabel">Duration (days)</label><input type="number" value={f.tripDuration} onChange={e=>lf("tripDuration",e.target.value)} placeholder="1"/></div>
                    <div><label className="flabel">Work Type</label>
                      <select value={f.workType} onChange={e=>lf("workType",e.target.value)}>
                        {["Earth Moving","Excavation","Construction","Road Work","Crane Lift","Compaction","Other"].map(w=><option key={w}>{w}</option>)}
                      </select>
                    </div>
                    <div><label className="flabel">Contract Type</label>
                      <select value={f.contractType} onChange={e=>lf("contractType",e.target.value)}>
                        {["Hourly","Daily","Monthly","Fixed"].map(c=><option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div><label className="flabel">Start Date</label><input type="date" value={f.startDate} onChange={e=>lf("startDate",e.target.value)}/></div>
                </div>
              )}

              {/* Bus trip details */}
              {assetType==="bus"&&(
                <div style={{ display:"grid", gap:10, marginTop:10 }}>
                  <div className="section-title">Bus Trip Details</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    <div><label className="flabel">From / Pickup Point *</label><input value={f.fromCity} onChange={e=>lf("fromCity",e.target.value)} placeholder="Pickup location"/></div>
                    <div><label className="flabel">To / Drop Point *</label><input value={f.toCity} onChange={e=>lf("toCity",e.target.value)} placeholder="Drop location"/></div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                    <div><label className="flabel">Client / Organisation *</label><input value={f.customer} onChange={e=>lf("customer",e.target.value)} placeholder="Company/School"/></div>
                    <div><label className="flabel">Passenger Count</label><input type="number" value={f.passengerCount} onChange={e=>lf("passengerCount",e.target.value)} placeholder="40"/></div>
                    <div><label className="flabel">Travel Date</label><input type="date" value={f.startDate} onChange={e=>lf("startDate",e.target.value)}/></div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    <div><label className="flabel">Contract Fare (₹ total)</label><input type="number" value={f.freight} onChange={e=>lf("freight",e.target.value)} placeholder="15000"/></div>
                    <div><label className="flabel">Per Seat Fare (₹)</label><input type="number" value={f.perSeatFare} onChange={e=>lf("perSeatFare",e.target.value)} placeholder="Optional"/></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 2: Vehicle & Driver ── */}
          {step===2&&(
            <div>
              <div style={{ display:"flex", gap:8, marginBottom:14 }}>
                {[["own","🚚 Own Fleet"],["vendor","🤝 Vendor"]].map(([vt,lb])=>(
                  <button key={vt} className="btn" style={{ flex:1, fontWeight:600,
                    background:f.vehicleType===vt?T.blue+"33":T.bgPanel,
                    color:f.vehicleType===vt?T.blue:T.textSub,
                    border:`1px solid ${f.vehicleType===vt?T.blue:T.border}` }}
                    onClick={()=>lf("vehicleType",vt)}>{lb}</button>
                ))}
              </div>

              {f.vehicleType==="own"&&(
                <div>
                  <div className="section-title">Select Vehicle</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:14 }}>
                    {FLEET_DATA.map(v=>(
                      <div key={v.id} onClick={()=>{lf("vehicle",v.num||v.regNo); lf("vehicleLabel",v.type||"");}}
                        className="truck-card" style={{ borderColor:f.vehicle===(v.num||v.regNo)?T.accent:T.border, background:f.vehicle===(v.num||v.regNo)?T.accentGlow:T.bgPanel }}>
                        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                          <span style={{ fontSize:20 }}>🚛</span>
                          <div>
                            <div className="mono" style={{ fontSize:12, fontWeight:700, color:T.accent }}>{v.num||v.regNo}</div>
                            <div style={{ fontSize:11, color:T.textSub }}>{v.type||v.model} · {v.make}</div>
                          </div>
                        </div>
                        <span className={`badge ${v.status==="Available"?"bg":"bo"}`} style={{ fontSize:10 }}>{v.status||"Available"}</span>
                      </div>
                    ))}
                  </div>
                  <div className="section-title">Assign Driver</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:5, marginBottom:12 }}>
                    {DRIVERS_DATA.map(d=>(
                      <div key={d.id} onClick={()=>{ lf("driverId",d.id); lf("driver",d.name); }}
                        style={{ padding:"8px 12px", borderRadius:8, cursor:"pointer",
                          border:`2px solid ${f.driverId===d.id?T.green:T.border}`,
                          background:f.driverId===d.id?T.greenGlow:T.bgPanel,
                          display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <div>
                          <span style={{ fontSize:12, fontWeight:600 }}>{d.name}</span>
                          <span style={{ fontSize:11, color:T.textSub, marginLeft:8 }}>{d.cdl||d.licenseType||"HMV"}</span>
                        </div>
                        <span className={`badge ${(d.status==="Active"||d.status==="Available")?"bg":"bo"}`} style={{ fontSize:10 }}>{d.status||"Available"}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    <div><label className="flabel">Start Odometer (km)</label><input type="number" value={f.startOdometer} onChange={e=>lf("startOdometer",e.target.value)} placeholder={selVehicle?.odometer||"0"}/></div>
                    <div><label className="flabel">Vehicle Label</label><input value={f.vehicleLabel} onChange={e=>lf("vehicleLabel",e.target.value)} placeholder="16W Tripper…"/></div>
                  </div>
                </div>
              )}
              {f.vehicleType==="vendor"&&(
                <div style={{ display:"grid", gap:10 }}>
                  <div><label className="flabel">Vendor Name *</label><input value={f.vendor} onChange={e=>lf("vendor",e.target.value)} placeholder="Vendor company"/></div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    <div><label className="flabel">Vendor Vehicle No.</label><input value={f.vendorVehicle} onChange={e=>lf("vendorVehicle",e.target.value.toUpperCase())} style={{ fontFamily:"'JetBrains Mono',monospace" }} placeholder="TN00 XX0000"/></div>
                    <div><label className="flabel">Rate per KM (₹)</label><input type="number" value={f.vendorRatePerKm} onChange={e=>lf("vendorRatePerKm",e.target.value)} placeholder="45"/></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 3: Cargo & Customer (truck) ── */}
          {step===3&&(
            <div style={{ display:"grid", gap:10 }}>
              {assetType==="truck"&&<>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                  <div><label className="flabel">From City *</label><input value={f.fromCity} onChange={e=>lf("fromCity",e.target.value)} placeholder="Chennai"/></div>
                  <div><label className="flabel">To City *</label><input value={f.toCity} onChange={e=>lf("toCity",e.target.value)} placeholder="Mumbai"/></div>
                  <div><label className="flabel">Distance (km)</label><input type="number" value={f.distanceKm} onChange={e=>lf("distanceKm",e.target.value)}/></div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  <div><label className="flabel">Load Type</label>
                    <select value={f.loadType} onChange={e=>lf("loadType",e.target.value)}>
                      {["FTL","LTL","ODC","Hazmat","Part Load","FCL","LCL"].map(l=><option key={l}>{l}</option>)}
                    </select>
                  </div>
                  <div><label className="flabel">Commodity</label><input value={f.commodity} onChange={e=>lf("commodity",e.target.value)} placeholder="Cement, Steel, FMCG…"/></div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  <div><label className="flabel">Weight (Tons)</label><input value={f.weight} onChange={e=>lf("weight",e.target.value)} placeholder="18T"/></div>
                  <div><label className="flabel">Start Date</label><input type="date" value={f.startDate} onChange={e=>lf("startDate",e.target.value)}/></div>
                </div>
              </>}
              <div><label className="flabel">Customer / Consignee *</label><input value={f.customer} onChange={e=>lf("customer",e.target.value)} placeholder="Billed company name"/></div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                <div><label className="flabel">Agent / Broker</label><input value={f.agent} onChange={e=>lf("agent",e.target.value)} placeholder="Broker name or Direct"/></div>
                <div><label className="flabel">LR Number</label><input value={f.lrNumber} onChange={e=>lf("lrNumber",e.target.value)} placeholder="Auto-generated if blank"/></div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                <div><label className="flabel">Freight Amount (₹) *</label><input type="number" value={f.freight} onChange={e=>lf("freight",e.target.value)} placeholder="42000"/></div>
                <div><label className="flabel">Payment Type</label>
                  <select value={f.paymentType} onChange={e=>lf("paymentType",e.target.value)}>
                    {["To Pay","Paid","To Be Billed","Advance Paid"].map(p=><option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              {parseInt(f.freight)>0&&<div style={{ background:T.greenGlow, border:`1px solid ${T.green}33`, borderRadius:8, padding:8, fontSize:11, color:T.green }}>
                Freight: <strong>₹{parseInt(f.freight).toLocaleString()}</strong> · Payment: {f.paymentType}
              </div>}
            </div>
          )}

          {/* ── STEP 4: Driver Advances & Crew ── */}
          {step===4&&(
            <div style={{ display:"grid", gap:12 }}>
              {f.vehicleType==="own"&&<>
                <div className="section-title">Driver Advances</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                  <div><label className="flabel">Total Advance (₹)</label><input type="number" value={f.advance} onChange={e=>lf("advance",e.target.value)} placeholder="20000"/></div>
                  <div><label className="flabel">Driver 1 Cash Advance</label><input type="number" value={f.driverAdvance} onChange={e=>lf("driverAdvance",e.target.value)} placeholder="5000"/></div>
                  <div><label className="flabel">Payment Mode</label>
                    <select value={f.driverPayMode} onChange={e=>lf("driverPayMode",e.target.value)}>
                      {["Cash","NEFT","UPI","Cheque"].map(m=><option key={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  <div><label className="flabel">Driver 2 Advance (₹)</label><input type="number" value={f.driverAdvance2} onChange={e=>lf("driverAdvance2",e.target.value)} placeholder="If 2nd driver"/></div>
                  <div><label className="flabel">Driver Rental / Trip Pay (₹)</label><input type="number" value={f.driverRental} onChange={e=>lf("driverRental",e.target.value)} placeholder="Per trip fixed pay"/></div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:8, background:T.bgPanel, borderRadius:10, padding:12 }}>
                  <div className="section-title" style={{ marginBottom:6 }}>Support Crew (Optional)</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                    <div><label className="flabel">Cleaner / Helper Name</label><input value={f.cleanerName} onChange={e=>lf("cleanerName",e.target.value)} placeholder="Name"/></div>
                    <div><label className="flabel">Phone</label><input value={f.cleanerPhone} onChange={e=>lf("cleanerPhone",e.target.value)} placeholder="Mobile"/></div>
                    <div><label className="flabel">Daily Allowance (₹)</label><input type="number" value={f.cleanerPay} onChange={e=>lf("cleanerPay",e.target.value)} placeholder="500"/></div>
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  <div><label className="flabel">Trip Duration (days)</label><input type="number" value={f.tripDuration} onChange={e=>lf("tripDuration",e.target.value)} placeholder="2"/></div>
                  <div><label className="flabel">Total Days Allowance (auto)</label>
                    <input readOnly value={f.cleanerPay&&f.tripDuration?`₹${parseInt(f.cleanerPay||0)*parseInt(f.tripDuration||1)}`:"—"} style={{ color:T.textMuted }}/>
                  </div>
                </div>
              </>}
              {f.vehicleType==="vendor"&&(
                <div>
                  <div className="section-title">Vendor Payment Terms</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    <div><label className="flabel">Total Vendor Cost (₹)</label><input type="number" value={f.advance} onChange={e=>lf("advance",e.target.value)} placeholder="38000"/></div>
                    <div><label className="flabel">Advance to Vendor (₹)</label><input type="number" value={f.driverAdvance} onChange={e=>lf("driverAdvance",e.target.value)} placeholder="15000"/></div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:8 }}>
                    <div><label className="flabel">Balance Payable</label>
                      <input readOnly value={f.advance&&f.driverAdvance?`₹${(parseInt(f.advance||0)-parseInt(f.driverAdvance||0)).toLocaleString()}`:"—"} style={{ color:T.textMuted }}/>
                    </div>
                    <div><label className="flabel">Payment Mode</label>
                      <select value={f.driverPayMode} onChange={e=>lf("driverPayMode",e.target.value)}>
                        {["Cash","NEFT","UPI","Cheque"].map(m=><option key={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 5: Expenses ── */}
          {step===5&&(
            <div>
              {f.vehicleType==="own"?(
                <div style={{ display:"grid", gap:12 }}>
                  <div className="section-title">Trip Expenses</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                    <div><label className="flabel">Diesel Litres</label><input type="number" onChange={e=>lfe("dieselLitres",e.target.value)} placeholder="120"/></div>
                    <div><label className="flabel">Diesel Amount (₹)</label><input type="number" value={f.expenses.diesel} onChange={e=>lfe("diesel",e.target.value)} placeholder="12000"/></div>
                    <div><label className="flabel">Toll Charges (₹)</label><input type="number" value={f.expenses.toll} onChange={e=>lfe("toll",e.target.value)} placeholder="3000"/></div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                    <div><label className="flabel">Loading (₹)</label><input type="number" value={f.expenses.loading} onChange={e=>lfe("loading",e.target.value)} placeholder="500"/></div>
                    <div><label className="flabel">Unloading (₹)</label><input type="number" value={f.expenses.unloading} onChange={e=>lfe("unloading",e.target.value)} placeholder="500"/></div>
                    <div><label className="flabel">Misc / Others (₹)</label><input type="number" value={f.expenses.misc} onChange={e=>lfe("misc",e.target.value)} placeholder="200"/></div>
                  </div>
                  <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:12 }}>
                    <div className="section-title" style={{ marginBottom:8 }}>Agent Commission</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                      <div><label className="flabel">Commission Amount (₹)</label><input type="number" value={f.expenses.agentCommission} onChange={e=>lfe("agentCommission",e.target.value)} placeholder="1500"/></div>
                      <div><label className="flabel">Paid To (Agent Name)</label><input value={f.expenses.agentName} onChange={e=>lfe("agentName",e.target.value)} placeholder={f.agent||"Agent name"}/></div>
                    </div>
                  </div>
                </div>
              ):(
                <div style={{ display:"grid", gap:12 }}>
                  <div className="section-title">Vendor Trip Costs</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    <div><label className="flabel">Vendor Transport / Mobilization (₹)</label><input type="number" value={f.expenses.vendorMobilization} onChange={e=>lfe("vendorMobilization",e.target.value)} placeholder="5000"/></div>
                    <div><label className="flabel">Toll / Permit (₹)</label><input type="number" value={f.expenses.toll} onChange={e=>lfe("toll",e.target.value)} placeholder="2000"/></div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    <div><label className="flabel">Agent Commission (₹)</label><input type="number" value={f.expenses.agentCommission} onChange={e=>lfe("agentCommission",e.target.value)} placeholder="1000"/></div>
                    <div><label className="flabel">Misc (₹)</label><input type="number" value={f.expenses.misc} onChange={e=>lfe("misc",e.target.value)} placeholder="500"/></div>
                  </div>
                </div>
              )}
              {/* Live P&L */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginTop:14 }}>
                {[
                  {l:"Freight Revenue",v:`₹${parseInt(f.freight||0).toLocaleString()}`,c:T.green},
                  {l:"Total Expenses",v:`₹${totalExp.toLocaleString()}`,c:T.red},
                  {l:`Net Profit (${margin}%)`,v:`₹${netProfit.toLocaleString()}`,c:netProfit>=0?T.green:T.red},
                ].map(k=>(
                  <div key={k.l} style={{ background:T.bgPanel, border:`1px solid ${k.c}22`, borderTop:`3px solid ${k.c}`, borderRadius:8, padding:"8px 10px" }}>
                    <div style={{ fontSize:9, color:T.textMuted, textTransform:"uppercase" }}>{k.l}</div>
                    <div className="rj" style={{ fontSize:18, fontWeight:700, color:k.c, marginTop:3 }}>{k.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:12 }}>
                <label className="flabel">Trip Notes</label>
                <textarea value={f.notes} onChange={e=>lf("notes",e.target.value)} placeholder="Special instructions, customer notes, hazmat details…" style={{ height:48 }}/>
              </div>
            </div>
          )}

          {/* ── STEP 6: Review & Create ── */}
          {step===6&&(
            <div>
              <div style={{ background:`linear-gradient(135deg,${f.vehicleType==="own"?"#052E16,#064E3B":"#1E1B4B,#2E1065"})`, borderRadius:12, padding:16, marginBottom:14 }}>
                <div className="rj" style={{ fontSize:16, fontWeight:700, color:"#fff", marginBottom:6 }}>
                  {ASSET_ICONS[assetType]} {assetType==="equipment"?f.site:f.fromCity||"?"} {assetType!=="equipment"&&`→ ${f.toCity||"?"}`}
                </div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {[f.revenueModel&&REVENUE_MODELS[f.revenueModel]?.label,
                    f.journeyType&&JOURNEY_TYPES.find(j=>j.id===f.journeyType)?.label,
                    f.loadType, f.weight, f.paymentType].filter(Boolean).map(b=>(
                    <span key={b} className="badge" style={{ background:"rgba(255,255,255,.15)", color:"#fff", fontSize:10 }}>{b}</span>
                  ))}
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:14 }}>
                {[
                  {l:"Freight",v:`₹${parseInt(f.freight||0).toLocaleString()}`,c:T.green},
                  {l:"Expenses",v:`₹${totalExp.toLocaleString()}`,c:T.red},
                  {l:`Profit (${margin}%)`,v:`₹${netProfit.toLocaleString()}`,c:netProfit>=0?T.green:T.red},
                ].map(k=>(
                  <div key={k.l} style={{ background:T.bgPanel, border:`1px solid ${k.c}22`, borderTop:`3px solid ${k.c}`, borderRadius:8, padding:"10px 12px" }}>
                    <div style={{ fontSize:9, color:T.textMuted, textTransform:"uppercase" }}>{k.l}</div>
                    <div className="rj" style={{ fontSize:20, fontWeight:700, color:k.c }}>{k.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:"12px 14px" }}>
                {[
                  ["Vehicle",f.vehicleType==="own"?f.vehicle:f.vendor],
                  ["Driver",f.driver||"Vendor-assigned"],
                  ["Customer",f.customer],
                  ["Agent",f.agent||"Direct"],
                  ["LR Number",f.lrNumber||"Auto-generated"],
                  ["Odometer",f.startOdometer?f.startOdometer+" km":"—"],
                  ["Start Date",f.startDate],
                  ["Duration",assetType==="truck"?`${f.distanceKm||"—"} km`:f.tripDuration+" day(s)"],
                  ["Cleaner",f.cleanerName||"—"],
                  ["Notes",f.notes||"—"],
                ].map(([k,v])=>(
                  <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${T.border}18`, fontSize:12 }}>
                    <span style={{ color:T.textMuted }}>{k}</span><span style={{ fontWeight:500 }}>{v||"—"}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div style={{ padding:"12px 22px", borderTop:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between", alignItems:"center", background:T.bgPanel, borderRadius:"0 0 16px 16px" }}>
          <button className="btn btn-gh" onClick={()=>step>0?setStep(s=>s-1):onClose()}>{step===0?"Cancel":"← Back"}</button>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <span style={{ fontSize:11, color:T.textMuted }}>{step+1}/{stepLabels.length}</span>
            {step<6
              ?<button className="btn btn-p" disabled={!canNext} style={{ opacity:canNext?1:0.5 }} onClick={()=>setStep(s=>s+1)}>Next →</button>
              :<button className="btn" style={{ background:T.green, color:"#fff", fontWeight:700 }} onClick={handleCreate}>🚀 Create Trip</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
// ═══════════════════════════════════════════════════════════════════════════════
// INSPECTION MODAL — Pre-Trip & Post-Trip (from v2)
// ═══════════════════════════════════════════════════════════════════════════════
const InspectionModal = ({ trip, type, onClose, onComplete }) => {
  const isPre=type==="pre";
  const CHECKS=isPre
    ?["Engine Oil","Coolant","Brakes","Tyres","Lights","Horn","Fuel Level","Documents","Fire Extinguisher","First Aid Kit"]
    :["Body Damage","Tyre Condition","Engine Status","Cargo Cleared","Documents Returned","Cash Settlement","Toll Receipts","Odometer","Driver Debrief","Vehicle Cleaned"];
  const [checks,setChecks]=useState({});
  const [remarks,setRemarks]=useState("");
  const [decision,setDecision]=useState("approve");
  const allDone=CHECKS.every(c=>checks[c]);
  return (
    <div className="ov"><div className="modal" style={{ maxWidth:520 }}>
      <div className="mhdr" style={{ background:`linear-gradient(135deg,${isPre?"#052E16,#064E3B":"#0D1428,#1A2A5E"})`,borderBottom:`1px solid ${isPre?T.green:T.blue}33` }}>
        <div>
          <div className="rj" style={{ fontSize:16,fontWeight:700,color:isPre?T.green:T.blue }}>{isPre?"✅ Pre-Trip":"📋 Post-Trip"} Inspection</div>
          <div style={{ fontSize:11,color:T.textMuted }}>{trip.id} · {trip.vehicle||trip.vendorVehicle} · {trip.route}</div>
        </div>
        <button className="btn" style={{ padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub}/></button>
      </div>
      <div className="mbdy">
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12 }}>
          {CHECKS.map(c=>(
            <label key={c} style={{ display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:checks[c]?(isPre?T.green:T.blue)+"11":T.bgPanel,border:`1px solid ${checks[c]?(isPre?T.green:T.blue):T.border}`,borderRadius:8,cursor:"pointer",fontSize:12 }}>
              <input type="checkbox" checked={!!checks[c]} onChange={e=>setChecks(x=>({...x,[c]:e.target.checked}))} style={{ accentColor:isPre?T.green:T.blue }}/>
              {c}
            </label>
          ))}
        </div>
        <div style={{ marginBottom:10 }}><label className="flabel">Remarks</label><input value={remarks} onChange={e=>setRemarks(e.target.value)} placeholder="Optional notes…"/></div>
        <div>
          <label className="flabel">Decision</label>
          <div style={{ display:"flex",gap:8 }}>
            {[{k:"approve",l:"✅ Approve"},{k:"maintenance",l:"🔧 Send to Maintenance"}].map(d=>(
              <button key={d.k} className="btn" style={{ flex:1,background:decision===d.k?(isPre?T.green:T.blue)+"33":T.bgPanel,color:decision===d.k?(isPre?T.green:T.blue):T.textSub,border:`1px solid ${decision===d.k?(isPre?T.green:T.blue):T.border}`,fontSize:12 }} onClick={()=>setDecision(d.k)}>{d.l}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="mftr">
        <button className="btn btn-gh" onClick={onClose}>Cancel</button>
        <button className="btn" style={{ background:allDone?(isPre?T.green:T.blue):T.bgPanel,color:allDone?"#fff":T.textMuted,fontWeight:700 }} disabled={!allDone} onClick={()=>{onComplete&&onComplete(trip.id,type,checks,remarks,decision);onClose();}}>Complete Inspection</button>
      </div>
    </div></div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// TRIPS PAGE — Full merged module
// ═══════════════════════════════════════════════════════════════════════════════
const TripDetailModal = ({ t, consignments, setConsignments, onClose, setShowDeliveryConfirm, setShowConsignmentForm, setShowEqConfirm, setShowBusConfirm, setShowInspect, setTrips }) => {
  const [activeTab, setActiveTab] = React.useState("overview");
  const jt = JOURNEY_TYPES.find(j=>j.id===t.journeyType);
  const rm = REVENUE_MODELS[t.revenueModel];
  const isOwn = t.vehicleType==="own";
  const totalExpOwn = tripExpTotal(t.expenses) + (t.agentCommission||0) + (t.cleanerPay||0) + (t.driverRental||0);
  const totalExpVendor = (t.vendorCost||0) + (t.vendorMobilization||0) + tripExpTotal(t.expenses);
  const totalExp = isOwn ? totalExpOwn : totalExpVendor;
  const profit = t.freight - totalExp;
  const margin = t.freight>0 ? ((profit/t.freight)*100).toFixed(1) : "0.0";
  const driverBalance = isOwn ? (t.advance - (tripExpTotal(t.expenses)+(t.driverRental||0)+(t.cleanerPay||0))) : 0;
  const driverOwes = driverBalance > 0;
  const statusSeq = ["Pre-Trip Pending","Pre-Trip Done","Started","In Transit","Arrived","Post-Trip Pending","Post-Trip Done","Invoiced","Closed"];
  const statusIdx = statusSeq.indexOf(t.status);
  const tripCons = consignments.filter(c=>c.tripId===t.id);
  const tabs = [
    { id:"overview", label:"Overview" },
    { id:"financials", label:"Financials" },
    { id:"cargo", label:"Cargo & Docs" },
    { id:"ops", label:"Operations" },
  ];
  return (
    <div className="ov" style={{ alignItems:"flex-start", paddingTop:16, overflowY:"auto" }}>
      <div style={{ background:T.bgCard, border:`1px solid ${T.borderHi}`, borderRadius:20, width:"100%", maxWidth:1060, overflow:"hidden" }}>

        {/* ══ CINEMATIC HEADER ══ */}
        <div style={{ position:"relative", background:`linear-gradient(135deg,${isOwn?"#03071e,#0d1b4b,#052E16":"#0d0221,#1a0533,#0a0a2e"})`, padding:"24px 28px 0", overflow:"hidden" }}>
          {/* Background pattern */}
          <div style={{ position:"absolute", inset:0, opacity:.04, backgroundImage:"repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize:"24px 24px" }}/>
          <div style={{ position:"relative" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
              <div>
                <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:8 }}>
                  <div className="rj" style={{ fontSize:22, fontWeight:700, color:"#fff", letterSpacing:1.5, textTransform:"uppercase" }}>
                    {t.assetType==="Bus"?"🚌":t.assetType==="Equipment"?"🏗️":isOwn?"🚚":"🤝"} Trip Sheet
                  </div>
                  <span style={{ fontFamily:"JetBrains Mono", fontSize:12, padding:"3px 10px", background:"rgba(255,255,255,.12)", borderRadius:6, color:"rgba(255,255,255,.9)", border:"1px solid rgba(255,255,255,.15)" }}>{t.id}</span>
                  <span style={{ padding:"3px 10px", borderRadius:6, background:(STATUS_COLORS[t.status]||"#888")+"33", color:STATUS_COLORS[t.status]||"#ccc", fontSize:11, fontWeight:700, border:`1px solid ${STATUS_COLORS[t.status]||"#888"}44` }}>{t.status}</span>
                </div>
                <div style={{ fontSize:17, color:"rgba(255,255,255,.9)", fontWeight:600, marginBottom:8, letterSpacing:.3 }}>
                  {t.fromCity||t.route?.split("→")[0]?.trim()||"—"}
                  <span style={{ color:"rgba(255,255,255,.4)", margin:"0 10px", fontSize:14 }}>→</span>
                  {t.toCity||t.route?.split("→")[1]?.trim()||"—"}
                  {t.distanceKm && <span style={{ fontSize:12, color:"rgba(255,255,255,.5)", marginLeft:10, fontFamily:"JetBrains Mono" }}>{t.distanceKm} km</span>}
                </div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {jt&&<span style={{ padding:"3px 10px", borderRadius:6, background:jt.color+"30", color:jt.color, fontSize:11, border:`1px solid ${jt.color}40` }}>{jt.icon} {jt.label}</span>}
                  {rm&&<span style={{ padding:"3px 10px", borderRadius:6, background:rm.color+"30", color:rm.color, fontSize:11, border:`1px solid ${rm.color}40` }}>{rm.icon} {rm.label}</span>}
                  <span style={{ padding:"3px 10px", borderRadius:6, background:isOwn?T.green+"25":T.purple+"25", color:isOwn?T.green:T.purple, fontSize:11, border:`1px solid ${isOwn?T.green:T.purple}40` }}>{isOwn?"Own Fleet":"Vendor Trip"}</span>
                  {t.loadType&&<span style={{ padding:"3px 10px", borderRadius:6, background:"rgba(255,255,255,.08)", color:"rgba(255,255,255,.65)", fontSize:11 }}>{t.loadType}</span>}
                  {t.weight&&<span style={{ padding:"3px 10px", borderRadius:6, background:"rgba(255,255,255,.08)", color:"rgba(255,255,255,.65)", fontSize:11 }}>{t.weight}</span>}
                  {t.assetType&&t.assetType!=="Truck"&&<span style={{ padding:"3px 10px", borderRadius:6, background:T.cyan+"25", color:T.cyan, fontSize:11 }}>{t.assetType}</span>}
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8 }}>
                <button style={{ background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.2)", borderRadius:8, padding:"7px 11px", color:"#fff", cursor:"pointer" }} onClick={onClose}>✕</button>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:9, color:"rgba(255,255,255,.4)", textTransform:"uppercase", letterSpacing:".1em" }}>Created</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,.75)", fontWeight:600, marginTop:2 }}>{t.dateCreated}</div>
                  {t.startDate&&<div style={{ fontSize:11, color:"rgba(255,255,255,.5)", marginTop:1 }}>Start: {t.startDate}</div>}
                </div>
              </div>
            </div>

            {/* ── STATUS TIMELINE ── */}
            <div style={{ display:"flex", alignItems:"center", overflowX:"auto", paddingBottom:16, gap:0 }}>
              {statusSeq.map((s,i)=>{
                const done=i<statusIdx; const curr=i===statusIdx; const col=done?"#34d399":curr?T.accent:"rgba(255,255,255,.25)";
                return (
                  <div key={s} style={{ display:"flex", alignItems:"center", flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                      <div style={{ width:24, height:24, borderRadius:"50%", background:curr?T.accent:done?"#34d399":"rgba(255,255,255,.08)", border:`2px solid ${col}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:done?"#052E16":curr?"#000":"rgba(255,255,255,.4)", flexShrink:0 }}>
                        {done?"✓":i+1}
                      </div>
                      <div style={{ fontSize:7.5, color:col, fontWeight:curr?700:400, textAlign:"center", width:58, lineHeight:1.25, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s}</div>
                    </div>
                    {i<statusSeq.length-1&&<div style={{ flex:1, height:2, background:done?"#34d399":"rgba(255,255,255,.12)", margin:"0 1px", marginBottom:16, minWidth:4 }}/>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── TABS ── */}
          <div style={{ display:"flex", gap:0, marginTop:4 }}>
            {tabs.map(tab=>(
              <button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{ padding:"10px 20px", fontSize:12, fontWeight:600, background:"none", border:"none", cursor:"pointer", color:activeTab===tab.id?"#fff":"rgba(255,255,255,.45)", borderBottom:activeTab===tab.id?"2px solid #F59E0B":"2px solid transparent", marginBottom:0, letterSpacing:.4 }}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ══ P&L HERO STRIP (always visible) ══ */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:0, borderBottom:`1px solid ${T.border}` }}>
          {[
            { l:"Freight", v:fmt(t.freight), c:T.green, sub:"Revenue" },
            { l:"Expenses", v:fmt(totalExp), c:T.red, sub:isOwn?"All costs":"Vendor+extras" },
            { l:"Net Profit", v:fmt(profit), c:profit>=0?T.green:T.red, sub:"After all costs" },
            { l:"Margin", v:`${margin}%`, c:parseFloat(margin)>20?T.green:parseFloat(margin)>5?T.accent:T.red, sub:"Net/Freight" },
            { l:isOwn?"Advance":"Vendor Cost", v:isOwn?fmt(t.advance):fmt(t.vendorCost||0), c:T.orange, sub:isOwn?"Given to driver":"Operator cost" },
          ].map((k,idx)=>(
            <div key={k.l} style={{ padding:"14px 16px", borderLeft:idx>0?`1px solid ${T.border}`:"none", background:T.bgPanel }}>
              <div style={{ fontSize:9, color:T.textMuted, textTransform:"uppercase", letterSpacing:".08em", marginBottom:3 }}>{k.l}</div>
              <div className="rj" style={{ fontSize:20, fontWeight:700, color:k.c }}>{k.v}</div>
              <div style={{ fontSize:9, color:T.textMuted, marginTop:2 }}>{k.sub}</div>
            </div>
          ))}
        </div>

        {/* ══ TAB CONTENT ══ */}
        <div style={{ padding:"20px 24px" }}>

          {/* ─── OVERVIEW TAB ─── */}
          {activeTab==="overview"&&(
            <div>
              <div style={{ display:"grid", gridTemplateColumns:"1.15fr 1fr 1fr", gap:14, marginBottom:14 }}>

                {/* Col 1 — Trip Details */}
                <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:12, padding:16 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:T.textSub, textTransform:"uppercase", letterSpacing:".08em", marginBottom:12, paddingBottom:8, borderBottom:`1px solid ${T.border}` }}>📋 Trip Details</div>
                  {[
                    ["Trip ID", t.id, "mono"],
                    ["Route", t.route],
                    ["From", t.fromCity||"—"],
                    ["To", t.toCity||"—"],
                    ["Distance", t.distanceKm?`${t.distanceKm} km`:"—"],
                    ["Journey Type", jt?.label||"—"],
                    ["Asset Type", t.assetType||"Truck"],
                    ["Revenue Model", rm?.label||"—"],
                    ["Load Type", t.loadType||"—"],
                    ["Commodity", t.commodity||"—"],
                    ["Weight", t.weight||"—"],
                    ["Customer", t.customer||"—", "accent"],
                    ["Agent / Broker", t.agent||"Direct"],
                    ["LR Number", t.lrNumber||"Pending"],
                    ["Start Date", t.startDate||t.dateCreated],
                    ["Payment Type", t.paymentType||"—"],
                    ["Notes", t.notes||"—"],
                  ].map(([k,v,style])=>(
                    <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", borderBottom:`1px solid ${T.border}18`, fontSize:12, gap:8 }}>
                      <span style={{ color:T.textMuted, flexShrink:0 }}>{k}</span>
                      <span style={{ fontWeight:500, color:style==="accent"?T.accent:"inherit", fontFamily:style==="mono"?"JetBrains Mono":"inherit", fontSize:style==="mono"?11:12, textAlign:"right", wordBreak:"break-all" }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Col 2 — Vehicle / Vendor */}
                <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:12, padding:16 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:T.textSub, textTransform:"uppercase", letterSpacing:".08em", marginBottom:12, paddingBottom:8, borderBottom:`1px solid ${T.border}` }}>{isOwn?"🚛 Vehicle & Driver":"🤝 Vendor Details"}</div>
                  {(isOwn?[
                    ["Vehicle No.", t.vehicle||"—", "mono"],
                    ["Vehicle Label", t.vehicleLabel||"—"],
                    ["Driver", t.driver||"—"],
                    ["Driver ID", t.driverId||"—", "mono"],
                    ["Driver 2", t.driver2||(t.drivers&&t.drivers[1])||"—"],
                    ["Advance Given", fmt(t.advance)],
                    ["Driver Rental/Pay", t.driverRental?fmt(t.driverRental):"—"],
                    ["Payment Mode", t.driverPayMode||"—"],
                    ["Cleaner / Helper", t.cleanerName||"—"],
                    ["Cleaner Phone", t.cleanerPhone||"—"],
                    ["Cleaner Pay", t.cleanerPay?fmt(t.cleanerPay):"—"],
                    ["Trip Duration", t.tripDuration?`${t.tripDuration} days`:"—"],
                    ["Start Odometer", t.startOdometer||"—"],
                    ["End Odometer", t.endOdometer||"—"],
                    ["Diesel Est.", t.expenses?.diesel?`${Math.round(t.expenses.diesel/100)} L`:"—"],
                  ]:[
                    ["Vendor Name", t.vendor||"—"],
                    ["Vendor Vehicle", t.vendorVehicle||"—", "mono"],
                    ["Vendor Rate/km", t.vendorRatePerKm?`₹${t.vendorRatePerKm}/km`:"—"],
                    ["Vendor Cost", fmt(t.vendorCost||0)],
                    ["Mobilization Cost", t.vendorMobilization?fmt(t.vendorMobilization):"—"],
                    ["Driver", "Vendor-assigned"],
                    ["Advance Given", "None"],
                    ["KYC Status", "Verified ✓"],
                    ["Contact", "—"],
                  ]).map(([k,v,style])=>(
                    <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", borderBottom:`1px solid ${T.border}18`, fontSize:12, gap:8 }}>
                      <span style={{ color:T.textMuted, flexShrink:0 }}>{k}</span>
                      <span style={{ fontWeight:500, fontFamily:style==="mono"?"JetBrains Mono":"inherit", fontSize:style==="mono"?11:12, textAlign:"right", color:k==="Vendor Cost"?T.red:k==="Vendor Name"?T.purple:"inherit" }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Col 3 — Live Status + Docs */}
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  {/* Driver settlement snapshot */}
                  {isOwn&&(
                    <div style={{ background:driverOwes?T.redGlow:T.greenGlow, border:`1px solid ${driverOwes?T.red:T.green}33`, borderRadius:12, padding:14 }}>
                      <div style={{ fontSize:11, fontWeight:700, color:T.text, marginBottom:10 }}>👤 Driver Settlement</div>
                      <div style={{ fontSize:12, color:T.textSub, marginBottom:4 }}>{t.driver||"—"}</div>
                      {[
                        ["Advance Given", fmt(t.advance), T.orange],
                        ["Trip Expenses", fmt(tripExpTotal(t.expenses)), T.red],
                        ["Driver Rental", fmt(t.driverRental||0), T.orange],
                        ["Cleaner Pay", fmt(t.cleanerPay||0), T.orange],
                        [driverOwes?"Driver Returns":"Pay Driver", fmt(Math.abs(driverBalance)), driverOwes?T.red:T.green],
                      ].map(([k,v,c])=>(
                        <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"3px 0", fontSize:11 }}>
                          <span style={{ color:T.textMuted }}>{k}</span>
                          <span style={{ fontWeight:700, color:c }}>{v}</span>
                        </div>
                      ))}
                      <button className="btn btn-o" style={{ fontSize:11, width:"100%", marginTop:10 }}><Ic n="wallet" s={12}/> Settle Now</button>
                    </div>
                  )}
                  {/* Docs status */}
                  <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:12, padding:14 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:T.textSub, textTransform:"uppercase", letterSpacing:".08em", marginBottom:10 }}>📎 Documents</div>
                    {[
                      { label:"Lorry Receipt (LR)", value:t.lrNumber||"Pending", color:T.blue, done:!!t.lrNumber },
                      { label:"Proof of Delivery", value:"Not Uploaded", color:T.orange, done:false },
                      { label:"Invoice", value:(t.status==="Invoiced"||t.status==="Closed")?"Raised":"Not Raised", color:(t.status==="Invoiced"||t.status==="Closed")?T.green:T.textMuted, done:(t.status==="Invoiced"||t.status==="Closed") },
                      { label:"E-way Bill", value:"Check Compliance", color:T.textMuted, done:false },
                    ].map(d=>(
                      <div key={d.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"5px 0", borderBottom:`1px solid ${T.border}18`, fontSize:11 }}>
                        <span style={{ color:T.textMuted }}>{d.label}</span>
                        <span style={{ fontWeight:600, color:d.color, fontSize:10 }}>{d.done?"✓ ":""}{d.value}</span>
                      </div>
                    ))}
                    <div style={{ display:"flex", gap:6, marginTop:10 }}>
                      <button className="btn" style={{ flex:1, fontSize:10, padding:"4px 8px", background:T.blue+"18", color:T.blue, border:`1px solid ${T.blue}33` }}><Ic n="doc" s={11}/> POD</button>
                      <button className="btn" style={{ flex:1, fontSize:10, padding:"4px 8px", background:T.green+"18", color:T.green, border:`1px solid ${T.green}33` }}><Ic n="finance" s={11}/> Invoice</button>
                    </div>
                  </div>
                  {/* Inspection history */}
                  <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:12, padding:14 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:T.textSub, textTransform:"uppercase", letterSpacing:".08em", marginBottom:10 }}>🔍 Inspections</div>
                    {[
                      { type:"Pre-Trip", done:["Pre-Trip Done","Started","In Transit","Arrived","Post-Trip Pending","Post-Trip Done","Invoiced","Closed"].includes(t.status), pending:t.status==="Pre-Trip Pending", icon:"pretrip" },
                      { type:"Post-Trip", done:["Post-Trip Done","Invoiced","Closed"].includes(t.status), pending:t.status==="Post-Trip Pending", icon:"posttrip" },
                    ].map(ins=>{
                      const col = ins.done?T.green:ins.pending?T.orange:T.textMuted;
                      const label = ins.done?"Completed ✓":ins.pending?"Action Required":"Not Yet";
                      return (
                        <div key={ins.type} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"5px 0", borderBottom:`1px solid ${T.border}18` }}>
                          <div>
                            <div style={{ fontSize:11, fontWeight:600 }}>{ins.type}</div>
                            <div style={{ fontSize:10, color:col }}>{label}</div>
                          </div>
                          {(ins.pending||(!ins.done&&ins.type==="Pre-Trip"&&t.status==="Pre-Trip Pending"))&&(
                            <button className="btn" style={{ fontSize:10, padding:"3px 8px", background:col+"20", color:col, border:`1px solid ${col}33` }}
                              onClick={()=>{onClose();setShowInspect&&setShowInspect({trip:t,type:ins.type==="Pre-Trip"?"pre":"post"});}}>Start</button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── FINANCIALS TAB ─── */}
          {activeTab==="financials"&&(
            <div>
              <div style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:14 }}>
                {/* Full expense ledger */}
                <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:12, padding:16 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:T.textSub, textTransform:"uppercase", letterSpacing:".08em", marginBottom:14, paddingBottom:8, borderBottom:`1px solid ${T.border}` }}>💰 Full Expense Ledger</div>

                  <div style={{ fontSize:10, color:T.green, fontWeight:700, textTransform:"uppercase", letterSpacing:".06em", marginBottom:8 }}>INCOME</div>
                  {[
                    ["Freight Revenue", t.freight, T.green],
                    ["Agent Commission (In)", 0, T.green],
                  ].map(([k,v,c])=>(
                    <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${T.border}18`, fontSize:13 }}>
                      <span style={{ color:T.textSub }}>{k}</span>
                      <span style={{ color:T.green, fontWeight:600, fontFamily:"JetBrains Mono", fontSize:12 }}>{fmt(v)}</span>
                    </div>
                  ))}
                  <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", fontSize:13, marginBottom:14 }}>
                    <span style={{ fontWeight:700 }}>Total Income</span>
                    <span style={{ color:T.green, fontWeight:700, fontFamily:"JetBrains Mono", fontSize:13 }}>{fmt(t.freight)}</span>
                  </div>

                  <div style={{ fontSize:10, color:T.red, fontWeight:700, textTransform:"uppercase", letterSpacing:".06em", marginBottom:8 }}>EXPENSES</div>
                  {(isOwn?[
                    ["Diesel / Fuel", t.expenses?.diesel||0],
                    ["Toll Charges", t.expenses?.toll||0],
                    ["Loading Charges", t.expenses?.loading||0],
                    ["Unloading Charges", t.expenses?.unloading||0],
                    ["Driver Advance", t.advance||0],
                    ["Driver Rental / Trip Pay", t.driverRental||0],
                    ["Cleaner / Helper Pay", t.cleanerPay||0],
                    ["Agent Commission (Out)", t.agentCommission||0],
                    ["Misc / Others", t.expenses?.misc||0],
                  ]:[
                    ["Vendor Cost (Base)", t.vendorCost||0],
                    ["Vendor Mobilization", t.vendorMobilization||0],
                    ["Toll Charges", t.expenses?.toll||0],
                    ["Loading Charges", t.expenses?.loading||0],
                    ["Unloading Charges", t.expenses?.unloading||0],
                    ["Agent Commission", t.agentCommission||0],
                    ["Misc / Others", t.expenses?.misc||0],
                  ]).map(([k,v])=>(
                    <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${T.border}18`, fontSize:13 }}>
                      <span style={{ color:T.textSub }}>{k}</span>
                      <span style={{ color:v>0?T.red:T.textMuted, fontFamily:"JetBrains Mono", fontSize:12 }}>{v>0?fmt(v):"—"}</span>
                    </div>
                  ))}
                  <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", fontSize:13, borderTop:`1px solid ${T.border}`, marginTop:4 }}>
                    <span style={{ fontWeight:700 }}>Total Expenses</span>
                    <span style={{ color:T.red, fontWeight:700, fontFamily:"JetBrains Mono", fontSize:13 }}>{fmt(totalExp)}</span>
                  </div>

                  <div style={{ background:profit>=0?T.greenGlow:T.redGlow, border:`1px solid ${profit>=0?T.green:T.red}44`, borderRadius:10, padding:"12px 16px", marginTop:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div>
                      <div style={{ fontSize:10, color:T.textMuted, textTransform:"uppercase", letterSpacing:".08em" }}>NET PROFIT / LOSS</div>
                      <div className="rj" style={{ fontSize:28, fontWeight:700, color:profit>=0?T.green:T.red, marginTop:2 }}>{fmt(profit)}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:10, color:T.textMuted, marginBottom:4 }}>Margin</div>
                      <div className="rj" style={{ fontSize:22, fontWeight:700, color:parseFloat(margin)>20?T.green:parseFloat(margin)>5?T.accent:T.red }}>{margin}%</div>
                    </div>
                  </div>
                </div>

                {/* Right: payment + settlement */}
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:12, padding:16 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:T.textSub, textTransform:"uppercase", letterSpacing:".08em", marginBottom:12 }}>💳 Payment Details</div>
                    {[
                      ["Payment Type", t.paymentType||"—"],
                      ["Advance Paid", fmt(t.advance||0)],
                      ["Balance Due", fmt(Math.max(0,t.freight-(t.advance||0)))],
                      ["Invoice Status", (t.status==="Invoiced"||t.status==="Closed")?"Invoiced ✓":"Pending"],
                      ["Credit Days", "30 days"],
                    ].map(([k,v])=>(
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${T.border}18`, fontSize:12 }}>
                        <span style={{ color:T.textMuted }}>{k}</span>
                        <span style={{ fontWeight:600 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  {isOwn&&(
                    <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:12, padding:16 }}>
                      <div style={{ fontSize:11, fontWeight:700, color:T.textSub, textTransform:"uppercase", letterSpacing:".08em", marginBottom:12 }}>🧾 Agent Commission</div>
                      {[
                        ["Agent Name", t.agent||"Direct"],
                        ["Commission Amount", t.agentCommission?fmt(t.agentCommission):"—"],
                        ["Commission %", t.agentCommission&&t.freight>0?`${((t.agentCommission/t.freight)*100).toFixed(1)}%`:"—"],
                        ["Paid Status", "Pending"],
                      ].map(([k,v])=>(
                        <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${T.border}18`, fontSize:12 }}>
                          <span style={{ color:T.textMuted }}>{k}</span>
                          <span style={{ fontWeight:600 }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {!isOwn&&(
                    <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:12, padding:16 }}>
                      <div style={{ fontSize:11, fontWeight:700, color:T.textSub, textTransform:"uppercase", letterSpacing:".08em", marginBottom:12 }}>🤝 Vendor P&L</div>
                      {[
                        ["Vendor Cost", fmt(t.vendorCost||0)],
                        ["Mobilization", t.vendorMobilization?fmt(t.vendorMobilization):"—"],
                        ["Rate/km", t.vendorRatePerKm?`₹${t.vendorRatePerKm}/km`:"—"],
                        ["Distance", t.distanceKm?`${t.distanceKm} km`:"—"],
                        ["Expected Cost", t.vendorRatePerKm&&t.distanceKm?fmt(t.vendorRatePerKm*t.distanceKm):"—"],
                      ].map(([k,v])=>(
                        <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${T.border}18`, fontSize:12 }}>
                          <span style={{ color:T.textMuted }}>{k}</span>
                          <span style={{ fontWeight:600, color:k==="Vendor Cost"?T.red:"inherit" }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:12, padding:16 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:T.textSub, textTransform:"uppercase", letterSpacing:".08em", marginBottom:12 }}>📊 Per-km Analysis</div>
                    {t.distanceKm&&t.distanceKm>0?[
                      ["Revenue/km", `₹${(t.freight/t.distanceKm).toFixed(0)}`],
                      ["Cost/km", `₹${(totalExp/t.distanceKm).toFixed(0)}`],
                      ["Profit/km", `₹${(profit/t.distanceKm).toFixed(0)}`],
                      ["Diesel/km", t.expenses?.diesel?`₹${(t.expenses.diesel/t.distanceKm).toFixed(0)}`:"—"],
                    ].map(([k,v])=>(
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${T.border}18`, fontSize:12 }}>
                        <span style={{ color:T.textMuted }}>{k}</span>
                        <span style={{ fontWeight:600 }}>{v}</span>
                      </div>
                    )):(
                      <div style={{ fontSize:12, color:T.textMuted }}>Distance not set</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── CARGO & DOCS TAB ─── */}
          {activeTab==="cargo"&&(
            <div>
              {/* Consignments */}
              <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:12, padding:16, marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:T.textSub, textTransform:"uppercase", letterSpacing:".08em" }}>
                    {t.revenueModel==="MATERIAL_SALE"?"⛏️ Material Sale Consignments":"📦 Consignments"} ({tripCons.length})
                  </div>
                  {t.revenueModel!=="TRANSPORT_ONLY"&&<button className="btn" style={{ fontSize:11, padding:"4px 10px", background:T.accentGlow, color:T.accent, border:`1px solid ${T.accent}33` }} onClick={()=>{setShowConsignmentForm(t.id);onClose();}}>+ Add</button>}
                </div>
                {tripCons.length===0?(
                  <div style={{ fontSize:12, color:T.textMuted, padding:"12px 0", textAlign:"center" }}>
                    {t.revenueModel==="TRANSPORT_ONLY"?"Single consignment trip — cargo details in Trip Info tab.":"No consignments added yet. Click + Add to begin."}
                  </div>
                ):(
                  <table className="tbl">
                    <thead><tr><th>ID</th><th>Consignee</th><th>Material</th><th>Qty</th><th>Rate</th><th>Revenue</th><th>Status</th></tr></thead>
                    <tbody>
                      {tripCons.map(c=>(
                        <tr key={c.id}>
                          <td className="mono" style={{ fontSize:10, color:T.accent }}>{c.id}</td>
                          <td style={{ fontSize:12 }}>{c.consignee||c.party||"—"}</td>
                          <td style={{ fontSize:12 }}>{c.material}</td>
                          <td style={{ fontSize:12 }}>{c.qty} {c.unit||"MT"}</td>
                          <td style={{ fontSize:12 }}>{c.rateType==="PER_TON"?`₹${c.rate}/T`:fmt(c.rate)}</td>
                          <td style={{ color:T.green, fontWeight:600 }}>{fmt(c.revenueAmount||c.freight||0)}</td>
                          <td><span className="badge" style={{ background:(c.status==="DELIVERED"||c.status==="BILLED"?T.green:c.status==="IN_TRANSIT"?T.blue:T.orange)+"22", color:c.status==="DELIVERED"||c.status==="BILLED"?T.green:c.status==="IN_TRANSIT"?T.blue:T.orange, fontSize:9 }}>{c.status}</span></td>
                        </tr>
                      ))}
                      <tr style={{ background:T.bgCard }}>
                        <td colSpan={5} style={{ fontSize:12, fontWeight:700, color:T.textSub }}>TOTAL</td>
                        <td style={{ color:T.accent, fontWeight:700 }}>{fmt(tripCons.reduce((s,c)=>s+(c.revenueAmount||c.freight||0),0))}</td>
                        <td/>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
              {/* Documents grid */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
                {[
                  { label:"Lorry Receipt (LR)", value:t.lrNumber||"Pending", color:T.blue, done:!!t.lrNumber, desc:"GR/LR number for consignment" },
                  { label:"Proof of Delivery", value:"Not Uploaded", color:T.orange, done:false, desc:"Signed POD from consignee" },
                  { label:"Invoice", value:(t.status==="Invoiced"||t.status==="Closed")?"Invoiced":"Not Raised", color:(t.status==="Invoiced"||t.status==="Closed")?T.green:T.textMuted, done:(t.status==="Invoiced"||t.status==="Closed"), desc:"GST tax invoice to client" },
                  { label:"E-way Bill", value:"Verify in Compliance", color:T.cyan, done:false, desc:"Required for goods 50km+" },
                ].map(d=>(
                  <div key={d.label} style={{ background:T.bgPanel, border:`1px solid ${d.done?d.color+"44":T.border}`, borderRadius:12, padding:14 }}>
                    <div style={{ fontSize:10, color:T.textMuted, textTransform:"uppercase", letterSpacing:".06em", marginBottom:4 }}>{d.label}</div>
                    <div style={{ fontSize:12, fontWeight:700, color:d.color, marginBottom:4 }}>{d.done?"✓ ":""}{d.value}</div>
                    <div style={{ fontSize:10, color:T.textMuted, marginBottom:10 }}>{d.desc}</div>
                    {!d.done&&<button className="btn" style={{ fontSize:10, padding:"3px 8px", width:"100%", background:d.color+"18", color:d.color, border:`1px solid ${d.color}33` }}>Upload / Action</button>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── OPERATIONS TAB ─── */}
          {activeTab==="ops"&&(
            <div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                {/* Live status */}
                <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:12, padding:16 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:T.textSub, textTransform:"uppercase", letterSpacing:".08em", marginBottom:12 }}>🗺️ Live Trip Status</div>
                  <div style={{ display:"flex", gap:12, marginBottom:12 }}>
                    <div style={{ background:T.bgCard, borderRadius:8, padding:"10px 14px", flex:1, textAlign:"center" }}>
                      <div style={{ fontSize:10, color:T.textMuted }}>Current Status</div>
                      <div style={{ fontSize:13, fontWeight:700, color:STATUS_COLORS[t.status]||T.accent, marginTop:2 }}>{t.status}</div>
                    </div>
                    <div style={{ background:T.bgCard, borderRadius:8, padding:"10px 14px", flex:1, textAlign:"center" }}>
                      <div style={{ fontSize:10, color:T.textMuted }}>Step</div>
                      <div style={{ fontSize:13, fontWeight:700, color:T.text, marginTop:2 }}>{statusIdx+1} / {statusSeq.length}</div>
                    </div>
                  </div>
                  <div style={{ background:T.bgCard, borderRadius:8, padding:"12px 14px", marginBottom:10 }}>
                    <div style={{ fontSize:10, color:T.textMuted, marginBottom:4 }}>Last Known Location</div>
                    <div style={{ fontSize:12, fontWeight:600 }}>{t.status==="In Transit"?`NH-44, enroute ${t.toCity||"destination"}`:`${t.status==="Closed"||t.status==="Invoiced"?t.toCity+"  — Delivered":t.fromCity+" — At Origin"}`}</div>
                    <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>Last ping: {t.status==="In Transit"?"2 min ago":t.status==="Closed"?"Trip ended":"—"}</div>
                  </div>
                  {t.distanceKm&&(
                    <div style={{ background:T.bgCard, borderRadius:8, padding:"12px 14px" }}>
                      <div style={{ fontSize:10, color:T.textMuted, marginBottom:6 }}>Trip Progress</div>
                      <div style={{ background:T.border, borderRadius:4, height:6, marginBottom:4, overflow:"hidden" }}>
                        <div style={{ height:"100%", borderRadius:4, background:T.green, width:`${Math.min(100,Math.round((statusIdx/(statusSeq.length-1))*100))}%` }}/>
                      </div>
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:T.textMuted }}>
                        <span>{t.fromCity||"Origin"}</span>
                        <span style={{ color:T.green, fontWeight:600 }}>{Math.round((statusIdx/(statusSeq.length-1))*100)}%</span>
                        <span>{t.toCity||"Destination"}</span>
                      </div>
                    </div>
                  )}
                </div>
                {/* Breakdown / incidents */}
                <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:12, padding:16 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:T.textSub, textTransform:"uppercase", letterSpacing:".08em", marginBottom:12 }}>⚠️ Incidents & Notes</div>
                  <div style={{ background:T.bgCard, borderRadius:8, padding:"12px 14px", marginBottom:10 }}>
                    <div style={{ fontSize:11, color:T.green }}>No active incidents</div>
                    <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>Trip running normally</div>
                  </div>
                  {t.notes&&(
                    <div style={{ background:T.accentGlow, border:`1px solid ${T.accent}33`, borderRadius:8, padding:"12px 14px" }}>
                      <div style={{ fontSize:10, color:T.textMuted, marginBottom:4, textTransform:"uppercase", letterSpacing:".06em" }}>Trip Notes</div>
                      <div style={{ fontSize:12, color:T.text }}>{t.notes}</div>
                    </div>
                  )}
                  {!t.notes&&(
                    <div style={{ background:T.bgCard, borderRadius:8, padding:"12px 14px" }}>
                      <div style={{ fontSize:11, color:T.textMuted }}>No trip notes added</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── ACTION FOOTER ── */}
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", paddingTop:16, marginTop:16, borderTop:`1px solid ${T.border}` }}>
            {t.status==="Pre-Trip Pending"&&<button className="btn btn-g" onClick={()=>{onClose();setShowInspect&&setShowInspect({trip:t,type:"pre"});}}><Ic n="pretrip" s={13}/> Pre-Trip Inspect</button>}
            {t.status==="Post-Trip Pending"&&<button className="btn btn-b" onClick={()=>{onClose();setShowInspect&&setShowInspect({trip:t,type:"post"});}}><Ic n="posttrip" s={13}/> Post-Trip Inspect</button>}
            {t.status==="In Transit"&&t.revenueModel&&isOwn&&(
              <button className="btn" style={{ background:T.green+"22", color:T.green, border:`1px solid ${T.green}33`, fontSize:11 }} onClick={()=>{onClose();setShowDeliveryConfirm(t);}}>✅ Confirm Delivery</button>
            )}
            {["Started","In Transit"].includes(t.status)&&<button className="btn btn-g" onClick={()=>setTrips&&setTrips(ts=>ts.map(x=>x.id===t.id?{...x,status:"Arrived"}:x))}><Ic n="check" s={13}/> Mark Arrived</button>}
            {t.status==="Arrived"&&<button className="btn btn-g" onClick={()=>setTrips&&setTrips(ts=>ts.map(x=>x.id===t.id?{...x,status:"Post-Trip Pending"}:x))}><Ic n="check" s={13}/> Mark Delivered</button>}
            {t.status==="Post-Trip Done"&&<button className="btn btn-c" onClick={()=>setTrips&&setTrips(ts=>ts.map(x=>x.id===t.id?{...x,status:"Invoiced"}:x))}><Ic n="finance" s={13}/> Raise Invoice</button>}
            <button className="btn btn-b"><Ic n="doc" s={13}/> Upload POD</button>
            {isOwn&&<button className="btn btn-o"><Ic n="wallet" s={13}/> Settle Driver</button>}
            <button className="btn" style={{ fontSize:11, padding:"5px 11px", background:T.bgPanel, border:`1px solid ${T.border}` }}>🖨️ Print Sheet</button>
            <button className="btn btn-gh" style={{ marginLeft:"auto" }} onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TRIPS_DATA = [
    { id:"TRP-2025-0041", revenueModel:"TRANSPORT_ONLY", vehicleType:"own", driver:"Mani Kumar", driverId:"DRV-001", vehicle:"TN69 GH4789", vendorVehicle:null, vendor:null, route:"Chennai → Coimbatore", fromCity:"Chennai", toCity:"Coimbatore", distanceKm:480, freight:42000, advance:20000, expenses:{ diesel:12000, toll:3000, loading:500, unloading:500, misc:500 }, status:"In Transit", agent:"Raja Broker", agentCommission:1200, loadType:"FTL", commodity:"Cement Bags", paymentType:"To Pay", customer:"Ramco Cements", dateCreated:"2025-04-10", startDate:"2025-04-10", weight:"18T", journeyType:"oneway", vehicleLabel:"Tripper · 16 Wheelers", driverRental:2500, cleanerName:"Suresh K", cleanerPhone:"9876543210", cleanerPay:1500, tripDuration:2, driverPayMode:"Cash", notes:"Deliver by EOD 12th. Contact site incharge." },
    { id:"TRP-2025-0042", revenueModel:"MATERIAL_SALE",     vehicleType:"own", driver:"Selvam R", driverId:"DRV-002", vehicle:"TN59 AB1234", vendorVehicle:null, vendor:null, route:"Madurai → Bangalore", fromCity:"Madurai", toCity:"Bangalore", distanceKm:440, freight:38000, advance:18000, expenses:{ diesel:11000, toll:2500, loading:500, unloading:500, misc:200 }, status:"Post-Trip Pending", agent:"Suresh Agency", loadType:"FTL", customer:"Godrej Industries", dateCreated:"2025-04-12", weight:"22T", journeyType:"roundtrip", vehicleLabel:"Open Body · 14 Wheelers" },
    { id:"TRP-2025-0043", revenueModel:"TRANSPORT_ONLY", vehicleType:"vendor", driver:"External Driver", driverId:null, vehicle:null, vendorVehicle:"TN32 XY7821", vendor:"Sri Murugan Transport", route:"Trichy → Mumbai", fromCity:"Trichy", toCity:"Mumbai", distanceKm:1280, freight:75000, advance:0, expenses:{ diesel:0, toll:5000, loading:1000, unloading:1000, misc:1000 }, vendorCost:53760, vendorMobilization:3500, vendorRatePerKm:42, status:"Pre-Trip Pending", agent:"Direct", agentCommission:0, loadType:"FTL", commodity:"Auto Parts", paymentType:"Paid", customer:"TVS Motors", dateCreated:"2025-04-13", startDate:"2025-04-14", weight:"28T", journeyType:"oneway", vehicleLabel:"Vendor Tripper", notes:"Confirm loading time with TVS Motors dispatch." },
    { id:"TRP-2025-0044", revenueModel:"MULTI_CONSIGNMENT", vehicleType:"own", driver:"Arjun D", driverId:"DRV-004", vehicle:"TN38 EF9012", vendorVehicle:null, vendor:null, route:"Salem → Hyderabad", fromCity:"Salem", toCity:"Hyderabad", distanceKm:520, freight:33000, advance:15000, expenses:{ diesel:9000, toll:2000, loading:400, unloading:400, misc:300 }, status:"Invoiced", agent:"Kumar Freight", loadType:"LTL", customer:"Pepsico India", dateCreated:"2025-04-14", weight:"12T", journeyType:"crossregion", vehicleLabel:"Flatbed · 12 Wheelers" },
    { id:"TRP-2025-0045", revenueModel:"TRANSPORT_ONLY",    vehicleType:"vendor", driver:"External Driver", driverId:null, vehicle:null, vendorVehicle:"TN58 AB1100", vendor:"KPR Fleet Solutions", route:"Coimbatore → Delhi", fromCity:"Coimbatore", toCity:"Delhi", distanceKm:2100, freight:92000, advance:0, expenses:{ diesel:0, toll:7000, loading:1500, unloading:1500, misc:500 }, vendorCost:92400, status:"Booked", agent:"Raja Broker", loadType:"FTL", customer:"Asian Paints", dateCreated:"2025-04-15", weight:"24T", journeyType:"dedicated", vehicleLabel:"Vendor Trailer" },
    { id:"TRP-2025-0046", revenueModel:"TRANSPORT_ONLY",    vehicleType:"own", driver:"Karthik M", driverId:"DRV-006", vehicle:"TN22 IJ7890", vendorVehicle:null, vendor:null, route:"Chennai → Pune", fromCity:"Chennai", toCity:"Pune", distanceKm:1200, freight:55000, advance:25000, expenses:{ diesel:14000, toll:4000, loading:800, unloading:800, misc:400 }, status:"Pre-Trip Done", agent:"Suresh Agency", loadType:"FTL", customer:"Raj Textiles", dateCreated:"2025-04-09", weight:"20T", journeyType:"multileg", vehicleLabel:"LCV · 4 Wheeler" },
    { id:"TRP-2025-0047", revenueModel:"TRANSPORT_ONLY",    vehicleType:"own", driver:"Mani Kumar", driverId:"DRV-001", vehicle:"TN71 GH3456", vendorVehicle:null, vendor:null, route:"Coimbatore → Hyderabad", fromCity:"Coimbatore", toCity:"Hyderabad", distanceKm:680, freight:47000, advance:22000, expenses:{ diesel:15000, toll:3500, loading:600, unloading:600, misc:400 }, status:"Closed", agent:"Raja Broker", loadType:"FTL", customer:"SKS Logistics", dateCreated:"2025-04-01", weight:"20T", journeyType:"oneway", vehicleLabel:"Container · 14 Wheeler" },
];

const TripsPage = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showInspect, setShowInspect] = useState(null);
  const [showTripDetail, setShowTripDetail] = useState(null);
  const [viewMode, setViewMode] = useState("kanban");
  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState("all");
  const [consignments, setConsignments] = useState(CONSIGNMENTS_INIT);
  const [showDeliveryConfirm, setShowDeliveryConfirm] = useState(null);
  const [showConsignmentForm, setShowConsignmentForm] = useState(null);
  const [showEqConfirm, setShowEqConfirm] = useState(null);
  const [showBusConfirm, setShowBusConfirm] = useState(null);

  const [trips, setTrips] = useState(TRIPS_DATA);

  const handleCreated = (trip) => setTrips(t => [trip, ...t]);
  const handleInspectionComplete = (tripId, type, checks, remarks, decision) => {
    setTrips(ts => ts.map(t => {
      if (t.id !== tripId) return t;
      if (type === "pre") return { ...t, status: decision==="maintenance"?"In Maintenance":"Pre-Trip Done" };
      return { ...t, status: decision==="approve"?"Post-Trip Done":decision==="maintenance"?"In Maintenance":"Invoiced" };
    }));
  };

  const filtered = trips.filter(t => {
    const matchSearch = t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.route.toLowerCase().includes(search.toLowerCase()) ||
      (t.customer||"").toLowerCase().includes(search.toLowerCase()) ||
      (t.vehicle||"").toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (filterTab==="own") return t.vehicleType==="own";
    if (filterTab==="vendor") return t.vehicleType==="vendor";
    if (filterTab==="active") return ["Pre-Trip Pending","Pre-Trip Done","Started","In Transit","Arrived","Post-Trip Pending"].includes(t.status);
    if (filterTab==="pending") return ["Pre-Trip Pending","Post-Trip Pending"].includes(t.status);
    return true;
  });

  const pendingInspections = trips.filter(t => t.status==="Pre-Trip Pending"||t.status==="Post-Trip Pending");

  return (
    <div>
      {showCreate && <TripGeneratorModal onClose={() => setShowCreate(false)} onCreated={handleCreated} />}
      {showInspect && <InspectionModal trip={showInspect.trip} type={showInspect.type} onClose={() => setShowInspect(null)} onComplete={handleInspectionComplete} />}
      {showDeliveryConfirm && (
        <TruckDeliveryConfirmModal
          trip={showDeliveryConfirm}
          consignments={consignments.filter(c=>c.tripId===showDeliveryConfirm.id)}
          onClose={()=>setShowDeliveryConfirm(null)}
          onConfirm={(dcForms)=>{
            setConsignments(cs=>cs.map(c=>dcForms[c.id]?{...c,...dcForms[c.id],status:"DELIVERED"}:c));
            setTrips(ts=>ts.map(t=>t.id===showDeliveryConfirm.id?{...t,status:"Post-Trip Pending"}:t));
          }}
        />
      )}
      {showConsignmentForm && (
        <ConsignmentForm
          tripId={showConsignmentForm.id}
          revenueModel={showConsignmentForm.revenueModel}
          onClose={()=>setShowConsignmentForm(null)}
          onAdd={(entries)=>{
            const newCsgs = entries.map((e,i)=>({ id:`CSG-${Date.now()}-${i}`, tripId:showConsignmentForm.id, revenueModel:showConsignmentForm.revenueModel, ...e, revenueAmount:e.rateType==="PER_TON"?parseFloat(e.qty||0)*parseFloat(e.rate||0):parseFloat(e.rate||0), status:"PENDING", podId:null, invoiceId:null, paidAmount:0, balanceDue:0 }));
            setConsignments(cs=>[...cs,...newCsgs]);
          }}
        />
      )}
      {showEqConfirm && (
        <EquipmentHoursConfirmModal
          eq={EQUIPMENT_DATA.find(e=>e.site===showEqConfirm.site)||EQUIPMENT_DATA[0]}
          contractId={showEqConfirm.linkedContractId||"EC-001"}
          onClose={()=>setShowEqConfirm(null)}
          onSave={(data)=>{ console.log("Eq hours logged:", data); }}
        />
      )}
      {showBusConfirm && (
        <BusTripConfirmModal
          bus={{ busNo:showBusConfirm.vehicle||"Bus" }}
          contractId={showBusConfirm.linkedContractId||"FC-006"}
          onClose={()=>setShowBusConfirm(null)}
          onSave={(data)=>{ setTrips(ts=>ts.map(t=>t.id===showBusConfirm.id?{...t,status:"Post-Trip Pending"}:t)); }}
        />
      )}

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Trip Management</h1>
          <p style={{ color:T.textSub, fontSize:12 }}>{trips.length} trips · ₹{trips.reduce((s,t)=>s+t.freight,0).toLocaleString()} freight · Own fleet + vendor vehicles</p>
        </div>
        <button className="btn btn-p" onClick={() => setShowCreate(true)}><Ic n="plus" s={14} c="#080B10" /> New Trip Booking</button>
      </div>

      {/* KPIs */}
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(5,1fr)", marginBottom:18 }}>
        {[
          { l:"Total Trips", v:trips.length, c:T.blue },
          { l:"Own Fleet", v:trips.filter(t=>t.vehicleType==="own").length, c:T.green },
          { l:"Vendor Trips", v:trips.filter(t=>t.vehicleType==="vendor").length, c:T.purple },
          { l:"Inspection Pending", v:pendingInspections.length, c:T.orange },
          { l:"Total Freight", v:"₹"+trips.reduce((s,t)=>s+t.freight,0).toLocaleString(), c:T.accent },
        ].map(k => <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>)}
      </div>

      {/* Lifecycle Bar */}
      <div className="lifecycle-bar">
        {TRIP_LIFECYCLE.map((ls, i) => {
          const count = trips.filter(t => t.status===ls).length;
          return (
            <div key={ls} className={`lc-step ${count>0?"active":""}`}>
              <div style={{ fontSize:9, color:count>0?T.accent:T.textMuted, fontWeight:600, letterSpacing:"0.04em" }}>{ls}</div>
              {count > 0 && <div className="rj" style={{ fontSize:16, fontWeight:700, color:T.accent }}>{count}</div>}
            </div>
          );
        })}
      </div>

      {/* Action Required Banner */}
      {pendingInspections.length > 0 && (
        <div className="card" style={{ marginBottom:14, border:`1px solid ${T.orange}44`, background:T.orangeGlow }}>
          <div className="section-title" style={{ color:T.orange }}>⚡ Inspection Action Required — {pendingInspections.length} trip(s)</div>
          {trips.filter(t=>t.status==="Pre-Trip Pending").map(t => (
            <div key={t.id} className="arow" style={{ borderLeftColor:T.green }}>
              <Ic n="pretrip" s={13} c={T.green} />
              <div style={{ flex:1 }}>
                <span className="mono" style={{ fontSize:12, color:T.accent }}>{t.id}</span>
                <span style={{ fontSize:12, color:T.textSub, marginLeft:10 }}>{t.route} · {t.vehicleType==="vendor"?t.vendor:t.vehicle} · {t.vehicleLabel}</span>
              </div>
              <button className="btn btn-g" style={{ fontSize:11 }} onClick={() => setShowInspect({ trip:t, type:"pre" })}>✅ Pre-Trip Inspect</button>
            </div>
          ))}
          {trips.filter(t=>t.status==="Post-Trip Pending").map(t => (
            <div key={t.id} className="arow" style={{ borderLeftColor:T.blue }}>
              <Ic n="posttrip" s={13} c={T.blue} />
              <div style={{ flex:1 }}>
                <span className="mono" style={{ fontSize:12, color:T.accent }}>{t.id}</span>
                <span style={{ fontSize:12, color:T.textSub, marginLeft:10 }}>{t.route} · {t.vehicle}</span>
              </div>
              <button className="btn btn-b" style={{ fontSize:11 }} onClick={() => setShowInspect({ trip:t, type:"post" })}>📋 Post-Trip Inspect</button>
            </div>
          ))}
        </div>
      )}

      {/* Search + View Toggle + Filter Tabs */}
      <div style={{ display:"flex", gap:10, marginBottom:14, alignItems:"center", flexWrap:"wrap" }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search trips, vehicle, customer…" style={{ width:260 }} />
        <div style={{ display:"flex", background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:8, overflow:"hidden" }}>
          {["kanban","list"].map(v => (
            <button key={v} onClick={()=>setViewMode(v)} className="btn" style={{ padding:"6px 14px", background:viewMode===v?T.accentGlow:"transparent", color:viewMode===v?T.accent:T.textSub, borderRadius:0, fontSize:12, textTransform:"capitalize" }}>{v}</button>
          ))}
        </div>
        <div className="toggle-pill">
          {["all","own","vendor","active","pending"].map(f => (
            <div key={f} className={`toggle-opt ${filterTab===f?"on":""}`} style={{ fontSize:11 }} onClick={()=>setFilterTab(f)}>{f.charAt(0).toUpperCase()+f.slice(1)}</div>
          ))}
        </div>
      </div>

      {/* KANBAN VIEW */}
      {viewMode === "kanban" && (
        <div style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:12 }}>
          {TRIP_LIFECYCLE.map(col => {
            const ct = filtered.filter(t => t.status===col);
            const jtype = JOURNEY_TYPES;
            return (
              <div key={col} className="kanban-col">
                <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", color:STATUS_COLORS[col]||T.textMuted, marginBottom:10, display:"flex", justifyContent:"space-between" }}>
                  {col} <span style={{ color:T.textSub }}>{ct.length}</span>
                </div>
                {ct.map(t => {
                  const jt = jtype.find(j => j.id===t.journeyType);
                  return (
                    <div key={t.id} className="kanban-card" onClick={() => setShowTripDetail(t)}>
                      {/* Revenue model badge */}
                      {t.revenueModel && (
                        <div style={{ display:"flex", gap:6, alignItems:"center", marginBottom:6 }}>
                          <span style={{ fontSize:9, background:REVENUE_MODELS[t.revenueModel]?.color+"22", color:REVENUE_MODELS[t.revenueModel]?.color, padding:"2px 7px", borderRadius:10, fontWeight:700 }}>
                            {REVENUE_MODELS[t.revenueModel]?.icon} {REVENUE_MODELS[t.revenueModel]?.label}
                          </span>
                          {consignments.filter(c=>c.tripId===t.id).length > 0 && (
                            <span style={{ fontSize:9, color:T.textMuted }}>· {consignments.filter(c=>c.tripId===t.id).length} consignment{consignments.filter(c=>c.tripId===t.id).length>1?"s":""}</span>
                          )}
                        </div>
                      )}
                      <div className="mono" style={{ fontSize:10, color:T.textMuted }}>{t.id}</div>
                      <div style={{ fontSize:12, fontWeight:600, margin:"4px 0" }}>{t.route}</div>
                      {jt && <div style={{ fontSize:10, color:jt.color, marginBottom:4 }}>{jt.icon} {jt.label}</div>}
                      <div style={{ display:"flex", gap:6, marginBottom:6, flexWrap:"wrap" }}>
                        <span className={`badge ${t.vehicleType==="own"?"bg":"bp"}`} style={{ fontSize:9 }}>{t.vehicleType==="own"?"Own":"Vendor"}</span>
                        <span className="badge bc" style={{ fontSize:9 }}>{t.loadType}</span>
                      </div>
                      <div style={{ fontSize:11, color:T.textSub, marginBottom:6 }}>{t.vehicleType==="own"?t.vehicle:t.vendor}</div>
                      {t.status === "Pre-Trip Pending" && (
                        <button className="btn btn-g" style={{ fontSize:11, padding:"4px 8px", width:"100%" }} onClick={e=>{e.stopPropagation();setShowInspect({trip:t,type:"pre"})}}>Pre-Trip Inspect</button>
                      )}
                      {t.status === "Post-Trip Pending" && (
                        <button className="btn btn-b" style={{ fontSize:11, padding:"4px 8px", width:"100%" }} onClick={e=>{e.stopPropagation();setShowInspect({trip:t,type:"post"})}}>Post-Trip Inspect</button>
                      )}
                      {!["Pre-Trip Pending","Post-Trip Pending"].includes(t.status) && (
                        <div style={{ display:"flex", justifyContent:"space-between" }}>
                          <span style={{ fontSize:11, color:T.accent, fontWeight:600 }}>₹{t.freight.toLocaleString()}</span>
                          <span style={{ fontSize:11, color:T.green }}>+₹{(t.freight-tripExpTotal(t.expenses)-(t.vendorCost||0)).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
                {ct.length === 0 && <div style={{ fontSize:11, color:T.textMuted, textAlign:"center", padding:"18px 0" }}>Empty</div>}
              </div>
            );
          })}
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === "list" && (
        <div className="card" style={{ padding:0 }}>
          <table className="tbl">
            <thead><tr><th>Trip ID</th><th>Type</th><th>Route</th><th>Journey</th><th>Vehicle/Vendor</th><th>Driver</th><th>Customer</th><th>Freight</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map(t => {
                const jt = JOURNEY_TYPES.find(j => j.id===t.journeyType);
                return (
                  <tr key={t.id} style={{ cursor:"pointer" }} onClick={()=>setShowTripDetail(t)}>
                    <td className="mono" style={{ fontSize:11, color:T.accent }}>{t.id}</td>
                    <td>{t.vehicleType==="own"?<span className="badge bg">Own</span>:<span className="badge bp">Vendor</span>}</td>
                    <td style={{ fontWeight:500, fontSize:12 }}>{t.route}</td>
                    <td>{jt && <span className="badge" style={{ background:jt.color+"20", color:jt.color, fontSize:10 }}>{jt.icon} {jt.tag}</span>}</td>
                    <td className="mono" style={{ fontSize:11 }}>{t.vehicleType==="own"?t.vehicle:t.vendor}</td>
                    <td style={{ fontSize:12 }}>{t.driver}</td>
                    <td style={{ fontSize:12 }}>{t.customer}</td>
                    <td style={{ color:T.green, fontWeight:600 }}>₹{t.freight.toLocaleString()}</td>
                    <td><span className="badge" style={{ background:(STATUS_COLORS[t.status]||T.textSub)+"22", color:STATUS_COLORS[t.status]||T.textSub }}>{t.status}</span></td>
                    <td onClick={e=>e.stopPropagation()}>
                      {t.status==="Pre-Trip Pending" && <button className="btn btn-g" style={{ fontSize:11, padding:"4px 8px" }} onClick={()=>setShowInspect({trip:t,type:"pre"})}>Pre-Trip</button>}
                      {t.status==="Post-Trip Pending" && <button className="btn btn-b" style={{ fontSize:11, padding:"4px 8px" }} onClick={()=>setShowInspect({trip:t,type:"post"})}>Post-Trip</button>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Trip Detail Modal */}
      {/* ── TRIP SHEET MODAL ─────────────────────────────────────────────── */}
      {showTripDetail && <TripDetailModal t={showTripDetail} consignments={consignments} setConsignments={setConsignments} onClose={()=>setShowTripDetail(null)} setShowDeliveryConfirm={setShowDeliveryConfirm} setShowConsignmentForm={setShowConsignmentForm} setShowEqConfirm={setShowEqConfirm} setShowBusConfirm={setShowBusConfirm} setShowInspect={setShowInspect} setTrips={setTrips} />}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PRE-TRIP PAGE — full v2 layout
// ═══════════════════════════════════════════════════════════════════════════════
const PreTripPage = () => {
  const [trips] = useState([
    {id:"TRP-2025-0043",vehicle:"TN32 XY7821",driver:"External",route:"Trichy→Mumbai",status:"Pre-Trip Pending"},
    {id:"TRP-2025-0046",vehicle:"TN22 IJ7890",driver:"Karthik M",route:"Chennai→Pune",status:"Pre-Trip Pending"},
  ]);
  const [sel,setSel]=useState(null);
  const [checks,setChecks]=useState({});
  const CHECKS=["Engine Oil","Coolant","Brakes","Tyres","Lights","Horn","Fuel","Documents","Fire Extinguisher","First Aid Kit"];
  const allDone=CHECKS.every(c=>checks[c]);
  return (
    <div>
      <div style={{ marginBottom:20 }}><h1 className="rj" style={{ fontSize:28,fontWeight:700 }}>Pre-Trip Inspection</h1><p style={{ color:T.textSub,fontSize:12 }}>Mandatory safety checks before vehicle dispatch</p></div>
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(3,1fr)",marginBottom:18 }}>
        {[{l:"Pending",v:trips.length,c:T.orange},{l:"CHECKS",v:CHECKS.length,c:T.blue},{l:"Compliance",v:"100%",c:T.green}].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>
        ))}
      </div>
      {trips.map(t=>(
        <div key={t.id} className="card" style={{ marginBottom:10,border:`1px solid ${T.orange}33` }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <div>
              <div className="mono" style={{ fontSize:11,color:T.accent }}>{t.id}</div>
              <div style={{ fontSize:13,fontWeight:600 }}>{t.vehicle} — {t.route}</div>
              <div style={{ fontSize:11,color:T.textSub }}>Driver: {t.driver}</div>
            </div>
            <button className="btn btn-g" style={{ fontSize:12 }} onClick={()=>{setSel(t);setChecks({});}}>✅ Start Inspection</button>
          </div>
        </div>
      ))}
      {sel&&<div className="ov"><div className="modal" style={{ maxWidth:500 }}>
        <div className="mhdr" style={{ background:"linear-gradient(135deg,#052E16,#064E3B)",borderBottom:`1px solid ${T.green}33` }}>
          <div className="rj" style={{ fontSize:16,fontWeight:700,color:T.green }}>✅ Pre-Trip — {sel.vehicle}</div>
          <button className="btn" style={{ padding:"5px 9px" }} onClick={()=>setSel(null)}><Ic n="x" s={14} c={T.textSub}/></button>
        </div>
        <div className="mbdy">
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
            {CHECKS.map(c=>(
              <label key={c} style={{ display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:checks[c]?T.green+"11":T.bgPanel,border:`1px solid ${checks[c]?T.green:T.border}`,borderRadius:8,cursor:"pointer",fontSize:12 }}>
                <input type="checkbox" checked={!!checks[c]} onChange={e=>setChecks(x=>({...x,[c]:e.target.checked}))} style={{ accentColor:T.green }}/>
                {c}
              </label>
            ))}
          </div>
          <div style={{ marginTop:12,padding:"8px 10px",background:T.bgPanel,borderRadius:8,fontSize:12 }}>
            Progress: {Object.values(checks).filter(Boolean).length}/{CHECKS.length} checks completed
          </div>
        </div>
        <div className="mftr">
          <button className="btn btn-gh" onClick={()=>setSel(null)}>Cancel</button>
          <button className="btn" style={{ background:allDone?T.green:T.bgPanel,color:allDone?"#080B10":T.textMuted,fontWeight:700 }} disabled={!allDone} onClick={()=>setSel(null)}>✅ Complete Inspection</button>
        </div>
      </div></div>}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// POST-TRIP PAGE — full v2 layout
// ═══════════════════════════════════════════════════════════════════════════════
const PostTripPage = () => {
  const [trips] = useState([
    {id:"TRP-2025-0042",vehicle:"TN59 AB1234",driver:"Selvam R",route:"Madurai→Bangalore",freight:38000,expenses:16700,status:"Post-Trip Pending"},
  ]);
  const [sel,setSel]=useState(null);
  const [checks,setChecks]=useState({});
  const CHECKS=["Body Damage Check","Tyre Condition","Engine Status","Fuel Level","Odometer Reading","Cargo Cleared","Documents Returned","Cash Settlement","Toll Receipts","Driver Debriefing"];
  const allDone=CHECKS.every(c=>checks[c]);
  return (
    <div>
      <div style={{ marginBottom:20 }}><h1 className="rj" style={{ fontSize:28,fontWeight:700 }}>Post-Trip Inspection</h1><p style={{ color:T.textSub,fontSize:12 }}>Vehicle health check after trip completion</p></div>
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(3,1fr)",marginBottom:18 }}>
        {[{l:"Pending",v:trips.length,c:T.blue},{l:"Checks",v:CHECKS.length,c:T.accent},{l:"Settled Today",v:"₹0",c:T.green}].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>
        ))}
      </div>
      {trips.map(t=>(
        <div key={t.id} className="card" style={{ marginBottom:10,border:`1px solid ${T.blue}33` }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <div>
              <div className="mono" style={{ fontSize:11,color:T.accent }}>{t.id}</div>
              <div style={{ fontSize:13,fontWeight:600 }}>{t.vehicle} — {t.route}</div>
              <div style={{ fontSize:11,color:T.textSub }}>Driver: {t.driver} · Freight: ₹{t.freight.toLocaleString()} · Expenses: ₹{t.expenses.toLocaleString()}</div>
            </div>
            <button className="btn btn-b" style={{ fontSize:12 }} onClick={()=>{setSel(t);setChecks({});}}>📋 Start Post-Trip</button>
          </div>
        </div>
      ))}
      {sel&&<div className="ov"><div className="modal" style={{ maxWidth:500 }}>
        <div className="mhdr" style={{ background:"linear-gradient(135deg,#0D1428,#1A2A5E)",borderBottom:`1px solid ${T.blue}33` }}>
          <div className="rj" style={{ fontSize:16,fontWeight:700,color:T.blue }}>📋 Post-Trip — {sel.vehicle}</div>
          <button className="btn" style={{ padding:"5px 9px" }} onClick={()=>setSel(null)}><Ic n="x" s={14} c={T.textSub}/></button>
        </div>
        <div className="mbdy">
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12 }}>
            {CHECKS.map(c=>(
              <label key={c} style={{ display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:checks[c]?T.blue+"11":T.bgPanel,border:`1px solid ${checks[c]?T.blue:T.border}`,borderRadius:8,cursor:"pointer",fontSize:12 }}>
                <input type="checkbox" checked={!!checks[c]} onChange={e=>setChecks(x=>({...x,[c]:e.target.checked}))} style={{ accentColor:T.blue }}/>
                {c}
              </label>
            ))}
          </div>
          <div style={{ padding:"8px 10px",background:T.bgPanel,borderRadius:8 }}>
            <div style={{ display:"flex",justifyContent:"space-between",fontSize:12 }}>
              <span>Net Settlement:</span>
              <span style={{ color:T.green,fontWeight:700 }}>₹{(sel.freight-sel.expenses).toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="mftr">
          <button className="btn btn-gh" onClick={()=>setSel(null)}>Cancel</button>
          <button className="btn" style={{ background:allDone?T.blue:T.bgPanel,color:allDone?"#fff":T.textMuted,fontWeight:700 }} disabled={!allDone} onClick={()=>setSel(null)}>📋 Complete Post-Trip</button>
        </div>
      </div></div>}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ALL OTHER MODULES (carried from v4)
// ═══════════════════════════════════════════════════════════════════════════════
const VendorPage = () => {
  const [tab, setTab] = useState("vendors");
  const [sel, setSel] = useState(null);
  return (
    <div>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20 }}>
        <div><h1 className="rj" style={{ fontSize:28,fontWeight:700 }}>Vendor Fleet</h1><p style={{ color:T.textSub,fontSize:12 }}>KYC · Rate contracts · Vehicle pool · Performance</p></div>
        <button className="btn btn-p">+ Onboard Vendor</button>
      </div>
      <div className="kpi-row kpi4" style={{ marginBottom:18 }}>
        {[{ l:"Active Vendors",v:VENDORS.length,c:T.green },{ l:"Vendor Vehicles",v:VENDOR_VEHICLES.length,c:T.blue },{ l:"Available Now",v:VENDOR_VEHICLES.filter(v=>v.status==="Available").length,c:T.cyan },{ l:"Vendor Trips",v:2,c:T.purple }].map(k=><div key={k.l} className="stat"><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>)}
      </div>
      <div className="tabs">{["vendors","vehicles","rates"].map(t=><div key={t} className={`tab ${tab===t?"on":""}`} onClick={()=>setTab(t)} style={{ textTransform:"capitalize" }}>{t}</div>)}</div>
      {tab==="vendors"&&<div className="grd2">
        {VENDORS.map(v=>(
          <div key={v.id} className="card" style={{ cursor:"pointer" }} onClick={()=>setSel(v)}>
            <div style={{ display:"flex",justifyContent:"space-between",marginBottom:10 }}>
              <div><div style={{ fontWeight:700,fontSize:14 }}>{v.name}</div><div style={{ fontSize:11,color:T.textSub }}>{v.contact} · {v.city}</div></div>
              <div style={{ textAlign:"right" }}><div className="rj" style={{ fontSize:20,fontWeight:700,color:T.accent }}>★ {v.rating}</div><span className="badge bg">Active</span></div>
            </div>
            <div style={{ display:"flex",gap:16,fontSize:12,color:T.textSub }}>
              <div><span style={{ color:T.blue,fontWeight:600 }}>{v.vehicles}</span> vehicles</div>
              <div><span style={{ color:T.green,fontWeight:600 }}>{v.totalTrips}</span> trips</div>
              <div><span style={{ color:T.purple,fontWeight:600 }}>₹{v.ratePerKm}/km</span></div>
              <div><span className="badge bg">KYC ✓</span></div>
            </div>
          </div>
        ))}
      </div>}
      {tab==="vehicles"&&<div className="card" style={{ padding:0 }}>
        <table className="tbl">
          <thead><tr><th>Vehicle No</th><th>Vendor</th><th>Model</th><th>Type</th><th>Rate/km</th><th>Status</th><th></th></tr></thead>
          <tbody>{VENDOR_VEHICLES.map(v=>(
            <tr key={v.id}>
              <td className="mono" style={{ fontSize:11,color:T.purple }}>{v.num}</td>
              <td>{v.vendor}</td><td>{v.model}</td>
              <td><span className="badge bb">{v.type}</span></td>
              <td style={{ fontWeight:600,color:T.accent }}>₹{v.ratePerKm}/km</td>
              <td><span className={`badge ${v.status==="Available"?"bg":"bo"}`}>{v.status}</span></td>
              <td><button className="btn btn-p" style={{ fontSize:10,padding:"3px 10px" }}>Assign Trip</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>}
      {tab==="rates"&&<div className="card">
        <div className="section-title">Rate Comparison</div>
        <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
          {[{ label:"Own Fleet (est.)",cost:"₹52,480",color:T.green,rec:true },...VENDORS.map(v=>({ label:v.name,cost:fmt(v.ratePerKm*1280),color:T.purple,rec:false }))].map((opt,i)=>(
            <div key={i} style={{ flex:1,minWidth:120,background:T.bgPanel,border:`1px solid ${opt.color}33`,borderRadius:10,padding:14,textAlign:"center" }}>
              <div style={{ fontSize:11,color:T.textMuted,marginBottom:4 }}>{opt.label}</div>
              <div className="rj" style={{ fontSize:22,fontWeight:700,color:opt.color }}>{opt.cost}</div>
              {opt.rec&&<div style={{ marginTop:8 }}><span className="badge bg">Recommended</span></div>}
            </div>
          ))}
        </div>
      </div>}
      {sel&&(<div className="ov"><div className="modal" style={{ maxWidth:500 }}>
        <div className="mhdr" style={{ background:"linear-gradient(135deg,#2E1065,#4C1D95)" }}>
          <div className="rj" style={{ fontSize:18,fontWeight:700,color:"#fff" }}>{sel.name}</div>
          <button className="btn" style={{ background:"rgba(255,255,255,.1)",color:"#fff",padding:"5px 9px" }} onClick={()=>setSel(null)}><Ic n="x" s={14} c="#fff"/></button>
        </div>
        <div className="mbdy">
          <div className="grd3" style={{ marginBottom:14 }}>
            {[{ l:"Rating",v:`★ ${sel.rating}`,c:T.accent },{ l:"Trips",v:sel.totalTrips,c:T.blue },{ l:"Freight",v:fmt(sel.totalFreight),c:T.green }].map(k=>(
              <div key={k.l} style={{ background:T.bgPanel,borderRadius:8,padding:"10px 12px" }}><div style={{ fontSize:10,color:T.textMuted }}>{k.l}</div><div className="rj" style={{ fontSize:16,fontWeight:700,color:k.c }}>{k.v}</div></div>
            ))}
          </div>
          <div style={{ display:"flex",gap:8 }}><button className="btn btn-p">Create Trip</button><button className="btn btn-gh" onClick={()=>setSel(null)}>Close</button></div>
        </div>
      </div></div>)}
    </div>
  );
};
// ═══════════════════════════════════════════════════════════════════════════════
// WORKSHOP & MAINTENANCE — AI WORK ORDER INTELLIGENCE SYSTEM v2
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Extended Work Order Seed Data ───────────────────────────────────────────
const WO_DATA_INIT = [
  { id:"WO-001", vehicle:"TN45 CD5678", workshop:"Ganesh Auto Works, Nagpur", workshopType:"Mechanical", type:"Corrective", category:"Engine", subCategory:"Cooling System", source:"Breakdown", priority:"CRITICAL", issue:"Engine overheating during long haul — radiator hose burst", odometer:124000, status:"In Progress", waitReason:null, created:"2025-04-10", approvedBy:"Fleet Manager", approvalLevel:"Manager", estimatedCost:9500, partsUsed:[{name:"Radiator Hose",qty:1,unitCost:2800,total:2800},{name:"Coolant 5L",qty:2,unitCost:600,total:1200}], labourCost:4500, totalCost:8500, invoiceStatus:"Pending", breakdownRef:"BRK-001", duplicateFlag:false, aiCostDeviation:null, gstAmount:1530 },
  { id:"WO-002", vehicle:"TN59 AB1234", workshop:"Power Electricals, Chennai", workshopType:"Electrical", type:"Corrective", category:"Electrical", subCategory:"Charging System", source:"AI Prediction", priority:"HIGH", issue:"Battery not charging — alternator fault predicted by AI 3 days before failure", odometer:92340, status:"Open", waitReason:"Waiting for Parts", created:"2025-04-14", approvedBy:"Auto-Approved", approvalLevel:"Auto", estimatedCost:11500, partsUsed:[{name:"Alternator",qty:1,unitCost:8500,total:8500}], labourCost:2500, totalCost:11000, invoiceStatus:"Pending", breakdownRef:null, duplicateFlag:false, aiCostDeviation:null, gstAmount:1980 },
  { id:"WO-003", vehicle:"TN69 GH4789", workshop:"Sri Ram Tyre Centre, Chennai", workshopType:"Tyre", type:"Preventive", category:"Tyre System", subCategory:"Rotation & Alignment", source:"Scheduled", priority:"LOW", issue:"Scheduled tyre rotation & wheel alignment at 74,000 km mark", odometer:74875, status:"Completed", waitReason:null, created:"2025-04-08", approvedBy:"Auto-Approved", approvalLevel:"Auto", estimatedCost:2200, partsUsed:[{name:"Alignment",qty:1,unitCost:800,total:800}], labourCost:1200, totalCost:2000, invoiceStatus:"Paid", breakdownRef:null, duplicateFlag:false, aiCostDeviation:null, gstAmount:360 },
  { id:"WO-004", vehicle:"TN45 CD5678", workshop:"Ganesh Auto Works, Nagpur", workshopType:"Mechanical", type:"Corrective", category:"Engine", subCategory:"Cooling System", source:"Inspection", priority:"HIGH", issue:"Radiator leak — REPEAT ISSUE (same vehicle, same system, 20 days apart)", odometer:124800, status:"Open", waitReason:null, created:"2025-04-14", approvedBy:"Pending", approvalLevel:"Senior", estimatedCost:18000, partsUsed:[], labourCost:0, totalCost:0, invoiceStatus:"Pending", breakdownRef:null, duplicateFlag:true, aiCostDeviation:null, gstAmount:0 },
  { id:"WO-005", vehicle:"TN38 EF9012", workshop:"BharatBenz Service, Hyderabad", workshopType:"Mechanical", type:"Preventive", category:"Brake System", subCategory:"Brake Pads", source:"Scheduled", priority:"MEDIUM", issue:"Brake pad replacement — front axle at 54,000 km scheduled service", odometer:54220, status:"Completed", waitReason:null, created:"2025-04-06", approvedBy:"Auto-Approved", approvalLevel:"Auto", estimatedCost:7000, partsUsed:[{name:"Brake Pads (Front Axle Set)",qty:1,unitCost:6500,total:6500}], labourCost:1200, totalCost:7700, invoiceStatus:"Paid", breakdownRef:null, duplicateFlag:false, aiCostDeviation:10, gstAmount:1386 },
];

// ─── AI Classification Engine ─────────────────────────────────────────────────
const ISSUE_CATEGORIES = {
  "Engine": { sub:["Overheating","Oil Leak","Engine Noise","Starting Issue","Power Loss","Turbo Fault"], icon:"🔧", color:"#EF4444", workshop:"Mechanical Workshop" },
  "Electrical": { sub:["Battery","Alternator","Wiring Fault","ECU Error","Sensor Failure","Lighting"], icon:"⚡", color:"#F59E0B", workshop:"Electrical Workshop" },
  "Tyre System": { sub:["Rotation","Alignment","Puncture Repair","Tyre Burst","Balancing"], icon:"🛞", color:"#3B82F6", workshop:"Tyre Shop" },
  "Brake System": { sub:["Brake Pads","Air Brake","ABS Fault","Brake Drum","Brake Fluid"], icon:"🛑", color:"#8B5CF6", workshop:"Mechanical Workshop" },
  "Gearbox": { sub:["Clutch Replacement","Gear Oil","Gear Slip","Differential","Transmission Noise"], icon:"⚙️", color:"#F97316", workshop:"Specialized Workshop" },
  "Suspension": { sub:["Shock Absorbers","Leaf Spring","Steering","Axle","Ball Joint"], icon:"🔩", color:"#06B6D4", workshop:"Mechanical Workshop" },
  "Cooling System": { sub:["Radiator","Coolant Flush","Water Pump","Thermostat","Fan Belt"], icon:"🌡️", color:"#10B981", workshop:"Mechanical Workshop" },
  "Body & Cabin": { sub:["Denting","Painting","Windshield","Door","Bumper"], icon:"🪵", color:"#94A3B8", workshop:"Body Shop" },
};

const WORKSHOP_VENDORS = [
  { id:"WV-001", name:"Ganesh Auto Works",      city:"Nagpur",   type:"Mechanical",  rating:4.3, avgTAT:"1.5 days", costIndex:0.9,  distance:3,  speciality:"Engine & Gearbox" },
  { id:"WV-002", name:"Power Electricals",       city:"Chennai",  type:"Electrical",  rating:4.6, avgTAT:"0.5 days", costIndex:1.0,  distance:8,  speciality:"ECU, Alternator, Wiring" },
  { id:"WV-003", name:"Sri Ram Tyre Centre",     city:"Chennai",  type:"Tyre",        rating:4.2, avgTAT:"0.3 days", costIndex:0.85, distance:5,  speciality:"Alignment, Rotation, Balancing" },
  { id:"WV-004", name:"BharatBenz Service",      city:"Hyderabad",type:"Mechanical",  rating:4.7, avgTAT:"2 days",   costIndex:1.2,  distance:12, speciality:"OEM authorized, all systems" },
  { id:"WV-005", name:"Chennai Body Works",      city:"Chennai",  type:"Body Shop",   rating:4.1, avgTAT:"3 days",   costIndex:1.0,  distance:10, speciality:"Denting, painting, cabin" },
  { id:"WV-006", name:"Singh Gear Specialists",  city:"Delhi",    type:"Specialized", rating:4.8, avgTAT:"1 day",    costIndex:1.3,  distance:28, speciality:"Gearbox rebuild, differential" },
];

const WO_STATUS_PIPELINE = [
  { id:"Created",             color:"#94A3B8", icon:"📋" },
  { id:"Pending Approval",    color:"#F59E0B", icon:"⏳" },
  { id:"Approved",            color:"#3B82F6", icon:"✅" },
  { id:"Sent to Workshop",    color:"#8B5CF6", icon:"📤" },
  { id:"In Progress",         color:"#F97316", icon:"🔧" },
  { id:"Waiting for Parts",   color:"#EF4444", icon:"📦" },
  { id:"Pending Approval (Cost Overrun)",color:"#EF4444",icon:"⚠️" },
  { id:"Completed",           color:"#10B981", icon:"✅" },
];

// AI Cost Prediction Engine
function aiCostPredict(category, subCategory, vehicleKm) {
  const baseCosts = {
    "Engine":        { parts:8000, labour:4000 },
    "Electrical":    { parts:6000, labour:2500 },
    "Tyre System":   { parts:2000, labour:1200 },
    "Brake System":  { parts:6500, labour:1500 },
    "Gearbox":       { parts:14000, labour:5000 },
    "Suspension":    { parts:5000, labour:2500 },
    "Cooling System":{ parts:3500, labour:2000 },
    "Body & Cabin":  { parts:4000, labour:6000 },
  };
  const base = baseCosts[category] || { parts:5000, labour:2500 };
  const ageFactor = vehicleKm > 100000 ? 1.2 : vehicleKm > 50000 ? 1.0 : 0.9;
  const parts = Math.round(base.parts * ageFactor);
  const labour = base.labour;
  const total = parts + labour;
  const gst = Math.round(total * 0.18);
  return { parts, labour, total, gst, confidence: vehicleKm > 100000 ? "high" : "medium" };
}

// Duplicate check engine
function checkDuplicate(vehicle, category, existingWOs) {
  const recent = existingWOs.filter(wo =>
    wo.vehicle === vehicle &&
    wo.category === category &&
    wo.status !== "Cancelled"
  );
  if (recent.length === 0) return null;
  const last = recent[recent.length - 1];
  const daysDiff = Math.floor((new Date() - new Date(last.created)) / 86400000);
  if (daysDiff < 30) return { flag:true, lastWO:last.id, daysDiff, warning:`Same category repaired ${daysDiff} days ago. Root cause analysis required.` };
  return null;
}

// Approval level logic
function getApprovalLevel(estimatedCost) {
  if (estimatedCost < 5000)  return { level:"Auto", approver:"System Auto-Approved", badge:"bg" };
  if (estimatedCost < 20000) return { level:"Manager", approver:"Fleet Manager approval required", badge:"ba" };
  return                             { level:"Senior", approver:"Senior / Owner approval required", badge:"br" };
}

// ─── Create Work Order Wizard ─────────────────────────────────────────────────
const CreateWOWizard = ({ prefill, onClose, onSave }) => {
  const [f,sf]=useState({vehicleNo:prefill?.vehicle||"",issue:"",category:"Engine",vendor:"",estimatedCost:""});
  const rf=(k,v)=>sf(x=>({...x,[k]:v}));
  return (<div className="ov"><div className="modal" style={{ maxWidth:480 }}>
    <div className="mhdr" style={{ background:"linear-gradient(135deg,#1C0000,#3D1000)",borderBottom:`1px solid ${T.orange}33` }}>
      <div className="rj" style={{ fontSize:18,fontWeight:700,color:T.orange }}>🔧 Create Work Order</div>
      <button className="btn" style={{ padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub}/></button>
    </div>
    <div className="mbdy">
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10 }}>
        <div><label className="flabel">Vehicle</label><select value={f.vehicleNo} onChange={e=>rf("vehicleNo",e.target.value)}><option value="">Select</option>{(FLEET_DATA||[]).map(v=><option key={v.id}>{v.num}</option>)}</select></div>
        <div><label className="flabel">Category</label><select value={f.category} onChange={e=>rf("category",e.target.value)}>{["Engine","Brakes","Electrical","Tyres","Body","AC","Gearbox","Suspension"].map(c=><option key={c}>{c}</option>)}</select></div>
      </div>
      <div style={{ marginBottom:10 }}><label className="flabel">Issue *</label><textarea value={f.issue} onChange={e=>rf("issue",e.target.value)} placeholder="Describe the problem..." style={{ height:60 }}/></div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
        <div><label className="flabel">Workshop</label><input value={f.vendor} onChange={e=>rf("vendor",e.target.value)}/></div>
        <div><label className="flabel">Est. Cost (₹)</label><input value={f.estimatedCost} onChange={e=>rf("estimatedCost",e.target.value)}/></div>
      </div>
      <div style={{ display:"flex",justifyContent:"flex-end",gap:8,marginTop:14 }}>
        <button className="btn btn-gh" onClick={onClose}>Cancel</button>
        <button className="btn btn-p" onClick={()=>{onSave&&onSave({id:`WO-${Date.now()}`,...f,status:"Open",createdAt:new Date().toISOString()});onClose();}}>✅ Create WO</button>
      </div>
    </div>
  </div></div>);
};
// ─── WO Detail Panel ──────────────────────────────────────────────────────────
const WODetailPanel = ({ wo, onClose }) => (
  <div className="ov"><div className="modal" style={{ maxWidth:500 }}>
    <div className="mhdr" style={{ background:"linear-gradient(135deg,#1C0000,#3D1000)",borderBottom:`1px solid ${T.orange}33` }}>
      <div className="rj" style={{ fontSize:16,fontWeight:700,color:T.orange }}>🔧 {wo?.id||"WO"}</div>
      <button className="btn" style={{ padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub}/></button>
    </div>
    <div className="mbdy">
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12 }}>
        {[["Vehicle",wo?.vehicle||wo?.vehicleNo||"—"],["Category",wo?.category||"—"],["Status",wo?.status||"Open"],["Cost","₹"+(wo?.totalCost||wo?.estimatedCost||0).toLocaleString()],["Workshop",wo?.workshop||"—"],["Priority",wo?.priority||"Normal"]].map(([l,v])=>(
          <div key={l} style={{ background:T.bgPanel,borderRadius:7,padding:"7px 10px" }}><div style={{ fontSize:9,color:T.textMuted }}>{l}</div><div style={{ fontSize:12,fontWeight:600,marginTop:2 }}>{v}</div></div>
        ))}
      </div>
      {wo?.issue&&<div style={{ fontSize:11,color:T.textSub,background:T.bgPanel,borderRadius:7,padding:10,marginBottom:10 }}>{wo.issue}</div>}
      <div style={{ display:"flex",gap:8,justifyContent:"flex-end" }}><button className="btn btn-gh" onClick={onClose}>Close</button></div>
    </div>
  </div></div>
);
// ─── Main Workshop Page ───────────────────────────────────────────────────────


// ═══════════════════════════════════════════════════════════════════════════════
// PREVENTIVE MAINTENANCE SETTINGS ENGINE
// Per-vehicle-type service intervals, grease packing, oil change, brake, consumables
// Research-backed intervals from Tata PRIMA service manual + industry standards
// ═══════════════════════════════════════════════════════════════════════════════

// ─── PM Task Categories ───────────────────────────────────────────────────────
const PM_CATEGORIES = {
  grease:    { label:"Grease & Lubrication", icon:"🟡", color:"#F59E0B", desc:"Grease packing, nipple lubrication, bearing repacking, leaf spring greasing" },
  engine_oil:{ label:"Engine Oil & Fluids",  icon:"🛢️", color:"#3B82F6", desc:"Engine oil change, oil filter, gearbox oil, differential oil, power steering" },
  brake:     { label:"Brake System",         icon:"🔴", color:"#EF4444", desc:"Brake pads/shoes, brake drums, brake fluid, slack adjusters, brake lining" },
  cooling:   { label:"Cooling System",       icon:"🔵", color:"#06B6D4", desc:"Coolant flush, radiator, thermostat, water pump, hoses" },
  filter:    { label:"Filters",              icon:"⬜", color:"#94A3B8", desc:"Air filter, fuel filter, oil filter, AC filter replacement" },
  electrical:{ label:"Electrical",           icon:"⚡", color:"#8B5CF6", desc:"Battery check, alternator, wiring, lights, sensors" },
  drivetrain:{ label:"Drivetrain",           icon:"⚙️", color:"#10B981", desc:"Clutch, gearbox, propeller shaft, axle, wheel bearing" },
  body:      { label:"Body & Structure",     icon:"🚛", color:"#6366F1", desc:"Chassis bolts, body mounting, cab tilt, fifth wheel" },
  consumable:{ label:"Consumables",          icon:"📦", color:"#F97316", desc:"Wiper blades, belts, bulbs, cabin air filter" },
};

// ─── Grease packing master — all grease points per lorry type ─────────────────
// Source: Tata PRIMA SC/2019/56 service manual + industry best practice
const GREASE_PACKING_MASTER = {
  // task_id: { label, category, grease_type, quantity_grams, interval_km, interval_months, interval_hours, procedure, stock_item, notes }
  "GP-001": { label:"Front Wheel Hub Bearing — Re-pack",       cat:"grease", greaseType:"Lithium Complex EP2 / Shell Gadus S3 V220C",    qty:250, intervalKm:40000, intervalMonths:12, intervalHrs:1000, procedure:"Remove hub, dismantle, clean with solvent, inspect bearings for pitting, re-pack rollers by hand, fill hub cavity 1/3 full, replace seal, reassemble, adjust hub play", notes:"Critical — overheating/noise = bearing failure. Monthly inspection for HCV. Replace bearings in pairs." },
  "GP-002": { label:"Rear Hub Bearing — Re-pack (Drive Axle)", cat:"grease", greaseType:"Lithium Complex EP2 / Shell Gadus",               qty:300, intervalKm:60000, intervalMonths:18, intervalHrs:1500, procedure:"Same as front but drive axle — only use oil for driven axles per TMC standard. Check seal for leaks. Torque axle nuts to spec.", notes:"Drive axles: use oil-bath lubricant, not grease. Non-driven: either is acceptable." },
  "GP-003": { label:"Front Leaf Spring — Graphite Grease",     cat:"grease", greaseType:"Graphite Grease",                                 qty:100, intervalKm:10000, intervalMonths:3,  intervalHrs:250,  procedure:"Clean leaf surfaces with wire brush, apply graphite grease between leaves evenly, wipe excess, check U-bolts", notes:"Prevents inter-leaf friction squeak and corrosion. Crucial for loaded trucks on rough roads." },
  "GP-004": { label:"Rear Leaf Spring — Graphite Grease",      cat:"grease", greaseType:"Graphite Grease",                                 qty:150, intervalKm:10000, intervalMonths:3,  intervalHrs:250,  procedure:"Similar to front. Extra attention at shackle pins and spring eye bushes", notes:"Always do front and rear together." },
  "GP-005": { label:"Steering Linkage Nipples (All Points)",   cat:"grease", greaseType:"Lithium EP2 Multipurpose Grease",                 qty:30,  intervalKm:5000,  intervalMonths:1,  intervalHrs:100,  procedure:"Use grease gun on all nipple points — tie rod ends, king pins, drag link ball joints, steering box. Wipe excess.", notes:"Monthly for heavily loaded trucks. Count nipple points per model — PRIMA has 18+ nipple points." },
  "GP-006": { label:"King Pin & Stub Axle Grease",             cat:"grease", greaseType:"Lithium EP2 / Molykote Paste",                    qty:80,  intervalKm:15000, intervalMonths:3,  intervalHrs:400,  procedure:"Pump grease gun on king pin nipple until old grease purges. Check king pin play — max 1.5mm acceptable.", notes:"King pin wear causes tyre feathering, instability at speed, shimmy. Critical safety item." },
  "GP-007": { label:"Propeller Shaft Universal Joints",        cat:"grease", greaseType:"Lithium Complex EP2",                             qty:50,  intervalKm:10000, intervalMonths:3,  intervalHrs:250,  procedure:"Grease nipple on each UJ spider. Pump until slight purge. Check for dry/cracked UJ boots.", notes:"Neglect causes vibration, driveshaft failure at speed. Very common failure in India." },
  "GP-008": { label:"Fifth Wheel Plate — Trailer Coupling",    cat:"grease", greaseType:"Fifth Wheel Grease / Lithium Soap Thickened",     qty:500, intervalKm:10000, intervalMonths:2,  intervalHrs:250,  procedure:"Clean coupling plate thoroughly, apply thick even layer of fifth wheel grease, check jaw lock mechanism", notes:"Critical for artic trucks. Insufficient grease causes premature coupling wear and king pin cracking." },
  "GP-009": { label:"Chassis Nipple Points — Full Set",        cat:"grease", greaseType:"Lithium EP2 Multipurpose",                        qty:200, intervalKm:5000,  intervalMonths:1,  intervalHrs:125,  procedure:"Systematic nipple-by-nipple greasing. Tata LPT: 24 nipple points. Tata Prima: 32+. Use grease schedule diagram.", notes:"Most neglected job in India. Should be done every 5,000 km without exception." },
  "GP-010": { label:"Bogie Suspension — Centre Bearing Grease",cat:"grease", greaseType:"EP2 Bearing Grease",                              qty:120, intervalKm:20000, intervalMonths:6,  intervalHrs:500,  procedure:"Jack axle, remove bogie centre pin, clean, repack bearing, replace O-ring seals", notes:"Multi-axle trucks only. Missing this = premature bogie failure." },
};

// ─── Engine Oil & Fluid Master ────────────────────────────────────────────────
const ENGINE_OIL_MASTER = {
  "OIL-001": { label:"Engine Oil Change + Oil Filter",         cat:"engine_oil", grade:"15W-40 CI-4 / CK-4 (BS6: FA-4)", qtyLitres:12, intervalKm:15000, intervalMonths:3,  procedure:"Warm engine, drain hot, replace drain plug gasket, replace oil filter with new O-ring, fill to dipstick mark, run engine, recheck level", notes:"Tata Prima: 12L. Tata LPT 1613: 9L. AL Boss: 10L. BS6 engines: use CK-4 or FA-4 only. Never mix mineral with synthetic." },
  "OIL-002": { label:"Gearbox Oil Change",                     cat:"engine_oil", grade:"SAE 80W-90 GL-4 / GL-5",          qtyLitres:8,  intervalKm:60000, intervalMonths:12, procedure:"Drain from bottom plug, refill from level plug until it starts draining. Manual gearbox: GL-4. Transfer case: check OEM spec.", notes:"Tata G-700 gearbox: 8L. Use OEM-specified grade — wrong grade can strip synchromesh rings." },
  "OIL-003": { label:"Front Axle Differential Oil",            cat:"engine_oil", grade:"SAE 85W-140 GL-5 or 80W-90",      qtyLitres:4,  intervalKm:60000, intervalMonths:12, procedure:"Drain and fill level plug. Check for water contamination (milky appearance = seal failure).", notes:"Contaminated diff oil causes gear scoring. Very common after river crossing or flood." },
  "OIL-004": { label:"Rear Axle Differential Oil",             cat:"engine_oil", grade:"SAE 85W-140 GL-5",                qtyLitres:8,  intervalKm:60000, intervalMonths:12, procedure:"Rear diff is larger — check OEM spec for tandem axle trucks. Fill from level plug.", notes:"Tandem rear axles: check both housings independently." },
  "OIL-005": { label:"Power Steering Fluid",                   cat:"engine_oil", grade:"ATF Dexron III / OEM spec",       qtyLitres:2,  intervalKm:40000, intervalMonths:12, procedure:"Drain from hose at gear box. Flush system with fresh fluid before refilling. Check pump belt tension.", notes:"Contaminated power steering fluid causes stiff steering and pump failure." },
  "OIL-006": { label:"Brake Fluid Top-Up / Change",            cat:"engine_oil", grade:"DOT 3 or DOT 4 (air brakes: not applicable)",qtyLitres:0.5, intervalKm:30000, intervalMonths:12, procedure:"Check reservoir level. Full flush every 2 years — hygroscopic fluid absorbs moisture and lowers boiling point.", notes:"Many Indian trucks have air brakes — no fluid brake system. Check vehicle spec." },
  "OIL-007": { label:"Hydraulic Oil Change (Cab Tilt / Crane)",cat:"engine_oil", grade:"ISO VG 46 Hydraulic Oil",         qtyLitres:4,  intervalKm:60000, intervalMonths:18, procedure:"Use dedicated suction/fill pump. Do not allow air into system. Bleed any air pockets after fill.", notes:"Tata Prima tilt cab: 2L. Separate from crane/body hydraulic systems." },
  "OIL-008": { label:"Coolant Flush & Refill",                 cat:"cooling",    grade:"OAT or HOAT Coolant — 1:1 mix",   qtyLitres:14, intervalKm:60000, intervalMonths:24, procedure:"Cold engine only. Drain from petcock, flush with clean water, drain again, refill with pre-mixed coolant. Bleed air from system.", notes:"Tata Prima: 14L coolant system. Ashok Leyland: 12L. Indian conditions: use summer-spec coolant year-round." },
};

// ─── Brake System Master ──────────────────────────────────────────────────────
const BRAKE_MASTER = {
  "BRK-001": { label:"Front Brake Shoe / Lining — Inspect & Replace", cat:"brake", intervalKm:40000, intervalMonths:18, specification:"Min lining thickness: 4mm (replace at 5mm). Lining material: Asbestos-free grade P", procedure:"Remove drum, measure lining thickness with gauge, inspect for glazing/oil contamination, check drum out-of-round (max 0.3mm), re-rivet or replace lining, deglaze drum surface", notes:"Front brakes do 70% of braking work. Never replace one side only — always replace both sides of same axle." },
  "BRK-002": { label:"Rear Brake Shoe / Lining — Inspect & Replace",  cat:"brake", intervalKm:60000, intervalMonths:24, specification:"Min lining thickness: 4mm. Rear brakes see less work but air-actuated — check S-cam", procedure:"Check S-cam bushes for wear. Check spring brakes (parking) for proper stroke. Lubricate cam bushes with EP2 grease.", notes:"S-cam wear causes brake imbalance and pull to one side." },
  "BRK-003": { label:"Brake Drum — Inspection & Replacement",         cat:"brake", intervalKm:80000, intervalMonths:36, specification:"Max drum bore: OD + 2mm from new. Typical new drum bore: 410mm (Tata). Max machining: 2mm", procedure:"Measure drum ID at 4 points with vernier. Check for heat cracks, score marks, hot spots (blue discoloration). Machine if within limit, replace if exceeds.", notes:"Cracked drums = catastrophic brake failure at highway speed. Replace — don't repair." },
  "BRK-004": { label:"Slack Adjuster — Check & Adjust",               cat:"brake", intervalKm:10000, intervalMonths:3,  specification:"Brake push rod stroke: 38-51mm (free travel). Auto slack adjuster: verify self-adjustment", procedure:"Apply/release parking brake several times. Measure pushrod stroke. If stroke > 51mm: manual adjustment needed (S-cam type). Auto adjusters: verify pawl mechanism.", notes:"Incorrect adjustment causes brake fade, uneven wear, or dragging. Checked every 10,000 km." },
  "BRK-005": { label:"Air Brake System — Leakage Test",               cat:"brake", intervalKm:15000, intervalMonths:6,  specification:"System pressure: 6.5-7 bar. Leakage: max 5 PSI per minute static", procedure:"Build full pressure, shut engine, monitor pressure drop over 3 minutes with engine off. Check all joints with soapy water. Drain all air tanks — remove condensate water.", notes:"Water in air tanks causes compressor damage and corrosion. Drain tanks DAILY in monsoon season." },
  "BRK-006": { label:"Brake Drum Dedusting — Air Blow",               cat:"brake", intervalKm:10000, intervalMonths:3,  specification:"Asbestos-free brake dust procedure: wet or vacuum removal only", procedure:"Remove wheel, use vacuum or damp cloth — never blow with dry air. Clean inside drum and backing plate thoroughly.", notes:"Brake dust removal before lining inspection. Health and safety requirement." },
  "BRK-007": { label:"Wheel Cylinder / Brake Chamber — Inspect",      cat:"brake", intervalKm:30000, intervalMonths:12, specification:"Check for oil/fluid leaks, cracked diaphragm, stuck pistons", procedure:"With brakes released, check stroke of each chamber. Visual check for grease/oil contamination. Diaphragm failure: replace immediately.", notes:"Failed brake chamber = total loss of braking on that axle. CRITICAL." },
};

// ─── Filter Master ────────────────────────────────────────────────────────────
const FILTER_MASTER = {
  "FLT-001": { label:"Air Filter — Primary Element",       cat:"filter", intervalKm:20000, intervalMonths:6,  notes:"Clean with compressed air every 10,000 km. Replace at 20,000 km or when indicator shows. Dusty routes: replace every 10,000 km." },
  "FLT-002": { label:"Fuel Filter / Sedimenter",           cat:"filter", intervalKm:10000, intervalMonths:3,  notes:"Drain water from sedimenter weekly. Replace filter at 10,000 km. Critical for injector protection." },
  "FLT-003": { label:"Oil Filter (Engine)",                cat:"filter", intervalKm:15000, intervalMonths:3,  notes:"Always replace with each engine oil change. Never re-use oil filter." },
  "FLT-004": { label:"Cabin Air Filter",                   cat:"filter", intervalKm:20000, intervalMonths:6,  notes:"AC performance drops with clogged cabin filter. Low cost item — replace regularly." },
};

// ─── Per-vehicle-type PM schedules ────────────────────────────────────────────
// Keys match FLEET_DATA model types + TRUCK_MODEL_DB entries
const VEHICLE_PM_PROFILES = {
  "Tata LPT 2518": {
    label:"Tata LPT 2518 — 10-Wheeler",
    axleConfig:"6×4", gvw:25, totalNipples:28,
    greaseSchedule:["GP-001","GP-002","GP-003","GP-004","GP-005","GP-006","GP-007","GP-009"],
    oilSchedule:["OIL-001","OIL-002","OIL-003","OIL-004","OIL-005","OIL-008"],
    brakeSchedule:["BRK-001","BRK-002","BRK-003","BRK-004","BRK-005","BRK-006"],
    filterSchedule:["FLT-001","FLT-002","FLT-003"],
    engineOilCapacityL:12, coolantL:14, gearboxOilL:8, diffOilL:8,
    oilGrade:"15W-40 CI-4+",
  },
  "Ashok Leyland 2518": {
    label:"Ashok Leyland 2518 — 10-Wheeler",
    axleConfig:"6×4", gvw:25, totalNipples:26,
    greaseSchedule:["GP-001","GP-002","GP-003","GP-004","GP-005","GP-006","GP-007","GP-009"],
    oilSchedule:["OIL-001","OIL-002","OIL-003","OIL-004","OIL-005","OIL-008"],
    brakeSchedule:["BRK-001","BRK-002","BRK-003","BRK-004","BRK-005","BRK-006"],
    filterSchedule:["FLT-001","FLT-002","FLT-003"],
    engineOilCapacityL:10, coolantL:12, gearboxOilL:7, diffOilL:7,
    oilGrade:"15W-40 CI-4+",
  },
  "Tata Prima 4028": {
    label:"Tata PRIMA 4028 — 12-Wheeler Heavy",
    axleConfig:"6×4", gvw:40, totalNipples:32,
    greaseSchedule:["GP-001","GP-002","GP-003","GP-004","GP-005","GP-006","GP-007","GP-008","GP-009","GP-010"],
    oilSchedule:["OIL-001","OIL-002","OIL-003","OIL-004","OIL-005","OIL-007","OIL-008"],
    brakeSchedule:["BRK-001","BRK-002","BRK-003","BRK-004","BRK-005","BRK-006","BRK-007"],
    filterSchedule:["FLT-001","FLT-002","FLT-003","FLT-004"],
    engineOilCapacityL:16, coolantL:14, gearboxOilL:10, diffOilL:10,
    oilGrade:"15W-40 CK-4 (BS6 compliance)",
    hasFifthWheel:true,
  },
  "BharatBenz 2523": {
    label:"BharatBenz 2523 — 10-Wheeler",
    axleConfig:"6×4", gvw:25, totalNipples:24,
    greaseSchedule:["GP-001","GP-002","GP-003","GP-004","GP-005","GP-006","GP-007","GP-009"],
    oilSchedule:["OIL-001","OIL-002","OIL-003","OIL-004","OIL-005","OIL-008"],
    brakeSchedule:["BRK-001","BRK-002","BRK-003","BRK-004","BRK-005"],
    filterSchedule:["FLT-001","FLT-002","FLT-003"],
    engineOilCapacityL:11, coolantL:13, gearboxOilL:8, diffOilL:8,
    oilGrade:"15W-40 CK-4",
  },
  "Tata Ace": {
    label:"Tata Ace — Mini Truck (LCV)",
    axleConfig:"4×2", gvw:1.5, totalNipples:12,
    greaseSchedule:["GP-001","GP-003","GP-005","GP-006","GP-007","GP-009"],
    oilSchedule:["OIL-001","OIL-002","OIL-003","OIL-008"],
    brakeSchedule:["BRK-001","BRK-002","BRK-004"],
    filterSchedule:["FLT-001","FLT-002","FLT-003"],
    engineOilCapacityL:4, coolantL:5, gearboxOilL:2, diffOilL:2,
    oilGrade:"15W-40 CI-4",
  },
};

// ─── PM Task status data (vehicle-wise completion history) ────────────────────
const PM_LOG_INIT = [
  { id:"PM-001", vehicleNo:"TN69 GH4789", taskId:"GP-001", taskLabel:"Front Wheel Hub — Grease Pack", doneKm:68000, doneDate:"2025-01-15", nextKm:108000, nextDate:"2026-01-15", techName:"Rajan", cost:850,  parts:"Shell Gadus S3 EP2 (250g)", status:"OK" },
  { id:"PM-002", vehicleNo:"TN69 GH4789", taskId:"GP-009", taskLabel:"Chassis Nipple Greasing",        doneKm:72000, doneDate:"2025-03-01", nextKm:77000,  nextDate:"2025-04-01", techName:"Rajan", cost:200,  parts:"Lithium EP2 200g",           status:"DUE_SOON" },
  { id:"PM-003", vehicleNo:"TN69 GH4789", taskId:"OIL-001", taskLabel:"Engine Oil Change",             doneKm:70000, doneDate:"2025-02-14", nextKm:85000,  nextDate:"2025-05-14", techName:"Rajan", cost:3200, parts:"15W-40 CI-4 12L + Filter",  status:"OK" },
  { id:"PM-004", vehicleNo:"TN69 GH4789", taskId:"BRK-004", taskLabel:"Slack Adjuster Check",          doneKm:70000, doneDate:"2025-02-14", nextKm:80000,  nextDate:"2025-05-14", techName:"Rajan", cost:0,    parts:"Labour only",               status:"DUE_SOON" },
  { id:"PM-005", vehicleNo:"TN59 AB1234", taskId:"OIL-001", taskLabel:"Engine Oil Change",             doneKm:85000, doneDate:"2025-03-20", nextKm:100000, nextDate:"2025-06-20", techName:"Kumar", cost:2800, parts:"15W-40 CI-4 10L + Filter",  status:"OK" },
  { id:"PM-006", vehicleNo:"TN59 AB1234", taskId:"GP-005", taskLabel:"Steering Nipple Greasing",       doneKm:86000, doneDate:"2025-03-22", nextKm:91000,  nextDate:"2025-04-22", techName:"Kumar", cost:300,  parts:"EP2 grease 30g",            status:"OVERDUE" },
  { id:"PM-007", vehicleNo:"TN45 CD5678", taskId:"BRK-001", taskLabel:"Front Brake Lining",            doneKm:96000, doneDate:"2025-01-10", nextKm:136000, nextDate:"2026-07-10", techName:"Suresh", cost:4200, parts:"Asbestos-free lining set",  status:"OK" },
];

// ─── Grease & Oil Inventory (Stock items) ─────────────────────────────────────
const LUBE_STOCK_INIT = [
  { id:"LB-001", name:"Lithium Complex EP2 Grease (Drum)",  type:"grease",     unit:"kg",     qtyOnHand:8,   minStock:4,   costPerUnit:180, brand:"Shell Gadus S3 V220C",   usedFor:["GP-001","GP-002","GP-005","GP-006","GP-007","GP-009","GP-010"] },
  { id:"LB-002", name:"Graphite Grease (Tube 1kg)",         type:"grease",     unit:"tube",   qtyOnHand:3,   minStock:2,   costPerUnit:250, brand:"Waxoyl / Fuchs",          usedFor:["GP-003","GP-004"] },
  { id:"LB-003", name:"Fifth Wheel Grease (1kg tube)",      type:"grease",     unit:"tube",   qtyOnHand:1,   minStock:2,   costPerUnit:320, brand:"Trailor Grip",           usedFor:["GP-008"] },
  { id:"LB-004", name:"Engine Oil 15W-40 CI-4 (20L drum)", type:"engine_oil", unit:"litre",  qtyOnHand:45,  minStock:30,  costPerUnit:195, brand:"Castrol CRB TURBOMAX",   usedFor:["OIL-001"] },
  { id:"LB-005", name:"Gearbox Oil SAE 80W-90 (5L can)",   type:"engine_oil", unit:"litre",  qtyOnHand:12,  minStock:10,  costPerUnit:210, brand:"Shell Spirax S3 GX",     usedFor:["OIL-002"] },
  { id:"LB-006", name:"Diff Oil SAE 85W-140 (5L can)",     type:"engine_oil", unit:"litre",  qtyOnHand:10,  minStock:8,   costPerUnit:220, brand:"Castrol Hypoy C",        usedFor:["OIL-003","OIL-004"] },
  { id:"LB-007", name:"Coolant OAT (5L concentrated)",     type:"coolant",    unit:"litre",  qtyOnHand:20,  minStock:10,  costPerUnit:350, brand:"Ashok Leyland / Tata",   usedFor:["OIL-008"] },
  { id:"LB-008", name:"Brake Lining Set (Front Axle)",     type:"brake",      unit:"set",    qtyOnHand:4,   minStock:3,   costPerUnit:2100, brand:"Rane / Allied Nippon",  usedFor:["BRK-001"] },
  { id:"LB-009", name:"Brake Lining Set (Rear Axle)",      type:"brake",      unit:"set",    qtyOnHand:2,   minStock:2,   costPerUnit:1800, brand:"Rane / Allied Nippon",  usedFor:["BRK-002"] },
  { id:"LB-010", name:"Oil Filter (Tata / AL Compatible)", type:"filter",     unit:"pcs",    qtyOnHand:12,  minStock:6,   costPerUnit:320, brand:"Mann / Fleetguard",      usedFor:["FLT-003","OIL-001"] },
  { id:"LB-011", name:"Air Filter Primary Element",        type:"filter",     unit:"pcs",    qtyOnHand:4,   minStock:3,   costPerUnit:850, brand:"Fleetguard AF4735",       usedFor:["FLT-001"] },
  { id:"LB-012", name:"Fuel Filter / Sedimenter Element",  type:"filter",     unit:"pcs",    qtyOnHand:6,   minStock:4,   costPerUnit:450, brand:"Fleetguard FS1212",       usedFor:["FLT-002"] },
];

// ─── PM Settings Page ─────────────────────────────────────────────────────────
const PMSettingsPage = () => {
  const [selV,setSelV]=useState("TN69 GH4789");
  const [logs,setLogs]=useState(PM_LOG_INIT||[]);
  const [showAdd,setShowAdd]=useState(false);
  const [lf,setLf]=useState({taskId:"OIL-001",doneKm:"",techName:"",cost:"",parts:""});
  const odo=FLEET_DATA.find(v=>v.num===selV)?.odometer||74875;
  const vLogs=logs.filter(l=>l.vehicleNo===selV);
  const allTasks=[...Object.entries(GREASE_PACKING_MASTER||{}).map(([id,t])=>({...t,id,type:"grease"})),...Object.entries(ENGINE_OIL_MASTER||{}).map(([id,t])=>({...t,id,type:"oil"})),...Object.entries(BRAKE_MASTER||{}).map(([id,t])=>({...t,id,type:"brake"}))];
  const overdue=vLogs.filter(l=>l.nextKm&&odo>l.nextKm);
  const greaseDueSoon=allTasks.filter(task=>{
    if(task.type!=="grease") return false;
    const log=vLogs.filter(l=>l.taskId===task.id).sort((a,b)=>b.doneKm-a.doneKm)[0];
    const nextKm=log?.nextKm||(odo+(task.intervalKm||40000));
    return nextKm-odo<=3000 && nextKm-odo>0;
  });
  return (
    <div>
      {showAdd&&(<div className="ov"><div className="modal" style={{ maxWidth:480 }}>
        <div className="mhdr" style={{ background:"linear-gradient(135deg,#064E3B,#065F46)",borderBottom:`1px solid ${T.green}33` }}>
          <div className="rj" style={{ fontSize:16,fontWeight:700,color:T.green }}>✅ Log PM Task</div>
          <button className="btn" style={{ padding:"5px 9px" }} onClick={()=>setShowAdd(false)}><Ic n="x" s={14} c={T.textSub}/></button>
        </div>
        <div className="mbdy">
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10 }}>
            <div><label className="flabel">Task</label><select value={lf.taskId} onChange={e=>setLf(f=>({...f,taskId:e.target.value}))}>{allTasks.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}</select></div>
            <div><label className="flabel">Odometer (km)</label><input value={lf.doneKm} onChange={e=>setLf(f=>({...f,doneKm:e.target.value}))} placeholder={odo}/></div>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10 }}>
            <div><label className="flabel">Technician</label><input value={lf.techName} onChange={e=>setLf(f=>({...f,techName:e.target.value}))}/></div>
            <div><label className="flabel">Cost (₹)</label><input value={lf.cost} onChange={e=>setLf(f=>({...f,cost:e.target.value}))}/></div>
          </div>
          <div><label className="flabel">Parts Used</label><input value={lf.parts} onChange={e=>setLf(f=>({...f,parts:e.target.value}))}/></div>
          <div style={{ display:"flex",justifyContent:"flex-end",gap:8,marginTop:12 }}>
            <button className="btn btn-gh" onClick={()=>setShowAdd(false)}>Cancel</button>
            <button className="btn" style={{ background:T.green,color:"#fff" }} onClick={()=>{const task=allTasks.find(t=>t.id===lf.taskId)||{};setLogs(l=>[...l,{id:`PM-${l.length+1}`,vehicleNo:selV,taskId:lf.taskId,taskLabel:task.label||lf.taskId,doneKm:parseInt(lf.doneKm)||odo,doneDate:new Date().toISOString().split("T")[0],nextKm:(parseInt(lf.doneKm)||odo)+(task.intervalKm||10000),techName:lf.techName,cost:parseInt(lf.cost)||0,parts:lf.parts,status:"OK"}]);setShowAdd(false);}}>Log Done</button>
          </div>
        </div>
      </div></div>)}
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20 }}>
        <div><h1 className="rj" style={{ fontSize:28,fontWeight:700 }}>Preventive Maintenance</h1><p style={{ color:T.textSub,fontSize:12 }}>Grease packing · Engine oil · Brakes · Service intervals</p></div>
        <button className="btn btn-g" style={{ fontSize:11 }} onClick={()=>setShowAdd(true)}>✅ Log PM Done</button>
      </div>
      <div className="card" style={{ marginBottom:14,padding:"12px 16px" }}>
        <div style={{ display:"flex",gap:8,flexWrap:"wrap",alignItems:"center" }}>
          <span style={{ fontSize:11,color:T.textMuted }}>Vehicle:</span>
          {FLEET_DATA.map(v=><div key={v.id} onClick={()=>setSelV(v.num)} style={{ padding:"5px 12px",borderRadius:8,cursor:"pointer",border:`2px solid ${selV===v.num?T.accent:T.border}`,background:selV===v.num?T.accentGlow:T.bgPanel,fontSize:12,color:selV===v.num?T.accent:T.textSub,fontWeight:selV===v.num?700:400 }}>{v.num}</div>)}
          <span style={{ fontSize:11,color:T.textMuted,marginLeft:8 }}>ODO: <strong style={{ color:T.blue }}>{odo.toLocaleString()} km</strong></span>
        </div>
      </div>
      {greaseDueSoon.length>0&&<div className="card" style={{ marginBottom:12,border:`1px solid ${T.orange}44`,background:T.accentGlow }}>
        <div className="section-title" style={{ color:T.orange }}>🔔 {greaseDueSoon.length} Grease Task{greaseDueSoon.length>1?"s":""} Due Within 3,000 km — Auto Alert</div>
        {greaseDueSoon.map(task=>{
          const log=vLogs.filter(l=>l.taskId===task.id).sort((a,b)=>b.doneKm-a.doneKm)[0];
          const nextKm=log?.nextKm||(odo+(task.intervalKm||40000));
          const kmsLeft=nextKm-odo;
          return(<div key={task.id} className="arow" style={{ borderLeftColor:T.orange }}><div style={{ flex:1 }}><div style={{ fontWeight:700,color:T.orange }}>{task.label}</div><div style={{ fontSize:11,color:T.textSub }}>Due at {nextKm.toLocaleString()} km · <strong style={{ color:T.orange }}>{kmsLeft.toLocaleString()} km left</strong> · Interval: every {(task.intervalKm||40000).toLocaleString()} km</div></div><button className="btn btn-o" style={{ fontSize:10 }} onClick={()=>setShowAdd(true)}>Log Done</button></div>);
        })}
      </div>}
      {overdue.length>0&&<div className="card" style={{ marginBottom:12,border:`1px solid ${T.red}44`,background:T.redGlow }}>
        <div className="section-title" style={{ color:T.red }}>🚨 {overdue.length} Overdue PM Tasks</div>
        {overdue.map(t=><div key={t.id} className="arow" style={{ borderLeftColor:T.red }}><div style={{ flex:1 }}><div style={{ fontWeight:700,color:T.red }}>{t.taskLabel}</div><div style={{ fontSize:11,color:T.textSub }}>{(odo-t.nextKm).toLocaleString()} km overdue</div></div><button className="btn btn-r" style={{ fontSize:10 }} onClick={()=>setShowAdd(true)}>Log</button></div>)}
      </div>}
      <div className="card" style={{ padding:0 }}>
        <table className="tbl">
          <thead><tr><th>Task</th><th>Type</th><th>Interval</th><th>Last Done</th><th>Next Due km</th><th>Status</th><th></th></tr></thead>
          <tbody>{allTasks.slice(0,14).map(task=>{const log=vLogs.filter(l=>l.taskId===task.id).sort((a,b)=>b.doneKm-a.doneKm)[0];const nextKm=log?.nextKm||(odo+(task.intervalKm||10000));const diff=nextKm-odo;const st=diff<0?"overdue":diff<2000?"soon":"ok";return(<tr key={task.id}><td style={{ fontSize:12,fontWeight:600 }}>{task.label}</td><td><span className={`badge ${task.type==="grease"?"ba":task.type==="brake"?"br":"bb"}`} style={{ fontSize:9 }}>{task.type}</span></td><td style={{ fontSize:11 }}>{task.intervalKm?.toLocaleString()||"—"} km</td><td style={{ fontSize:11,color:T.textMuted }}>{log?.doneDate||"Never"}</td><td className="mono" style={{ fontSize:11,color:st==="overdue"?T.red:st==="soon"?T.orange:T.green }}>{nextKm.toLocaleString()}</td><td><span className={`badge ${st==="ok"?"bg":st==="soon"?"bo":"br"}`} style={{ fontSize:9 }}>{st==="ok"?"OK":st==="soon"?"Soon":"OVER"}</span></td><td><button className="btn btn-g" style={{ fontSize:9,padding:"2px 6px" }} onClick={()=>setShowAdd(true)}>Log</button></td></tr>);})}</tbody>
        </table>
      </div>
    </div>
  );
};
const WorkshopPage = () => {
  const [wos,setWos]=useState(WORK_ORDERS||[]);
  const [showCreate,setShowCreate]=useState(false);
  const [selWO,setSelWO]=useState(null);
  const open=wos.filter(w=>w.status==="Open"||w.status==="In Progress");
  return (<div>
    {showCreate&&<CreateWOWizard onClose={()=>setShowCreate(false)} onSave={wo=>setWos(w=>[wo,...w])}/>}
    {selWO&&<div className="ov"><div className="modal" style={{ maxWidth:480 }}>
      <div className="mhdr" style={{ background:"linear-gradient(135deg,#1C0000,#3D1000)",borderBottom:`1px solid ${T.orange}33` }}>
        <div className="rj" style={{ fontSize:16,fontWeight:700,color:T.orange }}>🔧 {selWO.id}</div>
        <button className="btn" style={{ padding:"5px 9px" }} onClick={()=>setSelWO(null)}><Ic n="x" s={14} c={T.textSub}/></button>
      </div>
      <div className="mbdy">
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12 }}>
          {[["Vehicle",selWO.vehicleNo||selWO.vehicle||"—"],["Category",selWO.category||"—"],["Status",selWO.status||"Open"],["Cost","₹"+(selWO.totalCost||selWO.estimatedCost||0).toLocaleString()]].map(([l,v])=>(
            <div key={l} style={{ background:T.bgPanel,borderRadius:7,padding:"7px 10px" }}><div style={{ fontSize:9,color:T.textMuted }}>{l}</div><div style={{ fontSize:12,fontWeight:600,marginTop:2 }}>{v}</div></div>
          ))}
        </div>
        {selWO.issue&&<div style={{ fontSize:11,color:T.textSub,background:T.bgPanel,borderRadius:7,padding:10,marginBottom:10 }}>{selWO.issue}</div>}
        <div style={{ display:"flex",gap:8,justifyContent:"flex-end" }}>
          {selWO.status!=="Completed"&&<button className="btn btn-g" style={{ fontSize:11 }} onClick={()=>{setWos(w=>w.map(x=>x.id===selWO.id?{...x,status:"Completed"}:x));setSelWO(null);}}>✅ Complete</button>}
          <button className="btn btn-gh" onClick={()=>setSelWO(null)}>Close</button>
        </div>
      </div>
    </div></div>}
    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
      <div><h1 className="rj" style={{ fontSize:28,fontWeight:700 }}>Workshop & Work Orders</h1><p style={{ color:T.textSub,fontSize:12 }}>Active repairs · Scheduled PM · Cost tracking</p></div>
      <button className="btn btn-p" onClick={()=>setShowCreate(true)}>+ New WO</button>
    </div>
    <div className="kpi-row" style={{ gridTemplateColumns:"repeat(4,1fr)",marginBottom:18 }}>
      {[{ l:"Open",v:open.length,c:T.red },{ l:"Completed",v:wos.filter(w=>w.status==="Completed").length,c:T.green },{ l:"Total Cost",v:fmt(wos.reduce((s,w)=>s+(w.totalCost||w.estimatedCost||0),0)),c:T.accent },{ l:"Vehicles",v:new Set(wos.map(w=>w.vehicleNo||w.vehicle).filter(Boolean)).size,c:T.blue }].map(k=>(
        <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>
      ))}
    </div>
    <div className="card" style={{ padding:0 }}>
      <table className="tbl">
        <thead><tr><th>WO ID</th><th>Vehicle</th><th>Category</th><th>Issue</th><th>Cost</th><th>Status</th><th></th></tr></thead>
        <tbody>{wos.map(wo=>(
          <tr key={wo.id}>
            <td className="mono" style={{ color:T.accent,fontSize:11 }}>{wo.id}</td>
            <td className="mono" style={{ fontSize:11 }}>{wo.vehicleNo||wo.vehicle||"—"}</td>
            <td><span className="badge ba" style={{ fontSize:10 }}>{wo.category||"General"}</span></td>
            <td style={{ fontSize:11,maxWidth:180,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{wo.issue||"—"}</td>
            <td style={{ fontWeight:600,color:T.red }}>₹{(wo.totalCost||wo.estimatedCost||0).toLocaleString()}</td>
            <td><span className={`badge ${wo.status==="Completed"?"bg":wo.status==="In Progress"?"bb":"bo"}`} style={{ fontSize:10 }}>{wo.status||"Open"}</span></td>
            <td><button className="btn btn-b" style={{ fontSize:10,padding:"2px 7px" }} onClick={()=>setSelWO(wo)}>View</button></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  </div>);
};
const SparePartsPage = () => {
  const lowStock = SPARE_PARTS.filter(p => p.quantity <= p.reorderLevel);
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div><h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Spare Parts</h1><p style={{ color:T.textSub, fontSize:12 }}>Stock, reorder alerts, issue against work orders</p></div>
        <button className="btn btn-p"><Ic n="plus" s={14} c="#080B10" /> Add Parts</button>
      </div>
      {lowStock.length > 0 && (
        <div className="card" style={{ marginBottom:14, border:`1px solid ${T.red}44`, background:T.redGlow }}>
          <div className="section-title" style={{ color:T.red }}>🔴 Low Stock — {lowStock.length} items below reorder level</div>
          {lowStock.map(p => (
            <div key={p.id} className="arow" style={{ borderLeftColor:T.red }}>
              <div style={{ flex:1 }}><div style={{ fontSize:12, fontWeight:600 }}>{p.name}</div><div style={{ fontSize:11, color:T.textSub }}>Only {p.quantity} {p.unit} left · Reorder at {p.reorderLevel}</div></div>
              <button className="btn btn-p" style={{ fontSize:10, padding:"3px 10px" }}>Reorder</button>
            </div>
          ))}
        </div>
      )}
      <div className="card" style={{ padding:0 }}>
        <table className="tbl">
          <thead><tr><th>ID</th><th>Name</th><th>Category</th><th>Qty</th><th>Unit Cost</th><th>Stock Value</th><th>Status</th></tr></thead>
          <tbody>
            {SPARE_PARTS.map(p => (
              <tr key={p.id}>
                <td className="mono" style={{ fontSize:11, color:T.accent }}>{p.id}</td>
                <td style={{ fontWeight:600 }}>{p.name}</td>
                <td><span className="badge bc">{p.category}</span></td>
                <td style={{ fontWeight:700, color:p.quantity<=p.reorderLevel?T.red:T.green }}>{p.quantity} {p.unit}</td>
                <td>{fmt(p.unitCost)}</td>
                <td style={{ color:T.blue, fontWeight:600 }}>{fmt(p.quantity*p.unitCost)}</td>
                <td><span className={`badge ${p.quantity>p.reorderLevel?"bg":"br"}`}>{p.quantity>p.reorderLevel?"OK":"Low"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AIPredictionPage = () => {
  const [sel,setSel]=useState(null);
  return (
    <div>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
        <div><h1 className="rj" style={{ fontSize:28,fontWeight:700 }}>AI Intelligence</h1><p style={{ color:T.textSub,fontSize:12 }}>Predictive maintenance · Risk scoring · Fleet health forecasting</p></div>
        <div style={{ display:"flex",gap:8 }}>
          <span style={{ padding:"6px 14px",background:T.accentGlow,color:T.accent,borderRadius:8,fontSize:12,fontWeight:600 }}>🤖 ML Model Active</span>
        </div>
      </div>
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(4,1fr)",marginBottom:18 }}>
        {[{l:"Predictions",v:AI_PREDICTIONS.length,c:T.blue},{l:"High Risk",v:AI_PREDICTIONS.filter(p=>p.risk==="HIGH").length,c:T.red},{l:"Avg Confidence",v:Math.round(AI_PREDICTIONS.reduce((s,p)=>s+p.confidence,0)/AI_PREDICTIONS.length)+"%",c:T.green},{l:"Savings Est.",v:"₹2.4L",c:T.accent}].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>
        ))}
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
        {AI_PREDICTIONS.map(p=>(
          <div key={p.id} className="card" style={{ cursor:"pointer",border:`1px solid ${p.risk==="HIGH"?T.red:p.risk==="MEDIUM"?T.orange:T.border}33` }} onClick={()=>setSel(p)}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8 }}>
              <div>
                <div style={{ fontSize:13,fontWeight:700 }}>{p.vehicle}</div>
                <div style={{ fontSize:11,color:T.textSub }}>{p.component}</div>
              </div>
              <span className="badge" style={{ background:(p.risk==="HIGH"?T.red:p.risk==="MEDIUM"?T.orange:T.green)+"22",color:p.risk==="HIGH"?T.red:p.risk==="MEDIUM"?T.orange:T.green }}>{p.risk}</span>
            </div>
            <div style={{ fontSize:12,color:T.textSub,marginBottom:8 }}>{p.prediction}</div>
            <div style={{ display:"flex",justifyContent:"space-between",fontSize:11 }}>
              <span style={{ color:T.textMuted }}>Confidence: <b style={{ color:T.accent }}>{p.confidence}%</b></span>
              <span style={{ color:T.textMuted }}>ETA: <b style={{ color:T.orange }}>{p.eta}</b></span>
            </div>
            <div style={{ height:4,background:T.bgPanel,borderRadius:2,marginTop:8 }}>
              <div style={{ height:"100%",width:p.confidence+"%",background:`linear-gradient(90deg,${p.risk==="HIGH"?T.red:p.risk==="MEDIUM"?T.orange:T.green},${T.accent})`,borderRadius:2 }}/>
            </div>
          </div>
        ))}
      </div>
      {sel&&<div className="ov"><div className="modal" style={{ maxWidth:500 }}>
        <div className="mhdr">
          <div className="rj" style={{ fontSize:16,fontWeight:700 }}>🤖 {sel.vehicle} — {sel.component}</div>
          <button className="btn" style={{ padding:"5px 9px" }} onClick={()=>setSel(null)}><Ic n="x" s={14} c={T.textSub}/></button>
        </div>
        <div className="mbdy">
          <div style={{ padding:"10px",background:T.bgPanel,borderRadius:8,marginBottom:12,fontSize:13 }}>{sel.prediction}</div>
          {[{l:"Risk Level",v:sel.risk},{l:"Confidence",v:sel.confidence+"%"},{l:"Estimated ETA",v:sel.eta},{l:"Recommended Action",v:sel.action||"Schedule Maintenance"}].map(r=>(
            <div key={r.l} style={{ display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${T.border}44`,fontSize:13 }}>
              <span style={{ color:T.textSub }}>{r.l}</span><span style={{ fontWeight:600 }}>{r.v}</span>
            </div>
          ))}
        </div>
        <div className="mftr">
          <button className="btn btn-gh" onClick={()=>setSel(null)}>Close</button>
          <button className="btn btn-p" onClick={()=>setSel(null)}>📅 Schedule Work Order</button>
        </div>
      </div></div>}
    </div>
  );
};

const DriverSettlementPage = () => {
  const [settlements]=useState([
    { id:"DS-001",driver:"Mani Kumar",tripId:"TRP-2025-0041",advance:20000,diesel:12000,toll:3000,expense:500,balance:-4500,status:"Pending",date:"2025-04-12" },
    { id:"DS-002",driver:"Selvam R",  tripId:"TRP-2025-0042",advance:18000,diesel:11000,toll:2500,expense:200,balance:-4300,status:"Settled",date:"2025-04-13" },
    { id:"DS-003",driver:"Arjun D",   tripId:"TRP-2025-0044",advance:15000,diesel:9000, toll:2000,expense:300,balance:-3700,status:"Pending",date:"2025-04-15" },
    { id:"DS-004",driver:"Karthik M", tripId:"TRP-2025-0046",advance:25000,diesel:14000,toll:4000,expense:400,balance:-6600,status:"Pending",date:"2025-04-09" },
  ]);
  const [showPay,setShowPay]=useState(null);
  const [payForm,setPayForm]=useState({amount:"",mode:"Cash"});
  const [settled,setSettled]=useState(new Set(["DS-002"]));
  const pending=settlements.filter(s=>!settled.has(s.id));
  const totalBalance=pending.reduce((sum,s)=>sum+Math.abs(s.balance),0);
  return (
    <div>
      <div style={{ marginBottom:20 }}><h1 className="rj" style={{ fontSize:28,fontWeight:700 }}>Driver Settlement</h1><p style={{ color:T.textSub,fontSize:12 }}>Advance vs actual · Diesel · Toll · Balance computation</p></div>
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(4,1fr)",marginBottom:18 }}>
        {[{ l:"Pending",v:pending.length,c:T.orange },{ l:"To Pay Out",v:fmt(totalBalance),c:T.red },{ l:"Settled",v:settled.size,c:T.green },{ l:"Drivers",v:settlements.length,c:T.blue }].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>
        ))}
      </div>
      {showPay&&(<div className="ov"><div className="modal" style={{ maxWidth:400 }}>
        <div className="mhdr" style={{ background:"linear-gradient(135deg,#0C1220,#1E3A5F)" }}><div className="rj" style={{ fontSize:16,fontWeight:700,color:T.blue }}>💳 Settle — {showPay.driver}</div><button className="btn" style={{ padding:"5px 9px" }} onClick={()=>setShowPay(null)}><Ic n="x" s={14} c={T.textSub}/></button></div>
        <div className="mbdy">
          <div style={{ background:T.bgPanel,borderRadius:8,padding:10,marginBottom:12,fontSize:12 }}>Balance: <strong style={{ color:T.red }}>{fmt(Math.abs(showPay.balance))}</strong></div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10 }}>
            <div><label className="flabel">Amount (₹)</label><input value={payForm.amount} onChange={e=>setPayForm(f=>({...f,amount:e.target.value}))} placeholder={Math.abs(showPay.balance)}/></div>
            <div><label className="flabel">Mode</label><select value={payForm.mode} onChange={e=>setPayForm(f=>({...f,mode:e.target.value}))}><option>Cash</option><option>UPI</option><option>Bank Transfer</option></select></div>
          </div>
          <div style={{ display:"flex",justifyContent:"flex-end",gap:8 }}><button className="btn btn-gh" onClick={()=>setShowPay(null)}>Cancel</button><button className="btn btn-p" onClick={()=>{setSettled(s=>new Set([...s,showPay.id]));setShowPay(null);}}>✅ Mark Settled</button></div>
        </div>
      </div></div>)}
      <div className="card" style={{ padding:0 }}>
        <table className="tbl">
          <thead><tr><th>Driver</th><th>Trip</th><th>Advance</th><th>Diesel</th><th>Toll</th><th>Balance</th><th>Status</th><th></th></tr></thead>
          <tbody>{settlements.map(s=>(
            <tr key={s.id} style={{ opacity:settled.has(s.id)?0.6:1 }}>
              <td style={{ fontWeight:600 }}>{s.driver}</td>
              <td className="mono" style={{ fontSize:11 }}>{s.tripId}</td>
              <td style={{ color:T.orange }}>₹{s.advance.toLocaleString()}</td>
              <td>₹{s.diesel.toLocaleString()}</td>
              <td>₹{s.toll.toLocaleString()}</td>
              <td style={{ fontWeight:700,color:T.red }}>₹{Math.abs(s.balance).toLocaleString()}</td>
              <td><span className={`badge ${settled.has(s.id)?"bg":"bo"}`} style={{ fontSize:10 }}>{settled.has(s.id)?"Settled":"Pending"}</span></td>
              <td>{!settled.has(s.id)&&<button className="btn btn-p" style={{ fontSize:10,padding:"3px 8px" }} onClick={()=>setShowPay(s)}>Settle</button>}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
};
// ─── Tyre Axle Diagram Component ─────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
// TYRE INTELLIGENCE MODULE v2 — FULL ROTATION + AI + LIFECYCLE SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Master Tyre Data ─────────────────────────────────────────────────────────
const ALL_TYRE_POSITIONS = {
  "TN69 GH4789": [
    { pos:"FL",  risk:"healthy",  kmLeft:8200, tread:7.2, brand:"MRF",         wear:"even",   id:"TYR-001", tin:"MRF-CH-17-23-0042", size:"315/80 R22.5", pattern:"RIB",  retreads:0, purchaseCost:28000, fitOdo:46000,  currentOdo:74875 },
    { pos:"FR",  risk:"warning",  kmLeft:1800, tread:3.8, brand:"CEAT",        wear:"uneven", id:"TYR-002", tin:"CEA-MA-08-23-1187", size:"315/80 R22.5", pattern:"RIB",  retreads:1, purchaseCost:25000, fitOdo:67000,  currentOdo:74875 },
    { pos:"RL1", risk:"critical", kmLeft:420,  tread:2.1, brand:"Apollo",      wear:"uneven", id:"TYR-X01", tin:"APL-NA-32-22-0891", size:"295/80 R22.5", pattern:"LUG",  retreads:2, purchaseCost:22000, fitOdo:118000, currentOdo:124420 },
    { pos:"RR1", risk:"healthy",  kmLeft:7100, tread:6.9, brand:"MRF",         wear:"even",   id:"TYR-X02", tin:"MRF-CH-21-22-0318", size:"295/80 R22.5", pattern:"LUG",  retreads:0, purchaseCost:26000, fitOdo:55000,  currentOdo:74875 },
    { pos:"RL2", risk:"retread",  kmLeft:2800, tread:4.5, brand:"Apollo",      wear:"even",   id:"TYR-X03", tin:"APL-NA-14-22-0556", size:"295/80 R22.5", pattern:"LUG",  retreads:1, purchaseCost:22000, fitOdo:60000,  currentOdo:74875 },
    { pos:"RR2", risk:"warning",  kmLeft:1400, tread:3.2, brand:"CEAT",        wear:"uneven", id:"TYR-X04", tin:"CEA-MA-27-23-0834", size:"315/80 R22.5", pattern:"LUG",  retreads:0, purchaseCost:25000, fitOdo:67000,  currentOdo:74875 },
    { pos:"RL3", risk:"healthy",  kmLeft:6800, tread:7.0, brand:"Bridgestone", wear:"even",   id:"TYR-X05", tin:"BRG-PU-06-23-0077", size:"315/80 R22.5", pattern:"LUG",  retreads:0, purchaseCost:32000, fitOdo:58000,  currentOdo:74875 },
    { pos:"RR3", risk:"healthy",  kmLeft:5900, tread:6.4, brand:"MRF",         wear:"even",   id:"TYR-X06", tin:"MRF-CH-09-23-0719", size:"315/80 R22.5", pattern:"LUG",  retreads:0, purchaseCost:28000, fitOdo:62000,  currentOdo:74875 },
    { pos:"Spare", risk:"healthy",kmLeft:9800, tread:8.8, brand:"MRF",         wear:"even",   id:"TYR-SP1", tin:"MRF-CH-01-24-0003", size:"315/80 R22.5", pattern:"LUG",  retreads:0, purchaseCost:28000, fitOdo:null,   currentOdo:null },
  ],
  "TN59 AB1234": [
    { pos:"FL",  risk:"healthy",  kmLeft:6200, tread:6.8, brand:"Bridgestone", wear:"even",   id:"TYR-B01", tin:"BRG-PU-44-22-0112", size:"315/80 R22.5", pattern:"RIB",  retreads:0, purchaseCost:32000, fitOdo:34000,  currentOdo:92340 },
    { pos:"FR",  risk:"healthy",  kmLeft:5800, tread:6.1, brand:"Bridgestone", wear:"even",   id:"TYR-B02", tin:"BRG-PU-44-22-0113", size:"315/80 R22.5", pattern:"RIB",  retreads:0, purchaseCost:32000, fitOdo:36000,  currentOdo:92340 },
    { pos:"RL1", risk:"warning",  kmLeft:2200, tread:3.6, brand:"MRF",         wear:"uneven", id:"TYR-B03", tin:"MRF-CH-29-22-0481", size:"295/80 R22.5", pattern:"LUG",  retreads:1, purchaseCost:26000, fitOdo:72000,  currentOdo:92340 },
    { pos:"RR1", risk:"healthy",  kmLeft:4100, tread:5.2, brand:"MRF",         wear:"even",   id:"TYR-B04", tin:"MRF-CH-29-22-0482", size:"295/80 R22.5", pattern:"LUG",  retreads:0, purchaseCost:26000, fitOdo:64000,  currentOdo:92340 },
  ],
};

const MOVEMENT_HISTORY = [
  { id:"MOV-001", tyreId:"TYR-X01", date:"2024-12-10", type:"Rotation",         fromV:"TN69 GH4789", fromP:"FL",  toV:"TN69 GH4789", toP:"RL1", reason:"KM-based rotation (12,000 km trigger)", by:"Fleet Manager", kmSaved:1200 },
  { id:"MOV-002", tyreId:"TYR-X03", date:"2025-01-22", type:"Cross-Vehicle",    fromV:"TN59 AB1234", fromP:"RL2", toV:"TN69 GH4789", toP:"RL2", reason:"TN59 idle — tyre shifted to high-usage vehicle", by:"AI Suggestion", kmSaved:3800 },
  { id:"MOV-003", tyreId:"TYR-002", date:"2025-02-15", type:"Retread",          fromV:"TN69 GH4789", fromP:"FL",  toV:"Workshop",    toP:"—",   reason:"Tread < 4mm — sent for retread", by:"Workshop",  kmSaved:null },
  { id:"MOV-004", tyreId:"TYR-B03", date:"2025-03-08", type:"Rotation",         fromV:"TN59 AB1234", fromP:"FL",  toV:"TN59 AB1234", toP:"RL1", reason:"Uneven wear on front axle", by:"AI Suggestion", kmSaved:800 },
  { id:"MOV-005", tyreId:"TYR-X05", date:"2025-04-01", type:"Transfer (Refit)", fromV:"Workshop",    fromP:"—",  toV:"TN69 GH4789", toP:"RL3", reason:"Post-retread fitment", by:"Fleet Manager",  kmSaved:null },
];

const AI_ROTATION_SUGGESTIONS = [
  { id:"SUG-001", tyreId:"TYR-X01", vehicle:"TN69 GH4789", pos:"RL1", action:"REPLACE",          urgency:"critical", reason:"Tread 2.1mm — below safe limit. High burst risk at current axle load.", impact:"Prevent ₹45,000+ breakdown cost", kmSave:null,  confidence:97 },
  { id:"SUG-002", tyreId:"TYR-002", vehicle:"TN69 GH4789", pos:"FR",  action:"ROTATE_TO_REAR",   urgency:"high",     reason:"Uneven shoulder wear detected. Front axle wearing this tyre 22% faster than rear.", impact:"+2,400 km estimated life extension", kmSave:2400, confidence:88 },
  { id:"SUG-003", tyreId:"TYR-X04", vehicle:"TN69 GH4789", pos:"RR2", action:"ROTATE_TO_REAR",   urgency:"medium",   reason:"Warning level — move to trailer axle where wear rate is 18% lower.", impact:"+1,800 km estimated life extension", kmSave:1800, confidence:81 },
  { id:"SUG-004", tyreId:"TYR-B03", vehicle:"TN59 AB1234", pos:"RL1", action:"MOVE_TO_TRAILER",  urgency:"medium",   reason:"Drive axle usage on TN59 is intensive. Trailer position will extend remaining life.", impact:"+2,200 km estimated life extension", kmSave:2200, confidence:79 },
  { id:"SUG-005", tyreId:"TYR-X03", vehicle:"TN69 GH4789", pos:"RL2", action:"RETREAD",          urgency:"low",      reason:"Tyre at 58% lifecycle. Retread now for max casing strength. 2nd retread viable.", impact:"Save ₹18,000 vs new tyre purchase", kmSave:null, confidence:84 },
];

const VALIDATION_RULES = [
  { rule:"No worn tyre on front axle",    check:(t,p)=>!(p==="FL"||p==="FR") || t.tread >= 4.0, fail:"Tread < 4mm — unsafe for steer axle" },
  { rule:"No critical tyre on drive axle",check:(t,p)=>!(p==="RL1"||p==="RR1"||p==="RL2"||p==="RR2") || t.risk!=="critical", fail:"Critical tyre not allowed on drive axle" },
  { rule:"Max 2 retreads per tyre",       check:(t)=>t.retreads < 3, fail:"Exceeded max retread limit (2)" },
  { rule:"Size compatibility",            check:(t,p,targetV)=>true, fail:"Tyre size mismatch for target vehicle" },
  { rule:"Thread pattern check",          check:(t,p)=>!(p==="FL"||p==="FR") || t.pattern==="RIB", fail:"LUG pattern not recommended for steer axle" },
];

const LIFECYCLE_EVENTS = [
  { tyreId:"TYR-001", stage:"Purchase",   date:"2022-06-01", km:0,      cost:28000, note:"New MRF Steel Muscle — vendor MRF Dealer, Chennai" },
  { tyreId:"TYR-001", stage:"Fitment",    date:"2022-06-02", km:46000,  cost:500,   note:"Fitted at FL — TN69 GH4789 · Odometer 46,000 km" },
  { tyreId:"TYR-001", stage:"Inspection", date:"2023-02-10", km:62000,  cost:0,     note:"Tread 6.2mm · Wear even · No damage" },
  { tyreId:"TYR-001", stage:"Rotation",   date:"2023-08-15", km:70000,  cost:800,   note:"FL → RL3 (KM-based rotation). Labour ₹800" },
  { tyreId:"TYR-001", stage:"Inspection", date:"2024-01-20", km:78000,  cost:0,     note:"Tread 5.8mm · Wear even · Good condition" },
  { tyreId:"TYR-001", stage:"Alert",      date:"2024-04-15", km:74875,  cost:0,     note:"AI: 8,200 km remaining — plan replacement in 60 days" },
];

// ─── Enhanced Axle Diagram with Drag-to-Rotate ────────────────────────────────
const TyreAxleDiagram = ({ vehicleNo }) => {
  const tyres = ALL_TYRE_POSITIONS[vehicleNo]||[];
  const grouped = {};
  tyres.forEach(t=>{ const axle=t.pos.replace(/[^A-Z]/g,'').slice(0,2); grouped[axle]=(grouped[axle]||[]); grouped[axle].push(t); });
  return (
    <div style={{ background:T.bgPanel, borderRadius:10, padding:14 }}>
      <div style={{ fontSize:11, fontWeight:700, color:T.textSub, marginBottom:10 }}>{vehicleNo} — Tyre Positions</div>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {tyres.length===0?<div style={{ color:T.textMuted, fontSize:11 }}>No tyre data</div>:
          [["FL","FR"],["RL1","RR1","RL2","RR2"],["RL3","RR3","RL4","RR4"]].map((row,ri)=>(
            <div key={ri} style={{ display:"flex", gap:6, alignItems:"center", justifyContent:"center" }}>
              {row.map(pos=>{
                const t=tyres.find(x=>x.pos===pos);
                if(!t) return null;
                return (
                  <div key={pos} style={{ width:44, height:54, borderRadius:6, border:`2px solid ${t.risk==="critical"?T.red:t.risk==="warning"?T.orange:t.risk==="retread"?T.blue:T.green}`, background:(t.risk==="critical"?T.red:t.risk==="warning"?T.orange:t.risk==="retread"?T.blue:T.green)+"18", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                    <div style={{ fontSize:8, fontWeight:700, color:T.textMuted }}>{pos}</div>
                    <div style={{ fontSize:9, color:t.risk==="critical"?T.red:t.risk==="warning"?T.orange:T.green, fontWeight:700 }}>{t.tread}mm</div>
                    <div style={{ fontSize:8, color:T.textMuted }}>{(t.kmLeft/1000).toFixed(0)}k</div>
                  </div>
                );
              })}
            </div>
          ))
        }
      </div>
    </div>
  );
};

// ─── Rotation Order Wizard ────────────────────────────────────────────────────
const RotationWizard = ({ prefill, onClose, onExecute }) => {
  const [f,sf]=useState({ tyreId:prefill?.tyreId||"", fromV:prefill?.vehicle||"", fromP:prefill?.pos||"", toV:prefill?.vehicle||"", toP:"", action:prefill?.action||"ROTATE_SAME_VEHICLE", reason:prefill?.reason||"" });
  const positions = ALL_TYRE_POSITIONS[f.toV]?.map(t=>t.pos)||[];
  return (
    <div className="ov"><div className="modal" style={{ maxWidth:460 }}>
      <div className="mhdr" style={{ background:"linear-gradient(135deg,#0D1428,#1A2A5E)" }}>
        <div className="rj" style={{ fontSize:16,fontWeight:700,color:T.blue }}>🔄 Tyre Rotation</div>
        <button className="btn" style={{ padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub}/></button>
      </div>
      <div className="mbdy" style={{ display:"grid",gap:10 }}>
        <div><label className="flabel">Tyre ID / TIN</label><input value={f.tyreId} onChange={e=>sf(x=>({...x,tyreId:e.target.value}))}/></div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
          <div><label className="flabel">From Vehicle</label>
            <select value={f.fromV} onChange={e=>sf(x=>({...x,fromV:e.target.value}))}>
              {Object.keys(ALL_TYRE_POSITIONS).map(v=><option key={v}>{v}</option>)}
            </select>
          </div>
          <div><label className="flabel">From Position</label>
            <select value={f.fromP} onChange={e=>sf(x=>({...x,fromP:e.target.value}))}>
              {(ALL_TYRE_POSITIONS[f.fromV]||[]).map(t=><option key={t.pos}>{t.pos}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
          <div><label className="flabel">To Vehicle</label>
            <select value={f.toV} onChange={e=>sf(x=>({...x,toV:e.target.value}))}>
              {Object.keys(ALL_TYRE_POSITIONS).map(v=><option key={v}>{v}</option>)}
            </select>
          </div>
          <div><label className="flabel">To Position</label>
            <select value={f.toP} onChange={e=>sf(x=>({...x,toP:e.target.value}))}>
              {positions.map(p=><option key={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <div><label className="flabel">Reason</label><input value={f.reason} onChange={e=>sf(x=>({...x,reason:e.target.value}))}/></div>
      </div>
      <div className="mftr">
        <button className="btn btn-gh" onClick={onClose}>Cancel</button>
        <button className="btn" style={{ background:T.blue,color:"#fff",fontWeight:700 }} onClick={()=>{onExecute&&onExecute(f);onClose();}}>🔄 Execute Rotation</button>
      </div>
    </div></div>
  );
};

// ─── Main Tyre Management Page ────────────────────────────────────────────────
const TyreManagementPage = () => {
  const allTyres = Object.values(ALL_TYRE_POSITIONS).flat();
  const critical = allTyres.filter(t=>t.risk==="critical");
  const warning  = allTyres.filter(t=>t.risk==="warning");
  return (
    <div>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
        <div><h1 className="rj" style={{ fontSize:28,fontWeight:700 }}>Tyre Intelligence</h1><p style={{ color:T.textSub,fontSize:12 }}>TIN tracking · Rotation scheduling · Lifecycle management</p></div>
        <button className="btn btn-p" style={{ fontSize:11 }}>+ Add Tyre</button>
      </div>
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(4,1fr)",marginBottom:18 }}>
        {[{ l:"Total Tyres",v:allTyres.length,c:T.blue },{ l:"Critical",v:critical.length,c:T.red },{ l:"Warning",v:warning.length,c:T.orange },{ l:"Healthy",v:allTyres.filter(t=>t.risk==="healthy").length,c:T.green }].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>
        ))}
      </div>
      {critical.length>0&&<div className="card" style={{ marginBottom:12,border:`1px solid ${T.red}44`,background:T.redGlow }}>
        <div className="section-title" style={{ color:T.red }}>🚨 Critical — Replace Before Next Trip</div>
        {critical.map(t=><div key={t.id} className="arow" style={{ borderLeftColor:T.red }}><div style={{ flex:1 }}><div style={{ fontWeight:600 }}>{t.id} · Pos: {t.pos}</div><div style={{ fontSize:11,color:T.textSub }}>{t.brand} · {t.kmLeft.toLocaleString()} km left · Tread: {t.tread}mm</div></div><button className="btn btn-r" style={{ fontSize:10 }}>Replace</button></div>)}
      </div>}
      <div className="card" style={{ padding:0 }}>
        <table className="tbl">
          <thead><tr><th>ID</th><th>TIN</th><th>Brand</th><th>Position</th><th>Vehicle</th><th>Risk</th><th>KM Left</th><th>Tread</th></tr></thead>
          <tbody>{allTyres.map((t,i)=>{
            const veh=Object.keys(ALL_TYRE_POSITIONS).find(v=>ALL_TYRE_POSITIONS[v].find(x=>x.id===t.id))||"—";
            return(<tr key={t.id||i}>
              <td className="mono" style={{ fontSize:11,color:T.accent }}>{t.id}</td>
              <td className="mono" style={{ fontSize:10,color:T.cyan }}>{t.tin||"—"}</td>
              <td style={{ fontWeight:600 }}>{t.brand}</td>
              <td><span className="badge bc" style={{ fontSize:9 }}>{t.pos}</span></td>
              <td className="mono" style={{ fontSize:11 }}>{veh}</td>
              <td><span className={`badge ${t.risk==="critical"?"br":t.risk==="warning"?"bo":t.risk==="retread"?"bb":"bg"}`} style={{ fontSize:9 }}>{t.risk}</span></td>
              <td className="mono" style={{ color:t.risk==="critical"?T.red:t.risk==="warning"?T.orange:T.text }}>{t.kmLeft.toLocaleString()}</td>
              <td style={{ color:t.tread<3?T.red:t.tread<4.5?T.orange:T.green,fontWeight:600 }}>{t.tread}mm</td>
            </tr>);
          })}</tbody>
        </table>
      </div>
    </div>
  );
};
const AgentPage = () => {
  const [sel, setSel] = useState(null);
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div><h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Agents & Commission</h1><p style={{ color:T.textSub, fontSize:12 }}>Freight brokers, commission ledger & payouts</p></div>
        <button className="btn btn-p"><Ic n="plus" s={14} c="#080B10" /> Add Agent</button>
      </div>
      <div className="kpi-row kpi3" style={{ marginBottom:18 }}>
        {[{ l:"Active Agents", v:AGENTS.length, c:T.green },{ l:"Commission Pending", v:fmt(AGENTS.reduce((s,a)=>s+(a.commType==="percent"?0:a.commValue),0)), c:T.orange },{ l:"Total Freight Sourced", v:fmt(AGENTS.reduce((s,a)=>s+a.totalFreight,0)), c:T.blue }].map(k => <div key={k.l} className="stat"><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>)}
      </div>
      <div className="grd2">
        {AGENTS.map(a => (
          <div key={a.id} className="card" style={{ cursor:"pointer" }} onClick={()=>setSel(a)}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <div><div style={{ fontWeight:700, fontSize:14 }}>{a.name}</div><div style={{ fontSize:11, color:T.textSub }}>{a.company} · {a.city}</div></div>
              <span className="badge bg">Active</span>
            </div>
            <div style={{ display:"flex", gap:14, fontSize:12, color:T.textSub }}>
              <div><span style={{ color:T.accent }}>{a.commType==="percent"?`${a.commValue}%`:fmt(a.commValue)}</span> comm.</div>
              <div><span style={{ color:T.green, fontWeight:600 }}>{a.totalTrips}</span> trips</div>
              <div style={{ marginLeft:"auto", color:T.green, fontWeight:700 }}>{fmt(a.totalFreight)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Smart Truck Onboarding AI Engine ────────────────────────────────────────
const TRUCK_MODEL_DB = {
  "Tata LPT 2518":    { make:"Tata",         gvw:25000, axles:3, tyres:10, category:"heavy",  fuel:"5.2 km/l", maxSpeed:"62 kmph", engineCC:5883,  body:["openbody","container","tipper"], tyreSizes:["295/80 R22.5","315/80 R22.5"], tyrePattern:{ front:"RIB", rear:"LUG" }, aiInsights:["Best for medium-haul (200–600 km)","Rear axle: use LUG pattern for traction","Rotate tyres every 12,000 km","Scheduled service every 20,000 km"] },
  "Tata LPT 3118":    { make:"Tata",         gvw:31000, axles:3, tyres:12, category:"heavy",  fuel:"4.8 km/l", maxSpeed:"58 kmph", engineCC:5883,  body:["tripper","flatbed"],              tyreSizes:["295/80 R22.5"],               tyrePattern:{ front:"RIB", rear:"LUG" }, aiInsights:["High-payload — avoid overloading beyond GVW 31T","Check air brake system daily","Suitable for quarry/mining operations"] },
  "Tata Prima 4928":  { make:"Tata Prima",   gvw:49000, axles:5, tyres:18, category:"heavy",  fuel:"3.8 km/l", maxSpeed:"55 kmph", engineCC:12000, body:["trailer","flatbed"],              tyreSizes:["315/80 R22.5","295/80 R22.5"],tyrePattern:{ front:"RIB", rear:"LUG" }, aiInsights:["Long-haul king — best for 800+ km routes","Use Bridgestone or MRF for drive axle","Retread trailer axle tyres after 90,000 km"] },
  "Ashok Leyland 2518":{ make:"Ashok Leyland",gvw:25000, axles:3, tyres:10, category:"heavy", fuel:"4.9 km/l", maxSpeed:"60 kmph", engineCC:5660,  body:["openbody","container"],           tyreSizes:["295/80 R22.5","315/80 R22.5"],tyrePattern:{ front:"RIB", rear:"LUG" }, aiInsights:["Reliable for NH routes","Monitor clutch health — avg life 80,000 km","Check steering alignment every 40,000 km"] },
  "Ashok Leyland 4923":{ make:"Ashok Leyland",gvw:47000, axles:5, tyres:18, category:"heavy", fuel:"3.5 km/l", maxSpeed:"55 kmph", engineCC:8300,  body:["trailer"],                        tyreSizes:["315/80 R22.5"],               tyrePattern:{ front:"RIB", rear:"LUG" }, aiInsights:["Full trailer spec — verify trailer coupling compatibility","Fuel efficiency improves by 8% with aerodynamic front guard"] },
  "BharatBenz 3523":  { make:"BharatBenz",   gvw:35000, axles:3, tyres:12, category:"heavy",  fuel:"5.4 km/l", maxSpeed:"60 kmph", engineCC:7200,  body:["flatbed","container","openbody"], tyreSizes:["315/80 R22.5"],               tyrePattern:{ front:"RIB", rear:"LUG" }, aiInsights:["Premium efficiency — monitor AdBlue levels","Telematics-ready — connect GPS immediately","Best for steel/coil transport on flatbed"] },
  "VECV Eicher 6016": { make:"VECV",         gvw:16000, axles:2, tyres:6,  category:"medium", fuel:"7.2 km/l", maxSpeed:"68 kmph", engineCC:3800,  body:["container","openbody"],           tyreSizes:["225/75 R17.5","215/75 R17.5"],tyrePattern:{ front:"RIB", rear:"LUG" }, aiInsights:["Ideal for FMCG distribution","6-tyre config — check tyre balance monthly","High fuel efficiency — monitor if drops below 6.5 km/l"] },
  "Tata Ace Gold":    { make:"Tata",         gvw:1700,  axles:2, tyres:4,  category:"LCV",    fuel:"17 km/l",  maxSpeed:"70 kmph", engineCC:700,   body:["lcv"],                            tyreSizes:["155/80 R13"],                 tyrePattern:{ front:"RIB", rear:"RIB" }, aiInsights:["Last-mile delivery specialist","4-tyre — rotate F-R every 8,000 km","Check clutch cable every 30,000 km"] },
  "Mahindra Bolero Pikup":{ make:"Mahindra", gvw:2000,  axles:2, tyres:4,  category:"LCV",    fuel:"14 km/l",  maxSpeed:"75 kmph", engineCC:2498,  body:["lcv"],                            tyreSizes:["195/65 R15"],                 tyrePattern:{ front:"RIB", rear:"RIB" }, aiInsights:["Excellent pick-up payload per ₹","Rear leaf spring — check every 30,000 km"] },
};

const USAGE_LOAD_MAP = {
  cement:    { loadType:"bulk-powder", bodyRec:"tipper",    tyreSuffix:"Dusty/abrasive roads — replace front tyres every 60,000 km" },
  steel:     { loadType:"heavy-dense", bodyRec:"flatbed",   tyreSuffix:"Heavy axle load — use max rated LUG tyres on drive axle" },
  fmcg:      { loadType:"light-volumetric", bodyRec:"container", tyreSuffix:"High trip frequency — rotate every 10,000 km" },
  chemicals: { loadType:"liquid-bulk", bodyRec:"tanker",    tyreSuffix:"Tanker load — check weight distribution every trip" },
  sand:      { loadType:"bulk-loose",  bodyRec:"tipper",    tyreSuffix:"Abrasive cargo — replace rear tyres more frequently" },
  general:   { loadType:"general",     bodyRec:"openbody",  tyreSuffix:"Mixed loads — standard rotation schedule applies" },
  machinery: { loadType:"heavy-dense", bodyRec:"flatbed",   tyreSuffix:"Low clearance loads — check bed strapping and tyre pressure" },
  ecommerce: { loadType:"light-volumetric", bodyRec:"container", tyreSuffix:"Multiple drops per day — monitor tyre wear on city routes" },
};

const AXLE_TYRE_CONFIG = {
  4:  [{ axle:"Front Axle (Steer)", positions:["FL","FR"] }, { axle:"Rear Axle", positions:["RL1","RR1"] }],
  6:  [{ axle:"Front Axle (Steer)", positions:["FL","FR"] }, { axle:"Rear Axle", positions:["RL1","RR1","RL2","RR2"] }],
  10: [{ axle:"Front Axle (Steer)", positions:["FL","FR"] }, { axle:"Rear Axle 1 (Drive)", positions:["RL1","RR1","RL2","RR2"] }, { axle:"Rear Axle 2 (Bogie)", positions:["RL3","RR3","RL4","RR4"] }],
  12: [{ axle:"Front Axle (Steer)", positions:["FL","FR"] }, { axle:"Rear Axle 1 (Drive)", positions:["RL1","RR1","RL2","RR2"] }, { axle:"Rear Axle 2 (Drive 2)", positions:["RL3","RR3","RL4","RR4"] }, { axle:"Rear Axle 3 (Bogie)", positions:["RL5","RR5","RL6","RR6"] }],
  18: [{ axle:"Steer Axle", positions:["FL","FR"] }, { axle:"Drive Axle 1", positions:["RL1","RR1","RL2","RR2"] }, { axle:"Drive Axle 2", positions:["RL3","RR3","RL4","RR4"] }, { axle:"Trailer Axle 1", positions:["TL1","TR1","TL2","TR2"] }, { axle:"Trailer Axle 2", positions:["TL3","TR3","TL4","TR4"] }],
};

function aiDetectFromRegNo(regNo) {
  // Indian number plate → state detection
  const stateMap = { "TN":"Tamil Nadu","KA":"Karnataka","AP":"Andhra Pradesh","MH":"Maharashtra","DL":"Delhi","UP":"Uttar Pradesh","RJ":"Rajasthan","GJ":"Gujarat","WB":"West Bengal","MP":"Madhya Pradesh" };
  const parts = regNo.replace(/\s/g,"").toUpperCase();
  const state = stateMap[parts.substring(0,2)] || "Unknown State";
  const distCode = parts.substring(2,4);
  return { state, distCode, valid: parts.length >= 6 };
}

function aiDetectBodyType(modelSpec, usage) {
  if (!modelSpec) return null;
  const usageMap = USAGE_LOAD_MAP[usage];
  if (usageMap && modelSpec.body.includes(usageMap.bodyRec)) return usageMap.bodyRec;
  return modelSpec.body[0];
}

function detectCondition(km) {
  if (!km || km < 2000)  return { label:"New",           color:T.green,  desc:"Brand new — 0 maintenance baseline" };
  if (km < 50000)        return { label:"Good",          color:T.blue,   desc:"Well within first service lifecycle" };
  if (km < 150000)       return { label:"Used — Active", color:T.accent, desc:"Standard operational range for Indian highways" };
  if (km < 300000)       return { label:"High Mileage",  color:T.orange, desc:"Increased maintenance frequency recommended" };
  return                        { label:"Critical Age",  color:T.red,    desc:"Full vehicle health audit required before ops" };
}

// ─── Add Vehicle Wizard (Smart Onboarding) ────────────────────────────────────
const AddVehicleWizard = ({ onClose, onSave }) => {
  const [step,setStep]=useState(1);
  const [f,sf]=useState({regNo:"",make:"Tata",model:"LPT 2518",year:"2023",axle:"6x4",gvw:"25",ownership:"Owned",insuranceExpiry:"",fcExpiry:"",permitType:"National Permit",purchaseCost:""});
  const rf=(k,v)=>sf(x=>({...x,[k]:v}));
  return (<div className="ov" style={{ alignItems:"flex-start",paddingTop:20 }}><div className="modal" style={{ maxWidth:520,width:"100%",margin:"0 auto" }}>
    <div className="mhdr" style={{ background:"linear-gradient(135deg,#0C1220,#1E3A5F)",borderBottom:`1px solid ${T.blue}33` }}>
      <div className="rj" style={{ fontSize:18,fontWeight:700,color:T.blue }}>🚛 Add Vehicle — Step {step}/2</div>
      <button className="btn" style={{ padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub}/></button>
    </div>
    <div className="mbdy">
      {step===1&&<div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:12 }}>
          <div><label className="flabel">Reg No *</label><input value={f.regNo} onChange={e=>rf("regNo",e.target.value.toUpperCase())} placeholder="TN69 GH1234" style={{ fontFamily:"mono" }}/></div>
          <div><label className="flabel">Make</label><select value={f.make} onChange={e=>rf("make",e.target.value)}><option>Tata</option><option>Ashok Leyland</option><option>BharatBenz</option><option>Eicher</option><option>Volvo</option></select></div>
          <div><label className="flabel">Model</label><input value={f.model} onChange={e=>rf("model",e.target.value)}/></div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10 }}>
          <div><label className="flabel">Year</label><select value={f.year} onChange={e=>rf("year",e.target.value)}>{[2025,2024,2023,2022,2021,2020].map(y=><option key={y}>{y}</option>)}</select></div>
          <div><label className="flabel">Axle</label><select value={f.axle} onChange={e=>rf("axle",e.target.value)}><option>4x2</option><option>6x2</option><option>6x4</option></select></div>
          <div><label className="flabel">GVW (T)</label><input value={f.gvw} onChange={e=>rf("gvw",e.target.value)}/></div>
          <div><label className="flabel">Ownership</label><select value={f.ownership} onChange={e=>rf("ownership",e.target.value)}><option>Owned</option><option>Financed</option><option>Leased</option></select></div>
        </div>
      </div>}
      {step===2&&<div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10 }}>
          <div><label className="flabel">Insurance Expiry</label><input type="date" value={f.insuranceExpiry} onChange={e=>rf("insuranceExpiry",e.target.value)}/></div>
          <div><label className="flabel">FC Expiry</label><input type="date" value={f.fcExpiry} onChange={e=>rf("fcExpiry",e.target.value)}/></div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
          <div><label className="flabel">Permit Type</label><select value={f.permitType} onChange={e=>rf("permitType",e.target.value)}><option>National Permit</option><option>State Permit</option></select></div>
          <div><label className="flabel">Purchase Cost (₹)</label><input value={f.purchaseCost} onChange={e=>rf("purchaseCost",e.target.value)}/></div>
        </div>
      </div>}
      <div style={{ display:"flex",justifyContent:"space-between",marginTop:14,paddingTop:12,borderTop:`1px solid ${T.border}` }}>
        <button className="btn btn-gh" onClick={()=>step>1?setStep(1):onClose()}>{step===1?"Cancel":"← Back"}</button>
        <button className="btn btn-p" onClick={()=>step<2?setStep(2):(onSave&&onSave({id:`V-${Date.now()}`,...f,num:f.regNo,health:88,status:"Available",odometer:0}),onClose())}>{step===2?"✅ Add Vehicle":"Next →"}</button>
      </div>
    </div>
  </div></div>);
};
// ─── Vehicle Detail Panel ─────────────────────────────────────────────────────
const VehicleDetailPanel = ({ v, onClose }) => {
  const docs = [
    {l:"RC Book",exp:v.rcExp||"2026-03-15",done:true},{l:"Insurance",exp:v.insuranceExp||"2025-12-01",done:true},
    {l:"Fitness",exp:v.fitnessExp||"2026-06-30",done:true},{l:"Permit",exp:v.permitExp||"2025-11-20",done:false},
    {l:"PUC",exp:v.pucExp||"2025-07-10",done:true},{l:"Toll Tag",exp:"N/A",done:!!v.fastag},
  ];
  const expiringSoon = docs.filter(d=>d.exp!=="N/A"&&new Date(d.exp)<new Date(Date.now()+30*86400000));
  return (
    <div className="ov"><div className="modal" style={{ maxWidth:640 }}>
      <div className="mhdr" style={{ background:"linear-gradient(135deg,#040D1A,#0F2457,#1A3A7A)", borderBottom:`1px solid ${T.blue}33` }}>
        <div>
          <div className="rj" style={{ fontSize:18,fontWeight:700,color:T.accent }}>🚛 {v.regNo}</div>
          <div style={{ fontSize:11,color:T.textMuted }}>{v.type} · {v.make} {v.model} · {v.year}</div>
        </div>
        <button className="btn" style={{ padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub}/></button>
      </div>
      <div className="mbdy">
        {expiringSoon.length>0&&<div style={{ padding:"8px 12px",background:T.orange+"11",border:`1px solid ${T.orange}33`,borderRadius:8,marginBottom:10,fontSize:12,color:T.orange }}>⚠️ {expiringSoon.map(d=>d.l).join(", ")} expiring soon</div>}
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14 }}>
          <div className="card" style={{ padding:"10px 12px" }}>
            <div className="section-title">Vehicle Info</div>
            {[{l:"Reg No",v:v.regNo},{l:"Type",v:v.type},{l:"Make/Model",v:`${v.make} ${v.model}`},{l:"Year",v:v.year},{l:"Capacity",v:v.capacity},{l:"Status",v:v.status},{l:"Assigned Driver",v:v.driver||"Unassigned"},{l:"Engine No",v:v.engineNo||"—"},{l:"Chassis No",v:v.chassisNo||"—"}].map(r=>(
              <div key={r.l} style={{ display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${T.border}22`,fontSize:12 }}>
                <span style={{ color:T.textMuted }}>{r.l}</span><span style={{ fontWeight:500 }}>{r.v||"—"}</span>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding:"10px 12px" }}>
            <div className="section-title">Documents & Compliance</div>
            {docs.map(d=>(
              <div key={d.l} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:`1px solid ${T.border}22`,fontSize:12 }}>
                <span style={{ color:T.textMuted }}>{d.l}</span>
                <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                  <span style={{ fontSize:11,color:T.textSub }}>{d.exp}</span>
                  <span style={{ fontSize:11,color:d.done?T.green:T.red }}>{d.done?"✓":"✗"}</span>
                </div>
              </div>
            ))}
            <div style={{ marginTop:10 }}>
              <div className="section-title" style={{ fontSize:10 }}>Financial</div>
              {[{l:"Purchase Cost",v:`₹${(v.purchaseCost||2500000).toLocaleString()}`},{l:"Current Value",v:`₹${Math.round((v.purchaseCost||2500000)*0.7).toLocaleString()}`},{l:"Monthly EMI",v:v.emi?`₹${v.emi.toLocaleString()}`:"—"}].map(r=>(
                <div key={r.l} style={{ display:"flex",justifyContent:"space-between",padding:"4px 0",fontSize:12 }}>
                  <span style={{ color:T.textMuted }}>{r.l}</span><span style={{ fontWeight:500,color:T.accent }}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mftr">
        <button className="btn btn-gh" onClick={onClose}>Close</button>
        <button className="btn btn-b" style={{ fontSize:12 }}>✏️ Edit Vehicle</button>
      </div>
    </div></div>
  );
};

// ─── Vehicle Master Page ──────────────────────────────────────────────────────
const VehicleMasterPage = () => {
  const [showAdd, setShowAdd]   = useState(false);
  const [selVeh, setSelVeh]     = useState(null);
  const [fleet, setFleet]       = useState(FLEET_DATA);
  const [filterStatus, setFilterStatus] = useState("All");
  const complianceColor = (s) => s==="Valid"||s==="Paid"?T.green:s==="Expired"?T.red:T.orange;

  const handleSave = (form) => {
    const newVeh = {
      id:`VH-${String(fleet.length+1).padStart(3,"0")}`,
      num:form.regNo, typeId:"openbody", subtypeId:"openbody_std",
      wheels:`${form.tyreCount||"—"} Wheeler`,
      model:form.model, make:form.make, year:new Date(form.purchaseDate||Date.now()).getFullYear(),
      status:"Active", health:100, ownership:form.ownership,
      purchaseCost:parseInt(form.purchaseCost)||0,
      purchaseDate:form.purchaseDate,
      insurance:form.insuranceExp?"Valid":"Pending",
      fc:form.fcExp?"Valid":"Pending",
      tax:form.taxPaidDate?"Paid":"Pending",
      km:parseInt(form.odometer)||0,
      revenue:0, cost:0, fuel:form.fuel||"—", speed:"—",
    };
    setFleet(f => [newVeh, ...f]);
  };

  const filtered = filterStatus==="All" ? fleet : fleet.filter(v=>v.status===filterStatus);

  const complianceAlerts = fleet.filter(v =>
    v.insurance!=="Valid"||v.fc==="Expired"||v.tax!=="Paid"
  );

  return (
    <div>
      {showAdd   && <AddVehicleWizard  onClose={()=>setShowAdd(false)} onSave={handleSave} />}
      {selVeh    && <VehicleDetailPanel v={selVeh} onClose={()=>setSelVeh(null)} />}

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Vehicle Master & Compliance</h1>
          <p style={{ color:T.textSub, fontSize:12 }}>Every lorry as a profit asset — smart onboarding · lifecycle · compliance · P&L</p>
        </div>
        <button className="btn btn-p" onClick={()=>setShowAdd(true)}><Ic n="plus" s={14} c="#080B10" /> Add Vehicle</button>
      </div>

      {/* KPI row */}
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(5,1fr)", marginBottom:18 }}>
        {[
          { l:"Total Fleet",    v:fleet.length,                              c:T.blue   },
          { l:"Active",         v:fleet.filter(v=>v.status==="Active").length, c:T.green  },
          { l:"On Trip",        v:fleet.filter(v=>v.status==="On Trip").length, c:T.accent },
          { l:"Maintenance",    v:fleet.filter(v=>v.status==="Maintenance").length, c:T.orange },
          { l:"Compliance Issues",v:complianceAlerts.length,                 c:T.red    },
        ].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}>
            <div className="stat-v" style={{ color:k.c }}>{k.v}</div>
            <div className="stat-l">{k.l}</div>
          </div>
        ))}
      </div>

      {/* Compliance alerts */}
      {complianceAlerts.length > 0 && (
        <div className="card" style={{ marginBottom:14, border:`1px solid ${T.orange}44`, background:T.orangeGlow }}>
          <div className="section-title" style={{ color:T.orange }}>🔔 Compliance Alerts — {complianceAlerts.length} vehicles need attention</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
            {[
              { veh:"TN59 AB1234", doc:"Insurance",    exp:"Expiring in 7d",  color:T.orange },
              { veh:"TN45 CD5678", doc:"FC Certificate",exp:"EXPIRED",        color:T.red    },
              { veh:"TN69 GH4789", doc:"Road Tax",     exp:"Due in 12d",      color:T.orange },
            ].map((a,i)=>(
              <div key={i} style={{ padding:10, background:T.bgCard, borderRadius:8, borderLeft:`3px solid ${a.color}`, cursor:"pointer" }}>
                <div className="mono" style={{ fontSize:11, color:T.accent }}>{a.veh}</div>
                <div style={{ fontSize:11, fontWeight:600, marginTop:2 }}>{a.doc}</div>
                <div style={{ fontSize:10, color:a.color, fontWeight:600, marginTop:2 }}>{a.exp}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter bar */}
      <div style={{ display:"flex", gap:8, marginBottom:12, alignItems:"center" }}>
        <div className="tabs" style={{ marginBottom:0 }}>
          {["All","Active","On Trip","Maintenance"].map(s=>(
            <div key={s} className={`tab ${filterStatus===s?"on":""}`} onClick={()=>setFilterStatus(s)} style={{ fontSize:12 }}>{s}</div>
          ))}
        </div>
      </div>

      {/* Fleet table */}
      <div className="card" style={{ padding:0 }}>
        <table className="tbl">
          <thead>
            <tr>
              <th>Vehicle No</th><th>Type</th><th>Config</th><th>Make / Year</th>
              <th>KM</th><th>Health</th><th>Insurance</th><th>FC</th><th>Tax</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(v => {
              const vtype = VEHICLE_SCHEMA.find(x=>x.id===v.typeId);
              return (
                <tr key={v.id} style={{ cursor:"pointer" }} onClick={()=>setSelVeh(v)}>
                  <td className="mono" style={{ fontSize:11, color:T.accent, fontWeight:700 }}>{v.num}</td>
                  <td><span style={{ fontSize:18 }}>{vtype?.icon||"🚛"}</span></td>
                  <td style={{ fontSize:11 }}>{vtype?.label||"—"} · {v.wheels}</td>
                  <td style={{ fontSize:11 }}>{v.make} {v.year}</td>
                  <td className="mono" style={{ fontSize:11 }}>{v.km.toLocaleString()}</td>
                  <td>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <div className="pbar" style={{ width:46 }}><div className="pfill" style={{ width:`${v.health}%`, background:v.health>80?T.green:v.health>60?T.accent:T.red }} /></div>
                      <span style={{ fontSize:11, color:v.health>80?T.green:v.health>60?T.accent:T.red }}>{v.health}%</span>
                    </div>
                  </td>
                  <td><span style={{ fontSize:11, fontWeight:600, color:complianceColor(v.insurance) }}>{v.insurance}</span></td>
                  <td><span style={{ fontSize:11, fontWeight:600, color:complianceColor(v.fc) }}>{v.fc}</span></td>
                  <td><span style={{ fontSize:11, fontWeight:600, color:complianceColor(v.tax) }}>{v.tax}</span></td>
                  <td><span className={`badge ${v.status==="Active"?"bg":v.status==="On Trip"?"bb":"ba"}`}>{v.status}</span></td>
                  <td onClick={e=>e.stopPropagation()}>
                    <button className="btn" style={{ fontSize:10, padding:"3px 8px", background:T.accentGlow, color:T.accent, border:`1px solid ${T.accent}33` }} onClick={()=>setSelVeh(v)}>View →</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════════════════════
// DRIVER ONBOARDING — AI-POWERED 5-STEP WIZARD + FULL DRIVERS PAGE
// ═══════════════════════════════════════════════════════════════════════════════

const CDL_CATEGORIES = [
  { id:"LMV",   label:"LMV — Light Motor Vehicle",     icon:"🚗", vehicles:"Cars, LCVs, pickups up to 7.5T",         minExp:0  },
  { id:"MCWG",  label:"MCWG — Motorcycle with Gear",   icon:"🏍️", vehicles:"Motorcycles and 3-wheelers",             minExp:0  },
  { id:"HMV",   label:"HMV — Heavy Motor Vehicle",     icon:"🚛", vehicles:"Trucks, buses, heavy vehicles > 12T",    minExp:2  },
  { id:"HTV",   label:"HTV — Heavy Transport Vehicle", icon:"🚚", vehicles:"Tankers, trailers, multi-axle trucks",   minExp:3  },
  { id:"TRANS", label:"Transport Vehicle",             icon:"🚌", vehicles:"Commercial transport, school bus",        minExp:1  },
];

const ROUTE_EXPERTISE = [
  "Chennai — Bangalore (NH-48)",
  "Chennai — Mumbai (NH-44)",
  "Chennai — Hyderabad (NH-65)",
  "Coimbatore — Bangalore (NH-948)",
  "Chennai — Delhi (long haul)",
  "Tamil Nadu state routes",
  "Karnataka state routes",
  "Rajasthan / Gujarat desert routes",
  "Himalayan / mountain routes",
];

const LOAD_EXPERTISE = [
  { id:"fmcg",      label:"FMCG / Consumer Goods", icon:"📦" },
  { id:"cement",    label:"Cement / Sand / Bulk",   icon:"🏗️" },
  { id:"steel",     label:"Steel / Metals",         icon:"⚙️" },
  { id:"chemicals", label:"Chemicals / Hazmat",     icon:"⚗️" },
  { id:"perishable",label:"Perishable / Cold Chain", icon:"❄️" },
  { id:"machinery", label:"Heavy Machinery",        icon:"🏭" },
];

function aiDriverRiskScore(form) {
  let risk = "low"; let score = 100; let flags = [];
  const exp = parseInt(form.expYears)||0;
  const licenseExp = new Date(form.licenseExp);
  const today = new Date();
  const daysToExp = Math.floor((licenseExp - today) / 86400000);
  if (exp < 1)  { score -= 30; flags.push("Less than 1 year experience"); }
  else if (exp < 2) { score -= 15; flags.push("Under 2 years experience"); }
  if (daysToExp < 0)  { score -= 40; flags.push("License EXPIRED"); }
  else if (daysToExp < 90) { score -= 20; flags.push("License expiring within 90 days"); }
  if (form.accidentHistory==="Yes — 1") { score -= 15; flags.push("1 prior accident on record"); }
  if (form.accidentHistory==="Yes — 2+") { score -= 30; flags.push("2+ accidents — high risk"); }
  if (!form.mobileVerified) { score -= 10; flags.push("Mobile not yet verified"); }
  if (score >= 80) risk = "low";
  else if (score >= 55) risk = "medium";
  else risk = "high";
  return { risk, score: Math.max(score, 0), flags };
}

const AddDriverWizard = ({ onClose, onSave }) => {
  const [step,setStep]=useState(1);
  const [f,sf]=useState({name:"",mobile:"",licenseNo:"",licenseType:"PSV/HMV",licenseExp:"",expYears:"",aadharNo:""});
  const rf=(k,v)=>sf(x=>({...x,[k]:v}));
  return (<div className="ov" style={{ alignItems:"flex-start",paddingTop:20 }}><div className="modal" style={{ maxWidth:520,width:"100%",margin:"0 auto" }}>
    <div className="mhdr" style={{ background:"linear-gradient(135deg,#0C1220,#1E3A5F)",borderBottom:`1px solid ${T.blue}33` }}>
      <div className="rj" style={{ fontSize:18,fontWeight:700,color:T.blue }}>👤 Add Driver — Step {step}/2</div>
      <button className="btn" style={{ padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub}/></button>
    </div>
    <div className="mbdy">
      {step===1&&<div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12 }}>
          <div><label className="flabel">Full Name *</label><input value={f.name} onChange={e=>rf("name",e.target.value)} placeholder="Driver full name"/></div>
          <div><label className="flabel">Mobile *</label><input value={f.mobile} onChange={e=>rf("mobile",e.target.value)} placeholder="+91 98765 43210"/></div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
          <div><label className="flabel">Aadhaar No</label><input value={f.aadharNo} onChange={e=>rf("aadharNo",e.target.value)} placeholder="XXXX XXXX 1234"/></div>
          <div><label className="flabel">Experience (years)</label><input type="number" value={f.expYears} onChange={e=>rf("expYears",e.target.value)} placeholder="5"/></div>
        </div>
      </div>}
      {step===2&&<div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12 }}>
          <div><label className="flabel">DL Number *</label><input value={f.licenseNo} onChange={e=>rf("licenseNo",e.target.value.toUpperCase())} style={{ fontFamily:"mono" }}/></div>
          <div><label className="flabel">DL Class</label><select value={f.licenseType} onChange={e=>rf("licenseType",e.target.value)}><option>PSV/HMV</option><option>HMV</option><option>LMV</option></select></div>
        </div>
        <div><label className="flabel">License Expiry *</label><input type="date" value={f.licenseExp} onChange={e=>rf("licenseExp",e.target.value)}/></div>
      </div>}
      <div style={{ display:"flex",justifyContent:"space-between",marginTop:14,paddingTop:12,borderTop:`1px solid ${T.border}` }}>
        <button className="btn btn-gh" onClick={()=>step>1?setStep(1):onClose()}>{step===1?"Cancel":"← Back"}</button>
        <button className="btn btn-p" onClick={()=>step<2?setStep(2):(onSave&&onSave({id:`DRV-${Date.now()}`,...f,score:78,status:"Available",totalTrips:0,kmDriven:0,advanceBalance:0,cdl:f.licenseType}),onClose())}>{step===2?"✅ Add Driver":"Next →"}</button>
      </div>
    </div>
  </div></div>);
};
const DriversPage = () => {
  const [drivers,setDrivers]=useState(DRIVERS_DATA);
  const [showAdd,setShowAdd]=useState(false);
  const [sel,setSel]=useState(null);
  const [search,setSearch]=useState("");
  const filtered=drivers.filter(d=>d.name.toLowerCase().includes(search.toLowerCase())||d.licNo.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
        <div><h1 className="rj" style={{ fontSize:28,fontWeight:700 }}>Driver Management</h1><p style={{ color:T.textSub,fontSize:12 }}>{drivers.length} drivers · Compliance tracking · Performance scores</p></div>
        <button className="btn btn-p" onClick={()=>setShowAdd(true)}>+ Add Driver</button>
      </div>
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(4,1fr)",marginBottom:18 }}>
        {[{l:"Total",v:drivers.length,c:T.blue},{l:"Active",v:drivers.filter(d=>d.status==="Active").length,c:T.green},{l:"On Trip",v:drivers.filter(d=>d.status==="On Trip").length,c:T.orange},{l:"Avg Score",v:Math.round(drivers.reduce((s,d)=>s+(d.score||80),0)/drivers.length)+"%",c:T.accent}].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>
        ))}
      </div>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search driver name or license…" style={{ width:280,marginBottom:14 }}/>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12 }}>
        {filtered.map(d=>(
          <div key={d.id} className="card" style={{ cursor:"pointer" }} onClick={()=>setSel(d)}>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10 }}>
              <div style={{ width:40,height:40,borderRadius:"50%",background:`linear-gradient(135deg,${T.blue},${T.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:700,color:"#fff",flexShrink:0 }}>{d.name[0]}</div>
              <div>
                <div style={{ fontSize:13,fontWeight:700 }}>{d.name}</div>
                <div className="mono" style={{ fontSize:10,color:T.textMuted }}>{d.id}</div>
              </div>
              <span className="badge" style={{ marginLeft:"auto",background:(d.status==="Active"?T.green:d.status==="On Trip"?T.orange:T.textMuted)+"22",color:d.status==="Active"?T.green:d.status==="On Trip"?T.orange:T.textMuted }}>{d.status}</span>
            </div>
            {[{l:"License",v:d.licNo},{l:"Phone",v:d.phone},{l:"Vehicle",v:d.vehicle||"Unassigned"},{l:"Experience",v:d.experience}].map(r=>(
              <div key={r.l} style={{ display:"flex",justifyContent:"space-between",fontSize:11,padding:"3px 0",borderBottom:`1px solid ${T.border}22` }}>
                <span style={{ color:T.textMuted }}>{r.l}</span><span style={{ fontWeight:500 }}>{r.v||"—"}</span>
              </div>
            ))}
            <div style={{ marginTop:8,height:4,background:T.bgPanel,borderRadius:2 }}>
              <div style={{ height:"100%",width:(d.score||80)+"%",background:`linear-gradient(90deg,${T.blue},${T.accent})`,borderRadius:2 }}/>
            </div>
            <div style={{ fontSize:10,color:T.textMuted,textAlign:"right",marginTop:2 }}>Score: {d.score||80}%</div>
          </div>
        ))}
      </div>
      {showAdd&&<AddDriverWizard onClose={()=>setShowAdd(false)} onSave={d=>{setDrivers(ds=>[...ds,{...d,id:"DRV-"+(ds.length+1).toString().padStart(3,"0")}]);setShowAdd(false);}}/>}
      {sel&&<div className="ov"><div className="modal" style={{ maxWidth:480 }}>
        <div className="mhdr">
          <div className="rj" style={{ fontSize:16,fontWeight:700 }}>{sel.name}</div>
          <button className="btn" style={{ padding:"5px 9px" }} onClick={()=>setSel(null)}><Ic n="x" s={14} c={T.textSub}/></button>
        </div>
        <div className="mbdy">
          {[{l:"ID",v:sel.id},{l:"License No",v:sel.licNo},{l:"Phone",v:sel.phone},{l:"Experience",v:sel.experience},{l:"Status",v:sel.status},{l:"Current Vehicle",v:sel.vehicle||"Unassigned"},{l:"Total Trips",v:sel.totalTrips||0},{l:"Performance Score",v:(sel.score||80)+"%"}].map(r=>(
            <div key={r.l} style={{ display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${T.border}44`,fontSize:13 }}>
              <span style={{ color:T.textSub }}>{r.l}</span><span style={{ fontWeight:600 }}>{r.v}</span>
            </div>
          ))}
        </div>
        <div className="mftr">
          <button className="btn btn-gh" onClick={()=>setSel(null)}>Close</button>
        </div>
      </div></div>}
    </div>
  );
};

const FinancePage = () => {
  const allTrips = [
    { id:"TRP-2025-0041", vehicleType:"own", driver:"Mani Kumar", freight:42000, exp:16500, agent:"Raja Broker" },
    { id:"TRP-2025-0042", vehicleType:"own", driver:"Selvam R", freight:38000, exp:14700, agent:"Suresh Agency" },
    { id:"TRP-2025-0043", vehicleType:"vendor", driver:"Sri Murugan Transport", freight:75000, exp:61760, agent:"Direct" },
    { id:"TRP-2025-0044", vehicleType:"own", driver:"Arjun D", freight:33000, exp:12100, agent:"Kumar Freight" },
    { id:"TRP-2025-0045", vehicleType:"vendor", driver:"KPR Fleet Solutions", freight:92000, exp:102400, agent:"Raja Broker" },
  ];
  const totalRev = allTrips.reduce((s,t)=>s+t.freight,0);
  const totalExp = allTrips.reduce((s,t)=>s+t.exp,0);
  return (
    <div>
      <h1 className="rj" style={{ fontSize:28, fontWeight:700, marginBottom:6 }}>Finance & P&L</h1>
      <p style={{ color:T.textSub, fontSize:12, marginBottom:20 }}>Trip-level profitability — own fleet vs vendor analysis</p>
      <div className="kpi-row kpi3" style={{ marginBottom:18 }}>
        {[{ l:"Total Freight Revenue", v:fmt(totalRev), c:T.green },{ l:"Total Expenses", v:fmt(totalExp), c:T.red },{ l:"Net Profit (MTD)", v:fmt(totalRev-totalExp), c:T.accent }].map(k => <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>)}
      </div>
      <div className="card" style={{ padding:0 }}>
        <table className="tbl">
          <thead><tr><th>Trip</th><th>Type</th><th>Party</th><th>Freight</th><th>Expenses</th><th>Net Profit</th><th>Margin</th></tr></thead>
          <tbody>
            {allTrips.map(t => {
              const profit = t.freight-t.exp;
              return <tr key={t.id}>
                <td className="mono" style={{ fontSize:11, color:T.accent }}>{t.id}</td>
                <td>{t.vehicleType==="own"?<span className="badge bg">Own</span>:<span className="badge bp">Vendor</span>}</td>
                <td style={{ fontSize:12 }}>{t.driver}</td>
                <td style={{ color:T.green, fontWeight:600 }}>{fmt(t.freight)}</td>
                <td style={{ color:T.red }}>{fmt(t.exp)}</td>
                <td style={{ fontWeight:700, color:profit>0?T.green:T.red }}>{fmt(profit)}</td>
                <td style={{ fontSize:11, color:T.textSub }}>{pct(profit,t.freight)}</td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════
const Dashboard = ({ setPage }) => {
  const highRisk = AI_PREDICTIONS.filter(p => p.riskScore==="HIGH");
  return (
    <div>
      <div style={{ marginBottom:22 }}>
        <h1 className="rj" style={{ fontSize:30, fontWeight:700, letterSpacing:.5 }}>Control Tower</h1>
        <p style={{ color:T.textSub, fontSize:12 }}>Wednesday, 15 April 2026 — Fleet Business OS Overview</p>
      </div>
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(5,1fr)", marginBottom:18 }}>
        {[
          { l:"Today Revenue", v:"₹2,83,000", c:T.green },
          { l:"Active Trips", v:3, c:T.blue },
          { l:"Inspection Pending", v:2, c:T.orange },
          { l:"High Risk Vehicles", v:highRisk.length, c:T.red },
          { l:"Open Work Orders", v:WORK_ORDERS.filter(w=>w.status!=="Completed").length, c:T.purple },
        ].map(k => <div key={k.l} className="stat"><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>)}
      </div>
      <div className="grd2" style={{ marginBottom:16 }}>
        <div className="card">
          <div className="section-title" style={{ color:T.orange }}>⚡ Pending Actions</div>
          {[
            { icon:"pretrip", label:"Pre-Trip Pending — TRP-2025-0043", sub:"Trichy → Mumbai · Sri Murugan Transport", color:T.green, page:"trips" },
            { icon:"posttrip", label:"Post-Trip Pending — TRP-2025-0042", sub:"Madurai → Bangalore · Selvam R", color:T.blue, page:"trips" },
            { icon:"alert", label:`${highRisk.length} Vehicles HIGH Risk`, sub:highRisk.map(p=>p.vehicle).join(", "), color:T.red, page:"ai" },
            { icon:"wrench", label:"Work Order Open — TN59 AB1234", sub:"Alternator fault — Power Electricals", color:T.orange, page:"workshop" },
            { icon:"shield", label:"Insurance Expiring — TN59 AB1234", sub:"7 days remaining", color:T.red, page:"fleet" },
          ].map((a,i) => (
            <div key={i} className="arow" style={{ borderLeftColor:a.color }}>
              <Ic n={a.icon} s={13} c={a.color} />
              <div style={{ flex:1 }}><div style={{ fontSize:12, fontWeight:600, color:a.color }}>{a.label}</div><div style={{ fontSize:11, color:T.textSub }}>{a.sub}</div></div>
              <button className="btn btn-gh" style={{ fontSize:10, padding:"3px 10px" }} onClick={()=>setPage(a.page)}>Fix →</button>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="section-title">Fleet Health Overview</div>
          {FLEET_DATA.map(v => {
            const vt = VEHICLE_SCHEMA.find(x=>x.id===v.typeId);
            return (
              <div key={v.id} style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:3 }}>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <span style={{ fontSize:14 }}>{vt?.icon}</span>
                    <span className="mono" style={{ fontWeight:700, color:T.accent }}>{v.num}</span>
                  </div>
                  <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                    <span className={`badge ${v.status==="Active"?"bg":v.status==="On Trip"?"bb":"ba"}`} style={{ fontSize:9 }}>{v.status}</span>
                    <span style={{ color:v.health>80?T.green:v.health>60?T.accent:T.red, fontWeight:600 }}>{v.health}%</span>
                  </div>
                </div>
                <div className="pbar"><div className="pfill" style={{ width:`${v.health}%`, background:v.health>80?T.green:v.health>60?T.accent:T.red }} /></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="grd3">
        <div className="card">
          <div className="section-title">Journey Types Active</div>
          {JOURNEY_TYPES.map(jt => (
            <div key={jt.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${T.border}11` }}>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}><span style={{ color:jt.color, fontSize:16 }}>{jt.icon}</span><span style={{ fontSize:12 }}>{jt.label}</span></div>
              <span className="badge" style={{ background:jt.color+"20", color:jt.color, fontSize:9 }}>{jt.tag}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="section-title">AI Risk Summary</div>
          {AI_PREDICTIONS.map(p => (
            <div key={p.vehicle} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${T.border}22` }}>
              <span className="mono" style={{ fontSize:11, color:T.accent }}>{p.vehicle}</span>
              {riskBadge(p.riskScore)}
            </div>
          ))}
        </div>
        <div className="card">
          <div className="section-title">Work Orders</div>
          {WORK_ORDERS.map(wo => (
            <div key={wo.id} style={{ padding:"6px 0", borderBottom:`1px solid ${T.border}22` }}>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <div><div className="mono" style={{ fontSize:11, color:T.accent }}>{wo.id}</div><div style={{ fontSize:11, color:T.textSub }}>{wo.vehicle} · {wo.category}</div></div>
                <span className="badge" style={{ background:(wo.status==="Completed"?T.green:wo.status==="In Progress"?T.orange:T.blue)+"20", color:wo.status==="Completed"?T.green:wo.status==="In Progress"?T.orange:T.blue, fontSize:9 }}>{wo.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// BREAKDOWN & RECOVERY MODULE
// ═══════════════════════════════════════════════════════════════════════════════
const BREAKDOWN_DATA = [
  { id:"BRK-001", vehicle:"TN45 CD5678", driver:"Ramesh P", route:"Nagpur → Pune", location:"NH-44, Wardha", issue:"Engine overheating", severity:"critical", status:"Recovery in Progress", reported:"2025-04-15 14:32", eta:"2h 15m", recovery:"Vendor — KPR Recovery", cost:18500 },
  { id:"BRK-002", vehicle:"TN59 AB1234", driver:"Selvam R", route:"Madurai → Bangalore", location:"NH-7, Krishnagiri", issue:"Tyre burst (RL2)", severity:"medium", status:"On-Site Fix", reported:"2025-04-15 11:20", eta:"45m", recovery:"On-site mechanic", cost:4200 },
  { id:"BRK-003", vehicle:"TN22 IJ7890", driver:"Karthik M", route:"Chennai → Coimbatore", location:"Vellore bypass", issue:"Battery failure", severity:"minor", status:"Resolved", reported:"2025-04-14 09:15", eta:"—", recovery:"Own vehicle dispatch", cost:2800 },
];

const BreakdownPage = () => {
  const [bds,setBds]=useState(BREAKDOWN_DATA);
  const [sel,setSel]=useState(null);
  const open=bds.filter(b=>b.status!=="Resolved").length;
  return (
    <div>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
        <div><h1 className="rj" style={{ fontSize:28,fontWeight:700 }}>Breakdown Recovery</h1><p style={{ color:T.textSub,fontSize:12 }}>Real-time incident tracking · Vendor dispatch · Recovery timeline</p></div>
        <button className="btn btn-p" style={{ fontSize:11 }}>🚨 Report Breakdown</button>
      </div>
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(4,1fr)",marginBottom:18 }}>
        {[{l:"Active",v:open,c:T.red},{l:"Resolved",v:bds.filter(b=>b.status==="Resolved").length,c:T.green},{l:"Avg Resolution",v:"4.2h",c:T.blue},{l:"Recovery Cost",v:"₹"+bds.reduce((s,b)=>s+(b.cost||0),0).toLocaleString(),c:T.orange}].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>
        ))}
      </div>
      {open>0&&<div className="card" style={{ marginBottom:14,border:`1px solid ${T.red}44`,background:T.red+"11",padding:"10px 14px" }}>
        <div className="section-title" style={{ color:T.red,marginBottom:8 }}>🚨 Active Breakdowns ({open})</div>
        {bds.filter(b=>b.status!=="Resolved").map(b=>(
          <div key={b.id} className="arow" style={{ borderLeftColor:T.red,cursor:"pointer" }} onClick={()=>setSel(b)}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:12,fontWeight:600 }}>{b.vehicle} — {b.location}</div>
              <div style={{ fontSize:11,color:T.textSub }}>{b.issue} · Driver: {b.driver}</div>
            </div>
            <span className="badge" style={{ background:T.orange+"22",color:T.orange }}>{b.status}</span>
          </div>
        ))}
      </div>}
      <div className="card" style={{ padding:0 }}>
        <table className="tbl">
          <thead><tr><th>ID</th><th>Vehicle</th><th>Location</th><th>Issue</th><th>Driver</th><th>Status</th><th>Cost</th></tr></thead>
          <tbody>
            {bds.map(b=>(
              <tr key={b.id} style={{ cursor:"pointer" }} onClick={()=>setSel(b)}>
                <td className="mono" style={{ fontSize:11,color:T.accent }}>{b.id}</td>
                <td style={{ fontWeight:600,fontSize:12 }}>{b.vehicle}</td>
                <td style={{ fontSize:12 }}>{b.location}</td>
                <td style={{ fontSize:12 }}>{b.issue}</td>
                <td style={{ fontSize:12 }}>{b.driver}</td>
                <td><span className="badge" style={{ background:(b.status==="Resolved"?T.green:T.orange)+"22",color:b.status==="Resolved"?T.green:T.orange }}>{b.status}</span></td>
                <td style={{ color:T.red,fontWeight:600,fontSize:12 }}>{b.cost?"₹"+b.cost.toLocaleString():"—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sel&&<div className="ov"><div className="modal" style={{ maxWidth:520 }}>
        <div className="mhdr" style={{ background:"linear-gradient(135deg,#1A0000,#3A0000)",borderBottom:`1px solid ${T.red}33` }}>
          <div className="rj" style={{ fontSize:16,fontWeight:700,color:T.red }}>🚨 {sel.id} — {sel.vehicle}</div>
          <button className="btn" style={{ padding:"5px 9px" }} onClick={()=>setSel(null)}><Ic n="x" s={14} c={T.textSub}/></button>
        </div>
        <div className="mbdy">
          {[{l:"Location",v:sel.location},{l:"Issue",v:sel.issue},{l:"Driver",v:sel.driver},{l:"Status",v:sel.status},{l:"Recovery Cost",v:sel.cost?"₹"+sel.cost.toLocaleString():"Pending"},{l:"Reported",v:sel.reportedAt||"—"}].map(r=>(
            <div key={r.l} style={{ display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${T.border}44`,fontSize:13 }}>
              <span style={{ color:T.textSub }}>{r.l}</span><span style={{ fontWeight:600 }}>{r.v}</span>
            </div>
          ))}
        </div>
        <div className="mftr">
          <button className="btn btn-gh" onClick={()=>setSel(null)}>Close</button>
          {sel.status!=="Resolved"&&<button className="btn" style={{ background:T.green,color:"#080B10",fontWeight:700 }} onClick={()=>{setBds(bs=>bs.map(b=>b.id===sel.id?{...b,status:"Resolved"}:b));setSel(null);}}>✅ Mark Resolved</button>}
        </div>
      </div></div>}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// FUEL CONTROL MODULE
// ═══════════════════════════════════════════════════════════════════════════════
const FuelControlPage = () => {
  const FUEL_LOGS=[
    {id:"FL-001",vehicle:"TN69 GH4789",driver:"Mani Kumar",date:"2025-04-10",litres:120,amount:12000,odometer:98450,pump:"IOCL Coimbatore",flag:false},
    {id:"FL-002",vehicle:"TN59 AB1234",driver:"Selvam R",date:"2025-04-11",litres:95,amount:9500,odometer:74320,pump:"BPCL Chennai",flag:false},
    {id:"FL-003",vehicle:"TN38 EF9012",driver:"Arjun D",date:"2025-04-12",litres:148,amount:14800,odometer:51200,pump:"HPCL Salem",flag:true},
    {id:"FL-004",vehicle:"TN32 XY7821",driver:"External",date:"2025-04-13",litres:110,amount:11000,odometer:32100,pump:"IOCL Trichy",flag:false},
  ];
  const totalLitres=FUEL_LOGS.reduce((s,f)=>s+f.litres,0);
  const totalCost=FUEL_LOGS.reduce((s,f)=>s+f.amount,0);
  const suspicious=FUEL_LOGS.filter(f=>f.flag);
  return (
    <div>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
        <div><h1 className="rj" style={{ fontSize:28,fontWeight:700 }}>Fuel Control</h1><p style={{ color:T.textSub,fontSize:12 }}>Consumption tracking · Theft detection · Cost analysis</p></div>
        <button className="btn btn-p" style={{ fontSize:11 }}>+ Log Fuel Fill</button>
      </div>
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(4,1fr)",marginBottom:18 }}>
        {[{l:"Total Litres",v:totalLitres+"L",c:T.blue},{l:"Total Cost",v:"₹"+totalCost.toLocaleString(),c:T.accent},{l:"Suspicious",v:suspicious.length,c:T.red},{l:"Avg ₹/L",v:"₹"+(totalCost/totalLitres).toFixed(1),c:T.orange}].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>
        ))}
      </div>
      {suspicious.length>0&&<div className="card" style={{ marginBottom:14,border:`1px solid ${T.red}44`,background:T.red+"11" }}>
        <div className="section-title" style={{ color:T.red }}>⚠️ Suspicious Fills ({suspicious.length})</div>
        {suspicious.map(f=>(
          <div key={f.id} className="arow" style={{ borderLeftColor:T.red }}>
            <span className="mono" style={{ fontSize:11,color:T.accent }}>{f.id}</span>
            <span style={{ flex:1,margin:"0 10px",fontSize:12 }}>{f.vehicle} · {f.litres}L · ₹{f.amount.toLocaleString()}</span>
            <span style={{ fontSize:11,color:T.red }}>⚠️ Review Required</span>
          </div>
        ))}
      </div>}
      <div className="card" style={{ padding:0 }}>
        <table className="tbl">
          <thead><tr><th>ID</th><th>Vehicle</th><th>Driver</th><th>Date</th><th>Litres</th><th>Amount</th><th>Pump</th><th>Status</th></tr></thead>
          <tbody>
            {FUEL_LOGS.map(f=>(
              <tr key={f.id}>
                <td className="mono" style={{ fontSize:11,color:T.accent }}>{f.id}</td>
                <td style={{ fontWeight:600,fontSize:12 }}>{f.vehicle}</td>
                <td style={{ fontSize:12 }}>{f.driver}</td>
                <td style={{ fontSize:12 }}>{f.date}</td>
                <td style={{ fontSize:12,fontWeight:600 }}>{f.litres}L</td>
                <td style={{ color:T.green,fontWeight:600 }}>₹{f.amount.toLocaleString()}</td>
                <td style={{ fontSize:11,color:T.textSub }}>{f.pump}</td>
                <td>{f.flag?<span className="badge" style={{ background:T.red+"22",color:T.red }}>⚠️ Suspicious</span>:<span className="badge" style={{ background:T.green+"22",color:T.green }}>OK</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// GPS LIVE TRACKING (SIMULATED)
// ═══════════════════════════════════════════════════════════════════════════════
const LiveTrackingPage = () => {
  const LIVE_FLEET=[
    {id:"TN69 GH4789",driver:"Mani Kumar",route:"Chennai→Coimbatore",status:"En Route",lat:11.127,lng:78.656,speed:72,fuel:68,eta:"14:30",lastUpdate:"2 min ago"},
    {id:"TN59 AB1234",driver:"Selvam R",route:"Madurai→Bangalore",status:"Planned Stop",lat:12.297,lng:76.643,speed:0,fuel:45,eta:"17:00",lastUpdate:"5 min ago"},
    {id:"TN38 EF9012",driver:"Arjun D",route:"Salem→Hyderabad",status:"En Route",lat:11.665,lng:78.146,speed:65,fuel:55,eta:"20:15",lastUpdate:"1 min ago"},
    {id:"TN22 IJ7890",driver:"Karthik M",route:"Chennai→Pune",status:"Idle",lat:13.082,lng:80.270,speed:0,fuel:80,eta:"Tomorrow",lastUpdate:"12 min ago"},
    {id:"TN71 GH3456",driver:"Kumar P",route:"Coimbatore→Hyderabad",status:"In Maintenance",lat:11.017,lng:76.966,speed:0,fuel:30,eta:"—",lastUpdate:"1h ago"},
  ];
  const [sel,setSel]=useState(null);
  const STATUS_C={"En Route":T.green,"Planned Stop":T.orange,"Idle":T.textMuted,"In Maintenance":T.red};
  return (
    <div>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
        <div><h1 className="rj" style={{ fontSize:28,fontWeight:700 }}>Live Fleet Tracking</h1><p style={{ color:T.textSub,fontSize:12 }}>Real-time GPS · Speed monitoring · ETA prediction</p></div>
        <div style={{ display:"flex",gap:8,alignItems:"center" }}>
          <span style={{ padding:"6px 12px",background:T.green+"22",color:T.green,borderRadius:8,fontSize:11,fontWeight:600 }}>🟢 LIVE</span>
        </div>
      </div>
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(4,1fr)",marginBottom:18 }}>
        {[{l:"En Route",v:LIVE_FLEET.filter(v=>v.status==="En Route").length,c:T.green},
          {l:"Planned Stop",v:LIVE_FLEET.filter(v=>v.status==="Planned Stop").length,c:T.orange},
          {l:"Idle",v:LIVE_FLEET.filter(v=>v.status==="Idle").length,c:T.textMuted},
          {l:"Maintenance",v:LIVE_FLEET.filter(v=>v.status==="In Maintenance").length,c:T.red}].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>
        ))}
      </div>
      {/* Map placeholder */}
      <div className="card" style={{ marginBottom:14,height:200,display:"flex",alignItems:"center",justifyContent:"center",background:`linear-gradient(135deg,${T.bgPanel},${T.bgCard})`,border:`1px solid ${T.borderHi}`,position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,opacity:0.05,backgroundImage:"radial-gradient(circle,#fff 1px,transparent 1px)",backgroundSize:"30px 30px" }}/>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:40,marginBottom:8 }}>🗺️</div>
          <div className="rj" style={{ fontSize:16,fontWeight:700,color:T.accent }}>Interactive Map</div>
          <div style={{ fontSize:12,color:T.textSub }}>GPS tracking · {LIVE_FLEET.length} vehicles active</div>
        </div>
        {LIVE_FLEET.filter(v=>v.status==="En Route").map((v,i)=>(
          <div key={v.id} style={{ position:"absolute",width:10,height:10,borderRadius:"50%",background:T.green,boxShadow:`0 0 8px ${T.green}`,left:(20+i*18)+"%",top:(30+i*10)+"%",cursor:"pointer" }} onClick={()=>setSel(v)}/>
        ))}
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10 }}>
        {LIVE_FLEET.map(v=>(
          <div key={v.id} className="card" style={{ cursor:"pointer",border:`1px solid ${STATUS_C[v.status]||T.border}33` }} onClick={()=>setSel(v)}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6 }}>
              <div className="mono" style={{ fontSize:12,fontWeight:700,color:T.accent }}>{v.id}</div>
              <span className="badge" style={{ background:(STATUS_C[v.status]||T.textMuted)+"22",color:STATUS_C[v.status]||T.textMuted }}>{v.status}</span>
            </div>
            <div style={{ fontSize:12,fontWeight:500,marginBottom:4 }}>{v.route}</div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,fontSize:11,color:T.textSub }}>
              <span>👤 {v.driver}</span>
              <span>🚗 {v.speed}km/h</span>
              <span>⛽ {v.fuel}%</span>
            </div>
            <div style={{ fontSize:11,color:T.textMuted,marginTop:4 }}>ETA: {v.eta} · Updated {v.lastUpdate}</div>
          </div>
        ))}
      </div>
      {sel&&<div className="ov"><div className="modal" style={{ maxWidth:420 }}>
        <div className="mhdr">
          <div className="rj" style={{ fontSize:15,fontWeight:700 }}>{sel.id}</div>
          <button className="btn" style={{ padding:"5px 9px" }} onClick={()=>setSel(null)}><Ic n="x" s={14} c={T.textSub}/></button>
        </div>
        <div className="mbdy">
          {[{l:"Driver",v:sel.driver},{l:"Route",v:sel.route},{l:"Status",v:sel.status},{l:"Speed",v:sel.speed+"km/h"},{l:"Fuel",v:sel.fuel+"%"},{l:"ETA",v:sel.eta},{l:"Last Update",v:sel.lastUpdate}].map(r=>(
            <div key={r.l} style={{ display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${T.border}44`,fontSize:13 }}>
              <span style={{ color:T.textSub }}>{r.l}</span><span style={{ fontWeight:600 }}>{r.v}</span>
            </div>
          ))}
        </div>
        <div className="mftr"><button className="btn btn-gh" onClick={()=>setSel(null)}>Close</button></div>
      </div></div>}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PROFITABILITY COMMAND CENTER
// ═══════════════════════════════════════════════════════════════════════════════
const ProfitabilityPage = () => {
  const totalRev = TRIPS_DATA.reduce((s,t)=>s+(t.freight||0),0);
  const totalExp = TRIPS_DATA.reduce((s,t)=>s+Object.values(t.expenses||{}).reduce((a,b)=>a+b,0),0);
  const profit = totalRev-totalExp;
  return (
    <div>
      <h1 className="rj" style={{ fontSize:28,fontWeight:700,marginBottom:4 }}>Profitability Command Center</h1>
      <p style={{ color:T.textSub,fontSize:12,marginBottom:20 }}>Revenue · Cost · Profit · Vehicle-wise P&L</p>
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(4,1fr)",marginBottom:18 }}>
        {[{ l:"Total Revenue",v:fmt(totalRev),c:T.green },{ l:"Total Expenses",v:fmt(totalExp),c:T.red },{ l:"Net Profit",v:fmt(profit),c:profit>0?T.green:T.red },{ l:"Margin",v:totalRev?Math.round((profit/totalRev)*100)+"%":"0%",c:T.accent }].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c,fontSize:k.v.length>8?20:30 }}>{k.v}</div><div className="stat-l">{k.l}</div></div>
        ))}
      </div>
      <div className="card" style={{ padding:0 }}>
        <table className="tbl">
          <thead><tr><th>Vehicle</th><th>Trips</th><th>Revenue</th><th>Expenses</th><th>Profit</th><th>Margin</th></tr></thead>
          <tbody>{FLEET_DATA.map(v=>{
            const vt=TRIPS_DATA.filter(t=>t.vehicle===v.num);
            const rev=vt.reduce((s,t)=>s+(t.freight||0),0);
            const exp=vt.reduce((s,t)=>s+Object.values(t.expenses||{}).reduce((a,b)=>a+b,0),0);
            const pr=rev-exp; const mg=rev>0?Math.round((pr/rev)*100):0;
            return(<tr key={v.id}><td className="mono" style={{ color:T.accent }}>{v.num}</td><td>{vt.length}</td><td style={{ color:T.green,fontWeight:600 }}>{fmt(rev)}</td><td style={{ color:T.red }}>{fmt(exp)}</td><td style={{ color:pr>0?T.green:T.red,fontWeight:700 }}>{fmt(pr)}</td><td><span className={`badge ${mg>20?"bg":mg>10?"bo":"br"}`}>{mg}%</span></td></tr>);
          })}</tbody>
        </table>
      </div>
    </div>
  );
};
// ═══════════════════════════════════════════════════════════════════════════════
// APP SHELL

// ═══════════════════════════════════════════════════════════════════════════════
// HEAVY EQUIPMENT MODULE — JCB, Excavator, Crane, Roller, etc.
// Hours-based tracking · Site billing · Transportation · AI maintenance
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Equipment Master Data ────────────────────────────────────────────────────
const EQUIPMENT_TYPES = {
  backhoe:    { label:"Backhoe Loader",      icon:"🟡", brands:["JCB 3DX","JCB 4DX","CAT 424"],              billingUnit:"hour",  avgRate:900,  avgFuel:5,  serviceInterval:250,  lifeHours:12000, category:"earthmoving" },
  excavator:  { label:"Hydraulic Excavator", icon:"🦾", brands:["JCB NXT 215","CAT 320","Tata Hitachi 200"],  billingUnit:"hour",  avgRate:1400, avgFuel:15, serviceInterval:500,  lifeHours:15000, category:"earthmoving" },
  miniexcav:  { label:"Mini Excavator",      icon:"🔶", brands:["JCB 30Plus","CAT 308","Komatsu PC35"],        billingUnit:"hour",  avgRate:600,  avgFuel:4,  serviceInterval:250,  lifeHours:10000, category:"earthmoving" },
  roller:     { label:"Vibratory Roller",    icon:"🔵", brands:["JCB VM115","HAMM HD90","Dynapac CA250"],      billingUnit:"hour",  avgRate:700,  avgFuel:8,  serviceInterval:300,  lifeHours:12000, category:"compaction"  },
  crane:      { label:"Hydraulic Crane",     icon:"🏗️", brands:["SANY 50T","Escorts 30T","Tadano"],            billingUnit:"hour",  avgRate:3500, avgFuel:22, serviceInterval:200,  lifeHours:20000, category:"lifting"     },
  telehandler:{ label:"Telehandler",         icon:"🔧", brands:["JCB 540-170","Manitou MT 625"],               billingUnit:"hour",  avgRate:1100, avgFuel:7,  serviceInterval:300,  lifeHours:12000, category:"handling"    },
  grader:     { label:"Motor Grader",        icon:"⚙️", brands:["JCB 140G","CAT 140","Mahindra"],              billingUnit:"hour",  avgRate:1600, avgFuel:18, serviceInterval:250,  lifeHours:15000, category:"earthmoving" },
  concrete:   { label:"Concrete Mixer",      icon:"🔘", brands:["Ajax Fiori","Schwing Stetter"],               billingUnit:"m3",    avgRate:450,  avgFuel:6,  serviceInterval:500,  lifeHours:8000,  category:"concrete"    },
  transit:    { label:"Transit Mixer",       icon:"🔵", brands:["BharatBenz TM","Tata 1616"],                  billingUnit:"trip",  avgRate:2800, avgFuel:20, serviceInterval:500,  lifeHours:null,  category:"concrete"    },
};

const EQUIPMENT_DATA = [
  { id:"EQ-001", regNo:"TN69 JCB001", type:"backhoe",    model:"JCB 3DX",         make:"JCB",         year:2021, serialNo:"JCB3DX2021TN001", purchaseCost:2800000, ownership:"Owned",    status:"On Site",       site:"Madurai Bypass NH7",    operator:"Kannan S",  engineHours:4286,  lastServiceHours:4000, nextServiceHours:4250, fuelPerHour:5,  hourlyRate:900,  dailyMin:8, monthlyHours:180, odomKm:null, deployed:true,  transportCost:25000 },
  { id:"EQ-002", regNo:"TN45 EXC01",  type:"excavator",  model:"JCB NXT 215",     make:"JCB",         year:2022, serialNo:"JCBNXT2022001",    purchaseCost:5200000, ownership:"Owned",    status:"Available",     site:null,                    operator:null,        engineHours:2841,  lastServiceHours:2500, nextServiceHours:3000, fuelPerHour:15, hourlyRate:1400, dailyMin:7, monthlyHours:150, odomKm:null, deployed:false, transportCost:45000 },
  { id:"EQ-003", regNo:"TN22 RLL01",  type:"roller",     model:"JCB VM115",       make:"JCB",         year:2020, serialNo:"JCBVM1152020001",  purchaseCost:1600000, ownership:"Owned",    status:"On Site",       site:"Chennai Port Road",     operator:"Murugan V", engineHours:6120,  lastServiceHours:6000, nextServiceHours:6300, fuelPerHour:8,  hourlyRate:700,  dailyMin:8, monthlyHours:200, odomKm:null, deployed:true,  transportCost:18000 },
  { id:"EQ-004", regNo:"TN38 CRN01",  type:"crane",      model:"SANY STC500T",    make:"SANY",        year:2023, serialNo:"SANY500T2023001",  purchaseCost:12000000,ownership:"Financed", status:"On Site",       site:"Trichy Industrial Park",operator:"Raj Kumar", engineHours:1204,  lastServiceHours:1000, nextServiceHours:1400, fuelPerHour:22, hourlyRate:3500, dailyMin:6, monthlyHours:120, odomKm:null, deployed:true,  transportCost:85000 },
  { id:"EQ-005", regNo:"TN71 MXC01",  type:"miniexcav",  model:"JCB 30Plus",      make:"JCB",         year:2023, serialNo:"JCB30P2023001",    purchaseCost:1400000, ownership:"Owned",    status:"Maintenance",   site:null,                    operator:null,        engineHours:890,   lastServiceHours:750,  nextServiceHours:1000, fuelPerHour:4,  hourlyRate:600,  dailyMin:7, monthlyHours:160, odomKm:null, deployed:false, transportCost:15000 },
  { id:"EQ-006", regNo:"TN59 GRD01",  type:"grader",     model:"JCB 140G",        make:"JCB",         year:2021, serialNo:"JCB140G2021001",   purchaseCost:5800000, ownership:"Owned",    status:"Available",     site:null,                    operator:null,        engineHours:3340,  lastServiceHours:3000, nextServiceHours:3500, fuelPerHour:18, hourlyRate:1600, dailyMin:8, monthlyHours:160, odomKm:null, deployed:false, transportCost:55000 },
];

const SITE_LOG_DATA = [
  { id:"SL-001", eqId:"EQ-001", site:"Madurai Bypass NH7",    client:"NHAI Road Works",   date:"2025-04-15", hoursWorked:9.5, shift:"Day",   operator:"Kannan S",  fuel:48,  work:"Trench excavation — 320m pipeline route", status:"Billed",   billAmount:8550,  approved:true  },
  { id:"SL-002", eqId:"EQ-001", site:"Madurai Bypass NH7",    client:"NHAI Road Works",   date:"2025-04-14", hoursWorked:8.0, shift:"Day",   operator:"Kannan S",  fuel:40,  work:"Foundation trench continuation",         status:"Billed",   billAmount:7200,  approved:true  },
  { id:"SL-003", eqId:"EQ-003", site:"Chennai Port Road",     client:"L&T Construction",  date:"2025-04-15", hoursWorked:10,  shift:"Day",   operator:"Murugan V", fuel:80,  work:"Road compaction — 1.5km WBM layer",      status:"Pending",  billAmount:7000,  approved:false },
  { id:"SL-004", eqId:"EQ-004", site:"Trichy Industrial Park",client:"TIDCO Projects",    date:"2025-04-15", hoursWorked:6.5, shift:"Night", operator:"Raj Kumar", fuel:143, work:"Structural steel lifting — floor 3",     status:"Pending",  billAmount:22750, approved:false },
  { id:"SL-005", eqId:"EQ-001", site:"Madurai Bypass NH7",    client:"NHAI Road Works",   date:"2025-04-13", hoursWorked:7.5, shift:"Day",   operator:"Kannan S",  fuel:38,  work:"Box culvert excavation",                 status:"Billed",   billAmount:6750,  approved:true  },
  { id:"SL-006", eqId:"EQ-003", site:"Chennai Port Road",     client:"L&T Construction",  date:"2025-04-14", hoursWorked:8,   shift:"Day",   operator:"Murugan V", fuel:64,  work:"Sub-grade preparation km 4–6",           status:"Billed",   billAmount:5600,  approved:true  },
];

const SITE_CONTRACTS = [
  { id:"SC-001", eqId:"EQ-001", client:"NHAI Road Works",    site:"Madurai Bypass NH7",    contractType:"Monthly",   minHours:180, ratePerHour:900,  mobilization:25000, startDate:"2025-03-01", endDate:"2025-05-31", advancePaid:100000, totalBilled:287000 },
  { id:"SC-002", eqId:"EQ-003", client:"L&T Construction",   site:"Chennai Port Road",     contractType:"Monthly",   minHours:200, ratePerHour:700,  mobilization:18000, startDate:"2025-02-15", endDate:"2025-06-15", advancePaid:80000,  totalBilled:196000 },
  { id:"SC-003", eqId:"EQ-004", client:"TIDCO Projects",     site:"Trichy Industrial Park",contractType:"Hourly",    minHours:null,ratePerHour:3500, mobilization:85000, startDate:"2025-04-01", endDate:"2025-07-31", advancePaid:300000, totalBilled:98000  },
];

// ─── Hourly Rate Calculator ───────────────────────────────────────────────────

function calcTransportCost(eq, distKm) {
  const spec = EQUIPMENT_TYPES[eq.type];
  const wt = { backhoe:8.5, excavator:22, miniexcav:3.2, roller:9, crane:38, telehandler:14, grader:18, concrete:10, transit:null }[eq.type] || 10;
  const trucksNeeded = wt > 25 ? 2 : 1;
  const truckRate = wt > 20 ? 85 : 65; // ₹/km for heavy flatbed
  const routePermit = wt > 16 ? 8000 : 3500;
  const escortCost = wt > 25 ? 12000 : 0;
  const loadingCost = wt > 20 ? 8000 : 4000;
  const transport = Math.round(trucksNeeded * truckRate * distKm + routePermit + escortCost + loadingCost);
  return { trucksNeeded, truckRate, routePermit, escortCost, loadingCost, transport, distKm };
}

// ─── Add Equipment Wizard ─────────────────────────────────────────────────────
const AddEquipmentWizard = ({ onClose, onSave }) => {
  const [step,setStep]=useState(1);
  const [f,sf]=useState({type:"backhoe",model:"",make:"JCB",year:"2023",regNo:"",serialNo:"",purchaseCost:"",engineHours:"0",hourlyRate:"",dailyMin:"8",site:"",client:""});
  const rf=(k,v)=>sf(x=>({...x,[k]:v}));
  const spec=EQUIPMENT_TYPES[f.type]||{};
  return (<div className="ov" style={{ alignItems:"flex-start",paddingTop:20 }}><div className="modal" style={{ maxWidth:540,width:"100%",margin:"0 auto" }}>
    <div className="mhdr" style={{ background:"linear-gradient(135deg,#1C1000,#3D2200)",borderBottom:`1px solid ${T.orange}33` }}>
      <div className="rj" style={{ fontSize:18,fontWeight:700,color:T.orange }}>🏗️ Add Equipment — Step {step}/2</div>
      <button className="btn" style={{ padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub}/></button>
    </div>
    <div className="mbdy">
      {step===1&&<div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:7,marginBottom:12 }}>
          {Object.entries(EQUIPMENT_TYPES).map(([id,t])=>(
            <div key={id} onClick={()=>{rf("type",id);rf("hourlyRate",String(t.avgRate||900));}} style={{ padding:"8px",borderRadius:8,cursor:"pointer",border:`2px solid ${f.type===id?T.orange:T.border}`,background:f.type===id?T.orangeGlow:T.bgPanel,textAlign:"center" }}>
              <div style={{ fontSize:16 }}>{t.icon}</div><div style={{ fontSize:10,color:f.type===id?T.orange:T.textSub,marginTop:2 }}>{t.label.split(" ")[0]}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10 }}>
          <div><label className="flabel">Make</label><select value={f.make} onChange={e=>rf("make",e.target.value)}><option>JCB</option><option>CAT</option><option>SANY</option><option>Komatsu</option></select></div>
          <div><label className="flabel">Model</label><input value={f.model} onChange={e=>rf("model",e.target.value)} placeholder={spec.brands?.[0]||""}/></div>
          <div><label className="flabel">Year</label><select value={f.year} onChange={e=>rf("year",e.target.value)}>{[2025,2024,2023,2022,2021,2020,2019].map(y=><option key={y}>{y}</option>)}</select></div>
        </div>
      </div>}
      {step===2&&<div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10 }}>
          <div><label className="flabel">Fleet No / Reg</label><input value={f.regNo} onChange={e=>rf("regNo",e.target.value.toUpperCase())} style={{ fontFamily:"mono" }}/></div>
          <div><label className="flabel">Current Engine Hrs</label><input type="number" value={f.engineHours} onChange={e=>rf("engineHours",e.target.value)}/></div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10 }}>
          <div><label className="flabel">Hourly Rate (₹)</label><input value={f.hourlyRate} onChange={e=>rf("hourlyRate",e.target.value)}/></div>
          <div><label className="flabel">Purchase Cost</label><input value={f.purchaseCost} onChange={e=>rf("purchaseCost",e.target.value)}/></div>
          <div><label className="flabel">Deployment Site</label><input value={f.site} onChange={e=>rf("site",e.target.value)}/></div>
        </div>
      </div>}
      <div style={{ display:"flex",justifyContent:"space-between",marginTop:14,paddingTop:12,borderTop:`1px solid ${T.border}` }}>
        <button className="btn btn-gh" onClick={()=>step>1?setStep(1):onClose()}>{step===1?"Cancel":"← Back"}</button>
        <button className="btn" style={{ background:T.orange,color:"#080B10",fontWeight:700 }} onClick={()=>step<2?setStep(2):(onSave&&onSave({id:`EQ-${String(Date.now()).slice(-3)}`,...f,status:"Available",engineHours:parseInt(f.engineHours)||0,hourlyRate:parseInt(f.hourlyRate)||900,deployed:!!f.site}),onClose())}>{step===2?"🏗️ Add Equipment":"Next →"}</button>
      </div>
    </div>
  </div></div>);
};

// ─── Main Heavy Equipment Page ────────────────────────────────────────────────
const calcEquipmentHourlyRate = (eq) => {
  const spec=EQUIPMENT_TYPES[eq.type]||{};const life=spec.lifeHours||12000,ann=(eq.monthlyHours||160)*12;
  const dep=(eq.purchaseCost||2800000)/life;const fuel=(eq.fuelPerHour||spec.avgFuel||8)*96;
  const own=(eq.purchaseCost||2800000)*0.10/ann;const maint=(eq.purchaseCost||2800000)*0.08/ann;const op=15000/(ann/12);
  const cost=Math.round(dep+own+fuel+maint+op);
  return {costPerHour:cost,suggestedRate:Math.round(cost*1.25),dep:Math.round(dep),fuel:Math.round(fuel),own:Math.round(own)};
};
const HoursLogModal = ({ eq, onClose, onSave }) => {
  const [f,sf]=useState({date:new Date().toISOString().split("T")[0],startHours:"",endHours:"",idleHours:"0",work:"",fuel:""});
  const worked=f.startHours&&f.endHours?Math.max(0,parseFloat(f.endHours)-parseFloat(f.startHours)-parseFloat(f.idleHours||0)):0;
  const contract=EQ_CONTRACTS_INIT.find(c=>c.eqId===eq.id);
  const billed=Math.max(worked,contract?.shiftHoursPerDay||8);
  const billAmt=billed*(contract?.hourlyRate||eq.hourlyRate||900);
  return (<div className="ov"><div className="modal" style={{ maxWidth:480 }}>
    <div className="mhdr" style={{ background:"linear-gradient(135deg,#0D1A00,#1A3300)",borderBottom:`1px solid ${T.green}33` }}>
      <div className="rj" style={{ fontSize:16,fontWeight:700,color:T.green }}>⏱️ Log Hours — {eq.regNo}</div>
      <button className="btn" style={{ padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub}/></button>
    </div>
    <div className="mbdy">
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:10 }}>
        <div><label className="flabel">Date</label><input type="date" value={f.date} onChange={e=>sf(x=>({...x,date:e.target.value}))}/></div>
        <div><label className="flabel">Start Hrs</label><input type="number" value={f.startHours} onChange={e=>sf(x=>({...x,startHours:e.target.value}))} placeholder={eq.engineHours}/></div>
        <div><label className="flabel">End Hrs</label><input type="number" value={f.endHours} onChange={e=>sf(x=>({...x,endHours:e.target.value}))}/></div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10 }}>
        <div><label className="flabel">Idle Hrs</label><input type="number" value={f.idleHours} onChange={e=>sf(x=>({...x,idleHours:e.target.value}))}/></div>
        <div><label className="flabel">Fuel (L)</label><input type="number" value={f.fuel} onChange={e=>sf(x=>({...x,fuel:e.target.value}))}/></div>
      </div>
      <div style={{ marginBottom:10 }}><label className="flabel">Work Done</label><textarea value={f.work} onChange={e=>sf(x=>({...x,work:e.target.value}))} placeholder="Describe work..." style={{ height:50 }}/></div>
      {worked>0&&<div style={{ background:T.orangeGlow,border:`1px solid ${T.orange}33`,borderRadius:8,padding:10,marginBottom:10 }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8 }}>
          {[["Worked",`${worked.toFixed(1)}h`,T.text],["Billed",`${billed.toFixed(1)}h`,billed>worked?T.orange:T.green],["Rate",`₹${contract?.hourlyRate||900}/hr`,T.accent],["Amount",fmt(billAmt),T.green]].map(([l,v,c])=>(
            <div key={l} style={{ background:T.bgPanel,borderRadius:7,padding:"5px 8px" }}><div style={{ fontSize:9,color:T.textMuted }}>{l}</div><div style={{ fontSize:12,fontWeight:700,color:c }}>{v}</div></div>
          ))}
        </div>
      </div>}
      <div style={{ display:"flex",justifyContent:"flex-end",gap:8 }}>
        <button className="btn btn-gh" onClick={onClose}>Cancel</button>
        <button className="btn" style={{ background:T.green,color:"#fff" }} onClick={()=>{onSave&&onSave({...f,worked,billed,billAmt,eqId:eq.id});onClose();}}>✅ Log Hours</button>
      </div>
    </div>
  </div></div>);
};
const HeavyEquipmentPage = () => {
  const [tab,setTab]=useState("fleet");
  const [showAdd,setShowAdd]=useState(false);
  const [showLog,setShowLog]=useState(null);
  const [equipment,setEquipment]=useState(EQUIPMENT_DATA);
  const [siteLogs,setSiteLogs]=useState(SITE_LOG_DATA);
  const deployed=equipment.filter(e=>e.deployed);
  const nearService=equipment.filter(e=>(e.nextServiceHours-e.engineHours)<=100);
  const totalBilled=siteLogs.filter(l=>l.status==="Billed").reduce((s,l)=>s+l.billAmount,0);
  return (<div>
    {showAdd&&<AddEquipmentWizard onClose={()=>setShowAdd(false)} onSave={eq=>setEquipment(q=>[{...eq},...q])}/>}
    {showLog&&<HoursLogModal eq={showLog} onClose={()=>setShowLog(null)} onSave={log=>setSiteLogs(l=>[{id:`SL-${l.length+1}`,eqId:log.eqId,date:log.date,site:showLog.site||"Site",client:EQ_CONTRACTS_INIT.find(c=>c.eqId===log.eqId)?.client||"—",hoursWorked:log.worked,billAmount:log.billAmt,status:"Pending",approved:false},...l])}/>}
    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
      <div><h1 className="rj" style={{ fontSize:28,fontWeight:700 }}>Heavy Equipment</h1><p style={{ color:T.textSub,fontSize:12 }}>JCB · Excavator · Crane · Roller — hours-based site billing</p></div>
      <div style={{ display:"flex",gap:8 }}>
        {deployed.map(e=><button key={e.id} className="btn btn-g" style={{ fontSize:11 }} onClick={()=>setShowLog(e)}>⏱ {e.regNo}</button>)}
        <button className="btn btn-p" onClick={()=>setShowAdd(true)}>+ Add Equipment</button>
      </div>
    </div>
    <div className="kpi-row" style={{ gridTemplateColumns:"repeat(5,1fr)",marginBottom:18 }}>
      {[{ l:"Total",v:equipment.length,c:T.blue },{ l:"On Site",v:deployed.length,c:T.green },{ l:"Available",v:equipment.filter(e=>e.status==="Available").length,c:T.cyan },{ l:"Service Due",v:nearService.length,c:T.red },{ l:"MTD Billed",v:fmt(totalBilled),c:T.accent }].map(k=>(
        <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>
      ))}
    </div>
    <div className="tabs">{["fleet","hours-log","rate-calc"].map(t=><div key={t} className={`tab ${tab===t?"on":""}`} onClick={()=>setTab(t)} style={{ textTransform:"capitalize" }}>{t==="hours-log"?"Hours Log":t==="rate-calc"?"Rate Calc":t.charAt(0).toUpperCase()+t.slice(1)}</div>)}</div>
    {tab==="fleet"&&<div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12 }}>
      {equipment.map(eq=>{const spec=EQUIPMENT_TYPES[eq.type]||{};const hts=eq.nextServiceHours-eq.engineHours;const lpct=spec.lifeHours?Math.round((eq.engineHours/spec.lifeHours)*100):0;return(
        <div key={eq.id} className="card" style={{ border:`1px solid ${hts<100?T.orange:T.border}`,padding:14 }}>
          <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
            <div style={{ display:"flex",gap:8,alignItems:"center" }}><span style={{ fontSize:22 }}>{spec.icon||"🏗️"}</span><div><div className="mono" style={{ fontSize:12,fontWeight:700,color:T.accent }}>{eq.regNo}</div><div style={{ fontSize:11,color:T.textSub }}>{eq.model}</div></div></div>
            <span className={`badge ${eq.status==="On Site"?"bg":eq.status==="Available"?"bb":"ba"}`} style={{ fontSize:10 }}>{eq.status}</span>
          </div>
          <div style={{ marginBottom:8 }}>
            <div style={{ display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:3 }}><span style={{ color:T.textMuted }}>Engine Hours</span><span style={{ color:T.accent,fontWeight:700 }}>{eq.engineHours.toLocaleString()} hrs</span></div>
            <div className="pbar" style={{ height:5 }}><div className="pfill" style={{ width:`${Math.min(lpct,100)}%`,background:lpct>80?T.red:lpct>60?T.orange:T.green }}/></div>
          </div>
          <div style={{ display:"flex",justifyContent:"space-between",padding:"4px 8px",background:hts<100?T.orangeGlow:T.bgPanel,borderRadius:6,marginBottom:8,fontSize:10 }}>
            <span style={{ color:T.textMuted }}>Next PM</span>
            <span style={{ color:hts<0?T.red:hts<100?T.orange:T.green,fontWeight:700 }}>{hts<0?`OVERDUE ${Math.abs(hts)}h`:`${hts}h left`}</span>
          </div>
          <div style={{ fontSize:10,color:eq.deployed?T.green:T.blue,background:eq.deployed?T.green+"12":T.blue+"12",borderRadius:6,padding:"4px 8px",marginBottom:8 }}>{eq.deployed?`📍 ${eq.site||"On Site"}`:"📦 At Depot"}</div>
          <div style={{ display:"flex",gap:6 }}>
            <button className="btn" style={{ flex:1,fontSize:10,background:T.green+"22",color:T.green,border:`1px solid ${T.green}33`,padding:"4px 0" }} onClick={()=>setShowLog(eq)}>⏱ Log Hrs</button>
            <button className="btn btn-gh" style={{ flex:1,fontSize:10,padding:"4px 0" }}>Details →</button>
          </div>
        </div>
      );})}
    </div>}
    {tab==="hours-log"&&<div className="card" style={{ padding:0 }}>
      <table className="tbl">
        <thead><tr><th>Date</th><th>Equipment</th><th>Site</th><th>Worked</th><th>Billed</th><th>Amount</th><th>Status</th><th></th></tr></thead>
        <tbody>{siteLogs.length===0&&<tr><td colSpan={8} style={{ textAlign:"center",color:T.textMuted,padding:20 }}>No logs. Click ⏱ Log Hrs on a card above.</td></tr>}
        {siteLogs.map(l=>{const eq=equipment.find(e=>e.id===l.eqId)||{};const ct=EQ_CONTRACTS_INIT.find(c=>c.eqId===l.eqId)||{};const bh=Math.max(l.hoursWorked,ct.shiftHoursPerDay||8);return(<tr key={l.id}><td style={{ fontSize:11 }}>{l.date}</td><td style={{ fontSize:11 }}>{EQUIPMENT_TYPES[eq.type]?.icon||"🏗️"} {eq.model||l.eqId}</td><td style={{ fontSize:11 }}>{l.site}</td><td style={{ fontWeight:700,color:T.orange }}>{l.hoursWorked}h</td><td style={{ color:bh>l.hoursWorked?T.orange:T.green }}>{bh}h</td><td style={{ fontWeight:700,color:T.green }}>{fmt(l.billAmount)}</td><td><span className={`badge ${l.status==="Billed"?"bg":"bo"}`} style={{ fontSize:10 }}>{l.status}</span></td><td>{!l.approved&&<button className="btn btn-g" style={{ fontSize:10,padding:"2px 7px" }} onClick={()=>setSiteLogs(ls=>ls.map(x=>x.id===l.id?{...x,approved:true,status:"Billed"}:x))}>Approve</button>}</td></tr>);})}</tbody>
      </table>
    </div>}
    {tab==="rate-calc"&&<div className="card">
      <div className="section-title">AI Hourly Rate Breakdown</div>
      {equipment.map(eq=>{const r=calcEquipmentHourlyRate(eq);const margin=eq.hourlyRate>0?Math.round(((eq.hourlyRate-r.costPerHour)/eq.hourlyRate)*100):0;return(<div key={eq.id} style={{ background:T.bgPanel,borderRadius:10,padding:12,marginBottom:10 }}>
        <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
          <div style={{ display:"flex",gap:8 }}><span style={{ fontSize:18 }}>{EQUIPMENT_TYPES[eq.type]?.icon||"🏗️"}</span><div><div style={{ fontWeight:700 }}>{eq.model}</div><div style={{ fontSize:11,color:T.textSub }}>{eq.regNo}</div></div></div>
          <div style={{ textAlign:"right" }}><div style={{ color:T.red }}>Cost: ₹{r.costPerHour}/hr</div><div style={{ color:T.green,fontWeight:700 }}>Billing: ₹{eq.hourlyRate}/hr</div><div style={{ color:margin<15?T.red:T.accent }}>Margin: {margin}%</div></div>
        </div>
        <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
          {[["Depreciation",r.dep,T.red],["Ownership",r.own,T.orange],["Fuel",r.fuel,T.accent]].map(([l,v,c])=>(
            <div key={l} style={{ background:T.bgCard,borderRadius:6,padding:"3px 8px",fontSize:10 }}><span style={{ color:T.textMuted }}>{l}: </span><span style={{ color:c,fontWeight:600 }}>₹{v}/hr</span></div>
          ))}
        </div>
      </div>);})}
    </div>}
  </div>);
};
// ═══════════════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════════════
// POD — PROOF OF DELIVERY MODULE
// 3-party verified: Consignor → Transporter → Consignee
// ═══════════════════════════════════════════════════════════════════════════════

const POD_DATA_INIT = [
  { id:"POD-001", tripId:"TRP-2025-0041", lrNo:"LR-2025-4891", status:"Delivered & Signed", vehicle:"TN69 GH4789", driver:"Mani Kumar", consignor:"Steel Corp India Ltd", consignorPhone:"044-23456789", consignee:"Ramesh Enterprises", consigneePhone:"9876543210", from:"Chennai", to:"Coimbatore", date:"2025-04-15", dispatchTime:"06:30", deliveryTime:"14:15", material:"HR Coils", qty:22, unit:"MT", deliveredQty:22, shortage:0, damaged:false, receiverName:"Vijay Kumar", receiverPhone:"9876543210", otpVerified:true, gpsLat:11.0168, gpsLng:76.9558, notes:"Delivered in good condition", signatureCaptured:true, photoUploaded:true, locked:true },
  { id:"POD-002", tripId:"TRP-2025-0042", lrNo:"LR-2025-4892", status:"In Transit", vehicle:"TN59 AB1234", driver:"Selvam R", consignor:"Reliance Industries", consignorPhone:"022-12345678", consignee:"Madurai Distributors", consigneePhone:"9944332211", from:"Mumbai", to:"Madurai", date:"2025-04-15", dispatchTime:"08:00", deliveryTime:null, material:"FMCG Goods", qty:18, unit:"MT", deliveredQty:null, shortage:null, damaged:null, receiverName:null, receiverPhone:null, otpVerified:false, gpsLat:null, gpsLng:null, notes:"", signatureCaptured:false, photoUploaded:false, locked:false },
  { id:"POD-003", tripId:"TRP-2025-0043", lrNo:"LR-2025-4893", status:"Delivered — Shortage", vehicle:"TN45 CD5678", driver:"Ramesh P", consignor:"Ambuja Cement", consignorPhone:"079-87654321", consignee:"Nagpur Infra Pvt Ltd", consigneePhone:"9988776655", from:"Pune", to:"Nagpur", date:"2025-04-14", dispatchTime:"05:00", deliveryTime:"13:30", material:"Cement Bags", qty:240, unit:"Bags", deliveredQty:232, shortage:8, damaged:true, receiverName:"Suresh Patel", receiverPhone:"9988776655", otpVerified:true, gpsLat:21.1458, gpsLng:79.0882, notes:"8 bags damaged in transit — wet patch on load floor", signatureCaptured:true, photoUploaded:true, locked:true },
  { id:"POD-004", tripId:"TRP-2025-0044", lrNo:"LR-2025-4894", status:"Pending Delivery", vehicle:"TN71 GH3456", driver:"Vinoth S", consignor:"Tata Steel", consignorPhone:"033-44556677", consignee:"Delhi Steel Traders", consigneePhone:"9911223344", from:"Jamshedpur", to:"Delhi", date:"2025-04-15", dispatchTime:"07:00", deliveryTime:null, material:"Steel Rods", qty:30, unit:"MT", deliveredQty:null, shortage:null, damaged:null, receiverName:null, receiverPhone:null, otpVerified:false, gpsLat:null, gpsLng:null, notes:"", signatureCaptured:false, photoUploaded:false, locked:false },
];

// ─── Delivery Completion Modal ────────────────────────────────────────────────
const DeliveryCompletionModal = ({ pod, onClose, onSave }) => {
  const [f,sf]=useState({receiverName:"",receiverPhone:"",condition:"Good",shortage:0,otp:"",otpSent:false,otpVerified:false,signatureCaptured:false});
  const pf=(k,v)=>sf(x=>({...x,[k]:v}));
  return (
    <div className="ov"><div className="modal" style={{ maxWidth:500 }}>
      <div className="mhdr" style={{ background:"linear-gradient(135deg,#064E3B,#065F46)",borderBottom:`1px solid ${T.green}33` }}>
        <div className="rj" style={{ fontSize:16,fontWeight:700,color:T.green }}>✅ Delivery Confirmation — {pod.id}</div>
        <button className="btn" style={{ padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub}/></button>
      </div>
      <div className="mbdy">
        <div style={{ background:T.bgPanel,borderRadius:8,padding:10,marginBottom:12,fontSize:11 }}>
          <div style={{ display:"flex",gap:16 }}><span>Material: <strong>{pod.material}</strong></span><span>Qty: <strong>{pod.qty}</strong></span></div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10 }}>
          <div><label className="flabel">Receiver Name *</label><input value={f.receiverName} onChange={e=>pf("receiverName",e.target.value)}/></div>
          <div><label className="flabel">Phone (OTP)</label><input value={f.receiverPhone} onChange={e=>pf("receiverPhone",e.target.value)}/></div>
        </div>
        <div style={{ background:T.bgPanel,borderRadius:8,padding:10,marginBottom:10 }}>
          {!f.otpVerified?(!f.otpSent
            ?<button className="btn btn-b" style={{ fontSize:11 }} onClick={()=>pf("otpSent",true)}>📱 Send OTP</button>
            :<div style={{ display:"flex",gap:8 }}><input value={f.otp} onChange={e=>pf("otp",e.target.value)} placeholder="6-digit OTP" maxLength={6} style={{ textAlign:"center",letterSpacing:4,fontSize:16,fontFamily:"mono" }}/><button className="btn btn-g" onClick={()=>f.otp.length>=4&&pf("otpVerified",true)}>Verify ✓</button></div>
          ):<div style={{ color:T.green,fontSize:12,fontWeight:700 }}>✅ OTP Verified</div>}
        </div>
        {!f.signatureCaptured
          ?<div onClick={()=>f.otpVerified&&pf("signatureCaptured",true)} style={{ background:T.bgCard,border:`2px dashed ${f.otpVerified?T.green:T.border}`,borderRadius:8,height:72,display:"flex",alignItems:"center",justifyContent:"center",cursor:f.otpVerified?"crosshair":"not-allowed",fontSize:12,color:f.otpVerified?T.textMuted:T.red,marginBottom:10 }}>{f.otpVerified?"✍️ Tap to sign":"🔒 Verify OTP first"}</div>
          :<div style={{ background:T.greenGlow,borderRadius:8,padding:8,marginBottom:10,fontSize:11,color:T.green }}>✅ Signed by {f.receiverName}</div>
        }
        <div style={{ display:"flex",justifyContent:"flex-end",gap:8 }}>
          <button className="btn btn-gh" onClick={onClose}>Cancel</button>
          <button className="btn" style={{ background:f.signatureCaptured&&f.otpVerified?T.green:"rgba(255,255,255,.05)",color:f.signatureCaptured&&f.otpVerified?"#fff":T.textMuted,fontWeight:700 }} onClick={()=>{if(f.signatureCaptured&&f.otpVerified){onSave&&onSave(f);onClose();}}}>🔒 Lock Delivery</button>
        </div>
      </div>
    </div></div>
  );
};
// ─── POD Detail View Modal ────────────────────────────────────────────────────
const PODDetailModal = ({ pod, onClose }) => (
  <div className="ov"><div className="modal" style={{ maxWidth:480 }}>
    <div className="mhdr">
      <div className="rj" style={{ fontSize:15,fontWeight:700 }}>📄 POD — {pod.id}</div>
      <button className="btn" style={{ padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub}/></button>
    </div>
    <div className="mbdy">
      {[{l:"Trip ID",v:pod.tripId},{l:"Vehicle",v:pod.vehicle},{l:"Driver",v:pod.driver},{l:"Route",v:pod.route},{l:"Customer",v:pod.customer},{l:"Delivery Date",v:pod.deliveredOn},{l:"Received By",v:pod.receivedBy},{l:"Condition",v:pod.condition},{l:"Freight",v:"₹"+(pod.freight||0).toLocaleString()},{l:"Status",v:pod.status}].map(r=>(
        <div key={r.l} style={{ display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${T.border}44`,fontSize:13 }}>
          <span style={{ color:T.textSub }}>{r.l}</span><span style={{ fontWeight:600 }}>{r.v||"—"}</span>
        </div>
      ))}
      {pod.remarks&&<div style={{ marginTop:10,padding:"8px 10px",background:T.bgPanel,borderRadius:6,fontSize:12,color:T.textSub }}>Remarks: {pod.remarks}</div>}
    </div>
    <div className="mftr">
      <button className="btn btn-gh" onClick={onClose}>Close</button>
      <button className="btn btn-p" style={{ fontSize:12 }}>📥 Download POD</button>
    </div>
  </div></div>
);

// ─── POD Main Page ────────────────────────────────────────────────────────────
const PODPage = () => {
  const [pods, setPods] = useState(POD_DATA_INIT);
  const [showComplete, setShowComplete] = useState(null);
  const [showDetail, setShowDetail] = useState(null);
  const [tab, setTab] = useState("all");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleSavePOD = (updated) => setPods(p=>p.map(pod=>pod.id===updated.id?updated:pod));
  const statusColor = { "Delivered & Signed":T.green, "In Transit":T.blue, "Delivered — Shortage":T.orange, "Pending Delivery":T.textMuted };
  const filtered = filterStatus==="All" ? pods : pods.filter(p=>p.status===filterStatus);
  const pending = pods.filter(p=>!p.locked);
  const delivered = pods.filter(p=>p.locked);
  const shortage = pods.filter(p=>p.shortage>0);

  return (
    <div>
      {showComplete && <DeliveryCompletionModal pod={showComplete} onClose={()=>setShowComplete(null)} onSave={handleSavePOD} />}
      {showDetail && <PODDetailModal pod={showDetail} onClose={()=>setShowDetail(null)} />}

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Proof of Delivery (POD)</h1>
          <p style={{ color:T.textSub, fontSize:12 }}>3-party verified · OTP signature · GPS stamped · legally defensible delivery records</p>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button className="btn btn-b" style={{ fontSize:11 }}>📄 Bulk Download</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(5,1fr)", marginBottom:18 }}>
        {[
          { l:"Total PODs",   v:pods.length,                              c:T.blue   },
          { l:"Verified & Locked",v:delivered.length,                    c:T.green  },
          { l:"Pending",      v:pending.length,                          c:T.orange },
          { l:"Shortage Cases",v:shortage.length,                        c:T.red    },
          { l:"Verified Badge",v:delivered.filter(p=>p.otpVerified).length,c:T.cyan },
        ].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}>
            <div className="stat-v" style={{ color:k.c }}>{k.v}</div>
            <div className="stat-l">{k.l}</div>
          </div>
        ))}
      </div>

      {/* Pending action alerts */}
      {pending.length > 0 && (
        <div className="card" style={{ marginBottom:14, border:`1px solid ${T.orange}44`, background:T.orangeGlow }}>
          <div className="section-title" style={{ color:T.orange }}>⏳ Awaiting Delivery Completion — {pending.length} trips</div>
          {pending.map(p=>(
            <div key={p.id} className="arow" style={{ borderLeftColor:T.orange }}>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:3 }}>
                  <span className="mono" style={{ fontSize:12, color:T.accent, fontWeight:700 }}>{p.lrNo}</span>
                  <span style={{ fontSize:12 }}>{p.vehicle} · {p.driver}</span>
                  <span className="badge" style={{ background:(statusColor[p.status]||T.textMuted)+"22", color:statusColor[p.status]||T.textMuted }}>{p.status}</span>
                </div>
                <div style={{ fontSize:11, color:T.textSub }}>{p.consignor} → {p.consignee} · {p.material} · {p.qty} {p.unit}</div>
                <div style={{ fontSize:11, color:T.textMuted }}>{p.from} → {p.to}</div>
              </div>
              <button className="btn" style={{ background:T.green+"22", color:T.green, border:`1px solid ${T.green}33`, fontSize:11 }} onClick={()=>setShowComplete(p)}>
                ✅ Complete Delivery
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Shortage alerts */}
      {shortage.length > 0 && (
        <div className="card" style={{ marginBottom:14, border:`1px solid ${T.red}44`, background:T.redGlow }}>
          <div className="section-title" style={{ color:T.red }}>⚠️ Shortage / Damage Cases — {shortage.length} PODs</div>
          {shortage.map(p=>(
            <div key={p.id} className="arow" style={{ borderLeftColor:T.red }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:700, color:T.red }}>{p.lrNo} · {p.consignee}</div>
                <div style={{ fontSize:11, color:T.textSub }}>Shortage: {p.shortage} {p.unit} · {p.damaged?"Damage reported":"No damage"}</div>
                <div style={{ fontSize:11, color:T.textMuted }}>{p.notes?.slice(0,80)}</div>
              </div>
              <button className="btn" style={{ fontSize:10, background:T.redGlow, color:T.red, border:`1px solid ${T.red}33` }} onClick={()=>setShowDetail(p)}>View →</button>
            </div>
          ))}
        </div>
      )}

      {/* Filter tabs */}
      <div style={{ display:"flex", gap:8, marginBottom:12 }}>
        <div className="tabs" style={{ marginBottom:0 }}>
          {["All","In Transit","Pending Delivery","Delivered & Signed","Delivered — Shortage"].map(s=>(
            <div key={s} className={`tab ${filterStatus===s?"on":""}`} onClick={()=>setFilterStatus(s)} style={{ fontSize:11 }}>{s}</div>
          ))}
        </div>
      </div>

      {/* POD table */}
      <div className="card" style={{ padding:0 }}>
        <table className="tbl">
          <thead><tr><th>LR No</th><th>Date</th><th>Consignor</th><th>Consignee</th><th>Vehicle</th><th>Material</th><th>Qty</th><th>Delivered</th><th>OTP</th><th>Signature</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {filtered.map(p=>(
              <tr key={p.id} style={{ cursor:"pointer" }} onClick={()=>setShowDetail(p)}>
                <td className="mono" style={{ fontSize:11, color:T.accent, fontWeight:700 }}>{p.lrNo}</td>
                <td style={{ fontSize:11 }}>{p.date}</td>
                <td style={{ fontSize:11 }}>{p.consignor?.split(" ").slice(0,2).join(" ")}</td>
                <td style={{ fontSize:11 }}>{p.consignee?.split(" ").slice(0,2).join(" ")}</td>
                <td className="mono" style={{ fontSize:11 }}>{p.vehicle}</td>
                <td style={{ fontSize:11 }}>{p.material}</td>
                <td style={{ fontWeight:600 }}>{p.qty} {p.unit}</td>
                <td style={{ color:p.shortage>0?T.red:T.green, fontWeight:600 }}>{p.deliveredQty!=null?`${p.deliveredQty} ${p.unit}`:"—"}</td>
                <td>{p.otpVerified?<span className="badge bg" style={{ fontSize:10 }}>✅ Yes</span>:<span style={{ color:T.textMuted, fontSize:11 }}>—</span>}</td>
                <td>{p.signatureCaptured?<span className="badge bg" style={{ fontSize:10 }}>✅ Signed</span>:<span style={{ color:T.textMuted, fontSize:11 }}>—</span>}</td>
                <td><span className="badge" style={{ background:(statusColor[p.status]||T.textMuted)+"22", color:statusColor[p.status]||T.textMuted, fontSize:10 }}>{p.status}</span></td>
                <td onClick={e=>e.stopPropagation()}>
                  {!p.locked
                    ? <button className="btn" style={{ fontSize:10, background:T.green+"22", color:T.green, border:`1px solid ${T.green}33`, padding:"3px 8px" }} onClick={()=>setShowComplete(p)}>Complete</button>
                    : <button className="btn" style={{ fontSize:10, padding:"3px 8px", background:T.accentGlow, color:T.accent, border:`1px solid ${T.accent}33` }} onClick={()=>setShowDetail(p)}>View POD →</button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// EQUIPMENT BILLING ENGINE MODULE
// Contract → Usage Logs → Billing → Invoice
// ═══════════════════════════════════════════════════════════════════════════════

const EQ_CONTRACTS_INIT = [
  { id:"EC-001", eqId:"EQ-001", client:"NHAI Road Works",    site:"Madurai Bypass NH7",     type:"HYBRID",  startDate:"2025-03-01", endDate:"2025-05-31", hourlyRate:900,  dailyRate:null, monthlyRate:null, includedHoursPerMonth:180, minGuaranteeHours:180, overtimeRate:1200, shiftHoursPerDay:8, idleChargeable:false, fuelIncluded:false, status:"ACTIVE"  },
  { id:"EC-002", eqId:"EQ-003", client:"L&T Construction",   site:"Chennai Port Road",      type:"MONTHLY", startDate:"2025-02-15", endDate:"2025-06-15", hourlyRate:700,  dailyRate:null, monthlyRate:140000, includedHoursPerMonth:200, minGuaranteeHours:null, overtimeRate:900, shiftHoursPerDay:8, idleChargeable:false, fuelIncluded:false, status:"ACTIVE"  },
  { id:"EC-003", eqId:"EQ-004", client:"TIDCO Projects",     site:"Trichy Industrial Park", type:"HOURLY",  startDate:"2025-04-01", endDate:"2025-07-31", hourlyRate:3500, dailyRate:null, monthlyRate:null, includedHoursPerMonth:null, minGuaranteeHours:null, overtimeRate:null, shiftHoursPerDay:null, idleChargeable:true, fuelIncluded:false, status:"ACTIVE"  },
  { id:"EC-004", eqId:"EQ-006", client:"PWD Tamil Nadu",     site:"Madurai Ring Road",      type:"DAILY",   startDate:"2025-04-10", endDate:"2025-05-10", hourlyRate:null, dailyRate:11000, monthlyRate:null, includedHoursPerMonth:null, minGuaranteeHours:null, overtimeRate:1500, shiftHoursPerDay:8, idleChargeable:false, fuelIncluded:true, status:"ACTIVE" },
];

const USAGE_LOGS_INIT = [
  { id:"UL-001", contractId:"EC-001", eqId:"EQ-001", operatorId:"Kannan S",  date:"2025-04-15", startTime:"07:00", endTime:"17:30", workingHours:9.5, idleHours:1.0, location:"Madurai Bypass km 14", remarks:"Trench excavation — hard soil",       verified:true  },
  { id:"UL-002", contractId:"EC-001", eqId:"EQ-001", operatorId:"Kannan S",  date:"2025-04-14", startTime:"07:00", endTime:"16:00", workingHours:8.0, idleHours:0.5, location:"Madurai Bypass km 13", remarks:"Box culvert excavation",              verified:true  },
  { id:"UL-003", contractId:"EC-001", eqId:"EQ-001", operatorId:"Kannan S",  date:"2025-04-13", startTime:"07:30", endTime:"15:30", workingHours:7.5, idleHours:0.5, location:"Madurai Bypass km 12", remarks:"Foundation pit — WBM layer",          verified:true  },
  { id:"UL-004", contractId:"EC-002", eqId:"EQ-003", operatorId:"Murugan V", date:"2025-04-15", startTime:"06:00", endTime:"17:00", workingHours:10,  idleHours:1.0, location:"Chennai Port Road km 4", remarks:"Road compaction WBM layer",          verified:false },
  { id:"UL-005", contractId:"EC-002", eqId:"EQ-003", operatorId:"Murugan V", date:"2025-04-14", startTime:"06:00", endTime:"15:00", workingHours:8.0, idleHours:0,   location:"Chennai Port Road km 3", remarks:"Sub-grade compaction",               verified:true  },
  { id:"UL-006", contractId:"EC-003", eqId:"EQ-004", operatorId:"Raj Kumar", date:"2025-04-15", startTime:"19:00", endTime:"01:30", workingHours:5.5, idleHours:1.0, location:"Trichy Industrial — floor 3", remarks:"Steel beam lifting — night shift", verified:true  },
  { id:"UL-007", contractId:"EC-004", eqId:"EQ-006", operatorId:"—",         date:"2025-04-15", startTime:"07:00", endTime:"16:00", workingHours:8.0, idleHours:0,   location:"Madurai Ring Road km 2", remarks:"Road grading — first pass",          verified:true  },
  { id:"UL-008", contractId:"EC-004", eqId:"EQ-006", operatorId:"—",         date:"2025-04-14", startTime:"07:00", endTime:"18:00", workingHours:10,  idleHours:0,   location:"Madurai Ring Road km 1", remarks:"Road grading — camber formation",     verified:true  },
];

// ── Billing Engine Core ───────────────────────────────────────────────────────
function calculateBilling(contract, logs) {
  const totalWorkingHours = logs.reduce((s,l)=>s+l.workingHours,0);
  const totalIdleHours = logs.reduce((s,l)=>s+l.idleHours,0);
  const daysWorked = new Set(logs.map(l=>l.date)).size;

  let billableHours = 0, baseAmount = 0, overtimeAmount = 0, extraHours = 0;

  if (contract.type === "HOURLY") {
    billableHours = totalWorkingHours + (contract.idleChargeable ? totalIdleHours : 0);
    baseAmount = billableHours * contract.hourlyRate;
    overtimeAmount = 0;
  } else if (contract.type === "DAILY") {
    const shiftHrs = contract.shiftHoursPerDay || 8;
    billableHours = daysWorked * shiftHrs;
    baseAmount = daysWorked * contract.dailyRate;
    if (totalWorkingHours > billableHours) {
      extraHours = totalWorkingHours - billableHours;
      overtimeAmount = extraHours * (contract.overtimeRate || 0);
    }
  } else if (contract.type === "MONTHLY") {
    billableHours = totalWorkingHours;
    baseAmount = contract.monthlyRate;
    if (totalWorkingHours > (contract.includedHoursPerMonth||0)) {
      extraHours = totalWorkingHours - contract.includedHoursPerMonth;
      overtimeAmount = extraHours * (contract.overtimeRate || 0);
    }
  } else if (contract.type === "HYBRID") {
    billableHours = Math.max(totalWorkingHours, contract.minGuaranteeHours || 0);
    baseAmount = billableHours * contract.hourlyRate;
    if (contract.includedHoursPerMonth && totalWorkingHours > contract.includedHoursPerMonth) {
      extraHours = totalWorkingHours - contract.includedHoursPerMonth;
      overtimeAmount = extraHours * (contract.overtimeRate || 0);
    }
  }

  const totalAmount = baseAmount + overtimeAmount;
  const utilization = contract.includedHoursPerMonth ? Math.round((totalWorkingHours / contract.includedHoursPerMonth) * 100) : Math.round((totalWorkingHours / ((contract.minGuaranteeHours||180))) * 100);
  const idleLoss = totalIdleHours * (contract.hourlyRate || contract.dailyRate/8 || 0);

  return { totalWorkingHours, totalIdleHours, daysWorked, billableHours, extraHours, baseAmount, overtimeAmount, totalAmount, utilization, idleLoss };
}

// ─── Equipment Contract Form Modal ───────────────────────────────────────────
const EquipmentContractModal = ({ onClose, onSave }) => {
  const [f,sf]=useState({eqId:"EQ-001",client:"",site:"",type:"HYBRID",startDate:"",endDate:"",hourlyRate:"",dailyRate:"",monthlyRate:"",includedHours:"",minGuarantee:"",overtimeRate:"",shiftHours:"8",idleChargeable:false,fuelIncluded:false});
  const rf=(k,v)=>sf(x=>({...x,[k]:v}));
  return (
    <div className="ov"><div className="modal" style={{ maxWidth:540 }}>
      <div className="mhdr" style={{ background:"linear-gradient(135deg,#1C1000,#3D2200)",borderBottom:`1px solid ${T.orange}33` }}>
        <div className="rj" style={{ fontSize:16,fontWeight:700,color:T.orange }}>📋 Create Equipment Contract</div>
        <button className="btn" style={{ background:"rgba(255,255,255,.08)",padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub}/></button>
      </div>
      <div className="mbdy">
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10 }}>
          <div><label className="flabel">Equipment *</label><select value={f.eqId} onChange={e=>rf("eqId",e.target.value)}>{EQUIPMENT_DATA.map(e=><option key={e.id} value={e.id}>{e.model} ({e.regNo})</option>)}</select></div>
          <div><label className="flabel">Client *</label><input value={f.client} onChange={e=>rf("client",e.target.value)} placeholder="NHAI / L&T..."/></div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10 }}>
          <div><label className="flabel">Start Date</label><input type="date" value={f.startDate} onChange={e=>rf("startDate",e.target.value)}/></div>
          <div><label className="flabel">End Date</label><input type="date" value={f.endDate} onChange={e=>rf("endDate",e.target.value)}/></div>
        </div>
        <div><label className="flabel">Contract Type</label>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:7,marginTop:6,marginBottom:10 }}>
            {[["HOURLY","⏱️"],["DAILY","📅"],["MONTHLY","📆"],["HYBRID","🔁"]].map(([t,e])=>(
              <div key={t} onClick={()=>rf("type",t)} style={{ padding:"8px",borderRadius:8,cursor:"pointer",border:`2px solid ${f.type===t?T.orange:T.border}`,background:f.type===t?T.orangeGlow:T.bgPanel,textAlign:"center" }}>
                <div style={{ fontSize:16 }}>{e}</div><div style={{ fontSize:9,color:f.type===t?T.orange:T.textSub,marginTop:2 }}>{t}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:10 }}>
          {(f.type==="HOURLY"||f.type==="HYBRID")&&<div><label className="flabel">Rate/hr (₹)</label><input value={f.hourlyRate} onChange={e=>rf("hourlyRate",e.target.value)}/></div>}
          {f.type==="DAILY"&&<div><label className="flabel">Daily Rate (₹)</label><input value={f.dailyRate} onChange={e=>rf("dailyRate",e.target.value)}/></div>}
          {f.type==="MONTHLY"&&<div><label className="flabel">Monthly Rate (₹)</label><input value={f.monthlyRate} onChange={e=>rf("monthlyRate",e.target.value)}/></div>}
          {(f.type==="HYBRID"||f.type==="HOURLY")&&<div><label className="flabel">Min Guarantee Hrs</label><input value={f.minGuarantee} onChange={e=>rf("minGuarantee",e.target.value)} placeholder="180"/></div>}
          {(f.type!=="HOURLY")&&<div><label className="flabel">OT Rate (₹/hr)</label><input value={f.overtimeRate} onChange={e=>rf("overtimeRate",e.target.value)}/></div>}
        </div>
        <div style={{ display:"flex",justifyContent:"flex-end",gap:8,marginTop:14 }}>
          <button className="btn btn-gh" onClick={onClose}>Cancel</button>
          <button className="btn" style={{ background:T.orange,color:"#080B10",fontWeight:700 }} onClick={()=>{onSave&&onSave({id:`EC-${Date.now()}`,eqId:f.eqId,client:f.client,site:f.site,type:f.type,startDate:f.startDate,endDate:f.endDate,hourlyRate:parseInt(f.hourlyRate)||null,dailyRate:parseInt(f.dailyRate)||null,monthlyRate:parseInt(f.monthlyRate)||null,minGuaranteeHours:parseInt(f.minGuarantee)||null,overtimeRate:parseInt(f.overtimeRate)||null,shiftHoursPerDay:parseInt(f.shiftHours)||8,status:"ACTIVE"});onClose();}}>📋 Create Contract</button>
        </div>
      </div>
    </div></div>
  );
};
// ─── Equipment Billing Engine Page ────────────────────────────────────────────
const EquipmentBillingPage = () => {
  const [selEq,setSelEq]=useState(EQUIPMENT_DATA[0]?.id||"EQ-001");
  const [logs,setLogs]=useState(SITE_LOG_DATA||[]);
  const eq=EQUIPMENT_DATA.find(e=>e.id===selEq)||EQUIPMENT_DATA[0]||{};
  const contract=EQ_CONTRACTS_INIT.find(c=>c.eqId===selEq);
  const eqLogs=logs.filter(l=>l.eqId===selEq);
  const billed=eqLogs.filter(l=>l.status==="Billed").reduce((s,l)=>s+l.billAmount,0);
  const pending=eqLogs.filter(l=>l.status==="Pending").reduce((s,l)=>s+l.billAmount,0);
  return (
    <div>
      <div style={{ marginBottom:20 }}><h1 className="rj" style={{ fontSize:28,fontWeight:700 }}>Equipment Billing</h1><p style={{ color:T.textSub,fontSize:12 }}>Running hours · Daily minimum guarantee · Client approval</p></div>
      <div style={{ display:"flex",gap:8,marginBottom:14,flexWrap:"wrap" }}>
        {EQUIPMENT_DATA.map(e=><div key={e.id} onClick={()=>setSelEq(e.id)} style={{ padding:"5px 12px",borderRadius:7,cursor:"pointer",border:`2px solid ${selEq===e.id?T.orange:T.border}`,background:selEq===e.id?T.orangeGlow:T.bgPanel,fontSize:12,color:selEq===e.id?T.orange:T.textSub,fontWeight:selEq===e.id?700:400 }}>{EQUIPMENT_TYPES[e.type]?.icon||"🏗️"} {e.regNo}</div>)}
      </div>
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(4,1fr)",marginBottom:14 }}>
        {[{ l:"Billed",v:fmt(billed),c:T.green },{ l:"Pending",v:fmt(pending),c:T.orange },{ l:"Rate",v:`₹${contract?.hourlyRate||eq.hourlyRate||900}/hr`,c:T.accent },{ l:"Client",v:contract?.client?.split(" ")[0]||"—",c:T.blue }].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c,fontSize:22 }}>{k.v}</div><div className="stat-l">{k.l}</div></div>
        ))}
      </div>
      {contract&&<div style={{ background:T.bgPanel,border:`1px solid ${T.orange}33`,borderRadius:8,padding:10,marginBottom:12,display:"flex",gap:16,fontSize:11,flexWrap:"wrap" }}>
        <span>Contract: <strong>{contract.type}</strong></span><span>Min Hrs: <strong style={{ color:T.orange }}>{contract.minGuaranteeHours||contract.includedHoursPerMonth||"—"}h</strong></span><span>OT Rate: <strong style={{ color:T.red }}>₹{contract.overtimeRate||"—"}/hr</strong></span><span>Period: {contract.startDate} → {contract.endDate}</span>
      </div>}
      <div className="card" style={{ padding:0 }}>
        <table className="tbl">
          <thead><tr><th>Date</th><th>Hours Worked</th><th>Min Applied</th><th>Bill Amount</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {eqLogs.length===0&&<tr><td colSpan={6} style={{ textAlign:"center",color:T.textMuted,padding:20 }}>No site logs. Use Heavy Equipment → Log Hours to add.</td></tr>}
            {eqLogs.map(l=>{const bh=Math.max(l.hoursWorked,contract?.shiftHoursPerDay||8);return(<tr key={l.id}><td style={{ fontSize:11 }}>{l.date}</td><td style={{ fontWeight:700,color:T.orange }}>{l.hoursWorked}h</td><td style={{ color:bh>l.hoursWorked?T.orange:T.green }}>{bh}h</td><td style={{ fontWeight:700,color:T.green }}>{fmt(l.billAmount)}</td><td><span className={`badge ${l.status==="Billed"?"bg":"bo"}`}>{l.status}</span></td><td>{!l.approved&&<button className="btn btn-g" style={{ fontSize:10,padding:"2px 7px" }} onClick={()=>setLogs(ls=>ls.map(x=>x.id===l.id?{...x,approved:true,status:"Billed"}:x))}>Approve</button>}</td></tr>);})}
          </tbody>
        </table>
      </div>
    </div>
  );
};
// ═══════════════════════════════════════════════════════════════════════════════
// BUS FLEET MANAGEMENT — COMPREHENSIVE MODULE
// Bus Types · Daily Operations · Compliance · Seat Check · Permits · Driver Check
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Bus Fleet Types ──────────────────────────────────────────────────────────
const BUS_FLEET_TYPES = {
  CORPORATE_SHUTTLE:  { label:"Corporate Shuttle",   icon:"🏢", color:"#3B82F6",  billing:"MONTHLY_CONTRACT",  desc:"Daily employee pickup/drop, fixed routes, monthly billing to company HR" },
  SCHOOL_BUS:         { label:"School Bus",           icon:"🏫", color:"#F59E0B",  billing:"MONTHLY_CONTRACT",  desc:"School routes AM/PM, student roster, parent notifications, safety critical" },
  TOURISM_CHARTER:    { label:"Tourism / Charter",    icon:"🗺️", color:"#10B981",  billing:"PER_TRIP",          desc:"One-off tourist groups, outstation tours, temple circuits, multi-day trips" },
  STAFF_TRANSPORT:    { label:"Hospital / Staff",     icon:"🏥", color:"#8B5CF6",  billing:"MONTHLY_CONTRACT",  desc:"3-shift hospital transport, shift-based scheduling, 24/7 operations" },
  CONTRACT_CARRIAGE:  { label:"Contract Carriage",    icon:"📋", color:"#F97316",  billing:"RATE_CONTRACT",     desc:"Dedicated bus to one company/institution under Stage Carriage Permit" },
  LOCAL_STAGE:        { label:"Local Stage / City",   icon:"🏙️", color:"#06B6D4",  billing:"TICKET_BASED",      desc:"City route running, daily ticket collection, conductor-based operations" },
  INTER_CITY:         { label:"Inter-City Express",   icon:"🛣️", color:"#EF4444",  billing:"TICKET_BASED",      desc:"Express coach between cities, advance booking, online ticketing" },
  EVENT_TRANSPORT:    { label:"Event Transport",      icon:"🎪", color:"#EC4899",  billing:"PER_TRIP",          desc:"Wedding, function, conference — one-time contract" },
};

// ─── Bus Master Data ──────────────────────────────────────────────────────────
const BUS_MASTER_DATA = [
  { id:"BS-001", regNo:"TN22 IJ7890", type:"CORPORATE_SHUTTLE", make:"Tata",   model:"Starbus Ultra 40",  seatingCapacity:40, standingCapacity:0,  year:2022, acType:"AC", fuelType:"Diesel", color:"White/Blue", insuranceExpiry:"2026-01-15", fcExpiry:"2026-03-20", permitType:"Contract Carriage", permitExpiry:"2026-11-30", mvTaxDue:"2025-07-01", pucExpiry:"2025-08-10", fitnessScore:88, status:"Active", assignedRoute:"Sholinganallur–Siruseri", client:"Cognizant Technology" },
  { id:"BS-002", regNo:"TN45 KL4321", type:"SCHOOL_BUS",        make:"Ashok",  model:"Leyland LYNX 32",   seatingCapacity:32, standingCapacity:0,  year:2020, acType:"Non-AC", fuelType:"Diesel", color:"Yellow", insuranceExpiry:"2025-09-30", fcExpiry:"2025-12-15", permitType:"School Bus Permit", permitExpiry:"2025-12-31", mvTaxDue:"2025-10-01", pucExpiry:"2025-06-30", fitnessScore:72, status:"Active", assignedRoute:"Koramangala–CBSE School", client:"Greenfield School" },
  { id:"BS-003", regNo:"TN69 MN8765", type:"TOURISM_CHARTER",   make:"Volvo",  model:"9400 Club Class",   seatingCapacity:45, standingCapacity:0,  year:2023, acType:"AC", fuelType:"Diesel", color:"White/Red", insuranceExpiry:"2026-06-20", fcExpiry:"2026-08-10", permitType:"Tourist Vehicle Permit", permitExpiry:"2027-03-15", mvTaxDue:"2026-01-01", pucExpiry:"2025-11-20", fitnessScore:95, status:"Available", assignedRoute:null, client:null },
  { id:"BS-004", regNo:"TN38 PQ2345", type:"LOCAL_STAGE",       make:"Tata",   model:"Starbus 4x2",       seatingCapacity:52, standingCapacity:20, year:2019, acType:"Non-AC", fuelType:"Diesel", color:"Red/Cream", insuranceExpiry:"2025-05-15", fcExpiry:"2025-04-30", permitType:"Stage Carriage Permit", permitExpiry:"2025-07-31", mvTaxDue:"2025-04-01", pucExpiry:"2025-04-25", fitnessScore:61, status:"Overdue Compliance", assignedRoute:"Route 47C Tambaram–Velachery", client:"CMTU Contract" },
];

// ─── Bus Compliance Tracker (per bus) ─────────────────────────────────────────
const BUS_COMPLIANCE_DOCS = [
  // Insurance
  { id:"BC-001", busId:"BS-001", docType:"Insurance",           docNo:"POL-2024-1182945", issuer:"New India Assurance",  issueDate:"2025-01-15", expiryDate:"2026-01-15", daysLeft:266, status:"Valid",   fine:"₹2,000–₹5,000/day",    renewalURL:"https://newindia.co.in" },
  { id:"BC-002", busId:"BS-001", docType:"Fitness Certificate", docNo:"FC/TN-22/2025/881", issuer:"RTO Chennai South",   issueDate:"2025-03-20", expiryDate:"2026-03-20", daysLeft:331, status:"Valid",   fine:"₹2,000 first offence",  renewalURL:"https://parivahan.gov.in" },
  { id:"BC-003", busId:"BS-001", docType:"Permit (Contract)",   docNo:"PCP/TN/2021/5541",  issuer:"RTO Chennai Central", issueDate:"2021-11-30", expiryDate:"2026-11-30", daysLeft:585, status:"Valid",   fine:"Permit cancellation",    renewalURL:"https://parivahan.gov.in" },
  { id:"BC-004", busId:"BS-001", docType:"PUC Certificate",     docNo:"PUC-2025-884421",   issuer:"TNPCB Authorised",    issueDate:"2025-02-10", expiryDate:"2025-08-10", daysLeft:108, status:"Valid",   fine:"₹1,000",                 renewalURL:"https://vaahan.tn.gov.in" },
  { id:"BC-005", busId:"BS-001", docType:"Motor Vehicle Tax",   docNo:"MVT-TN22-2025",     issuer:"RTO Chennai South",   issueDate:"2025-01-01", expiryDate:"2025-07-01", daysLeft:68,  status:"Due Soon","fine":"Penalty + tax",        renewalURL:"https://tn.echallan.gov.in" },
  { id:"BC-006", busId:"BS-002", docType:"Insurance",           docNo:"POL-2024-0987321",  issuer:"HDFC Ergo",           issueDate:"2024-09-30", expiryDate:"2025-09-30", daysLeft:159, status:"Valid",   fine:"₹2,000–₹5,000/day",    renewalURL:"" },
  { id:"BC-007", busId:"BS-002", docType:"Fitness Certificate", docNo:"FC/TN-45/2024/330", issuer:"RTO Bangalore South", issueDate:"2024-12-15", expiryDate:"2025-12-15", daysLeft:235, status:"Valid",   fine:"₹2,000 first offence",  renewalURL:"" },
  { id:"BC-008", busId:"BS-002", docType:"PUC Certificate",     docNo:"PUC-2025-221133",   issuer:"TNPCB Authorised",    issueDate:"2025-03-30", expiryDate:"2025-06-30", daysLeft:67,  status:"Due Soon","fine":"₹1,000",               renewalURL:"" },
  { id:"BC-009", busId:"BS-004", docType:"Insurance",           docNo:"POL-2024-0045221",  issuer:"United India",        issueDate:"2024-05-15", expiryDate:"2025-05-15", daysLeft:21,  status:"Critical","fine":"₹2,000–₹5,000/day",   renewalURL:"" },
  { id:"BC-010", busId:"BS-004", docType:"Fitness Certificate", docNo:"FC/TN-38/2024/117", issuer:"RTO Chennai Central", issueDate:"2024-04-30", expiryDate:"2025-04-30", daysLeft:-7,  status:"Expired", "fine":"₹10,000 + seizure",   renewalURL:"" },
  { id:"BC-011", busId:"BS-004", docType:"PUC Certificate",     docNo:"PUC-2025-009441",   issuer:"TNPCB Authorised",    issueDate:"2025-01-25", expiryDate:"2025-04-25", daysLeft:-8,  status:"Expired", "fine":"₹1,000",               renewalURL:"" },
];

// ─── Driver Compliance ─────────────────────────────────────────────────────────
const DRIVER_COMPLIANCE_DATA = [
  { driverId:"DRV-001", name:"Mani Kumar",  dlNo:"TN202012345678", dlClass:"PSV/HMV", dlExpiry:"2027-04-10", badgeNo:"TN-PSV-2024-18821", badgeExpiry:"2026-04-10", medFitExpiry:"2025-10-15", policeVerification:"2024-08-20", aadharLinked:true,  mobileVerified:true,  trainingCert:"2023-11-01", status:"Valid"    },
  { driverId:"DRV-002", name:"Selvam R",    dlNo:"TN20190044122",  dlClass:"PSV/HMV", dlExpiry:"2025-06-30", badgeNo:"TN-PSV-2023-09821", badgeExpiry:"2025-06-30", medFitExpiry:"2025-05-20", policeVerification:"2023-06-15", aadharLinked:true,  mobileVerified:true,  trainingCert:"2022-09-15", status:"Expiring" },
  { driverId:"DRV-004", name:"Arjun D",     dlNo:"KA2022079988",   dlClass:"PSV/HMV", dlExpiry:"2028-02-28", badgeNo:"KA-PSV-2024-55210", badgeExpiry:"2026-02-28", medFitExpiry:"2026-01-10", policeVerification:"2024-12-01", aadharLinked:true,  mobileVerified:true,  trainingCert:"2024-01-20", status:"Valid"    },
  { driverId:"DRV-005", name:"Karthik M",   dlNo:"TN20200054321",  dlClass:"HMV",     dlExpiry:"2025-05-15", badgeNo:null,                badgeExpiry:null,          medFitExpiry:"2024-12-01", policeVerification:"2023-01-10", aadharLinked:false, mobileVerified:false, trainingCert:null,         status:"Non-Compliant" },
];

// ─── Seat Condition Checklist ─────────────────────────────────────────────────
const SEAT_CHECK_TEMPLATE = [
  { id:"SC-CL", label:"Seat Cover / Upholstery",     check:"No tears, stains, or missing covers" },
  { id:"SC-FR", label:"Seat Frame & Recliner",        check:"No wobble, recliner works if applicable" },
  { id:"SC-BL", label:"Seat Belt — Buckle Lock",      check:"Click-lock mechanism works on all seats" },
  { id:"SC-BR", label:"Seat Belt — Retractor",        check:"Belt retracts smoothly, no fraying" },
  { id:"SC-WN", label:"Window — Open/Close",          check:"Slides or cranks open, latches closed" },
  { id:"SC-WG", label:"Window — Glass Condition",     check:"No cracks, chips, or obstructed visibility" },
  { id:"SC-OV", label:"Overhead Rack / Luggage Bay",  check:"No sharp edges, latches secure" },
  { id:"SC-AC", label:"AC Vent at Seat",              check:"Airflow present, directional fin moves" },
  { id:"SC-LT", label:"Reading Light at Seat",        check:"Light switch works, bulb not blown" },
  { id:"SC-ES", label:"Emergency Exit Row — Clear",   check:"Aisle/exit unobstructed, signage visible" },
];

// ─── Bus Pre-Trip Safety Check ─────────────────────────────────────────────────
const BUS_PRETRIP_CHECKS = {
  safety_critical: [
    { id:"PT-BK", label:"Brake system — foot + hand",      cat:"safety",    critical:true  },
    { id:"PT-TR", label:"Tyre pressure all 6 wheels",       cat:"tyres",     critical:true  },
    { id:"PT-TT", label:"Tyre tread & sidewall condition",  cat:"tyres",     critical:true  },
    { id:"PT-DR", label:"All passenger doors open/close",   cat:"safety",    critical:true  },
    { id:"PT-EX", label:"Emergency exit — clear & marked",  cat:"safety",    critical:true  },
    { id:"PT-FE", label:"Fire extinguisher — charged",      cat:"safety",    critical:true  },
    { id:"PT-FA", label:"First aid kit — complete",         cat:"safety",    critical:true  },
    { id:"PT-SB", label:"Sample seat belt test (3 seats)",  cat:"safety",    critical:true  },
  ],
  electrical: [
    { id:"PT-HL", label:"Headlights + high beam",           cat:"electrical", critical:true  },
    { id:"PT-IN", label:"Indicators (all 4)",               cat:"electrical", critical:true  },
    { id:"PT-BL", label:"Brake lights",                     cat:"electrical", critical:true  },
    { id:"PT-HR", label:"Horn",                             cat:"electrical", critical:false },
    { id:"PT-WP", label:"Windshield wipers",                cat:"electrical", critical:false },
    { id:"PT-AC", label:"AC / heater operational",          cat:"electrical", critical:false },
    { id:"PT-RL", label:"Interior ceiling lights",          cat:"electrical", critical:false },
  ],
  mechanical: [
    { id:"PT-EN", label:"Engine oil level",                 cat:"engine",    critical:false },
    { id:"PT-CL", label:"Coolant level",                    cat:"engine",    critical:false },
    { id:"PT-FL", label:"Fuel level (min 1/4 tank)",        cat:"engine",    critical:true  },
    { id:"PT-WS", label:"Windshield — no cracks",           cat:"body",      critical:true  },
    { id:"PT-MR", label:"Mirrors — adjusted, uncracked",    cat:"body",      critical:true  },
    { id:"PT-RT", label:"Retro-reflective tape — intact",   cat:"compliance",critical:false },
  ],
  compliance: [
    { id:"PT-RC", label:"RC + Fitness Cert in cabin",       cat:"compliance",critical:true  },
    { id:"PT-PM", label:"Permit document in cabin",         cat:"compliance",critical:true  },
    { id:"PT-IN2",label:"Insurance document in cabin",      cat:"compliance",critical:true  },
    { id:"PT-PU", label:"PUC certificate valid",            cat:"compliance",critical:true  },
    { id:"PT-DL", label:"Driver DL valid (check card)",     cat:"compliance",critical:true  },
    { id:"PT-BD", label:"Driver PSV badge worn",            cat:"compliance",critical:true  },
  ],
};

// ─── Daily Route Schedule Data ────────────────────────────────────────────────
const ROUTE_SCHEDULES = [
  { id:"RS-001", busId:"BS-001", contractId:"FC-006", routeName:"Corporate Shuttle Route A", type:"CORPORATE_SHUTTLE", client:"Cognizant Technology", stops:[ { name:"Sholinganallur OMR",    time:"08:25", pax:8  }, { name:"Perungudi Tollgate",     time:"08:38", pax:12 }, { name:"Elcot SEZ Gate",         time:"08:49", pax:6  }, { name:"Siruseri IT Park",       time:"09:05", pax:0  } ], totalPax:26, amShift:"08:25–09:05", pmShift:"18:15–18:55", driver:"Arjun D", conductor:null, daysOfWeek:["Mon","Tue","Wed","Thu","Fri"], monthlyRate:52000 },
  { id:"RS-002", busId:"BS-002", contractId:null,      routeName:"School Route — Morning AM", type:"SCHOOL_BUS",        client:"Greenfield School",    stops:[ { name:"HSR Layout 7th Sector", time:"07:10", pax:6  }, { name:"Koramangala 4th Block",  time:"07:22", pax:10 }, { name:"BTM 2nd Stage",          time:"07:35", pax:8  }, { name:"School Gate",            time:"07:50", pax:0  } ], totalPax:24, amShift:"07:10–07:50", pmShift:"13:30–14:15", driver:"Mani Kumar", conductor:"Raju K", daysOfWeek:["Mon","Tue","Wed","Thu","Fri","Sat"], monthlyRate:38000 },
  { id:"RS-003", busId:"BS-004", contractId:null,      routeName:"Route 47C Stage Service",   type:"LOCAL_STAGE",        client:"CMTU",                 stops:[ { name:"Tambaram Bus Stand",     time:"06:00", pax:20 }, { name:"Pallavaram",             time:"06:18", pax:14 }, { name:"Guindy",                 time:"06:38", pax:18 }, { name:"Velachery Bus Stop",     time:"07:00", pax:0  } ], totalPax:52, frequency:"Every 30 min", driver:"Selvam R", conductor:"Murugan K", daysOfWeek:["Daily"], ticketRate:12, dailyRevTarget:3600 },
];

// ─── Ticket Collection Data (Local Stage) ─────────────────────────────────────
const TICKET_LOG_INIT = [
  { id:"TK-001", routeId:"RS-003", date:"2025-04-15", shift:"AM", tripNo:1, boardedPax:48, ticketsSold:48, cashCollected:576,  conductorName:"Murugan K", verified:true  },
  { id:"TK-002", routeId:"RS-003", date:"2025-04-15", shift:"AM", tripNo:2, boardedPax:52, ticketsSold:52, cashCollected:624,  conductorName:"Murugan K", verified:true  },
  { id:"TK-003", routeId:"RS-003", date:"2025-04-15", shift:"PM", tripNo:3, boardedPax:35, ticketsSold:35, cashCollected:420,  conductorName:"Murugan K", verified:false },
  { id:"TK-004", routeId:"RS-003", date:"2025-04-15", shift:"PM", tripNo:4, boardedPax:41, ticketsSold:39, cashCollected:468,  conductorName:"Murugan K", verified:false },
];

// ─── Bus Operations Page ──────────────────────────────────────────────────────
const BusOperationsPage = () => {
  const [tab,setTab]=useState("fleet");
  const [showSeat,setShowSeat]=useState(null);
  const [showPreTrip,setShowPreTrip]=useState(null);
  const [showCompliance,setShowCompliance]=useState(null);
  const [seatData,setSeatData]=useState({});
  const [selSeat,setSelSeat]=useState(null);
  const [ptData,setPtData]=useState({});
  const [tickets]=useState(TICKET_LOG_INIT||[]);
  const expDocs=BUS_COMPLIANCE_DOCS.filter(d=>d.daysLeft<0);
  const critDocs=BUS_COMPLIANCE_DOCS.filter(d=>d.daysLeft>=0&&d.daysLeft<=30);
  const docColor=d=>d.daysLeft<0?T.red:d.daysLeft<=30?T.red:d.daysLeft<=90?T.orange:T.green;
  const docLabel=d=>d.daysLeft<0?`EXPIRED ${Math.abs(d.daysLeft)}d ago`:`${d.daysLeft}d left`;
  const SEAT_ITEMS=[{id:"SC-UP",label:"Seat cover / upholstery"},{id:"SC-FR",label:"Seat frame & recliner"},{id:"SC-BK",label:"Seat belt buckle lock"},{id:"SC-RT",label:"Seat belt retractor"},{id:"SC-WO",label:"Window open/close"},{id:"SC-WG",label:"Window glass condition"},{id:"SC-OR",label:"Overhead rack / luggage bay"},{id:"SC-AC",label:"AC vent functioning"},{id:"SC-RL",label:"Reading light"},{id:"SC-EX",label:"Emergency exit row clear"}];
  const getSeatStatus=React.useCallback((busId,seat)=>{const keys=SEAT_ITEMS.map(c=>`${busId}_${seat}_${c.id}`);const vals=keys.map(k=>seatData[k]);if(vals.every(v=>!v))return"unchecked";if(vals.some(v=>v==="issue"))return"issue";if(vals.every(v=>v==="ok"))return"ok";return"partial";},[seatData]);
  const cycleItem=React.useCallback((busId,seat,itemId)=>{const k=`${busId}_${seat}_${itemId}`;const cur=seatData[k]||"";const nxt=cur===""?"ok":cur==="ok"?"issue":"";setSeatData(d=>({...d,[k]:nxt}));},[seatData]);
  const criticalFailed=showPreTrip?BUS_PRETRIP_CHECKS.safety_critical.some(c=>ptData[`${showPreTrip.id}_${c.id}`]==="issue"):false;
  const allCriticalDone=showPreTrip?BUS_PRETRIP_CHECKS.safety_critical.every(c=>ptData[`${showPreTrip.id}_${c.id}`]==="ok"):false;
  return (
    <div>
      {/* ── SEAT CHECK MODAL ── */}
      {showSeat&&(<div className="ov" style={{ alignItems:"flex-start",paddingTop:16,overflowY:"auto" }}>
        <div className="modal" style={{ maxWidth:680,width:"100%",margin:"0 auto" }}>
          <div className="mhdr" style={{ background:`linear-gradient(135deg,#0C1220,${T.blue}33)`,borderBottom:`1px solid ${T.blue}33` }}>
            <div className="rj" style={{ fontSize:16,fontWeight:700,color:T.blue }}>💺 Seat Condition Check — {showSeat.regNo}</div>
            <button className="btn" style={{ padding:"5px 9px" }} onClick={()=>{setShowSeat(null);setSelSeat(null);}}><Ic n="x" s={14} c={T.textSub}/></button>
          </div>
          <div className="mbdy">
            <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:5,marginBottom:12 }}>
              {Array.from({length:showSeat.seatingCapacity},(_,i)=>`${Math.floor(i/4)+1}${"ABCD"[i%4]}`).map(s=>{
                const st=getSeatStatus(showSeat.id,s);
                const bg=st==="ok"?T.greenGlow:st==="issue"?T.redGlow:st==="partial"?T.accentGlow:T.bgPanel;
                const border=st==="ok"?T.green:st==="issue"?T.red:st==="partial"?T.accent:T.border;
                const col=st==="ok"?T.green:st==="issue"?T.red:st==="partial"?T.accent:T.textMuted;
                return(<div key={s} onClick={()=>setSelSeat(selSeat===s?null:s)} style={{ height:38,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,cursor:"pointer",border:`2px solid ${selSeat===s?"#F59E0B":border}`,background:selSeat===s?T.accentGlow:bg,color:selSeat===s?T.accent:col,transition:"all .15s" }}>{s}</div>);
              })}
            </div>
            <div style={{ display:"flex",gap:10,fontSize:10,color:T.textMuted,marginBottom:10 }}>
              <span style={{ color:T.green }}>✅ OK: {Object.values(seatData).filter(v=>v==="ok").length}</span>
              <span style={{ color:T.red }}>❌ Issues: {Object.values(seatData).filter(v=>v==="issue").length}</span>
              <span style={{ color:T.textMuted }}>⬜ Unchecked: {showSeat.seatingCapacity*SEAT_ITEMS.length-Object.keys(seatData).filter(k=>k.startsWith(showSeat.id+"_")).length} items</span>
            </div>
            {selSeat&&(
              <div style={{ background:T.bgPanel,border:`1px solid ${T.border}`,borderRadius:10,padding:14,marginBottom:10 }}>
                <div style={{ fontSize:12,fontWeight:700,color:T.accent,marginBottom:10 }}>Seat {selSeat} — 10-Point Inspection</div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:6 }}>
                  {SEAT_ITEMS.map(item=>{
                    const val=seatData[`${showSeat.id}_${selSeat}_${item.id}`]||"";
                    return(<div key={item.id} onClick={()=>cycleItem(showSeat.id,selSeat,item.id)} style={{ display:"flex",gap:8,alignItems:"center",padding:"7px 10px",borderRadius:7,cursor:"pointer",background:val==="ok"?T.greenGlow:val==="issue"?T.redGlow:T.bgCard,border:`1px solid ${val==="ok"?T.green:val==="issue"?T.red:T.border}33` }}>
                      <span style={{ fontSize:14,flexShrink:0 }}>{val==="ok"?"✅":val==="issue"?"❌":"⬜"}</span>
                      <span style={{ fontSize:11 }}>{item.label}</span>
                    </div>);
                  })}
                </div>
                {SEAT_ITEMS.some(c=>seatData[`${showSeat.id}_${selSeat}_${c.id}`]==="issue")&&(
                  <div style={{ marginTop:10,padding:"8px 12px",background:T.redGlow,border:`1px solid ${T.red}44`,borderRadius:7,fontSize:11,color:T.red }}>
                    ⚠️ Issues found on seat {selSeat} — Work Order will be generated on submit.
                  </div>
                )}
              </div>
            )}
            {!selSeat&&<div style={{ fontSize:11,color:T.textMuted,marginBottom:10 }}>Click any seat code above to inspect its 10 items individually.</div>}
            <div style={{ display:"flex",justifyContent:"flex-end",gap:8 }}>
              <button className="btn btn-gh" onClick={()=>{setShowSeat(null);setSelSeat(null);}}>Close</button>
              <button className="btn btn-b" style={{ fontSize:11 }}>📋 Generate WO for Issues</button>
            </div>
          </div>
        </div>
      </div>)}
      {/* ── PRE-TRIP SAFETY CHECK MODAL ── */}
      {showPreTrip&&(<div className="ov" style={{ alignItems:"flex-start",paddingTop:16,overflowY:"auto" }}>
        <div className="modal" style={{ maxWidth:600,width:"100%",margin:"0 auto" }}>
          <div className="mhdr" style={{ background:"linear-gradient(135deg,#052E16,#064E3B,#065F46)",borderBottom:`1px solid ${T.green}33` }}>
            <div>
              <div className="rj" style={{ fontSize:16,fontWeight:700,color:T.green }}>🔍 Pre-Trip Safety Check — {showPreTrip.regNo}</div>
              <div style={{ fontSize:10,color:"rgba(255,255,255,.5)",marginTop:2 }}>28 checks across 4 categories · All Safety Critical items must pass</div>
            </div>
            <button className="btn" style={{ padding:"5px 9px" }} onClick={()=>setShowPreTrip(null)}><Ic n="x" s={14} c={T.textSub}/></button>
          </div>
          <div className="mbdy">
            {criticalFailed&&(
              <div style={{ background:T.redGlow,border:`1px solid ${T.red}44`,borderRadius:8,padding:"10px 14px",marginBottom:12 }}>
                <div style={{ fontSize:12,fontWeight:700,color:T.red }}>🚨 Bus CANNOT depart — resolve critical issues first</div>
                <div style={{ fontSize:11,color:T.textMuted,marginTop:2 }}>One or more Safety Critical items are marked as FAIL. All 8 critical checks must pass.</div>
              </div>
            )}
            {[
              {key:"safety_critical",label:"🚨 Safety Critical",color:T.red,count:8},
              {key:"electrical",label:"⚡ Electrical & Lights",color:T.amber||T.accent,count:7},
              {key:"mechanical",label:"🔧 Mechanical",color:T.orange,count:6},
              {key:"compliance",label:"📋 Documents & Compliance",color:T.blue,count:7},
            ].map(({key,label,color,count})=>(
              <div key={key} style={{ marginBottom:14 }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8 }}>
                  <div style={{ fontSize:12,fontWeight:700,color }}>{label}</div>
                  <div style={{ fontSize:10,color:T.textMuted }}>{(BUS_PRETRIP_CHECKS[key]||[]).filter(c=>ptData[`${showPreTrip.id}_${c.id}`]==="ok").length}/{count} passed</div>
                </div>
                {(BUS_PRETRIP_CHECKS[key]||[]).map(chk=>{
                  const val=ptData[`${showPreTrip.id}_${chk.id}`]||"";
                  return(<div key={chk.id} onClick={()=>setPtData(d=>({...d,[`${showPreTrip.id}_${chk.id}`]:val==="ok"?"issue":val==="issue"?"":val==="na"?"ok":"ok"}))} style={{ display:"flex",gap:8,alignItems:"center",padding:"8px 10px",borderRadius:7,cursor:"pointer",background:val==="ok"?T.greenGlow:val==="issue"?T.redGlow:T.bgPanel,border:`1px solid ${val==="ok"?T.green:val==="issue"?T.red:T.border}22`,marginBottom:3,transition:"background .12s" }}>
                    <span style={{ fontSize:16,flexShrink:0 }}>{val==="ok"?"✅":val==="issue"?"❌":"⬜"}</span>
                    <span style={{ fontSize:12,flex:1 }}>{chk.label}</span>
                    {chk.critical&&<span className="badge br" style={{ fontSize:8,flexShrink:0 }}>CRITICAL</span>}
                  </div>);
                })}
              </div>
            ))}
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:4 }}>
              <div style={{ fontSize:11,color:T.textMuted }}>
                {Object.values(ptData).filter(v=>v==="ok").length} / 28 checks passed
              </div>
              <div style={{ display:"flex",gap:8 }}>
                <button className="btn btn-gh" onClick={()=>setShowPreTrip(null)}>Cancel</button>
                <button className="btn" style={{ fontSize:11,background:criticalFailed||!allCriticalDone?"rgba(255,255,255,.08)":T.green,color:criticalFailed||!allCriticalDone?T.textMuted:"#fff",cursor:criticalFailed||!allCriticalDone?"not-allowed":"pointer",opacity:criticalFailed||!allCriticalDone?.5:1 }} disabled={criticalFailed||!allCriticalDone}>
                  🚌 Clear for Departure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>)}
      {/* ── COMPLIANCE MODAL ── */}
      {showCompliance&&(<div className="ov"><div className="modal" style={{ maxWidth:500 }}>
        <div className="mhdr" style={{ background:"linear-gradient(135deg,#1C0000,#3D1000)",borderBottom:`1px solid ${T.red}33` }}>
          <div className="rj" style={{ fontSize:16,fontWeight:700,color:T.red }}>📋 Compliance — {showCompliance.regNo}</div>
          <button className="btn" style={{ padding:"5px 9px" }} onClick={()=>setShowCompliance(null)}><Ic n="x" s={14} c={T.textSub}/></button>
        </div>
        <div className="mbdy">
          {BUS_COMPLIANCE_DOCS.filter(d=>d.busId===showCompliance.id).map(doc=>(
            <div key={doc.id} style={{ padding:"10px 0",borderBottom:`1px solid ${T.border}22` }}>
              <div style={{ display:"flex",justifyContent:"space-between" }}>
                <div>
                  <div style={{ display:"flex",gap:8,marginBottom:3 }}><span style={{ fontSize:12,fontWeight:700 }}>{doc.docType}</span><span className="badge" style={{ background:docColor(doc)+"22",color:docColor(doc),fontSize:10 }}>{docLabel(doc)}</span></div>
                  <div style={{ fontSize:10,color:T.textMuted }}>No: {doc.docNo} · Expiry: <strong style={{ color:docColor(doc) }}>{doc.expiryDate}</strong></div>
                  {doc.daysLeft<0&&<div style={{ fontSize:11,color:T.red,fontWeight:700 }}>Fine: {doc.fine}</div>}
                </div>
                {doc.daysLeft<90&&<button className="btn" style={{ fontSize:10,background:T.blue+"22",color:T.blue,border:`1px solid ${T.blue}33` }}>Renew →</button>}
              </div>
            </div>
          ))}
          <div style={{ display:"flex",justifyContent:"flex-end",marginTop:10 }}><button className="btn btn-gh" onClick={()=>setShowCompliance(null)}>Close</button></div>
        </div>
      </div></div>)}
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20 }}>
        <div><h1 className="rj" style={{ fontSize:28,fontWeight:700 }}>Bus Operations</h1><p style={{ color:T.textSub,fontSize:12 }}>Corporate · School · Tourism · Stage · PSV Compliance · Driver Check · Seat Inspection</p></div>
        {expDocs.length>0&&<button className="btn" style={{ fontSize:11,background:T.red+"22",color:T.red,border:`1px solid ${T.red}33` }}>⚠️ {expDocs.length} Expired Docs</button>}
      </div>
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(5,1fr)",marginBottom:18 }}>
        {[{l:"Buses",v:BUS_MASTER_DATA.length,c:T.blue},{l:"Active",v:BUS_MASTER_DATA.filter(b=>b.status==="Active").length,c:T.green},{l:"Expired Docs",v:expDocs.length,c:T.red},{l:"Critical <30d",v:critDocs.length,c:T.orange},{l:"Non-Compliant Drivers",v:DRIVER_COMPLIANCE_DATA.filter(d=>d.status!=="Valid").length,c:T.orange}].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>
        ))}
      </div>
      {expDocs.length>0&&<div className="card" style={{ marginBottom:12,border:`1px solid ${T.red}44`,background:T.redGlow }}>
        <div className="section-title" style={{ color:T.red }}>🚨 Compliance Violations — MV Act 2019</div>
        {expDocs.map(doc=>{const bus=BUS_MASTER_DATA.find(b=>b.id===doc.busId);return(<div key={doc.id} className="arow" style={{ borderLeftColor:T.red }}><div style={{ flex:1 }}><div style={{ fontWeight:700,color:T.red }}>{bus?.regNo} — {doc.docType}</div><div style={{ fontSize:11,color:T.textSub }}>Expired {Math.abs(doc.daysLeft)}d ago · Fine: {doc.fine}</div></div><button className="btn" style={{ fontSize:10,background:T.red+"22",color:T.red }} onClick={()=>setShowCompliance(bus)}>View</button></div>);})}
      </div>}
      <div className="tabs">
        {["fleet","compliance","driver-check","seat-check","routes","tickets"].map(t=>(
          <div key={t} className={`tab ${tab===t?"on":""}`} onClick={()=>setTab(t)} style={{ fontSize:11,whiteSpace:"nowrap" }}>
            {t==="driver-check"?"Driver PSV":t==="seat-check"?"Seat Check":t.charAt(0).toUpperCase()+t.slice(1)}
          </div>
        ))}
      </div>
      {tab==="fleet"&&<div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
        {BUS_MASTER_DATA.map(bus=>{
          const bt=BUS_FLEET_TYPES[bus.type];
          const docs=BUS_COMPLIANCE_DOCS.filter(d=>d.busId===bus.id);
          const expired=docs.filter(d=>d.daysLeft<0);
          const crit=docs.filter(d=>d.daysLeft>=0&&d.daysLeft<=30);
          return(<div key={bus.id} className="card" style={{ border:`1px solid ${expired.length?T.red:crit.length?T.orange:T.border}` }}>
            <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
              <div>
                <div style={{ display:"flex",gap:8,alignItems:"center",marginBottom:3 }}><span style={{ fontSize:16 }}>{bt?.icon}</span><span className="mono" style={{ fontSize:13,fontWeight:700,color:T.accent }}>{bus.regNo}</span><span className={`badge ${bus.status==="Active"?"bg":"ba"}`} style={{ fontSize:10 }}>{bus.status}</span></div>
                <div style={{ fontSize:11,color:T.textSub }}>{bus.model} · {bus.seatingCapacity} seats · {bus.acType}</div>
                <div style={{ fontSize:11,color:bt?.color }}>{bt?.label}</div>
              </div>
              <div style={{ textAlign:"right" }}><div style={{ fontSize:12,fontWeight:700,color:expired.length?T.red:crit.length?T.orange:T.green }}>{expired.length?`${expired.length} EXPIRED`:crit.length?`${crit.length} critical`:"Compliant ✅"}</div></div>
            </div>
            <div style={{ display:"flex",gap:6 }}>
              <button className="btn" style={{ flex:1,fontSize:10,background:T.green+"22",color:T.green,border:`1px solid ${T.green}33`,padding:"5px 0" }} onClick={()=>setShowPreTrip(bus)}>🔍 Pre-Trip (28)</button>
              <button className="btn" style={{ flex:1,fontSize:10,background:T.blue+"22",color:T.blue,border:`1px solid ${T.blue}33`,padding:"5px 0" }} onClick={()=>{setShowSeat(bus);setSelSeat(null);}}>💺 Seats ({bus.seatingCapacity})</button>
              <button className="btn" style={{ flex:1,fontSize:10,background:T.red+"22",color:T.red,border:`1px solid ${T.red}33`,padding:"5px 0" }} onClick={()=>setShowCompliance(bus)}>📋 Docs</button>
            </div>
          </div>);
        })}
      </div>}
      {tab==="compliance"&&<div className="card" style={{ padding:0 }}>
        <table className="tbl">
          <thead><tr><th>Bus</th><th>Document</th><th>Doc No</th><th>Issuer</th><th>Expiry</th><th>Status</th><th>Fine</th><th></th></tr></thead>
          <tbody>{BUS_COMPLIANCE_DOCS.map(doc=>{const bus=BUS_MASTER_DATA.find(b=>b.id===doc.busId);return(<tr key={doc.id} style={{ background:doc.daysLeft<0?T.redGlow:"" }}><td className="mono" style={{ color:T.accent }}>{bus?.regNo}</td><td style={{ fontSize:11,fontWeight:600 }}>{doc.docType}</td><td className="mono" style={{ fontSize:10 }}>{doc.docNo}</td><td style={{ fontSize:10,color:T.textMuted }}>{doc.issuer||"—"}</td><td style={{ color:docColor(doc),fontWeight:600 }}>{doc.expiryDate}</td><td><span className="badge" style={{ background:docColor(doc)+"22",color:docColor(doc),fontSize:10 }}>{docLabel(doc)}</span></td><td style={{ fontSize:11,color:doc.daysLeft<0?T.red:T.textMuted }}>{doc.fine}</td><td>{doc.daysLeft<90&&<button className="btn" style={{ fontSize:10,padding:"3px 8px",background:T.blue+"22",color:T.blue,border:`1px solid ${T.blue}33` }}>Renew</button>}</td></tr>);})}
          </tbody>
        </table>
        <div style={{ padding:"10px 14px",background:T.bgPanel,borderTop:`1px solid ${T.border}`,fontSize:11,color:T.textMuted }}>
          📌 MV Act 2019 penalties: Insurance lapse = ₹2,000 (1st) / ₹4,000 (repeat) + vehicle seizure · FC expired = ₹2,000–₹10,000 + ₹50/day · Permit = ₹10,000–₹25,000 · PUC = ₹1,000 + seizure · Driver DL = ₹5,000 + 3mo imprisonment
        </div>
      </div>}
      {tab==="driver-check"&&<div>{DRIVER_COMPLIANCE_DATA.map(drv=>{
        const sc=drv.status==="Valid"?T.green:drv.status==="Expiring"?T.orange:T.red;
        return(<div key={drv.driverId} className="card" style={{ marginBottom:10,border:`1px solid ${sc}33` }}>
          <div style={{ display:"flex",justifyContent:"space-between",marginBottom:10 }}>
            <div style={{ display:"flex",gap:10,alignItems:"center" }}>
              <div style={{ width:36,height:36,borderRadius:"50%",background:sc+"22",border:`2px solid ${sc}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:sc }}>{drv.name[0]}</div>
              <div><div style={{ fontSize:13,fontWeight:700 }}>{drv.name}</div><div className="mono" style={{ fontSize:11,color:T.textMuted }}>DL: {drv.dlNo}</div></div>
            </div>
            <span className="badge" style={{ background:sc+"22",color:sc }}>{drv.status}</span>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6 }}>
            {[["DL Class",drv.dlClass,"✅"],["DL Expiry",drv.dlExpiry,new Date(drv.dlExpiry||"2030")>new Date()?"✅":"❌"],["PSV Badge",drv.badgeNo||"NONE",!!drv.badgeNo?"✅":"❌"],["PSV Badge Worn","Check Physical","✅"],["Med Fitness 1A",drv.medFitExpiry,drv.medFitExpiry&&new Date(drv.medFitExpiry)>new Date()?"✅":"❌"],["Police Verify",drv.policeVerif||"Pending",drv.policeVerif?"✅":"❌"],["Aadhaar Linked",drv.aadhaarLinked?"Yes":"No",drv.aadhaarLinked?"✅":"❌"],["Training Cert",drv.trainingCert||"None",drv.trainingCert?"✅":"❌"]].map(([l,v,ok])=>(
              <div key={l} style={{ background:ok==="✅"?T.greenGlow:T.redGlow,border:`1px solid ${ok==="✅"?T.green:T.red}33`,borderRadius:7,padding:"5px 8px" }}>
                <div style={{ fontSize:9,color:T.textMuted }}>{l}</div>
                <div style={{ fontSize:10,fontWeight:600 }}>{ok} {String(v).slice(0,14)}</div>
              </div>
            ))}
          </div>
        </div>);
      })}</div>}
      {tab==="seat-check"&&(
        <div>
          <div style={{ background:T.blueGlow||T.bgPanel,border:`1px solid ${T.blue}33`,borderRadius:8,padding:10,marginBottom:12,fontSize:11,color:T.textSub }}>
            💺 Click a bus to start the 10-item × all-seats check. Each seat cycles: ⬜ Unchecked → ✅ OK → ❌ Issue. Issues auto-generate a Work Order suggestion.
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
            {BUS_MASTER_DATA.map(bus=>{
              const totalSeats=bus.seatingCapacity;
              const checkedSeats=Array.from({length:totalSeats},(_,i)=>`${Math.floor(i/4)+1}${"ABCD"[i%4]}`).filter(s=>getSeatStatus(bus.id,s)!=="unchecked").length;
              const issueSeats=Array.from({length:totalSeats},(_,i)=>`${Math.floor(i/4)+1}${"ABCD"[i%4]}`).filter(s=>getSeatStatus(bus.id,s)==="issue").length;
              return(<div key={bus.id} className="card" style={{ padding:14 }}>
                <div className="mono" style={{ fontSize:13,fontWeight:700,color:T.accent,marginBottom:3 }}>{bus.regNo}</div>
                <div style={{ fontSize:11,color:T.textSub,marginBottom:6 }}>{bus.model} · {totalSeats} seats</div>
                <div style={{ display:"flex",gap:10,fontSize:11,marginBottom:10 }}>
                  <span style={{ color:T.green }}>✅ {checkedSeats} checked</span>
                  {issueSeats>0&&<span style={{ color:T.red }}>❌ {issueSeats} issues</span>}
                  <span style={{ color:T.textMuted }}>{totalSeats-checkedSeats} pending</span>
                </div>
                <button className="btn btn-b" style={{ width:"100%",fontSize:11 }} onClick={()=>{setShowSeat(bus);setSelSeat(null);}}>
                  💺 {checkedSeats>0?"Continue Check":"Start Check"} — {totalSeats} seats
                </button>
              </div>);
            })}
          </div>
        </div>
      )}
      {tab==="routes"&&<div>{ROUTE_SCHEDULES.map(r=>{
        const bus=BUS_MASTER_DATA.find(b=>b.id===r.busId);
        const bt=BUS_FLEET_TYPES[r.type];
        return(<div key={r.id} className="card" style={{ marginBottom:10 }}>
          <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
            <div>
              <div style={{ display:"flex",gap:8,alignItems:"center",marginBottom:3 }}>
                <span>{bt?.icon}</span><span style={{ fontWeight:700 }}>{r.routeName}</span>
                <span className="badge" style={{ background:(bt?.color||T.textMuted)+"22",color:bt?.color,fontSize:10 }}>{bt?.label}</span>
                {r.daysOfWeek&&<span style={{ fontSize:10,color:T.textMuted }}>{r.daysOfWeek}</span>}
              </div>
              <div style={{ fontSize:11,color:T.textSub }}>Bus: {bus?.regNo||"—"} · Driver: {r.driver||"—"} · Conductor: {r.conductor||"—"}</div>
            </div>
            <div style={{ textAlign:"right" }}>
              {r.monthlyRate&&<div style={{ fontWeight:700,color:T.green }}>{fmt(r.monthlyRate)}/mo</div>}
              {r.dailyRevTarget&&<div style={{ fontSize:11,color:T.textMuted }}>Target: {fmt(r.dailyRevTarget)}/day</div>}
            </div>
          </div>
          <div style={{ display:"flex",gap:4,overflowX:"auto",paddingBottom:4 }}>
            {r.stops.map((s,i)=>(
              <div key={i} style={{ display:"flex",alignItems:"center" }}>
                <div style={{ background:T.bgPanel,border:`1px solid ${bt?.color||T.border}33`,borderRadius:7,padding:"5px 8px",minWidth:100,flexShrink:0 }}>
                  <div style={{ fontSize:9,color:T.textMuted }}>{s.time}</div>
                  <div style={{ fontSize:11,fontWeight:600 }}>{s.name.split(" ").slice(0,3).join(" ")}</div>
                  {s.pax>0&&<div style={{ fontSize:9,color:bt?.color }}>{s.pax} pax</div>}
                </div>
                {i<r.stops.length-1&&<div style={{ padding:"0 4px",color:T.textMuted,fontSize:14 }}>→</div>}
              </div>
            ))}
          </div>
          {r.amShift&&<div style={{ marginTop:6,fontSize:10,color:T.textMuted }}>AM: {r.amShift} · PM: {r.pmShift||"—"}</div>}
        </div>);
      })}</div>}
      {tab==="tickets"&&<div>
        <div className="card" style={{ marginBottom:12 }}>
          <div className="section-title">Daily Collection Summary</div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10 }}>
            {[{l:"Trips",v:tickets.length,c:T.blue},{l:"Passengers",v:tickets.reduce((s,t)=>s+t.boardedPax,0),c:T.green},{l:"Tickets Sold",v:tickets.reduce((s,t)=>s+t.ticketsSold,0),c:T.accent},{l:"Cash",v:fmt(tickets.reduce((s,t)=>s+t.cashCollected,0)),c:T.green}].map(k=>(<div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>))}
          </div>
        </div>
        <div className="card" style={{ padding:0 }}>
          <table className="tbl">
            <thead><tr><th>Shift</th><th>Trip No</th><th>Pax Boarded</th><th>Tickets</th><th>Cash</th><th>Shortfall</th><th>Verified</th></tr></thead>
            <tbody>{tickets.map(t=>{
              const shortfall=t.boardedPax-t.ticketsSold;
              return(<tr key={t.id} style={{ background:shortfall>0?T.redGlow:"" }}>
                <td><span className={`badge ${t.shift==="AM"?"bg":"bb"}`} style={{ fontSize:10 }}>{t.shift}</span></td>
                <td style={{ fontWeight:600 }}>{t.tripNo}</td>
                <td style={{ color:T.orange }}>{t.boardedPax}</td>
                <td style={{ color:shortfall>0?T.red:T.green,fontWeight:600 }}>{t.ticketsSold}{shortfall>0&&<span style={{ fontSize:10 }}> (−{shortfall})</span>}</td>
                <td style={{ fontWeight:700,color:T.green }}>₹{t.cashCollected.toLocaleString()}</td>
                <td style={{ color:shortfall>0?T.red:T.textMuted,fontWeight:shortfall>0?700:400 }}>{shortfall>0?`${shortfall} missing`:"None"}</td>
                <td>{t.verified?<span className="badge bg" style={{ fontSize:10 }}>✅ Done</span>:<span className="badge bo" style={{ fontSize:10 }}>Pending</span>}</td>
              </tr>);
            })}</tbody>
          </table>
        </div>
      </div>}
    </div>
  );
};
// ═══════════════════════════════════════════════════════════════════════════════
// COMPLIANCE & LEGAL TRACKING — E-way Bill, Permits, Overload, Driver License
// ═══════════════════════════════════════════════════════════════════════════════
const EWAY_BILLS = [
  { id:"EWB-001", tripId:"TRP-2025-0041", ewbNo:"310412345678901", gstin:"33AABCT1332L1ZR", consignor:"Ramco Cements Ltd", consignee:"Coimbatore Depot", from:"Chennai", to:"Coimbatore", material:"Portland Cement", hsnCode:"2523", value:185000, weight:"18MT", validUpto:"2025-04-17", status:"Active",   generated:"2025-04-10" },
  { id:"EWB-002", tripId:"TRP-2025-0042", ewbNo:"310498765432109", gstin:"33AADCG3456M1ZP", consignor:"Own Stock",         consignee:"Godrej Industries",  from:"Madurai", to:"Bangalore", material:"M-Sand",          hsnCode:"2505", value:65000,  weight:"22MT", validUpto:"2025-04-16", status:"Expiring","generated":"2025-04-12" },
  { id:"EWB-003", tripId:"TRP-2025-0044", ewbNo:"310411223344556", gstin:"33AACCM2341N1ZK", consignor:"Pepsico Warehouse", consignee:"Metro Cash Carry",   from:"Salem",   to:"Hyderabad", material:"FMCG Beverages",  hsnCode:"2202", value:320000, weight:"12MT", validUpto:"2025-04-14", status:"Expired", "generated":"2025-04-14" },
];

const PERMIT_COMPLIANCE = [
  { id:"PC-001", vehicleNo:"TN69 GH4789", permitType:"National Permit", permitNo:"NP-TN-2023-0088123", issuer:"RTO Chennai South", issueDate:"2023-04-01", expiryDate:"2025-04-01", daysLeft:-14, status:"EXPIRED",   fine:"₹10,000–₹25,000" },
  { id:"PC-002", vehicleNo:"TN59 AB1234", permitType:"National Permit", permitNo:"NP-TN-2022-0071234", issuer:"RTO Chennai North", issueDate:"2022-08-01", expiryDate:"2025-08-01", daysLeft:108, status:"VALID",     fine:"—" },
  { id:"PC-003", vehicleNo:"TN45 CD5678", permitType:"State Permit",    permitNo:"SP-TN-2023-0045678", issuer:"RTO Madurai",       issueDate:"2023-01-10", expiryDate:"2025-05-10", daysLeft:26,  status:"CRITICAL",  fine:"₹10,000" },
  { id:"PC-004", vehicleNo:"TN38 EF9012", permitType:"National Permit", permitNo:"NP-TN-2024-0032198", issuer:"RTO Trichy",        issueDate:"2024-05-01", expiryDate:"2027-05-01", daysLeft:746, status:"VALID",     fine:"—" },
  { id:"PC-005", vehicleNo:"TN71 GH3456", permitType:"State Permit",    permitNo:"SP-TN-2024-0067890", issuer:"RTO Coimbatore",    issueDate:"2024-02-01", expiryDate:"2025-06-01", daysLeft:63,  status:"VALID",     fine:"—" },
  { id:"PC-006", vehicleNo:"TN22 IJ7890", permitType:"National Permit", permitNo:"NP-TN-2023-0099012", issuer:"RTO Salem",         issueDate:"2023-06-01", expiryDate:"2025-06-01", daysLeft:63,  status:"VALID",     fine:"—" },
];

const CompliancePage = () => {
  const [tab, setTab] = useState("eway");
  const licenseExpiring = DRIVERS_DATA.filter(d => {
    const exp = new Date(d.licenseExp||"2030-01-01");
    return (exp - new Date()) < 90 * 86400000;
  });
  const overloadedVehicles = FLEET_DATA.filter(v => {
    const gvw = v.gvw||25; const load = v.currentLoad||Math.round(gvw*0.82);
    return load > gvw;
  });

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Compliance & Legal</h1>
          <p style={{ color:T.textSub, fontSize:12 }}>E-way Bills · Permits · Overload Alerts · Driver License Expiry — Stay penalty-free under MV Act 2019</p>
        </div>
        <button className="btn btn-p" style={{ fontSize:11 }}>📥 Download Compliance Report</button>
      </div>
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(5,1fr)", marginBottom:18 }}>
        {[
          { l:"Active E-way Bills",  v:EWAY_BILLS.filter(e=>e.status==="Active").length,   c:T.green  },
          { l:"EWB Expiring",        v:EWAY_BILLS.filter(e=>e.status==="Expiring").length, c:T.orange },
          { l:"EWB Expired",         v:EWAY_BILLS.filter(e=>e.status==="Expired").length,  c:T.red    },
          { l:"Permit Violations",   v:PERMIT_COMPLIANCE.filter(p=>p.status==="EXPIRED").length, c:T.red },
          { l:"DL Expiring <90d",    v:licenseExpiring.length,                             c:T.orange },
        ].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}>
            <div className="stat-v" style={{ color:k.c }}>{k.v}</div>
            <div className="stat-l">{k.l}</div>
          </div>
        ))}
      </div>
      <div className="tabs">
        {[["eway","📋 E-Way Bills"],["permits","🗺️ Permits"],["overload","⚖️ Overload Alerts"],["licenses","🪪 Driver Licenses"]].map(([t,l])=>(
          <div key={t} className={`tab ${tab===t?"on":""}`} onClick={()=>setTab(t)} style={{ whiteSpace:"nowrap" }}>{l}</div>
        ))}
      </div>

      {tab==="eway"&&(
        <div>
          <div style={{ background:T.blueGlow||"#1E3A5F22", border:`1px solid ${T.blue}33`, borderRadius:8, padding:"10px 14px", marginBottom:14, fontSize:11 }}>
            <strong style={{ color:T.blue }}>📌 E-way Bill Rules:</strong> <span style={{ color:T.textSub }}>Mandatory under GST for goods worth <strong>₹50,000+</strong> transported more than <strong>50 km</strong>. Penalty for missing/invalid EWB = <strong style={{ color:T.red }}>200% of tax amount</strong> or ₹10,000, whichever is higher. Validity: 1 day per 200 km. HSN code must match goods description.</span>
          </div>
          <div className="card" style={{ padding:0 }}>
            <table className="tbl">
              <thead><tr><th>EWB No</th><th>Trip</th><th>Consignor → Consignee</th><th>Material</th><th>HSN</th><th>Value</th><th>Valid Upto</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {EWAY_BILLS.map(e=>(
                  <tr key={e.id} style={{ background:e.status==="Expired"?T.redGlow:e.status==="Expiring"?"rgba(245,158,11,.06)":"" }}>
                    <td className="mono" style={{ fontSize:11 }}>{e.ewbNo}</td>
                    <td style={{ fontSize:11, color:T.accent }}>{e.tripId}</td>
                    <td style={{ fontSize:11 }}>{e.consignor?.split(" ")[0]} → {e.consignee?.split(" ")[0]}</td>
                    <td style={{ fontSize:11 }}>{e.material}</td>
                    <td className="mono" style={{ fontSize:11, color:T.textMuted }}>{e.hsnCode}</td>
                    <td style={{ fontWeight:600 }}>₹{e.value.toLocaleString()}</td>
                    <td style={{ fontSize:11, color:e.status==="Expired"?T.red:e.status==="Expiring"?T.orange:T.green, fontWeight:600 }}>{e.validUpto}</td>
                    <td><span className={`badge ${e.status==="Active"?"bg":e.status==="Expiring"?"bo":"br"}`} style={{ fontSize:10 }}>{e.status}</span></td>
                    <td>
                      {e.status==="Expiring"&&<button className="btn" style={{ fontSize:10,padding:"3px 8px",background:T.orange+"22",color:T.orange,border:`1px solid ${T.orange}33` }}>Extend</button>}
                      {e.status==="Expired"&&<button className="btn" style={{ fontSize:10,padding:"3px 8px",background:T.red+"22",color:T.red,border:`1px solid ${T.red}33` }}>Re-generate</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop:12, display:"flex", gap:8 }}>
            <button className="btn btn-p" style={{ fontSize:11 }}>+ Generate New EWB</button>
            <button className="btn btn-b" style={{ fontSize:11 }}>🔄 Bulk Extend</button>
            <button className="btn btn-gh" style={{ fontSize:11 }}>📤 Export to GST Portal</button>
          </div>
        </div>
      )}

      {tab==="permits"&&(
        <div>
          <div style={{ background:T.accentGlow, border:`1px solid ${T.accent}33`, borderRadius:8, padding:"10px 14px", marginBottom:14, fontSize:11 }}>
            <strong style={{ color:T.accent }}>📌 Permit Penalty Scale (MV Act 2019):</strong> <span style={{ color:T.textSub }}>Without valid National Permit: <strong>₹10,000 first offence + ₹25,000 repeat</strong>. State Permit: <strong>₹5,000</strong>. Permit-less vehicle can be seized by enforcement authorities.</span>
          </div>
          <div className="card" style={{ padding:0 }}>
            <table className="tbl">
              <thead><tr><th>Vehicle No</th><th>Permit Type</th><th>Permit No</th><th>Issuer</th><th>Expiry</th><th>Days Left</th><th>Status</th><th>Fine</th><th></th></tr></thead>
              <tbody>
                {PERMIT_COMPLIANCE.map(p=>{
                  const col = p.status==="EXPIRED"?T.red:p.status==="CRITICAL"?T.orange:T.green;
                  return(
                    <tr key={p.id} style={{ background:p.status==="EXPIRED"?T.redGlow:p.status==="CRITICAL"?"rgba(249,115,22,.06)":"" }}>
                      <td className="mono" style={{ color:T.accent }}>{p.vehicleNo}</td>
                      <td style={{ fontSize:11 }}>{p.permitType}</td>
                      <td className="mono" style={{ fontSize:10 }}>{p.permitNo}</td>
                      <td style={{ fontSize:10, color:T.textMuted }}>{p.issuer}</td>
                      <td style={{ color:col, fontWeight:600 }}>{p.expiryDate}</td>
                      <td>
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <div style={{ width:48, height:5, borderRadius:3, background:T.border, overflow:"hidden" }}>
                            <div style={{ height:"100%", borderRadius:3, background:col, width:`${Math.max(0,Math.min(100,p.daysLeft/365*100))}%` }}/>
                          </div>
                          <span style={{ fontWeight:600, color:col, fontSize:11 }}>{p.daysLeft<0?`Expired ${Math.abs(p.daysLeft)}d ago`:`${p.daysLeft}d`}</span>
                        </div>
                      </td>
                      <td><span className={`badge ${p.status==="VALID"?"bg":p.status==="CRITICAL"?"bo":"br"}`} style={{ fontSize:10 }}>{p.status}</span></td>
                      <td style={{ color:T.red, fontSize:11 }}>{p.fine}</td>
                      <td>{p.daysLeft<90&&<button className="btn" style={{ fontSize:10,padding:"3px 8px",background:T.blue+"22",color:T.blue,border:`1px solid ${T.blue}33` }}>Renew →</button>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab==="overload"&&(
        <div>
          <div style={{ background:T.redGlow, border:`1px solid ${T.red}44`, borderRadius:8, padding:"10px 14px", marginBottom:14, fontSize:11 }}>
            <strong style={{ color:T.red }}>⚖️ Overload Fine Formula (MV Act 2019):</strong> <span style={{ color:T.textSub }}>₹2,000 for first 1,000 kg excess + ₹1,000 for each additional 1,000 kg. Repeat offence: <strong>₹20,000 flat</strong>. Automatic detection at national highway weighbridges (NHB). Vehicle detained until excess load unloaded.</span>
          </div>
          {overloadedVehicles.length>0&&(
            <div className="card" style={{ marginBottom:12, border:`1px solid ${T.red}44`, background:T.redGlow }}>
              <div className="section-title" style={{ color:T.red }}>🚨 Overloaded Vehicles — Immediate Action Required</div>
              {overloadedVehicles.map(v=>{
                const gvw=v.gvw||25; const load=v.currentLoad||Math.round(gvw*0.82);
                const excess=load-gvw; const fine=excess<=1?2000:2000+(Math.ceil((excess-1))*1000);
                return(<div key={v.id} className="arow" style={{ borderLeftColor:T.red }}>
                  <div style={{ flex:1 }}>
                    <div className="mono" style={{ fontWeight:700,color:T.accent }}>{v.num}</div>
                    <div style={{ fontSize:11,color:T.textSub }}>{v.model} · Load: {load}T / GVW: {gvw}T · Excess: <strong style={{ color:T.red }}>{excess}T</strong></div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontWeight:700,color:T.red }}>Fine: ₹{fine.toLocaleString()}</div>
                    <button className="btn btn-r" style={{ fontSize:10,marginTop:4 }}>Offload Excess</button>
                  </div>
                </div>);
              })}
            </div>
          )}
          <div className="card">
            <div className="section-title">All Fleet — Load vs GVW</div>
            {FLEET_DATA.map(v=>{
              const gvw=v.gvw||25; const load=v.currentLoad||Math.round(gvw*0.82);
              const pct=Math.round((load/gvw)*100); const over=load>gvw;
              const excess=Math.max(0,load-gvw); const fine=excess<=1&&excess>0?2000:excess>1?2000+(Math.ceil((excess-1))*1000):0;
              return(
                <div key={v.id} style={{ padding:"12px 0", borderBottom:`1px solid ${T.border}22`, display:"flex", gap:14, alignItems:"center" }}>
                  <div style={{ minWidth:130, fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:T.accent }}>{v.num}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:4 }}>
                      <span style={{ color:T.textSub }}>{v.model}</span>
                      <span style={{ color:over?T.red:T.green, fontWeight:700 }}>{load}T / {gvw}T GVW {over?"⚠️ OVERLOADED ₹"+fine.toLocaleString()+" fine":""}</span>
                    </div>
                    <div className="pbar" style={{ height:8 }}>
                      <div className="pfill" style={{ width:`${Math.min(pct,100)}%`, background:over?T.red:pct>90?T.orange:T.green, transition:"width .3s" }}/>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, marginTop:3 }}>
                      <span style={{ color:T.textMuted }}>{pct}% of GVW</span>
                      {over&&<span style={{ color:T.red, fontWeight:700 }}>+{excess}T excess — ₹{fine.toLocaleString()} penalty</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab==="licenses"&&(
        <div>
          {licenseExpiring.length>0&&(
            <div className="card" style={{ marginBottom:12, border:`1px solid ${T.orange}44`, background:T.orangeGlow||T.accentGlow }}>
              <div className="section-title" style={{ color:T.orange }}>⚠️ Driver Licenses Expiring Within 90 Days</div>
              <div style={{ fontSize:11, color:T.textSub, marginBottom:10 }}>
                📌 Fine for driving with expired DL (MV Act 2019): ₹5,000 first offence + 3 months imprisonment. If accident occurs with expired DL, insurance claim may be <strong>rejected</strong>.
              </div>
              {licenseExpiring.map(d=>{
                const daysLeft=Math.round((new Date(d.licenseExp||"2030-01-01")-new Date())/86400000);
                return(<div key={d.id} className="arow" style={{ borderLeftColor:T.orange }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:12, fontWeight:700 }}>{d.name}</div>
                    <div style={{ fontSize:11, color:T.textSub }}>DL: {d.licenseNo||"—"} · Class: {d.cdl} · Expiry: <strong style={{ color:T.orange }}>{d.licenseExp}</strong> · <span style={{ color:daysLeft<30?T.red:T.orange }}>{daysLeft} days left</span></div>
                  </div>
                  <div style={{ display:"flex", gap:6 }}>
                    <button className="btn btn-o" style={{ fontSize:10 }}>📱 Remind Driver</button>
                    <button className="btn btn-b" style={{ fontSize:10 }}>Sarathi →</button>
                  </div>
                </div>);
              })}
            </div>
          )}
          <div className="card" style={{ padding:0 }}>
            <table className="tbl">
              <thead><tr><th>Driver</th><th>DL Number</th><th>Class</th><th>Score</th><th>Expiry</th><th>Days Left</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {DRIVERS_DATA.map(d=>{
                  const daysLeft=Math.round((new Date(d.licenseExp||"2030-01-01")-new Date())/86400000);
                  const col=daysLeft<30?T.red:daysLeft<90?T.orange:T.green;
                  return(
                    <tr key={d.id} style={{ background:daysLeft<30?T.redGlow:daysLeft<90?"rgba(245,158,11,.05)":"" }}>
                      <td style={{ fontWeight:600 }}>{d.name}</td>
                      <td className="mono" style={{ fontSize:11 }}>{d.licenseNo||"—"}</td>
                      <td><span className="badge bb" style={{ fontSize:10 }}>{d.cdl}</span></td>
                      <td style={{ color:d.score>=85?T.green:d.score>=70?T.orange:T.red, fontWeight:600 }}>{d.score}</td>
                      <td style={{ color:col, fontWeight:600 }}>{d.licenseExp||"—"}</td>
                      <td>
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <div style={{ width:40, height:5, borderRadius:3, background:T.border, overflow:"hidden" }}>
                            <div style={{ height:"100%", borderRadius:3, background:col, width:`${Math.max(0,Math.min(100,daysLeft/730*100))}%` }}/>
                          </div>
                          <span style={{ fontWeight:600, color:col, fontSize:11 }}>{daysLeft>365?`${Math.round(daysLeft/30)}mo`:`${daysLeft}d`}</span>
                        </div>
                      </td>
                      <td><span className={`badge ${daysLeft<30?"br":daysLeft<90?"bo":"bg"}`} style={{ fontSize:10 }}>{daysLeft<30?"CRITICAL":daysLeft<90?"Expiring":"Valid"}</span></td>
                      <td>{daysLeft<90&&<button className="btn btn-o" style={{ fontSize:10,padding:"3px 8px" }}>Remind</button>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAYMENT & COLLECTION SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════
const PAYMENT_RECORDS = [
  { id:"PAY-001", tripId:"TRP-2025-0041", client:"Ramco Cements Ltd",  invoiceNo:"INV-2025-041",  invoiceAmt:42000, paidAmt:20000, balanceDue:22000, dueDate:"2025-05-10", daysOverdue:0,  paymentMode:"Bank Transfer", lastPayDate:"2025-04-10", status:"Partial",  creditDays:30 },
  { id:"PAY-002", tripId:"TRP-2025-0044", client:"Pepsico India",       invoiceNo:"INV-2025-044A", invoiceAmt:12000, paidAmt:12000, balanceDue:0,     dueDate:"2025-04-29", daysOverdue:0,  paymentMode:"UPI",           lastPayDate:"2025-04-20", status:"Paid",     creditDays:15 },
  { id:"PAY-003", tripId:"TRP-2025-0044", client:"Avenue Supermarts",   invoiceNo:"INV-2025-044B", invoiceAmt:5000,  paidAmt:0,     balanceDue:5000,  dueDate:"2025-04-29", daysOverdue:0,  paymentMode:null,            lastPayDate:null,         status:"Pending",  creditDays:15 },
  { id:"PAY-004", tripId:"TRP-2025-0042", client:"Godrej Industries",   invoiceNo:"INV-2025-042",  invoiceAmt:38000, paidAmt:18000, balanceDue:20000, dueDate:"2025-04-12", daysOverdue:17, paymentMode:"Cheque",        lastPayDate:"2025-03-30", status:"Overdue",  creditDays:30 },
  { id:"PAY-005", tripId:"TRP-2025-0047", client:"SKS Logistics",       invoiceNo:"INV-2025-047",  invoiceAmt:47000, paidAmt:47000, balanceDue:0,     dueDate:"2025-04-01", daysOverdue:0,  paymentMode:"NEFT",          lastPayDate:"2025-04-01", status:"Paid",     creditDays:30 },
  { id:"PAY-006", tripId:"TRP-2025-0043", client:"TVS Motors",          invoiceNo:"INV-2025-043",  invoiceAmt:75000, paidAmt:30000, balanceDue:45000, dueDate:"2025-04-20", daysOverdue:9,  paymentMode:"RTGS",          lastPayDate:"2025-04-05", status:"Overdue",  creditDays:30 },
  { id:"PAY-007", tripId:"TRP-2025-0045", client:"Asian Paints",        invoiceNo:"INV-2025-045",  invoiceAmt:92000, paidAmt:0,     balanceDue:92000, dueDate:"2025-05-15", daysOverdue:0,  paymentMode:null,            lastPayDate:null,         status:"Pending",  creditDays:30 },
];

const PaymentsPage = () => {
  const [payments, setPayments] = useState(PAYMENT_RECORDS);
  const [showRecordPay, setShowRecordPay] = useState(null);
  const [payAmt, setPayAmt] = useState("");
  const totalOutstanding = payments.reduce((s,p)=>s+p.balanceDue,0);
  const overdueAmt = payments.filter(p=>p.status==="Overdue").reduce((s,p)=>s+p.balanceDue,0);
  const collected = payments.reduce((s,p)=>s+p.paidAmt,0);
  const handleRecord = (id) => {
    const amt = parseInt(payAmt)||0;
    if(!amt) return;
    setPayments(ps=>ps.map(p=>{
      if(p.id!==id) return p;
      const newPaid = p.paidAmt+amt;
      const newBal = Math.max(0,p.invoiceAmt-newPaid);
      return {...p, paidAmt:newPaid, balanceDue:newBal, status:newBal===0?"Paid":newBal<p.invoiceAmt?"Partial":p.status, lastPayDate:new Date().toISOString().split("T")[0]};
    }));
    setShowRecordPay(null); setPayAmt("");
  };
  return (
    <div>
      {showRecordPay&&(<div className="ov"><div className="modal" style={{ maxWidth:420 }}>
        <div className="mhdr" style={{ background:"linear-gradient(135deg,#052E16,#065F46)",borderBottom:`1px solid ${T.green}33` }}>
          <div className="rj" style={{ fontSize:16,fontWeight:700,color:T.green }}>💰 Record Payment</div>
          <button className="btn" style={{ padding:"5px 9px" }} onClick={()=>setShowRecordPay(null)}><Ic n="x" s={14} c={T.textSub}/></button>
        </div>
        <div className="mbdy">
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:11,color:T.textMuted }}>Invoice</div>
            <div style={{ fontWeight:700 }}>{showRecordPay.invoiceNo}</div>
            <div style={{ fontSize:12,color:T.textSub }}>{showRecordPay.client} · Balance: <strong style={{ color:T.orange }}>{fmt(showRecordPay.balanceDue)}</strong></div>
          </div>
          <div><label className="flabel">Payment Amount (₹)</label><input value={payAmt} onChange={e=>setPayAmt(e.target.value)} placeholder={showRecordPay.balanceDue} type="number"/></div>
          <div style={{ display:"flex",justifyContent:"flex-end",gap:8,marginTop:14 }}>
            <button className="btn btn-gh" onClick={()=>setShowRecordPay(null)}>Cancel</button>
            <button className="btn" style={{ background:T.green,color:"#fff",fontSize:12 }} onClick={()=>handleRecord(showRecordPay.id)}>Record ₹{parseInt(payAmt)||0}</button>
          </div>
        </div>
      </div></div>)}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Payments & Collections</h1>
          <p style={{ color:T.textSub, fontSize:12 }}>Outstanding invoices · Credit period tracking · Overdue alerts · Cash flow management</p>
        </div>
        <button className="btn btn-p" style={{ fontSize:11 }}>📤 Send All Reminders</button>
      </div>
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(4,1fr)", marginBottom:18 }}>
        {[
          { l:"Total Outstanding",  v:fmt(totalOutstanding), c:T.orange },
          { l:"Overdue Amount",     v:fmt(overdueAmt),       c:T.red    },
          { l:"Collected MTD",      v:fmt(collected),        c:T.green  },
          { l:"Overdue Invoices",   v:payments.filter(p=>p.status==="Overdue").length, c:T.red },
        ].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}>
            <div className="stat-v" style={{ color:k.c }}>{k.v}</div>
            <div className="stat-l">{k.l}</div>
          </div>
        ))}
      </div>
      {payments.filter(p=>p.status==="Overdue").length>0&&(
        <div className="card" style={{ marginBottom:14, border:`1px solid ${T.red}44`, background:T.redGlow }}>
          <div className="section-title" style={{ color:T.red }}>🚨 Overdue Payments — Immediate Follow-up Required</div>
          {payments.filter(p=>p.status==="Overdue").map(p=>(
            <div key={p.id} className="arow" style={{ borderLeftColor:T.red }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:700, color:T.red }}>{p.client}</div>
                <div style={{ fontSize:11, color:T.textSub }}>Invoice: <span className="mono">{p.invoiceNo}</span> · Due: {p.dueDate} · <strong style={{ color:T.red }}>{p.daysOverdue} days overdue</strong></div>
              </div>
              <div style={{ textAlign:"right", display:"flex", flexDirection:"column", gap:4 }}>
                <div style={{ fontWeight:700, color:T.red }}>{fmt(p.balanceDue)}</div>
                <div style={{ display:"flex", gap:6 }}>
                  <button className="btn btn-r" style={{ fontSize:10 }}>📱 Remind</button>
                  <button className="btn btn-g" style={{ fontSize:10 }} onClick={()=>setShowRecordPay(p)}>💰 Record</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="card" style={{ padding:0 }}>
        <table className="tbl">
          <thead><tr><th>Invoice</th><th>Client</th><th>Trip</th><th>Amount</th><th>Paid</th><th>Balance</th><th>Due Date</th><th>Credit</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {payments.map(p=>(
              <tr key={p.id} style={{ background:p.status==="Overdue"?T.redGlow:p.status==="Partial"?"rgba(245,158,11,.04)":"" }}>
                <td className="mono" style={{ fontSize:11, color:T.accent }}>{p.invoiceNo}</td>
                <td style={{ fontSize:11, fontWeight:600 }}>{p.client?.split(" ")[0]}</td>
                <td className="mono" style={{ fontSize:11 }}>{p.tripId}</td>
                <td style={{ fontWeight:600 }}>{fmt(p.invoiceAmt)}</td>
                <td style={{ color:T.green, fontWeight:600 }}>{fmt(p.paidAmt)}</td>
                <td style={{ color:p.balanceDue>0?T.orange:T.green, fontWeight:700 }}>{fmt(p.balanceDue)}</td>
                <td style={{ fontSize:11, color:p.status==="Overdue"?T.red:T.text }}>{p.dueDate}</td>
                <td style={{ color:T.textMuted, fontSize:11 }}>{p.creditDays}d</td>
                <td><span className={`badge ${p.status==="Paid"?"bg":p.status==="Overdue"?"br":p.status==="Partial"?"bo":"ba"}`} style={{ fontSize:10 }}>{p.status}</span></td>
                <td>
                  {p.balanceDue>0&&<button className="btn btn-g" style={{ fontSize:10, padding:"3px 8px" }} onClick={()=>setShowRecordPay(p)}>₹ Record</button>}
                  {p.balanceDue===0&&<span style={{ fontSize:10,color:T.green }}>✓</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// RETURN LOAD / BACKHAUL MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════
const BACKHAUL_LOADS = [
  { id:"BHL-001", fromCity:"Coimbatore", toCity:"Chennai",   material:"Textile Machinery Parts", qty:"8 MT",  rate:38000, postedBy:"Lakshmi Textiles",    postedAt:"2025-04-15 08:00", expiresAt:"2025-04-16 18:00", matchVehicle:"TN69 GH4789", distance:480, emptyKm:0,   margin:18000, contact:"9876500001" },
  { id:"BHL-002", fromCity:"Bangalore",  toCity:"Madurai",   material:"Auto Components",         qty:"12 MT", rate:55000, postedBy:"TVS Sundaram Motors",  postedAt:"2025-04-15 10:30", expiresAt:"2025-04-17 10:30", matchVehicle:"TN59 AB1234", distance:440, emptyKm:440, margin:27000, contact:"9876500002" },
  { id:"BHL-003", fromCity:"Hyderabad",  toCity:"Chennai",   material:"Pharmaceutical Goods",    qty:"5 MT",  rate:45000, postedBy:"Aurobindo Pharma",     postedAt:"2025-04-15 07:00", expiresAt:"2025-04-16 07:00", matchVehicle:null,           distance:620, emptyKm:0,   margin:22000, contact:"9876500003" },
  { id:"BHL-004", fromCity:"Mumbai",     toCity:"Trichy",    material:"Industrial Equipment",    qty:"20 MT", rate:92000, postedBy:"Godrej Industries",     postedAt:"2025-04-15 09:00", expiresAt:"2025-04-17 09:00", matchVehicle:null,           distance:1280,emptyKm:0,   margin:35000, contact:"9876500004" },
];

const BackhaulPage = () => {
  const totalEmptyKm = BACKHAUL_LOADS.reduce((s,l)=>s+l.emptyKm,0);
  const totalRevOpp  = BACKHAUL_LOADS.reduce((s,l)=>s+l.rate,0);
  const matchedLoads = BACKHAUL_LOADS.filter(l=>l.matchVehicle);
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Return Load / Backhaul</h1>
          <p style={{ color:T.textSub, fontSize:12 }}>Reduce empty km · Match returning vehicles · Capture revenue on return trips</p>
        </div>
        <button className="btn btn-p" style={{ fontSize:11 }}>📋 Post Available Truck</button>
      </div>
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(4,1fr)", marginBottom:18 }}>
        {[
          { l:"Available Loads",    v:BACKHAUL_LOADS.length,                  c:T.green  },
          { l:"Revenue Opportunity",v:fmt(totalRevOpp),                       c:T.accent },
          { l:"Empty KM Today",     v:totalEmptyKm>0?totalEmptyKm.toLocaleString()+" km":"Minimal", c:T.orange },
          { l:"Matched Vehicles",   v:matchedLoads.length+" loads",           c:T.blue   },
        ].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}>
            <div className="stat-v" style={{ color:k.c, fontSize:k.v.length>8?22:30 }}>{k.v}</div>
            <div className="stat-l">{k.l}</div>
          </div>
        ))}
      </div>
      <div style={{ background:T.greenGlow, border:`1px solid ${T.green}44`, borderRadius:8, padding:"10px 14px", marginBottom:14 }}>
        💡 <strong style={{ color:T.green }}>Backhaul saves ₹8–15/km</strong> <span style={{ fontSize:11,color:T.textSub }}>in diesel + driver costs on empty return trips. A 480km empty run at ₹12/km = ₹5,760 direct loss. Backhaul converts this to ₹38,000+ revenue. Vehicles returning from Coimbatore, Bangalore, and Hyderabad are prime candidates.</span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {BACKHAUL_LOADS.map(load=>(
          <div key={load.id} className="card" style={{ border:`1px solid ${load.matchVehicle?T.green:T.border}${load.matchVehicle?"44":"22"}`, background:load.matchVehicle?T.greenGlow:"" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
              <div>
                <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:4 }}>
                  <span style={{ fontSize:14 }}>📦</span>
                  <span style={{ fontSize:14, fontWeight:700 }}>{load.fromCity} → {load.toCity}</span>
                  <span style={{ fontSize:11, color:T.textMuted }}>{load.distance} km</span>
                  {load.matchVehicle&&<span className="badge bg" style={{ fontSize:10 }}>✅ Truck available: {load.matchVehicle}</span>}
                </div>
                <div style={{ fontSize:11, color:T.textSub, marginBottom:2 }}>{load.material} · {load.qty} · Posted by: <strong>{load.postedBy}</strong></div>
                <div style={{ fontSize:10, color:T.textMuted }}>Posted: {load.postedAt} · Expires: <span style={{ color:T.orange }}>{load.expiresAt}</span> · Contact: <span className="mono">{load.contact}</span></div>
              </div>
              <div style={{ textAlign:"right", minWidth:100 }}>
                <div style={{ fontSize:18, fontWeight:700, color:T.green }}>{fmt(load.rate)}</div>
                <div style={{ fontSize:11, color:T.textMuted }}>Margin: <strong style={{ color:T.accent }}>{fmt(load.margin)}</strong></div>
                <div style={{ fontSize:10, color:T.textMuted }}>₹{Math.round(load.rate/load.distance)}/km</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button className="btn btn-p" style={{ fontSize:11 }}>✅ Accept Load</button>
              <button className="btn btn-b" style={{ fontSize:11 }}>📞 Call Poster</button>
              <button className="btn btn-gh" style={{ fontSize:11 }}>Negotiate Rate</button>
              {load.matchVehicle&&<button className="btn btn-g" style={{ fontSize:11 }}>🚚 Assign {load.matchVehicle}</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ROLE-BASED ACCESS CONTROL
// ═══════════════════════════════════════════════════════════════════════════════
const ROLES = {
  OWNER:      { label:"Owner",        icon:"👑", color:"#F59E0B", permissions:"Full access — all modules, financial data, user management, settings, payroll, delete records",   perms:["All Trips","Fleet","Finance","Compliance","RBAC","Settings","All Reports","Delete Records"] },
  MANAGER:    { label:"Manager",      icon:"🎯", color:"#3B82F6", permissions:"All operations modules — trips, fleet, drivers, maintenance, compliance. No payroll or user settings", perms:["All Trips","Fleet","Drivers","Maintenance","Compliance","Basic Reports"] },
  DISPATCHER: { label:"Dispatcher",   icon:"📡", color:"#10B981", permissions:"Trip booking and dispatch only. Assign drivers and vehicles. View-only for financials",             perms:["Create Trips","Dispatch","Driver Assign","Vehicle Assign","View Payments"] },
  DRIVER:     { label:"Driver",       icon:"🚛", color:"#8B5CF6", permissions:"My trips, pre/post inspection, POD upload, expense entry only. No access to other drivers' data",   perms:["My Trips","Pre-Trip Inspect","Post-Trip Inspect","POD Upload","Enter Expenses"] },
  ACCOUNTANT: { label:"Accountant",   icon:"💼", color:"#06B6D4", permissions:"Finance, invoices, payments, P&L — full financial module. No operations data or fleet settings",    perms:["Payments","Invoices","Finance P&L","Driver Settlement","Cost Reports"] },
  FLEET_MGR:  { label:"Fleet Mgr",    icon:"🔧", color:"#F97316", permissions:"Fleet, maintenance, fuel, tyre management, PM settings, spare parts — no financial access",          perms:["Fleet Register","Maintenance","Fuel","Tyres","PM Settings","Spare Parts"] },
};

const TEAM_MEMBERS = [
  { id:"USR-001", name:"Rajan Kumar",   role:"OWNER",      email:"rajan@tranzoop.in",   mobile:"9876543210", lastLogin:"2 hrs ago",   status:"Active"   },
  { id:"USR-002", name:"Priya S",       role:"MANAGER",    email:"priya@tranzoop.in",   mobile:"9876543211", lastLogin:"1 hr ago",    status:"Active"   },
  { id:"USR-003", name:"Suresh P",      role:"DISPATCHER", email:"suresh@tranzoop.in",  mobile:"9876543212", lastLogin:"30 min ago",  status:"Active"   },
  { id:"USR-004", name:"Mani Kumar",    role:"DRIVER",     email:"mani@tranzoop.in",    mobile:"9876543001", lastLogin:"5 min ago",   status:"Active"   },
  { id:"USR-005", name:"Anbu Accounts", role:"ACCOUNTANT", email:"anbu@tranzoop.in",    mobile:"9876543213", lastLogin:"Yesterday",   status:"Active"   },
  { id:"USR-006", name:"Kumar Fleet",   role:"FLEET_MGR",  email:"kumar@tranzoop.in",   mobile:"9876543214", lastLogin:"3 days ago",  status:"Inactive" },
];

const RBACPage = () => {
  const [expandedRole, setExpandedRole] = useState(null);
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Team & Access Control</h1>
          <p style={{ color:T.textSub, fontSize:12 }}>6 role definitions · Permission scopes · {TEAM_MEMBERS.filter(m=>m.status==="Active").length} active users</p>
        </div>
        <button className="btn btn-p" style={{ fontSize:11 }}>+ Invite Member</button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:20 }}>
        {Object.entries(ROLES).map(([id,role])=>{
          const members=TEAM_MEMBERS.filter(m=>m.role===id);
          const isExp=expandedRole===id;
          return(
            <div key={id} className="card" style={{ border:`1px solid ${role.color}33`, padding:0, overflow:"hidden" }}>
              <div style={{ padding:"14px 16px", cursor:"pointer" }} onClick={()=>setExpandedRole(isExp?null:id)}>
                <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:8 }}>
                  <span style={{ fontSize:20 }}>{role.icon}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:role.color }}>{role.label}</div>
                    <div style={{ fontSize:10, color:T.textMuted }}>{members.length} user{members.length!==1?"s":""} · {members.filter(m=>m.status==="Active").length} active</div>
                  </div>
                  <span style={{ fontSize:12, color:T.textMuted }}>{isExp?"▲":"▼"}</span>
                </div>
                <div style={{ fontSize:11, color:T.textSub, lineHeight:1.5 }}>{role.permissions}</div>
              </div>
              {isExp&&(
                <div style={{ borderTop:`1px solid ${role.color}22`, padding:"12px 16px", background:role.color+"08" }}>
                  <div style={{ fontSize:10, color:T.textMuted, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", marginBottom:8 }}>Module Access</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:10 }}>
                    {role.perms.map(p=>(
                      <span key={p} style={{ fontSize:10, padding:"3px 8px", borderRadius:6, background:role.color+"22", color:role.color, border:`1px solid ${role.color}33` }}>{p}</span>
                    ))}
                  </div>
                  {members.length>0&&(
                    <div>
                      <div style={{ fontSize:10, color:T.textMuted, fontWeight:700, textTransform:"uppercase", letterSpacing:".07em", marginBottom:6 }}>Users with this role</div>
                      {members.map(m=>(
                        <div key={m.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"4px 0", borderBottom:`1px solid ${T.border}22`, fontSize:11 }}>
                          <span style={{ fontWeight:600 }}>{m.name}</span>
                          <span className={`badge ${m.status==="Active"?"bg":"br"}`} style={{ fontSize:9 }}>{m.status}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="card" style={{ padding:0 }}>
        <div style={{ padding:"12px 16px", borderBottom:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ fontSize:12, fontWeight:700 }}>Team Members</div>
          <span style={{ fontSize:11, color:T.textMuted }}>{TEAM_MEMBERS.filter(m=>m.status==="Active").length} active · {TEAM_MEMBERS.filter(m=>m.status==="Inactive").length} inactive</span>
        </div>
        <table className="tbl">
          <thead><tr><th>Name</th><th>Role</th><th>Email</th><th>Mobile</th><th>Last Login</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {TEAM_MEMBERS.map(m=>{
              const role=ROLES[m.role];
              return(
                <tr key={m.id}>
                  <td>
                    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                      <div style={{ width:30,height:30,borderRadius:"50%",background:role?.color+"22",border:`1px solid ${role?.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:role?.color }}>{m.name[0]}</div>
                      <span style={{ fontWeight:600,fontSize:12 }}>{m.name}</span>
                    </div>
                  </td>
                  <td><span className="badge" style={{ background:role?.color+"22",color:role?.color,fontSize:10 }}>{role?.icon} {role?.label}</span></td>
                  <td style={{ fontSize:11 }}>{m.email}</td>
                  <td className="mono" style={{ fontSize:11 }}>{m.mobile}</td>
                  <td style={{ fontSize:11,color:T.textMuted }}>{m.lastLogin}</td>
                  <td><span className={`badge ${m.status==="Active"?"bg":"br"}`} style={{ fontSize:10 }}>{m.status}</span></td>
                  <td style={{ display:"flex",gap:4 }}>
                    <button className="btn btn-gh" style={{ fontSize:10,padding:"3px 8px" }}>Edit</button>
                    <button className="btn" style={{ fontSize:10,padding:"3px 8px",background:T.red+"18",color:T.red,border:`1px solid ${T.red}33` }}>Revoke</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// CUSTOMER PORTAL PAGE (B2B)
// ═══════════════════════════════════════════════════════════════════════════════

const CustomerPortalPage = () => {
  const [selClient, setSelClient] = useState("Ramco Cements Ltd");
  const clientTrips = TRIPS_DATA.filter(t=>t.customer===selClient||t.customer?.includes(selClient.split(" ")[0]));
  const clientPayments = PAYMENT_RECORDS.filter(p=>p.client?.includes(selClient.split(" ")[0]));

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Customer Portal</h1>
          <p style={{ color:T.textSub, fontSize:12 }}>Client self-service — Track shipments · Download POD · View invoices · Payment status</p>
        </div>
        <select value={selClient} onChange={e=>setSelClient(e.target.value)} style={{ width:220, fontSize:12 }}>
          {["Ramco Cements Ltd","Godrej Industries","Pepsico India","TVS Motors"].map(c=><option key={c}>{c}</option>)}
        </select>
      </div>
      <div style={{ background:`linear-gradient(135deg,${T.navy||"#0F2457"}22,${T.blue}14)`, border:`1px solid ${T.blue}33`, borderRadius:12, padding:18, marginBottom:18 }}>
        <div style={{ fontSize:14, fontWeight:700, color:T.blue, marginBottom:4 }}>🏢 {selClient}</div>
        <div style={{ display:"flex", gap:20, fontSize:11, color:T.textSub }}>
          <span>Active Trips: <strong style={{ color:T.text }}>{clientTrips.filter(t=>t.status==="In Transit").length}</strong></span>
          <span>Pending Invoices: <strong style={{ color:T.orange }}>{fmt(clientPayments.reduce((s,p)=>s+p.balanceDue,0))}</strong></span>
          <span>Total PODs: <strong style={{ color:T.text }}>{POD_DATA_INIT.filter(p=>p.consignor?.includes(selClient.split(" ")[0])||p.consignee?.includes(selClient.split(" ")[0])).length}</strong></span>
        </div>
      </div>
      <div className="grd2">
        <div className="card">
          <div className="section-title">Live Shipment Tracker</div>
          {clientTrips.length ? clientTrips.map(t=>(
            <div key={t.id} style={{ padding:"10px 0", borderBottom:`1px solid ${T.border}22` }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span className="mono" style={{ fontSize:11, color:T.accent }}>{t.id}</span>
                <span className={`badge ${t.status==="In Transit"?"bb":t.status==="Closed"?"bg":"ba"}`} style={{ fontSize:10 }}>{t.status}</span>
              </div>
              <div style={{ fontSize:11, color:T.textSub }}>{t.route}</div>
              <div style={{ fontSize:11, color:T.textMuted }}>Vehicle: {t.vehicle||"—"} · Driver: {t.driver}</div>
            </div>
          )) : <div style={{ color:T.textMuted, fontSize:12 }}>No active trips for this client</div>}
        </div>
        <div className="card">
          <div className="section-title">Invoice & Payment Status</div>
          {clientPayments.length ? clientPayments.map(p=>(
            <div key={p.id} style={{ padding:"10px 0", borderBottom:`1px solid ${T.border}22` }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span className="mono" style={{ fontSize:11, color:T.accent }}>{p.invoiceNo}</span>
                <span className={`badge ${p.status==="Paid"?"bg":p.status==="Overdue"?"br":"bo"}`} style={{ fontSize:10 }}>{p.status}</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:11 }}>
                <span>Invoice: {fmt(p.invoiceAmt)}</span>
                <span style={{ color:p.balanceDue>0?T.orange:T.green }}>Balance: {fmt(p.balanceDue)}</span>
              </div>
              <div style={{ fontSize:10, color:T.textMuted }}>Due: {p.dueDate} · Credit: {p.creditDays} days</div>
              <div style={{ display:"flex", gap:6, marginTop:6 }}>
                <button className="btn btn-g" style={{ fontSize:10, padding:"3px 8px" }}>📄 Download PDF</button>
                <button className="btn btn-b" style={{ fontSize:10, padding:"3px 8px" }}>📱 WhatsApp</button>
              </div>
            </div>
          )) : <div style={{ color:T.textMuted, fontSize:12 }}>No invoices for this client</div>}
        </div>
      </div>
    </div>
  );
};


const NAV = [
  { id:"dash",      l:"Control Tower",        i:"dash",    section:"Command"      },
  { id:"tracking",  l:"Live GPS Tracking",    i:"map",     section:"Command"      },
  { id:"trips",     l:"All Trips",            i:"trips",   section:"Operations"   },
  { id:"contracts", l:"Fleet Contracts",      i:"doc",     badge:3, section:"Operations" },
  { id:"pod",       l:"Proof of Delivery",    i:"doc",     badge:2, section:"Operations" },
  { id:"backhaul",  l:"Return Loads",         i:"trips",   badge:2, section:"Operations" },
  { id:"pretrip",   l:"Pre-Trip Inspection",  i:"pretrip", badge:3, section:"Operations" },
  { id:"posttrip",  l:"Post-Trip Inspection", i:"posttrip",badge:2, section:"Operations" },
  { id:"breakdown", l:"Breakdown & Recovery", i:"alert",   badge:2, section:"Operations" },
  { id:"settlement",l:"Driver Settlement",    i:"wallet",  badge:2, section:"Operations" },
  { id:"agents",    l:"Agents & Commission",  i:"agent",           section:"Operations" },
  { id:"vendors",   l:"Vendor Fleet",         i:"vendor",          section:"Operations" },
  { id:"fleet",     l:"Vehicle Master",       i:"fleet",           section:"Fleet"      },
  { id:"heavy",     l:"Heavy Equipment",      i:"wrench",  badge:2, section:"Fleet"      },
  { id:"busops",    l:"Bus Operations",       i:"bus",     badge:3, section:"Fleet"      },
  { id:"tyre",      l:"Tyre Intelligence",    i:"tyre",    badge:2, section:"Fleet"      },
  { id:"drivers",   l:"Drivers",              i:"driver",          section:"Fleet"      },
  { id:"fuel",      l:"Fuel Control",         i:"fuel",    badge:2, section:"Fleet"      },
  { id:"workshop",  l:"Workshop & WOs",       i:"wrench",  badge:2, section:"Maintenance"},
  { id:"pmsettings",l:"PM Settings",          i:"wrench",          section:"Maintenance"},
  { id:"parts",     l:"Spare Parts",          i:"parts",           section:"Maintenance"},
  { id:"eqbilling", l:"Equipment Billing",    i:"finance", badge:1, section:"Billing"    },
  { id:"payments",  l:"Payments & Collections",i:"wallet",badge:2, section:"Billing"    },
  { id:"compliance",l:"Compliance & Legal",   i:"doc",     badge:3, section:"Compliance" },
  { id:"customer",  l:"Customer Portal",      i:"agent",           section:"Compliance" },
  { id:"team",      l:"Team & Access",        i:"driver",          section:"Settings"   },
  { id:"ai",        l:"AI Predictions",       i:"brain",           section:"Intelligence"},
  { id:"profitability",l:"Profitability",     i:"chart",           section:"Intelligence"},
  { id:"finance",   l:"Finance & P&L",        i:"finance",         section:"Finance"    },
];

const sections = [...new Set(NAV.map(n => n.section))];

export default function Demo1() {
  const [page, setPage]       = useState("dash");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    T = darkMode ? THEMES.dark : THEMES.light;
  }, [darkMode]);

  const t = darkMode ? THEMES.dark : THEMES.light;
  T = t;

  const pages = {
    dash: <Dashboard setPage={setPage} />,
    tracking: <LiveTrackingPage />,
    trips: <TripsPage />,
    contracts: <FleetContractsPage />,
    pod: <PODPage />,
    backhaul: <BackhaulPage />,
    pretrip: <PreTripPage />,
    posttrip: <PostTripPage />,
    breakdown: <BreakdownPage />,
    settlement: <DriverSettlementPage />,
    agents: <AgentPage />,
    vendors: <VendorPage />,
    fleet: <VehicleMasterPage />,
    heavy: <HeavyEquipmentPage />,
    busops: <BusOperationsPage />,
    tyre: <TyreManagementPage />,
    drivers: <DriversPage />,
    fuel: <FuelControlPage />,
    workshop: <WorkshopPage />,
    pmsettings: <PMSettingsPage />,
    parts: <SparePartsPage />,
    eqbilling: <EquipmentBillingPage />,
    payments: <PaymentsPage />,
    compliance: <CompliancePage />,
    customer: <CustomerPortalPage />,
    team: <RBACPage />,
    ai: <AIPredictionPage />,
    profitability: <ProfitabilityPage />,
    finance: <FinancePage />,
  };

  return (
    <>
      <style>{buildCSS(t)}</style>
      <div className="app">
        {/* Sidebar */}
        <div className="sidebar">
          {/* Logo */}
          <div style={{ padding:"16px 16px 12px", borderBottom:`1px solid #122040`, flexShrink:0 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                <div className="rj" style={{ fontSize:22, fontWeight:700, letterSpacing:3, color:t.accent }}>TRANZOOP</div>
                <div style={{ fontSize:9, color:"#3D5A7A", letterSpacing:".12em", marginTop:1 }}>FLEET OS v16 · Navy Blue Edition</div>
              </div>
              {/* Dark/Light toggle */}
              <button
                onClick={()=>setDarkMode(d=>!d)}
                style={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.12)", borderRadius:8, padding:"5px 8px", cursor:"pointer", fontSize:14, color:"#8BA8C8", flexShrink:0 }}
                title={darkMode?"Switch to Light Mode":"Switch to Dark Mode"}
              >
                {darkMode?"☀️":"🌙"}
              </button>
            </div>
          </div>
          {/* Nav */}
          <nav style={{ flex:1, padding:"8px 0", overflowY:"auto" }}>
            {sections.map(sec => (
              <div key={sec}>
                <div className="nav-section">{sec}</div>
                {NAV.filter(n => n.section===sec).map(n => (
                  <div key={n.id} className={`nav-item ${page===n.id?"active":""}`} onClick={() => setPage(n.id)}>
                    <Ic n={n.i} s={14} />
                    {n.l}
                    {n.badge && <span className="nav-badge">{n.badge}</span>}
                  </div>
                ))}
              </div>
            ))}
          </nav>
          {/* User profile */}
          <div style={{ padding:"10px 14px", borderTop:`1px solid #122040`, flexShrink:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:30, height:30, borderRadius:"50%", background:`linear-gradient(135deg,${t.navy},${t.navyLight})`, border:`1px solid ${t.navyLight}55`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span className="rj" style={{ fontSize:12, color:"#fff", fontWeight:700 }}>S</span>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:12, fontWeight:600, color:"#C8D8F0" }}>Super Admin</div>
                <div style={{ fontSize:10, color:"#3D5A7A" }}>owner@tranzoop.in</div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                <div style={{ width:4, height:4, borderRadius:"50%", background:t.green }} />
                <div style={{ width:4, height:4, borderRadius:"50%", background:t.green }} />
                <div style={{ width:4, height:4, borderRadius:"50%", background:t.green }} />
              </div>
            </div>
          </div>
        </div>
        {/* Main */}
        <div className="main">
          <div className="pad">{pages[page] || <Dashboard setPage={setPage} />}</div>
        </div>
      </div>
    </>
  );
}