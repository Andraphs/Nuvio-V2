import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function DashboardHeader({
  searchQuery,
  onSearchChange,
  syncStatusText,
  isSyncing,
  hasAlert,
  onOpenSidebar,
  onSyncAll,
  onNotifications,
  onBackToLanding,
}) {
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        if (searchQuery) {
          onSearchChange('');
        } else {
          searchInputRef.current?.blur();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchQuery, onSearchChange]);

  return (
    <header className="w-full border-b border-outline-variant bg-transparent px-4 md:px-5 py-3.5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          id="open-sidebar-btn"
          type="button"
          onClick={onOpenSidebar}
          aria-label="Open navigation menu"
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md obsidian-nav-capsule border text-on-surface hover:border-outline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary shrink-0"
        >
          <span className="material-symbols-outlined text-title-md" aria-hidden="true">
            menu
          </span>
        </button>

        <label htmlFor="global-search" className="sr-only">
          Search transactions, accounts, or subscriptions
        </label>
        <div className="relative flex-1 max-w-sm group">
          <span
            className="material-symbols-outlined text-on-surface-variant group-focus-within:text-secondary text-title-md absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-state-change"
            aria-hidden="true"
          >
            search
          </span>
          <input
            ref={searchInputRef}
            id="global-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search transactions or subscriptions..."
            className="w-full pl-10 pr-14 py-2.5 rounded-full obsidian-nav-capsule border text-on-surface placeholder-on-surface-variant font-body text-body-md transition-colors duration-state-change focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
          />

          <AnimatePresence mode="wait">
            {searchQuery ? (
              <motion.button
                key="clear-search"
                type="button"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.14 }}
                onClick={() => {
                  onSearchChange('');
                  searchInputRef.current?.focus();
                }}
                aria-label="Clear search"
                className="inline-flex items-center justify-center w-7 h-7 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high absolute right-2.5 top-1/2 -translate-y-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              >
                <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                  close
                </span>
              </motion.button>
            ) : (
              <motion.kbd
                key="shortcut-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.14 }}
                className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-sm bg-surface-container-high border border-outline-variant font-mono text-mono-sm text-on-surface-variant absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              >
                ⌘K
              </motion.kbd>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <button
          type="button"
          onClick={onBackToLanding}
          className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-full obsidian-nav-capsule border text-on-surface-variant hover:text-on-surface hover:border-outline font-body text-label-sm transition-colors duration-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        >
          <span className="material-symbols-outlined text-body-md" aria-hidden="true">
            arrow_back
          </span>
          <span>Landing Page</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-full obsidian-nav-capsule border">
          <span
            className={`w-2 h-2 rounded-full shrink-0 transition-colors duration-state-change ${
              isSyncing ? 'bg-secondary' : 'bg-success'
            }`}
            aria-hidden="true"
          />
          <span
            id="sync-status-text"
            data-design-text-token="label-lg"
            className="font-body text-label-lg text-on-surface-variant whitespace-nowrap"
          >
            {isSyncing ? 'Syncing...' : syncStatusText}
          </span>
        </div>

        <button
          id="sync-all-btn"
          data-component-id="button-icon"
          data-component-type="button"
          data-component-variant="icon"
          type="button"
          disabled={isSyncing}
          onClick={onSyncAll}
          aria-label="Sync all connected accounts"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full obsidian-nav-capsule text-on-surface-variant border hover:text-on-surface hover:border-outline active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary transition-all duration-state-change ease-state-change disabled:opacity-60"
        >
          <motion.span
            animate={isSyncing ? { rotate: 360 } : { rotate: 0 }}
            transition={
              isSyncing
                ? { repeat: Infinity, duration: 0.75, ease: 'linear' }
                : { duration: 0.2 }
            }
            className="material-symbols-outlined text-title-md"
            aria-hidden="true"
          >
            sync
          </motion.span>
        </button>

        <button
          id="notifications-btn"
          type="button"
          onClick={onNotifications}
          aria-label={hasAlert ? 'Notifications (1 unread alert)' : 'Notifications'}
          className="relative inline-flex items-center justify-center w-10 h-10 rounded-full obsidian-nav-capsule text-on-surface-variant border hover:text-on-surface hover:border-outline active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary transition-all duration-state-change ease-state-change"
        >
          <span className="material-symbols-outlined text-title-md" aria-hidden="true">
            notifications
          </span>
          {hasAlert && (
            <span
              className="w-2 h-2 rounded-full bg-error absolute top-2 right-2.5"
              aria-hidden="true"
            />
          )}
        </button>
      </div>
    </header>
  );
}
