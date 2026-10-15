import React, { useState, useEffect, useMemo } from 'react';
import { 
  Package, 
  ShoppingBag, 
  Plus, 
  Trash2, 
  Edit, 
  UploadCloud, 
  LogOut, 
  RefreshCw, 
  Cpu, 
  DollarSign, 
  Clock, 
  User, 
  Phone, 
  X, 
  Loader2, 
  CheckCircle2,
  FolderTree,
  Tag,
  RotateCcw,
  Code2,
  AlertTriangle,
  Search,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  getProductos, 
  getCategorias, 
  createProducto, 
  updateProducto, 
  deleteProducto, 
  uploadProductImage,
  createCategoria,
  updateCategoria,
  deleteCategoria,
  resetCategoriasToDefault
} from '../services/productsService';
import { getOrders, updateOrderStatus } from '../services/ordersService';
import { formatPrice } from '../utils/formatters';
import { Producto, Categoria, Pedido, EstadoPedido, TipoProducto } from '../types';
import { isFirebaseConfigured } from '../lib/firebase';
import { Link } from 'react-router-dom';
import { InversaLogo } from '../components/InversaLogo';

export const AdminPage: React.FC = () => {
  const { logout } = useAuth();

  const [activeTab, setActiveTab] = useState<'catalogo' | 'categorias' | 'pedidos'>('catalogo');
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  // Estado para Gestión de Categorías
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Categoria | null>(null);
  const [catFormNombre, setCatFormNombre] = useState('');
  const [catFormSlug, setCatFormSlug] = useState('');
  const [catFormTipo, setCatFormTipo] = useState<TipoProducto>('hardware');
  const [catFormDescripcion, setCatFormDescripcion] = useState('');
  const [catSaving, setCatSaving] = useState(false);
  const [deleteCategoryConfirm, setDeleteCategoryConfirm] = useState<Categoria | null>(null);
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  const [categoryTypeFilter, setCategoryTypeFilter] = useState<'todos' | 'hardware' | 'servicio_web'>('todos');

  // Form State para Crear / Editar Producto
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);
  const [formTipo, setFormTipo] = useState<TipoProducto>('hardware');
  const [formTitulo, setFormTitulo] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formDescripcion, setFormDescripcion] = useState('');
  const [formCategoriaId, setFormCategoriaId] = useState('');
  const [formPrecio, setFormPrecio] = useState<number>(0);
  const [formPrecioOferta, setFormPrecioOferta] = useState<number | undefined>(undefined);
  const [formStock, setFormStock] = useState<number>(1);
  const [formDestacado, setFormDestacado] = useState(false);
  const [formDemoUrl, setFormDemoUrl] = useState('');
  const [formImagenes, setFormImagenes] = useState<string[]>([]);
  const [formSpecs, setFormSpecs] = useState<Array<{ key: string; value: string }>>([
    { key: 'Garantía', value: '1 Año Oficial' }
  ]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [formSaving, setFormSaving] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [prodsData, catsData, ordsData] = await Promise.all([
        getProductos(),
        getCategorias(),
        getOrders()
      ]);
      setProductos(prodsData);
      setCategorias(catsData);
      setPedidos(ordsData);
    } catch (e) {
      console.error('Error al cargar datos en admin:', e);
    } finally {
      setLoading(false);
    }
  };

  const totalActivos = productos.filter((p) => p.activo).length;
  const totalStockHardware = productos
    .filter((p) => p.tipo === 'hardware')
    .reduce((sum, p) => sum + (p.stock || 0), 0);
  const pedidosPendientes = pedidos.filter((p) => p.estado === 'pendiente').length;
  const ingresosEstimados = pedidos.reduce((sum, p) => sum + p.total, 0);

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormTipo('hardware');
    setFormTitulo('');
    setFormSlug('');
    setFormDescripcion('');
    setFormCategoriaId(categorias[0]?.id || 'cat-laptops');
    setFormPrecio(4500);
    setFormPrecioOferta(undefined);
    setFormStock(5);
    setFormDestacado(false);
    setFormDemoUrl('');
    setFormImagenes([
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'
    ]);
    setFormSpecs([
      { key: 'Póliza de Garantía', value: '1 Año con Centro Oficial' },
      { key: 'Disponibilidad', value: 'Inmediata en Almacén' }
    ]);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: Producto) => {
    setEditingProduct(p);
    setFormTipo(p.tipo);
    setFormTitulo(p.titulo);
    setFormSlug(p.slug);
    setFormDescripcion(p.descripcion);
    setFormCategoriaId(p.categoriaId);
    setFormPrecio(p.precio);
    setFormPrecioOferta(p.precioOferta);
    setFormStock(p.stock);
    setFormDestacado(p.destacado);
    setFormDemoUrl(p.demoUrl || '');
    setFormImagenes(p.imagenes.length ? p.imagenes : []);
    setFormSpecs(
      Object.entries(p.specs || {}).map(([key, value]) => ({ key, value }))
    );
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const url = await uploadProductImage(file);
      setFormImagenes((prev) => [...prev, url]);
      setFeedbackMsg({ type: 'success', text: 'Archivo cargado en Firebase Storage correctamente.' });
      setTimeout(() => setFeedbackMsg(null), 3000);
    } catch (err: any) {
      console.error('Error al subir imagen:', err);
      setFeedbackMsg({ type: 'error', text: 'Error al transferir la imagen a Storage.' });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitulo.trim()) return;

    setFormSaving(true);
    try {
      const specsRecord: Record<string, string> = {};
      formSpecs.forEach((item) => {
        if (item.key.trim() && item.value.trim()) {
          specsRecord[item.key.trim()] = item.value.trim();
        }
      });

      const selectedCat = categorias.find((c) => c.id === formCategoriaId);
      const categoriaNombre = selectedCat ? selectedCat.nombre : 'General';

      const productPayload = {
        titulo: formTitulo.trim(),
        slug: formSlug.trim() || formTitulo.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        descripcion: formDescripcion.trim(),
        categoriaId: formCategoriaId,
        categoriaNombre,
        tipo: formTipo,
        precio: Number(formPrecio),
        precioOferta: formPrecioOferta ? Number(formPrecioOferta) : undefined,
        imagenes: formImagenes.length > 0 ? formImagenes : ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'],
        stock: formTipo === 'hardware' ? Number(formStock) : 999,
        specs: specsRecord,
        demoUrl: formDemoUrl.trim() || undefined,
        destacado: formDestacado,
        activo: true
      };

      if (editingProduct) {
        await updateProducto(editingProduct.id, productPayload);
        setFeedbackMsg({ type: 'success', text: 'Registro actualizado en base de datos.' });
      } else {
        await createProducto(productPayload);
        setFeedbackMsg({ type: 'success', text: 'Registro creado exitosamente en Firestore.' });
      }

      setIsModalOpen(false);
      loadAllData();
      setTimeout(() => setFeedbackMsg(null), 3500);
    } catch (err: any) {
      console.error('Error al guardar producto:', err);
      setFeedbackMsg({ type: 'error', text: 'Error al registrar el producto.' });
    } finally {
      setFormSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('¿Confirma la eliminación del artículo seleccionado?')) {
      await deleteProducto(id);
      loadAllData();
    }
  };

  const filteredCategorias = useMemo(() => {
    let list = categorias;
    if (categoryTypeFilter !== 'todos') {
      list = list.filter((c) => c.tipo === categoryTypeFilter);
    }
    if (categorySearchQuery.trim()) {
      const q = categorySearchQuery.toLowerCase().trim();
      list = list.filter(
        (c) => c.nombre.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)
      );
    }
    return list;
  }, [categorias, categoryTypeFilter, categorySearchQuery]);

  const handleOpenCreateCategoryModal = () => {
    setEditingCategory(null);
    setCatFormNombre('');
    setCatFormSlug('');
    setCatFormTipo('hardware');
    setCatFormDescripcion('');
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategoryModal = (cat: Categoria) => {
    setEditingCategory(cat);
    setCatFormNombre(cat.nombre);
    setCatFormSlug(cat.slug);
    setCatFormTipo(cat.tipo);
    setCatFormDescripcion(cat.descripcion || '');
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catFormNombre.trim()) return;

    setCatSaving(true);
    try {
      const slug = catFormSlug.trim() || catFormNombre.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      if (editingCategory) {
        await updateCategoria(editingCategory.id, {
          nombre: catFormNombre.trim(),
          slug,
          tipo: catFormTipo,
          descripcion: catFormDescripcion.trim() || undefined
        });
        setFeedbackMsg({ type: 'success', text: `Categoría "${catFormNombre}" actualizada correctamente.` });
      } else {
        await createCategoria({
          nombre: catFormNombre.trim(),
          slug,
          tipo: catFormTipo,
          descripcion: catFormDescripcion.trim() || undefined
        });
        setFeedbackMsg({ type: 'success', text: `Categoría "${catFormNombre}" creada exitosamente.` });
      }
      setIsCategoryModalOpen(false);
      await loadAllData();
    } catch (err: any) {
      console.error('Error al guardar categoría:', err);
      setFeedbackMsg({ type: 'error', text: 'Error al procesar la categoría.' });
    } finally {
      setCatSaving(false);
      setTimeout(() => setFeedbackMsg(null), 3500);
    }
  };

  const handleDeleteCategory = async (cat: Categoria) => {
    try {
      await deleteCategoria(cat.id);
      setDeleteCategoryConfirm(null);
      setFeedbackMsg({ type: 'success', text: `Categoría "${cat.nombre}" eliminada correctamente.` });
      await loadAllData();
    } catch (err: any) {
      console.error('Error al eliminar categoría:', err);
      setFeedbackMsg({ type: 'error', text: 'Error al eliminar la categoría.' });
    } finally {
      setTimeout(() => setFeedbackMsg(null), 3500);
    }
  };

  const handleResetCategories = async () => {
    if (!window.confirm('¿Deseas restablecer todas las categorías a los valores iniciales predeterminados?')) return;
    try {
      await resetCategoriasToDefault();
      setFeedbackMsg({ type: 'success', text: 'Categorías restablecidas al conjunto inicial predeterminado.' });
      await loadAllData();
    } catch (err) {
      console.error('Error al restablecer categorías:', err);
    } finally {
      setTimeout(() => setFeedbackMsg(null), 3500);
    }
  };

  const handleQuickStockChange = async (id: string, newStock: number) => {
    if (newStock < 0) return;
    await updateProducto(id, { stock: newStock });
    setProductos((prev) => prev.map((p) => (p.id === id ? { ...p, stock: newStock } : p)));
  };

  const handleUpdateOrderStatus = async (orderId: string, status: EstadoPedido) => {
    await updateOrderStatus(orderId, status);
    setPedidos((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, estado: status } : ord))
    );
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 pb-20">
      
      {/* Top Admin Header */}
      <header className="border-b border-[#1E293B] bg-[#0F172A] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center group">
              <InversaLogo size="sm" showText={true} animated={false} />
            </Link>

            <span className="hidden sm:inline-block h-6 w-px bg-[#1E293B]" />

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
              <span className={`w-2 h-2 rounded-full ${isFirebaseConfigured ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span className="text-slate-400">
                {isFirebaseConfigured ? 'Firebase Cloud Conectado' : 'Demostración Local'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-3.5 py-1.5 rounded-lg border border-[#1E293B] text-xs text-slate-300 hover:text-white"
            >
              Ver Portal Público
            </Link>

            <button
              onClick={() => logout()}
              className="px-3.5 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Feedback Alert */}
        {feedbackMsg && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-xs font-semibold ${
            feedbackMsg.type === 'success'
              ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300'
              : 'bg-red-950/40 border border-red-500/40 text-red-300'
          }`}>
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{feedbackMsg.text}</span>
          </div>
        )}

        {/* KPI Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-xl bg-[#0F172A] border border-[#1E293B] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">Catálogo Activo</span>
              <span className="text-2xl font-bold font-mono text-white">{totalActivos}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Partidas registradas</span>
            </div>
            <div className="p-3 rounded-lg bg-[#080C14] text-cyan-400 border border-[#1E293B]">
              <Package className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#0F172A] border border-[#1E293B] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">Stock Físico Hardware</span>
              <span className="text-2xl font-bold font-mono text-cyan-400">{totalStockHardware}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Unidades en inventario</span>
            </div>
            <div className="p-3 rounded-lg bg-[#080C14] text-blue-400 border border-[#1E293B]">
              <Cpu className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#0F172A] border border-[#1E293B] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">Órdenes Pendientes</span>
              <span className="text-2xl font-bold font-mono text-amber-400">{pedidosPendientes}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Por procesar</span>
            </div>
            <div className="p-3 rounded-lg bg-[#080C14] text-amber-400 border border-[#1E293B]">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#0F172A] border border-[#1E293B] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">Volumen Registrado (MXN)</span>
              <span className="text-2xl font-bold font-mono text-white">${formatPrice(ingresosEstimados)}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">MXN en {pedidos.length} órdenes</span>
            </div>
            <div className="p-3 rounded-lg bg-[#080C14] text-emerald-400 border border-[#1E293B]">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              id="admin-tab-catalogo"
              onClick={() => setActiveTab('catalogo')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'catalogo'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white bg-[#0F172A]'
              }`}
            >
              <Package className="w-4 h-4" />
              Gestión de Catálogo ({productos.length})
            </button>

            <button
              id="admin-tab-categorias"
              onClick={() => setActiveTab('categorias')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'categorias'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white bg-[#0F172A]'
              }`}
            >
              <FolderTree className="w-4 h-4" />
              Categorías ({categorias.length})
            </button>

            <button
              id="admin-tab-pedidos"
              onClick={() => setActiveTab('pedidos')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'pedidos'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white bg-[#0F172A]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Órdenes de Compra ({pedidos.length})
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {activeTab === 'catalogo' && (
              <button
                onClick={handleOpenCreateModal}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                Registrar Partida
              </button>
            )}

            {activeTab === 'categorias' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetCategories}
                  title="Restablecer categorías iniciales por defecto"
                  className="px-3 py-2 rounded-lg bg-[#0F172A] hover:bg-white/5 border border-[#1E293B] text-slate-400 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Restablecer</span>
                </button>

                <button
                  id="admin-btn-nueva-categoria"
                  onClick={handleOpenCreateCategoryModal}
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Nueva Categoría
                </button>
              </div>
            )}

            <button
              onClick={loadAllData}
              className="p-2 rounded-lg bg-[#0F172A] border border-[#1E293B] text-slate-400 hover:text-white"
              title="Actualizar registros"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Tab 1: Catálogo */}
        {activeTab === 'catalogo' && (
          <div className="space-y-4">
            <div className="overflow-x-auto rounded-xl border border-[#1E293B] bg-[#0F172A]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#080C14] text-slate-400 font-mono uppercase text-[10px] border-b border-[#1E293B]">
                  <tr>
                    <th className="py-3.5 px-4">Descripción</th>
                    <th className="py-3.5 px-4">Línea</th>
                    <th className="py-3.5 px-4">Categoría</th>
                    <th className="py-3.5 px-4">Precio (MXN)</th>
                    <th className="py-3.5 px-4">Inventario</th>
                    <th className="py-3.5 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E293B]">
                  {productos.map((prod) => {
                    const isHardware = prod.tipo === 'hardware';
                    return (
                      <tr key={prod.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.imagenes[0] || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80'}
                              alt={prod.titulo}
                              className="w-10 h-10 rounded-lg object-cover border border-white/5"
                            />
                            <div>
                              <span className="font-bold text-white block">{prod.titulo}</span>
                              <span className="text-[10px] font-mono text-slate-500">ID: {prod.id}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                            isHardware ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                          }`}>
                            {isHardware ? 'Hardware' : 'Desarrollo'}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-slate-300">
                          {prod.categoriaNombre}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-mono">
                            <span className="font-bold text-white">${formatPrice(prod.precioOferta ?? prod.precio)} MXN</span>
                            {prod.precioOferta && (
                              <span className="text-[10px] text-slate-500 line-through block">
                                ${formatPrice(prod.precio)} MXN
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          {isHardware ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                min="0"
                                value={prod.stock}
                                onChange={(e) => handleQuickStockChange(prod.id, parseInt(e.target.value) || 0)}
                                className="w-16 px-2 py-1 bg-[#080C14] border border-[#1E293B] rounded text-xs font-mono text-center text-white focus:outline-none focus:border-cyan-400"
                              />
                              <span className={`text-[10px] font-mono ${prod.stock <= 0 ? 'text-red-400' : prod.stock <= 3 ? 'text-amber-400' : 'text-emerald-400'}`}>
                                {prod.stock <= 0 ? 'Agotado' : prod.stock <= 3 ? 'Bajo' : 'OK'}
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-500 font-mono text-[11px]">Servicio Digital</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditModal(prod)}
                              className="p-1.5 rounded bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 transition-colors"
                              title="Editar"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Categorías */}
        {activeTab === 'categorias' && (
          <div className="space-y-4">
            
            {/* Header / Filtro de categorías */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-[#0F172A] border border-[#1E293B]">
              <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={categorySearchQuery}
                    onChange={(e) => setCategorySearchQuery(e.target.value)}
                    placeholder="Buscar por nombre o slug..."
                    className="w-full pl-8 pr-8 py-1.5 bg-[#080C14] border border-[#1E293B] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  {categorySearchQuery && (
                    <button
                      onClick={() => setCategorySearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1 bg-[#080C14] p-1 rounded-lg border border-[#1E293B] w-full sm:w-auto overflow-x-auto">
                  <button
                    onClick={() => setCategoryTypeFilter('todos')}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all shrink-0 ${
                      categoryTypeFilter === 'todos' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Todas ({categorias.length})
                  </button>
                  <button
                    onClick={() => setCategoryTypeFilter('hardware')}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all shrink-0 ${
                      categoryTypeFilter === 'hardware' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Hardware ({categorias.filter(c => c.tipo === 'hardware').length})
                  </button>
                  <button
                    onClick={() => setCategoryTypeFilter('servicio_web')}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all shrink-0 ${
                      categoryTypeFilter === 'servicio_web' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Web ({categorias.filter(c => c.tipo === 'servicio_web').length})
                  </button>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-400 w-full sm:w-auto text-right">
                Mostrando <strong className="text-white">{filteredCategorias.length}</strong> de {categorias.length} categorías
              </div>
            </div>

            {/* Tabla de Categorías */}
            {filteredCategorias.length === 0 ? (
              <div className="py-16 text-center rounded-xl bg-[#0F172A] border border-[#1E293B]">
                <FolderTree className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white">No se encontraron categorías</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  {categorySearchQuery ? `No hay categorías que coincidan con "${categorySearchQuery}"` : 'No hay categorías registradas en el sistema.'}
                </p>
                <button
                  onClick={handleOpenCreateCategoryModal}
                  className="mt-4 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all"
                >
                  + Crear Primera Categoría
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-[#1E293B] bg-[#0F172A]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#080C14] text-slate-400 font-mono uppercase text-[10px] border-b border-[#1E293B]">
                    <tr>
                      <th className="py-3.5 px-4">Categoría &amp; Slug</th>
                      <th className="py-3.5 px-4">Línea Técnica</th>
                      <th className="py-3.5 px-4">Productos Vinculados</th>
                      <th className="py-3.5 px-4">Descripción / Alcance</th>
                      <th className="py-3.5 px-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E293B]">
                    {filteredCategorias.map((cat) => {
                      const isHw = cat.tipo === 'hardware';
                      const linkedProducts = productos.filter(
                        (p) => p.categoriaId === cat.id || p.categoriaNombre.toLowerCase() === cat.nombre.toLowerCase()
                      );

                      return (
                        <tr key={cat.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${isHw ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                                {isHw ? <Cpu className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
                              </div>
                              <div>
                                <span className="font-bold text-white block text-sm">{cat.nombre}</span>
                                <span className="text-[10px] font-mono text-slate-500">
                                  slug: <code className="text-cyan-400 font-semibold">/{cat.slug}</code> • ID: {cat.id}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-semibold ${
                              isHw 
                                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' 
                                : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                            }`}>
                              {isHw ? 'Dispositivos & Hardware' : 'Desarrollo Web & SaaS'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <span className={`font-mono font-bold ${linkedProducts.length > 0 ? 'text-white' : 'text-slate-500'}`}>
                                {linkedProducts.length}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {linkedProducts.length === 1 ? 'producto activo' : 'productos activos'}
                              </span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-slate-400 max-w-xs">
                            <p className="line-clamp-2 text-[11px]">
                              {cat.descripcion || 'Sin descripción adicional registrada.'}
                            </p>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEditCategoryModal(cat)}
                                className="p-1.5 rounded-lg bg-[#080C14] hover:bg-white/5 border border-[#1E293B] text-slate-300 hover:text-cyan-300 transition-colors"
                                title="Editar categoría"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeleteCategoryConfirm(cat)}
                                className="p-1.5 rounded-lg bg-[#080C14] hover:bg-red-950/40 border border-[#1E293B] hover:border-red-500/40 text-slate-400 hover:text-red-400 transition-colors"
                                title="Eliminar categoría"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        )}

        {/* Tab 3: Pedidos */}
        {activeTab === 'pedidos' && (
          <div className="space-y-4">
            {pedidos.length === 0 ? (
              <div className="py-16 text-center rounded-xl bg-[#0F172A] border border-[#1E293B]">
                <ShoppingBag className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white">Sin órdenes de compra registradas</h4>
                <p className="text-xs text-slate-400 mt-1">Los pedidos y cotizaciones registrados aparecerán aquí.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {pedidos.map((pedido) => (
                  <div
                    key={pedido.id}
                    className="p-5 rounded-xl bg-[#0F172A] border border-[#1E293B] flex flex-col md:flex-row justify-between gap-6"
                  >
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold">
                          Folio #{pedido.id}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {pedido.createdAt ? new Date(pedido.createdAt as string).toLocaleString() : 'Reciente'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-2 text-white font-semibold">
                          <User className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{pedido.clienteNombre}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="font-mono">{pedido.clienteTelefono}</span>
                        </div>
                      </div>

                      {pedido.notas && (
                        <p className="text-xs text-slate-400 bg-[#080C14] p-2.5 rounded-lg border border-white/5">
                          <strong>Detalle:</strong> {pedido.notas}
                        </p>
                      )}

                      <div className="pt-2">
                        <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                          Partidas ({pedido.items.length}):
                        </span>
                        <div className="space-y-1">
                          {pedido.items.map((it, idx) => (
                            <div key={idx} className="flex justify-between text-xs text-slate-300">
                              <span>• {it.titulo} (x{it.cantidad})</span>
                              <span className="font-mono">${formatPrice(it.precio * it.cantidad)} MXN</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="md:w-64 flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-[#1E293B] pt-4 md:pt-0 md:pl-6">
                      <div className="text-right w-full">
                        <span className="text-[10px] font-mono text-slate-500 block">Total de la Orden</span>
                        <span className="text-2xl font-bold text-white font-mono">
                          ${formatPrice(pedido.total)} MXN
                        </span>
                      </div>

                      <div className="w-full mt-4">
                        <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                          Estado Operativo:
                        </label>
                        <select
                          value={pedido.estado}
                          onChange={(e) => handleUpdateOrderStatus(pedido.id, e.target.value as EstadoPedido)}
                          className={`w-full p-2 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${
                            pedido.estado === 'completado'
                              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                              : pedido.estado === 'contactado' || pedido.estado === 'en_proceso'
                              ? 'bg-blue-950/40 text-blue-300 border-blue-500/40'
                              : pedido.estado === 'cancelado'
                              ? 'bg-red-950/40 text-red-300 border-red-500/40'
                              : 'bg-amber-950/40 text-amber-300 border-amber-500/40'
                          }`}
                        >
                          <option value="pendiente" className="bg-[#0F172A] text-amber-400">Pendiente</option>
                          <option value="contactado" className="bg-[#0F172A] text-blue-400">Contactado</option>
                          <option value="en_proceso" className="bg-[#0F172A] text-cyan-400">En Proceso</option>
                          <option value="completado" className="bg-[#0F172A] text-emerald-400">Completado</option>
                          <option value="cancelado" className="bg-[#0F172A] text-red-400">Cancelado</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Modal: Crear / Editar Producto */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0F172A] border border-[#1E293B] rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                {editingProduct ? <Edit className="w-4 h-4 text-cyan-400" /> : <Plus className="w-4 h-4 text-cyan-400" />}
                {editingProduct ? 'Editar Registro' : 'Nueva Partida de Catálogo'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="mt-6 space-y-4 text-xs">
              
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Línea de Negocio *</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormTipo('hardware')}
                    className={`p-2.5 rounded-lg border flex items-center justify-center gap-2 font-bold ${
                      formTipo === 'hardware'
                        ? 'bg-cyan-500/15 text-cyan-300 border-cyan-400'
                        : 'bg-[#080C14] text-slate-400 border-[#1E293B]'
                    }`}
                  >
                    <Cpu className="w-4 h-4" />
                    Hardware &amp; Cómputo
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormTipo('servicio_web')}
                    className={`p-2.5 rounded-lg border flex items-center justify-center gap-2 font-bold ${
                      formTipo === 'servicio_web'
                        ? 'bg-blue-500/15 text-blue-300 border-blue-400'
                        : 'bg-[#080C14] text-slate-400 border-[#1E293B]'
                    }`}
                  >
                    Desarrollo de Software
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Título *</label>
                  <input
                    type="text"
                    required
                    value={formTitulo}
                    onChange={(e) => setFormTitulo(e.target.value)}
                    placeholder="Ej. MacBook Pro M3 o E-Commerce Pro"
                    className="w-full p-2.5 bg-[#080C14] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Categoría *</label>
                  <select
                    value={formCategoriaId}
                    onChange={(e) => setFormCategoriaId(e.target.value)}
                    className="w-full p-2.5 bg-[#080C14] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    {categorias
                      .filter((c) => c.tipo === formTipo)
                      .map((cat) => (
                        <option key={cat.id} value={cat.id} className="bg-[#0F172A]">
                          {cat.nombre}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Descripción *</label>
                <textarea
                  rows={3}
                  required
                  value={formDescripcion}
                  onChange={(e) => setFormDescripcion(e.target.value)}
                  placeholder="Detalles sobre rendimiento, componentes o alcance..."
                  className="w-full p-2.5 bg-[#080C14] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Precio Normal (MXN) *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formPrecio}
                    onChange={(e) => setFormPrecio(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#080C14] border border-[#1E293B] rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Precio Preferencial (MXN)</label>
                  <input
                    type="number"
                    min="0"
                    value={formPrecioOferta || ''}
                    onChange={(e) => setFormPrecioOferta(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Opcional"
                    className="w-full p-2.5 bg-[#080C14] border border-[#1E293B] rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {formTipo === 'hardware' && (
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Stock Físico *</label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={formStock}
                      onChange={(e) => setFormStock(Number(e.target.value))}
                      className="w-full p-2.5 bg-[#080C14] border border-[#1E293B] rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                )}
              </div>

              {formTipo === 'servicio_web' && (
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Enlace a Demostración Técnica</label>
                  <input
                    type="url"
                    value={formDemoUrl}
                    onChange={(e) => setFormDemoUrl(e.target.value)}
                    placeholder="https://tudemo.vercel.app"
                    className="w-full p-2.5 bg-[#080C14] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              )}

              {/* Subida de Imágenes a Firebase Storage */}
              <div className="pt-2">
                <label className="block text-slate-300 font-semibold mb-1.5 flex items-center justify-between">
                  <span>Imágenes del Artículo</span>
                  <span className="text-[10px] text-slate-500 font-mono">{formImagenes.length} registradas</span>
                </label>

                <div className="flex items-center gap-3 mb-3">
                  <label className="flex-1 cursor-pointer p-4 rounded-xl border border-dashed border-cyan-500/40 hover:border-cyan-400 bg-[#080C14] flex items-center justify-center gap-2 text-cyan-400 transition-all">
                    {isUploadingImage ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transfiriendo archivo a Firebase Storage...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-5 h-5" />
                        <span>Subir Fotografía a Storage</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isUploadingImage}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {formImagenes.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {formImagenes.map((url, i) => (
                      <div key={i} className="relative w-14 h-14 rounded-lg overflow-hidden border border-white/10 shrink-0 group">
                        <img src={url} alt="Vista previa" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setFormImagenes(formImagenes.filter((_, idx) => idx !== i))}
                          className="absolute inset-0 bg-red-950/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Editor de Especificaciones Técnicas */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-slate-300 font-semibold">
                    {formTipo === 'hardware' ? 'Ficha Técnica / Especificaciones' : 'Detalles de Alcance y Metodología'}
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormSpecs([...formSpecs, { key: '', value: '' }])}
                    className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 text-[11px]"
                  >
                    <Plus className="w-3.5 h-3.5" /> Agregar Parámetro
                  </button>
                </div>

                <div className="space-y-2">
                  {formSpecs.map((spec, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Atributo (ej. Procesador, Garantía)"
                        value={spec.key}
                        onChange={(e) => {
                          const updated = [...formSpecs];
                          updated[index].key = e.target.value;
                          setFormSpecs(updated);
                        }}
                        className="w-1/3 p-2 bg-[#080C14] border border-[#1E293B] rounded-lg text-white text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Valor (ej. 32 GB, 12 Meses)"
                        value={spec.value}
                        onChange={(e) => {
                          const updated = [...formSpecs];
                          updated[index].value = e.target.value;
                          setFormSpecs(updated);
                        }}
                        className="flex-1 p-2 bg-[#080C14] border border-[#1E293B] rounded-lg text-white text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setFormSpecs(formSpecs.filter((_, i) => i !== index))}
                        className="p-2 text-slate-500 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={formDestacado}
                    onChange={(e) => setFormDestacado(e.target.checked)}
                    className="rounded bg-[#080C14] border-[#1E293B] text-cyan-500 focus:ring-0"
                  />
                  <span>Destacar en Portada</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#1E293B] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#1E293B] text-slate-300 hover:text-white"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={formSaving}
                  className="px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {formSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    'Guardar Partida'
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Modal de Creación / Edición de Categoría */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#1E293B] mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <FolderTree className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">
                    {editingCategory ? `ID: ${editingCategory.id}` : 'Creación en tiempo real'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nombre de la Categoría *</label>
                <input
                  type="text"
                  required
                  value={catFormNombre}
                  onChange={(e) => {
                    setCatFormNombre(e.target.value);
                    if (!editingCategory && !catFormSlug) {
                      setCatFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                    }
                  }}
                  placeholder="ej. Displays de Grado Profesional"
                  className="w-full p-2.5 bg-[#080C14] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-cyan-400 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tipo de Línea Técnica *</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCatFormTipo('hardware')}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                      catFormTipo === 'hardware'
                        ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300'
                        : 'bg-[#080C14] border-[#1E293B] text-slate-400 hover:text-white'
                    }`}
                  >
                    <Cpu className="w-4 h-4 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-bold block text-xs">Dispositivos & Hardware</span>
                      <span className="text-[10px] opacity-75">Laptops, monitores, audio, GPUs</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCatFormTipo('servicio_web')}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                      catFormTipo === 'servicio_web'
                        ? 'bg-blue-500/15 border-blue-500/50 text-blue-300'
                        : 'bg-[#080C14] border-[#1E293B] text-slate-400 hover:text-white'
                    }`}
                  >
                    <Code2 className="w-4 h-4 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-bold block text-xs">Desarrollo Web & SaaS</span>
                      <span className="text-[10px] opacity-75">Landing, SaaS, e-commerce</span>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Slug Identificador (URL) *</label>
                <div className="flex items-center">
                  <span className="p-2.5 bg-[#1E293B]/60 text-slate-400 border border-r-0 border-[#1E293B] rounded-l-lg font-mono text-[11px]">
                    inversa.tech/
                  </span>
                  <input
                    type="text"
                    required
                    value={catFormSlug}
                    onChange={(e) => setCatFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    placeholder="displays-profesionales"
                    className="flex-1 p-2.5 bg-[#080C14] border border-[#1E293B] rounded-r-lg text-white focus:outline-none focus:border-cyan-400 font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Descripción / Alcance (Opcional)</label>
                <textarea
                  rows={2}
                  value={catFormDescripcion}
                  onChange={(e) => setCatFormDescripcion(e.target.value)}
                  placeholder="Monitores certificados, calibración de color y displays de alta resolución..."
                  className="w-full p-2.5 bg-[#080C14] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-4 border-t border-[#1E293B] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#1E293B] text-slate-300 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={catSaving}
                  className="px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {catSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Guardando...</span>
                    </>
                  ) : (
                    <span>Guardar Categoría</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación de Categoría */}
      {deleteCategoryConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0F172A] border border-red-500/30 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">¿Eliminar categoría?</h3>
                <span className="text-xs text-slate-400 font-mono">
                  {deleteCategoryConfirm.nombre} ({deleteCategoryConfirm.slug})
                </span>
              </div>
            </div>

            {(() => {
              const count = productos.filter(
                (p) => p.categoriaId === deleteCategoryConfirm.id || p.categoriaNombre.toLowerCase() === deleteCategoryConfirm.nombre.toLowerCase()
              ).length;
              return count > 0 ? (
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs mb-4">
                  <strong>Precaución:</strong> Existen <strong>{count} producto(s)</strong> vinculados a esta categoría. Al eliminarla, deberás reasignarlos a otra categoría.
                </div>
              ) : null;
            })()}

            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              Esta acción eliminará la categoría del catálogo y de los filtros de la tienda. Los cambios se sincronizarán inmediatamente.
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteCategoryConfirm(null)}
                className="px-4 py-2 rounded-lg border border-[#1E293B] text-slate-300 hover:text-white text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleDeleteCategory(deleteCategoryConfirm)}
                className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white text-xs font-bold transition-all shadow-md"
              >
                Eliminar Definitivamente
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
