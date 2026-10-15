import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  ShieldCheck, 
  CheckCircle, 
  Loader2, 
  Building,
  CreditCard,
  Landmark,
  Store
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/ordersService';
import { PedidoItem } from '../types';
import { formatPrice } from '../utils/formatters';

export const CartDrawer: React.FC = () => {
  const { 
    items, 
    isOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    subtotal, 
    totalItems 
  } = useCart();

  const [clienteNombre, setClienteNombre] = useState('');
  const [clienteTelefono, setClienteTelefono] = useState('');
  const [clienteEmail, setClienteEmail] = useState('');
  const [metodoPago, setMetodoPago] = useState<'spei' | 'tarjeta' | 'oxxo'>('spei');
  const [notas, setNotas] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [orderCompleted, setOrderCompleted] = useState<{ id: string; total: number; metodo: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!clienteNombre.trim()) {
      setErrorMessage('Por favor ingrese su nombre o razón social.');
      return;
    }

    if (!clienteTelefono.trim() || clienteTelefono.length < 8) {
      setErrorMessage('Por favor ingrese un número telefónico de contacto válido.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderItems: PedidoItem[] = items.map((item) => ({
        productoId: item.producto.id,
        titulo: item.producto.titulo,
        precio: item.producto.precioOferta ?? item.producto.precio,
        cantidad: item.cantidad,
        tipo: item.producto.tipo
      }));

      const metodoTexto = 
        metodoPago === 'spei' ? 'Transferencia SPEI (Directa sin comisión)' :
        metodoPago === 'tarjeta' ? 'Tarjeta en Línea (Pasarela Stripe / Mercado Pago)' :
        'Depósito en Efectivo OXXO Pay';

      const newOrder = await createOrder({
        clienteNombre: clienteNombre.trim(),
        clienteTelefono: clienteTelefono.trim(),
        clienteEmail: clienteEmail.trim() || undefined,
        items: orderItems,
        total: subtotal,
        estado: 'pendiente',
        notas: `Método de Pago: ${metodoTexto}. Notas: ${notas.trim() || 'N/A'}`
      });

      setOrderCompleted({ id: newOrder.id, total: subtotal, metodo: metodoTexto });
      clearCart();
    } catch (err: any) {
      console.error('Error al registrar pedido formal:', err);
      setErrorMessage('Ocurrió un error al procesar la orden. Inténtelo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinishAndClose = () => {
    setOrderCompleted(null);
    closeCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={closeCart} 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F172A] border-l border-[#1E293B] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-[#1E293B] flex items-center justify-between bg-[#080C14]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Orden de Compra</h3>
                <span className="text-xs text-slate-400 font-mono">
                  {totalItems} {totalItems === 1 ? 'partida' : 'partidas'} en selección
                </span>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-2 rounded-xl text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          {orderCompleted ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#080C14]">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                REGISTRO EXITOSO
              </span>
              <h4 className="text-lg font-bold text-white">Pedido Formal Generado</h4>
              <p className="text-xs font-mono text-slate-300 mt-2 bg-[#0F172A] px-3 py-1.5 rounded-lg border border-[#1E293B]">
                Folio Oficial: #{orderCompleted.id}
              </p>
              <p className="text-xs text-slate-400 mt-3 max-w-xs leading-relaxed">
                Su orden ha sido registrada. Modalidad de liquidación seleccionada: <strong>{orderCompleted.metodo}</strong>.
              </p>
              <div className="mt-4 pt-3 border-t border-[#1E293B] w-full text-center">
                <span className="text-xs text-slate-400 block font-mono">Total a Liquidar:</span>
                <span className="text-xl font-bold font-mono text-white">
                  ${formatPrice(orderCompleted.total)} MXN
                </span>
              </div>
              <button
                onClick={handleFinishAndClose}
                className="mt-6 w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Cerrar y Continuar
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#080C14] border border-[#1E293B] flex items-center justify-center text-slate-600 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-bold text-white">Sin partidas seleccionadas</h4>
              <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
                Explore nuestro catálogo de dispositivos y hardware o configure una solución de software institucional.
              </p>
              <button
                onClick={closeCart}
                className="mt-6 px-5 py-2.5 rounded-lg bg-[#080C14] hover:bg-[#1E293B] border border-[#1E293B] text-slate-300 text-xs font-semibold transition-all"
              >
                Consultar Catálogo
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Product List */}
              <div className="space-y-3">
                {items.map((item) => {
                  const unitPrice = item.producto.precioOferta ?? item.producto.precio;
                  const itemTotal = unitPrice * item.cantidad;
                  const isHardware = item.producto.tipo === 'hardware';

                  return (
                    <div
                      key={item.producto.id}
                      className="p-3.5 rounded-xl bg-[#080C14] border border-[#1E293B] flex gap-3 items-center"
                    >
                      <img
                        src={item.producto.imagenes[0] || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80'}
                        alt={item.producto.titulo}
                        className="w-12 h-12 rounded-lg object-cover border border-white/5 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-white truncate">
                          {item.producto.titulo}
                        </h5>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] font-mono text-cyan-400 font-semibold">
                            ${formatPrice(unitPrice)} MXN
                          </span>
                          <span className="text-[10px] text-slate-600">•</span>
                          <span className="text-[10px] uppercase font-mono text-slate-400">
                            {isHardware ? 'Hardware' : 'Desarrollo'}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-[#1E293B] bg-[#0F172A] rounded-md">
                            <button
                              onClick={() => updateQuantity(item.producto.id, item.cantidad - 1)}
                              className="p-1 text-slate-400 hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-mono font-bold text-white">
                              {item.cantidad}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.producto.id, item.cantidad + 1)}
                              className="p-1 text-slate-400 hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-mono font-bold text-slate-200">
                            ${formatPrice(itemTotal)} MXN
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.producto.id)}
                        className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                        title="Eliminar partida"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Formal Checkout Form */}
              <form onSubmit={handleSubmitOrder} className="space-y-3.5 pt-4 border-t border-[#1E293B]">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-cyan-400" />
                    Datos de Facturación &amp; Contacto
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-cyan-400" /> Seguro SSL
                  </span>
                </div>

                {errorMessage && (
                  <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs">
                    {errorMessage}
                  </div>
                )}

                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Nombre o Razón Social *
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={clienteNombre}
                        onChange={(e) => setClienteNombre(e.target.value)}
                        placeholder="Ej. Ing. Carlos Mendoza / Empresa"
                        className="w-full pl-9 pr-3 py-2 bg-[#080C14] border border-[#1E293B] rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Teléfono de Contacto Directo *
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={clienteTelefono}
                        onChange={(e) => setClienteTelefono(e.target.value)}
                        placeholder="55 1234 5678"
                        className="w-full pl-9 pr-3 py-2 bg-[#080C14] border border-[#1E293B] rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Correo Electrónico (Facturación o Seguimiento)
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={clienteEmail}
                        onChange={(e) => setClienteEmail(e.target.value)}
                        placeholder="contacto@empresa.com"
                        className="w-full pl-9 pr-3 py-2 bg-[#080C14] border border-[#1E293B] rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Pasarela y Método de Pago */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
                      Modalidad de Liquidación / Pasarela de Pagos
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-[10px]">
                      <button
                        type="button"
                        onClick={() => setMetodoPago('spei')}
                        className={`p-2.5 rounded-lg border text-left flex flex-col justify-between ${
                          metodoPago === 'spei'
                            ? 'bg-cyan-950/40 border-cyan-400 text-white'
                            : 'bg-[#080C14] border-[#1E293B] text-slate-400 hover:text-white'
                        }`}
                      >
                        <Landmark className="w-3.5 h-3.5 text-cyan-400 mb-1" />
                        <span className="font-bold block">SPEI Bancario</span>
                        <span className="text-[9px] text-emerald-400">0% Comisión</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setMetodoPago('tarjeta')}
                        className={`p-2.5 rounded-lg border text-left flex flex-col justify-between ${
                          metodoPago === 'tarjeta'
                            ? 'bg-cyan-950/40 border-cyan-400 text-white'
                            : 'bg-[#080C14] border-[#1E293B] text-slate-400 hover:text-white'
                        }`}
                      >
                        <CreditCard className="w-3.5 h-3.5 text-blue-400 mb-1" />
                        <span className="font-bold block">Tarjeta Online</span>
                        <span className="text-[9px] text-slate-500">Stripe / MP</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setMetodoPago('oxxo')}
                        className={`p-2.5 rounded-lg border text-left flex flex-col justify-between ${
                          metodoPago === 'oxxo'
                            ? 'bg-cyan-950/40 border-cyan-400 text-white'
                            : 'bg-[#080C14] border-[#1E293B] text-slate-400 hover:text-white'
                        }`}
                      >
                        <Store className="w-3.5 h-3.5 text-amber-400 mb-1" />
                        <span className="font-bold block">Efectivo OXXO</span>
                        <span className="text-[9px] text-slate-500">OXXO Pay</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Dirección de Entrega / Notas Fiscales
                    </label>
                    <div className="relative">
                      <FileText className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                      <textarea
                        rows={2}
                        value={notas}
                        onChange={(e) => setNotas(e.target.value)}
                        placeholder="Domicilio de entrega o datos de facturación..."
                        className="w-full pl-9 pr-3 py-2 bg-[#080C14] border border-[#1E293B] rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Subtotal / Total and Submit */}
                <div className="pt-3 border-t border-[#1E293B] space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Subtotal de Partidas</span>
                    <span className="font-mono text-white font-bold">${formatPrice(subtotal)} MXN</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold text-white">
                    <span>Importe Total</span>
                    <span className="font-mono text-cyan-400 text-lg">${formatPrice(subtotal)} MXN</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Registrando Pedido en Sistema...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Confirmar y Procesar Pedido Formal
                      </>
                    )}
                  </button>
                </div>
              </form>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
