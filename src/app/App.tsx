import { useEffect, useRef, useState } from "react";
import { Logo } from "./components/Logo";
import { Sidebar } from "./components/Sidebar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Work } from "./components/Work";
import { Contact, Footer } from "./components/Contact";
import { MobileNav } from "./components/MobileNav";
import { AboutPage } from "./components/AboutPage";
import { CaseStudy } from "./components/CaseStudy";
import { Explorations } from "./components/Explorations";
import { ExplorationPage } from "./components/ExplorationPage";

const SECTIONS = ["about", "work", "explorations", "contact"];

// Visualizer pages get a shareable link that works on any static host: #/explorations/<slug>
const EXPLORE_HASH = /^#\/explorations\/([\w-]+)$/;
const exploreFromHash = () => window.location.hash.match(EXPLORE_HASH)?.[1] ?? null;

export default function App() {
  const [active, setActive] = useState("about");
  const [aboutOpen, setAboutOpen] = useState(false);
  const [caseOpen, setCaseOpen] = useState<string | null>(null);
  const [exploreOpen, setExploreOpen] = useState<string | null>(exploreFromHash);
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Loader timer
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(() => setLoading(false), 500);
    }, 3000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { root: scrollRef.current, rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // back/forward buttons and pasted links open or close the visualizer page
  useEffect(() => {
    const sync = () => {
      const slug = exploreFromHash();
      if (!slug) openedAt.current = null;
      setExploreOpen(slug);
    };
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  // Leaving a visualizer page (back button, close, Escape, browser Back) always lands on
  // the Explorations section, including when the page was opened from a shared link.
  const wasExploring = useRef(exploreOpen !== null);
  useEffect(() => {
    if (wasExploring.current && !exploreOpen) {
      // the page has already unmounted here; jump (not smooth-scroll) while it's out of sight
      document.getElementById("explorations")?.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
    }
    wasExploring.current = exploreOpen !== null;
  }, [exploreOpen]);

  // History length right after opening. Embedded players (Spotify) can add history entries
  // of their own, so closing jumps back past all of them rather than a single step.
  const openedAt = useRef<number | null>(null);
  const openExploration = (slug: string) => {
    window.history.pushState({ exploration: slug }, "", `#/explorations/${slug}`);
    openedAt.current = window.history.length;
    setExploreOpen(slug);
  };
  const closeExploration = () => {
    if (openedAt.current !== null) {
      const steps = Math.max(1, window.history.length - openedAt.current + 1);
      openedAt.current = null;
      window.history.go(-steps);
    } else {
      // arrived via a shared link: just drop the hash
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      setExploreOpen(null);
    }
  };

  const navigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-[#0a0a0b] h-screen w-full flex overflow-hidden">
      {/* Loader */}
      {loading && (
        <div
          className={`fixed inset-0 z-[999] flex items-center justify-center bg-[#0a0a0b] transition-opacity duration-500 ease-in-out ${
            fade ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="animate-pulse">
            <Logo size={100} />
          </div>
        </div>
      )}

      {/* Fixed sidebar */}
      <aside className="hidden md:block w-[240px] shrink-0 h-full">
        <Sidebar active={active} onNavigate={navigate} />
      </aside>

      {/* Scrollable content */}
      <main
        ref={scrollRef}
        className="flex-1 h-full overflow-y-auto scroll-smooth"
      >
        <MobileNav onNavigate={navigate} />
        <div className="flex flex-col gap-[20px] p-[20px]">
          <Hero />
          <About onOpenAbout={() => setAboutOpen(true)} />
          <Work onOpenCase={(id) => setCaseOpen(id)} />
          <Explorations onOpen={openExploration} />
          <Contact />
          <Footer />
        </div>
      </main>

      {aboutOpen && <AboutPage onClose={() => setAboutOpen(false)} />}
      {caseOpen && (
        <CaseStudy id={caseOpen} onOpen={(id) => setCaseOpen(id)} onClose={() => setCaseOpen(null)} />
      )}

      {exploreOpen && <ExplorationPage slug={exploreOpen} onClose={closeExploration} />}

      {/* Subtle film-grain over the entire site */}
      <div className="noise-overlay" aria-hidden="true" />
    </div>
  );
}
