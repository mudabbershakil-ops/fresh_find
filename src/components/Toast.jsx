import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Toast() {
  const { toastMessage, setToastMessage } = useAuth();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[120] max-w-sm bg-[#1C241B] text-[#F7F5ED] border-2 border-[#2D5A27] shadow-[4px_6px_0px_0px_rgba(45,90,39,0.3)] p-3.5 rounded-sm flex items-start gap-3 animate-in slide-in-from-bottom-5 fade-in duration-200"
    >
      <CheckCircle2 className="w-5 h-5 text-[#F3E8B1] shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#F3E8B1]">
          FreshFind Dispatch
        </p>
        <p className="text-xs text-[#D6D3C7] mt-0.5 font-sans leading-normal">
          {toastMessage}
        </p>
      </div>
      <button
        onClick={() => setToastMessage(null)}
        className="text-[#D6D3C7]/70 hover:text-white p-0.5 rounded cursor-pointer transition-colors"
        aria-label="Dismiss message"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
