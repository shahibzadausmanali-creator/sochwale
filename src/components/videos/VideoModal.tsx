import React from 'react';
import { X, Youtube, Share2, ExternalLink } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const VideoModal: React.FC = () => {
  const { activeVideoEmbed, setActiveVideoEmbed, setCurrentView } = useCMS();

  if (!activeVideoEmbed) return null;

  // Extract YouTube ID from various YouTube URL formats (watch?v=, youtu.be/, embed/)
  const getEmbedUrl = (url: string) => {
    let videoId = '';
    if (url.includes('v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0];
    }
    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0` : url;
  };

  const embedUrl = getEmbedUrl(activeVideoEmbed.youtubeUrl);

  const handleCopyShare = () => {
    navigator.clipboard.writeText(activeVideoEmbed.youtubeUrl);
    alert('Video link copied to clipboard!');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={() => setActiveVideoEmbed(null)}
    >
      <div
        className="w-full max-w-4xl bg-neutral-950 border border-neutral-800 shadow-2xl rounded-lg overflow-hidden flex flex-col text-white"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-800 bg-neutral-900">
          <div className="flex items-center gap-2">
            <Youtube className="w-5 h-5 text-red-500" />
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Soch Wale Video Lecture
            </span>
          </div>
          <button
            onClick={() => setActiveVideoEmbed(null)}
            className="p-1 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={embedUrl}
            title={activeVideoEmbed.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Video Information & Actions */}
        <div className="p-6 bg-neutral-950">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="text-xs text-neutral-400 mb-1">
                {activeVideoEmbed.category} · Duration: {activeVideoEmbed.duration || 'Lecture'}
              </div>
              <h2 id="video-modal-title" className="text-xl font-serif font-bold text-white">
                {activeVideoEmbed.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleCopyShare}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-medium rounded text-neutral-200 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
              <a
                href={activeVideoEmbed.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-medium rounded text-neutral-200 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open in YouTube
              </a>
            </div>
          </div>

          <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl">
            {activeVideoEmbed.description}
          </p>

          <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
            <div>Presented by Usman Ali — Soch Wale Knowledge Series</div>
            <button
              onClick={() => {
                const slug = activeVideoEmbed.slug;
                setActiveVideoEmbed(null);
                setCurrentView('video-detail', slug);
              }}
              className="text-white hover:underline font-semibold"
            >
              View Full Video Page & Notes →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
