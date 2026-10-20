import React from 'react';

export const ProcessorCircuitAnimation: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full overflow-hidden select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1200 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-60"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Subtle gradient for circuit tracks */}
          <linearGradient id="busGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
          </linearGradient>

          {/* Core Glow */}
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#0284C7" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0B0F19" stopOpacity="0" />
          </radialGradient>

          {/* Electric pulse dash pattern */}
          <style>{`
            @keyframes circuitPulseFlow {
              0% { stroke-dashoffset: 120; }
              100% { stroke-dashoffset: 0; }
            }
            @keyframes chipHeartbeat {
              0%, 100% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.03); opacity: 1; }
            }
            .flow-line-1 {
              stroke-dasharray: 12 40;
              animation: circuitPulseFlow 2.8s linear infinite;
            }
            .flow-line-2 {
              stroke-dasharray: 16 50;
              animation: circuitPulseFlow 3.6s linear infinite reverse;
            }
            .flow-line-3 {
              stroke-dasharray: 8 30;
              animation: circuitPulseFlow 2s linear infinite;
            }
            .chip-core-pulse {
              transform-origin: 600px 160px;
              animation: chipHeartbeat 4s ease-in-out infinite;
            }
          `}</style>
        </defs>

        {/* --- Central Processor Core Socket --- */}
        <g className="chip-core-pulse">
          {/* Ambient Glow */}
          <circle cx="600" cy="160" r="140" fill="url(#coreGlow)" />

          {/* Outer processor frame */}
          <rect
            x="530"
            y="90"
            width="140"
            height="140"
            rx="16"
            stroke="#1E293B"
            strokeWidth="2"
            fill="#0F172A"
          />

          {/* Internal Die Heat Spreader */}
          <rect
            x="545"
            y="105"
            width="110"
            height="110"
            rx="10"
            stroke="#0284C7"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            fill="#080C14"
          />

          {/* Core Silicon Die */}
          <rect
            x="565"
            y="125"
            width="70"
            height="70"
            rx="6"
            fill="#0B132B"
            stroke="#06B6D4"
            strokeWidth="1.5"
          />

          {/* Silicon circuit etched pattern inside die */}
          <path
            d="M575 140 H625 M575 160 H625 M575 180 H625 M595 130 V190 M605 130 V190"
            stroke="#38BDF8"
            strokeWidth="0.8"
            opacity="0.4"
          />

          {/* Central Active Node */}
          <circle cx="600" cy="160" r="5" fill="#06B6D4">
            <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Frequency & Status text */}
          <text x="600" y="215" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="system-ui, sans-serif" letterSpacing="1.2">
            Inversa Enterprise Architecture
          </text>
        </g>

        {/* --- Bus Connections & Circuit Traces (Left Side) --- */}
        <g stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Static Background Buses */}
          <path d="M100 60 H400 L470 110 H530" />
          <path d="M40 120 H340 L440 135 H530" />
          <path d="M140 160 H380 L460 160 H530" />
          <path d="M60 200 H320 L420 185 H530" />
          <path d="M120 260 H410 L480 210 H530" />

          {/* PCB Surface Pads / Nodes */}
          <circle cx="100" cy="60" r="3" fill="#1E293B" />
          <circle cx="40" cy="120" r="3" fill="#1E293B" />
          <circle cx="140" cy="160" r="3" fill="#1E293B" />
          <circle cx="60" cy="200" r="3" fill="#1E293B" />
          <circle cx="120" cy="260" r="3" fill="#1E293B" />
        </g>

        {/* Active Animated Energy Signals (Left Side) */}
        <g stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M100 60 H400 L470 110 H530" className="flow-line-1" />
          <path d="M40 120 H340 L440 135 H530" className="flow-line-2" stroke="#38BDF8" />
          <path d="M140 160 H380 L460 160 H530" className="flow-line-3" stroke="#22D3EE" />
          <path d="M60 200 H320 L420 185 H530" className="flow-line-1" stroke="#0EA5E9" />
          <path d="M120 260 H410 L480 210 H530" className="flow-line-2" />
        </g>

        {/* --- Bus Connections & Circuit Traces (Right Side) --- */}
        <g stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Static Background Buses */}
          <path d="M670 110 H730 L800 60 H1100" />
          <path d="M670 135 H760 L860 120 H1160" />
          <path d="M670 160 H740 L820 160 H1060" />
          <path d="M670 185 H780 L880 200 H1140" />
          <path d="M670 210 H720 L790 260 H1080" />

          {/* PCB Surface Pads / Nodes */}
          <circle cx="1100" cy="60" r="3" fill="#1E293B" />
          <circle cx="1160" cy="120" r="3" fill="#1E293B" />
          <circle cx="1060" cy="160" r="3" fill="#1E293B" />
          <circle cx="1140" cy="200" r="3" fill="#1E293B" />
          <circle cx="1080" cy="260" r="3" fill="#1E293B" />
        </g>

        {/* Active Animated Energy Signals (Right Side) */}
        <g stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M670 110 H730 L800 60 H1100" className="flow-line-2" stroke="#06B6D4" />
          <path d="M670 135 H760 L860 120 H1160" className="flow-line-1" stroke="#38BDF8" />
          <path d="M670 160 H740 L820 160 H1060" className="flow-line-3" stroke="#2563EB" />
          <path d="M670 185 H780 L880 200 H1140" className="flow-line-2" stroke="#0284C7" />
          <path d="M670 210 H720 L790 260 H1080" className="flow-line-1" stroke="#0EA5E9" />
        </g>

        {/* Peripheral Logic Nodes */}
        <g>
          <circle cx="470" cy="110" r="3" fill="#06B6D4" />
          <circle cx="440" cy="135" r="3" fill="#38BDF8" />
          <circle cx="730" cy="110" r="3" fill="#06B6D4" />
          <circle cx="760" cy="135" r="3" fill="#38BDF8" />
          <circle cx="780" cy="185" r="3" fill="#0EA5E9" />
        </g>
      </svg>
    </div>
  );
};
