import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Video,
  FileText,
  Instagram,
  Facebook,
  Youtube,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { HeroSlider } from './HeroSlider';
import { ArticleCard } from '../cards/ArticleCard';
import { VideoCard } from '../cards/VideoCard';
import { BookCard } from '../cards/BookCard';

export const HomePage: React.FC = () => {
  const {
    articles,
    videos,
    books,
    themeSettings,
    siteSettings,
    setCurrentView
  } = useCMS();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);

  const sections = themeSettings.homepageSections;

  // Filter published content
  const publishedArticles = articles.filter(a => a.status === 'published');
  const featuredArticles = publishedArticles.filter(a => a.featured).slice(0, 4);
  const latestArticles = publishedArticles.slice(0, 4);

  const publishedVideos = videos.filter(v => v.status === 'published');
  const featuredVideos = publishedVideos.filter(v => v.featured).slice(0, 4);
  const latestVideos = publishedVideos.slice(0, 4);

  const publishedBooks = books.filter(b => b.status === 'published');
  const featuredBooks = publishedBooks.filter(b => b.featured).slice(0, 4);
  const latestBooks = publishedBooks.slice(0, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterDone(true);
    }
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero Slider */}
      {sections.heroSlider && <HeroSlider />}

      {/* 2. Featured Articles Section */}
      {sections.featuredArticles && featuredArticles.length > 0 && (
        <section id="articles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between pb-6 mb-8 border-b border-neutral-200">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                Curated Editorial
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-950 mt-1">
                Featured Articles & Essays
              </h2>
            </div>
            <button
              onClick={() => setCurrentView('articles')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-black group"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Strict Responsive Grid: 4 cards on desktop, 3 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredArticles.map(art => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </section>
      )}

      {/* 3. Featured Video Lectures */}
      {sections.featuredVideos && featuredVideos.length > 0 && (
        <section id="videos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between pb-6 mb-8 border-b border-neutral-200">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                Visual Knowledge Series
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-950 mt-1">
                Featured Video Lectures
              </h2>
            </div>
            <button
              onClick={() => setCurrentView('videos')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-black group"
            >
              <span>View All Lectures</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredVideos.map(vid => (
              <VideoCard key={vid.id} video={vid} />
            ))}
          </div>
        </section>
      )}

      {/* 4. Quote / Manifesto Banner */}
      {sections.quoteBanner && (
        <section className="bg-neutral-950 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              The Soch Wale Manifesto
            </span>
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium leading-relaxed italic text-neutral-100">
              &ldquo;Doubt is not a pleasant condition, but certainty is an absurd one. When we examine our beliefs with courage, we cultivate authentic humanity.&rdquo;
            </blockquote>
            <div className="pt-2">
              <span className="text-sm font-semibold text-white tracking-wide">
                Usman Ali
              </span>
              <span className="text-xs text-neutral-400 block mt-0.5">
                Founder & Editor-in-Chief · Soch Wale
              </span>
            </div>
          </div>
        </section>
      )}

      {/* 5. Featured Books & PDFs */}
      {sections.featuredBooks && featuredBooks.length > 0 && (
        <section id="books" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between pb-6 mb-8 border-b border-neutral-200">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                Digital Bookstore & Library
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-950 mt-1">
                Books & Downloadable PDFs
              </h2>
            </div>
            <button
              onClick={() => setCurrentView('books')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-black group"
            >
              <span>View Bookstore</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredBooks.map(bk => (
              <BookCard key={bk.id} book={bk} />
            ))}
          </div>
        </section>
      )}

      {/* 6. Social Media & Community Showcase */}
      {sections.socialShowcase && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 bg-neutral-50 border border-neutral-200 rounded-sm">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                Official Channels
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-950 mt-1">
                Connect Across Official Soch Wale Platforms
              </h2>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                Follow our official social media channels for daily intellectual reflections, upcoming live streams, and educational announcements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Instagram Card */}
              <a
                href={siteSettings.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 bg-white border border-neutral-200 hover:border-neutral-900 rounded-sm transition-all group flex items-start justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800 group-hover:bg-neutral-900 group-hover:text-white transition-colors mb-3">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-sm text-neutral-950">
                    Instagram
                  </h3>
                  <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                    @sochwale.official
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-all mt-1" />
              </a>

              {/* Facebook Card */}
              <a
                href={siteSettings.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 bg-white border border-neutral-200 hover:border-neutral-900 rounded-sm transition-all group flex items-start justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800 group-hover:bg-neutral-900 group-hover:text-white transition-colors mb-3">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-sm text-neutral-950">
                    Facebook
                  </h3>
                  <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                    Soch Wale Official
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-all mt-1" />
              </a>

              {/* YouTube Card */}
              <a
                href={siteSettings.socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 bg-white border border-neutral-200 hover:border-neutral-900 rounded-sm transition-all group flex items-start justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800 group-hover:bg-neutral-900 group-hover:text-white transition-colors mb-3">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-sm text-neutral-950">
                    YouTube
                  </h3>
                  <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                    @SochWale Channel
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-all mt-1" />
              </a>

              {/* TikTok Card */}
              <a
                href={siteSettings.socialMedia.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 bg-white border border-neutral-200 hover:border-neutral-900 rounded-sm transition-all group flex items-start justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800 group-hover:bg-neutral-900 group-hover:text-white transition-colors mb-3 text-sm font-bold">
                    TT
                  </div>
                  <h3 className="font-serif font-bold text-sm text-neutral-950">
                    TikTok
                  </h3>
                  <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                    @sochwale
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-all mt-1" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 7. Newsletter Section */}
      {sections.newsletter && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 bg-white border-2 border-neutral-950 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                Weekly Intellectual Digest
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-950 mt-1">
                Receive Essays & Free PDF Publications Directly
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                Join our community of independent thinkers. We share scholarly essays, reading lists, and announcements about free study guides. No spam ever.
              </p>
            </div>

            <div className="w-full md:w-auto flex-shrink-0">
              {newsletterDone ? (
                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded text-xs text-neutral-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Subscribed! Check your inbox for the welcome edition.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 w-full sm:w-96">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-3.5 py-2.5 text-xs border border-neutral-300 rounded focus:outline-none focus:border-neutral-900"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-neutral-950 text-white text-xs font-semibold rounded hover:bg-black transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
