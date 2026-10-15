import React, { useState, useEffect } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight, ZoomOut } from 'lucide-react';

interface ImageWithZoomProps {
  src: string;
  alt: string;
  className?: string;
  images?: string[];
  activeIndex?: number;
  onIndexChange?: (index: number) => void;
}

export const ImageWithZoom: React.FC<ImageWithZoomProps> = ({ 
  src, 
  alt, 
  className = '',
  images,
  activeIndex: controlledIndex,
  onIndexChange
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [internalIndex, setInternalIndex] = useState(0);

  const galleryImages = images && images.length > 0 ? images : [src];
  const currentIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;
  const currentImage = galleryImages[currentIndex] || src;

  const setIndex = (idx: number) => {
    if (onIndexChange) {
      onIndexChange(idx);
    } else {
      setInternalIndex(idx);
    }
  };

  // Cerrar con la tecla Escape y navegar con flechas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsZoomed(false);
      } else if (e.key === 'ArrowLeft' && galleryImages.length > 1 && isZoomed) {
        setIndex(currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1);
      } else if (e.key === 'ArrowRight' && galleryImages.length > 1 && isZoomed) {
        setIndex(currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0);
      }
    };

    if (isZoomed) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Evita scroll de fondo
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isZoomed, currentIndex, galleryImages.length]);

  return (
    <>
      {/* Imagen normal en la tarjeta o modal */}
      <div 
        className="relative group cursor-zoom-in overflow-hidden rounded-xl bg-slate-900 border border-white/10"
        onClick={(e) => {
          e.stopPropagation();
          setIsZoomed(true);
        }}
        title="Haz clic para inspeccionar detalles con zoom"
      >
        <img 
          src={currentImage} 
          alt={alt} 
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${className}`} 
        />
        
        {/* Botón Flotante de Zoom al pasar el cursor */}
        <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/15 text-cyan-300 text-xs font-mono font-medium flex items-center gap-1.5 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all shadow-xl">
          <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
          <span>Zoom</span>
        </div>
      </div>

      {/* Vista ampliada (Full Screen Lightbox Zoom) */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-black/90 backdrop-blur-md p-4 sm:p-6 cursor-zoom-out animate-fadeIn select-none transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(false);
          }}
        >
          {/* Header Superior: Contador y Botón X de Cierre para Móvil y Desktop */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="w-full max-w-5xl flex items-center justify-between z-30 pt-1 pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              {galleryImages.length > 1 && (
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/10 text-cyan-300 border border-white/15 backdrop-blur-md shadow-lg">
                  Foto {currentIndex + 1} de {galleryImages.length}
                </span>
              )}
              <span className="hidden sm:inline-block text-xs font-mono text-slate-300 truncate max-w-md">
                {alt}
              </span>
            </div>

            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(false);
              }}
              className="p-2.5 bg-slate-800/90 hover:bg-red-950/80 hover:border-red-500/50 border border-white/20 text-white rounded-full transition-all shadow-2xl hover:scale-105 active:scale-95"
              aria-label="Cerrar zoom"
              title="Cerrar (Esc)"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Área Central: Imagen Ampliada con Flechas */}
          <div 
            className="relative w-full flex-1 flex items-center justify-center my-2 max-h-[82vh]"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(false);
            }}
          >
            {/* Flecha Izquierda */}
            {galleryImages.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1);
                }}
                className="absolute left-2 sm:left-6 z-20 p-3 sm:p-3.5 rounded-full bg-slate-900/85 hover:bg-cyan-500 hover:text-black border border-white/20 text-white transition-all shadow-2xl hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Foto anterior"
                title="Anterior (←)"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Imagen Principal en Zoom */}
            <div className="relative max-h-full max-w-full flex items-center justify-center group">
              <img 
                src={currentImage} 
                alt={alt} 
                className="max-h-[78vh] sm:max-h-[82vh] max-w-[94vw] sm:max-w-[88vw] object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 transition-transform duration-300 hover:scale-[1.01] select-none"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(false);
                }}
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-slate-300 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5 shadow-lg">
                <ZoomOut className="w-3.5 h-3.5 text-cyan-400" />
                <span>Haz clic para cerrar o pulsa Esc</span>
              </div>
            </div>

            {/* Flecha Derecha */}
            {galleryImages.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0);
                }}
                className="absolute right-2 sm:right-6 z-20 p-3 sm:p-3.5 rounded-full bg-slate-900/85 hover:bg-cyan-500 hover:text-black border border-white/20 text-white transition-all shadow-2xl hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Siguiente foto"
                title="Siguiente (→)"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}
          </div>

          {/* Carrusel Inferior de Miniaturas si hay múltiples fotos */}
          {galleryImages.length > 1 ? (
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="flex items-center justify-center gap-2.5 overflow-x-auto py-2 px-4 max-w-full z-30"
            >
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndex(idx);
                  }}
                  className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    currentIndex === idx
                      ? 'border-cyan-400 scale-105 shadow-lg shadow-cyan-500/25 ring-2 ring-cyan-400/30'
                      : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/40'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Miniatura ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          ) : (
            <div className="h-4" />
          )}
        </div>
      )}
    </>
  );
};
