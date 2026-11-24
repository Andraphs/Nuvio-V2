import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion } from 'framer-motion';
import { formatUSD, formatWholeUSD } from '../../data/dashboardData';

function AnimatedCurrency({ value, whole = false, withSign = false }) {
  const prevRef = useRef(value);
  const [displayVal, setDisplayVal] = useState(value);

  useEffect(() => {
    const from = prevRef.current;
    prevRef.current = value;
    if (from === value) {
      setDisplayVal(value);
      return;
    }
    const controls = animate(from, value, {
      duration: 0.42,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayVal(latest),
    });
    return () => controls.stop();
  }, [value]);

  if (whole) {
    const sign = withSign ? (displayVal >= 0 ? '+' : '-') : '';
    return `${sign}${formatWholeUSD(Math.abs(displayVal))}`;
  }
  return formatUSD(displayVal, withSign);
}

function CompareBadge({ compare, fallbackText = 'No prior comparison' }) {
  const badgeKey = compare ? `${compare.pct}-${compare.vs}` : `fallback-${fallbackText}`;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={badgeKey}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-1.5 flex-wrap"
      >
        {!compare ? (
          <span
            data-design-text-token="body-sm"
            className="font-body text-body-sm text-on-surface-variant"
          >
            {fallbackText}
          </span>
        ) : (
          <>
            <span
              className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-surface-container-high ${
                compare.positive ? 'text-success' : 'text-warning'
              } font-body text-label-sm tabular-nums`}
            >
              <span className="material-symbols-outlined text-body-sm" aria-hidden="true">
                {compare.pct.startsWith('-') ? 'trending_down' : 'trending_up'}
              </span>
              <span data-design-text-token="label-sm">{compare.pct}</span>
            </span>
            <span
              data-design-text-token="body-sm"
              className="font-body text-body-sm text-on-surface-variant"
            >
              {compare.vs}
            </span>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.04 + i * 0.06,
      duration: 0.34,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function MetricCards({ metrics, focusedMetric = null }) {
  const net = metrics.income - metrics.expense;

  return (
    <section
      aria-label="Financial summary"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-stretch"
    >
      {/* Total Balance (Hero Card - 6 cols) */}
      <motion.article
        custom={0}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        data-component-id="card-elevated"
        data-component-type="card"
        data-component-variant="elevated"
        className={`sm:col-span-2 lg:col-span-6 relative overflow-hidden h-full obsidian-hero-card border rounded-lg p-4 flex flex-col justify-between gap-2.5 group ${
          focusedMetric === 'balance' ? 'ring-2 ring-secondary/80' : ''
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#9312ff]/25 via-[#7a1cf8]/10 to-transparent"
          aria-hidden="true"
        />
        <header className="relative flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h2
              data-design-text-token="label-sm"
              className="font-body text-label-sm text-[#b7a8c9]"
            >
              Total Balance (USD)
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/20 border border-primary/40 font-body text-label-sm text-[#d6adff] tabular-nums">
              Net <AnimatedCurrency value={net} whole withSign />
            </span>
          </div>
          <span className="w-8 h-8 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
            <span
              className="material-symbols-outlined text-secondary text-title-md"
              aria-hidden="true"
            >
              account_balance_wallet
            </span>
          </span>
        </header>

        <div className="relative flex items-end justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <p
              id="metric-balance"
              data-design-text-token="headline-lg"
              className="font-headline text-headline-lg text-on-surface tabular-nums"
            >
              <AnimatedCurrency value={metrics.balance} />
            </p>
            <div id="metric-balance-compare" className="min-h-[22px]">
              <CompareBadge
                compare={metrics.balanceCompare}
                fallbackText={metrics.compareFallback}
              />
            </div>
          </div>
          <svg
            className="w-28 h-12 text-secondary shrink-0 overflow-visible"
            viewBox="0 0 112 48"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="balance-spark-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b14eff" stopOpacity="0.26" />
                <stop offset="100%" stopColor="#b14eff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d="M2 38C18 36 26 28 40 29C54 30 62 18 76 16C90 14 98 7 110 4 L110 46 L2 46 Z"
              fill="url(#balance-spark-fill)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            />
            <motion.path
              d="M2 38C18 36 26 28 40 29C54 30 62 18 76 16C90 14 98 7 110 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0.4 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.circle
              cx="110"
              cy="4"
              r="3"
              fill="#e0b3ff"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.24, delay: 0.72 }}
            />
          </svg>
        </div>
      </motion.article>

      {/* Income (3 cols) */}
      <motion.article
        custom={1}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        data-component-id="card-elevated"
        data-component-type="card"
        data-component-variant="elevated"
        className={`lg:col-span-3 h-full obsidian-surface dashboard-card-interactive border rounded-lg p-4 flex flex-col justify-between gap-2.5 group ${
          focusedMetric === 'income' ? 'ring-2 ring-success/80' : ''
        }`}
      >
        <header className="flex items-center justify-between gap-2">
          <h2
            data-design-text-token="label-sm"
            className="font-body text-label-sm text-on-surface-variant"
          >
            Income (<span className="period-short">{metrics.label}</span>)
          </h2>
          <span className="w-8 h-8 rounded-md bg-surface-container-high border border-outline-variant flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
            <span
              className="material-symbols-outlined text-success text-title-md"
              aria-hidden="true"
            >
              arrow_downward
            </span>
          </span>
        </header>

        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col gap-1.5 min-w-0">
            <p
              id="metric-income"
              data-design-text-token="headline-lg"
              className="font-headline text-headline-lg text-on-surface tabular-nums"
            >
              <AnimatedCurrency value={metrics.income} />
            </p>
            <div id="metric-income-compare" className="min-h-[22px]">
              <CompareBadge
                compare={metrics.incomeCompare}
                fallbackText={metrics.compareFallback}
              />
            </div>
          </div>
          <svg
            className="w-14 h-9 text-success shrink-0 overflow-visible"
            viewBox="0 0 80 40"
            fill="none"
            aria-hidden="true"
          >
            <motion.path
              d="M2 30C14 29 22 28 32 22C42 16 50 18 60 11C68 6 73 7 78 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0.4 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.circle
              cx="78"
              cy="5"
              r="2.5"
              fill="currentColor"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.22, delay: 0.74 }}
            />
          </svg>
        </div>
      </motion.article>

      {/* Expenses (3 cols) */}
      <motion.article
        custom={2}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        data-component-id="card-elevated"
        data-component-type="card"
        data-component-variant="elevated"
        className={`lg:col-span-3 h-full obsidian-surface dashboard-card-interactive border rounded-lg p-4 flex flex-col justify-between gap-2.5 group ${
          focusedMetric === 'expense' ? 'ring-2 ring-warning/80' : ''
        }`}
      >
        <header className="flex items-center justify-between gap-2">
          <h2
            data-design-text-token="label-sm"
            className="font-body text-label-sm text-on-surface-variant"
          >
            Expenses (<span className="period-short">{metrics.label}</span>)
          </h2>
          <span className="w-8 h-8 rounded-md bg-surface-container-high border border-outline-variant flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
            <span
              className="material-symbols-outlined text-warning text-title-md"
              aria-hidden="true"
            >
              arrow_upward
            </span>
          </span>
        </header>

        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col gap-1.5 min-w-0">
            <p
              id="metric-expense"
              data-design-text-token="headline-lg"
              className="font-headline text-headline-lg text-on-surface tabular-nums"
            >
              <AnimatedCurrency value={metrics.expense} />
            </p>
            <div id="metric-expense-compare" className="min-h-[22px]">
              <CompareBadge
                compare={metrics.expenseCompare}
                fallbackText={metrics.compareFallback}
              />
            </div>
          </div>
          <svg
            className="w-14 h-9 text-warning shrink-0 overflow-visible"
            viewBox="0 0 80 40"
            fill="none"
            aria-hidden="true"
          >
            <motion.path
              d="M2 14C12 18 20 12 30 20C40 28 50 18 60 24C68 28 73 25 78 27"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0.4 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.circle
              cx="78"
              cy="27"
              r="2.5"
              fill="currentColor"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.22, delay: 0.8 }}
            />
          </svg>
        </div>
      </motion.article>
    </section>
  );
}
