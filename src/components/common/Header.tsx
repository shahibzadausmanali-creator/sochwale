import React, { useState } from 'react';
import {
  Search,
  User,
  Shield,
  Menu,
  X,
  ExternalLink,
  Plus,
  BookOpen,
  Video,
  FileText,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { BrandLogo } from './BrandLogo';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    userRole,
    setUserRole,
    activeCustomerEmail,
    setActiveCustomerEmail,
    setIsSearchOpen,
    setIsAuthModalOpen,
    siteSettings
  } = useCMS();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', view: 'home' },
    { label: 'Articles', view: 'articles' },
    { label: 'Videos', view: 'videos' },
    { label: 'Books & PDFs', view: 'books' },
    { label: 'About', view: 'about' },
    { label: 'Contact', view: 'contact' }
  ];

  const handleNavClick = (view: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      {/* WordPress Admin Top Bar */}
      <div className="bg-[#111111] text-neutral-300 text-xs px-4 py-1.5 flex items-center justify-between border-b border-neutral-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-medium text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>WordPress CMS Active</span>
          </div>

          <div className="h-3 w-px bg-neutral-700 hidden sm:block"></div>

          {currentView === 'admin' ? (
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3 h-3" /> Visit Public Site
            </button>
          ) : (
            <button
              onClick={() => setCurrentView('admin')}
              className="flex items-center gap-1 text-white hover:text-neutral-200 font-medium transition-colors"
            >
              <Shield className="w-3 h-3 text-neutral-400" /> Go to WP Admin Dashboard
            </button>
          )}

          {/* Quick Create Dropdown for Admin */}
          {userRole === 'admin' && (
            <div className="relative hidden md:block">
              <button
                onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors py-0.5"
              >
                <Plus className="w-3 h-3" /> New <ChevronDown className="w-2.5 h-2.5 ml-0.5" />
              </button>
              {adminMenuOpen && (
                <div
                  className="absolute left-0 mt-1 w-36 bg-neutral-900 border border-neutral-800 shadow-xl rounded py-1 z-50 text-xs"
                  onMouseLeave={() => setAdminMenuOpen(false)}
                >
                  <button
                    onClick={() => {
                      setCurrentView('admin');
                      setAdminMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-neutral-800 flex items-center gap-2 text-neutral-200"
                  >
                    <FileText className="w-3 h-3" /> New Article
                  </button>
                  <button
                    onClick={() => {
                      setCurrentView('admin');
                      setAdminMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-neutral-800 flex items-center gap-2 text-neutral-200"
                  >
                    <Video className="w-3 h-3" /> New Video
                  </button>
                  <button
                    onClick={() => {
                      setCurrentView('admin');
                      setAdminMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-neutral-800 flex items-center gap-2 text-neutral-200"
                  >
                    <BookOpen className="w-3 h-3" /> New Book PDF
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Role & Quick Switcher for Testing Acceptance Criteria */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800 text-[11px]">
            <span className="text-neutral-400">Role:</span>
            <select
              value={userRole}
              onChange={e => setUserRole(e.target.value as any)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="admin" className="bg-neutral-900 text-white">Administrator</option>
              <option value="customer" className="bg-neutral-900 text-white">Customer / Reader</option>
              <option value="visitor" className="bg-neutral-900 text-white">Public Visitor</option>
            </select>
          </div>

          {activeCustomerEmail && (
            <span className="text-[11px] text-neutral-400 hidden lg:inline-block">
              {activeCustomerEmail}
            </span>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center text-left focus:outline-none group"
          >
            <BrandLogo size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`text-sm font-medium tracking-tight transition-colors relative py-1 ${
                    isActive
                      ? 'text-neutral-950 font-semibold'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-950 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search Soch Wale"
              className="p-2 text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-md transition-colors flex items-center gap-1.5"
            >
              <Search className="w-5 h-5" />
              <span className="hidden lg:inline-block text-xs font-mono text-neutral-400 border border-neutral-200 px-1.5 py-0.5 rounded">
                ⌘K
              </span>
            </button>

            {/* Customer Account / Portal */}
            <button
              onClick={() => {
                if (userRole === 'admin') {
                  setCurrentView('admin');
                } else if (activeCustomerEmail) {
                  setCurrentView('customer-portal');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold border border-neutral-900 rounded bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">
                {userRole === 'admin'
                  ? 'Admin CMS'
                  : activeCustomerEmail
                  ? 'My Account'
                  : 'Customer Sign In'}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-800 hover:text-black"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navItems.map(item => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`text-left px-3 py-2.5 rounded text-sm font-medium ${
                  currentView === item.view
                    ? 'bg-neutral-100 text-neutral-950 font-bold'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsSearchOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded"
            >
              <Search className="w-4 h-4" /> Search Articles, Videos, Books
            </button>

            <button
              onClick={() => {
                setCurrentView('admin');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-neutral-900 bg-neutral-100 rounded"
            >
              <Shield className="w-4 h-4" /> Open WordPress Admin Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
