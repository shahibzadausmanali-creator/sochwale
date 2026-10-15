import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { Article } from '../../types';
import { useCMS } from '../../context/CMSContext';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { setCurrentView } = useCMS();

  return (
    <article className="group flex flex-col bg-white border border-neutral-200 hover:border-neutral-900 transition-all duration-200 overflow-hidden rounded-xs">
      {/* Featured Image */}
      <div
        className="relative aspect-[16/10] overflow-hidden bg-neutral-100 cursor-pointer"
        onClick={() => setCurrentView('article-detail', article.slug)}
      >
        <img
          src={article.featuredImage}
          alt={article.imageAlt || article.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {article.featured && (
          <div className="absolute top-3 left-3 bg-neutral-950 text-white text-[10px] font-mono uppercase tracking-widest px-2 py-0.5">
            Featured
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Clean Unboxed Metadata with Typographic Separator (Zero-pill discipline) */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium mb-2.5">
            <span className="text-neutral-900 font-semibold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTimeMinutes} min read</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedAt}</span>
          </div>

          <h3
            onClick={() => setCurrentView('article-detail', article.slug)}
            className="text-base font-serif font-bold text-neutral-950 group-hover:text-black leading-snug line-clamp-2 cursor-pointer mb-2"
          >
            {article.title}
          </h3>

          <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">
            {article.excerpt}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-[11px] text-neutral-500">By {article.author}</span>
          <button
            onClick={() => setCurrentView('article-detail', article.slug)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 group-hover:text-black group-hover:translate-x-1 transition-all"
          >
            <span>Read More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
