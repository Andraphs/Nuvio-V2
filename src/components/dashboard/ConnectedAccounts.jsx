import { AnimatePresence, motion } from 'framer-motion';

export function ConnectedAccounts({
  accounts,
  refreshingId,
  onDisconnect,
  onRetrySync,
  onConnectAccount,
}) {
  return (
    <motion.article
      id="accounts"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
      className="md:col-span-4 obsidian-surface border rounded-lg p-4 flex flex-col justify-between gap-3"
    >
      <div className="flex flex-col gap-3">
        <header className="flex items-center justify-between gap-2">
          <h2
            data-design-text-token="title-md"
            className="font-body text-title-md text-on-surface truncate"
          >
            Connected Accounts
          </h2>
          <span
            data-design-text-token="label-sm"
            id="connected-count-badge"
            className="inline-flex items-center h-8 shrink-0 whitespace-nowrap px-3.5 rounded-full obsidian-nav-capsule border border-outline-variant text-on-surface font-body text-label-sm tabular-nums"
          >
            {accounts.length} {accounts.length === 1 ? 'Account' : 'Accounts'}
          </span>
        </header>

        {accounts.length > 0 ? (
          <ul id="accounts-list" className="flex flex-col gap-2.5">
            <AnimatePresence initial={false}>
              {accounts.map((acc) => {
                const isFailed = acc.status === 'Failed';
                const isRefreshing = refreshingId === acc.id;

                return (
                  <motion.li
                    key={acc.id}
                    layout
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -16, scale: 0.96 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    data-account-id={acc.id}
                    className={`p-3 rounded-md obsidian-nav-capsule border flex flex-col gap-1.5 transition-colors duration-state-change hover:border-outline ${
                      isFailed ? 'border-error/50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                            isFailed
                              ? acc.iconWrapClass
                              : 'bg-primary-container border border-primary/40 text-secondary'
                          }`}
                        >
                          <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                            {acc.icon}
                          </span>
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span
                            data-design-text-token="label-sm"
                            className="font-body text-label-sm text-on-surface truncate"
                          >
                            {acc.name}
                          </span>
                          <span
                            data-design-text-token="body-sm"
                            className="font-body text-body-sm text-on-surface-variant tabular-nums"
                          >
                            {acc.mask}
                          </span>
                        </div>
                      </div>
                      <span
                        data-design-text-token="label-sm"
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-high font-body text-label-sm shrink-0 transition-colors ${
                          isFailed ? 'text-error' : 'text-success'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isFailed ? 'bg-error' : 'bg-success'
                          }`}
                          aria-hidden="true"
                        />
                        {acc.status}
                      </span>
                    </div>

                    {isFailed ? (
                      <>
                        <p
                          data-design-text-token="body-sm"
                          className="font-body text-body-sm text-on-surface-variant pl-9"
                        >
                          {acc.errorText}
                        </p>
                        <div className="flex items-center justify-between gap-2 pt-1.5 pl-9">
                          <button
                            type="button"
                            disabled={isRefreshing}
                            onClick={() => onRetrySync(acc.id, acc.name)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full obsidian-violet-btn font-body text-label-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary transition-all duration-state-change disabled:opacity-70"
                          >
                            <motion.span
                              animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
                              transition={
                                isRefreshing
                                  ? { repeat: Infinity, duration: 0.75, ease: 'linear' }
                                  : { duration: 0.2 }
                              }
                              className="material-symbols-outlined text-body-sm"
                              aria-hidden="true"
                            >
                              refresh
                            </motion.span>
                            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onDisconnect(acc.id, acc.name)}
                            className="px-2.5 py-1 rounded-full font-body text-label-sm text-error hover:bg-error/10 transition-colors duration-state-change focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error"
                          >
                            Disconnect
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-between gap-2 pl-9">
                        <span
                          data-design-text-token="label-sm"
                          className="font-body text-label-sm text-on-surface tabular-nums"
                        >
                          {acc.balance}
                        </span>
                        <button
                          type="button"
                          onClick={() => onDisconnect(acc.id, acc.name)}
                          className="font-body text-label-sm text-error hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error rounded-sm"
                        >
                          Disconnect
                        </button>
                      </div>
                    )}
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center text-center py-6 px-4 gap-2 rounded-md bg-surface-container-low border border-outline-variant"
          >
            <span
              className="material-symbols-outlined text-on-surface-variant text-headline-md"
              aria-hidden="true"
            >
              account_balance
            </span>
            <p className="font-body text-label-lg text-on-surface">No connected accounts</p>
            <p className="font-body text-body-sm text-on-surface-variant">
              Connect a bank or wallet to sync balances automatically.
            </p>
            <button
              type="button"
              onClick={onConnectAccount}
              className="mt-1 px-4 py-1.5 rounded-full obsidian-violet-btn font-body text-label-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              Connect Account
            </button>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
}
