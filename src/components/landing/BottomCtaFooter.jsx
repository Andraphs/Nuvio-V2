import { NuvioLogoMark } from '../common/NuvioLogo';

export function BottomCtaFooter({ onOpenDashboard }) {
  return (
    <section className="relative z-10 w-full overflow-hidden pt-20 pb-12 planet-horizon-bottom border-t border-outline-variant">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-5">
        <div className="w-12 h-12 rounded-xl obsidian-violet-btn hub-pulse flex items-center justify-center">
          <NuvioLogoMark className="w-6 h-6 text-on-primary" />
        </div>
        <h2 className="font-headline text-3xl sm:text-5xl font-bold text-on-surface text-balance">
          Ready to Take Control of Your Cash Flow?
        </h2>
        <p className="font-body text-body-md text-[#b7a8c9] max-w-xl text-pretty">
          Launch the Nuvio dashboard in seconds and see your balances, income, expenses, and
          subscriptions in one place.
        </p>
        <button
          type="button"
          onClick={onOpenDashboard}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full obsidian-violet-btn font-body text-label-lg"
        >
          <span>Launch Nuvio Dashboard</span>
          <span className="material-symbols-outlined text-title-md hover-arrow" aria-hidden="true">
            arrow_forward
          </span>
        </button>
      </div>

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 mt-16 pt-8 border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-4 text-body-sm text-on-surface-variant">
        <div className="flex items-center gap-2">
          <span className="font-headline text-label-lg text-on-surface">Nuvio</span>
          <span>·</span>
          <span>© 2026 Nuvio Finance. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="hover:text-on-surface transition-colors">
            Features
          </a>
          <a href="#pricing" className="hover:text-on-surface transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-on-surface transition-colors">
            FAQ
          </a>
          <button
            type="button"
            onClick={onOpenDashboard}
            className="text-[#d6adff] hover:text-secondary transition-colors"
          >
            Open App
          </button>
        </div>
      </footer>
    </section>
  );
}
