import React, { useState } from 'react';
import {
  ArrowLeft,
  Download,
  ShoppingBag,
  Check,
  ShieldCheck,
  Share2,
  BookOpen,
  FileText,
  Lock
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface BookDetailProps {
  slug: string;
}

export const BookDetail: React.FC<BookDetailProps> = ({ slug }) => {
  const {
    getBookBySlug,
    setCurrentView,
    setCheckoutBook,
    downloadBook,
    checkBookAccess,
    activeCustomerEmail,
    books
  } = useCMS();

  const book = getBookBySlug(slug) || books[0];
  const [selectedImage, setSelectedImage] = useState<string>(book?.coverImage || '');
  const [downloading, setDownloading] = useState(false);
  const [downloadMsg, setDownloadMsg] = useState('');
  const [copied, setCopied] = useState(false);

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif font-bold">Book Not Found</h2>
        <button
          onClick={() => setCurrentView('books')}
          className="mt-4 px-4 py-2 bg-neutral-900 text-white rounded text-xs"
        >
          Back to Books
        </button>
      </div>
    );
  }

  const hasAccess = book.isPaid && checkBookAccess(activeCustomerEmail, book.id);
  const allImages = [book.coverImage, ...(book.previewImages || [])];

  const handleDownload = () => {
    setDownloading(true);
    const res = downloadBook(book.id);
    setTimeout(() => {
      setDownloading(false);
      setDownloadMsg(res.message);
      setTimeout(() => setDownloadMsg(''), 4000);
    }, 600);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-200 text-xs">
        <button
          onClick={() => setCurrentView('books')}
          className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-black font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Books & PDFs
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1 text-neutral-600 hover:text-black transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copied ? 'Copied Link!' : 'Share Book'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Left: Gallery & Cover Image */}
        <div className="md:col-span-5 space-y-4">
          <div className="aspect-[3/4] bg-neutral-100 rounded-sm border border-neutral-200 p-6 flex items-center justify-center overflow-hidden shadow-lg">
            <img
              src={selectedImage || book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover rounded-xs"
            />
          </div>

          {/* Thumbnail Strip */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-20 flex-shrink-0 border-2 rounded overflow-hidden transition-all ${
                    (selectedImage || book.coverImage) === img
                      ? 'border-neutral-900 shadow-md'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Book Details & Purchase/Download */}
        <div className="md:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2">
              <span className="text-neutral-900">{book.category}</span>
              <span>·</span>
              <span>{book.pagesCount} Pages</span>
              <span>·</span>
              <span>{book.isPaid ? 'Licensed Digital Edition' : 'Public Digital Edition'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-neutral-950 leading-tight mb-3">
              {book.title}
            </h1>

            <p className="text-sm text-neutral-600 font-medium">
              By {book.author} · Published {book.publishedAt}
            </p>
          </div>

          {/* Pricing & CTA Card */}
          <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-sm space-y-4">
            <div className="flex items-baseline gap-3">
              {!book.isPaid ? (
                <span className="text-2xl font-serif font-bold text-neutral-950">
                  Free Resource
                </span>
              ) : (
                <>
                  <span className="text-3xl font-mono font-bold text-neutral-950">
                    PKR {book.salePricePkr || book.pricePkr}
                  </span>
                  {book.salePricePkr && book.salePricePkr < book.pricePkr && (
                    <span className="text-sm font-mono text-neutral-400 line-through">
                      PKR {book.pricePkr}
                    </span>
                  )}
                </>
              )}
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              {!book.isPaid
                ? 'This publication is freely distributed by Soch Wale to advance public education and rational inquiry. Download immediately in high-definition PDF.'
                : 'Includes high-definition PDF publication, personal reader license stamp, and permanent access through your Soch Wale Customer Account.'}
            </p>

            {downloadMsg && (
              <div className="p-3 bg-neutral-900 text-white text-xs rounded flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{downloadMsg}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div>
              {!book.isPaid ? (
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full py-3.5 px-6 bg-neutral-950 text-white text-sm font-semibold hover:bg-black transition-colors rounded-xs flex items-center justify-center gap-2 shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloading ? 'Preparing Document...' : 'Download Free PDF Book'}</span>
                </button>
              ) : hasAccess ? (
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full py-3.5 px-6 bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 transition-colors rounded-xs flex items-center justify-center gap-2 shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloading ? 'Generating Licensed File...' : 'Download Your Licensed PDF'}</span>
                </button>
              ) : (
                <button
                  onClick={() => setCheckoutBook(book)}
                  className="w-full py-3.5 px-6 bg-neutral-950 text-white text-sm font-semibold hover:bg-black transition-colors rounded-xs flex items-center justify-center gap-2 shadow"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy Now with JazzCash — PKR {book.salePricePkr || book.pricePkr}</span>
                </button>
              )}
            </div>

            {book.isPaid && (
              <div className="pt-2 flex items-center justify-between text-[11px] text-neutral-500 border-t border-neutral-200">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" /> Manual JazzCash Verification
                </span>
                <span>Instant WhatsApp support</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-4 pt-2">
            <h3 className="text-base font-serif font-bold text-neutral-950">
              About This Volume
            </h3>
            <p className="text-sm text-neutral-700 leading-relaxed font-serif text-justify">
              {book.fullDescription}
            </p>
          </div>

          {/* Book Metadata Table */}
          <div className="border border-neutral-200 rounded-sm overflow-hidden text-xs">
            <div className="grid grid-cols-2 divide-x divide-neutral-200 border-b border-neutral-200 p-3 bg-neutral-50">
              <span className="text-neutral-500">Author:</span>
              <span className="font-semibold text-neutral-900">{book.author}</span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-neutral-200 border-b border-neutral-200 p-3">
              <span className="text-neutral-500">Page Count:</span>
              <span className="font-semibold text-neutral-900">{book.pagesCount} Pages</span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-neutral-200 border-b border-neutral-200 p-3 bg-neutral-50">
              <span className="text-neutral-500">File Type:</span>
              <span className="font-semibold text-neutral-900">PDF Document</span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-neutral-200 p-3">
              <span className="text-neutral-500">Total Downloads:</span>
              <span className="font-semibold text-neutral-900">{book.downloadCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
