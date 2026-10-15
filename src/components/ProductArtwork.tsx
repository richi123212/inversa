import React from 'react';
import {
  Package,
  Sparkles,
  Zap,
  Cpu,
  Disc,
  Leaf,
  Gamepad2,
  Watch,
  Gem,
  ShoppingBag,
  Flame,
  Laptop,
  Monitor,
  Keyboard,
  Mouse
} from 'lucide-react';

export interface ProductArtworkProps {
  sku: string;
  name?: string;
  styleKey?: string;
  isDarkMode?: boolean;
  className?: string;
}

export const ProductArtwork: React.FC<ProductArtworkProps> = ({
  sku,
  name = '',
  styleKey = 'saas_clean',
  isDarkMode = true,
  className = 'w-full h-full'
}) => {
  const normalizedSku = sku.toUpperCase();

  // =========================================================================
  // 1. BOUTIQUE / LUJO EDITORIAL
  // =========================================================================
  if (normalizedSku.includes('RLX') || normalizedSku.includes('GOLD')) {
    // Reloj Cronógrafo Oro Rosa 18K
    return (
      <div className={`w-full h-full flex items-center justify-center p-2 relative overflow-hidden select-none ${className}`}>
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-36 drop-shadow-md">
          <defs>
            <linearGradient id="goldCase" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF3D1" />
              <stop offset="35%" stopColor="#D4AF37" />
              <stop offset="70%" stopColor="#AA7C11" />
              <stop offset="100%" stopColor="#5E4405" />
            </linearGradient>
            <linearGradient id="goldDial" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E1914" />
              <stop offset="50%" stopColor="#12100E" />
              <stop offset="100%" stopColor="#080706" />
            </linearGradient>
            <linearGradient id="strapGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6E4E2E" />
              <stop offset="50%" stopColor="#A07246" />
              <stop offset="100%" stopColor="#573D24" />
            </linearGradient>
          </defs>
          {/* Correa de piel */}
          <rect x="62" y="10" width="36" height="35" rx="3" fill="url(#strapGrad)" stroke="#3E2B1A" strokeWidth="1" />
          <rect x="62" y="115" width="36" height="35" rx="3" fill="url(#strapGrad)" stroke="#3E2B1A" strokeWidth="1" />
          {/* Pespunte de correa */}
          <line x1="66" y1="12" x2="66" y2="40" stroke="#E6C894" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="94" y1="12" x2="94" y2="40" stroke="#E6C894" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="66" y1="120" x2="66" y2="148" stroke="#E6C894" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="94" y1="120" x2="94" y2="148" stroke="#E6C894" strokeWidth="1" strokeDasharray="2,2" />
          {/* Caja exterior oro */}
          <circle cx="80" cy="80" r="48" fill="url(#goldCase)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.4))" />
          {/* Bisel ranurado */}
          <circle cx="80" cy="80" r="44" fill="none" stroke="#FFF0C2" strokeWidth="1" strokeDasharray="2,2" />
          <circle cx="80" cy="80" r="42" fill="url(#goldDial)" stroke="#D4AF37" strokeWidth="1.5" />
          {/* Marcadores de hora */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="80"
              y1="43"
              x2="80"
              y2={deg % 90 === 0 ? "49" : "46"}
              stroke="#E8C359"
              strokeWidth={deg % 90 === 0 ? "2" : "1"}
              transform={`rotate(${deg} 80 80)`}
            />
          ))}
          {/* Sub-esferas del cronógrafo */}
          <circle cx="80" cy="67" r="9" fill="#1C1813" stroke="#9A7B2C" strokeWidth="0.8" />
          <circle cx="68" cy="84" r="7" fill="#1C1813" stroke="#9A7B2C" strokeWidth="0.8" />
          <circle cx="92" cy="84" r="7" fill="#1C1813" stroke="#9A7B2C" strokeWidth="0.8" />
          {/* Agujas */}
          <line x1="80" y1="80" x2="80" y2="52" stroke="#FFF3D1" strokeWidth="2" strokeLinecap="round" />
          <line x1="80" y1="80" x2="98" y2="76" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="80" y1="80" x2="68" y2="92" stroke="#FF5555" strokeWidth="0.8" strokeLinecap="round" />
          <circle cx="80" cy="80" r="2.5" fill="#FFE699" stroke="#7A5A14" strokeWidth="0.8" />
          {/* Corona */}
          <rect x="127" y="76" width="5" height="8" rx="1.5" fill="url(#goldCase)" />
        </svg>
      </div>
    );
  }

  if (normalizedSku.includes('DIA') || normalizedSku.includes('JWL')) {
    // Anillo Solitario Diamante Certificado GIA
    return (
      <div className={`w-full h-full flex items-center justify-center p-2 relative overflow-hidden select-none ${className}`}>
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-36 drop-shadow-md">
          <defs>
            <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#D8F3FF" />
              <stop offset="60%" stopColor="#9BDCFD" />
              <stop offset="100%" stopColor="#4FA8DE" />
            </linearGradient>
            <linearGradient id="ringBand" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>
          </defs>
          {/* Aro del anillo de platino */}
          <ellipse cx="80" cy="98" rx="42" ry="28" fill="none" stroke="url(#ringBand)" strokeWidth="6" />
          <ellipse cx="80" cy="99" rx="40" ry="26" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.8" />
          {/* Engarce de 4 garras */}
          <line x1="68" y1="72" x2="64" y2="58" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="92" y1="72" x2="96" y2="58" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
          {/* Diamante brillante tallado */}
          <polygon points="80,32 108,52 98,72 80,82 62,72 52,52" fill="url(#diamondGrad)" stroke="#FFFFFF" strokeWidth="1.2" />
          {/* Facetas interiores del diamante */}
          <polygon points="80,32 80,82 62,72" fill="#E0F2FE" fillOpacity="0.7" />
          <polygon points="80,32 98,72 80,82" fill="#BAE6FD" fillOpacity="0.8" />
          <polygon points="62,52 80,56 98,52 80,32" fill="#FFFFFF" fillOpacity="0.9" />
          <polygon points="62,72 80,56 98,72 80,82" fill="#7DD3FC" fillOpacity="0.6" />
          {/* Destellos de luz */}
          <path d="M42,42 L48,42 M45,39 L45,45" stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" />
          <path d="M115,35 L121,35 M118,32 L118,38" stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" />
          <circle cx="80" cy="40" r="2" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  if (normalizedSku.includes('BAG') || normalizedSku.includes('ITL')) {
    // Bolso Piel Italiana Edición Limitada
    return (
      <div className={`w-full h-full flex items-center justify-center p-2 relative overflow-hidden select-none ${className}`}>
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-36 drop-shadow-md">
          <defs>
            <linearGradient id="leatherGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8C4A26" />
              <stop offset="50%" stopColor="#6A3518" />
              <stop offset="100%" stopColor="#4A230F" />
            </linearGradient>
            <linearGradient id="brassGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="50%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>
          {/* Asa de mano superior */}
          <path d="M58,68 C58,35 102,35 102,68" fill="none" stroke="url(#leatherGrad)" strokeWidth="6" strokeLinecap="round" />
          <path d="M58,68 C58,37 102,37 102,68" fill="none" stroke="#FBBF24" strokeWidth="1" strokeDasharray="3,3" />
          {/* Anillos dorados del asa */}
          <circle cx="58" cy="68" r="4.5" fill="none" stroke="url(#brassGold)" strokeWidth="2" />
          <circle cx="102" cy="68" r="4.5" fill="none" stroke="url(#brassGold)" strokeWidth="2" />
          {/* Cuerpo principal del bolso */}
          <path d="M42,70 L118,70 Q124,124 112,126 L48,126 Q36,124 42,70 Z" fill="url(#leatherGrad)" stroke="#3E1A08" strokeWidth="1.5" />
          {/* Solapa frontal */}
          <path d="M44,70 L116,70 L110,98 Q80,110 50,98 Z" fill="#99522B" stroke="#3E1A08" strokeWidth="1" />
          {/* Costura artesanal */}
          <path d="M46,73 L114,73 L108,96 Q80,107 52,96 Z" fill="none" stroke="#FDE68A" strokeWidth="0.8" strokeDasharray="2,2" />
          {/* Broche / Candado de oro central */}
          <rect x="74" y="93" width="12" height="15" rx="2.5" fill="url(#brassGold)" stroke="#78350F" strokeWidth="1" />
          <circle cx="80" cy="98" r="2" fill="#78350F" />
          <line x1="80" y1="100" x2="80" y2="105" stroke="#78350F" strokeWidth="1.2" />
        </svg>
      </div>
    );
  }

  if (normalizedSku.includes('PRF') || normalizedSku.includes('AMB')) {
    // Perfume de Autor Esencia Ambarina
    return (
      <div className={`w-full h-full flex items-center justify-center p-2 relative overflow-hidden select-none ${className}`}>
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-36 drop-shadow-md">
          <defs>
            <linearGradient id="amberLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="crystalShine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {/* Tapa dorada tallada */}
          <polygon points="70,24 90,24 94,40 66,40" fill="#D4AF37" stroke="#92400E" strokeWidth="1" />
          <rect x="74" y="40" width="12" height="6" fill="#FDE68A" />
          {/* Cuello del frasco */}
          <rect x="72" y="46" width="16" height="8" rx="1" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
          {/* Cuerpo del frasco octagonal de cristal */}
          <polygon points="56,54 104,54 114,70 114,124 102,134 58,134 46,124 46,70" fill="url(#amberLiquid)" stroke="#92400E" strokeWidth="1.5" />
          {/* Reflejo de cristal */}
          <polygon points="56,54 104,54 114,70 114,124 102,134 58,134 46,124 46,70" fill="url(#crystalShine)" />
          {/* Etiqueta minimalista de autor */}
          <rect x="58" y="78" width="44" height="34" rx="2" fill="#FAF5EF" stroke="#D4AF37" strokeWidth="1" />
          <text x="80" y="89" textAnchor="middle" fontSize="6" fontFamily="serif" fontWeight="bold" fill="#1C1917" letterSpacing="1">ATELIER</text>
          <text x="80" y="96" textAnchor="middle" fontSize="4.5" fontFamily="serif" fontStyle="italic" fill="#78350F">Eau de Parfum</text>
          <text x="80" y="104" textAnchor="middle" fontSize="5" fontFamily="monospace" fontWeight="bold" fill="#B45309">100 ML</text>
        </svg>
      </div>
    );
  }

  // =========================================================================
  // 2. BOLD CREATIVE / STREETWEAR & DROP ENGINE
  // =========================================================================
  if (normalizedSku.includes('SNK') || normalizedSku.includes('CYBER')) {
    // Sneakers Cyber Runner Limited Edition
    return (
      <div className={`w-full h-full flex items-center justify-center p-2 relative overflow-hidden select-none ${className}`}>
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-36 drop-shadow-md">
          <defs>
            <linearGradient id="cyberSole" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
            <linearGradient id="upperSneaker" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="60%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
          </defs>
          {/* Suela gruesa Chunky con cápsula de aire neón */}
          <path d="M26,114 Q32,126 50,126 L124,126 Q138,124 140,116 Q130,110 118,110 L34,110 Z" fill="url(#cyberSole)" />
          {/* Ventana de aire transparente */}
          <rect x="52" y="115" width="28" height="6" rx="3" fill="#00F5D4" fillOpacity="0.8" stroke="#FFFFFF" strokeWidth="0.8" />
          <rect x="86" y="115" width="22" height="6" rx="3" fill="#F43F5E" fillOpacity="0.8" stroke="#FFFFFF" strokeWidth="0.8" />
          {/* Cuerpo del Sneaker */}
          <path d="M32,110 Q34,88 64,88 L86,88 L104,70 L118,74 L122,86 Q138,98 136,110 Z" fill="url(#upperSneaker)" stroke="#64748B" strokeWidth="1" />
          {/* Lengüeta y cordones reflectivos */}
          <path d="M88,88 L100,60 L110,64 L102,88 Z" fill="#1E293B" stroke="#06B6D4" strokeWidth="1" />
          <line x1="86" y1="84" x2="96" y2="76" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
          <line x1="90" y1="80" x2="100" y2="72" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
          <line x1="94" y1="76" x2="104" y2="68" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
          {/* Rayo Neón / Swoosh dinámico lateral */}
          <polygon points="60,98 84,92 76,99 108,93 84,103 72,101" fill="#06B6D4" filter="drop-shadow(0 0 4px #06B6D4)" />
          {/* Talón y tirador posterior */}
          <path d="M122,86 Q128,72 132,70" fill="none" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (normalizedSku.includes('HOD') || normalizedSku.includes('ACID')) {
    // Hoodie Oversized Heavyweight
    return (
      <div className={`w-full h-full flex items-center justify-center p-2 relative overflow-hidden select-none ${className}`}>
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-36 drop-shadow-md">
          <defs>
            <linearGradient id="hoodieWash" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="50%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>
          {/* Capucha trasera */}
          <path d="M60,48 Q80,24 100,48 Z" fill="#0F172A" stroke="#64748B" strokeWidth="1" />
          {/* Cuerpo del hoodie */}
          <path d="M52,50 L108,50 L126,116 L114,128 L98,128 L98,122 L62,122 L62,128 L46,128 L34,116 Z" fill="url(#hoodieWash)" stroke="#334155" strokeWidth="1.5" />
          {/* Bolsillo de canguro frontal */}
          <path d="M64,96 L96,96 L102,118 L58,118 Z" fill="#0F172A" stroke="#64748B" strokeWidth="1" />
          {/* Cordones de la capucha */}
          <line x1="72" y1="52" x2="72" y2="76" stroke="#F1F5F9" strokeWidth="2" strokeLinecap="round" />
          <line x1="88" y1="52" x2="88" y2="74" stroke="#F1F5F9" strokeWidth="2" strokeLinecap="round" />
          {/* Gráfico impreso en el pecho */}
          <circle cx="80" cy="74" r="10" fill="none" stroke="#F43F5E" strokeWidth="2" strokeDasharray="3,2" />
          <polygon points="80,68 85,78 75,78" fill="#FACC15" />
        </svg>
      </div>
    );
  }

  if (normalizedSku.includes('GLS') || normalizedSku.includes('FUTR')) {
    // Gafas de Sol Futuristas Polarizadas
    return (
      <div className={`w-full h-full flex items-center justify-center p-2 relative overflow-hidden select-none ${className}`}>
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-36 drop-shadow-md">
          <defs>
            <linearGradient id="lensIridescent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="35%" stopColor="#8B5CF6" />
              <stop offset="70%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          {/* Patillas de fibra de carbono */}
          <path d="M24,78 Q40,68 56,76" fill="none" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
          <path d="M136,78 Q120,68 104,76" fill="none" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
          {/* Visor aerodinámico continuo */}
          <path d="M30,76 L130,76 Q134,106 106,108 Q80,94 54,108 Q26,106 30,76 Z" fill="url(#lensIridescent)" stroke="#020617" strokeWidth="2" />
          {/* Reflejos de luz polarizada */}
          <path d="M42,80 L70,80 L52,98 L36,98 Z" fill="#FFFFFF" fillOpacity="0.4" />
          <line x1="86" y1="80" x2="116" y2="80" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.6" />
        </svg>
      </div>
    );
  }

  // =========================================================================
  // 3. NEO-BRUTALISMO POP (GUMROAD, FIGMA, RETRO INDIE)
  // =========================================================================
  if (normalizedSku.includes('ARC') || normalizedSku.includes('RETRO')) {
    // Arcade Portátil Retro 64-Bit Candy
    return (
      <div className={`w-full h-full flex items-center justify-center p-2 relative overflow-hidden select-none ${className}`}>
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-36 drop-shadow-[4px_4px_0px_#000]">
          {/* Carcasa amarilla pop con borde negro 2px */}
          <rect x="36" y="22" width="88" height="118" rx="14" fill="#FFE600" stroke="#000000" strokeWidth="3" />
          {/* Pantalla retro gris/verde */}
          <rect x="48" y="34" width="64" height="48" rx="8" fill="#1E293B" stroke="#000000" strokeWidth="2.5" />
          <rect x="52" y="38" width="56" height="40" rx="4" fill="#A3E635" />
          {/* Pixel Space Invader sprite en la pantalla */}
          <rect x="74" y="46" width="12" height="4" fill="#000000" />
          <rect x="70" y="50" width="20" height="4" fill="#000000" />
          <rect x="66" y="54" width="28" height="4" fill="#000000" />
          <rect x="70" y="58" width="4" height="4" fill="#000000" />
          <rect x="86" y="58" width="4" height="4" fill="#000000" />
          <rect x="66" y="62" width="6" height="6" fill="#000000" />
          <rect x="88" y="62" width="6" height="6" fill="#000000" />
          {/* D-Pad direccional negro */}
          <rect x="54" y="94" width="20" height="7" rx="1.5" fill="#000000" />
          <rect x="60.5" y="87.5" width="7" height="20" rx="1.5" fill="#000000" />
          {/* Botones redondos Candy Pop (Rosa y Cian) */}
          <circle cx="100" cy="98" r="6" fill="#EC4899" stroke="#000000" strokeWidth="2" />
          <circle cx="112" cy="90" r="6" fill="#06B6D4" stroke="#000000" strokeWidth="2" />
          {/* Botones select / start */}
          <rect x="70" y="122" width="8" height="3" rx="1.5" fill="#000000" transform="rotate(-25 74 123)" />
          <rect x="82" y="122" width="8" height="3" rx="1.5" fill="#000000" transform="rotate(-25 86 123)" />
        </svg>
      </div>
    );
  }

  if (normalizedSku.includes('VNL') || normalizedSku.includes('SYNTH')) {
    // Disco de Vinilo Synthwave con funda Retro
    return (
      <div className={`w-full h-full flex items-center justify-center p-2 relative overflow-hidden select-none ${className}`}>
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-36 drop-shadow-[4px_4px_0px_#000]">
          {/* Disco de vinilo saliendo a la derecha */}
          <circle cx="96" cy="80" r="48" fill="#111827" stroke="#000000" strokeWidth="2" />
          {/* Surcos concéntricos del vinilo */}
          <circle cx="96" cy="80" r="42" fill="none" stroke="#374151" strokeWidth="0.8" />
          <circle cx="96" cy="80" r="36" fill="none" stroke="#1F2937" strokeWidth="1" />
          <circle cx="96" cy="80" r="30" fill="none" stroke="#374151" strokeWidth="0.8" />
          <circle cx="96" cy="80" r="24" fill="none" stroke="#1F2937" strokeWidth="1" />
          {/* Galleta central de vinilo (Centro Rosa Neón) */}
          <circle cx="96" cy="80" r="16" fill="#EC4899" stroke="#000000" strokeWidth="2" />
          <circle cx="96" cy="80" r="3" fill="#FFE600" stroke="#000000" strokeWidth="1.5" />
          {/* Funda cuadrada izquierda */}
          <rect x="22" y="32" width="86" height="96" rx="6" fill="#A855F7" stroke="#000000" strokeWidth="3" />
          {/* Gráfico Synthwave en la funda: sol y rejilla */}
          <circle cx="65" cy="74" r="20" fill="#FACC15" stroke="#000000" strokeWidth="2" />
          <line x1="22" y1="84" x2="108" y2="84" stroke="#000000" strokeWidth="2" />
          <line x1="22" y1="94" x2="108" y2="94" stroke="#000000" strokeWidth="2" />
          <line x1="22" y1="104" x2="108" y2="104" stroke="#000000" strokeWidth="2" />
          <text x="65" y="48" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fontWeight="900" fill="#000000">RETRO-WAVE</text>
        </svg>
      </div>
    );
  }

  if (normalizedSku.includes('KBD') || normalizedSku.includes('CUSTOM')) {
    // Teclado Mecánico Pop 60%
    return (
      <div className={`w-full h-full flex items-center justify-center p-2 relative overflow-hidden select-none ${className}`}>
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-36 drop-shadow-[4px_4px_0px_#000]">
          {/* Chasis blanco/menta con borde 3px */}
          <rect x="20" y="46" width="120" height="72" rx="10" fill="#F0FDF4" stroke="#000000" strokeWidth="3" />
          {/* Teclas de colores Neo-Brutalistas */}
          {[
            ['#FFE600', '#A3E635', '#C084FC', '#38BDF8', '#FB7185', '#FBBF24'],
            ['#C084FC', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#A3E635', '#38BDF8'],
            ['#FB7185', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFE600', '#C084FC'],
            ['#38BDF8', '#FFE600', '#A3E635', '#FB7185']
          ].map((row, rIdx) => (
            <g key={rIdx}>
              {row.map((color, cIdx) => {
                const width = rIdx === 3 && cIdx === 1 ? 38 : 14;
                const xPos = rIdx === 3 && cIdx > 1 ? 30 + (cIdx - 1) * 18 + 24 : 30 + cIdx * 18;
                return (
                  <rect
                    key={cIdx}
                    x={xPos}
                    y={54 + rIdx * 14}
                    width={width}
                    height="11"
                    rx="2.5"
                    fill={color}
                    stroke="#000000"
                    strokeWidth="1.8"
                  />
                );
              })}
            </g>
          ))}
          {/* Cable en espiral estilo aviador */}
          <path d="M36,46 Q36,32 50,32 Q64,32 64,40" fill="none" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (normalizedSku.includes('STK') || normalizedSku.includes('PACK')) {
    // Pack de Stickers Holográficos Pop
    return (
      <div className={`w-full h-full flex items-center justify-center p-2 relative overflow-hidden select-none ${className}`}>
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-36 drop-shadow-[4px_4px_0px_#000]">
          {/* Sticker 1: Estrella sonriente amarilla */}
          <g transform="rotate(-15 60 70)">
            <polygon points="60,40 66,54 80,56 70,66 72,80 60,73 48,80 50,66 40,56 54,54" fill="#FFE600" stroke="#000000" strokeWidth="2.5" />
            <circle cx="56" cy="60" r="1.5" fill="#000000" />
            <circle cx="64" cy="60" r="1.5" fill="#000000" />
            <path d="M57,66 Q60,70 63,66" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          {/* Sticker 2: Rayo Neón Rosa */}
          <g transform="rotate(18 100 85)">
            <polygon points="98,44 116,44 104,66 118,66 88,104 96,76 86,76" fill="#F43F5E" stroke="#000000" strokeWidth="2.5" />
          </g>
          {/* Sticker 3: Carita sonriente con ojos de cruz verde ácido */}
          <g transform="translate(68, 86)">
            <circle cx="20" cy="20" r="18" fill="#A3E635" stroke="#000000" strokeWidth="2.5" />
            <text x="13" y="19" fontSize="11" fontWeight="900" fill="#000000">X</text>
            <text x="23" y="19" fontSize="11" fontWeight="900" fill="#000000">X</text>
            <path d="M14,27 Q20,34 26,27" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    );
  }

  // =========================================================================
  // 4. CYBER TECH & TERMINAL
  // =========================================================================
  if (normalizedSku.includes('CPU') || normalizedSku.includes('14900K')) {
    // Procesador Intel Core i9 Die / IHS
    return (
      <div className={`w-full h-full flex items-center justify-center p-2 relative overflow-hidden select-none ${className}`}>
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-36 drop-shadow-md">
          <defs>
            <linearGradient id="ihsMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="50%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>
            <linearGradient id="pcbGreen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#065F46" />
              <stop offset="100%" stopColor="#042F2E" />
            </linearGradient>
          </defs>
          {/* Sustrato PCB verde esmeralda */}
          <rect x="28" y="28" width="104" height="104" rx="4" fill="url(#pcbGreen)" stroke="#10B981" strokeWidth="1" />
          {/* Contactos dorados perimetrales */}
          <polygon points="28,28 40,28 28,40" fill="#FACC15" />
          {/* Tapa IHS de níquel/cobre plateado */}
          <rect x="38" y="38" width="84" height="84" rx="6" fill="url(#ihsMetal)" stroke="#334155" strokeWidth="1.5" />
          {/* Grabado láser */}
          <text x="80" y="60" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="900" fill="#0F172A">INTEL CORE</text>
          <text x="80" y="74" textAnchor="middle" fontSize="13" fontFamily="monospace" fontWeight="900" fill="#0284C7">i9-14900K</text>
          <text x="80" y="86" textAnchor="middle" fontSize="6" fontFamily="monospace" fill="#334155">LGA1700 • 6.0 GHz</text>
          <text x="80" y="96" textAnchor="middle" fontSize="5" fontFamily="monospace" fill="#475569">S-SPEC: SRN48 • MALAYSIA</text>
          {/* Matriz de micro condensadores SMD */}
          <circle cx="50" cy="110" r="2" fill="#F59E0B" />
          <circle cx="58" cy="110" r="2" fill="#F59E0B" />
          <circle cx="102" cy="110" r="2" fill="#F59E0B" />
          <circle cx="110" cy="110" r="2" fill="#F59E0B" />
        </svg>
      </div>
    );
  }

  if (normalizedSku.includes('GPU') || normalizedSku.includes('4080S')) {
    // Tarjeta Gráfica RTX 4080 Triple Fan
    return (
      <div className={`w-full h-full flex items-center justify-center p-2 relative overflow-hidden select-none ${className}`}>
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-36 drop-shadow-md">
          <defs>
            <linearGradient id="gpuShroud" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="50%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <linearGradient id="rgbBar" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          {/* Chasis de la GPU */}
          <rect x="18" y="48" width="124" height="64" rx="8" fill="url(#gpuShroud)" stroke="#334155" strokeWidth="1.5" />
          {/* Línea RGB neón superior */}
          <rect x="24" y="52" width="112" height="4" rx="2" fill="url(#rgbBar)" />
          {/* Tres ventiladores de turbina axiales */}
          {[42, 80, 118].map((cx, i) => (
            <g key={i}>
              <circle cx={cx} cy="82" r="17" fill="#090E17" stroke="#475569" strokeWidth="1" />
              <circle cx={cx} cy="82" r="5" fill="#334155" stroke="#94A3B8" strokeWidth="1" />
              {/* Aspas del ventilador */}
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <line
                  key={deg}
                  x1={cx}
                  y1="82"
                  x2={cx}
                  y2="68"
                  stroke="#64748B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  transform={`rotate(${deg} ${cx} 82)`}
                />
              ))}
            </g>
          ))}
          {/* Conector PCIe dorado inferior */}
          <rect x="42" y="112" width="56" height="5" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
        </svg>
      </div>
    );
  }

  if (normalizedSku.includes('RAM') || normalizedSku.includes('DDR5')) {
    // Módulos de RAM DDR5 Dual Channel con RGB
    return (
      <div className={`w-full h-full flex items-center justify-center p-2 relative overflow-hidden select-none ${className}`}>
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-36 drop-shadow-md">
          <defs>
            <linearGradient id="ramRgb" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="35%" stopColor="#8B5CF6" />
              <stop offset="70%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          {/* Módulo trasero */}
          <g transform="translate(14, -10)">
            <rect x="20" y="58" width="94" height="44" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="1" />
            <rect x="22" y="56" width="90" height="5" rx="2" fill="url(#ramRgb)" />
            <rect x="30" y="102" width="74" height="4" fill="#F59E0B" />
          </g>
          {/* Módulo frontal */}
          <rect x="20" y="58" width="94" height="44" rx="4" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
          {/* Barra difusora RGB */}
          <rect x="22" y="56" width="90" height="5" rx="2" fill="url(#ramRgb)" />
          {/* Disipador de aluminio facetado */}
          <path d="M30,68 L50,68 L58,82 L76,82 L84,68 L104,68" fill="none" stroke="#64748B" strokeWidth="1.5" />
          <text x="67" y="94" textAnchor="middle" fontSize="6" fontFamily="monospace" fontWeight="900" fill="#38BDF8">DDR5 64GB 6000MHz</text>
          {/* Pines dorados DDR5 */}
          <rect x="30" y="102" width="74" height="4" fill="#F59E0B" />
        </svg>
      </div>
    );
  }

  if (normalizedSku.includes('SSD') || normalizedSku.includes('GEN5')) {
    // SSD NVMe PCIe 5.0 2TB
    return (
      <div className={`w-full h-full flex items-center justify-center p-2 relative overflow-hidden select-none ${className}`}>
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-36 drop-shadow-md">
          {/* PCB Negro mate */}
          <rect x="22" y="55" width="116" height="50" rx="3" fill="#090E17" stroke="#1E293B" strokeWidth="1" />
          {/* Conector M.2 dorado a la izquierda */}
          <rect x="20" y="66" width="6" height="28" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
          {/* Disipador de calor de aluminio acanalado */}
          <rect x="34" y="60" width="88" height="40" rx="3" fill="#1E293B" stroke="#475569" strokeWidth="1" />
          {/* Aletas de refrigeración */}
          {[66, 73, 80, 87].map((y) => (
            <line key={y} x1="38" y1={y} x2="118" y2={y} stroke="#06B6D4" strokeWidth="1.2" strokeOpacity="0.8" />
          ))}
          <text x="78" y="95" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fontWeight="900" fill="#00F5D4">GEN5 12,400 MB/s</text>
          {/* Muesca de fijación semicircular a la derecha */}
          <path d="M138,80 A5,5 0 0,0 138,70 Z" fill="#090E17" />
        </svg>
      </div>
    );
  }

  // =========================================================================
  // 5. WARM ORGANIC / BOTÁNICO & BIENESTAR
  // =========================================================================
  if (normalizedSku.includes('OIL') || normalizedSku.includes('LAV')) {
    // Aceite Esencial Lavanda Bio con Gotero
    return (
      <div className={`w-full h-full flex items-center justify-center p-2 relative overflow-hidden select-none ${className}`}>
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-36 drop-shadow-md">
          <defs>
            <linearGradient id="amberApothecary" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#92400E" />
              <stop offset="50%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
          </defs>
          {/* Bulbo de goma del gotero */}
          <path d="M72,24 Q80,14 88,24 L88,34 L72,34 Z" fill="#292524" stroke="#1C1917" strokeWidth="1" />
          {/* Tapa rosca de madera o baquelita */}
          <rect x="68" y="34" width="24" height="12" rx="2" fill="#44403C" stroke="#292524" strokeWidth="1" />
          {/* Cuello del frasco ámbar */}
          <rect x="71" y="46" width="18" height="6" fill="#78350F" />
          {/* Botella ámbar redondeada */}
          <rect x="52" y="52" width="56" height="82" rx="12" fill="url(#amberApothecary)" stroke="#451A03" strokeWidth="1.2" />
          {/* Etiqueta botánica de papel kraft */}
          <rect x="56" y="68" width="48" height="50" rx="3" fill="#FAF6EE" stroke="#E6DECD" strokeWidth="1" />
          {/* Ramillete de lavanda ilustrado */}
          <path d="M80,72 L80,94 M78,74 Q80,72 82,74 M76,78 Q80,76 84,78 M76,83 Q80,81 84,83" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="80" y1="84" x2="80" y2="94" stroke="#15803D" strokeWidth="1.2" />
          <text x="80" y="103" textAnchor="middle" fontSize="5" fontFamily="sans-serif" fontWeight="bold" fill="#292524">LAVANDULA</text>
          <text x="80" y="110" textAnchor="middle" fontSize="4" fontFamily="sans-serif" fill="#78716C">100% Bio Pure</text>
        </svg>
      </div>
    );
  }

  if (normalizedSku.includes('DIF') || normalizedSku.includes('CERAM')) {
    // Difusor de Cerámica Hecho a Mano con Vapor
    return (
      <div className={`w-full h-full flex items-center justify-center p-2 relative overflow-hidden select-none ${className}`}>
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-36 drop-shadow-md">
          <defs>
            <linearGradient id="ceramicClay" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5EDE4" />
              <stop offset="50%" stopColor="#E2D4C3" />
              <stop offset="100%" stopColor="#C4B19C" />
            </linearGradient>
          </defs>
          {/* Volutas de vapor aromático */}
          <path d="M78,38 Q72,28 78,18 T76,8" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" />
          <path d="M84,36 Q90,26 84,16 T86,6" fill="none" stroke="#94A3B8" strokeWidth="1.2" strokeOpacity="0.4" strokeLinecap="round" />
          {/* Cuerpo cilíndrico cerámico orgánico */}
          <path d="M74,42 L86,42 Q112,80 108,126 L52,126 Q48,80 74,42 Z" fill="url(#ceramicClay)" stroke="#A89279" strokeWidth="1.2" />
          {/* Base de madera de nogal cálido */}
          <rect x="50" y="126" width="60" height="8" rx="2" fill="#78350F" stroke="#451A03" strokeWidth="1" />
          {/* Línea difusa de luz cálida LED en la base */}
          <line x1="56" y1="126" x2="104" y2="126" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (normalizedSku.includes('TEA') || normalizedSku.includes('MATCHA')) {
    // Cuenco de Cerámica con Té Matcha y Batidor Chasen
    return (
      <div className={`w-full h-full flex items-center justify-center p-2 relative overflow-hidden select-none ${className}`}>
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-36 drop-shadow-md">
          <defs>
            <linearGradient id="matchaGreen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#86EFAC" />
              <stop offset="40%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>
          </defs>
          {/* Cuenco Chawan de cerámica gres */}
          <path d="M38,62 Q36,118 80,122 Q124,118 122,62 Z" fill="#292524" stroke="#44403C" strokeWidth="2" />
          {/* Superficie de espuma verde brillante matcha */}
          <ellipse cx="80" cy="68" rx="38" ry="12" fill="url(#matchaGreen)" stroke="#166534" strokeWidth="1" />
          {/* Espuma cremosa y burbujas */}
          <circle cx="72" cy="66" r="2" fill="#DCFCE7" />
          <circle cx="86" cy="69" r="2.5" fill="#DCFCE7" />
          <circle cx="94" cy="67" r="1.5" fill="#DCFCE7" />
          {/* Batidor de bambú Chasen al lado */}
          <rect x="118" y="44" width="8" height="24" rx="2" fill="#D97706" />
          <path d="M116,68 L128,68 L130,90 L114,90 Z" fill="#FDE68A" stroke="#B45309" strokeWidth="0.8" />
        </svg>
      </div>
    );
  }

  if (normalizedSku.includes('VEL') || normalizedSku.includes('SOYA')) {
    // Vela Botánica de Cera de Soya con Mecha de Madera
    return (
      <div className={`w-full h-full flex items-center justify-center p-2 relative overflow-hidden select-none ${className}`}>
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-36 drop-shadow-md">
          <defs>
            <radialGradient id="candleGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Resplandor de la llama */}
          <circle cx="80" cy="46" r="22" fill="url(#candleGlow)" />
          {/* Llama dorada */}
          <path d="M80,32 Q86,44 80,52 Q74,44 80,32 Z" fill="#F59E0B" />
          <path d="M80,38 Q83,46 80,50 Q77,46 80,38 Z" fill="#FEF08A" />
          {/* Mecha de madera */}
          <rect x="78" y="52" width="4" height="8" fill="#451A03" />
          {/* Vaso de vidrio ámbar */}
          <rect x="52" y="60" width="56" height="72" rx="6" fill="#78350F" fillOpacity="0.85" stroke="#451A03" strokeWidth="1.5" />
          {/* Cera de soya natural */}
          <ellipse cx="80" cy="64" rx="26" ry="6" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="0.8" />
          {/* Etiqueta kraft botánica */}
          <rect x="58" y="76" width="44" height="44" rx="2" fill="#FAF6EE" stroke="#E2D9CC" strokeWidth="1" />
          <text x="80" y="92" textAnchor="middle" fontSize="5" fontFamily="serif" fontWeight="bold" fill="#1C1917">SOY CANDLE</text>
          <text x="80" y="100" textAnchor="middle" fontSize="4" fontFamily="serif" fontStyle="italic" fill="#65A30D">Romero &amp; Salvia</text>
        </svg>
      </div>
    );
  }

  // =========================================================================
  // 6. SAAS CLEAN / CORPORATE HARDWARE
  // =========================================================================
  if (normalizedSku.includes('LPT') || normalizedSku.includes('WORK')) {
    // Laptop Workstation i7 32GB
    return (
      <div className={`w-full h-full flex items-center justify-center p-2 relative overflow-hidden select-none ${className}`}>
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-36 drop-shadow-md">
          {/* Pantalla abierta delgada */}
          <rect x="36" y="38" width="88" height="58" rx="4" fill="#0F172A" stroke="#475569" strokeWidth="2" />
          <rect x="40" y="42" width="80" height="50" rx="2" fill="#0284C7" />
          {/* Gráfico de código / dashboard en pantalla */}
          <rect x="44" y="48" width="32" height="4" rx="1" fill="#FFFFFF" fillOpacity="0.9" />
          <rect x="44" y="56" width="22" height="3" rx="1" fill="#BAE6FD" />
          <rect x="44" y="62" width="42" height="3" rx="1" fill="#38BDF8" />
          <rect x="44" y="68" width="18" height="3" rx="1" fill="#E0F2FE" />
          {/* Chasis base inferior / teclado */}
          <polygon points="24,106 136,106 126,96 34,96" fill="#334155" stroke="#475569" strokeWidth="1" />
          {/* Touchpad */}
          <rect x="70" y="99" width="20" height="5" rx="1" fill="#1E293B" />
        </svg>
      </div>
    );
  }

  if (normalizedSku.includes('MON') || normalizedSku.includes('165')) {
    // Monitor Gamer / Pro 27" IPS
    return (
      <div className={`w-full h-full flex items-center justify-center p-2 relative overflow-hidden select-none ${className}`}>
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-36 drop-shadow-md">
          {/* Pantalla sin marcos */}
          <rect x="22" y="34" width="116" height="72" rx="4" fill="#0B132B" stroke="#3A506B" strokeWidth="2" />
          <rect x="25" y="37" width="110" height="66" rx="2" fill="#1C2541" />
          {/* Gráfica de monitor */}
          <path d="M30,86 L50,72 L70,80 L90,56 L110,64 L130,48" fill="none" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" />
          {/* Base metálica y mástil */}
          <rect x="76" y="106" width="8" height="24" fill="#334155" />
          <polygon points="56,132 104,132 96,128 64,128" fill="#475569" stroke="#1E293B" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  // Fallback con insignia geométrica premium
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-3 text-center ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-2">
        <Package className="w-7 h-7 text-cyan-400" />
      </div>
      <span className="text-[10px] font-mono font-bold text-slate-400">{sku}</span>
    </div>
  );
};
