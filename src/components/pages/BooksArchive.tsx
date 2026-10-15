import React, { useState } from 'react';
import { Search, BookOpen, Download, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { BookCard } from '../cards/BookCard';

export const BooksArchive: React.FC = () => {
  const { books, siteSettings } = useCMS();
  const [accessFilter, setAccessFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const published = books.filter(b => b.status === 'published');

  const filtered = published.filter(b => {
    const matchesAccess =
      accessFilter === 'all' ||
      (accessFilter === 'free' && !b.isPaid) ||
      (accessFilter === 'paid' && b.isPaid);
    const matchesQuery =
      !searchQuery.trim() ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesAccess && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
          Soch Wale Digital Bookstore & Library
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-950 mt-2">
          Digital Books & Downloadable PDFs
        </h1>
        <p className="text-base text-neutral-600 mt-3 leading-relaxed">
          Curated treatises, academic handbooks, and open educational manuals. Free resources download instantly; paid editions are verified via JazzCash with digital licensing stamps.
        </p>

        {/* JazzCash Info Banner */}
        <div className="mt-4 p-3 bg-neutral-50 border border-neutral-200 rounded text-xs text-neutral-600 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>
            Paid books support manual verification via JazzCash (<strong>{siteSettings.jazzCash.accountNumber}</strong> — {siteSettings.jazzCash.accountHolder}).
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-neutral-200">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setAccessFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors ${
              accessFilter === 'all'
                ? 'bg-neutral-950 text-white font-semibold'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-black'
            }`}
          >
            All Publications ({published.length})
          </button>
          <button
            onClick={() => setAccessFilter('free')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors ${
              accessFilter === 'free'
                ? 'bg-neutral-950 text-white font-semibold'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-black'
            }`}
          >
            Free Resources ({published.filter(b => !b.isPaid).length})
          </button>
          <button
            onClick={() => setAccessFilter('paid')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors ${
              accessFilter === 'paid'
                ? 'bg-neutral-950 text-white font-semibold'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-black'
            }`}
          >
            Paid Editions ({published.filter(b => b.isPaid).length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search books, topics..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-neutral-300 rounded focus:outline-none focus:border-neutral-900"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-neutral-400">
          <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm">No books found matching &ldquo;{searchQuery}&rdquo;</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};
