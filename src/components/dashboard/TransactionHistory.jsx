import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TRANSACTION_GROUPS_BY_PERIOD } from '../../data/dashboardData';

export function TransactionHistory({ searchQuery = '', onSelectTransaction }) {
  const [txPeriod, setTxPeriod] = useState('this-month');
  const isLastMonth = txPeriod === 'last-month';

  const groups = useMemo(() => {
    const raw = TRANSACTION_GROUPS_BY_PERIOD[txPeriod] || [];
    const query = searchQuery.toLowerCase().trim();
    if (!query) return raw;
    return raw
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.title.toLowerCase().includes(query) ||
            item.meta.toLowerCase().includes(query) ||
            item.amount.toLowerCase().includes(query)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [txPeriod, searchQuery]);

  return (
    <motion.article
      id="transactions"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="md:col-span-4 obsidian-surface border rounded-lg p-4 flex flex-col gap-3.5"
    >
      <header className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="material-symbols-outlined text-title-md text-on-surface shrink-0"
            aria-hidden="true"
          >
            receipt
          </span>
          <h2
            data-design-text-token="title-md"
            className="font-body text-title-md text-on-surface whitespace-nowrap"
          >
            Transaction History
          </h2>
        </div>

        <label htmlFor="tx-history-period" className="sr-only">
          Transaction history period
        </label>
        <div className="relative inline-flex items-center shrink-0">
          <select
            id="tx-history-period"
            value={txPeriod}
            onChange={(e) => setTxPeriod(e.target.value)}
            className="appearance-none bg-none h-8 rounded-full obsidian-nav-capsule border border-outline-variant hover:border-outline text-on-surface font-body text-label-sm pl-3.5 pr-8 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors duration-state-change cursor-pointer"
          >
            <option value="this-month" className="bg-[#0d0a14] text-on-surface">
              This Month
            </option>
            <option value="last-month" className="bg-[#0d0a14] text-on-surface">
              Last Month
            </option>
          </select>
          <span
            className="material-symbols-outlined text-body-md text-on-surface-variant pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
            aria-hidden="true"
          >
            expand_more
          </span>
        </div>
      </header>

      {/* Monthly Spend Progress Strip */}
      <div className="flex flex-col gap-2">
        <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
          <motion.div
            id="tx-history-progress"
            className="h-full rounded-full bg-gradient-to-r from-[#a020ff] to-[#e0b3ff]"
            initial={false}
            animate={{ width: isLastMonth ? '78%' : '62%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <p
            id="tx-history-delta"
            data-design-text-token="body-sm"
            className="font-body text-body-sm text-on-surface-variant"
          >
            {isLastMonth ? (
              <>
                Decreased <span className="font-body text-label-sm text-on-surface">4%</span> last
                month
              </>
            ) : (
              <>
                Increased <span className="font-body text-label-sm text-on-surface">12%</span> this
                month
              </>
            )}
          </p>
          <p
            id="tx-history-sofar"
            data-design-text-token="body-sm"
            className="font-body text-body-sm text-on-surface-variant tabular-nums"
          >
            {isLastMonth ? (
              <>
                <span className="font-body text-label-sm text-on-surface">$284.50</span> total
              </>
            ) : (
              <>
                <span className="font-body text-label-sm text-on-surface">$102.00</span> so far
              </>
            )}
          </p>
        </div>
      </div>

      {/* Grouped Transactions */}
      <AnimatePresence mode="wait">
        {groups.length > 0 ? (
          <motion.div
            key={`${txPeriod}-${searchQuery ? 'filtered' : 'all'}`}
            id="tx-history-groups"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            {groups.map((group) => (
              <div key={group.label} className="flex flex-col gap-1.5">
                <span
                  data-design-text-token="label-sm"
                  className="font-body text-label-sm text-on-surface-variant"
                >
                  {group.label}
                </span>
                <ul className="flex flex-col gap-1">
                  {group.items.map((item) => (
                    <li key={item.id || item.title}>
                      <button
                        type="button"
                        onClick={() => onSelectTransaction?.(item)}
                        className="w-full text-left flex items-center justify-between gap-3 px-2 py-1.5 -mx-2 rounded-md hover:bg-surface-container-high/70 transition-colors duration-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-150 group-hover:scale-105 ${item.iconWrapClass}`}
                          >
                            <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                              {item.icon}
                            </span>
                          </span>
                          <div className="flex flex-col min-w-0">
                            <span
                              data-design-text-token="label-lg"
                              className="font-body text-label-lg text-on-surface truncate"
                            >
                              {item.title}
                            </span>
                            <span
                              data-design-text-token="body-sm"
                              className="inline-flex items-center gap-1 font-body text-body-sm text-on-surface-variant truncate"
                            >
                              <span
                                className="material-symbols-outlined text-body-sm"
                                aria-hidden="true"
                              >
                                {item.directionIcon}
                              </span>
                              <span>{item.meta}</span>
                            </span>
                          </div>
                        </div>
                        <span
                          data-design-text-token="label-lg"
                          className={`font-body text-label-lg tabular-nums whitespace-nowrap ${item.amountClass}`}
                        >
                          {item.amount}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="tx-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center py-6 px-3 gap-1.5 rounded-md bg-surface-container-low border border-outline-variant"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-headline-md" aria-hidden="true">
              search_off
            </span>
            <p className="font-body text-label-sm text-on-surface">No matching transactions</p>
            <p className="font-body text-body-sm text-on-surface-variant">
              Try a different keyword or switch period.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
