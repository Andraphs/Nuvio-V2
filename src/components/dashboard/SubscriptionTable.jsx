import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { formatUSD } from '../../data/dashboardData';

const STATUS_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'Active', label: 'Active' },
  { id: 'Unpaid', label: 'Unpaid' },
];

export function SubscriptionTable({
  subscriptions,
  searchQuery,
  onResetSearch,
  onPaySubscription,
  onManageSubscription,
  onAddSubscription,
  onViewAll,
}) {
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortAsc((prev) => !prev);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const unpaidCount = useMemo(
    () => subscriptions.filter((s) => s.status === 'Unpaid').length,
    [subscriptions]
  );

  const filteredSubs = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    let result = subscriptions.filter((sub) => {
      const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
      const matchesQuery =
        !query ||
        sub.service.toLowerCase().includes(query) ||
        sub.plan.toLowerCase().includes(query) ||
        sub.billing.toLowerCase().includes(query) ||
        sub.status.toLowerCase().includes(query);
      return matchesStatus && matchesQuery;
    });

    if (sortKey) {
      result = [...result].sort((a, b) => {
        let valA = a[sortKey];
        let valB = b[sortKey];
        if (sortKey === 'nextBilling') {
          valA = new Date(valA).getTime();
          valB = new Date(valB).getTime();
        }
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortAsc ? valA - valB : valB - valA;
        }
        return sortAsc
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }
    return result;
  }, [subscriptions, searchQuery, statusFilter, sortKey, sortAsc]);

  const renderSortIcon = (key) => {
    if (sortKey !== key) {
      return (
        <span
          className="material-symbols-outlined text-body-md text-on-surface-variant/60"
          aria-hidden="true"
        >
          unfold_more
        </span>
      );
    }
    return (
      <span className="material-symbols-outlined text-body-md text-secondary" aria-hidden="true">
        {sortAsc ? 'arrow_upward' : 'arrow_downward'}
      </span>
    );
  };

  const getAriaSort = (key) => {
    if (sortKey !== key) return 'none';
    return sortAsc ? 'ascending' : 'descending';
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="md:col-span-8 obsidian-surface border rounded-lg p-4 flex flex-col gap-3"
    >
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-md bg-surface-container-high border border-outline-variant flex items-center justify-center shrink-0">
              <span
                className="material-symbols-outlined text-title-md text-on-surface"
                aria-hidden="true"
              >
                receipt_long
              </span>
            </span>
            <h2 data-design-text-token="title-md" className="font-body text-title-md text-on-surface">
              Subscription List
            </h2>
          </div>

          {/* Quick Status Filter Pills */}
          <div
            className="inline-flex items-center p-0.5 rounded-full obsidian-nav-capsule border border-outline-variant"
            role="tablist"
            aria-label="Filter subscriptions by status"
          >
            {STATUS_FILTERS.map((f) => {
              const isSelected = statusFilter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setStatusFilter(f.id)}
                  className={`relative px-2.5 py-1 rounded-full font-body text-label-sm transition-colors duration-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                    isSelected
                      ? 'text-on-surface'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="sub-filter-pill"
                      transition={{ type: 'spring', stiffness: 460, damping: 36 }}
                      className="absolute inset-0 rounded-full bg-surface-container-high border border-primary/40 pointer-events-none"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10 inline-flex items-center gap-1">
                    {f.label}
                    {f.id === 'Unpaid' && unpaidCount > 0 && (
                      <span className="px-1.5 py-0 rounded-full bg-warning/20 text-warning text-[11px] tabular-nums">
                        {unpaidCount}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="add-subscription-btn"
            type="button"
            onClick={onAddSubscription}
            className="inline-flex items-center gap-1.5 font-body text-label-lg text-[#d6adff] hover:text-secondary transition-colors duration-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-sm"
          >
            <span className="material-symbols-outlined text-title-md" aria-hidden="true">
              add_circle_outline
            </span>
            <span>Add Subscription</span>
          </button>
          <span className="h-4 w-px bg-outline-variant" aria-hidden="true" />
          <button
            id="view-all-subs-btn"
            type="button"
            onClick={() => {
              setStatusFilter('all');
              if (searchQuery) onResetSearch();
              onViewAll();
            }}
            className="font-body text-label-lg text-on-surface-variant hover:text-on-surface transition-colors duration-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-sm"
          >
            View All
          </button>
        </div>
      </header>

      {filteredSubs.length > 0 ? (
        <div
          data-component-id="table-standard"
          data-component-type="table"
          data-component-variant="standard"
          className="w-full overflow-x-auto"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant text-on-surface-variant">
                <th
                  scope="col"
                  aria-sort={getAriaSort('service')}
                  className="py-2.5 px-2 font-body text-label-sm uppercase whitespace-nowrap"
                >
                  <button
                    type="button"
                    onClick={() => handleSort('service')}
                    className={`inline-flex items-center gap-1 transition-colors duration-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-sm ${
                      sortKey === 'service' ? 'text-on-surface' : 'hover:text-on-surface'
                    }`}
                  >
                    <span data-design-text-token="label-sm">SERVICE</span>
                    {renderSortIcon('service')}
                  </button>
                </th>
                <th scope="col" className="py-2.5 px-2 font-body text-label-sm uppercase whitespace-nowrap">
                  <span data-design-text-token="label-sm">PLAN</span>
                </th>
                <th
                  scope="col"
                  aria-sort={getAriaSort('billing')}
                  className="py-2.5 px-2 font-body text-label-sm uppercase whitespace-nowrap"
                >
                  <button
                    type="button"
                    onClick={() => handleSort('billing')}
                    className={`inline-flex items-center gap-1 transition-colors duration-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-sm ${
                      sortKey === 'billing' ? 'text-on-surface' : 'hover:text-on-surface'
                    }`}
                  >
                    <span data-design-text-token="label-sm">BILLING</span>
                    {renderSortIcon('billing')}
                  </button>
                </th>
                <th
                  scope="col"
                  aria-sort={getAriaSort('nextBilling')}
                  className="py-2.5 px-2 font-body text-label-sm uppercase whitespace-nowrap"
                >
                  <button
                    type="button"
                    onClick={() => handleSort('nextBilling')}
                    className={`inline-flex items-center gap-1 transition-colors duration-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-sm ${
                      sortKey === 'nextBilling' ? 'text-on-surface' : 'hover:text-on-surface'
                    }`}
                  >
                    <span data-design-text-token="label-sm">NEXT BILLING</span>
                    {renderSortIcon('nextBilling')}
                  </button>
                </th>
                <th
                  scope="col"
                  aria-sort={getAriaSort('amount')}
                  className="py-2.5 px-2 font-body text-label-sm uppercase whitespace-nowrap"
                >
                  <button
                    type="button"
                    onClick={() => handleSort('amount')}
                    className={`inline-flex items-center gap-1 transition-colors duration-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-sm ${
                      sortKey === 'amount' ? 'text-on-surface' : 'hover:text-on-surface'
                    }`}
                  >
                    <span data-design-text-token="label-sm">AMOUNT</span>
                    {renderSortIcon('amount')}
                  </button>
                </th>
                <th
                  scope="col"
                  aria-sort={getAriaSort('status')}
                  className="py-2.5 px-2 font-body text-label-sm uppercase whitespace-nowrap"
                >
                  <button
                    type="button"
                    onClick={() => handleSort('status')}
                    className={`inline-flex items-center gap-1 transition-colors duration-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-sm ${
                      sortKey === 'status' ? 'text-on-surface' : 'hover:text-on-surface'
                    }`}
                  >
                    <span data-design-text-token="label-sm">STATUS</span>
                    {renderSortIcon('status')}
                  </button>
                </th>
                <th
                  scope="col"
                  className="py-2.5 px-2 font-body text-label-sm uppercase whitespace-nowrap text-right"
                >
                  <span data-design-text-token="label-sm">ACTIONS</span>
                </th>
              </tr>
            </thead>
            <tbody id="sub-table-body" className="divide-y divide-outline-variant">
              {filteredSubs.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-surface-container-high/70 transition-colors duration-state-change ease-state-change group"
                >
                  <td className="py-3 px-2 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-7 h-7 rounded-full border border-outline-variant flex items-center justify-center shrink-0 transition-transform duration-150 group-hover:scale-105 ${sub.iconBg}`}
                      >
                        <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                          {sub.icon}
                        </span>
                      </span>
                      <span
                        data-design-text-token="label-sm"
                        className="font-body text-label-sm text-on-surface"
                      >
                        {sub.service}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2 font-body text-body-sm text-on-surface-variant whitespace-nowrap">
                    <span data-design-text-token="body-sm">{sub.plan}</span>
                  </td>
                  <td className="py-3 px-2 font-body text-body-sm text-on-surface-variant whitespace-nowrap">
                    <span data-design-text-token="body-sm">{sub.billing}</span>
                  </td>
                  <td className="py-3 px-2 font-body text-body-sm text-on-surface-variant tabular-nums whitespace-nowrap">
                    <span data-design-text-token="body-sm">{sub.nextBilling}</span>
                  </td>
                  <td className="py-3 px-2 font-body text-label-sm text-on-surface tabular-nums whitespace-nowrap">
                    <span data-design-text-token="label-sm">{formatUSD(sub.amount)}</span>
                  </td>
                  <td className="py-3 px-2 whitespace-nowrap">
                    <AnimatePresence mode="wait">
                      {sub.status === 'Active' ? (
                        <motion.span
                          key="active"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.18 }}
                          data-design-text-token="label-sm"
                          className="inline-flex items-center gap-1.5 font-body text-label-sm text-success"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-success" aria-hidden="true" />
                          Active
                        </motion.span>
                      ) : (
                        <motion.span
                          key="unpaid"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.18 }}
                          data-design-text-token="label-sm"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-high border border-warning/30 font-body text-label-sm text-warning"
                        >
                          <span className="material-symbols-outlined text-body-sm" aria-hidden="true">
                            warning
                          </span>
                          <span>Unpaid</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </td>
                  <td className="py-3 px-2 text-right whitespace-nowrap">
                    {sub.status === 'Active' ? (
                      <button
                        type="button"
                        onClick={() => onManageSubscription(sub)}
                        aria-label={`More actions for ${sub.service}`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary transition-colors duration-state-change"
                      >
                        <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                          more_horiz
                        </span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onPaySubscription(sub)}
                        className="px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-[#e0b3ff] hover:bg-primary/35 hover:text-on-surface active:scale-95 font-body text-label-sm transition-all duration-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                      >
                        Pay
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          id="sub-empty-state"
          className="flex flex-col items-center justify-center text-center py-6 px-4 gap-2 bg-surface-container-low rounded-md border border-outline-variant"
        >
          <p data-design-text-token="label-lg" className="font-body text-label-lg text-on-surface">
            No subscriptions match your filter
          </p>
          <p className="font-body text-body-sm text-on-surface-variant">
            Clear your search or switch back to All to see recurring bills.
          </p>
          <button
            id="reset-sub-empty-btn"
            type="button"
            onClick={() => {
              setStatusFilter('all');
              onResetSearch();
            }}
            className="mt-1 px-3.5 py-1.5 rounded-full bg-surface-container-high text-on-surface border border-outline-variant font-body text-label-sm hover:border-outline transition-colors duration-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            Show All
          </button>
        </div>
      )}
    </motion.article>
  );
}
