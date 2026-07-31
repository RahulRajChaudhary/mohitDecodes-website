"use client";

export function getColors(theme) {
  return theme === "light"
    ? {
        bg: "#fbfaf9", surface: "rgba(17,17,20,0.04)", surfaceHover: "rgba(17,17,20,0.07)",
        border: "rgba(17,17,20,0.1)", text: "#111114", textMuted: "rgba(17,17,20,0.64)",
        textFaint: "rgba(17,17,20,0.42)", accent: "#7c3aed", accentBright: "#4f46e5",
        accentSoft: "#7c3aed", navBg: "rgba(251,250,249,0.78)", orbitStroke: "rgba(17,17,20,0.1)",
      }
    : {
        bg: "#050506", surface: "rgba(255,255,255,0.04)", surfaceHover: "rgba(255,255,255,0.07)",
        border: "rgba(255,255,255,0.09)", text: "#f4f4f6", textMuted: "rgba(244,244,246,0.64)",
        textFaint: "rgba(244,244,246,0.42)", accent: "#8b5cf6", accentBright: "#6366f1",
        accentSoft: "#c4b5fd", navBg: "rgba(5,5,6,0.72)", orbitStroke: "rgba(255,255,255,0.09)",
      };
}

// background stars, scattered
const PARTICLES = [
  [300, 220, 2, "accentSoft"], [1640, 180, 1.6, "#ffffff"], [1780, 380, 2, "accentSoft"],
  [140, 420, 1.6, "#ffffff"], [960, 120, 1.6, "#ffffff"], [700, 230, 1.4, "accentSoft"],
  [1220, 260, 1.4, "accentSoft"],
];

// [cx, cy, r, opacity, pulseDurationSec, pulseDelaySec] - sparkle field fanning up from the light source
const SPARKLES = [
  [1238,900,1.1,0.59,31,9.5],
  [1661,552,1.2,0.43,34,4.3],
  [754,710,1.1,0.67,24,8.0],
  [532,295,1.3,0.56,27,20.0],
  [1744,1018,2.2,0.37,27,3.8],
  [740,311,1.9,0.36,24,12.6],
  [1605,542,1.3,0.51,21,4.6],
  [1606,338,1.3,0.69,28,21.5],
  [362,416,1.5,0.50,27,10.6],
  [867,556,1.6,0.51,27,9.9],
  [666,295,2.2,0.52,34,2.0],
  [1793,675,2.0,0.54,32,10.2],
  [806,730,1.1,0.54,36,8.3],
  [928,412,1.9,0.52,30,0.6],
  [930,956,1.2,0.37,28,9.8],
  [1039,868,1.0,0.36,31,20.4],
  [679,1033,1.8,0.38,24,20.4],
  [1429,911,2.1,0.59,21,21.7],
  [1744,225,1.1,0.61,35,10.0],
  [194,706,2.2,0.65,23,16.2],
  [471,674,1.8,0.39,35,20.3],
  [1303,444,1.7,0.41,21,23.4],
  [926,997,3.6,0.80,18,0.0],
  [893,913,3.3,0.72,19,0.7],
  [859,830,2.9,0.65,20,1.4],
  [825,746,2.6,0.57,21,2.1],
  [791,663,2.2,0.49,22,2.8],
  [758,579,1.9,0.41,23,3.5],
  [724,496,1.5,0.34,24,4.2],
  [690,412,1.2,0.26,25,4.9],
  [657,329,0.8,0.18,18,5.6],
  [940,992,3.6,0.80,19,6.3],
  [920,905,3.3,0.72,20,7.0],
  [899,817,2.9,0.65,21,7.7],
  [879,729,2.6,0.57,22,8.4],
  [859,642,2.2,0.49,23,9.1],
  [839,554,1.9,0.41,24,9.8],
  [818,466,1.5,0.34,25,10.5],
  [798,378,1.2,0.26,18,11.2],
  [778,291,0.8,0.18,19,11.9],
  [953,990,3.6,0.80,20,12.6],
  [946,901,3.3,0.72,21,13.3],
  [939,811,2.9,0.65,22,14.0],
  [932,721,2.6,0.57,23,14.7],
  [925,631,2.2,0.49,24,15.4],
  [918,542,1.9,0.41,25,16.1],
  [911,452,1.5,0.34,18,16.8],
  [904,362,1.2,0.26,19,17.5],
  [896,272,0.8,0.18,20,18.2],
  [967,990,3.6,0.80,21,18.9],
  [974,901,3.3,0.72,22,19.6],
  [981,811,2.9,0.65,23,20.3],
  [988,721,2.6,0.57,24,21.0],
  [995,631,2.2,0.49,25,21.7],
  [1002,542,1.9,0.41,18,22.4],
  [1009,452,1.5,0.34,19,23.1],
  [1016,362,1.2,0.26,20,23.8],
  [1024,272,0.8,0.18,21,24.5],
  [980,992,3.6,0.80,22,25.2],
  [1000,905,3.3,0.72,23,25.9],
  [1021,817,2.9,0.65,24,26.6],
  [1041,729,2.6,0.57,25,27.3],
  [1061,642,2.2,0.49,18,28.0],
  [1081,554,1.9,0.41,19,28.7],
  [1102,466,1.5,0.34,20,29.4],
  [1122,378,1.2,0.26,21,30.1],
  [1142,291,0.8,0.18,22,30.8],
  [994,997,3.6,0.80,23,31.5],
  [1027,913,3.3,0.72,24,32.2],
  [1061,830,2.9,0.65,25,32.9],
  [1095,746,2.6,0.57,18,33.6],
  [1129,663,2.2,0.49,19,34.3],
  [1162,579,1.9,0.41,20,35.0],
  [1196,496,1.5,0.34,21,35.7],
  [1230,412,1.2,0.26,22,36.4],
  [1263,329,0.8,0.18,23,37.1]
];

const KEYFRAMES = `
  @keyframes om-float { 0%, 100% { transform: translateY(0); opacity: .35; } 50% { transform: translateY(-14px); opacity: .9; } }
  @keyframes om-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .4; transform: scale(.7); } }
  @keyframes om-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes om-spin-rev { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
  @keyframes om-sway { from { transform: rotate(-13deg); } to { transform: rotate(13deg); } }
  @keyframes om-sway-rev { from { transform: rotate(13deg); } to { transform: rotate(-13deg); } }
`;

/**
 * Decorative hero background: bottom-anchored "sunrise" light bloom, a thin
 * upward sparkle field, and two orbit rings carrying 4 swaying tech-icon nodes.
 * Wrap your hero copy as children - they render above the effects (z-index 10).
 */
export default function HeroBackground({ theme = "dark", children, className = "" }) {
  const c = getColors(theme);
  const vars = {
    "--bg": c.bg, "--accent": c.accent, "--accentBright": c.accentBright,
    "--border": c.border, "--orbitStroke": c.orbitStroke,
  };

  return (
    <div
      className={`relative min-h-fit lg:min-h-screen overflow-hidden ${className}`}
      style={{ ...vars, background: "var(--bg)", fontFamily: "'Inter', sans-serif", transition: "background .4s ease" }}
    >
      <style>{KEYFRAMES}</style>

      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
          background: "radial-gradient(circle at 50% 100%, transparent 34%, var(--bg) 92%)",
          opacity: 0.55,
        }}
      />

      <div style={{ position: "absolute", left: "50%", bottom: "-30vh", width: "160vw", height: "118vh", marginLeft: "-75vw", background: "radial-gradient(ellipse at 50% 100%, var(--accent) 0%, transparent 64%)", opacity: 0.42, filter: "blur(48px)", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ position: "absolute", left: "50%", bottom: "-16vh", width: "104vw", height: "86vh", marginLeft: "-48vw", background: "radial-gradient(ellipse at 50% 100%, var(--accentBright) 0%, transparent 66%)", opacity: 0.4, filter: "blur(50px)", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ position: "absolute", left: "50%", bottom: "-8vh", width: "70vw", height: "58vh", marginLeft: "-31vw", background: "radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.34) 0%, var(--accent) 36%, transparent 76%)", opacity: 0.5, filter: "blur(60px)", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ position: "absolute", left: "50%", bottom: "-6vh", width: "56vw", height: "104vh", marginLeft: "-28vw", background: "radial-gradient(ellipse 42% 82% at 50% 100%, rgba(139,92,246,0.5) 0%, rgba(139,92,246,0.14) 45%, transparent 78%)", opacity: 0.5, filter: "blur(64px)", pointerEvents: "none", zIndex: 1 }} />

      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMax slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}
      >
        <defs>
          <radialGradient id="om-glow-purple" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="om-sun-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <filter id="om-sparkle-glow" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="2.4" result="sg" />
            <feMerge><feMergeNode in="sg" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="om-orbit-blur"><feGaussianBlur stdDeviation="0.6" /></filter>
          <filter id="om-node-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="6" result="om-blur" />
            <feMerge><feMergeNode in="om-blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <g opacity={0.5}>
          {PARTICLES.map(([cx, cy, r, fill], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill={fill === "accentSoft" ? c.accentSoft : fill} />
          ))}
        </g>

        <g filter="url(#om-sparkle-glow)">
          {SPARKLES.map(([cx, cy, r, o, dur, delay], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="#ffffff" opacity={o}
              style={{ animation: `om-pulse ${dur}s ease-in-out infinite`, animationDelay: `${delay}s` }} />
          ))}
        </g>

        <g>
          <circle cx="960" cy="1550" r="850" fill="none" stroke="var(--orbitStroke)" strokeWidth="1" filter="url(#om-orbit-blur)" />
          <circle cx="960" cy="1550" r="1050" fill="none" stroke="var(--orbitStroke)" strokeWidth="1" filter="url(#om-orbit-blur)" />
        </g>

        <g>
          <g style={{ animation: "om-spin 40s linear infinite", transformOrigin: "960px 1550px" }}>
            <g style={{ animation: "om-spin-rev 40s linear infinite", transformOrigin: "329px 981px" }}>
              <g transform="translate(329,981)">
                <circle r="34" fill="rgba(0,0,0,0.18)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" filter="url(#om-node-glow)" />
                <ellipse cx="0" cy="-5" rx="8" ry="3" fill="none" stroke="var(--accent)" strokeWidth="1.6" />
                <path d="M-8,-5 v7 c0,1.7 3.6,3 8,3 s8,-1.3 8,-3 v-7" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" />
              </g>
            </g>
            <g style={{ animation: "om-spin-rev 40s linear infinite", transformOrigin: "1591px 981px" }}>
              <g transform="translate(1591,981)">
                <circle r="34" fill="rgba(0,0,0,0.18)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" filter="url(#om-node-glow)" />
                <rect x="-10" y="-9" width="20" height="18" rx="2" fill="none" stroke="var(--accent)" strokeWidth="1.6" />
                <polyline points="-5,-3 -1,0 -5,3" fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="1" y1="4" x2="6" y2="4" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
              </g>
            </g>
          </g>

          <g style={{ animation: "om-spin 45s linear infinite", transformOrigin: "960px 1550px" }}>
            <g style={{ animation: "om-spin-rev 45s linear infinite", transformOrigin: "257px 770px" }}>
              <g transform="translate(257,770)">
                <circle r="34" fill="rgba(0,0,0,0.18)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" filter="url(#om-node-glow)" />
                <path d="M0,-9 L2.4,-2.4 L9,0 L2.4,2.4 L0,9 L-2.4,2.4 L-9,0 L-2.4,-2.4 Z" fill="var(--accent)" />
              </g>
            </g>
            <g style={{ animation: "om-spin-rev 45s linear infinite", transformOrigin: "1663px 770px" }}>
              <g transform="translate(1663,770)">
                <circle r="34" fill="rgba(0,0,0,0.18)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" filter="url(#om-node-glow)" />
                <circle cx="-6" cy="-7" r="2.2" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
                <circle cx="-6" cy="7" r="2.2" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
                <circle cx="7" cy="0" r="2.2" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
                <path d="M-6,-4.8 v9.6" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
                <path d="M-6,0 h8 a5,5 0 0 0 5,-4.4" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
              </g>
            </g>
          </g>
        </g>
      </svg>

      <div
        aria-hidden="true"
        style={{
          position: "absolute", left: 0, right: 0, bottom: 0, height: "45%", minHeight: 200,
          background: "linear-gradient(to bottom, transparent 0%, transparent 55%, var(--bg) 96%)",
          pointerEvents: "none", zIndex: 2,
        }}
      />

      <div style={{ position: "relative", zIndex: 10 }}>{children}</div>
    </div>
  );
}
