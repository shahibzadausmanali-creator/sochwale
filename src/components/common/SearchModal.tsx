import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Video, FileText, ArrowRight } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    articles,
    videos,
    books,
    setCurrentView
  } = useCMS();

  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'articles' | 'videos' | 'books'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Global Ctrl/Cmd + K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const normalized = query.trim().toLowerCase();

  const matchingArticles = articles.filter(
    a =>
      a.status === 'published' &&
      (a.title.toLowerCase().includes(normalized) ||
        a.category.toLowerCase().includes(normalized) ||
        a.excerpt.toLowerCase().includes(normalized) ||
        a.tags.some(t => t.toLowerCase().includes(normalized)))
  );

  const matchingVideos = videos.filter(
    v =>
      v.status === 'published' &&
      (v.title.toLowerCase().includes(normalized) ||
        v.category.toLowerCase().includes(normalized) ||
        v.description.toLowerCase().includes(normalized) ||
        v.tags.some(t => t.toLowerCase().includes(normalized)))
  );

  const matchingBooks = books.filter(
    b =>
      b.status === 'published' &&
      (b.title.toLowerCase().includes(normalized) ||
        b.category.toLowerCase().includes(normalized) ||
        b.shortDescription.toLowerCase().includes(normalized) ||
        b.tags.some(t => t.toLowerCase().includes(normalized)))
  );

  const totalResults =
    (filterType === 'all' || filterType === 'articles' ? matchingArticles.length : 0) +
    (filterType === 'all' || filterType === 'videos' ? matchingVideos.length : 0) +
    (filterType === 'all' || filterType === 'books' ? matchingBooks.length : 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-white border border-neutral-200 shadow-2xl rounded-lg overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-200">
          <Search className="w-5 h-5 text-neutral-400 mr-3 flex-shrink-0" />
          <h2 id="search-modal-title" className="sr-only">Search Soch Wale</h2>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search articles, video lectures, books, topics..."
            className="w-full bg-transparent text-neutral-900 placeholder-neutral-400 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[11px] font-mono text-neutral-400 bg-neutral-100 border border-neutral-200 rounded">
            ESC
          </kbd>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-neutral-50 border-b border-neutral-200 text-xs">
          <span className="text-neutral-400 mr-2">Filter:</span>
          {(['all', 'articles', 'videos', 'books'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded transition-colors capitalize ${
                filterType === type
                  ? 'bg-neutral-900 text-white font-medium'
                  : 'text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {type}
            </button>
          ))}
          <span className="ml-auto text-neutral-400 font-mono text-[11px]">
            {totalResults} {totalResults === 1 ? 'match' : 'matches'}
          </span>
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto p-4 space-y-4 divide-y divide-neutral-100">
          {totalResults === 0 ? (
            <div className="text-center py-12 text-neutral-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-neutral-400 mt-1">Try searching for &quot;critical thinking&quot;, &quot;philosophy&quot;, or &quot;science&quot;</p>
            </div>
          ) : (
            <>
              {/* Articles */}
              {(filterType === 'all' || filterType === 'articles') && matchingArticles.length > 0 && (
                <div className="pt-2 first:pt-0">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Articles ({matchingArticles.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchingArticles.map(art => (
                      <button
                        key={art.id}
                        onClick={() => {
                          setCurrentView('article-detail', art.slug);
                          setIsSearchOpen(false);
                        }}
                        className="w-full text-left p-2.5 rounded hover:bg-neutral-50 flex items-start justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-semibold text-neutral-900 group-hover:text-black">
                            {art.title}
                          </div>
                          <div className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
                            {art.category} · {art.readTimeMinutes} min read · By {art.author}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all mt-1 flex-shrink-0 ml-3" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Videos */}
              {(filterType === 'all' || filterType === 'videos') && matchingVideos.length > 0 && (
                <div className="pt-3">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 mb-2 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5" /> Videos ({matchingVideos.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchingVideos.map(vid => (
                      <button
                        key={vid.id}
                        onClick={() => {
                          setCurrentView('video-detail', vid.slug);
                          setIsSearchOpen(false);
                        }}
                        className="w-full text-left p-2.5 rounded hover:bg-neutral-50 flex items-start justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-semibold text-neutral-900 group-hover:text-black">
                            {vid.title}
                          </div>
                          <div className="text-xs text-neutral-500 mt-0.5">
                            {vid.category} · {vid.duration || 'Lecture'}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all mt-1 flex-shrink-0 ml-3" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Books */}
              {(filterType === 'all' || filterType === 'books') && matchingBooks.length > 0 && (
                <div className="pt-3">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Books & PDFs ({matchingBooks.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchingBooks.map(bk => (
                      <button
                        key={bk.id}
                        onClick={() => {
                          setCurrentView('book-detail', bk.slug);
                          setIsSearchOpen(false);
                        }}
                        className="w-full text-left p-2.5 rounded hover:bg-neutral-50 flex items-start justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-semibold text-neutral-900 group-hover:text-black">
                            {bk.title}
                          </div>
                          <div className="text-xs text-neutral-500 mt-0.5">
                            {bk.category} · {bk.isPaid ? `PKR ${bk.salePricePkr || bk.pricePkr}` : 'Free PDF'} · {bk.pagesCount} pages
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all mt-1 flex-shrink-0 ml-3" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
