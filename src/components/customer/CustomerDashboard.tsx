import React, { useState } from 'react';
import {
  Download,
  BookOpen,
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Shield,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const CustomerDashboard: React.FC = () => {
  const {
    activeCustomerEmail,
    setActiveCustomerEmail,
    customers,
    orders,
    books,
    downloadBook,
    checkBookAccess,
    setCurrentView,
    siteSettings
  } = useCMS();

  const [emailInput, setEmailInput] = useState('');
  const [downloadMsg, setDownloadMsg] = useState<{ id: string; text: string } | null>(null);

  const customer = customers.find(c => c.email.toLowerCase() === activeCustomerEmail?.toLowerCase());
  const customerOrders = orders.filter(
    o => o.customerEmail.toLowerCase() === activeCustomerEmail?.toLowerCase()
  );

  const assignedBookIds = customer?.assignedBookIds || [];
  const assignedBooks = books.filter(b => assignedBookIds.includes(b.id));

  const handleDownload = (bookId: string) => {
    const res = downloadBook(bookId, activeCustomerEmail || undefined);
    setDownloadMsg({ id: bookId, text: res.message });
    setTimeout(() => setDownloadMsg(null), 3500);
  };

  const handleSwitchAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setActiveCustomerEmail(emailInput.trim().toLowerCase());
      setEmailInput('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Banner */}
      <div className="bg-neutral-950 text-white p-8 rounded-sm mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
            <User className="w-3.5 h-3.5" /> Customer Account & Digital Library
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Welcome, {customer?.name || activeCustomerEmail?.split('@')[0] || 'Reader'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Account: {activeCustomerEmail || 'Not signed in'} · Joined {customer?.registeredAt || '2026'}
          </p>
        </div>

        {/* Switch Account Quick Form */}
        <div className="bg-neutral-900 border border-neutral-800 p-3.5 rounded text-xs w-full md:w-auto">
          <form onSubmit={handleSwitchAccount} className="flex items-center gap-2">
            <input
              type="email"
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              placeholder="Switch customer email..."
              className="px-2.5 py-1.5 bg-neutral-800 text-white rounded text-xs focus:outline-none border border-neutral-700 w-48"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-white text-neutral-900 font-semibold rounded hover:bg-neutral-200 transition-colors"
            >
              Switch
            </button>
          </form>
          <span className="text-[10px] text-neutral-400 mt-1 block">
            Tip: Enter &quot;ahmad.raza@example.com&quot; for verified purchaser account.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: My Assigned & Licensed Books */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-6">
              <h2 className="text-xl font-serif font-bold text-neutral-950 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-neutral-800" /> My Licensed Digital Books ({assignedBooks.length})
              </h2>
              <button
                onClick={() => setCurrentView('books')}
                className="text-xs font-semibold text-neutral-900 hover:underline"
              >
                Browse All Books →
              </button>
            </div>

            {assignedBooks.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-neutral-300 rounded bg-neutral-50 text-neutral-500">
                <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40 text-neutral-600" />
                <p className="text-sm font-medium">No verified paid books unlocked yet.</p>
                <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                  Once your JazzCash payment is verified by the administrator, your licensed PDF books with personal watermarking will appear here.
                </p>
                <button
                  onClick={() => setCurrentView('books')}
                  className="mt-4 px-4 py-2 bg-neutral-900 text-white text-xs font-semibold rounded hover:bg-black transition-colors"
                >
                  Explore Books
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {assignedBooks.map(bk => (
                  <div
                    key={bk.id}
                    className="p-5 border border-neutral-200 rounded-sm bg-white hover:border-neutral-900 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={bk.coverImage}
                        alt={bk.title}
                        className="w-16 h-22 object-cover shadow border border-neutral-200 rounded-xs flex-shrink-0"
                      />
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                          License Verified
                        </span>
                        <h3 className="text-base font-serif font-bold text-neutral-900 mt-1">
                          {bk.title}
                        </h3>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          By {bk.author} · {bk.pagesCount} Pages · Format: Watermarked PDF
                        </p>
                        {downloadMsg?.id === bk.id && (
                          <div className="text-xs text-emerald-600 font-medium mt-1">
                            {downloadMsg.text}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownload(bk.id)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-5 bg-neutral-900 text-white text-xs font-semibold hover:bg-black transition-colors rounded-xs shadow"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order History */}
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-6">
              <h2 className="text-xl font-serif font-bold text-neutral-950 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-neutral-800" /> Order History ({customerOrders.length})
              </h2>
            </div>

            {customerOrders.length === 0 ? (
              <p className="text-sm text-neutral-500">No order history found for {activeCustomerEmail}.</p>
            ) : (
              <div className="border border-neutral-200 rounded-sm overflow-hidden bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-100 text-neutral-600 uppercase font-mono tracking-wider border-b border-neutral-200">
                    <tr>
                      <th className="p-3.5">Order</th>
                      <th className="p-3.5">Book</th>
                      <th className="p-3.5">Amount</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {customerOrders.map(ord => (
                      <tr key={ord.id} className="hover:bg-neutral-50">
                        <td className="p-3.5 font-mono font-bold text-neutral-900">
                          {ord.orderNumber}
                        </td>
                        <td className="p-3.5 font-medium text-neutral-900 max-w-xs truncate">
                          {ord.bookTitle}
                        </td>
                        <td className="p-3.5 font-mono text-neutral-700">
                          PKR {ord.amountPkr}
                        </td>
                        <td className="p-3.5 text-neutral-500">
                          {ord.createdAt.slice(0, 10)}
                        </td>
                        <td className="p-3.5">
                          {ord.status === 'approved' ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold capitalize">
                              <CheckCircle2 className="w-3 h-3" /> Approved
                            </span>
                          ) : ord.status === 'under_review' ? (
                            <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-semibold capitalize">
                              <Clock className="w-3 h-3" /> Under Review
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded font-semibold capitalize">
                              <Clock className="w-3 h-3" /> Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Account Info & Verification Support */}
        <div className="space-y-6">
          <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4" /> Security & Access Verification
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed mb-4">
              Paid educational PDF files are protected by digital rights management. Each file generated by Soch Wale is cryptographically watermarked with the purchaser&apos;s name and order number.
            </p>
            <div className="space-y-2 text-xs text-neutral-700 border-t border-neutral-200 pt-3">
              <div className="flex justify-between">
                <span className="text-neutral-500">Manual Gateway:</span>
                <span className="font-semibold">JazzCash</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Receiver Mobile:</span>
                <span className="font-mono">{siteSettings.jazzCash.accountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Account Title:</span>
                <span>{siteSettings.jazzCash.accountHolder}</span>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp Verification Help */}
          <div className="p-6 bg-white border border-neutral-200 rounded-sm">
            <h3 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-600" /> Need Payment Verification?
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed mb-4">
              If your payment has not been confirmed within 30 minutes, message our official WhatsApp support with your order number.
            </p>
            <a
              href={`https://wa.me/${siteSettings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                `Hello Soch Wale, I am checking the status of my order for email: ${activeCustomerEmail}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Contact Administrator on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
