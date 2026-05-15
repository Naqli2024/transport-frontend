import { useState, useRef, useEffect } from "react";

// ── Theme aligned with Tranzoop v10 ─────────────────────────────────────────
const T = {
  bg:"#080B10", bgCard:"#0D1117", bgPanel:"#111520", bgDeep:"#070A0F",
  border:"#1A2133", borderHi:"#222D42",
  accent:"#F59E0B", accentGlow:"#F59E0B18",
  blue:"#3B82F6", blueGlow:"#3B82F618",
  green:"#10B981", greenGlow:"#10B98118",
  red:"#EF4444", redGlow:"#EF444418",
  orange:"#F97316", orangeGlow:"#F9731618",
  purple:"#8B5CF6", purpleGlow:"#8B5CF618",
  cyan:"#06B6D4", cyanGlow:"#06B6D418",
  text:"#F1F5F9", textSub:"#94A3B8", textMuted:"#3D4F6A",
};

// ── Capability cards shown in welcome screen ──────────────────────────────────
const CAPABILITIES = [
  { icon:"🚛", title:"Fleet Queries", examples:["Which vehicles need service soon?","Show me TN69 GH4789 status","What's our fleet health score?"] },
  { icon:"📊", title:"Business Insights", examples:["Which vehicle is most profitable?","What's our fuel cost this month?","Show me breakdown cost analysis"] },
  { icon:"🛞", title:"Tyre & Maintenance", examples:["Which tyres are critical?","When is the next PM due for the JCB?","Log a work order for engine oil change"] },
  { icon:"👤", title:"Driver Operations", examples:["Who is available to drive today?","Assign Mani Kumar to trip TRP-045","What's Selvam R's advance balance?"] },
  { icon:"📋", title:"Trip Management", examples:["Create a new trip to Bangalore","What trips are pending today?","Show me all trips for April 2025"] },
  { icon:"🏗️", title:"Heavy Equipment", examples:["Log 9 hours for JCB EQ-001 today","Which equipment is on site?","What's the billing rate for the excavator?"] },
];

// ── Quick-action prompts ──────────────────────────────────────────────────────
const QUICK_ACTIONS = [
  { label:"Fleet Status", prompt:"Give me a complete fleet status summary — which vehicles are active, on trip, in maintenance, and what needs urgent attention today." },
  { label:"Critical Alerts", prompt:"Show me all critical alerts across the system — tyres, maintenance due, license expiry, compliance issues, and AI predictions." },
  { label:"Today's Operations", prompt:"What's happening today? Summarize active trips, deployed equipment, pending work orders, and any breakdowns." },
  { label:"Revenue Report", prompt:"Give me this month's revenue and cost summary — by vehicle, including fuel, maintenance, driver advances, and net profit." },
  { label:"Add New Trip", prompt:"I want to create a new trip. Guide me through the steps — what information do I need to enter?" },
  { label:"Fuel Analysis", prompt:"Analyze our fuel consumption. Are there any suspicious entries or vehicles with below-expected efficiency?" },
];

// ── System prompt — the brain of the copilot ─────────────────────────────────
const SYSTEM_PROMPT = `You are TARA (Tranzoop AI Resource Assistant) — the conversational AI copilot built into the Tranzoop Fleet Business Operating System. You help fleet owners, transport managers, and operators run their entire transport business through natural conversation.

## WHO YOU SERVE
Indian truck fleet owners and transport businesses. They operate heavy trucks (6–18 wheelers), trailers, containers, LCVs, and heavy equipment (JCB, excavators, cranes). Many are small-to-medium fleet owners who may not be tech-savvy. Your job is to make complex fleet operations simple through plain conversation.

## TRANZOOP MODULE KNOWLEDGE

### Fleet Data (seed data you know)
Vehicles: TN69 GH4789 (Tata LPT 2518, health 72%, On Trip), TN59 AB1234 (Ashok Leyland, health 88%, Available), TN45 CD5678 (Tata, health 45%, Maintenance — critical), TN38 EF9012 (BharatBenz, health 91%), TN71 GH3456 (health 78%), TN22 IJ7890 (LCV, health 95%)

Drivers: Mani Kumar (score 87, Available, advance ₹2,400), Selvam R (score 74, On Trip), Ramesh P (score 62, Available, high-risk driver — harsh braking), Arjun D (score 79), Karthik M (score 83), Vinoth S (score 68, license expiring soon)

Heavy Equipment: EQ-001 JCB 3DX (4,286 hrs, On Site — Madurai Bypass, ₹900/hr), EQ-002 JCB NXT 215 Excavator (2,841 hrs, Available), EQ-003 JCB VM115 Roller (6,120 hrs, On Site — Chennai Port Road), EQ-004 SANY STC500T Crane (1,204 hrs, On Site — Trichy), EQ-005 JCB 30Plus Mini Excavator (890 hrs, Maintenance), EQ-006 JCB 140G Grader (3,340 hrs, Available)

Active Work Orders: WO-001 (TN45 CD5678, engine overheating, ₹8,500), WO-002 (TN59 AB1234, alternator, ₹11,000), WO-004 (TN45 CD5678, DUPLICATE FLAG — repeat radiator issue)

Tyre Alerts: TYR-X01 on TN69 GH4789 RL1 — CRITICAL (420 km left, tread 2.1mm, replace immediately); TYR-002 FR — Warning (1,800 km left); TYR-B03 on TN59 AB1234 RL1 — Warning (2,200 km left)

AI Predictions: Clutch failure predicted on TN45 CD5678 in ~8 days; Brake maintenance due on TN71 GH3456 in 1,200 km

Active Breakdowns: BRK-001 (TN45 CD5678, engine overheating, Nagpur, Recovery in Progress); BRK-002 (TN59 AB1234, tyre burst, On-Site Fix)

## HOW YOU RESPOND

### Tone & Style
- Plain, direct Indian business English. No corporate fluff.
- Use ₹ for currency, km for distance, hrs for hours.
- Keep responses focused. Don't dump entire databases — give the key answer, then offer to dig deeper.
- Use emojis sparingly for status: 🚨 critical, ⚠️ warning, ✅ good, 🔧 maintenance, 🚛 vehicle, 👤 driver, ⏱ hours.

### When Users Ask for Data
Give structured, scannable answers. Use short bullet points or tables when listing multiple items.

### When Users Want to DO Something
Walk them through steps clearly. For anything complex (adding a vehicle, creating a trip), explain the wizard steps and what information they need ready.

### Action Responses
Format: ACTION NEEDED → what the user should do in the app.
Example: "ACTION NEEDED → Go to Tyre Intelligence tab → Axle View → click TYR-X01 on RL1 position → click Replace Now."

### Smart Suggestions
After answering, suggest the next logical action. Fleet owners often don't know what they don't know.

### Data Entry Guidance
When users want to add/create something, guide them:
"To add a new driver, click Drivers in the sidebar → Add Driver button. You'll need: full name, mobile number (OTP verification required), driving license number and expiry, Aadhaar number, and license class (HMV for trucks). The system will auto-calculate a risk score."

## BUSINESS INTELLIGENCE
You can calculate and explain:
- Cost per KM = Total vehicle cost ÷ KM run
- Break-even hours for equipment = Purchase cost ÷ (Rate × 0.4 utilization)
- Tyre cost per KM = Tyre purchase price ÷ KM run
- Driver advance outstanding analysis
- Preventive vs corrective maintenance cost comparison (preventive = 3-9x cheaper than breakdown repair)
- Monthly minimum billing enforcement for equipment

## CRITICAL ALERTS YOU ALWAYS SURFACE
If the user's query touches these areas, always mention:
1. TN45 CD5678 is in critical maintenance — avoid trips
2. TYR-X01 on TN69 GH4789 must be replaced before next trip — burst risk
3. WO-004 is a duplicate issue flag on TN45 — root cause investigation needed
4. Vinoth S's driving license is expiring soon — renewal required

## WHAT YOU CANNOT DO
- You cannot directly modify data (you're a conversation layer, not a database write API)
- You cannot access real GPS locations (simulated in this demo)
- You cannot make payments or financial transactions
Always be honest about this: "I can guide you to do this in the app, but I can't make changes directly."

## LANGUAGE
If a user writes in Tamil or Hindi, respond in the same language while using English for technical terms like vehicle numbers, work order IDs, etc.

Start every new conversation warmly and immediately useful. You are TARA — confident, knowledgeable, and built specifically for Indian truck fleet operations.`;

// ── Markdown-like renderer (minimal, no library needed) ───────────────────────
function renderContent(text) {
  const lines = text.split("\n");
  const els = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("### ")) {
      els.push(<div key={i} style={{ fontSize:12, fontWeight:700, color:T.cyan, textTransform:"uppercase", letterSpacing:".08em", marginTop:10, marginBottom:4 }}>{line.slice(4)}</div>);
    } else if (line.startsWith("## ")) {
      els.push(<div key={i} style={{ fontSize:14, fontWeight:700, color:T.accent, marginTop:10, marginBottom:4 }}>{line.slice(3)}</div>);
    } else if (line.startsWith("**ACTION NEEDED**") || line.startsWith("ACTION NEEDED")) {
      els.push(<div key={i} style={{ background:T.accentGlow, border:`1px solid ${T.accent}44`, borderRadius:8, padding:"8px 12px", marginTop:8, marginBottom:4, fontSize:12 }}><span style={{ color:T.accent, fontWeight:700 }}>⚡ ACTION NEEDED </span><span style={{ color:T.text }}>{line.replace("ACTION NEEDED →","").replace("**ACTION NEEDED**","").replace("ACTION NEEDED","").trim()}</span></div>);
    } else if (line.match(/^[•\-\*] /)) {
      els.push(<div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", padding:"2px 0", fontSize:12, color:T.text }}><span style={{ color:T.textMuted, flexShrink:0, marginTop:2 }}>•</span><span>{renderInline(line.slice(2))}</span></div>);
    } else if (line.match(/^\d+\. /)) {
      els.push(<div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", padding:"2px 0", fontSize:12, color:T.text }}><span style={{ color:T.textMuted, flexShrink:0, minWidth:16 }}>{line.match(/^\d+/)?.[0]}.</span><span>{renderInline(line.replace(/^\d+\. /,""))}</span></div>);
    } else if (line.trim() === "") {
      els.push(<div key={i} style={{ height:6 }} />);
    } else {
      els.push(<div key={i} style={{ fontSize:12, color:T.text, lineHeight:1.6 }}>{renderInline(line)}</div>);
    }
    i++;
  }
  return els;
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|🚨|⚠️|✅|🔧|🚛|👤|⏱)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) return <strong key={i} style={{ color:T.accent, fontWeight:700 }}>{p.slice(2,-2)}</strong>;
    if (p.startsWith("`") && p.endsWith("`")) return <code key={i} style={{ background:T.bgPanel, color:T.cyan, padding:"1px 5px", borderRadius:4, fontFamily:"'JetBrains Mono',monospace", fontSize:11 }}>{p.slice(1,-1)}</code>;
    return <span key={i}>{p}</span>;
  });
}

// ── Typing indicator ──────────────────────────────────────────────────────────
const TypingDots = () => (
  <div style={{ display:"flex", gap:4, alignItems:"center", padding:"4px 0" }}>
    {[0,1,2].map(i => (
      <div key={i} style={{ width:6, height:6, borderRadius:"50%", background:T.accent, opacity:.6,
        animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite` }} />
    ))}
    <style>{`@keyframes bounce { 0%,80%,100%{transform:scale(0.8);opacity:.4} 40%{transform:scale(1.2);opacity:1} }`}</style>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
export default function AI () {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [streamText, setStreamText] = useState("");
  const [error, setError] = useState(null);
  const [expandedCap, setExpandedCap] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [messages, streamText, loading]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput("");
    setShowWelcome(false);
    setError(null);

    const newMessages = [...messages, { role:"user", content:msg }];
    setMessages(newMessages);
    setLoading(true);
    setStreamText("");

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map(m => ({ role:m.role, content:m.content })),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(()=>({}));
        throw new Error(err.error?.message || `API error ${res.status}`);
      }

      const data = await res.json();
      const reply = data.content?.map(b => b.type==="text" ? b.text : "").join("") || "Sorry, I didn't get a response.";

      setMessages(prev => [...prev, { role:"assistant", content:reply }]);
      setStreamText("");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100vh", background:T.bg, fontFamily:"'DM Sans',sans-serif", color:T.text, overflow:"hidden" }}>
      {/* Header */}
      <div style={{ background:T.bgCard, borderBottom:`1px solid ${T.border}`, padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:36, height:36, borderRadius:"50%", background:`linear-gradient(135deg,${T.accent},${T.orange})`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span style={{ fontSize:18 }}>🚛</span>
          </div>
          <div>
            <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:18, fontWeight:700, color:T.accent, letterSpacing:1 }}>TARA</div>
            <div style={{ fontSize:10, color:T.textMuted, letterSpacing:".08em", textTransform:"uppercase" }}>Tranzoop AI Resource Assistant</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:T.green, animation:"pulse 2s ease-in-out infinite" }} />
          <span style={{ fontSize:11, color:T.green }}>Online</span>
          {messages.length > 0 && (
            <button onClick={()=>{ setMessages([]); setShowWelcome(true); setError(null); }} style={{ marginLeft:8, background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:7, padding:"4px 10px", fontSize:11, color:T.textMuted, cursor:"pointer" }}>New Chat</button>
          )}
        </div>
      </div>

      {/* Messages area */}
      <div style={{ flex:1, overflowY:"auto", padding:"20px 20px 12px" }}>

        {/* Welcome screen */}
        {showWelcome && (
          <div>
            {/* Hero */}
            <div style={{ textAlign:"center", padding:"20px 0 28px" }}>
              <div style={{ width:64, height:64, borderRadius:"50%", background:`linear-gradient(135deg,${T.accent}33,${T.orange}22)`, border:`2px solid ${T.accent}44`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px", fontSize:32 }}>🚛</div>
              <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:26, fontWeight:700, color:T.accent, letterSpacing:1, marginBottom:6 }}>Good day — I'm TARA</div>
              <div style={{ fontSize:13, color:T.textSub, maxWidth:480, margin:"0 auto", lineHeight:1.6 }}>Your AI copilot for the entire Tranzoop fleet OS. Ask me anything about your trucks, drivers, tyres, equipment, trips, or finances — in plain language.</div>
            </div>

            {/* Quick Actions */}
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:10, color:T.textMuted, textTransform:"uppercase", letterSpacing:".1em", marginBottom:8 }}>Quick Actions</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                {QUICK_ACTIONS.map(a => (
                  <button key={a.label} onClick={()=>sendMessage(a.prompt)} style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:20, padding:"6px 14px", fontSize:12, color:T.textSub, cursor:"pointer", transition:"all .12s" }}
                    onMouseOver={e=>{ e.currentTarget.style.borderColor=T.accent; e.currentTarget.style.color=T.accent; }}
                    onMouseOut={e=>{ e.currentTarget.style.borderColor=T.border; e.currentTarget.style.color=T.textSub; }}>
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Capability grid */}
            <div style={{ fontSize:10, color:T.textMuted, textTransform:"uppercase", letterSpacing:".1em", marginBottom:8 }}>What I can help with</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:24 }}>
              {CAPABILITIES.map((cap, ci) => (
                <div key={ci} onClick={()=>setExpandedCap(expandedCap===ci?null:ci)} style={{ background:T.bgCard, border:`1px solid ${expandedCap===ci?T.accent:T.border}`, borderRadius:10, padding:"11px 13px", cursor:"pointer", transition:"all .12s" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:expandedCap===ci?8:0 }}>
                    <div style={{ display:"flex", gap:7, alignItems:"center" }}>
                      <span style={{ fontSize:16 }}>{cap.icon}</span>
                      <span style={{ fontSize:12, fontWeight:600, color:expandedCap===ci?T.accent:T.text }}>{cap.title}</span>
                    </div>
                    <span style={{ fontSize:10, color:T.textMuted }}>{expandedCap===ci?"▲":"▼"}</span>
                  </div>
                  {expandedCap===ci && (
                    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                      {cap.examples.map((ex,ei) => (
                        <div key={ei} onClick={e=>{ e.stopPropagation(); sendMessage(ex); }} style={{ background:T.bgPanel, borderRadius:7, padding:"5px 9px", fontSize:11, color:T.textSub, cursor:"pointer", transition:"all .12s" }}
                          onMouseOver={e=>{ e.currentTarget.style.color=T.accent; e.currentTarget.style.borderColor=T.accent; }}
                          onMouseOut={e=>{ e.currentTarget.style.color=T.textSub; }}>
                          ↗ {ex}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tip */}
            <div style={{ background:T.blueGlow, border:`1px solid ${T.blue}33`, borderRadius:8, padding:"9px 12px", fontSize:11, color:T.textSub, display:"flex", gap:8, alignItems:"flex-start" }}>
              <span style={{ color:T.blue, fontSize:14, flexShrink:0 }}>💡</span>
              <span>You can type in plain language: <strong style={{ color:T.blue }}>"Show me all critical issues"</strong> or <strong style={{ color:T.blue }}>"I need to add a new truck"</strong> or <strong style={{ color:T.blue }}>"Log 8 hours for the JCB on Madurai site today"</strong></span>
            </div>
          </div>
        )}

        {/* Chat messages */}
        {messages.map((msg, i) => (
          <div key={i} style={{ display:"flex", gap:10, marginBottom:16, alignItems:"flex-start", flexDirection:msg.role==="user"?"row-reverse":"row" }}>
            {/* Avatar */}
            <div style={{ width:30, height:30, borderRadius:"50%", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, background:msg.role==="user"?T.accentGlow:T.bgPanel, border:`1px solid ${msg.role==="user"?T.accent:T.border}` }}>
              {msg.role==="user" ? "👤" : "🚛"}
            </div>
            {/* Bubble */}
            <div style={{ maxWidth:"78%", background:msg.role==="user"?T.accentGlow:T.bgCard, border:`1px solid ${msg.role==="user"?T.accent+"44":T.border}`, borderRadius:msg.role==="user"?"12px 2px 12px 12px":"2px 12px 12px 12px", padding:"10px 13px" }}>
              {msg.role==="user" ? (
                <div style={{ fontSize:12, color:T.text, lineHeight:1.6 }}>{msg.content}</div>
              ) : (
                <div>{renderContent(msg.content)}</div>
              )}
            </div>
          </div>
        ))}

        {/* Streaming / loading */}
        {loading && (
          <div style={{ display:"flex", gap:10, marginBottom:16, alignItems:"flex-start" }}>
            <div style={{ width:30, height:30, borderRadius:"50%", background:T.bgPanel, border:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, flexShrink:0 }}>🚛</div>
            <div style={{ background:T.bgCard, border:`1px solid ${T.border}`, borderRadius:"2px 12px 12px 12px", padding:"10px 13px", minWidth:60 }}>
              {streamText ? <div>{renderContent(streamText)}</div> : <TypingDots />}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ background:T.redGlow, border:`1px solid ${T.red}44`, borderRadius:8, padding:"10px 14px", fontSize:12, color:T.red, marginBottom:16, display:"flex", gap:8, alignItems:"flex-start" }}>
            <span>⚠️</span>
            <div>
              <div style={{ fontWeight:700, marginBottom:2 }}>Error reaching TARA</div>
              <div style={{ color:T.textSub }}>{error}</div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div style={{ borderTop:`1px solid ${T.border}`, background:T.bgCard, padding:"12px 20px 16px", flexShrink:0 }}>
        {/* Suggested follow-ups after messages */}
        {messages.length > 0 && !loading && (
          <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:10 }}>
            {[
              "What should I prioritize today?",
              "Show critical alerts",
              "Which vehicle needs attention?",
              "Help me with a work order",
            ].map(s => (
              <button key={s} onClick={()=>sendMessage(s)} style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:16, padding:"4px 11px", fontSize:11, color:T.textMuted, cursor:"pointer" }}
                onMouseOver={e=>{ e.currentTarget.style.color=T.accent; e.currentTarget.style.borderColor=T.accent+"66"; }}
                onMouseOut={e=>{ e.currentTarget.style.color=T.textMuted; e.currentTarget.style.borderColor=T.border; }}>
                {s}
              </button>
            ))}
          </div>
        )}

        <div style={{ display:"flex", gap:10, alignItems:"flex-end" }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={loading}
            placeholder="Ask TARA anything about your fleet... (Press Enter to send)"
            style={{ flex:1, background:T.bgPanel, border:`1px solid ${input?T.accent+"55":T.border}`, borderRadius:10, padding:"10px 14px", fontSize:13, color:T.text, resize:"none", minHeight:44, maxHeight:120, lineHeight:1.5, outline:"none", fontFamily:"'DM Sans',sans-serif", transition:"border-color .15s", overflowY:"auto" }}
            rows={1}
          />
          <button onClick={()=>sendMessage()} disabled={!input.trim()||loading}
            style={{ width:44, height:44, borderRadius:10, background:input.trim()&&!loading?T.accent:T.bgPanel, border:`1px solid ${input.trim()&&!loading?T.accent:T.border}`, cursor:input.trim()&&!loading?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, transition:"all .15s", flexShrink:0 }}>
            {loading ? <div style={{ width:16, height:16, border:`2px solid ${T.accent}`, borderTopColor:"transparent", borderRadius:"50%", animation:"spin .6s linear infinite" }} /> : "↑"}
          </button>
        </div>
        <div style={{ fontSize:10, color:T.textMuted, marginTop:6, textAlign:"center" }}>TARA · Tranzoop Fleet AI · Powered by Claude Sonnet</div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        body { margin:0; }
        textarea::placeholder { color:${T.textMuted}; }
        textarea:focus { border-color:${T.accent}88 !important; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:${T.border}; border-radius:2px; }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }
      `}</style>
    </div>
  );
}
