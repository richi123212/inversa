import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShoppingBag, 
  Layers, 
  ExternalLink, 
  Check, 
  ShieldCheck, 
  Truck, 
  Clock,
  Plus,
  Minus,
  FileText
} from 'lucide-react';
import { Producto } from '../types';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import { ImageWithZoom } from './ImageWithZoom';

interface ProductDetailModalProps {
  producto: Producto | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ producto, onClose }) => {
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    setSelectedImageIndex(0);
    setQuantity(1);
    setAddedSuccess(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [producto, onClose]);

  if (!producto) return null;

  const isHardware = producto.tipo === 'hardware';
  const isOutOfStock = isHardware && producto.stock <= 0;
  const maxStock = isHardware ? producto.stock : 99;
  const currentPrice = producto.precioOferta ?? producto.precio;
  const currentImage = producto.imagenes[selectedImageIndex] || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(producto, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#0F172A] border border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row"
      >
        
        {/* Close Button con posición fija y alto contraste */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-xl bg-[#080C14]/90 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white transition-all shadow-xl"
          title="Cerrar ventana (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Image Gallery con Zoom Interactivo */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-[#080C14]/80 border-b md:border-b-0 md:border-r border-[#1E293B]">
          {/* Main Image with Zoom Lightbox */}
          <div className="relative aspect-square w-full">
            <ImageWithZoom
              src={currentImage}
              alt={producto.titulo}
              images={producto.imagenes}
              activeIndex={selectedImageIndex}
              onIndexChange={setSelectedImageIndex}
              className="w-full h-full"
            />

            {producto.precioOferta && (
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-500/30 shadow-md pointer-events-none z-10">
                PRECIO PREFERENCIAL
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {producto.imagenes.length > 1 && (
            <div className="flex items-center gap-2.5 mt-4 overflow-x-auto pb-1">
              {producto.imagenes.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-cyan-400 scale-105 shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400/40'
                      : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <img src={img} alt={`${producto.titulo} vista ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Corporate Guarantee info */}
          <div className="mt-4 pt-4 border-t border-[#1E293B] flex items-center justify-between text-xs text-slate-300 font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Garantía Oficial Inversa</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-blue-400" />
              <span>Envío Asegurado Nacional</span>
            </span>
          </div>
        </div>

        {/* Right Side: Product Details & Specs */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header Container protegido con padding-right generoso para evitar colisiones con la X */}
            <div className="pr-14 sm:pr-16 mb-2">
              {/* Categoría destacada en su propio contenedor sin el texto 'Hardware' redundante */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-xs mb-3 break-words max-w-full">
                <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="break-words">{producto.categoriaNombre}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug break-words">
                {producto.titulo}
              </h2>
            </div>

            {/* Price section in MXN */}
            <div className="mt-4 flex items-baseline gap-2.5">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                ${formatPrice(currentPrice)}
              </span>
              <span className="text-xs text-cyan-400 font-mono font-bold">MXN</span>
              {producto.precioOferta && (
                <span className="text-xs text-slate-500 line-through font-mono ml-2">
                  ${formatPrice(producto.precio)} MXN
                </span>
              )}
            </div>

            {/* Stock status */}
            <div className="mt-2">
              {isHardware ? (
                isOutOfStock ? (
                  <span className="text-xs font-semibold text-red-400 bg-red-950/40 border border-red-500/20 px-2 py-0.5 rounded inline-block font-mono">
                    Inventario agotado
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded inline-block font-mono">
                    {producto.stock} piezas disponibles en almacén central
                  </span>
                )
              ) : (
                <span className="text-xs font-semibold text-blue-400 bg-blue-950/40 border border-blue-500/20 px-2 py-0.5 rounded inline-flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  Disponibilidad inmediata para contratación
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed">
              {producto.descripcion}
            </p>

            {/* Specs / Ficha Técnica */}
            <div className="mt-6">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-cyan-400" />
                {isHardware ? 'Especificaciones Técnicas' : 'Alcance del Desarrollo'}
              </h4>

              <div className="rounded-xl border border-[#1E293B] bg-[#080C14]/60 overflow-hidden divide-y divide-[#1E293B]">
                {Object.entries(producto.specs).map(([key, val]) => (
                  <div key={key} className="grid grid-cols-3 p-2.5 text-xs">
                    <span className="font-semibold text-slate-400 col-span-1">{key}</span>
                    <span className="text-white col-span-2 font-mono text-[11px]">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Demo link for Web Services */}
            {!isHardware && producto.demoUrl && (
              <div className="mt-5">
                <a
                  href={producto.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Consultar Demostración de Proyecto
                </a>
              </div>
            )}
          </div>

          {/* Quantity and Add to Cart Section */}
          <div className="mt-8 pt-5 border-t border-[#1E293B] flex flex-col sm:flex-row items-center gap-3">
            {!isOutOfStock && (
              <div className="flex items-center border border-[#1E293B] bg-[#080C14] rounded-xl p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-mono font-bold text-sm text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(maxStock, q + 1))}
                  className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex-1 w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 whitespace-nowrap shadow-lg ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : addedSuccess
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                  : 'bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-black shadow-cyan-500/25'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Agregado a tu Pedido</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isOutOfStock ? 'Producto Agotado' : `Agregar al Pedido (${quantity})`}</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
