import React from 'react';
import { useCMS } from '../../context/CMSContext';

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  inverted?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
  inverted = false
}) => {
  const { siteSettings } = useCMS();

  const dimensions = {
    sm: { icon: 30, text: 'text-base font-bold' },
    md: { icon: 40, text: 'text-xl font-bold tracking-tight' },
    lg: { icon: 52, text: 'text-2xl font-bold tracking-tight' },
    xl: { icon: 68, text: 'text-3xl font-extrabold tracking-tight' }
  }[size];

  const strokeColor = inverted ? '#FFFFFF' : '#111111';
  const fillColor = inverted ? '#111111' : '#FFFFFF';
  const textColor = inverted ? '#FFFFFF' : '#111111';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {siteSettings.logoUrl ? (
        <img
          src={siteSettings.logoUrl}
          alt={siteSettings.siteTitle || 'Soch Wale'}
          style={{ width: dimensions.icon, height: dimensions.icon }}
          className="object-contain rounded-full"
        />
      ) : (
        <svg
          width={dimensions.icon}
          height={dimensions.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 transition-transform duration-200 hover:scale-105"
        >
          {/* Outer circular badge matching uploaded brand identity */}
          <circle cx="50" cy="50" r="47" fill={fillColor} />
          <circle cx="50" cy="50" r="44" stroke={strokeColor} strokeWidth="6" />
          <circle cx="50" cy="50" r="41" stroke={fillColor} strokeWidth="2" />
          
          {/* Stylized Serif 'SW' Monogram */}
          <g fill={strokeColor}>
            {/* Elegant curved 'S' flowing into 'W' */}
            <path
              d="M33 38 C33 34 38 32 44 32 C47 32 48 33 48 35 C48 36.5 46.5 37.5 44 38 C38 39 31 43 31 50 C31 58 39 64 47 70 C46 72 44 74 41 74 C36 74 34 70 34 68 C34 67.5 32 67.5 32 68.5 C32 72 37 77 43 77 C48 77 53 73 53 67 C53 61 46 56 38 50 C36 48.5 34.5 46 34.5 44 C34.5 41 38 39 42 39 C46 39 48 40.5 48 43 L50 43 C50 37 45 32 40 32 Z"
            />
            {/* Interlocking bold serif 'W' */}
            <path
              d="M50 34 L43 72 L49 72 L53 49 L60 72 L64 72 L72 38 L77 34 L77 32 L66 32 L66 34 L69.5 34 L64 61 L58 34 L60 32 L51 32 L51 34 L54 34 L50 56 L47 34 Z"
            />
          </g>
        </svg>
      )}

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-serif tracking-tight ${dimensions.text}`} style={{ color: textColor }}>
            {siteSettings.siteTitle || 'Soch Wale'}
          </span>
          {size !== 'sm' && (
            <span className="text-[10px] tracking-widest uppercase text-neutral-500 font-medium mt-0.5">
              Digital Publishing
            </span>
          )}
        </div>
      )}
    </div>
  );
};
