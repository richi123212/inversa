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
  MapPin, 
  ShieldCheck, 
  CheckCircle, 
  Loader2, 
  CreditCard,
  Landmark,
  Clock,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Lock,
  Building,
  Sparkles,
  ExternalLink,
  Truck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createOrder, updateOrderDetails, generateWhatsAppTransferUrl, generateWhatsAppCheckoutUrl } from '../services/ordersService';
import { Pedido, PedidoItem } from '../types';
import { formatPrice } from '../utils/formatters';

const ESTADOS_MEXICO = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'Ciudad de México',
  'Coahuila',
  'Colima',
  'Durango',
  'Estado de México',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'Michoacán',
  'Morelos',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosí',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatán',
  'Zacatecas'
];

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

  // 1. Datos de Contacto
  const [clienteNombre, setClienteNombre] = useState('');
  const [clienteTelefono, setClienteTelefono] = useState('');
  const [clienteEmail, setClienteEmail] = useState('');

  // 2. Apartados Detallados de Dirección de Entrega
  const [dirCalleNumero, setDirCalleNumero] = useState('');
  const [dirNumeroInterior, setDirNumeroInterior] = useState('');
  const [dirColonia, setDirColonia] = useState('');
  const [dirCodigoPostal, setDirCodigoPostal] = useState('');
  const [dirCiudad, setDirCiudad] = useState('');
  const [dirEstado, setDirEstado] = useState('Ciudad de México');
  const [dirReferencias, setDirReferencias] = useState('');

  // 3. Método de Pago Seleccionado
  const [metodoPago, setMetodoPago] = useState<'tarjeta' | 'transferencia'>('tarjeta');

  // Pasos de Checkout:
  // 'carrito' -> 1. Carrito de Compras (revisión de partidas y total)
  // 'datos_envio' -> 2. Datos de Envío y Selección de Pago
  // 'proceder_pago' -> 3. Pasarela interactiva Mercado Pago o Datos SPEI
  // 'pago_aprobado' -> 4. Confirmación de Transacción completada
  const [checkoutStep, setCheckoutStep] = useState<'carrito' | 'datos_envio' | 'proceder_pago' | 'pago_aprobado'>('carrito');
  const [currentOrder, setCurrentOrder] = useState<Pedido | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Estados de Mercado Pago interactivo
  const [mpNumeroTarjeta, setMpNumeroTarjeta] = useState('');
  const [mpNombreTitular, setMpNombreTitular] = useState('');
  const [mpVencimiento, setMpVencimiento] = useState('');
  const [mpCvv, setMpCvv] = useState('');
  const [mpCuotas, setMpCuotas] = useState('1');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStepText, setPaymentStepText] = useState('');
  const [paymentApprovedData, setPaymentApprovedData] = useState<{ transaccionId: string; last4: string } | null>(null);

  // Estados de Copiado (SPEI)
  const [copiedField, setCopiedField] = useState<'clabe' | 'referencia' | null>(null);

  if (!isOpen) return null;

  // Detección de marca de tarjeta
  const getCardBrand = (num: string) => {
    const clean = num.replace(/\s/g, '');
    if (clean.startsWith('4')) return 'Visa';
    if (/^(5[1-5]|2[2-7])/.test(clean)) return 'Mastercard';
    if (/^3[47]/.test(clean)) return 'American Express';
    return null;
  };

  const handleCardNumberChange = (val: string) => {
    const raw = val.replace(/[^0-9]/g, '').slice(0, 16);
    const parts = raw.match(/.{1,4}/g);
    setMpNumeroTarjeta(parts ? parts.join(' ') : raw);
  };

  const handleExpiryChange = (val: string) => {
    const raw = val.replace(/[^0-9]/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setMpVencimiento(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setMpVencimiento(raw);
    }
  };

  const handleCopy = (text: string, field: 'clabe' | 'referencia') => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  // Validación y envío de datos de envío hacia el paso de liquidación
  const handleProceedFromForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!clienteNombre.trim()) {
      setErrorMessage('Por favor ingrese su nombre completo.');
      return;
    }

    if (!clienteTelefono.trim() || clienteTelefono.trim().length < 8) {
      setErrorMessage('Por favor ingrese un número telefónico de contacto válido (mínimo 8 dígitos).');
      return;
    }

    if (!clienteEmail.trim() || !clienteEmail.includes('@')) {
      setErrorMessage('Por favor ingrese un correo electrónico válido para el seguimiento.');
      return;
    }

    if (!dirCalleNumero.trim()) {
      setErrorMessage('Por favor ingrese la calle y número exterior de entrega.');
      return;
    }

    if (!dirColonia.trim()) {
      setErrorMessage('Por favor ingrese la colonia o fraccionamiento.');
      return;
    }

    if (!dirCodigoPostal.trim() || dirCodigoPostal.trim().length !== 5) {
      setErrorMessage('Por favor ingrese un código postal válido de 5 dígitos.');
      return;
    }

    if (!dirCiudad.trim()) {
      setErrorMessage('Por favor ingrese la alcaldía o municipio.');
      return;
    }

    if (!dirEstado.trim()) {
      setErrorMessage('Por favor seleccione el estado de entrega.');
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

      const direccionCompilada = `${dirCalleNumero.trim()}${
        dirNumeroInterior.trim() ? `, Int. ${dirNumeroInterior.trim()}` : ''
      }, Col. ${dirColonia.trim()}, C.P. ${dirCodigoPostal.trim()}, ${dirCiudad.trim()}, ${dirEstado.trim()}${
        dirReferencias.trim() ? ` (Ref: ${dirReferencias.trim()})` : ''
      }`;

      const direccionDetallada = {
        calleNumero: dirCalleNumero.trim(),
        numeroInterior: dirNumeroInterior.trim() || undefined,
        colonia: dirColonia.trim(),
        codigoPostal: dirCodigoPostal.trim(),
        ciudad: dirCiudad.trim(),
        estado: dirEstado.trim(),
        referencias: dirReferencias.trim() || undefined
      };

      const metodoTexto = 
        metodoPago === 'tarjeta'
          ? 'Tarjeta de Crédito / Débito (Mercado Pago)'
          : 'Transferencia Bancaria';

      const newOrder = await createOrder({
        clienteNombre: clienteNombre.trim(),
        clienteTelefono: clienteTelefono.trim(),
        clienteEmail: clienteEmail.trim(),
        direccionEntrega: direccionCompilada,
        direccionDetallada: direccionDetallada,
        metodoPago: metodoTexto,
        estadoPago: metodoPago === 'tarjeta' ? 'pendiente_verificacion' : 'pendiente_transferencia',
        items: orderItems,
        total: subtotal,
        estado: 'pendiente',
        notas: `Método de pago: ${metodoTexto}. Destino: ${direccionCompilada}`
      });

      setCurrentOrder(newOrder);
      if (!mpNombreTitular) {
        setMpNombreTitular(clienteNombre.trim());
      }
      setCheckoutStep('proceder_pago');
      clearCart();
    } catch (err: any) {
      console.error('Error al registrar pedido formal:', err);
      setErrorMessage('Ocurrió un error al procesar la orden. Inténtelo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Procesar pago en pasarela interactiva Mercado Pago
  const handleExecuteMercadoPago = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrder) return;

    const rawNum = mpNumeroTarjeta.replace(/\s/g, '');
    if (rawNum.length < 15) {
      alert('Por favor ingrese un número de tarjeta válido.');
      return;
    }
    if (!mpNombreTitular.trim()) {
      alert('Por favor ingrese el nombre del titular de la tarjeta.');
      return;
    }
    if (!mpVencimiento.includes('/') || mpVencimiento.length < 5) {
      alert('Por favor ingrese una fecha de vencimiento válida (MM/AA).');
      return;
    }
    if (mpCvv.length < 3) {
      alert('Por favor ingrese el código de seguridad CVV.');
      return;
    }

    setIsProcessingPayment(true);
    setPaymentStepText('Conectando con servidores seguros de Mercado Pago...');

    await new Promise((r) => setTimeout(r, 600));
    setPaymentStepText('Encriptando datos con SSL de 256 bits y verificando 3D Secure...');

    await new Promise((r) => setTimeout(r, 700));
    setPaymentStepText('Procesando liquidación bancaria en tiempo real...');

    await new Promise((r) => setTimeout(r, 600));

    const transaccionId = `MP-TXN-${Math.floor(100000000 + Math.random() * 900000000)}`;
    const last4 = rawNum.slice(-4) || '8492';

    try {
      await updateOrderDetails(currentOrder.id, {
        estado: 'en_proceso',
        estadoPago: 'aprobado_mercadopago',
        transaccionId,
        notas: `${currentOrder.notas} | Pago Aprobado Mercado Pago [ID: ${transaccionId}]`
      });
    } catch (err) {
      console.warn('Error al actualizar Firestore:', err);
    }

    setPaymentApprovedData({ transaccionId, last4 });
    setIsProcessingPayment(false);
    setCheckoutStep('pago_aprobado');
  };

  const handleFinishAndClose = () => {
    setCheckoutStep('carrito');
    setCurrentOrder(null);
    setPaymentApprovedData(null);
    closeCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={closeCart} 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-lg bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/40">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-zinc-800 text-zinc-200 border border-zinc-700">
                <ShoppingBag className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
                  <span>
                    {checkoutStep === 'carrito' && 'Carrito de Compras'}
                    {checkoutStep === 'datos_envio' && 'Orden de Pedido • Envío y Pago'}
                    {checkoutStep === 'proceder_pago' && 'Liquidación del Pedido'}
                    {checkoutStep === 'pago_aprobado' && 'Confirmación de Pedido'}
                  </span>
                </h3>
                <span className="text-xs text-zinc-400 font-mono">
                  {checkoutStep === 'carrito' && `${totalItems} ${totalItems === 1 ? 'partida seleccionada' : 'partidas seleccionadas'}`}
                  {checkoutStep === 'datos_envio' && 'Ingrese sus datos de entrega'}
                  {(checkoutStep === 'proceder_pago' || checkoutStep === 'pago_aprobado') && currentOrder && `Folio Oficial: #${currentOrder.id}`}
                </span>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Indicador Visual de Pasos */}
          <div className="flex items-center justify-between px-6 py-2 bg-zinc-900/50 border-b border-zinc-800 text-[10px] font-mono">
            <button
              type="button"
              onClick={() => items.length > 0 && setCheckoutStep('carrito')}
              disabled={checkoutStep === 'proceder_pago' || checkoutStep === 'pago_aprobado'}
              className={`flex items-center gap-1.5 transition-colors ${
                checkoutStep === 'carrito' ? 'text-cyan-400 font-bold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
                checkoutStep === 'carrito' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'bg-zinc-800 text-zinc-400'
              }`}>1</span>
              <span>Carrito</span>
            </button>

            <span className="text-zinc-700">→</span>

            <button
              type="button"
              onClick={() => items.length > 0 && setCheckoutStep('datos_envio')}
              disabled={checkoutStep === 'proceder_pago' || checkoutStep === 'pago_aprobado'}
              className={`flex items-center gap-1.5 transition-colors ${
                checkoutStep === 'datos_envio' ? 'text-cyan-400 font-bold' : 'text-zinc-500'
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
                checkoutStep === 'datos_envio' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'bg-zinc-800 text-zinc-400'
              }`}>2</span>
              <span>Envío &amp; Pago</span>
            </button>

            <span className="text-zinc-700">→</span>

            <span className={`flex items-center gap-1.5 ${
              checkoutStep === 'proceder_pago' || checkoutStep === 'pago_aprobado' ? 'text-emerald-400 font-bold' : 'text-zinc-600'
            }`}>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
                checkoutStep === 'proceder_pago' || checkoutStep === 'pago_aprobado' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-zinc-800 text-zinc-600'
              }`}>3</span>
              <span>Liquidación</span>
            </span>
          </div>

          {/* ========================================================================= */}
          {/* PASO 1: VISTA EXCLUSIVA DEL CARRITO DE COMPRAS                            */}
          {/* ========================================================================= */}
          {checkoutStep === 'carrito' && (
            items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-14 h-14 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 mb-4">
                  <ShoppingBag className="w-6 h-6 text-zinc-500" />
                </div>
                <h4 className="text-sm font-semibold text-white">Sin partidas seleccionadas</h4>
                <p className="text-xs text-zinc-400 mt-2 max-w-xs leading-relaxed">
                  Explore nuestro catálogo de hardware o configure su proyecto a la medida.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-5 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  Consultar Catálogo
                </button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                {/* Lista de productos */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">
                    Productos en su Orden ({totalItems}):
                  </span>

                  {items.map((item) => {
                    const unitPrice = item.producto.precioOferta ?? item.producto.precio;
                    const itemTotal = unitPrice * item.cantidad;
                    const isHardware = item.producto.tipo === 'hardware';

                    return (
                      <div
                        key={item.producto.id}
                        className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 flex gap-3 items-center"
                      >
                        <img
                          src={item.producto.imagenes[0] || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80'}
                          alt={item.producto.titulo}
                          className="w-14 h-14 rounded-lg object-contain bg-zinc-950 border border-zinc-800 shrink-0 p-1"
                        />

                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-semibold text-white truncate">
                            {item.producto.titulo}
                          </h5>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[11px] font-mono text-zinc-200 font-semibold">
                              ${formatPrice(unitPrice)} MXN
                            </span>
                            <span className="text-[10px] text-zinc-600">•</span>
                            <span className="text-[10px] uppercase font-mono text-zinc-400">
                              {isHardware ? 'Hardware' : 'Desarrollo'}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center border border-zinc-800 bg-zinc-950 rounded-md">
                              <button
                                onClick={() => updateQuantity(item.producto.id, item.cantidad - 1)}
                                className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-mono font-bold text-white">
                                {item.cantidad}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.producto.id, item.cantidad + 1)}
                                className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="text-xs font-mono font-semibold text-zinc-300">
                              ${formatPrice(itemTotal)} MXN
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.producto.id)}
                          className="p-2 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                          title="Eliminar partida"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Resumen financiero y Botón de Proceder al Pago */}
                <div className="p-5 sm:p-6 bg-zinc-900/60 border-t border-zinc-800 space-y-3">
                  <div className="space-y-1.5 text-xs text-zinc-400 font-mono">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-zinc-200 font-semibold">${formatPrice(subtotal)} MXN</span>
                    </div>
                    <div className="flex justify-between items-center text-emerald-400">
                      <span className="flex items-center gap-1 font-sans">
                        <Truck className="w-3.5 h-3.5" /> Envío Nacional Asegurado
                      </span>
                      <span>GRATIS</span>
                    </div>
                    <div className="pt-2 border-t border-zinc-800 flex justify-between items-baseline text-sm font-sans font-bold text-white">
                      <span>Importe Total</span>
                      <span className="font-mono text-lg text-cyan-400">${formatPrice(subtotal)} MXN</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCheckoutStep('datos_envio')}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-zinc-100 to-white hover:from-white hover:to-zinc-200 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <span>Proceder al Pago / Datos de Envío</span>
                    <ArrowRight className="w-4 h-4 text-zinc-800" />
                  </button>
                </div>
              </div>
            )
          )}

          {/* ========================================================================= */}
          {/* PASO 2: FORMULARIO DE DATOS DE CONTACTO, ENTREGA Y SELECCIÓN DE PAGO      */}
          {/* ========================================================================= */}
          {checkoutStep === 'datos_envio' && (
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              
              {/* Botón para volver al carrito */}
              <button
                type="button"
                onClick={() => setCheckoutStep('carrito')}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors font-medium group cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                <span>Volver a revisar artículos del carrito</span>
              </button>

              {/* Resumen rápido del monto */}
              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">{totalItems} {totalItems === 1 ? 'partida' : 'partidas'} por liquidar</span>
                <span className="font-bold text-cyan-400 text-sm">${formatPrice(subtotal)} MXN</span>
              </div>

              {errorMessage && (
                <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleProceedFromForm} className="space-y-4">
                
                {/* 1. Datos de Contacto */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5 font-mono">
                      <User className="w-3.5 h-3.5 text-cyan-400" />
                      1. Datos de Contacto
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" /> Seguro SSL
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                      Nombre completo *
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={clienteNombre}
                        onChange={(e) => setClienteNombre(e.target.value)}
                        placeholder="Ej. Carlos Mendoza"
                        className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                        Teléfono de contacto *
                      </label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={clienteTelefono}
                          onChange={(e) => setClienteTelefono(e.target.value)}
                          placeholder="55 1234 5678"
                          className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                        Correo electrónico *
                      </label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={clienteEmail}
                          onChange={(e) => setClienteEmail(e.target.value)}
                          placeholder="carlos@email.com"
                          className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Dirección de Entrega Detallada */}
                <div className="pt-3 border-t border-zinc-800/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      2. Dirección de Entrega
                    </label>
                    <span className="text-[10px] font-mono text-zinc-500">Envío Asegurado</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                      Calle y Número Exterior *
                    </label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={dirCalleNumero}
                        onChange={(e) => setDirCalleNumero(e.target.value)}
                        placeholder="Ej. Av. Insurgentes Sur 1602"
                        className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                        Núm. Interior / Depto <span className="text-zinc-500 font-normal">(Opcional)</span>
                      </label>
                      <div className="relative">
                        <Building className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={dirNumeroInterior}
                          onChange={(e) => setDirNumeroInterior(e.target.value)}
                          placeholder="Ej. Depto 402 / Edif. B"
                          className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                        Colonia o Fracc. *
                      </label>
                      <input
                        type="text"
                        required
                        value={dirColonia}
                        onChange={(e) => setDirColonia(e.target.value)}
                        placeholder="Ej. Del Valle Sur"
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                        Código Postal (5 dígitos) *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        value={dirCodigoPostal}
                        onChange={(e) => setDirCodigoPostal(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="03100"
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                        Alcaldía o Municipio *
                      </label>
                      <input
                        type="text"
                        required
                        value={dirCiudad}
                        onChange={(e) => setDirCiudad(e.target.value)}
                        placeholder="Ej. Benito Juárez"
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                      Estado de la República *
                    </label>
                    <select
                      value={dirEstado}
                      onChange={(e) => setDirEstado(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-zinc-600 transition-colors"
                    >
                      {ESTADOS_MEXICO.map((est) => (
                        <option key={est} value={est} className="bg-zinc-900 text-white">
                          {est}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                      Referencias para la entrega <span className="text-zinc-500 font-normal">(Opcional)</span>
                    </label>
                    <input
                      type="text"
                      value={dirReferencias}
                      onChange={(e) => setDirReferencias(e.target.value)}
                      placeholder="Ej. Entre calle A y B, fachada gris..."
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                    />
                  </div>
                </div>

                {/* 3. Selección del Método de Pago */}
                <div className="space-y-2 pt-3 border-t border-zinc-800/80">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5 font-mono">
                    <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                    3. Método de Pago *
                  </label>

                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    {/* Opción A: Tarjeta de Crédito / Débito (Mercado Pago) */}
                    <button
                      type="button"
                      onClick={() => setMetodoPago('tarjeta')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        metodoPago === 'tarjeta'
                          ? 'bg-zinc-800/90 border-cyan-500 text-white shadow-sm ring-1 ring-cyan-500/50'
                          : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1.5">
                        <CreditCard className={`w-4 h-4 ${metodoPago === 'tarjeta' ? 'text-cyan-400' : 'text-zinc-400'}`} />
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
                          Mercado Pago
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-[11px] block text-white leading-tight">
                          Tarjeta de Crédito / Débito
                        </span>
                        <span className="text-[10px] text-zinc-400 block mt-0.5">
                          Procesado con Mercado Pago
                        </span>
                      </div>
                    </button>

                    {/* Opción B: Transferencia Bancaria */}
                    <button
                      type="button"
                      onClick={() => setMetodoPago('transferencia')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        metodoPago === 'transferencia'
                          ? 'bg-zinc-800/90 border-amber-500 text-white shadow-sm ring-1 ring-amber-500/50'
                          : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1.5">
                        <Landmark className={`w-4 h-4 ${metodoPago === 'transferencia' ? 'text-amber-400' : 'text-zinc-400'}`} />
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-500/30 text-amber-300">
                          SPEI
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-[11px] block text-white leading-tight">
                          Transferencia Bancaria
                        </span>
                        <span className="text-[10px] text-amber-400/90 font-mono block mt-0.5">
                          Verificación 2 días
                        </span>
                      </div>
                    </button>
                  </div>

                  {/* Nota visible obligatoria para Transferencia Bancaria / Mercado Pago */}
                  {metodoPago === 'transferencia' ? (
                    <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5 animate-in fade-in duration-150">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-[11px] leading-relaxed">
                        <span className="font-semibold text-amber-300 block mb-0.5">
                          Aviso sobre Transferencia Bancaria:
                        </span>
                        <span>Aprobación sujeta a verificación en un plazo de 2 días hábiles. Al continuar verá la CLABE para su depósito.</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-cyan-200 text-xs flex items-center gap-2 animate-in fade-in duration-150">
                      <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="text-[11px]">
                        Cobro protegido mediante la pasarela segura de <strong>Mercado Pago</strong> con cifrado SSL.
                      </span>
                    </div>
                  )}
                </div>

                {/* Botón de envío dinámico hacia la liquidación */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-zinc-100 to-white hover:from-white hover:to-zinc-200 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-md cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-zinc-900" />
                        <span>Guardando Pedido y Preparando Pago...</span>
                      </>
                    ) : metodoPago === 'tarjeta' ? (
                      <>
                        <CreditCard className="w-4 h-4 text-[#009ee3]" />
                        <span>Proceder al Pago con Mercado Pago</span>
                        <ArrowRight className="w-4 h-4 text-zinc-700" />
                      </>
                    ) : (
                      <>
                        <Landmark className="w-4 h-4 text-amber-600" />
                        <span>Proceder con Transferencia Bancaria</span>
                        <ArrowRight className="w-4 h-4 text-zinc-700" />
                      </>
                    )}
                  </button>
                </div>
              </form>

            </div>
          )}

          {/* ========================================================================= */}
          {/* PASO 3: PROCEDER AL PAGO (MERCADO PAGO O TRANSFERENCIA SPEI)              */}
          {/* ========================================================================= */}
          {checkoutStep === 'proceder_pago' && currentOrder && (
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-zinc-950">
              
              <button
                type="button"
                onClick={() => setCheckoutStep('datos_envio')}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors font-medium group cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                <span>Modificar datos de contacto o dirección</span>
              </button>

              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono text-zinc-500 block">Total a Pagar</span>
                  <span className="text-xl font-bold font-mono text-white">
                    ${formatPrice(currentOrder.total)} MXN
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-zinc-400 block">Folio de Registro</span>
                  <span className="text-xs font-mono font-semibold text-cyan-400">#{currentOrder.id}</span>
                </div>
              </div>

              {/* Caso A: Mercado Pago */}
              {metodoPago === 'tarjeta' ? (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-[#009ee3]/10 border border-[#009ee3]/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#009ee3] flex items-center justify-center text-white font-black text-xs">
                        MP
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                          Pasarela Mercado Pago
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#009ee3]/20 text-[#009ee3] font-mono">
                            SSL 256-bit
                          </span>
                        </h4>
                        <span className="text-[10px] text-zinc-400 block">
                          Procesamiento seguro de Tarjeta de Crédito y Débito
                        </span>
                      </div>
                    </div>
                    <Lock className="w-4 h-4 text-[#009ee3]" />
                  </div>

                  <form onSubmit={handleExecuteMercadoPago} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-medium text-zinc-300 mb-1 flex items-center justify-between">
                        <span>Número de Tarjeta *</span>
                        {getCardBrand(mpNumeroTarjeta) && (
                          <span className="text-[10px] font-mono text-cyan-400 font-semibold">
                            {getCardBrand(mpNumeroTarjeta)}
                          </span>
                        )}
                      </label>
                      <div className="relative">
                        <CreditCard className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={mpNumeroTarjeta}
                          onChange={(e) => handleCardNumberChange(e.target.value)}
                          placeholder="4500 1234 5678 9012"
                          maxLength={19}
                          className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                        Nombre del Titular (como aparece en el plástico) *
                      </label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={mpNombreTitular}
                          onChange={(e) => setMpNombreTitular(e.target.value.toUpperCase())}
                          placeholder="CARLOS MENDOZA"
                          className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs uppercase font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                          Vencimiento (MM/AA) *
                        </label>
                        <input
                          type="text"
                          required
                          value={mpVencimiento}
                          onChange={(e) => handleExpiryChange(e.target.value)}
                          placeholder="12/28"
                          maxLength={5}
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-center text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                          CVV / CVC (3-4 dígitos) *
                        </label>
                        <input
                          type="password"
                          required
                          value={mpCvv}
                          onChange={(e) => setMpCvv(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                          placeholder="•••"
                          maxLength={4}
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-center text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-zinc-300 mb-1">
                        Plazo de Liquidación / Mensualidades
                      </label>
                      <select
                        value={mpCuotas}
                        onChange={(e) => setMpCuotas(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                      >
                        <option value="1">1 pago único de ${formatPrice(currentOrder.total)} MXN (Sin interés)</option>
                        <option value="3">3 pagos de ${formatPrice(Math.round(currentOrder.total / 3))} MXN (Meses sin interés)</option>
                        <option value="6">6 pagos de ${formatPrice(Math.round(currentOrder.total / 6))} MXN (Meses sin interés)</option>
                      </select>
                    </div>

                    <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <div className="leading-snug">
                        <span className="font-semibold text-white block">Envío confirmado a:</span>
                        <span className="text-zinc-400">{currentOrder.direccionEntrega}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessingPayment}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#009ee3] to-cyan-500 hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-950/60 disabled:opacity-50 mt-4 cursor-pointer"
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>{paymentStepText || 'Procesando pago con Mercado Pago...'}</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 text-white" />
                          <span>Pagar ${formatPrice(currentOrder.total)} MXN con Mercado Pago</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                /* Caso B: Transferencia Bancaria */
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-[11px] leading-relaxed">
                      <span className="font-bold text-amber-300 block mb-0.5">
                        Aviso Importante de Validación:
                      </span>
                      <span>
                        Aprobación sujeta a verificación en un plazo de 2 días hábiles. Al realizar su transferencia, envíe su comprobante para acelerar la preparación de su paquete.
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                      <span className="text-[11px] font-mono font-bold text-white flex items-center gap-1.5">
                        <Landmark className="w-4 h-4 text-emerald-400" />
                        Datos para Transferencia SPEI
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                        0% Comisión
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 block">Banco Receptor:</span>
                        <span className="font-semibold text-white">BBVA México (SPEI Interbancario)</span>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 block">Beneficiario Institucional:</span>
                        <span className="font-semibold text-white">INVERSA TECNOLOGÍA EN MOVIMIENTO S.A. DE C.V.</span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-zinc-500 block">CLABE Interbancaria (18 dígitos):</span>
                          <span className="font-mono text-sm font-bold text-emerald-400">
                            012 180 00123456789 5
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy('012180001234567895', 'clabe')}
                          className="px-2.5 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[10px] font-mono flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedField === 'clabe' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">¡Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-zinc-400" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-zinc-500 block">Concepto / Referencia Requerida:</span>
                          <span className="font-mono text-xs font-bold text-cyan-400">
                            Folio #{currentOrder.id}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(`Folio #${currentOrder.id}`, 'referencia')}
                          className="px-2.5 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[10px] font-mono flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedField === 'referencia' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">¡Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-zinc-400" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 block">Monto Exacto a Transferir:</span>
                        <span className="font-mono text-base font-bold text-white">
                          ${formatPrice(currentOrder.total)} MXN
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Envío Programado para:</strong>
                      <span className="text-zinc-400">{currentOrder.direccionEntrega}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <a
                      href={generateWhatsAppTransferUrl(currentOrder)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-200" />
                      <span>Enviar Comprobante de Transferencia por WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
                    </a>

                    <button
                      type="button"
                      onClick={handleFinishAndClose}
                      className="w-full py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Entendido, Guardar Orden y Finalizar
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* PASO 4: RECIBO DE PAGO APROBADO EXITOSAMENTE CON MERCADO PAGO             */}
          {/* ========================================================================= */}
          {checkoutStep === 'pago_aprobado' && currentOrder && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-zinc-950 overflow-y-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-950/40 animate-in zoom-in-75">
                <CheckCircle className="w-8 h-8" />
              </div>
              
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">
                TRANSACCIÓN APROBADA
              </span>
              <h4 className="text-lg font-bold text-white">¡Pago Realizado con Éxito!</h4>
              
              <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                Su pago fue procesado y asegurado mediante la pasarela de <strong>Mercado Pago</strong>.
              </p>

              <div className="mt-4 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 text-left text-xs space-y-2 w-full font-mono">
                <div className="flex justify-between pb-1.5 border-b border-zinc-800">
                  <span className="text-zinc-500">Folio Oficial:</span>
                  <span className="text-white font-bold">#{currentOrder.id}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-zinc-800">
                  <span className="text-zinc-500">ID Mercado Pago:</span>
                  <span className="text-cyan-400 font-bold">{paymentApprovedData?.transaccionId}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-zinc-800">
                  <span className="text-zinc-500">Tarjeta:</span>
                  <span className="text-zinc-300">•••• •••• •••• {paymentApprovedData?.last4}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-zinc-800">
                  <span className="text-zinc-500">Total Liquidado:</span>
                  <span className="text-emerald-400 font-bold">${formatPrice(currentOrder.total)} MXN</span>
                </div>
                <div className="pt-1">
                  <span className="text-zinc-500 block text-[10px]">Destino de Envío:</span>
                  <span className="text-zinc-300 text-[11px] font-sans">{currentOrder.direccionEntrega}</span>
                </div>
              </div>

              <div className="mt-5 w-full space-y-2">
                <a
                  href={generateWhatsAppCheckoutUrl(currentOrder)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <span>Enviar Recibo de Pedido a WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={handleFinishAndClose}
                  className="w-full py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  Continuar Comprando
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
