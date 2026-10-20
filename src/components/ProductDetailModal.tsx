import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Clock,
  Plus,
  Minus,
  FileText,
  Check,
  CheckCircle2,
  ExternalLink
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row"
      >
        
        {/* Close Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 z-30 p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/80 text-zinc-300 hover:text-white transition-colors"
          title="Cerrar ventana (Esc)"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Gallery & Zoom */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-zinc-950/60 border-b md:border-b-0 md:border-r border-zinc-800">
          <div className="relative aspect-square w-full flex items-center justify-center">
            <ImageWithZoom
              src={currentImage}
              alt={producto.titulo}
              images={producto.imagenes}
              activeIndex={selectedImageIndex}
              onIndexChange={setSelectedImageIndex}
              className="w-full h-full"
            />
          </div>

          {/* Thumbnails */}
          {producto.imagenes.length > 1 && (
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
              {producto.imagenes.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-14 h-14 rounded-lg overflow-hidden border shrink-0 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-white ring-1 ring-white/50 opacity-100'
                      : 'border-zinc-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${producto.titulo} vista ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Guarantee Badges */}
          <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Garantía Oficial de Fabricante</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-zinc-300" />
              <span>Envío Asegurado DHL / FedEx</span>
            </span>
          </div>
        </div>

        {/* Right: Product Details & Specs */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="pr-10 mb-2">
              <span className="inline-block text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-400 mb-2">
                {producto.categoriaNombre}
              </span>

              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {producto.titulo}
              </h2>
            </div>

            {/* Price with explicit IVA incluido */}
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  ${formatPrice(currentPrice)}
                </span>
                <span className="text-xs font-semibold text-zinc-400">MXN</span>
                {producto.precioOferta && (
                  <span className="text-xs text-zinc-500 line-through ml-2">
                    ${formatPrice(producto.precio)} MXN
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-zinc-400 font-medium">IVA incluido (Factura CFDI 4.0 inmediata)</span>
              </div>
            </div>

            {/* Stock status - subtle, non-alarmist */}
            <div className="mt-3">
              {isHardware ? (
                isOutOfStock ? (
                  <span className="text-xs text-zinc-500 bg-zinc-800/60 border border-zinc-800 px-2.5 py-1 rounded inline-block font-mono">
                    Agotado temporalmente en almacén
                  </span>
                ) : (
                  <span className="text-xs text-zinc-300 bg-zinc-800/60 border border-zinc-800 px-2.5 py-1 rounded inline-flex items-center gap-1.5 font-mono">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {producto.stock} unidades disponibles para envío inmediato
                  </span>
                )
              ) : (
                <span className="text-xs text-zinc-300 bg-zinc-800/60 border border-zinc-800 px-2.5 py-1 rounded inline-flex items-center gap-1.5 font-mono">
                  <Clock className="w-3 h-3 text-zinc-400" />
                  Disponibilidad inmediata para contratación de proyecto
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-300 mt-4 leading-relaxed">
              {producto.descripcion}
            </p>

            {/* Technical Specifications Table */}
            <div className="mt-6">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300 mb-3 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-zinc-400" />
                {isHardware ? 'Especificaciones Técnicas' : 'Alcance del Desarrollo'}
              </h4>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 overflow-hidden divide-y divide-zinc-800">
                {Object.entries(producto.specs).map(([key, val]) => (
                  <div key={key} className="grid grid-cols-3 p-2.5 text-xs">
                    <span className="font-medium text-zinc-400 col-span-1">{key}</span>
                    <span className="text-zinc-200 col-span-2 font-mono text-[11px]">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Demo link for Web Services */}
            {!isHardware && producto.demoUrl && (
              <div className="mt-4">
                <a
                  href={producto.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Ver demostración en vivo</span>
                </a>
              </div>
            )}
          </div>

          {/* Quantity and Add to Cart Section */}
          <div className="mt-6 pt-5 border-t border-zinc-800 flex flex-col sm:flex-row items-center gap-3">
            {!isOutOfStock && (
              <div className="flex items-center border border-zinc-800 bg-zinc-950 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1.5 text-zinc-400 hover:text-white rounded transition-colors"
                  aria-label="Disminuir cantidad"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-mono font-semibold text-xs text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(maxStock, q + 1))}
                  className="p-1.5 text-zinc-400 hover:text-white rounded transition-colors"
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex-1 w-full py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                isOutOfStock
                  ? 'bg-zinc-800/40 text-zinc-500 cursor-not-allowed border border-zinc-800'
                  : addedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-zinc-100 hover:bg-white text-zinc-950 shadow-xs'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Agregado al Pedido</span>
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
