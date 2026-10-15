import React, { useState } from 'react';
import { Download, ShoppingBag, Check, Lock, BookOpen } from 'lucide-react';
import { BookItem } from '../../types';
import { useCMS } from '../../context/CMSContext';

interface BookCardProps {
  book: BookItem;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const {
    setCurrentView,
    setCheckoutBook,
    downloadBook,
    checkBookAccess,
    activeCustomerEmail
  } = useCMS();

  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const hasPurchasedAccess = book.isPaid && checkBookAccess(activeCustomerEmail, book.id);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloading(true);
    const result = downloadBook(book.id);
    setTimeout(() => {
      setDownloading(false);
      if (result.success) {
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      } else {
        alert(result.message);
      }
    }, 600);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckoutBook(book);
  };

  return (
    <div className="group flex flex-col bg-white border border-neutral-200 hover:border-neutral-900 transition-all duration-200 overflow-hidden rounded-xs">
      {/* Book Cover Image */}
      <div
        className="relative aspect-[3/4] overflow-hidden bg-neutral-100 cursor-pointer flex items-center justify-center p-4"
        onClick={() => setCurrentView('book-detail', book.slug)}
      >
        <img
          src={book.coverImage}
          alt={book.title}
          loading="lazy"
          className="w-full h-full object-cover shadow-md transition-transform duration-500 group-hover:scale-105"
        />

        {/* Free / Price Status */}
        <div className="absolute top-3 right-3">
          {!book.isPaid ? (
            <span className="bg-neutral-950 text-white text-[10px] font-mono uppercase tracking-widest px-2.5 py-1">
              Free PDF
            </span>
          ) : hasPurchasedAccess ? (
            <span className="bg-emerald-600 text-white text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 flex items-center gap-1">
              <Check className="w-3 h-3" /> Purchased
            </span>
          ) : (
            <span className="bg-neutral-900 text-white text-xs font-mono font-bold px-2 py-1">
              PKR {book.salePricePkr || book.pricePkr}
            </span>
          )}
        </div>

        {book.featured && (
          <div className="absolute top-3 left-3 bg-white/95 text-neutral-950 text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border border-neutral-200">
            Featured
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium mb-1.5">
            <span className="text-neutral-900 font-semibold">{book.category}</span>
            <span aria-hidden="true">·</span>
            <span>{book.pagesCount} Pages</span>
          </div>

          <h3
            onClick={() => setCurrentView('book-detail', book.slug)}
            className="text-base font-serif font-bold text-neutral-950 group-hover:text-black leading-snug line-clamp-2 cursor-pointer mb-2"
          >
            {book.title}
          </h3>

          <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">
            {book.shortDescription}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
          {!book.isPaid ? (
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 bg-neutral-950 text-white text-xs font-semibold hover:bg-black transition-colors rounded-xs disabled:opacity-50"
            >
              {downloading ? (
                <span>Generating PDF...</span>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Now</span>
                </>
              )}
            </button>
          ) : hasPurchasedAccess ? (
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors rounded-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Licensed PDF</span>
            </button>
          ) : (
            <button
              onClick={handleBuyNow}
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 bg-neutral-900 text-white text-xs font-semibold hover:bg-black transition-colors rounded-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Buy Now — PKR {book.salePricePkr || book.pricePkr}</span>
            </button>
          )}

          <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
            <span>By {book.author}</span>
            <span>{book.downloadCount} downloads</span>
          </div>
        </div>
      </div>
    </div>
  );
};
