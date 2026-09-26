import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SavedProvider } from './context/SavedContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FieldGuideChatbot from './components/FieldGuideChatbot';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';
import ScrollToTop from './components/ScrollToTop';

// Routed Views
import Home from './pages/Home';
import MarketsDirectory from './pages/MarketsDirectory';
import MarketDetail from './pages/MarketDetail';
import SeasonalProduce from './pages/SeasonalProduce';
import SavedItems from './pages/SavedItems';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  return (
    <SavedProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-[#F7F5ED] text-[#1C241B] selection:bg-[#E2725B]/20 selection:text-[#2D5A27]">
            {/* Global Navigation Header */}
            <Navbar />

            {/* Main Content Routed View */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/markets" element={<MarketsDirectory />} />
                <Route path="/markets/:id" element={<MarketDetail />} />
                <Route path="/produce" element={<SeasonalProduce />} />
                <Route path="/saved" element={<SavedItems />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Global Pre-Scripted Rule-Based Floating Chatbot */}
            <FieldGuideChatbot />

            {/* Accessible Simulated Authentication Modal */}
            <AuthModal />

            {/* Global Floating Feedback Toast */}
            <Toast />

            {/* Global Editorial Colophon & Footer */}
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </SavedProvider>
  );
}
