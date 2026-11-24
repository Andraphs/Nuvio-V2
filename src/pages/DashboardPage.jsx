import { useCallback, useEffect, useRef, useState } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { MetricCards } from '../components/dashboard/MetricCards';
import { AnnualCashFlowChart } from '../components/dashboard/AnnualCashFlowChart';
import { TransactionHistory } from '../components/dashboard/TransactionHistory';
import { ConnectedAccounts } from '../components/dashboard/ConnectedAccounts';
import { SubscriptionTable } from '../components/dashboard/SubscriptionTable';
import { ToastBanner } from '../components/dashboard/ToastBanner';
import {
  CHART_DATASETS,
  INITIAL_ACCOUNTS,
  INITIAL_SUBSCRIPTIONS,
  PERIOD_DATA,
  formatPctDelta,
  formatUSD,
} from '../data/dashboardData';

export function DashboardPage({ onBackToLanding }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [focusedMetric, setFocusedMetric] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [syncStatusText, setSyncStatusText] = useState('Synced: 2m ago');
  const [isSyncing, setIsSyncing] = useState(false);
  const [refreshingId, setRefreshingId] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('2026-11');
  const [chartYear, setChartYear] = useState('2026');
  const [activeMonthIdx, setActiveMonthIdx] = useState(10); // Nov 2026 synced with default period
  const [metrics, setMetrics] = useState(() => ({
    ...PERIOD_DATA['2026-11'],
    compareFallback: 'No prior comparison',
  }));
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
  const [subscriptions, setSubscriptions] = useState(INITIAL_SUBSCRIPTIONS);
  const [toast, setToast] = useState(null);

  const toastTimerRef = useRef(null);
  const syncTimerRef = useRef(null);
  const refreshTimerRef = useRef(null);
  const focusTimerRef = useRef(null);

  useEffect(() => {
    document.title = 'Dashboard | Nuvio Personal Finance';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
      if (focusTimerRef.current) clearTimeout(focusTimerRef.current);
    };
  }, []);

  const showToast = useCallback((message, onUndo = null) => {
    setToast({ message, onUndo });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 5000);
  }, []);

  const handleUndo = () => {
    if (toast?.onUndo) {
      toast.onUndo();
    }
    setToast(null);
  };

  const handleSelectNav = (navId, toastMsg) => {
    setActiveNav(navId);

    const metricFocusMap = {
      'analytics-balance': 'balance',
      'analytics-income': 'income',
      'analytics-expenses': 'expense',
    };

    if (metricFocusMap[navId]) {
      setFocusedMetric(metricFocusMap[navId]);
      if (focusTimerRef.current) clearTimeout(focusTimerRef.current);
      focusTimerRef.current = setTimeout(() => setFocusedMetric(null), 2200);
    } else {
      setFocusedMetric(null);
    }

    const scrollTargetMap = {
      transactions: 'transactions',
      analytics: 'analytics',
      accounts: 'accounts',
    };

    const targetEl = scrollTargetMap[navId] ? document.getElementById(scrollTargetMap[navId]) : null;
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (navId === 'dashboard') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (toastMsg) {
      showToast(toastMsg);
    }
  };

  const handleSyncAll = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    syncTimerRef.current = setTimeout(() => {
      setIsSyncing(false);
      setSyncStatusText('Synced: Just now');
      showToast('All active accounts synced.');
    }, 650);
  };

  const handleRetryAccountSync = (id, name) => {
    if (refreshingId) return;
    setRefreshingId(id);
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    refreshTimerRef.current = setTimeout(() => {
      setRefreshingId(null);
      setAccounts((prev) =>
        prev.map((acc) => (acc.id === id ? { ...acc, status: 'Synced' } : acc))
      );
      setSyncStatusText('Synced: Just now');
      showToast(`${name} reconnected and synced.`, () => {
        setAccounts((prev) =>
          prev.map((acc) => (acc.id === id ? { ...acc, status: 'Failed' } : acc))
        );
      });
    }, 700);
  };

  const handlePeriodChange = (val) => {
    setSelectedPeriod(val);
    const data = PERIOD_DATA[val];
    if (data) {
      setMetrics({
        ...data,
        compareFallback: 'No prior comparison',
      });
    }
    const periodToMonthIdx = { '2026-11': 10, '2026-10': 9, '2026-09': 8, '2026-01': 0 };
    if (periodToMonthIdx[val] !== undefined) {
      setChartYear('2026');
      setActiveMonthIdx(periodToMonthIdx[val]);
    }
  };

  const handleSelectChartMonth = (idx, year) => {
    setActiveMonthIdx(idx);
    const items = CHART_DATASETS[year] || [];
    const item = items[idx];
    if (!item) return;

    const prev = idx > 0 ? items[idx - 1] : null;
    const label = `${item.m} ${year}`;
    const vsLabel = prev ? `vs ${prev.m} ${year}` : '';

    const balDelta = formatPctDelta(item.balance, prev?.balance, false);
    const incDelta = formatPctDelta(item.income, prev?.income, false);
    const expDelta = formatPctDelta(item.expense, prev?.expense, true);

    setMetrics({
      label,
      balance: item.balance,
      balanceCompare: balDelta ? { ...balDelta, vs: vsLabel } : null,
      income: item.income,
      incomeCompare: incDelta ? { ...incDelta, vs: vsLabel } : null,
      expense: item.expense,
      expenseCompare: expDelta ? { ...expDelta, vs: vsLabel } : null,
      compareFallback: 'Year baseline',
    });

    if (year === '2026') {
      const monthToPeriod = { Nov: '2026-11', Oct: '2026-10', Sep: '2026-09', Jan: '2026-01' };
      if (monthToPeriod[item.m]) {
        setSelectedPeriod(monthToPeriod[item.m]);
      }
    }
  };

  const handleDisconnectAccount = (id, name) => {
    const removedIndex = accounts.findIndex((a) => a.id === id);
    if (removedIndex === -1) return;
    const removedAccount = accounts[removedIndex];
    setAccounts((prev) => prev.filter((a) => a.id !== id));
    showToast(`Disconnected ${name}.`, () => {
      setAccounts((prev) => {
        const next = [...prev];
        next.splice(removedIndex, 0, removedAccount);
        return next;
      });
    });
  };

  const handlePaySubscription = (sub) => {
    const prevStatus = sub.status;
    setSubscriptions((prev) =>
      prev.map((item) => (item.id === sub.id ? { ...item, status: 'Active' } : item))
    );
    showToast(`Paid ${sub.service} (${formatUSD(sub.amount)}).`, () => {
      setSubscriptions((prev) =>
        prev.map((item) => (item.id === sub.id ? { ...item, status: prevStatus } : item))
      );
    });
  };

  const syncedCount = accounts.filter((a) => a.status === 'Synced').length;
  const failedAccount = accounts.find((a) => a.status === 'Failed');

  return (
    <MotionConfig reducedMotion="user">
      <div className="dashboard-page obsidian-canvas text-on-surface font-body antialiased min-h-screen w-full">
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-transparent md:p-4 md:gap-4">
          <DashboardSidebar
            sidebarOpen={sidebarOpen}
            onCloseSidebar={() => setSidebarOpen(false)}
            onBackToLanding={onBackToLanding}
            syncedCount={syncedCount}
            totalCount={accounts.length}
            activeNav={activeNav}
            onSelectNav={handleSelectNav}
            onNavToast={(msg) => showToast(msg)}
          />

          {/* Main Content Area */}
          <div className="flex-1 min-w-0 flex flex-col obsidian-panel md:rounded-xl overflow-hidden">
            <DashboardHeader
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              syncStatusText={syncStatusText}
              isSyncing={isSyncing}
              hasAlert={Boolean(failedAccount)}
              onOpenSidebar={() => setSidebarOpen(true)}
              onSyncAll={handleSyncAll}
              onNotifications={() =>
                showToast(
                  failedAccount
                    ? `1 alert: ${failedAccount.name} session expired. Refresh access.`
                    : 'All caught up. No pending alerts.'
                )
              }
              onBackToLanding={onBackToLanding}
            />

            {/* Main Workspace */}
            <main className="flex-1 px-4 md:px-5 pt-3 pb-5 flex flex-col gap-3.5 w-full">
              {/* Greeting & Period Controls */}
              <motion.section
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex flex-col gap-0.5">
                  <h1
                    data-design-text-token="headline-lg"
                    className="font-headline text-headline-lg text-on-surface"
                  >
                    Hello, Andra!
                  </h1>
                  <p
                    data-design-text-token="body-sm"
                    className="font-body text-body-sm text-on-surface-variant"
                  >
                    Cash flow summary for{' '}
                    <span id="active-period-label" className="text-on-surface font-medium">
                      {metrics.label}
                    </span>
                    .
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="flex items-center gap-2 obsidian-nav-capsule border hover:border-outline rounded-full px-4 py-2 transition-colors duration-state-change">
                    <span
                      className="material-symbols-outlined text-on-surface-variant text-title-md"
                      aria-hidden="true"
                    >
                      calendar_today
                    </span>
                    <label htmlFor="period-selector" className="sr-only">
                      Select reporting period
                    </label>
                    <select
                      id="period-selector"
                      value={selectedPeriod}
                      onChange={(e) => handlePeriodChange(e.target.value)}
                      className="bg-transparent border-0 p-0 pr-6 text-on-surface font-body text-label-lg focus:ring-0 cursor-pointer"
                    >
                      <option value="2026-11" className="bg-[#0d0a14] text-on-surface">
                        Nov 2026
                      </option>
                      <option value="2026-10" className="bg-[#0d0a14] text-on-surface">
                        Oct 2026
                      </option>
                      <option value="2026-09" className="bg-[#0d0a14] text-on-surface">
                        Sep 2026
                      </option>
                      <option value="2026-01" className="bg-[#0d0a14] text-on-surface">
                        Jan 2026 (No comparison)
                      </option>
                    </select>
                  </div>

                  <button
                    id="connect-account-btn"
                    data-component-id="button-with-icon"
                    data-component-type="button"
                    data-component-variant="with-icon"
                    type="button"
                    onClick={() => showToast('Select a supported bank or wallet to connect.')}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full obsidian-violet-btn font-body text-label-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary transition-all duration-state-change ease-state-change"
                  >
                    <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                      add_link
                    </span>
                    <span data-design-text-token="label-lg">Connect Account</span>
                  </button>
                </div>
              </motion.section>

              {/* 3 Metric Cards */}
              <MetricCards metrics={metrics} focusedMetric={focusedMetric} />

              {/* Middle Bento Row (8-4) */}
              <section className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-stretch">
                <AnnualCashFlowChart
                  chartYear={chartYear}
                  onChartYearChange={(yr) => setChartYear(yr)}
                  activeMonthIdx={activeMonthIdx}
                  onSelectMonth={handleSelectChartMonth}
                  onMoreClick={() => showToast('Annual spending breakdown options opened.')}
                />
                <TransactionHistory
                  searchQuery={searchQuery}
                  onSelectTransaction={(item) =>
                    showToast(`${item.title}: ${item.amount} (${item.meta})`)
                  }
                />
              </section>

              {/* Bottom Bento Row (4-8) */}
              <section className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-stretch">
                <ConnectedAccounts
                  accounts={accounts}
                  refreshingId={refreshingId}
                  onDisconnect={handleDisconnectAccount}
                  onRetrySync={handleRetryAccountSync}
                  onConnectAccount={() =>
                    showToast('Select a supported bank or wallet to connect.')
                  }
                />
                <SubscriptionTable
                  subscriptions={subscriptions}
                  searchQuery={searchQuery}
                  onResetSearch={() => setSearchQuery('')}
                  onPaySubscription={handlePaySubscription}
                  onManageSubscription={(sub) =>
                    showToast(`Managing ${sub.service} (${sub.plan} · ${sub.billing}).`)
                  }
                  onAddSubscription={() =>
                    showToast('Add Subscription form ready to connect a recurring bill.')
                  }
                  onViewAll={() =>
                    showToast(`Showing all ${subscriptions.length} active & upcoming subscriptions.`)
                  }
                />
              </section>
            </main>
          </div>
        </div>

        <ToastBanner toast={toast} onUndo={handleUndo} />
      </div>
    </MotionConfig>
  );
}
