import { useState, useEffect, useRef } from "react";

const STORAGE_KEYS = {
  votes:      "openclaw_votes_v6",
  ideas:      "openclaw_ideas_v6",
  userVote:   "openclaw_user_vote_v6",
  ideaUpvotes:"openclaw_idea_upvotes_v6",
};

const SEED_IDEAS = [
  { id:1000001, text:"Help book doctor appointments",            sentiment:"positive", mergeCount:1, upvotes:0, ts:1000001 },
  { id:1000002, text:"Order groceries or takeout for them",      sentiment:"positive", mergeCount:1, upvotes:0, ts:1000002 },
  { id:1000003, text:"Call a ride if they need to go somewhere", sentiment:"positive", mergeCount:1, upvotes:0, ts:1000003 },
  { id:1000004, text:"What if the AI makes a dangerous mistake", sentiment:"negative", mergeCount:1, upvotes:0, ts:1000004 },
  { id:1000005, text:"Parents might not understand the tech",    sentiment:"negative", mergeCount:1, upvotes:0, ts:1000005 },
  { id:1000006, text:"Too much personal data in one system",     sentiment:"negative", mergeCount:1, upvotes:0, ts:1000006 },
];

const SENTIMENT_CONFIG = {
  positive:{ label:"Good Idea", emoji:"🦞", color:"#00e5a0", bg:"rgba(0,229,160,0.08)",  border:"rgba(0,229,160,0.3)",  glow:"rgba(0,229,160,0.5)"  },
  neutral: { label:"Not Sure",  emoji:"🤔", color:"#f0b429", bg:"rgba(240,180,41,0.08)", border:"rgba(240,180,41,0.3)", glow:"rgba(240,180,41,0.5)" },
  negative:{ label:"Bad Idea",  emoji:"💀", color:"#ff4f6a", bg:"rgba(255,79,106,0.08)", border:"rgba(255,79,106,0.3)", glow:"rgba(255,79,106,0.5)" },
};

function LobsterSVG({ size=64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <ellipse cx="32" cy="36" rx="11" ry="14" fill="#ff4f6a"/>
      <ellipse cx="32" cy="20" rx="9"  ry="8"  fill="#ff4f6a"/>
      <circle cx="28" cy="17" r="2.5" fill="#1a1a2e"/>
      <circle cx="36" cy="17" r="2.5" fill="#1a1a2e"/>
      <circle cx="28.8" cy="16.2" r="1" fill="white"/>
      <circle cx="36.8" cy="16.2" r="1" fill="white"/>
      <line x1="28" y1="13" x2="18" y2="5"  stroke="#ff4f6a" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="36" y1="13" x2="46" y2="5"  stroke="#ff4f6a" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M21 28 Q12 24 10 28 Q8 32 13 33 Q10 36 14 37 Q18 38 21 34" fill="#e8304a"/>
      <ellipse cx="11" cy="30" rx="3" ry="2" fill="#ff6b7a" transform="rotate(-20 11 30)"/>
      <path d="M43 28 Q52 24 54 28 Q56 32 51 33 Q54 36 50 37 Q46 38 43 34" fill="#e8304a"/>
      <ellipse cx="53" cy="30" rx="3" ry="2" fill="#ff6b7a" transform="rotate(20 53 30)"/>
      <ellipse cx="32" cy="50" rx="8"  ry="4"   fill="#e8304a"/>
      <ellipse cx="32" cy="56" rx="6"  ry="3.5" fill="#ff4f6a"/>
      <ellipse cx="32" cy="61" rx="4"  ry="3"   fill="#e8304a"/>
      <ellipse cx="24" cy="63" rx="4" ry="2" fill="#ff4f6a" transform="rotate(-30 24 63)"/>
      <ellipse cx="40" cy="63" rx="4" ry="2" fill="#ff4f6a" transform="rotate(30 40 63)"/>
      <line x1="24" y1="38" x2="17" y2="44" stroke="#e8304a" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="26" y1="42" x2="19" y2="48" stroke="#e8304a" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="40" y1="38" x2="47" y2="44" stroke="#e8304a" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="38" y1="42" x2="45" y2="48" stroke="#e8304a" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="23" y1="32" x2="41" y2="32" stroke="#e8304a" strokeWidth="1" opacity="0.5"/>
      <line x1="22" y1="37" x2="42" y2="37" stroke="#e8304a" strokeWidth="1" opacity="0.5"/>
      <line x1="23" y1="42" x2="41" y2="42" stroke="#e8304a" strokeWidth="1" opacity="0.5"/>
    </svg>
  );
}

function BigBar({ pct, color, glow, label, isYou }) {
  const [width, setWidth] = useState(0);
  const [count, setCount] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => {
      setWidth(pct);
      let start = 0;
      const duration = 900;
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        const e = 1 - Math.pow(1 - p, 3);
        setCount(Math.round(e * pct));
        if (p < 1) raf.current = requestAnimationFrame(tick);
      };
      raf.current = requestAnimationFrame(tick);
    }, 120);
    return () => { clearTimeout(t); cancelAnimationFrame(raf.current); };
  }, [pct]);

  return (
    <div style={{ position:"relative", marginBottom:10 }}>
      <div style={{
        height:44, borderRadius:10, position:"relative", overflow:"hidden",
        background:"rgba(255,255,255,0.035)",
        border:"1px solid rgba(255,255,255,0.07)",
      }}>
        <div style={{
          position:"absolute", inset:0, width:width+"%",
          background:`linear-gradient(90deg,${color}18 0%,${color}45 60%,${color}80 100%)`,
          transition:"width 0.95s cubic-bezier(0.22,1,0.36,1)",
          borderRadius:"9px 0 0 9px",
        }}/>
        <div style={{
          position:"absolute", inset:0, width:width+"%",
          background:`linear-gradient(105deg,transparent 35%,${color}28 50%,transparent 65%)`,
          backgroundSize:"250% 100%",
          animation:"shimmer 2.2s ease-in-out infinite",
          borderRadius:"9px 0 0 9px",
          transition:"width 0.95s cubic-bezier(0.22,1,0.36,1)",
        }}/>
        {width > 1 && (
          <div style={{
            position:"absolute", top:4, bottom:4,
            left:`calc(${width}% - 2px)`, width:3, borderRadius:2,
            background:color,
            boxShadow:`0 0 10px 3px ${glow},0 0 30px 8px ${glow}`,
            transition:"left 0.95s cubic-bezier(0.22,1,0.36,1)",
          }}/>
        )}
        <div style={{
          position:"absolute", inset:0, display:"flex",
          alignItems:"center", justifyContent:"space-between",
          padding:"0 14px", zIndex:2,
        }}>
          <span style={{
            fontSize:11, fontWeight:700, letterSpacing:"0.08em",
            textTransform:"uppercase", color:"rgba(255,255,255,0.65)",
            display:"flex", alignItems:"center", gap:6,
          }}>
            {label}
            {isYou && (
              <span style={{
                fontSize:9, padding:"1px 6px", borderRadius:99,
                background:`${color}22`, color:color,
                border:`1px solid ${color}55`, fontWeight:600, letterSpacing:"0.05em",
              }}>YOU</span>
            )}
          </span>
          <span style={{
            fontFamily:"'Space Grotesk',sans-serif",
            fontSize:26, fontWeight:800, letterSpacing:"-0.03em",
            color: pct > 0 ? color : "rgba(255,255,255,0.12)",
            textShadow: pct > 0 ? `0 0 24px ${glow},0 0 48px ${glow}` : "none",
            minWidth:60, textAlign:"right", transition:"color 0.4s",
          }}>
            {count}%
          </span>
        </div>
      </div>
    </div>
  );
}

function Ripple({ x, y, color, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 700); return () => clearTimeout(t); }, [onDone]);
  return (
    <div style={{
      position:"fixed", left:x-36, top:y-36, width:72, height:72,
      borderRadius:"50%", border:`2px solid ${color}`,
      pointerEvents:"none", zIndex:9999,
      animation:"rippleOut 0.7s ease-out forwards",
    }}/>
  );
}

function IdeaSection({ sentiment, cfg, ideas, mergeHint, myUpvotes, onUpvote }) {
  const sectionIdeas = [...ideas.filter(i => i.sentiment === sentiment)]
    .sort((a,b) => (b.upvotes||0)-(a.upvotes||0));
  return (
    <div style={{ borderRadius:14, border:`1px solid ${cfg.border}`, background:"rgba(255,255,255,0.015)", overflow:"hidden" }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, padding:"11px 16px", background:cfg.bg, borderBottom:`1px solid ${cfg.border}` }}>
        <span style={{ fontSize:15 }}>{cfg.emoji}</span>
        <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", color:cfg.color, textTransform:"uppercase" }}>{cfg.label}</span>
        {sectionIdeas.length > 0 && (
          <span style={{ fontSize:10, color:cfg.color+"77", marginLeft:2 }}>· {sectionIdeas.length}</span>
        )}
      </div>
      {sectionIdeas.length > 0 ? (
        <div>
          {sectionIdeas.map((idea, idx) => {
            const voted = !!myUpvotes[idea.id];
            return (
              <div key={idea.id} style={{
                display:"flex", alignItems:"center", gap:10, padding:"11px 14px",
                borderBottom: idx < sectionIdeas.length-1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                animation:"fadeUp 0.3s ease both",
              }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:13, color:"rgba(255,255,255,0.82)", lineHeight:1.45, wordBreak:"break-word" }}>{idea.text}</p>
                  {idea.mergeCount > 1 && (
                    <span style={{ fontSize:10, color:"rgba(240,180,41,0.45)", marginTop:2, display:"block" }}>{idea.mergeCount} similar merged</span>
                  )}
                </div>
                <button onClick={() => !voted && onUpvote(idea.id)} style={{
                  display:"flex", flexDirection:"column", alignItems:"center", gap:1,
                  padding:"5px 9px", borderRadius:8, flexShrink:0,
                  background: voted ? cfg.bg : "rgba(255,255,255,0.03)",
                  border:`1px solid ${voted ? cfg.color : "rgba(255,255,255,0.08)"}`,
                  cursor: voted ? "default" : "pointer", transition:"all 0.18s", minWidth:36,
                }}>
                  <span style={{ fontSize:9, color: voted ? cfg.color : "rgba(255,255,255,0.3)", lineHeight:1 }}>▲</span>
                  <span style={{ fontSize:11, fontWeight:700, lineHeight:1.2, color: voted ? cfg.color : "rgba(255,255,255,0.35)", fontFamily:"'IBM Plex Mono',monospace" }}>
                    {idea.upvotes||0}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p style={{ fontSize:12, color:"rgba(255,255,255,0.2)", padding:"14px 16px", fontStyle:"italic" }}>No comments yet</p>
      )}
      {mergeHint && mergeHint.sentiment === sentiment && (
        <div style={{ margin:"0 12px 12px", padding:"7px 12px", borderRadius:7,
          background:"rgba(240,180,41,0.08)", border:"1px solid rgba(240,180,41,0.25)",
          fontSize:11, color:"#f0b429", animation:"mergeSlide 0.3s ease" }}>
          Merged with: "{mergeHint.text}"
        </div>
      )}
    </div>
  );
}

/* ── "Any comments?" center modal toast ── */
function CommentToast({ visible, color }) {
  return (
    <>
      <div style={{
        position:"fixed", inset:0, zIndex:999,
        background:"rgba(0,0,0,0.55)",
        backdropFilter:"blur(4px)",
        opacity: visible ? 1 : 0,
        transition:"opacity 0.4s ease",
        pointerEvents:"none",
      }}/>
      <div style={{
        position:"fixed", top:"50%", left:"50%",
        transform: visible ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.8)",
        opacity: visible ? 1 : 0,
        transition:"all 0.45s cubic-bezier(0.22,1,0.36,1)",
        pointerEvents:"none", zIndex:1000,
        background:"#13131f",
        border:`1px solid ${color}66`,
        boxShadow:`0 0 80px ${color}55, 0 0 160px ${color}22, 0 24px 64px rgba(0,0,0,0.8)`,
        borderRadius:24, padding:"32px 52px",
        display:"flex", flexDirection:"column", alignItems:"center", gap:14,
        whiteSpace:"nowrap",
      }}>
        <span style={{ fontSize:42, lineHeight:1 }}>💬</span>
        <span style={{
          fontFamily:"'Space Grotesk',sans-serif",
          fontSize:28, fontWeight:800, color:"#f0f0ff", letterSpacing:"-0.02em",
        }}>Any comments?</span>
        <span style={{
          fontSize:13, color:`${color}cc`, fontWeight:500, letterSpacing:"0.04em",
          fontFamily:"'IBM Plex Mono',monospace",
        }}>scroll down to share your take</span>
      </div>
    </>
  );
}

export default function App() {
  const [votes,             setVotes]             = useState({ positive:0, neutral:0, negative:0 });
  const [ideas,             setIdeas]             = useState(SEED_IDEAS);
  const [userVote,          setUserVote]          = useState(null);
  const [myUpvotes,         setMyUpvotes]         = useState({});
  const [ideaText,          setIdeaText]          = useState("");
  const [submitting,        setSubmitting]        = useState(false);
  const [ripples,           setRipples]           = useState([]);
  const [loaded,            setLoaded]            = useState(false);
  const [justVoted,         setJustVoted]         = useState(null);
  const [mergeHint,         setMergeHint]         = useState(null);
  const [showToast,         setShowToast]         = useState(false);
  const idRef = useRef(0);

  useEffect(() => {
    async function load() {
      try {
        const v = await window.storage.get(STORAGE_KEYS.votes, true);
        if (v) setVotes(JSON.parse(v.value));
        const i = await window.storage.get(STORAGE_KEYS.ideas, true);
        const seedIds = new Set(SEED_IDEAS.map(s => s.id));
        if (i) {
          const stored = JSON.parse(i.value);
          const userIdeas   = stored.filter(s => !seedIds.has(s.id) && s.text && s.text.trim().length >= 5);
          const mergedSeeds = SEED_IDEAS.map(seed => {
            const found = stored.find(s => s.id === seed.id);
            return found ? { ...seed, upvotes:found.upvotes||0, mergeCount:found.mergeCount||1 } : seed;
          });
          setIdeas([...mergedSeeds, ...userIdeas]);
        } else {
          await window.storage.set(STORAGE_KEYS.ideas, JSON.stringify(SEED_IDEAS), true);
        }
        const uv = await window.storage.get(STORAGE_KEYS.userVote);
        if (uv) setUserVote(uv.value);
        const mu = await window.storage.get(STORAGE_KEYS.ideaUpvotes);
        if (mu) setMyUpvotes(JSON.parse(mu.value));
      } catch {}
      setLoaded(true);
    }
    load();
    const interval = setInterval(async () => {
      try {
        const v = await window.storage.get(STORAGE_KEYS.votes, true);
        if (v) setVotes(JSON.parse(v.value));
        const i = await window.storage.get(STORAGE_KEYS.ideas, true);
        if (i) {
          const stored = JSON.parse(i.value);
          const seedIds = new Set(SEED_IDEAS.map(s => s.id));
          const userIdeas   = stored.filter(s => !seedIds.has(s.id) && s.text && s.text.trim().length >= 5);
          const mergedSeeds = SEED_IDEAS.map(seed => {
            const found = stored.find(s => s.id === seed.id);
            return found ? { ...seed, upvotes:found.upvotes||0, mergeCount:found.mergeCount||1 } : seed;
          });
          setIdeas([...mergedSeeds, ...userIdeas]);
        }
      } catch {}
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const total = votes.positive + votes.neutral + votes.negative;
  const pct   = (k) => total === 0 ? 0 : Math.round((votes[k] / total) * 100);
  const showVoteCount = total >= 50;

  const handleVote = async (sentiment, e) => {
    if (userVote) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setRipples(r => [...r, { id:idRef.current++, x:rect.left+rect.width/2, y:rect.top+rect.height/2, color:SENTIMENT_CONFIG[sentiment].color }]);
    const newVotes = { ...votes, [sentiment]: votes[sentiment]+1 };
    setVotes(newVotes);
    setUserVote(sentiment);
    setJustVoted(sentiment);
    setTimeout(() => setJustVoted(null), 1200);
    // Show "Any comments?" toast for neutral/negative only (positive has no input)
    if (sentiment !== "positive") {
      setTimeout(() => setShowToast(true),  600);
      setTimeout(() => setShowToast(false), 3200);
    }
    try {
      await window.storage.set(STORAGE_KEYS.votes,    JSON.stringify(newVotes), true);
      await window.storage.set(STORAGE_KEYS.userVote, sentiment);
    } catch {}
  };

  const handleUpvote = async (ideaId) => {
    if (myUpvotes[ideaId]) return;
    const newMyUpvotes = { ...myUpvotes, [ideaId]:true };
    setMyUpvotes(newMyUpvotes);
    const newIdeas = ideas.map(i => i.id === ideaId ? { ...i, upvotes:(i.upvotes||0)+1 } : i);
    setIdeas(newIdeas);
    try {
      await window.storage.set(STORAGE_KEYS.ideas,       JSON.stringify(newIdeas),    true);
      await window.storage.set(STORAGE_KEYS.ideaUpvotes, JSON.stringify(newMyUpvotes));
    } catch {}
  };

  const normalize = (s) => s.toLowerCase().trim().replace(/[^a-z0-9\s]/g,"").replace(/\s+/g," ");

  const handleIdeaSubmit = async () => {
    if (!ideaText.trim() || ideaText.trim().length < 5 || ideaText.length > 60 || !userVote) return;
    setSubmitting(true);
    const sentiment  = userVote;
    const normalized = normalize(ideaText);
    const existing   = ideas.find(i =>
      i.sentiment === sentiment && (
        normalize(i.text) === normalized ||
        normalized.includes(normalize(i.text)) ||
        normalize(i.text).includes(normalized)
      )
    );
    let newIdeas;
    if (existing) {
      newIdeas = ideas.map(i => i.id === existing.id ? { ...i, mergeCount:(i.mergeCount||1)+1 } : i);
      setMergeHint({ text:existing.text, sentiment });
      setTimeout(() => setMergeHint(null), 2500);
    } else {
      newIdeas = [...ideas, { id:Date.now(), text:ideaText.trim(), sentiment, mergeCount:1, upvotes:0, ts:Date.now() }];
    }
    setIdeas(newIdeas);
    setIdeaText("");
    try { await window.storage.set(STORAGE_KEYS.ideas, JSON.stringify(newIdeas), true); } catch {}
    setSubmitting(false);
  };

  const activeCfg = userVote ? SENTIMENT_CONFIG[userVote] : null;
  // Show comment input only for neutral and negative voters
  const showCommentBox = userVote && userVote !== "positive";

  return (
    <div style={{
      minHeight:"100vh", background:"#0b0b18",
      fontFamily:"'IBM Plex Mono','Fira Code',monospace", color:"#e8e8f0",
      backgroundImage:"radial-gradient(ellipse at 15% 40%,rgba(255,79,106,0.07) 0%,transparent 55%),radial-gradient(ellipse at 85% 20%,rgba(0,229,160,0.06) 0%,transparent 55%)",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes rippleOut  {to{transform:scale(3.5);opacity:0;}}
        @keyframes fadeUp     {from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        @keyframes pulse      {0%,100%{opacity:1;}50%{opacity:0.4;}}
        @keyframes float      {0%,100%{transform:translateY(0);}50%{transform:translateY(-7px);}}
        @keyframes mergeSlide {from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}
        @keyframes lockIn     {0%{transform:scale(1.09);}100%{transform:scale(1);}}
        @keyframes countPop   {0%{transform:scale(1.5);opacity:0.4;}100%{transform:scale(1);opacity:1;}}
        @keyframes shimmer    {0%{background-position:200% 0;}100%{background-position:-200% 0;}}
        .vote-btn{transition:all 0.18s cubic-bezier(.4,0,.2,1);border:none;}
        .vote-btn.unlocked:hover{transform:translateY(-3px) scale(1.04);cursor:pointer;}
        .vote-btn.locked{cursor:default;}
        input:focus{outline:none;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:rgba(255,79,106,0.3);border-radius:2px;}
      `}</style>

      {ripples.map(r => (
        <Ripple key={r.id} x={r.x} y={r.y} color={r.color} onDone={() => setRipples(rs => rs.filter(x => x.id !== r.id))}/>
      ))}

      <CommentToast visible={showToast} color={activeCfg ? activeCfg.color : "#ff4f6a"}/>

      <div style={{ maxWidth:580, margin:"0 auto", padding:"40px 20px 80px" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:44, animation:"fadeUp 0.6s ease both" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:20,
            padding:"5px 14px", borderRadius:999, border:"1px solid rgba(255,79,106,0.25)", background:"rgba(255,79,106,0.07)" }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#ff4f6a",
              boxShadow:"0 0 8px #ff4f6a", animation:"pulse 2s infinite", display:"inline-block" }}/>
            <span style={{ fontSize:11, color:"#ff4f6a", letterSpacing:"0.12em", fontWeight:600 }}>LIVE POLL</span>
          </div>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:16, animation:"float 3s ease-in-out infinite" }}>
            <LobsterSVG size={72}/>
          </div>
          <div style={{ marginBottom:12 }}>
            <span style={{ fontSize:13, color:"#ff4f6a", letterSpacing:"0.1em", fontWeight:700 }}>OpenClaw</span>
          </div>
          <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(18px,4vw,24px)", fontWeight:700,
            lineHeight:1.3, color:"#f0f0ff", marginBottom:10 }}>
            OpenClaw for Seniors —
          </h1>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(15px,3.5vw,19px)", fontWeight:600,
            color:"#ff4f6a", marginBottom:16 }}>Yay or Hell No?</h2>
          {showVoteCount && (
            <p style={{ fontSize:12, color:"rgba(255,255,255,0.32)", letterSpacing:"0.06em", animation:"countPop 0.4s ease" }}>
              {total.toLocaleString()} people voted
            </p>
          )}
        </div>

        {/* Vote buttons */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:32,
          animation:"fadeUp 0.7s 0.1s ease both", opacity:loaded?1:0 }}>
          {Object.entries(SENTIMENT_CONFIG).map(([key, cfg]) => {
            const isSelected = userVote === key;
            const isLocked   = !!userVote;
            const isDimmed   = isLocked && !isSelected;
            return (
              <button key={key} className={`vote-btn ${isLocked?"locked":"unlocked"}`}
                onClick={(e) => handleVote(key, e)}
                style={{
                  padding:"18px 8px", borderRadius:12,
                  border:`1px solid ${isSelected?cfg.color:isDimmed?"rgba(255,255,255,0.05)":cfg.border}`,
                  background:isSelected?cfg.bg:isDimmed?"rgba(255,255,255,0.01)":"rgba(255,255,255,0.03)",
                  display:"flex", flexDirection:"column", alignItems:"center", gap:8,
                  boxShadow:isSelected?`0 0 24px ${cfg.glow},inset 0 0 20px ${cfg.bg}`:"none",
                  opacity:isDimmed?0.28:1,
                  animation:isSelected&&justVoted===key?"lockIn 0.3s ease":"none",
                }}>
                <span style={{ fontSize:24 }}>{cfg.emoji}</span>
                <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase",
                  color:isSelected?cfg.color:isDimmed?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.5)" }}>
                  {cfg.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Big bar results */}
        {userVote && total > 0 && (
          <div style={{ marginBottom:36, animation:"fadeUp 0.5s ease both" }}>
            {Object.entries(SENTIMENT_CONFIG).map(([key, cfg]) => (
              <BigBar key={key} pct={pct(key)} color={cfg.color} glow={cfg.glow} label={cfg.label} isYou={key===userVote}/>
            ))}
          </div>
        )}

        {/* Pre-vote nudge */}
        {!userVote && loaded && (
          <p style={{ textAlign:"center", fontSize:12, color:"rgba(255,255,255,0.22)", marginBottom:32, letterSpacing:"0.05em" }}>
            Cast your vote to see results &amp; leave a comment
          </p>
        )}

        {/* Comment box — neutral & negative only */}
        {showCommentBox && (
          <div style={{ marginBottom:36, animation:"fadeUp 0.5s ease both" }}>
            <p style={{ fontSize:11, color:"rgba(255,255,255,0.32)", marginBottom:10, letterSpacing:"0.08em", textTransform:"uppercase" }}>
              Add your comment · max 60 chars
            </p>
            <div style={{ borderRadius:10, overflow:"hidden", border:`1px solid ${activeCfg.border}`, background:"rgba(255,255,255,0.02)", display:"flex" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
                padding:"0 13px", background:activeCfg.bg, borderRight:`1px solid ${activeCfg.border}`, fontSize:18, flexShrink:0 }}>
                {activeCfg.emoji}
              </div>
              <input
                value={ideaText}
                onChange={e => setIdeaText(e.target.value.slice(0,60))}
                onKeyDown={e => e.key==="Enter" && handleIdeaSubmit()}
                placeholder={"Why it's a "+activeCfg.label.toLowerCase()+"..."}
                style={{ flex:1, background:"transparent", border:"none",
                  padding:"12px 14px", color:"#f0f0ff", fontSize:13, fontFamily:"inherit" }}
              />
              <button onClick={handleIdeaSubmit} disabled={!ideaText.trim()||submitting}
                style={{
                  padding:"12px 16px", background:ideaText.trim()?activeCfg.bg:"transparent",
                  border:"none", borderLeft:`1px solid ${ideaText.trim()?activeCfg.border:"rgba(255,255,255,0.06)"}`,
                  color:ideaText.trim()?activeCfg.color:"rgba(255,255,255,0.18)",
                  cursor:ideaText.trim()?"pointer":"default",
                  fontSize:13, fontFamily:"inherit", fontWeight:700, transition:"all 0.18s", whiteSpace:"nowrap",
                }}>
                Post →
              </button>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:5 }}>
              <span style={{ fontSize:10, color:"rgba(255,255,255,0.16)" }}>Similar comments will be merged</span>
              <span style={{ fontSize:10, color:ideaText.length>50?"#f0b429":"rgba(255,255,255,0.16)" }}>
                {ideaText.length}/60
              </span>
            </div>
          </div>
        )}

        {/* Community comments */}
        <div style={{ animation:"fadeUp 0.6s 0.15s ease both" }}>
          <p style={{ fontSize:11, color:"rgba(255,255,255,0.2)", marginBottom:16, letterSpacing:"0.08em", textTransform:"uppercase" }}>
            Community comments
          </p>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {Object.entries(SENTIMENT_CONFIG).map(([key, cfg]) => (
              <IdeaSection key={key} sentiment={key} cfg={cfg} ideas={ideas}
                mergeHint={mergeHint} myUpvotes={myUpvotes} onUpvote={handleUpvote}/>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
