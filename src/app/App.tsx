import { useState, useCallback, useEffect } from "react";
import {
  Building2, FileText, CheckCircle2, Clock, Lock, AlertTriangle,
  ChevronRight, User, Users, Shield, Upload, Eye, EyeOff,
  Phone, Mail, MapPin, DollarSign, FileCheck, X, Check,
  Briefcase, ClipboardList, BarChart3, Bell, Home, Search,
  RefreshCw, Play, Info, RotateCcw, ArrowRight, Circle,
  BookOpen, Star, UserCheck, FileWarning, Handshake, Scale,
  AlertCircle, ChevronDown, Menu, ZoomIn, Download, Folder, CalendarDays,
  CheckSquare, Square, Minus, Flag, Send, MessageSquare
} from "lucide-react";
import { BrandStudio, PublicSite } from "./PublicBrandExperience";

// ─── Types ───────────────────────────────────────────────────────────────────
type Role = "seller" | "buyer" | "staff";

interface DemoState {
  sellerInterest: boolean;
  businessSaved: boolean;
  filesUploaded: boolean;
  readinessReviewed: boolean;
  sellerListingApproved: boolean;
  bridgeListingApproved: boolean;
  buyerSignup: boolean;
  buyerProfileSubmitted: boolean;
  buyerApproved: boolean;
  matchRecommended: boolean;
  anonymousListingViewed: boolean;
  accessRequested: boolean;
  ndaSigned: boolean;
  bridgeRequestReviewed: boolean;
  sellerAccessApproved: boolean;
  documentsReleased: boolean;
  offerSubmitted: boolean;
  offerAcceptedForDiligence: boolean;
  diligenceOpened: boolean;
  diligenceCompleted: boolean;
  servicesSelected: boolean;
  definitiveDocsPrepared: boolean;
  closingReadiness: boolean;
  transactionClosed: boolean;
}

const INITIAL_STATE: DemoState = {
  sellerInterest: false, businessSaved: false, filesUploaded: false,
  readinessReviewed: false, sellerListingApproved: false, bridgeListingApproved: false,
  buyerSignup: false, buyerProfileSubmitted: false, buyerApproved: false,
  matchRecommended: false, anonymousListingViewed: false, accessRequested: false,
  ndaSigned: false, bridgeRequestReviewed: false, sellerAccessApproved: false,
  documentsReleased: false, offerSubmitted: false, offerAcceptedForDiligence: false,
  diligenceOpened: false, diligenceCompleted: false, servicesSelected: false,
  definitiveDocsPrepared: false, closingReadiness: false, transactionClosed: false
};

const STEPS = [
  { id: 1, label: "Seller submits interest", role: "seller" as Role, key: "sellerInterest" },
  { id: 2, label: "Seller business information", role: "seller" as Role, key: "businessSaved" },
  { id: 3, label: "Seller uploads files", role: "seller" as Role, key: "filesUploaded" },
  { id: 4, label: "CPA Bridge reviews readiness", role: "staff" as Role, key: "readinessReviewed" },
  { id: 5, label: "Seller approves listing", role: "seller" as Role, key: "sellerListingApproved" },
  { id: 6, label: "CPA Bridge approves listing", role: "staff" as Role, key: "bridgeListingApproved" },
  { id: 7, label: "Buyer creates account", role: "buyer" as Role, key: "buyerSignup" },
  { id: 8, label: "Buyer completes profile", role: "buyer" as Role, key: "buyerProfileSubmitted" },
  { id: 9, label: "CPA Bridge approves buyer", role: "staff" as Role, key: "buyerApproved" },
  { id: 10, label: "Buyer views anonymous listing", role: "buyer" as Role, key: "anonymousListingViewed" },
  { id: 11, label: "Buyer requests access", role: "buyer" as Role, key: "accessRequested" },
  { id: 12, label: "Buyer signs NDA", role: "buyer" as Role, key: "ndaSigned" },
  { id: 13, label: "CPA Bridge reviews request", role: "staff" as Role, key: "bridgeRequestReviewed" },
  { id: 14, label: "Seller approves buyer", role: "seller" as Role, key: "sellerAccessApproved" },
  { id: 15, label: "CPA Bridge releases documents", role: "staff" as Role, key: "documentsReleased" },
  { id: 16, label: "Buyer submits offer", role: "buyer" as Role, key: "offerSubmitted" },
  { id: 17, label: "Seller accepts for diligence", role: "seller" as Role, key: "offerAcceptedForDiligence" },
  // Phase 2 — Transaction Execution & Closing
  { id: 18, label: "Diligence completed", role: "staff" as Role, key: "diligenceCompleted" },
  { id: 19, label: "Parties select transaction services", role: "buyer" as Role, key: "servicesSelected" },
  { id: 20, label: "Counsel & advisers prepare definitive docs", role: "staff" as Role, key: "definitiveDocsPrepared" },
  { id: 21, label: "Transaction closes & transition begins", role: "staff" as Role, key: "transactionClosed" },
];

const PHASE1_COUNT = 17;
const TOTAL_STEPS = 21;

// ─── Utility Components ────────────────────────────────────────────────────────
function Badge({ variant, children, className = "" }: { variant: string; children: React.ReactNode; className?: string }) {
  const styles: Record<string, string> = {
    approved: "bg-[#E7F1E9] text-[#245A42] border border-[#B8D1BF]",
    clear: "bg-[#E7F1E9] text-[#245A42] border border-[#B8D1BF]",
    complete: "bg-[#E7F1E9] text-[#245A42] border border-[#B8D1BF]",
    active: "bg-[#F2E7D5] text-[#805A28] border border-[#D9C09A]",
    reviewing: "bg-[#F7F1E7] text-[#805A28] border border-[#D9C09A]",
    pending: "bg-[#FFF3D8] text-[#805A28] border border-[#E5C98D]",
    "needs-work": "bg-[#FFF3D8] text-[#805A28] border border-[#E5C98D]",
    locked: "bg-[#F0EFEC] text-[#65737A] border border-[#D7D0C4]",
    restricted: "bg-[#F7E7E4] text-[#8C3838] border border-[#E7B9B2]",
    "major-concern": "bg-[#F7E7E4] text-[#8C3838] border border-[#E7B9B2]",
    "strong-fit": "bg-[#E7F1E9] text-[#245A42] border border-[#B8D1BF]",
    "possible-fit": "bg-[#FFF3D8] text-[#805A28] border border-[#E5C98D]",
    "weak-fit": "bg-[#F7E7E4] text-[#8C3838] border border-[#E7B9B2]",
    missing: "bg-[#F7E7E4] text-[#8C3838] border border-[#E7B9B2]",
    uploaded: "bg-[#F7F1E7] text-[#805A28] border border-[#D9C09A]",
    accepted: "bg-[#E7F1E9] text-[#245A42] border border-[#B8D1BF]",
    replacement: "bg-[#FFF3D8] text-[#805A28] border border-[#E5C98D]",
    signed: "bg-[#E7F1E9] text-[#245A42] border border-[#B8D1BF]",
    released: "bg-[#E7F1E9] text-[#245A42] border border-[#B8D1BF]",
    draft: "bg-[#F0EFEC] text-[#65737A] border border-[#D7D0C4]",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-[999px] px-2.5 py-1 text-[11px] font-semibold leading-none transition-colors duration-150 ${styles[variant] ?? styles.active} ${className}`}>
      {children}
    </span>
  );
}

function Alert({ type, children }: { type: "info" | "warn" | "error" | "success" | "locked"; children: React.ReactNode }) {
  const cfg = {
    info: { bg: "#F7F1E7", border: "#A8793A", text: "#6F512B", Icon: Info },
    warn: { bg: "#FFF7E5", border: "#A8793A", text: "#805A28", Icon: AlertTriangle },
    error: { bg: "#FBEEEC", border: "#A34B45", text: "#8C3838", Icon: AlertCircle },
    success: { bg: "#EDF5EE", border: "#3D6A5C", text: "#245A42", Icon: CheckCircle2 },
    locked: { bg: "#F3F1ED", border: "#8C969B", text: "#59676E", Icon: Lock },
  }[type];
  const { bg, border, text, Icon } = cfg;
  return (
    <div className="flex gap-3 rounded-[10px] border-l-4 px-4 py-3.5 text-[13px] leading-6 shadow-[0_1px_2px_rgba(10,23,33,0.05)]" style={{ backgroundColor: bg, borderColor: border, color: text }}>
      <div className="mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-white/70"><Icon size={16} /></div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function Btn({ variant = "primary", size = "md", children, onClick, disabled, className = "" }: {
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "success";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  const base = "cb-btn inline-flex items-center justify-center gap-2 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8793A]/45 focus-visible:ring-offset-2";
  const sizes = { sm: "min-h-8 px-3 py-1.5 text-[12px]", md: "min-h-10 px-4 py-2.5 text-[13px]", lg: "min-h-12 px-5 py-3 text-[14px]" };
  const variants = {
    primary: "bg-[#0A1721] text-white shadow-[0_1px_2px_rgba(10,23,33,0.18)] hover:bg-[#805A28] active:bg-[#6B491F]",
    secondary: "border border-[#CFC6B9] bg-white text-[#0A1721] hover:border-[#A8793A] hover:bg-[#FBF8F2] active:bg-[#F2E7D5]",
    ghost: "text-[#0A1721] hover:bg-[#F2E7D5] active:bg-[#E8D7BC]",
    destructive: "border border-[#E7B9B2] bg-[#F7E7E4] text-[#8C3838] hover:bg-[#F1D7D2] active:bg-[#EBC7C0]",
    success: "bg-[#2F6A4F] text-white shadow-[0_1px_2px_rgba(10,23,33,0.16)] hover:bg-[#805A28] active:bg-[#6B491F]",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${disabled ? "cursor-not-allowed shadow-none opacity-45 grayscale-[15%]" : "cursor-pointer"} ${className}`}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`cb-card bg-white border ${className}`}>{children}</div>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-5 text-[18px] font-semibold leading-tight text-[#20313A]">{children}</h2>;
}

function FieldLabel({ children, required, htmlFor }: { children: React.ReactNode; required?: boolean; htmlFor?: string }) {
  const content = <>{children}{required && <span className="ml-0.5 text-[#A34B45]">*</span>}</>;
  const className = "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4F5F67]";
  return htmlFor ? <label htmlFor={htmlFor} className={className}>{content}</label> : <div className={className}>{content}</div>;
}

function Input({ value, placeholder, type = "text", readOnly, id, ariaLabel }: { value: string; placeholder?: string; type?: string; readOnly?: boolean; id?: string; ariaLabel?: string }) {
  return (
    <input
      id={id}
      aria-label={ariaLabel}
      type={type}
      defaultValue={value}
      placeholder={placeholder}
      readOnly={readOnly}
      className="cb-field w-full border border-[#CFC6B9] bg-white px-3.5 py-2.5 text-[14px] text-[#20313A] placeholder:text-[#9AA4A9] focus:outline-none"
    />
  );
}

function Select({ value, options, id, ariaLabel }: { value: string; options: string[]; id?: string; ariaLabel?: string }) {
  return (
    <select id={id} aria-label={ariaLabel} defaultValue={value} className="cb-field w-full border border-[#CFC6B9] bg-white px-3.5 py-2.5 text-[14px] text-[#20313A] focus:outline-none">
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );
}

function Textarea({ value, rows = 3, id, ariaLabel }: { value: string; rows?: number; id?: string; ariaLabel?: string }) {
  return (
    <textarea
      id={id}
      aria-label={ariaLabel}
      defaultValue={value}
      rows={rows}
      className="cb-field w-full resize-none border border-[#CFC6B9] bg-white px-3.5 py-2.5 text-[14px] text-[#20313A] focus:outline-none"
    />
  );
}

function StepIndicator({ step, status }: { step: number; status: "completed" | "active" | "pending" | "locked" }) {
  if (status === "completed") return <div className="grid h-7 w-7 rounded-full bg-[#2F6A4F] place-items-center shadow-[0_1px_2px_rgba(10,23,33,0.12)]"><Check size={12} className="text-white" /></div>;
  if (status === "active") return <div className="grid h-8 w-8 rounded-full border-2 border-[#A8793A] bg-[#F6F1E8] place-items-center text-[11px] font-bold text-[#805A28] shadow-[0_0_0_4px_rgba(168,121,58,0.11)]">{step}</div>;
  if (status === "pending") return <div className="grid h-7 w-7 rounded-full border-2 border-[#C8A56D] bg-[#F7F1E7] place-items-center text-[11px] font-bold text-[#805A28]">{step}</div>;
  return <div className="grid h-6 w-6 rounded-full border border-[#D7D0C4] bg-[#F3F1ED] place-items-center text-[10px] text-[#9AA4A9]">{step}</div>;
}

function RolePill({ role, color, label }: { role: string; color: string; label: string }) {
  const colors: Record<string, string> = {
    seller: "bg-[#E7F1E9] text-[#245A42] border border-[#B8D1BF]",
    buyer: "bg-[#F7F1E7] text-[#805A28] border border-[#D9C09A]",
    staff: "bg-[#F2E7D5] text-[#805A28] border border-[#D9C09A]",
  };
  return <span className={`rounded-[999px] px-2.5 py-1 text-[11px] font-semibold ${colors[role]}`}>{label}</span>;
}

function Avatar({ initials, role = "staff", size = "md", className = "" }: { initials: string; role?: Role; size?: "sm" | "md" | "lg"; className?: string }) {
  const roleStyles: Record<Role, string> = {
    seller: "bg-[#2F6A4F] text-white",
    buyer: "bg-[#A8793A] text-white",
    staff: "bg-[#0A1721] text-white",
  };
  const sizes = { sm: "h-7 w-7 text-[10px]", md: "h-9 w-9 text-[12px]", lg: "h-11 w-11 text-[14px]" };
  return <div className={`cb-avatar grid flex-shrink-0 place-items-center font-semibold ${roleStyles[role]} ${sizes[size]} ${className}`}>{initials}</div>;
}

// ─── Contact Card ──────────────────────────────────────────────────────────────
function ContactCard() {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-3">
        <Avatar initials="MC" role="staff" size="lg" />
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-semibold text-[#20313A]">Maya Chen</div>
          <div className="mt-0.5 text-[12px] text-[#65737A]">Deal Lead — CPA Bridge</div>
          <div className="mt-2 text-[12px] leading-5 text-[#4F5F67]">12 years supporting accounting-practice transactions, financial review, and owner transitions.</div>
        </div>
      </div>
      <div className="mt-5 space-y-2.5 border-t border-[#E3DDD3] pt-4 text-[12px] text-[#65737A]">
        <div className="flex items-center gap-2.5"><Mail size={12} className="text-[#A8793A]" /><span>dealteam@cpabridge.com</span></div>
        <div className="flex items-center gap-2.5"><Phone size={12} className="text-[#A8793A]" /><span>(206) 555-0142</span></div>
        <div className="flex items-center gap-2.5"><Clock size={12} className="text-[#A8793A]" /><span>Typical response within one business day</span></div>
      </div>
    </Card>
  );
}

function WelcomeBanner({ role, onDismiss }: { role: "seller" | "buyer"; onDismiss: () => void }) {
  const seller = role === "seller";
  return (
    <div className="relative overflow-hidden rounded-[10px] border border-[#D8C09A] bg-[#FBF6EC] px-6 py-5 shadow-[0_1px_3px_rgba(10,23,33,0.06)]">
      <div className="absolute inset-y-0 left-0 w-1.5 bg-[#A8793A]" />
      <button onClick={onDismiss} className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-full text-[#65737A] transition-colors hover:bg-white hover:text-[#20313A]" aria-label="Dismiss welcome message"><X size={14} /></button>
      <div className="pr-10">
        <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#805A28]">Welcome to your {seller ? "sale" : "acquisition"} workspace</div>
        <h2 className="cb-display mt-2 text-[22px] font-semibold leading-tight text-[#0A1721]">A clear view of what needs your attention—and what CPA Bridge is handling for you.</h2>
        <p className="mt-2 max-w-[820px] text-[13px] leading-6 text-[#51646D]">Use <strong>Your next action</strong> as your starting point. Your assigned deal lead will coordinate each review, explain upcoming decisions, and help you prepare before a deadline becomes urgent. Messages and Help & Contact are always available in the sidebar.</p>
      </div>
    </div>
  );
}

function UpcomingCard({ role }: { role: "seller" | "buyer" }) {
  const items = role === "seller" ? [
    [Phone, "Readiness call", "Thursday · 2:00 PM"],
    [FileText, "Corrected tax return due", "Friday · 5:00 PM"],
    [ClipboardList, "Listing review checkpoint", "Monday · 10:30 AM"],
  ] : [
    [Phone, "Buyer criteria call", "Wednesday · 11:00 AM"],
    [FileCheck, "Funding review checkpoint", "Thursday · 4:00 PM"],
    [Search, "New-listing review", "Monday · 9:00 AM"],
  ];
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between"><div className="text-[14px] font-semibold text-[#20313A]">Upcoming</div><CalendarDays size={16} className="text-[#A8793A]" /></div>
      <div className="space-y-0">
        {items.map(([Icon, title, when], i) => {
          const I = Icon as any;
          return <div key={String(title)} className={`flex gap-3 py-3 ${i ? "border-t border-[#EEE8DF]" : ""}`}><div className="grid h-8 w-8 place-items-center rounded-full bg-[#F2E7D5]"><I size={14} className="text-[#805A28]" /></div><div><div className="text-[13px] font-medium text-[#20313A]">{String(title)}</div><div className="mt-0.5 text-[12px] text-[#65737A]">{String(when)}</div></div></div>;
        })}
      </div>
    </Card>
  );
}

function SellerDocumentChecklist({ go }: { go: (k: string) => void }) {
  const docs = [
    ["Business tax returns", "Last three completed years"],
    ["Profit-and-loss statements", "Monthly or annual detail"],
    ["Client concentration summary", "Anonymized revenue by client band"],
    ["Staffing and organization", "Roles, tenure, compensation, responsibilities"],
    ["Lease and facilities", "Current lease, renewal dates, material obligations"],
    ["Systems and software", "Tax, accounting, workflow, CRM, and security tools"],
  ];
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div><div className="text-[14px] font-semibold text-[#20313A]">What you’ll need</div><p className="mt-1 text-[12px] leading-5 text-[#65737A]">Prepare these materials early to reduce surprises during readiness review and diligence.</p></div>
        <Btn variant="secondary" size="sm" onClick={() => go("documents")}>Open documents</Btn>
      </div>
      <div className="mt-4 grid gap-x-5 gap-y-3 md:grid-cols-2">
        {docs.map(([title, note]) => <div key={title} className="flex gap-2.5"><CheckSquare size={15} className="mt-0.5 flex-shrink-0 text-[#A8793A]" /><div><div className="text-[12px] font-medium text-[#20313A]">{title}</div><div className="mt-0.5 text-[11px] leading-4 text-[#65737A]">{note}</div></div></div>)}
      </div>
    </Card>
  );
}

function DealProgressStepper({ title, steps }: { title: string; steps: { label: string; done: boolean; current?: boolean }[] }) {
  const currentIndex = Math.max(0, steps.findIndex(step => step.current));
  const fallbackIndex = Math.min(steps.length - 1, steps.filter(step => step.done).length);
  const activeIndex = steps.some(step => step.current) ? currentIndex : fallbackIndex;
  return (
    <Card className="p-6">
      <div className="flex items-end justify-between gap-4"><div><div className="text-[14px] font-semibold text-[#20313A]">{title}</div><div className="mt-1 text-[12px] text-[#65737A]">Scan the current stage, then expand the full sequence when you need more detail.</div></div><div className="rounded-full bg-[#F2E7D5] px-3 py-1 text-[11px] font-semibold text-[#805A28]">{Math.min(activeIndex + 1, steps.length)} of {steps.length}</div></div>
      <div className="mt-7 overflow-x-auto pb-2">
        <div className="relative flex min-w-[620px] items-start justify-between px-1">
          <div className="absolute left-4 right-4 top-[14px] h-[2px] bg-[#DED8CE]" />
          <div className="absolute left-4 top-[14px] h-[2px] bg-[#A8793A] transition-all duration-300" style={{ width: `${Math.max(0, Math.min(100, (activeIndex / Math.max(1, steps.length - 1)) * 100))}%` }} />
          {steps.map((step, i) => {
            const status = step.done ? "completed" : step.current ? "active" : i === activeIndex + 1 ? "pending" : "locked";
            return <div key={step.label} className="relative z-10 flex w-[72px] flex-col items-center text-center"><StepIndicator step={i + 1} status={status as any} />{(step.current || i === 0 || i === steps.length - 1) && <div className={`mt-2 text-[10px] leading-4 ${step.current ? "font-semibold text-[#805A28]" : "text-[#65737A]"}`}>{step.label}</div>}</div>;
          })}
        </div>
      </div>
      <details className="mt-4 border-t border-[#E5DED3] pt-4">
        <summary className="cursor-pointer text-[12px] font-semibold text-[#0A1721] marker:text-[#A8793A]">View all steps</summary>
        <div className="mt-3 grid gap-x-6 md:grid-cols-2">{steps.map(step => <DealStatusRow key={step.label} {...step} />)}</div>
      </details>
    </Card>
  );
}

// ─── Screen: Step 1 — Seller Interest Form ────────────────────────────────────
function ScreenSellerInterest({ onAdvance }: { onAdvance: () => void }) {
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="mb-6">
        <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">Submit Your Interest</h1>
        <p className="text-[13px] text-[#65737A] mt-1">Tell us about your practice. A CPA Bridge deal lead will call you within one business day.</p>
      </div>
      <div className="grid grid-cols-[1fr_320px] gap-6">
        <Card className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div><FieldLabel required htmlFor="field-001">Your name</FieldLabel><Input value="Elena Martinez"  id="field-001" /></div>
            <div><FieldLabel required htmlFor="field-002">Email</FieldLabel><Input value="elena@martineztax.com" type="email"  id="field-002" /></div>
            <div><FieldLabel required htmlFor="field-003">Phone</FieldLabel><Input value="(206) 555-0187" type="tel"  id="field-003" /></div>
            <div><FieldLabel required htmlFor="field-004">Firm location (city, state)</FieldLabel><Input value="Seattle, WA"  id="field-004" /></div>
            <div><FieldLabel htmlFor="field-005">Approximate annual revenue</FieldLabel>
              <Select value="$1M–$2M" options={["Under $500K", "$500K–$1M", "$1M–$2M", "$2M–$5M", "Over $5M"]}  id="field-005" />
            </div>
            <div><FieldLabel htmlFor="field-006">Main services</FieldLabel>
              <Select value="Tax, bookkeeping, advisory" options={["Tax only", "Tax and bookkeeping", "Tax, bookkeeping, advisory", "Audit and accounting", "Other"]}  id="field-006" />
            </div>
            <div><FieldLabel htmlFor="field-007">Intended timing</FieldLabel>
              <Select value="12–24 months" options={["As soon as possible", "6–12 months", "12–24 months", "2–3 years", "Exploring only"]}  id="field-007" />
            </div>
            <div><FieldLabel htmlFor="field-008">Primary reason for selling</FieldLabel>
              <Select value="Retirement" options={["Retirement", "Partial sale / partnership", "Health", "Career change", "Other"]}  id="field-008" />
            </div>
          </div>
          <div className="mb-5">
            <FieldLabel htmlFor="field-009">Additional context (optional)</FieldLabel>
            <Textarea value="I have run this firm for 22 years. I want to ensure my staff and clients are well cared for through the transition." rows={3}  id="field-009" />
          </div>
          <div className="flex items-center gap-3">
            <Btn onClick={onAdvance} size="lg">Submit Interest <ArrowRight size={15} /></Btn>
            <span className="text-[12px] text-[#65737A]">You will be contacted within one business day</span>
          </div>
        </Card>
        <div className="space-y-4">
          <Card className="p-6 border-l-4 border-l-[#0A1721]">
            <div className="font-semibold text-[13px] text-[#20313A] mb-2">What happens next</div>
            <ol className="space-y-2 text-[12px] text-[#65737A]">
              {["Your assigned CPA Bridge deal lead contacts you within one business day.", "A first call is scheduled to discuss your goals, ownership, and timing.", "If it is a good fit, CPA Bridge will invite you to complete firm information.", "Everything is confidential until you approve a listing."].map((s, i) => (
                <li key={i} className="flex gap-2"><span className="w-4 h-4 rounded-full bg-[#E7F2EF] text-[#0A1721] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>{s}</li>
              ))}
            </ol>
          </Card>
          <Card className="p-6 bg-[#E7F2EF]">
            <div className="flex items-center gap-2 mb-2"><Shield size={14} className="text-[#0A1721]" /><span className="font-semibold text-[13px] text-[#0A1721]">Confidentiality</span></div>
            <p className="text-[12px] text-[#65737A]">This form is confidential. Your name, firm name, and location are never shared with buyers without your explicit approval at each stage.</p>
          </Card>
          <ContactCard />
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Step 2 — Business Information ────────────────────────────────────
function ScreenBusinessInfo({ onAdvance }: { onAdvance: () => void }) {
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">Business Information</h1>
          <p className="text-[13px] text-[#65737A] mt-1">Martinez Tax & Advisory LLC — CT-1042 in preparation</p>
        </div>
        <div className="flex gap-2">
          <Btn variant="secondary">Save Draft</Btn>
          <Btn onClick={onAdvance}>Save & Continue <ArrowRight size={14} /></Btn>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_280px] gap-6">
        <div className="space-y-5">
          <Card className="p-6">
            <div className="text-[16px] font-semibold text-[#20313A] mb-5 pb-3 border-b border-[#D7D0C4]">Legal Entity & Ownership</div>
            <div className="grid grid-cols-2 gap-4">
              <div><FieldLabel required htmlFor="field-010">Legal firm name</FieldLabel><Input value="Martinez Tax & Advisory LLC"  id="field-010" /></div>
              <div><FieldLabel required htmlFor="field-011">Entity type</FieldLabel><Select value="LLC" options={["LLC", "S-Corp", "C-Corp", "Partnership", "Sole Proprietor"]}  id="field-011" /></div>
              <div><FieldLabel required htmlFor="field-012">Primary owner</FieldLabel><Input value="Elena Martinez — 100%"  id="field-012" /></div>
              <div><FieldLabel htmlFor="field-013">Authority to sell</FieldLabel><Select value="Single owner — full authority" options={["Single owner — full authority", "Multiple owners — all required", "Board approval required", "Other"]}  id="field-013" /></div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-[16px] font-semibold text-[#20313A] mb-5 pb-3 border-b border-[#D7D0C4]">Operations</div>
            <div className="grid grid-cols-2 gap-4">
              <div><FieldLabel htmlFor="field-014">Annual revenue (2024)</FieldLabel><Input value="$1,320,000"  id="field-014" /></div>
              <div><FieldLabel htmlFor="field-015">Full-time employees</FieldLabel><Input value="9"  id="field-015" /></div>
              <div><FieldLabel htmlFor="field-016">Seasonal employees</FieldLabel><Input value="2"  id="field-016" /></div>
              <div><FieldLabel htmlFor="field-017">Primary office location</FieldLabel><Input value="Seattle, WA 98101"  id="field-017" /></div>
              <div><FieldLabel htmlFor="field-018">Primary services</FieldLabel><Select value="Tax, bookkeeping, advisory" options={["Tax only", "Tax and bookkeeping", "Tax, bookkeeping, advisory"]}  id="field-018" /></div>
              <div><FieldLabel htmlFor="field-019">Software / systems</FieldLabel><Input value="QuickBooks, Lacerte, Practice CS"  id="field-019" /></div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-[16px] font-semibold text-[#20313A] mb-5 pb-3 border-b border-[#D7D0C4]">Owner Role & Transition</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2"><FieldLabel htmlFor="field-020">Owner's weekly role (hours)</FieldLabel><Input value="~45 hrs/week — client relationships, review, business development"  id="field-020" /></div>
              <div><FieldLabel htmlFor="field-021">Preferred transition period</FieldLabel><Select value="6–12 months" options={["3–6 months", "6–12 months", "12–24 months", "Flexible"]}  id="field-021" /></div>
              <div><FieldLabel htmlFor="field-022">Confidentiality concerns</FieldLabel><Select value="Protect staff and client relationships" options={["Protect staff and client relationships", "Protect client list", "Protect employee identities", "Minimal concerns"]}  id="field-022" /></div>
            </div>
            <div className="mt-4"><FieldLabel htmlFor="field-023">Additional context</FieldLabel><Textarea value="22 years in practice. Strong recurring client base — about 60% individual tax and 40% small business accounting. Key relationships are with long-term clients who I have personally managed." rows={3}  id="field-023" /></div>
          </Card>
        </div>
        <div className="space-y-4">
          <Card className="p-6 bg-[#E7F2EF]">
            <div className="text-[12px] font-semibold text-[#0A1721] mb-2">Completion</div>
            <div className="space-y-1.5">
              {[["Legal entity", true], ["Ownership", true], ["Revenue", true], ["Employees", true], ["Services", true], ["Licenses", false], ["Systems", true], ["Owner role", true], ["Transition preferences", true]].map(([label, done]) => (
                <div key={String(label)} className="flex items-center gap-2 text-[12px]">
                  {done ? <Check size={12} className="text-[#1A6B28]" /> : <Circle size={12} className="text-[#D7D0C4]" />}
                  <span className={done ? "text-[#20313A]" : "text-[#65737A]"}>{String(label)}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-[12px] font-semibold text-[#20313A] mb-2">CPA Bridge note</div>
            <p className="text-[12px] text-[#65737A]">Please add your professional licenses before submitting. CPA Bridge will request clarification on owner adjustments during the financial review.</p>
          </Card>
          <ContactCard />
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Step 3 — File Upload ─────────────────────────────────────────────
function ScreenFileUpload({ onAdvance }: { onAdvance: () => void }) {
  const files = [
    { name: "2024 Profit & Loss Statement", folder: "Financial Statements", status: "accepted", date: "Jun 12, 2026" },
    { name: "2023 Profit & Loss Statement", folder: "Financial Statements", status: "accepted", date: "Jun 12, 2026" },
    { name: "2024 Business Tax Return", folder: "Financial Statements", status: "replacement", date: "Jun 15, 2026" },
    { name: "2023 Business Tax Return", folder: "Financial Statements", status: "accepted", date: "Jun 12, 2026" },
    { name: "2026 Year-to-Date Financials", folder: "Financial Statements", status: "reviewing", date: "Jun 20, 2026" },
    { name: "Service Revenue by Category", folder: "Revenue & Clients", status: "uploaded", date: "Jun 18, 2026" },
    { name: "Client Concentration Summary", folder: "Revenue & Clients", status: "missing", date: "—" },
    { name: "Employee Summary", folder: "Employees", status: "accepted", date: "Jun 12, 2026" },
    { name: "Key Contracts & Engagements", folder: "Contracts & Leases", status: "missing", date: "—" },
    { name: "Office Lease", folder: "Contracts & Leases", status: "uploaded", date: "Jun 19, 2026" },
    { name: "Ownership & Formation Documents", folder: "Ownership & Legal", status: "accepted", date: "Jun 12, 2026" },
  ];
  const statusMap: Record<string, string> = {
    accepted: "accepted", reviewing: "reviewing", uploaded: "uploaded",
    missing: "missing", replacement: "replacement",
  };
  const statusLabel: Record<string, string> = {
    accepted: "Accepted", reviewing: "Under Review", uploaded: "Uploaded",
    missing: "Missing", replacement: "Replacement Requested",
  };
  const counts = { accepted: files.filter(f => f.status === "accepted").length, total: files.length };
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">Required Files</h1>
          <p className="text-[13px] text-[#65737A] mt-1">{counts.accepted} of {counts.total} items accepted — 2 items still needed</p>
        </div>
        <Btn onClick={onAdvance}>Continue to Readiness <ArrowRight size={14} /></Btn>
      </div>
      <div className="grid grid-cols-[1fr_280px] gap-6">
        <Card>
          <div className="px-5 py-3 border-b border-[#D7D0C4] grid grid-cols-[2fr_1fr_120px_120px] gap-4 text-[11px] font-semibold text-[#805A28] uppercase tracking-[0.14em]">
            <span>Document</span><span>Folder</span><span>Status</span><span>Date</span>
          </div>
          {files.map((f, i) => (
            <div key={i} className="px-5 py-3 border-b border-[#EEE8DF] last:border-0 grid grid-cols-[2fr_1fr_120px_120px] gap-4 items-center hover:bg-[#FAFBFC] group">
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-[#65737A] flex-shrink-0" />
                <span className="text-[13px] text-[#20313A]">{f.name}</span>
              </div>
              <span className="text-[12px] text-[#65737A]">{f.folder}</span>
              <Badge variant={statusMap[f.status]}>{statusLabel[f.status]}</Badge>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#65737A]">{f.date}</span>
                {f.status === "missing" || f.status === "replacement" ? (
                  <button className="text-[11px] text-[#805A28] flex items-center gap-1 opacity-0 group-hover:opacity-100"><Upload size={11} />Upload</button>
                ) : null}
              </div>
            </div>
          ))}
          <div className="px-5 py-3 bg-[#FFF4CC] border-t border-[#E8CC7A] rounded-b-lg">
            <div className="flex items-center gap-2 text-[12px] text-[#92620A]">
              <AlertTriangle size={13} />
              <span><strong>2 items required:</strong> Client Concentration Summary and Key Contracts & Engagements. CPA Bridge cannot complete the financial review until these are uploaded.</span>
            </div>
          </div>
        </Card>
        <div className="space-y-4">
          <Card className="p-6">
            <div className="text-[12px] font-semibold text-[#20313A] mb-3">File status key</div>
            <div className="space-y-2">
              {[["accepted", "Accepted", "Reviewed and complete"], ["reviewing", "Under Review", "CPA Bridge is reviewing"], ["uploaded", "Uploaded", "Awaiting review"], ["replacement", "Replacement Requested", "Resubmit needed"], ["missing", "Missing", "Not yet uploaded"]].map(([v, l, d]) => (
                <div key={v} className="flex items-start gap-2">
                  <Badge variant={v} className="mt-0.5 flex-shrink-0">{l}</Badge>
                  <span className="text-[11px] text-[#65737A]">{d}</span>
                </div>
              ))}
            </div>
          </Card>
          <Alert type="warn">
            <strong>2024 Business Tax Return:</strong> CPA Bridge has requested a corrected version with owner compensation clearly itemized.
          </Alert>
          <Card className="p-6">
            <div className="text-[12px] font-semibold text-[#20313A] mb-2">Need help?</div>
            <p className="text-[12px] text-[#65737A] mb-3">Not sure what format is needed? Maya Chen can explain any item on this list.</p>
            <ContactCard />
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Step 4 — Staff Readiness Review ──────────────────────────────────
function ScreenReadinessReview({ onAdvance }: { onAdvance: () => void }) {
  const rows = [
    { area: "Financial records", status: "clear", note: "Three years of P&L accepted. Tax records consistent." },
    { area: "Revenue trend", status: "clear", note: "Stable 3-year trend with modest growth. No unexplained decline." },
    { area: "Profit quality", status: "needs-work", note: "Owner adjustment on 2024 auto expense unsupported. Seller to provide explanation." },
    { area: "Client concentration", status: "needs-work", note: "Top 5 clients represent 38% of revenue. Retention plan needed for listing." },
    { area: "Owner dependence", status: "major-concern", note: "Owner holds all senior client relationships. Transition plan is critical to buyer confidence." },
    { area: "Employee dependence", status: "clear", note: "Senior staff of 5 years average tenure. No single-person concentration risk." },
    { area: "Business processes", status: "needs-work", note: "Work intake and review processes are informal. Some documentation before listing recommended." },
    { area: "Legal & business records", status: "clear", note: "LLC formation, licenses, and lease all on file and current." },
    { area: "Price, timing & transition", status: "clear", note: "Seller expectations consistent with market. 6–12 month transition is marketable." },
    { area: "Buyer demand", status: "clear", note: "Pacific Northwest tax practices are in active demand. Plausible buyer pool identified." },
  ];
  const statusCfg: Record<string, { label: string; badge: string }> = {
    clear: { label: "Clear", badge: "clear" },
    "needs-work": { label: "Needs Work", badge: "needs-work" },
    "major-concern": { label: "Major Concern", badge: "major-concern" },
  };
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">Seller Readiness Review</h1>
          <p className="text-[13px] text-[#65737A] mt-1">CT-1042 — Martinez Tax & Advisory LLC — Internal staff view</p>
        </div>
        <div className="flex gap-2">
          <Btn variant="secondary">Request More Information</Btn>
          <Btn onClick={onAdvance}>Mark Readiness Complete <Check size={14} /></Btn>
        </div>
      </div>
      <Alert type="info" ><strong>Staff only.</strong> This readiness review is confidential to CPA Bridge and the seller. Buyers see only seller-approved disclosures.</Alert>
      <div className="mt-4 grid grid-cols-3 gap-3 mb-5">
        {[["Clear", "#1A6B28", "#E6F4DF", rows.filter(r => r.status === "clear").length], ["Needs Work", "#92620A", "#FFF4CC", rows.filter(r => r.status === "needs-work").length], ["Major Concern", "#991B1B", "#FBE1E1", rows.filter(r => r.status === "major-concern").length]].map(([l, c, bg, n]) => (
          <div key={String(l)} className="rounded-[10px] p-3 flex items-center gap-3" style={{ backgroundColor: String(bg) }}>
            <div className="text-[24px] font-bold" style={{ color: String(c) }}>{n}</div>
            <div className="text-[12px] font-semibold" style={{ color: String(c) }}>{String(l)}</div>
          </div>
        ))}
      </div>
      <Card>
        <div className="px-5 py-3 border-b border-[#D7D0C4] grid grid-cols-[200px_140px_1fr_200px] gap-4 text-[11px] font-semibold text-[#805A28] uppercase tracking-[0.14em]">
          <span>Area</span><span>Status</span><span>CPA Bridge notes</span><span>Action</span>
        </div>
        {rows.map((r, i) => (
          <div key={i} className="px-5 py-3 border-b border-[#EEE8DF] last:border-0 grid grid-cols-[200px_140px_1fr_200px] gap-4 items-start">
            <span className="text-[13px] font-medium text-[#20313A]">{r.area}</span>
            <div><Badge variant={r.badge}>{statusCfg[r.status].label}</Badge></div>
            <span className="text-[12px] text-[#65737A]">{r.note}</span>
            <div className="flex gap-1.5">
              <Select value={statusCfg[r.status].label} options={["Clear", "Needs Work", "Major Concern"]} id={`readiness-status-${i}`} ariaLabel={`Readiness status for ${r.area}`} />
            </div>
          </div>
        ))}
      </Card>
      <Card className="mt-5 p-6">
        <div className="text-[13px] font-semibold text-[#20313A] mb-3">Staff recommendation</div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FieldLabel htmlFor="field-024">Readiness decision</FieldLabel>
            <Select value="Ready to list with conditions" options={["Ready to list", "Ready to list with conditions", "Fix before listing", "Not a fit — stop"]}  id="field-024" />
          </div>
          <div>
            <FieldLabel htmlFor="field-025">Required before listing goes active</FieldLabel>
            <Input value="Owner transition plan; client concentration retention note"  id="field-025" />
          </div>
          <div className="col-span-2">
            <FieldLabel htmlFor="field-026">Staff notes to seller</FieldLabel>
            <Textarea value="The practice is strong overall. We recommend addressing the owner-dependence concern with a written transition plan before buyers see this listing. Buyers in this size range consistently ask about client retention during ownership transition." rows={3}  id="field-026" />
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Screen: Step 5 — Seller Listing Preview ──────────────────────────────────
function ScreenListingPreview({ onAdvance }: { onAdvance: () => void }) {
  const [view, setView] = useState<"anon" | "private">("anon");
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">Listing Preview — CT-1042</h1>
          <p className="text-[13px] text-[#65737A] mt-1">Review how your listing appears to different audiences before approving</p>
        </div>
        <div className="flex gap-2">
          <Btn variant="secondary">Request Edit</Btn>
          <Btn onClick={onAdvance} variant="success">Approve Listing <CheckCircle2 size={14} /></Btn>
        </div>
      </div>
      <Alert type="warn">
        <strong>Your approval is required.</strong> CPA Bridge will separately verify the listing before it becomes active. Your approval here confirms the content is accurate and you consent to the listing proceeding.
      </Alert>
      <div className="mt-4 flex gap-2 mb-4">
        <button onClick={() => setView("anon")} className={`px-4 py-2 text-[13px] font-medium rounded-[6px] border transition-all ${view === "anon" ? "bg-[#0A1721] text-white border-[#0A1721]" : "bg-white text-[#65737A] border-[#D7D0C4]"}`}>
          <EyeOff size={13} className="inline mr-1.5" />Anonymous view (what buyers see first)
        </button>
        <button onClick={() => setView("private")} className={`px-4 py-2 text-[13px] font-medium rounded-[6px] border transition-all ${view === "private" ? "bg-[#0A1721] text-white border-[#0A1721]" : "bg-white text-[#65737A] border-[#D7D0C4]"}`}>
          <Eye size={13} className="inline mr-1.5" />Private profile (seller-approved buyers only)
        </button>
      </div>
      {view === "anon" ? (
        <div className="grid grid-cols-[1fr_280px] gap-5">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="active">Opportunity CT-1042</Badge>
              <Badge variant="clear">Strong Buyer Demand</Badge>
            </div>
            <h2 className="text-[20px] font-semibold text-[#20313A] mt-2 mb-1">Pacific Northwest Tax and Bookkeeping Practice</h2>
            <p className="text-[13px] text-[#65737A] mb-4">Seattle metro area, Washington State</p>
            <div className="grid grid-cols-2 gap-4 mb-5">
              {[["Annual Revenue", "$1.2M – $1.4M"], ["Services", "Tax, bookkeeping, advisory"], ["Full-time staff", "9 employees"], ["Seasonal staff", "2 employees"], ["Transition", "6–12 months supported"], ["Established", "22+ years in operation"]].map(([l, v]) => (
                <div key={String(l)} className="bg-[#F6F1E8] rounded-[6px] p-3">
                  <div className="text-[11px] font-semibold text-[#805A28] uppercase tracking-[0.14em] mb-0.5">{l}</div>
                  <div className="text-[14px] font-semibold text-[#20313A]">{v}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-[#D7D0C4] pt-4">
              <div className="text-[13px] font-semibold text-[#20313A] mb-2">Practice overview</div>
              <p className="text-[13px] text-[#65737A] leading-relaxed">Established Pacific Northwest practice with a stable, recurring client base in individual tax and small business accounting. Strong team with multi-year staff tenure. Owner is supporting a full transition of 6 to 12 months. Practice uses modern software and documented workflows.</p>
            </div>
          </Card>
          <div className="space-y-4">
            <Card className="p-6 border-l-4 border-l-[#F0ABAB]">
              <div className="text-[12px] font-semibold text-[#991B1B] mb-2 flex items-center gap-1"><EyeOff size={12} />Hidden in anonymous view</div>
              <ul className="space-y-1 text-[12px] text-[#65737A]">
                {["Firm name", "Owner name", "Exact address", "Client names", "Employee personal information", "Any financial documents", "Tax returns"].map(i => <li key={i} className="flex items-center gap-1.5"><X size={10} className="text-[#991B1B]" />{i}</li>)}
              </ul>
            </Card>
            <Card className="p-6 border-l-4 border-l-[#1A6B28]">
              <div className="text-[12px] font-semibold text-[#1A6B28] mb-2 flex items-center gap-1"><Eye size={12} />Visible at this stage</div>
              <ul className="space-y-1 text-[12px] text-[#65737A]">
                {["Broad location (metro area)", "Revenue range", "Service mix", "Staff-size range", "General transition info"].map(i => <li key={i} className="flex items-center gap-1.5"><Check size={10} className="text-[#1A6B28]" />{i}</li>)}
              </ul>
            </Card>
          </div>
        </div>
      ) : (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4"><Lock size={14} className="text-[#805A28]" /><span className="text-[12px] text-[#805A28] font-semibold">Private profile — released only to seller-approved, CPA Bridge-reviewed buyers after NDA</span></div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <div className="text-[13px] font-semibold text-[#20313A] mb-3">Full firm details</div>
              <div className="space-y-2 text-[13px]">
                {[["Firm name", "Martinez Tax & Advisory LLC"], ["Owner", "Elena Martinez"], ["Address", "1420 Fifth Avenue, Suite 600, Seattle WA 98101"], ["Established", "2003"], ["Revenue (2024)", "$1,320,000"], ["Revenue (2023)", "$1,264,000"], ["Revenue (2022)", "$1,218,000"], ["EBITDA adj.", "$412,000 (normalized)"], ["Staff", "9 FT / 2 seasonal"]].map(([l, v]) => (
                  <div key={String(l)} className="flex gap-3 border-b border-[#EEE8DF] pb-1.5">
                    <span className="text-[#65737A] w-36 flex-shrink-0">{l}</span>
                    <span className="text-[#20313A] font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[13px] font-semibold text-[#20313A] mb-3">Revenue by service</div>
              <div className="space-y-2">
                {[["Individual tax returns", "45%"], ["Small business accounting", "32%"], ["Business tax returns", "14%"], ["Advisory & consulting", "9%"]].map(([l, p]) => (
                  <div key={String(l)}>
                    <div className="flex justify-between text-[12px] mb-0.5"><span className="text-[#65737A]">{l}</span><span className="font-medium text-[#20313A]">{p}</span></div>
                    <div className="h-1.5 bg-[#E7F2EF] rounded-full"><div className="h-full bg-[#A8793A] rounded-full" style={{ width: p as string }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── Screen: Step 6 — Staff Listing Approval ──────────────────────────────────
function ScreenStaffListingApproval({ onAdvance }: { onAdvance: () => void }) {
  const checks = [
    { label: "Seller interest submitted and confirmed", done: true },
    { label: "Business information complete and reviewed", done: true },
    { label: "Required files uploaded and accepted", done: true },
    { label: "Financial records reviewed", done: true },
    { label: "Readiness review completed", done: true },
    { label: "Seller has approved the listing language", done: true },
    { label: "Anonymous version contains no identifying information", done: true },
    { label: "Document access package defined", done: true },
    { label: "CPA Bridge deal lead assigned", done: true },
    { label: "Access rules confirmed", done: true },
  ];
  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">CPA Bridge Listing Approval</h1>
          <p className="text-[13px] text-[#65737A] mt-1">CT-1042 — Final check before the listing goes active</p>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_280px] gap-5">
        <div className="space-y-4">
          <Card className="p-6">
            <div className="text-[13px] font-semibold text-[#20313A] mb-4">Pre-activation checklist</div>
            <div className="space-y-2.5">
              {checks.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${c.done ? "bg-[#1A6B28]" : "border-2 border-[#D7D0C4]"}`}>
                    {c.done && <Check size={11} className="text-white" />}
                  </div>
                  <span className={`text-[13px] ${c.done ? "text-[#20313A]" : "text-[#65737A]"}`}>{c.label}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6 bg-[#E6F4DF] border-[#B7DCA8]">
            <div className="flex items-center gap-2 text-[#1A6B28] font-semibold text-[13px] mb-2"><CheckCircle2 size={15} />All requirements met</div>
            <p className="text-[12px] text-[#1A6B28]">CT-1042 is ready to activate. Once approved, the anonymous listing will be visible to approved buyers and included in match recommendations.</p>
          </Card>
          <div className="flex gap-3">
            <Btn onClick={onAdvance} variant="success" size="lg"><CheckCircle2 size={15} />Approve Listing — CT-1042</Btn>
            <Btn variant="secondary">Hold for Additional Review</Btn>
          </div>
        </div>
        <div className="space-y-4">
          <Card className="p-6">
            <div className="text-[12px] font-semibold text-[#20313A] mb-2">Listing summary</div>
            <div className="space-y-2 text-[12px]">
              {[["ID", "CT-1042"], ["Title", "Pacific NW Tax & Bookkeeping Practice"], ["Location", "Seattle metro, WA"], ["Revenue range", "$1.2M–$1.4M"], ["Stage", "Pending approval"], ["Deal lead", "Maya Chen"]].map(([l, v]) => (
                <div key={String(l)} className="flex justify-between border-b border-[#EEE8DF] pb-1.5">
                  <span className="text-[#65737A]">{l}</span>
                  <span className="text-[#20313A] font-medium">{v}</span>
                </div>
              ))}
            </div>
          </Card>
          <Alert type="warn">Once approved, this listing will be visible in the buyer marketplace. To pause or remove a listing, use the listing management controls.</Alert>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Step 7 — Buyer Signup ────────────────────────────────────────────
function ScreenBuyerSignup({ onAdvance }: { onAdvance: () => void }) {
  return (
    <div className="max-w-[900px] mx-auto">
      <div className="grid grid-cols-[1fr_320px] gap-8 items-start">
        <div>
          <div className="mb-6">
            <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">Create a Buyer Account</h1>
            <p className="text-[13px] text-[#65737A] mt-1">CPA Bridge reviews all buyer accounts before marketplace access is granted.</p>
          </div>
          <Card className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div><FieldLabel required htmlFor="field-027">First name</FieldLabel><Input value="Marcus"  id="field-027" /></div>
              <div><FieldLabel required htmlFor="field-028">Last name</FieldLabel><Input value="Lee"  id="field-028" /></div>
              <div><FieldLabel required htmlFor="field-029">Work email</FieldLabel><Input value="marcus.lee@evergreenap.com" type="email"  id="field-029" /></div>
              <div><FieldLabel required htmlFor="field-030">Phone</FieldLabel><Input value="(503) 555-0231"  id="field-030" /></div>
              <div><FieldLabel required htmlFor="field-031">Buyer type</FieldLabel>
                <Select value="Strategic acquirer / existing firm" options={["Strategic acquirer / existing firm", "Individual buyer", "Search fund", "Private equity", "Family office"]}  id="field-031" />
              </div>
              <div><FieldLabel required htmlFor="field-032">Organization</FieldLabel><Input value="Evergreen Accounting Partners"  id="field-032" /></div>
              <div><FieldLabel htmlFor="field-033">Your role</FieldLabel><Input value="Head of Acquisitions"  id="field-033" /></div>
              <div><FieldLabel htmlFor="field-034">Website</FieldLabel><Input value="evergreenap.com"  id="field-034" /></div>
              <div><FieldLabel required htmlFor="field-035">Password</FieldLabel><Input value="••••••••••" type="password"  id="field-035" /></div>
              <div><FieldLabel required htmlFor="field-036">Confirm password</FieldLabel><Input value="••••••••••" type="password"  id="field-036" /></div>
            </div>
            <Btn onClick={onAdvance} size="lg" className="w-full justify-center">Create Buyer Account <ArrowRight size={14} /></Btn>
          </Card>
        </div>
        <div className="space-y-4 pt-16">
          <Card className="p-6 border-l-4 border-l-[#0A1721]">
            <div className="font-semibold text-[13px] text-[#20313A] mb-2">Account review process</div>
            <ol className="space-y-2 text-[12px] text-[#65737A]">
              {["Create your basic account here.", "Complete your purchase profile (criteria, funding, experience).", "CPA Bridge reviews your profile — typically within 2 business days.", "Once approved, you can view anonymous listings and request access."].map((s, i) => (
                <li key={i} className="flex gap-2"><span className="w-4 h-4 rounded-full bg-[#E7F2EF] text-[#0A1721] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>{s}</li>
              ))}
            </ol>
          </Card>
          <Alert type="info">Buyer accounts are reviewed manually by CPA Bridge. Approval is required before you can view listings or request access to any opportunity.</Alert>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Step 8 — Buyer Purchase Profile ──────────────────────────────────
function ScreenBuyerProfile({ onAdvance }: { onAdvance: () => void }) {
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">Purchase Profile</h1>
          <p className="text-[13px] text-[#65737A] mt-1">Marcus Lee — Evergreen Accounting Partners</p>
        </div>
        <div className="flex gap-2">
          <Btn variant="secondary">Save Draft</Btn>
          <Btn onClick={onAdvance}>Submit for Review <ArrowRight size={14} /></Btn>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <Card className="p-6 col-span-2">
          <div className="text-[16px] font-semibold text-[#20313A] mb-5 pb-3 border-b border-[#D7D0C4]">Acquisition Criteria</div>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div><FieldLabel htmlFor="field-037">Target location</FieldLabel><Select value="Washington and Oregon" options={["Washington and Oregon", "Pacific Northwest", "West Coast", "National"]}  id="field-037" /></div>
            <div><FieldLabel htmlFor="field-038">Target revenue range</FieldLabel><Input value="$1M – $5M"  id="field-038" /></div>
            <div><FieldLabel htmlFor="field-039">Target services</FieldLabel><Select value="Tax, accounting, bookkeeping" options={["Tax only", "Tax and accounting", "Tax, accounting, bookkeeping", "Any"]}  id="field-039" /></div>
            <div><FieldLabel htmlFor="field-040">Timing</FieldLabel><Select value="Actively seeking — ready within 6 months" options={["Actively seeking — ready within 6 months", "12 months", "18–24 months", "Flexible"]}  id="field-040" /></div>
            <div><FieldLabel htmlFor="field-041">Transition preference</FieldLabel><Select value="Will support 6–12 month seller transition" options={["Will support 6–12 month seller transition", "Prefer 3–6 months", "Extended transition OK", "Flexible"]}  id="field-041" /></div>
            <div><FieldLabel htmlFor="field-042">Ownership structure</FieldLabel><Select value="Full acquisition" options={["Full acquisition", "Majority acquisition", "Partial / partnership", "Flexible"]}  id="field-042" /></div>
          </div>
          <div className="text-[16px] font-semibold text-[#20313A] mb-5 pb-3 border-b border-[#D7D0C4]">Funding & Financing</div>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div><FieldLabel htmlFor="field-043">Financing approach</FieldLabel><Select value="Cash and bank debt" options={["Cash only", "Cash and bank debt", "SBA loan", "Seller financing preferred", "Flexible"]}  id="field-043" /></div>
            <div><FieldLabel htmlFor="field-044">Available equity (reviewed amount)</FieldLabel><Input value="$3,000,000"  id="field-044" /></div>
            <div><FieldLabel htmlFor="field-045">Lender pre-approval status</FieldLabel><Select value="Active lender relationship — pre-qualified" options={["Active lender relationship — pre-qualified", "Exploring options", "No lender yet"]}  id="field-045" /></div>
            <div><FieldLabel>Proof of funds (uploaded)</FieldLabel><div className="border border-[#D7D0C4] rounded-[6px] px-3 py-2 text-[12px] text-[#1A6B28] flex items-center gap-2 bg-[#E6F4DF]"><FileCheck size={13} />Bank letter uploaded — restricted to CPA Bridge staff</div></div>
          </div>
          <div className="text-[16px] font-semibold text-[#20313A] mb-5 pb-3 border-b border-[#D7D0C4]">Experience</div>
          <div className="grid grid-cols-2 gap-4">
            <div><FieldLabel htmlFor="field-046">Prior accounting practice acquisitions</FieldLabel><Input value="3 completed acquisitions"  id="field-046" /></div>
            <div><FieldLabel htmlFor="field-047">Accounting / tax operations experience</FieldLabel><Select value="10+ years managing practices" options={["10+ years managing practices", "5–10 years", "Under 5 years", "None"]}  id="field-047" /></div>
            <div className="col-span-2"><FieldLabel htmlFor="field-048">Brief background</FieldLabel><Textarea value="Evergreen Accounting Partners is a regional accounting firm founded in 2011. We have completed three practice acquisitions in Washington and Oregon. We maintain staff from acquired practices and support full seller transitions." rows={3}  id="field-048" /></div>
          </div>
        </Card>
        <div className="space-y-4">
          <Card className="p-6 bg-[#E7F2EF]">
            <div className="text-[12px] font-semibold text-[#0A1721] mb-2">What CPA Bridge reviews</div>
            <ul className="space-y-1.5 text-[12px] text-[#65737A]">
              {["Identity and organization", "Purchase criteria fit", "Funding documentation (restricted)", "Prior acquisitions and experience", "Conflict check", "Responsiveness and intent"].map(i => <li key={i} className="flex gap-2"><Check size={11} className="text-[#805A28] mt-0.5" />{i}</li>)}
            </ul>
          </Card>
          <Alert type="info">Proof-of-funds documents are visible only to assigned CPA Bridge staff. Sellers see only a reviewed funding status — never raw financial documents.</Alert>
          <Card className="p-6">
            <div className="text-[12px] font-semibold text-[#20313A] mb-1">Review timeline</div>
            <p className="text-[12px] text-[#65737A]">CPA Bridge reviews buyer profiles within 2 business days. You will be notified of your approval status by email.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Step 9 — Staff Buyer Approval ────────────────────────────────────
function ScreenStaffBuyerApproval({ onAdvance }: { onAdvance: () => void }) {
  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">Internal Buyer Review</h1>
          <p className="text-[13px] text-[#65737A] mt-1">Marcus Lee — Evergreen Accounting Partners</p>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_280px] gap-5">
        <div className="space-y-4">
          <Card className="p-6">
            <div className="text-[16px] font-semibold text-[#20313A] mb-5 pb-3 border-b border-[#D7D0C4]">Buyer Profile</div>
            <div className="grid grid-cols-2 gap-3 text-[12px]">
              {[["Name", "Marcus Lee"], ["Organization", "Evergreen Accounting Partners"], ["Buyer type", "Strategic acquirer"], ["Role", "Head of Acquisitions"], ["Location target", "Washington and Oregon"], ["Revenue target", "$1M–$5M"], ["Financing", "Cash and bank debt"], ["Available equity", "$3M reviewed"], ["Prior acquisitions", "3 completed"], ["Experience", "10+ years practice management"], ["Lender status", "Pre-qualified"], ["Proof of funds", "Bank letter on file"]].map(([l, v]) => (
                <div key={String(l)} className="border-b border-[#EEE8DF] pb-2">
                  <div className="text-[#65737A] mb-0.5">{l}</div>
                  <div className="font-medium text-[#20313A]">{v}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-[15px] font-semibold text-[#20313A] mb-4">Review checklist</div>
            <div className="space-y-2.5">
              {[["Identity confirmed", true, "LinkedIn and company website verified"], ["Organization verified", true, "Evergreen AP — registered WA business"], ["Funding reviewed", true, "Bank letter — $3M equity confirmed"], ["Experience reviewed", true, "3 prior acquisitions verified"], ["Conflict check", true, "No conflicts identified with current listings"], ["Acquisition criteria reviewed", true, "Pacific Northwest focus — consistent with active listings"]].map(([l, done, note]) => (
                <div key={String(l)} className="flex gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${done ? "bg-[#1A6B28]" : "border-2 border-[#D7D0C4]"}`}>
                    {done && <Check size={11} className="text-white" />}
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-[#20313A]">{String(l)}</div>
                    <div className="text-[11px] text-[#65737A]">{String(note)}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-[13px] font-semibold text-[#20313A] mb-3">Internal notes</div>
            <Textarea id="buyer-review-notes" ariaLabel="Buyer review notes" value="Evergreen AP is a credible strategic acquirer with a documented track record. Funding is confirmed. Pacific Northwest focus aligns well with CT-1042. No conflicts. Recommend approval." rows={3} />
          </Card>
          <div className="flex gap-2">
            <Btn onClick={onAdvance} variant="success"><UserCheck size={14} />Approve Buyer</Btn>
            <Btn variant="secondary">Ask for More Information</Btn>
            <Btn variant="secondary">Restrict</Btn>
            <Btn variant="destructive">Reject</Btn>
          </div>
        </div>
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Avatar initials="ML" role="buyer" size="lg" />
              <div>
                <div className="font-semibold text-[13px] text-[#20313A]">Marcus Lee</div>
                <div className="text-[11px] text-[#65737A]">Head of Acquisitions</div>
              </div>
            </div>
            <div className="text-[11px] text-[#65737A] flex items-center gap-1.5 mb-1"><Mail size={11} />marcus.lee@evergreenap.com</div>
            <div className="text-[11px] text-[#65737A] flex items-center gap-1.5">(503) 555-0231</div>
          </Card>
          <Alert type="info">Proof-of-funds documents are restricted. Only the funding status will be shared with sellers.</Alert>
          <Card className="p-6">
            <div className="text-[12px] font-semibold text-[#20313A] mb-2">Approval grants</div>
            <ul className="space-y-1 text-[12px] text-[#65737A]">
              {["View anonymous listings in marketplace", "Request access to specific listings", "Sign NDAs", "Appear in match recommendations"].map(i => <li key={i} className="flex gap-1.5"><Check size={11} className="text-[#1A6B28] mt-0.5" />{i}</li>)}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Step 10 — Marketplace ────────────────────────────────────────────
function ScreenMarketplace({ onAdvance }: { onAdvance: () => void }) {
  const [sort, setSort] = useState("Recommended Order");
  const listings = [
    { id: "CT-1042", rank: 1, title: "Pacific Northwest Tax & Bookkeeping Practice", location: "Seattle metro, WA", revenue: "$1.2M – $1.4M", services: "Tax, bookkeeping, advisory", staff: "9 FT / 2 seasonal", transition: "6–12 months", fit: "strong-fit", fitLabel: "Strong Fit", whyMatched: "Location match · revenue range overlaps · tax/bookkeeping alignment · transition compatible", whyRanked: "Ranked #1 because funding is reviewed, geography and services align, and timing matches your 6-month window.", concern: "" },
    { id: "CT-1038", rank: 2, title: "Oregon Coast Accounting Group", location: "Portland area, OR", revenue: "$800K – $1.1M", services: "Tax, payroll, accounting", staff: "6 FT", transition: "12 months", fit: "possible-fit", fitLabel: "Possible Fit", whyMatched: "Location within target · service overlap · deal size slightly below target", whyRanked: "Ranked #2 because revenue is below your target range and the longer transition reduces timing fit.", concern: "Revenue below your target range" },
    { id: "CT-1035", rank: 3, title: "Central Valley CPA Practice", location: "Inland Washington", revenue: "$2.1M – $2.6M", services: "Audit, tax, advisory", staff: "14 FT", transition: "3–6 months", fit: "weak-fit", fitLabel: "Weak Fit", whyMatched: "Deal size overlaps upper range, but audit focus differs from your service target", whyRanked: "Ranked lowest because service-line fit is weak and the short transition conflicts with your preference.", concern: "Audit-led practice; short transition" },
  ];
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">Opportunities Marketplace</h1>
          <p className="text-[13px] text-[#65737A] mt-1">3 active listings — Marcus Lee, Evergreen Accounting Partners</p>
        </div>
        <Badge variant="approved"><CheckCircle2 size={11} />Buyer Approved</Badge>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[12px] text-[#65737A]">Sort by</span>
        <select aria-label="Sort marketplace listings" value={sort} onChange={e => setSort(e.target.value)} className="cb-field border border-[#CFC6B9] bg-white px-3 py-2 text-[12px] text-[#20313A] focus:outline-none">
          {["Recommended Order", "Strongest Match", "Newest Listings", "Revenue", "Location", "Transition Timing"].map(o => <option key={o}>{o}</option>)}
        </select>
        {sort === "Recommended Order" && <span className="text-[11px] text-[#805A28] flex items-center gap-1"><Info size={11} />Order set by the ranking algorithm — separate from match strength</span>}
      </div>
      <Alert type="info">Listings are anonymous — firm identity, owner name, and documents are hidden. <strong>Rank</strong> (order) and <strong>Match Strength</strong> (compatibility) are two different signals: a Strong Fit can rank below another Strong Fit.</Alert>
      <div className="mt-4 space-y-4">
        {listings.map((l) => (
          <Card key={l.id} className="cb-card-interactive p-6">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center flex-shrink-0 pt-1">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#A8793A] text-[14px] font-bold text-white shadow-[0_1px_2px_rgba(10,23,33,0.15)]">#{l.rank}</div>
                <span className="text-[9px] text-[#65737A] uppercase tracking-wide mt-1">Rank</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="active">{l.id}</Badge>
                  <Badge variant={l.fit}>{l.fitLabel}</Badge>
                  {l.concern && <Badge variant="pending"><AlertTriangle size={10} />{l.concern}</Badge>}
                </div>
                <h3 className="text-[16px] font-semibold text-[#20313A] mb-1">{l.title}</h3>
                <div className="flex items-center gap-1.5 text-[12px] text-[#65737A] mb-3"><MapPin size={11} />{l.location}</div>
                <div className="grid grid-cols-4 gap-4 mb-3">
                  {[["Revenue", l.revenue], ["Services", l.services], ["Staff", l.staff], ["Transition", l.transition]].map(([k, v]) => (
                    <div key={String(k)}>
                      <div className="text-[12px] font-medium text-[#65737A] mb-0.5">{k}</div>
                      <div className="text-[12px] font-medium text-[#20313A]">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[6px] border border-[#C9DDD8] bg-[#EDF4F2] p-3"><div className="text-[10px] font-semibold text-[#0A1721] uppercase tracking-wide mb-0.5">Why Matched</div><div className="text-[11px] text-[#65737A]">{l.whyMatched}</div></div>
                  <div className="rounded-[6px] border border-[#DED5C7] bg-[#FBF8F2] p-3"><div className="text-[10px] font-semibold text-[#0A1721] uppercase tracking-wide mb-0.5">Why Ranked Here</div><div className="text-[11px] text-[#65737A]">{l.whyRanked}</div></div>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <Btn onClick={l.id === "CT-1042" ? onAdvance : undefined} size="sm">View Anonymous Listing <ChevronRight size={13} /></Btn>
                <Btn variant="secondary" size="sm">Save</Btn>
                <Btn variant="ghost" size="sm">Decline</Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Screen: Step 11 — Access Request ─────────────────────────────────────────
function ScreenAccessRequest({ onAdvance }: { onAdvance: () => void }) {
  return (
    <div className="max-w-[900px] mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1"><Badge variant="active">CT-1042</Badge><span className="text-[#65737A] text-[13px]">Pacific Northwest Tax & Bookkeeping Practice</span></div>
        <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">Request Access</h1>
        <p className="text-[13px] text-[#65737A] mt-1">Tell CPA Bridge why you are interested in this opportunity. Your request and NDA will be reviewed before any private documents are released.</p>
      </div>
      <div className="grid grid-cols-[1fr_280px] gap-5">
        <div className="space-y-5">
          <Card className="p-6">
            <div className="text-[15px] font-semibold text-[#20313A] mb-4">Access Request — Step 1 of 2</div>
            <div className="space-y-4">
              <div>
                <FieldLabel required htmlFor="field-049">Reason for interest in this specific listing</FieldLabel>
                <Textarea value="CT-1042 fits our Pacific Northwest acquisition criteria. The revenue size, service mix, and transition length match our current targets. We have successfully integrated three similar practices in Seattle and Portland and would continue the existing staff and client relationships." rows={4}  id="field-049" />
              </div>
              <div>
                <FieldLabel htmlFor="field-050">Financing plan for this acquisition</FieldLabel>
                <Textarea value="70% bank debt (existing relationship with Pacific Northwest Bank) and 30% equity from our operating reserves. We are pre-qualified up to $4M. Seller note or earnout component is acceptable." rows={3}  id="field-050" />
              </div>
              <div>
                <FieldLabel htmlFor="field-051">Relevant prior experience</FieldLabel>
                <Textarea value="Three prior practice acquisitions in WA and OR ranging from $800K to $2.1M. All three retained 90%+ of existing staff. Strong understanding of client transition in regional tax practices." rows={3}  id="field-051" />
              </div>
              <div>
                <FieldLabel htmlFor="field-052">Specific information requested</FieldLabel>
                <Input value="Detailed business profile, financial summary, service revenue breakdown, client concentration summary"  id="field-052" />
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-[#D7D0C4]">
              <Btn onClick={onAdvance} size="lg">Submit Access Request <ArrowRight size={14} /></Btn>
              <p className="text-[11px] text-[#65737A] mt-2">After submitting, you will be asked to sign an NDA before CPA Bridge can review this request.</p>
            </div>
          </Card>
        </div>
        <div className="space-y-4">
          <Card className="p-6 border-l-4 border-l-[#0A1721]">
            <div className="text-[12px] font-semibold text-[#20313A] mb-2">What happens next</div>
            <ol className="space-y-2 text-[12px] text-[#65737A]">
              {["Submit this access request.", "Sign the CPA Bridge NDA.", "CPA Bridge reviews the request (separate step).", "Seller decides whether to approve your access.", "CPA Bridge releases selected documents."].map((s, i) => <li key={i} className="flex gap-2"><span className="w-4 h-4 rounded-full bg-[#E7F2EF] text-[#0A1721] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>{s}</li>)}
            </ol>
          </Card>
          <Alert type="locked"><strong>NDA does not release documents.</strong> Signing an NDA makes your request eligible for CPA Bridge review. Documents are released only after CPA Bridge reviews and the seller approves.</Alert>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Step 12 — NDA ────────────────────────────────────────────────────
function ScreenNDA({ onAdvance }: { onAdvance: () => void }) {
  return (
    <div className="max-w-[860px] mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1"><Badge variant="active">CT-1042</Badge></div>
        <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">Sign Non-Disclosure Agreement</h1>
        <p className="text-[13px] text-[#65737A] mt-1">Step 2 of 2 — Access Request. Your NDA allows CPA Bridge to begin reviewing this request.</p>
      </div>
      <Alert type="warn">
        <strong>Important:</strong> Signing this NDA does not release any confidential documents. It makes your access request eligible for CPA Bridge review. Documents are released only after CPA Bridge reviews and the seller separately approves.
      </Alert>
      <div className="mt-4 grid grid-cols-[1fr_280px] gap-5">
        <Card className="p-6">
          <div className="text-[13px] font-semibold text-[#20313A] mb-1">Non-Disclosure Agreement</div>
          <div className="text-[11px] text-[#65737A] mb-4">Illustrative confidentiality agreement — not legal advice. Final terms require qualified counsel. Version 2.1</div>
          <div className="bg-[#F6F1E8] rounded-[6px] p-4 text-[12px] text-[#65737A] leading-relaxed h-48 overflow-y-auto border border-[#D7D0C4] mb-4">
            <p className="mb-3">Sample confidentiality agreement for demonstration purposes only. This screen does not create a legal relationship. Final agreement language must be provided or approved by qualified counsel.</p>
            <p className="mb-3">1. <strong>Confidential Information.</strong> Recipient agrees to hold in strict confidence all information disclosed by CPA Bridge or the seller in connection with CT-1042, including but not limited to financial information, client information, employee information, and operational details.</p>
            <p className="mb-3">2. <strong>Permitted Use.</strong> Confidential information may be used solely for the purpose of evaluating a potential acquisition of the business.</p>
            <p className="mb-3">3. <strong>Document Release.</strong> Execution of this Agreement does not create any obligation on CPA Bridge or the seller to release any confidential documents. Document release is subject to separate seller approval and CPA Bridge release actions.</p>
            <p>4. <strong>Term.</strong> This Agreement is effective for 24 months from the date of execution.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div><FieldLabel required htmlFor="field-053">Signer name</FieldLabel><Input value="Marcus Lee"  id="field-053" /></div>
            <div><FieldLabel required htmlFor="field-054">Signer capacity</FieldLabel><Input value="Head of Acquisitions"  id="field-054" /></div>
            <div><FieldLabel required htmlFor="field-055">Organization</FieldLabel><Input value="Evergreen Accounting Partners"  id="field-055" /></div>
            <div><FieldLabel required htmlFor="field-056">Date</FieldLabel><Input value="July 1, 2026" readOnly  id="field-056" /></div>
          </div>
          <div className="flex items-start gap-2 mb-5">
            <input type="checkbox" defaultChecked className="mt-1" />
            <span className="text-[12px] text-[#20313A]">I have read and agree to the Non-Disclosure Agreement above. I understand that signing this NDA does not release any confidential documents.</span>
          </div>
          <Btn onClick={onAdvance} variant="success" size="lg"><FileCheck size={15} />Sign NDA</Btn>
        </Card>
        <div className="space-y-4">
          <Card className="p-6">
            <div className="text-[12px] font-semibold text-[#20313A] mb-3">NDA record</div>
            <div className="space-y-2 text-[12px]">
              {[["Listing", "CT-1042"], ["Buyer", "Marcus Lee"], ["Organization", "Evergreen AP"], ["Version", "CPA Bridge NDA v2.1"], ["Status", "Pending signature"], ["Date", "July 1, 2026"]].map(([l, v]) => (
                <div key={String(l)} className="flex justify-between border-b border-[#EEE8DF] pb-1.5">
                  <span className="text-[#65737A]">{l}</span>
                  <span className="text-[#20313A] font-medium">{v}</span>
                </div>
              ))}
            </div>
          </Card>
          <Alert type="locked"><strong>After signing:</strong> CPA Bridge will be notified to begin reviewing your specific access request for CT-1042. No documents are released at this stage.</Alert>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Step 13 — Staff Request Review ───────────────────────────────────
function ScreenStaffRequestReview({ onAdvance }: { onAdvance: () => void }) {
  const gates = [
    { label: "Listing CT-1042 is active", done: true },
    { label: "Buyer profile submitted", done: true },
    { label: "Buyer approved by CPA Bridge", done: true },
    { label: "Access request submitted", done: true },
    { label: "NDA signed", done: true },
    { label: "CPA Bridge general fit reviewed", done: true, note: "Strong Fit — reviewed Jul 1" },
    { label: "Conflict check clear", done: true },
  ];
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1"><Badge variant="active">CT-1042</Badge><Badge variant="reviewing">Request Under Review</Badge></div>
          <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">Deal-Specific Access Request Review</h1>
          <p className="text-[13px] text-[#65737A] mt-1">Marcus Lee / Evergreen Accounting Partners → CT-1042 — Staff review</p>
        </div>
      </div>
      <Alert type="info"><strong>This is a deal-specific review — separate from general matching.</strong> General match recommendation was recorded separately. This review covers whether CPA Bridge recommends releasing documents for this specific request.</Alert>
      <div className="mt-4 grid grid-cols-[1fr_320px] gap-5">
        <div className="space-y-4">
          <Card className="p-6">
            <div className="text-[15px] font-semibold text-[#20313A] mb-4">Required gate status</div>
            <div className="space-y-2.5">
              {gates.map((g, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${g.done ? "bg-[#1A6B28]" : "border-2 border-[#D7D0C4]"}`}>
                    {g.done && <Check size={11} className="text-white" />}
                  </div>
                  <div>
                    <div className="text-[13px] text-[#20313A]">{g.label}</div>
                    {g.note && <div className="text-[11px] text-[#1A6B28]">{g.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-[15px] font-semibold text-[#20313A] mb-4">Buyer's stated interest</div>
            <p className="text-[13px] text-[#65737A] leading-relaxed">"CT-1042 fits our Pacific Northwest acquisition criteria. The revenue size, service mix, and transition length match our current targets. We have successfully integrated three similar practices in Seattle and Portland and would continue the existing staff and client relationships."</p>
          </Card>
          <Card className="p-6">
            <div className="text-[15px] font-semibold text-[#20313A] mb-4">Proposed document release package</div>
            <div className="space-y-1.5">
              {["Detailed business profile (CT-1042-Profile-v2.pdf)", "2025 P&L summary (normalized)", "2026 YTD financials (through May)", "Service revenue by category", "Anonymized client concentration summary"].map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-[12px] text-[#20313A]">
                  <FileText size={12} className="text-[#805A28]" />{d}
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-[#D7D0C4] text-[11px] text-[#65737A]">These documents do not include: tax returns, client names, employee personal information, banking information, or contracts.</div>
          </Card>
          <Card className="p-6">
            <div className="text-[13px] font-semibold text-[#20313A] mb-3">Staff note to seller</div>
            <Textarea id="access-review-notes" ariaLabel="Access request review notes" value="Marcus Lee at Evergreen Accounting Partners is a strong fit for CT-1042. Funding is confirmed ($3M equity, pre-qualified lender). Three prior accounting practice acquisitions in WA and OR. No conflicts. We recommend approving this buyer to receive the standard access package." rows={4} />
          </Card>
          <div className="flex gap-2">
            <Btn onClick={onAdvance} variant="success"><Send size={14} />Recommend — Send to Seller</Btn>
            <Btn variant="secondary">Hold</Btn>
            <Btn variant="secondary">Ask Buyer for More</Btn>
            <Btn variant="destructive">Decline</Btn>
          </div>
        </div>
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Avatar initials="ML" role="buyer" size="md" />
              <div><div className="font-semibold text-[13px] text-[#20313A]">Marcus Lee</div><div className="text-[11px] text-[#65737A]">Evergreen Accounting Partners</div></div>
            </div>
            <div className="space-y-2 text-[12px]">
              {[["Buyer type", "Strategic acquirer"], ["Fit label", "Strong Fit"], ["Funding", "Reviewed — $3M equity"], ["NDA signed", "July 1, 2026"], ["Request date", "July 1, 2026"]].map(([l, v]) => (
                <div key={String(l)} className="flex justify-between border-b border-[#EEE8DF] pb-1.5"><span className="text-[#65737A]">{l}</span><span className="text-[#20313A] font-medium">{v}</span></div>
              ))}
            </div>
          </Card>
          <Alert type="warn"><strong>Matching vs. this review are separate.</strong> The general match recommendation was recorded earlier. This review specifically concerns whether to send a recommendation to the seller for this access request.</Alert>
          <Card className="p-6 border-l-4 border-l-[#991B1B]">
            <div className="text-[12px] font-semibold text-[#991B1B] mb-1 flex items-center gap-1"><Lock size={12} />Document release is locked</div>
            <p className="text-[12px] text-[#65737A]">CPA Bridge cannot release documents until the seller separately approves this buyer. Sending this recommendation to the seller is the next step.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Step 14 — Seller Buyer Approval ──────────────────────────────────
function ScreenSellerBuyerApproval({ onAdvance }: { onAdvance: () => void }) {
  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="mb-6">
        <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">Buyer Review — CT-1042</h1>
        <p className="text-[13px] text-[#65737A] mt-1">Elena Martinez — You control access to your confidential information</p>
      </div>
      <Alert type="info"><strong>Your decision.</strong> CPA Bridge has reviewed this buyer and recommends approval. Your approval here allows CPA Bridge to release the pre-approved document package. CPA Bridge will perform a separate release action — no documents are sent automatically.</Alert>
      <div className="mt-4 grid grid-cols-[1fr_280px] gap-5">
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar initials="ML" role="buyer" size="lg" />
                <div>
                  <div className="font-semibold text-[15px] text-[#20313A]">Marcus Lee</div>
                  <div className="text-[12px] text-[#65737A]">Head of Acquisitions — Evergreen Accounting Partners</div>
                </div>
              </div>
              <Badge variant="strong-fit"><Star size={11} />Strong Fit</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4 text-[12px]">
              {[["Buyer type", "Strategic acquirer — existing accounting firm"], ["Location focus", "Washington and Oregon"], ["Revenue target", "$1M – $5M"], ["Funding status", "Reviewed — $3M equity confirmed"], ["Prior acquisitions", "3 completed in WA and OR"], ["Transition", "Supports 6–12 month seller transition"], ["Experience", "10+ years managing accounting practices"], ["NDA status", "Signed July 1, 2026"]].map(([l, v]) => (
                <div key={String(l)} className="rounded-[6px] border border-[#DED5C7] bg-[#FBF8F2] p-3">
                  <div className="text-[#65737A] mb-0.5">{l}</div>
                  <div className="font-medium text-[#20313A]">{v}</div>
                </div>
              ))}
            </div>
            <div className="bg-[#E7F2EF] rounded-[6px] p-3 mb-4">
              <div className="text-[11px] font-semibold text-[#0A1721] mb-1">CPA Bridge recommendation</div>
              <p className="text-[12px] text-[#65737A]">"Marcus Lee at Evergreen Accounting Partners is a strong fit for CT-1042. Funding is confirmed. Three prior accounting practice acquisitions in WA and OR. No conflicts. We recommend approving this buyer to receive the standard access package."</p>
              <div className="text-[11px] text-[#65737A] mt-1">— Maya Chen, Deal Lead</div>
            </div>
            <div className="bg-[#F6F1E8] rounded-[6px] p-3 mb-4">
              <div className="text-[11px] font-semibold text-[#20313A] mb-1">Buyer's reason for interest</div>
              <p className="text-[12px] text-[#65737A]">"CT-1042 fits our Pacific Northwest acquisition criteria. The revenue size, service mix, and transition length match our current targets. We have successfully integrated three similar practices and would continue the existing staff and client relationships."</p>
            </div>
            <div className="border-t border-[#D7D0C4] pt-4">
              <div className="text-[12px] font-semibold text-[#20313A] mb-1">If you approve, this buyer will receive:</div>
              <ul className="space-y-1 text-[12px] text-[#65737A] mb-4">
                {["Detailed business profile", "2025 P&L summary (normalized)", "2026 year-to-date financials", "Service revenue by category", "Anonymized client concentration summary"].map(d => <li key={d} className="flex items-center gap-1.5"><FileText size={11} className="text-[#805A28]" />{d}</li>)}
              </ul>
              <Alert type="warn">Not included: client names, employee personal information, tax returns, contracts, banking information.</Alert>
            </div>
          </Card>
          <div className="flex gap-2">
            <Btn onClick={onAdvance} variant="success" size="lg"><CheckCircle2 size={15} />Approve Access for Marcus Lee</Btn>
            <Btn variant="secondary">Delay — Request More Information</Btn>
            <Btn variant="destructive">Reject</Btn>
          </div>
        </div>
        <div className="space-y-4">
          <Card className="p-6">
            <div className="text-[12px] font-semibold text-[#20313A] mb-2">Other buyers in review</div>
            <div className="space-y-3">
              {[{ name: "Northwest CPA Partners", fit: "possible-fit", label: "Possible Fit", status: "CPA Bridge review pending" }, { name: "Summit Search Fund", fit: "weak-fit", label: "Weak Fit", status: "Funding review incomplete" }].map(b => (
                <div key={b.name} className="border-b border-[#EEE8DF] pb-3 last:border-0">
                  <div className="text-[12px] font-medium text-[#20313A]">{b.name}</div>
                  <Badge variant={b.fit} className="mt-1">{b.label}</Badge>
                  <div className="text-[11px] text-[#65737A] mt-1">{b.status}</div>
                </div>
              ))}
            </div>
          </Card>
          <Alert type="locked"><strong>Your approval ≠ document release.</strong> After you approve, CPA Bridge performs a separate document release action. You will be notified when documents are sent.</Alert>
          <ContactCard />
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Step 15 — Staff Document Release ─────────────────────────────────
function ScreenDocumentRelease({ onAdvance }: { onAdvance: () => void }) {
  const docs = [
    { name: "CT-1042 Detailed Business Profile v2.pdf", size: "1.2 MB", include: true },
    { name: "CT-1042 2025 P&L Summary (Normalized).pdf", size: "340 KB", include: true },
    { name: "CT-1042 2026 YTD Financials through May.pdf", size: "218 KB", include: true },
    { name: "CT-1042 Service Revenue by Category.pdf", size: "95 KB", include: true },
    { name: "CT-1042 Client Concentration Summary (Anonymized).pdf", size: "67 KB", include: true },
    { name: "CT-1042 2024 Business Tax Return.pdf", size: "2.4 MB", include: false },
    { name: "CT-1042 Employee Details.xlsx", size: "180 KB", include: false },
    { name: "CT-1042 Office Lease.pdf", size: "540 KB", include: false },
  ];
  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1"><Badge variant="active">CT-1042</Badge><Badge variant="approved"><Check size={11} />Seller Approved</Badge></div>
          <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">Release Selected Documents</h1>
          <p className="text-[13px] text-[#65737A] mt-1">Marcus Lee — Evergreen Accounting Partners. Seller has approved access.</p>
        </div>
      </div>
      <Alert type="success">Elena Martinez has approved Marcus Lee to receive the standard access package. You may now release the selected documents.</Alert>
      <div className="mt-4 grid grid-cols-[1fr_280px] gap-5">
        <Card>
          <div className="px-5 py-3 border-b border-[#D7D0C4] text-[11px] font-semibold text-[#805A28] uppercase tracking-[0.14em] grid grid-cols-[32px_1fr_80px_100px]">
            <span></span><span>Document</span><span>Size</span><span>Include</span>
          </div>
          <div className="divide-y divide-[#EEE8DF]">
            {docs.map((d, i) => (
              <div key={i} className={`px-5 py-3 grid grid-cols-[32px_1fr_80px_100px] items-center ${!d.include ? "opacity-50" : ""}`}>
                <FileText size={14} className={d.include ? "text-[#805A28]" : "text-[#9AA4A9]"} />
                <span className="text-[13px] text-[#20313A]">{d.name}</span>
                <span className="text-[12px] text-[#65737A]">{d.size}</span>
                <input type="checkbox" defaultChecked={d.include} className="w-4 h-4" />
              </div>
            ))}
          </div>
          <div className="px-5 py-3 bg-[#FBE1E1] border-t border-[#F0ABAB] rounded-b-lg">
            <div className="text-[12px] text-[#991B1B] flex items-center gap-2"><Lock size={12} /><strong>Not in this release:</strong> Tax returns, employee details, lease, client names, banking information. These require diligence-stage approval.</div>
          </div>
        </Card>
        <div className="space-y-4">
          <Card className="p-6">
            <div className="text-[12px] font-semibold text-[#20313A] mb-3">Release summary</div>
            <div className="space-y-2 text-[12px]">
              {[["Recipient", "Marcus Lee"], ["Organization", "Evergreen AP"], ["Listing", "CT-1042"], ["Seller approved", "July 1, 2026"], ["Access type", "Standard review package"], ["Access expires", "October 1, 2026"], ["Watermark", "Yes — buyer name + date"], ["View only", "Yes — no download"]].map(([l, v]) => (
                <div key={String(l)} className="flex justify-between border-b border-[#EEE8DF] pb-1.5"><span className="text-[#65737A]">{l}</span><span className="text-[#20313A] font-medium">{v}</span></div>
              ))}
            </div>
          </Card>
          <Alert type="warn">Seller approval and document release are separate actions. Seller approval was recorded. This release action is a separate CPA Bridge step.</Alert>
          <Btn onClick={onAdvance} variant="success" size="lg" className="w-full justify-center"><Send size={15} />Release 5 Documents to Marcus Lee</Btn>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Step 16 — Buyer Offer ────────────────────────────────────────────
function ScreenBuyerOffer({ onAdvance }: { onAdvance: () => void }) {
  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1"><Badge variant="active">CT-1042</Badge><Badge variant="released"><Check size={11} />Documents Released</Badge></div>
        <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">Submit Offer</h1>
        <p className="text-[13px] text-[#65737A] mt-1">Pacific Northwest Tax & Bookkeeping Practice — Marcus Lee, Evergreen Accounting Partners</p>
      </div>
      <div className="grid grid-cols-[1fr_300px] gap-5">
        <div className="space-y-5">
          <Card className="p-6">
            <div className="text-[16px] font-semibold text-[#20313A] mb-5 pb-3 border-b border-[#D7D0C4]">Purchase Terms</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <FieldLabel required htmlFor="offer-total-purchase-price">Total purchase price</FieldLabel>
                <div className="relative"><DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#65737A]" /><input id="offer-total-purchase-price" defaultValue="2,450,000" className="cb-field w-full border border-[#D7D0C4] rounded-[6px] pl-8 pr-3 py-2 text-[16px] font-semibold text-[#20313A] bg-white focus:outline-none focus:border-[#A8793A]" /></div>
              </div>
              <div>
                <FieldLabel required htmlFor="offer-cash-at-close">Cash at close</FieldLabel>
                <Input value="$1,960,000 (80%)" id="offer-cash-at-close" />
              </div>
              <div>
                <FieldLabel htmlFor="field-058">Seller note</FieldLabel>
                <Input value="$245,000 (10%)"  id="field-058" />
              </div>
              <div>
                <FieldLabel htmlFor="field-059">Earnout</FieldLabel>
                <Input value="$245,000 (10%)"  id="field-059" />
              </div>
              <div>
                <FieldLabel htmlFor="field-060">Target close date</FieldLabel>
                <Input value="September 30, 2026"  id="field-060" />
              </div>
              <div>
                <FieldLabel htmlFor="field-061">Transition period</FieldLabel>
                <Select value="6 months" options={["3 months", "6 months", "12 months", "18 months", "Flexible"]}  id="field-061" />
              </div>
              <div>
                <FieldLabel htmlFor="field-062">Working capital included</FieldLabel>
                <Select value="Yes — normal working capital" options={["Yes — normal working capital", "No", "To be negotiated"]}  id="field-062" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-[16px] font-semibold text-[#20313A] mb-5 pb-3 border-b border-[#D7D0C4]">Conditions & Diligence</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <FieldLabel htmlFor="field-063">Conditions to close</FieldLabel>
                <Textarea value="Standard financial and legal diligence. Lender appraisal and approval. Satisfactory review of client contracts and key employee arrangements. No material adverse change to revenue or key staff between signing and close." rows={3}  id="field-063" />
              </div>
              <div className="col-span-2">
                <FieldLabel htmlFor="field-064">Diligence requirements</FieldLabel>
                <Textarea value="Access to 3 years of tax returns, detailed client list (under NDA), employee agreements, office lease, and all material contracts. Buyer lender will require a full appraisal." rows={3}  id="field-064" />
              </div>
            </div>
          </Card>
          <div className="flex gap-3">
            <Btn variant="secondary">Save Draft</Btn>
            <Btn onClick={onAdvance} variant="success" size="lg"><Send size={15} />Submit Offer</Btn>
          </div>
        </div>
        <div className="space-y-4">
          <Card className="p-6 border-l-4 border-l-[#0A1721]">
            <div className="text-[12px] font-semibold text-[#20313A] mb-3">Offer summary</div>
            <div className="space-y-2 text-[12px]">
              {[["Purchase price", "$2,450,000"], ["Cash at close", "$1,960,000 (80%)"], ["Seller note", "$245,000 (10%)"], ["Earnout", "$245,000 (10%)"], ["Target close", "Sep 30, 2026"], ["Transition", "6 months"]].map(([l, v]) => (
                <div key={String(l)} className="flex justify-between border-b border-[#EEE8DF] pb-1.5">
                  <span className="text-[#65737A]">{l}</span>
                  <span className="font-semibold text-[#20313A]">{v}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6 bg-[#E1EFEB]">
            <div className="text-[12px] font-semibold text-[#0A1721] mb-1">Documents received</div>
            <ul className="space-y-1 text-[12px] text-[#1E5F55]">
              {["Business profile", "2025 P&L (normalized)", "2026 YTD financials", "Service revenue summary", "Client concentration (anonymized)"].map(d => <li key={d} className="flex items-center gap-1.5"><FileCheck size={11} />{d}</li>)}
            </ul>
          </Card>
          <Alert type="info">CPA Bridge will normalize this offer and present it to the seller. Maya Chen will contact you to discuss terms.</Alert>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Step 17 — Seller Accept for Diligence ────────────────────────────
function ScreenDiligence({ onAdvance }: { onAdvance: () => void }) {
  const tasks = [
    { task: "Seller uploads 2026 receivables aging", owner: "Elena Martinez", due: "Jul 15, 2026", status: "pending" },
    { task: "CPA Bridge reviews office lease response", owner: "Maya Chen", due: "Jul 12, 2026", status: "reviewing" },
    { task: "Buyer confirms lender diligence list", owner: "Marcus Lee", due: "Jul 10, 2026", status: "complete" },
    { task: "Seller submits top-25-client retention plan", owner: "Elena Martinez", due: "Jul 20, 2026", status: "pending" },
    { task: "CPA Bridge releases 2024 tax returns to buyer", owner: "Maya Chen", due: "Jul 22, 2026", status: "locked" },
    { task: "Buyer lender schedules appraisal", owner: "Marcus Lee / Lender", due: "Jul 25, 2026", status: "pending" },
  ];
  const statusMap: Record<string, string> = { pending: "pending", reviewing: "reviewing", complete: "complete", locked: "locked" };
  const statusLabel: Record<string, string> = { pending: "Pending", reviewing: "In Review", complete: "Complete", locked: "Locked — awaiting prior step" };
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1"><Badge variant="active">CT-1042</Badge><Badge variant="approved"><Handshake size={11} />Offer Accepted — Diligence Open</Badge></div>
        <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">Deal Progress — Diligence Stage</h1>
        <p className="text-[13px] text-[#65737A] mt-1">Martinez Tax & Advisory LLC — Elena Martinez</p>
      </div>
      <div className="grid grid-cols-[1fr_300px] gap-5">
        <div className="space-y-5">
          <Card className="p-6 border-l-4 border-l-[#1A6B28]">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[11px] font-semibold text-[#805A28] uppercase tracking-[0.14em] mb-1">Accepted Offer</div>
                <div className="text-[22px] font-bold text-[#20313A]">$2,450,000</div>
                <div className="text-[12px] text-[#65737A] mt-1">Evergreen Accounting Partners — Marcus Lee</div>
              </div>
              <Badge variant="approved"><Check size={11} />Accepted for Diligence</Badge>
            </div>
            <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-[#D7D0C4]">
              {[["Cash at close", "$1.96M (80%)"], ["Seller note", "$245K (10%)"], ["Earnout", "$245K (10%)"], ["Target close", "Sep 30, 2026"]].map(([l, v]) => (
                <div key={String(l)}><div className="text-[12px] font-medium text-[#65737A] mb-0.5">{l}</div><div className="text-[13px] font-semibold text-[#20313A]">{v}</div></div>
              ))}
            </div>
          </Card>
          <Card>
            <div className="px-5 py-3 border-b border-[#D7D0C4] text-[11px] font-semibold text-[#805A28] uppercase tracking-[0.14em] grid grid-cols-[1fr_140px_100px_120px]">
              <span>Task</span><span>Owner</span><span>Due date</span><span>Status</span>
            </div>
            {tasks.map((t, i) => (
              <div key={i} className="px-5 py-3 border-b border-[#EEE8DF] last:border-0 grid grid-cols-[1fr_140px_100px_120px] items-center gap-2">
                <span className={`text-[13px] ${t.status === "locked" ? "text-[#9AA4A9]" : "text-[#20313A]"}`}>{t.task}</span>
                <span className="text-[12px] text-[#65737A]">{t.owner}</span>
                <span className="text-[12px] text-[#65737A]">{t.due}</span>
                <Badge variant={statusMap[t.status]}>{statusLabel[t.status]}</Badge>
              </div>
            ))}
          </Card>
          <Card className="p-6">
            <div className="text-[13px] font-semibold text-[#20313A] mb-3">Closing checklist</div>
            <div className="grid grid-cols-2 gap-2">
              {[["Diligence period complete", false], ["Purchase agreement signed", false], ["Lender approval received", false], ["Regulatory filings complete", false], ["Client notification plan approved", false], ["Staff communication plan approved", false], ["Transition schedule agreed", false], ["Funds transferred", false]].map(([l, done]) => (
                <div key={String(l)} className="flex items-center gap-2 text-[12px]">
                  {done ? <CheckSquare size={14} className="text-[#1A6B28]" /> : <Square size={14} className="text-[#D7D0C4]" />}
                  <span className={done ? "text-[#20313A]" : "text-[#9AA4A9]"}>{String(l)}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="space-y-4">
          <Card className="p-6">
            <div className="text-[12px] font-semibold text-[#20313A] mb-3">Deal stage</div>
            <div className="space-y-2">
              {[["Interest submitted", true], ["Business info complete", true], ["Files reviewed", true], ["Listing approved", true], ["Buyer approved", true], ["Access granted", true], ["Offer submitted", true], ["Offer accepted", true], ["Diligence open", true], ["Closing", false], ["Transition", false]].map(([l, done]) => (
                <div key={String(l)} className="flex items-center gap-2 text-[12px]">
                  <div className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center ${done ? "bg-[#1A6B28]" : "border border-[#D7D0C4]"}`}>
                    {done && <Check size={9} className="text-white" />}
                  </div>
                  <span className={done ? "text-[#20313A]" : "text-[#9AA4A9]"}>{String(l)}</span>
                </div>
              ))}
            </div>
          </Card>
          <Alert type="info">During diligence, CPA Bridge coordinates all document releases, tracks open questions, and supports the seller through closing and transition.</Alert>
          <ContactCard />
          <Btn variant="secondary" className="w-full justify-center"><MessageSquare size={13} />Open question to Maya Chen</Btn>
        </div>
      </div>
    </div>
  );
}

// ─── Matching & Ranking ENGINE (two deterministic scoring functions) ────────
// Matching determines compatibility. Ranking determines order.
// Neither grants access or replaces Admin review or seller choice.
const MATCH_WEIGHTS: [string, string, number][] = [
  ["geography", "Geography", 15], ["dealSize", "Deal size", 15], ["service", "Service-line fit", 15],
  ["funding", "Funding readiness", 15], ["acctExp", "Accounting/tax experience", 10], ["acqExp", "Acquisition experience", 10],
  ["opExp", "Operating experience", 5], ["timing", "Timing", 5], ["transition", "Transition", 5], ["rationale", "Strategic rationale", 5],
];

interface BuyerRecord {
  id: string; name: string; org: string; buyerType: string;
  hard: Record<string, boolean>;   // hard eligibility checks
  factors: Record<string, number>; // 0-100 per factor
  fundingLabel: string; experience: string; timing: string; transition: string; reason: string;
  interest: boolean; requested: boolean;
}

const HARD_LABELS: Record<string, string> = {
  active: "Listing active", approved: "Buyer approved", type: "Buyer type permitted by seller",
  geography: "Geography acceptable", dealSize: "Deal-size range overlaps", funding: "Funding capacity sufficient",
  conflict: "No known conflict", timing: "Timing feasible", transition: "Transition compatible",
};
// Soft hard-checks trigger "Needs Review"; core failures trigger "Ineligible"
const CORE_HARD = ["active", "approved", "type", "geography", "dealSize", "conflict"];

function computeMatch(b: BuyerRecord) {
  const failed = Object.keys(b.hard).filter(k => !b.hard[k]);
  const coreFail = failed.some(k => CORE_HARD.includes(k));
  let eligibility: "Eligible" | "Ineligible" | "Needs Review";
  if (coreFail) eligibility = "Ineligible";
  else if (failed.length > 0) eligibility = "Needs Review";
  else eligibility = "Eligible";

  const weighted = MATCH_WEIGHTS.reduce((sum, [k, , w]) => sum + (b.factors[k] ?? 0) * w, 0) / 100;
  const score = Math.round(weighted);
  let strength: "strong-fit" | "possible-fit" | "weak-fit";
  let strengthLabel: string;
  if (eligibility === "Ineligible") { strength = "weak-fit"; strengthLabel = "Weak Fit"; }
  else if (score >= 80) { strength = "strong-fit"; strengthLabel = "Strong Fit"; }
  else if (score >= 62) { strength = "possible-fit"; strengthLabel = "Possible Fit"; }
  else { strength = "weak-fit"; strengthLabel = "Weak Fit"; }

  const strong = MATCH_WEIGHTS.filter(([k]) => (b.factors[k] ?? 0) >= 82).map(([, l]) => l.toLowerCase());
  const gaps = MATCH_WEIGHTS.filter(([k]) => (b.factors[k] ?? 0) < 60).map(([, l]) => l);
  const whyMatched = strong.length
    ? `Strong on ${strong.slice(0, 4).join(", ")}${strong.length > 4 ? ", and more" : ""}.`
    : "Broad overlap on core criteria with several areas needing review.";

  return { eligibility, score, strength, strengthLabel, failed: failed.map(k => HARD_LABELS[k]), gaps, whyMatched, lastEvaluated: "Jun 30, 2026" };
}

function rankMatches(records: BuyerRecord[]) {
  const scored = records.map(b => {
    const m = computeMatch(b);
    // Ranking score: match score + readiness/urgency/interest signals (separate from compatibility)
    let rankScore = m.score;
    if (b.hard.funding) rankScore += 12;            // funding reviewed
    if (b.factors.timing >= 80) rankScore += 8;     // timing urgency/fit
    if (b.interest) rankScore += 10;                // demonstrated interest
    if (b.requested) rankScore += 6;                // request completeness
    if (m.eligibility === "Ineligible") rankScore -= 60;
    if (m.eligibility === "Needs Review") rankScore -= 20;
    return { b, m, rankScore };
  }).sort((a, z) => z.rankScore - a.rankScore);

  return scored.map((s, i) => {
    const reasons: string[] = [];
    if (s.b.hard.funding) reasons.push("funding is reviewed"); else reasons.push("funding review is pending");
    if (s.b.factors.geography >= 80 && s.b.factors.service >= 80) reasons.push("geography and services align");
    if (s.b.factors.timing >= 80) reasons.push("timing matches"); else reasons.push("timing is slower");
    if (s.b.interest) reasons.push("the buyer has shown specific interest");
    const whyRanked = `Ranked #${i + 1} because ${reasons.slice(0, 4).join(", ")}.`;
    return { ...s, rank: i + 1, whyRanked };
  });
}

const BASE_BUYERS: BuyerRecord[] = [
  { id: "b1", name: "Marcus Lee", org: "Evergreen Accounting Partners", buyerType: "Strategic acquirer",
    hard: { active: true, approved: true, type: true, geography: true, dealSize: true, funding: true, conflict: true, timing: true, transition: true },
    factors: { geography: 95, dealSize: 90, service: 88, funding: 96, acctExp: 92, acqExp: 94, opExp: 85, timing: 90, transition: 88, rationale: 90 },
    fundingLabel: "Reviewed — $3M equity", experience: "3 prior acquisitions", timing: "Ready within 6 months", transition: "Supports 6–12 mo", reason: "Strategic expansion into Seattle", interest: true, requested: true },
  { id: "b2", name: "Northwest CPA Partners", org: "Northwest CPA Partners", buyerType: "Strategic acquirer",
    hard: { active: true, approved: true, type: true, geography: true, dealSize: true, funding: false, conflict: true, timing: false, transition: true },
    factors: { geography: 90, dealSize: 85, service: 92, funding: 62, acctExp: 95, acqExp: 70, opExp: 88, timing: 55, transition: 82, rationale: 80 },
    fundingLabel: "In review", experience: "1 prior acquisition", timing: "12+ months", transition: "Flexible", reason: "Add tax capacity", interest: false, requested: false },
  { id: "b3", name: "Summit Search Fund", org: "Summit Search Fund", buyerType: "Search fund",
    hard: { active: true, approved: true, type: true, geography: true, dealSize: true, funding: false, conflict: true, timing: true, transition: false },
    factors: { geography: 70, dealSize: 75, service: 55, funding: 40, acctExp: 45, acqExp: 55, opExp: 50, timing: 80, transition: 55, rationale: 65 },
    fundingLabel: "Not demonstrated", experience: "First acquisition", timing: "Ready now", transition: "Wants 3 mo", reason: "Platform acquisition", interest: false, requested: false },
];

interface MatchInputs { fundingReviewed: boolean; geographyAligned: boolean; timingAligned: boolean; transitionAligned: boolean; accountingExperience: boolean; buyerInterest: boolean; }
const DEFAULT_MATCH_INPUTS: MatchInputs = { fundingReviewed: true, geographyAligned: true, timingAligned: true, transitionAligned: true, accountingExperience: true, buyerInterest: true };

// Apply Admin scenario inputs to the primary buyer (Marcus Lee)
function applyInputs(buyers: BuyerRecord[], inp: MatchInputs): BuyerRecord[] {
  return buyers.map(b => {
    if (b.id !== "b1") return b;
    const hard = { ...b.hard, funding: inp.fundingReviewed, geography: inp.geographyAligned, timing: inp.timingAligned, transition: inp.transitionAligned };
    const factors = { ...b.factors,
      funding: inp.fundingReviewed ? 96 : 45,
      geography: inp.geographyAligned ? 95 : 40,
      timing: inp.timingAligned ? 90 : 45,
      transition: inp.transitionAligned ? 88 : 40,
      acctExp: inp.accountingExperience ? 92 : 45,
      rationale: inp.buyerInterest ? 90 : 55,
    };
    return { ...b, hard, factors, interest: inp.buyerInterest, fundingLabel: inp.fundingReviewed ? "Reviewed — $3M equity" : "Not yet reviewed" };
  });
}

// ─── Screen: Admin Matching & Ranking Workspace (functional) ──────────────────
function ScreenMatchingWorkspace() {
  const [tab, setTab] = useState<"analysis" | "shortlist">("analysis");
  const [showInputs, setShowInputs] = useState(true);
  const [inputs, setInputs] = useState<MatchInputs>(DEFAULT_MATCH_INPUTS);
  const buyers = applyInputs(BASE_BUYERS, inputs);
  const ranked = rankMatches(buyers);
  const primary = buyers[0];
  const primaryMatch = computeMatch(primary);
  const toggle = (k: keyof MatchInputs) => setInputs(p => ({ ...p, [k]: !p[k] }));

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="mb-5">
        <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">Matching & Ranking Workspace</h1>
        <p className="text-[13px] text-[#65737A] mt-1">CT-1042 — Pacific Northwest Tax & Bookkeeping Practice. Two deterministic functions: <strong>computeMatch</strong> (compatibility) and <strong>rankMatches</strong> (order).</p>
      </div>
      <Alert type="warn"><strong>Matching never grants access.</strong> Ranking orders eligible matches — it does not grant access, reject buyers, replace Admin review, or override seller choice.</Alert>

      {/* Collapsible scenario inputs */}
      <Card className="mt-4">
        <button onClick={() => setShowInputs(v => !v)} className="w-full px-4 py-3 flex items-center justify-between text-[13px] font-semibold text-[#0A1721]">
          <span className="flex items-center gap-2"><RefreshCw size={13} />Scenario Controls — adjust to recalculate live</span>
          <ChevronDown size={15} className={`transition-transform ${showInputs ? "rotate-180" : ""}`} />
        </button>
        {showInputs && (
          <div className="px-4 pb-4 grid grid-cols-3 gap-2 border-t border-[#EEE8DF] pt-3">
            {([["fundingReviewed", "Funding reviewed"], ["geographyAligned", "Geography aligned"], ["timingAligned", "Timing aligned"], ["transitionAligned", "Transition aligned"], ["accountingExperience", "Accounting experience"], ["buyerInterest", "Buyer interest"]] as [keyof MatchInputs, string][]).map(([k, l]) => (
              <button key={k} onClick={() => toggle(k)} className={`flex items-center justify-between px-3 py-2 rounded-[6px] border text-[12px] transition-all ${inputs[k] ? "bg-[#E7F2EF] border-[#A6D0C6] text-[#0A1721]" : "bg-white border-[#D7D0C4] text-[#65737A]"}`}>
                {l}
                <span className={`w-8 h-4 rounded-full relative transition-colors ${inputs[k] ? "bg-[#1A6B28]" : "bg-[#B0C4D8]"}`}><span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${inputs[k] ? "left-4" : "left-0.5"}`} /></span>
              </button>
            ))}
          </div>
        )}
      </Card>

      <div className="mt-4 flex gap-2 mb-4">
        <button onClick={() => setTab("analysis")} className={`px-4 py-2 text-[13px] font-medium rounded-[6px] border transition-all ${tab === "analysis" ? "bg-[#0A1721] text-white border-[#0A1721]" : "bg-white text-[#65737A] border-[#D7D0C4]"}`}>Tab 1 — Matching Analysis</button>
        <button onClick={() => setTab("shortlist")} className={`px-4 py-2 text-[13px] font-medium rounded-[6px] border transition-all ${tab === "shortlist" ? "bg-[#0A1721] text-white border-[#0A1721]" : "bg-white text-[#65737A] border-[#D7D0C4]"}`}>Tab 2 — Ranked Shortlist</button>
      </div>

      {tab === "analysis" ? (
        <div className="grid grid-cols-[1fr_300px] gap-5">
          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-1">
                <div className="text-[13px] font-semibold text-[#0A1721]">computeMatch({primary.name} × CT-1042)</div>
                <Badge variant={primaryMatch.eligibility === "Eligible" ? "approved" : primaryMatch.eligibility === "Needs Review" ? "pending" : "restricted"}>Eligibility: {primaryMatch.eligibility}</Badge>
              </div>
              <p className="text-[11px] text-[#65737A] mb-4">Transparent rules-based evaluation — not AI. Admin reviews every match before it becomes a recommendation.</p>
              <div className="text-[12px] font-semibold text-[#20313A] mb-2">Hard eligibility checks</div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mb-4">
                {Object.keys(primary.hard).map((k) => (
                  <div key={k} className="flex items-center gap-2 text-[12px]">
                    {primary.hard[k] ? <Check size={12} className="text-[#1A6B28]" /> : <X size={12} className="text-[#991B1B]" />}
                    <span className={primary.hard[k] ? "text-[#20313A]" : "text-[#991B1B]"}>{HARD_LABELS[k]}</span>
                  </div>
                ))}
              </div>
              <div className="text-[12px] font-semibold text-[#20313A] mb-2">Weighted fit factors <span className="font-normal text-[#65737A]">(Admin-only internal score: {primaryMatch.score})</span></div>
              <div className="space-y-1.5">
                {MATCH_WEIGHTS.map(([k, l, w]) => {
                  const v = primary.factors[k];
                  return (
                    <div key={k}>
                      <div className="flex justify-between text-[11px] mb-0.5"><span className="text-[#65737A]">{l} <span className="text-[#9AA4A9]">({w}%)</span></span><span className="font-medium text-[#20313A]">{v}</span></div>
                      <div className="h-1.5 bg-[#E7F2EF] rounded-full"><div className="h-full rounded-full transition-all" style={{ width: `${v}%`, backgroundColor: v >= 80 ? "#1A6B28" : v >= 60 ? "#92620A" : "#991B1B" }} /></div>
                    </div>
                  );
                })}
              </div>
            </Card>
            <Card className="p-6">
              <div className="text-[12px] font-semibold text-[#20313A] mb-2">Staff notes & actions</div>
              <Textarea id="matching-scenario-notes" ariaLabel="Matching scenario notes" value="Adjust the scenario controls above to see eligibility, match strength, and ranking recalculate. This remains separate from any deal-specific access request." rows={2} />
              <div className="flex gap-2 mt-3">
                <Btn variant="success"><Star size={14} />Recommend Match</Btn>
                <Btn variant="secondary">Hold</Btn>
                <Btn variant="destructive">Mark Ineligible</Btn>
              </div>
            </Card>
          </div>
          <div className="space-y-4">
            <Card className="p-6">
              <div className="text-[12px] font-semibold text-[#20313A] mb-2">Matching result (live)</div>
              <div className="space-y-2 text-[12px]">
                <div className="flex justify-between border-b border-[#EEE8DF] pb-1.5"><span className="text-[#65737A]">Match Strength</span><Badge variant={primaryMatch.strength}>{primaryMatch.strengthLabel}</Badge></div>
                <div className="flex justify-between border-b border-[#EEE8DF] pb-1.5"><span className="text-[#65737A]">Eligibility</span><span className="font-medium">{primaryMatch.eligibility}</span></div>
                <div className="flex justify-between border-b border-[#EEE8DF] pb-1.5"><span className="text-[#65737A]">Internal score</span><span className="font-medium">{primaryMatch.score}</span></div>
                <div className="flex justify-between"><span className="text-[#65737A]">Last evaluated</span><span className="font-medium">{primaryMatch.lastEvaluated}</span></div>
              </div>
            </Card>
            <Card className="p-6"><div className="text-[12px] font-semibold text-[#20313A] mb-1">Why Matched</div><p className="text-[12px] text-[#65737A]">{primaryMatch.whyMatched}</p></Card>
            {primaryMatch.failed.length > 0 && <Card className="p-6 border-l-4 border-l-[#991B1B]"><div className="text-[12px] font-semibold text-[#991B1B] mb-1">Failed hard checks</div><p className="text-[12px] text-[#65737A]">{primaryMatch.failed.join(", ")}</p></Card>}
            {primaryMatch.gaps.length > 0 && <Card className="p-6 border-l-4 border-l-[#92620A]"><div className="text-[12px] font-semibold text-[#92620A] mb-1">Gaps</div><p className="text-[12px] text-[#65737A]">{primaryMatch.gaps.join(", ")}</p></Card>}
            <Alert type="info">A ranked buyer has <strong>not</strong> automatically requested access. Matching & ranking are separate from the specific access-request review.</Alert>
          </div>
        </div>
      ) : (
        <div>
          <Alert type="info"><strong>rankMatches — ranking function.</strong> Orders eligible matches by priority. A buyer can be a Strong Fit yet rank below another Strong Fit.</Alert>
          <Card className="mt-4">
            <div className="px-4 py-3 border-b border-[#D7D0C4] grid grid-cols-[50px_1.4fr_110px_130px_1fr_140px] gap-3 text-[11px] font-semibold text-[#805A28] uppercase tracking-[0.14em]">
              <span>Rank</span><span>Buyer</span><span>Match</span><span>Funding</span><span>Why Ranked Here</span><span>Admin status</span>
            </div>
            {ranked.map((r) => (
              <div key={r.b.id} className="px-4 py-3 border-b border-[#EEE8DF] last:border-0 grid grid-cols-[50px_1.4fr_110px_130px_1fr_140px] gap-3 items-start hover:bg-[#FAFBFC]">
                <div className="w-8 h-8 rounded-full bg-[#0A1721] text-white flex items-center justify-center text-[13px] font-bold">#{r.rank}</div>
                <div><div className="text-[13px] font-medium text-[#20313A]">{r.b.name}</div><div className="text-[11px] text-[#65737A]">{r.b.org}</div><div className="text-[11px] text-[#65737A] mt-0.5">{r.b.experience} · {r.b.timing}</div></div>
                <Badge variant={r.m.strength}>{r.m.strengthLabel}</Badge>
                <span className="text-[12px] text-[#20313A]">{r.b.fundingLabel}</span>
                <span className="text-[11px] text-[#65737A]">{r.whyRanked}</span>
                <div className="flex flex-col gap-1">
                  <Badge variant={r.m.eligibility === "Eligible" ? "reviewing" : r.m.eligibility === "Needs Review" ? "restricted" : "locked"}>{r.m.eligibility}</Badge>
                  {r.b.requested && <span className="text-[10px] text-[#1A6B28]">Access requested</span>}
                </div>
              </div>
            ))}
          </Card>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <Card className="p-3"><div className="text-[11px] font-semibold text-[#805A28] uppercase tracking-[0.14em] mb-1">Algorithmically matched</div><div className="text-[13px] text-[#20313A]">{ranked.filter(r => r.m.eligibility !== "Ineligible").length} eligible / {ranked.length} evaluated</div></Card>
            <Card className="p-3"><div className="text-[11px] font-semibold text-[#805A28] uppercase tracking-[0.14em] mb-1">Ranked & Admin-reviewed</div><div className="text-[13px] text-[#20313A]">{ranked.length} ranked · pending human review</div></Card>
            <Card className="p-3"><div className="text-[11px] font-semibold text-[#805A28] uppercase tracking-[0.14em] mb-1">Specific access requested</div><div className="text-[13px] text-[#20313A]">{ranked.filter(r => r.b.requested).length} buyer(s)</div></Card>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Transaction Services data ────────────────────────────────────────────────
const TX_SERVICES = [
  { id: "counsel", name: "Transaction Counsel", icon: Scale, why: "Purchase agreement, disclosure schedules, legal diligence, entity & regulatory documents, closing documents.", provider: "External transaction counsel", coord: "Maya Chen", status: "engaged", scope: "Draft & negotiate APA, prepare disclosure schedules, legal closing checklist.", next: "Circulate first APA draft — Jul 18, 2026", responsible: "Counsel", disclaimer: "Provided by an engaged external lawyer or law firm. CPA Bridge coordinates the workflow but does not provide legal advice unless properly authorized and licensed." },
  { id: "mna", name: "M&A and Deal Advisory", icon: Briefcase, why: "Deal-structure support, negotiation coordination, offer & term comparison, financing coordination, closing preparation.", provider: "CPA Bridge Transaction Services", coord: "Maya Chen", status: "in-progress", scope: "Coordinate structure, normalize terms, manage process to close.", next: "Finalize funds-flow structure — Jul 20, 2026", responsible: "CPA Bridge", disclaimer: "CPA Bridge coordinates the deal process. Not a full investment bank unless legally established to operate as one." },
  { id: "acct", name: "Accounting and Tax Advisory", icon: BarChart3, why: "Quality-of-earnings support, working-capital review, tax structuring, purchase-price allocation, financial closing support.", provider: "Independent accounting adviser", coord: "Maya Chen", status: "engagement-pending", scope: "QoE review of 2024–2026 financials, working-capital target, PPA.", next: "Return engagement letter — Jul 15, 2026", responsible: "Buyer", disclaimer: "Provided under a separate engagement by an independent accounting or tax adviser. CPA Bridge coordinates the workflow but does not provide tax advice unless properly authorized and licensed." },
  { id: "financing", name: "Financing Coordination", icon: DollarSign, why: "Lender introductions, financing checklist, lender diligence, approval status, funding conditions, closing-funds coordination.", provider: "Pacific Northwest Bank", coord: "Maya Chen", status: "in-progress", scope: "Manage lender diligence list and approval; confirm funding conditions.", next: "Lender appraisal scheduled — Jul 25, 2026", responsible: "Buyer / Lender", disclaimer: "Financing arranged by the buyer's lender. CPA Bridge coordinates the checklist only." },
  { id: "escrow", name: "Escrow and Closing Administration", icon: Lock, why: "Escrow coordination, signature tracking, funds-flow checklist, closing deliverables, final closing confirmation.", provider: "Licensed escrow provider", coord: "Maya Chen", status: "provider-needed", scope: "Hold deposit, coordinate signatures & funds flow, confirm closing.", next: "Request CPA Bridge introduction", responsible: "Both parties", disclaimer: "Escrow services are provided under a separate engagement by a licensed escrow provider. CPA Bridge coordinates the closing workflow." },
  { id: "transition", name: "Employee, Client & Transition Planning", icon: Users, why: "Staff communication plan, client-notification plan, seller transition schedule, responsibility handoff, first-30/60/90-day tasks.", provider: "CPA Bridge Transaction Services", coord: "Maya Chen", status: "not-needed", scope: "Build communication plans and 30/60/90-day transition schedule.", next: "Begins after signing", responsible: "Seller + Buyer", disclaimer: "Transition planning support. Confidential staff/client details handled under existing NDA and seller control." },
];
const TX_STATUS: Record<string, { label: string; variant: string }> = {
  "not-needed": { label: "Not Yet Needed", variant: "locked" },
  "provider-needed": { label: "Provider Needed", variant: "pending" },
  "intro-requested": { label: "Introduction Requested", variant: "reviewing" },
  "provider-selected": { label: "Provider Selected", variant: "reviewing" },
  "engagement-pending": { label: "Engagement Pending", variant: "pending" },
  "engaged": { label: "Engaged", variant: "approved" },
  "in-progress": { label: "In Progress", variant: "active" },
  "waiting-client": { label: "Waiting on Client", variant: "pending" },
  "complete": { label: "Complete", variant: "complete" },
};

function ScreenTransactionServices({ onAdvance }: { onAdvance?: () => void }) {
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1"><Badge variant="active">CT-1042</Badge><Badge variant="approved"><Handshake size={11} />Offer accepted · Diligence complete</Badge></div>
          <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">CPA Bridge Transaction Services</h1>
          <p className="text-[13px] text-[#65737A] mt-1">Coordinate the professionals required to move from diligence to closing. CPA Bridge coordinates the workflow — it does not itself provide legal, tax, banking, or lending services.</p>
        </div>
        {onAdvance && <Btn onClick={onAdvance}>Confirm Selected Services <ArrowRight size={14} /></Btn>}
      </div>
      <Alert type="warn">Requesting an introduction or selecting a provider does <strong>not</strong> create an attorney-client, investment-banking, tax, or lending relationship. Those begin only with a signed engagement with the provider.</Alert>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {TX_SERVICES.map((s) => {
          const Icon = s.icon;
          const st = TX_STATUS[s.status];
          return (
            <Card key={s.id} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-[6px] bg-[#E7F2EF] flex items-center justify-center"><Icon size={16} className="text-[#0A1721]" /></div>
                  <div className="text-[14px] font-semibold text-[#20313A]">{s.name}</div>
                </div>
                <Badge variant={st.variant}>{st.label}</Badge>
              </div>
              <p className="text-[12px] text-[#65737A] mb-3">{s.why}</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[12px] mb-3">
                {[["Assigned provider", s.provider], ["CPA Bridge coordinator", s.coord], ["Responsible party", s.responsible], ["Next milestone", s.next]].map(([l, v]) => (
                  <div key={l}><div className="text-[12px] font-medium text-[#65737A]">{l}</div><div className="text-[#20313A]">{v}</div></div>
                ))}
              </div>
              <div className="bg-[#F6F1E8] rounded-[6px] p-2.5 text-[11px] text-[#65737A] mb-3"><span className="font-semibold text-[#20313A]">Scope: </span>{s.scope}</div>
              <div className="text-[10px] text-[#92620A] bg-[#FFF4CC] rounded-[6px] p-2 mb-3 flex gap-1.5"><Info size={11} className="flex-shrink-0 mt-0.5" />{s.disclaimer}</div>
              <div className="flex flex-wrap gap-1.5">
                {s.status === "not-needed" && <Btn size="sm" variant="secondary">Request CPA Bridge Introduction</Btn>}
                {s.status === "provider-needed" && <><Btn size="sm">Request CPA Bridge Introduction</Btn><Btn size="sm" variant="secondary">Select Provider</Btn></>}
                {s.status === "engagement-pending" && <><Btn size="sm" variant="secondary">Review Scope</Btn><Btn size="sm">Upload Engagement Letter</Btn></>}
                {(s.status === "engaged" || s.status === "in-progress") && <><Btn size="sm" variant="secondary">Review Scope</Btn><Btn size="sm" variant="secondary">Assign Task</Btn><Btn size="sm" variant="ghost">Contact CPA Bridge</Btn></>}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── Screen: Step 18 — Diligence Completed ────────────────────────────────────
function ScreenDiligenceComplete({ onAdvance }: { onAdvance: () => void }) {
  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1"><Badge variant="active">CT-1042</Badge></div>
          <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">Diligence Review — Completion Decision</h1>
          <p className="text-[13px] text-[#65737A] mt-1">Phase 1 → Phase 2 handoff. Completing diligence is a deliberate decision — closing is not automatic.</p>
        </div>
      </div>
      <Alert type="info"><strong>Diligence is not closing.</strong> Marking diligence complete moves the deal into Transaction Execution & Closing, where required advisers are engaged and definitive documents are prepared.</Alert>
      <Card className="mt-4 p-6">
        <div className="text-[13px] font-semibold text-[#20313A] mb-3">Diligence summary by category</div>
        <div className="grid grid-cols-2 gap-2">
          {[["Financial", "complete"], ["Tax", "complete"], ["Clients", "complete"], ["Employees", "complete"], ["Contracts", "complete"], ["Lease", "complete"], ["Legal", "reviewing"], ["Technology", "complete"], ["Insurance", "complete"], ["Transition", "reviewing"]].map(([c, s]) => (
            <div key={c} className="flex items-center justify-between border border-[#EEE8DF] rounded-[6px] px-3 py-2">
              <span className="text-[12px] text-[#20313A]">{c}</span>
              <Badge variant={s === "complete" ? "complete" : "reviewing"}>{s === "complete" ? "Resolved" : "Final review"}</Badge>
            </div>
          ))}
        </div>
      </Card>
      <Card className="mt-4 p-6">
        <div className="text-[13px] font-semibold text-[#20313A] mb-2">Diligence decision</div>
        <Select id="diligence-decision" ariaLabel="Diligence decision" value="Complete diligence — proceed to execution" options={["Complete diligence — proceed to execution", "Continue", "Renegotiate", "Pause", "End deal"]} />
        <div className="flex gap-2 mt-4">
          <Btn onClick={onAdvance} variant="success"><CheckCircle2 size={14} />Complete Diligence</Btn>
          <Btn variant="secondary">Renegotiate</Btn>
          <Btn variant="secondary">Pause</Btn>
          <Btn variant="destructive">End Deal</Btn>
        </div>
      </Card>
    </div>
  );
}

// ─── Screen: Step 20 — Definitive Documents & Financing ───────────────────────
function ScreenDefinitiveDocs({ onAdvance }: { onAdvance: () => void }) {
  const items = [
    { doc: "Asset Purchase Agreement", cat: "Legal", owner: "Transaction Counsel", status: "in-progress", due: "Jul 18, 2026" },
    { doc: "Disclosure Schedules", cat: "Legal", owner: "Seller + Counsel", status: "waiting-client", due: "Jul 22, 2026" },
    { doc: "Quality-of-Earnings Report", cat: "Accounting", owner: "Cascade QoE Advisors", status: "in-progress", due: "Jul 24, 2026" },
    { doc: "Working-Capital Target", cat: "Accounting", owner: "M&A and Deal Advisory", status: "pending", due: "Jul 26, 2026" },
    { doc: "Lender Credit Approval", cat: "Financing", owner: "Pacific Northwest Bank", status: "in-progress", due: "Aug 5, 2026" },
    { doc: "Purchase-Price Allocation", cat: "Tax", owner: "Accounting & Tax Advisory", status: "pending", due: "Aug 10, 2026" },
  ];
  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1"><Badge variant="active">CT-1042</Badge><Badge variant="pending">Phase 2 · Execution</Badge></div>
        <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">Definitive Documents & Financing</h1>
        <p className="text-[13px] text-[#65737A] mt-1">Counsel and advisers prepare definitive documentation and financing. CPA Bridge coordinates the workflow across providers.</p>
      </div>
      <Card>
        <div className="px-5 py-3 border-b border-[#D7D0C4] grid grid-cols-[1.6fr_110px_1fr_120px_110px] gap-3 text-[11px] font-semibold text-[#805A28] uppercase tracking-[0.14em]">
          <span>Document</span><span>Category</span><span>Owner</span><span>Status</span><span>Due</span>
        </div>
        {items.map((it, i) => (
          <div key={i} className="px-5 py-3 border-b border-[#EEE8DF] last:border-0 grid grid-cols-[1.6fr_110px_1fr_120px_110px] gap-3 items-center">
            <span className="text-[13px] text-[#20313A]">{it.doc}</span>
            <span className="text-[12px] text-[#65737A]">{it.cat}</span>
            <span className="text-[12px] text-[#65737A]">{it.owner}</span>
            <Badge variant={TX_STATUS[it.status]?.variant ?? "pending"}>{TX_STATUS[it.status]?.label ?? it.status}</Badge>
            <span className="text-[12px] text-[#65737A]">{it.due}</span>
          </div>
        ))}
      </Card>
      <div className="mt-4 flex gap-2">
        <Btn onClick={onAdvance} variant="success"><CheckCircle2 size={14} />Mark Definitive Docs Prepared</Btn>
        <Btn variant="secondary">Assign Task</Btn>
        <Btn variant="ghost">Contact CPA Bridge</Btn>
      </div>
    </div>
  );
}

// ─── Post-Diligence / Closing Dashboard (Step 21 + sidebar) ───────────────────
function ScreenClosing({ ready = false, onConfirmReady, onClose }: { ready?: boolean; onConfirmReady?: () => void; onClose?: () => void }) {
  const conditions = [
    ["Definitive agreement signed", "reviewing"], ["Lender credit approval", "in-progress"],
    ["Disclosure schedules finalized", "waiting-client"], ["Working-capital target agreed", "pending"],
    ["Escrow funded", "pending"], ["Regulatory & license transfers", "pending"],
  ] as [string, string][];
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1"><Badge variant="active">CT-1042</Badge><Badge variant="pending">Phase 2 · Closing</Badge></div>
        <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">Post-Diligence Closing Workspace</h1>
        <p className="text-[13px] text-[#65737A] mt-1">Target close: September 30, 2026. Closing is not automatic — outstanding conditions must be resolved first.</p>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[["Definitive agreement", "In negotiation"], ["Financing", "Lender diligence"], ["Escrow", "Not yet funded"], ["Transition start", "Oct 1, 2026"]].map(([l, v]) => (
          <Card key={l} className="p-3"><div className="text-[12px] font-medium text-[#65737A] mb-1">{l}</div><div className="text-[13px] font-semibold text-[#20313A]">{v}</div></Card>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_300px] gap-5">
        <div className="space-y-4">
          <Card className="p-6">
            <div className="text-[13px] font-semibold text-[#20313A] mb-3">Closing conditions</div>
            <div className="space-y-2">
              {conditions.map(([l, s]) => (
                <div key={l} className="flex items-center justify-between border-b border-[#EEE8DF] pb-2 last:border-0">
                  <span className="text-[13px] text-[#20313A]">{l}</span>
                  <Badge variant={TX_STATUS[s]?.variant ?? "pending"}>{TX_STATUS[s]?.label ?? s}</Badge>
                </div>
              ))}
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6">
              <div className="text-[12px] font-semibold text-[#20313A] mb-2">Signature status</div>
              {[["Seller — Elena Martinez", false], ["Buyer — Marcus Lee", false], ["Escrow agent", false]].map(([l, done]) => (
                <div key={String(l)} className="flex items-center gap-2 text-[12px] py-1"><div className={`w-4 h-4 rounded-full flex items-center justify-center ${done ? "bg-[#1A6B28]" : "border border-[#D7D0C4]"}`}>{done && <Check size={9} className="text-white" />}</div><span className={done ? "text-[#20313A]" : "text-[#9AA4A9]"}>{String(l)}</span></div>
              ))}
            </Card>
            <Card className="p-6">
              <div className="text-[12px] font-semibold text-[#20313A] mb-2">Funds flow</div>
              {[["Cash at close $1.96M", "pending"], ["Seller note $245K", "pending"], ["Earnout $245K", "pending"]].map(([l, s]) => (
                <div key={String(l)} className="flex items-center justify-between text-[12px] py-1"><span className="text-[#65737A]">{String(l)}</span><Badge variant="pending">Not funded</Badge></div>
              ))}
            </Card>
          </div>
          <Card className="p-6">
            <div className="text-[13px] font-semibold text-[#20313A] mb-3">Transition planning (begins at close)</div>
            <div className="grid grid-cols-3 gap-3">
              {[["First 30 days", "Client notification, staff introductions, systems access"], ["First 60 days", "Owner-led client handoffs, workflow shadowing"], ["First 90 days", "Full responsibility handoff, retention check-in"]].map(([l, v]) => (
                <div key={l} className="bg-[#F6F1E8] rounded-[6px] p-3"><div className="text-[11px] font-semibold text-[#0A1721] mb-1">{l}</div><div className="text-[11px] text-[#65737A]">{v}</div></div>
              ))}
            </div>
          </Card>
          {(onConfirmReady || onClose) && (
            <div className="space-y-3">
              {!ready && onConfirmReady && (
                <div className="flex gap-2">
                  <Btn onClick={onConfirmReady} variant="success"><CheckCircle2 size={14} />Confirm Ready to Close</Btn>
                  <Btn variant="secondary">Conditions Outstanding</Btn>
                  <Btn variant="secondary">Delay</Btn>
                </div>
              )}
              {ready && onClose && (
                <div className="rounded-[10px] border border-[#B8D7C7] bg-[#EFF8F3] p-4">
                  <div className="text-[12px] font-semibold text-[#1A6B28]">Closing readiness confirmed</div>
                  <p className="mt-1 text-[11px] text-[#65737A]">The final closing action remains separate and should occur only after signatures and funds flow are confirmed.</p>
                  <div className="mt-3"><Btn onClick={onClose} variant="success"><Handshake size={14} />Record Closing & Begin Transition</Btn></div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="space-y-4">
          <Card className="p-6">
            <div className="text-[12px] font-semibold text-[#20313A] mb-2">Communication plans</div>
            <div className="space-y-2 text-[12px]">
              <div className="flex justify-between border-b border-[#EEE8DF] pb-1.5"><span className="text-[#65737A]">Client notification</span><Badge variant="pending">Draft</Badge></div>
              <div className="flex justify-between"><span className="text-[#65737A]">Employee communication</span><Badge variant="pending">Draft</Badge></div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-[12px] font-semibold text-[#20313A] mb-2">Current owner & next action</div>
            <p className="text-[12px] text-[#65737A]">Waiting on <strong>Transaction Counsel</strong> to circulate the APA draft. Seller owns disclosure schedules next.</p>
          </Card>
          <Card className="p-6 border-l-4 border-l-[#991B1B]">
            <div className="text-[12px] font-semibold text-[#991B1B] mb-1 flex items-center gap-1"><AlertTriangle size={12} />Overdue</div>
            <p className="text-[12px] text-[#65737A]">Engagement letter for Accounting & Tax Advisory due Jul 15, 2026 — awaiting buyer signature.</p>
          </Card>
          <ContactCard />
        </div>
      </div>
    </div>
  );
}

// ─── Staff Dashboard (accessible from sidebar) ────────────────────────────────
function ScreenStaffDashboard() {
  const kpis = [
    { label: "Active listings", value: "4" }, { label: "Sellers in prep", value: "7" },
    { label: "Buyers awaiting review", value: "3" }, { label: "Approved buyers", value: "18" },
    { label: "Access requests", value: "5" }, { label: "Seller decisions pending", value: "2" },
    { label: "Offers", value: "1" }, { label: "Diligence deals", value: "1" },
  ];
  const queue = [
    { type: "Seller listing approval", item: "CT-1043 — Tacoma CPA Group", priority: "high" },
    { type: "Missing seller files", item: "CT-1041 — 2026 YTD not uploaded", priority: "high" },
    { type: "Buyer approval", item: "James Patel — Pacific Equity Partners", priority: "medium" },
    { type: "Access-request review", item: "Marcus Lee → CT-1042", priority: "high" },
    { type: "Match shortlist review", item: "CT-1043 — 4 buyers to review", priority: "medium" },
    { type: "Document release", item: "CT-1042 → Evergreen AP", priority: "high" },
  ];
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="mb-6">
        <h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">CPA Bridge Staff Dashboard</h1>
        <p className="text-[13px] text-[#65737A] mt-1">Maya Chen — Deal Lead — {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {kpis.map((k) => (
          <Card key={k.label} className="p-6">
            <div className="text-[24px] font-bold text-[#0A1721]">{k.value}</div>
            <div className="text-[12px] text-[#65737A]">{k.label}</div>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_300px] gap-5">
        <Card>
          <div className="px-5 py-3 border-b border-[#D7D0C4] text-[13px] font-semibold text-[#20313A]">Work Queue</div>
          {queue.map((q, i) => (
            <div key={i} className="px-5 py-3 border-b border-[#EEE8DF] last:border-0 flex items-center justify-between hover:bg-[#FAFBFC] group">
              <div>
                <div className="text-[11px] font-semibold text-[#805A28] uppercase tracking-[0.14em] mb-0.5">{q.type}</div>
                <div className="text-[13px] text-[#20313A]">{q.item}</div>
              </div>
              <div className="flex items-center gap-2">
                {q.priority === "high" && <Badge variant="major-concern">High priority</Badge>}
                {q.priority === "medium" && <Badge variant="pending">Medium</Badge>}
                <button className="text-[11px] text-[#805A28] opacity-0 group-hover:opacity-100 flex items-center gap-1">Open <ChevronRight size={11} /></button>
              </div>
            </div>
          ))}
        </Card>
        <div className="space-y-4">
          <Card className="p-6">
            <div className="text-[12px] font-semibold text-[#20313A] mb-3">Active deals</div>
            {[{ id: "CT-1042", name: "Martinez Tax & Advisory", stage: "Diligence", fit: "clear" }, { id: "CT-1043", name: "Tacoma CPA Group", stage: "Listing review", fit: "needs-work" }, { id: "CT-1041", name: "Olympia Tax Partners", stage: "Files incomplete", fit: "major-concern" }].map(d => (
              <div key={d.id} className="flex items-center gap-2 py-2 border-b border-[#EEE8DF] last:border-0">
                <Badge variant="active">{d.id}</Badge>
                <div className="flex-1 min-w-0"><div className="text-[12px] font-medium text-[#20313A] truncate">{d.name}</div><div className="text-[11px] text-[#65737A]">{d.stage}</div></div>
                <Badge variant={d.fit}>{d.fit === "clear" ? "On track" : d.fit === "needs-work" ? "Action needed" : "Blocked"}</Badge>
              </div>
            ))}
          </Card>
          <Alert type="warn">2 seller decisions pending. Follow up with Elena Martinez and check CT-1043 seller response to buyer shortlist.</Alert>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════
//  MODULE INFRASTRUCTURE — three separate role modules on one shared record
// ═══════════════════════════════════════════════════════════════════════════
type NavItem = {
  key: string; label: string; icon: any; done?: boolean;
  locked?: boolean; lockMsg?: string;
  render: (go: (k: string) => void) => React.ReactNode;
};
type ModuleUser = { name: string; org: string; roleLabel: string; initials: string; accent: string };

function LockedPreview({ title, msg }: { title: string; msg: string }) {
  return (
    <div className="relative mx-auto mt-4 max-w-[980px] overflow-hidden rounded-[10px] border border-[#D7D0C4] bg-[#F8F5EF] shadow-[0_8px_24px_rgba(10,23,33,0.08)]">
      <div className="pointer-events-none select-none opacity-35 blur-[1.5px]">
        <div className="border-b border-[#D7D0C4] bg-white px-7 py-6"><div className="h-3 w-24 rounded-[6px] bg-[#D8C09A]" /><div className="mt-4 h-8 w-72 rounded-[6px] bg-[#20313A]" /><div className="mt-3 h-3 w-[520px] max-w-[80%] rounded-[6px] bg-[#AEB7BB]" /></div>
        <div className="grid gap-5 p-7 md:grid-cols-[1.3fr_.7fr]">
          <div className="space-y-4"><div className="h-28 rounded-[10px] border border-[#D7D0C4] bg-white" /><div className="grid grid-cols-3 gap-3">{[1,2,3].map(i => <div key={i} className="h-20 rounded-[10px] border border-[#D7D0C4] bg-white" />)}</div><div className="h-44 rounded-[10px] border border-[#D7D0C4] bg-white" /></div>
          <div className="space-y-4"><div className="h-36 rounded-[10px] border border-[#D7D0C4] bg-white" /><div className="h-28 rounded-[10px] border border-[#D7D0C4] bg-white" /></div>
        </div>
      </div>
      <div className="absolute inset-0 grid place-items-center bg-[#F6F1E8]/56 p-6 backdrop-blur-[1px]">
        <div className="max-w-[520px] rounded-[10px] border border-white/70 bg-white/88 px-7 py-7 text-center backdrop-blur-xl shadow-[0_18px_48px_rgba(10,23,33,0.14)]">
          <div className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-[#F2E7D5]"><Lock size={19} className="text-[#805A28]" /></div>
          <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#805A28]">Coming up next</div>
          <h2 className="cb-display mt-2 text-[26px] font-semibold leading-tight text-[#0A1721]">{title}</h2>
          <p className="mx-auto mt-3 max-w-[440px] text-[13px] leading-6 text-[#51646D]">{msg}</p>
          <div className="mt-5 inline-flex"><Badge variant="locked"><Lock size={12} />Prerequisite required</Badge></div>
        </div>
      </div>
    </div>
  );
}

function GenericPage({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[980px]">
      <div className="mb-6 border-b border-[#D7D0C4] pb-5"><h1 className="cb-display text-[30px] font-semibold leading-tight text-[#0A1721]">{title}</h1></div>
      {children}
    </div>
  );
}

function MessagesPage({ user, state }: { user: ModuleUser; state?: DemoState }) {
  const isSeller = user.roleLabel.toLowerCase().includes("seller");
  const isBuyer = user.roleLabel.toLowerCase().includes("buyer");
  const msgs = isSeller ? [
    { from: "Maya Chen", role: "CPA Bridge Deal Lead", time: "Today, 9:12 AM", text: state?.offerSubmitted ? "I reviewed the offer package. Before our call, I’ll send a side-by-side summary of cash at closing, contingencies, transition expectations, and the remaining diligence conditions." : "Your readiness review is moving forward. I marked one tax return for replacement and added a short note explaining exactly what is needed before Thursday’s call." },
    { from: "Maya Chen", role: "CPA Bridge Deal Lead", time: "Yesterday", text: state?.filesUploaded ? "Thank you for uploading the financial package. We are reconciling the periods and preparing a focused list of follow-up questions so you do not have to sort through a broad diligence request." : "I added the initial document checklist to your workspace. You can begin with tax returns, profit-and-loss statements, staffing information, and the client-concentration summary." },
  ] : isBuyer ? [
    { from: "Maya Chen", role: "CPA Bridge Deal Lead", time: "Today, 10:04 AM", text: state?.documentsReleased ? "The seller approved the selected document package for CT-1042. Please review the access terms before opening the files, and send questions through this thread so the response can be coordinated." : "Your buyer profile is under review. We are checking funding readiness, acquisition criteria, operating experience, and timing before recommendations are released." },
    { from: "Maya Chen", role: "CPA Bridge Deal Lead", time: "Yesterday", text: state?.accessRequested ? "Your access request is in the seller-review queue. No additional action is required unless we ask for a clarification on funding, transition plans, or your reason for interest." : "I added three opportunities that align with your stated geography and service mix. Match strength and ranking are shown separately so you can understand both fit and priority." },
  ] : [
    { from: "Maya Chen", role: "Deal Lead", time: "Today, 8:42 AM", text: state?.sellerAccessApproved ? "Seller approval is complete for CT-1042. Please verify the selected release package, watermark settings, and access expiration before releasing documents." : "CT-1042 is ready for the next review checkpoint. The outstanding items are clearly assigned in the seller and buyer workspaces." },
    { from: "Transaction Operations", role: "CPA Bridge", time: "Yesterday", text: state?.diligenceCompleted ? "Diligence has been marked complete. Confirm the service-provider engagements and closing-readiness conditions before the final close action becomes available." : "Two reviews need attention today: one buyer funding check and one seller document correction." },
  ];
  return (
    <GenericPage title="Messages">
      <Card className="divide-y divide-[#EEE8DF] overflow-hidden">
        {msgs.map((m, i) => (
          <div key={i} className="flex gap-3 p-6 transition-colors hover:bg-[#FBF8F2]">
            <Avatar initials={m.from === "Transaction Operations" ? "TO" : "MC"} role="staff" size="md" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1"><span className="text-[14px] font-semibold text-[#20313A]">{m.from}</span><span className="text-[12px] text-[#65737A]">{m.role}</span><span className="ml-auto text-[11px] text-[#8C989D]">{m.time}</span></div>
              <p className="mt-2 text-[13px] leading-6 text-[#51646D]">{m.text}</p>
            </div>
          </div>
        ))}
      </Card>
      <div className="mt-4 flex gap-3">
        <input aria-label={`Message CPA Bridge as ${user.name}`} placeholder={`Message CPA Bridge as ${user.name}...`} className="cb-field flex-1 border border-[#CFC6B9] bg-white px-3.5 py-2.5 text-[14px] focus:outline-none" />
        <Btn><Send size={16} />Send</Btn>
      </div>
    </GenericPage>
  );
}

function AccountSettingsPage({ user }: { user: ModuleUser }) {
  return (
    <GenericPage title="Account Settings">
      <div className="space-y-4">
        <Card className="p-6">
          <div className="text-[16px] font-semibold text-[#20313A] mb-5 pb-3 border-b border-[#D7D0C4]">Personal Information</div>
          <div className="grid grid-cols-2 gap-4">
            <div><FieldLabel htmlFor="field-065">Name</FieldLabel><Input value={user.name}  id="field-065" /></div>
            <div><FieldLabel htmlFor="field-066">Organization</FieldLabel><Input value={user.org}  id="field-066" /></div>
            <div><FieldLabel htmlFor="field-067">Email</FieldLabel><Input value={user.name.toLowerCase().replace(/[^a-z]/g, ".") + "@example.com"}  id="field-067" /></div>
            <div><FieldLabel htmlFor="field-068">Phone</FieldLabel><Input value="(206) 555-0187"  id="field-068" /></div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-[16px] font-semibold text-[#20313A] mb-5 pb-3 border-b border-[#D7D0C4]">Security</div>
          <div className="space-y-2">
            {[["Change password", "Last changed 3 months ago"], ["Multi-factor authentication", "Enabled — authenticator app"], ["Active sessions", "2 devices"]].map(([l, v]) => (
              <div key={String(l)} className="flex items-center justify-between py-2 border-b border-[#EEE8DF] last:border-0">
                <div><div className="text-[13px] text-[#20313A]">{l}</div><div className="text-[11px] text-[#65737A]">{v}</div></div>
                <Btn variant="secondary" size="sm">Manage</Btn>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-[16px] font-semibold text-[#20313A] mb-5 pb-3 border-b border-[#D7D0C4]">Notification Preferences</div>
          {[["Email notifications", true], ["In-product notifications", true], ["SMS for critical events", false]].map(([l, on]) => (
            <div key={String(l)} className="flex items-center justify-between py-2"><span className="text-[13px] text-[#20313A]">{String(l)}</span><span className={`w-9 h-5 rounded-full relative ${on ? "bg-[#A8793A]" : "bg-[#CFC6B9]"}`}><span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white ${on ? "left-4" : "left-0.5"}`} /></span></div>
          ))}
        </Card>
        <div className="flex gap-2">
          <Btn variant="secondary">Download my data</Btn>
          <Btn variant="secondary">Sign out of other sessions</Btn>
          <Btn variant="destructive">Request account deletion</Btn>
        </div>
      </div>
    </GenericPage>
  );
}

function HelpPage() {
  return (
    <GenericPage title="Help & Contact CPA Bridge">
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <Card className="p-6">
          <div className="mb-4 text-[16px] font-semibold text-[#20313A]">Frequently asked questions</div>
          {[ ["How is my confidentiality protected?", "Your firm identity and documents are never shown to buyers without your explicit, stage-by-stage approval. Anonymous listings hide identifying details, and every private release is recorded."], ["Does signing an NDA release my documents?", "No. An NDA makes a specific request eligible for review. Documents are released only after the seller approves that buyer and CPA Bridge performs a separate release action."], ["What does CPA Bridge do versus the software?", "Your CPA Bridge team owns the relationship, judgment calls, preparation, buyer review, offer analysis, and transaction coordination. The workspace keeps tasks, files, decisions, and permissions organized."], ["Where should I start if I am unsure?", "Open your dashboard and begin with Your next action. Your deal lead can explain any request before you upload information or make a decision."] ].map(([q, a]) => (
            <div key={q} className="border-b border-[#EEE8DF] py-4 last:border-0"><div className="text-[14px] font-semibold text-[#20313A]">{q}</div><div className="mt-1.5 text-[13px] leading-6 text-[#51646D]">{a}</div></div>
          ))}
        </Card>
        <ContactCard />
      </div>
    </GenericPage>
  );
}

// ─── Notifications ────────────────────────────────────────────────────────────
function notificationsFor(role: Role, state: DemoState) {
  const N = (icon: any, title: string, time: string, unread = false) => ({ icon, title, time, unread });
  if (role === "seller") return [
    state.offerSubmitted && N(DollarSign, "New offer received from an approved buyer", "10m ago", true),
    state.bridgeRequestReviewed && !state.sellerAccessApproved && N(UserCheck, "Buyer access decision required — Marcus Lee", "1h ago", true),
    state.filesUploaded && N(FileWarning, "CPA Bridge requested a corrected 2024 tax return", "Yesterday"),
    N(Phone, "Readiness call scheduled with Maya Chen", "2 days ago"),
  ].filter(Boolean);
  if (role === "buyer") return [
    state.documentsReleased && N(Folder, "Documents released for CT-1042", "5m ago", true),
    state.buyerApproved && N(CheckCircle2, "Your buyer profile was approved", "1h ago", state.buyerApproved && !state.anonymousListingViewed),
    state.accessRequested && !state.documentsReleased && N(Clock, "Access request under CPA Bridge review", "3h ago"),
    N(Star, "New recommended listing matches your criteria", "Yesterday"),
  ].filter(Boolean);
  return [
    N(User, "New seller inquiry — Olympia Tax Partners", "8m ago", true),
    state.ndaSigned && !state.bridgeRequestReviewed && N(Shield, "Access request ready for review — Marcus Lee", "20m ago", true),
    state.sellerAccessApproved && !state.documentsReleased && N(Send, "Document release pending — CT-1042", "1h ago", true),
    N(AlertTriangle, "Closing condition overdue — engagement letter", "Yesterday"),
  ].filter(Boolean);
}

function NotificationsPanel({ role, state, onClose }: { role: Role; state: DemoState; onClose: () => void }) {
  const items = notificationsFor(role, state) as any[];
  return (
    <div className="cb-panel-enter absolute right-5 top-[68px] z-50 w-[380px] overflow-hidden rounded-[10px] border border-white/70 bg-white/88 backdrop-blur-xl shadow-[0_18px_48px_rgba(10,23,33,0.16)]">
      <div className="flex items-center justify-between border-b border-[#E5DED3] bg-[#FBF8F2] px-5 py-4">
        <div><span className="text-[14px] font-semibold text-[#20313A]">Notifications</span><div className="mt-0.5 text-[11px] text-[#65737A]">Updates that may require your attention</div></div>
        <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full text-[#65737A] transition-colors hover:bg-white hover:text-[#20313A]"><X size={16} /></button>
      </div>
      {items.length === 0 ? (
        <div className="px-8 py-12 text-center"><div className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-[#F2E7D5]"><Bell size={24} className="text-[#805A28]" /></div><div className="mt-4 text-[15px] font-semibold text-[#20313A]">You are all caught up</div><p className="mx-auto mt-1 max-w-[260px] text-[12px] leading-5 text-[#65737A]">New requests, document updates, and decision points will appear here.</p></div>
      ) : (
        <div className="max-h-[390px] divide-y divide-[#EEE8DF] overflow-y-auto">
          {items.map((n, i) => {
            const Icon = n.icon;
            return (
              <div key={i} className={`flex gap-3 px-5 py-4 transition-colors hover:bg-[#FBF8F2] ${n.unread ? "bg-[#F7F1E6]" : ""}`}>
                <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-[#F2E7D5]"><Icon size={14} className="text-[#805A28]" /></div>
                <div className="min-w-0 flex-1"><div className="text-[13px] leading-5 text-[#20313A]">{n.title}</div><div className="mt-1 text-[11px] text-[#8C989D]">{n.time}</div></div>
                {n.unread && <div className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#A8793A]" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Module Shell ─────────────────────────────────────────────────────────────
function ModuleShell({ moduleName, moduleColor, user, role, state, nav, onExit }: {
  moduleName: string; moduleColor: string; user: ModuleUser; role: Role; state: DemoState;
  nav: NavItem[]; onExit: () => void;
}) {
  const [activeKey, setActiveKey] = useState(nav[0].key);
  const [showNotif, setShowNotif] = useState(false);
  const active = nav.find(n => n.key === activeKey) ?? nav[0];
  const go = (k: string) => { setActiveKey(k); };
  const unread = (notificationsFor(role, state) as any[]).filter(n => n.unread).length;
  const groupFor = (key: string) => {
    if (role === "seller") return ["messages", "settings", "help"].includes(key) ? "ACCOUNT" : "YOUR DEAL";
    if (role === "buyer") return ["messages", "settings", "help"].includes(key) ? "ACCOUNT" : "YOUR ACQUISITION";
    if (["audit"].includes(key)) return "GOVERNANCE";
    if (["messages", "settings"].includes(key)) return "ACCOUNT";
    return "DEAL OPERATIONS";
  };
  let previousGroup = "";
  return (
    <div className="relative flex flex-1 overflow-hidden bg-[#F4F0E8]">
      <div className="flex w-[252px] flex-shrink-0 flex-col border-r border-[#D7D0C4] bg-[#FCFAF6]">
        <div className="border-b border-[#D7D0C4] px-5 py-5">
          <div className="flex items-center gap-3">
            <Avatar initials={user.initials} role={role} size="md" />
            <div className="min-w-0"><div className="truncate text-[13px] font-semibold text-[#20313A]">{user.name}</div><div className="mt-0.5 truncate text-[11px] text-[#65737A]">{user.org}</div></div>
          </div>
          <div className="mt-3"><Badge variant="active">{moduleName}</Badge></div>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {nav.map((item) => {
            const isActive = activeKey === item.key;
            const Icon = item.icon;
            const group = groupFor(item.key);
            const showGroup = group !== previousGroup;
            previousGroup = group;
            return (
              <div key={item.key}>
                {showGroup && <div className={`${group === "YOUR DEAL" || group === "YOUR ACQUISITION" || group === "DEAL OPERATIONS" ? "mt-1" : "mt-5"} px-3 pb-2 pt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A7A63]`}>{group}</div>}
                <button onClick={() => setActiveKey(item.key)}
                  className={`cb-sidebar-item mb-1 flex w-full items-center gap-3 rounded-[6px] border-l-2 px-3 py-2.5 text-left text-[13px] ${isActive ? "border-[#A8793A] bg-[#F2E7D5] font-semibold text-[#0A1721] shadow-[inset_0_0_0_1px_rgba(168,121,58,0.08)]" : "border-transparent text-[#65737A] hover:bg-white hover:text-[#20313A]"}`}>
                  <Icon size={16} className={isActive ? "text-[#805A28]" : item.locked ? "text-[#BBB3A8]" : "text-current"} />
                  <span className="flex-1">{item.label}</span>
                  {item.locked && <Lock size={12} className="text-[#BBB3A8]" />}
                  {item.done && !item.locked && <Check size={12} className="text-[#2F6A4F]" />}
                </button>
              </div>
            );
          })}
        </nav>
        <div className="border-t border-[#D7D0C4] px-5 py-4">
          <button onClick={onExit} className="flex w-full items-center gap-2 text-[12px] text-[#65737A] transition-colors hover:text-[#20313A]"><ChevronRight size={12} className="rotate-180" />Sign out</button>
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex min-h-[64px] flex-shrink-0 items-center gap-3 border-b border-[#D7D0C4] bg-white px-6 shadow-[0_2px_8px_rgba(10,23,33,0.05)]">
          <span className="text-[12px] text-[#65737A]">{moduleName}</span><ChevronRight size={12} className="text-[#B3AAA0]" /><span className="text-[13px] font-semibold text-[#20313A]">{active.label}</span>
          <div className="flex-1" />
          <button onClick={() => setShowNotif(v => !v)} className="relative grid h-10 w-10 place-items-center rounded-[6px] text-[#65737A] transition-colors hover:bg-[#F2E7D5] hover:text-[#0A1721]" aria-label="Open notifications">
            <Bell size={18} />
            {unread > 0 && <span className="absolute -right-1 -top-1 flex min-h-[19px] min-w-[19px] items-center justify-center rounded-full bg-[#A34B45] px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">{unread > 99 ? "99+" : unread}</span>}
          </button>
        </div>
        {showNotif && <NotificationsPanel role={role} state={state} onClose={() => setShowNotif(false)} />}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mb-6"><Alert type="warn"><strong>Demo only.</strong> Fictional people and firms. Identity, funding, files, signatures, security, and payments are simulated.</Alert></div>
          {active.locked ? <LockedPreview title={active.label} msg={active.lockMsg ?? "Complete the earlier steps in this deal before this action becomes available."} /> : active.render(go)}
        </main>
      </div>
    </div>
  );
}

// ─── Deal status strip used in dashboards ─────────────────────────────────────
function DealStatusRow({ label, done, current }: { label: string; done: boolean; current?: boolean }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className={`grid h-5 w-5 flex-shrink-0 place-items-center rounded-full ${done ? "bg-[#2F6A4F]" : current ? "border-2 border-[#A8793A] bg-[#F6F1E8]" : "border border-[#D7D0C4] bg-[#F3F1ED]"}`}>
        {done ? <Check size={10} className="text-white" /> : current ? <div className="h-2 w-2 rounded-full bg-[#A8793A]" /> : null}
      </div>
      <span className={`text-[12px] ${done ? "text-[#20313A]" : current ? "font-semibold text-[#805A28]" : "text-[#9AA4A9]"}`}>{label}</span>
      {current && <Badge variant="active" className="ml-auto">Current</Badge>}
    </div>
  );
}

function DashHeader({ title, sub }: { title: string; sub: string }) {
  return <div className="mb-7 border-b border-[#D7D0C4] pb-5"><h1 className="cb-display text-[32px] font-semibold leading-tight text-[#0A1721]">{title}</h1><p className="mt-2 text-[14px] leading-6 text-[#65737A]">{sub}</p></div>;
}

function SellerDashboard({ state, go }: { state: DemoState; go: (k: string) => void }) {
  const [showWelcome, setShowWelcome] = useState(true);
  const nextAction =
    !state.businessSaved ? ["Complete your practice profile", "profile"] :
    !state.filesUploaded ? ["Upload the documents needed for readiness review", "documents"] :
    !state.sellerListingApproved && state.readinessReviewed ? ["Review and approve your listing", "listing"] :
    state.bridgeRequestReviewed && !state.sellerAccessApproved ? ["Review Marcus Lee’s access request", "access"] :
    state.offerSubmitted && !state.offerAcceptedForDiligence ? ["Review the submitted offer with your deal lead", "offers"] :
    state.diligenceCompleted && !state.transactionClosed ? ["Complete the remaining closing-readiness items", "closing"] :
    ["CPA Bridge is moving the process forward; no action is required from you right now", "dashboard"];
  const progress = [
    { label: "Interest", done: state.sellerInterest },
    { label: "Profile", done: state.businessSaved, current: state.sellerInterest && !state.businessSaved },
    { label: "Documents", done: state.filesUploaded, current: state.businessSaved && !state.filesUploaded },
    { label: "Readiness", done: state.readinessReviewed, current: state.filesUploaded && !state.readinessReviewed },
    { label: "Listing", done: state.bridgeListingApproved, current: state.readinessReviewed && !state.bridgeListingApproved },
    { label: "Buyer access", done: state.sellerAccessApproved, current: state.bridgeRequestReviewed && !state.sellerAccessApproved },
    { label: "Offer", done: state.offerAcceptedForDiligence, current: state.offerSubmitted && !state.offerAcceptedForDiligence },
    { label: "Diligence", done: state.diligenceCompleted, current: state.diligenceOpened && !state.diligenceCompleted },
    { label: "Closing", done: state.transactionClosed, current: state.diligenceCompleted && !state.transactionClosed },
  ];
  return (
    <div className="mx-auto max-w-[1180px]">
      <DashHeader title="Seller Dashboard" sub="Elena Martinez — Martinez Tax & Advisory LLC (CT-1042)" />
      {showWelcome && <div className="mb-5"><WelcomeBanner role="seller" onDismiss={() => setShowWelcome(false)} /></div>}
      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <Card className="border-l-4 border-l-[#A8793A] p-6 shadow-[0_8px_22px_rgba(10,23,33,0.09)]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#805A28]">Your next action</div>
            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="max-w-[720px] text-[18px] font-semibold leading-7 text-[#20313A]">{nextAction[0]}</div><Btn onClick={() => go(nextAction[1])} size="sm">Open task <ChevronRight size={16} /></Btn></div>
          </Card>
          <div className="grid gap-3 sm:grid-cols-3">
            {[ ["Listing", state.bridgeListingApproved ? "Active" : state.sellerListingApproved ? "Pending CPA Bridge review" : "In preparation"], ["Buyer requests", state.accessRequested ? "One request needs your attention" : "No requests yet"], ["Offer", state.offerSubmitted ? "$2.45M offer received" : "No offer has been submitted"] ].map(([l, v]) => <Card key={String(l)} className="p-6"><div className="text-[12px] font-medium text-[#65737A]">{l}</div><div className="mt-2 text-[14px] font-semibold leading-5 text-[#20313A]">{v}</div></Card>)}
          </div>
          <DealProgressStepper title="Your sale progress" steps={progress} />
          <SellerDocumentChecklist go={go} />
        </div>
        <div className="space-y-5">
          <ContactCard />
          <Card className="p-6"><div className="text-[14px] font-semibold text-[#20313A]">What CPA Bridge is doing</div><p className="mt-2 text-[13px] leading-6 text-[#51646D]">{state.readinessReviewed ? "We are preparing your anonymous listing, monitoring qualified buyer interest, and keeping private information behind seller-controlled access gates." : "We are reviewing the documents you have provided, reconciling the financial periods, and preparing a focused readiness assessment for your next conversation."}</p></Card>
          <UpcomingCard role="seller" />
        </div>
      </div>
    </div>
  );
}

function BuyerDashboard({ state, go }: { state: DemoState; go: (k: string) => void }) {
  const [showWelcome, setShowWelcome] = useState(true);
  const nextAction =
    !state.buyerProfileSubmitted ? ["Complete your buyer profile so recommendations can be evaluated", "profile"] :
    !state.buyerApproved ? ["Your profile is under CPA Bridge review; no additional action is required right now", "dashboard"] :
    !state.anonymousListingViewed ? ["Review the opportunities ranked for your criteria", "marketplace"] :
    !state.accessRequested ? ["Submit a specific access request for CT-1042", "access"] :
    !state.ndaSigned ? ["Review and sign the confidentiality agreement", "nda"] :
    !state.documentsReleased ? ["Your request is moving through CPA Bridge and seller review", "documents"] :
    !state.offerSubmitted ? ["Prepare and submit your offer", "offers"] :
    ["Continue through diligence and the remaining closing requirements", "diligence"];
  const progress = [
    { label: "Account", done: state.buyerSignup },
    { label: "Profile", done: state.buyerProfileSubmitted, current: state.buyerSignup && !state.buyerProfileSubmitted },
    { label: "Approval", done: state.buyerApproved, current: state.buyerProfileSubmitted && !state.buyerApproved },
    { label: "Discovery", done: state.anonymousListingViewed, current: state.buyerApproved && !state.anonymousListingViewed },
    { label: "Access", done: state.accessRequested, current: state.anonymousListingViewed && !state.accessRequested },
    { label: "NDA", done: state.ndaSigned, current: state.accessRequested && !state.ndaSigned },
    { label: "Documents", done: state.documentsReleased, current: state.ndaSigned && !state.documentsReleased },
    { label: "Offer", done: state.offerSubmitted, current: state.documentsReleased && !state.offerSubmitted },
    { label: "Diligence", done: state.diligenceCompleted, current: state.diligenceOpened && !state.diligenceCompleted },
    { label: "Closing", done: state.transactionClosed, current: state.diligenceCompleted && !state.transactionClosed },
  ];
  return (
    <div className="mx-auto max-w-[1180px]">
      <DashHeader title="Buyer Dashboard" sub="Marcus Lee — Evergreen Accounting Partners" />
      {showWelcome && <div className="mb-5"><WelcomeBanner role="buyer" onDismiss={() => setShowWelcome(false)} /></div>}
      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <Card className="border-l-4 border-l-[#A8793A] p-6 shadow-[0_8px_22px_rgba(10,23,33,0.09)]"><div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#805A28]">Your next action</div><div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="max-w-[720px] text-[18px] font-semibold leading-7 text-[#20313A]">{nextAction[0]}</div><Btn onClick={() => go(nextAction[1])} size="sm">Open task <ChevronRight size={16} /></Btn></div></Card>
          <div className="grid gap-3 sm:grid-cols-3">{[ ["Account", state.buyerApproved ? "Approved to review opportunities" : state.buyerProfileSubmitted ? "Under CPA Bridge review" : "Profile information is still needed"], ["Access request", state.documentsReleased ? "Selected documents released" : state.ndaSigned ? "Under seller review" : state.accessRequested ? "Confidentiality agreement needed" : "No request submitted"], ["Offer", state.offerSubmitted ? "$2.45M offer submitted" : "No offer has been submitted"] ].map(([l, v]) => <Card key={String(l)} className="p-6"><div className="text-[12px] font-medium text-[#65737A]">{l}</div><div className="mt-2 text-[14px] font-semibold leading-5 text-[#20313A]">{v}</div></Card>)}</div>
          <DealProgressStepper title="Your acquisition progress" steps={progress} />
          <Card className="p-6"><div className="flex items-start justify-between gap-4"><div><div className="text-[14px] font-semibold text-[#20313A]">How recommendations are prioritized</div><p className="mt-1 text-[12px] leading-5 text-[#65737A]">Matching evaluates whether an opportunity fits your criteria. Ranking orders eligible opportunities using readiness, funding review, timing, and demonstrated interest.</p></div><Btn onClick={() => go("marketplace")} variant="secondary" size="sm">Review listings</Btn></div></Card>
        </div>
        <div className="space-y-5"><ContactCard /><Card className="p-6"><div className="text-[14px] font-semibold text-[#20313A]">Recommended for you</div><div className="mt-2 text-[13px] leading-6 text-[#51646D]">One Strong Fit listing and two additional opportunities currently align with your acquisition criteria.</div><Btn onClick={() => go("marketplace")} variant="secondary" size="sm" className="mt-4">Open marketplace</Btn></Card><UpcomingCard role="buyer" /></div>
      </div>
    </div>
  );
}

// ─── Public brand experience lives in PublicBrandExperience.tsx ───────────────

// ─── Authentication flow ──────────────────────────────────────────────────────
function AuthFlow({ mode, onDone, onBack, onSwitch }: { mode: "signin" | "seller" | "buyer"; onDone: (role: Role) => void; onBack: () => void; onSwitch: (m: "signin" | "seller" | "buyer") => void }) {
  const [step, setStep] = useState<"form" | "verify" | "mfa" | "forgot" | "reset">(mode === "signin" ? "form" : "form");
  const isRegister = mode !== "signin";
  const role: Role = mode === "seller" ? "seller" : mode === "buyer" ? "buyer" : "buyer";
  return (
    <div className="flex-1 overflow-y-auto bg-[#F6F1E8] flex items-center justify-center py-10">
      <div className="w-[440px] max-w-[92vw]">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] text-[#65737A] hover:text-[#20313A] mb-4"><ChevronRight size={13} className="rotate-180" />Back to site</button>
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-[6px] flex items-center justify-center" style={{ backgroundColor: "#0A1721" }}><Building2 size={16} className="text-white" /></div>
            <span className="text-[15px] font-semibold text-[#0A1721]">CPA Bridge</span>
          </div>

          {step === "form" && !isRegister && (
            <>
              <h1 className="cb-display text-[27px] font-semibold leading-tight text-[#0A1721] mb-2">Sign in</h1>
              <p className="text-[12px] text-[#65737A] mb-4">Access your CPA Bridge portal.</p>
              <div className="space-y-3">
                <div><FieldLabel htmlFor="field-069">Email</FieldLabel><Input value="" placeholder="you@example.com"  id="field-069" /></div>
                <div><FieldLabel htmlFor="field-070">Password</FieldLabel><Input value="" type="password" placeholder="••••••••"  id="field-070" /></div>
                <div className="flex items-center justify-between text-[12px]">
                  <label className="flex items-center gap-1.5 text-[#65737A]"><input type="checkbox" />Remember me</label>
                  <button onClick={() => setStep("forgot")} className="text-[#805A28]">Forgot password?</button>
                </div>
                <Btn onClick={() => setStep("mfa")} className="w-full justify-center">Sign In</Btn>
                <div className="text-[12px] text-[#65737A] text-center">No account? <button onClick={() => onSwitch("buyer")} className="text-[#805A28] font-medium">Create one</button></div>
              </div>
            </>
          )}

          {step === "form" && isRegister && (
            <>
              <div className="flex gap-2 mb-4">
                <button onClick={() => onSwitch("seller")} className={`flex-1 py-2 rounded-[6px] text-[12px] font-medium border ${mode === "seller" ? "bg-[#0A1721] text-white border-[#0A1721]" : "bg-white text-[#65737A] border-[#D7D0C4]"}`}>Seller</button>
                <button onClick={() => onSwitch("buyer")} className={`flex-1 py-2 rounded-[6px] text-[12px] font-medium border ${mode === "buyer" ? "bg-[#0A1721] text-white border-[#0A1721]" : "bg-white text-[#65737A] border-[#D7D0C4]"}`}>Buyer</button>
              </div>
              <h1 className="cb-display text-[27px] font-semibold leading-tight text-[#0A1721] mb-2">Create {mode === "seller" ? "seller" : "buyer"} account</h1>
              <p className="text-[12px] text-[#65737A] mb-4">Admin accounts are invitation-only.</p>
              <div className="grid grid-cols-2 gap-3">
                <div><FieldLabel htmlFor="field-071">First name</FieldLabel><Input value=""  id="field-071" /></div>
                <div><FieldLabel htmlFor="field-072">Last name</FieldLabel><Input value=""  id="field-072" /></div>
                <div className="col-span-2"><FieldLabel htmlFor="field-073">Email</FieldLabel><Input value="" type="email"  id="field-073" /></div>
                <div><FieldLabel htmlFor="field-074">Phone</FieldLabel><Input value=""  id="field-074" /></div>
                <div><FieldLabel htmlFor="field-075">{mode === "seller" ? "Practice name" : "Organization"}</FieldLabel><Input value=""  id="field-075" /></div>
                <div><FieldLabel htmlFor="field-076">Password</FieldLabel><Input value="" type="password"  id="field-076" /></div>
                <div><FieldLabel htmlFor="field-077">Confirm</FieldLabel><Input value="" type="password"  id="field-077" /></div>
              </div>
              <label className="flex items-start gap-2 text-[11px] text-[#65737A] mt-3"><input type="checkbox" className="mt-0.5" />I agree to the Terms of Use and acknowledge the Privacy Policy.</label>
              <div className="text-[11px] text-[#65737A] flex items-center gap-1.5 mt-2 bg-[#F6F1E8] rounded-[6px] p-2"><Shield size={11} />Protected by anti-bot verification (CAPTCHA)</div>
              <Btn onClick={() => setStep("verify")} className="w-full justify-center mt-3">Create Account</Btn>
              <p className="text-[10px] text-[#9AA4A9] mt-2 text-center">Registration does not create approval, access, or a professional relationship.</p>
            </>
          )}

          {step === "verify" && (
            <>
              <h1 className="cb-display text-[27px] font-semibold leading-tight text-[#0A1721] mb-2">Verify your email</h1>
              <p className="text-[12px] text-[#65737A] mb-4">We sent a 6-digit code to your email. Enter it below.</p>
              <div className="flex gap-2 justify-center mb-4">{[0, 1, 2, 3, 4, 5].map(i => <input key={i} aria-label={`Verification code digit ${i + 1}`} maxLength={1} defaultValue={["4", "1", "9", "2", "0", "7"][i]} className="w-11 h-12 border border-[#D7D0C4] rounded-[6px] text-center text-[18px] font-semibold focus:outline-none focus:border-[#A8793A]" />)}</div>
              <Btn onClick={() => setStep("mfa")} className="w-full justify-center">Verify</Btn>
              <div className="flex justify-between text-[12px] mt-3"><button className="text-[#805A28]">Resend code</button><span className="text-[#9AA4A9]">Code expires in 9:58</span></div>
            </>
          )}

          {step === "mfa" && (
            <>
              <h1 className="cb-display text-[27px] font-semibold leading-tight text-[#0A1721] mb-2">Multi-factor authentication</h1>
              <p className="text-[12px] text-[#65737A] mb-4">Enter the code from your authenticator app. {isRegister ? "" : "Required for your account's protection."}</p>
              <div className="flex gap-2 justify-center mb-4">{[0, 1, 2, 3, 4, 5].map(i => <input key={i} aria-label={`Authentication code digit ${i + 1}`} maxLength={1} className="w-11 h-12 border border-[#D7D0C4] rounded-[6px] text-center text-[18px] font-semibold focus:outline-none focus:border-[#A8793A]" />)}</div>
              <Btn onClick={() => onDone(role)} className="w-full justify-center">Continue</Btn>
              <button className="w-full text-[12px] text-[#805A28] mt-3">Use a backup code instead</button>
            </>
          )}

          {step === "forgot" && (
            <>
              <h1 className="cb-display text-[27px] font-semibold leading-tight text-[#0A1721] mb-2">Reset your password</h1>
              <p className="text-[12px] text-[#65737A] mb-4">Enter your email and we'll send a reset link.</p>
              <div><FieldLabel htmlFor="field-078">Email</FieldLabel><Input value="" type="email"  id="field-078" /></div>
              <div className="text-[11px] text-[#65737A] flex items-center gap-1.5 mt-2 bg-[#F6F1E8] rounded-[6px] p-2"><Shield size={11} />Protected by anti-bot verification (CAPTCHA)</div>
              <Btn onClick={() => setStep("reset")} className="w-full justify-center mt-3">Send reset link</Btn>
              <button onClick={() => setStep("form")} className="w-full text-[12px] text-[#805A28] mt-3">Return to sign in</button>
            </>
          )}

          {step === "reset" && (
            <>
              <h1 className="cb-display text-[27px] font-semibold leading-tight text-[#0A1721] mb-2">Choose a new password</h1>
              <p className="text-[12px] text-[#65737A] mb-4">Must be at least 12 characters with a number and symbol.</p>
              <div className="space-y-3">
                <div><FieldLabel htmlFor="field-079">New password</FieldLabel><Input value="" type="password"  id="field-079" /></div>
                <div><FieldLabel htmlFor="field-080">Confirm new password</FieldLabel><Input value="" type="password"  id="field-080" /></div>
                <Btn onClick={() => setStep("form")} className="w-full justify-center">Reset password & return to sign in</Btn>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
// ─── Research & Process Mode ──────────────────────────────────────────────────
const RESEARCH_NAV = [
  { id: "tested", label: "What We Actually Tested" },
  { id: "lessons", label: "Marketplace Lessons" },
  { id: "model", label: "Recommended CPA Bridge Model" },
  { id: "touchpoints", label: "Human CPA Bridge Touchpoints" },
  { id: "readiness", label: "Seller Readiness" },
  { id: "documents", label: "Documents and Access" },
  { id: "matching", label: "Buyer-Seller Matching" },
  { id: "process", label: "Full End-to-End Process" },
  { id: "information", label: "Information Requirements" },
  { id: "wireframes", label: "Initial Wireframes" },
  { id: "decisions", label: "Open Decisions" },
  { id: "sources", label: "Sources and Evidence" },
];

function RTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-[10px] border border-[#D7D0C4] bg-white shadow-[0_1px_2px_rgba(10,23,33,0.04)]">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-[#F2E7D5]">
            {headers.map((h, i) => <th key={i} className={`border-b-2 border-[#CDBB9C] px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0A1721] ${i > 0 && /revenue|value|amount|price|cost|rank|score/i.test(h) ? "text-right" : ""}`}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`cb-table-row ${i % 2 ? "bg-[#FBF8F2]" : "bg-white"} hover:bg-[#F3EBDD]`}>
              {r.map((c, j) => <td key={j} className={`border-b border-[#EEE8DF] px-5 py-4 align-top text-[13px] leading-6 text-[#20313A] ${j > 0 && /number/.test(typeof c) ? "text-right" : ""}`}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RSection({ id, title, kicker, children }: { id: string; title: string; kicker?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="cb-card scroll-mt-6 mb-10 border bg-white p-6 shadow-[0_1px_3px_rgba(10,23,33,0.06)] md:p-8">
      {kicker && <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#805A28]">{kicker}</div>}
      <h2 className="cb-display mb-5 text-[28px] font-semibold leading-tight text-[#0A1721]">{title}</h2>
      {children}
    </section>
  );
}

function ResearchMode() {
  const [active, setActive] = useState("tested");
  const go = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="flex flex-1 overflow-hidden bg-[#F6F1E8]">
      {/* Sticky left nav */}
      <div className="w-[260px] flex-shrink-0 bg-white border-r border-[#D7D0C4] overflow-y-auto">
        <div className="px-4 py-4 border-b border-[#D7D0C4]">
          <div className="text-[11px] font-semibold text-[#805A28] uppercase tracking-[0.14em]">Research & Process</div>
          <div className="text-[12px] text-[#20313A] font-medium mt-1">Internal strategy document</div>
          <div className="text-[11px] text-[#65737A]">Prepared June 30, 2026</div>
        </div>
        <nav className="py-2">
          {RESEARCH_NAV.map((n, i) => (
            <button key={n.id} onClick={() => go(n.id)}
              className={`cb-sidebar-item w-full text-left px-4 py-2.5 flex items-center gap-2 text-[12px] ${active === n.id ? "bg-[#F2E7D5] text-[#0A1721] font-semibold border-r-2 border-[#A8793A]" : "text-[#65737A] hover:bg-[#FBF8F2] hover:text-[#20313A]"}`}>
              <span className="w-4 text-[10px] text-[#9AA4A9]">{i + 1}</span>{n.label}
            </button>
          ))}
        </nav>
        <div className="px-4 py-3 border-t border-[#D7D0C4]">
          <Btn onClick={() => window.print()} variant="secondary" size="sm" className="w-full"><Download size={16} />Print / Export</Btn>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-[#F6F1E8]">
        <div className="max-w-[980px] mx-auto px-8 py-10">
          <div className="mb-10 pb-6 border-b border-[#D7D0C4]">
            <div className="text-[11px] font-semibold text-[#805A28] uppercase tracking-wider mb-2">CPA Bridge Accounting Practice Marketplace</div>
            <h1 className="cb-display text-[32px] font-semibold leading-tight text-[#0A1721]">Research, Workflow & Product Model</h1>
            <p className="text-[14px] text-[#65737A] mt-3 leading-relaxed">An advisory-led marketplace and transaction workflow for confidentially buying and selling accounting and tax practices. Human-led, seller-controlled, and system-assisted. This document summarizes what we observed across comparable marketplaces, the recommended CPA Bridge operating model, and the end-to-end transaction workflow demonstrated in the interactive product experience.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Observed fact", "CPA Bridge recommendation", "Proposed product behavior", "Open decision"].map((t, i) => (
                <span key={t} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[11px] font-medium"
                  style={{ backgroundColor: ["#F0EDE7", "#F2E7D5", "#FFF3D8", "#F7E7E4"][i], color: ["#4F5F67", "#805A28", "#805A28", "#8C3838"][i] }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <RSection id="tested" title="What We Actually Tested" kicker="Section 1">
            <Alert type="warn">Private account testing remains incomplete. No credentials, verification steps, paid plans, real inquiries, or transaction-specific actions were submitted. We never claim a private dashboard was inspected.</Alert>
            <div className="mt-4">
              <RTable
                headers={["Marketplace", "Model", "Evidence status", "What was observed"]}
                rows={[
                  ["BizBuySell", "Self-serve business listings", <Badge variant="pending">Signup flow viewed</Badge>, "Name, email, phone, password, newsletter, and Buy / Sell / Just Browsing role choice. Private account not reached."],
                  ["Accounting Practice Sales", "Broker-led accounting-practice marketplace", <Badge variant="pending">Signup flow viewed</Badge>, "First name, last name, email, phone, state/province, buyer-or-seller choice. Private account not reached."],
                  ["Acquire.com", "Guided acquisition marketplace", <Badge variant="reviewing">Public flow reviewed</Badge>, "Publicly documented account, verification, criteria, NDA, request, seller approval, data room, LOI, diligence. Private dashboard unconfirmed."],
                  ["Flippa", "Digital-asset marketplace", <Badge variant="pending">Signup flow viewed</Badge>, "Email, password, Google signup. Private account not reached."],
                  ["Poe Group Advisors", "Broker-led accounting-practice marketplace", <Badge variant="reviewing">Public flow reviewed</Badge>, "Public buyer registration, confidentiality agreement, seller permission, broker-led process. Private dashboard unconfirmed."],
                  ["Axial", "Private buyer & advisor network", <Badge variant="reviewing">Public flow reviewed</Badge>, "Visible membership fields for role, company, size, experience, capital, criteria. Private member workflow unconfirmed."],
                ]}
              />
            </div>
          </RSection>

          <RSection id="lessons" title="Marketplace Lessons" kicker="Section 2">
            <RTable
              headers={["Marketplace", "Copy", "Do not copy"]}
              rows={[
                ["Accounting Practice Sales", "Accounting-specific language and human brokerage support", "Opaque email-only status management"],
                ["Poe Group Advisors", "Seller permission and transition support", "Reliance on staff memory to manage document access"],
                ["BizBuySell", "Low-friction signup and anonymous browsing", "Decentralized buyer qualification and file controls"],
                ["Axial", "Private shortlists and explainable matching", "Unnecessary large-deal complexity"],
                ["Acquire.com", "Anonymous listing → request → NDA → seller approval → selected files → offer → diligence", "SaaS-only or paid-gate assumptions"],
                ["Flippa", "Simple signup and visible verification status", "Auction mechanics"],
              ]}
            />
            <div className="mt-4"><Alert type="info"><strong>Conclusion.</strong> The recommended CPA Bridge model combines accounting-specific brokerage support, anonymous discovery, qualified buyers, seller-controlled access, controlled documents, and a visible transaction workflow.</Alert></div>
          </RSection>

          <RSection id="model" title="Recommended CPA Bridge Model" kicker="Section 3">
            <div className="grid grid-cols-2 gap-3">
              {[
                ["1. Short seller start", "A short initial form followed by a real CPA Bridge conversation."],
                ["2. Prepare and check", "Seller enters business information and uploads files; CPA Bridge identifies gaps."],
                ["3. Anonymous listing", "CPA Bridge drafts an anonymous listing; seller approves wording; CPA Bridge approves launch."],
                ["4. Buyer account & profile", "Buyer creates a basic account, then completes criteria, funding, and experience."],
                ["5. Deal-specific access", "Buyer views the anonymous listing, requests access, and signs the NDA."],
                ["6. Two human checks", "CPA Bridge reviews the specific request; the seller then decides."],
                ["7. Selected document release", "CPA Bridge releases only the package authorized for that buyer."],
                ["8. Offer and diligence", "Buyer submits an offer; seller may accept it for a controlled diligence process."],
              ].map(([t, d]) => (
                <Card key={t} className="p-6"><div className="text-[13px] font-semibold text-[#0A1721] mb-1">{t}</div><div className="text-[12px] text-[#65737A]">{d}</div></Card>
              ))}
            </div>
          </RSection>

          <RSection id="touchpoints" title="Human CPA Bridge Touchpoints" kicker="Section 4">
            <p className="text-[13px] text-[#65737A] mb-4">CPA Bridge people remain involved at every major judgment point. The ten touchpoints below define what the human does, what the user sees afterward, what the system records, and the decision that follows.</p>
            <RTable
              headers={["Touchpoint", "Owner", "What CPA Bridge does", "User sees afterward", "Decision"]}
              rows={[
                ["1. First seller call", "Assigned lead", "Learn goals, confirm ownership & authority, understand timing, confidentiality, transition; explain process", "Assigned contact, written next step, initial request list", "Continue / pause / refer / stop"],
                ["2. Information & file help", "Lead or analyst", "Explain required information, review uploads, flag missing items, request replacements, track versions", "Missing-item list, file-review status, deadline", "Complete / more required / pause"],
                ["3. Financial-record review", "Analyst + lead", "Check dates & periods, reconcile totals, compare tax records, review owner adjustments, challenge unsupported claims", "Questions, required corrections, accepted explanations", "Clear / Needs Work / Major Concern"],
                ["4. Readiness & price discussion", "Deal lead", "Explain strengths & risks, discuss likely buyer reaction, expectations, timing, transition", "List now / fix first / pause / stop", "Go to market / prepare / pause / not a fit"],
                ["5. Listing writing", "Deal lead", "Write anonymous teaser & private profile, remove identifying info, define staged visibility, prepare release package", "Listing preview, anonymous/private comparison", "Approve / edit / pause"],
                ["6. Buyer check", "Assigned staff", "Review identity, organization, role, criteria, funding, experience; check conflicts", "Approved / restricted / more required / rejected. Seller sees reviewed summary only — never raw proof of funds", "Approve / restrict / ask / reject"],
                ["7. Match & access-request review", "Deal lead", "Review general fit separately; later review the specific request only after request + NDA; check fit, conflicts, reason, release package", "Fit label, plain reasons, buyer note, CPA Bridge recommendation", "Recommend / hold / ask / decline / send to seller"],
                ["8. Calls, questions & offer support", "Deal lead", "Prepare meetings, organize questions, route answers, normalize offer terms, help seller compare structure", "Meeting notes, open questions, offer comparison", "Continue / counter / revise / reject / accept for diligence"],
                ["9. Diligence coordination", "Lead + analyst", "Organize requests, assign owners, coordinate approvals, manage secure releases, track issues & deadlines, prepare parties for the diligence decision", "Diligence task list, due dates, released-document status", "Continue / renegotiate / pause / end deal / complete diligence"],
                ["10. Transaction services, closing & transition", "Lead + legal/finance", "Identify required advisers, coordinate introductions, track engagements, support structuring, coordinate definitive documents & financing, maintain closing checklist, track signatures & funds flow, coordinate staff/client transition", "Provider status, closing checklist, signature & funds-flow status, transition plan", "Ready to close / conditions outstanding / delay / renegotiate / close / begin transition"],
              ]}
            />
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[["Seller action", "#2F6A4F", User], ["Buyer action", "#A8793A", Briefcase], ["CPA Bridge human", "#0A1721", Users], ["System update", "#65737A", RefreshCw], ["Approval gate", "#805A28", Shield], ["File release", "#20313A", Send]].map(([l, c, Ic]: any) => (
                <div key={l} className="flex items-center gap-2 px-3 py-2 rounded-[6px] border border-[#D7D0C4] bg-white">
                  <div className="w-6 h-6 rounded-[6px] flex items-center justify-center" style={{ backgroundColor: c + "1A" }}><Ic size={13} style={{ color: c }} /></div>
                  <span className="text-[12px] text-[#20313A]">{l}</span>
                </div>
              ))}
            </div>
          </RSection>

          <RSection id="readiness" title="Seller Readiness" kicker="Section 5">
            <p className="text-[13px] text-[#65737A] mb-4">Readiness uses three plain-language statuses — never a numeric score. The full review is private to the seller and CPA Bridge.</p>
            <RTable
              headers={["Area", "Clear", "Needs Work", "Major Concern"]}
              rows={[
                ["Financial records", "Current, complete, consistent with tax records", "Missing periods, inconsistent totals", "Records cannot support claims"],
                ["Revenue trend", "Stable or understandable trend", "Recent decline needs explanation", "Severe unexplained decline"],
                ["Profit quality", "Adjustments are clear", "Some adjustments need support", "Material claims unsupported"],
                ["Client concentration", "Risk understood", "Concentration needs retention plan", "One client loss materially damages business"],
                ["Owner dependence", "Relationships can transfer", "Owner retains too many responsibilities", "Business cannot operate without owner"],
                ["Employee dependence", "Key staff & risks understood", "One person carries unusual risk", "Likely departure disrupts service"],
                ["Business processes", "Work is documented", "Knowledge exists only in people's heads", "No reliable handoff exists"],
                ["Legal / business records", "Ownership, licenses, leases understood", "Some records missing or outdated", "Legal or ownership issue may block sale"],
                ["Price / timing / transition", "Expectations workable", "One major issue to discuss", "Expectations incompatible with process"],
                ["Buyer demand", "Plausible buyer pool", "Buyer pool is narrow", "No clear buyer group under current terms"],
              ]}
            />
          </RSection>

          <RSection id="documents" title="Documents and Access" kicker="Section 6">
            <RTable
              headers={["Stage", "Information visible", "Files visible", "Who can see it", "Approval required"]}
              rows={[
                [<Badge variant="active">Anonymous listing</Badge>, "Broad location, revenue range, service mix, staff range, general transition", "None", "Approved buyers", "Listing active"],
                [<Badge variant="active">Approved buyer</Badge>, "Anonymous listing + ability to request a specific deal", "None", "Approved buyer", "Buyer approved"],
                [<Badge variant="reviewing">Request + NDA</Badge>, "Request status, NDA status", "None", "Buyer + CPA Bridge", "Request submitted, NDA signed"],
                [<Badge variant="approved">Seller-approved access</Badge>, "Firm identity, detailed summary, seller-approved info", "Profile, financial summary, service-revenue, anonymized client concentration", "Seller-approved buyer", "CPA Bridge review + seller approval + release"],
                [<Badge variant="pending">Serious review</Badge>, "Additional operating, customer, employee, contract info", "More detailed financials", "Serious-review buyer", "Continued seller control"],
                [<Badge variant="restricted">Diligence only</Badge>, "Tax returns, detailed client & employee info, contracts, lease, legal", "Full diligence set", "Diligence buyer", "Accepted offer + per-item seller approval"],
              ]}
            />
            <div className="mt-4"><Alert type="locked"><strong>Confidentiality labels used throughout the product:</strong> Seller and CPA Bridge Only · Anonymous Listing · Seller-Approved Buyer · Serious Review · Diligence Only. Signing an NDA never releases files.</Alert></div>
          </RSection>

          <RSection id="matching" title="Buyer-Seller Matching" kicker="Section 7">
            <p className="text-[13px] text-[#65737A] mb-4">CPA Bridge uses <strong>two distinct, transparent algorithms</strong> — not AI, no hidden percentage, no black box. Matching determines <em>compatibility</em>; ranking determines <em>order</em>. Neither grants access, and staff review every recommendation.</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Card className="p-6 border-l-4 border-l-[#A8793A]"><div className="text-[13px] font-semibold text-[#0A1721] mb-1">Matching Algorithm</div><p className="text-[12px] text-[#65737A]">Determines whether a buyer and listing are compatible and explains the fit. Runs hard eligibility checks, then weighted fit factors, producing Match Strength (Strong / Possible / Weak Fit) with plain-language reasons and identified gaps.</p></Card>
              <Card className="p-6 border-l-4 border-l-[#0A1721]"><div className="text-[13px] font-semibold text-[#0A1721] mb-1">Ranking Algorithm</div><p className="text-[12px] text-[#65737A]">Orders eligible matches so CPA Bridge can prioritize the most relevant opportunities and buyers. Uses match result, readiness, funding review, timing urgency, request completeness, responsiveness, and seller preferences. A Strong Fit can rank below another Strong Fit.</p></Card>
            </div>
            <Card className="p-6 mb-4">
              <div className="text-[12px] font-semibold text-[#20313A] mb-3">Pipeline</div>
              <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
                {["Buyer profile + listing requirements", "Eligibility checks", "Matching analysis", "CPA Bridge human review", "Eligible match pool", "Ranking algorithm", "Ranked recommendations", "Seller or buyer action"].map((s, i, arr) => (
                  <span key={s} className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1.5 rounded-[6px] bg-[#F2E7D5] text-[#805A28] font-medium">{s}</span>
                    {i < arr.length - 1 && <ChevronRight size={12} className="text-[#9AA4A9]" />}
                  </span>
                ))}
              </div>
            </Card>
            <Alert type="info"><strong>Matching determines compatibility. Ranking determines order. Neither grants confidential access. CPA Bridge reviews recommendations. The seller controls private access.</strong></Alert>
            <div className="mt-3 flex gap-2">
              <span className="text-[11px] text-[#65737A] font-semibold">Match Strength:</span>
              <Badge variant="strong-fit">Strong Fit</Badge><Badge variant="possible-fit">Possible Fit</Badge><Badge variant="weak-fit">Weak Fit</Badge>
            </div>
          </RSection>

          <RSection id="process" title="Full End-to-End Process" kicker="Section 8">
            <RTable
              headers={["#", "Step", "Role", "Resulting state", "Prerequisite"]}
              rows={STEPS.map(s => [
                String(s.id), s.label,
                <RolePill role={s.role} color="" label={s.role === "seller" ? "Seller" : s.role === "buyer" ? "Buyer" : "Staff"} />,
                s.key, s.id === 1 ? "—" : STEPS[s.id - 2].label
              ])}
            />
          </RSection>

          <RSection id="information" title="Information Requirements" kicker="Section 9">
            <RTable
              headers={["Information group", "Who provides it", "Who can see it", "Why it is needed"]}
              rows={[
                ["Buyer account & organization", "Buyer", "CPA Bridge", "Identify and contact the buyer"],
                ["Buyer criteria", "Buyer", "CPA Bridge, matching", "Match buyers to listings"],
                ["Buyer funding", "Buyer", "CPA Bridge only (raw proof restricted)", "Confirm ability to close"],
                ["Buyer experience", "Buyer", "CPA Bridge, seller summary", "Assess credibility"],
                ["Seller ownership & authority", "Seller", "CPA Bridge", "Confirm authority to sell"],
                ["Seller business details", "Seller", "CPA Bridge, staged to buyers", "Build listing and profile"],
                ["Seller financials", "Seller", "CPA Bridge, released selectively", "Support valuation and diligence"],
                ["Seller clients & employees", "Seller", "CPA Bridge, diligence-stage only", "Assess concentration and transition"],
                ["Listing", "CPA Bridge + seller", "Staged by access level", "Anonymous discovery"],
                ["Access request & NDA", "Buyer", "CPA Bridge, seller", "Gate document release"],
                ["Seller access decision", "Seller", "CPA Bridge, buyer status", "Seller controls access"],
                ["Offer", "Buyer", "CPA Bridge, seller", "Negotiate terms"],
                ["Diligence request", "Buyer / CPA Bridge", "Per-item approval", "Coordinated review"],
                ["Deal stage & tasks", "System", "All parties (role-scoped)", "Track who owns the next action"],
              ]}
            />
          </RSection>

          <RSection id="wireframes" title="Initial Wireframes" kicker="Section 10">
            <p className="text-[13px] text-[#65737A] mb-4">The product is delivered as three separate role modules plus a shared public site and authentication. Wireframe sets are organized by module. Each card states purpose, information shown, primary actions, and next result.</p>
            {[["Seller UX", ["Dashboard", "Practice Profile", "Documents", "Readiness", "Listing Preview", "Buyer Recommendations", "Access Requests", "Offers", "Due Diligence", "Transaction Services", "Closing & Transition", "Messages"]],
              ["Buyer UX", ["Dashboard", "Buyer Profile", "Verification & Funding", "Marketplace", "Anonymous Listing", "Access Requests", "NDA", "Documents", "Offer", "Due Diligence", "Transaction Services", "Closing"]],
              ["Admin UX", ["Admin Dashboard", "Seller Reviews", "Listings", "Buyer Reviews", "Matching Analysis", "Ranked Shortlists", "Access Requests", "Document Releases", "Offers", "Diligence", "Provider Coordination", "Closing Readiness", "Audit History"]],
              ["Shared Auth & Public Site", ["Home", "How It Works", "For Sellers", "For Buyers", "Sign In", "Register (Seller)", "Register (Buyer)", "Email Verification", "MFA", "Forgot / Reset", "Legal Pages", "System States"]],
            ].map(([role, screens]: any) => (
              <div key={role} className="mb-4">
                <div className="text-[12px] font-semibold text-[#0A1721] mb-2">{role} wireframes</div>
                <div className="grid grid-cols-4 gap-2">
                  {screens.map((s: string) => (
                    <div key={s} className="border border-dashed border-[#9AA4A9] rounded-[10px] p-3 bg-[#FAFBFC]">
                      <div className="h-2 w-10 bg-[#D7D0C4] rounded-[6px] mb-2" />
                      <div className="text-[11px] font-semibold text-[#20313A]">{s}</div>
                      <div className="mt-2 space-y-1"><div className="h-1.5 bg-[#E7F2EF] rounded-[6px] w-full" /><div className="h-1.5 bg-[#E7F2EF] rounded-[6px] w-3/4" /><div className="h-5 bg-[#D7D0C4] rounded-[6px] w-1/2 mt-2" /></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </RSection>

          <RSection id="decisions" title="Open Decisions" kicker="Section 11">
            <p className="text-[13px] text-[#65737A] mb-4">These are open decisions — not decided product requirements. They are categorized for CPA Bridge leadership review.</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Business Model", "Is CPA Bridge the broker, marketplace operator, buyer, or more than one?"],
                ["Brokerage & Legal", "What licensing, brokerage, privacy, and securities rules apply? Is one NDA sufficient?"],
                ["Buyer Qualification", "What buyer checks are mandatory? Who verifies identity, funds, and references?"],
                ["Seller Policy", "Can all registered buyers see anonymous listings, or only approved buyers?"],
                ["Document Security", "What files are view-only vs downloadable? Watermarking? Retention and removal?"],
                ["Product", "How much post-introduction workflow does CPA Bridge automate vs handle manually?"],
                ["Operations", "How are conflicts disclosed if CPA Bridge may also bid?"],
                ["Pilot Scope", "What locations and firm sizes are accepted in the first manual pilot?"],
                ["Metrics", "What marketplace metrics are tracked (e.g. pursuit rate)?"],
              ].map(([cat, q]) => (
                <Card key={cat} className="p-6"><Badge variant="pending">{cat}</Badge><p className="text-[12px] text-[#20313A] mt-2">{q}</p></Card>
              ))}
            </div>
          </RSection>

          <RSection id="sources" title="Sources and Evidence" kicker="Section 12">
            <Alert type="info">All findings are based on publicly observable signup and marketing flows reviewed in June 2026. No private dashboards, paid plans, or transaction actions were accessed. Proposed CPA Bridge behavior is a recommendation, not an externally verified fact.</Alert>
            <div className="mt-4">
              <RTable
                headers={["Source", "What was reviewed", "Date"]}
                rows={[
                  ["BizBuySell", "Public signup flow", "June 2026"],
                  ["Accounting Practice Sales", "Public signup flow", "June 2026"],
                  ["Acquire.com", "Public acquisition flow & documentation", "June 2026"],
                  ["Flippa", "Public signup flow", "June 2026"],
                  ["Poe Group Advisors", "Public buyer registration & process pages", "June 2026"],
                  ["Axial", "Public membership & network pages", "June 2026"],
                ]}
              />
            </div>
          </RSection>
        </div>
      </main>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════
//  ROOT APP — surfaces: public site, auth, three modules, research mode
// ═══════════════════════════════════════════════════════════════════════════
type Surface = "public" | "auth" | "seller" | "buyer" | "admin" | "research" | "brand";

const SELLER_USER: ModuleUser = { name: "Elena Martinez", org: "Martinez Tax & Advisory LLC", roleLabel: "Seller", initials: "EM", accent: "#1A6B28" };
const BUYER_USER: ModuleUser = { name: "Marcus Lee", org: "Evergreen Accounting Partners", roleLabel: "Buyer", initials: "ML", accent: "#A8793A" };
const ADMIN_USER: ModuleUser = { name: "Maya Chen", org: "CPA Bridge Transaction Services", roleLabel: "Admin", initials: "MC", accent: "#6B3D9F" };

export default function App() {
  const [surface, setSurface] = useState<Surface>("public");
  const [authMode, setAuthMode] = useState<"signin" | "seller" | "buyer">("signin");
  const [state, setState] = useState<DemoState>(INITIAL_STATE);

  useEffect(() => {
    document.title = "CPA Bridge — CPA Firm Sales and Transaction Advisory";
    const requested = window.location.hash.replace("#", "") as Surface;
    if (["seller", "buyer", "admin", "research", "brand"].includes(requested)) {
      setSurface(requested);
    }
  }, []);

  const setFlag = useCallback((...keys: (keyof DemoState)[]) => {
    setState(prev => {
      const next = { ...prev };
      keys.forEach(k => { (next as any)[k] = true; });
      return next;
    });
  }, []);
  const resetDemo = useCallback(() => setState(INITIAL_STATE), []);

  // ── Seller module nav ──
  const sellerNav: NavItem[] = [
    { key: "dashboard", label: "Dashboard", icon: Home, render: (go) => <SellerDashboard state={state} go={go} /> },
    { key: "profile", label: "Practice Profile", icon: Building2, done: state.businessSaved, render: () => <ScreenBusinessInfo onAdvance={() => setFlag("sellerInterest", "businessSaved")} /> },
    { key: "documents", label: "Documents", icon: Upload, done: state.filesUploaded, render: () => <ScreenFileUpload onAdvance={() => setFlag("filesUploaded")} /> },
    { key: "readiness", label: "Readiness Review", icon: ClipboardList, done: state.readinessReviewed, render: () => <ScreenReadinessReview onAdvance={() => setFlag("readinessReviewed")} /> },
    { key: "listing", label: "Listing Preview", icon: Eye, done: state.sellerListingApproved, locked: !state.readinessReviewed, lockMsg: "Your listing preview is available after CPA Bridge completes the readiness review.", render: () => <ScreenListingPreview onAdvance={() => setFlag("sellerListingApproved")} /> },
    { key: "recs", label: "Buyer Recommendations", icon: Star, locked: !state.bridgeListingApproved, lockMsg: "Buyer recommendations appear once your listing is active.", render: () => <SellerRecommendations /> },
    { key: "access", label: "Access Requests", icon: Shield, done: state.sellerAccessApproved, locked: !state.bridgeRequestReviewed, lockMsg: "A buyer access decision becomes available after CPA Bridge reviews a specific request.", render: () => <ScreenSellerBuyerApproval onAdvance={() => setFlag("sellerAccessApproved")} /> },
    { key: "offers", label: "Offers", icon: DollarSign, done: state.offerAcceptedForDiligence, locked: !state.offerSubmitted, lockMsg: "Offers appear here after a buyer submits one.", render: () => <ScreenDiligence onAdvance={() => setFlag("offerAcceptedForDiligence", "diligenceOpened")} /> },
    { key: "diligence", label: "Due Diligence", icon: BarChart3, locked: !state.diligenceOpened, lockMsg: "Diligence opens after you accept an offer for diligence.", render: () => <ScreenDiligence onAdvance={() => setFlag("diligenceCompleted")} /> },
    { key: "services", label: "Transaction Services", icon: Scale, locked: !state.diligenceCompleted, lockMsg: "Transaction services open after diligence is completed.", render: () => <ScreenTransactionServices onAdvance={() => setFlag("servicesSelected")} /> },
    { key: "closing", label: "Closing & Transition", icon: Handshake, locked: !state.diligenceCompleted, lockMsg: "Closing readiness opens after diligence is completed.", render: () => <ScreenClosing ready={state.closingReadiness} /> },
    { key: "messages", label: "Messages", icon: MessageSquare, render: () => <MessagesPage user={SELLER_USER} state={state} /> },
    { key: "settings", label: "Account Settings", icon: User, render: () => <AccountSettingsPage user={SELLER_USER} /> },
    { key: "help", label: "Help & Contact", icon: Info, render: () => <HelpPage /> },
  ];

  // ── Buyer module nav ──
  const buyerNav: NavItem[] = [
    { key: "dashboard", label: "Dashboard", icon: Home, render: (go) => <BuyerDashboard state={state} go={go} /> },
    { key: "profile", label: "Buyer Profile", icon: ClipboardList, done: state.buyerProfileSubmitted, render: () => <ScreenBuyerProfile onAdvance={() => setFlag("buyerSignup", "buyerProfileSubmitted")} /> },
    { key: "marketplace", label: "Marketplace", icon: Search, done: state.anonymousListingViewed, locked: !state.buyerApproved, lockMsg: "The live marketplace opens once CPA Bridge approves your buyer profile.", render: () => <ScreenMarketplace onAdvance={() => setFlag("anonymousListingViewed")} /> },
    { key: "access", label: "Access Requests", icon: FileText, done: state.accessRequested, locked: !state.anonymousListingViewed, lockMsg: "Open an anonymous listing before requesting access — viewing a listing does not itself create a request.", render: () => <ScreenAccessRequest onAdvance={() => setFlag("accessRequested")} /> },
    { key: "nda", label: "NDAs", icon: Shield, done: state.ndaSigned, locked: !state.accessRequested, lockMsg: "The NDA becomes available after you submit a specific access request.", render: () => <ScreenNDA onAdvance={() => setFlag("ndaSigned")} /> },
    { key: "documents", label: "Documents", icon: Folder, done: state.documentsReleased, locked: !state.documentsReleased, lockMsg: "Documents appear only after the seller approves your access and CPA Bridge releases the selected package. Signing an NDA does not release files.", render: () => <ScreenDocumentRelease onAdvance={() => {}} /> },
    { key: "offers", label: "Offers", icon: DollarSign, done: state.offerSubmitted, locked: !state.documentsReleased, lockMsg: "You can submit an offer once documents have been released.", render: () => <ScreenBuyerOffer onAdvance={() => setFlag("offerSubmitted")} /> },
    { key: "diligence", label: "Due Diligence", icon: BarChart3, locked: !state.diligenceOpened, lockMsg: "Diligence opens after the seller accepts your offer for diligence.", render: () => <ScreenDiligence onAdvance={() => {}} /> },
    { key: "services", label: "Transaction Services", icon: Scale, locked: !state.diligenceCompleted, lockMsg: "Transaction services open after diligence is completed.", render: () => <ScreenTransactionServices onAdvance={() => setFlag("servicesSelected")} /> },
    { key: "closing", label: "Closing & Transition", icon: Handshake, locked: !state.diligenceCompleted, lockMsg: "Closing readiness opens after diligence is completed.", render: () => <ScreenClosing ready={state.closingReadiness} /> },
    { key: "messages", label: "Messages", icon: MessageSquare, render: () => <MessagesPage user={BUYER_USER} state={state} /> },
    { key: "settings", label: "Account Settings", icon: User, render: () => <AccountSettingsPage user={BUYER_USER} /> },
    { key: "help", label: "Help & Contact", icon: Info, render: () => <HelpPage /> },
  ];

  // ── Admin module nav ──
  const adminNav: NavItem[] = [
    { key: "dashboard", label: "Admin Dashboard", icon: Home, render: () => <ScreenStaffDashboard /> },
    { key: "sellerReview", label: "Seller Reviews", icon: Building2, done: state.readinessReviewed, render: () => <ScreenReadinessReview onAdvance={() => setFlag("readinessReviewed")} /> },
    { key: "listings", label: "Listings", icon: CheckCircle2, done: state.bridgeListingApproved, locked: !state.sellerListingApproved, lockMsg: "Final listing approval is available after the seller approves the listing.", render: () => <ScreenStaffListingApproval onAdvance={() => setFlag("bridgeListingApproved")} /> },
    { key: "buyerReview", label: "Buyer Reviews", icon: UserCheck, done: state.buyerApproved, render: () => <ScreenStaffBuyerApproval onAdvance={() => setFlag("buyerApproved")} /> },
    { key: "matching", label: "Matching Analysis", icon: Star, render: () => <ScreenMatchingWorkspace /> },
    { key: "access", label: "Access Requests", icon: Shield, done: state.bridgeRequestReviewed, locked: !state.ndaSigned, lockMsg: "A specific access request can be reviewed only after the buyer requests access and signs the NDA.", render: () => <ScreenStaffRequestReview onAdvance={() => setFlag("bridgeRequestReviewed")} /> },
    { key: "releases", label: "Document Releases", icon: Send, done: state.documentsReleased, locked: !state.sellerAccessApproved, lockMsg: "Documents can be released only after the seller approves the buyer. Seller approval and release are separate actions.", render: () => <ScreenDocumentRelease onAdvance={() => setFlag("documentsReleased")} /> },
    { key: "offers", label: "Offers", icon: DollarSign, locked: !state.offerSubmitted, lockMsg: "Offers appear after a buyer submits one.", render: () => <ScreenDiligence onAdvance={() => {}} /> },
    { key: "diligence", label: "Due Diligence", icon: BarChart3, done: state.diligenceCompleted, locked: !state.diligenceOpened, lockMsg: "Diligence opens after the seller accepts an offer for diligence.", render: () => <ScreenDiligenceComplete onAdvance={() => setFlag("diligenceCompleted")} /> },
    { key: "services", label: "Transaction Services", icon: Scale, locked: !state.diligenceCompleted, lockMsg: "Coordinate transaction-service providers after diligence completes.", render: () => <ScreenTransactionServices onAdvance={() => setFlag("servicesSelected")} /> },
    { key: "docs", label: "Definitive Docs", icon: FileText, locked: !state.servicesSelected, lockMsg: "Definitive documents follow service selection.", render: () => <ScreenDefinitiveDocs onAdvance={() => setFlag("definitiveDocsPrepared")} /> },
    { key: "closing", label: "Closing Readiness", icon: Handshake, done: state.transactionClosed, locked: !state.diligenceCompleted, lockMsg: "Closing readiness opens after diligence completes. Closing is never automatic.", render: () => <ScreenClosing ready={state.closingReadiness} onConfirmReady={() => setFlag("closingReadiness")} onClose={() => setFlag("transactionClosed")} /> },
    { key: "audit", label: "Audit History", icon: ClipboardList, render: () => <AuditHistory state={state} /> },
    { key: "messages", label: "Messages", icon: MessageSquare, render: () => <MessagesPage user={ADMIN_USER} state={state} /> },
    { key: "settings", label: "Account Settings", icon: User, render: () => <AccountSettingsPage user={ADMIN_USER} /> },
  ];

  const enterModule = (r: Role) => setSurface(r === "seller" ? "seller" : r === "buyer" ? "buyer" : "admin");

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F4F0E8", color: "#20313A" }}>
      {/* Workspace preview navigation is intentionally hidden from the public website. */}
      {surface !== "public" && surface !== "auth" && <header className="h-11 flex-shrink-0 flex items-center px-4 gap-3 z-50" style={{ backgroundColor: "#0A1721" }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-[6px] bg-white/10 flex items-center justify-center"><Building2 size={13} className="text-white" /></div>
          <span className="text-[12px] font-semibold text-white">CPA Bridge</span>
        </div>
        <span className="text-[10px] text-white/40 uppercase tracking-wider">Workspace preview</span>
        <div className="h-5 w-px bg-white/20 mx-1" />
        <div className="flex items-center gap-1">
          {([["public", "Public Site"], ["seller", "Seller"], ["buyer", "Buyer"], ["admin", "Admin"], ["research", "Research & Process"], ["brand", "Site Standards"]] as [Surface, string][]).map(([s, l]) => (
            <button key={s} onClick={() => setSurface(s)}
              className={`px-2.5 py-1 rounded-[6px] text-[11px] font-medium transition-all ${surface === s ? "bg-white text-[#0A1721]" : "text-white/50 hover:text-white/90"}`}>
              {l}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <button onClick={resetDemo} className="flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[11px] font-medium text-white/70 hover:text-white border border-white/20">
          <RotateCcw size={11} />Reset Transaction
        </button>
      </header>}

      {surface === "public" && <PublicSite onSignIn={() => { setAuthMode("signin"); setSurface("auth"); }} onCreateAccount={(r) => { setAuthMode(r === "seller" ? "seller" : "buyer"); setSurface("auth"); }} />}
      {surface === "auth" && <AuthFlow mode={authMode} onDone={(r) => enterModule(r)} onBack={() => setSurface("public")} onSwitch={(m) => setAuthMode(m)} />}
      {surface === "research" && <ResearchMode />}
      {surface === "brand" && <BrandStudio />}
      {surface === "seller" && <ModuleShell moduleName="Seller Portal" moduleColor="#1A6B28" user={SELLER_USER} role="seller" state={state} nav={sellerNav} onExit={() => setSurface("public")} />}
      {surface === "buyer" && <ModuleShell moduleName="Buyer Portal" moduleColor="#A8793A" user={BUYER_USER} role="buyer" state={state} nav={buyerNav} onExit={() => setSurface("public")} />}
      {surface === "admin" && <ModuleShell moduleName="CPA Bridge Admin" moduleColor="#6B3D9F" user={ADMIN_USER} role="staff" state={state} nav={adminNav} onExit={() => setSurface("public")} />}
    </div>
  );
}

// ─── Small supporting screens ─────────────────────────────────────────────────
function SellerRecommendations() {
  return (
    <div className="max-w-[1000px] mx-auto">
      <DashHeader title="Buyer Recommendations" sub="General match recommendations from CPA Bridge — separate from specific access requests" />
      <Alert type="info">A recommendation means CPA Bridge believes a buyer may fit. It is <strong>not</strong> an access request, NDA, or approval. You decide who receives private information under Access Requests.</Alert>
      <div className="mt-4 space-y-3">
        {[["Marcus Lee — Evergreen Accounting Partners", "strong-fit", "Strong Fit", "Funding reviewed · geography & services align · 3 prior acquisitions"], ["Northwest CPA Partners", "possible-fit", "Possible Fit", "Strong accounting experience · funding review pending · slower timing"], ["Summit Search Fund", "weak-fit", "Weak Fit", "Funding not demonstrated · limited operating experience"]].map(([n, f, l, r]) => (
          <Card key={String(n)} className="p-6 flex items-center justify-between">
            <div><div className="text-[13px] font-medium text-[#20313A]">{n}</div><div className="text-[11px] text-[#65737A] mt-0.5">{r}</div></div>
            <Badge variant={f as string}>{l}</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AuditHistory({ state }: { state: DemoState }) {
  const events = [
    state.sellerInterest && ["Seller interest submitted", "Elena Martinez", "Jun 24, 2026"],
    state.businessSaved && ["Practice information saved", "Elena Martinez", "Jun 25, 2026"],
    state.filesUploaded && ["Documents uploaded", "Elena Martinez", "Jun 26, 2026"],
    state.readinessReviewed && ["Readiness review completed", "Maya Chen", "Jun 28, 2026"],
    state.sellerListingApproved && ["Listing approved by seller", "Elena Martinez", "Jun 29, 2026"],
    state.bridgeListingApproved && ["Listing activated", "Maya Chen", "Jun 29, 2026"],
    state.buyerApproved && ["Buyer approved", "Maya Chen", "Jun 30, 2026"],
    state.accessRequested && ["Access requested for CT-1042", "Marcus Lee", "Jul 1, 2026"],
    state.ndaSigned && ["NDA signed", "Marcus Lee", "Jul 1, 2026"],
    state.bridgeRequestReviewed && ["Access request recommended to seller", "Maya Chen", "Jul 1, 2026"],
    state.sellerAccessApproved && ["Buyer access approved", "Elena Martinez", "Jul 2, 2026"],
    state.documentsReleased && ["Documents released to buyer", "Maya Chen", "Jul 2, 2026"],
    state.offerSubmitted && ["Offer submitted ($2.45M)", "Marcus Lee", "Jul 5, 2026"],
    state.offerAcceptedForDiligence && ["Offer accepted for diligence", "Elena Martinez", "Jul 6, 2026"],
    state.diligenceCompleted && ["Diligence completed", "Maya Chen", "Jul 20, 2026"],
    state.transactionClosed && ["Transaction closed & transition begun", "Maya Chen", "Sep 30, 2026"],
  ].filter(Boolean) as [string, string, string][];
  return (
    <div className="max-w-[900px] mx-auto">
      <DashHeader title="Audit History" sub="Immutable record of transaction actions across all parties" />
      {events.length === 0 ? (
        <Card className="p-10 text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#F2E7D5]"><ClipboardList size={26} className="text-[#805A28]" /></div><div className="mt-5 text-[16px] font-semibold text-[#20313A]">The transaction record will build here</div><p className="mx-auto mt-2 max-w-[520px] text-[13px] leading-6 text-[#65737A]">Seller, buyer, and CPA Bridge actions will appear in one ordered history as the process advances.</p></Card>
      ) : (
        <Card className="divide-y divide-[#EEE8DF] overflow-hidden">
          {events.map((e, i) => {
            const initials = e[1].split(" ").map(v => v[0]).join("").slice(0,2);
            const eventRole: Role = e[1] === "Elena Martinez" ? "seller" : e[1] === "Marcus Lee" ? "buyer" : "staff";
            return <div key={i} className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-[#FBF8F2]"><Avatar initials={initials} role={eventRole} size="sm" /><div className="flex-1"><div className="text-[13px] font-medium text-[#20313A]">{e[0]}</div><div className="mt-0.5 text-[11px] text-[#65737A]">{e[1]}</div></div><span className="text-[11px] text-[#8C989D]">{e[2]}</span></div>;
          })}
        </Card>
      )}
    </div>
  );
}
