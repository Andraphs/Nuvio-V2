import { AnimatePresence, motion } from 'framer-motion';

export function ToastBanner({ toast, onUndo }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          id="toast-banner"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 max-w-sm bg-[#0d0a14]/95 border border-primary/40 rounded-md px-4 py-3 flex items-center justify-between gap-4 shadow-lg"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="material-symbols-outlined text-success text-title-md shrink-0"
              aria-hidden="true"
            >
              check_circle
            </span>
            <p
              id="toast-message"
              data-design-text-token="body-sm"
              className="font-body text-body-sm text-on-surface"
            >
              {toast.message}
            </p>
          </div>
          {toast.onUndo && (
            <button
              id="toast-undo-btn"
              type="button"
              onClick={onUndo}
              className="shrink-0 inline-flex items-center gap-1 font-body text-label-sm text-secondary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-sm"
            >
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                undo
              </span>
              <span>Undo</span>
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
