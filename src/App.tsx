import React from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomePage } from './components/home/HomePage';
import { ArticlesArchive } from './components/pages/ArticlesArchive';
import { VideosArchive } from './components/pages/VideosArchive';
import { BooksArchive } from './components/pages/BooksArchive';
import { AboutPage, ContactPage, LegalPage } from './components/pages/StaticPages';
import { ArticleDetail } from './components/articles/ArticleDetail';
import { VideoDetail } from './components/videos/VideoDetail';
import { BookDetail } from './components/books/BookDetail';
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CheckoutModal } from './components/books/CheckoutModal';
import { VideoModal } from './components/videos/VideoModal';
import { SearchModal } from './components/common/SearchModal';
import { CustomerAuthModal } from './components/customer/CustomerAuthModal';

const AppContent: React.FC = () => {
  const { currentView, currentSlug } = useCMS();

  // If in WordPress Admin Panel mode, render the full admin dashboard
  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-neutral-100 text-neutral-900 font-sans antialiased selection:bg-neutral-900 selection:text-white">
        <AdminDashboard />
        <VideoModal />
        <SearchModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans antialiased selection:bg-[#111111] selection:text-white">
      {/* Header with Navigation and WordPress Top Bar */}
      <Header />

      {/* Main View Switcher */}
      <main className="flex-1">
        {currentView === 'home' && <HomePage />}
        {currentView === 'articles' && <ArticlesArchive />}
        {currentView === 'videos' && <VideosArchive />}
        {currentView === 'books' && <BooksArchive />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'privacy' && <LegalPage policyType="privacy" />}
        {currentView === 'terms' && <LegalPage policyType="terms" />}
        {currentView === 'purchase-policy' && <LegalPage policyType="digital-policy" />}
        {currentView === 'article-detail' && <ArticleDetail slug={currentSlug || ''} />}
        {currentView === 'video-detail' && <VideoDetail slug={currentSlug || ''} />}
        {currentView === 'book-detail' && <BookDetail slug={currentSlug || ''} />}
        {currentView === 'customer-dashboard' && <CustomerDashboard />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Modals */}
      <CheckoutModal />
      <VideoModal />
      <SearchModal />
      <CustomerAuthModal />
    </div>
  );
};

export default function App() {
  return (
    <CMSProvider>
      <AppContent />
    </CMSProvider>
  );
}
