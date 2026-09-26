import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Bookmark, Sprout, Menu, X, UserPlus, LogOut } from 'lucide-react';
import { useSaved } from '../context/SavedContext';
import { useAuth } from '../context/AuthContext';
import marketsData from '../data/markets.json';
import { getMarketCurrentStatus } from '../utils/marketSchedule';
import GlobalSearch from './GlobalSearch';
import VisitorCounter from './VisitorCounter';

export default function Navbar() {
  const { totalSavedCount } = useSaved();
  const { currentUser, openAuthModal, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  // Compute how many markets are open right now
  const openMarketsCount = marketsData.filter((m) => {
    const status = getMarketCurrentStatus(m.operatingHours);
    return status.isOpen;
  }).length;

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDay = currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  const navLinkClasses = ({ isActive }) =>
    `relative px-2 py-1 text-xs md:text-sm font-semibold tracking-wide uppercase cursor-pointer rounded-sm whitespace-nowrap transition-all duration-200 ease-in-out ${
      isActive
        ? 'text-[#2D5A27] font-bold bg-stone-200/40 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[2px] after:bg-[#2D5A27]'
        : 'text-[#5C685B] hover:text-[#2D5A27] hover:bg-stone-200/50'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[#F7F5ED]/95 backdrop-blur-md border-b border-crisp max-w-full overflow-x-hidden">
      {/* Top Banner / Gazette Ticker: Real-time clock & Open Right Now status */}
      <div className="bg-[#1C241B] text-[#F7F5ED] text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 font-mono flex items-center justify-between border-b border-[#2D5A27]/40 max-w-full overflow-hidden">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="flex items-center gap-1.5 text-[#F3E8B1]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E2725B] animate-ping" />
            <span className="font-semibold tracking-wider uppercase text-[10px]">LIVE HARVEST DISPATCH</span>
          </span>
          <span className="text-[#5C685B] hidden md:inline">|</span>
          <span className="hidden sm:inline text-[#D6D3C7]/90">
            {formattedDay} • {formattedTime}
          </span>
        </div>

        {/* Live Visitor Counter & Open Markets Status */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          <VisitorCounter variant="ticker" />

          <span className="text-[#5C685B] hidden sm:inline">|</span>

          <Link
            to="/markets?filter=open-now"
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#2D5A27] text-white hover:bg-[#23461e] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 font-sans text-[11px] font-medium cursor-pointer shadow-tactile-sm whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F3E8B1] animate-pulse" />
            <span>
              {openMarketsCount > 0 ? `${openMarketsCount} Open Now` : 'Schedule Active'}
            </span>
          </Link>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 lg:gap-3">
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#2D5A27] text-[#F7F5ED] flex items-center justify-center border border-[#1E3D1A] shadow-tactile-sm group-hover:bg-[#E2725B] group-hover:-translate-y-0.5 group-hover:shadow-[3px_4px_0px_0px_rgba(45,90,39,0.2)] transition-all duration-200 shrink-0">
              <Sprout className="w-5 h-5 stroke-[1.8] group-hover:rotate-6 transition-transform" />
            </div>
            <div>
              <span className="font-editorial text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#1C241B] block leading-none group-hover:text-[#2D5A27] transition-colors whitespace-nowrap">
                FreshFind
              </span>
              <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.18em] text-[#5C685B] block mt-0.5 whitespace-nowrap">
                Farmers' Market Field Guide
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Tight gaps & shortened labels) */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5">
            <NavLink to="/" end className={navLinkClasses}>
              Editorial
            </NavLink>
            <NavLink to="/markets" className={navLinkClasses}>
              Markets
            </NavLink>
            <NavLink to="/produce" className={navLinkClasses}>
              Produce
            </NavLink>
            <NavLink to="/about" className={navLinkClasses}>
              About
            </NavLink>
            <NavLink to="/contact" className={navLinkClasses}>
              Contact
            </NavLink>
            <NavLink to="/saved" className={navLinkClasses}>
              <span className="flex items-center gap-1">
                Saved
                {totalSavedCount > 0 && (
                  <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold bg-[#E2725B] text-white rounded-full">
                    {totalSavedCount}
                  </span>
                )}
              </span>
            </NavLink>
          </nav>

          {/* Quick Actions, Global Search & Dummy Auth Controls */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 flex-shrink-0">
            <GlobalSearch />

            <Link
              to="/saved"
              aria-label="View Saved Items"
              className="relative p-2 text-[#1C241B] hover:text-[#2D5A27] border border-crisp bg-white hover:bg-[#F3E8B1]/30 transition-all duration-200 btn-icon-tactile cursor-pointer flex-shrink-0"
            >
              <Bookmark className="w-4 h-4" />
              {totalSavedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#2D5A27] text-white text-[10px] font-bold flex items-center justify-center animate-in zoom-in">
                  {totalSavedCount}
                </span>
              )}
            </Link>

            {/* Simulated Auth Trigger Controls */}
            {currentUser ? (
              <div className="flex items-center gap-1 pl-1 border-l border-crisp flex-shrink-0">
                <div
                  className="flex items-center gap-1.5 px-2 py-1 bg-[#EDEAE0] border border-crisp rounded-sm text-xs text-[#1C241B]"
                  title={`Signed in as ${currentUser.email || currentUser.name}`}
                >
                  <span className="w-4 h-4 rounded-full bg-[#2D5A27] text-[#F7F5ED] flex items-center justify-center text-[9px] font-bold font-mono">
                    {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                  </span>
                  <span className="max-w-[75px] xl:max-w-[100px] truncate font-medium font-sans text-xs">
                    {currentUser.name || 'Friend'}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 text-[#5C685B] hover:text-[#E2725B] hover:bg-[#E2725B]/10 border border-crisp bg-white rounded-sm transition-colors cursor-pointer"
                  title="Sign Out of Session"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1 pl-1 flex-shrink-0">
                <button
                  onClick={() => openAuthModal('signin')}
                  className="text-xs font-mono uppercase tracking-wider font-semibold text-[#1C241B] hover:text-[#2D5A27] px-2.5 py-1.5 hover:bg-stone-200/50 rounded-sm cursor-pointer transition-colors whitespace-nowrap flex-shrink-0"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="btn-primary text-xs px-2.5 py-1.5 rounded-none whitespace-nowrap cursor-pointer flex items-center gap-1 shadow-tactile-sm flex-shrink-0"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline">Join Community</span>
                  <span className="inline xl:hidden">Join</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile & Tablet menu controls (under 1024px) */}
          <div className="lg:hidden flex items-center gap-1.5 sm:gap-2">
            <Link
              to="/saved"
              className="relative p-2 text-[#1C241B] border border-crisp bg-white cursor-pointer active:scale-95 transition"
              aria-label="Saved Markets"
            >
              <Bookmark className="w-4 h-4" />
              {totalSavedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E2725B] text-white text-[10px] font-bold flex items-center justify-center">
                  {totalSavedCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-crisp text-[#1C241B] bg-white cursor-pointer active:scale-95 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Menu Drawer (under 1024px) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F7F5ED] border-b border-crisp px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-200 shadow-lg">
          <div className="pb-3 border-b border-crisp">
            <GlobalSearch isMobile={true} onSelect={() => setMobileMenuOpen(false)} />
          </div>

          <NavLink
            to="/"
            end
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold tracking-wide uppercase text-[#1C241B] hover:text-[#2D5A27] hover:bg-stone-200/50 px-2 rounded-sm cursor-pointer transition"
          >
            Editorial Hero
          </NavLink>
          <NavLink
            to="/markets"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold tracking-wide uppercase text-[#1C241B] hover:text-[#2D5A27] hover:bg-stone-200/50 px-2 rounded-sm cursor-pointer transition"
          >
            Market Directory & Map
          </NavLink>
          <NavLink
            to="/produce"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold tracking-wide uppercase text-[#1C241B] hover:text-[#2D5A27] hover:bg-stone-200/50 px-2 rounded-sm cursor-pointer transition"
          >
            Seasonal Produce Matrix
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold tracking-wide uppercase text-[#1C241B] hover:text-[#2D5A27] hover:bg-stone-200/50 px-2 rounded-sm cursor-pointer transition"
          >
            About Us & Manifesto
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold tracking-wide uppercase text-[#1C241B] hover:text-[#2D5A27] hover:bg-stone-200/50 px-2 rounded-sm cursor-pointer transition"
          >
            Contact Field Office
          </NavLink>
          <NavLink
            to="/saved"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-sm font-semibold tracking-wide uppercase text-[#1C241B] hover:text-[#2D5A27] hover:bg-stone-200/50 px-2 rounded-sm cursor-pointer transition"
          >
            <span>Saved Markets & Notes</span>
            {totalSavedCount > 0 && (
              <span className="px-2 py-0.5 text-xs bg-[#E2725B] text-white font-bold rounded-full">
                {totalSavedCount}
              </span>
            )}
          </NavLink>

          {/* Mobile Auth Panel */}
          <div className="pt-3 border-t border-crisp">
            {currentUser ? (
              <div className="flex items-center justify-between p-2.5 bg-[#EDEAE0] border border-crisp rounded-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#2D5A27] text-white flex items-center justify-center font-bold text-xs">
                    {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1C241B] font-editorial">
                      {currentUser.name || 'Market Patron'}
                    </p>
                    <p className="text-[10px] text-[#5C685B] font-mono">
                      Guest Session Active
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1 text-xs text-[#E2725B] hover:bg-[#E2725B]/10 border border-[#E2725B]/40 rounded-sm font-mono cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('signin');
                  }}
                  className="py-2 text-xs font-mono uppercase font-bold text-[#1C241B] border border-crisp bg-white hover:bg-stone-100 text-center rounded-sm cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('signup');
                  }}
                  className="btn-primary py-2 text-xs text-center justify-center rounded-none cursor-pointer"
                >
                  Join Community
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
