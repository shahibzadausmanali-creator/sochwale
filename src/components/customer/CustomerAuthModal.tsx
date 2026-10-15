import React, { useState } from 'react';
import { X, Mail, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const CustomerAuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    setActiveCustomerEmail,
    setCurrentView,
    customers
  } = useCMS();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setActiveCustomerEmail(cleanEmail);
    setIsAuthModalOpen(false);
    setCurrentView('customer-portal');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
      onClick={() => setIsAuthModalOpen(false)}
    >
      <div
        className="w-full max-w-md bg-white border border-neutral-200 shadow-2xl rounded-sm overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
          <h2 id="auth-modal-title" className="text-base font-serif font-bold text-neutral-900">
            {mode === 'signin' ? 'Sign In to Soch Wale' : 'Create Reader Account'}
          </h2>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1 text-neutral-400 hover:text-neutral-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-neutral-500 leading-relaxed">
            Access your licensed PDF digital library, track manual JazzCash verification, and download educational resources.
          </p>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs border border-red-200 rounded">
              {error}
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ahmad Raza"
                className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-xs focus:outline-none focus:border-neutral-900"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="reader@example.com"
              className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-xs focus:outline-none focus:border-neutral-900"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-neutral-950 text-white text-xs font-semibold hover:bg-black transition-colors rounded-xs flex items-center justify-center gap-2"
            >
              <span>{mode === 'signin' ? 'Sign In & Access Library' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-2 text-center text-xs text-neutral-500 flex items-center justify-center gap-1">
            <span>{mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}</span>
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'register' : 'signin')}
              className="font-semibold text-neutral-900 hover:underline"
            >
              {mode === 'signin' ? 'Register Now' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
