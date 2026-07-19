import { useEffect, useRef, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Work } from "./components/Work";
import { Archives } from "./components/Archives";
import { Contact, Footer } from "./components/Contact";
import { MobileNav } from "./components/MobileNav";
import { AboutPage } from "./components/AboutPage";
import { CaseStudy } from "./components/CaseStudy";

const SECTIONS = ["about", "work", "archives", "contact"];

export default function App() {
  const [active, setActive] = useState("about");
  const [aboutOpen, setAboutOpen] = useState(false);
  const [caseOpen, setCaseOpen] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    return () => observer.disconnect();
  }, []);

  const navigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-[#0a0a0b] h-screen w-full flex overflow-hidden">
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
          <Archives />
          <Contact />
          <Footer />
        </div>
      </main>

      {aboutOpen && <AboutPage onClose={() => setAboutOpen(false)} />}
      {caseOpen && (
        <CaseStudy id={caseOpen} onOpen={(id) => setCaseOpen(id)} onClose={() => setCaseOpen(null)} />
      )}

      {/* Subtle film-grain over the entire site */}
      <div className="noise-overlay" aria-hidden="true" />
    </div>
  );
}
