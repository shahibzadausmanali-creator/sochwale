import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true
}) => {
  const sizeMap = {
    sm: { dimension: 32, fontSize: 'text-base', brandSize: 'text-sm' },
    md: { dimension: 44, fontSize: 'text-xl', brandSize: 'text-lg' },
    lg: { dimension: 58, fontSize: 'text-2xl', brandSize: 'text-xl' },
    xl: { dimension: 84, fontSize: 'text-4xl', brandSize: 'text-3xl' }
  };

  const { dimension } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official "SW" Circular Monogram Badge */}
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:rotate-6"
        aria-label="Soch Wale Monogram Logo"
      >
        {/* Outer White Background */}
        <circle cx="50" cy="50" r="48" fill="#FFFFFF" />
        {/* Bold Black Perimeter Ring */}
        <circle cx="50" cy="50" r="44" stroke="#111111" strokeWidth="6" fill="none" />
        {/* Precision Rendered Serif Monogram "SW" */}
        <g fill="#111111">
          {/* Serif Letter S with teardrop flourish */}
          <path d="M 44.5 39 C 43.5 35 41 33.5 36.5 33.5 C 32 33.5 28.5 36 28.5 40.5 C 28.5 45.2 33 48.5 38 52 C 43.5 56 46.5 60.5 46.5 66 C 46.5 73.5 40 78.5 32 78.5 C 26 78.5 22 75.5 20.5 71 L 24 68.5 C 25.2 72 28 74 32.5 74 C 36.8 74 41 71.5 41 66 C 41 61.2 37.5 57.5 32 53.5 C 26.5 49.5 23.5 45.5 23.5 40 C 23.5 32.5 29.5 29 36.5 29 C 41.5 29 44.5 31.5 46 35 Z" />
          {/* Serif Letter W intertwined with sharp serifs */}
          <path d="M 48 31.5 L 53.5 31.5 L 61 64.5 L 69 31.5 L 75 31.5 L 82.5 64.5 L 89 31.5 L 94 31.5 L 85 75 L 79.5 75 L 72 43 L 64.5 75 L 59 75 Z" />
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-editorial text-2xl font-bold tracking-tight text-[#111111]">
            Soch Wale
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#666666] font-medium mt-0.5">
            Publishing & Academy
          </span>
        </div>
      )}
    </div>
  );
};
