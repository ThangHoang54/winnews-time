import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UseScrollToTop  from './hooks/useScrollToTop';
import Layout from './app/Layout';

// Lazy load the page component
const Home = lazy(() => import('./app/pages/Home'));
const Saved = lazy(() => import('./app/pages/Saved'));
const MyReactions = lazy(() => import('./app/pages/MyReactions'))
const About = lazy(() => import('./app/pages/About'));
const Privacy = lazy(() => import('./app/pages/Privacy'));
const Terms = lazy(() => import('./app/pages/Terms'));
const NotFound = lazy(() => import('./app/pages/NotFound'));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <UseScrollToTop /> {/* Reset scroll on every route change */}
      
      {/* Suspense provides a fallback UI while the lazy-loaded component is fetched */}
      <Suspense fallback={
        <div className="min-h-screen bg-paper dark:bg-dark-paper">
        </div>
      }></Suspense>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Use 'index' for the v6 index route */}
          <Route path="saved" element={<Saved />} />
          <Route path="reactions" element={<MyReactions />} />
          <Route path="about" element={<About />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;