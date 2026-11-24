import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS, FAQ_ITEMS } from '../../data/landingData';

export function TestimonialsAndFaq({ onOpenDashboard }) {
  const [openIndices, setOpenIndices] = useState(() =>
    FAQ_ITEMS.reduce((acc, item, idx) => {
      if (item.defaultOpen) acc[idx] = true;
      return acc;
    }, {})
  );

  const toggleFaq = (idx) => {
    setOpenIndices((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-24 flex flex-col gap-24">
      {/* Testimonials */}
      <div className="relative flex flex-col gap-10">
        <div
          className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[520px] h-[220px] rounded-full bg-[#9312ff]/12 blur-[90px]"
          aria-hidden="true"
        />

        <div className="relative text-center max-w-2xl mx-auto flex flex-col items-center gap-3">
          <span className="px-3.5 py-1 rounded-full obsidian-nav-capsule border font-body text-label-sm text-[#d6adff]">
            Testimonials
          </span>
          <h2
            data-design-text-token="headline-lg"
            className="font-headline text-3xl sm:text-4xl font-semibold text-on-surface text-balance"
          >
            Loved by Builders, Freelancers &amp; Teams
          </h2>
          <p
            data-design-text-token="body-md"
            className="font-body text-body-md text-on-surface-variant text-pretty"
          >
            See how Nuvio helps thousands spot hidden subscriptions and stay ahead of monthly cash
            flow.
          </p>

          <div className="mt-1 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full obsidian-nav-capsule border">
            <div className="flex items-center gap-0.5 text-[#e0b3ff]" aria-hidden="true">
              <span className="material-symbols-outlined text-sm">star</span>
              <span className="material-symbols-outlined text-sm">star</span>
              <span className="material-symbols-outlined text-sm">star</span>
              <span className="material-symbols-outlined text-sm">star</span>
              <span className="material-symbols-outlined text-sm">star</span>
            </div>
            <span className="font-body text-label-sm text-on-surface">4.9 / 5</span>
            <span className="text-outline">·</span>
            <span className="font-body text-body-sm text-on-surface-variant">
              2,400+ verified users
            </span>
          </div>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {TESTIMONIALS.map((item, idx) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.52, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`relative overflow-hidden ${
                item.featured
                  ? 'obsidian-hero-card hover-card border border-[#b14eff]/55 rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.75),0_0_42px_rgba(147,18,255,0.22),inset_0_1px_0_rgba(224,179,255,0.3)]'
                  : 'obsidian-surface hover-card border rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6'
              }`}
            >
              {item.featured && (
                <>
                  <div
                    className="pointer-events-none absolute top-0 inset-x-0 top-violet-rim-line"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(160,32,255,0.24)_0%,transparent_72%)]"
                    aria-hidden="true"
                  />
                </>
              )}

              <div className="relative flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      item.featured
                        ? 'obsidian-violet-btn'
                        : idx === 0
                        ? 'bg-primary/15 border border-primary/30 text-[#d6adff]'
                        : 'bg-surface-container-high border border-outline-variant text-success'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg" aria-hidden="true">
                      format_quote
                    </span>
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full font-body text-label-sm ${
                      item.featured
                        ? 'bg-primary/25 border border-[#e0b3ff]/35 text-[#e0b3ff]'
                        : idx === 0
                        ? 'bg-surface-container-high border border-outline-variant text-success'
                        : 'bg-surface-container-high border border-outline-variant text-[#d6adff]'
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
                <p
                  className={`font-body text-body-md leading-relaxed text-pretty ${
                    item.featured ? 'text-on-surface' : 'text-on-surface-variant'
                  }`}
                >
                  {item.quote}
                </p>
              </div>

              <div
                className={`relative pt-4 border-t flex items-center justify-between gap-3 ${
                  item.featured ? 'border-[#e0b3ff]/15' : 'border-outline-variant'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-headline text-label-lg ${item.avatarClass}`}
                  >
                    {item.initial}
                  </div>
                  <div>
                    <p className="font-body text-label-sm text-on-surface">{item.name}</p>
                    <p className={`font-body text-body-sm ${item.roleClass}`}>{item.role}</p>
                  </div>
                </div>
                {item.verified && (
                  <span
                    className={`material-symbols-outlined text-base ${
                      item.featured ? 'text-[#e0b3ff]' : 'text-[#b7a8c9]'
                    }`}
                    title="Verified User"
                    aria-hidden="true"
                  >
                    verified
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Editorial 2-Column FAQ */}
      <div id="faq" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Sticky Intro + Support Card */}
        <div className="lg:col-span-5 flex flex-col items-start gap-4 lg:sticky lg:top-28">
          <span className="px-3.5 py-1 rounded-full obsidian-nav-capsule border font-body text-label-sm text-[#d6adff]">
            FAQ
          </span>
          <h2
            data-design-text-token="headline-lg"
            className="font-headline text-3xl sm:text-4xl font-semibold text-on-surface text-balance"
          >
            Frequently Asked Questions
          </h2>
          <p
            data-design-text-token="body-md"
            className="font-body text-body-md text-on-surface-variant text-pretty"
          >
            Everything you need to know about read-only bank sync, annual cash flow exports, and
            subscription alerts.
          </p>

          <div className="mt-2 w-full rounded-2xl obsidian-surface border p-5 flex items-center justify-between gap-4 hover-card">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-[#e0b3ff] shrink-0">
                <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                  support_agent
                </span>
              </div>
              <div>
                <p className="font-body text-label-lg text-on-surface">Still need clarity?</p>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Explore the live workspace anytime.
                </p>
              </div>
            </div>
            {onOpenDashboard ? (
              <button
                type="button"
                onClick={onOpenDashboard}
                className="px-4 py-2 rounded-full obsidian-dark-btn font-body text-label-sm whitespace-nowrap cursor-pointer"
              >
                Live Demo
              </button>
            ) : (
              <a
                href="#features"
                className="px-4 py-2 rounded-full obsidian-dark-btn font-body text-label-sm whitespace-nowrap"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Right Accordion Stack */}
        <div className="lg:col-span-7 flex flex-col gap-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = !!openIndices[idx];
            return (
              <div
                key={item.question}
                className={`faq-card obsidian-surface border rounded-2xl p-5 sm:p-6 group hover:border-primary/40 ${
                  isOpen ? 'faq-card-open' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer font-body text-label-lg text-on-surface select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-sm"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-label-sm text-[#d6adff]/80 tabular-nums">
                      {item.num || `0${idx + 1}`}
                    </span>
                    <span className="font-headline text-title-md text-on-surface">
                      {item.question}
                    </span>
                  </div>
                  <span className="faq-chevron-wrap w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center shrink-0 transition-colors duration-200">
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="material-symbols-outlined text-title-md text-[#d6adff]"
                      aria-hidden="true"
                    >
                      expand_more
                    </motion.span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3.5 pl-8 font-body text-body-sm text-on-surface-variant leading-relaxed text-pretty">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
