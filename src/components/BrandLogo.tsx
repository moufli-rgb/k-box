import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  inverted?: boolean;
  className?: string;
  withTagline?: boolean;
}

export const SparkleStar: React.FC<{
  className?: string;
  size?: number;
  glow?: boolean;
}> = ({ className = 'w-3 h-3 text-amber-400', size, glow = true }) => (
  <svg 
    className={`${className} ${glow ? 'filter drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]' : ''}`}
    viewBox="0 0 24 24" 
    fill="currentColor"
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
  </svg>
);

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  inverted = false,
  className = '',
  withTagline = false
}) => {
  // Styles typographiques selon la taille demandée
  const sizeStyles = {
    sm: {
      text: 'text-xl sm:text-2xl tracking-[0.2em]',
      dot: 'text-xs mx-0.5',
      sparkle: 12,
      sparklePos: '-top-1 -right-3',
      tagline: 'text-[9px] tracking-[0.25em]'
    },
    md: {
      text: 'text-2xl sm:text-3xl tracking-[0.22em]',
      dot: 'text-sm mx-1',
      sparkle: 14,
      sparklePos: '-top-1.5 -right-3.5',
      tagline: 'text-[10px] tracking-[0.3em]'
    },
    lg: {
      text: 'text-3xl sm:text-4xl lg:text-5xl tracking-[0.22em]',
      dot: 'text-base sm:text-lg mx-1',
      sparkle: 18,
      sparklePos: '-top-2 -right-5',
      tagline: 'text-[11px] sm:text-xs tracking-[0.35em]'
    },
    xl: {
      text: 'text-5xl sm:text-6xl lg:text-7xl tracking-[0.24em]',
      dot: 'text-xl sm:text-2xl mx-1.5',
      sparkle: 22,
      sparklePos: '-top-2.5 -right-6',
      tagline: 'text-xs sm:text-sm tracking-[0.4em]'
    }
  }[size];

  const textColor = inverted ? 'text-white' : 'text-stone-900';
  const dotColor = inverted ? 'text-amber-300' : 'text-amber-700/80';
  const sparkleColor = inverted ? 'text-amber-300' : 'text-amber-500';

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <div className="relative inline-flex items-baseline">
        <span 
          className={`font-brand font-light ${sizeStyles.text} ${textColor} transition-all duration-300 group-hover:text-amber-900 leading-none pl-1`}
          style={{ fontFeatureSettings: '"liga" 1, "kern" 1' }}
        >
          K<span className={`${dotColor} font-serif italic ${sizeStyles.dot} font-normal select-none`}>·</span>BOX
        </span>

        {/* Étincelle scintillante d'angle */}
        <span 
          className={`absolute ${sizeStyles.sparklePos} ${sparkleColor} animate-sparkle-gentle pointer-events-none`}
        >
          <SparkleStar size={sizeStyles.sparkle} />
        </span>
      </div>

      {withTagline && (
        <span className={`font-light uppercase ${sizeStyles.tagline} ${inverted ? 'text-amber-100/90' : 'text-stone-500'} mt-1.5`}>
          L’Art d’offrir avec délicatesse
        </span>
      )}
    </div>
  );
};
