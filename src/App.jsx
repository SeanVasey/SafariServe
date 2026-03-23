import { useState, useEffect, useRef } from "react";
import iconSvgRaw from "./assets/safariserve-icon.svg?raw";

// Strip XML prologue and fixed dimensions so the SVG scales to its container
const iconSvg = iconSvgRaw
  .replace(/<\?xml[^?]*\?>\s*/g, "")
  .replace(/<!DOCTYPE[^>]*>\s*/g, "")
  .replace(/<!--[^]*?-->\s*/g, "")
  .replace(/\s*width="[^"]*"/, "")
  .replace(/\s*height="[^"]*"/, "")
  // Remove the outermost dark background circle (#003b51) that causes a black splotch
  .replace(/fill="#003b51"/, 'fill="#003b51" fill-opacity="0"');

// ━━━ ICON COMPONENTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const CompassIcon = ({ size = 24, className = "" }) => (
<span className={className} role="img" aria-label="SafariServe" style={{ display: "inline-block", width: size, height: size, lineHeight: 0 }} dangerouslySetInnerHTML={{ __html: iconSvg }} />
);
const LinkIcon = ({ size = 24, className = "" }) => (
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
</svg>
);
const ArrowRightIcon = ({ size = 24, className = "" }) => (
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
</svg>
);
const CopyIcon = ({ size = 24, className = "" }) => (
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
</svg>
);
const CheckIcon = ({ size = 24, className = "" }) => (
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>
</svg>
);
const ShareIcon = ({ size = 24, className = "" }) => (
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/>
</svg>
);
const ZapIcon = ({ size = 24, className = "" }) => (
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
</svg>
);
const HomeIcon = ({ size = 24, className = "" }) => (
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
</svg>
);
const SettingsIcon = ({ size = 24, className = "" }) => (
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
</svg>
);
const PlayIcon = ({ size = 24, className = "" }) => (
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
<polygon points="6 3 20 12 6 21 6 3"/>
</svg>
);
const ImageIcon = ({ size = 24, className = "" }) => (
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
</svg>
);
const FileTextIcon = ({ size = 24, className = "" }) => (
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>
</svg>
);
const ChevronRightIcon = ({ size = 24, className = "" }) => (
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
<path d="m9 18 6-6-6-6"/>
</svg>
);

// ━━━ ELECTRIC CYAN MESH BACKGROUND ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ElectricMeshBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animFrame;
    let particles = [];
    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;
    // More particles, brighter
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * 500, y: Math.random() * 1400,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 2.5 + 0.8, o: Math.random() * 0.8 + 0.3,
        pulse: Math.random() * Math.PI * 2,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, w(), h());
      const t = Date.now() * 0.0004;

      // ── Flowing ribbon (inspired by reference IMG_0237) ──
      ctx.save();
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(-20, h() * 0.25);
        for (let x = -20; x <= w() + 20; x += 3) {
          const y = h() * 0.32
            + Math.sin(x * 0.004 + t + i * 0.7) * 80
            + Math.sin(x * 0.009 + t * 1.3 + i * 0.3) * 40
            + Math.cos(x * 0.015 + t * 0.8) * 20;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w() + 20, h());
        ctx.lineTo(-20, h());
        ctx.closePath();
        const grad = ctx.createLinearGradient(0, h() * 0.15, 0, h() * 0.65);
        grad.addColorStop(0, `rgba(0, 230, 255, ${0.06 + i * 0.025})`);
        grad.addColorStop(0.4, `rgba(0, 200, 240, ${0.08 + i * 0.02})`);
        grad.addColorStop(0.7, `rgba(0, 160, 220, ${0.04 + i * 0.01})`);
        grad.addColorStop(1, "rgba(0, 120, 200, 0)");
        ctx.fillStyle = grad;
        ctx.fill();
      }
      ctx.restore();

      // ── Second ribbon flowing opposite direction ──
      ctx.save();
      for (let i = 0; i < 2; i++) {
        ctx.beginPath();
        ctx.moveTo(-20, h() * 0.55);
        for (let x = -20; x <= w() + 20; x += 3) {
          const y = h() * 0.6
            + Math.sin(-x * 0.005 + t * 1.2 + i * 1.2) * 50
            + Math.cos(x * 0.008 + t * 0.7) * 30;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w() + 20, h());
        ctx.lineTo(-20, h());
        ctx.closePath();
        const grad = ctx.createLinearGradient(0, h() * 0.45, 0, h() * 0.85);
        grad.addColorStop(0, `rgba(0, 210, 255, ${0.04 + i * 0.015})`);
        grad.addColorStop(1, "rgba(0, 100, 180, 0)");
        ctx.fillStyle = grad;
        ctx.fill();
      }
      ctx.restore();

      // ── Particles with glow + pulsing ──
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        p.pulse += 0.02;
        if (p.x < -10 || p.x > w() + 10) p.vx *= -1;
        if (p.y < -10 || p.y > h() + 10) p.vy *= -1;
        const pulseO = p.o * (0.7 + 0.3 * Math.sin(p.pulse));
        // Outer glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        glow.addColorStop(0, `rgba(0, 230, 255, ${pulseO * 0.4})`);
        glow.addColorStop(0.5, `rgba(0, 200, 240, ${pulseO * 0.15})`);
        glow.addColorStop(1, "rgba(0, 180, 220, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(p.x - p.r * 4, p.y - p.r * 4, p.r * 8, p.r * 8);
        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${pulseO * 0.9})`;
        ctx.fill();
      });

      // ── Connections with electric feel ──
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 220, 250, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animFrame = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animFrame); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

// ━━━ MEDIA TYPE DETECTION ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function detectMediaType(url) {
  if (!url) return "unknown";
  const l = url.toLowerCase();
  if (l.includes("youtube.com") || l.includes("youtu.be") || l.includes("vimeo") || l.includes("dailymotion") || l.includes("twitch.tv")) return "video";
  if (l.match(/\.(jpeg|jpg|gif|png|webp|svg|heic|avif)(\?|$)/i) || l.includes("instagram.com/p/") || l.includes("flickr.com") || l.includes("unsplash.com")) return "image";
  if (l.match(/\.(mp3|wav|flac|aac|ogg|m4a)(\?|$)/i) || l.includes("soundcloud.com") || l.includes("spotify.com") || l.includes("music.apple.com")) return "audio";
  if (l.match(/\.(pdf|doc|docx|xls|xlsx|ppt|pptx)(\?|$)/i) || l.includes("docs.google.com") || l.includes("notion.so")) return "document";
  return "article";
}

const MEDIA_CONFIG = {
  video: { icon: PlayIcon, color: "#FF4D6A", label: "VIDEO", bg: "rgba(255, 77, 106, 0.1)", border: "rgba(255, 77, 106, 0.2)" },
  image: { icon: ImageIcon, color: "#FF9F43", label: "IMAGE", bg: "rgba(255, 159, 67, 0.1)", border: "rgba(255, 159, 67, 0.2)" },
  audio: { icon: ZapIcon, color: "#A855F7", label: "AUDIO", bg: "rgba(168, 85, 247, 0.1)", border: "rgba(168, 85, 247, 0.2)" },
  document: { icon: FileTextIcon, color: "#3B82F6", label: "DOCUMENT", bg: "rgba(59, 130, 246, 0.1)", border: "rgba(59, 130, 246, 0.2)" },
  article: { icon: FileTextIcon, color: "#00E5FF", label: "ARTICLE", bg: "rgba(0, 229, 255, 0.1)", border: "rgba(0, 229, 255, 0.2)" },
  unknown: { icon: LinkIcon, color: "#64748B", label: "WAITING", bg: "rgba(100, 116, 139, 0.08)", border: "rgba(100, 116, 139, 0.15)" },
};

// ━━━ SHORTCUT TEMPLATES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SHORTCUT_TEMPLATES = [
  {
    id: "send-to-serve",
    name: "Send to Serve",
    badge: "SHARE SHEET",
    badgeColor: "#00E5FF",
    desc: "Enable in Share Sheet. Use directly from Brave or any app.",
    steps: [
      { n: 1, text: 'Receive', highlight: 'URLs', tail: 'from Share Sheet' },
      { n: 2, text: 'URL Encode', highlight: 'Shortcut Input', tail: '' },
      { n: 3, text: 'Open URL', highlight: '[SafariServe-URL]', tail: '/?url=[Encoded]' },
    ],
  },
  {
    id: "force-safari",
    name: "ForceSafari",
    badge: "CORE ENGINE",
    badgeColor: "#FF4D6A",
    desc: "Triggered by the Push to Safari button. Opens URL natively.",
    steps: [
      { n: 1, text: 'Receive', highlight: 'Text', tail: 'from Shortcut Input' },
      { n: 2, text: 'Open', highlight: 'Shortcut Input', tail: 'in Safari App' },
    ],
  },
  {
    id: "save-to-home",
    name: "Save to Home Screen",
    badge: "HOME SCREEN",
    badgeColor: "#FF9F43",
    desc: "Once in Safari, use native Add to Home Screen from share menu.",
    steps: [
      { n: 1, text: 'In Safari, tap', highlight: 'Share', tail: 'icon (\u2191)' },
      { n: 2, text: 'Select', highlight: '"Add to Home Screen"', tail: '' },
      { n: 3, text: 'Customize', highlight: 'name & icon', tail: '\u2192 tap Add' },
    ],
  },
];

const IFTTT_METHODS = [
  { name: "Webhook POST", desc: "Send URL payload to IFTTT Maker webhook for downstream automation", color: "#00E5FF" },
  { name: "RSS Trigger", desc: "Monitor for new URLs and auto-route through SafariServe pipeline", color: "#A855F7" },
  { name: "iOS Shortcut \u2192 IFTTT", desc: "Chain Shortcut output to trigger IFTTT applet via URL scheme", color: "#FF9F43" },
];

// ━━━ MAIN APP ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [mediaType, setMediaType] = useState("unknown");
  const [activeTab, setActiveTab] = useState("execute");
  const [expandedShortcut, setExpandedShortcut] = useState(null);
  const [pushState, setPushState] = useState("idle");

  const handleUrlChange = (e) => {
    const v = e.target.value;
    setInputUrl(v);
    setMediaType(detectMediaType(v));
    setPushState("idle");
  };

  const handlePushToSafari = () => {
    if (!inputUrl) return;
    setPushState("pushing");
    setTimeout(() => {
      setPushState("done");
      const encoded = encodeURIComponent(inputUrl);
      window.location.href = `shortcuts://run-shortcut?name=ForceSafari&input=text&text=${encoded}`;
    }, 600);
  };

  const handleIFTTT = () => {
    if (!inputUrl) return;
    alert(`IFTTT Webhook would fire with payload:\n${inputUrl}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inputUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  const mc = MEDIA_CONFIG[mediaType];
  const MediaTypeIcon = mc.icon;

  const tabs = [
    { id: "execute", label: "Route" },
    { id: "shortcuts", label: "Shortcuts" },
    { id: "automate", label: "Automate" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(168deg, #020408 0%, #03090F 20%, #041018 45%, #020A14 70%, #010508 100%)",
      fontFamily: "'Reddit Sans', 'Segoe UI', sans-serif",
      color: "#E2E8F0",
      position: "relative",
      overflow: "hidden",
      paddingTop: "env(safe-area-inset-top)",
      paddingBottom: "env(safe-area-inset-bottom)",
    }}>
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Reddit+Sans:wght@300;400;500;600;700&family=Space+Mono&display=swap');

:root {
  --border-subtle: rgba(100, 116, 139, 0.12);
  --border-glow: rgba(0, 229, 255, 0.15);
  --accent-deep: rgba(0, 229, 255, 0.25);
  --accent-dim: #5A7088;
  --accent-primary: #00E5FF;
  --text-secondary: #B8CCE0;
  --text-muted: #3D5068;
  --bg-card: rgba(8, 16, 30, 0.55);
  --accent-glow-strong: rgba(0, 229, 255, 0.35);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
input:focus { outline: none; }
button { cursor: pointer; border: none; background: none; font-family: inherit; }

@keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulseGlow { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes breathe { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.05); } }

.fade-up { animation: fadeUp 0.4s ease-out both; }
.fade-up-1 { animation-delay: 0.05s; }
.fade-up-2 { animation-delay: 0.1s; }
.fade-up-3 { animation-delay: 0.15s; }
.fade-up-4 { animation-delay: 0.2s; }

/* ═══ VASEY/AI Universal Footer ═══ */
.app-footer {
  margin-top: 56px;
  padding-top: 32px;
  border-top: 1px solid var(--border-subtle);
  text-align: center;
  animation: fadeInUp 0.8s ease-out 0.8s both;
  /* Enhancement D: Card-Wrapped Footer */
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: 32px 24px 24px;
  margin-left: -4px;
  margin-right: -4px;
}

.footer-divider {
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent-deep), transparent);
  margin: 0 auto 28px;
  display: none; /* Enhancement D */
}

.footer-brand-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.footer-logo {
  opacity: 0.45;
  transition: opacity 0.3s ease;
  display: inline-flex;
  align-items: center;
}
.footer-logo:hover { opacity: 0.75; }

.footer-logo-vm { width: 36px; height: 31px; }
.footer-logo-vai { width: 48px; height: 48px; }
.footer-logo-sep { width: 1px; height: 24px; background: var(--border-glow); }

.footer-suite-tag {
  font-family: 'Reddit Sans', sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.footer-app-tag {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: var(--text-muted);
  opacity: 0.7;
  margin-bottom: 16px;
}

.footer-copyright {
  font-family: 'Reddit Sans', sans-serif;
  font-size: 11px;
  color: var(--text-muted);
  opacity: 0.5;
  line-height: 1.6;
  padding-bottom: 8px;
}

.footer-copyright a {
  color: var(--accent-dim);
  text-decoration: none;
  transition: color 0.2s ease;
}
.footer-copyright a:hover { color: var(--accent-primary); }
`}</style>

      {/* Electric animated mesh background */}
      <ElectricMeshBackground />

      {/* Top ambient glow - much brighter electric cyan */}
      <div style={{
        position: "absolute", top: "-150px", left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "400px",
        background: "radial-gradient(ellipse, rgba(0, 230, 255, 0.18) 0%, rgba(0, 180, 240, 0.08) 35%, rgba(0, 140, 220, 0.03) 60%, transparent 85%)",
        pointerEvents: "none", zIndex: 1,
        animation: "breathe 6s ease-in-out infinite",
      }} />

      {/* Secondary glow - lower right */}
      <div style={{
        position: "absolute", bottom: "10%", right: "-10%",
        width: "400px", height: "400px",
        background: "radial-gradient(ellipse, rgba(0, 200, 240, 0.08) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 1,
        animation: "breathe 8s ease-in-out infinite 2s",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: 440, margin: "0 auto", padding: "56px max(20px, env(safe-area-inset-right)) 100px max(20px, env(safe-area-inset-left))" }}>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 36 }}>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 11, letterSpacing: "0.35em", fontWeight: 600,
            color: "rgba(0, 229, 255, 0.6)", marginBottom: 20, textTransform: "uppercase",
          }}>
            VASEY/AI PRESENTS
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 10 }}>
            <div style={{
              position: "relative", padding: 0, borderRadius: "50%", flexShrink: 0,
              filter: "drop-shadow(0 0 8px rgba(0, 229, 255, 0.35)) drop-shadow(0 0 20px rgba(0, 229, 255, 0.15))",
            }}>
              {/* Glow behind icon */}
              <div style={{
                position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
                width: 80, height: 80, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0, 229, 255, 0.25) 0%, rgba(0, 200, 240, 0.12) 50%, transparent 75%)",
                filter: "blur(14px)", pointerEvents: "none",
              }} />
              <CompassIcon size={40} />
            </div>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "2.4rem", letterSpacing: "-0.02em", lineHeight: 1, color: "#F1F5F9", margin: 0 }}>
              SafariServe
            </h1>
            <span style={{
              padding: "4px 10px", borderRadius: 20,
              background: "rgba(0, 229, 255, 0.1)", border: "1px solid rgba(0, 229, 255, 0.25)",
              color: "#00E5FF", fontSize: 10, fontWeight: 700, letterSpacing: "0.05em",
            }}>
              v2.0
            </span>
          </div>

          <p style={{ color: "#5A7088", fontSize: 15, fontWeight: 400, lineHeight: 1.5 }}>
            The intelligent jumping-off point for your media.
          </p>
        </div>

        {/* ── MAIN CARD ────────────────────────────────────────── */}
        <div style={{ position: "relative" }}>
          {/* Card outer glow */}
          <div style={{
            position: "absolute", inset: -2, borderRadius: 28,
            background: "linear-gradient(135deg, rgba(0, 229, 255, 0.12) 0%, rgba(0, 180, 240, 0.04) 40%, rgba(0, 229, 255, 0.08) 100%)",
            filter: "blur(24px)", pointerEvents: "none",
          }} />

          {/* Liquid glass card */}
          <div style={{
            position: "relative",
            background: "rgba(8, 16, 30, 0.55)",
            backdropFilter: "blur(48px) saturate(1.8)",
            border: "1px solid rgba(0, 229, 255, 0.12)",
            borderRadius: 26, padding: "24px 22px 28px",
            boxShadow: "0 8px 40px rgba(0, 0, 0, 0.4), 0 0 60px rgba(0, 229, 255, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
          }}>

            {/* TABS */}
            <div className="fade-up fade-up-1" style={{ display: "flex", gap: 0, marginBottom: 24, borderBottom: "1px solid rgba(100, 116, 139, 0.12)", paddingBottom: 0 }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: 1, padding: "10px 0 12px", fontSize: 12, fontWeight: 700,
                    fontFamily: "'Outfit', sans-serif",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: activeTab === tab.id ? "#00E5FF" : "#3D5068",
                    position: "relative", transition: "color 0.2s",
                  }}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div style={{
                      position: "absolute", bottom: -1, left: "15%", right: "15%", height: 2,
                      background: "linear-gradient(90deg, transparent, #00E5FF, transparent)",
                      borderRadius: 1,
                      boxShadow: "0 0 8px rgba(0, 229, 255, 0.4)",
                    }} />
                  )}
                </button>
              ))}
            </div>

            {/* ═══ TAB: EXECUTE / ROUTE ═══ */}
            {activeTab === "execute" && (
              <div className="fade-up fade-up-2">
                {/* Payload Section */}
                <div style={{ marginBottom: 28 }}>
                  <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: "0.08em", color: "#B8CCE0", marginBottom: 4, textTransform: "uppercase" }}>
                    Target Payload
                  </h2>
                  <p style={{ fontSize: 13, color: "#3D5068", marginBottom: 14 }}>Paste a URL or share directly from Brave</p>

                  {/* Input */}
                  <div style={{
                    background: "rgba(6, 12, 24, 0.7)", border: `1px solid ${inputUrl ? "rgba(0, 229, 255, 0.3)" : "rgba(100, 116, 139, 0.12)"}`,
                    borderRadius: 16, padding: "4px 4px 4px 14px", display: "flex", alignItems: "center",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    boxShadow: inputUrl ? "0 0 24px rgba(0, 229, 255, 0.08), 0 0 60px rgba(0, 229, 255, 0.03), inset 0 1px 3px rgba(0,0,0,0.4)" : "inset 0 1px 3px rgba(0,0,0,0.4)",
                  }}>
                    <LinkIcon size={17} style={{ color: "#3D5068", flexShrink: 0, marginRight: 10 }} />
                    <input
                      type="url"
                      value={inputUrl}
                      onChange={handleUrlChange}
                      placeholder="Paste media URL here..."
                      style={{
                        flex: 1, background: "transparent", border: "none", color: "#E2E8F0",
                        fontSize: 15, padding: "10px 0", fontFamily: "inherit",
                      }}
                    />
                    <button
                      onClick={copyToClipboard}
                      style={{
                        padding: 10, borderRadius: 12, flexShrink: 0, transition: "all 0.2s",
                        background: copied ? "rgba(34, 197, 94, 0.15)" : "rgba(100, 116, 139, 0.08)",
                        color: copied ? "#22C55E" : "#4A6178",
                      }}
                    >
                      {copied ? <CheckIcon size={17} /> : <CopyIcon size={17} />}
                    </button>
                  </div>

                  {/* Media type badge */}
                  {inputUrl && (
                    <div className="fade-up" style={{
                      marginTop: 10, display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "6px 12px", borderRadius: 10,
                      background: mc.bg, border: `1px solid ${mc.border}`,
                    }}>
                      <MediaTypeIcon size={14} style={{ color: mc.color }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: mc.color, letterSpacing: "0.05em" }}>
                        {mc.label}
                      </span>
                    </div>
                  )}
                </div>

                {/* Workflow Actions */}
                <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: "0.08em", color: "#B8CCE0", marginBottom: 14, textTransform: "uppercase" }}>
                  Workflow Actions
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {/* Push to Safari */}
                  <button
                    onClick={handlePushToSafari}
                    disabled={!inputUrl}
                    style={{
                      width: "100%", position: "relative",
                      opacity: inputUrl ? 1 : 0.4, pointerEvents: inputUrl ? "auto" : "none",
                    }}
                  >
                    <div style={{
                      position: "absolute", inset: 0, borderRadius: 18,
                      background: pushState === "done" ? "rgba(34, 197, 94, 0.15)" : "rgba(0, 229, 255, 0.08)",
                      filter: "blur(10px)", transition: "all 0.3s",
                    }} />
                    <div style={{
                      position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "16px 18px", borderRadius: 18,
                      background: "rgba(8, 16, 30, 0.5)", border: "1px solid rgba(0, 229, 255, 0.18)",
                      transition: "all 0.2s",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{
                          padding: 11, borderRadius: 14,
                          background: pushState === "done" ? "rgba(34, 197, 94, 0.12)" : "rgba(0, 229, 255, 0.1)",
                          color: pushState === "done" ? "#22C55E" : "#00E5FF",
                          transition: "all 0.3s",
                          boxShadow: pushState === "done" ? "0 0 12px rgba(34,197,94,0.2)" : "0 0 12px rgba(0,229,255,0.15)",
                        }}>
                          {pushState === "done" ? <CheckIcon size={22} /> : <CompassIcon size={22} />}
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontWeight: 700, fontSize: 15, color: "#F1F5F9" }}>Push to Safari</div>
                          <div style={{ fontSize: 12, color: "#3D5068", marginTop: 2 }}>
                            {pushState === "done" ? "Routed successfully" : "Opens via ForceSafari shortcut"}
                          </div>
                        </div>
                      </div>
                      <ArrowRightIcon size={18} style={{ color: "rgba(0, 229, 255, 0.4)" }} />
                    </div>
                  </button>

                  {/* Add to Home Screen */}
                  <button
                    disabled={!inputUrl}
                    style={{ width: "100%", opacity: inputUrl ? 1 : 0.4, pointerEvents: inputUrl ? "auto" : "none" }}
                  >
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "16px 18px", borderRadius: 18,
                      background: "rgba(8, 16, 30, 0.35)", border: "1px solid rgba(100, 116, 139, 0.08)",
                      transition: "all 0.2s",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ padding: 11, borderRadius: 14, background: "rgba(255, 159, 67, 0.1)", color: "#FF9F43" }}>
                          <HomeIcon size={22} />
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontWeight: 700, fontSize: 15, color: "#B8CCE0" }}>Save to Home Screen</div>
                          <div style={{ fontSize: 12, color: "#3D5068", marginTop: 2 }}>Once in Safari → Share → Add to Home</div>
                        </div>
                      </div>
                      <ChevronRightIcon size={18} style={{ color: "#253040" }} />
                    </div>
                  </button>

                  {/* IFTTT Webhook */}
                  <button
                    onClick={handleIFTTT}
                    disabled={!inputUrl}
                    style={{ width: "100%", opacity: inputUrl ? 1 : 0.4, pointerEvents: inputUrl ? "auto" : "none" }}
                  >
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "16px 18px", borderRadius: 18,
                      background: "rgba(8, 16, 30, 0.35)", border: "1px solid rgba(100, 116, 139, 0.08)",
                      transition: "all 0.2s",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ padding: 11, borderRadius: 14, background: "rgba(168, 85, 247, 0.1)", color: "#A855F7" }}>
                          <ZapIcon size={22} />
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontWeight: 700, fontSize: 15, color: "#B8CCE0" }}>Trigger IFTTT Webhook</div>
                          <div style={{ fontSize: 12, color: "#3D5068", marginTop: 2 }}>Send payload to automation logic</div>
                        </div>
                      </div>
                      <ShareIcon size={16} style={{ color: "#253040" }} />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* ═══ TAB: SHORTCUTS ═══ */}
            {activeTab === "shortcuts" && (
              <div className="fade-up fade-up-2">
                <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: "0.08em", color: "#B8CCE0", marginBottom: 4, textTransform: "uppercase" }}>
                  Shortcut Construction
                </h2>
                <p style={{ fontSize: 13, color: "#3D5068", marginBottom: 18 }}>
                  Configure these iOS Shortcuts to enable the full SafariServe pipeline.
                </p>

                {/* Flow diagram */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  padding: "12px 16px", marginBottom: 18, borderRadius: 14,
                  background: "rgba(0, 229, 255, 0.04)", border: "1px solid rgba(0, 229, 255, 0.08)",
                }}>
                  {["Brave", "\u2192", "Send to Serve", "\u2192", "SafariServe", "\u2192", "ForceSafari", "\u2192", "Safari"].map((item, i) => (
                    item === "\u2192" ? (
                      <ChevronRightIcon key={i} size={14} style={{ color: "#253040", flexShrink: 0 }} />
                    ) : (
                      <span key={i} style={{
                        fontSize: 10, fontWeight: 600, color: i === 4 ? "#00E5FF" : "#4A6178",
                        letterSpacing: "0.03em", whiteSpace: "nowrap",
                      }}>{item}</span>
                    )
                  ))}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {SHORTCUT_TEMPLATES.map((sc, idx) => (
                    <div key={sc.id} className={`fade-up fade-up-${idx + 1}`}>
                      <button
                        onClick={() => setExpandedShortcut(expandedShortcut === sc.id ? null : sc.id)}
                        style={{
                          width: "100%", textAlign: "left",
                          padding: "16px 18px", borderRadius: expandedShortcut === sc.id ? "18px 18px 0 0" : 18,
                          background: "rgba(8, 16, 30, 0.5)", border: "1px solid rgba(100, 116, 139, 0.1)",
                          borderBottom: expandedShortcut === sc.id ? "1px solid rgba(100, 116, 139, 0.05)" : undefined,
                          transition: "all 0.2s",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{
                              fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 6,
                              background: `${sc.badgeColor}15`, color: sc.badgeColor,
                              border: `1px solid ${sc.badgeColor}30`, letterSpacing: "0.08em",
                            }}>{sc.badge}</span>
                            <span style={{ fontWeight: 700, fontSize: 15, color: "#E2E8F0" }}>{sc.name}</span>
                          </div>
                          <ChevronRightIcon size={16} style={{
                            color: "#3D5068", transition: "transform 0.2s",
                            transform: expandedShortcut === sc.id ? "rotate(90deg)" : "none",
                          }} />
                        </div>
                        <p style={{ fontSize: 12, color: "#3D5068", marginTop: 6 }}>{sc.desc}</p>
                      </button>

                      {expandedShortcut === sc.id && (
                        <div className="fade-up" style={{
                          padding: "14px 18px 16px", borderRadius: "0 0 18px 18px",
                          background: "rgba(4, 10, 22, 0.6)", border: "1px solid rgba(100, 116, 139, 0.06)",
                          borderTop: "none",
                        }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {sc.steps.map((step) => (
                              <div key={step.n} style={{
                                display: "flex", alignItems: "flex-start", gap: 10,
                                fontSize: 12, fontFamily: "'SF Mono', 'Fira Code', monospace", color: "#4A6178",
                              }}>
                                <span style={{
                                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                                  width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                                  background: "rgba(0, 229, 255, 0.08)", color: "#00E5FF",
                                  fontSize: 10, fontWeight: 700, fontFamily: "'Reddit Sans', sans-serif",
                                }}>{step.n}</span>
                                <span>
                                  {step.text}{" "}
                                  <span style={{ color: sc.badgeColor, fontWeight: 600 }}>{step.highlight}</span>
                                  {step.tail && <span> {step.tail}</span>}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ═══ TAB: AUTOMATE ═══ */}
            {activeTab === "automate" && (
              <div className="fade-up fade-up-2">
                <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: "0.08em", color: "#B8CCE0", marginBottom: 4, textTransform: "uppercase" }}>
                  Automation Methods
                </h2>
                <p style={{ fontSize: 13, color: "#3D5068", marginBottom: 18 }}>
                  Extend SafariServe with IFTTT applets and chained Shortcuts.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {IFTTT_METHODS.map((method, i) => (
                    <div key={i} className={`fade-up fade-up-${i + 1}`} style={{
                      padding: "16px 18px", borderRadius: 18,
                      background: "rgba(8, 16, 30, 0.4)", border: "1px solid rgba(100, 116, 139, 0.08)",
                      position: "relative", overflow: "hidden",
                    }}>
                      <div style={{
                        position: "absolute", right: 0, top: 0, bottom: 0, width: 3,
                        background: `linear-gradient(to bottom, ${method.color}, transparent)`,
                        boxShadow: `0 0 8px ${method.color}40`,
                      }} />
                      <div style={{ fontWeight: 700, fontSize: 14, color: "#E2E8F0", marginBottom: 4 }}>{method.name}</div>
                      <p style={{ fontSize: 12, color: "#3D5068", lineHeight: 1.5 }}>{method.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Config section */}
                <div style={{
                  marginTop: 18, padding: "16px 18px", borderRadius: 18,
                  background: "rgba(0, 229, 255, 0.03)", border: "1px solid rgba(0, 229, 255, 0.08)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <SettingsIcon size={14} style={{ color: "#00E5FF" }} />
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 700, color: "#00E5FF", letterSpacing: "0.08em" }}>WEBHOOK CONFIG</span>
                  </div>
                  <p style={{ fontSize: 12, color: "#3D5068", lineHeight: 1.6 }}>
                    Set your IFTTT Maker webhook key in the SafariServe config to enable direct payload dispatch. The webhook URL follows the pattern: <span style={{ fontFamily: "monospace", color: "#4A6178" }}>https://maker.ifttt.com/trigger/&#123;event&#125;/with/key/&#123;your_key&#125;</span>
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ── BRANDED FOOTER ─────────────────────────────────── */}
        <footer className="app-footer">
          <div className="footer-divider"></div>
          <div className="footer-brand-row">

            {/* Vasey Multimedia — VM Monogram */}
            <a href="https://vaseymultimedia.com" target="_blank" rel="noopener" className="footer-logo" aria-label="Vasey Multimedia">
              <svg className="footer-logo-vm" viewBox="0 0 688 592" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(0,592) scale(0.1,-0.1)" fill="currentColor" color="var(--text-secondary)">
                  <path d="M20 3827 l0 -2073 251 -265 c138 -145 281 -299 317 -341 37 -42 70 -76 74 -75 3 1 8 851 10 1889 2 1038 8 1891 12 1895 5 4 11 2 13 -5 3 -7 51 -70 106 -139 144 -178 444 -556 611 -767 77 -98 193 -245 257 -325 64 -80 223 -281 353 -446 130 -165 301 -381 380 -480 78 -99 205 -261 282 -359 76 -99 176 -227 222 -285 46 -58 104 -133 130 -166 323 -418 405 -517 415 -499 13 24 111 152 237 309 83 104 193 244 345 438 22 29 76 97 120 153 44 56 116 148 160 205 44 57 213 270 375 474 162 203 307 386 322 405 15 19 89 112 165 207 76 94 174 218 217 275 44 57 202 258 350 447 317 403 353 448 409 521 l42 55 3 -1903 c1 -1047 6 -1902 10 -1900 4 2 50 50 102 108 52 58 184 197 294 310 110 113 211 221 225 241 l26 35 0 225 c0 123 -1 1053 -2 2067 l-3 1842 -323 0 c-309 0 -323 -1 -332 -19 -6 -11 -57 -79 -115 -151 -126 -158 -178 -226 -377 -486 -83 -109 -191 -249 -240 -311 -48 -61 -166 -212 -262 -335 -197 -251 -337 -430 -522 -663 -70 -88 -146 -186 -170 -217 -120 -155 -371 -476 -528 -673 -96 -121 -198 -249 -226 -285 -28 -36 -111 -140 -184 -232 l-133 -166 -27 31 c-15 18 -49 61 -77 97 -27 36 -103 133 -169 216 -66 82 -164 206 -217 275 -53 68 -170 216 -258 329 -89 113 -276 354 -417 535 -141 182 -289 371 -328 420 -39 50 -128 162 -196 250 -69 88 -181 232 -250 319 -68 87 -221 283 -339 435 -119 152 -271 345 -338 429 -67 84 -129 164 -138 177 l-16 25 -324 0 -324 0 0 -2073z M1209 5883 c5 -10 66 -90 136 -178 69 -88 176 -225 238 -305 61 -80 146 -188 187 -241 41 -52 106 -136 145 -185 38 -49 121 -155 185 -235 63 -80 141 -179 172 -220 62 -79 308 -394 532 -679 213 -272 298 -381 471 -603 88 -114 162 -206 165 -206 3 0 21 21 41 47 19 26 109 141 200 256 90 115 247 315 348 445 236 302 465 594 547 696 102 128 375 474 563 716 96 123 216 276 266 339 50 63 136 171 190 240 l98 125 -374 3 c-292 2 -375 0 -380 -10 -4 -7 -102 -132 -218 -278 -116 -146 -223 -281 -238 -301 -98 -128 -269 -345 -333 -423 -41 -50 -93 -116 -115 -146 -22 -30 -78 -102 -125 -160 -78 -96 -186 -232 -388 -490 -41 -52 -79 -95 -83 -95 -5 0 -46 48 -91 106 -101 129 -455 578 -750 949 -509 643 -621 786 -642 817 l-21 33 -368 0 c-347 0 -367 -1 -358 -17z M1130 2171 l0 -1484 163 -166 c156 -159 343 -353 437 -453 25 -27 48 -48 53 -48 4 0 7 637 7 1415 l0 1415 -33 37 c-19 21 -151 184 -295 363 -144 179 -277 343 -296 365 l-35 40 -1 -1484z M5633 3532 c-50 -64 -193 -245 -317 -401 l-226 -284 0 -1413 c0 -887 4 -1414 10 -1414 5 0 13 6 17 14 10 18 110 125 267 286 66 69 175 181 241 250 l120 125 -3 1478 c-1 812 -5 1477 -10 1476 -4 0 -48 -53 -99 -117z"/>
                </g>
              </svg>
            </a>

            <div className="footer-logo-sep"></div>

            {/* VASEY/AI — V/AI Monogram */}
            <a href="https://vasey.ai" target="_blank" rel="noopener" className="footer-logo" aria-label="VASEY/AI">
              <svg className="footer-logo-vai" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(0,1080) scale(0.1,-0.1)">
                  <path d="M5797 7988 c-15 -12 -38 -53 -162 -283 -26 -49 -75 -139 -108 -200 -58 -107 -233 -435 -334 -625 -84 -157 -278 -521 -311 -580 -16 -30 -127 -239 -247 -465 -119 -225 -233 -439 -252 -475 -20 -36 -76 -141 -125 -235 -50 -93 -105 -197 -123 -230 -18 -33 -73 -136 -123 -230 -49 -93 -99 -187 -111 -209 -12 -21 -62 -114 -111 -206 -49 -92 -97 -183 -108 -201 -10 -19 -42 -78 -72 -131 -29 -54 -59 -98 -66 -98 -17 0 -34 32 -34 61 0 21 63 146 190 379 196 358 240 441 240 454 0 13 -482 978 -500 1001 -5 6 -74 141 -155 300 -81 160 -195 382 -253 495 -58 113 -134 262 -168 332 -35 70 -71 131 -81 136 -20 11 -983 3 -983 -7 0 -3 31 -62 68 -131 37 -69 103 -192 146 -275 44 -82 129 -244 191 -360 62 -115 143 -268 180 -340 37 -71 103 -195 145 -275 43 -80 105 -199 140 -265 35 -66 82 -156 105 -200 24 -44 118 -224 210 -400 92 -176 202 -385 245 -465 42 -80 119 -226 171 -325 51 -99 133 -256 181 -350 49 -93 147 -286 218 -427 115 -227 134 -258 154 -258 20 0 39 29 136 208 62 114 166 304 230 422 175 321 310 571 380 705 35 66 148 280 253 475 104 195 208 391 232 435 23 44 102 193 175 330 73 138 182 342 243 455 61 113 122 225 135 250 67 125 125 232 162 300 22 41 70 134 107 205 36 72 181 346 323 610 141 264 280 524 309 578 29 54 50 105 47 113 -5 12 -73 14 -439 14 -331 0 -437 -3 -450 -12z M8839 6962 c-42 -20 -114 -55 -160 -76 -152 -71 -473 -226 -529 -256 l-55 -29 -9 -318 c-5 -180 -5 -886 0 -1618 l9 -1300 420 0 420 0 0 1814 c0 1201 -3 1815 -10 1817 -5 1 -44 -14 -86 -34z M5983 6518 c-5 -7 -26 -44 -45 -83 -20 -38 -106 -200 -191 -359 -86 -158 -159 -297 -162 -307 -6 -17 98 -224 285 -574 15 -27 57 -109 94 -182 36 -72 74 -141 84 -152 17 -19 29 -20 424 -22 224 -2 410 0 414 4 3 3 -9 34 -29 69 -41 74 -313 594 -447 853 -265 515 -399 765 -410 765 -4 0 -12 -6 -17 -12z M5066 4761 c-19 -7 -101 -146 -281 -474 -76 -139 -105 -201 -97 -209 7 -7 487 -10 1571 -10 859 -1 1564 2 1567 5 4 3 -16 45 -44 94 -27 48 -74 135 -105 193 -130 249 -200 376 -215 393 -14 16 -83 17 -1196 16 -650 0 -1189 -4 -1200 -8z M6450 3977 c0 -8 15 -43 33 -78 19 -35 78 -149 132 -254 54 -104 101 -194 105 -200 9 -12 97 -182 323 -620 206 -401 225 -435 251 -444 12 -4 227 -5 479 -3 l457 4 -86 167 c-124 237 -179 341 -244 461 -31 58 -85 159 -120 225 -34 66 -79 152 -100 190 -21 39 -75 142 -120 230 -46 87 -104 195 -130 240 l-46 80 -49 6 c-28 3 -238 7 -467 8 -355 2 -418 0 -418 -12z" fill="currentColor" color="var(--text-secondary)"/>
                </g>
              </svg>
            </a>

          </div>

          <div className="footer-suite-tag">A VASEY/AI Production</div>
          <div className="footer-app-tag">SafariServe v2.0 &middot; Intelligent URL Relay Utility</div>
          <div className="footer-copyright">
            &copy; 2026 <a href="https://vaseymultimedia.com" target="_blank" rel="noopener">VASEY Multimedia</a>. All rights reserved.<br/>
            Designed &amp; engineered by <a href="https://vasey.ai" target="_blank" rel="noopener">VASEY/AI</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
