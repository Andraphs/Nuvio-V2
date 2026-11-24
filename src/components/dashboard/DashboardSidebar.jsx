import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NuvioLogoMark } from '../common/NuvioLogo';

const PRIMARY_NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home', href: '#dashboard' },
  { id: 'transactions', label: 'Transactions', icon: 'receipt_long', href: '#transactions' },
];

const ANALYTICS_SUBNAV = [
  { id: 'analytics-balance', label: 'Balance', focus: 'balance', toast: 'Focused on Total Balance trend.' },
  { id: 'analytics-income', label: 'Income', focus: 'income', toast: 'Focused on Income trend.' },
  { id: 'analytics-expenses', label: 'Expenses', focus: 'expense', toast: 'Focused on Expenses trend.' },
];

const SECONDARY_NAV = [
  { id: 'budgets', label: 'Budgets', icon: 'pie_chart', href: '#budgets', toast: 'Budgets overview selected.' },
  { id: 'goals', label: 'Goals', icon: 'flag', href: '#goals', toast: 'Savings goals overview selected.' },
];

const UTILITY_NAV = [
  { id: 'settings', label: 'Settings', icon: 'settings', href: '#settings', toast: 'Workspace settings ready.' },
  { id: 'help-center', label: 'Help Center', icon: 'help', href: '#help-center', toast: 'Help Center documentation ready.' },
];

export function DashboardSidebar({
  sidebarOpen,
  onCloseSidebar,
  onBackToLanding,
  syncedCount,
  totalCount,
  activeNav,
  onSelectNav,
  onNavToast,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!sidebarOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onCloseSidebar();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen, onCloseSidebar]);

  const progressRatio = totalCount > 0 ? syncedCount / totalCount : 0;
  const ringRadius = 15;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference * (1 - progressRatio);
  const allSynced = totalCount > 0 && syncedCount === totalCount;

  const renderNavItem = (item) => {
    const isActive = activeNav === item.id;
    return (
      <a
        key={item.id}
        href={item.href}
        aria-current={isActive ? 'page' : undefined}
        title={isCollapsed ? item.label : undefined}
        aria-label={isCollapsed ? item.label : undefined}
        onClick={(e) => {
          e.preventDefault();
          onSelectNav(item.id, item.toast);
          onCloseSidebar();
        }}
        className={`relative flex items-center ${
          isCollapsed ? 'md:justify-center md:px-2' : 'gap-3 px-3'
        } py-2 min-h-[44px] rounded-full font-body text-label-lg transition-colors duration-state-change ease-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
          isActive
            ? 'text-on-surface'
            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50'
        }`}
      >
        {isActive && (
          <motion.span
            layoutId="sidebar-active-pill"
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
            className="absolute inset-0 rounded-full obsidian-nav-active pointer-events-none"
            aria-hidden="true"
          />
        )}
        <span
          className={`relative z-10 w-7 h-7 rounded-full inline-flex items-center justify-center shrink-0 transition-colors duration-state-change ${
            isActive
              ? 'bg-primary/20 border border-primary/40 text-secondary'
              : 'obsidian-nav-capsule border'
          }`}
        >
          <span
            className="material-symbols-outlined text-body-md"
            style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
            aria-hidden="true"
          >
            {item.icon}
          </span>
        </span>
        <span
          data-design-text-token="label-lg"
          className={`relative z-10 truncate transition-opacity duration-state-change ${
            isCollapsed ? 'md:hidden' : ''
          }`}
        >
          {item.label}
        </span>
      </a>
    );
  };

  return (
    <>
      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            id="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onCloseSidebar}
            className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-30 md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Floating Split Sidebar Navigation */}
      <aside
        id="app-sidebar"
        aria-label="Main navigation"
        className={`fixed inset-y-0 left-0 z-40 ${
          isCollapsed ? 'w-64 md:w-[88px]' : 'w-64'
        } min-h-screen md:min-h-0 bg-surface-container-low md:bg-transparent border-r md:border-0 border-outline-variant flex flex-col justify-between gap-4 p-4 md:p-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:shrink-0 transition-[transform,width] duration-surface-enter ease-surface-enter`}
      >
        {/* Card 1: Brand & Primary Navigation */}
        <div
          className={`flex flex-col gap-5 obsidian-sidebar-card md:rounded-xl ${
            isCollapsed ? 'p-4 md:px-3 md:py-5' : 'p-4 md:p-5'
          }`}
        >
          {/* Brand Header + Collapse/Close Button */}
          <div
            className={`flex items-center ${
              isCollapsed ? 'justify-between md:flex-col md:gap-3' : 'justify-between gap-2'
            } px-1`}
          >
            <button
              type="button"
              onClick={onBackToLanding}
              title="Back to Landing Page"
              className="flex items-center gap-2.5 text-left rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary group"
            >
              <div className="w-8 h-8 rounded-md obsidian-violet-btn flex items-center justify-center text-on-primary shrink-0">
                <NuvioLogoMark className="w-5 h-5" />
              </div>
              <span
                data-design-text-token="headline-md"
                className={`font-headline text-headline-md tracking-tight bg-gradient-to-r from-[#f7f7f8] to-[#e0b3ff] bg-clip-text text-transparent group-hover:opacity-90 transition-opacity ${
                  isCollapsed ? 'md:hidden' : ''
                }`}
              >
                Nuvio
              </span>
            </button>

            <button
              id="close-sidebar-btn"
              type="button"
              onClick={onCloseSidebar}
              aria-label="Close navigation menu"
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full obsidian-nav-capsule border text-on-surface-variant hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                close
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsCollapsed((prev) => !prev)}
              aria-expanded={!isCollapsed}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="hidden md:inline-flex items-center justify-center w-7 h-7 rounded-full obsidian-nav-capsule border text-on-surface-variant hover:text-on-surface hover:border-outline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <motion.span
                animate={{ rotate: isCollapsed ? 180 : 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="material-symbols-outlined text-body-md"
                aria-hidden="true"
              >
                chevron_left
              </motion.span>
            </button>
          </div>

          {/* Primary Navigation Links */}
          <nav className="flex flex-col gap-1.5" aria-label="Application pages">
            {!isCollapsed && (
              <span className="px-3 pb-1 font-body text-label-sm text-on-surface-variant/75">
                Workspace
              </span>
            )}

            {PRIMARY_NAV.map(renderNavItem)}

            {/* Analytics with Nested Tree */}
            <div className="flex flex-col gap-1.5">
              {renderNavItem({
                id: 'analytics',
                label: 'Analytics',
                icon: 'bar_chart',
                href: '#analytics',
                toast: 'Viewing Annual Cash Flow analytics.',
              })}
              {!isCollapsed && (
                <div className="ml-6 flex flex-col">
                  {ANALYTICS_SUBNAV.map((sub, idx) => {
                    const isLast = idx === ANALYTICS_SUBNAV.length - 1;
                    const isSubActive = activeNav === sub.id;
                    return (
                      <div key={sub.id} className="relative flex items-center pl-4 py-0.5">
                        {isLast ? (
                          <span
                            className="absolute left-0 top-0 h-1/2 w-3 border-l border-b border-outline-variant rounded-bl-sm"
                            aria-hidden="true"
                          />
                        ) : (
                          <>
                            <span
                              className="absolute left-0 top-0 bottom-0 border-l border-outline-variant"
                              aria-hidden="true"
                            />
                            <span
                              className="absolute left-0 top-1/2 w-3 border-t border-outline-variant"
                              aria-hidden="true"
                            />
                          </>
                        )}
                        <a
                          href={`#${sub.focus}`}
                          aria-current={isSubActive ? 'page' : undefined}
                          onClick={(e) => {
                            e.preventDefault();
                            onSelectNav(sub.id, sub.toast);
                            onCloseSidebar();
                          }}
                          className={`px-2.5 py-1 rounded-DEFAULT font-body text-body-sm transition-colors duration-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                            isSubActive
                              ? 'text-secondary bg-primary/15 font-medium'
                              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/40'
                          }`}
                        >
                          {sub.label}
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {SECONDARY_NAV.map(renderNavItem)}

            <div className="my-2 border-t border-outline-variant" />

            {!isCollapsed && (
              <span className="px-3 pb-1 font-body text-label-sm text-on-surface-variant/75">
                System
              </span>
            )}

            {UTILITY_NAV.map(renderNavItem)}
          </nav>
        </div>

        {/* Cards 2 & 3 Separate: Sync Status + User Profile */}
        <div className="flex flex-col gap-3">
          <div
            className={`rounded-xl obsidian-sidebar-card flex flex-col gap-3 ${
              isCollapsed ? 'p-3 items-center' : 'p-3.5'
            }`}
          >
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
              <div
                className="relative w-10 h-10 flex items-center justify-center shrink-0"
                title={`${syncedCount} of ${totalCount} accounts synced`}
              >
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 38 38" aria-hidden="true">
                  <circle
                    cx="19"
                    cy="19"
                    r={ringRadius}
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2.5"
                  />
                  <motion.circle
                    cx="19"
                    cy="19"
                    r={ringRadius}
                    fill="none"
                    stroke={allSynced ? '#45B558' : '#B14EFF'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={ringCircumference}
                    initial={false}
                    animate={{ strokeDashoffset: ringOffset }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>
                <span
                  data-design-text-token="label-sm"
                  className="absolute font-body text-label-sm text-on-surface tabular-nums"
                >
                  {syncedCount}/{totalCount}
                </span>
              </div>

              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span
                    data-design-text-token="label-sm"
                    className="font-body text-label-sm text-on-surface"
                  >
                    Accounts Synced
                  </span>
                  <span
                    data-design-text-token="body-sm"
                    className="font-body text-body-sm text-on-surface-variant text-pretty"
                  >
                    {allSynced ? 'All connections healthy.' : '1 connection needs refresh.'}
                  </span>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <button
                type="button"
                onClick={() => onSelectNav('accounts', 'Scrolled to Connected Accounts.')}
                className="w-full py-2 px-3 rounded-full obsidian-nav-capsule border text-center font-body text-label-sm text-[#d6adff] hover:border-secondary/60 hover:text-on-surface transition-colors duration-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              >
                <span data-design-text-token="label-sm">Manage Connections</span>
              </button>
            )}
          </div>

          <div
            className={`p-2.5 rounded-xl obsidian-sidebar-card flex items-center ${
              isCollapsed ? 'justify-center' : 'justify-between gap-2'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src="https://lh3.googleusercontent.com/aida/ALJJyrCW7tYIIjE0BzTDYpGLPFJ-yItWMB936ClvjgzcBArItLBrppOMn8gviyFJYVee1ErojFqkcO64EfjApoPjhxja5PLc3DPQv57z44uTtJsabaGmpPIljPBHL5cfp6jTJXUY6VD0MnAOuq99SQK90AQaPNdgsISr7AluWg9JpOTNVHLu3iigv_LOd0kVxQK7N5W9TfJ1D_r_vgNfuaA2Hl9mHBbNjsRO8t5Vm7qDhD526dXuRdo"
                alt="Andra Pratama profile photo"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover border border-outline-variant shrink-0"
              />
              {!isCollapsed && (
                <div className="min-w-0 flex flex-col">
                  <span
                    data-design-text-token="label-sm"
                    className="font-body text-label-sm text-on-surface truncate"
                  >
                    Andra Pratama
                  </span>
                  <span
                    data-design-text-token="body-sm"
                    className="font-body text-body-sm text-on-surface-variant truncate"
                  >
                    andra@mail.com
                  </span>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <button
                type="button"
                onClick={() => onNavToast('Account preferences ready.')}
                aria-label="Account preferences"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors duration-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary shrink-0"
              >
                <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                  settings
                </span>
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
