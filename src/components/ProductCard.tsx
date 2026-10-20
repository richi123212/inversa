import React, { useState } from 'react';
import { 
  ShoppingBag, 
  ChevronLeft, 
  ChevronRight,
  ArrowRight,
  Check
} from 'lucide-react';
import { Producto } from '../types';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';

interface ProductCardProps {
  producto: Producto;
  onOpenDetail: (producto: Producto) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ producto, onOpenDetail }) => {
  const { addToCart } = useCart();
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [added, setAdded] = useState(false);

  const isHardware = producto.tipo === 'hardware';
  const isOutOfStock = isHardware && producto.stock <= 0;
  const currentPrice = producto.precioOferta ?? producto.precio;

  const imagesList = producto.imagenes.length > 0
    ? producto.imagenes
    : ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'];

  const handlePrevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : imagesList.length - 1));
  };

  const handleNextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev < imagesList.length - 1 ? prev + 1 : 0));
  };

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    
    addToCart(producto, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  // Build a condensed 1-line key specification
  const condensedSpec = React.useMemo(() => {
    if (!producto.specs) return '';
    const entries = Object.entries(producto.specs);
    if (entries.length === 0) return '';
    // Select the first 2-3 specifications to form a neat 1-line string
    return entries
      .slice(0, 3)
      .map(([k, v]) => `${k}: ${v}`)
      .join(' • ');
  }, [producto.specs]);

  return (
    <article 
      onClick={() => onOpenDetail(producto)}
      className="group relative flex flex-col justify-between rounded-xl bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 overflow-hidden cursor-pointer"
    >
      {/* 1. Clean Uniform Neutral Image Container */}
      <div className="relative aspect-[4/3] w-full bg-zinc-950/70 border-b border-zinc-800/80 overflow-hidden flex items-center justify-center p-6">
        <img
          src={imagesList[activeImgIndex]}
          alt={producto.titulo}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Discreet gallery navigation buttons when multiple images exist */}
        {imagesList.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImg}
              aria-label="Imagen anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/70 text-zinc-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNextImg}
              aria-label="Siguiente imagen"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/70 text-zinc-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Subtle pagination dots */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1">
              {imagesList.map((_, dotIdx) => (
                <span
                  key={dotIdx}
                  className={`h-1 rounded-full transition-all ${
                    activeImgIndex === dotIdx ? 'w-3 bg-zinc-300' : 'w-1 bg-zinc-600'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* 2. Content & Information Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category / Brand indicator */}
          <span className="text-[11px] font-medium tracking-wide uppercase text-zinc-400 font-mono block mb-1">
            {producto.categoriaNombre}
          </span>

          {/* Model / Title */}
          <h3 className="text-base font-semibold text-white group-hover:text-zinc-100 transition-colors line-clamp-2 leading-snug">
            {producto.titulo}
          </h3>

          {/* 3. Condensed Key Spec (1 line only) */}
          {condensedSpec && (
            <p 
              className="text-xs text-zinc-400 mt-2 truncate font-mono"
              title={condensedSpec}
            >
              {condensedSpec}
            </p>
          )}
        </div>

        {/* 4. Price & 5. Primary Action Button */}
        <div className="mt-5 pt-4 border-t border-zinc-800/80">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-white tracking-tight">
                  ${formatPrice(currentPrice)}
                </span>
                <span className="text-xs font-semibold text-zinc-400">MXN</span>
              </div>
              <span className="text-[11px] text-zinc-400 font-medium block">
                IVA incluido
              </span>
            </div>

            {producto.precioOferta && (
              <span className="text-xs text-zinc-500 line-through">
                ${formatPrice(producto.precio)} MXN
              </span>
            )}
          </div>

          {/* Primary Action Button */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetail(producto);
              }}
              className="py-2.5 px-3 rounded-lg border border-zinc-700/80 hover:border-zinc-600 bg-zinc-800/40 hover:bg-zinc-800 text-zinc-200 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Ver detalle</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            <button
              type="button"
              onClick={handleAction}
              disabled={isOutOfStock}
              className={`py-2.5 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                isOutOfStock
                  ? 'bg-zinc-800/30 text-zinc-500 border border-zinc-800 cursor-not-allowed'
                  : added
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-zinc-100 hover:bg-white text-zinc-950 font-semibold shadow-xs'
              }`}
            >
              {isOutOfStock ? (
                <span>Agotado temporalmente</span>
              ) : added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Agregado</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Agregar al pedido</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
