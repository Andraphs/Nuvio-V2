import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CHART_DATASETS, formatUSD, formatWholeUSD } from '../../data/dashboardData';

function buildSmoothPath(points) {
  if (!points.length) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cx = (p0.x + p1.x) / 2;
    d += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return d;
}

const SERIES_META = [
  { key: 'balance', label: 'Total Balance', shortLabel: 'Balance', dotClass: 'bg-secondary' },
  { key: 'income', label: 'Income', shortLabel: 'Income', dotClass: 'bg-success' },
  { key: 'expense', label: 'Expenses', shortLabel: 'Expenses', dotClass: 'bg-warning' },
];

export function AnnualCashFlowChart({
  chartYear,
  onChartYearChange,
  activeMonthIdx,
  onSelectMonth,
  onMoreClick,
}) {
  const items = CHART_DATASETS[chartYear] || [];
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [visibleSeries, setVisibleSeries] = useState({
    balance: true,
    income: true,
    expense: true,
  });

  useEffect(() => {
    setHoveredIdx(null);
  }, [chartYear, activeMonthIdx]);

  const toggleSeries = (key) => {
    setVisibleSeries((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (!next.balance && !next.income && !next.expense) {
        return prev;
      }
      return next;
    });
  };

  const safeActiveIdx = items.length ? Math.min(activeMonthIdx, items.length - 1) : 0;
  const displayIdx = hoveredIdx !== null && items[hoveredIdx] ? hoveredIdx : safeActiveIdx;

  const yTop = 14;
  const yBottom = 172;
  const ySpan = yBottom - yTop;
  const maxBal = 20000;
  const maxFlow = 8000;
  const toBalY = (val) =>
    Math.round((yBottom - (Math.min(maxBal, Math.max(0, val)) / maxBal) * ySpan) * 10) / 10;
  const toFlowY = (val) =>
    Math.round((yBottom - (Math.min(maxFlow, Math.max(0, val)) / maxFlow) * ySpan) * 10) / 10;
  const toX = (idx) => 30 + idx * 60;

  const ptsBal = items.map((d, i) => ({ x: toX(i), y: toBalY(d.balance) }));
  const ptsInc = items.map((d, i) => ({ x: toX(i), y: toFlowY(d.income) }));
  const ptsExp = items.map((d, i) => ({ x: toX(i), y: toFlowY(d.expense) }));

  const pathBal = buildSmoothPath(ptsBal);
  const pathInc = buildSmoothPath(ptsInc);
  const pathExp = buildSmoothPath(ptsExp);
  const areaBal = items.length
    ? `${pathBal} L ${ptsBal[ptsBal.length - 1].x} ${yBottom} L ${ptsBal[0].x} ${yBottom} Z`
    : '';

  const currentItem = items[displayIdx];
  const tooltipLeftPct = Math.min(82, Math.max(18, ((30 + displayIdx * 60) / 720) * 100));
  const net = currentItem ? currentItem.income - currentItem.expense : 0;
  const netSign = net >= 0 ? '+' : '-';

  return (
    <motion.article
      id="analytics"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
      className="md:col-span-8 obsidian-surface border rounded-lg p-4 flex flex-col justify-between gap-3"
    >
      <header className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-title-md text-secondary"
            aria-hidden="true"
          >
            show_chart
          </span>
          <h2 data-design-text-token="title-md" className="font-body text-title-md text-on-surface">
            Annual Cash Flow
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Interactive Legend Filter */}
          <div className="hidden sm:flex items-center gap-1.5" role="group" aria-label="Toggle chart series">
            {SERIES_META.map((s) => {
              const active = visibleSeries[s.key];
              return (
                <button
                  key={s.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleSeries(s.key)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-body text-body-sm transition-all duration-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                    active
                      ? 'bg-surface-container-high/80 border-outline-variant text-on-surface'
                      : 'bg-transparent border-transparent text-on-surface-variant/50 hover:text-on-surface-variant'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${s.dotClass} transition-opacity ${
                      active ? 'opacity-100' : 'opacity-30'
                    }`}
                    aria-hidden="true"
                  />
                  <span data-design-text-token="body-sm">{s.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="chart-year-select" className="sr-only">
              Select chart year
            </label>
            <div className="relative inline-flex items-center">
              <select
                id="chart-year-select"
                value={chartYear}
                onChange={(e) => onChartYearChange(e.target.value)}
                className="appearance-none bg-none h-8 rounded-full obsidian-nav-capsule border border-outline-variant hover:border-outline text-on-surface font-body text-label-sm pl-3.5 pr-8 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors duration-state-change cursor-pointer"
              >
                <option value="2026" className="bg-[#0d0a14] text-on-surface">
                  2026
                </option>
                <option value="2025" className="bg-[#0d0a14] text-on-surface">
                  2025
                </option>
                <option value="empty" className="bg-[#0d0a14] text-on-surface">
                  2024 (Empty)
                </option>
              </select>
              <span
                className="material-symbols-outlined text-body-md text-on-surface-variant pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              >
                expand_more
              </span>
            </div>

            <button
              id="chart-more-btn"
              type="button"
              onClick={onMoreClick}
              aria-label="Annual cash flow options"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary transition-colors duration-state-change"
            >
              <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                more_horiz
              </span>
            </button>
          </div>
        </div>
      </header>

      {items.length > 0 ? (
        <div
          id="chart-container"
          onMouseLeave={() => setHoveredIdx(null)}
          className="relative w-full flex flex-col gap-2"
        >
          {/* Plot Area */}
          <div className="flex items-stretch gap-2">
            <div
              className="w-10 shrink-0 flex flex-col justify-between text-right py-1 select-none"
              aria-hidden="true"
            >
              <span className="font-body text-body-sm text-secondary tabular-nums">$20k</span>
              <span className="font-body text-body-sm text-on-surface-variant tabular-nums">
                $15k
              </span>
              <span className="font-body text-body-sm text-on-surface-variant tabular-nums">
                $10k
              </span>
              <span className="font-body text-body-sm text-on-surface-variant tabular-nums">
                $5k
              </span>
              <span className="font-body text-body-sm text-on-surface-variant tabular-nums">0</span>
            </div>

            <div className="relative flex-1 min-w-0">
              <svg
                id="trend-chart-svg"
                viewBox="0 0 720 184"
                className="w-full h-auto block overflow-visible"
                role="img"
                aria-label={`Annual cash flow trend chart for ${chartYear}`}
              >
                <defs>
                  <linearGradient id="trend-area-balance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9312ff" stopOpacity="0.32" />
                    <stop offset="55%" stopColor="#7a1cf8" stopOpacity="0.10" />
                    <stop offset="100%" stopColor="#9312ff" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {[5000, 10000, 15000, 20000].map((v) => {
                  const y = toBalY(v);
                  return (
                    <line
                      key={`h-${v}`}
                      x1="12"
                      y1={y}
                      x2="708"
                      y2={y}
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="2 4"
                      className="text-outline-variant opacity-60"
                    />
                  );
                })}

                {items.map((item, i) => {
                  const x = toX(i);
                  return (
                    <line
                      key={`v-${item.m}`}
                      x1={x}
                      y1={yTop}
                      x2={x}
                      y2={yBottom}
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="3 4"
                      className="text-outline-variant opacity-50"
                    />
                  );
                })}

                <line
                  x1="12"
                  y1={yBottom}
                  x2="708"
                  y2={yBottom}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-outline-variant"
                />

                {/* Balance Area & Series */}
                {visibleSeries.balance && (
                  <>
                    <motion.path
                      key={`area-${chartYear}`}
                      d={areaBal}
                      fill="url(#trend-area-balance)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                    />
                    <motion.path
                      key={`bal-${chartYear}`}
                      d={pathBal}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-secondary"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </>
                )}

                {visibleSeries.expense && (
                  <motion.path
                    key={`exp-${chartYear}`}
                    d={pathExp}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-warning"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}

                {visibleSeries.income && (
                  <motion.path
                    key={`inc-${chartYear}`}
                    d={pathInc}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-success"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.03, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}

                {/* Animated Crosshair & Focus Dots */}
                <g
                  style={{
                    transform: `translateX(${toX(displayIdx)}px)`,
                    transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <line
                    x1={0}
                    y1={yTop}
                    x2={0}
                    y2={yBottom}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className="text-secondary/70"
                  />
                </g>

                {visibleSeries.expense && (
                  <circle
                    cx={toX(displayIdx)}
                    cy={ptsExp[displayIdx].y}
                    r="4.5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="fill-surface-container text-warning transition-all duration-150 ease-out"
                  />
                )}
                {visibleSeries.income && (
                  <circle
                    cx={toX(displayIdx)}
                    cy={ptsInc[displayIdx].y}
                    r="4.5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="fill-surface-container text-success transition-all duration-150 ease-out"
                  />
                )}
                {visibleSeries.balance && (
                  <>
                    <circle
                      cx={toX(displayIdx)}
                      cy={ptsBal[displayIdx].y}
                      r="9"
                      className="fill-secondary/20 transition-all duration-150 ease-out"
                    />
                    <circle
                      cx={toX(displayIdx)}
                      cy={ptsBal[displayIdx].y}
                      r="4.5"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="fill-surface-container text-secondary transition-all duration-150 ease-out"
                    />
                  </>
                )}

                {/* Direct Hover & Click Columns */}
                {items.map((item, idx) => (
                  <rect
                    key={`hit-${item.m}`}
                    x={toX(idx) - 30}
                    y={0}
                    width={60}
                    height={yBottom + 12}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onClick={() => onSelectMonth(idx, chartYear)}
                  />
                ))}
              </svg>

              {/* Floating Dark Tooltip Card */}
              {currentItem && (
                <div
                  id="chart-tooltip"
                  role="status"
                  aria-live="polite"
                  style={{
                    left: `${tooltipLeftPct}%`,
                    transition: 'left 180ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="pointer-events-none absolute top-1 -translate-x-1/2 w-52 px-3 py-2 rounded-md bg-[#0d0a14]/95 border border-primary/40 text-on-surface flex flex-col gap-1 shadow-lg"
                >
                  <div className="flex items-center justify-between gap-2 pb-1 border-b border-outline-variant">
                    <span
                      id="tooltip-month"
                      data-design-text-token="label-sm"
                      className="font-body text-label-sm text-on-surface"
                    >
                      {currentItem.m} {chartYear}
                    </span>
                    <strong
                      id="tooltip-total"
                      data-design-text-token="label-sm"
                      className={`font-body text-label-sm tabular-nums ${
                        net >= 0 ? 'text-success' : 'text-warning'
                      }`}
                    >
                      Net {netSign}
                      {formatWholeUSD(Math.abs(net))}
                    </strong>
                  </div>
                  {visibleSeries.balance && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 font-body text-body-sm text-on-surface-variant">
                        <span className="w-2 h-2 rounded-full bg-secondary shrink-0" aria-hidden="true" />
                        Balance
                      </span>
                      <strong
                        id="tooltip-cat1"
                        data-design-text-token="label-sm"
                        className="font-body text-label-sm text-on-surface tabular-nums"
                      >
                        {formatUSD(currentItem.balance)}
                      </strong>
                    </div>
                  )}
                  {visibleSeries.income && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 font-body text-body-sm text-on-surface-variant">
                        <span className="w-2 h-2 rounded-full bg-success shrink-0" aria-hidden="true" />
                        Income
                      </span>
                      <strong
                        id="tooltip-cat2"
                        data-design-text-token="label-sm"
                        className="font-body text-label-sm text-on-surface tabular-nums"
                      >
                        {formatUSD(currentItem.income)}
                      </strong>
                    </div>
                  )}
                  {visibleSeries.expense && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 font-body text-body-sm text-on-surface-variant">
                        <span className="w-2 h-2 rounded-full bg-warning shrink-0" aria-hidden="true" />
                        Expenses
                      </span>
                      <strong
                        id="tooltip-cat3"
                        data-design-text-token="label-sm"
                        className="font-body text-label-sm text-on-surface tabular-nums"
                      >
                        {formatUSD(currentItem.expense)}
                      </strong>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div
              className="hidden sm:flex w-8 shrink-0 flex-col justify-between text-left py-1 select-none"
              aria-hidden="true"
            >
              <span className="font-body text-body-sm text-success tabular-nums">$8k</span>
              <span className="font-body text-body-sm text-on-surface-variant tabular-nums">
                $6k
              </span>
              <span className="font-body text-body-sm text-on-surface-variant tabular-nums">
                $4k
              </span>
              <span className="font-body text-body-sm text-on-surface-variant tabular-nums">
                $2k
              </span>
              <span className="font-body text-body-sm text-on-surface-variant tabular-nums">0</span>
            </div>
          </div>

          {/* X-Axis Month Selector Buttons */}
          <div
            id="chart-months-row"
            className="pl-12 sm:pr-10 grid grid-cols-6 sm:grid-cols-12 gap-1"
          >
            {items.map((item, idx) => {
              const isActive = idx === safeActiveIdx;
              return (
                <button
                  key={item.m}
                  type="button"
                  aria-label={`${item.m} ${chartYear}: Balance ${formatUSD(
                    item.balance
                  )}, Income ${formatUSD(item.income)}, Expenses ${formatUSD(item.expense)}`}
                  aria-pressed={isActive ? 'true' : 'false'}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onFocus={() => setHoveredIdx(idx)}
                  onClick={() => onSelectMonth(idx, chartYear)}
                  className={`relative py-1 rounded-full font-body text-label-sm transition-colors duration-state-change focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                    isActive
                      ? 'text-on-surface'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-month-pill"
                      transition={{ type: 'spring', stiffness: 460, damping: 36 }}
                      className="absolute inset-0 rounded-full bg-surface-container-high border border-primary/40 pointer-events-none"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{item.m}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <motion.div
          id="chart-empty-state"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.24 }}
          className="flex flex-col items-center justify-center text-center py-8 px-4 gap-2.5 bg-surface-container-low rounded-md border border-outline-variant"
        >
          <span
            className="material-symbols-outlined text-on-surface-variant text-headline-md"
            aria-hidden="true"
          >
            show_chart
          </span>
          <p data-design-text-token="label-lg" className="font-body text-label-lg text-on-surface">
            No cash flow records for 2024
          </p>
          <p
            data-design-text-token="body-sm"
            className="font-body text-body-sm text-on-surface-variant max-w-xs"
          >
            Accounts were connected starting in 2025. Switch back to 2026 to view active trends.
          </p>
          <button
            type="button"
            onClick={() => onChartYearChange('2026')}
            className="mt-1 px-4 py-1.5 rounded-full obsidian-violet-btn font-body text-label-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            View 2026 Data
          </button>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-outline-variant">
        <p
          id="chart-year-caption"
          data-design-text-token="body-sm"
          className="font-body text-body-sm text-on-surface-variant"
        >
          *This chart shows data for {chartYear === 'empty' ? '2024' : chartYear}
        </p>
        <div className="flex sm:hidden flex-wrap items-center gap-2">
          {SERIES_META.map((s) => {
            const active = visibleSeries[s.key];
            return (
              <button
                key={`m-${s.key}`}
                type="button"
                aria-pressed={active}
                onClick={() => toggleSeries(s.key)}
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-body-sm ${
                  active
                    ? 'border-outline-variant text-on-surface'
                    : 'border-transparent text-on-surface-variant/50'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${s.dotClass} inline-block`} aria-hidden="true" />
                <span>{s.shortLabel}</span>
              </button>
            );
          })}
        </div>
        <span
          data-design-text-token="body-sm"
          className="hidden sm:inline font-body text-body-sm text-on-surface-variant"
        >
          Hover or click any month to sync Total Balance, Income &amp; Expenses
        </span>
      </footer>
    </motion.article>
  );
}
