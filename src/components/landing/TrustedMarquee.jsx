import { TRUSTED_INSTITUTIONS } from '../../data/landingData';

export function TrustedMarquee() {
  return (
    <section className="relative z-10 w-full bg-[#000000] py-14 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-10">
        <p
          data-design-text-token="title-md"
          className="font-headline text-lg sm:text-xl font-medium text-[#f7f7f8] text-center tracking-tight"
        >
          Trusted by 140,000+ Growing Teams &amp; Individuals
        </p>

        <div className="w-full overflow-hidden marquee-wrap [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="marquee-track text-[#d4d4d8]">
            {[0, 1].map((dupIndex) => (
              <div
                key={dupIndex}
                className="flex items-center gap-12 sm:gap-16 pr-12 sm:pr-16 shrink-0"
                aria-hidden={dupIndex === 1 ? 'true' : undefined}
              >
                {TRUSTED_INSTITUTIONS.map((item) => (
                  <div
                    key={`${dupIndex}-${item.name}`}
                    className={`flex items-center gap-2 font-headline text-lg sm:text-xl font-semibold tracking-tight ${item.opacityClass} hover:opacity-100 transition-opacity duration-200 select-none whitespace-nowrap`}
                  >
                    <span className="material-symbols-outlined text-xl" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
