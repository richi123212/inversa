import React from 'react';

export const CatalogBackgroundCircuit: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Ambient Cybernetic Lighting Blooms */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-blue-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-2/3 left-1/3 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s' }} />

      {/* SVG Canvas for Circuit Traces and Logic Buses */}
      <svg
        className="w-full h-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Linear gradients for animated circuit pulses */}
          <linearGradient id="busGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="busGradSky" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#0284C7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
          </linearGradient>

          {/* Micro Grid Pattern with subtle circuit dot junctions */}
          <pattern id="circuitGridPattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1E293B" strokeWidth="0.5" strokeOpacity="0.4" />
            <circle cx="0" cy="0" r="1.2" fill="#06B6D4" fillOpacity="0.3" />
            <circle cx="60" cy="0" r="1.2" fill="#06B6D4" fillOpacity="0.3" />
            <circle cx="0" cy="60" r="1.2" fill="#06B6D4" fillOpacity="0.3" />
            <circle cx="60" cy="60" r="1.2" fill="#06B6D4" fillOpacity="0.3" />
          </pattern>

          <style>{`
            @keyframes pulseTrackA {
              0% { stroke-dashoffset: 600; }
              100% { stroke-dashoffset: 0; }
            }
            @keyframes pulseTrackB {
              0% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: 600; }
            }
            @keyframes nodeBlink {
              0%, 100% { opacity: 0.25; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.3); }
            }
            @keyframes scanlineSweep {
              0% { transform: translateY(-100%); }
              100% { transform: translateY(1000%); }
            }
            .track-fast {
              stroke-dasharray: 40 160;
              animation: pulseTrackA 4s linear infinite;
            }
            .track-medium {
              stroke-dasharray: 50 200;
              animation: pulseTrackB 5.5s linear infinite;
            }
            .track-slow {
              stroke-dasharray: 30 180;
              animation: pulseTrackA 7s linear infinite;
            }
            .node-pulse {
              animation: nodeBlink 3s ease-in-out infinite;
            }
          `}</style>
        </defs>

        {/* Base Grid Texture */}
        <rect width="100%" height="100%" fill="url(#circuitGridPattern)" />

        {/* Master Circuit Traces (Static Underlay) */}
        <g stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7">
          {/* Horizontal Highway Traces */}
          <path d="M 0 120 H 280 L 340 180 H 740 L 800 120 H 1440" />
          <path d="M 0 340 H 420 L 480 400 H 960 L 1020 340 H 1440" />
          <path d="M 0 580 H 240 L 300 640 H 680 L 740 580 H 1160 L 1220 640 H 1440" />
          <path d="M 0 820 H 380 L 440 880 H 880 L 940 820 H 1440" />
          <path d="M 0 1060 H 300 L 360 1120 H 780 L 840 1060 H 1440" />
          <path d="M 0 1300 H 460 L 520 1360 H 980 L 1040 1300 H 1440" />

          {/* Vertical Highway Drops */}
          <path d="M 180 0 V 240 L 220 280 V 700 L 260 740 V 1500" />
          <path d="M 520 0 V 420 L 560 460 V 980 L 600 1020 V 1500" />
          <path d="M 880 0 V 300 L 920 340 V 860 L 960 900 V 1500" />
          <path d="M 1240 0 V 500 L 1280 540 V 1100 L 1320 1140 V 1500" />
        </g>

        {/* Active Animated High-Voltage Signal Currents */}
        <g stroke="url(#busGradCyan)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 0 120 H 280 L 340 180 H 740 L 800 120 H 1440" className="track-fast" />
          <path d="M 0 580 H 240 L 300 640 H 680 L 740 580 H 1160 L 1220 640 H 1440" className="track-fast" />
          <path d="M 0 1060 H 300 L 360 1120 H 780 L 840 1060 H 1440" className="track-medium" />

          {/* Vertical currents */}
          <path d="M 180 0 V 240 L 220 280 V 700 L 260 740 V 1500" className="track-slow" />
          <path d="M 880 0 V 300 L 920 340 V 860 L 960 900 V 1500" className="track-fast" />
        </g>

        <g stroke="url(#busGradSky)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 0 340 H 420 L 480 400 H 960 L 1020 340 H 1440" className="track-medium" />
          <path d="M 0 820 H 380 L 440 880 H 880 L 940 820 H 1440" className="track-fast" />
          <path d="M 0 1300 H 460 L 520 1360 H 980 L 1040 1300 H 1440" className="track-slow" />

          {/* Vertical currents */}
          <path d="M 520 0 V 420 L 560 460 V 980 L 600 1020 V 1500" className="track-medium" />
          <path d="M 1240 0 V 500 L 1280 540 V 1100 L 1320 1140 V 1500" className="track-fast" />
        </g>

        {/* Junction Nodes (Luminous Cyan/Blue Points) */}
        <g fill="#06B6D4">
          <circle cx="280" cy="120" r="3.5" className="node-pulse" />
          <circle cx="340" cy="180" r="3" className="node-pulse" />
          <circle cx="740" cy="180" r="3.5" className="node-pulse" />
          <circle cx="800" cy="120" r="3" className="node-pulse" />

          <circle cx="420" cy="340" r="3.5" className="node-pulse" />
          <circle cx="480" cy="400" r="3" className="node-pulse" />
          <circle cx="960" cy="400" r="3.5" className="node-pulse" />
          <circle cx="1020" cy="340" r="3" className="node-pulse" />

          <circle cx="240" cy="580" r="3.5" className="node-pulse" />
          <circle cx="300" cy="640" r="3" className="node-pulse" />
          <circle cx="680" cy="640" r="3.5" className="node-pulse" />
          <circle cx="740" cy="580" r="3" className="node-pulse" />

          <circle cx="220" cy="280" r="3.5" className="node-pulse" />
          <circle cx="560" cy="460" r="3" className="node-pulse" />
          <circle cx="920" cy="340" r="3.5" className="node-pulse" />
          <circle cx="1280" cy="540" r="3" className="node-pulse" />
        </g>
      </svg>
    </div>
  );
};

