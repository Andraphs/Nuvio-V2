import { useState } from 'react';
import { motion } from 'framer-motion';

const MONTH_DATA = {
  May: {
    net: 'Net +$3,120',
    balance: '$11,420.00',
    income: '$5,480.00',
    expenses: '$2,360.00',
    x: 65,
    y: 62,
  },
  Jun: {
    net: 'Net +$3,890',
    balance: '$13,650.00',
    income: '$6,120.00',
    expenses: '$2,230.00',
    x: 150,
    y: 54,
  },
  Jul: {
    net: 'Net +$4,380',
    balance: '$15,890.00',
    income: '$6,840.00',
    expenses: '$2,460.00',
    x: 275,
    y: 26,
  },
  Aug: {
    net: 'Net +$4,050',
    balance: '$17,120.00',
    income: '$6,540.00',
    expenses: '$2,490.00',
    x: 365,
    y: 38,
  },
  Sep: {
    net: 'Net +$4,910',
    balance: '$18,940.00',
    income: '$7,290.00',
    expenses: '$2,380.00',
    x: 430,
    y: 18,
  },
};

const MONTH_KEYS = ['May', 'Jun', 'Jul', 'Aug', 'Sep'];

export function BentoShowcase({ onOpenDashboard }) {
  const [activeMonth, setActiveMonth] = useState('Jul');
  const [isAdobePaid, setIsAdobePaid] = useState(false);

  const current = MONTH_DATA[activeMonth] || MONTH_DATA.Jul;

  return (
    <section
      id="advantage"
      className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-24 flex flex-col gap-6"
    >
      {/* Header with ambient glow */}
      <div className="relative text-center max-w-2xl mx-auto flex flex-col items-center gap-3 mb-4">
        <div
          className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 w-[460px] h-[180px] rounded-full bg-[#9312ff]/12 blur-[85px]"
          aria-hidden="true"
        />
        <span className="relative px-3.5 py-1 rounded-full obsidian-nav-capsule border font-body text-label-sm text-[#d6adff]">
          Our Features
        </span>
        <h2
          data-design-text-token="headline-lg"
          className="relative font-headline text-3xl sm:text-4xl font-semibold text-on-surface text-balance"
        >
          Powerful Tools Built for Modern Finance
        </h2>
        <p
          data-design-text-token="body-md"
          className="relative font-body text-body-md text-on-surface-variant text-pretty"
        >
          Every widget in Nuvio works together so your monthly KPIs, charts, and recurring bills stay
          in sync.
        </p>
      </div>

      {/* Wide Featured Bento Card: Interactive Cash Flow Explorer */}
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl obsidian-hero-card hover-card border border-[#b14eff]/45 p-6 sm:p-8 lg:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-[0_24px_70px_rgba(0,0,0,0.75),0_0_45px_rgba(147,18,255,0.16)]"
      >
        <div
          className="pointer-events-none absolute top-0 inset-x-0 top-violet-rim-line"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_65%_at_15%_15%,rgba(160,32,255,0.2)_0%,transparent_65%),radial-gradient(65%_65%_at_85%_85%,rgba(122,28,248,0.14)_0%,transparent_65%)]"
          aria-hidden="true"
        />

        {/* Left Column: Context & CTA */}
        <div className="relative lg:col-span-5 flex flex-col items-start gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/45">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e0b3ff] animate-pulse" aria-hidden="true" />
            <span className="font-body text-label-sm text-[#d6adff]">Interactive Analytics</span>
          </div>
          <h3
            data-design-text-token="headline-lg"
            className="font-headline text-2xl sm:text-3xl font-semibold text-on-surface text-balance"
          >
            Annual Cash Flow Intelligence
          </h3>
          <p
            data-design-text-token="body-md"
            className="font-body text-body-md text-[#b7a8c9] text-pretty"
          >
            Click any month from Jan to Dec to inspect Net Cash Flow and automatically update your
            Total Balance, Income, and Expenses cards.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={onOpenDashboard}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full obsidian-violet-btn font-body text-label-lg cursor-pointer"
            >
              <span>Try Interactive Chart</span>
              <span
                className="material-symbols-outlined text-title-md hover-arrow"
                aria-hidden="true"
              >
                arrow_forward
              </span>
            </button>
            <span className="font-body text-body-sm text-on-surface-variant">
              Click a month to preview →
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Mini Cash Flow Widget */}
        <div className="relative lg:col-span-7 rounded-xl bg-[#09070f]/90 border border-[#9312ff]/30 p-4 sm:p-5 flex flex-col gap-4 shadow-[inset_0_1px_0_rgba(224,179,255,0.14)]">
          {/* Header Row & Month Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-headline text-title-md text-on-surface">
                {activeMonth} 2026 Snapshot
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-success/15 border border-success/35 font-body text-label-sm text-success tabular-nums">
                {current.net}
              </span>
            </div>

            {/* Month Switcher Pills */}
            <div
              className="flex items-center gap-1 p-1 rounded-full bg-[#14101f] border border-outline-variant"
              role="tablist"
              aria-label="Preview month"
            >
              {MONTH_KEYS.map((m) => {
                const isActive = activeMonth === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setActiveMonth(m)}
                    className={`px-2.5 py-1 rounded-full font-body text-label-sm transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-primary/30 border border-primary/50 text-on-surface'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 rounded-lg obsidian-nav-capsule border hover-mini-card">
              <span className="font-body text-body-sm text-[#b7a8c9]">Balance</span>
              <p className="font-headline text-title-md text-on-surface tabular-nums mt-0.5">
                {current.balance}
              </p>
            </div>
            <div className="p-3 rounded-lg obsidian-nav-capsule border hover-mini-card">
              <span className="font-body text-body-sm text-success">Income</span>
              <p className="font-headline text-title-md text-on-surface tabular-nums mt-0.5">
                {current.income}
              </p>
            </div>
            <div className="p-3 rounded-lg obsidian-nav-capsule border hover-mini-card">
              <span className="font-body text-body-sm text-warning">Expenses</span>
              <p className="font-headline text-title-md text-on-surface tabular-nums mt-0.5">
                {current.expenses}
              </p>
            </div>
          </div>

          {/* Crisp SVG Dual-Curve Chart Preview */}
          <div className="relative rounded-lg bg-[#0d0a14] border border-outline-variant px-3 pt-3 pb-2 overflow-hidden">
            <svg viewBox="0 0 480 112" className="w-full h-28 overflow-visible" aria-hidden="true">
              <defs>
                <linearGradient id="bentoVioletArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a020ff" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#a020ff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="bentoVioletStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7a1cf8" />
                  <stop offset="50%" stopColor="#e0b3ff" />
                  <stop offset="100%" stopColor="#a020ff" />
                </linearGradient>
              </defs>

              {/* Subtle Grid Lines */}
              <line x1="0" y1="24" x2="480" y2="24" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="58" x2="480" y2="58" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="92" x2="480" y2="92" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

              {/* Area Fill */}
              <path
                d="M 10 78 C 65 72, 95 48, 150 54 C 205 60, 225 22, 275 26 C 325 30, 365 44, 415 20 C 445 8, 462 14, 470 12 L 470 105 L 10 105 Z"
                fill="url(#bentoVioletArea)"
              />

              {/* Expense Curve */}
              <path
                d="M 10 88 C 65 86, 100 76, 150 82 C 205 88, 225 66, 275 70 C 325 74, 365 80, 415 68 C 445 62, 462 66, 470 64"
                fill="none"
                stroke="#45b558"
                strokeWidth="2"
                strokeOpacity="0.75"
                strokeLinecap="round"
              />

              {/* Primary Cash Flow Curve */}
              <path
                d="M 10 78 C 65 72, 95 48, 150 54 C 205 60, 225 22, 275 26 C 325 30, 365 44, 415 20 C 445 8, 462 14, 470 12"
                fill="none"
                stroke="url(#bentoVioletStroke)"
                strokeWidth="2.6"
                strokeLinecap="round"
              />

              {/* Active Vertical Guide + Glowing Node */}
              <motion.line
                animate={{ x1: current.x, x2: current.x }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                y1="12"
                y2="104"
                stroke="rgba(224,179,255,0.35)"
                strokeDasharray="3 3"
              />
              <motion.circle
                animate={{ cx: current.x, cy: current.y }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                r="9"
                fill="#9312ff"
                fillOpacity="0.32"
              />
              <motion.circle
                animate={{ cx: current.x, cy: current.y }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                r="4.5"
                fill="#e0b3ff"
                stroke="#0d0a14"
                strokeWidth="2"
              />
            </svg>

            {/* Month Axis Labels */}
            <div className="flex items-center justify-between text-[11px] font-body text-on-surface-variant px-1 pt-1">
              {MONTH_KEYS.map((m) => (
                <span
                  key={m}
                  className={activeMonth === m ? 'text-[#e0b3ff] font-medium' : ''}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.article>

      {/* Two Side-by-Side Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card: Monthly Spend & Sync Health */}
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl obsidian-surface hover-card border p-6 sm:p-7 flex flex-col justify-between gap-6"
        >
          <div
            className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full bg-success/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full obsidian-nav-capsule border font-body text-label-sm text-[#d6adff]">
                Budget Pacing
              </span>
              <span className="inline-flex items-center gap-1.5 font-body text-label-sm text-success">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" aria-hidden="true" />
                All Synced · 2m ago
              </span>
            </div>
            <h3
              data-design-text-token="headline-md"
              className="font-headline text-headline-md text-on-surface"
            >
              Monthly Spend &amp; Sync Health
            </h3>
            <p
              data-design-text-token="body-sm"
              className="font-body text-body-sm text-on-surface-variant text-pretty"
            >
              Track how much of your monthly budget is used in real time alongside account sync
              health.
            </p>
          </div>

          <div className="relative flex flex-col gap-3">
            {/* Radial SVG Gauge + Metrics */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#0d0a14] border border-outline-variant hover-mini-card flex items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-3xl font-bold text-success tabular-nums">
                    62%
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-success/15 border border-success/30 font-body text-[11px] text-success">
                    On Track
                  </span>
                </div>
                <span className="font-body text-label-sm text-on-surface">Monthly Spend Pacing</span>
                <span className="font-body text-body-sm text-on-surface-variant">
                  $1,525 of $2,460 budget used
                </span>
              </div>

              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
                  <defs>
                    <linearGradient id="bentoRingGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#a020ff" />
                      <stop offset="100%" stopColor="#45b558" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="6"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill="none"
                    stroke="url(#bentoRingGrad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="201"
                    strokeDashoffset="76"
                  />
                </svg>
                <span className="absolute font-headline text-label-lg text-on-surface tabular-nums">
                  62%
                </span>
              </div>
            </div>

            {/* Compact Bank Sync Strip */}
            <div className="grid grid-cols-3 gap-2">
              <div className="px-3 py-2 rounded-lg bg-[#0d0a14] border border-outline-variant flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success shrink-0" aria-hidden="true" />
                <span className="font-body text-[12px] text-on-surface truncate">Chase</span>
              </div>
              <div className="px-3 py-2 rounded-lg bg-[#0d0a14] border border-outline-variant flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success shrink-0" aria-hidden="true" />
                <span className="font-body text-[12px] text-on-surface truncate">Citibank</span>
              </div>
              <div className="px-3 py-2 rounded-lg bg-[#0d0a14] border border-outline-variant flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#e0b3ff] shrink-0" aria-hidden="true" />
                <span className="font-body text-[12px] text-on-surface truncate">GoPay</span>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Right Card: Subscription Radar */}
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.52, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl obsidian-surface hover-card border p-6 sm:p-7 flex flex-col justify-between gap-6"
        >
          <div
            className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full bg-primary/15 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full obsidian-nav-capsule border font-body text-label-sm text-[#d6adff]">
                Recurring Control
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full border font-body text-label-sm transition-colors ${
                  isAdobePaid
                    ? 'bg-success/15 border-success/35 text-success'
                    : 'bg-warning/15 border-warning/35 text-warning'
                }`}
              >
                {isAdobePaid ? 'All Bills Current' : '1 Renewal Due'}
              </span>
            </div>
            <h3
              data-design-text-token="headline-md"
              className="font-headline text-headline-md text-on-surface"
            >
              Catch Unpaid Bills Early
            </h3>
            <p
              data-design-text-token="body-sm"
              className="font-body text-body-sm text-on-surface-variant text-pretty"
            >
              Every recurring plan—monthly or yearly—is surfaced with status badges and one-tap Pay
              actions.
            </p>
          </div>

          <div className="relative flex flex-col gap-2.5">
            {/* Subscription 1: Adobe CC */}
            <div className="p-3.5 rounded-xl bg-[#0d0a14] border border-warning/30 hover-mini-card flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-error/15 border border-error/30 flex items-center justify-center text-error shrink-0">
                  <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                    palette
                  </span>
                </span>
                <div>
                  <p className="font-body text-label-sm text-on-surface">Adobe CC · Yearly</p>
                  <p className="font-body text-[12px] text-on-surface-variant tabular-nums">
                    {isAdobePaid ? '$54.99 · Settled just now' : '$54.99 · Due in 2 days'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAdobePaid((prev) => !prev)}
                className={`px-3 py-1 rounded-full font-body text-label-sm transition-colors cursor-pointer ${
                  isAdobePaid
                    ? 'bg-success/15 border border-success/35 text-success'
                    : 'bg-warning/20 border border-warning/45 hover:bg-primary/30 hover:border-primary/60 text-warning hover:text-on-surface'
                }`}
              >
                {isAdobePaid ? 'Paid' : 'Mark Paid'}
              </button>
            </div>

            {/* Subscription 2: Figma Pro */}
            <div className="p-3.5 rounded-xl bg-[#0d0a14] border border-outline-variant hover-mini-card flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary-container border border-primary/40 flex items-center justify-center text-[#e0b3ff] shrink-0">
                  <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                    design_services
                  </span>
                </span>
                <div>
                  <p className="font-body text-label-sm text-on-surface">Figma Pro · Monthly</p>
                  <p className="font-body text-[12px] text-on-surface-variant tabular-nums">
                    $12.00 · Auto-Pay
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-primary/20 border border-primary/40 font-body text-label-sm text-[#d6adff]">
                Active
              </span>
            </div>

            {/* Subscription 3: iCloud */}
            <div className="p-3.5 rounded-xl bg-[#0d0a14] border border-outline-variant hover-mini-card flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-success/15 border border-success/30 flex items-center justify-center text-success shrink-0">
                  <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                    cloud
                  </span>
                </span>
                <div>
                  <p className="font-body text-label-sm text-on-surface">iCloud · 50GB</p>
                  <p className="font-body text-[12px] text-on-surface-variant tabular-nums">
                    $0.99 · Renewed
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-success/15 border border-success/30 font-body text-label-sm text-success">
                Paid
              </span>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
