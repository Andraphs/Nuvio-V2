import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';

function getPageFromLocation() {
  if (window.location.hash === '#/dashboard' || window.location.pathname.endsWith('/dashboard')) {
    return 'dashboard';
  }
  return 'landing';
}

export default function App() {
  const [page, setPage] = useState(getPageFromLocation);

  useEffect(() => {
    const onRouteChange = () => setPage(getPageFromLocation());
    window.addEventListener('hashchange', onRouteChange);
    window.addEventListener('popstate', onRouteChange);
    return () => {
      window.removeEventListener('hashchange', onRouteChange);
      window.removeEventListener('popstate', onRouteChange);
    };
  }, []);

  const navigate = (nextPage) => {
    const targetHash = nextPage === 'dashboard' ? '#/dashboard' : '#/';
    if (window.location.hash !== targetHash) {
      window.history.pushState({}, '', targetHash);
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
