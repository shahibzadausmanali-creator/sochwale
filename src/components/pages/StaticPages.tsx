import React, { useState } from 'react';
import {
  Mail,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Send,
  ExternalLink,
  Instagram,
  Facebook,
  Youtube
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const AboutPage: React.FC = () => {
  const { setCurrentView } = useCMS();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="space-y-4 mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
          About Soch Wale
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-950 leading-tight">
          Cultivating Reason, Science & Philosophical Autonomy
        </h1>
        <p className="text-lg text-neutral-600 font-serif leading-relaxed italic">
          &ldquo;When a society ceases to question its premises, it fossilizes into dogma. Soch Wale exists to kindle the flame of independent inquiry.&rdquo;
        </p>
      </div>

      <div className="prose prose-neutral max-w-none text-neutral-800 space-y-6 font-serif text-base sm:text-lg leading-relaxed">
        <h2>Our Founding Mission</h2>
        <p>
          <strong>Soch Wale</strong> is an independent digital publishing house, multimedia platform, and educational research collective. Founded by <strong>Usman Ali</strong>, our work addresses the urgent deficit in critical reasoning, scientific literacy, and rigorous philosophical literature in contemporary Urdu and regional discourse.
        </p>

        <h2>Core Intellectual Pillars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8 not-prose font-sans">
          <div className="p-5 border border-neutral-200 rounded-sm bg-neutral-50">
            <h3 className="font-serif font-bold text-base text-neutral-900 mb-1">
              1. Scientific Epistemology
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Advocating the Popperian falsifiability standard, empirical methodology, and evidence-based decision making across public life.
            </p>
          </div>

          <div className="p-5 border border-neutral-200 rounded-sm bg-neutral-50">
            <h3 className="font-serif font-bold text-base text-neutral-900 mb-1">
              2. Socratic Dialectics
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Dismantling cognitive fallacies, confirmation bias, and emotional dogmatism through respectful, relentless intellectual dialogue.
            </p>
          </div>

          <div className="p-5 border border-neutral-200 rounded-sm bg-neutral-50">
            <h3 className="font-serif font-bold text-base text-neutral-900 mb-1">
              3. Eastern Philosophical Revival
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Revisiting classical masters like Ibn Rushd, Rumi, and Dr. Allama Iqbal to harmonize ancient metaphysical insight with modern cosmology.
            </p>
          </div>

          <div className="p-5 border border-neutral-200 rounded-sm bg-neutral-50">
            <h3 className="font-serif font-bold text-base text-neutral-900 mb-1">
              4. Open & Protected Publishing
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Distributing essential student guidebooks freely while offering licensed treatises supported by direct manual JazzCash readers.
            </p>
          </div>
        </div>

        <h2>About the Founder: Usman Ali</h2>
        <p>
          Usman Ali is an educator, author, and public speaker dedicated to rational thought. Through dozens of detailed video lectures and published books, he has reached hundreds of thousands of inquiring students across South Asia and the global diaspora.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-neutral-200 flex items-center justify-between">
        <button
          onClick={() => setCurrentView('articles')}
          className="px-5 py-2.5 bg-neutral-950 text-white rounded text-xs font-semibold hover:bg-black transition-colors"
        >
          Read Published Articles
        </button>
        <button
          onClick={() => setCurrentView('contact')}
          className="px-5 py-2.5 border border-neutral-300 text-neutral-900 rounded text-xs font-semibold hover:bg-neutral-50 transition-colors"
        >
          Contact Editorial Desk
        </button>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const { siteSettings } = useCMS();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappLink = `https://wa.me/${siteSettings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Assalam-o-Alaikum Soch Wale Desk, I would like to get in touch.'
  )}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-950 mt-2">
          Contact Soch Wale Editorial Desk
        </h1>
        <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
          For inquiries regarding book access, manual JazzCash verification, academic licensing, or speaking engagements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-white p-6 border border-neutral-200 rounded-sm">
          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-serif font-bold text-neutral-900">
                Message Received
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-xs mx-auto">
                Thank you for contacting Soch Wale. The editorial desk will respond to your email within 24 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-semibold text-neutral-900 underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded"
                  placeholder="e.g. Tariq Mehmood"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded"
                  placeholder="name@domain.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Message / Order Query
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 rounded"
                  placeholder="Include your order number if inquiring about payment verification..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-neutral-950 text-white rounded text-xs font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Official Channels & Details */}
        <div className="space-y-6">
          {/* WhatsApp Direct Banner */}
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-sm">
            <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2 mb-2">
              <MessageCircle className="w-4 h-4 text-emerald-700" /> WhatsApp Quick Desk
            </h3>
            <p className="text-xs text-emerald-800 leading-relaxed mb-4">
              Direct line for urgent JazzCash payment confirmation, transaction receipt submissions, and digital file access support.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded transition-colors"
            >
              <span>Chat on WhatsApp (+{siteSettings.whatsappNumber})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Payment Account Summary */}
          <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-sm space-y-2 text-xs">
            <h4 className="font-mono uppercase font-semibold text-neutral-500 tracking-wider mb-2">
              Payment Coordinates
            </h4>
            <div className="flex justify-between">
              <span className="text-neutral-500">Method:</span>
              <span className="font-semibold text-neutral-900">JazzCash</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Account Number:</span>
              <span className="font-mono font-bold text-neutral-900">{siteSettings.jazzCash.accountNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Account Title:</span>
              <span className="font-semibold text-neutral-900">{siteSettings.jazzCash.accountHolder}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LegalPage: React.FC<{ policyType: 'privacy' | 'terms' | 'digital-policy' }> = ({
  policyType
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {policyType === 'privacy' && (
        <div className="prose prose-neutral max-w-none text-neutral-800 font-serif leading-relaxed">
          <h1 className="text-3xl font-serif font-bold text-neutral-950 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xs text-neutral-500 font-mono">Effective Date: 2026-01-01 · Soch Wale</p>
          <p>
            Soch Wale is committed to protecting your privacy. We collect customer names, email addresses, and optional phone numbers exclusively to facilitate digital PDF orders and provide customer account access.
          </p>
          <h2>Information We Collect</h2>
          <p>
            When you purchase a book or register an account, we record your email address and transaction reference numbers. We do not store or process credit/debit card numbers. All monetary exchanges occur through manual JazzCash transfers.
          </p>
          <h2>Data Protection</h2>
          <p>
            Your email is never shared, sold, or rented to third-party advertisers. It is strictly utilized to authenticate your personal PDF download access.
          </p>
        </div>
      )}

      {policyType === 'terms' && (
        <div className="prose prose-neutral max-w-none text-neutral-800 font-serif leading-relaxed">
          <h1 className="text-3xl font-serif font-bold text-neutral-950 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-xs text-neutral-500 font-mono">Effective Date: 2026-01-01 · Soch Wale</p>
          <p>
            Welcome to Soch Wale. By accessing our articles, video lectures, and digital bookstore, you agree to comply with and be bound by the following terms.
          </p>
          <h2>Intellectual Property</h2>
          <p>
            All essays, treatises, video lectures, and PDF books published on Soch Wale are the intellectual property of Usman Ali and Soch Wale. Unauthorized reproduction, pirated redistribution, or resale is strictly prohibited.
          </p>
          <h2>Educational Integrity</h2>
          <p>
            Content is provided for educational and philosophical enrichment. We promote rational discourse and scientific thinking in accordance with academic standards.
          </p>
        </div>
      )}

      {policyType === 'digital-policy' && (
        <div className="prose prose-neutral max-w-none text-neutral-800 font-serif leading-relaxed">
          <h1 className="text-3xl font-serif font-bold text-neutral-950 mb-4">
            Digital Purchase & PDF Access Policy
          </h1>
          <p className="text-xs text-neutral-500 font-mono">Effective Date: 2026-01-01 · Soch Wale</p>
          <p>
            This policy outlines how digital books and PDF downloads are delivered and verified on the Soch Wale platform.
          </p>
          <h2>Manual JazzCash Verification</h2>
          <p>
            Orders for paid PDF publications must be paid via JazzCash to <strong>03032226181</strong> (Usman Ali). Access is granted after manual verification by the administrator. Clicking &apos;Payment Done&apos; submits your transaction reference for review but does not automatically unlock files without verification.
          </p>
          <h2>Personal Watermark & Licensing</h2>
          <p>
            Each paid PDF book is cryptographically stamped with the registered reader&apos;s name and unique order number. Readers receive permanent access in their Customer Account.
          </p>
        </div>
      )}
    </div>
  );
};
