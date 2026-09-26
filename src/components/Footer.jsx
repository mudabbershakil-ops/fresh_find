import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Heart, MapPin, ExternalLink, Calendar, Compass, ShieldCheck } from 'lucide-react';
import VisitorCounter from './VisitorCounter';

export default function Footer() {
  return (
    <footer className="bg-[#1C241B] text-[#F7F5ED] border-t-2 border-[#2D5A27] mt-20 font-sans">
      {/* Top Editorial Dispatch */}
      <div className="border-b border-[#2D5A27]/40 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Manifesto */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2D5A27] flex items-center justify-center text-[#F3E8B1] border border-[#2D5A27]/60">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-editorial text-2xl font-bold tracking-tight text-[#F7F5ED]">
                FreshFind
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#D6D3C7]/80 leading-relaxed max-w-md">
              A bespoke, human-curated field guide for regional slow-food systems, farmsteads, and farmers' market pavilions. Celebrating seasonal soil rhythms, biodiversity, and small-batch agrarian crafters.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#F3E8B1]/90 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E2725B]" />
              <span>TechWiz 7 — Aptech (Category 1: Web Application SPA)</span>
            </div>
            <div className="pt-2">
              <VisitorCounter variant="footer" />
            </div>
          </div>

          {/* Quick Routes */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#F3E8B1] font-semibold">
              Client Routes
            </h4>
            <ul className="space-y-1.5 text-xs text-[#D6D3C7]/90 font-medium">
              <li>
                <Link to="/" className="hover:text-[#E2725B] transition-colors">
                  Editorial Dispatch & Hero
                </Link>
              </li>
              <li>
                <Link to="/markets" className="hover:text-[#E2725B] transition-colors">
                  Interactive Market Directory & Map
                </Link>
              </li>
              <li>
                <Link to="/produce" className="hover:text-[#E2725B] transition-colors">
                  Seasonal Harvest Matrix
                </Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-[#E2725B] transition-colors">
                  Bookmarked Stalls & Session Notes
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#E2725B] transition-colors">
                  About Us & Slow-Food Heritage
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#E2725B] transition-colors">
                  Contact Field Office
                </Link>
              </li>
            </ul>
          </div>

          {/* Seasonal Terra Almanac */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#F3E8B1] font-semibold">
              Harvest Calendar
            </h4>
            <p className="text-xs text-[#D6D3C7]/80 leading-relaxed">
              Currently featuring late-summer heirlooms transitioning into autumn orchard flushes: Honeycrisp apples, Chanterelles & Delicata squash.
            </p>
            <div className="pt-1">
              <Link
                to="/produce"
                className="inline-block text-[11px] uppercase tracking-wider text-[#E2725B] hover:underline font-bold"
              >
                View 12 Harvest Profiles &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Colophon */}
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#D6D3C7]/60 font-mono gap-3">
        <p>
          &copy; {new Date().getFullYear()} FreshFind Slow-Food Commons. Built for TechWiz 7.
        </p>
        <p className="flex items-center gap-1.5">
          <span>Crafted with</span>
          <span className="text-[#E2725B]">♥</span>
          <span>using React SPA & Local Structured Schemas</span>
        </p>
      </div>
    </footer>
  );
}
