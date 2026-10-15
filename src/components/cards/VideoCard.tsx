import React from 'react';
import { Play } from 'lucide-react';
import { VideoItem } from '../../types';
import { useCMS } from '../../context/CMSContext';

interface VideoCardProps {
  video: VideoItem;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const { setCurrentView, setActiveVideoEmbed } = useCMS();

  return (
    <div className="group flex flex-col bg-white border border-neutral-200 hover:border-neutral-900 transition-all duration-200 overflow-hidden rounded-xs">
      {/* Video Thumbnail with Play Button Overlay */}
      <div
        className="relative aspect-video overflow-hidden bg-neutral-900 cursor-pointer"
        onClick={() => setActiveVideoEmbed(video)}
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />

        {/* Play Icon Badge */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/90 text-neutral-950 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 group-hover:bg-white">
            <Play className="w-5 h-5 fill-neutral-950 ml-0.5" />
          </div>
        </div>

        {video.duration && (
          <div className="absolute bottom-2.5 right-2.5 bg-black/80 text-white font-mono text-[10px] px-2 py-0.5 rounded">
            {video.duration}
          </div>
        )}

        {video.featured && (
          <div className="absolute top-2.5 left-2.5 bg-neutral-950 text-white text-[10px] font-mono uppercase tracking-widest px-2 py-0.5">
            Featured
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium mb-2">
            <span className="text-neutral-900 font-semibold">{video.category}</span>
            <span aria-hidden="true">·</span>
            <span>YouTube Lecture</span>
          </div>

          <h3
            onClick={() => setCurrentView('video-detail', video.slug)}
            className="text-base font-serif font-bold text-neutral-950 group-hover:text-black leading-snug line-clamp-2 cursor-pointer mb-2"
          >
            {video.title}
          </h3>

          <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">
            {video.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
          <button
            onClick={() => setActiveVideoEmbed(video)}
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 bg-neutral-900 text-white text-xs font-semibold hover:bg-black transition-colors rounded-xs"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Watch Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
