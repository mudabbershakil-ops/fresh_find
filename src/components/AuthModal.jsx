import React, { useState, useEffect, useRef } from 'react';
import { X, Sprout, Mail, Lock, User, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const { isAuthModalOpen, authModalMode, closeAuthModal, setAuthModalMode, login, signup } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const modalRef = useRef(null);
  const emailInputRef = useRef(null);

  // Focus input and lock body scrolling when open
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        if (emailInputRef.current) emailInputRef.current.focus();
      }, 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isAuthModalOpen]);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!email || !email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 4) {
      setFormError('Password must be at least 4 characters.');
      return;
    }
    if (authModalMode === 'signup' && !fullName.trim()) {
      setFormError('Please enter your full name or market handle.');
      return;
    }

    setIsLoading(true);

    // Simulate 1-second authentication latency
    setTimeout(() => {
      setIsLoading(false);
      const userData = {
        name: authModalMode === 'signup' ? fullName.trim() : fullName.trim() || email.split('@')[0],
        email: email.trim(),
      };

      if (authModalMode === 'signup') {
        signup(userData);
      } else {
        login(userData);
      }

      // Reset form fields
      setEmail('');
      setPassword('');
      setFullName('');
      closeAuthModal();
    }, 900);
  };

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeAuthModal();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        ref={modalRef}
        className="relative z-[110] w-full max-w-md bg-[#F7F5ED] border-2 border-[#1C241B] shadow-[6px_8px_0px_0px_rgba(28,36,27,0.25)] rounded-sm overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Editorial Header Banner */}
        <div className="bg-[#1C241B] text-[#F7F5ED] px-6 py-4 flex items-center justify-between border-b border-[#2D5A27]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#2D5A27] text-[#F3E8B1] flex items-center justify-center rounded-sm">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <span className="font-editorial text-lg font-bold tracking-tight block leading-none">
                FreshFind Commons
              </span>
              <span className="text-[10px] font-mono text-[#D6D3C7]/80 uppercase tracking-widest block mt-0.5">
                Market Patron Portal
              </span>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="text-[#D6D3C7] hover:text-white p-1 rounded-sm hover:bg-[#2D5A27]/60 transition-colors cursor-pointer"
            aria-label="Close authentication modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-crisp bg-[#EDEAE0]">
          <button
            type="button"
            onClick={() => {
              setAuthModalMode('signin');
              setFormError('');
            }}
            className={`flex-1 py-3 text-xs font-mono uppercase tracking-wider font-semibold cursor-pointer transition-colors ${
              authModalMode === 'signin'
                ? 'bg-[#F7F5ED] text-[#2D5A27] border-b-2 border-[#2D5A27]'
                : 'text-[#5C685B] hover:text-[#1C241B]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthModalMode('signup');
              setFormError('');
            }}
            className={`flex-1 py-3 text-xs font-mono uppercase tracking-wider font-semibold cursor-pointer transition-colors ${
              authModalMode === 'signup'
                ? 'bg-[#F7F5ED] text-[#2D5A27] border-b-2 border-[#2D5A27]'
                : 'text-[#5C685B] hover:text-[#1C241B]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 sm:p-7">
          <div className="mb-5 text-center">
            <h3 id="auth-modal-title" className="font-editorial text-2xl font-bold text-[#1C241B]">
              {authModalMode === 'signin' ? 'Welcome Back, Neighbor' : 'Join Our Slow-Food Circle'}
            </h3>
            <p className="text-xs text-[#5C685B] mt-1 font-sans">
              {authModalMode === 'signin'
                ? 'Access your bookmarked market stalls and custom shopping notes.'
                : 'Create your local community patron profile to curate harvest notes.'}
            </p>
          </div>

          {formError && (
            <div className="mb-4 p-2.5 bg-[#E2725B]/15 border border-[#E2725B] text-[#9c2f18] text-xs rounded-sm font-sans flex items-center gap-2">
              <span className="font-bold font-mono">Notice:</span>
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {authModalMode === 'signup' && (
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5C685B] mb-1 font-medium">
                  Full Name / Market Handle
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#5C685B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Clara Greenleaf"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#D6D3C7] focus:border-[#2D5A27] focus:ring-1 focus:ring-[#2D5A27] outline-none text-[#1C241B] rounded-sm transition font-sans"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#5C685B] mb-1 font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#5C685B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  ref={emailInputRef}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="shopper@marketlane.org"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#D6D3C7] focus:border-[#2D5A27] focus:ring-1 focus:ring-[#2D5A27] outline-none text-[#1C241B] rounded-sm transition font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#5C685B] mb-1 font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#5C685B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#D6D3C7] focus:border-[#2D5A27] focus:ring-1 focus:ring-[#2D5A27] outline-none text-[#1C241B] rounded-sm transition font-sans"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-2.5 text-xs uppercase tracking-wider font-bold justify-center cursor-pointer shadow-tactile-sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>{authModalMode === 'signin' ? 'Sign In to Account' : 'Create Patron Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Secondary Action: Continue as Guest */}
          <div className="mt-4 pt-4 border-t border-crisp flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={closeAuthModal}
              className="text-xs font-mono text-[#5C685B] hover:text-[#2D5A27] hover:underline font-semibold cursor-pointer transition-colors"
            >
              &larr; Continue browsing as Guest
            </button>

            <div className="bg-[#EDEAE0] p-2.5 rounded-sm border border-[#D6D3C7] text-[11px] text-[#5C685B] leading-snug flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2D5A27] shrink-0 mt-0.5" />
              <span>
                FreshFind is an offline-ready single page application. Session data & bookmarks persist safely in your browser’s local store.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
