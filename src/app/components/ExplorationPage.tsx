import { useEffect, useMemo, useRef, useState } from "react";
import { EXPLORATIONS, explorationAsset } from "./explorationsData";
import { useMedia } from "./Explorations";

const MONO = "'JetBrains Mono', monospace";
const PIXEL = "'Press Start 2P', monospace";
const BODY = "Inter, sans-serif";

/* ---------- Spotify embed (iFrame API — no key, no login on our side) ---------- */
type SpotifyController = {
  loadUri: (uri: string) => void;
  play: () => void;
  destroy: () => void;
  addListener: (ev: string, cb: (e: { data: { isPaused: boolean } }) => void) => void;
};
type SpotifyIFrameAPI = {
  createController: (el: HTMLElement, opts: { uri: string; width?: string | number; height?: number }, cb: (c: SpotifyController) => void) => void;
};
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void;
  }
}
let spotifyApi: Promise<SpotifyIFrameAPI> | null = null;
function loadSpotifyApi() {
  spotifyApi ??= new Promise((resolve) => {
    window.onSpotifyIframeApiReady = resolve;
    const s = document.createElement("script");
    s.src = "https://open.spotify.com/embed/iframe-api/v1";
    s.async = true;
    document.body.appendChild(s);
  });
  return spotifyApi;
}

const hasWebGL2 = () => {
  try { return !!document.createElement("canvas").getContext("webgl2"); } catch { return false; }
};

export function ExplorationPage({ slug, onClose }: { slug: string; onClose: () => void }) {
  const item = EXPLORATIONS.find((e) => e.slug === slug) ?? EXPLORATIONS[0];
  const mobile = useMedia("(max-width: 767px)");
  const live = useMemo(hasWebGL2, []);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const playerHost = useRef<HTMLDivElement>(null);
  const controller = useRef<SpotifyController | null>(null);
  const stage = useRef<HTMLDivElement>(null);

  // Escape closes (unless the visual is fullscreen — Escape exits that first)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && !document.fullscreenElement) onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // A fresh Spotify player per track. Switching tracks inside one player navigates its
  // iframe, which adds browser-history entries (Back would step through tracks instead
  // of closing the page); a new iframe adds none.
  const mountId = useRef(0);
  const mountPlayer = (i: number, autoplay: boolean) => {
    const host = playerHost.current;
    if (!host) return;
    const id = ++mountId.current;
    controller.current?.destroy();
    controller.current = null;
    host.innerHTML = "";
    setPlayerReady(false);
    setPaused(true);
    const node = document.createElement("div");
    host.appendChild(node);
    loadSpotifyApi().then((api) => {
      if (id !== mountId.current) return;
      api.createController(node, { uri: `spotify:track:${item.songs[i].spotifyId}`, width: "100%", height: 152 }, (c) => {
        if (id !== mountId.current) { c.destroy(); return; }
        controller.current = c;
        c.addListener("ready", () => { setPlayerReady(true); if (autoplay) c.play(); });
        c.addListener("playback_update", (e) => setPaused(e.data.isPaused));
      });
    });
  };

  useEffect(() => {
    setCurrent(0);
    mountPlayer(0, false);
    const host = playerHost.current;
    return () => {
      mountId.current++;
      controller.current?.destroy();
      controller.current = null;
      if (host) host.innerHTML = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const pick = (i: number) => {
    if (i === current && controller.current) { controller.current.play(); return; }
    setCurrent(i);
    mountPlayer(i, true);
  };

  const fullscreen = () => {
    const el = stage.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.().catch(() => {});
  };

  const song = item.songs[current];
  const ytm = `https://music.youtube.com/search?q=${encodeURIComponent(`${song.title} ${song.artist}`)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[110] bg-[#050407] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden animate-[explorePageIn_260ms_ease-out]"
    >
      {/* ---- Song list (left on desktop, below the visual on phones) ---- */}
      <aside className="order-2 md:order-1 md:w-[380px] md:shrink-0 bg-[#0a0a0b] md:border-r border-[rgba(244,242,240,0.08)] flex flex-col md:overflow-y-auto [scrollbar-width:thin]">
        <div className="hidden md:flex p-[20px] pb-0">
          <BackButton onClick={onClose} />
        </div>

        <div className="flex flex-col gap-[14px] p-[20px]">
          <span className="text-[9.5px] tracking-[1.5px]" style={{ fontFamily: MONO, fontWeight: 600, color: item.accent }}>
            {item.kind} · {item.year}
          </span>
          <h2 className="text-[#f4f2f0] text-[clamp(16px,1.6vw,20px)] leading-[1.4]" style={{ fontFamily: PIXEL }}>
            {item.title.toUpperCase()}
          </h2>
          <p className="text-[#9a9ca1] text-[14px]" style={{ fontFamily: BODY, lineHeight: 1.6 }}>
            {item.concept}
          </p>
        </div>

        <div className="flex flex-col gap-[6px] px-[12px]">
          <div className="flex items-center justify-between px-[8px] pb-[6px]">
            <span className="text-[#f4f2f0] text-[10px] tracking-[1.5px]" style={{ fontFamily: MONO, fontWeight: 600 }}>
              PAIR IT WITH
            </span>
            <span className="text-[#9a9ca1] text-[9.5px] tracking-[1px]" style={{ fontFamily: MONO }}>
              {item.songs.length} TRACKS
            </span>
          </div>
          {item.songs.map((s, i) => {
            const on = i === current;
            return (
              <button
                key={s.spotifyId}
                onClick={() => pick(i)}
                aria-current={on}
                className={`group flex items-center gap-[12px] rounded-[12px] p-[8px] text-left transition-colors ${on ? "bg-[#18171c]" : "hover:bg-[#141416]"}`}
                style={{ boxShadow: on ? `inset 0 0 0 1px ${item.accent}55` : "none" }}
              >
                <span className="text-[10px] w-[18px] text-center shrink-0" style={{ fontFamily: MONO, color: on ? item.accent : "#5d5f64" }}>
                  {on && !paused ? <Bars color={item.accent} /> : String(i + 1).padStart(2, "0")}
                </span>
                <img src={s.cover} alt="" loading="lazy" className="size-[44px] rounded-[6px] object-cover shrink-0" />
                <span className="flex flex-col min-w-0 gap-[2px]">
                  <span className="text-[#f4f2f0] text-[14px] truncate" style={{ fontFamily: BODY, fontWeight: 500 }}>{s.title}</span>
                  <span className="text-[#9a9ca1] text-[12px] truncate" style={{ fontFamily: BODY }}>{s.artist}</span>
                  <span className="text-[#6e7076] text-[11px] truncate" style={{ fontFamily: BODY }}>{s.note}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Player + outbound links, pinned under the list */}
        <div className="mt-auto flex flex-col gap-[10px] p-[20px]">
          <div className="relative rounded-[12px] overflow-hidden bg-[#141416] min-h-[152px]">
            <div ref={playerHost} />
            {!playerReady && (
              <span className="absolute inset-0 flex items-center justify-center text-[#5d5f64] text-[10px] tracking-[1.5px]" style={{ fontFamily: MONO }}>
                LOADING PLAYER…
              </span>
            )}
          </div>
          <p className="text-[#6e7076] text-[11px]" style={{ fontFamily: BODY, lineHeight: 1.5 }}>
            Logged into Spotify in this browser? You'll hear full tracks. Otherwise it plays 30-second previews.
          </p>
          <div className="flex gap-[8px]">
            <OutLink href={`https://open.spotify.com/track/${song.spotifyId}`} label="OPEN IN SPOTIFY" />
            <OutLink href={ytm} label="YOUTUBE MUSIC" />
          </div>
        </div>
      </aside>

      {/* ---- The visual ---- */}
      <div ref={stage} className="order-1 md:order-2 relative flex-1 min-h-[58vh] md:min-h-0 bg-black shrink-0 md:shrink">
        {live ? (
          <iframe
            key={item.slug}
            src={`${explorationAsset(item.slug, "index.html")}?dpr=${mobile ? 0.75 : 1}`}
            title={`${item.title} visualizer`}
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <video
            src={explorationAsset(item.slug, "preview.mp4")}
            poster={explorationAsset(item.slug, "poster.jpg")}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 size-full object-cover"
          />
        )}

        <div className="absolute top-[16px] inset-x-[16px] flex items-center justify-between pointer-events-none">
          <div className="md:hidden pointer-events-auto">
            <BackButton onClick={onClose} />
          </div>
          <div className="ml-auto flex gap-[8px] pointer-events-auto">
            <IconButton onClick={fullscreen} label="Toggle fullscreen">⛶</IconButton>
            <IconButton onClick={onClose} label="Close">✕</IconButton>
          </div>
        </div>
        <span
          className="absolute bottom-[14px] right-[16px] text-[#f4f2f0]/40 text-[9px] tracking-[1.5px] pointer-events-none"
          style={{ fontFamily: MONO, fontWeight: 600 }}
        >
          {live ? "LIVE · RENDERED IN YOUR BROWSER" : "30S LOOP"}
        </span>
      </div>

      <style>{`
        @keyframes explorePageIn { from { opacity: 0; transform: scale(0.985); } to { opacity: 1; transform: scale(1); } }
        @keyframes eqBar { 0%,100% { transform: scaleY(0.35); } 50% { transform: scaleY(1); } }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[explorePageIn_260ms_ease-out\\] { animation: none; }
          .eq-bar { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-[10px] bg-[#141416]/90 backdrop-blur border border-[rgba(244,242,240,0.12)] px-[12px] py-[8px] text-[#f4f2f0] text-[10px] tracking-[1.5px] hover:bg-[#ed1c24] hover:text-[#0a0a0b] hover:border-transparent transition-colors"
      style={{ fontFamily: MONO, fontWeight: 600 }}
    >
      ← EXPLORATIONS
    </button>
  );
}

function IconButton({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="size-[36px] rounded-[10px] bg-[#0a0a0b]/70 backdrop-blur text-[#f4f2f0] hover:bg-[#ed1c24] hover:text-[#0a0a0b] transition-colors flex items-center justify-center"
      style={{ fontFamily: MONO, fontWeight: 600, fontSize: "14px" }}
    >
      {children}
    </button>
  );
}

function OutLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex-1 text-center rounded-[8px] bg-[#141416] hover:bg-[#1d1d20] transition-colors px-[10px] py-[10px] text-[#9a9ca1] hover:text-[#f4f2f0] text-[9.5px] tracking-[1.2px]"
      style={{ fontFamily: MONO, fontWeight: 600 }}
    >
      {label} ↗
    </a>
  );
}

function Bars({ color }: { color: string }) {
  return (
    <span className="inline-flex items-end gap-[2px] h-[12px]" aria-label="Playing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="eq-bar w-[3px] h-full origin-bottom rounded-[1px]"
          style={{ background: color, animation: `eqBar 0.9s ease-in-out ${i * 0.15}s infinite` }}
        />
      ))}
    </span>
  );
}
