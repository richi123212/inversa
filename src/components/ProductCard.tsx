import React, { useState } from 'react';
import { 
  Eye, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle,
  Cpu,
  Code2,
  ShoppingBag,
  ChevronLeft,
  ChevronRight
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

  const isHardware = producto.tipo === 'hardware';
  const isOutOfStock = isHardware && producto.stock <= 0;
  const isLowStock = isHardware && producto.stock > 0 && producto.stock <= 3;
  const hasOffer = Boolean(producto.precioOferta && producto.precioOferta < producto.precio);

  const discountPercent = hasOffer
    ? Math.round(((producto.precio - producto.precioOferta!) / producto.precio) * 100)
    : 0;

  const currentPrice = hasOffer ? producto.precioOferta! : producto.precio;

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(producto, 1);
  };

  return (
    <div 
      onClick={() => onOpenDetail(producto)}
      className="group relative flex flex-col justify-between rounded-2xl bg-[#0F172A]/90 backdrop-blur-md border border-[#1E293B] hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Corner Circuit Pins */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-transparent group-hover:border-cyan-400 transition-colors z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-transparent group-hover:border-cyan-400 transition-colors z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-transparent group-hover:border-cyan-400 transition-colors z-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-transparent group-hover:border-cyan-400 transition-colors z-20 pointer-events-none" />

      {/* Top Media Section (Expansive Visual with Image Slider) */}
      <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-[#080C14] group/slider">
        {/* Sliding track for multiple images */}
        <div 
          className="flex h-full w-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${activeImgIndex * 100}%)` }}
        >
          {imagesList.map((imgUrl, i) => (
            <img
              key={i}
              src={imgUrl}
              alt={`${producto.titulo} vista ${i + 1}`}
              className="w-full h-full object-cover shrink-0 select-none group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';
              }}
            />
          ))}
        </div>

        {/* Slider Controls when multiple images exist */}
        {imagesList.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImg}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/75 hover:bg-cyan-500 hover:text-black border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all duration-200 shadow-xl"
              title="Imagen anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextImg}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/75 hover:bg-cyan-500 hover:text-black border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all duration-200 shadow-xl"
              title="Siguiente imagen"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-xs border border-white/10">
              {imagesList.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImgIndex(dotIdx);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    activeImgIndex === dotIdx ? 'w-4 bg-cyan-400' : 'w-1.5 bg-white/40 hover:bg-white/80'
                  }`}
                  title={`Foto ${dotIdx + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-80 pointer-events-none" />

        {/* Top Badges (Hardware removed as requested) */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none z-10">
          {/* Photo Counter Pill if multiple images */}
          {imagesList.length > 1 ? (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/80 text-cyan-300 border border-white/15 backdrop-blur-md shadow-md">
              {activeImgIndex + 1}/{imagesList.length}
            </span>
          ) : (
            <div />
          )}

          {/* Stock or Discount Badge */}
          <div className="flex items-center gap-1.5">
            {hasOffer && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 shadow-sm">
                -{discountPercent}%
              </span>
            )}

            {isHardware && (
              <div className="backdrop-blur-md">
                {isOutOfStock ? (
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-red-950/90 text-red-300 border border-red-500/40 flex items-center gap-1">
                    Sin Stock
                  </span>
                ) : isLowStock ? (
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-amber-950/90 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {producto.stock} disponibles
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                    En Existencia
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
          <span className="px-4 py-2.5 rounded-xl bg-[#080C14]/95 border border-cyan-400 text-cyan-300 text-xs font-bold flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <Eye className="w-4 h-4" />
            Ficha Técnica
          </span>
        </div>
      </div>

      {/* Body Content (Spacious & Clean) */}
      <div className="p-6 flex-1 flex flex-col justify-between relative z-10">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400/90 font-semibold block mb-1.5">
            {producto.categoriaNombre}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug min-h-[3rem]">
            {producto.titulo}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 line-clamp-2 leading-relaxed">
            {producto.descripcion}
          </p>

          {/* Quick Specs Preview */}
          <div className="mt-4 pt-3.5 border-t border-[#1E293B]">
            {isHardware ? (
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                {Object.entries(producto.specs).slice(0, 2).map(([key, value]) => (
                  <div key={key} className="bg-[#080C14]/80 p-2.5 rounded-xl border border-white/5">
                    <span className="text-slate-400 text-[10px] block font-sans uppercase font-medium">{key}</span>
                    <span className="text-slate-200 font-semibold text-xs block truncate mt-0.5" title={String(value)}>{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-1.5">
                {Object.entries(producto.specs).slice(0, 2).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2 text-xs text-slate-300 bg-[#080C14]/60 px-3 py-1.5 rounded-xl border border-white/5">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="text-slate-400 font-medium shrink-0">{key}:</span>
                    <span className="text-slate-100 font-semibold truncate" title={String(value)}>{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pricing and Action Section */}
        <div className="mt-6 pt-4 border-t border-[#1E293B]">
          {/* Top Row: Price in MXN & Demo Link */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Total Oficial</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
                  ${formatPrice(currentPrice)}
                </span>
                <span className="text-xs text-cyan-400 font-mono font-bold">MXN</span>
              </div>
              {hasOffer && (
                <span className="text-xs text-slate-500 line-through font-mono block">
                  ${formatPrice(producto.precio)} MXN
                </span>
              )}
            </div>

            {!isHardware && producto.demoUrl && (
              <a
                href={producto.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-3 py-2 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm shrink-0"
                title="Demostración Técnica"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Demo en Vivo</span>
              </a>
            )}
          </div>

          {/* Bottom Row: Full-width Add to Cart button */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`w-full mt-3.5 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${
              isOutOfStock
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-black shadow-cyan-500/25 active:scale-[0.98]'
            }`}
          >
            {isOutOfStock ? (
              <>
                <AlertCircle className="w-4 h-4" />
                <span>Sin Existencias</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Agregar al Carrito</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
