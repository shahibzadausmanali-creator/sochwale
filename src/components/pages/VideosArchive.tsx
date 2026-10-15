import React, { useState } from 'react';
import { Search, Video as VideoIcon } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { VideoCard } from '../cards/VideoCard';

export const VideosArchive: React.FC = () => {
  const { videos } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const published = videos.filter(v => v.status === 'published');
  const categories = ['All', ...Array.from(new Set(published.map(v => v.category)))];

  const filtered = published.filter(v => {
    const matchesCategory = selectedCategory === 'All' || v.category === selectedCategory;
    const matchesQuery =
      !searchQuery.trim() ||
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold">
          Soch Wale Visual Knowledge
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-950 mt-2">
          Video Lectures & Documentaries
        </h1>
        <p className="text-base text-neutral-600 mt-3 leading-relaxed">
          Comprehensive video lectures, philosophical debates, and scientific discussions presented by Usman Ali.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-neutral-200">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-neutral-950 text-white font-semibold'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search video lectures..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-neutral-300 rounded focus:outline-none focus:border-neutral-900"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-neutral-400">
          <VideoIcon className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm">No videos found matching &ldquo;{searchQuery}&rdquo;</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};
