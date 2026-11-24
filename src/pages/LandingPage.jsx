import { useEffect, useState } from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { TrustedMarquee } from '../components/landing/TrustedMarquee';
import { FeaturesQuadrant } from '../components/landing/FeaturesQuadrant';
import { BentoShowcase } from '../components/landing/BentoShowcase';
import { PricingSection } from '../components/landing/PricingSection';
import { TestimonialsAndFaq } from '../components/landing/TestimonialsAndFaq';
import { BottomCtaFooter } from '../components/landing/BottomCtaFooter';
import { VideoModal } from '../remotion/components/VideoModal.jsx';

export function LandingPage({ onOpenDashboard }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    document.title = 'Nuvio — Personal Finance & Cash Flow Intelligence';
  }, []);

  return (
    <div className="landing-page bg-surface text-on-surface font-body selection:bg-primary/40 selection:text-on-surface min-h-screen">
      <HeroSection
        onOpenDashboard={onOpenDashboard}
        onOpenVideo={() => setIsVideoOpen(true)}
      />
      <TrustedMarquee />
      <FeaturesQuadrant />
      <BentoShowcase onOpenDashboard={onOpenDashboard} />
      <PricingSection onOpenDashboard={onOpenDashboard} />
      <TestimonialsAndFaq onOpenDashboard={onOpenDashboard} />
      <BottomCtaFooter onOpenDashboard={onOpenDashboard} />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </div>
  );
}
