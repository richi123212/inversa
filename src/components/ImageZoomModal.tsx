import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomOut } from 'lucide-react';

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  altTitle?: string;
}

export const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  altTitle = 'Detalle del producto'
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  // Sincronizar índice inicial cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  // Manejo de teclado (Escape para salir, flechas para navegar fotos)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        e.preventDefault();
        setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, images.length, onClose]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[activeIndex] || images[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-black/90 backdrop-blur-md p-4 sm:p-6 cursor-zoom-out animate-fadeIn select-none transition-all duration-300"
    >
      {/* Barra Superior Flotante: Contador y Botón Cerrar (Mobile y Desktop) */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="w-full max-w-5xl flex items-center justify-between z-30 pt-1 pointer-events-auto"
      >
        <div className="flex items-center gap-3">
          {images.length > 1 && (
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/10 text-cyan-300 border border-white/15 backdrop-blur-md shadow-lg">
              Foto {activeIndex + 1} de {images.length}
            </span>
          )}
          <span className="hidden sm:inline-block text-xs font-mono text-slate-400 truncate max-w-md">
            {altTitle}
          </span>
        </div>

        {/* Botón flotante X optimizado para móviles y escritorio */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="p-2.5 rounded-full bg-slate-800/90 hover:bg-red-950/80 hover:border-red-500/50 border border-white/20 text-white transition-all shadow-2xl hover:scale-105 active:scale-95"
          aria-label="Cerrar zoom"
          title="Cerrar (Esc)"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Contenedor Central: Imagen Principal con Zoom y Flechas de Navegación */}
      <div 
        className="relative w-full flex-1 flex items-center justify-center my-2 max-h-[82vh]"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        {/* Flecha Anterior (si hay más de 1 imagen) */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 z-20 p-3 sm:p-3.5 rounded-full bg-slate-900/85 hover:bg-cyan-500 hover:text-black border border-white/20 text-white transition-all shadow-2xl hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Imagen anterior"
            title="Anterior (←)"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Imagen Ampliada */}
        <div className="relative max-h-full max-w-full flex items-center justify-center group">
          <img
            src={currentImage}
            alt={`${altTitle} - vista ${activeIndex + 1}`}
            className="max-h-[78vh] sm:max-h-[82vh] max-w-[94vw] sm:max-w-[88vw] object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 transition-transform duration-300 hover:scale-[1.02]"
            onClick={(e) => {
              // Click en la imagen también cierra el zoom suavemente
              e.stopPropagation();
              onClose();
            }}
          />

          {/* Badge informativo al pasar el cursor */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-slate-300 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5 shadow-lg">
            <ZoomOut className="w-3.5 h-3.5 text-cyan-400" />
            <span>Haz clic para reducir o pulsa Esc</span>
          </div>
        </div>

        {/* Flecha Siguiente (si hay más de 1 imagen) */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 sm:right-6 z-20 p-3 sm:p-3.5 rounded-full bg-slate-900/85 hover:bg-cyan-500 hover:text-black border border-white/20 text-white transition-all shadow-2xl hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Siguiente imagen"
            title="Siguiente (→)"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}
      </div>

      {/* Barra Inferior: Miniaturas clicables para alternar imágenes directamente en Zoom */}
      {images.length > 1 ? (
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="flex items-center justify-center gap-2.5 overflow-x-auto py-2 px-4 max-w-full z-30"
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(idx);
              }}
              className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                activeIndex === idx
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
  );
};
