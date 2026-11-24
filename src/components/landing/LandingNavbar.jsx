import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NuvioLogoMark } from '../common/NuvioLogo';
import { NAV_LINKS } from '../../data/landingData';

export function LandingNavbar({ onOpenDashboard }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef(null);

  useEffect(() => {
    const updateScrollState = () => {
      const heroGlow = document.getElementById('hero-glow-video');
      const homeSection = document.getElementById('home');
      const threshold =
        heroGlow && heroGlow.offsetHeight
          ? heroGlow.offsetHeight - 80
          : homeSection
            ? Math.min(560, homeSection.offsetHeight * 0.65)
            : 520;

      setIsScrolled(window.scrollY > threshold);

      // Jangan timpa activeId jika sedang transisi smooth scroll karena klik user
      if (isClickScrollingRef.current) return;

      const activationOffset = 180;
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 32;

      if (isAtBottom) {
        setActiveId(NAV_LINKS[NAV_LINKS.length - 1].id);
        return;
      }

      let current = NAV_LINKS[0].id;
      for (const link of NAV_LINKS) {
        const sec = document.getElementById(link.id);
        if (sec && sec.getBoundingClientRect().top <= activationOffset) {
          current = link.id;
        }
      }
      setActiveId(current);
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScrollState);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  const handleNavClick = (e, linkId) => {
    e.preventDefault();
    setActiveId(linkId);
    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

    const target = document.getElementById(linkId);
    if (target) {
      const navOffset = 80;
      const targetY =
        linkId === 'home'
          ? 0
          : target.getBoundingClientRect().top + window.scrollY - navOffset;

      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth',
      });
    }

    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 700);
  };

  return (
    <>
      <motion.header
        id="main-navbar"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'is-scrolled' : ''
        }`}
      >
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="relative z-10 flex items-center gap-2.5 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-md"
          >
            <div className="w-9 h-9 rounded-md obsidian-violet-btn flex items-center justify-center text-on-primary">
              <NuvioLogoMark className="w-5 h-5" />
            </div>
            <span
              data-design-text-token="headline-md"
              className="font-headline text-headline-md tracking-tight bg-gradient-to-r from-[#f7f7f8] to-[#e0b3ff] bg-clip-text text-transparent"
            >
              Nuvio
            </span>
          </a>

          {/* Centered Pill Navigation dengan Animated Indicator */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-1 p-1.5 rounded-full obsidian-nav-capsule border md:absolute md:left-1/2 md:-translate-x-1/2"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="relative px-4 py-1.5 rounded-full font-body text-label-lg outline-none focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 select-none transition-colors duration-150 text-on-surface-variant hover:text-on-surface"
                >
                  {isActive && (
                    <motion.div
                      layoutId="landingNavPill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#171420] border border-primary/40 shadow-[inset_0_1px_0_rgba(224,179,255,0.14),0_0_18px_rgba(147,18,255,0.18)]"
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-150 ${
                      isActive ? 'text-on-surface font-medium' : ''
                    }`}
                  >
                    {link.label}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="relative z-10 flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenDashboard}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full obsidian-dark-btn font-body text-label-lg whitespace-nowrap outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              Live Demo
            </button>
            <a
              href="#pricing"
              onClick={(e) => handleNavClick(e, 'pricing')}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full obsidian-violet-btn font-body text-label-lg transition-all duration-state-change outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <span data-design-text-token="label-lg">Get Started</span>
            </a>
            <button
              id="mobile-nav-btn"
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full obsidian-nav-capsule border text-on-surface outline-none focus:outline-none"
            >
              <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed top-20 inset-x-4 z-40 p-4 rounded-xl obsidian-panel flex flex-col gap-2"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    setMobileOpen(false);
                    handleNavClick(e, link.id);
                  }}
                  className={`px-3 py-2 rounded-lg font-body text-label-lg transition-colors outline-none focus:outline-none ${
                    isActive
                      ? 'bg-[#171420] border border-primary/40 text-on-surface'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenDashboard();
              }}
              className="mt-1 px-3 py-2.5 rounded-lg obsidian-violet-btn font-body text-label-lg text-center outline-none focus:outline-none"
            >
              Live Demo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
