import { useState } from 'react';
import { motion } from 'framer-motion';

export function PricingSection({ onOpenDashboard }) {
  const [billing, setBilling] = useState('monthly');

  const proPrice = billing === 'monthly' ? '$12' : '$9';
  const teamPrice = billing === 'monthly' ? '$29' : '$23';

  return (
    <section id="pricing" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-20">
      <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3 mb-8">
        <span className="px-3.5 py-1 rounded-full obsidian-nav-capsule border font-body text-label-sm text-[#d6adff]">
          Pricing
        </span>
        <h2
          data-design-text-token="headline-lg"
          className="font-headline text-3xl sm:text-4xl font-semibold text-on-surface text-balance"
        >
          Choose the Plan That Fits You
        </h2>
        <p data-design-text-token="body-md" className="font-body text-body-md text-on-surface-variant">
          Start free with up to 3 connected accounts. Upgrade anytime for unlimited history.
        </p>

        {/* Billing Toggle */}
        <div className="mt-2 inline-flex items-center gap-1 p-1 rounded-full obsidian-nav-capsule border">
          <button
            id="bill-monthly"
            type="button"
            onClick={() => setBilling('monthly')}
            className={
              billing === 'monthly'
                ? 'px-4 py-1.5 rounded-full bg-[#171420] border border-primary/40 font-body text-label-sm text-on-surface transition-colors'
                : 'px-4 py-1.5 rounded-full font-body text-label-sm text-on-surface-variant hover:text-on-surface transition-colors'
            }
          >
            Monthly
          </button>
          <button
            id="bill-yearly"
            type="button"
            onClick={() => setBilling('yearly')}
            className={
              billing === 'yearly'
                ? 'px-4 py-1.5 rounded-full bg-[#171420] border border-primary/40 font-body text-label-sm text-on-surface transition-colors'
                : 'px-4 py-1.5 rounded-full font-body text-label-sm text-on-surface-variant hover:text-on-surface transition-colors'
            }
          >
            Yearly (Save 20%)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 items-stretch md:items-center pt-2">
        {/* Starter */}
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="obsidian-surface hover-card border rounded-2xl p-7 sm:p-8 min-h-[430px] flex flex-col justify-between gap-7"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <h3 className="font-headline text-title-md text-on-surface">Starter</h3>
              <p className="font-body text-body-sm text-on-surface-variant">
                For personal cash flow clarity
              </p>
            </div>
            <p className="font-headline text-4xl font-bold text-on-surface tabular-nums">
              $0{' '}
              <span className="font-body text-body-sm font-normal text-on-surface-variant">
                /month
              </span>
            </p>
            <div className="h-px w-full bg-white/[0.06]" aria-hidden="true" />
            <ul className="flex flex-col gap-3.5 text-body-sm text-on-surface-variant">
              <li className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-body-md text-success" aria-hidden="true">
                  check_circle
                </span>
                Up to 3 connected accounts
              </li>
              <li className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-body-md text-success" aria-hidden="true">
                  check_circle
                </span>
                12-month Annual Cash Flow chart
              </li>
              <li className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-body-md text-success" aria-hidden="true">
                  check_circle
                </span>
                Subscription tracker &amp; alerts
              </li>
            </ul>
          </div>
          <button
            type="button"
            onClick={onOpenDashboard}
            className="w-full py-3 rounded-full obsidian-dark-btn text-center font-body text-label-lg"
          >
            Start Free
          </button>
        </motion.article>

        {/* Nuvio Pro (Highlighted Royal Violet Spotlight) */}
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.52, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 overflow-hidden obsidian-hero-card border border-[#b14eff]/60 rounded-2xl p-7 sm:p-9 min-h-[495px] flex flex-col justify-between gap-7 shadow-[0_24px_70px_rgba(0,0,0,0.85),0_0_55px_rgba(147,18,255,0.28),inset_0_1px_0_rgba(224,179,255,0.38)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#e0b3ff]/70 hover:shadow-[0_28px_80px_rgba(0,0,0,0.9),0_0_70px_rgba(147,18,255,0.42),inset_0_1px_0_rgba(224,179,255,0.48)]"
        >
          <div className="pointer-events-none absolute top-0 inset-x-0 top-violet-rim-line" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_55%_at_50%_0%,rgba(160,32,255,0.34)_0%,rgba(122,28,248,0.14)_45%,transparent_78%)]"
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-headline text-title-md font-semibold text-on-surface">Nuvio Pro</h3>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#a020ff]/35 to-[#7a1cf8]/35 border border-[#e0b3ff]/45 font-body text-label-sm text-[#f3e4ff] shadow-[0_0_16px_rgba(147,18,255,0.35)]">
                Most Popular
              </span>
            </div>
            <p className="font-body text-body-sm text-[#c2b4d4]">
              For power savers &amp; multi-account sync
            </p>
            <p className="font-headline text-5xl font-bold text-on-surface tabular-nums">
              <span id="pro-price">{proPrice}</span>{' '}
              <span className="font-body text-body-sm font-normal text-[#c2b4d4]">/month</span>
            </p>
            <div className="h-px w-full bg-[#e0b3ff]/15" aria-hidden="true" />
            <ul className="flex flex-col gap-3.5 text-body-sm text-on-surface">
              <li className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-body-md text-[#e0b3ff]" aria-hidden="true">
                  check_circle
                </span>
                Unlimited bank &amp; card connections
              </li>
              <li className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-body-md text-[#e0b3ff]" aria-hidden="true">
                  check_circle
                </span>
                Multi-year history &amp; CSV export
              </li>
              <li className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-body-md text-[#e0b3ff]" aria-hidden="true">
                  check_circle
                </span>
                Smart unpaid bill &amp; renewal alerts
              </li>
              <li className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-body-md text-[#e0b3ff]" aria-hidden="true">
                  check_circle
                </span>
                Priority real-time sync
              </li>
            </ul>
          </div>
          <button
            type="button"
            onClick={onOpenDashboard}
            className="relative w-full py-3.5 rounded-full obsidian-violet-btn text-center font-body text-label-lg font-semibold"
          >
            Upgrade to Pro
          </button>
        </motion.article>

        {/* Family & Wealth */}
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.52, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="obsidian-surface hover-card border rounded-2xl p-7 sm:p-8 min-h-[430px] flex flex-col justify-between gap-7"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <h3 className="font-headline text-title-md text-on-surface">Family &amp; Wealth</h3>
              <p className="font-body text-body-sm text-on-surface-variant">
                Shared household &amp; goal planning
              </p>
            </div>
            <p className="font-headline text-4xl font-bold text-on-surface tabular-nums">
              <span id="team-price">{teamPrice}</span>{' '}
              <span className="font-body text-body-sm font-normal text-on-surface-variant">
                /month
              </span>
            </p>
            <div className="h-px w-full bg-white/[0.06]" aria-hidden="true" />
            <ul className="flex flex-col gap-3.5 text-body-sm text-on-surface-variant">
              <li className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-body-md text-success" aria-hidden="true">
                  check_circle
                </span>
                Up to 5 household member seats
              </li>
              <li className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-body-md text-success" aria-hidden="true">
                  check_circle
                </span>
                Shared budgets &amp; savings goals
              </li>
              <li className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-body-md text-success" aria-hidden="true">
                  check_circle
                </span>
                Dedicated onboarding support
              </li>
            </ul>
          </div>
          <button
            type="button"
            onClick={onOpenDashboard}
            className="w-full py-3 rounded-full obsidian-dark-btn text-center font-body text-label-lg"
          >
            Get Started
          </button>
        </motion.article>
      </div>
    </section>
  );
}
