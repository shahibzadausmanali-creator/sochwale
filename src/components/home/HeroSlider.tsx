import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const HeroSlider: React.FC = () => {
  const { slides, setCurrentView } = useCMS();
  const activeSlides = slides.filter(s => s.isActive).sort((a, b) => a.order - b.order);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (activeSlides.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % activeSlides.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [activeSlides.length, isPaused]);

  if (activeSlides.length === 0) return null;

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  const handleCtaClick = (url: string) => {
    if (url.startsWith('#')) {
      const targetId = url.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (url === 'articles' || url === 'videos' || url === 'books' || url === 'about') {
      setCurrentView(url);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section
      aria-label="Hero Highlights"
      className="relative bg-neutral-950 text-white overflow-hidden min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Layer with Gradient Overlay */}
      {activeSlides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={slide.heading}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-7000 ease-out"
          />
          {/* Deep dark editorial gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-400 mb-4 bg-white/10 px-3 py-1 rounded backdrop-blur-sm border border-white/10">
            <span>Official Soch Wale Editorial</span>
            <span>·</span>
            <span>0{currentIndex + 1} / 0{activeSlides.length}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white leading-tight mb-6">
            {currentSlide.heading}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed mb-8 max-w-xl">
            {currentSlide.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => handleCtaClick(currentSlide.ctaUrl)}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-neutral-950 font-semibold text-sm hover:bg-neutral-100 transition-all rounded"
            >
              <span>{currentSlide.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {currentSlide.secondaryCtaText && currentSlide.secondaryCtaUrl && (
              <button
                onClick={() => handleCtaClick(currentSlide.secondaryCtaUrl!)}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-white/40 text-white font-medium text-sm hover:bg-white/10 hover:border-white transition-all rounded backdrop-blur-xs"
              >
                <span>{currentSlide.secondaryCtaText}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      {activeSlides.length > 1 && (
        <>
          <div className="absolute bottom-8 right-6 sm:right-12 z-30 flex items-center gap-2">
            <button
              onClick={() =>
                setCurrentIndex(prev => (prev === 0 ? activeSlides.length - 1 : prev - 1))
              }
              aria-label="Previous Slide"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors border border-white/20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentIndex(prev => (prev + 1) % activeSlides.length)}
              aria-label="Next Slide"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors border border-white/20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-8 left-4 sm:left-8 z-30 flex items-center gap-2">
            {activeSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 transition-all rounded-full ${
                  i === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
