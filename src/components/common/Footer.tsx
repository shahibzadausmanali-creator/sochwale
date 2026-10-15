import React from 'react';
import {
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  Mail,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const { siteSettings, setCurrentView } = useCMS();

  return (
    <footer className="bg-[#111111] text-white border-t border-neutral-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-neutral-800">
          {/* Brand & Manifesto Column */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" inverted={true} />
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              {siteSettings.tagline || 'Illuminating minds through reason, science, and philosophical inquiry. Dedicated to free thought, digital publishing, and educational clarity.'}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                Official Channels:
              </span>
              <div className="flex items-center gap-2">
                {/* Instagram */}
                <a
                  href={siteSettings.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Soch Wale on Instagram"
                  className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                {/* Facebook */}
                <a
                  href={siteSettings.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Soch Wale on Facebook"
                  className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                {/* YouTube */}
                <a
                  href={siteSettings.socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Soch Wale on YouTube"
                  className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>

                {/* TikTok */}
                <a
                  href={siteSettings.socialMedia.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Soch Wale on TikTok"
                  className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors text-xs font-bold"
                >
                  TT
                </a>
              </div>
            </div>
          </div>

          {/* Editorial Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              Editorial
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <button
                  onClick={() => setCurrentView('articles')}
                  className="hover:text-white transition-colors"
                >
                  Articles & Essays
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('videos')}
                  className="hover:text-white transition-colors"
                >
                  Video Lectures
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('books')}
                  className="hover:text-white transition-colors"
                >
                  Digital Books & PDFs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-white transition-colors"
                >
                  About Usman Ali
                </button>
              </li>
            </ul>
          </div>

          {/* Reader Services & Verification */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              Reader Services
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <button
                  onClick={() => setCurrentView('customer-portal')}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Customer Account <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('digital-policy')}
                  className="hover:text-white transition-colors"
                >
                  PDF Access Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('contact')}
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Support
                </button>
              </li>
              <li>
                <div className="pt-2 text-xs text-neutral-400 flex items-start gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Manual JazzCash verification & licensed PDF delivery</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Compliance & Administration */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              Platform & Legal
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <button
                  onClick={() => setCurrentView('privacy')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('terms')}
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('admin')}
                  className="hover:text-white transition-colors font-medium text-neutral-200"
                >
                  WordPress CMS Admin
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} Soch Wale. All rights reserved. Intellectual Property of Usman Ali.</p>
          <div className="flex items-center gap-6">
            <span>Powered by Soch Wale Core WordPress CMS</span>
            <span>Independent Educational Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
