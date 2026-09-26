import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

const STORAGE_KEY = 'freshfind_visitor_count';
const BASE_COUNT = 1842;

export default function VisitorCounter({ variant = 'ticker', className = '' }) {
  const [visitorCount, setVisitorCount] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = parseInt(stored, 10);
        return isNaN(parsed) ? BASE_COUNT : parsed;
      }
    } catch (e) {
      console.warn('Unable to read visitor count from localStorage', e);
    }
    return BASE_COUNT;
  });

  // On initial mount (fresh session / page load), increment count once & store
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      let current = BASE_COUNT;
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed)) current = parsed;
      }
      const newCount = current + 1;
      localStorage.setItem(STORAGE_KEY, newCount.toString());
      setVisitorCount(newCount);
    } catch (e) {
      console.warn('Unable to persist incremented visitor count', e);
    }
  }, []);

  // Periodic random jitter interval (15-30 seconds) simulating live community traffic
  useEffect(() => {
    const getRandomInterval = () => Math.floor(Math.random() * (30000 - 15000 + 1)) + 15000;
    
    let timerId;
    const scheduleNextTick = () => {
      timerId = setTimeout(() => {
        setVisitorCount((prev) => {
          const incremented = prev + 1;
          try {
            localStorage.setItem(STORAGE_KEY, incremented.toString());
          } catch (e) {
            // ignore
          }
          return incremented;
        });
        scheduleNextTick();
      }, getRandomInterval());
    };

    scheduleNextTick();

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  const formattedCount = visitorCount.toLocaleString();

  if (variant === 'ticker') {
    return (
      <div
        className={`flex items-center gap-1.5 text-[#F3E8B1]/90 font-mono text-[10px] sm:text-[11px] whitespace-nowrap select-none ${className}`}
        title="Simulated real-time active community shoppers"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E2725B] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E2725B]" />
        </span>
        <Users className="w-3.5 h-3.5 text-[#F3E8B1]" />
        <span className="font-semibold text-white tracking-wide">{formattedCount}</span>
        <span className="hidden lg:inline text-[#D6D3C7]/80">Local Shoppers Today</span>
        <span className="inline lg:hidden text-[#D6D3C7]/80">Shoppers</span>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 bg-[#233121]/60 border border-[#2D5A27] rounded-sm text-xs font-mono text-[#F3E8B1] ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E2725B] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E2725B]" />
        </span>
        <Users className="w-4 h-4 text-[#F3E8B1]" />
        <span>
          <strong className="text-white font-bold">{formattedCount}</strong> Local Shoppers Active
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 font-mono text-xs ${className}`}>
      <span className="w-2 h-2 rounded-full bg-[#E2725B] animate-pulse" />
      <span>{formattedCount} Local Shoppers Today</span>
    </div>
  );
}
