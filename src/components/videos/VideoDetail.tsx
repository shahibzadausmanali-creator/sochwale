import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Youtube,
  Play,
  ExternalLink,
  Clock,
  Tag
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface VideoDetailProps {
  slug: string;
}

export const VideoDetail: React.FC<VideoDetailProps> = ({ slug }) => {
  const { getVideoBySlug, setCurrentView, videos } = useCMS();
  const video = getVideoBySlug(slug) || videos[0];
  const [copied, setCopied] = useState(false);

  if (!video) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif font-bold">Video Not Found</h2>
        <button
          onClick={() => setCurrentView('videos')}
          className="mt-4 px-4 py-2 bg-neutral-900 text-white rounded text-xs"
        >
          Back to Videos
        </button>
      </div>
    );
  }

  const getEmbedUrl = (url: string) => {
    let videoId = '';
    if (url.includes('v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0];
    }
    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0` : url;
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedVideos = videos.filter(v => v.id !== video.id).slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-200 text-xs">
        <button
          onClick={() => setCurrentView('videos')}
          className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-black font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Videos
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-neutral-600 hover:text-black transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied Link!' : 'Share Video'}</span>
          </button>

          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-neutral-900 font-semibold hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open on YouTube</span>
          </a>
        </div>
      </div>

      {/* Video Embed Player */}
      <div className="relative aspect-video w-full bg-black rounded-sm overflow-hidden shadow-2xl mb-8">
        <iframe
          src={getEmbedUrl(video.youtubeUrl)}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>

      {/* Title & Metadata */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium mb-2">
          <span className="text-neutral-900 font-semibold">{video.category}</span>
          <span>·</span>
          <span>Duration: {video.duration || 'Lecture'}</span>
          <span>·</span>
          <span>Published {video.publishedAt}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-neutral-950 mb-4">
          {video.title}
        </h1>

        <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-sm">
          <h3 className="text-xs uppercase font-mono tracking-wider text-neutral-400 mb-2">
            Lecture Synopsis & Key Themes
          </h3>
          <p className="text-sm text-neutral-800 leading-relaxed">
            {video.description}
          </p>

          <div className="mt-4 pt-4 border-t border-neutral-200 flex flex-wrap gap-2">
            {video.tags.map((t, idx) => (
              <span key={idx} className="text-xs bg-white border border-neutral-200 px-2.5 py-1 rounded text-neutral-700">
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related Videos */}
      {relatedVideos.length > 0 && (
        <div className="mt-14 pt-10 border-t border-neutral-200">
          <h3 className="text-xl font-serif font-bold text-neutral-950 mb-6">
            Recommended Lectures
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedVideos.map(rel => (
              <div
                key={rel.id}
                onClick={() => setCurrentView('video-detail', rel.slug)}
                className="cursor-pointer group"
              >
                <div className="relative aspect-video rounded overflow-hidden mb-2.5 bg-neutral-900">
                  <img
                    src={rel.thumbnail}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-4 h-4 fill-black ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="text-[11px] text-neutral-500">{rel.category}</div>
                <h4 className="text-sm font-serif font-bold text-neutral-900 group-hover:text-black line-clamp-2 mt-0.5">
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
