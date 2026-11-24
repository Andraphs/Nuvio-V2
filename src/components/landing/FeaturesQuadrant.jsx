import { motion } from 'framer-motion';
import { NuvioLogoMark } from '../common/NuvioLogo';
import { FEATURE_QUADRANTS } from '../../data/landingData';

export function FeaturesQuadrant() {
  return (
    <section id="features" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3 mb-12">
        <span className="px-3.5 py-1 rounded-full obsidian-nav-capsule border font-body text-label-sm text-[#d6adff]">
          Why Nuvio
        </span>
        <h2
          data-design-text-token="headline-lg"
          className="font-headline text-3xl sm:text-4xl font-semibold text-on-surface text-balance"
        >
          Simplify the Way You See Your Money
        </h2>
        <p
          data-design-text-token="body-md"
          className="font-body text-body-md text-on-surface-variant text-pretty"
        >
          Connect every checking, card, and recurring subscription into one calm, high-contrast
          command center.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
        className="relative grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden border border-outline-variant bg-[#0b0911]/80"
      >
        {/* Central Hub Badge (Desktop) */}
        <div
          className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full obsidian-violet-btn hub-pulse items-center justify-center border-4 border-[#000000]"
          aria-hidden="true"
        >
          <NuvioLogoMark className="w-7 h-7 text-on-primary" />
        </div>

        {FEATURE_QUADRANTS.map((feature) => (
          <div
            key={feature.title}
            className={`group p-8 sm:p-10 flex flex-col items-center text-center gap-3 transition-colors duration-300 ${feature.cardClass}`}
          >
            <span
              className={`w-11 h-11 rounded-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${feature.iconWrapClass}`}
            >
              <span className="material-symbols-outlined text-headline-md" aria-hidden="true">
                {feature.icon}
              </span>
            </span>
            <h3
              data-design-text-token="title-md"
              className="font-headline text-title-md text-on-surface"
            >
              {feature.title}
            </h3>
            <p
              data-design-text-token="body-sm"
              className="font-body text-body-sm text-on-surface-variant max-w-xs text-pretty"
            >
              {feature.description}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
