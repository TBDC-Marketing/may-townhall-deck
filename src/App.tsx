import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  CheckCircle2,
  CircleAlert,
  ClipboardCheck,
  Coffee,
  Compass,
  Eye,
  Flag,
  Handshake,
  Home,
  ListChecks,
  Maximize2,
  Megaphone,
  Menu,
  MessageCircle,
  Minimize2,
  Network,
  ShieldCheck,
  Shirt,
  Sparkles,
  Target,
  TrendingUp,
  UsersRound,
  Utensils,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import brandRefresh04 from "./assets/brand-refresh/brand-refresh-04.webp";
import astrikosLogo from "./assets/cohort/astrikos.png";
import blunavLogo from "./assets/cohort/blunav.png";
import sensoneoLogo from "./assets/cohort/sensoneo.png";
import skypuzzlerLogo from "./assets/cohort/skypuzzler.png";
import trideLogo from "./assets/cohort/tride.png";
import tvastaLogo from "./assets/cohort/tvasta.png";
import vcgaiLogo from "./assets/cohort/vcgai.png";
import ajHeadshot from "./assets/team/aj.jpeg";
import hammadHeadshot from "./assets/team/hammad.webp";
import olgaHeadshot from "./assets/team/olga.jpeg";
import rahimHeadshot from "./assets/team/rahim.png";
import rajshreeHeadshot from "./assets/team/rajshree.jpeg";

const COLORS = {
  navy: "#0A1628",
  navyLight: "#0F1F38",
  teal: "#00A88E",
  warmWhite: "#FAF8F5",
  sand: "#F0ECE3",
  charcoal: "#1E293B",
  muted: "#64748B"
};

const FONTS = {
  heading: "'Plus Jakarta Sans', sans-serif",
  serif: "'Instrument Serif', serif",
  body: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace"
};

type Theme = "navy" | "warmWhite" | "sand";

interface SlideDefinition {
  title: string;
  section: string;
  theme: Theme;
  render: () => ReactNode;
}

interface Bullet {
  text: string;
  detail?: string;
}

interface CardItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface CohortCompany {
  name: string;
  logoUrl: string;
}

interface Person {
  name: string;
  label: string;
  image: string;
}

const COHORT_COMPANIES: CohortCompany[] = [
  { name: "Astrikos", logoUrl: astrikosLogo },
  { name: "Tvasta", logoUrl: tvastaLogo },
  { name: "BluNav", logoUrl: blunavLogo },
  { name: "Tride", logoUrl: trideLogo },
  { name: "VCG.AI", logoUrl: vcgaiLogo },
  { name: "Skypuzzler", logoUrl: skypuzzlerLogo },
  { name: "Sensoneo", logoUrl: sensoneoLogo }
];

const WORKIVERSARIES: Person[] = [
  { name: "AJ Sivam", label: "5 years", image: ajHeadshot },
  { name: "Hammad Hassan", label: "3 years", image: hammadHeadshot },
  { name: "Olga Senko", label: "1 year", image: olgaHeadshot }
];

const NEW_TEAM_MEMBERS: Person[] = [
  { name: "Rahim Kanji", label: "New team member", image: rahimHeadshot },
  { name: "Rajshree Chatterjee", label: "New team member", image: rajshreeHeadshot }
];

function themeStyles(theme: Theme) {
  const isDark = theme === "navy";
  return {
    background: isDark
      ? COLORS.navy
      : theme === "sand"
        ? COLORS.sand
        : COLORS.warmWhite,
    heading: isDark ? "#FFFFFF" : COLORS.charcoal,
    body: isDark ? "rgba(255,255,255,0.72)" : "rgba(30,41,59,0.78)",
    subtle: isDark ? "rgba(255,255,255,0.48)" : "rgba(30,41,59,0.56)",
    card: isDark ? "rgba(255,255,255,0.065)" : "#FFFFFF",
    border: isDark ? "rgba(255,255,255,0.12)" : "rgba(203,213,225,0.55)"
  };
}

function NoiseOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: 0.035
      }}
    >
      <svg width="100%" height="100%">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}

function SlideFrame({
  theme,
  children,
  align = "center",
  maxWidth = 1280
}: {
  theme: Theme;
  children: ReactNode;
  align?: CSSProperties["textAlign"];
  maxWidth?: number;
}) {
  const t = themeStyles(theme);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        background: t.background,
        color: t.heading
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: theme === "navy" ? 0.07 : 0.055,
          background:
            theme === "navy"
              ? "radial-gradient(ellipse at 70% 35%, rgba(0,168,142,0.8), transparent 58%)"
              : `radial-gradient(ellipse at 55% 42%, ${COLORS.teal}, transparent 68%)`,
          pointerEvents: "none"
        }}
      />
      <div
        style={{
          maxWidth,
          width: "100%",
          margin: "0 auto",
          padding: "48px clamp(48px, 6vw, 96px)",
          position: "relative",
          zIndex: 10,
          textAlign: align
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: FONTS.mono,
        fontSize: 16,
        fontWeight: 700,
        color: COLORS.teal,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        margin: "0 0 18px 0"
      }}
    >
      {children}
    </p>
  );
}

function Title({
  children,
  theme,
  size = "default"
}: {
  children: ReactNode;
  theme: Theme;
  size?: "default" | "large";
}) {
  return (
    <h1
      style={{
        fontFamily: FONTS.heading,
        fontWeight: 800,
        fontSize:
          size === "large"
            ? "clamp(3.2rem, 6.4vw, 6rem)"
            : "clamp(2.8rem, 5.5vw, 5rem)",
        lineHeight: 1.08,
        letterSpacing: "-0.03em",
        color: themeStyles(theme).heading,
        margin: "0 0 24px 0"
      }}
    >
      {children}
    </h1>
  );
}

function Accent({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        fontFamily: FONTS.serif,
        fontStyle: "italic",
        color: COLORS.teal,
        fontWeight: 400
      }}
    >
      {children}
    </span>
  );
}

function Body({
  children,
  theme,
  maxWidth = 820
}: {
  children: ReactNode;
  theme: Theme;
  maxWidth?: number;
}) {
  return (
    <p
      style={{
        fontFamily: FONTS.body,
        fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)",
        lineHeight: 1.7,
        color: themeStyles(theme).body,
        maxWidth,
        margin: "0 auto"
      }}
    >
      {children}
    </p>
  );
}

function BulletList({ items, theme }: { items: Bullet[]; theme: Theme }) {
  const t = themeStyles(theme);
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 18
      }}
    >
      {items.map((item) => (
        <li
          key={item.text}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
            color: t.body
          }}
        >
          <span
            style={{
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: COLORS.teal,
              marginTop: 10,
              flexShrink: 0
            }}
          />
          <span
            style={{
              fontFamily: FONTS.body,
              fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)",
              lineHeight: 1.55
            }}
          >
            {item.text}
            {item.detail && (
              <span style={{ color: t.subtle }}> — {item.detail}</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Card({
  item,
  theme,
  compact = false
}: {
  item: CardItem;
  theme: Theme;
  compact?: boolean;
}) {
  const t = themeStyles(theme);
  const Icon = item.icon;
  return (
    <div
      style={{
        background: t.card,
        borderRadius: 18,
        padding: compact ? "22px 22px" : "28px 24px",
        border: `1px solid ${t.border}`,
        borderLeft: `3px solid ${COLORS.teal}`,
        boxShadow: theme === "navy" ? "none" : "0 2px 18px rgba(10,22,40,0.06)"
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: "rgba(0,168,142,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14
        }}
      >
        <Icon size={28} color={COLORS.teal} />
      </div>
      <h3
        style={{
          fontFamily: FONTS.heading,
          fontWeight: 700,
          fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)",
          color: t.heading,
          margin: "0 0 8px 0"
        }}
      >
        {item.title}
      </h3>
      <p
        style={{
          fontFamily: FONTS.body,
          fontSize: "clamp(1rem, 1.3vw, 1.25rem)",
          lineHeight: 1.58,
          color: t.body,
          margin: 0
        }}
      >
        {item.description}
      </p>
    </div>
  );
}

function CardGrid({
  items,
  theme,
  columns = 3,
  compact = false
}: {
  items: CardItem[];
  theme: Theme;
  columns?: number;
  compact?: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 22,
        textAlign: "left"
      }}
    >
      {items.map((item) => (
        <Card key={item.title} item={item} theme={theme} compact={compact} />
      ))}
    </div>
  );
}

function SplitSlide({
  theme,
  eyebrow,
  title,
  body,
  children,
  maxWidth = 1400
}: {
  theme: Theme;
  eyebrow: string;
  title: ReactNode;
  body?: string;
  children: ReactNode;
  maxWidth?: number;
}) {
  return (
    <SlideFrame theme={theme} align="left" maxWidth={maxWidth}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.95fr 1.05fr",
          gap: "clamp(40px, 5vw, 80px)",
          alignItems: "center"
        }}
      >
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Title theme={theme}>{title}</Title>
          {body && <Body theme={theme}>{body}</Body>}
        </div>
        <div>{children}</div>
      </div>
    </SlideFrame>
  );
}

function StatementSlide({
  theme,
  eyebrow,
  title,
  body,
  footer
}: {
  theme: Theme;
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <SlideFrame theme={theme} align="center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <Title theme={theme} size="large">
        {title}
      </Title>
      {body && <Body theme={theme}>{body}</Body>}
      {footer && <div style={{ marginTop: 48 }}>{footer}</div>}
    </SlideFrame>
  );
}

function SectionSlide({
  section,
  title,
  subtitle
}: {
  section: string;
  title: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <SlideFrame theme="navy" align="center">
      <Eyebrow>{section}</Eyebrow>
      <Title theme="navy" size="large">
        {title}
      </Title>
      {subtitle && <Body theme="navy">{subtitle}</Body>}
    </SlideFrame>
  );
}

function Timeline({ items, theme }: { items: Bullet[]; theme: Theme }) {
  const t = themeStyles(theme);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {items.map((item, index) => (
        <div
          key={item.text}
          style={{
            display: "grid",
            gridTemplateColumns: "74px 1fr",
            gap: 20,
            alignItems: "start"
          }}
        >
          <div
            style={{
              height: 56,
              width: 56,
              borderRadius: "50%",
              background: COLORS.teal,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONTS.mono,
              fontWeight: 700
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
          <div
            style={{
              padding: "4px 0 20px",
              borderBottom: `1px solid ${t.border}`
            }}
          >
            <h3
              style={{
                fontFamily: FONTS.heading,
                fontSize: "clamp(1.2rem, 1.7vw, 1.55rem)",
                color: t.heading,
                margin: "0 0 4px"
              }}
            >
              {item.text}
            </h3>
            {item.detail && (
              <p
                style={{
                  fontFamily: FONTS.body,
                  fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
                  color: t.body,
                  margin: 0,
                  lineHeight: 1.55
                }}
              >
                {item.detail}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function LogoGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 18
      }}
    >
      {COHORT_COMPANIES.map((company, index) => (
        <div
          key={company.name}
          style={{
            minHeight: index === 6 ? 150 : 132,
            gridColumn: index === 6 ? "2 / span 2" : "auto",
            background: "#fff",
            border: "1px solid rgba(203,213,225,0.55)",
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            boxShadow: "0 2px 18px rgba(10,22,40,0.06)"
          }}
        >
          <img
            src={company.logoUrl}
            alt={`${company.name} logo`}
            style={{
              maxWidth: "78%",
              maxHeight: 58,
              objectFit: "contain"
            }}
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 13,
              fontWeight: 700,
              color: COLORS.muted,
              textTransform: "uppercase",
              letterSpacing: "0.08em"
            }}
          >
            {company.name}
          </span>
        </div>
      ))}
    </div>
  );
}

function PersonCard({ person, theme }: { person: Person; theme: Theme }) {
  const t = themeStyles(theme);
  return (
    <div
      style={{
        background: t.card,
        border: `1px solid ${t.border}`,
        borderRadius: 22,
        padding: 18,
        display: "grid",
        gridTemplateColumns: "96px 1fr",
        gap: 18,
        alignItems: "center",
        textAlign: "left",
        boxShadow: theme === "navy" ? "none" : "0 2px 18px rgba(10,22,40,0.06)"
      }}
    >
      <img
        src={person.image}
        alt={person.name}
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          objectFit: "cover",
          border: `3px solid ${COLORS.teal}`
        }}
      />
      <div>
        <h3
          style={{
            fontFamily: FONTS.heading,
            fontSize: "clamp(1.15rem, 1.6vw, 1.45rem)",
            color: t.heading,
            margin: "0 0 6px"
          }}
        >
          {person.name}
        </h3>
        <p
          style={{
            fontFamily: FONTS.mono,
            fontSize: 13,
            fontWeight: 700,
            color: COLORS.teal,
            margin: 0,
            textTransform: "uppercase",
            letterSpacing: "0.08em"
          }}
        >
          {person.label}
        </p>
      </div>
    </div>
  );
}

function RecognitionSlide() {
  return (
    <SlideFrame theme="sand" align="left" maxWidth={1380}>
      <Eyebrow>Recognition</Eyebrow>
      <Title theme="sand">
        Workiversaries &amp; <Accent>new team members</Accent>
      </Title>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(32px, 4vw, 56px)",
          alignItems: "start"
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: FONTS.heading,
              color: COLORS.charcoal,
              fontSize: "clamp(1.35rem, 2vw, 1.9rem)",
              margin: "0 0 20px"
            }}
          >
            Workiversaries
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {WORKIVERSARIES.map((person) => (
              <PersonCard key={person.name} person={person} theme="sand" />
            ))}
          </div>
        </div>
        <div>
          <h2
            style={{
              fontFamily: FONTS.heading,
              color: COLORS.charcoal,
              fontSize: "clamp(1.35rem, 2vw, 1.9rem)",
              margin: "0 0 20px"
            }}
          >
            New team members
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {NEW_TEAM_MEMBERS.map((person) => (
              <PersonCard key={person.name} person={person} theme="sand" />
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function VisualPanel({
  src,
  alt,
  border = true
}: {
  src: string;
  alt: string;
  border?: boolean;
}) {
  return (
    <div
      style={{
        borderRadius: 22,
        overflow: "hidden",
        border: border ? "1px solid rgba(255,255,255,0.14)" : "none",
        boxShadow: "0 24px 80px rgba(10,22,40,0.22)",
        background: "#fff"
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          display: "block",
          width: "100%",
          height: "auto"
        }}
      />
    </div>
  );
}

function PollSlide({
  question,
  options,
  answer,
  eyebrow = "Inside TBDC Poll",
  theme = "sand"
}: {
  question: string;
  options: string[];
  answer?: string;
  eyebrow?: string;
  theme?: Theme;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <SlideFrame theme={theme} align="left" maxWidth={1280}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Title theme={theme}>
        <Accent>Question:</Accent> {question}
      </Title>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          marginTop: 38
        }}
      >
        {options.map((option) => {
          const isSelected = selected === option;
          const isCorrect = selected !== null && answer !== undefined && option === answer;
          return (
            <button
              key={option}
              onClick={() => setSelected(option)}
              style={{
                minHeight: 112,
                textAlign: "left",
                border: `2px solid ${isCorrect || isSelected ? COLORS.teal : "rgba(203,213,225,0.65)"}`,
                background: isCorrect
                  ? "rgba(0,168,142,0.13)"
                  : isSelected
                    ? "rgba(0,168,142,0.08)"
                    : "#fff",
                color: COLORS.charcoal,
                borderRadius: 18,
                padding: "24px 26px",
                cursor: "pointer",
                boxShadow: "0 2px 18px rgba(10,22,40,0.06)",
                transition: "all 0.18s ease"
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  fontFamily: FONTS.heading,
                  fontWeight: 700,
                  fontSize: "clamp(1.05rem, 1.45vw, 1.35rem)",
                  lineHeight: 1.35
                }}
              >
                <CheckCircle2
                  size={24}
                  color={isCorrect || isSelected ? COLORS.teal : "rgba(30,41,59,0.25)"}
                />
                {option}
              </span>
            </button>
          );
        })}
      </div>
      {selected && answer && (
        <p
          style={{
            margin: "30px 0 0",
            fontFamily: FONTS.body,
            fontWeight: 600,
            color: COLORS.teal,
            fontSize: "clamp(1.05rem, 1.4vw, 1.3rem)"
          }}
        >
          Anchor answer: {answer}
        </p>
      )}
      {selected && !answer && (
        <p
          style={{
            margin: "30px 0 0",
            fontFamily: FONTS.body,
            fontWeight: 600,
            color: COLORS.teal,
            fontSize: "clamp(1.05rem, 1.4vw, 1.3rem)"
          }}
        >
          Discussion poll: compare responses in the room.
        </p>
      )}
    </SlideFrame>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: 2, zIndex: 100 }}>
      <div
        style={{
          height: "100%",
          background: COLORS.teal,
          transition: "width 0.3s ease-out",
          width: `${((current + 1) / total) * 100}%`
        }}
      />
    </div>
  );
}

function TableOfContents({
  current,
  open,
  onClose,
  onSelect,
  slides
}: {
  current: number;
  open: boolean;
  onClose: () => void;
  onSelect: (index: number) => void;
  slides: SlideDefinition[];
}) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 80, display: "flex" }}>
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(10,22,40,0.86)",
          backdropFilter: "blur(8px)"
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 81,
          width: 460,
          maxWidth: "92vw",
          height: "100vh",
          background: COLORS.navy,
          borderRight: "1px solid rgba(255,255,255,0.1)",
          overflowY: "auto",
          padding: "46px 30px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 30 }}>
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 12,
              fontWeight: 700,
              color: COLORS.teal,
              textTransform: "uppercase",
              letterSpacing: "0.1em"
            }}
          >
            Table of Contents
          </span>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", padding: 4 }}
          >
            <X size={20} />
          </button>
        </div>
        {slides.map((slide, index) => (
          <button
            key={`${slide.section}-${slide.title}`}
            onClick={() => {
              onSelect(index);
              onClose();
            }}
            style={{
              display: "grid",
              gridTemplateColumns: "34px 1fr",
              gap: 12,
              width: "100%",
              padding: "12px 14px",
              borderRadius: 12,
              border: "none",
              background: index === current ? "rgba(0,168,142,0.15)" : "transparent",
              cursor: "pointer",
              textAlign: "left",
              marginBottom: 4
            }}
          >
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 12,
                fontWeight: 700,
                color: index === current ? COLORS.teal : "rgba(255,255,255,0.3)"
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: 14,
                fontWeight: 500,
                color: index === current ? "#fff" : "rgba(255,255,255,0.65)",
                lineHeight: 1.35
              }}
            >
              {slide.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

const slides: SlideDefinition[] = [
  {
    section: "Opening",
    title: "TBDC Town Hall, May",
    theme: "navy",
    render: () => (
      <StatementSlide
        theme="navy"
        eyebrow="May 2026 Town Hall"
        title={
          <>
            Moving Companies <Accent>Forward</Accent>
          </>
        }
        body="A focused conversation about our brand, Sprint Week, and how we operate around measurable company outcomes."
      />
    )
  },
  {
    section: "Opening",
    title: "Welcome",
    theme: "warmWhite",
    render: () => (
      <SplitSlide theme="warmWhite" eyebrow="Welcome" title={<>A big moment for the <Accent>organization</Accent></>}>
        <BulletList
          theme="warmWhite"
          items={[
            { text: "Rebrand is live", detail: "a clearer expression of who TBDC is now" },
            { text: "Sprint Week is here", detail: "a highly visible founder experience" },
            { text: "How we operate matters", detail: "today is about getting clear on what matters most" }
          ]}
        />
      </SplitSlide>
    )
  },
  {
    section: "Opening",
    title: "Workiversaries and Recognition",
    theme: "sand",
    render: () => <RecognitionSlide />
  },
  {
    section: "Purpose and North Star",
    title: "Why We’re Here",
    theme: "navy",
    render: () => (
      <SectionSlide
        section="Purpose and North Star"
        title={<>Why We’re <Accent>Here</Accent></>}
        subtitle="Align on how we operate today, reinforce outcomes over activity, and prepare for Sprint Week."
      />
    )
  },
  {
    section: "Purpose and North Star",
    title: "North Star and What It Means",
    theme: "warmWhite",
    render: () => (
      <StatementSlide
        theme="warmWhite"
        eyebrow="North Star"
        title={<>We move companies forward in a <Accent>measurable way</Accent></>}
        body="If we cannot point to what changed in a company’s business, the experience does not matter."
      />
    )
  },
  {
    section: "Purpose and North Star",
    title: "What This Means in Practice and Focus",
    theme: "sand",
    render: () => (
      <SlideFrame theme="sand" align="left" maxWidth={1420}>
        <Eyebrow>Practice and Focus</Eyebrow>
        <Title theme="sand">
          Tie every activity to an <Accent>outcome</Accent>
        </Title>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(32px, 4vw, 58px)",
            marginTop: 18
          }}
        >
          <CardGrid
            theme="sand"
            columns={1}
            compact
            items={[
              { icon: Target, title: "Strategic shift", description: "Sales brings in companies we can actually impact." },
              { icon: ClipboardCheck, title: "Programming", description: "Every engagement ties to a clear outcome." },
              { icon: TrendingUp, title: "Revenue", description: "Value becomes paid work deliberately." },
              { icon: Megaphone, title: "Marketing", description: "Outcome-driven stories are backed by proof points." }
            ]}
          />
          <CardGrid
            theme="sand"
            columns={1}
            compact
            items={[
              { icon: CheckCircle2, title: "Define success upfront", description: "Clarify the baseline, desired outcome, and proof we need to capture." },
              { icon: Network, title: "Strengthen qualification", description: "Track baseline versus outcome and tie activity to measurable movement." },
              { icon: CircleAlert, title: "Share operational learnings", description: "Make efficiencies and patterns visible across teams." },
              { icon: Sparkles, title: "Use AI deliberately", description: "Improve speed and quality without replacing judgment." }
            ]}
          />
        </div>
      </SlideFrame>
    )
  },
  {
    section: "Purpose and North Star",
    title: "How We’re Creating More Alignment",
    theme: "warmWhite",
    render: () => (
      <SplitSlide
        theme="warmWhite"
        eyebrow="Alignment"
        title={<>Creating clearer <Accent>quarterly rhythms</Accent></>}
        body="Leadership alignment becomes team clarity, focus, accountability, and cross-functional coordination."
      >
        <Timeline
          theme="warmWhite"
          items={[
            { text: "Organizational direction", detail: "leadership has aligned around a clearer operating focus" },
            { text: "Quarterly planning", detail: "top priorities, dependencies, sequencing, and capacity become explicit" },
            { text: "Connected work", detail: "teams and individuals link their work to broader organizational priorities" },
            { text: "Evolving system", detail: "this process will become part of how we operate together" }
          ]}
        />
      </SplitSlide>
    )
  },
  {
    section: "Purpose and North Star",
    title: "Operational Awareness and Cyber Safety",
    theme: "navy",
    render: () => (
      <SplitSlide
        theme="navy"
        eyebrow="Operational Awareness"
        title={<>Digital awareness is part of <Accent>operational discipline</Accent></>}
      >
        <CardGrid
          theme="navy"
          columns={1}
          compact
          items={[
            { icon: ShieldCheck, title: "Stay cautious", description: "Watch for unexpected links, attachments, and login prompts." },
            { icon: CircleAlert, title: "Verify unusual requests", description: "Pause on password, payment, or sensitive-information asks." },
            { icon: MessageCircle, title: "Report quickly", description: "Flag suspicious emails or activity immediately." }
          ]}
        />
      </SplitSlide>
    )
  },
  {
    section: "Rebrand",
    title: "Our New Brand is Live",
    theme: "navy",
    render: () => (
      <SplitSlide
        theme="navy"
        eyebrow="Rebrand"
        title={<>Our new brand is <Accent>live</Accent></>}
        body="The new brand and website reflect how TBDC operates today: precision over volume, sharper choices, and clearer momentum."
      >
        <VisualPanel src={brandRefresh04} alt="TBDC brand history slide showing the refreshed mark and archival material" />
      </SplitSlide>
    )
  },
  {
    section: "Rebrand",
    title: "What Changed",
    theme: "warmWhite",
    render: () => (
      <SplitSlide theme="warmWhite" eyebrow="Dharti Lead" title={<>A sharper expression of <Accent>TBDC</Accent></>}>
        <CardGrid
          theme="warmWhite"
          columns={1}
          compact
          items={[
            { icon: Target, title: "From 26 years to now", description: "The new logo reflects how the organization has evolved." },
            { icon: ClipboardCheck, title: "Katana philosophy", description: "Japanese precision as an anchor: disciplined technique, sharpness, clarity, timing, and momentum." },
            { icon: UsersRound, title: "Core values", description: "Precision, Growth, and Community become clearer signals for how we work." },
            { icon: TrendingUp, title: "Founder impact", description: "We help founders become sharper and more precise in how they operate." }
          ]}
        />
      </SplitSlide>
    )
  },
  {
    section: "Rebrand",
    title: "How We Demonstrated These Values",
    theme: "sand",
    render: () => (
      <SplitSlide theme="sand" eyebrow="Dan Lead" title={<>A brand refresh delivered with <Accent>intention</Accent></>}>
        <BulletList
          theme="sand"
          items={[
            { text: "A refreshed brand presence and website within 30 days" },
            { text: "A practical example of how we intend to serve founders" },
            { text: "Focused execution with precision, growth, and community in action" }
          ]}
        />
      </SplitSlide>
    )
  },
  {
    section: "Rebrand",
    title: "What It Took",
    theme: "warmWhite",
    render: () => (
      <SplitSlide theme="warmWhite" eyebrow="Dan Lead" title={<>Cross-functional work, accelerated by <Accent>AI-enabled workflows</Accent></>}>
        <CardGrid
          theme="warmWhite"
          columns={1}
          compact
          items={[
            { icon: Network, title: "Collaboration", description: "Marketing and cross-team collaboration shaped the work." },
            { icon: Megaphone, title: "Website and messaging", description: "The refresh connected visual identity, story, and digital presence." },
            { icon: Sparkles, title: "Practical AI workflows", description: "AI helped improve speed and quality through the rebuild." }
          ]}
        />
      </SplitSlide>
    )
  },
  {
    section: "Sprint Week",
    title: "Sprint Week Overview",
    theme: "sand",
    render: () => (
      <SectionSlide
        section="Sprint Week"
        title={<>A core founder <Accent>experience</Accent></>}
        subtitle="A highly visible moment that shapes perception and outcomes. Everything we discussed about precision applies here."
      />
    )
  },
  {
    section: "Sprint Week",
    title: "Who Is Coming",
    theme: "warmWhite",
    render: () => (
      <SlideFrame theme="warmWhite" align="center" maxWidth={1400}>
        <Eyebrow>Founder Cohort</Eyebrow>
        <Title theme="warmWhite">7 later-stage, <Accent>scaling companies</Accent></Title>
        <LogoGrid />
      </SlideFrame>
    )
  },
  {
    section: "Sprint Week",
    title: "Sprint Week Timing",
    theme: "navy",
    render: () => (
      <SplitSlide theme="navy" eyebrow="Timing" title={<>A full-week experience hosted at <Accent>TBDC</Accent></>}>
        <Timeline
          theme="navy"
          items={[
            { text: "Sunday", detail: "arrival and welcome dinner" },
            { text: "Monday to Friday", detail: "core program days" },
            { text: "TBDC", detail: "home base for the week" }
          ]}
        />
      </SplitSlide>
    )
  },
  {
    section: "Sprint Week",
    title: "Weekly Flow",
    theme: "sand",
    render: () => (
      <SlideFrame theme="sand" align="center" maxWidth={1400}>
        <Eyebrow>Weekly Flow</Eyebrow>
        <Title theme="sand">Designed for <Accent>momentum</Accent></Title>
        <CardGrid
          theme="sand"
          columns={3}
          items={[
            { icon: Coffee, title: "Mornings", description: "Group sessions that create shared context and focus." },
            { icon: Network, title: "Afternoons", description: "Curated meetings matched to founder needs." },
            { icon: Utensils, title: "Evenings", description: "Networking, ecosystem events, and invitational dinners Tuesday and Thursday." }
          ]}
        />
      </SlideFrame>
    )
  },
  {
    section: "Sprint Week",
    title: "Special Guests and Ecosystem Partners",
    theme: "warmWhite",
    render: () => (
      <SplitSlide
        theme="warmWhite"
        eyebrow="Ecosystem Partners"
        title={<>Important guests shaping the <Accent>Sprint Week experience</Accent></>}
      >
        <Timeline
          theme="warmWhite"
          items={[
            { text: "All week", detail: "Ekke Van Vliet, Investment Coordinator from the European Innovation Council" },
            { text: "Monday", detail: "Evan Solomon, Minister of AI, for the Go EU announcement" },
            { text: "Also Monday", detail: "Piyush Goyal joins the ecosystem conversation" },
            { text: "Throughout the week", detail: "Additional ecosystem and industry leaders" }
          ]}
        />
      </SplitSlide>
    )
  },
  {
    section: "Sprint Week",
    title: "What Success Looks Like",
    theme: "warmWhite",
    render: () => (
      <SplitSlide theme="warmWhite" eyebrow="Success" title={<>What founders should <Accent>leave with</Accent></>}>
        <BulletList
          theme="warmWhite"
          items={[
            { text: "Market clarity" },
            { text: "Meaningful connections" },
            { text: "Clear next steps and momentum" },
            { text: "Potential follow-on work" }
          ]}
        />
      </SplitSlide>
    )
  },
  {
    section: "Sprint Week",
    title: "Team Expectations and Early Week Focus",
    theme: "navy",
    render: () => (
      <SplitSlide
        theme="navy"
        eyebrow="Team Expectations"
        title={<>First impressions set the <Accent>tone</Accent></>}
        body="Be present, approachable, proactive, and sharp as ever: clear, focused, and intentional in every interaction."
      >
        <CardGrid
          theme="navy"
          columns={2}
          compact
          items={[
            { icon: Coffee, title: "Food and coffee", description: "Keep the experience smooth and welcoming." },
            { icon: Home, title: "Water and facilities", description: "Notice needs before they become issues." },
            { icon: Compass, title: "Room navigation", description: "Help founders find meetings and sessions quickly." },
            { icon: Handshake, title: "Founder guidance", description: "Step in when context or support is needed." }
          ]}
        />
      </SplitSlide>
    )
  },
  {
    section: "Sprint Week",
    title: "White Glove Experience",
    theme: "sand",
    render: () => (
      <StatementSlide
        theme="sand"
        eyebrow="White Glove Experience"
        title={<>Professional, welcoming, <Accent>seamless</Accent></>}
        body="The standard is proactive support and coordinated execution, with TBDC feeling like a true home base."
      />
    )
  },
  {
    section: "Sprint Week",
    title: "Communication",
    theme: "warmWhite",
    render: () => (
      <SplitSlide theme="warmWhite" eyebrow="Communication" title={<>Real-time <Accent>coordination</Accent></>}>
        <CardGrid
          theme="warmWhite"
          columns={1}
          items={[
            { icon: MessageCircle, title: "WhatsApp is the primary channel", description: "Use it for quick issue resolution, live coordination, and connecting with Yasseen at 289-894-3431 when needed." }
          ]}
        />
      </SplitSlide>
    )
  },
  {
    section: "Sprint Week",
    title: "Roles, Support, and Visibility",
    theme: "navy",
    render: () => (
      <SplitSlide theme="navy" eyebrow="Roles and Visibility" title={<>Make support easy to <Accent>see</Accent></>}>
        <CardGrid
          theme="navy"
          columns={2}
          compact
          items={[
            { icon: ListChecks, title: "Volunteer schedule", description: "Defined time blocks will be shared." },
            { icon: UsersRound, title: "Support roles", description: "Coverage across the week and key moments." },
            { icon: Shirt, title: "Branded apparel", description: "Especially Day 1 and Day 2." },
            { icon: Eye, title: "Identifiable team", description: "Founders should know who can help." }
          ]}
        />
      </SplitSlide>
    )
  },
  {
    section: "Sprint Week",
    title: "Final Sprint Reminder",
    theme: "sand",
    render: () => (
      <StatementSlide
        theme="sand"
        eyebrow="Final Sprint Reminder"
        title={<>Every interaction contributes to whether we move these companies <Accent>forward</Accent></>}
        body="Everyone sharp. Every moment counts."
      />
    )
  },
  {
    section: "GTK TBDC",
    title: "GTK TBDC Intro",
    theme: "navy",
    render: () => (
      <SectionSlide
        section="GTK TBDC"
        title={<>Get to Know <Accent>TBDC</Accent></>}
        subtitle="A new recurring segment to build shared understanding of the business and how each part creates value."
      />
    )
  },
  {
    section: "GTK TBDC",
    title: "Poll: Strongest value indicator",
    theme: "sand",
    render: () => (
      <PollSlide
        eyebrow="GTK TBDC Poll"
        question="What is the strongest indicator that Sprint Week created real value?"
        options={[
          "Founders leave with clearer strategic direction",
          "Founders gain high value relationships they would not otherwise access",
          "Founders convert momentum into measurable business movement after the program",
          "Founders publicly praise the experience"
        ]}
        answer="Founders convert momentum into measurable business movement after the program"
      />
    )
  },
  {
    section: "GTK TBDC",
    title: "Poll: Strongest Sprint Week fit",
    theme: "warmWhite",
    render: () => (
      <PollSlide
        eyebrow="GTK TBDC Poll"
        question="Which company is likely the strongest fit for Sprint Week?"
        options={[
          "A founder with an early idea looking for general feedback",
          "A company with paying customers, traction in at least one core market, and clear market expansion goals",
          "A founder still exploring which problem they want to solve",
          "A company looking mainly for free coworking space and networking"
        ]}
        answer="A company with paying customers, traction in at least one core market, and clear market expansion goals"
        theme="warmWhite"
      />
    )
  },
  {
    section: "GTK TBDC",
    title: "Poll: Applying the Katana philosophy",
    theme: "sand",
    render: () => (
      <PollSlide
        eyebrow="GTK TBDC Poll"
        question="How do we better apply the new Katana philosophy at work?"
        options={[
          "Avoid wasting time and resources",
          "Work with more focus, precision, and accountability",
          "Resolve issues through discussion and understanding instead of conflict",
          "All of the above"
        ]}
        answer="All of the above"
      />
    )
  },
  {
    section: "GTK TBDC",
    title: "Poll: North Star outcome",
    theme: "warmWhite",
    render: () => (
      <PollSlide
        eyebrow="GTK TBDC Poll"
        question="Which outcome best reflects TBDC’s North Star?"
        options={[
          "Hosting more events",
          "Increasing founder attendance",
          "Creating measurable business movement for companies",
          "Growing social media engagement"
        ]}
        answer="Creating measurable business movement for companies"
        theme="warmWhite"
      />
    )
  },
  {
    section: "AI and What’s Next",
    title: "AI and Automation",
    theme: "sand",
    render: () => (
      <SplitSlide
        theme="sand"
        eyebrow="AI and Automation"
        title={<>Improving speed, quality, and <Accent>operational leverage</Accent></>}
      >
        <BulletList
          theme="sand"
          items={[
            { text: "Teams are encouraged to share workflows, efficiencies, and learnings" },
            { text: "The goal is not replacing judgment, it is improving how we work" },
            { text: "We are building internal AI literacy together" },
            { text: "BHive AI program launching in the coming months" },
            { text: "AI Lunch and Learn immediately follows Town Hall with Nikki" }
          ]}
        />
      </SplitSlide>
    )
  },
  {
    section: "AI and What’s Next",
    title: "Poll: AI workflow time saver",
    theme: "warmWhite",
    render: () => (
      <PollSlide
        eyebrow="AI Poll"
        question="Which AI enabled workflow currently creates the most leverage for your work?"
        options={[
          "Research and information synthesis",
          "Drafting emails, documents, and reports",
          "Meeting summaries and action tracking",
          "Presentation and content creation"
        ]}
        theme="warmWhite"
      />
    )
  },
  {
    section: "AI and What’s Next",
    title: "What’s Next",
    theme: "warmWhite",
    render: () => (
      <SplitSlide theme="warmWhite" eyebrow="What’s Next" title={<>More clarity around priorities, ownership, and <Accent>coordination</Accent></>}>
        <CardGrid
          theme="warmWhite"
          columns={2}
          items={[
            { icon: Flag, title: "Leadership and team alignment", description: "Goal alignment work begins in June." },
            { icon: Target, title: "Quarterly planning rhythms", description: "Priorities, ownership, and cross-functional coordination become clearer." }
          ]}
        />
      </SplitSlide>
    )
  },
  {
    section: "Close",
    title: "Final Message",
    theme: "navy",
    render: () => (
      <StatementSlide
        theme="navy"
        eyebrow="Final Message"
        title={<>If a company goes through TBDC, something in their business should be <Accent>different</Accent> at the end</>}
        body="If it is not, we need to fix how we operate."
      />
    )
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [tocOpen, setTocOpen] = useState(false);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const totalSlides = slides.length;

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide(Math.max(0, Math.min(index, totalSlides - 1)));
    },
    [totalSlides]
  );

  const next = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide]);
  const prev = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      void document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      void document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (tocOpen) {
        if (event.key === "Escape") setTocOpen(false);
        return;
      }

      switch (event.key) {
        case "ArrowRight":
        case " ":
        case "Enter":
          event.preventDefault();
          next();
          break;
        case "ArrowLeft":
        case "Backspace":
          event.preventDefault();
          prev();
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "Escape":
          if (document.fullscreenElement) {
            void document.exitFullscreen();
            setIsFullscreen(false);
          }
          break;
        case "Home":
          goToSlide(0);
          break;
        case "End":
          goToSlide(totalSlides - 1);
          break;
        case "t":
        case "T":
          setTocOpen((value) => !value);
          break;
        default:
          if (event.key >= "1" && event.key <= "9") {
            goToSlide(Number(event.key) - 1);
          }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goToSlide, next, prev, tocOpen, toggleFullscreen, totalSlides]);

  useEffect(() => {
    const showControls = () => {
      setControlsVisible(true);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      hideTimeout.current = setTimeout(() => setControlsVisible(false), 3000);
    };
    window.addEventListener("mousemove", showControls);
    hideTimeout.current = setTimeout(() => setControlsVisible(false), 3000);
    return () => {
      window.removeEventListener("mousemove", showControls);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const current = useMemo(() => slides[currentSlide], [currentSlide]);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", background: COLORS.navy, position: "relative" }}>
      <NoiseOverlay />
      <ProgressBar current={currentSlide} total={totalSlides} />

      <button
        onClick={() => setTocOpen(true)}
        aria-label="Open table of contents"
        style={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 60,
          background: "rgba(10,22,40,0.6)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 12,
          padding: "10px 14px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          transition: "all 0.3s",
          opacity: controlsVisible ? 1 : 0,
          pointerEvents: controlsVisible ? "auto" : "none"
        }}
      >
        <Menu size={18} color="rgba(255,255,255,0.6)" />
      </button>

      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 60,
          display: "flex",
          alignItems: "center",
          gap: 12,
          transition: "all 0.3s",
          opacity: controlsVisible ? 1 : 0
        }}
      >
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 12,
            fontWeight: 700,
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.1em"
          }}
        >
          {String(currentSlide + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
        </span>
        <button
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          style={{
            background: "rgba(10,22,40,0.6)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 10,
            padding: "8px 10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {isFullscreen ? <Minimize2 size={16} color="rgba(255,255,255,0.6)" /> : <Maximize2 size={16} color="rgba(255,255,255,0.6)" />}
        </button>
      </div>

      <TableOfContents
        current={currentSlide}
        open={tocOpen}
        onClose={() => setTocOpen(false)}
        onSelect={goToSlide}
        slides={slides}
      />

      <div key={currentSlide}>{current.render()}</div>
    </div>
  );
}
