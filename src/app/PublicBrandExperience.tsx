import React, { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Eye,
  FileCheck2,
  FileLock2,
  FileSearch,
  FileText,
  Handshake,
  KeyRound,
  Landmark,
  Layers3,
  LineChart,
  Linkedin,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  MessageSquareText,
  Network,
  Phone,
  Route,
  Scale,
  Search,
  ShieldCheck,
  Target,
  UserCheck,
  UserRound,
  Users,
  X,
} from "lucide-react";

type PublicRole = "seller" | "buyer";
type PublicSiteProps = {
  onSignIn: () => void;
  onCreateAccount: (role: PublicRole) => void;
};

const MAIN_PAGES = [
  "Home",
  "Sell Your Firm",
  "Our Approach",
  "Value & Deal Structure",
  "Buy a Firm",
  "Services",
  "About",
  "Insights",
  "FAQ",
  "Contact",
] as const;

const LEGAL_PAGES = [
  "Terms of Use",
  "Privacy Policy",
  "Cookie Policy",
  "Accessibility",
  "Security & Confidentiality",
  "Professional-Services Disclaimer",
  "Electronic Communications Consent",
  "Acceptable Use",
  "Data Rights & Requests",
  "Site Map",
] as const;

type PublicPage = (typeof MAIN_PAGES)[number] | (typeof LEGAL_PAGES)[number];
type FAQItem = { question: string; answer: string };

type Listing = {
  code: string;
  region: string;
  revenue: string;
  cashFlow: string;
  mix: string;
  team: string;
  clients: string;
  status: "Available" | "Reviewing interest" | "Under offer";
  summary: string;
};

const LISTINGS: Listing[] = [
  {
    code: "CB-2041",
    region: "Pacific Northwest",
    revenue: "$1.4M–$1.8M revenue",
    cashFlow: "Approximately 48% owner cash flow",
    mix: "Tax 60% · Advisory 25% · Bookkeeping 15%",
    team: "Nine-person team with stable tenure",
    clients: "Approximately 640 recurring clients",
    status: "Available",
    summary: "Established tax and advisory practice with recurring engagements and an owner seeking a thoughtful nine-month transition.",
  },
  {
    code: "CB-2038",
    region: "Mountain West",
    revenue: "$820K–$1.1M revenue",
    cashFlow: "Approximately 52% owner cash flow",
    mix: "CAS 45% · Tax 40% · Payroll 15%",
    team: "Six-person, fully remote team",
    clients: "Approximately 310 recurring clients",
    status: "Available",
    summary: "Cloud-based client-accounting firm suited to a buyer expanding recurring advisory work and remote service delivery.",
  },
  {
    code: "CB-2029",
    region: "Southeast",
    revenue: "$2.2M–$2.6M revenue",
    cashFlow: "Approximately 44% owner cash flow",
    mix: "Tax 55% · Audit 30% · Advisory 15%",
    team: "Fourteen people across two offices",
    clients: "Approximately 1,050 recurring clients",
    status: "Reviewing interest",
    summary: "Two-office CPA firm with an audit book, partner-track talent, and a preference for a phased ownership transition.",
  },
  {
    code: "CB-2025",
    region: "Midwest",
    revenue: "$540K–$720K revenue",
    cashFlow: "Approximately 58% owner cash flow",
    mix: "Bookkeeping 55% · Tax 35% · Payroll 10%",
    team: "Four-person team",
    clients: "Approximately 210 recurring clients",
    status: "Under offer",
    summary: "Compact, high-margin bookkeeping and tax practice positioned as a bolt-on for a growing regional firm.",
  },
];

const PROCESS = [
  {
    number: "01",
    label: "Prepare",
    title: "Understand the firm before the market does",
    body: "We begin with your goals, financials, client base, team, systems, and transition preferences. You see likely questions early, while there is still time to address them calmly.",
  },
  {
    number: "02",
    label: "Position",
    title: "Tell the story behind the numbers",
    body: "We organize the financial picture, explain durable earnings, and prepare an anonymous market profile that reflects what makes the practice valuable without revealing its identity.",
  },
  {
    number: "03",
    label: "Qualify",
    title: "Bring the right buyers into view",
    body: "Buyers are reviewed for funding, experience, criteria, timing, and conduct. A match is only a reason to look closer—not permission to see private information.",
  },
  {
    number: "04",
    label: "Control access",
    title: "Release information deliberately",
    body: "A buyer requests a specific opportunity and signs a confidentiality agreement. CPA Bridge reviews the request, then you decide whether any identifying material is released.",
  },
  {
    number: "05",
    label: "Compare",
    title: "Evaluate the whole offer",
    body: "We help you compare price, cash at closing, financing, contingencies, employee plans, client continuity, your transition role, and the buyer's ability to close.",
  },
  {
    number: "06",
    label: "Execute",
    title: "Move through diligence and transition with support",
    body: "The selected buyer enters a controlled diligence process. We coordinate the moving pieces through closing and help keep employees, clients, and the transition plan from becoming afterthoughts.",
  },
];

const OWNER_FAQS: FAQItem[] = [
  {
    question: "Will anyone know my firm is for sale?",
    answer: "Not from the public marketplace. Early discovery is anonymous. Your firm name, exact location, client identities, employee details, and detailed records are withheld until you approve a specific buyer for a specific level of access.",
  },
  {
    question: "Do I need to be certain I want to sell before calling?",
    answer: "No. Many owners begin by understanding timing, value, preparation, and possible transition structures. A first conversation is meant to help you think clearly, not push you into a process.",
  },
  {
    question: "Can I pause or change my mind?",
    answer: "Yes. You may decide the timing is wrong, the available buyers are not right, or the terms do not justify moving forward. Any formal engagement or exclusivity terms would be explained before you agree to them.",
  },
  {
    question: "What happens to my employees and clients?",
    answer: "Those concerns belong in the transaction from the beginning. We help surface buyer plans for retention, leadership, compensation, client communication, owner introductions, and the handoff period so they can be evaluated alongside price.",
  },
  {
    question: "What does it cost if the firm does not sell?",
    answer: "The standard seller engagement is designed around a success fee due when a transaction closes. Any separate third-party or special-project expense would be explained and approved before it is incurred.",
  },
];

const BUYER_FAQS: FAQItem[] = [
  {
    question: "What can I see before I am approved for access?",
    answer: "You can see an anonymous profile: region, revenue range, service mix, staffing profile, client characteristics, transition preferences, and a high-level fit summary. Identifying information remains restricted.",
  },
  {
    question: "How are buyers reviewed?",
    answer: "CPA Bridge reviews identity, decision authority, acquisition criteria, funding capacity, relevant operating experience, timing, conflicts, and how the buyer intends to protect employees and clients.",
  },
  {
    question: "What is the difference between matching and ranking?",
    answer: "Matching asks whether a firm and buyer are compatible. Ranking helps order eligible opportunities or buyers by strength of fit and readiness. Neither grants access or overrides seller choice.",
  },
  {
    question: "How quickly should I expect opportunities?",
    answer: "Qualified buyers may see relevant opportunities as sellers become ready, but there is no guaranteed cadence. Seller timing, confidentiality, market fit, funding, and transaction size all affect deal flow.",
  },
];

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

function useReveal(page: PublicPage) {
  const reduced = useReducedMotion();
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-cpa-public]");
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    items.forEach((item) => item.classList.remove("cbp-visible"));
    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("cbp-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("cbp-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
    );
    items.forEach((item, index) => {
      const parent = item.parentElement;
      if (parent?.hasAttribute("data-stagger")) item.style.setProperty("--cbp-delay", `${Math.min(index * 65, 325)}ms`);
      observer.observe(item);
    });
    return () => observer.disconnect();
  }, [page, reduced]);
}

function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-7 lg:px-10", className)}>{children}</div>;
}

function Eyebrow({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return (
    <div className={cn("cbp-eyebrow inline-flex items-center gap-2.5", inverse ? "text-[#D98A5F]" : "text-[#5C655D]")}> 
      <span className={cn("h-1.5 w-1.5 rounded-full", inverse ? "bg-[#D98A5F]" : "bg-[#C15A34]")} aria-hidden="true" />
      {children}
    </div>
  );
}

function CTA({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "light" | "text";
  className?: string;
  type?: "button" | "submit";
}) {
  const styles = {
    primary: "border-[#14402F] bg-[#14402F] text-[#F5F1E6] hover:bg-[#0D2C20]",
    secondary: "border-[#B9AF98] bg-transparent text-[#1A2420] hover:border-[#14402F] hover:bg-[#FBF8EF]",
    light: "border-[#F5F1E6] bg-[#F5F1E6] text-[#14402F] hover:bg-white",
    text: "border-transparent bg-transparent px-0 text-[#14402F] hover:text-[#C15A34]",
  } as const;
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "cbp-button group inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] border px-5 py-3 text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C15A34]/35 focus-visible:ring-offset-2",
        styles[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  inverse?: boolean;
}) {
  return (
    <div className={cn("flex max-w-3xl flex-col gap-5", align === "center" && "mx-auto items-center text-center")}>
      <Eyebrow inverse={inverse}>{eyebrow}</Eyebrow>
      <h2 className={cn("cbp-display text-balance text-[34px] sm:text-[44px] lg:text-[52px]", inverse ? "text-[#F5F1E6]" : "text-[#1A2420]")}>{title}</h2>
      {body && <p className={cn("max-w-2xl text-pretty text-[16px] leading-8", inverse ? "text-[#F5F1E6]/68" : "text-[#5C655D]")}>{body}</p>}
    </div>
  );
}

function BridgeMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={cn("relative block h-10 w-10 rounded-[10px] border", inverse ? "border-[#F5F1E6]/30" : "border-[#14402F]/35")} aria-hidden="true">
      <span className={cn("absolute left-[9px] top-[8px] h-6 w-[2px]", inverse ? "bg-[#F5F1E6]" : "bg-[#14402F]")} />
      <span className={cn("absolute right-[9px] top-[8px] h-6 w-[2px]", inverse ? "bg-[#F5F1E6]" : "bg-[#14402F]")} />
      <span className={cn("absolute left-[11px] right-[11px] top-[11px] h-[13px] border-t-2", inverse ? "border-[#F5F1E6]" : "border-[#14402F]")} style={{ borderRadius: "999px 999px 0 0" }} />
      <span className="absolute bottom-[7px] left-[7px] right-[7px] h-[2px] bg-[#C15A34]" />
    </span>
  );
}

function Logo({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <BridgeMark inverse={inverse} />
      {!compact && (
        <div>
          <div className={cn("cbp-logo text-[21px] font-semibold leading-none", inverse ? "text-[#F5F1E6]" : "text-[#14402F]")}>CPA Bridge</div>
          <div className={cn("mt-1 text-[8px] font-semibold uppercase tracking-[.2em]", inverse ? "text-[#F5F1E6]/50" : "text-[#5C655D]")}>Confidential practice transactions</div>
        </div>
      )}
    </div>
  );
}

function SiteHeader({ page, setPage, onSignIn }: { page: PublicPage; setPage: (page: PublicPage) => void; onSignIn: () => void }) {
  const [open, setOpen] = useState(false);
  const nav: PublicPage[] = ["Sell Your Firm", "Our Approach", "Value & Deal Structure", "Buy a Firm", "Services", "About", "Insights"];
  return (
    <>
      <div className="border-b border-white/10 bg-[#0D2C20] text-[#F5F1E6]">
        <Container className="flex min-h-9 items-center justify-between gap-5 py-2 text-[9px] font-semibold uppercase tracking-[.17em] text-[#F5F1E6]/60">
          <span>Confidential CPA firm sale advisory</span>
          <button type="button" onClick={() => setPage("Contact")} className="hidden hover:text-[#F5F1E6] sm:inline">Private, no-obligation introduction</button>
        </Container>
      </div>
      <header className="sticky top-0 z-50 border-b border-[#D9CFB9] bg-[#F5F1E6]/95 backdrop-blur-xl">
        <Container className="flex h-[76px] items-center justify-between gap-5">
          <button type="button" onClick={() => setPage("Home")} aria-label="CPA Bridge home"><Logo /></button>
          <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">
            {nav.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPage(item)}
                className={cn(
                  "cbp-nav border-b-2 py-[29px] text-[10px] font-semibold uppercase tracking-[.1em]",
                  page === item ? "border-[#C15A34] text-[#14402F]" : "border-transparent text-[#5C655D] hover:text-[#14402F]",
                )}
              >
                {item}
              </button>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <button type="button" onClick={onSignIn} className="px-2 text-[12px] font-semibold text-[#5C655D] hover:text-[#14402F]">Client sign in</button>
            <CTA onClick={() => setPage("Contact")}>Start a conversation</CTA>
          </div>
          <button type="button" onClick={() => setOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-[10px] border border-[#B9AF98] text-[#14402F] md:hidden" aria-label="Toggle navigation">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </Container>
        {open && (
          <div className="border-t border-[#D9CFB9] bg-[#F5F1E6] md:hidden">
            <Container className="py-3">
              {["Home", ...nav, "FAQ", "Contact"].map((item) => (
                <button key={item} type="button" onClick={() => { setPage(item as PublicPage); setOpen(false); }} className="flex w-full items-center justify-between border-b border-[#D9CFB9] py-4 text-left text-[13px] font-semibold text-[#1A2420]">
                  {item}<ChevronRight size={16} />
                </button>
              ))}
              <button type="button" onClick={onSignIn} className="mt-4 w-full rounded-[10px] border border-[#14402F] px-4 py-3 text-[13px] font-semibold text-[#14402F]">Client sign in</button>
            </Container>
          </div>
        )}
      </header>
    </>
  );
}

function PageHero({
  eyebrow,
  title,
  body,
  children,
  aside,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  body: string;
  children?: ReactNode;
  aside?: ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section className={cn("relative overflow-hidden", dark ? "bg-[#0D2C20] text-[#F5F1E6]" : "bg-[#F5F1E6] text-[#1A2420]")}>
      {dark && <div className="cbp-grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />}
      {!dark && <div className="cbp-grain pointer-events-none absolute inset-0 opacity-45" aria-hidden="true" />}
      <Container className={cn("relative grid gap-12 py-20 lg:py-28", aside ? "lg:grid-cols-[1.03fr_.97fr] lg:items-center" : "max-w-[940px]")}>
        <div data-reveal>
          <Eyebrow inverse={dark}>{eyebrow}</Eyebrow>
          <h1 className={cn("cbp-display mt-7 max-w-[850px] text-balance text-[46px] sm:text-[58px] lg:text-[68px]", dark ? "text-[#F5F1E6]" : "text-[#1A2420]")}>{title}</h1>
          <p className={cn("mt-7 max-w-[760px] text-pretty text-[17px] leading-8 sm:text-[18px]", dark ? "text-[#F5F1E6]/70" : "text-[#5C655D]")}>{body}</p>
          {children && <div className="mt-8">{children}</div>}
        </div>
        {aside && <div data-reveal style={{ "--cbp-delay": "100ms" } as React.CSSProperties}>{aside}</div>}
      </Container>
    </section>
  );
}

function HeroDossier() {
  const listing = LISTINGS[0];
  return (
    <div className="relative mx-auto max-w-[520px]">
      <div className="relative z-10 overflow-hidden rounded-[24px] border border-[#D9CFB9] bg-[#FBF8EF] shadow-[0_30px_90px_-42px_rgba(13,44,32,.55)]">
        <div className="flex items-center justify-between border-b border-[#D9CFB9] px-6 py-4">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[.18em] text-[#5C655D]">Anonymous seller brief</div>
            <div className="mt-1 font-mono text-[12px] text-[#C15A34]">{listing.code}</div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#2F6A4F]/25 bg-[#2F6A4F]/10 px-3 py-1 text-[10px] font-semibold text-[#2F6A4F]"><span className="h-1.5 w-1.5 rounded-full bg-[#2F6A4F]" />Seller approved</span>
        </div>
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[12px] font-semibold text-[#14402F]">{listing.region}</div>
              <div className="cbp-display mt-2 text-[28px] text-[#1A2420]">Tax and advisory practice</div>
            </div>
            <ShieldCheck className="mt-1 text-[#C15A34]" size={22} />
          </div>
          <p className="mt-4 text-[13px] leading-6 text-[#5C655D]">{listing.summary}</p>
          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[12px] border border-[#D9CFB9] bg-[#D9CFB9]">
            {[
              ["Revenue", listing.revenue],
              ["Owner cash flow", listing.cashFlow],
              ["Team", listing.team],
              ["Clients", listing.clients],
            ].map(([label, value]) => (
              <div key={label} className="bg-[#F5F1E6] p-4">
                <div className="text-[9px] font-semibold uppercase tracking-[.14em] text-[#7A817B]">{label}</div>
                <div className="mt-2 text-[12px] font-semibold leading-5 text-[#1A2420]">{value}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[12px] border border-[#D9CFB9] bg-white/65 p-4">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-semibold text-[#1A2420]">Private information package</div>
              <LockKeyhole size={14} className="text-[#5C655D]" />
            </div>
            <div className="mt-3 space-y-2">
              {["Normalized financial summary", "Client concentration review", "Team and transition overview"].map((item) => (
                <div key={item} className="flex items-center justify-between text-[11px] text-[#5C655D]"><span className="flex items-center gap-2"><FileText size={13} />{item}</span><span className="text-[9px] uppercase tracking-[.12em]">Locked</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-5 -left-4 z-20 hidden items-center gap-3 rounded-[16px] border border-[#D9CFB9] bg-[#FBF8EF] px-4 py-3 shadow-[0_20px_55px_-30px_rgba(13,44,32,.65)] sm:flex">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#2F6A4F]/12 text-[#2F6A4F]"><BadgeCheck size={18} /></span>
        <div>
          <div className="text-[11px] font-semibold text-[#1A2420]">Seller approved this buyer</div>
          <div className="mt-0.5 text-[10px] text-[#5C655D]">Authorized package may now be released</div>
        </div>
      </div>
      <div className="absolute -right-3 -top-4 h-full w-full rounded-[26px] border border-[#D9CFB9] bg-[#EBE4D3]/70" aria-hidden="true" />
    </div>
  );
}

function ListingTicker() {
  const items = [...LISTINGS, ...LISTINGS];
  return (
    <div className="relative overflow-hidden border-y border-[#D9CFB9] bg-[#FBF8EF]/70 py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#F5F1E6] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#F5F1E6] to-transparent" />
      <div className="cbp-marquee-track flex w-max items-center gap-8 whitespace-nowrap">
        {items.map((listing, index) => (
          <span key={`${listing.code}-${index}`} className="flex items-center gap-3 text-[12px] text-[#5C655D]">
            <span className="font-mono text-[11px] text-[#C15A34]">{listing.code}</span>
            <span className="font-semibold text-[#1A2420]">{listing.region}</span>
            <span>{listing.revenue}</span>
            <span className="text-[#B9AF98]">·</span>
            <span>{listing.status}</span>
            <span className="ml-4 h-1 w-1 rounded-full bg-[#B9AF98]" />
          </span>
        ))}
      </div>
    </div>
  );
}

function StatsBand() {
  const stats = [
    ["100%", "Seller approval before identifying information is released"],
    ["2 checks", "CPA Bridge review and seller permission before document access"],
    ["6–12 mo", "Typical supported transition planning for employees and clients"],
    ["0", "Documents released simply because an NDA was signed"],
  ];
  return (
    <section className="bg-[#F5F1E6]">
      <Container className="py-14 sm:py-16">
        <dl data-stagger className="grid gap-px overflow-hidden rounded-[22px] border border-[#D9CFB9] bg-[#D9CFB9] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label} data-reveal className="bg-[#FBF8EF] p-7 sm:p-8">
              <dt className="cbp-display text-[38px] leading-none text-[#C15A34]">{value}</dt>
              <dd className="mt-3 text-[12px] leading-6 text-[#5C655D]">{label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="bg-[#FBF8EF]">
      <Container className="py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
          <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="The transaction path"
              title="Six deliberate steps. No sudden leap from interest to exposure."
              body="The process is designed so each new level of information follows a real decision. Owners know what is happening, buyers know what is expected, and no software shortcut quietly replaces judgment."
            />
          </div>
          <ol className="border-t border-[#B9AF98]">
            {PROCESS.map((step) => (
              <li key={step.number} data-reveal className="grid gap-4 border-b border-[#D9CFB9] py-7 sm:grid-cols-[64px_150px_1fr]">
                <div className="cbp-display text-[30px] text-[#C15A34]">{step.number}</div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[.15em] text-[#5C655D]">{step.label}</div>
                  <div className="mt-2 text-[14px] font-semibold leading-5 text-[#1A2420]">{step.title}</div>
                </div>
                <p className="text-[13px] leading-7 text-[#5C655D]">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function AudienceSection({ setPage, onCreateAccount }: { setPage: (page: PublicPage) => void; onCreateAccount: (role: PublicRole) => void }) {
  return (
    <section className="bg-[#F5F1E6]">
      <Container className="grid gap-5 py-20 lg:grid-cols-2 lg:py-28">
        <article data-reveal className="group relative overflow-hidden rounded-[28px] border border-[#D9CFB9] bg-[#FBF8EF] p-8 sm:p-10">
          <div className="flex h-full min-h-[420px] flex-col justify-between gap-10">
            <div>
              <Eyebrow>For practice owners</Eyebrow>
              <h2 className="cbp-display mt-6 max-w-lg text-[38px] sm:text-[48px]">Sell without surrendering control of the process.</h2>
              <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#5C655D]">Prepare the firm carefully, remain anonymous at first, approve every buyer who receives private information, and compare the complete transaction—not only the headline number.</p>
              <ul className="mt-8 space-y-3 text-[13px] text-[#5C655D]">
                {["Readiness and financial review", "Anonymous market positioning", "Seller-approved access", "Offer, diligence, and transition support"].map((item) => <li key={item} className="flex items-start gap-3"><Check size={16} className="mt-1 shrink-0 text-[#C15A34]" />{item}</li>)}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              <CTA onClick={() => setPage("Sell Your Firm")}>Explore selling<ArrowRight size={16} /></CTA>
              <CTA variant="text" onClick={() => onCreateAccount("seller")}>Create a seller account</CTA>
            </div>
          </div>
        </article>
        <article data-reveal style={{ "--cbp-delay": "90ms" } as React.CSSProperties} className="group relative overflow-hidden rounded-[28px] border border-[#14402F] bg-[#14402F] p-8 text-[#F5F1E6] sm:p-10">
          <div className="cbp-grid-lines pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative flex h-full min-h-[420px] flex-col justify-between gap-10">
            <div>
              <Eyebrow inverse>For qualified buyers</Eyebrow>
              <h2 className="cbp-display mt-6 max-w-lg text-[38px] text-[#F5F1E6] sm:text-[48px]">Find practices that fit how you actually intend to operate.</h2>
              <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#F5F1E6]/70">Build one buyer profile, establish funding and experience, and review anonymous opportunities before requesting access to a specific firm.</p>
              <ul className="mt-8 space-y-3 text-[13px] text-[#F5F1E6]/72">
                {["Anonymous opportunity discovery", "Criteria-based matching", "Funding and experience review", "Structured access, offer, and diligence path"].map((item) => <li key={item} className="flex items-start gap-3"><Check size={16} className="mt-1 shrink-0 text-[#D98A5F]" />{item}</li>)}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              <CTA variant="light" onClick={() => setPage("Buy a Firm")}>Explore buying<ArrowRight size={16} /></CTA>
              <CTA variant="text" className="text-[#F5F1E6] hover:text-[#D98A5F]" onClick={() => onCreateAccount("buyer")}>Create a buyer account</CTA>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="cbp-listing-card flex h-full flex-col rounded-[20px] border border-[#D9CFB9] bg-[#FBF8EF] p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] text-[#C15A34]">{listing.code}</span>
        <span className={cn("rounded-full border px-2.5 py-1 text-[9px] font-semibold", listing.status === "Under offer" ? "border-[#9A6A12]/25 bg-[#9A6A12]/10 text-[#7A5510]" : listing.status === "Reviewing interest" ? "border-[#2F6F9F]/25 bg-[#2F6F9F]/10 text-[#2F6F9F]" : "border-[#2F6A4F]/25 bg-[#2F6A4F]/10 text-[#2F6A4F]")}>{listing.status}</span>
      </div>
      <div className="mt-6">
        <div className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#5C655D]">{listing.region}</div>
        <h3 className="cbp-display mt-3 text-[25px] text-[#1A2420]">{listing.revenue}</h3>
        <p className="mt-4 text-[12px] leading-6 text-[#5C655D]">{listing.summary}</p>
      </div>
      <div className="mt-6 space-y-3 border-t border-[#D9CFB9] pt-5 text-[11px] leading-5 text-[#5C655D]">
        <div><span className="font-semibold text-[#1A2420]">Service mix:</span> {listing.mix}</div>
        <div><span className="font-semibold text-[#1A2420]">Team:</span> {listing.team}</div>
        <div><span className="font-semibold text-[#1A2420]">Clients:</span> {listing.clients}</div>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-[#D9CFB9] pt-5 text-[11px] font-semibold text-[#14402F]">
        Anonymous preview
        <LockKeyhole size={14} />
      </div>
    </article>
  );
}

function ListingsSection({ setPage }: { setPage: (page: PublicPage) => void }) {
  return (
    <section className="bg-[#FBF8EF]">
      <Container className="py-20 lg:py-28">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Confidential opportunities" title="See the shape of a firm before you see its name." body="Anonymous listings give approved buyers enough information to assess basic fit without exposing the owner, employees, clients, or exact location." />
          <CTA variant="secondary" onClick={() => setPage("Buy a Firm")} className="shrink-0">How buyer access works</CTA>
        </div>
        <div data-stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LISTINGS.map((listing) => <div key={listing.code} data-reveal><ListingCard listing={listing} /></div>)}
        </div>
      </Container>
    </section>
  );
}

function PrinciplesSection() {
  const principles = [
    ["Human-led, system-assisted", "Your deal lead owns the relationship and the judgment calls. The software keeps tasks, files, permissions, and decisions organized."],
    ["The seller controls access", "CPA Bridge may review and recommend a buyer, but the owner decides who receives identifying information and private records."],
    ["Anonymous discovery comes first", "Buyers learn the profile of the practice before they learn the name of the practice."],
    ["An NDA is not a master key", "Signing a confidentiality agreement makes a request eligible for review. It does not automatically release documents."],
  ];
  return (
    <section className="relative overflow-hidden border-y border-[#14402F] bg-[#0D2C20] text-[#F5F1E6]">
      <div className="cbp-grid-lines pointer-events-none absolute inset-0 opacity-45" />
      <Container className="relative grid gap-14 py-20 lg:grid-cols-[.82fr_1.18fr] lg:py-28">
        <div data-reveal>
          <SectionHeading inverse eyebrow="Non-negotiables" title="The rules that protect every transaction." body="These are not marketing promises added after the fact. They are the operating boundaries built into the way buyers, sellers, documents, and decisions move through CPA Bridge." />
        </div>
        <div data-stagger className="grid gap-4 sm:grid-cols-2">
          {principles.map(([title, body], index) => (
            <article key={title} data-reveal className="rounded-[22px] border border-[#F5F1E6]/10 bg-[#F5F1E6]/[.04] p-7">
              <div className="cbp-display text-[32px] text-[#D98A5F]">{String(index + 1).padStart(2, "0")}</div>
              <h3 className="cbp-display mt-5 text-[22px] text-[#F5F1E6]">{title}</h3>
              <p className="mt-3 text-[13px] leading-7 text-[#F5F1E6]/65">{body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function HumanSystemSection() {
  const human = ["The first owner conversation", "Readiness and market guidance", "Buyer review and fit judgment", "Offer comparison and negotiation support", "Diligence issue management", "Closing and transition decisions"];
  const system = ["Profiles and transaction status", "Tasks and missing-information tracking", "Access requests and permissions", "Document-release history", "Offer and diligence milestones", "Audit trail and closing readiness"];
  return (
    <section className="bg-[#F5F1E6]">
      <Container className="py-20 lg:py-28">
        <SectionHeading align="center" eyebrow="Human-led, system-assisted" title="People make the decisions. The system keeps the record." body="The platform removes avoidable confusion and administrative drift. It does not automate away the judgment an owner deserves during a life-changing transaction." />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <article data-reveal className="rounded-[24px] border border-[#D9CFB9] bg-[#FBF8EF] p-8">
            <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#C15A34]/10 text-[#C15A34]"><UserRound size={21} /></span><h3 className="cbp-display text-[25px]">What stays human</h3></div>
            <ul className="mt-6 divide-y divide-[#D9CFB9]">{human.map((item) => <li key={item} className="py-3.5 text-[13px] text-[#5C655D]">{item}</li>)}</ul>
          </article>
          <article data-reveal style={{ "--cbp-delay": "100ms" } as React.CSSProperties} className="rounded-[24px] border border-[#D9CFB9] bg-[#FBF8EF] p-8">
            <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#14402F]/10 text-[#14402F]"><Layers3 size={21} /></span><h3 className="cbp-display text-[25px]">What the system handles</h3></div>
            <ul className="mt-6 divide-y divide-[#D9CFB9]">{system.map((item) => <li key={item} className="py-3.5 text-[13px] text-[#5C655D]">{item}</li>)}</ul>
          </article>
        </div>
      </Container>
    </section>
  );
}

function ClosingBand({ setPage, onCreateAccount }: { setPage: (page: PublicPage) => void; onCreateAccount?: (role: PublicRole) => void }) {
  return (
    <section className="relative overflow-hidden bg-[#14402F] text-[#F5F1E6]">
      <div className="cbp-grid-lines pointer-events-none absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute -bottom-52 left-1/2 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-[#C15A34]/12 blur-3xl" />
      <Container className="relative flex flex-col items-center gap-7 py-24 text-center">
        <div data-reveal className="flex max-w-3xl flex-col items-center gap-5">
          <Eyebrow inverse>Start with one honest conversation</Eyebrow>
          <h2 className="cbp-display text-balance text-[40px] text-[#F5F1E6] sm:text-[54px]">You do not need a finished plan to ask the first question.</h2>
          <p className="max-w-2xl text-pretty text-[16px] leading-8 text-[#F5F1E6]/68">Whether you are years from a transition or actively evaluating an opportunity, the first step is private, practical, and free of obligation.</p>
        </div>
        <div data-reveal className="flex flex-col gap-3 sm:flex-row">
          <CTA variant="light" onClick={() => setPage("Contact")}>Talk with CPA Bridge</CTA>
          {onCreateAccount && <CTA variant="secondary" className="border-[#F5F1E6]/30 text-[#F5F1E6] hover:bg-[#F5F1E6]/10" onClick={() => onCreateAccount("seller")}>Create an account</CTA>}
        </div>
      </Container>
    </section>
  );
}

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-[#B9AF98]">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.question} className="border-b border-[#D9CFB9]">
            <button type="button" onClick={() => setOpen(expanded ? null : index)} className="flex w-full items-center justify-between gap-6 py-5 text-left">
              <span className="text-[14px] font-semibold leading-6 text-[#1A2420]">{item.question}</span>
              <ChevronDown size={18} className={cn("shrink-0 text-[#5C655D] transition-transform duration-200", expanded && "rotate-180")} />
            </button>
            <div className={cn("cbp-accordion", expanded && "cbp-accordion-open")}><div><p className="max-w-3xl pb-6 text-[13px] leading-7 text-[#5C655D]">{item.answer}</p></div></div>
          </div>
        );
      })}
    </div>
  );
}

function HomePage({ setPage, onCreateAccount }: { setPage: (page: PublicPage) => void; onCreateAccount: (role: PublicRole) => void }) {
  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="For CPA firm owners and qualified buyers"
        title="A better way to sell the firm you built."
        body="CPA Bridge combines former investment-banking and finance experience with a private, seller-controlled marketplace. We help owners prepare the business, reach qualified buyers, compare the whole deal, and protect employees, clients, and control along the way."
        aside={<HeroDossier />}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="max-w-[320px]">
            <CTA variant="light" onClick={() => setPage("Sell Your Firm")}>Talk about selling<ArrowRight size={16} /></CTA>
            <p className="mt-3 text-[10px] leading-5 text-[#F5F1E6]/52">No cost. No obligation. Confidential to CPA Bridge unless you authorize otherwise.</p>
          </div>
          <CTA variant="secondary" className="border-[#F5F1E6]/30 text-[#F5F1E6] hover:bg-[#F5F1E6]/10" onClick={() => setPage("Buy a Firm")}>Explore buying</CTA>
        </div>
      </PageHero>
      <ListingTicker />
      <StatsBand />
      <ProcessSection />
      <AudienceSection setPage={setPage} onCreateAccount={onCreateAccount} />
      <ListingsSection setPage={setPage} />
      <PrinciplesSection />
      <HumanSystemSection />
      <ClosingBand setPage={setPage} onCreateAccount={onCreateAccount} />
    </>
  );
}

function SellPage({ setPage, onCreateAccount }: { setPage: (page: PublicPage) => void; onCreateAccount: (role: PublicRole) => void }) {
  const promises = [
    ["You remain anonymous until you choose otherwise", "The market profile describes the practice without naming it. A buyer does not learn the identity of the firm until you approve that specific access request."],
    ["The difficult questions arrive early", "We review the records, clients, staffing, systems, and transition expectations before launch so gaps can be addressed without the pressure of a live buyer process."],
    ["Employees and clients are part of the deal", "Retention, communication, leadership, client introductions, and your own transition role are discussed alongside value and structure—not after the price is negotiated."],
    ["One deal lead stays accountable", "A dedicated CPA Bridge professional guides the process from the first conversation through offer review, diligence, closing, and the handoff."],
  ];
  const readiness = [
    ["Clear", "The core information is organized, consistent, and ready to support a credible market conversation.", "text-[#2F6A4F] bg-[#2F6A4F]/10 border-[#2F6A4F]/25"],
    ["Needs work", "The firm is viable, but a few gaps or explanations should be addressed before buyers see the opportunity.", "text-[#8A6114] bg-[#9A6A12]/10 border-[#9A6A12]/25"],
    ["Major concern", "A material issue could affect value, buyer confidence, or closing and should be resolved before outreach begins.", "text-[#A23E32] bg-[#B23A2C]/10 border-[#B23A2C]/25"],
  ];
  const buyerView = [
    ["Financial picture", "Are revenue, owner cash flow, and adjustments understandable and supported?"],
    ["Client durability", "How recurring is the work, and how dependent are relationships on the owner?"],
    ["Team continuity", "Can employees carry the work, and what will they need from a new owner?"],
    ["Operating systems", "Are processes, technology, and documentation transferable?"],
    ["Transition fit", "How long will the owner stay, and what needs to happen before the handoff feels safe?"],
  ];
  return (
    <>
      <PageHero
        eyebrow="For practice owners"
        title="Sell the practice you built—on your terms."
        body="Selling a firm is a career decision, not a listing exercise. CPA Bridge gives you a thoughtful preparation process, a dedicated deal lead, and control over who learns anything about the business."
        aside={
          <div className="rounded-[24px] border border-[#D9CFB9] bg-[#FBF8EF] p-7 sm:p-8">
            <div className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#5C655D]">What this first step is</div>
            <div className="cbp-display mt-5 text-[30px] text-[#1A2420]">A conversation—not a commitment.</div>
            <p className="mt-4 text-[13px] leading-7 text-[#5C655D]">You can ask about timing, value, readiness, buyer demand, employees, clients, or an offer already on your desk without deciding to list.</p>
            <div className="mt-6 border-t border-[#D9CFB9] pt-5 text-[11px] leading-6 text-[#5C655D]">No cost to speak with us. No obligation to continue. Nothing is shared outside CPA Bridge without your permission.</div>
          </div>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <CTA onClick={() => setPage("Contact")}>Start a confidential review<ArrowRight size={16} /></CTA>
          <CTA variant="secondary" onClick={() => setPage("Our Approach")}>See how a sale moves</CTA>
        </div>
      </PageHero>

      <section className="bg-[#FBF8EF]">
        <Container className="py-16 lg:py-20">
          <div data-reveal className="mx-auto max-w-[880px] rounded-[24px] border border-[#D9CFB9] bg-[#F5F1E6] p-7 sm:p-10">
            <div className="cbp-display text-[28px] text-[#1A2420] sm:text-[34px]">This may be one of the most significant decisions of your career.</div>
            <p className="mt-5 text-[15px] leading-8 text-[#5C655D]">You may be thinking about employees who trusted you, clients who grew with the firm, family plans, retirement, identity, or whether a buyer will understand what you actually built. Rushing that decision—or being pressured into a process before you are ready—serves no one. The rest of this page is here to help you think through the decision clearly.</p>
          </div>
        </Container>
      </section>

      <section className="bg-[#F5F1E6]">
        <Container className="grid gap-14 py-20 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:py-28">
          <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow="What you can count on" title="Confidentiality is the operating model, not a feature." body="Owners often worry that employees, clients, competitors, or referral partners will hear about a possible sale too early. The process is built to prevent that." />
          </div>
          <div className="border-y border-[#B9AF98]">
            {promises.map(([title, body]) => (
              <div key={title} data-reveal className="flex gap-4 border-b border-[#D9CFB9] py-7 last:border-b-0">
                <Check className="mt-1 shrink-0 text-[#C15A34]" size={18} />
                <div><h3 className="text-[17px] font-semibold text-[#1A2420]">{title}</h3><p className="mt-2 text-[13px] leading-7 text-[#5C655D]">{body}</p></div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-[#D9CFB9] bg-[#FBF8EF]">
        <Container className="py-20 lg:py-28">
          <SectionHeading eyebrow="The readiness review" title="Know where the firm stands before a buyer forms an opinion." body="This is what a serious buyer will actually look at—not to scare you, but so nothing catches you off guard later. You can skim the categories and still understand the point: preparation creates choices." />
          <div data-stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {readiness.map(([title, body, tone]) => (
              <article key={title} data-reveal className="rounded-[20px] border border-[#D9CFB9] bg-[#F5F1E6] p-7">
                <span className={cn("inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold", tone)}>{title}</span>
                <p className="mt-5 text-[13px] leading-7 text-[#5C655D]">{body}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[20px] border border-[#D9CFB9] bg-[#D9CFB9] md:grid-cols-5">
            {buyerView.map(([title, body]) => <div key={title} data-reveal className="bg-[#F5F1E6] p-6"><div className="text-[12px] font-semibold text-[#1A2420]">{title}</div><p className="mt-3 text-[11px] leading-6 text-[#5C655D]">{body}</p></div>)}
          </div>
        </Container>
      </section>

      <section className="bg-[#14402F] text-[#F5F1E6]">
        <Container className="grid gap-12 py-20 lg:grid-cols-[.9fr_1.1fr] lg:py-28">
          <div data-reveal>
            <Eyebrow inverse>People and relationships</Eyebrow>
            <h2 className="cbp-display mt-6 text-[38px] text-[#F5F1E6] sm:text-[48px]">Employees and clients deserve their own plan.</h2>
            <p className="mt-5 text-[15px] leading-8 text-[#F5F1E6]/70">For many owners, this matters as much as price. It should be evaluated directly rather than buried inside a generic transition checklist.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              [Users, "Employee timing", "Early exploration is usually kept within a very small circle. The communication plan is agreed before broader disclosure, with attention to who needs to know, when, and why."],
              [UserCheck, "Retention expectations", "Buyers should explain intended roles, leadership changes, compensation approach, flexibility, and how they plan to retain the people who keep the firm running."],
              [Handshake, "Client continuity", "Important relationships, referral sources, communication timing, and owner introductions are mapped so clients experience a thoughtful handoff rather than an abrupt announcement."],
            ].map(([Icon, title, body]) => {
              const IconComponent = Icon as typeof Users;
              return <article key={title as string} data-reveal className="rounded-[20px] border border-[#F5F1E6]/12 bg-[#F5F1E6]/[.04] p-6"><IconComponent size={20} className="text-[#D98A5F]" /><h3 className="mt-5 text-[15px] font-semibold text-[#F5F1E6]">{title as string}</h3><p className="mt-3 text-[12px] leading-6 text-[#F5F1E6]/65">{body as string}</p></article>;
            })}
          </div>
        </Container>
      </section>

      <section className="bg-[#F5F1E6]">
        <Container className="py-20 lg:py-28">
          <SectionHeading eyebrow="Your path" title="Five decisions, taken at a pace you can live with." body="The process can move with purpose without making you feel rushed. Each stage should answer a real question before the next one begins." />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[20px] border border-[#D9CFB9] bg-[#D9CFB9] md:grid-cols-5">
            {[
              ["01", "First conversation", "Discuss goals, timing, concerns, and what a good outcome means to you."],
              ["02", "Readiness review", "Understand what buyers will see and what is worth improving before outreach."],
              ["03", "Anonymous launch", "Approve the story and the information that can be shown without identifying the firm."],
              ["04", "Buyer decisions", "Review qualified buyers and choose who may receive each level of access."],
              ["05", "Offer and transition", "Compare the whole deal, complete diligence, and prepare employees and clients for the handoff."],
            ].map(([number, title, body]) => <li key={number} data-reveal className="bg-[#FBF8EF] p-6"><div className="cbp-display text-[28px] text-[#C15A34]">{number}</div><h3 className="mt-5 text-[14px] font-semibold text-[#1A2420]">{title}</h3><p className="mt-3 text-[11px] leading-6 text-[#5C655D]">{body}</p></li>)}
          </ol>
        </Container>
      </section>

      <section className="border-t border-[#D9CFB9] bg-[#FBF8EF]">
        <Container className="grid gap-12 py-20 lg:grid-cols-[.75fr_1.25fr] lg:py-28">
          <div data-reveal><SectionHeading eyebrow="Common questions" title="The questions owners ask before they are ready to say they are selling." body="You do not need to hunt through fine print to understand whether you are taking on cost, exposure, or an irreversible commitment." /></div>
          <div data-reveal><FAQAccordion items={OWNER_FAQS} /></div>
        </Container>
      </section>

      <section className="bg-[#F5F1E6]">
        <Container className="flex flex-col gap-7 py-20 sm:flex-row sm:items-end sm:justify-between">
          <div data-reveal className="max-w-2xl"><Eyebrow>A private first step</Eyebrow><h2 className="cbp-display mt-5 text-[34px] sm:text-[44px]">Curious what preparation would look like for your firm?</h2><p className="mt-4 text-[14px] leading-7 text-[#5C655D]">The first conversation is free, confidential, and designed to help you understand your options without pressure.</p></div>
          <div data-reveal className="shrink-0"><CTA onClick={() => setPage("Contact")}>Request a private introduction</CTA><button type="button" onClick={() => onCreateAccount("seller")} className="mt-4 block text-[11px] font-semibold text-[#14402F] hover:text-[#C15A34]">Or create a seller account</button></div>
        </Container>
      </section>
    </>
  );
}

function ApproachPage({ setPage }: { setPage: (page: PublicPage) => void }) {
  const access = [
    [Eye, "Anonymous discovery", "Buyers see region, size, service mix, staffing, client profile, and transition preferences without the firm's identity."],
    [ClipboardCheck, "Buyer review", "CPA Bridge reviews identity, funding, experience, criteria, timing, conflicts, and conduct before deeper consideration."],
    [FileCheck2, "Confidentiality agreement", "A signed agreement makes the request eligible for review. It does not release a document by itself."],
    [UserCheck, "Seller decision", "The owner reviews the specific buyer and decides whether identifying information may be shared."],
    [FileLock2, "Authorized release", "Only the package approved for that buyer is released. Deeper records remain gated for serious review and diligence."],
  ];
  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="Our approach"
        title="A transaction process built around judgment, not shortcuts."
        body="CPA Bridge combines experienced transaction guidance with a system that makes status, permissions, documents, and decisions visible. The technology creates discipline. People still make the decisions that matter."
        aside={
          <div className="rounded-[24px] border border-[#F5F1E6]/12 bg-[#F5F1E6]/[.04] p-7 text-[#F5F1E6]">
            <div className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#D98A5F]">Three distinct decisions</div>
            <div className="mt-6 space-y-5">
              {[
                ["Match", "Could this buyer and firm fit?"],
                ["Rank", "Which eligible opportunities deserve attention first?"],
                ["Access", "Has this seller approved this buyer for this information?"],
              ].map(([title, body], index) => <div key={title} className="grid grid-cols-[32px_1fr] gap-3 border-t border-[#F5F1E6]/12 pt-4"><div className="cbp-display text-[22px] text-[#D98A5F]">0{index + 1}</div><div><div className="text-[13px] font-semibold">{title}</div><div className="mt-1 text-[11px] leading-5 text-[#F5F1E6]/60">{body}</div></div></div>)}
            </div>
          </div>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row"><CTA variant="light" onClick={() => setPage("Contact")}>Discuss your situation</CTA><CTA variant="secondary" className="border-[#F5F1E6]/30 text-[#F5F1E6] hover:bg-[#F5F1E6]/10" onClick={() => setPage("Services")}>See the advisory work</CTA></div>
      </PageHero>

      <ProcessSection />

      <section className="border-y border-[#D9CFB9] bg-[#F5F1E6]">
        <Container className="py-20 lg:py-28">
          <SectionHeading eyebrow="Controlled access" title="Private information moves in stages, not all at once." body="A serious process gives buyers enough information to make progress while preserving the owner's ability to control identity, records, and timing." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-[20px] border border-[#D9CFB9] bg-[#D9CFB9] lg:grid-cols-5">
            {access.map(([Icon, title, body], index) => {
              const IconComponent = Icon as typeof Eye;
              return <article key={title as string} data-reveal className="bg-[#FBF8EF] p-6"><div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-[12px] bg-[#14402F]/8 text-[#14402F]"><IconComponent size={18} /></span><span className="cbp-display text-[24px] text-[#C15A34]">0{index + 1}</span></div><h3 className="mt-6 text-[14px] font-semibold text-[#1A2420]">{title as string}</h3><p className="mt-3 text-[11px] leading-6 text-[#5C655D]">{body as string}</p></article>;
            })}
          </div>
        </Container>
      </section>

      <HumanSystemSection />

      <section className="bg-[#FBF8EF]">
        <Container className="grid gap-14 py-20 lg:grid-cols-[.86fr_1.14fr] lg:py-28">
          <div data-reveal><SectionHeading eyebrow="Seller control" title="The owner keeps the decisions that cannot be delegated." body="CPA Bridge prepares, analyzes, coordinates, and advises. The owner decides whether to launch, who receives access, which offer to pursue, and whether the final transaction is acceptable." /></div>
          <div className="border-t border-[#B9AF98]">
            {[
              ["CPA Bridge prepares", "Readiness analysis, financial framing, buyer review, market materials, comparison tools, diligence coordination, and transaction tracking."],
              ["CPA Bridge recommends", "Potential positioning, buyer fit, information gates, negotiation priorities, risk responses, and next steps."],
              ["The owner decides", "Whether to proceed, what can be shared, which buyers advance, what terms are acceptable, and whether to close."],
              ["Specialists advise", "Legal, tax, accounting, lending, securities, escrow, and other regulated matters are handled by the appropriate separately engaged professionals."],
            ].map(([title, body]) => <div key={title} data-reveal className="grid gap-3 border-b border-[#D9CFB9] py-6 sm:grid-cols-[190px_1fr]"><div className="text-[13px] font-semibold text-[#1A2420]">{title}</div><p className="text-[12px] leading-6 text-[#5C655D]">{body}</p></div>)}
          </div>
        </Container>
      </section>

      <ClosingBand setPage={setPage} />
    </>
  );
}

function ValuationEstimator() {
  const [revenue, setRevenue] = useState(1500000);
  const low = Math.round((revenue * 0.75) / 50000) * 50000;
  const high = Math.round((revenue * 1.2) / 50000) * 50000;
  const format = (value: number) => `$${(value / 1000000).toFixed(value >= 1000000 ? 2 : 1)}M`;
  return (
    <div className="rounded-[24px] border border-[#D9CFB9] bg-[#FBF8EF] p-7 sm:p-9">
      <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#14402F]/8 text-[#14402F]"><Calculator size={20} /></span><div><div className="text-[13px] font-semibold text-[#1A2420]">Illustrative value range</div><div className="mt-1 text-[10px] text-[#5C655D]">A learning tool—not a valuation</div></div></div>
      <div className="mt-7 rounded-[14px] border border-[#C15A34]/25 bg-[#C15A34]/7 p-4 text-[12px] font-semibold leading-6 text-[#6F341F]">This estimate cannot account for earnings quality, concentration, owner dependence, staffing, growth, systems, deal structure, or buyer demand. A firm-specific analysis may be materially higher or lower.</div>
      <label className="mt-7 block text-[11px] font-semibold text-[#1A2420]">Approximate annual revenue</label>
      <input aria-label="Approximate annual revenue" className="mt-4 w-full accent-[#C15A34]" type="range" min="300000" max="5000000" step="50000" value={revenue} onChange={(event) => setRevenue(Number(event.target.value))} />
      <div className="mt-3 flex items-center justify-between text-[10px] text-[#5C655D]"><span>$300K</span><span className="font-semibold text-[#1A2420]">${revenue.toLocaleString()}</span><span>$5M</span></div>
      <div className="mt-7 border-t border-[#D9CFB9] pt-6">
        <div className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#5C655D]">Illustrative enterprise-value range</div>
        <div className="cbp-display mt-3 text-[38px] text-[#14402F]">{format(low)}–{format(high)}</div>
        <p className="mt-3 text-[10px] leading-5 text-[#5C655D]">The range is intentionally broad and is based on revenue alone. It should not be used to make a transaction decision.</p>
      </div>
    </div>
  );
}

function ValuePage({ setPage }: { setPage: (page: PublicPage) => void }) {
  const levers = [
    [LineChart, "Earnings quality", "Buyers need to understand what the firm earns after normalizing owner-specific, unusual, and nonrecurring items."],
    [Network, "Client durability", "Recurring work, concentration, retention, pricing, referral sources, and relationship ownership affect confidence in future revenue."],
    [Users, "Team depth", "A firm is more transferable when employees can serve clients, manage work, and support leadership beyond the selling owner."],
    [Target, "Buyer fit", "The strongest buyer is not always the one with the highest initial number. Operating fit, financing, timing, and transition capability matter."],
    [Scale, "Deal structure", "Cash, seller notes, earnouts, rollover equity, working capital, contingencies, and transition obligations determine the real economic outcome."],
    [Clock3, "Closing certainty", "Funding readiness, diligence discipline, decision authority, legal complexity, and responsiveness affect whether a signed offer actually closes."],
  ];
  return (
    <>
      <PageHero
        eyebrow="Value and deal structure"
        title="The number matters. So does everything attached to it."
        body="CPA Bridge helps owners understand value through the lens of earnings, risk, buyer fit, structure, timing, and certainty. A strong outcome is the combination of what is paid, how it is paid, and what the owner must do to receive it."
        aside={<ValuationEstimator />}
      >
        <CTA onClick={() => setPage("Contact")}>Request a firm-specific conversation<ArrowRight size={16} /></CTA>
      </PageHero>

      <section className="bg-[#FBF8EF]">
        <Container className="py-20 lg:py-28">
          <SectionHeading eyebrow="What creates value" title="Buyers pay for durable earnings they believe will transfer." body="The headline multiple is only the final expression of several underlying judgments. Preparation helps an owner understand which judgments can be improved and which risks need to be explained honestly." />
          <div data-stagger className="mt-12 grid gap-px overflow-hidden rounded-[20px] border border-[#D9CFB9] bg-[#D9CFB9] md:grid-cols-2 lg:grid-cols-3">
            {levers.map(([Icon, title, body]) => {
              const IconComponent = Icon as typeof LineChart;
              return <article key={title as string} data-reveal className="bg-[#F5F1E6] p-7"><IconComponent size={20} className="text-[#C15A34]" /><h3 className="mt-5 text-[15px] font-semibold text-[#1A2420]">{title as string}</h3><p className="mt-3 text-[12px] leading-6 text-[#5C655D]">{body as string}</p></article>;
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-[#D9CFB9] bg-[#F5F1E6]">
        <Container className="grid gap-14 py-20 lg:grid-cols-[.82fr_1.18fr] lg:py-28">
          <div data-reveal><SectionHeading eyebrow="Normalized earnings" title="A buyer needs to understand the business beneath the owner's tax return." body="Normalization is not about inflating the result. It is about separating the ongoing economics of the firm from owner choices, one-time items, and expenses that may change after a transaction." /></div>
          <div className="border-t border-[#B9AF98]">
            {[
              ["Start with reported results", "Reconcile revenue, compensation, operating expenses, and cash flow to complete financial records."],
              ["Identify explainable adjustments", "Separate legitimate owner-specific or nonrecurring items and document why a buyer should treat them differently."],
              ["Reflect replacement costs", "Consider the cost of replacing owner labor, leadership, business development, or technical work that will not disappear after closing."],
              ["Build a defensible bridge", "Present a clear path from reported earnings to normalized earnings so buyers can test the logic rather than guess at it."],
            ].map(([title, body], index) => <div key={title} data-reveal className="grid gap-4 border-b border-[#D9CFB9] py-6 sm:grid-cols-[44px_180px_1fr]"><div className="cbp-display text-[24px] text-[#C15A34]">0{index + 1}</div><div className="text-[13px] font-semibold text-[#1A2420]">{title}</div><p className="text-[12px] leading-6 text-[#5C655D]">{body}</p></div>)}
          </div>
        </Container>
      </section>

      <section className="bg-[#0D2C20] text-[#F5F1E6]">
        <Container className="py-20 lg:py-28">
          <SectionHeading inverse eyebrow="Compare the whole offer" title="A higher headline can still produce a weaker outcome." body="Offer comparison should make the tradeoffs visible. The owner should understand what is certain, what is contingent, what remains at risk, and what the buyer expects after closing." />
          <div className="mt-12 overflow-hidden rounded-[20px] border border-[#F5F1E6]/12">
            <div className="hidden grid-cols-[1.15fr_repeat(3,1fr)] bg-[#F5F1E6]/[.06] md:grid"><div className="p-4 text-[10px] font-semibold uppercase tracking-[.14em] text-[#F5F1E6]/50">Decision factor</div>{["Offer A", "Offer B", "Offer C"].map((item) => <div key={item} className="border-l border-[#F5F1E6]/12 p-4 text-[11px] font-semibold">{item}</div>)}</div>
            {[
              ["Headline value", "$2.4M", "$2.25M", "$2.32M"],
              ["Cash at closing", "55%", "90%", "75%"],
              ["Seller note", "20%", "10%", "15%"],
              ["Earnout", "25%", "None", "10%"],
              ["Financing", "Conditional", "Reviewed", "Reviewed"],
              ["Employee plan", "Limited detail", "Detailed", "Detailed"],
              ["Owner transition", "24 months", "9 months", "12 months"],
              ["Closing risk", "Higher", "Lower", "Moderate"],
            ].map((row) => <div key={row[0]} className="grid border-t border-[#F5F1E6]/12 md:grid-cols-[1.15fr_repeat(3,1fr)]"><div className="bg-[#F5F1E6]/[.035] p-4 text-[11px] font-semibold text-[#F5F1E6]">{row[0]}</div>{row.slice(1).map((value, index) => <div key={`${row[0]}-${index}`} className="border-t border-[#F5F1E6]/8 p-4 text-[11px] text-[#F5F1E6]/65 md:border-l md:border-t-0"><span className="mr-2 font-semibold text-[#F5F1E6]/40 md:hidden">{["Offer A", "Offer B", "Offer C"][index]}:</span>{value}</div>)}</div>)}
          </div>
        </Container>
      </section>

      <section className="bg-[#FBF8EF]">
        <Container className="grid gap-14 py-20 lg:grid-cols-[.8fr_1.2fr] lg:py-28">
          <div data-reveal><SectionHeading eyebrow="How CPA Bridge is paid" title="Fees should be understood before the process begins." body="The standard seller engagement is designed around a success fee payable when a transaction closes. The exact structure depends on transaction size, scope, complexity, and the services included." /></div>
          <div className="rounded-[24px] border border-[#D9CFB9] bg-[#F5F1E6] p-8">
            <div className="grid gap-7 sm:grid-cols-3">
              {[
                ["Before engagement", "The fee structure, scope, exclusivity, termination terms, and any approved expenses are explained in writing."],
                ["During the process", "There is no surprise invoice for ordinary activity that should be part of the agreed transaction process."],
                ["If no transaction closes", "Under the standard success-fee model, no success fee is due. Any separately approved third-party cost remains subject to the agreement."],
              ].map(([title, body]) => <div key={title}><div className="text-[13px] font-semibold text-[#1A2420]">{title}</div><p className="mt-3 text-[11px] leading-6 text-[#5C655D]">{body}</p></div>)}
            </div>
          </div>
        </Container>
      </section>

      <ClosingBand setPage={setPage} />
    </>
  );
}

function BuyPage({ setPage, onCreateAccount }: { setPage: (page: PublicPage) => void; onCreateAccount: (role: PublicRole) => void }) {
  const buyerTypes = [
    ["Individual operators", "Accounting professionals seeking to acquire and lead a practice directly."],
    ["Existing accounting firms", "Firms expanding geography, services, talent, capacity, or client relationships."],
    ["Search funds and entrepreneurs", "Acquirers with a defined mandate, operating plan, and identifiable capital."],
    ["PE-backed platforms", "Institutional buyers pursuing add-on acquisitions with dedicated financing and integration resources."],
  ];
  const approval = [
    ["Identity and authority", "Who is acquiring, who controls the entity, and who can make transaction decisions."],
    ["Funding capacity", "Available equity, lender relationships, financing conditions, and transaction-size range."],
    ["Relevant experience", "Accounting, tax, professional-services, leadership, acquisition, or integration experience."],
    ["Acquisition criteria", "Geography, size, service mix, timing, structure, seller transition, and strategic rationale."],
    ["Conduct and confidentiality", "Responsiveness, conflicts, information handling, and respect for seller-controlled access."],
  ];
  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="For buyers"
        title="Acquire firms that fit how you actually intend to operate."
        body="CPA Bridge helps qualified buyers discover anonymous opportunities, establish credibility once, and move from interest to access without wasting the seller's time or compromising confidentiality."
        aside={
          <div className="space-y-4">
            {LISTINGS.slice(0, 2).map((listing) => <div key={listing.code} className="rounded-[20px] border border-[#F5F1E6]/12 bg-[#F5F1E6]/[.04] p-5 text-[#F5F1E6]"><div className="flex items-center justify-between"><span className="font-mono text-[10px] text-[#D98A5F]">{listing.code}</span><span className="text-[9px] uppercase tracking-[.13em] text-[#F5F1E6]/45">Anonymous</span></div><div className="mt-4 text-[12px] font-semibold">{listing.region}</div><div className="cbp-display mt-2 text-[26px]">{listing.revenue}</div><div className="mt-3 text-[10px] leading-5 text-[#F5F1E6]/55">{listing.mix}</div></div>)}
          </div>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row"><CTA variant="light" onClick={() => onCreateAccount("buyer")}>Build a buyer profile<ArrowRight size={16} /></CTA><CTA variant="secondary" className="border-[#F5F1E6]/30 text-[#F5F1E6] hover:bg-[#F5F1E6]/10" onClick={() => setPage("Contact")}>Talk with buyer development</CTA></div>
      </PageHero>

      <section className="bg-[#FBF8EF]">
        <Container className="py-20 lg:py-28">
          <SectionHeading eyebrow="Who participates" title="Different buyers can be right for different sellers." body="A buyer's capital source matters, but so do operating capability, strategic rationale, leadership plan, employee approach, and willingness to support the seller's transition objectives." />
          <div data-stagger className="mt-12 grid gap-5 md:grid-cols-2">
            {buyerTypes.map(([title, body]) => <article key={title} data-reveal className="rounded-[20px] border border-[#D9CFB9] bg-[#F5F1E6] p-7"><h3 className="cbp-display text-[25px] text-[#1A2420]">{title}</h3><p className="mt-3 text-[13px] leading-7 text-[#5C655D]">{body}</p></article>)}
          </div>
        </Container>
      </section>

      <section className="border-y border-[#D9CFB9] bg-[#F5F1E6]">
        <Container className="grid gap-14 py-20 lg:grid-cols-[.78fr_1.22fr] lg:py-28">
          <div data-reveal><SectionHeading eyebrow="Buyer approval" title="Registration is the beginning of review, not the end." body="A complete profile helps CPA Bridge understand whether a buyer can pursue an opportunity responsibly and whether the stated criteria are specific enough to produce meaningful matches." /></div>
          <div className="border-t border-[#B9AF98]">
            {approval.map(([title, body], index) => <div key={title} data-reveal className="grid gap-4 border-b border-[#D9CFB9] py-6 sm:grid-cols-[44px_190px_1fr]"><div className="cbp-display text-[24px] text-[#C15A34]">0{index + 1}</div><div className="text-[13px] font-semibold text-[#1A2420]">{title}</div><p className="text-[12px] leading-6 text-[#5C655D]">{body}</p></div>)}
          </div>
        </Container>
      </section>

      <ListingsSection setPage={setPage} />

      <section className="bg-[#0D2C20] text-[#F5F1E6]">
        <Container className="grid gap-14 py-20 lg:grid-cols-2 lg:py-28">
          <div data-reveal>
            <SectionHeading inverse eyebrow="Matching and ranking" title="Fit and priority answer different questions." body="The system can help organize attention without turning a transaction into an auction or a black-box decision." />
            <div className="mt-8 space-y-4">
              {[
                ["Why matched", "Geography, size, service mix, funding capacity, experience, timing, transition preferences, conflicts, and operating rationale."],
                ["Why ranked here", "Match strength plus readiness, funding review, responsiveness, recent activity, seller preferences, and specific interest."],
                ["What neither decision does", "Matching and ranking do not grant access, guarantee seller interest, or create a right to confidential information."],
              ].map(([title, body]) => <div key={title} className="rounded-[18px] border border-[#F5F1E6]/12 bg-[#F5F1E6]/[.04] p-6"><div className="text-[13px] font-semibold text-[#F5F1E6]">{title}</div><p className="mt-3 text-[12px] leading-6 text-[#F5F1E6]/62">{body}</p></div>)}
            </div>
          </div>
          <div data-reveal>
            <SectionHeading inverse eyebrow="What to expect" title="Deal flow is selective, confidential, and seller-controlled." body="A strong profile improves relevance, but it does not guarantee a minimum number of opportunities or a fixed transaction timeline." />
            <div className="mt-8 border-t border-[#F5F1E6]/14">
              {[
                ["Opportunity cadence", "Listings appear when the seller, information, and market timing are ready—not on a guaranteed schedule."],
                ["Access timing", "A request may require clarification, buyer review, seller consideration, a confidentiality agreement, and a deliberate document release."],
                ["Seller priorities", "An owner may value employee continuity, financing certainty, local presence, transition quality, or cultural fit differently than the buyer expects."],
                ["Transaction timing", "Offer preparation, diligence, financing, legal work, and closing commonly take several months after initial access."],
              ].map(([title, body]) => <div key={title} className="border-b border-[#F5F1E6]/14 py-5"><div className="text-[13px] font-semibold text-[#F5F1E6]">{title}</div><p className="mt-2 text-[11px] leading-6 text-[#F5F1E6]/60">{body}</p></div>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#FBF8EF]">
        <Container className="grid gap-12 py-20 lg:grid-cols-[.75fr_1.25fr] lg:py-28">
          <div data-reveal><SectionHeading eyebrow="Buyer questions" title="What serious buyers usually want to understand first." body="The buyer side works best when criteria, capital, experience, and expectations are stated clearly before a specific seller is asked to engage." /></div>
          <div data-reveal><FAQAccordion items={BUYER_FAQS} /></div>
        </Container>
      </section>

      <ClosingBand setPage={setPage} onCreateAccount={onCreateAccount} />
    </>
  );
}

function ServicesPage({ setPage }: { setPage: (page: PublicPage) => void }) {
  const services = [
    ["01", "Sale readiness and financial positioning", "Review financial records, normalize earnings, identify concentration and transferability issues, and prepare an owner for the questions serious buyers will ask.", ["Readiness findings", "Normalized earnings bridge", "Priority issue list", "Preparation plan"]],
    ["02", "Positioning and market materials", "Translate the business into an anonymous market profile and a controlled information package that explains the firm without overexposing it.", ["Anonymous listing", "Opportunity narrative", "Information-release plan", "Seller-approved materials"]],
    ["03", "Buyer development, matching, and ranking", "Review buyers, clarify criteria, evaluate funding and experience, identify potential fit, and help the seller focus on the buyers most worth engaging.", ["Buyer profile review", "Match rationale", "Ranked shortlist", "Access recommendation"]],
    ["04", "Offer and negotiation support", "Compare the full economics and execution risk of each proposal, prepare negotiation priorities, and help the owner understand the tradeoffs before signing an LOI.", ["Offer comparison", "Structure analysis", "Negotiation priorities", "Decision support"]],
    ["05", "Diligence coordination", "Organize requests, manage document flow, track open issues, coordinate advisors, and keep the process from losing momentum or overwhelming the owner.", ["Request tracker", "Controlled data room", "Issue log", "Advisor coordination"]],
    ["06", "Closing and transition coordination", "Coordinate final readiness, closing dependencies, employee and client communication, owner responsibilities, and the practical handoff after the transaction.", ["Closing checklist", "Transition plan", "Communication plan", "Post-closing milestones"]],
  ];
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="One transaction team from preparation through transition."
        body="CPA Bridge combines transaction advisory, buyer development, process management, and a structured operating system so the owner is not left coordinating every person, file, decision, and deadline alone."
        aside={<div className="rounded-[24px] border border-[#D9CFB9] bg-[#FBF8EF] p-7"><div className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#5C655D]">The advisory model</div><div className="mt-6 space-y-4">{["Prepare the firm before outreach", "Create qualified buyer competition", "Compare value, structure, and certainty", "Coordinate diligence and professional advisors", "Protect employee and client transition"].map((item) => <div key={item} className="flex items-start gap-3 text-[12px] leading-6 text-[#5C655D]"><Check size={15} className="mt-1 shrink-0 text-[#C15A34]" />{item}</div>)}</div></div>}
      >
        <CTA onClick={() => setPage("Contact")}>Discuss the right scope</CTA>
      </PageHero>

      <section className="bg-[#FBF8EF]">
        <Container className="py-20 lg:py-28">
          <div className="border-t border-[#B9AF98]">
            {services.map(([number, title, body, outputs]) => (
              <article key={title as string} data-reveal className="grid gap-6 border-b border-[#D9CFB9] py-8 lg:grid-cols-[80px_1fr_1.05fr_.8fr] lg:gap-10">
                <div className="cbp-display text-[30px] text-[#C15A34]">{number as string}</div>
                <h2 className="cbp-display text-[28px] text-[#1A2420]">{title as string}</h2>
                <p className="text-[13px] leading-7 text-[#5C655D]">{body as string}</p>
                <div><div className="text-[9px] font-semibold uppercase tracking-[.14em] text-[#7A817B]">Typical outputs</div><ul className="mt-3 space-y-2">{(outputs as string[]).map((item) => <li key={item} className="flex items-start gap-2 text-[11px] text-[#5C655D]"><Check size={13} className="mt-0.5 shrink-0 text-[#14402F]" />{item}</li>)}</ul></div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-[#D9CFB9] bg-[#F5F1E6]">
        <Container className="grid gap-14 py-20 lg:grid-cols-[.82fr_1.18fr] lg:py-28">
          <div data-reveal><SectionHeading eyebrow="Professional specialists" title="Some work requires separate qualified professionals." body="CPA Bridge coordinates the transaction, but legal, tax, accounting, lending, securities, escrow, and other regulated services are handled only through appropriately qualified providers under their own engagements." /></div>
          <div data-stagger className="grid gap-4 sm:grid-cols-2">
            {[
              [Scale, "Transaction counsel", "LOI, definitive documents, legal diligence, employment matters, restrictive covenants, and closing documents."],
              [BarChart3, "Accounting and tax advisors", "Quality of earnings, tax structure, allocation, reporting, compliance, and other financial matters."],
              [Landmark, "Financing providers", "Credit review, lending terms, underwriting, approvals, and funding conditions."],
              [BriefcaseBusiness, "Escrow and closing providers", "Funds flow, closing administration, document completion, and settlement support."],
            ].map(([Icon, title, body]) => {
              const IconComponent = Icon as typeof Scale;
              return <article key={title as string} data-reveal className="rounded-[20px] border border-[#D9CFB9] bg-[#FBF8EF] p-6"><IconComponent size={20} className="text-[#C15A34]" /><h3 className="mt-5 text-[14px] font-semibold text-[#1A2420]">{title as string}</h3><p className="mt-3 text-[11px] leading-6 text-[#5C655D]">{body as string}</p></article>;
            })}
          </div>
        </Container>
      </section>

      <section className="bg-[#0D2C20] text-[#F5F1E6]">
        <Container className="grid gap-14 py-20 lg:grid-cols-[.82fr_1.18fr] lg:py-28">
          <div data-reveal><SectionHeading inverse eyebrow="Fees" title="Clear before commitment, aligned with completion." body="The standard seller engagement is success-fee based. The final fee depends on the size and complexity of the transaction and the work CPA Bridge is asked to perform." /></div>
          <div className="border-t border-[#F5F1E6]/14">
            {[
              ["Initial conversation", "No cost and no obligation."],
              ["Formal engagement", "Scope, success fee, exclusivity, termination, and any approved expenses are documented before work begins."],
              ["Successful closing", "The agreed success fee becomes due when the transaction closes."],
              ["No closing", "No success fee under the standard model. Any separately approved third-party expense is handled according to the engagement."],
            ].map(([title, body]) => <div key={title} className="grid gap-3 border-b border-[#F5F1E6]/14 py-6 sm:grid-cols-[190px_1fr]"><div className="text-[13px] font-semibold">{title}</div><p className="text-[12px] leading-6 text-[#F5F1E6]/62">{body}</p></div>)}
          </div>
        </Container>
      </section>

      <ClosingBand setPage={setPage} />
    </>
  );
}

function AboutPage({ setPage }: { setPage: (page: PublicPage) => void }) {
  const capabilities = [
    [BriefcaseBusiness, "Transaction leadership", "Former investment-banking and finance experience applied to preparation, positioning, negotiation, diligence, and execution."],
    [BarChart3, "Financial analysis", "A clear view of earnings, adjustments, transferability, concentration, structure, and buyer economics."],
    [Network, "Buyer development", "Qualification, criteria, funding review, fit analysis, outreach, and controlled access to opportunities."],
    [Route, "Process management", "A single record of tasks, documents, permissions, decisions, issues, and closing dependencies."],
    [Users, "People and transition planning", "Employee retention, client communication, owner handoff, leadership continuity, and post-closing expectations."],
    [ShieldCheck, "Confidentiality discipline", "Anonymous discovery, staged information release, seller approvals, transaction-specific permissions, and activity records."],
  ];
  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="About CPA Bridge"
        title="Built for the moment when a lifetime of work becomes a transaction."
        body="CPA Bridge was created because the sale of an accounting practice needs more than a listing page. It needs financial judgment, disciplined buyer development, careful information control, and respect for the employees, clients, and identity wrapped into the business."
        aside={
          <div className="rounded-[24px] border border-[#F5F1E6]/12 bg-[#F5F1E6]/[.04] p-7 text-[#F5F1E6]">
            <div className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#D98A5F]">Our point of view</div>
            <div className="cbp-display mt-6 text-[32px]">A firm should be prepared, not simply posted.</div>
            <p className="mt-4 text-[13px] leading-7 text-[#F5F1E6]/65">The work before buyer outreach often determines whether the owner receives clear options or spends the process explaining avoidable surprises.</p>
          </div>
        }
      >
        <CTA variant="light" onClick={() => setPage("Contact")}>Meet CPA Bridge</CTA>
      </PageHero>

      <section className="bg-[#FBF8EF]">
        <Container className="grid gap-14 py-20 lg:grid-cols-[.82fr_1.18fr] lg:py-28">
          <div data-reveal><SectionHeading eyebrow="Why we exist" title="Small professional-services firms deserve institutional-quality transaction support." body="Many owners built their firms through decades of client work, recruiting, problem solving, and personal reputation. Yet the sale process can still be fragmented across a broker, spreadsheet, inbox, data room, lawyer, lender, and buyer—leaving the owner to connect everything." /></div>
          <div className="space-y-6 text-[14px] leading-8 text-[#5C655D]">
            <p data-reveal>CPA Bridge brings former investment-banking and finance experience into a process designed specifically for accounting-practice transitions. The objective is not to make the transaction feel corporate. It is to bring structure and judgment without losing sight of the people and relationships that make the firm valuable.</p>
            <p data-reveal>We prepare before marketing, qualify before disclosure, separate matching from access, compare the whole offer, and coordinate the transaction through closing and transition. The owner remains the final decision-maker throughout.</p>
          </div>
        </Container>
      </section>

      <section className="border-y border-[#D9CFB9] bg-[#F5F1E6]">
        <Container className="py-20 lg:py-28">
          <SectionHeading eyebrow="What the team brings" title="Finance experience, transaction discipline, and respect for the practice itself." body="The capabilities below map directly to the work owners and buyers need during a confidential firm transition." />
          <div data-stagger className="mt-12 grid gap-px overflow-hidden rounded-[20px] border border-[#D9CFB9] bg-[#D9CFB9] md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(([Icon, title, body]) => {
              const IconComponent = Icon as typeof BriefcaseBusiness;
              return <article key={title as string} data-reveal className="bg-[#FBF8EF] p-7"><IconComponent size={20} className="text-[#C15A34]" /><h3 className="mt-5 text-[15px] font-semibold text-[#1A2420]">{title as string}</h3><p className="mt-3 text-[12px] leading-6 text-[#5C655D]">{body as string}</p></article>;
            })}
          </div>
        </Container>
      </section>

      <PrinciplesSection />

      <section className="bg-[#FBF8EF]">
        <Container className="py-20 lg:py-28">
          <SectionHeading eyebrow="What owners should expect" title="A process that is candid about risk and clear about responsibility." body="Trust is not created by promising a number. It is created by explaining what is known, what still needs work, what could change, and who is responsible for each decision." />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              ["No guaranteed valuation", "Market value depends on the firm, the buyers, the evidence, the structure, and the conditions at the time of a process."],
              ["No automatic disclosure", "Buyer approval, a match, a ranking, and an NDA are not substitutes for the seller's explicit permission."],
              ["No hidden professional role", "Legal, tax, accounting, lending, securities, and escrow work is performed only by qualified providers under appropriate engagements."],
              ["No pressure to accept", "The owner decides whether an offer, buyer, timing, and transition plan justify moving forward."],
            ].map(([title, body]) => <article key={title} data-reveal className="rounded-[20px] border border-[#D9CFB9] bg-[#F5F1E6] p-7"><h3 className="cbp-display text-[24px] text-[#1A2420]">{title}</h3><p className="mt-4 text-[12px] leading-6 text-[#5C655D]">{body}</p></article>)}
          </div>
        </Container>
      </section>

      <ClosingBand setPage={setPage} />
    </>
  );
}

function ReadinessChecklist() {
  const items = [
    "Three years of financial statements or tax returns are organized",
    "Revenue and owner cash flow can be explained clearly",
    "Client concentration and recurring work are understood",
    "Employee roles, tenure, and compensation are documented",
    "Major contracts, leases, and software systems are inventoried",
    "The owner has thought about timing and post-closing involvement",
  ];
  const [checked, setChecked] = useState<boolean[]>(items.map((_, index) => index < 2));
  const count = checked.filter(Boolean).length;
  const message = count <= 2 ? "You are at the beginning—which is exactly when preparation helps most." : count <= 4 ? "You have a useful foundation. A few focused gaps may be worth addressing before buyer outreach." : "You appear well prepared for a deeper readiness conversation.";
  return (
    <div className="rounded-[24px] border border-[#D9CFB9] bg-[#FBF8EF] p-7 sm:p-8">
      <div className="flex items-center justify-between gap-4"><div><div className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#5C655D]">Owner readiness check</div><div className="cbp-display mt-3 text-[28px] text-[#1A2420]">How prepared does the firm feel today?</div></div><div className="cbp-display text-[30px] text-[#C15A34]">{count}/6</div></div>
      <div className="mt-6 space-y-3">
        {items.map((item, index) => (
          <label key={item} className="flex cursor-pointer items-start gap-3 rounded-[12px] border border-[#D9CFB9] bg-[#F5F1E6] p-4 text-[12px] leading-6 text-[#5C655D]">
            <input type="checkbox" checked={checked[index]} onChange={() => setChecked((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))} className="mt-1 accent-[#C15A34]" />
            <span>{item}</span>
          </label>
        ))}
      </div>
      <div className="mt-6 rounded-[12px] bg-[#14402F]/7 p-4 text-[11px] leading-6 text-[#14402F]">{message}</div>
    </div>
  );
}

function InsightsPage({ setPage }: { setPage: (page: PublicPage) => void }) {
  const guides = [
    ["Seller readiness", "What to organize before a buyer process begins—and what can wait until serious interest exists.", "Read the preparation guide"],
    ["Normalized earnings", "How buyers think about owner compensation, one-time costs, replacement labor, and defensible adjustments.", "Understand earnings"],
    ["Client concentration", "Why relationship ownership, recurring work, retention, and a few large clients can change buyer confidence.", "Review concentration"],
    ["Offer comparison", "How to compare cash, seller financing, earnouts, contingencies, transition obligations, and closing risk.", "Compare deal terms"],
    ["Confidentiality", "What buyers should see at each stage and why an NDA should never automatically unlock the full data room.", "See the access stages"],
    ["Employee and client transition", "How timing, communication, retention, introductions, and owner involvement can protect continuity.", "Plan the handoff"],
  ];
  const glossary = [
    ["Normalized earnings", "An adjusted view of ongoing earnings after considering owner-specific, unusual, nonrecurring, and replacement-cost items."],
    ["Seller note", "A portion of the purchase price paid over time by the buyer under agreed repayment terms."],
    ["Earnout", "Future consideration tied to agreed post-closing performance or conditions."],
    ["Rollover equity", "A portion of the seller's value reinvested into the buyer or combined business."],
    ["Working capital", "The operating assets and liabilities needed to run the business at closing."],
    ["Letter of intent", "A preliminary document describing major proposed terms before definitive agreements and full diligence."],
    ["Quality of earnings", "A focused analysis of the sustainability, accuracy, and composition of reported earnings."],
    ["Data room", "A controlled repository for transaction information, often divided by permission and stage."],
  ];
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Understand the transaction before the transaction starts."
        body="Clear information helps owners ask better questions, prepare without panic, and recognize the difference between a promising headline and a workable deal."
        aside={<ReadinessChecklist />}
      >
        <CTA onClick={() => setPage("Contact")}>Ask a private question</CTA>
      </PageHero>

      <section className="bg-[#FBF8EF]">
        <Container className="py-20 lg:py-28">
          <SectionHeading eyebrow="Guides for owners" title="The questions worth understanding before buyer outreach." body="These guides are educational, not a substitute for advice tailored to your firm. They are designed to make the first professional conversation more useful." />
          <div data-stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {guides.map(([title, body, label], index) => <article key={title} data-reveal className="flex min-h-[280px] flex-col rounded-[20px] border border-[#D9CFB9] bg-[#F5F1E6] p-7"><div className="cbp-display text-[28px] text-[#C15A34]">0{index + 1}</div><h3 className="cbp-display mt-5 text-[25px] text-[#1A2420]">{title}</h3><p className="mt-4 text-[12px] leading-6 text-[#5C655D]">{body}</p><button type="button" onClick={() => setPage(index === 0 ? "Sell Your Firm" : index === 3 ? "Value & Deal Structure" : index === 4 ? "Our Approach" : "Contact")} className="mt-auto pt-8 text-left text-[11px] font-semibold text-[#14402F] hover:text-[#C15A34]">{label}<ArrowRight size={13} className="ml-2 inline" /></button></article>)}
          </div>
        </Container>
      </section>

      <section className="border-y border-[#D9CFB9] bg-[#F5F1E6]">
        <Container className="py-20 lg:py-28">
          <SectionHeading eyebrow="Transaction glossary" title="Plain language for terms that often arrive without explanation." body="A seller should not have to pretend to understand deal language in order to protect their interests." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-[20px] border border-[#D9CFB9] bg-[#D9CFB9] md:grid-cols-2">
            {glossary.map(([term, meaning]) => <div key={term} data-reveal className="bg-[#FBF8EF] p-6"><div className="text-[13px] font-semibold text-[#1A2420]">{term}</div><p className="mt-3 text-[11px] leading-6 text-[#5C655D]">{meaning}</p></div>)}
          </div>
        </Container>
      </section>

      <ClosingBand setPage={setPage} />
    </>
  );
}

function FAQPage({ setPage }: { setPage: (page: PublicPage) => void }) {
  const items: FAQItem[] = [
    ...OWNER_FAQS,
    ...BUYER_FAQS,
    {
      question: "How long does a sale process take?",
      answer: "There is no single timeline. Preparation may take weeks or months depending on the firm's records and issues. Once a qualified buyer is engaged, offer, diligence, financing, legal work, closing, and transition commonly take several additional months.",
    },
    {
      question: "How does CPA Bridge protect confidential information?",
      answer: "The process separates anonymous discovery, buyer review, confidentiality agreements, seller approval, authorized document release, serious review, and diligence. Access can be limited by buyer, document, stage, and permission.",
    },
    {
      question: "Will CPA Bridge recommend lawyers, accountants, lenders, or escrow providers?",
      answer: "CPA Bridge may help identify and coordinate qualified providers. Each provider is responsible for the work covered by its own engagement, and the owner or buyer remains free to choose appropriate advisors.",
    },
    {
      question: "What information is needed for the first conversation?",
      answer: "A first conversation can begin with goals, timing, a high-level firm profile, known concerns, and the transition you imagine. Do not send client records, tax returns, employee personal information, or banking data through the public form.",
    },
    {
      question: "Does CPA Bridge guarantee a price or a closing?",
      answer: "No. Value, buyer interest, financing, diligence, negotiated terms, and closing depend on the firm, the evidence, the market, and the parties involved. CPA Bridge's role is to prepare, advise, coordinate, and help the owner make informed decisions.",
    },
  ];
  return (
    <>
      <PageHero
        eyebrow="Frequently asked questions"
        title="Straight answers about a process that can feel unfamiliar."
        body="A CPA firm sale involves money, people, clients, timing, and personal decisions. These answers are a starting point; your own situation may call for a more specific conversation."
        aside={
          <div className="rounded-[24px] border border-[#D9CFB9] bg-[#FBF8EF] p-7">
            <div className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#5C655D]">Common topics</div>
            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4">
              {["Readiness", "Value", "Confidentiality", "Buyers", "Offers", "Diligence", "Closing", "Transition"].map((topic) => <div key={topic} className="border-t border-[#D9CFB9] pt-3 text-[11px] font-semibold text-[#1A2420]">{topic}</div>)}
            </div>
          </div>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row"><CTA onClick={() => setPage("Contact")}>Ask a private question</CTA><CTA variant="secondary" onClick={() => setPage("Our Approach")}>Explore the process</CTA></div>
      </PageHero>
      <section className="bg-[#FBF8EF]">
        <Container className="grid gap-12 py-20 lg:grid-cols-[.7fr_1.3fr] lg:py-28">
          <div data-reveal><SectionHeading eyebrow="Questions owners and buyers ask" title="You should not need to become a transaction expert overnight." body="The purpose of a good advisory process is to make the important questions visible and understandable before you are asked to decide." /></div>
          <div data-reveal><FAQAccordion items={items} /></div>
        </Container>
      </section>
    </>
  );
}

function ContactPage() {
  const [audience, setAudience] = useState<"seller" | "buyer" | "advisor" | "other">("seller");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event: FormEvent) => { event.preventDefault(); setSubmitted(true); };
  if (submitted) {
    return (
      <section className="min-h-[720px] bg-[#F5F1E6] py-24">
        <Container>
          <div data-reveal className="mx-auto max-w-[760px] rounded-[24px] border border-[#D9CFB9] bg-[#FBF8EF] p-9 sm:p-12">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[#2F6A4F]/10 text-[#2F6A4F]"><CheckCircle2 size={24} /></span>
            <h1 className="cbp-display mt-7 text-[42px] text-[#1A2420]">Your inquiry has been received.</h1>
            <p className="mt-5 text-[14px] leading-8 text-[#5C655D]">A CPA Bridge team member will review the information and respond using your preferred contact method. Please do not send confidential client records, employee information, tax returns, banking credentials, or transaction documents through ordinary email unless a secure method has been provided.</p>
            <div className="mt-8 border-t border-[#D9CFB9] pt-6">
              <div className="text-[10px] font-semibold uppercase tracking-[.15em] text-[#5C655D]">What happens next</div>
              <div className="mt-4 space-y-3">{["We review the purpose and timing of the inquiry", "We identify the appropriate CPA Bridge contact", "We schedule a confidential introductory conversation", "We provide a secure next step if documents are needed"].map((item) => <div key={item} className="flex items-start gap-3 text-[12px] leading-6 text-[#5C655D]"><Check size={15} className="mt-1 shrink-0 text-[#2F6A4F]" />{item}</div>)}</div>
            </div>
          </div>
        </Container>
      </section>
    );
  }
  const fieldClass = "mt-2 w-full rounded-[10px] border border-[#B9AF98] bg-[#F5F1E6] px-3 py-3 text-[13px] text-[#1A2420] outline-none transition focus:border-[#C15A34] focus:ring-2 focus:ring-[#C15A34]/15";
  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="Contact"
        title="Begin with a confidential conversation."
        body="You do not need to explain the entire firm or decide whether you are selling. Tell us what you are trying to understand, the timing you have in mind, and the questions that are weighing on you. We will take it from there."
        aside={
          <div className="rounded-[24px] border border-[#F5F1E6]/12 bg-[#F5F1E6]/[.04] p-7 text-[#F5F1E6]">
            <div className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#D98A5F]">Please keep sensitive records out of this form</div>
            <div className="mt-5 space-y-3">{["Client names or tax information", "Employee personal details", "Banking or payment credentials", "Tax returns or detailed financial records", "Executed transaction documents", "Passwords or access credentials"].map((item) => <div key={item} className="flex items-start gap-3 text-[12px] leading-6 text-[#F5F1E6]/65"><LockKeyhole size={15} className="mt-1 shrink-0 text-[#D98A5F]" />{item}</div>)}</div>
          </div>
        }
      />

      <section className="bg-[#F5F1E6]">
        <Container className="grid gap-10 py-20 lg:grid-cols-[.72fr_1.28fr] lg:py-28">
          <div data-reveal>
            <Eyebrow>Select an inquiry type</Eyebrow>
            <div className="mt-5 border-t border-[#B9AF98]">
              {[
                ["seller", "CPA firm owner", "Explore readiness, value, timing, succession, an unsolicited offer, or a possible sale."],
                ["buyer", "Prospective buyer", "Discuss criteria, experience, funding, buyer approval, or a specific opportunity."],
                ["advisor", "Professional advisor", "Coordinate with counsel, accountants, lenders, wealth advisors, or another transaction professional."],
                ["other", "Other inquiry", "Partnership, media, recruiting, technology, or another topic."],
              ].map(([value, title, body]) => (
                <button key={value} type="button" onClick={() => setAudience(value as typeof audience)} className={cn("w-full border-b border-[#D9CFB9] py-5 text-left transition", audience === value && "bg-[#FBF8EF] px-4")}>
                  <div className="text-[13px] font-semibold text-[#1A2420]">{title}</div>
                  <p className="mt-2 text-[11px] leading-6 text-[#5C655D]">{body}</p>
                </button>
              ))}
            </div>
            <div className="mt-8 rounded-[18px] border border-[#D9CFB9] bg-[#FBF8EF] p-6">
              <div className="text-[10px] font-semibold uppercase tracking-[.15em] text-[#5C655D]">Privacy and security</div>
              <p className="mt-3 text-[11px] leading-6 text-[#5C655D]">Use this form for introductory information only. CPA Bridge will provide a secure method before requesting confidential records.</p>
            </div>
          </div>
          <form data-reveal onSubmit={handleSubmit} className="rounded-[24px] border border-[#D9CFB9] bg-[#FBF8EF] p-7 sm:p-9">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-[11px] font-semibold text-[#1A2420]">First name *<input required className={fieldClass} /></label>
              <label className="text-[11px] font-semibold text-[#1A2420]">Last name *<input required className={fieldClass} /></label>
              <label className="text-[11px] font-semibold text-[#1A2420]">Email *<input required type="email" className={fieldClass} /></label>
              <label className="text-[11px] font-semibold text-[#1A2420]">Phone<input className={fieldClass} /></label>
              <label className="text-[11px] font-semibold text-[#1A2420] md:col-span-2">Firm or organization<input className={fieldClass} /></label>
              <label className="text-[11px] font-semibold text-[#1A2420]">Timing<select className={fieldClass}><option>Exploring options</option><option>Within 6 months</option><option>6–12 months</option><option>12–24 months</option><option>More than 24 months</option><option>Active transaction</option></select></label>
              <label className="text-[11px] font-semibold text-[#1A2420]">Preferred contact<select className={fieldClass}><option>Email</option><option>Phone</option><option>Either</option></select></label>
              <label className="text-[11px] font-semibold text-[#1A2420] md:col-span-2">What would you like to discuss? *<textarea required rows={7} className={fieldClass} placeholder={audience === "seller" ? "Share your goals, timing, transition preferences, known concerns, and the questions you want answered." : audience === "buyer" ? "Describe your acquisition criteria, relevant experience, funding approach, and timing." : audience === "advisor" ? "Describe your role, the transaction context at a high level, and what coordination is requested." : "Describe the purpose of your inquiry."} /></label>
            </div>
            <label className="mt-6 flex items-start gap-3 text-[10px] leading-5 text-[#5C655D]"><input required type="checkbox" className="mt-1 accent-[#C15A34]" />I have read the Privacy Policy and consent to CPA Bridge using this information to respond to my inquiry.</label>
            <div className="mt-5 rounded-[12px] border border-[#D9CFB9] bg-[#F5F1E6] p-4 text-[10px] leading-5 text-[#5C655D]">This form uses anti-abuse controls. Do not submit sensitive personal, client, financial, tax, or transaction information.</div>
            <div className="mt-7 max-w-[440px]"><CTA type="submit">Submit confidential inquiry<ArrowRight size={15} /></CTA><p className="mt-3 text-[10px] leading-5 text-[#5C655D]">No cost to submit. No obligation to proceed. Your inquiry stays with CPA Bridge unless you authorize information to be shared.</p></div>
          </form>
        </Container>
      </section>
    </>
  );
}

const LEGAL_CONTENT: Record<(typeof LEGAL_PAGES)[number], { intro: string; sections: Array<[string, string]> }> = {
  "Terms of Use": {
    intro: "These terms govern use of the CPA Bridge website, accounts, transaction workspaces, and related services.",
    sections: [
      ["Acceptable use", "Use CPA Bridge only for lawful inquiries, approved account activity, and authorized transaction review. Do not misrepresent identity, funding, authority, or intent."],
      ["Confidential information", "Information received through CPA Bridge may be subject to transaction-specific permissions, confidentiality agreements, download limits, use restrictions, retention duties, and deletion requirements."],
      ["No guarantee", "CPA Bridge does not guarantee a valuation, buyer or seller interest, financing, negotiated terms, diligence result, regulatory approval, closing, transition, or financial outcome."],
      ["Professional relationships", "Website use, forms, and account registration do not by themselves create a fiduciary, legal, tax, accounting, lending, or securities relationship."],
      ["Changes and suspension", "CPA Bridge may update the website, terms, access, or functionality and may restrict access for security, legal, contractual, operational, or misuse reasons."],
    ],
  },
  "Privacy Policy": {
    intro: "This policy explains how CPA Bridge may collect, use, disclose, retain, and protect personal information in connection with the website and services.",
    sections: [
      ["Information collected", "Information may include contact details, account information, firm or buyer information, inquiry content, transaction preferences, communications, device and usage data, and information submitted through authorized workspaces."],
      ["How information is used", "Information may be used to respond to inquiries, operate accounts, evaluate buyers and sellers, support transactions, manage security, improve services, and meet contractual or legal requirements."],
      ["How information is disclosed", "Information may be disclosed to authorized transaction parties, service providers, professional advisors, technology vendors, regulators, legal authorities, or other parties when permitted or required."],
      ["Transaction-specific controls", "Seller identity, buyer information, documents, and transaction data may be subject to separate confidentiality agreements, permissions, engagement terms, and data-room rules."],
      ["Rights and requests", "Depending on applicable law, individuals may request access, correction, deletion, portability, restriction, or information about the handling of personal data."],
    ],
  },
  "Cookie Policy": {
    intro: "This policy describes the categories of cookies and similar technologies that may be used on the CPA Bridge website.",
    sections: [
      ["Essential technologies", "These support security, authentication, session management, forms, preferences, accessibility, and core site operation."],
      ["Analytics", "Analytics may help CPA Bridge understand aggregate usage, page performance, errors, and navigation. Nonessential analytics should follow applicable consent requirements."],
      ["Preferences", "Preference technologies may remember display, language, cookie, or other user choices."],
      ["Managing preferences", "Visitors may use the cookie controls to accept all, reject nonessential technologies, or manage categories."],
    ],
  },
  Accessibility: {
    intro: "CPA Bridge is committed to providing a website and digital experience that is usable by people with disabilities.",
    sections: [
      ["Design approach", "The website is designed to support readable contrast, keyboard navigation, visible focus, semantic headings, descriptive controls, responsive layouts, and alternatives to color-only meaning."],
      ["Ongoing review", "Accessibility is an ongoing process. CPA Bridge may test, monitor, and improve public pages, forms, accounts, documents, and transaction workflows over time."],
      ["Third-party content", "Some third-party documents, applications, or professional-provider tools may be outside CPA Bridge's direct control."],
      ["Request assistance", "Users who experience an accessibility barrier may contact CPA Bridge and describe the page, feature, preferred format, and support needed."],
    ],
  },
  "Security & Confidentiality": {
    intro: "CPA Bridge is designed around staged visibility, role permissions, explicit approvals, and transaction-specific information access.",
    sections: [
      ["Staged confidentiality", "Public information, anonymous listings, approved-buyer information, seller-approved releases, serious-review materials, and diligence information remain separate levels."],
      ["Distinct decisions", "Buyer approval, matching, ranking, request review, confidentiality agreement, seller permission, and document release are separate states."],
      ["Access management", "Access may be limited by user, role, transaction, document, time, download permission, watermark, confidentiality level, or other control."],
      ["Activity records", "Relevant actions may be logged, including access requests, approvals, releases, status changes, and administrative activity."],
      ["User responsibility", "Users remain responsible for credential protection, device security, authorized use, and compliance with confidentiality restrictions."],
    ],
  },
  "Professional-Services Disclaimer": {
    intro: "CPA Bridge coordinates transaction advisory and related work. Some services require separate qualified or licensed professionals.",
    sections: [
      ["No legal advice", "Website content and CPA Bridge coordination do not constitute legal advice. Transaction documents and legal matters should be handled by qualified counsel."],
      ["No tax or accounting advice", "General transaction analysis does not replace advice from qualified tax or accounting professionals regarding structure, reporting, compliance, allocation, or diligence."],
      ["No lending commitment", "Financing coordination and lender introductions do not constitute a loan commitment, credit decision, guarantee, or financing approval."],
      ["Regulated activity", "Any service requiring registration, licensing, authorization, or a regulated professional relationship will be provided only through an appropriately qualified party."],
      ["No outcome guarantee", "No valuation, buyer interest, financing, terms, closing, tax result, transition, or financial outcome is guaranteed."],
    ],
  },
  "Electronic Communications Consent": {
    intro: "This consent explains how CPA Bridge may deliver notices, disclosures, records, and transaction communications electronically.",
    sections: [
      ["Electronic delivery", "Users may receive communications through email, the website, an account, a secure portal, an electronic-signature service, or another approved electronic method."],
      ["Hardware and access", "Users are responsible for maintaining a supported device, internet access, current browser, ability to view common file formats, and accurate contact information."],
      ["Paper copies", "Users may request paper copies where available and may be responsible for reasonable delivery or administrative costs if disclosed."],
      ["Recordkeeping", "Users should retain copies of important communications, agreements, disclosures, and transaction documents."],
    ],
  },
  "Acceptable Use": {
    intro: "Users must use CPA Bridge systems, information, and transaction materials lawfully, securely, and only for authorized purposes.",
    sections: [
      ["Permitted use", "Use is limited to legitimate inquiries, approved account activity, authorized transaction review, and other purposes expressly permitted by CPA Bridge and applicable agreements."],
      ["Prohibited conduct", "Users may not misrepresent identity or funding, scrape data, bypass controls, probe security, distribute malware, interfere with service, or access information without authorization."],
      ["Confidential materials", "Users may not forward, copy, download, retain, disclose, or use confidential materials beyond the permission granted for the specific transaction."],
      ["Enforcement", "CPA Bridge may restrict, suspend, terminate, investigate, preserve records, or notify affected parties or authorities when misuse is suspected."],
    ],
  },
  "Data Rights & Requests": {
    intro: "This page explains how individuals may submit privacy and personal-data requests to CPA Bridge.",
    sections: [
      ["Available requests", "Depending on applicable law, a person may request access, correction, deletion, portability, restriction, objection, or information about data practices."],
      ["Verification", "CPA Bridge may request information needed to verify identity, authority, account ownership, or an authorized-agent relationship before responding."],
      ["Limitations", "Some information may need to be retained for legal, contractual, security, transaction, recordkeeping, or dispute-resolution purposes."],
      ["How to submit", "Use the Contact page and select a privacy or data-rights inquiry. Do not include sensitive records in the initial message."],
    ],
  },
  "Site Map": {
    intro: "Use this page to understand the public CPA Bridge website and the intended path for owners, buyers, and professional advisors.",
    sections: [
      ["For owners", "Home, Sell Your Firm, Our Approach, Value & Deal Structure, Services, Insights, FAQ, and Contact."],
      ["For buyers", "Home, Buy a Firm, Our Approach, Insights, FAQ, Contact, and client sign in."],
      ["About and trust", "About, Security & Confidentiality, Privacy Policy, Terms of Use, Accessibility, and Professional-Services Disclaimer."],
      ["Account experiences", "Seller, buyer, and administrative workspaces are available through approved account access."],
    ],
  },
};

function LegalPage({ page }: { page: (typeof LEGAL_PAGES)[number] }) {
  const content = LEGAL_CONTENT[page];
  return (
    <>
      <PageHero eyebrow="Legal and trust" title={page} body={content.intro} />
      <section className="bg-[#FBF8EF]">
        <Container className="grid gap-12 py-20 lg:grid-cols-[260px_1fr] lg:py-28">
          <aside data-reveal className="h-fit rounded-[20px] border border-[#D9CFB9] bg-[#F5F1E6] p-6 lg:sticky lg:top-28">
            <div className="text-[10px] font-semibold uppercase tracking-[.15em] text-[#5C655D]">Important note</div>
            <p className="mt-4 text-[11px] leading-6 text-[#5C655D]">This page provides general website information and may not address every jurisdiction, engagement, or transaction. Specific legal questions should be directed to qualified counsel.</p>
          </aside>
          <div className="border-t border-[#B9AF98]">
            {content.sections.map(([title, body]) => <section key={title} data-reveal className="border-b border-[#D9CFB9] py-7"><h2 className="cbp-display text-[26px] text-[#1A2420]">{title}</h2><p className="mt-4 max-w-3xl text-[13px] leading-7 text-[#5C655D]">{body}</p></section>)}
          </div>
        </Container>
      </section>
    </>
  );
}

function Footer({ setPage }: { setPage: (page: PublicPage) => void }) {
  return (
    <footer className="bg-[#0D2C20] text-[#F5F1E6]">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_.7fr_.7fr_.85fr_1fr]">
          <div className="max-w-[420px]">
            <Logo inverse />
            <p className="mt-7 text-[13px] leading-7 text-[#F5F1E6]/64">Former investment-banking and finance professionals helping CPA firm owners prepare, position, market, negotiate, and execute confidential business transitions designed to protect value, certainty, employees, clients, and legacy.</p>
            <button type="button" onClick={() => setPage("Contact")} className="mt-7 border-b border-[#D98A5F] pb-1 text-[11px] font-semibold text-[#F5F1E6] hover:text-[#D98A5F]">Begin a confidential discussion</button>
          </div>
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[.17em] text-[#F5F1E6]/40">For owners</div>
            <div className="mt-5 space-y-3">{["Sell Your Firm", "Our Approach", "Value & Deal Structure", "Services", "FAQ"].map((item) => <button key={item} type="button" onClick={() => setPage(item as PublicPage)} className="block text-left text-[11px] text-[#F5F1E6]/68 hover:text-[#F5F1E6]">{item}</button>)}</div>
          </div>
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[.17em] text-[#F5F1E6]/40">For buyers</div>
            <div className="mt-5 space-y-3">{["Buy a Firm", "Our Approach", "Insights", "FAQ", "Contact"].map((item) => <button key={item} type="button" onClick={() => setPage(item as PublicPage)} className="block text-left text-[11px] text-[#F5F1E6]/68 hover:text-[#F5F1E6]">{item}</button>)}</div>
          </div>
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[.17em] text-[#F5F1E6]/40">CPA Bridge</div>
            <div className="mt-5 space-y-3">{["About", "Insights", "Contact"].map((item) => <button key={item} type="button" onClick={() => setPage(item as PublicPage)} className="block text-left text-[11px] text-[#F5F1E6]/68 hover:text-[#F5F1E6]">{item}</button>)}</div>
            <div className="mt-7 text-[9px] font-semibold uppercase tracking-[.17em] text-[#F5F1E6]/40">Contact</div>
            <div className="mt-4 space-y-3 text-[11px] leading-5 text-[#F5F1E6]/68">
              <div className="flex gap-2"><MapPin size={13} className="mt-0.5 shrink-0 text-[#D98A5F]" /><span>Boston, Massacheusetts<br />Serving owners nationwide</span></div>
              <a href="mailto:confidential@cpabridge.com" className="flex items-center gap-2 hover:text-[#F5F1E6]"><Mail size={13} className="text-[#D98A5F]" />confidential@cpabridge.com</a>
              <a href="tel:+12065550142" className="flex items-center gap-2 hover:text-[#F5F1E6]"><Phone size={13} className="text-[#D98A5F]" />(617) 555-0199</a>
              <a href="https://www.linkedin.com/company/cpa-bridge" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#F5F1E6]"><Linkedin size={13} className="text-[#D98A5F]" />LinkedIn</a>
            </div>
          </div>
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[.17em] text-[#F5F1E6]/40">Legal and trust</div>
            <div className="mt-5 space-y-3">{LEGAL_PAGES.map((item) => <button key={item} type="button" onClick={() => setPage(item)} className="block text-left text-[11px] leading-5 text-[#F5F1E6]/68 hover:text-[#F5F1E6]">{item}</button>)}</div>
          </div>
        </div>
        <div className="mt-12 border-t border-[#F5F1E6]/12 pt-8 text-[9px] leading-5 text-[#F5F1E6]/40 md:flex md:items-start md:justify-between md:gap-8">
          <p>© 2026 CPA Bridge. All rights reserved.</p>
          <p className="mt-4 max-w-[820px] md:mt-0 md:text-right">CPA Bridge coordinates transaction advisory and related work. Legal, tax, accounting, lending, securities, escrow, and other regulated services are provided only through separately engaged qualified professionals.</p>
        </div>
      </Container>
    </footer>
  );
}

function CookiePanel() {
  const [visible, setVisible] = useState(true);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  if (!visible) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 z-[80] mx-auto max-w-[520px] rounded-[18px] border border-[#D9CFB9] bg-[#FBF8EF]/95 p-5 shadow-[0_24px_70px_-38px_rgba(13,44,32,.7)] backdrop-blur-xl sm:left-auto sm:mx-0 sm:w-[430px]">
      <div className="text-[12px] font-semibold text-[#1A2420]">Cookie preferences</div>
      <p className="mt-2 text-[10px] leading-5 text-[#5C655D]">CPA Bridge uses essential technologies for site operation. Optional analytics help us understand aggregate usage.</p>
      {manage && <div className="mt-4 border-t border-[#D9CFB9] pt-3"><div className="flex items-center justify-between py-2 text-[10px]"><span>Essential</span><span className="font-semibold text-[#2F6A4F]">Always on</span></div><label className="flex items-center justify-between py-2 text-[10px]"><span>Analytics</span><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} className="accent-[#C15A34]" /></label></div>}
      <div className="mt-5 flex flex-wrap gap-2"><button type="button" onClick={() => setVisible(false)} className="rounded-[8px] border border-[#14402F] bg-[#14402F] px-4 py-2 text-[10px] font-semibold text-[#F5F1E6]">Accept all</button><button type="button" onClick={() => setVisible(false)} className="rounded-[8px] border border-[#B9AF98] px-4 py-2 text-[10px] font-semibold text-[#14402F]">Reject nonessential</button><button type="button" onClick={() => setManage((value) => !value)} className="px-2 py-2 text-[10px] font-semibold text-[#5C655D]">Manage preferences</button></div>
    </div>
  );
}

export function PublicSite({ onSignIn, onCreateAccount }: PublicSiteProps) {
  const [page, setPage] = useState<PublicPage>("Home");
  useReveal(page);
  const navigate = (next: PublicPage) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  let content: ReactNode;
  if (page === "Home") content = <HomePage setPage={navigate} onCreateAccount={onCreateAccount} />;
  else if (page === "Sell Your Firm") content = <SellPage setPage={navigate} onCreateAccount={onCreateAccount} />;
  else if (page === "Our Approach") content = <ApproachPage setPage={navigate} />;
  else if (page === "Value & Deal Structure") content = <ValuePage setPage={navigate} />;
  else if (page === "Buy a Firm") content = <BuyPage setPage={navigate} onCreateAccount={onCreateAccount} />;
  else if (page === "Services") content = <ServicesPage setPage={navigate} />;
  else if (page === "About") content = <AboutPage setPage={navigate} />;
  else if (page === "Insights") content = <InsightsPage setPage={navigate} />;
  else if (page === "FAQ") content = <FAQPage setPage={navigate} />;
  else if (page === "Contact") content = <ContactPage />;
  else content = <LegalPage page={page as (typeof LEGAL_PAGES)[number]} />;

  return (
    <div data-cpa-public className="min-h-screen bg-[#F5F1E6] text-[#1A2420]">
      <SiteHeader page={page} setPage={navigate} onSignIn={onSignIn} />
      <main>{content}</main>
      <Footer setPage={navigate} />
      <CookiePanel />
    </div>
  );
}

export function BrandStudio() {
  const [section, setSection] = useState<"direction" | "experience" | "components" | "qa">("direction");
  const nav = [
    ["direction", "Creative direction"],
    ["experience", "Experience principles"],
    ["components", "Component system"],
    ["qa", "Launch QA"],
  ] as const;
  return (
    <div data-cpa-public className="min-h-screen bg-[#E9E1D0] text-[#1A2420]">
      <div className="bg-[#0D2C20] text-[#F5F1E6]"><Container className="flex min-h-[76px] items-center justify-between"><Logo inverse /><div className="text-[9px] font-semibold uppercase tracking-[.17em] text-[#F5F1E6]/40">Internal design reference</div></Container></div>
      <Container className="grid gap-8 py-10 lg:grid-cols-[250px_1fr]">
        <aside className="h-fit rounded-[18px] border border-[#CFC4AC] bg-[#FBF8EF] p-4 lg:sticky lg:top-6">
          {nav.map(([value, label]) => <button key={value} type="button" onClick={() => setSection(value)} className={cn("flex w-full items-center justify-between border-b border-[#D9CFB9] px-2 py-4 text-left text-[12px] font-semibold", section === value ? "text-[#C15A34]" : "text-[#5C655D]")}>{label}<ChevronRight size={14} /></button>)}
        </aside>
        <section className="rounded-[22px] border border-[#CFC4AC] bg-[#FBF8EF] p-7 sm:p-10">
          {section === "direction" && <><Eyebrow>Creative direction</Eyebrow><h1 className="cbp-display mt-5 text-[44px]">Warm, confident, and human—not generic SaaS.</h1><p className="mt-5 max-w-3xl text-[14px] leading-8 text-[#5C655D]">The public site uses an ivory paper field, deep forest authority, restrained clay accents, editorial display type, anonymous transaction artifacts, and clear human language. The experience should feel like a trusted deal professional built a private marketplace—not like a template generated around feature cards.</p><div className="mt-10 grid gap-5 md:grid-cols-3">{[["Ivory", "#F5F1E6"], ["Forest", "#14402F"], ["Clay", "#C15A34"]].map(([name, value]) => <div key={name} className="rounded-[16px] border border-[#D9CFB9] p-4"><div className="h-24 rounded-[12px] border border-black/5" style={{ backgroundColor: value }} /><div className="mt-4 text-[12px] font-semibold">{name}</div><div className="mt-1 font-mono text-[10px] text-[#5C655D]">{value}</div></div>)}</div></>}
          {section === "experience" && <><Eyebrow>Experience principles</Eyebrow><h1 className="cbp-display mt-5 text-[44px]">The owner should always know what happens next—and who controls it.</h1><div className="mt-10 border-t border-[#B9AF98]">{[
            ["Human before system", "Every important page begins with the decision, concern, or conversation—not the software capability."],
            ["Anonymous before identified", "Discovery provides enough context to assess fit without exposing the owner or firm."],
            ["Separate match, review, and access", "Recommendation never silently becomes permission."],
            ["Explain the whole deal", "Value, structure, certainty, employees, clients, and transition belong in the same conversation."],
            ["Use product artifacts as proof", "Anonymous listings, access gates, dossiers, and permission states make the process tangible."],
          ].map(([title, body], index) => <div key={title} className="grid gap-4 border-b border-[#D9CFB9] py-6 sm:grid-cols-[50px_220px_1fr]"><div className="cbp-display text-[24px] text-[#C15A34]">0{index + 1}</div><div className="text-[13px] font-semibold">{title}</div><p className="text-[12px] leading-6 text-[#5C655D]">{body}</p></div>)}</div></>}
          {section === "components" && <><Eyebrow>Component system</Eyebrow><h1 className="cbp-display mt-5 text-[44px]">A smaller, more deliberate set of recurring patterns.</h1><div className="mt-10 grid gap-5 md:grid-cols-2">{[
            ["Editorial PageHero", "One primary idea, optional transaction artifact, and a restrained pair of actions."],
            ["Deal dossier", "A tangible preview of how anonymous information, readiness, access, and files fit together."],
            ["Indexed process rows", "Long-form stages that explain the purpose of each step instead of reducing the process to icons."],
            ["Anonymous listing card", "Enough information to assess relevance without revealing the seller."],
            ["Accordion", "Plain-language answers with a controlled open state and no hidden navigation."],
            ["Closing band", "A single consistent invitation to begin a private conversation."],
          ].map(([title, body]) => <div key={title} className="rounded-[18px] border border-[#D9CFB9] bg-[#F5F1E6] p-6"><div className="text-[13px] font-semibold">{title}</div><p className="mt-3 text-[11px] leading-6 text-[#5C655D]">{body}</p></div>)}</div></>}
          {section === "qa" && <><Eyebrow>Launch QA</Eyebrow><h1 className="cbp-display mt-5 text-[44px]">The site should feel credible before it claims credibility.</h1><div className="mt-10 grid gap-4 md:grid-cols-2">{[
            "No legacy brand names or internal project references",
            "No fabricated transaction statistics or biographies presented as fact",
            "Investment-banking and finance value proposition is visible without dominating every page",
            "Seller and buyer journeys remain clearly separated",
            "Anonymous discovery and seller-controlled access are explained consistently",
            "Every navigation and footer destination resolves",
            "Contact form warns against sending sensitive records",
            "Legal, privacy, accessibility, security, and data-rights pages remain available",
            "Mobile navigation and tables remain usable",
            "No claim guarantees valuation, financing, buyer interest, or closing",
          ].map((item) => <div key={item} className="flex items-start gap-3 rounded-[14px] border border-[#D9CFB9] bg-[#F5F1E6] p-4 text-[11px] leading-5"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#2F6A4F]" />{item}</div>)}</div></>}
        </section>
      </Container>
    </div>
  );
}
