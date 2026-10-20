import React from 'react';
import { SparkleStar } from './BrandLogo';

export const AmbientSparkles: React.FC<{
  count?: number;
  className?: string;
}> = ({ className = '' }) => {
  // Coordonnées prédéfinies douces pour éviter l'aléatoire à chaque render
  const particles = [
    { top: '15%', left: '12%', size: 10, anim: 'animate-sparkle-1', delay: '0s' },
    { top: '28%', left: '85%', size: 12, anim: 'animate-sparkle-2', delay: '1.2s' },
    { top: '70%', left: '18%', size: 9, anim: 'animate-sparkle-3', delay: '0.5s' },
    { top: '65%', left: '80%', size: 11, anim: 'animate-sparkle-1', delay: '2.1s' },
    { top: '42%', left: '92%', size: 8, anim: 'animate-sparkle-2', delay: '1.8s' },
    { top: '80%', left: '48%', size: 10, anim: 'animate-sparkle-3', delay: '0.9s' },
  ];

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden z-10 ${className}`} aria-hidden="true">
      {particles.map((p, idx) => (
        <span
          key={idx}
          className={`absolute text-amber-300/80 ${p.anim}`}
          style={{
            top: p.top,
            left: p.left,
            animationDelay: p.delay
          }}
        >
          <SparkleStar size={p.size} />
        </span>
      ))}
    </div>
  );
};
