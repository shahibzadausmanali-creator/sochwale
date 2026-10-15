import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Clock,
  Calendar,
  User,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Bookmark,
  BookOpen
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface ArticleDetailProps {
  slug: string;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ slug }) => {
  const { getArticleBySlug, setCurrentView, articles, evaluateArticleSEO } = useCMS();
  const article = getArticleBySlug(slug) || articles[0];

  const [seoDrawerOpen, setSeoDrawerOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif font-bold">Article Not Found</h2>
        <button
          onClick={() => setCurrentView('articles')}
          className="mt-4 px-4 py-2 bg-neutral-900 text-white rounded text-xs"
        >
          Back to Articles
        </button>
      </div>
    );
  }

  const seoReport = evaluateArticleSEO(article);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedArticles = articles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumbs & Navigation */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-200 text-xs">
        <button
          onClick={() => setCurrentView('articles')}
          className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-black font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Articles
        </button>

        <div className="flex items-center gap-3">
          {/* SEO Score Badge & Toggle */}
          <button
            onClick={() => setSeoDrawerOpen(!seoDrawerOpen)}
            className="flex items-center gap-1.5 px-3 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded font-mono font-semibold transition-colors"
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                seoReport.overallScore >= 80
                  ? 'bg-emerald-500'
                  : seoReport.overallScore >= 60
                  ? 'bg-amber-500'
                  : 'bg-red-500'
              }`}
            />
            <span>SEO Score: {seoReport.overallScore}/100</span>
            {seoDrawerOpen ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-neutral-600 hover:text-black transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied Link!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Expandable Live On-Page SEO Audit Drawer */}
      {seoDrawerOpen && (
        <div className="mb-10 p-5 bg-neutral-50 border border-neutral-300 rounded-sm">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <div>
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-neutral-900">
                Live On-Page SEO Analysis ({seoReport.overallScore}/100)
              </h3>
              <p className="text-xs text-neutral-500">
                Focus Keyword: &ldquo;<span className="font-semibold text-neutral-900">{article.seo.focusKeyword || 'None'}</span>&rdquo; · Estimated on-page search evaluation
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-emerald-700">✓ {seoReport.passedCount} Passed</span>
              <span className="text-amber-700">⚠ {seoReport.warningCount} Warnings</span>
              <span className="text-red-700">✕ {seoReport.errorCount} Errors</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-xs">
            {seoReport.checks.map(chk => (
              <div
                key={chk.id}
                className={`p-3 rounded border flex items-start gap-2.5 ${
                  chk.passed
                    ? 'bg-white border-neutral-200'
                    : chk.type === 'warning'
                    ? 'bg-amber-50/60 border-amber-200'
                    : 'bg-red-50/60 border-red-200'
                }`}
              >
                {chk.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : chk.type === 'warning' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-semibold text-neutral-900">{chk.title}</div>
                  <div className="text-neutral-600 mt-0.5 text-[11px] leading-relaxed">
                    {chk.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">
          <span className="text-neutral-900">{article.category}</span>
          <span>·</span>
          <span>{article.publishedAt}</span>
          <span>·</span>
          <span>{article.readTimeMinutes} min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-950 leading-tight mb-4">
          {article.title}
        </h1>

        <p className="text-lg text-neutral-600 font-serif leading-relaxed italic mb-6">
          &ldquo;{article.excerpt}&rdquo;
        </p>

        <div className="flex items-center gap-3 text-xs text-neutral-600 border-t border-b border-neutral-100 py-3">
          <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
            UA
          </div>
          <div>
            <div className="font-semibold text-neutral-950">{article.author}</div>
            <div className="text-neutral-500 text-[11px]">Editor-in-Chief, Soch Wale</div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="mb-10 rounded overflow-hidden border border-neutral-200">
        <img
          src={article.featuredImage}
          alt={article.imageAlt || article.title}
          className="w-full aspect-[16/9] object-cover"
        />
        {article.imageAlt && (
          <div className="p-2.5 bg-neutral-50 text-[11px] text-neutral-500 font-mono italic text-center">
            {article.imageAlt}
          </div>
        )}
      </div>

      {/* Article Body Content */}
      <div
        className="prose prose-neutral max-w-none text-neutral-800 leading-relaxed font-serif text-base sm:text-lg space-y-6 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:font-serif [&>h2]:text-neutral-950 [&>h2]:pt-4 [&>p]:leading-loose"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Additional Content Images Gallery */}
      {article.additionalImages && article.additionalImages.length > 0 && (
        <div className="my-10 pt-8 border-t border-neutral-200">
          <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-500 mb-4">
            Visual Documentation & Figures
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {article.additionalImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Figure ${i + 1}`}
                className="w-full h-56 object-cover rounded border border-neutral-200"
              />
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      <div className="pt-8 mt-12 border-t border-neutral-200 flex flex-wrap items-center gap-2">
        <span className="text-xs text-neutral-500 mr-2 font-mono">Tags:</span>
        {article.tags.map((tag, i) => (
          <span
            key={i}
            className="text-xs text-neutral-700 bg-neutral-100 px-3 py-1 rounded hover:bg-neutral-200 cursor-pointer transition-colors"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Author Bio Box */}
      <div className="mt-12 p-6 bg-neutral-50 border border-neutral-200 rounded flex flex-col sm:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-neutral-950 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
          SW
        </div>
        <div>
          <h3 className="text-base font-serif font-bold text-neutral-900">
            About {article.author}
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed mt-1">
            Usman Ali is the founder and chief contributor at Soch Wale, devoted to cultivating rational discourse, scientific methodology, and progressive Urdu philosophical literature for curious minds.
          </p>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="mt-16 pt-10 border-t border-neutral-200">
          <h3 className="text-xl font-serif font-bold text-neutral-950 mb-6">
            Related Dispatches
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedArticles.map(rel => (
              <div
                key={rel.id}
                onClick={() => setCurrentView('article-detail', rel.slug)}
                className="cursor-pointer group"
              >
                <img
                  src={rel.featuredImage}
                  alt={rel.title}
                  className="w-full aspect-[16/10] object-cover rounded border border-neutral-200 group-hover:border-neutral-900 transition-colors mb-2.5"
                />
                <div className="text-[11px] text-neutral-500 font-medium">
                  {rel.category} · {rel.readTimeMinutes}m
                </div>
                <h4 className="text-sm font-serif font-bold text-neutral-900 group-hover:text-black line-clamp-2 mt-1">
                  {rel.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
