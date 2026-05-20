import { useCallback, useEffect, useMemo, useState } from "react";
import { Maximize2, Menu, Minimize2, X } from "lucide-react";

const colors = {
  navy: "#0A1628",
  teal: "#00A88E",
  warm: "#FAF8F5",
  sand: "#F0ECE3",
  ink: "#1E293B",
  muted: "#64748B"
};

type Theme = "navy" | "warm" | "sand";
type Visual = "brandTransition" | "katanaPrinciple";
type Slide = {
  section: string;
  title: string;
  theme?: Theme;
  eyebrow?: string;
  kicker?: string;
  body?: string;
  bullets?: string[];
  columns?: { title: string; text: string }[];
  visual?: Visual;
  visualSide?: "left" | "right";
  menti?: { label: string; question: string; options: string[] };
};

const slides: Slide[] = [
  { section: "Opening", title: "TBDC Town Hall, May", theme: "navy", eyebrow: "May 2026 Town Hall", kicker: "Moving Companies Forward", body: "TBDC Town Hall, May" },
  { section: "Opening", title: "Welcome", theme: "warm", eyebrow: "Welcome", kicker: "A big moment for the organization", bullets: ["Big moment for the organization", "Rebrand, Sprint Week, and how we operate", "Today is about getting clear on what matters most"] },
  { section: "Opening", title: "Workiversaries and Recognition", theme: "sand", eyebrow: "Recognition", kicker: "Celebrating the people moving TBDC forward", columns: [{ title: "Team milestones", text: "Pause to recognize workiversaries and team contributions." }, { title: "New hires", text: "Welcome new team members into the room and into the rhythm." }, { title: "Acknowledgements", text: "Thank the people who helped carry the rebrand, Sprint Week planning, and daily execution." }] },
  { section: "Purpose / North Star", title: "Why We're Here", theme: "navy", eyebrow: "Purpose", kicker: "The work is getting sharper", bullets: ["Town Hall is about alignment, not just updates", "We are connecting brand, operations, founders, and team behaviors", "Everyone should leave knowing what matters next and how to contribute"] },
  { section: "Purpose / North Star", title: "North Star and What It Means", theme: "warm", eyebrow: "North Star", kicker: "Moving Companies Forward", bullets: ["We help companies move forward with precision, growth, and community", "Our work should make the founder experience clearer, faster, and more valuable", "The standard is practical excellence: thoughtful, prepared, responsive, and accountable"] },
  { section: "Purpose / North Star", title: "What This Means in Practice and Focus", theme: "sand", eyebrow: "Practice and Focus", kicker: "Clear priorities, visible progress", columns: [{ title: "Sales", text: "Sharper pipeline visibility, clearer handoffs, and stronger founder conversations." }, { title: "Programming", text: "High-quality delivery, founder readiness, and practical support that matches the stage." }, { title: "Revenue", text: "Funding readiness, partner value, and measurable conversion opportunities." }, { title: "Marketing", text: "Consistent story, stronger brand presence, and clear communications across channels." }] },
  { section: "Purpose / North Star", title: "How We Track and What's Coming", theme: "warm", eyebrow: "Tracking", kicker: "The next phase needs better visibility", bullets: ["We are moving toward clearer goals, cleaner reporting, and stronger accountability", "Leadership will continue refining what we track and how we talk about progress", "Expect more visibility into quarterly goals, performance conversations, and team-level priorities"] },
  { section: "Purpose / North Star", title: "Operational Awareness and Cyber Safety", theme: "navy", eyebrow: "Operational Awareness", kicker: "Cyber safety is part of how we protect the work", bullets: ["Be alert with links, files, approvals, passwords, and unexpected requests", "Slow down when something feels urgent, unusual, or outside the normal process", "Verify before acting, especially around payments, credentials, founder data, and partner information", "Raise concerns early. It is always better to ask than to guess"] },
  { section: "Rebrand", title: "Our New Brand is Live", theme: "navy", eyebrow: "Rebrand", kicker: "A sharper expression of who we are", body: "The new TBDC brand and website are live. This is more than a visual refresh; it is a clearer signal of the organization we are becoming.", visual: "brandTransition", visualSide: "right" },
  { section: "Rebrand", title: "What Changed", theme: "warm", eyebrow: "What Changed", kicker: "Brand, website, message, and experience", bullets: ["New visual identity and refreshed brand system", "Updated website experience and clearer messaging", "Stronger founder-facing language around what TBDC makes possible", "A more consistent look, voice, and standard across materials"] },
  { section: "Rebrand", title: "The Katana Principle", theme: "navy", eyebrow: "New Symbol", kicker: "The Katana Principle.", body: "The katana is one blade, perfected through intentional design without excess. We help you build companies with clarity and structure - sharpened for your market to scale with precision.", bullets: ["Our programs forge deep connections with proven operators, enterprise buyers, institutional investors, and government partners.", "Our guiding principle: Build with purpose. Lead with clarity. Structure for scale."], visual: "katanaPrinciple", visualSide: "right" },
  { section: "Rebrand", title: "How We Demonstrated These Core Values as a Team", theme: "sand", eyebrow: "Dan", kicker: "PRECISION / GROWTH / COMMUNITY", columns: [{ title: "Precision", text: "A fast, detailed, cross-functional push with careful decisions and high standards." }, { title: "Growth", text: "A brand refresh that positions TBDC for the next chapter and a stronger path to progress." }, { title: "Community", text: "Marketing, leadership, and cross-team collaboration working together with intention." }] },
  { section: "Rebrand", title: "What It Took", theme: "navy", eyebrow: "Dan", kicker: "What it took", bullets: ["Within 30 days, a whole new brand refresh and website", "Cross-functional collaboration paired with practical AI-enabled workflows", "Website and messaging rebuild", "This is how we intend to also serve our founders: with intention"] },
  { section: "Sprint Week", title: "Sprint Week Overview", theme: "navy", eyebrow: "Sprint Week", kicker: "A high-touch week for founders, partners, and our team", body: "Sprint Week is one of the clearest moments where our operating standard becomes visible." },
  { section: "Sprint Week", title: "Who Is Coming", theme: "warm", eyebrow: "Founders and Partners", kicker: "A full room, with high expectations", bullets: ["Founders from across the portfolio", "Mentors, partners, speakers, and invited guests", "TBDC team members supporting delivery, experience, and logistics", "Company logos remain placeholders until final assets are supplied"] },
  { section: "Sprint Week", title: "Sprint Week Timing", theme: "sand", eyebrow: "Timing", kicker: "Monday, June 2 to Friday, June 6", bullets: ["Monday sets the tone for the full week", "Tuesday through Thursday carry the deepest founder support and programming", "Friday is about closeout, momentum, and follow-through"] },
  { section: "Sprint Week", title: "Weekly Flow", theme: "warm", eyebrow: "Flow", kicker: "Every day needs rhythm", columns: [{ title: "Mornings", text: "Arrival, welcome, room readiness, founder orientation, and setup." }, { title: "Afternoons", text: "Programming, meetings, support, partner touchpoints, and issue resolution." }, { title: "Evenings", text: "Reset, recap, preparation, and communication for the next day." }] },
  { section: "Sprint Week", title: "What Success Looks Like", theme: "navy", eyebrow: "Success", kicker: "Everyone sharp. Every moment counts.", bullets: ["Founders feel expected, welcomed, guided, and supported", "Rooms, materials, timing, and transitions feel intentional", "The team knows where to be, what to do, and who to escalate to", "Piyush Goyal, India's Minister of Commerce and Industry, may visit during Sprint Week; keep founder-facing spaces polished, prepared, and on standard.", "Issues are handled quickly and calmly"] },
  { section: "Sprint Week", title: "Team Expectations and Early Week Focus", theme: "sand", eyebrow: "Expectations", kicker: "Prepared, visible, responsive", bullets: ["Be early and ready before founders arrive", "Know the schedule, your role, and the escalation path", "Stay visible and approachable throughout the day", "Own the small details: food, coffee, water, facilities, room navigation, and founder guidance"] },
  { section: "Sprint Week", title: "White Glove Experience", theme: "warm", eyebrow: "White Glove", kicker: "The details are the experience", bullets: ["Founder questions should be answered with care and speed", "Guests should never feel lost or unsure where to go", "Support should feel proactive, not reactive", "Hospitality, logistics, and professionalism all matter"] },
  { section: "Sprint Week", title: "Communication", theme: "navy", eyebrow: "Communication", kicker: "WhatsApp is the primary channel", bullets: ["Use WhatsApp for live Sprint Week coordination", "Keep updates short, clear, and useful", "Escalate quickly when an issue affects founders, timing, rooms, partners, or safety", "Close the loop when something is resolved"] },
  { section: "Sprint Week", title: "Roles, Support, and Visibility", theme: "sand", eyebrow: "Roles", kicker: "Know where you fit", bullets: ["Volunteer schedule and coverage will guide daily assignments", "Support roles will be visible before the week begins", "Wear branded apparel where requested", "The team should be easy for founders and guests to identify"] },
  { section: "Sprint Week", title: "Final Sprint Reminder", theme: "navy", eyebrow: "Final Reminder", kicker: "Everyone sharp. Every moment counts.", body: "Sprint Week is a live expression of the brand. Precision, growth, and community need to be visible in how we show up." },
  { section: "Inside TBDC", title: "Inside TBDC Intro", theme: "warm", eyebrow: "Inside TBDC", kicker: "A quick pulse check", body: "We will use Mentimeter for the interactive questions. The deck shows the cue only; correct answers should be configured in Mentimeter." },
  { section: "Inside TBDC", title: "Mentimeter Poll 1", theme: "sand", menti: { label: "Inside TBDC Poll 1", question: "Which TBDC value connects most directly to the katana philosophy?", options: ["Precision", "Growth", "Community", "All of the above"] } },
  { section: "Inside TBDC", title: "Mentimeter Poll 2", theme: "warm", menti: { label: "Inside TBDC Poll 2", question: "What should we do when something seems urgent, unusual, or outside the normal process?", options: ["Act immediately", "Verify before acting", "Forward it widely", "Ignore it"] } },
  { section: "Inside TBDC", title: "Mentimeter Poll 3", theme: "sand", menti: { label: "Inside TBDC Poll 3", question: "What is the primary Sprint Week communication channel?", options: ["Email", "WhatsApp", "Slack", "Text messages"] } },
  { section: "Inside TBDC", title: "Mentimeter Poll 4", theme: "warm", menti: { label: "Inside TBDC Poll 4", question: "What does a white glove experience mean during Sprint Week?", options: ["Waiting for founders to ask", "Proactive, thoughtful support", "Only handling scheduled items", "Leaving logistics to others"] } },
  { section: "Inside TBDC", title: "Mentimeter Poll 5", theme: "sand", menti: { label: "Inside TBDC Poll 5", question: "What should we actively share across teams as AI adoption grows?", options: ["Workflows", "Tools", "Efficiencies", "All of the above"] } },
  { section: "Inside TBDC", title: "Anchor and What This Becomes", theme: "navy", eyebrow: "Anchor", kicker: "Inside TBDC is about shared awareness", body: "These moments help us learn the organization, reinforce what matters, and keep the team connected as we scale." },
  { section: "AI and What's Next", title: "AI and Automation", theme: "sand", eyebrow: "AI and Automation", kicker: "A growing organizational priority", bullets: ["AI adoption is now an organizational priority", "Operational efficiency: actively share workflows, tools, and efficiencies across teams", "The goal is not replacing judgment; it is increasing speed, quality, and leverage", "AI learning: build internal AI literacy together through shared practice", "BHive AI program launching in the coming months", "AI Lunch and Learn immediately following Town Hall with Nikki"] },
  { section: "AI and What's Next", title: "What's Next", theme: "warm", eyebrow: "What's Next", kicker: "June is about rollout", columns: [{ title: "Quarterly goals", text: "More visible goals, clearer reporting, and stronger follow-through." }, { title: "Performance management", text: "Continued clarity on expectations, growth, feedback, and accountability." }] },
  { section: "Close", title: "Final Message", theme: "navy", eyebrow: "Close", kicker: "Everyone sharp. Every moment counts.", body: "Thank you for the focus, care, and momentum you bring to TBDC. The next chapter will ask a lot of us, and it will be built by how we show up together." }
];

function theme(theme: Theme = "navy") {
  const dark = theme === "navy";
  return {
    background: dark ? colors.navy : theme === "sand" ? colors.sand : colors.warm,
    text: dark ? colors.warm : colors.ink,
    muted: dark ? "rgba(250,248,245,.72)" : colors.muted,
    card: dark ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.72)",
    border: dark ? "rgba(255,255,255,.18)" : "rgba(10,22,40,.12)"
  };
}

function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);
  const toggle = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen();
  }, []);
  return { isFullscreen, toggle };
}

function VisualPanel({ visual }: { visual: Visual }) {
  const image = visual === "brandTransition"
    ? { src: "/TBDC%20Brand%20Transition.png", alt: "TBDC Brand Transition" }
    : { src: "/Katana%20Principle.png", alt: "Katana Principle" };

  return (
    <div className="image-panel">
      <img className="slide-image" src={image.src} alt={image.alt} loading="eager" />
    </div>
  );
}

function MentimeterSlide({ slide }: { slide: Slide }) {
  const t = theme(slide.theme);
  const menti = slide.menti!;
  return (
    <main className="slide" style={{ background: t.background, color: t.text }}>
      <div className="slide-inner menti">
        <p className="eyebrow" style={{ color: colors.teal }}>{menti.label}</p>
        <h1>{menti.question}</h1>
        <div className="options">
          {menti.options.map((option, index) => <div className="option" style={{ borderColor: t.border, background: t.card }} key={option}><span>{String.fromCharCode(65 + index)}</span>{option}</div>)}
        </div>
        <div className="menti-cue">Go to menti.com | Code TBD</div>
      </div>
    </main>
  );
}

function StandardSlide({ slide }: { slide: Slide }) {
  const t = theme(slide.theme);
  const content = (
    <div className="copy-block">
      {slide.eyebrow && <p className="eyebrow" style={{ color: colors.teal }}>{slide.eyebrow}</p>}
      <h1>{slide.kicker || slide.title}</h1>
      {slide.body && <p className="body" style={{ color: t.muted }}>{slide.body}</p>}
      {slide.bullets && <ul className="bullets">{slide.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
      {slide.columns && <div className="cards">{slide.columns.map((item) => <article className="card" style={{ borderColor: t.border, background: t.card }} key={item.title}><h2>{item.title}</h2><p>{item.text}</p></article>)}</div>}
    </div>
  );
  return (
    <main className="slide" style={{ background: t.background, color: t.text }}>
      <div className={slide.visual ? "slide-inner two-up" : "slide-inner"}>
        {slide.visual && slide.visualSide === "left" && <VisualPanel visual={slide.visual} />}
        {content}
        {slide.visual && slide.visualSide !== "left" && <VisualPanel visual={slide.visual} />}
      </div>
    </main>
  );
}

function TableOfContents({ current, goTo }: { current: number; goTo: (index: number) => void }) {
  const sections = useMemo(() => Array.from(new Set(slides.map((slide) => slide.section))), []);
  return <aside className="toc">{sections.map((section) => <div key={section}><h3>{section}</h3>{slides.map((slide, index) => slide.section === section ? <button className={index === current ? "active" : ""} key={slide.title} onClick={() => goTo(index)}>{index + 1}. {slide.title}</button> : null)}</div>)}</aside>;
}

export default function App() {
  const [current, setCurrent] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const { isFullscreen, toggle } = useFullscreen();
  const goTo = useCallback((index: number) => setCurrent(Math.max(0, Math.min(slides.length - 1, index))), []);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const previous = useCallback(() => goTo(current - 1), [current, goTo]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowRight", "PageDown", " "].includes(event.key)) next();
      if (["ArrowLeft", "PageUp"].includes(event.key)) previous();
      if (event.key === "Home") goTo(0);
      if (event.key === "End") goTo(slides.length - 1);
      if (event.key.toLowerCase() === "m") setTocOpen((open) => !open);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, next, previous]);
  const slide = slides[current];
  return (
    <div className="deck">
      {slide.menti ? <MentimeterSlide slide={slide} /> : <StandardSlide slide={slide} />}
      <div className="progress"><span style={{ width: `${((current + 1) / slides.length) * 100}%` }} /></div>
      <nav className="controls">
        <button onClick={() => setTocOpen(true)} aria-label="Open table of contents"><Menu size={20} /></button>
        <button onClick={previous} aria-label="Previous slide">Back</button>
        <strong>{current + 1} / {slides.length}</strong>
        <button onClick={next} aria-label="Next slide">Next</button>
        <button onClick={toggle} aria-label="Toggle fullscreen">{isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}</button>
      </nav>
      {tocOpen && <div className="toc-wrap"><TableOfContents current={current} goTo={(index) => { goTo(index); setTocOpen(false); }} /><button className="close" onClick={() => setTocOpen(false)}><X size={22} /></button></div>}
      <style>{`
        :root { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: ${colors.navy}; color: ${colors.warm}; }
        * { box-sizing: border-box; }
        body { margin: 0; overflow: hidden; }
        button { font: inherit; }
        .deck { min-height: 100vh; background: ${colors.navy}; }
        .slide { min-height: 100vh; display: grid; place-items: center; padding: clamp(38px, 6vw, 86px); position: relative; overflow: hidden; }
        .slide::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 82% 14%, rgba(0,168,142,.22), transparent 34%), linear-gradient(135deg, rgba(255,255,255,.055), transparent 45%); pointer-events: none; }
        .slide-inner { width: min(1220px, 100%); position: relative; z-index: 1; }
        .two-up { display: grid; grid-template-columns: minmax(0, .92fr) minmax(300px, .78fr); gap: clamp(30px, 5vw, 72px); align-items: center; }
        .copy-block { min-width: 0; }
        .eyebrow { margin: 0 0 18px; text-transform: uppercase; font-size: .9rem; font-weight: 900; letter-spacing: .16em; }
        h1 { font-size: clamp(3rem, 7vw, 7.4rem); line-height: .94; margin: 0; letter-spacing: 0; max-width: 1050px; }
        .two-up h1 { font-size: clamp(2.8rem, 5.2vw, 5.6rem); }
        .body { font-size: clamp(1.25rem, 2vw, 2rem); line-height: 1.45; max-width: 920px; margin: 32px 0 0; }
        .two-up .body { font-size: clamp(1.1rem, 1.45vw, 1.45rem); }
        .bullets { margin: 38px 0 0; padding: 0; display: grid; gap: 18px; max-width: 980px; list-style: none; }
        .two-up .bullets { gap: 14px; margin-top: 24px; }
        .bullets li { font-size: clamp(1.25rem, 1.75vw, 1.85rem); line-height: 1.34; padding-left: 34px; position: relative; }
        .two-up .bullets li { font-size: clamp(1rem, 1.25vw, 1.25rem); }
        .bullets li::before { content: ""; width: 12px; height: 12px; border-radius: 999px; background: ${colors.teal}; position: absolute; left: 0; top: .55em; }
        .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(235px, 1fr)); gap: 18px; margin-top: 40px; }
        .card { border: 1px solid; border-radius: 8px; padding: 24px; min-height: 164px; }
        .card h2 { margin: 0 0 14px; font-size: clamp(1.15rem, 1.4vw, 1.5rem); text-transform: uppercase; color: ${colors.teal}; letter-spacing: .08em; }
        .card p { margin: 0; font-size: clamp(1rem, 1.2vw, 1.2rem); line-height: 1.45; }
        .image-panel { width: min(100%, 570px); justify-self: center; display: grid; place-items: center; }
        .slide-image { display: block; max-width: 100%; width: auto; max-height: 72vh; object-fit: contain; border-radius: 8px; box-shadow: 0 24px 80px rgba(0,0,0,.35); }
        .menti h1 { max-width: 1120px; font-size: clamp(2.4rem, 5.2vw, 5.8rem); }
        .options { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; margin-top: 38px; }
        .option { display: flex; gap: 16px; align-items: center; border: 1px solid; border-radius: 8px; padding: 20px 22px; font-size: clamp(1.05rem, 1.35vw, 1.35rem); font-weight: 800; min-height: 84px; }
        .option span { width: 36px; height: 36px; display: grid; place-items: center; flex: 0 0 36px; border-radius: 999px; background: ${colors.teal}; color: ${colors.navy}; }
        .menti-cue { display: inline-flex; margin-top: 34px; padding: 14px 20px; border-radius: 999px; background: ${colors.navy}; color: ${colors.warm}; font-weight: 900; letter-spacing: .04em; }
        .progress { position: fixed; left: 0; right: 0; bottom: 0; height: 6px; background: rgba(255,255,255,.18); z-index: 5; }
        .progress span { display: block; height: 100%; background: ${colors.teal}; transition: width .25s ease; }
        .controls { position: fixed; right: 22px; bottom: 22px; z-index: 7; display: flex; gap: 8px; align-items: center; padding: 8px; border-radius: 999px; background: rgba(10,22,40,.78); color: ${colors.warm}; backdrop-filter: blur(16px); }
        .controls button { border: 0; min-width: 42px; height: 42px; border-radius: 999px; padding: 0 14px; background: rgba(255,255,255,.12); color: inherit; display: inline-grid; place-items: center; cursor: pointer; }
        .controls strong { min-width: 64px; text-align: center; }
        .toc-wrap { position: fixed; inset: 0; z-index: 10; background: rgba(10,22,40,.88); color: ${colors.warm}; padding: 32px; overflow: auto; }
        .toc { width: min(980px, 100%); margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 22px; }
        .toc h3 { color: ${colors.teal}; margin: 0 0 10px; text-transform: uppercase; letter-spacing: .08em; }
        .toc button { display: block; width: 100%; text-align: left; margin: 6px 0; padding: 10px 12px; border: 1px solid rgba(255,255,255,.16); border-radius: 8px; background: rgba(255,255,255,.06); color: inherit; cursor: pointer; }
        .toc button.active { background: ${colors.teal}; color: ${colors.navy}; font-weight: 900; }
        .close { position: fixed; top: 24px; right: 24px; width: 46px; height: 46px; border-radius: 999px; border: 0; background: ${colors.teal}; color: ${colors.navy}; cursor: pointer; }
        @media (max-width: 780px) { body { overflow: auto; } .slide { min-height: 100svh; padding: 30px 20px 92px; } .two-up { grid-template-columns: 1fr; } .image-panel { width: min(100%, 520px); } .slide-image { max-height: 46vh; } .options { grid-template-columns: 1fr; } .controls { left: 12px; right: 12px; justify-content: center; } h1 { font-size: clamp(2.5rem, 14vw, 4.6rem); } }
      `}</style>
    </div>
  );
}
