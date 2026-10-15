import React, { useState, useEffect, useMemo } from 'react';
import { 
  Cpu, 
  Code2, 
  Calculator, 
  ArrowUpDown, 
  RefreshCw, 
  Search, 
  LayoutGrid
} from 'lucide-react';
import { Producto, Categoria } from '../types';
import { getProductos, getCategorias } from '../services/productsService';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { WebInteractiveQuoter } from '../components/WebInteractiveQuoter';
import { ProcessorCircuitAnimation } from '../components/ProcessorCircuitAnimation';
import { CatalogBackgroundCircuit } from '../components/CatalogBackgroundCircuit';

interface CatalogPageProps {
  activeTab: 'hardware' | 'crea_tu_web';
  setActiveTab: (tab: 'hardware' | 'crea_tu_web') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery
}) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [sortBy, setSortBy] = useState<'destacados' | 'precio-asc' | 'precio-desc'>('destacados');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodsData, catsData] = await Promise.all([
        getProductos(),
        getCategorias()
      ]);
      setProductos(prodsData.filter((p) => p.activo !== false));
      setCategorias(catsData);
    } catch (e) {
      console.error('Error al cargar datos del catálogo:', e);
    } finally {
      setLoading(false);
    }
  };

  const visibleCategories = useMemo(() => {
    if (activeTab === 'hardware') return categorias.filter((c) => c.tipo === 'hardware');
    return [];
  }, [categorias, activeTab]);

  const filteredProducts = useMemo(() => {
    if (activeTab !== 'hardware') return [];

    let result = productos.filter((p) => p.tipo === 'hardware');

    if (selectedCategory !== 'todas') {
      result = result.filter(
        (p) => p.categoriaId === selectedCategory || p.categoriaNombre.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        const inTitle = p.titulo.toLowerCase().includes(query);
        const inDesc = p.descripcion.toLowerCase().includes(query);
        const inSpecs = Object.entries(p.specs || {}).some(
          ([k, v]) => k.toLowerCase().includes(query) || String(v).toLowerCase().includes(query)
        );
        return inTitle || inDesc || inSpecs;
      });
    }

    if (sortBy === 'precio-asc') {
      result.sort((a, b) => (a.precioOferta ?? a.precio) - (b.precioOferta ?? b.precio));
    } else if (sortBy === 'precio-desc') {
      result.sort((a, b) => (b.precioOferta ?? b.precio) - (a.precioOferta ?? a.precio));
    } else {
      result.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
    }

    return result;
  }, [productos, activeTab, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#080C14]">
      
      {/* Hero Section with Integrated Animated Processor & Circuits */}
      <section className="relative overflow-hidden pt-14 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#1E293B] bg-gradient-to-b from-[#0B1120] via-[#080C14] to-[#080C14]">
        
        {/* Animated Processor Circuit Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
          <ProcessorCircuitAnimation className="w-full max-w-6xl h-full" />
        </div>

        {/* Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0F172A] border border-cyan-500/30 text-cyan-400 text-[10px] font-mono tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            TECNOLOGÍA &amp; SITIOS WEB PARA TODOS
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Productos de Tecnología y{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
              Páginas Web para Todos
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Hardware de alto rendimiento al alcance de cualquier persona, creador o profesionista, junto con desarrollo web a la medida tanto para negocios independientes como para empresas. Compra en línea o crea tu cotización al instante.
          </p>
        </div>
      </section>

      {/* Main Content Area (Expansive Width) */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Navigation Tabs Selector: 2 Secciones Claras (Dispositivos & Hardware vs Crea tu Página Web & Software) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 p-1.5 bg-[#0F172A] border border-[#1E293B] rounded-2xl w-full sm:w-auto overflow-x-auto shadow-lg">
            <button
              onClick={() => { setActiveTab('hardware'); setSelectedCategory('todas'); }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center gap-2.5 shrink-0 ${
                activeTab === 'hardware'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Dispositivos &amp; Hardware</span>
            </button>

            <button
              onClick={() => setActiveTab('crea_tu_web')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center gap-2.5 shrink-0 ${
                activeTab === 'crea_tu_web'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Crea tu Página Web &amp; Software</span>
            </button>
          </div>

          {/* Sort Selector (when in hardware view) */}
          {activeTab === 'hardware' && (
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <div className="flex items-center gap-2 bg-[#0F172A] border border-[#1E293B] rounded-xl px-3.5 py-2 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-400">Orden:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
                >
                  <option value="destacados" className="bg-[#0F172A]">Destacados</option>
                  <option value="precio-asc" className="bg-[#0F172A]">Menor Precio</option>
                  <option value="precio-desc" className="bg-[#0F172A]">Mayor Precio</option>
                </select>
              </div>

              <button
                onClick={loadData}
                className="p-2.5 rounded-xl bg-[#0F172A] border border-[#1E293B] text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
                title="Actualizar catálogo"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
              </button>
            </div>
          )}
        </div>

        {/* Category Filter Chips for Hardware */}
        {activeTab === 'hardware' && visibleCategories.length > 0 && (
          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8">
            <button
              onClick={() => setSelectedCategory('todas')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 shadow-sm ${
                selectedCategory === 'todas'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                  : 'bg-[#0F172A] text-slate-400 border border-[#1E293B] hover:text-white'
              }`}
            >
              Todas las Categorías
            </button>

            {visibleCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 shadow-sm ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                    : 'bg-[#0F172A] text-slate-400 border border-[#1E293B] hover:text-white'
                }`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        )}

        {/* Content Render: Crea tu Web Unificado vs. Hardware Products Grid */}
        {activeTab === 'crea_tu_web' ? (
          <WebInteractiveQuoter />
        ) : (
          <div className="relative rounded-3xl p-6 sm:p-8 bg-[#0B101E]/40 border border-[#1E293B]/70 backdrop-blur-xs min-h-[500px] shadow-2xl">
            {/* Integrated Animated Circuit Background flowing behind all products */}
            <CatalogBackgroundCircuit />

            <div className="relative z-10">
              {loading ? (
                <div className="py-24 flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-mono text-slate-400">Sincronizando catálogo en tiempo real...</span>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="py-20 text-center rounded-2xl bg-[#0F172A]/80 border border-[#1E293B] max-w-lg mx-auto p-8">
                  <Search className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-white">Sin coincidencias en catálogo</h3>
                  <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
                    No se encontraron artículos con los criterios seleccionados o la búsqueda "{searchQuery}".
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory('todas'); }}
                    className="mt-5 px-5 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all"
                  >
                    Restablecer Filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((producto) => (
                    <ProductCard
                      key={producto.id}
                      producto={producto}
                      onOpenDetail={(p) => setSelectedProductForModal(p)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        producto={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
      />

    </div>
  );
};
