import React from 'react';

interface InversaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  animated?: boolean;
  variant?: 'light' | 'dark' | 'cyan';
}

export const InversaLogo: React.FC<InversaLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  animated = true,
  variant = 'cyan'
}) => {
  const sizeMap = {
    sm: { icon: 'w-8 h-8', textTitle: 'text-base', textSub: 'text-[8px]' },
    md: { icon: 'w-11 h-11', textTitle: 'text-xl', textSub: 'text-[9px]' },
    lg: { icon: 'w-16 h-16', textTitle: 'text-2xl', textSub: 'text-[11px]' },
    xl: { icon: 'w-24 h-24', textTitle: 'text-4xl', textSub: 'text-xs' }
  };

  const strokeColor = variant === 'cyan' ? '#06B6D4' : variant === 'light' ? '#0F172A' : '#FFFFFF';
  const fillColor = variant === 'cyan' ? '#06B6D4' : variant === 'light' ? '#0F172A' : '#FFFFFF';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Icon Vector reproducing the official Inversa chip & circuit spire emblem */}
      <div className={`relative shrink-0 ${sizeMap[size].icon} flex items-center justify-center`}>
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Animated Energy Glow if animated */}
          {animated && (
            <defs>
              <linearGradient id="inversaPulseGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#38BDF8" stopOpacity="1">
                  <animate
                    attributeName="offset"
                    values="0; 1; 0"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.2" />
              </linearGradient>

              <filter id="circuitGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          )}

          {/* Group containing the exact geometric Inversa emblem */}
          <g filter={animated ? "url(#circuitGlow)" : undefined}>
            
            {/* --- 1. CHIP / PROCESSOR BASE (Isometric diamond with connection pins) --- */}
            {/* Outer isometric socket border */}
            <path
              d="M100 156 L42 120 L100 86 L158 120 Z"
              stroke={strokeColor}
              strokeWidth="9"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Chip socket thickness / 3D rim */}
            <path
              d="M42 120 L42 128 L100 164 L158 128 L158 120"
              stroke={strokeColor}
              strokeWidth="9"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Chip Socket Pins (Lower left edge) */}
            <line x1="56" y1="133" x2="48" y2="144" stroke={strokeColor} strokeWidth="8" strokeLinecap="round" />
            <line x1="72" y1="143" x2="64" y2="154" stroke={strokeColor} strokeWidth="8" strokeLinecap="round" />
            <line x1="88" y1="153" x2="80" y2="164" stroke={strokeColor} strokeWidth="8" strokeLinecap="round" />

            {/* Chip Socket Pins (Lower right edge) */}
            <line x1="144" y1="133" x2="152" y2="144" stroke={strokeColor} strokeWidth="8" strokeLinecap="round" />
            <line x1="128" y1="143" x2="136" y2="154" stroke={strokeColor} strokeWidth="8" strokeLinecap="round" />
            <line x1="112" y1="153" x2="120" y2="164" stroke={strokeColor} strokeWidth="8" strokeLinecap="round" />

            {/* Inner die trace on chip center */}
            <path
              d="M100 134 L92 139 L100 144 L108 139 Z"
              fill={fillColor}
            />

            {/* --- 2. THE THREE RISING GEOMETRIC CIRCUIT SPIRES --- */}
            
            {/* Left Spire: Vertical circuit pillar with beveled angular top */}
            <path
              d="M72 126 L72 74 L82 60 L82 120 Z"
              fill={fillColor}
            />

            {/* Center Spire: Dynamic power trace branching upward */}
            <path
              d="M93 138 L93 90 L103 76 L103 40 L113 28 L113 72 L103 86 L103 132 Z"
              fill={fillColor}
            />

            {/* Right Spire: Tallest sharp aerodynamic circuit blade */}
            <path
              d="M116 112 L127 96 L127 50 L146 16 L138 68 L127 82 L127 106 Z"
              fill={fillColor}
            />

            {/* Animated Circuit Pulse (flowing electrical signal up the central spire) */}
            {animated && (
              <circle cx="108" cy="34" r="3.5" fill="#FFFFFF">
                <animate
                  attributeName="opacity"
                  values="0.2; 1; 0.2"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values="130; 30"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cx"
                  values="96; 110"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </g>
        </svg>

        {/* Ambient subtle backlight glow */}
        {animated && (
          <div className="absolute inset-0 bg-cyan-400/15 rounded-full blur-md -z-10 animate-pulse pointer-events-none" />
        )}
      </div>

      {/* Typography: INVERSA / TECNOLOGÍA EN MOVIMIENTO */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span className={`font-black tracking-[0.22em] text-white uppercase ${sizeMap[size].textTitle}`}>
            INVERSA
          </span>
          <span className={`font-semibold tracking-[0.28em] text-slate-400 uppercase mt-1 ${sizeMap[size].textSub}`}>
            TECNOLOGÍA EN MOVIMIENTO
          </span>
        </div>
      )}
    </div>
  );
};
