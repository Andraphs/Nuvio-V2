import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';

function getPageFromPath() {
  return window.location.pathname.startsWith('/dashboard') ? 'dashboard' : 'landing';
}

export default function App() {
  const [page, setPage] = useState(getPageFromPath);

  useEffect(() => {
    const onPopState = () => setPage(getPageFromPath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (nextPage) => {
    const targetPath = nextPage === 'dashboard' ? '/dashboard' : '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <AnimatePresence mode="wait">
      {page === 'landing' ? (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <LandingPage onOpenDashboard={() => navigate('dashboard')} />
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <DashboardPage onBackToLanding={() => navigate('landing')} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
