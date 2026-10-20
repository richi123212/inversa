import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Cpu, 
  Code2, 
  ArrowUpDown, 
  RefreshCw, 
  Search, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Producto, Categoria } from '../types';
import { getProductos, getCategorias } from '../services/productsService';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { WebInteractiveQuoter } from '../components/WebInteractiveQuoter';
import { ProcessorCircuitAnimation } from '../components/ProcessorCircuitAnimation';
import { CatalogBackgroundCircuit } from '../components/CatalogBackgroundCircuit';
import { TrustSignalsBar } from '../components/TrustSignalsBar';

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

  const catalogRef = useRef<HTMLDivElement>(null);

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

  const scrollToCatalog = () => {
    if (catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      
      {/* 1. Hero Section with Preserved Processor Circuit Animation */}
      <section className="relative overflow-hidden pt-16 sm:pt-20 pb-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/80 bg-gradient-to-b from-zinc-950 via-[#0c1017] to-[#09090b]">
        
        {/* Animated Processor Circuit Background (Preserved as requested) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <ProcessorCircuitAnimation className="w-full max-w-6xl h-full" />
        </div>

        {/* Subtle Tech Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a15_1px,transparent_1px),linear-gradient(to_bottom,#27272a15_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          
          {/* Subtle Enterprise Category Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Infraestructura &amp; Soluciones Digitales</span>
          </div>

          {/* Headline (Exact copy requested by user) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-3xl mx-auto">
            Equipamiento tecnológico y desarrollo de software para profesionistas y empresas.
          </h1>

          {/* Subtext (Exact copy requested by user) */}
          <p className="mt-6 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Soluciones integrales de hardware de alto rendimiento y arquitectura digital a la medida con facturación inmediata y cobertura nacional.
          </p>

          {/* Two Direct CTAs (Solid vs Outline) */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <button
              onClick={() => {
                setActiveTab('hardware');
                scrollToCatalog();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span>Explorar Catálogo de Hardware</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setActiveTab('crea_tu_web');
                scrollToCatalog();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-600 text-zinc-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <span>Cotizar Proyecto de Software</span>
            </button>
          </div>

        </div>
      </section>

      {/* 2. Corporate Trust Signals Bar (CFDI 4.0, Garantía, Pagos, Soporte) */}
      <TrustSignalsBar />

      {/* 3. Main Business Operations Content */}
      <main ref={catalogRef} className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

        {/* Business Proposition Switcher Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 p-1 bg-zinc-900/80 border border-zinc-800 rounded-xl w-full sm:w-auto overflow-x-auto shadow-sm">
            <button
              onClick={() => { setActiveTab('hardware'); setSelectedCategory('todas'); }}
              className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-medium tracking-normal transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'hardware'
                  ? 'bg-zinc-800 text-white font-semibold shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4 text-zinc-400" />
              <span>Hardware &amp; Equipamiento</span>
            </button>

            <button
              onClick={() => setActiveTab('crea_tu_web')}
              className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-medium tracking-normal transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'crea_tu_web'
                  ? 'bg-zinc-800 text-white font-semibold shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Code2 className="w-4 h-4 text-zinc-400" />
              <span>Soluciones Web &amp; Software</span>
            </button>
          </div>

          {/* Sort Selector & Refresh (in hardware view) */}
          {activeTab === 'hardware' && (
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
                <span className="text-zinc-400">Ordenar por:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
                >
                  <option value="destacados" className="bg-zinc-900 text-white">Destacados</option>
                  <option value="precio-asc" className="bg-zinc-900 text-white">Menor Precio</option>
                  <option value="precio-desc" className="bg-zinc-900 text-white">Mayor Precio</option>
                </select>
              </div>

              <button
                onClick={loadData}
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                title="Actualizar catálogo"
                aria-label="Actualizar catálogo"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-zinc-200' : ''}`} />
              </button>
            </div>
          )}
        </div>

        {/* Clean Category Filter Chips for Hardware */}
        {activeTab === 'hardware' && visibleCategories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
            <button
              onClick={() => setSelectedCategory('todas')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all ${
                selectedCategory === 'todas'
                  ? 'bg-white text-zinc-950 font-semibold shadow-xs'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
            >
              Todas las Categorías
            </button>

            {visibleCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-white text-zinc-950 font-semibold shadow-xs'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700'
                }`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        )}

        {/* View Switcher: Interactive Software Quoter vs Hardware Catalog with Background Circuit */}
        {activeTab === 'crea_tu_web' ? (
          <WebInteractiveQuoter />
        ) : (
          <div className="relative rounded-2xl p-6 sm:p-8 bg-zinc-950/60 border border-zinc-800/80 min-h-[500px]">
            
            {/* Animated Catalog Background Circuit (Preserved as requested) */}
            <CatalogBackgroundCircuit />

            <div className="relative z-10">
              {loading ? (
                <div className="py-24 flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 border-2 border-zinc-500 border-t-white rounded-full animate-spin" />
                  <span className="text-xs font-mono text-zinc-400">Consultando inventario corporativo...</span>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="py-16 text-center rounded-xl bg-zinc-900/60 border border-zinc-800 max-w-md mx-auto p-8">
                  <Search className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
                  <h3 className="text-sm font-semibold text-white">Sin coincidencias en catálogo</h3>
                  <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                    No se encontraron productos con el filtro aplicado o la búsqueda "{searchQuery}".
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory('todas'); }}
                    className="mt-4 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
                  >
                    Restablecer Filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
