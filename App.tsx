
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { CourseDetail } from './pages/CourseDetail';
import { getEstimatedCurrency } from './utils/currencyUtils';
import { CurrencyConfig } from './types';

// Componente auxiliar para forzar el scroll arriba al cambiar de página
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [currency, setCurrency] = useState<CurrencyConfig>({ code: 'USD', symbol: '$', rate: 1 });

  useEffect(() => {
    // Detect currency on mount
    const detected = getEstimatedCurrency();
    setCurrency(detected);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#010812] text-white font-sans selection:bg-neon-orange selection:text-black">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home currency={currency} />} />
            <Route path="/curso/:id" element={<CourseDetail currency={currency} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
