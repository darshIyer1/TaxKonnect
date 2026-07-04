import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  Balance,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Calculator,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  Download,
  Eye,
  FileCheck2,
  FileSearch,
  FileText,
  Fingerprint,
  Handshake,
  Landmark,
  Linkedin,
  Layers3,
  LineChart,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  MessageSquareText,
  Network,
  NotebookTabs,
  Phone,
  Route,
  Scale,
  ScrollText,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
  UserCheck,
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

type FAQItem = {
  question: string;
  answer: string;
};

type Stage = {
  number: string;
  title: string;
  owner: string;
  objective: string;
  work: string[];
  decision: string;
};

const COLORS = {
  navy: "#0A1721",
  navySoft: "#102431",
  slate: "#2D4654",
  blue: "#315D73",
  brass: "#A8793A",
  brassSoft: "#D8C09A",
  paper: "#F6F1E8",
  paperDeep: "#EBE2D3",
  white: "#FFFFFF",
  line: "#D7D0C4",
  text: "#20313A",
  muted: "#65737A",
  green: "#3D6A5C",
  red: "#7C4A46",
};

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}


const PB_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

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

function useMarketingMotion(page: PublicPage) {
  const reduced = useReducedMotion();
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-public-site]");
    if (!root) return;
    root.classList.add("pb-motion-ready");
    const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal], [data-stagger] > *"));
    elements.forEach((element) => {
      const parent = element.parentElement;
      if (parent?.hasAttribute("data-stagger")) {
        const siblings = Array.from(parent.children);
        const index = Math.max(0, siblings.indexOf(element));
        element.style.setProperty("--pb-delay", `${Math.min(index * 70, 350)}ms`);
      }
    });
    if (reduced || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("pb-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("pb-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [page, reduced]);
}

function CountUp({ value, prefix = "", suffix = "", duration = 1250 }: { value: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);
  useEffect(() => {
    if (reduced) { setDisplay(value); return; }
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setDisplay(Math.round(value * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.4 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [duration, reduced, value]);
  return <span ref={ref}>{prefix}{display.toLocaleString()}{suffix}</span>;
}

function useTweenNumber(target: number, duration = 260) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(target);
  const previous = useRef(target);
  useEffect(() => {
    if (reduced) { previous.current = target; setDisplay(target); return; }
    const from = previous.current;
    previous.current = target;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + (target - from) * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, reduced, target]);
  return display;
}

function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cx("mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-10", className)}>{children}</div>;
}

function Rule({ dark = false }: { dark?: boolean }) {
  return <div className={cx("h-px w-full", dark ? "bg-white/14" : "bg-[#D7D0C4]")} />;
}

function Wordmark({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={cx("relative h-11 w-11 border", inverse ? "border-white/35" : "border-[#0A1721]")} aria-hidden="true">
        <span className={cx("absolute left-[8px] top-[8px] h-[26px] w-[3px]", inverse ? "bg-white" : "bg-[#0A1721]")} />
        <span className={cx("absolute right-[8px] top-[8px] h-[26px] w-[3px]", inverse ? "bg-white" : "bg-[#0A1721]")} />
        <span className={cx("absolute left-[10px] right-[10px] top-[13px] h-[13px] border-t-[3px]", inverse ? "border-white" : "border-[#0A1721]")} style={{ borderRadius: "999px 999px 0 0" }} />
        <span className={cx("absolute bottom-[7px] left-[6px] right-[6px] h-[2px]", inverse ? "bg-[#D8C09A]" : "bg-[#A8793A]")} />
      </div>
      {!compact && (
        <div>
          <div className={cx("text-[22px] font-semibold leading-none tracking-[-.035em]", inverse ? "text-white" : "text-[#0A1721]")} style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            CPA Bridge
          </div>
          <div className={cx("mt-1 text-[8px] font-semibold uppercase tracking-[.24em]", inverse ? "text-white/55" : "text-[#65737A]")}>CPA firm sale advisory</div>
        </div>
      )}
    </div>
  );
}

function PrimaryButton({ children, onClick, light = false, type = "button" }: { children: ReactNode; onClick?: () => void; light?: boolean; type?: "button" | "submit" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cx(
        "pb-primary-button inline-flex min-h-12 items-center justify-center gap-2 border px-5 py-3 text-[12px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315D73] focus-visible:ring-offset-2",
        light ? "border-white bg-white text-[#0A1721] hover:bg-[#F6F1E8]" : "border-[#0A1721] bg-[#0A1721] text-white hover:bg-[#17303F]",
      )}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick, inverse = false }: { children: ReactNode; onClick?: () => void; inverse?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "pb-secondary-button inline-flex min-h-12 items-center justify-center gap-2 border px-5 py-3 text-[12px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315D73] focus-visible:ring-offset-2",
        inverse ? "border-white/35 bg-transparent text-white hover:bg-white/10" : "border-[#9AA8AE] bg-white text-[#0A1721] hover:border-[#0A1721]",
      )}
    >
      {children}
    </button>
  );
}

function TextLink({ children, onClick, inverse = false }: { children: ReactNode; onClick?: () => void; inverse?: boolean }) {
  return (
    <button type="button" onClick={onClick} className={cx("pb-text-link inline-flex items-center gap-2 text-left text-[12px] font-semibold underline-offset-4 hover:underline", inverse ? "text-white" : "text-[#0A1721]")}>
      {children}
      <ArrowRight size={14} />
    </button>
  );
}

function Eyebrow({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return <div className={cx("text-[10px] font-semibold uppercase tracking-[.2em]", inverse ? "text-white/58" : "text-[#65737A]")}>{children}</div>;
}

function SectionIntro({ eyebrow, title, body, inverse = false, max = "max-w-[880px]" }: { eyebrow: string; title: string; body?: string; inverse?: boolean; max?: string }) {
  return (
    <div className={max}>
      <Eyebrow inverse={inverse}>{eyebrow}</Eyebrow>
      <h2 className={cx("mt-5 text-[34px] font-semibold leading-[1.05] tracking-[-.035em] md:text-[50px]", inverse ? "text-white" : "text-[#0A1721]")} style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
        {title}
      </h2>
      {body && <p className={cx("mt-5 max-w-[820px] text-[15px] leading-8 md:text-[17px]", inverse ? "text-white/70" : "text-[#51646D]")}>{body}</p>}
    </div>
  );
}

function PageHero({ eyebrow, title, body, primary, secondary, primaryNote, onPrimary, onSecondary, right, tone = "dark", compact = false }: { eyebrow: string; title: string; body: string; primary?: string; secondary?: string; primaryNote?: string; onPrimary?: () => void; onSecondary?: () => void; right?: ReactNode; tone?: "dark" | "light"; compact?: boolean }) {
  const dark = tone === "dark";
  const reduced = useReducedMotion();
  const driftRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!dark || reduced) return;
    const node = driftRef.current;
    if (!node) return;
    const update = () => {
      const rect = node.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - rect.top) / window.innerHeight));
      node.style.transform = `translate3d(0, ${progress * 10}px, 0)`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [dark, reduced]);
  return (
    <section data-reveal className={cx("relative overflow-hidden", dark ? "bg-[#0A1721] text-white" : "border-b border-[#D7D0C4] bg-[#F6F1E8] text-[#0A1721]") }>
      {dark && <div ref={driftRef} aria-hidden="true" className="pb-hero-drift pointer-events-none absolute -right-20 -top-28 h-[360px] w-[360px] rounded-full bg-white/[.025] blur-3xl" />}
      <Container className={cx("relative grid gap-12", right ? "md:grid-cols-[1.08fr_.92fr] md:items-center" : "max-w-[980px]", compact ? "py-16 md:py-20" : "py-20 md:py-28")}>
        <div>
          <Eyebrow inverse={dark}>{eyebrow}</Eyebrow>
          <h1 className={cx("mt-7 max-w-[800px] font-semibold leading-[.99] tracking-[-.05em]", compact ? "text-[34px] md:text-[44px]" : "text-[48px] md:text-[64px]", dark ? "text-white" : "text-[#0A1721]")} style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{title}</h1>
          <p className={cx("mt-7 max-w-[760px] text-[16px] leading-8 md:text-[18px]", dark ? "text-white/68" : "text-[#51646D]")}>{body}</p>
          {(primary || secondary) && (
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-start">
              {primary && (
                <div className="flex max-w-[360px] flex-col items-start">
                  <PrimaryButton light={dark} onClick={onPrimary}>{primary}</PrimaryButton>
                  {primaryNote && <p className={cx("mt-3 text-[10px] leading-5", dark ? "text-white/55" : "text-[#65737A]")}>{primaryNote}</p>}
                </div>
              )}
              {secondary && <SecondaryButton inverse={dark} onClick={onSecondary}>{secondary}</SecondaryButton>}
            </div>
          )}
        </div>
        {right && <div className={cx("pb-hero-aside", dark ? "pb-hero-aside-dark [&>div]:border-white/12 [&>div]:bg-white/[.02]" : "pb-hero-aside-light [&>div]:border-0 [&>div]:bg-transparent [&>div]:p-0")}>{right}</div>}
      </Container>
    </section>
  );
}

function InstitutionalHeader({ page, setPage, onSignIn }: { page: PublicPage; setPage: (page: PublicPage) => void; onSignIn: () => void }) {
  const [open, setOpen] = useState(false);
  const primaryNav: PublicPage[] = ["Sell Your Firm", "Our Approach", "Value & Deal Structure", "Buy a Firm", "Services", "About", "Insights"];
  return (
    <>
      <div className="border-b border-white/10 bg-[#0A1721] text-white">
        <Container className="flex min-h-9 items-center justify-between gap-4 py-2 text-[9px] font-medium uppercase tracking-[.16em] text-white/60">
          <span>Confidential CPA firm sale advisory</span>
          <button type="button" onClick={() => setPage("Contact")} className="hidden text-white/80 hover:text-white sm:block">Begin a confidential discussion</button>
        </Container>
      </div>
      <header className="sticky top-0 z-50 border-b border-[#D7D0C4] bg-[#F6F1E8]/95 backdrop-blur">
        <Container className="flex h-[78px] items-center justify-between gap-5">
          <button type="button" onClick={() => setPage("Home")} aria-label="CPA Bridge home"><Wordmark /></button>
          <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">
            {primaryNav.map((item) => (
              <button key={item} type="button" onClick={() => setPage(item)} className={cx("pb-nav-link border-b-2 py-7 text-[10px] font-semibold uppercase tracking-[.11em]", page === item ? "border-[#A8793A] text-[#0A1721]" : "border-transparent text-[#51646D] hover:text-[#0A1721]")}>{item}</button>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <button type="button" onClick={onSignIn} className="px-2 text-[11px] font-semibold text-[#2D4654] hover:text-[#0A1721]">Client sign in</button>
            <PrimaryButton onClick={() => setPage("Contact")}>Confidential inquiry</PrimaryButton>
          </div>
          <button type="button" onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center border border-[#B8B0A4] md:hidden" aria-label="Open menu">{open ? <X size={20} /> : <Menu size={20} />}</button>
        </Container>
        {open && (
          <div className="border-t border-[#D7D0C4] bg-[#F6F1E8] md:hidden">
            <Container className="py-4">
              {["Home", ...primaryNav, "FAQ", "Contact"].map((item) => (
                <button key={item} type="button" onClick={() => { setPage(item as PublicPage); setOpen(false); }} className="flex w-full items-center justify-between border-b border-[#D7D0C4] py-4 text-left text-[12px] font-semibold text-[#0A1721]">{item}<ChevronRight size={15} /></button>
              ))}
              <button type="button" onClick={onSignIn} className="mt-4 w-full border border-[#0A1721] px-4 py-3 text-[12px] font-semibold">Client sign in</button>
            </Container>
          </div>
        )}
      </header>
    </>
  );
}


function TrackRecordStrip() {
  const stats = [
    { value: 36, suffix: "+", label: "transactions supported" },
    { value: 128, prefix: "$", suffix: "M+", label: "aggregate transaction value" },
    { value: 42, label: "years of combined banking and finance experience" },
    { value: 185, suffix: "+", label: "active buyer relationships" },
  ];
  return (
    <section data-reveal className="border-y border-[#D7D0C4] bg-white">
      <Container>
        <div data-stagger className="grid divide-y divide-[#D7D0C4] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {stats.map(({ value, prefix, suffix, label }) => (
            <div key={label} className="px-5 py-8 text-center md:px-8 md:py-10">
              <div className="text-[30px] font-semibold leading-none tracking-[-.035em] text-[#0A1721] md:text-[36px]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}><CountUp value={value} prefix={prefix} suffix={suffix} /></div>
              <div className="mx-auto mt-3 max-w-[220px] text-[10px] font-medium uppercase tracking-[.12em] text-[#65737A]">{label}</div>
            </div>
          ))}
        </div>
        <p className="pb-5 text-center text-[9px] text-[#8A9498]">Illustrative sample figures shown for this pre-launch design.</p>
      </Container>
    </section>
  );
}

function TestimonialsSection() {
  const quotes = [
    [
      "After 31 years in practice, my biggest concern was not the headline price. It was whether the team would be respected and whether longtime clients would feel abandoned. The process made those questions part of the negotiation from the beginning.",
      "Composite seller perspective — Pacific Northwest tax and advisory practice",
    ],
    [
      "We were interested in a multi-location firm, but the seller wanted proof that we could support the staff and preserve local client relationships. The access process gave both sides time to test fit before sensitive information changed hands.",
      "Composite buyer perspective — Midwest accounting group",
    ],
    [
      "The firm had meaningful concentration in one industry and the owner handled several key relationships personally. Mapping those relationships before outreach helped us explain the risk honestly and agree on a transition plan buyers could believe.",
      "Composite seller perspective — Southeast regional accounting firm",
    ],
  ];
  return (
    <section data-reveal className="bg-[#F6F1E8] py-20 md:py-28">
      <Container>
        <SectionIntro eyebrow="Owner and buyer perspective" title="The concerns behind the transaction are often personal." body="A well-run process makes room for the questions that do not fit neatly into a valuation model: what happens to the team, how clients are told, whether the buyer is trustworthy, and what life looks like after closing." />
        <div data-stagger className="mt-12 grid gap-5 lg:grid-cols-3">
          {quotes.map(([quote, attribution]) => (
            <figure key={attribution} className="border-t border-[#D7D0C4] bg-white p-7 md:p-9">
              <blockquote className="text-[20px] leading-[1.55] text-[#20313A]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>“{quote}”</blockquote>
              <figcaption className="mt-7 text-[10px] font-semibold uppercase tracking-[.14em] text-[#65737A]">{attribution}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 max-w-[760px] text-[10px] leading-5 text-[#8A9498]">These are illustrative composite perspectives used in the prototype. They are not presented as endorsements from actual clients.</p>
      </Container>
    </section>
  );
}

function ReadinessScorecard() {
  const items = [
    "Three years of tax returns and financial statements are organized",
    "Owner adjustments and one-time items can be explained",
    "Client concentration is understood and documented",
    "Staff roles, tenure, compensation, and responsibilities are current",
    "The seller's desired transition role and timeline are defined",
    "Material contracts, leases, insurance, and business records are accessible",
  ];
  const [checked, setChecked] = useState(() => items.map((_, index) => index < 3));
  const score = checked.filter(Boolean).length;
  const result = score >= 5 ? "Strong starting point" : score >= 3 ? "Several areas are underway" : "Early preparation would help";
  return (
    <div className="border border-[#D7D0C4] bg-white p-6 md:p-8">
      <div className="flex items-start justify-between gap-5">
        <div><Eyebrow>Owner readiness check</Eyebrow><h3 className="mt-3 text-[28px] font-semibold leading-tight text-[#0A1721]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Is your firm ready for a serious buyer review?</h3><p className="mt-3 max-w-[700px] text-[12px] leading-6 text-[#51646D]">Use this private checklist to orient yourself. It is not a valuation or formal readiness assessment, and an unchecked item does not mean the firm is unsellable.</p></div>
        <div className="hidden h-11 w-11 shrink-0 place-items-center rounded-full bg-[#F2E7D5] text-[#805A28] md:grid"><ClipboardCheck size={19} /></div>
      </div>
      <div className="mt-7 grid gap-3 md:grid-cols-2">
        {items.map((item, index) => <label key={item} className="flex cursor-pointer gap-3 border border-[#E1DBD1] bg-[#FBF8F2] p-4 text-[12px] leading-5 text-[#20313A]"><input type="checkbox" checked={checked[index]} onChange={() => setChecked(current => current.map((value, itemIndex) => itemIndex === index ? !value : value))} className="mt-0.5 h-4 w-4 accent-[#805A28]" /><span>{item}</span></label>)}
      </div>
      <div className="mt-6 grid gap-4 border-t border-[#D7D0C4] pt-5 md:grid-cols-[1fr_auto] md:items-center"><div><div className="text-[12px] font-semibold text-[#0A1721]">{result}: {score} of {items.length} areas checked</div><p className="mt-1 text-[11px] leading-5 text-[#65737A]">Use the result to decide what you want to understand next—not as a judgment on the quality of the business.</p></div><span className="inline-flex rounded-full bg-[#FFF3D8] px-4 py-2 text-[11px] font-semibold text-[#805A28]">Private self-check</span></div>
    </div>
  );
}

function ValuationEstimator() {
  const [revenue, setRevenue] = useState(1800000);
  const low = Math.round(revenue * 0.85 / 50000) * 50000;
  const high = Math.round(revenue * 1.25 / 50000) * 50000;
  const displayLow = useTweenNumber(low);
  const displayHigh = useTweenNumber(high);
  const currency = (value: number) => `$${(value / 1000000).toFixed(2)}M`;
  return (
    <div className="border border-[#D7D0C4] bg-white p-7 md:p-9">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
        <div>
          <Eyebrow>Illustrative value range</Eyebrow>
          <h3 className="mt-3 text-[30px] font-semibold leading-tight text-[#0A1721]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Revenue can start a valuation conversation. It cannot finish one.</h3>
          <p className="mt-4 text-[12px] leading-6 text-[#51646D]">Move the slider to see a broad revenue-based illustration. A real analysis looks at the quality of earnings, client relationships, team depth, owner dependence, buyer fit, deal terms, and the work required after closing.</p>
          <div className="mt-7">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#20313A]"><span>Annual revenue</span><span>{currency(revenue)}</span></div>
            <input aria-label="Annual revenue" type="range" min="500000" max="5000000" step="100000" value={revenue} onChange={e => setRevenue(Number(e.target.value))} className="mt-4 w-full accent-[#805A28]" />
            <div className="mt-2 flex justify-between text-[9px] text-[#8A9498]"><span>$0.5M</span><span>$5.0M</span></div>
          </div>
        </div>
        <div className="bg-[#0A1721] p-7 text-white">
          <div className="border-b border-white/18 pb-5 text-[13px] font-medium leading-6 text-white/88">
            This is an educational illustration—not a valuation or an expected sale price. A firm-specific analysis may be materially higher or lower.
          </div>
          <div className="mt-5 text-[9px] font-semibold uppercase tracking-[.16em] text-white/58">Broad revenue-based range</div>
          <div className="mt-4 text-[32px] font-semibold tracking-[-.045em]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{currency(displayLow)}–{currency(displayHigh)}</div>
          <p className="mt-4 text-[10px] leading-5 text-white/60">The range does not account for your actual earnings, client mix, staffing, risks, tax structure, or buyer terms.</p>
        </div>
      </div>
    </div>
  );
}

function LeadershipAndTrackRecord() {
  const team = [
    ["Maya Chen", "Managing Director & Deal Lead", "Former middle-market investment banker focused on owner-led business transitions and transaction execution.", "I help owners understand the decisions behind the numbers so they remain in control of the process."],
    ["Daniel Mercer", "Head of Buyer Development", "Background in corporate development, buyer coverage, acquisition criteria, and financing-readiness review.", "A credible buyer process should create fit and real alternatives without sacrificing confidentiality."],
    ["Priya Shah", "Director of Financial Review", "Finance professional experienced in earnings normalization, operating analysis, diligence preparation, and working-capital review.", "Clear financial explanations protect credibility and reduce the risk of a late surprise changing the deal."],
    ["Evan Brooks", "Director of Closing & Transition", "Transaction-operations specialist coordinating counsel, lenders, diligence workstreams, closing conditions, and transition plans.", "A signed offer is only valuable if the transaction can close and the firm can transition well."],
  ];
  const cases = [
    ["Pacific Northwest tax practice", "$1.8M revenue • 32 years in operation", "Owner retirement; staff continuity was the central concern", "An eight-month process produced a buyer willing to retain the full client-service team. The seller stayed for twelve months, with responsibilities and client introductions agreed before signing."],
    ["Southeast multi-office accounting group", "$3.4M revenue • three locations", "Several offers; one office had meaningful client concentration", "The owner compared cash at closing, seller financing, staff plans, and the treatment of the concentrated book. The preferred buyer accepted a measured communication plan instead of forcing an immediate transition."],
    ["Mid-Atlantic advisory firm", "$1.2M revenue • 18 years in operation", "The owner personally held key client and referral relationships", "Before outreach, the team documented who owned each relationship and how it could transfer. That work reduced buyer uncertainty and produced a practical six-month introduction plan."],
  ];
  return (
    <>
      <section data-reveal className="bg-white py-20 md:py-28"><Container><SectionIntro eyebrow="Leadership" title="Transaction professionals aligned with the owner." body="The team combines financial analysis, buyer development, diligence preparation, transaction operations, and closing coordination around one confidential sale process." /><div data-stagger className="mt-12 grid gap-5 md:grid-cols-2">{team.map(([name,title,bg,why]) => <article key={name} className="border border-[#D7D0C4] bg-[#FBF8F2] p-7"><div className="flex items-start gap-4"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#0A1721] text-[13px] font-semibold text-white">{name.split(' ').map(v=>v[0]).join('')}</div><div><h3 className="text-[18px] font-semibold text-[#0A1721]">{name}</h3><div className="mt-1 text-[10px] font-semibold uppercase tracking-[.13em] text-[#51646D]">{title}</div></div></div><p className="mt-5 text-[12px] leading-6 text-[#51646D]">{bg}</p><p className="mt-5 border-l border-[#C8B28B] pl-4 text-[13px] italic leading-6 text-[#20313A]">“{why}”</p></article>)}</div></Container></section>
      <section data-reveal className="bg-[#0A1721] py-20 text-white md:py-28"><Container><SectionIntro inverse eyebrow="Selected experience" title="Anonymized transaction examples." body="These examples show how a seller's real concern—staff, concentration, timing, or owner dependence—can shape the process just as much as the financial terms." /><div data-stagger className="mt-12 grid gap-5 lg:grid-cols-3">{cases.map(([type,size,concern,outcome]) => <article key={type} className="border border-white/16 bg-white/[.035] p-7"><div className="text-[9px] font-semibold uppercase tracking-[.15em] text-white/58">{type}</div><div className="mt-5 text-[11px] leading-5 text-white/60">{size}</div><div className="mt-5 border-t border-white/14 pt-5 text-[12px] font-semibold leading-6 text-white/85">{concern}</div><p className="mt-4 text-[13px] leading-7 text-white/72">{outcome}</p></article>)}</div><p className="mt-6 text-[9px] text-white/38">Illustrative, anonymized examples shown for this prototype.</p></Container></section>
    </>
  );
}

function FeeTransparency() {
  return (
    <section data-reveal className="bg-[#F6F1E8] py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <SectionIntro eyebrow="Fees and engagement" title="You should understand the cost before deciding to proceed." body="The engagement letter explains how CPA Bridge is paid, what happens if a transaction does not close, and which outside costs require your approval." />
          <div className="border-t border-[#C8B28B]">
            {[
              ["Seller success fee", "Standard seller engagements use a tiered success fee based on transaction value. The fee is paid when the transaction closes."],
              ["If the firm does not sell", "Under the standard structure described here, no success fee is due if a transaction does not close. You remain responsible only for third-party or special-project costs that you approved in advance."],
              ["Upfront cost", "The core sale process typically does not require an upfront retainer. If the firm needs a separate preparation project, the scope and cost are agreed in writing before that work begins."],
              ["Third-party expenses", "Legal, tax, accounting, lender, escrow, or quality-of-earnings providers bill under their own engagements. You should know which services are optional and which may be needed for your transaction."],
              ["Buyer-side work", "Any buyer advisory or financing-coordination work uses a separate scope. It does not change your control over confidential information or buyer access."],
              ["No pay-to-access treatment", "Buyer approval, seller permission, document access, and match priority are not sold as placement benefits."],
            ].map(([title,body]) => <div key={title} className="grid gap-3 border-b border-[#D7D0C4] py-6 md:grid-cols-[190px_1fr]"><div className="text-[13px] font-semibold text-[#0A1721]">{title}</div><p className="text-[12px] leading-6 text-[#51646D]">{body}</p></div>)}
          </div>
        </div>
      </Container>
    </section>
  );
}

function BuyerDepthSection() {
  const buyerTypes = [
    ["Individual operators", "Experienced accounting professionals seeking to acquire and lead a practice directly."],
    ["Existing accounting firms", "Regional or local firms expanding geography, services, talent, or client capacity."],
    ["Search funds and entrepreneurs", "Acquirers with a defined search mandate, operating plan, and committed or identifiable capital."],
    ["Private-equity-backed platforms", "Institutional buyers pursuing add-on acquisitions with dedicated integration resources and financing support."],
  ];
  const approval = [
    ["Identity and authority", "Who is acquiring, who controls the entity, and who will make decisions."],
    ["Funding evidence", "Equity availability, lender relationships, financing conditions, and transaction-size capacity."],
    ["Operating experience", "Accounting, tax, professional-services, leadership, integration, and acquisition experience."],
    ["Acquisition criteria", "Geography, size, service mix, structure, timing, seller transition, and strategic rationale."],
    ["Conduct and confidentiality", "Responsiveness, conflicts, information handling, and respect for seller-controlled access."],
  ];
  return (
    <>
      <section data-reveal className="bg-white py-20 md:py-28"><Container><SectionIntro eyebrow="Who participates" title="A buyer network with different operating models and capital sources." body="The right buyer depends on the seller's objectives, the firm's size and service mix, employee and client needs, geography, transition expectations, and the transaction structure." /><div data-stagger className="mt-12 grid gap-5 md:grid-cols-2">{buyerTypes.map(([title,body]) => <article key={title} className="border border-[#D7D0C4] bg-[#FBF8F2] p-7"><h3 className="text-[20px] font-semibold text-[#0A1721]" style={{fontFamily:"Georgia, 'Times New Roman', serif"}}>{title}</h3><p className="mt-3 text-[12px] leading-6 text-[#51646D]">{body}</p></article>)}</div></Container></section>
      <section data-reveal className="bg-[#F6F1E8] py-20 md:py-28"><Container><div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]"><SectionIntro eyebrow="Buyer approval" title="Approval focuses on capability, fit, and conduct." body="Registration is only the beginning. CPA Bridge reviews whether the buyer can pursue a transaction responsibly and whether the stated criteria are specific enough to support meaningful recommendations." /><div className="border-t border-[#C8B28B]">{approval.map(([title,body],i) => <div key={title} className="grid gap-3 border-b border-[#D7D0C4] py-6 md:grid-cols-[40px_190px_1fr]"><div className="text-[11px] font-semibold text-[#51646D]">0{i+1}</div><div className="text-[13px] font-semibold text-[#0A1721]">{title}</div><p className="text-[12px] leading-6 text-[#51646D]">{body}</p></div>)}</div></div></Container></section>
      <section data-reveal className="bg-[#0A1721] py-20 text-white md:py-28"><Container><div className="grid gap-14 lg:grid-cols-2"><div><SectionIntro inverse eyebrow="What buyers should expect" title="Deal flow is selective, confidential, and seller-controlled." body="A strong buyer profile improves relevance, but it does not guarantee a minimum number of opportunities, access to a specific firm, or a fixed transaction timeline." /><div className="mt-8 border-t border-white/16">{[
        ["Opportunity cadence", "Listings appear when seller readiness, confidentiality, and market timing support outreach—not on a guaranteed schedule."],
        ["Access timing", "A specific request may require buyer clarification, CPA Bridge review, seller evaluation, confidentiality documentation, and deliberate release preparation."],
        ["Seller choice", "The seller may prioritize strategic fit, team continuity, financing certainty, timing, or transition quality differently than the buyer expects."],
        ["Transaction timeline", "Offer preparation, diligence, financing, legal documentation, and closing commonly require several months after initial access."],
      ].map(([title,body]) => <div key={title} className="border-b border-white/16 py-5"><div className="text-[13px] font-semibold text-white">{title}</div><p className="mt-2 text-[11px] leading-6 text-white/62">{body}</p></div>)}</div></div><div><SectionIntro inverse eyebrow="Matching and ranking" title="Fit and priority are deliberately separate." body="Matching determines whether an opportunity is compatible. Ranking orders eligible opportunities so the buyer and CPA Bridge can focus attention efficiently." /><div className="mt-8 grid gap-4">{[
        ["Why matched", "Geography, size, services, funding capacity, experience, timing, transition, conflicts, and operating rationale."],
        ["Why ranked here", "Match strength plus readiness, funding review, responsiveness, recent activity, seller preferences, and specific interest."],
        ["What neither decision does", "Matching and ranking do not grant access, override seller choice, replace review, or create a right to confidential information."],
      ].map(([title,body]) => <div key={title} className="border border-white/16 bg-white/[.035] p-6"><div className="text-[13px] font-semibold text-white/58">{title}</div><p className="mt-3 text-[11px] leading-6 text-white/65">{body}</p></div>)}</div></div></div></Container></section>
    </>
  );
}

function Footer({ setPage }: { setPage: (page: PublicPage) => void }) {
  return (
    <footer className="bg-[#0A1721] text-white">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_.65fr_.65fr_.8fr_.9fr]">
          <div className="max-w-[430px]">
            <Wordmark inverse />
            <p className="mt-7 text-[13px] leading-7 text-white/65">Former investment-banking and finance professionals helping CPA firm owners prepare, position, market, negotiate, and execute confidential business transitions designed to protect value, certainty, and legacy.</p>
            <button type="button" onClick={() => setPage("Contact")} className="mt-7 border-b border-[#D8C09A] pb-1 text-[11px] font-semibold text-white/58">Begin a confidential discussion</button>
          </div>
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/45">For owners</div>
            <div className="mt-5 space-y-3">{["Sell Your Firm", "Our Approach", "Value & Deal Structure", "Services", "FAQ"].map((item) => <button key={item} type="button" onClick={() => setPage(item as PublicPage)} className="block text-left text-[11px] text-white/70 hover:text-white">{item}</button>)}</div>
          </div>
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/45">For buyers</div>
            <div className="mt-5 space-y-3">{["Buy a Firm", "Insights", "FAQ", "Contact"].map((item) => <button key={item} type="button" onClick={() => setPage(item as PublicPage)} className="block text-left text-[11px] text-white/70 hover:text-white">{item}</button>)}</div>
          </div>
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/45">Firm</div>
            <div className="mt-5 space-y-3">{["About", "Insights", "Contact"].map((item) => <button key={item} type="button" onClick={() => setPage(item as PublicPage)} className="block text-left text-[11px] text-white/70 hover:text-white">{item}</button>)}</div>
            <div className="mt-7 text-[9px] font-semibold uppercase tracking-[.18em] text-white/45">Contact</div>
            <div className="mt-4 space-y-3 text-[11px] leading-5 text-white/70">
              <div className="flex gap-2"><MapPin size={13} className="mt-0.5 shrink-0 text-white/58" /><span>Seattle, Washington<br />Serving CPA firm owners nationwide</span></div>
              <a href="mailto:confidential@cpabridge.com" className="flex items-center gap-2 hover:text-white"><Mail size={13} className="text-white/58" />confidential@cpabridge.com</a>
              <a href="tel:+12065550142" className="flex items-center gap-2 hover:text-white"><Phone size={13} className="text-white/58" />(206) 555-0142</a>
              <a href="https://www.linkedin.com/company/cpa-bridge" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white"><Linkedin size={13} className="text-white/58" />LinkedIn</a>
            </div>
          </div>
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/45">Legal & trust</div>
            <div className="mt-5 space-y-3">{LEGAL_PAGES.map((item) => <button key={item} type="button" onClick={() => setPage(item)} className="block text-left text-[11px] leading-5 text-white/70 hover:text-white">{item}</button>)}</div>
          </div>
        </div>
        <Rule dark />
        <div className="mt-8 grid gap-5 text-[9px] leading-5 text-white/45 md:grid-cols-[auto_1fr] md:items-start">
          <p>© 2026 CPA Bridge. All rights reserved.</p>
          <p className="max-w-[820px] md:justify-self-end md:text-right">CPA Bridge coordinates transaction advisory and related work. Legal, tax, accounting, lending, securities, escrow, and other regulated services are provided only through separately engaged qualified professionals. Website use does not create an advisory, fiduciary, legal, tax, accounting, or lending relationship.</p>
        </div>
      </Container>
    </footer>
  );
}

function OfferDecisionTable() {
  const rows = [
    ["Headline value", "Higher", "Moderate", "Competitive"],
    ["Cash at closing", "Lower", "Highest", "Balanced"],
    ["Seller financing", "Meaningful", "Minimal", "Moderate"],
    ["Contingent consideration", "Large earnout", "None", "Limited"],
    ["Financing confidence", "Conditional", "Reviewed", "Reviewed"],
    ["Employee plan", "Unclear", "Detailed", "Detailed"],
    ["Client transition", "Aggressive", "Measured", "Measured"],
    ["Seller transition", "Long", "Short", "Flexible"],
    ["Closing conditions", "Several", "Few", "Moderate"],
  ];
  const offers = ["Offer A", "Offer B", "Offer C"];
  return (
    <div>
      <p className="mb-5 max-w-[760px] text-[12px] leading-6 text-[#65737A]">You do not need to memorize every term. The point is to see how a slightly lower headline price can still leave you with more cash, fewer obligations, or a safer path to closing.</p>
      <div className="hidden border border-[#D7D0C4] bg-white md:block">
        <table className="w-full border-collapse text-left">
          <thead className="bg-[#0A1721] text-white">
            <tr><th className="px-5 py-4 text-[9px] uppercase tracking-[.16em]">Decision factor</th><th className="px-5 py-4 text-[9px] uppercase tracking-[.16em]">Offer A</th><th className="px-5 py-4 text-[9px] uppercase tracking-[.16em]">Offer B</th><th className="px-5 py-4 text-[9px] uppercase tracking-[.16em]">Offer C</th></tr>
          </thead>
          <tbody>{rows.map((row, index) => <tr key={row[0]} className={index % 2 ? "bg-[#F9F6F0]" : "bg-white"}>{row.map((cell, cellIndex) => <td key={cell} className={cx("border-t border-[#DED8CE] px-5 py-4 text-[11px]", cellIndex === 0 ? "font-semibold text-[#0A1721]" : "text-[#51646D]")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <div className="grid gap-4 md:hidden">
        {offers.map((offer, offerIndex) => (
          <article key={offer} className="border border-[#D7D0C4] bg-white p-5">
            <h3 className="text-[18px] font-semibold text-[#0A1721]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{offer}</h3>
            <div className="mt-4 border-t border-[#D7D0C4]">
              {rows.map((row) => <div key={row[0]} className="grid grid-cols-[1fr_auto] gap-4 border-b border-[#E5DFD5] py-3"><span className="text-[10px] leading-5 text-[#65737A]">{row[0]}</span><span className="text-right text-[11px] font-semibold text-[#20313A]">{row[offerIndex + 1]}</span></div>)}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Home({ setPage }: { setPage: (page: PublicPage) => void }) {
  const valueLevers = [
    [Calculator, "Earnings quality", "We separate repeatable operating earnings from personal, one-time, or owner-specific items. Buyers can then see the performance they may actually inherit."],
    [Users, "Buyer quality", "We look for buyers with the capital, experience, and operating plan to follow through. A large buyer list matters less than a credible group of good fits."],
    [BarChart3, "Real market options", "A disciplined process can create more than one serious path without exposing the firm's identity. That gives the owner context and room to negotiate."],
    [Scale, "Deal structure", "We compare what is paid at closing with what is delayed or conditional. Seller notes, earnouts, retained equity, and working-capital terms can change the real outcome."],
    [ShieldCheck, "A workable path to closing", "We prepare for the questions most likely to surface later. Clear records and realistic expectations reduce the chance of a last-minute price change or failed closing."],
    [Route, "Transition design", "We define what the seller, team, and buyer will each need after closing. That includes the pace of introductions, leadership handoff, and client communication."],
  ];
  const stages = [
    ["01", "Understand the owner", "We begin with what you want, what you are worried about, and what a good outcome would mean for you, your team, and your clients."],
    ["02", "Prepare the business", "We organize the financial and operating story, identify likely buyer questions, and address issues that are easier to solve before outreach."],
    ["03", "Position the opportunity", "We explain the firm clearly without overselling it. You review the materials and decide what can be shared."],
    ["04", "Build the buyer universe", "We identify prospective buyers, review their fit and resources, and narrow the list before anyone receives private information."],
    ["05", "Manage access and interest", "We handle confidentiality, access requests, and early conversations in stages. You decide who advances."],
    ["06", "Compare and negotiate", "We place the full economics and obligations side by side so you can compare what each offer would mean in practice."],
    ["07", "Coordinate diligence", "We organize requests and responses, keep responsibilities clear, and address issues before they become closing problems."],
    ["08", "Execute the closing", "We coordinate the remaining providers and conditions, then help the parties move into an orderly employee and client transition."],
  ];
  return (
    <>
      <PageHero
        eyebrow="CPA firm sale advisory"
        title="Protect the value you spent a career building."
        body="CPA Bridge is led by former investment-banking and finance professionals who help CPA firm owners prepare, position, market, negotiate, and execute a confidential sale. The work is not only about finding a buyer. It is about protecting value, preserving choice, and reaching terms you can live with after the closing date."
        primary="Begin a confidential discussion"
        secondary="Review our approach"
        primaryNote="No cost to speak with us. No obligation to proceed. Nothing is shared outside CPA Bridge without your permission."
        onPrimary={() => setPage("Contact")}
        onSecondary={() => setPage("Our Approach")}
        right={
          <div className="border border-white/18 bg-white/[.035] p-7 md:p-9">
            <div className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/58">Primary owner considerations</div>
            <div className="mt-6 space-y-0">
              {[
                ["Economics", "What you receive, when you receive it, and what remains at risk."],
                ["Completion", "Whether the buyer can finish financing, diligence, documentation, and closing."],
                ["Control", "What requires your approval, what remains confidential, and how the process is managed."],
                ["People", "How employees, clients, leadership, and culture are treated through the transition."],
                ["Legacy", "What happens to the firm's relationships, reputation, and team after closing."],
              ].map(([title, body]) => (
                <div key={title} className="grid grid-cols-[110px_1fr] gap-5 border-t border-white/14 py-5 first:border-t-0 first:pt-0">
                  <div className="text-[11px] font-semibold text-white">{title}</div>
                  <div className="text-[11px] leading-6 text-white/60">{body}</div>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <section data-reveal className="border-b border-[#D7D0C4] bg-[#F6F1E8]">
        <Container className="grid divide-y divide-[#D7D0C4] md:grid-cols-4 md:divide-x md:divide-y-0">
          {[
            ["Former investment-banking and finance professionals", "Transaction experience applied on behalf of the seller"],
            ["CPA-firm specialization", "A process built around relationship-driven professional-services firms"],
            ["Confidential by design", "Staged access with seller-controlled visibility"],
            ["End-to-end coordination", "Support from early preparation through closing and transition"],
          ].map(([title, body]) => <div key={title} className="px-5 py-6 md:px-7"><div className="text-[10px] font-semibold leading-5 text-[#0A1721]">{title}</div><div className="mt-2 text-[10px] leading-5 text-[#65737A]">{body}</div></div>)}
        </Container>
      </section>

      <TrackRecordStrip />

      <section data-reveal className="bg-white py-20 md:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[.78fr_1.22fr]">
            <SectionIntro eyebrow="The central idea" title="A firm sale extends far beyond finding a buyer." body="A strong outcome starts before the first offer. Buyers need to understand the firm's earnings and relationships. The owner needs enough choice and information to compare not only price, but also the obligations and risks attached to it." />
            <div className="border-l border-[#C8B28B] pl-7 md:pl-10">
              <p className="text-[22px] leading-[1.55] text-[#20313A] md:text-[30px]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                "The highest headline price is not always the strongest offer. The strongest outcome balances economics, risk, timing, people, and the owner's priorities."
              </p>
              <p className="mt-6 text-[12px] leading-7 text-[#65737A]">CPA Bridge helps owners understand those tradeoffs before they commit to a buyer or structure.</p>
            </div>
          </div>
        </Container>
      </section>

      <section data-reveal className="bg-[#F6F1E8] py-20 md:py-28">
        <Container>
          <SectionIntro eyebrow="How value is protected" title="Six parts of the process that can change the outcome." body="Each area below answers a practical owner question: Are the numbers believable? Is the buyer capable? What am I actually receiving? What could still go wrong?" />
          <div data-stagger className="mt-14 grid border-l border-t border-[#D7D0C4] md:grid-cols-2 lg:grid-cols-3">
            {valueLevers.map(([Icon, title, body]) => (
              <div key={title as string} className="border-b border-r border-[#D7D0C4] bg-white p-7 md:p-9">
                <Icon size={22} className="text-[#51646D]" />
                <h3 className="mt-6 text-[23px] font-semibold text-[#0A1721]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{title as string}</h3>
                <p className="mt-4 text-[12px] leading-7 text-[#51646D]">{body as string}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section data-reveal className="bg-[#0A1721] py-20 text-white md:py-28">
        <Container>
          <SectionIntro inverse eyebrow="The CPA Bridge process" title="Eight stages. One disciplined transaction." body="Each stage has a clear purpose and a decision for the owner. You do not lose control simply because the process has started." />
          <div className="mt-14 border-t border-white/18">
            {stages.map(([num, title, body]) => (
              <div key={num} className="grid gap-4 border-b border-white/18 py-7 md:grid-cols-[80px_280px_1fr] md:gap-8 md:py-8">
                <div className="text-[12px] font-semibold text-white/58">{num}</div>
                <div className="text-[19px] font-semibold text-white" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{title}</div>
                <div className="text-[12px] leading-7 text-white/64">{body}</div>
              </div>
            ))}
          </div>
          <div className="mt-10"><TextLink inverse onClick={() => setPage("Our Approach")}>Read the full process</TextLink></div>
        </Container>
      </section>

      <section data-reveal className="bg-white py-20 md:py-28">
        <Container>
          <SectionIntro eyebrow="Offer analysis" title="Compare the complete transaction—not only headline value." body="A useful comparison shows what is paid at closing, what depends on future performance, what the buyer still needs to finance, and what the seller must do after the transaction." />
          <div className="mt-12"><OfferDecisionTable /></div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["Economic value", "See how much is paid at closing and how much is deferred. Then account for tax treatment, working capital, and any ongoing compensation."],
              ["Ability to close", "Understand the buyer's financing plan, remaining conditions, and capacity to complete the transaction on the proposed schedule."],
              ["Transition quality", "Look closely at the treatment of employees and clients. The seller's own role and obligations should also be clear before signing."],
            ].map(([title, body]) => <div key={title} className="border-t border-[#D7D0C4] bg-[#F6F1E8] p-6"><div className="text-[13px] font-semibold text-[#0A1721]">{title}</div><p className="mt-3 text-[11px] leading-6 text-[#51646D]">{body}</p></div>)}
          </div>
        </Container>
      </section>

      <section data-reveal className="bg-[#F6F1E8] py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr]">
            <SectionIntro eyebrow="Confidentiality" title="The seller determines when information progresses." body="A buyer does not move from curiosity to private records in one step. Identity, fit, purpose, and confidentiality are reviewed before you decide whether more information should be shared." />
            <div className="border-t border-[#C8B28B]">
              {[
                ["Anonymous discovery", "The buyer sees a general firm profile without learning the firm's identity."],
                ["Buyer qualification", "CPA Bridge reviews who the buyer is, what they are seeking, and how they expect to fund and operate the acquisition."],
                ["Deal-specific request", "The buyer explains why the firm may fit and what information is needed next."],
                ["Seller decision", "You review the buyer profile and choose whether the conversation should continue."],
                ["Controlled release", "Only approved materials are shared. Access and timing are recorded."],
                ["Diligence phase", "More sensitive information is provided after an accepted offer through an organized process."],
              ].map(([title, body], index) => <div key={title} className="grid grid-cols-[46px_1fr] gap-5 border-b border-[#D7D0C4] py-5"><div className="text-[11px] font-semibold text-[#51646D]">0{index + 1}</div><div><div className="text-[13px] font-semibold text-[#0A1721]">{title}</div><p className="mt-2 text-[11px] leading-6 text-[#51646D]">{body}</p></div></div>)}
            </div>
          </div>
        </Container>
      </section>

      <section data-reveal className="bg-white py-20 md:py-28">
        <Container>
          <SectionIntro eyebrow="When owners reach out" title="You do not need to have made the decision." body="Many owners begin by trying to understand the options. They may be years from a sale, responding to an unexpected offer, or simply wondering how prepared the firm would be if circumstances changed." />
          <div data-stagger className="mt-12 grid border-l border-t border-[#D7D0C4] md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Retirement or succession planning", "Create an orderly path without forcing the decision into a rushed timeline."],
              ["Partial liquidity", "Explore whether you can retain ownership or an ongoing role while taking some proceeds."],
              ["Growth capital", "Consider a partner that can support hiring, technology, or expansion without requiring an immediate exit."],
              ["Unexpected change", "Respond thoughtfully to health, family, partner, staffing, or market developments."],
              ["Owner dependence", "Reduce risk when clients and key decisions still rely heavily on one person."],
              ["Partner transition", "Work through different timelines and expectations among the owners."],
              ["Unsolicited interest", "Evaluate an unexpected approach without giving up leverage or sharing too much too soon."],
              ["Readiness assessment", "Understand which areas would benefit from work before speaking with buyers."],
            ].map(([title, body]) => <div key={title} className="border-b border-r border-[#D7D0C4] p-6"><div className="text-[13px] font-semibold text-[#0A1721]">{title}</div><p className="mt-3 text-[11px] leading-6 text-[#65737A]">{body}</p></div>)}
          </div>
        </Container>
      </section>

      <TestimonialsSection />

      <section data-reveal className="bg-[#A8793A] py-16 text-white md:py-20">
        <Container className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div><div className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/70">A confidential first step</div><h2 className="mt-4 max-w-[850px] text-[34px] font-semibold leading-[1.08] tracking-[-.035em] md:text-[48px]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Discuss your goals, concerns, and options before deciding what comes next.</h2><p className="mt-5 max-w-[760px] text-[14px] leading-7 text-white/80">The first conversation is about your firm, your timeline, and the questions you want answered. You do not need to arrive ready to sell.</p></div>
          <div className="max-w-[330px]"><PrimaryButton light onClick={() => setPage("Contact")}>Begin a confidential inquiry<ArrowRight size={15} /></PrimaryButton><p className="mt-3 text-[10px] leading-5 text-white/72">No cost to speak with us. No obligation to proceed. Nothing is shared without your permission.</p></div>
        </Container>
      </section>
    </>
  );
}


function FAQSection({ title, items }: { title: string; items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section data-reveal className="bg-[#F6F1E8] py-20 md:py-28">
      <Container>
        <SectionIntro eyebrow="Frequently asked questions" title={title} />
        <div className="mt-12 max-w-[940px] border-t border-[#C8B28B]">
          {items.map((item, index) => (
            <div key={item.question} className="border-b border-[#D7D0C4]">
              <button
                type="button"
                onClick={() => setOpen(open === index ? null : index)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
                aria-expanded={open === index}
              >
                <span className="text-[15px] font-semibold leading-6 text-[#0A1721]">{item.question}</span>
                <ChevronDown size={18} className={cx("pb-chevron mt-1 shrink-0", open === index && "rotate-180")} />
              </button>
              <div className={cx("pb-accordion-grid", open === index && "pb-accordion-open")} aria-hidden={open !== index}>
                <div>
                  <p className="max-w-[820px] pb-7 pr-12 text-[12px] leading-7 text-[#51646D]">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function SellYourFirm({ setPage }: { setPage: (page: PublicPage) => void }) {
  const readinessRows: Array<[string, string[]]> = [
    ["Financial records", ["Your recent financial statements and tax returns tell a consistent story.", "Any meaningful differences or unusual items have a clear explanation.", "Owner-specific adjustments are supported with documentation."]],
    ["Revenue durability", ["You understand which services repeat each year and which are project-based.", "Pricing and retention trends are visible over time.", "Large client or industry concentrations are identified early."]],
    ["Profit quality", ["The owner compensation structure is explained in plain terms.", "One-time costs and discretionary expenses are separated from normal operations.", "Any hiring or technology investment the firm still needs is made visible."]],
    ["Client relationships", ["The largest relationships and the services they use are understood.", "The team knows which relationships depend heavily on the owner.", "A realistic transfer plan can be described without naming clients publicly."]],
    ["Owner dependence", ["The buyer can see where the owner is still essential to sales or service delivery.", "Important approvals and institutional knowledge are documented.", "Responsibilities that need to transfer have a practical path forward."]],
    ["People and capacity", ["Roles, tenure, compensation, and workload information are current.", "Key employees and potential retention concerns are identified.", "The buyer can understand who may lead the firm after the owner steps back."]],
    ["Systems and processes", ["Core workflows and software are documented well enough for someone else to understand them.", "Security and quality-control practices are clear.", "Reporting and billing processes do not depend on one person's memory."]],
    ["Legal and business records", ["Ownership, leases, insurance, and material contracts are organized.", "Known claims or compliance matters are explained before diligence.", "Required licenses and obligations are current."]],
    ["Transition planning", ["You have thought about how long you want to stay and in what role.", "Employee and client communication can be timed thoughtfully.", "The buyer understands what support will be needed after closing."]],
  ];
  const financialPreparation: Array<[string, string[]]> = [
    ["Reconcile the record", ["Make sure the financial statements and tax records agree or can be explained.", "Resolve obvious gaps before a buyer is asking under deadline pressure."]],
    ["Normalize carefully", ["Document owner-specific or one-time items with support.", "Avoid adjustments that depend on optimistic assumptions or hidden future costs."]],
    ["Explain what changed", ["Separate true growth from pricing changes or temporary staffing effects.", "Show which improvements are already working and which still require investment."]],
    ["Identify future needs", ["Be open about hiring, systems, security, or quality-control work that remains.", "A buyer can price a known need more fairly than an unexplained surprise."]],
    ["Prepare for reasonable questions", ["Expect buyers to test major adjustments and retention assumptions.", "A clear answer delivered early is easier to trust than one assembled late."]],
  ];
  const decisionRows: Array<[string, string, string]> = [
    ["Whether and when to go to market", "We assess readiness, timing, and the available paths.", "You decide whether to proceed, wait, prepare further, or stop."],
    ["How the firm is presented", "We draft the anonymous and confidential materials and explain the tradeoffs.", "You approve the wording, request changes, or hold the materials back."],
    ["Which buyers advance", "We review identity, fit, resources, conflicts, and the reason for the buyer's interest.", "You approve, decline, delay, or ask for more information."],
    ["What information is released", "We organize approved materials and keep a record of access.", "You choose the scope and can restrict or revoke access."],
    ["Which offer to pursue", "We compare the economics, obligations, and risks in a common format.", "You can reject, counter, continue discussions, or move one offer into diligence."],
    ["Whether to close", "We coordinate the remaining issues and explain what is still open.", "You decide whether the final transaction is acceptable."],
  ];
  const preparationPackage: Array<[LucideIcon, string, string[]]> = [
    [FileText, "Financial", ["Historical statements, tax returns, and recent monthly results", "A clear explanation of owner adjustments and unusual items", "Debt, working capital, and forecasts where they are genuinely useful"]],
    [Users, "Clients", ["A confidential view of concentration and relationship history", "Services, pricing, and retention patterns", "A practical plan for relationships that depend on the owner"]],
    [BriefcaseBusiness, "People", ["Current roles, compensation, tenure, and capacity", "Key-person and retention considerations", "Leadership and transition responsibilities"]],
    [Layers3, "Operations", ["The main workflows, systems, and reporting routines", "Security and quality-control practices", "Billing, collections, and documentation standards"]],
    [ScrollText, "Legal and business", ["Ownership and entity records", "Leases, insurance, licenses, and material contracts", "Known claims, obligations, or compliance matters"]],
    [Route, "Transition", ["The seller's desired role and timeline", "Employee and client communication plans", "Leadership handoff and the first months after closing"]],
  ];
  const faqs: FAQItem[] = [
    { question: "How early should I begin planning?", answer: "Many owners benefit from beginning twelve to twenty-four months before a desired transaction, especially if the records, staffing, client mix, or owner role need attention. You can also reach out much earlier simply to understand the options." },
    { question: "Do I need a valuation before contacting CPA Bridge?", answer: "No. A useful first conversation starts with the firm, your goals, and the questions you want answered. Any valuation discussion becomes more meaningful once the earnings, relationships, team, transition, and likely buyer types are understood." },
    { question: "Will my team or clients learn that I am exploring a sale?", answer: "Not unless you choose to involve them. Early discussions can remain limited, and private information is released in stages. When communication eventually becomes appropriate, the timing and message should be planned with you." },
    { question: "Can I remain involved with the firm after closing?", answer: "Yes. Some owners stay briefly for introductions, while others continue as employees, consultants, leaders, or retained owners. The right arrangement depends on what you want and what the business will need after closing." },
    { question: "What should I do about an unsolicited offer?", answer: "You do not need to accept or reject it immediately. First understand what is actually being offered, what remains conditional, and what the buyer expects from you afterward. It can also be useful to compare the offer with other realistic options before giving up leverage." },
    { question: "What factors influence transaction timing?", answer: "The timeline depends on how prepared the firm is, how quickly the right buyers engage, and how much work remains in diligence and documentation. A process may move quickly, but speed should not come at the expense of clarity or control." },
    { question: "Can I change my mind or pause the process?", answer: "Yes. Exploring a sale does not require you to keep moving if the timing, buyers, or terms do not feel right. Any signed engagement or exclusivity terms still matter, so we explain those obligations before you enter them." },
    { question: "What does this cost me if the firm does not sell?", answer: "Under the standard seller structure described on this site, no success fee is due if a transaction does not close. You would still be responsible for any third-party or special-project cost that you knowingly approved in advance, and those items should be clear before work begins." },
  ];
  return (
    <>
      <PageHero
        eyebrow="For CPA firm owners"
        title="A sale process structured around your business."
        body="You do not need to arrive with a final decision or a perfectly prepared firm. CPA Bridge helps you understand the choices, prepare for buyer questions, protect confidential information, and compare what each path would mean for you, your team, and your clients."
        primary="Discuss your firm"
        secondary="Review the value drivers"
        primaryNote="No cost to speak with us. No obligation to proceed. Nothing is shared outside CPA Bridge without your permission."
        onPrimary={() => setPage("Contact")}
        onSecondary={() => setPage("Value & Deal Structure")}
        right={<div className="border border-white/18 p-7"><div className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/58">Initial conversation topics</div><div className="mt-5 space-y-4">{["Why you are considering a transaction","The timing and role that would feel right after closing","What must be true for the outcome to feel successful","Financial, client, staffing, or partnership concerns already on your mind","Who should know about the conversation and who should not"].map((item) => <div key={item} className="flex gap-3 text-[12px] leading-6 text-white/68"><CheckCircle2 size={15} className="mt-1 shrink-0 text-white/58" />{item}</div>)}</div></div>}
      />

      <section data-reveal className="bg-white py-12 md:py-16">
        <Container>
          <div className="max-w-[920px] border-l border-[#C8B28B] pl-6 md:pl-9">
            <p className="text-[22px] leading-[1.55] text-[#20313A] md:text-[29px]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Considering a sale can feel personal in a way most business decisions do not.</p>
            <p className="mt-5 max-w-[830px] text-[14px] leading-8 text-[#65737A]">You may be thinking about employees who trusted you, clients who grew with the firm, and what life looks like after the handoff. Rushing or being pressured serves no one. The rest of this page is here to help you think through the questions and preparation before you decide whether to move forward.</p>
          </div>
        </Container>
      </section>

      <section data-reveal className="bg-[#F6F1E8] py-16 md:py-20"><Container><ReadinessScorecard /></Container></section>

      <section data-reveal className="bg-white py-20 md:py-28">
        <Container>
          <SectionIntro eyebrow="Seller readiness" title="Buyers will look beyond revenue and profit." body="A prepared process helps the buyer understand the firm without forcing you to answer every question under pressure." />
          <p className="mt-7 max-w-[780px] text-[13px] leading-7 text-[#65737A]">This is what a buyer will actually look at—not to scare you, but so fewer things catch you off guard later. You can skim the headings now and return to the detail when you are ready.</p>
          <div className="mt-10 hidden border border-[#D7D0C4] md:block">
            <table className="w-full border-collapse">
              <thead className="bg-[#0A1721] text-white"><tr><th className="w-[230px] px-5 py-4 text-left text-[9px] uppercase tracking-[.15em]">Readiness area</th><th className="px-5 py-4 text-left text-[9px] uppercase tracking-[.15em]">What a buyer will want to understand</th></tr></thead>
              <tbody>{readinessRows.map(([area, points], index) => <tr key={area} className={index % 2 ? "bg-[#F9F6F0]" : "bg-white"}><td className="border-t border-[#D7D0C4] px-5 py-5 align-top text-[12px] font-semibold text-[#0A1721]">{area}</td><td className="border-t border-[#D7D0C4] px-5 py-5"><ul className="space-y-2">{points.map(point => <li key={point} className="flex gap-3 text-[11px] leading-6 text-[#51646D]"><span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#8A9498]" />{point}</li>)}</ul></td></tr>)}</tbody>
            </table>
          </div>
          <div className="mt-8 grid gap-4 md:hidden">
            {readinessRows.map(([area, points]) => <article key={area} className="border border-[#D7D0C4] bg-[#FBF8F2] p-5"><h3 className="text-[15px] font-semibold text-[#0A1721]">{area}</h3><ul className="mt-4 space-y-3">{points.map(point => <li key={point} className="flex gap-3 text-[11px] leading-6 text-[#51646D]"><Check size={13} className="mt-1 shrink-0 text-[#65737A]" />{point}</li>)}</ul></article>)}
          </div>
        </Container>
      </section>

      <section data-reveal className="bg-[#F6F1E8] py-20 md:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[.78fr_1.22fr]">
            <SectionIntro eyebrow="Financial preparation" title="The goal is to explain your earnings, not to manufacture them." body="A buyer should be able to follow how the firm makes money and why recent results look the way they do. Clear explanations are more persuasive than a long list of aggressive adjustments." />
            <div className="border-t border-[#C8B28B]">{financialPreparation.map(([title, points]) => <div key={title} className="border-b border-[#D7D0C4] py-6"><div className="text-[14px] font-semibold text-[#0A1721]">{title}</div><ul className="mt-3 space-y-2">{points.map(point => <li key={point} className="flex gap-3 text-[11px] leading-6 text-[#51646D]"><span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#8A9498]" />{point}</li>)}</ul></div>)}</div>
          </div>
        </Container>
      </section>

      <section data-reveal className="bg-white py-20 md:py-28">
        <Container>
          <SectionIntro eyebrow="People and relationships" title="Your team and clients are not an afterthought." body="For many owners, the most important questions are who will take care of the people who helped build the firm and whether clients will continue to feel known and supported." />
          <div data-stagger className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              [MessageSquareText, "When people are told", "Employees and clients are usually not informed simply because an owner has begun exploring options.", ["The timing is planned around confidentiality and the stage of the transaction.", "The message should explain what is changing, what is staying the same, and who will answer questions."]],
              [Users, "What happens to the team", "A serious buyer should explain the expected role of the current staff before the owner accepts an offer.", ["Retention expectations, reporting lines, and leadership plans should be discussed directly.", "Material changes to compensation, benefits, location, or flexibility should not remain vague."]],
              [Handshake, "How client relationships are protected", "Client continuity depends on a thoughtful handoff, not a single announcement after closing.", ["Key relationships can be mapped before outreach without exposing client identities.", "Introductions, service continuity, and the seller's role should be agreed before communication begins."]],
            ].map(([Icon, title, body, points]) => <article key={title as string} className="border-t border-[#D7D0C4] bg-[#FBF8F2] p-7"><Icon size={20} className="text-[#51646D]" /><h3 className="mt-5 text-[22px] font-semibold text-[#0A1721]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{title as string}</h3><p className="mt-4 text-[12px] leading-6 text-[#51646D]">{body as string}</p><ul className="mt-5 space-y-3">{(points as string[]).map(point => <li key={point} className="flex gap-3 text-[11px] leading-6 text-[#51646D]"><Check size={13} className="mt-1 shrink-0 text-[#65737A]" />{point}</li>)}</ul></article>)}
          </div>
        </Container>
      </section>

      <section data-reveal className="bg-[#0A1721] py-20 text-white md:py-28">
        <Container>
          <SectionIntro inverse eyebrow="Seller decision authority" title="You remain the decision-maker." body="CPA Bridge organizes the process and explains the tradeoffs. You decide whether the firm goes to market, who receives information, which offer advances, and whether the transaction closes." />
          <p className="mt-7 max-w-[780px] text-[13px] leading-7 text-white/68">The table below separates our role from yours. The simple version is that we do the preparation and coordination; you keep the final say.</p>
          <div className="mt-10 hidden border border-white/16 md:block">
            <table className="w-full border-collapse"><thead><tr className="bg-white/8"><th className="px-5 py-4 text-left text-[9px] uppercase tracking-[.15em] text-white/70">Decision</th><th className="px-5 py-4 text-left text-[9px] uppercase tracking-[.15em] text-white/70">CPA Bridge role</th><th className="px-5 py-4 text-left text-[9px] uppercase tracking-[.15em] text-white/70">Your authority</th></tr></thead><tbody>{decisionRows.map((row, index) => <tr key={row[0]} className={index % 2 ? "bg-white/[.035]" : "bg-transparent"}>{row.map((cell, cellIndex) => <td key={cell} className={cx("border-t border-white/14 px-5 py-5 text-[11px] leading-6", cellIndex === 0 ? "font-semibold text-white" : "text-white/66")}>{cell}</td>)}</tr>)}</tbody></table>
          </div>
          <div className="mt-8 grid gap-4 md:hidden">
            {decisionRows.map(([decision, bridge, owner]) => <article key={decision} className="border border-white/16 bg-white/[.035] p-5"><h3 className="text-[15px] font-semibold text-white">{decision}</h3><div className="mt-4 border-t border-white/14 pt-4"><div className="text-[9px] font-semibold uppercase tracking-[.14em] text-white/45">CPA Bridge</div><p className="mt-2 text-[11px] leading-6 text-white/65">{bridge}</p></div><div className="mt-4 border-t border-white/14 pt-4"><div className="text-[9px] font-semibold uppercase tracking-[.14em] text-white/45">You decide</div><p className="mt-2 text-[11px] leading-6 text-white/82">{owner}</p></div></article>)}
          </div>
        </Container>
      </section>

      <section data-reveal className="bg-white py-20 md:py-28">
        <Container>
          <SectionIntro eyebrow="Typical preparation package" title="What is usually organized before serious buyer review." body="You do not need to assemble everything at once. The purpose of preparing early is to replace a last-minute document scramble with a clear, manageable sequence." />
          <p className="mt-7 max-w-[760px] text-[13px] leading-7 text-[#65737A]">These are the main categories. The exact list should be tailored to your firm rather than copied from a generic diligence checklist.</p>
          <div data-stagger className="mt-10 grid border-l border-t border-[#D7D0C4] md:grid-cols-2 lg:grid-cols-3">{preparationPackage.map(([Icon, title, points]) => <div key={title} className="border-b border-r border-[#D7D0C4] p-7"><Icon size={21} className="text-[#51646D]" /><div className="mt-5 text-[14px] font-semibold text-[#0A1721]">{title}</div><ul className="mt-4 space-y-3">{points.map(point => <li key={point} className="flex gap-3 text-[11px] leading-6 text-[#51646D]"><span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#8A9498]" />{point}</li>)}</ul></div>)}</div>
        </Container>
      </section>

      <FAQSection title="Questions owners ask before pursuing a sale" items={faqs} />
      <QuietClose title="A private conversation can be useful long before a formal sale process begins." body="Bring the questions that are actually on your mind—timing, employees, clients, value, or whether selling is even the right path. You do not need to have everything figured out first." button="Contact CPA Bridge" onClick={() => setPage("Contact")} />
    </>
  );
}

function OurApproach({ setPage }: { setPage: (page: PublicPage) => void }) {
  const principles = [
    ["Prepare before marketing", "We address avoidable questions before a buyer controls the schedule. That gives you more time to decide how the firm should be presented."],
    ["Create options without creating noise", "We pursue credible alternatives while protecting the firm's identity. More outreach is not automatically better outreach."],
    ["Compare what the deal means in practice", "We look beyond price to what is paid at closing, what remains conditional, and what the buyer expects from you afterward."],
    ["Protect private information", "Information is shared in stages. You decide which buyers advance and what they are allowed to see."],
    ["Explain; do not pressure", "We show the tradeoffs and recommend a path. The decision to continue, pause, counter, or stop remains yours."],
    ["Stay through the difficult middle", "The work continues through diligence and documentation, when uncertainty and fatigue can otherwise take over."],
  ];
  return (
    <>
      <PageHero tone="light" compact eyebrow="Our approach" title="Transaction expertise on behalf of the seller." body="A sale process should make a difficult decision clearer—not make the owner feel rushed, behind, or buried in transaction language. CPA Bridge brings former investment-banking and finance experience to the work while keeping the owner's goals, team, clients, and comfort with the process at the center." primary="Discuss your objectives" secondary="Explore services" onPrimary={() => setPage("Contact")} onSecondary={() => setPage("Services")} right={<div className="border border-white/18 p-7"><div className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/58">Our standard</div><div className="mt-5 space-y-4">{["The seller's identity is not disclosed without permission","Private information is released only after the buyer and request are reviewed","An offer is never judged by headline price alone","Technology supports the work but does not make the decision","The same process remains engaged through diligence and closing"].map((item) => <div key={item} className="flex gap-3 text-[12px] leading-6 text-white/68"><Check size={15} className="mt-1 shrink-0 text-white/58" />{item}</div>)}</div></div>} />

      <section data-reveal className="bg-white py-20 md:py-28"><Container><div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]"><SectionIntro eyebrow="Why CPA Bridge" title="A good process creates clarity before it asks for commitment." body="Former investment-banking and finance professionals know how to understand a business, present its financial story, build a buyer process, compare deal structures, and keep execution moving. We apply that discipline to CPA-firm succession without treating the owner like a transaction input." /><div className="border-l border-[#C8B28B] pl-8"><p className="text-[24px] leading-[1.55] text-[#20313A] md:text-[34px]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Our job is to help you protect value and make a decision you understand—not to push you toward the fastest available deal.</p><p className="mt-6 text-[12px] leading-7 text-[#65737A]">That means preparing the firm honestly, testing the buyer's ability to follow through, and making the tradeoffs visible before you commit.</p></div></div></Container></section>

      <section data-reveal className="bg-[#F6F1E8] py-20 md:py-28"><Container><SectionIntro eyebrow="Operating principles" title="How we conduct the transaction." /><div data-stagger className="mt-12 grid border-l border-t border-[#D7D0C4] md:grid-cols-2 lg:grid-cols-3">{principles.map(([title, body], index) => <div key={title} className="border-b border-r border-[#D7D0C4] bg-white p-7"><div className="text-[10px] font-semibold text-[#51646D]">0{index + 1}</div><h3 className="mt-5 text-[22px] font-semibold text-[#0A1721]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{title}</h3><p className="mt-4 text-[11px] leading-6 text-[#51646D]">{body}</p></div>)}</div></Container></section>

      <section data-reveal className="bg-white py-20 md:py-28"><Container><SectionIntro eyebrow="Prepare • Position • Market • Negotiate • Execute" title="A complete transaction engagement—not a handoff after introduction." body="The five workstreams below keep preparation, buyer conversations, negotiation, and execution connected. You should always know what is happening now and what decision comes next." /><div className="mt-12 border-t border-[#C8B28B]">{[
        ["Prepare", "Understand your goals and review the firm's financial and operating readiness. We identify questions that are easier to resolve before buyers become involved.", "A readiness report, issue list, financial bridge, document inventory, and transaction strategy."],
        ["Position", "Explain the firm clearly through anonymous and confidential materials. The story covers performance, clients, team, risks, and transition without pretending the business is perfect.", "Seller-approved materials and a plan for what can be shared at each stage."],
        ["Market", "Identify prospective buyers and review their experience, resources, criteria, and fit before giving them access.", "A qualified buyer pool and a controlled plan for outreach and conversations."],
        ["Negotiate", "Place the offers into one common format so you can compare the money, remaining conditions, and obligations after closing.", "An offer comparison, open-issue list, and a clear negotiation plan."],
        ["Execute", "Coordinate diligence and the outside providers while keeping questions, deadlines, and closing conditions organized.", "A completed transaction and a practical plan for employees, clients, and the seller's transition."],
      ].map(([title, work, output], index) => <div key={title} className="grid gap-5 border-b border-[#D7D0C4] py-8 md:grid-cols-[70px_180px_1fr_1fr]"><div className="text-[11px] font-semibold text-[#51646D]">0{index + 1}</div><div className="text-[21px] font-semibold text-[#0A1721]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{title}</div><div><div className="text-[9px] font-semibold uppercase tracking-[.16em] text-[#65737A]">Core work</div><p className="mt-3 text-[11px] leading-6 text-[#51646D]">{work}</p></div><div><div className="text-[9px] font-semibold uppercase tracking-[.16em] text-[#65737A]">Result</div><p className="mt-3 text-[11px] leading-6 text-[#51646D]">{output}</p></div></div>)}</div></Container></section>

      <section data-reveal className="bg-[#0A1721] py-20 text-white md:py-28"><Container><div className="grid gap-14 lg:grid-cols-[.78fr_1.22fr]"><SectionIntro inverse eyebrow="Human judgment and technology" title="Technology organizes the work. People make the decisions." body="The platform keeps information, permissions, tasks, offers, and deadlines organized. It does not decide whether a buyer is right for your firm or whether you should accept the terms." /><div className="grid gap-0 border-l border-t border-white/16 md:grid-cols-2">{[
        ["System support", "The system keeps documents, access history, tasks, matches, offers, and closing items in one place."],
        ["CPA Bridge judgment", "The team interprets the financial story, evaluates buyers, explains concerns, and helps shape the process."],
        ["Seller decisions", "You decide whether to proceed, which buyers advance, what is shared, and which offer—if any—to pursue."],
        ["Outside professionals", "Qualified legal, tax, accounting, financing, escrow, or other providers handle services that require their own engagement."],
      ].map(([title, body]) => <div key={title} className="border-b border-r border-white/16 p-6"><div className="text-[13px] font-semibold text-white">{title}</div><p className="mt-3 text-[11px] leading-6 text-white/62">{body}</p></div>)}</div></div></Container></section>

      <QuietClose title="Choose an advisor who can explain the process before asking you to trust it." body="Ask who will prepare the firm, how buyers will be reviewed, how your information will be protected, and who stays involved when diligence becomes difficult." button="Talk with CPA Bridge" onClick={() => setPage("Contact")} />
    </>
  );
}

function ValueAndDealStructure({ setPage }: { setPage: (page: PublicPage) => void }) {
  const drivers = [
    ["Revenue quality", "Buyers want to know which work repeats and whether clients are likely to stay. Pricing and service mix matter more when the pattern can be explained clearly."],
    ["Earnings quality", "The buyer will separate normal operating costs from personal or one-time items. Any future hiring or investment need also affects the conclusion."],
    ["Concentration", "Heavy reliance on one client, partner, employee, referral source, or industry can create risk. The concern is easier to address when it is known early."],
    ["Transferability", "A firm is easier to transition when relationships, knowledge, and decision-making do not live only with the owner."],
    ["People", "Team depth, retention, and leadership matter because the buyer is acquiring a working organization—not only a book of revenue."],
    ["Systems", "Clear workflows and dependable systems help a buyer believe the firm can continue operating through a change in ownership."],
    ["Growth opportunity", "A buyer may see value in pricing, capacity, new services, or geographic reach. The opportunity should be realistic and supported by the firm."],
    ["Transaction risk", "Financing, diligence, legal issues, and transition demands can change the practical value of an offer even after the headline number is agreed."],
  ];
  return (
    <>
      <PageHero tone="light" compact eyebrow="Value and deal structure" title="The number matters. So does everything attached to it." body="Most owners understandably want to know what the firm may be worth. A useful answer also explains how much would be paid at closing, what remains conditional, what the buyer expects from you, and how the terms affect your team and clients." primary="Discuss your firm" secondary="Review the seller process" onPrimary={() => setPage("Contact")} onSecondary={() => setPage("Sell Your Firm")} right={<div className="border border-white/18 p-7"><div className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/58">A useful valuation discussion asks</div><div className="mt-5 space-y-4">{["What earnings are likely to continue under new ownership?","Which risks will a buyer try to price into the terms?","Which buyers may value the firm for different reasons?","How much will you actually receive at closing?","What will you still be responsible for afterward?"].map((item) => <div key={item} className="flex gap-3 text-[12px] leading-6 text-white/68"><CheckCircle2 size={15} className="mt-1 shrink-0 text-white/58" />{item}</div>)}</div></div>} />

      <section data-reveal className="bg-[#F6F1E8] py-16 md:py-20"><Container><ValuationEstimator /></Container></section>

      <section data-reveal className="bg-white py-20 md:py-28"><Container><SectionIntro eyebrow="The value framework" title="Eight areas buyers will evaluate." body="No single formula explains the complete outcome. The areas below show why two firms with similar revenue can receive very different offers." /><div data-stagger className="mt-12 grid border-l border-t border-[#D7D0C4] md:grid-cols-2 lg:grid-cols-4">{drivers.map(([title, body], index) => <div key={title} className="border-b border-r border-[#D7D0C4] p-6"><div className="text-[10px] font-semibold text-[#51646D]">0{index + 1}</div><div className="mt-4 text-[14px] font-semibold text-[#0A1721]">{title}</div><p className="mt-3 text-[11px] leading-6 text-[#51646D]">{body}</p></div>)}</div></Container></section>

      <section data-reveal className="bg-[#F6F1E8] py-20 md:py-28"><Container><div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]"><SectionIntro eyebrow="Earnings normalization" title="A credible adjustment analysis is documented, conservative, and easy to follow." body="Normalization should help a buyer understand the business. It should not hide required costs or turn every owner choice into an add-back." /><div className="border-t border-[#C8B28B]">{[
        ["What may need explanation", "Owner pay, family payroll, related-party rent, one-time professional costs, temporary vacancies, and clearly personal expenses may warrant review."],
        ["Where owners get into trouble", "Unsupported adjustments and deferred investment can make the earnings story less believable. A buyer will also question work the owner performs without market-rate replacement cost."],
        ["What a buyer needs", "The calculation should show the source, the period, and why the adjustment would not continue. The buyer also needs a realistic view of post-closing costs."],
        ["Why the work matters", "A careful analysis creates a more defensible discussion and reduces the chance that the purchase price is cut late in diligence."],
      ].map(([title, body]) => <div key={title} className="border-b border-[#D7D0C4] py-6"><div className="text-[14px] font-semibold text-[#0A1721]">{title}</div><p className="mt-2 text-[11px] leading-6 text-[#51646D]">{body}</p></div>)}</div></div></Container></section>

      <section data-reveal className="bg-white py-20 md:py-28"><Container><SectionIntro eyebrow="Whole-deal comparison" title="Two offers with the same headline value can produce very different outcomes." body="The comparison below shows why the owner should look at what is paid now, what remains at risk, and what the buyer is asking the seller to do after closing." /><div className="mt-12"><OfferDecisionTable /></div></Container></section>

      <section data-reveal className="bg-[#0A1721] py-20 text-white md:py-28"><Container><SectionIntro inverse eyebrow="Before signing a letter of intent" title="Questions you should be able to answer." body="You do not need to become a transaction expert. You do need plain answers to the questions that determine what the offer really means." /><div data-stagger className="mt-12 grid border-l border-t border-white/16 md:grid-cols-2">{[
        ["Economics", "How much is paid at closing? What is delayed or conditional? How will working capital be handled?"],
        ["Financing", "Where is the buyer's money coming from, and what still needs to be approved?"],
        ["Diligence", "What remains open, how long will exclusivity last, and what could lead the buyer to change the terms?"],
        ["People", "What does the buyer expect to happen to the team, leadership, compensation, and working arrangements?"],
        ["Clients", "When will clients be told, who will lead the communication, and what assumptions about retention affect the price?"],
        ["Seller role", "How long are you expected to stay, what will you be responsible for, and how will you be paid?"],
        ["Legal and tax", "What structure is being proposed, and which protections or obligations matter most to you?"],
        ["Path to closing", "What must still happen before closing, and what evidence shows the buyer can complete those steps?"],
      ].map(([title, body]) => <div key={title} className="border-b border-r border-white/16 p-6"><div className="text-[13px] font-semibold text-white">{title}</div><p className="mt-3 text-[11px] leading-6 text-white/62">{body}</p></div>)}</div></Container></section>
      <QuietClose title="A valuation is most useful when it helps you decide what to do next." body="A firm-specific discussion can clarify the likely questions, the terms that matter, and the preparation that may improve your choices." button="Begin a confidential conversation" onClick={() => setPage("Contact")} />
    </>
  );
}

function BuyAFirm({ setPage }: { setPage: (page: PublicPage) => void }) {
  const buyerFAQs: FAQItem[] = [
    { question: "Who can register as a buyer?", answer: "Individual operators, existing firms, strategic acquirers, searchers, family offices, sponsors, and other qualified parties may register. Approval depends on identity, criteria, experience, funding, conflicts, conduct, and strategic fit." },
    { question: "Does buyer approval provide access to every listing?", answer: "No. Approval allows CPA Bridge to consider you for relevant opportunities. Each listing, access request, seller decision, and document release remains independent." },
    { question: "How are opportunities matched?", answer: "Matching evaluates hard eligibility and weighted fit factors including geography, size, services, funding, experience, timing, and transition alignment. Ranking then orders eligible opportunities by fit, readiness, activity, seller preferences, and demonstrated interest." },
    { question: "Why might a seller decline access?", answer: "The seller may have concerns about competition, confidentiality, strategic fit, timing, funding stability, relevant experience, conflicts, transition quality, or reason for interest. Sellers control private access decisions." },
    { question: "When are detailed documents released?", answer: "Only after a deal-specific request, executed confidentiality agreement, CPA Bridge review, seller approval, and intentional document-release authorization." },
    { question: "What does a serious buyer demonstrate?", answer: "Clear and focused criteria, timely responses, documented funding approach, thoughtful questions, respect for confidentiality, credible operating plans, and disciplined execution through offer, diligence, financing, and closing." },
  ];
  return (
    <>
      <PageHero tone="light" compact eyebrow="For buyers" title="Relevant opportunities. Controlled access. Clear expectations." body="CPA Bridge helps qualified buyers identify opportunities that fit their criteria, understand their relevance, request access responsibly, review selected information, submit structured offers, and coordinate diligence and closing." primary="Create a buyer account" secondary="Understand the access process" onPrimary={() => setPage("Contact")} onSecondary={() => setPage("FAQ")} right={<div className="border border-white/18 p-7"><div className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/58">Buyer evaluation considers</div><div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4">{["Identity","Organization","Acquisition criteria","Funding approach","Relevant experience","Operating plan","Timing","Transition fit","Conflicts","Reason for interest"].map((item) => <div key={item} className="border-t border-white/14 pt-3 text-[10px] leading-5 text-white/65">{item}</div>)}</div></div>} />

      <section data-reveal className="bg-white py-20 md:py-28"><Container><SectionIntro eyebrow="Qualification" title="Approval is a starting point—not automatic access to information." body="A disciplined buyer process protects seller confidentiality and helps buyers focus on opportunities that fit their capital, experience, operating plans, geography, size, services, timing, and transition expectations." /><div data-stagger className="mt-12 grid border-l border-t border-[#D7D0C4] md:grid-cols-2 lg:grid-cols-3">{[
        [Fingerprint, "Identity and organization", "Verification of who you are, your organization, control structure, and who will own or operate the firm."],
        [Target, "Acquisition criteria", "Geography, revenue, services, client profile, team size, transaction structure, timing, and strategic priorities."],
        [Landmark, "Funding approach", "Available capital, financing strategy, lender relationships, equity sources, seller-financing expectations, and conditions."],
        [BriefcaseBusiness, "Experience", "Accounting, tax, professional-services, operating, acquisition, leadership, integration, and transaction background."],
        [Route, "Transition plan", "Owner role, employee continuity, client communication, leadership, systems, brand, and post-close operating approach."],
        [ShieldCheck, "Conflicts and conduct", "Competition, relationships, information handling, confidentiality, responsiveness, and behavior in prior processes."],
      ].map(([Icon, title, body]) => <div key={title as string} className="border-b border-r border-[#D7D0C4] p-7"><Icon size={21} className="text-[#51646D]" /><div className="mt-5 text-[14px] font-semibold text-[#0A1721]">{title as string}</div><p className="mt-3 text-[11px] leading-6 text-[#51646D]">{body as string}</p></div>)}</div></Container></section>

      <section data-reveal className="bg-[#F6F1E8] py-20 md:py-28"><Container><div className="grid gap-14 lg:grid-cols-2"><div><SectionIntro eyebrow="Matching" title="Compatibility comes first." body="The matching process evaluates whether you and a listing can reasonably align before either party invests significant time." /><div className="mt-8 border-t border-[#C8B28B]">{["Active listing and approved buyer","Permitted buyer type","Geographic overlap","Deal-size compatibility","Funding capacity","Conflict review","Timing alignment","Transition compatibility","Service-line fit","Experience fit"].map((item) => <div key={item} className="flex items-center gap-3 border-b border-[#D7D0C4] py-4 text-[11px] text-[#20313A]"><CheckCircle2 size={15} className="text-[#51646D]" />{item}</div>)}</div></div><div><SectionIntro eyebrow="Ranking" title="Priority is determined separately." body="Among eligible opportunities, ranking helps both you and CPA Bridge focus on the most relevant listings without creating automatic access or overriding seller judgment." /><div className="mt-8 border-t border-[#C8B28B]">{["Match strength","Buyer readiness","Funding review","Listing readiness","Timing urgency","Request quality","Responsiveness","Recent activity","Seller preferences","Demonstrated interest"].map((item) => <div key={item} className="flex items-center gap-3 border-b border-[#D7D0C4] py-4 text-[11px] text-[#20313A]"><BarChart3 size={15} className="text-[#51646D]" />{item}</div>)}</div></div></div></Container></section>

      <section data-reveal className="bg-[#0A1721] py-20 text-white md:py-28"><Container><SectionIntro inverse eyebrow="Information access" title="Six levels of visibility protect the seller and improve buyer discipline." /><div className="mt-12 border-t border-white/16">{[
        ["01", "Public or general information", "Educational material and general opportunity categories without identifying any specific seller."],
        ["02", "Anonymous listing", "General location, revenue range, service mix, team profile, transition outline, and high-level opportunity description."],
        ["03", "Approved buyer profile", "CPA Bridge has reviewed you, but the seller's identity and confidential information remain protected."],
        ["04", "Deal-specific request and NDA", "You explain the strategic fit and complete confidentiality requirements; documents are not released automatically."],
        ["05", "Seller-approved private review", "Selected information is released only after CPA Bridge review and explicit seller authorization."],
        ["06", "Diligence", "More sensitive information is shared after an accepted offer through an organized request and approval process."],
      ].map(([num, title, body]) => <div key={num} className="grid gap-4 border-b border-white/16 py-6 md:grid-cols-[70px_260px_1fr]"><div className="text-[11px] font-semibold text-white/58">{num}</div><div className="text-[16px] font-semibold text-white">{title}</div><div className="text-[11px] leading-6 text-white/62">{body}</div></div>)}</div></Container></section>

      <section data-reveal className="bg-white py-20 md:py-28"><Container><SectionIntro eyebrow="A buyer's responsibility" title="Serious interest requires more than clicking Request Access." body="The seller is evaluating whether you can handle confidential information responsibly, operate the business competently, finance the transaction, work through diligence, and deliver an acceptable transition." /><div data-stagger className="mt-12 grid border-l border-t border-[#D7D0C4] md:grid-cols-2 lg:grid-cols-4">{[
        ["Be specific", "Explain the strategic and operating reason the opportunity is relevant."],
        ["Be prepared", "Provide a credible funding approach and respond thoughtfully to questions."],
        ["Be disciplined", "Respect information restrictions, deadlines, and the seller's process."],
        ["Be complete", "Address price, structure, financing, diligence, people, clients, and transition."],
      ].map(([title, body]) => <div key={title} className="border-b border-r border-[#D7D0C4] p-6"><div className="text-[13px] font-semibold text-[#0A1721]">{title}</div><p className="mt-3 text-[11px] leading-6 text-[#51646D]">{body}</p></div>)}</div></Container></section>
      <BuyerDepthSection />
      <FAQSection title="Questions buyers ask" items={buyerFAQs} />
      <QuietClose title="Build a buyer profile that clearly articulates what you can acquire and how you will operate it." body="Clear criteria and a credible plan help CPA Bridge identify opportunities that are truly relevant to you." button="Contact CPA Bridge" onClick={() => setPage("Contact")} />
    </>
  );
}

function Services({ setPage }: { setPage: (page: PublicPage) => void }) {
  const services = [
    { icon: Calculator, title: "Sale readiness and financial positioning", summary: "Prepare the firm for buyer scrutiny and present the economic record clearly.", work: ["Historical financial review", "Earnings normalization", "Revenue and service analysis", "Client concentration assessment", "Owner-dependence evaluation", "Documentation inventory", "Issue and risk register"], output: "Readiness assessment, normalized earnings bridge, transaction issue list, and preparation roadmap." },
    { icon: FileText, title: "Positioning and market materials", summary: "Present the firm accurately, persuasively, and at appropriate confidentiality levels.", work: ["Anonymous teaser development", "Confidential profile creation", "Financial highlights preparation", "Service and client narrative", "Team and transition profile", "Growth opportunity analysis", "Information disclosure strategy"], output: "Seller-approved materials and a staged information-release strategy." },
    { icon: Network, title: "Buyer development, matching, and ranking", summary: "Build a relevant buyer pool and prioritize based on fit, readiness, and interest.", work: ["Buyer sourcing", "Identity and organization review", "Acquisition criteria assessment", "Funding approach evaluation", "Experience review and verification", "Hard eligibility determination", "Weighted matching analysis", "Ranked priority lists", "Conflict review"], output: "A reviewed buyer universe, explainable match results, ranked priorities, and seller-ready buyer summaries." },
    { icon: Scale, title: "Offer and negotiation support", summary: "Compare complete transaction economics and support informed seller responses.", work: ["Offer normalization", "Cash and contingent value analysis", "Financing review and assessment", "Conditions and exclusivity review", "Employee and client plan analysis", "Seller role and obligations", "Open issue identification", "Counterparty comparison"], output: "Whole-deal comparison, negotiation priorities, counterproposal support, and recommended path forward." },
    { icon: ClipboardCheck, title: "Diligence coordination", summary: "Organize requests, releases, issues, and responses so diligence remains disciplined.", work: ["Request list development", "Category and sensitivity classification", "Owner and due date assignment", "Seller approval process", "Professional document review", "Controlled document release", "Open question tracking", "Issue resolution management", "Renegotiation monitoring"], output: "A controlled diligence workspace with clear ownership, status, approvals, and unresolved items." },
    { icon: Handshake, title: "Transaction services and closing coordination", summary: "Coordinate professionals and conditions required to move from diligence through closing and transition.", work: ["Transaction counsel coordination", "Tax and accounting support", "Financing coordination", "Escrow and funds flow management", "Definitive document preparation", "Closing readiness confirmation", "Employee and client communication", "30/60/90-day transition planning"], output: "Provider coordination, closing-readiness checklist, unresolved-condition tracking, and transition plan." },
  ];
  return (
    <>
      <PageHero tone="light" compact eyebrow="Services" title="The work required to move from your objectives to a completed transaction." body="CPA Bridge integrates seller preparation, financial analysis, buyer development, negotiation support, controlled diligence, and closing coordination into one connected engagement." primary="Discuss the scope" secondary="Review our approach" onPrimary={() => setPage("Contact")} onSecondary={() => setPage("Our Approach")} right={<div className="border border-white/18 p-7"><div className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/58">An engagement may include</div><div className="mt-5 space-y-4">{["Preparation before market exposure","Targeted buyer development process","Controlled information access and release","Offer and structure analysis","Diligence management and coordination","Professional-provider collaboration","Closing and transition support"].map((item) => <div key={item} className="flex gap-3 text-[12px] leading-6 text-white/68"><CheckCircle2 size={15} className="mt-1 shrink-0 text-white/58" />{item}</div>)}</div></div>} />
      <section data-reveal className="bg-white py-20 md:py-28"><Container><div className="space-y-0 border-t border-[#C8B28B]">{services.map(({ icon: Icon, title, summary, work, output }, index) => <div key={title} className="grid gap-8 border-b border-[#D7D0C4] py-10 lg:grid-cols-[90px_330px_1fr_330px]"><div className="text-[11px] font-semibold text-[#51646D]">0{index + 1}</div><div><Icon size={22} className="text-[#51646D]" /><h3 className="mt-5 text-[25px] font-semibold leading-tight text-[#0A1721]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{title}</h3><p className="mt-4 text-[11px] leading-6 text-[#51646D]">{summary}</p></div><div><div className="text-[9px] font-semibold uppercase tracking-[.16em] text-[#65737A]">Typical work</div><div className="mt-4 grid gap-3 md:grid-cols-2">{work.map((item) => <div key={item} className="flex gap-2 text-[11px] leading-5 text-[#20313A]"><Check size={13} className="mt-1 shrink-0 text-[#51646D]" />{item}</div>)}</div></div><div className="border-l border-[#D7D0C4] pl-6"><div className="text-[9px] font-semibold uppercase tracking-[.16em] text-[#65737A]">Primary output</div><p className="mt-4 text-[11px] leading-6 text-[#51646D]">{output}</p></div></div>)}</div></Container></section>
      <section data-reveal className="bg-[#F6F1E8] py-20 md:py-28"><Container><SectionIntro eyebrow="Specialist providers" title="One coordinated process. The right professional for each regulated service." body="CPA Bridge coordinates the transaction and information flow. Separately engaged professionals remain responsible for advice and services within their legal, tax, accounting, financing, escrow, securities, or other regulated practice." /><div data-stagger className="mt-12 grid border-l border-t border-[#D7D0C4] md:grid-cols-2 lg:grid-cols-3">{[
        [Scale, "Transaction counsel", "Purchase agreement, disclosure schedules, legal diligence, entity matters, restrictive covenants, indemnification, closing documents, and legal closing conditions."],
        [Calculator, "Accounting and tax", "Quality of earnings analysis, working capital, tax structure optimization, purchase-price allocation, financial diligence, and closing accounting."],
        [Landmark, "Financing", "Lender introductions, financing package assembly, lender diligence, credit approval, commitment conditions, and closing funds coordination."],
        [Handshake, "Escrow and closing", "Escrow instruction preparation, signature coordination, funds flow management, closing deliverables, conditions, and final confirmation."],
        [Users, "People and transition", "Employment matters, benefits structure, retention strategy, client communication, leadership transition, and detailed transition planning."],
        [ShieldCheck, "Security and information", "Secure document handling, access controls, confidentiality administration, data-transfer planning, and technology security review."],
      ].map(([Icon, title, body]) => <div key={title as string} className="border-b border-r border-[#D7D0C4] bg-white p-7"><Icon size={21} className="text-[#51646D]" /><div className="mt-5 text-[14px] font-semibold text-[#0A1721]">{title as string}</div><p className="mt-3 text-[11px] leading-6 text-[#51646D]">{body as string}</p></div>)}</div></Container></section>
      <FeeTransparency />
      <QuietClose title="The right scope depends on the firm, your goals, and the transaction stage." body="Begin with a confidential conversation about what you already know, what requires preparation, and where CPA Bridge can add the most value." button="Discuss the engagement" onClick={() => setPage("Contact")} />
    </>
  );
}

function About({ setPage }: { setPage: (page: PublicPage) => void }) {
  return (
    <>
      <PageHero tone="light" compact eyebrow="About CPA Bridge" title="Created by transaction and finance professionals for CPA firm owners." body="CPA Bridge was founded on a straightforward premise: an owner who spent a career building a professional-services firm deserves more than a listing, an introduction, and a handoff. The owner deserves disciplined financial preparation, a controlled buyer process, clear offer analysis, and experienced coordination through closing." primary="Talk with CPA Bridge" secondary="Review our approach" onPrimary={() => setPage("Contact")} onSecondary={() => setPage("Our Approach")} right={<div className="p-0"><div className="text-[9px] font-semibold uppercase tracking-[.18em]">The firm combines</div><div className="mt-5 space-y-4">{["Former investment-banking and finance expertise","Financial analysis and transaction preparation","CPA-practice market understanding","Buyer development and qualification","Process and diligence management","Professional-provider coordination"].map((item) => <div key={item} className="flex gap-3 text-[12px] leading-6"><CheckCircle2 size={15} className="mt-1 shrink-0" />{item}</div>)}</div></div>} />

      <section data-reveal className="bg-white py-20 md:py-28"><Container><div className="grid gap-14 lg:grid-cols-[.82fr_1.18fr]"><SectionIntro eyebrow="Why we exist" title="CPA-firm succession is a financial, operating, and human transition." body="A CPA practice's value lives in client trust, employee expertise, partner relationships, recurring work, reputation, systems, professional judgment, and the owner's role. A successful transaction must transfer sufficient value for the buyer to perform while protecting what matters to the seller." /><div className="border-t border-[#C8B28B]">{[
        ["The market is fragmented", "Owners and buyers often have incomplete information, different expectations, and uneven transaction experience."],
        ["The business is relationship-driven", "Client retention, employee retention, owner dependence, and communication can matter as much as financial models."],
        ["Structure shapes results", "Cash, seller financing, earnouts, rollover equity, contingencies, taxes, and transition obligations affect what the owner ultimately receives."],
        ["Late surprises destroy value", "Financial inconsistencies, concentration, staffing, contracts, technology, compliance, financing, and diligence issues can reprice or derail transactions."],
        ["Closing is not the end", "Employees, clients, leadership, systems, and responsibilities still need to transition into the buyer's operating model."],
      ].map(([title, body]) => <div key={title} className="border-b border-[#D7D0C4] py-6"><div className="text-[14px] font-semibold text-[#0A1721]">{title}</div><p className="mt-2 text-[11px] leading-6 text-[#51646D]">{body}</p></div>)}</div></div></Container></section>

      <section data-reveal className="bg-[#F6F1E8] py-20 md:py-28"><Container><SectionIntro eyebrow="Capabilities" title="The team required to support a significant transaction." body="CPA Bridge organizes the core advisory work and coordinates the specialists required for the transaction. This commitment is based on demonstrated capabilities, disciplined process, and clear accountability—not inflated transaction claims or generic credentials." /><div data-stagger className="mt-12 grid border-l border-t border-[#D7D0C4] md:grid-cols-2 lg:grid-cols-3">{[
        [BriefcaseBusiness, "Transaction strategy", "Owner objectives, readiness assessment, process design, buyer strategy, negotiation priorities, and execution planning."],
        [Calculator, "Financial analysis", "Historical performance review, normalized earnings analysis, service-mix evaluation, concentration assessment, margin sustainability, working capital, and buyer assumptions."],
        [Network, "Buyer development", "Buyer sourcing and outreach, criteria clarification, identity verification, experience evaluation, funding assessment, conflict review, and matching analysis."],
        [FileCheck2, "Transaction operations", "Task management, document organization, approvals coordination, question tracking, document releases, meeting management, deadline tracking, issue escalation, and closing readiness."],
        [Users, "People and transition", "Owner role definition, employee retention strategy, client communication, leadership transition, retention incentives, integration planning, and first-90-day execution."],
        [Handshake, "Professional coordination", "Introductions to counsel, accountants, tax advisors, lenders, escrow professionals, security specialists, and other separately engaged providers."],
      ].map(([Icon, title, body]) => <div key={title as string} className="border-b border-r border-[#D7D0C4] bg-white p-7"><Icon size={21} className="text-[#51646D]" /><div className="mt-5 text-[14px] font-semibold text-[#0A1721]">{title as string}</div><p className="mt-3 text-[11px] leading-6 text-[#51646D]">{body as string}</p></div>)}</div></Container></section>

      <section data-reveal className="bg-[#0A1721] py-20 text-white md:py-28"><Container><SectionIntro inverse eyebrow="What owners should expect" title="Direct communication, financial rigor, and no hidden transfers of authority." /><div data-stagger className="mt-12 grid border-l border-t border-white/16 md:grid-cols-2 lg:grid-cols-4">{[
        ["Clarity", "You should understand the current stage, the pending decision, the information required, the next step, and unresolved risks."],
        ["Confidentiality", "Your identity and information should progress only through explicit gates and documented permissions."],
        ["Evidence", "Financial adjustments, buyer claims, financing terms, offers, and transaction conditions should be supportable and comparable."],
        ["Accountability", "Every request, deliverable, issue, owner, deadline, and closing condition should have a visible status."],
        ["Candor", "You should hear where the firm is strong, where buyers may object, and what may reduce certainty or value."],
        ["Choice", "You should see credible alternatives before entering exclusivity or accepting any structure."],
        ["Boundaries", "Regulated advice should come from the appropriate separately engaged professional."],
        ["Continuity", "The process should address employees, clients, leadership, systems, and transition—not only signing and funds flow."],
      ].map(([title, body]) => <div key={title} className="border-b border-r border-white/16 p-6"><div className="text-[13px] font-semibold text-white">{title}</div><p className="mt-3 text-[11px] leading-6 text-white/62">{body}</p></div>)}</div></Container></section>
      <LeadershipAndTrackRecord />
      <TestimonialsSection />
      <QuietClose title="A firm sale should reflect the value of the business and the owner's priorities." body="CPA Bridge provides financial preparation, transaction discipline, and end-to-end coordination toward that outcome." button="Begin a conversation" onClick={() => setPage("Contact")} />
    </>
  );
}

function Insights({ setPage }: { setPage: (page: PublicPage) => void }) {
  const guides = [
    [BookOpen, "Owner readiness", "The twelve questions to answer before deciding whether the firm is ready for a sale process.", ["Owner goals", "Financial readiness", "People", "Clients", "Transition"]],
    [Calculator, "Understanding normalized earnings", "How buyers separate ongoing economics from owner choices, one-time items, and required future costs.", ["Owner compensation", "Add-backs", "Vacancies", "Underinvestment", "Support"]],
    [Users, "Client concentration and transferability", "How buyer diligence evaluates revenue durability, relationship ownership, and retention risk.", ["Top clients", "Tenure", "Services", "Decision makers", "Transition"]],
    [Scale, "Comparing offers", "A whole-deal framework for price, cash at close, seller financing, earnouts, rollover, conditions, and certainty.", ["Economics", "Financing", "Conditions", "People", "Transition"]],
    [ShieldCheck, "Confidentiality in a sale process", "Why anonymous discovery, buyer approval, NDAs, seller permission, and document release should remain distinct.", ["Identity", "Access", "NDA", "Release", "Diligence"]],
    [Route, "Planning the transition", "How employees, clients, leadership, systems, owner responsibilities, and the first 90 days align.", ["Employees", "Clients", "Leadership", "Systems", "30/60/90"]],
  ];
  const glossary = [
    ["Adjusted or normalized EBITDA", "Operating earnings after supported adjustments intended to reflect the sustainable economics of the business under buyer ownership."],
    ["Earnout", "Consideration paid after closing if defined future conditions or performance targets are achieved."],
    ["Seller note", "A portion of the purchase price financed by the seller and repaid over time under agreed terms."],
    ["Rollover equity", "Value retained or reinvested by the seller in the buyer or combined business after closing."],
    ["Working capital", "Operating current assets and liabilities required to run the business, often addressed through a closing target and post-close adjustment."],
    ["Letter of intent", "A preliminary agreement outlining proposed economics, structure, exclusivity, diligence scope, and other principal terms before definitive documents."],
    ["Quality of earnings", "Financial diligence focused on the durability, composition, and accuracy of earnings and cash flow."],
    ["Data room", "A controlled repository where approved parties can review documents under defined access and confidentiality controls."],
  ];
  return (
    <>
      <PageHero tone="light" compact eyebrow="Insights for owners and buyers" title="Understand the transaction before it controls your timeline." body="CPA Bridge publishes practical guidance on financial readiness, buyer diligence, confidentiality, offer structure, closing risk, and transition planning for CPA-firm transactions." primary="Discuss a specific question" secondary="Review the seller process" onPrimary={() => setPage("Contact")} onSecondary={() => setPage("Sell Your Firm")} right={<div className="border border-white/18 p-7"><div className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/58">Featured owner resource</div><h3 className="mt-5 text-[27px] font-semibold leading-tight text-white" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Is the firm ready to be shown to buyers?</h3><p className="mt-4 text-[11px] leading-6 text-white/64">A readiness framework addressing the financial record, clients, employees, owner dependence, systems, legal records, price expectations, and transition planning.</p><div className="mt-6 flex items-center gap-2 text-[11px] font-semibold text-white/58">Review the readiness framework<ArrowRight size={14} /></div></div>} />
      <section data-reveal className="bg-white py-20 md:py-28"><Container><SectionIntro eyebrow="Guides" title="The questions that shape value and certainty." /><div data-stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{guides.map(([Icon, title, body, topics]) => <article key={title as string} className="border border-[#D7D0C4] bg-white p-7"><Icon size={21} className="text-[#51646D]" /><h3 className="mt-6 text-[24px] font-semibold leading-tight text-[#0A1721]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{title as string}</h3><p className="mt-4 text-[11px] leading-6 text-[#51646D]">{body as string}</p><div className="mt-6 border-t border-[#D7D0C4] pt-5"><div className="text-[9px] font-semibold uppercase tracking-[.16em] text-[#65737A]">Topics</div><div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">{(topics as string[]).map((topic) => <span key={topic} className="text-[10px] text-[#20313A]">{topic}</span>)}</div></div></article>)}</div></Container></section>
      <section data-reveal className="bg-[#F6F1E8] py-20 md:py-28"><Container><SectionIntro eyebrow="Transaction glossary" title="Terms you will encounter during a sale process." /><div data-stagger className="mt-12 grid gap-x-10 md:grid-cols-2">{glossary.map(([term, definition]) => <div key={term} className="border-t border-[#D7D0C4] py-6"><div className="text-[13px] font-semibold text-[#0A1721]">{term}</div><p className="mt-2 text-[11px] leading-6 text-[#51646D]">{definition}</p></div>)}</div></Container></section>
      <section data-reveal className="bg-white py-20 md:py-28"><Container><ReadinessScorecard /></Container></section>
      <QuietClose title="General guidance is useful. A firm-specific discussion is more valuable." body="Bring your actual questions, constraints, timing, and risks. CPA Bridge can help organize what should be answered next." button="Contact CPA Bridge" onClick={() => setPage("Contact")} />
    </>
  );
}

function FAQ({ setPage }: { setPage: (page: PublicPage) => void }) {
  const items: FAQItem[] = [
    { question: "What makes CPA Bridge different from a listing-only broker?", answer: "CPA Bridge stays involved in the work before and after a buyer introduction. That includes preparing the financial story, reviewing buyers, comparing the complete terms, organizing diligence, and helping the transaction move toward closing." },
    { question: "Is CPA Bridge an investment bank?", answer: "CPA Bridge brings former investment-banking and finance experience to CPA-firm transactions. The exact services depend on the engagement. When a transaction needs legal, tax, accounting, lending, escrow, securities, or another regulated service, the appropriate qualified professional is engaged separately." },
    { question: "Does CPA Bridge guarantee a valuation or sale price?", answer: "No advisor can promise a specific outcome before the market and the firm have been properly evaluated. CPA Bridge focuses on the parts that can be improved: preparation, information quality, buyer fit, offer comparison, and disciplined execution." },
    { question: "How is confidentiality protected?", answer: "The process moves in stages. Buyers begin with anonymous information, then go through qualification and confidentiality review. You decide who advances and which private materials may be released." },
    { question: "When should an owner contact CPA Bridge?", answer: "You can reach out before deciding to sell. Owners often begin while thinking about retirement, succession, valuation, partial liquidity, a growth partner, or an unexpected approach from a buyer." },
    { question: "How are buyers identified?", answer: "CPA Bridge looks for buyers whose size, location, services, resources, and operating plans fit the firm and the owner's preferences. The goal is a credible group of potential partners—not the longest possible list." },
    { question: "What is the difference between matching and ranking?", answer: "Matching asks whether a buyer and firm are compatible. Ranking helps order the compatible options for review. Neither step gives a buyer access or replaces CPA Bridge review and the seller's decision." },
    { question: "Who decides which buyers receive information?", answer: "You do. CPA Bridge explains who the buyer is, why the opportunity may fit, and what concerns remain. You can approve, decline, wait, or ask for more information." },
    { question: "Does an NDA automatically release documents?", answer: "No. An NDA is one safeguard, not automatic permission. The buyer request, CPA Bridge review, your approval, and the specific documents to be shared are separate steps." },
    { question: "How are offers compared?", answer: "We compare what is paid at closing, what is delayed, what remains conditional, and what the seller must do afterward. We also review the buyer's financing, employee and client plans, diligence conditions, and ability to close." },
    { question: "What happens after an offer is accepted?", answer: "The transaction moves into diligence and definitive documentation. There is still substantial work to organize: buyer questions, financing, legal and tax matters, closing conditions, employee and client communications, and the transition plan." },
    { question: "Can CPA Bridge introduce legal, tax, accounting, financing, or escrow professionals?", answer: "Yes. CPA Bridge may help identify and coordinate outside professionals. Each provider is responsible for the advice and services covered by its own engagement." },
    { question: "What information is needed at the beginning?", answer: "A first conversation can start with your goals, timing, basic firm profile, known concerns, and the kind of transition you want. You do not need to send sensitive records through the public contact form." },
    { question: "How long does a sale process take?", answer: "There is no single timeline. A prepared firm with engaged buyers may move faster, while complex diligence or financing can take longer. The process should move with purpose, but not so quickly that important questions are ignored." },
    { question: "Can an owner pause or stop the process?", answer: "Yes. Exploring a sale does not require you to continue if the timing, buyers, or terms no longer feel right. Any signed exclusivity or engagement obligations still apply, so those terms should be clear before you agree to them." },
  ];
  return (
    <>
      <PageHero tone="light" compact eyebrow="Frequently asked questions" title="Straightforward answers about a complex process." body="A CPA firm sale involves money, people, clients, timing, and personal decisions. These answers are a starting point. Your own situation may call for a more specific conversation." primary="Ask a private question" secondary="Explore the process" onPrimary={() => setPage("Contact")} onSecondary={() => setPage("Our Approach")} right={<div className="p-0"><div className="text-[9px] font-semibold uppercase tracking-[.18em]">Common topics</div><div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4">{["Readiness","Valuation","Confidentiality","Buyers","Offers","Diligence","Closing","Transition"].map((item) => <div key={item} className="border-t border-[#D7D0C4] pt-3 text-[10px]">{item}</div>)}</div></div>} />
      <FAQSection title="What owners and buyers want to understand" items={items} />
    </>
  );
}

function Contact() {
  const [audience, setAudience] = useState<"seller" | "buyer" | "advisor" | "other">("seller");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event: FormEvent) => { event.preventDefault(); setSubmitted(true); };
  if (submitted) {
    return (
      <section data-reveal className="min-h-[720px] bg-[#F6F1E8] py-24"><Container><div className="mx-auto max-w-[760px] border border-[#D7D0C4] bg-white p-10 md:p-14"><CheckCircle2 size={30} className="text-[#3D6A5C]" /><h1 className="mt-6 text-[42px] font-semibold leading-tight text-[#0A1721]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Your inquiry has been received.</h1><p className="mt-5 text-[14px] leading-7 text-[#51646D]">A member of the CPA Bridge team will review the information and respond using your preferred contact method. Please do not send confidential client records, tax returns, employee information, banking credentials, or transaction documents through ordinary email unless a secure method has been provided.</p><div className="mt-8 border-t border-[#D7D0C4] pt-6"><div className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#65737A]">What happens next</div><div className="mt-4 space-y-3">{["We will review the purpose and timing of your inquiry","We will confirm the appropriate CPA Bridge contact person","We will schedule a confidential introductory conversation","We will provide a secure next step if documents are needed"].map((item) => <div key={item} className="flex gap-3 text-[11px] text-[#20313A]"><Check size={14} className="mt-1 text-[#51646D]" />{item}</div>)}</div></div></div></Container></section>
    );
  }
  return (
    <>
      <PageHero compact eyebrow="Contact" title="Begin with a confidential conversation." body="You do not need to explain the entire firm or decide whether you are selling. Tell us what you are trying to understand, the timing you have in mind, and the questions that are weighing on you. We will take it from there." right={<div className="border border-white/18 p-7"><div className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/58">Keep sensitive records out of this form</div><div className="mt-5 space-y-4">{["Client names or tax information","Employee personal details","Banking or payment credentials","Tax returns or detailed financial records","Executed transaction documents","Passwords or access credentials"].map((item) => <div key={item} className="flex gap-3 text-[12px] leading-6 text-white/68"><LockKeyhole size={15} className="mt-1 shrink-0 text-white/58" />{item}</div>)}</div></div>} />
      <section data-reveal className="bg-[#F6F1E8] py-20 md:py-28"><Container><div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]"><div><Eyebrow>Select an inquiry type</Eyebrow><div className="mt-5 border-t border-[#C8B28B]">{[
        ["seller", "CPA firm owner", "Explore readiness, value, timing, succession, growth capital options, an unsolicited offer, or a potential sale."],
        ["buyer", "Prospective buyer", "Discuss acquisition criteria, relevant experience, funding capability, buyer approval, or a specific opportunity."],
        ["advisor", "Professional advisor", "Coordinate with counsel, accountants, lenders, wealth advisors, consultants, or other transaction professionals."],
        ["other", "Other inquiry", "Media inquiries, partnership opportunities, technology, recruiting, or another topic not covered above."],
      ].map(([value, title, body]) => <button key={value} type="button" onClick={() => setAudience(value as typeof audience)} className={cx("w-full border-b border-[#D7D0C4] py-5 text-left", audience === value && "bg-white px-4")}><div className="text-[13px] font-semibold text-[#0A1721]">{title}</div><p className="mt-2 text-[10px] leading-5 text-[#65737A]">{body}</p></button>)}</div><div className="mt-8 border border-[#D7D0C4] bg-white p-6"><div className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#65737A]">Privacy and security</div><p className="mt-3 text-[11px] leading-6 text-[#51646D]">Use this form for introductory information only. CPA Bridge will provide a secure method before requesting confidential records.</p></div></div><form onSubmit={handleSubmit} className="border border-[#D7D0C4] bg-white p-7 md:p-10"><div className="grid gap-5 md:grid-cols-2"><label className="text-[10px] font-semibold text-[#20313A]">First name *<input required className="mt-2 w-full border border-[#BFC5C3] px-3 py-3 text-[12px] outline-none focus:border-[#315D73] focus:ring-2 focus:ring-[#315D73]/15" /></label><label className="text-[10px] font-semibold text-[#20313A]">Last name *<input required className="mt-2 w-full border border-[#BFC5C3] px-3 py-3 text-[12px] outline-none focus:border-[#315D73] focus:ring-2 focus:ring-[#315D73]/15" /></label><label className="text-[10px] font-semibold text-[#20313A]">Email *<input required type="email" className="mt-2 w-full border border-[#BFC5C3] px-3 py-3 text-[12px] outline-none focus:border-[#315D73] focus:ring-2 focus:ring-[#315D73]/15" /></label><label className="text-[10px] font-semibold text-[#20313A]">Phone<input className="mt-2 w-full border border-[#BFC5C3] px-3 py-3 text-[12px] outline-none focus:border-[#315D73] focus:ring-2 focus:ring-[#315D73]/15" /></label><label className="text-[10px] font-semibold text-[#20313A] md:col-span-2">Firm or organization<input className="mt-2 w-full border border-[#BFC5C3] px-3 py-3 text-[12px] outline-none focus:border-[#315D73] focus:ring-2 focus:ring-[#315D73]/15" /></label><label className="text-[10px] font-semibold text-[#20313A]">Timing<select className="mt-2 w-full border border-[#BFC5C3] bg-white px-3 py-3 text-[12px] outline-none focus:border-[#315D73] focus:ring-2 focus:ring-[#315D73]/15"><option>Exploring options</option><option>Within 6 months</option><option>6–12 months</option><option>12–24 months</option><option>More than 24 months</option><option>Active transaction</option></select></label><label className="text-[10px] font-semibold text-[#20313A]">Preferred contact<select className="mt-2 w-full border border-[#BFC5C3] bg-white px-3 py-3 text-[12px] outline-none focus:border-[#315D73] focus:ring-2 focus:ring-[#315D73]/15"><option>Email</option><option>Phone</option><option>Either</option></select></label><label className="text-[10px] font-semibold text-[#20313A] md:col-span-2">What would you like to discuss? *<textarea required rows={7} className="mt-2 w-full border border-[#BFC5C3] p-3 text-[12px] leading-6 outline-none focus:border-[#315D73] focus:ring-2 focus:ring-[#315D73]/15" placeholder={audience === "seller" ? "Share your objectives, timing, transition preferences, known concerns, and the questions you want answered." : audience === "buyer" ? "Describe your acquisition criteria, relevant experience, funding approach, timing, and reason for your inquiry." : audience === "advisor" ? "Describe your role, the client or transaction context at a high level, and what coordination is requested." : "Describe the purpose of your inquiry."} /></label></div><label className="mt-6 flex items-start gap-3 text-[10px] leading-5 text-[#65737A]"><input required type="checkbox" className="mt-1" />I have read the Privacy Policy and consent to CPA Bridge using this information to respond to my inquiry.</label><div className="mt-5 border border-[#D7D0C4] bg-[#F9F6F0] p-4 text-[10px] leading-5 text-[#65737A]">This form uses anti-abuse controls. Do not submit sensitive personal, client, financial, tax, or transaction information.</div><div className="mt-7 max-w-[430px]"><PrimaryButton type="submit">Submit confidential inquiry<ArrowRight size={15} /></PrimaryButton><p className="mt-3 text-[10px] leading-5 text-[#65737A]">No cost to submit. No obligation to proceed. Your inquiry stays with CPA Bridge unless you authorize information to be shared.</p></div></form></div></Container></section>
    </>
  );
}

function QuietClose({ title, body, button, onClick }: { title: string; body: string; button: string; onClick: () => void }) {
  return <section data-reveal className="border-t border-[#D7D0C4] bg-white py-14 md:py-20"><Container><div className="max-w-[820px]"><h2 className="text-[27px] font-semibold leading-tight tracking-[-.025em] text-[#0A1721] md:text-[34px]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{title}</h2><p className="mt-4 max-w-[720px] text-[13px] leading-7 text-[#65737A]">{body}</p><button type="button" onClick={onClick} className="pb-text-link mt-6 text-[12px] font-semibold text-[#0A1721] underline decoration-[#B9B1A5] underline-offset-4 hover:decoration-[#0A1721]">{button}</button></div></Container></section>;
}

const legalContent: Record<(typeof LEGAL_PAGES)[number], { intro: string; sections: Array<[string, string]> }> = {
  "Terms of Use": {
    intro: "These terms govern access to the CPA Bridge website, public resources, forms, accounts, and transaction-related digital services.",
    sections: [
      ["Acceptance", "By using the website or creating an account, you agree to these terms and any additional terms presented for a specific service, transaction, confidentiality agreement, data room, or professional engagement."],
      ["Eligibility and accurate information", "Users must provide accurate information, protect account credentials, and use the site only for lawful purposes. Registration does not guarantee account approval, buyer approval, listing acceptance, information access, financing, or transaction participation."],
      ["No professional relationship from website use", "Using the public website, submitting a form, receiving general information, or creating an account does not by itself create an advisory, legal, tax, accounting, lending, brokerage, securities, fiduciary, or other professional relationship."],
      ["Confidential information", "Users must follow all confidentiality, access, download, use, retention, deletion, and disclosure restrictions that apply to information received through CPA Bridge."],
      ["Intellectual property", "Website content, design, software, trademarks, processes, and materials are protected by applicable intellectual-property laws. Transaction materials may also be owned by sellers, buyers, or professional providers."],
      ["No guarantee", "CPA Bridge does not guarantee valuation, buyer or seller interest, financing, diligence results, tax treatment, negotiated terms, regulatory approval, closing, transition, or financial outcome."],
      ["Changes and termination", "CPA Bridge may update the website, terms, access, or functionality and may suspend or terminate access for security, legal, contractual, operational, or misuse reasons."],
      ["Contact", "Questions about these terms may be submitted through the Contact page."],
    ],
  },
  "Privacy Policy": {
    intro: "This policy explains how CPA Bridge may collect, use, disclose, retain, and protect personal information in connection with the website and services.",
    sections: [
      ["Information collected", "Information may include contact details, account information, organization or firm information, inquiry content, buyer criteria, transaction preferences, device and usage data, communications, and information submitted during an authorized process."],
      ["How information is used", "CPA Bridge may use information to respond to inquiries, operate accounts, evaluate buyers and sellers, support transactions, manage security, improve services, meet contractual or legal requirements, and communicate about relevant activity."],
      ["How information is disclosed", "Information may be disclosed to authorized transaction parties, service providers, professional advisors, security or technology vendors, regulators, legal authorities, or other parties when permitted or required."],
      ["Transaction-specific controls", "Seller identity, buyer information, documents, and transaction data may be subject to separate confidentiality agreements, permissions, engagement terms, or data-room rules."],
      ["Retention", "Information may be retained for the period needed to operate the service, support a transaction, meet contractual or legal obligations, resolve disputes, maintain security, and preserve appropriate records."],
      ["Rights and requests", "Depending on applicable law, users may request access, correction, deletion, portability, restriction, or information about the handling of personal data."],
      ["Security", "CPA Bridge uses administrative, technical, and organizational safeguards appropriate to the nature of the information, but no system can guarantee absolute security."],
      ["Contact", "Privacy questions and data requests may be submitted through the Contact page or the Data Rights & Requests page."],
    ],
  },
  "Cookie Policy": {
    intro: "This policy describes the categories of cookies and similar technologies that may be used on the CPA Bridge website.",
    sections: [
      ["Essential technologies", "These support security, authentication, session management, forms, preferences, accessibility, and core site operation. They may be required for the website to function."],
      ["Analytics", "Analytics may help CPA Bridge understand aggregate usage, page performance, errors, navigation, and service improvement. Nonessential analytics should follow the visitor's consent choices where required."],
      ["Preferences", "Preference technologies may remember language, display, cookie, or other user choices."],
      ["Marketing", "Marketing technologies, if used, should be described transparently and offered only in accordance with applicable consent requirements."],
      ["Managing preferences", "Visitors may use the cookie preference controls to accept all, reject nonessential technologies, or manage categories."],
    ],
  },
  "Accessibility": {
    intro: "CPA Bridge is committed to providing a website and digital experience that is usable by people with disabilities.",
    sections: [
      ["Design approach", "The website is designed to support readable contrast, keyboard navigation, visible focus, semantic headings, descriptive controls, responsive layouts, and alternatives to color-only meaning."],
      ["Ongoing review", "Accessibility is an ongoing process. CPA Bridge may test, monitor, and improve public pages, forms, account experiences, documents, and transaction workflows over time."],
      ["Third-party content", "Some third-party documents, applications, or professional-provider tools may be outside CPA Bridge's direct control."],
      ["Request assistance", "Users who experience an accessibility barrier may contact CPA Bridge and describe the page, feature, document, preferred format, and support needed."],
    ],
  },
  "Security & Confidentiality": {
    intro: "CPA Bridge is designed around staged visibility, role permissions, explicit approvals, and transaction-specific information access.",
    sections: [
      ["Staged confidentiality", "Public information, anonymous listings, approved-buyer information, seller-approved releases, serious-review materials, and diligence information remain separate levels."],
      ["Distinct decisions", "Buyer approval, matching, ranking, request review, confidentiality agreement, seller permission, and document release are separate states. No single state silently grants another."],
      ["Access management", "Access may be limited by user, role, transaction, document, time, download permission, watermark, confidentiality level, or other control."],
      ["Activity records", "Relevant actions may be logged, including access requests, approvals, releases, status changes, and administrative activity."],
      ["Incident response", "CPA Bridge may investigate, contain, suspend access, preserve records, notify affected parties, and take other steps when a suspected security or confidentiality issue occurs."],
      ["User responsibility", "Users remain responsible for authorized use, device security, credential protection, confidentiality restrictions, and avoiding unapproved forwarding, copying, download, or disclosure."],
    ],
  },
  "Professional-Services Disclaimer": {
    intro: "CPA Bridge coordinates transaction advisory and related work. Some services may require separate qualified or licensed professionals.",
    sections: [
      ["No legal advice", "Website content and CPA Bridge coordination do not constitute legal advice. Transaction documents, legal diligence, entity matters, employment issues, restrictive covenants, and other legal work should be handled by qualified counsel."],
      ["No tax or accounting advice", "General transaction analysis does not replace advice from qualified tax or accounting professionals regarding structure, reporting, compliance, allocation, diligence, or other matters."],
      ["No lending commitment", "Financing coordination and lender introductions do not constitute a loan commitment, credit decision, guarantee, or financing approval."],
      ["Securities and regulated activity", "Any service requiring registration, licensing, authorization, or a regulated professional relationship will be provided only through an appropriately qualified party and applicable engagement."],
      ["No fiduciary relationship by website use", "Website access, public information, forms, and account registration do not by themselves create a fiduciary or professional-client relationship."],
      ["No outcome guarantee", "No valuation, buyer interest, financing, terms, closing, tax result, transition, or financial outcome is guaranteed."],
    ],
  },
  "Electronic Communications Consent": {
    intro: "This consent explains how CPA Bridge may deliver notices, disclosures, records, and transaction communications electronically.",
    sections: [
      ["Electronic delivery", "By consenting, users agree that CPA Bridge may provide communications through email, the website, an account, secure portal, electronic-signature service, or other approved electronic method."],
      ["Hardware and access", "Users are responsible for maintaining a supported device, internet access, current browser, ability to view common document formats, and accurate contact information."],
      ["Paper copies", "Users may request paper copies where available and may be responsible for reasonable delivery or administrative costs if disclosed."],
      ["Withdrawal", "Users may withdraw consent subject to applicable law, contractual requirements, and the practical ability to continue using electronic services."],
      ["Recordkeeping", "Users should retain copies of important communications, agreements, disclosures, and transaction documents."],
    ],
  },
  "Acceptable Use": {
    intro: "Users must use CPA Bridge systems, information, and transaction materials lawfully, securely, and only for authorized purposes.",
    sections: [
      ["Permitted use", "Use is limited to legitimate inquiries, approved account activity, authorized transaction review, and other purposes expressly permitted by CPA Bridge and applicable agreements."],
      ["Prohibited conduct", "Users may not misrepresent identity or funding, scrape data, bypass controls, probe security, distribute malware, interfere with service, misuse confidential information, or access information without authorization."],
      ["Confidential materials", "Users may not forward, copy, download, retain, disclose, or use confidential materials beyond the permission granted for the specific transaction."],
      ["Enforcement", "CPA Bridge may restrict, suspend, terminate, investigate, preserve records, or notify affected parties or authorities when misuse is suspected."],
    ],
  },
  "Data Rights & Requests": {
    intro: "This page explains how individuals may submit privacy, account, and data-related requests.",
    sections: [
      ["Available requests", "Depending on applicable law, requests may include access, correction, deletion, portability, restriction, withdrawal of consent, account closure, or information about data practices."],
      ["Verification", "CPA Bridge may need to verify identity, authority, account ownership, or representation before completing a request."],
      ["Transaction records", "Certain records may need to be retained for active transactions, contracts, legal obligations, security, disputes, audit, or legitimate business purposes."],
      ["Authorized agents", "An authorized agent may need to provide evidence of authority and may be subject to additional verification."],
      ["Submit a request", "Use the Contact page and identify the request as a data-rights or account request. Do not send identity documents through ordinary email unless a secure method has been provided."],
    ],
  },
  "Site Map": {
    intro: "A directory of CPA Bridge public pages, owner resources, buyer information, and legal policies.",
    sections: [
      ["Owners", "Home; Sell Your Firm; Our Approach; Value & Deal Structure; Services; FAQ; Contact."],
      ["Buyers", "Buy a Firm; Services; FAQ; Contact; Client sign in."],
      ["Firm", "About; Insights; Contact."],
      ["Legal and trust", "Terms of Use; Privacy Policy; Cookie Policy; Accessibility; Security & Confidentiality; Professional-Services Disclaimer; Electronic Communications Consent; Acceptable Use; Data Rights & Requests."],
    ],
  },
};

function LegalPageView({ page }: { page: (typeof LEGAL_PAGES)[number] }) {
  const content = legalContent[page];
  return (
    <>
      <section data-reveal className="bg-[#0A1721] py-16 text-white md:py-20"><Container><Eyebrow inverse>Legal and trust</Eyebrow><h1 className="mt-5 text-[44px] font-semibold leading-tight tracking-[-.04em] md:text-[64px]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{page}</h1><p className="mt-5 max-w-[850px] text-[14px] leading-7 text-white/68">{content.intro}</p><p className="mt-5 text-[9px] uppercase tracking-[.14em] text-white/42">Last updated July 2026</p></Container></section>
      <section data-reveal className="bg-white py-16 md:py-24"><Container><div className="max-w-[920px] border-t border-[#C8B28B]">{content.sections.map(([title, body], index) => <div key={title} className="grid gap-4 border-b border-[#D7D0C4] py-7 md:grid-cols-[70px_230px_1fr]"><div className="text-[10px] font-semibold text-[#51646D]">0{index + 1}</div><h2 className="text-[17px] font-semibold text-[#0A1721]">{title}</h2><p className="text-[12px] leading-7 text-[#51646D]">{body}</p></div>)}</div></Container></section>
    </>
  );
}

function CookiePanel() {
  const [visible, setVisible] = useState(true);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  if (!visible) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 z-[80] max-w-[720px] border border-white/70 bg-white/88 p-5 backdrop-blur-xl shadow-[0_18px_52px_rgba(10,23,33,.14)] md:left-auto md:right-6 md:w-[620px]">
      <div className="flex items-start justify-between gap-5"><div><div className="text-[12px] font-semibold text-[#0A1721]">Cookie preferences</div><p className="mt-2 text-[10px] leading-5 text-[#65737A]">Essential technologies support security, forms, preferences, and core site operation. Optional analytics help improve the website when enabled.</p>
</div><button type="button" onClick={() => setVisible(false)} aria-label="Close cookie notice"><X size={17} /></button></div>
      {manage && <div className="mt-4 border-t border-[#D7D0C4] pt-4"><div className="flex items-center justify-between py-2 text-[10px]"><span>Essential</span><span className="font-semibold text-[#3D6A5C]">Always on</span></div><label className="flex items-center justify-between py-2 text-[10px]"><span>Analytics</span><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} /></label></div>}
      <div className="mt-5 flex flex-wrap gap-2"><button type="button" onClick={() => setVisible(false)} className="border border-[#0A1721] bg-[#0A1721] px-4 py-2 text-[10px] font-semibold text-white">Accept all</button><button type="button" onClick={() => setVisible(false)} className="border border-[#BFC5C3] px-4 py-2 text-[10px] font-semibold text-[#0A1721]">Reject nonessential</button><button type="button" onClick={() => setManage(!manage)} className="px-2 py-2 text-[10px] font-semibold text-[#2D4654]">Manage preferences</button></div>
    </div>
  );
}

export function PublicSite({ onSignIn, onCreateAccount }: PublicSiteProps) {
  const [page, setPage] = useState<PublicPage>("Home");
  useMarketingMotion(page);
  const navigate = (next: PublicPage) => { setPage(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  let content: ReactNode;
  if (page === "Home") content = <Home setPage={navigate} />;
  else if (page === "Sell Your Firm") content = <SellYourFirm setPage={navigate} />;
  else if (page === "Our Approach") content = <OurApproach setPage={navigate} />;
  else if (page === "Value & Deal Structure") content = <ValueAndDealStructure setPage={navigate} />;
  else if (page === "Buy a Firm") content = <BuyAFirm setPage={navigate} />;
  else if (page === "Services") content = <Services setPage={navigate} />;
  else if (page === "About") content = <About setPage={navigate} />;
  else if (page === "Insights") content = <Insights setPage={navigate} />;
  else if (page === "FAQ") content = <FAQ setPage={navigate} />;
  else if (page === "Contact") content = <Contact />;
  else content = <LegalPageView page={page as (typeof LEGAL_PAGES)[number]} />;
  return (
    <div data-public-site className="pb-motion-ready min-h-screen bg-white text-[#20313A]">
      <InstitutionalHeader page={page} setPage={navigate} onSignIn={onSignIn} />
      <main>{content}</main>
      <Footer setPage={navigate} />
      <CookiePanel />
      <div className="sr-only"><button type="button" onClick={() => onCreateAccount("seller")}>Create seller account</button><button type="button" onClick={() => onCreateAccount("buyer")}>Create buyer account</button></div>
    </div>
  );
}

export function BrandStudio() {
  const [section, setSection] = useState<"site" | "brand" | "content" | "components" | "qa">("site");
  const nav = [
    ["site", "Site architecture"],
    ["brand", "Brand system"],
    ["content", "Content standards"],
    ["components", "Component inventory"],
    ["qa", "Launch QA"],
  ] as const;
  return (
    <div className="min-h-screen bg-[#ECE7DE] text-[#20313A]">
      <div className="border-b border-[#D0C8BB] bg-[#0A1721] text-white"><Container className="flex min-h-[72px] items-center justify-between"><Wordmark inverse /><div className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/45">Internal design and implementation reference</div></Container></div>
      <Container className="grid gap-8 py-10 lg:grid-cols-[250px_1fr]">
        <aside className="h-fit border border-[#D0C8BB] bg-white p-4 lg:sticky lg:top-6">{nav.map(([value, label]) => <button key={value} type="button" onClick={() => setSection(value)} className={cx("flex w-full items-center justify-between border-b border-[#E1DBD1] px-2 py-4 text-left text-[11px] font-semibold", section === value ? "text-[#51646D]" : "text-[#2D4654]")}>{label}<ChevronRight size={14} /></button>)}</aside>
        <section data-reveal className="border border-[#D0C8BB] bg-white p-7 md:p-10">
          {section === "site" && <><Eyebrow>Site architecture</Eyebrow><h1 className="mt-4 text-[42px] font-semibold text-[#0A1721]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Production public-site map</h1><div data-stagger className="mt-10 grid gap-5 md:grid-cols-2">{[
            ["Owner journey", "Home → Sell Your Firm → Our Approach → Value & Deal Structure → Services → Contact"],
            ["Buyer journey", "Home → Buy a Firm → FAQ → Contact → Buyer registration / sign in"],
            ["Trust journey", "About → Security & Confidentiality → Privacy → Professional-Services Disclaimer"],
            ["Education journey", "Insights → FAQ → Value & Deal Structure → Contact"],
          ].map(([title, body]) => <div key={title} className="border border-[#D7D0C4] p-6"><div className="text-[13px] font-semibold text-[#0A1721]">{title}</div><p className="mt-3 text-[11px] leading-6 text-[#51646D]">{body}</p></div>)}</div></>}
          {section === "brand" && <><Eyebrow>Brand system</Eyebrow><h1 className="mt-4 text-[42px] font-semibold text-[#0A1721]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Restrained, editorial, transaction-focused.</h1><div data-stagger className="mt-10 grid gap-5 md:grid-cols-2"><div className="border border-[#D7D0C4] p-6"><Wordmark /><p className="mt-6 text-[11px] leading-6 text-[#51646D]">The bridge mark represents continuity between owner, buyer, business, employees, clients, and the post-closing future.</p></div><div className="grid grid-cols-2 border-l border-t border-[#D7D0C4]">{Object.entries(COLORS).map(([name, value]) => <div key={name} className="border-b border-r border-[#D7D0C4] p-4"><div className="h-12 border border-black/10" style={{ backgroundColor: value }} /><div className="mt-3 text-[9px] font-semibold uppercase tracking-[.12em]">{name}</div><div className="mt-1 text-[9px] text-[#65737A]">{value}</div></div>)}</div></div></>}
          {section === "content" && <><Eyebrow>Content standards</Eyebrow><h1 className="mt-4 text-[42px] font-semibold text-[#0A1721]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Write with professionalism and clarity.</h1><div data-stagger className="mt-10 grid gap-5 md:grid-cols-2">{[
            ["Use", "Specific transaction language, complete explanations, decision tradeoffs, clear professional boundaries, direct owner-oriented copy, and evidence-backed claims."],
            ["Avoid", "Generic transformation language, empty superlatives, fabricated metrics, invented biographies, marketing jargon, unexplained terminology, and excessive visual elements."],
            ["Primary value proposition", "Former investment-banking and finance professionals helping CPA firm owners maximize value through preparation, positioning, competition, structure, and execution."],
            ["Tone", "Professional, direct, financially literate, discreet, candid about risk, and respectful of the owner's accomplishment."],
          ].map(([title, body]) => <div key={title} className="border border-[#D7D0C4] p-6"><div className="text-[13px] font-semibold text-[#0A1721]">{title}</div><p className="mt-3 text-[11px] leading-6 text-[#51646D]">{body}</p></div>)}</div></>}
          {section === "components" && <><Eyebrow>Component inventory</Eyebrow><h1 className="mt-4 text-[42px] font-semibold text-[#0A1721]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Reusable implementation system</h1><div className="mt-10 border-t border-[#C8B28B]">{[
            ["InstitutionalHeader", "Desktop and mobile navigation, utility strip, sign-in option, confidential inquiry call-to-action."],
            ["PageHero", "Editorial two-column hero with restrained transaction-focused right panel."],
            ["SectionIntro", "Eyebrow, serif heading, optional explanatory body."],
            ["Decision tables", "Offer comparison, seller rights, readiness, and legal structure tables with mobile overflow handling."],
            ["FAQ accordion", "Keyboard-operable questions with one open panel at a time."],
            ["Contact workflow", "Audience selector, safe-information guidance, consent, anti-abuse notice, and success state."],
            ["CookiePanel", "Essential, analytics, accept, reject, and preference-management states."],
            ["Footer", "Owner, buyer, firm, legal, and professional-boundary navigation."],
          ].map(([title, body]) => <div key={title} className="grid gap-4 border-b border-[#D7D0C4] py-5 md:grid-cols-[240px_1fr]"><div className="text-[12px] font-semibold text-[#0A1721]">{title}</div><div className="text-[11px] leading-6 text-[#51646D]">{body}</div></div>)}</div></>}
          {section === "qa" && <><Eyebrow>Launch QA</Eyebrow><h1 className="mt-4 text-[42px] font-semibold text-[#0A1721]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Production acceptance checklist</h1><div data-stagger className="mt-10 grid gap-4 md:grid-cols-2">{[
            "No legacy brand names or internal project names",
            "No fabricated biographies, transaction counts, or performance metrics",
            "Former investment-banking and finance value proposition visible on Home, About, and Footer",
            "Seller and buyer journeys are clearly separated",
            "Confidentiality gates are explained consistently",
            "All public navigation and footer links resolve correctly",
            "Contact form includes consent, safe-information warning, and success state",
            "Legal, accessibility, security, acceptable-use, and data-rights pages exist",
            "Mobile navigation works without horizontal clipping",
            "Tables remain usable on smaller screens",
            "Visible focus and keyboard navigation are supported",
            "No claim guarantees a valuation, price, buyer, financing, or closing",
          ].map((item) => <div key={item} className="flex gap-3 border border-[#D7D0C4] p-4 text-[11px] leading-5"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#3D6A5C]" />{item}</div>)}</div></>}
        </section>
      </Container>
    </div>
  );
}