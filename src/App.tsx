import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Send, 
  Truck, 
  Coffee, 
  Shirt, 
  MessageCircle, 
  CheckCircle,
  Camera,
  Search,
  ArrowLeft,
  ArrowRight,
  Star,
  Sparkles,
  Zap,
  Filter,
  Users,
  Award
} from 'lucide-react';

// --- Configuration ---
const WA_NUMBER = "584262322394"; 
const WA_URL = `https://wa.me/${WA_NUMBER}`;

// --- Tipado para las reseñas ---
interface Review {
  id: number;
  name: string;
  role: string;
  content: string;
  stars: number;
}

const REVIEWS: Review[] = [
  { id: 1, name: "CARLOS R.", role: "Cliente Verificado", content: "La calidad de la taza es brutal, los colores neón resaltan muchísimo. ¡Recomendado!", stars: 5 },
  { id: 2, name: "ANA M.", role: "Emprendedora", content: "Sublimaron mi logo en unas franelas y quedaron perfectas. El trato fue de primera.", stars: 5 },
  { id: 3, name: "PEDRO J.", role: "Regalo Personalizado", content: "Diseño único. No he visto nada igual en otras tiendas de sublimación.", stars: 5 },
];

// --- Types ---
type Page = 'home' | 'catalog' | 'about';
type Category = 'todas' | 'tazas' | 'camisetas' | 'especiales' | 'san-valentín' | 'semana santa'| ' calnaval';

interface Product {
  id: number;
  name: string;
  category: Category;
  description: string;
  image: string;
  price: string;
}
// --- Season Configuration de coleccion ---
const SEASON_CONFIG = {
  title: "SAN VALENTÍN", // Título de la colección
  accentColor: "red", // colores dependiendo la caegoria 'red', 'rose', 'emerald', etc.
  image1: "/san-valentin/tazas-san-valentin.jpeg",
  image2: "/san-valentin/franelas-para-parejas.jpeg",
  category: "san-valentín" // Categoría de los productos en esta colección
};

// --- Data ---
const PRODUCTS: Product[] = [
  // san valentin
  { id: 1, 
    name: "Taza xoxo san valentín", 
    category: 'tazas', 
    description: "Perfecta para expresar amor con cada sorbo.", 
    image: "/san-valentin/taza-xoxo.png", 
    price: "Consultar" },

  { id: 2, 
    name: "franela san valentin", 
    category: 'san-valentín', 
    description: "lindos detalles.", 
    image: "/san-valentin/franela-san-valentin.jpeg", 
    price: "Consultar" },

  { id: 3, 
    name: "Tazas Cerámica san valentín", 
    category: 'san-valentín', 
    description: "Amor en cada sorbo.", 
    image: "/san-valentin/tazas-san-valentin.jpeg",
    price: "Consultar" },

  { id: 4, 
    name: "franelas para parejas", 
    category: 'san-valentín', 
    description: "Ideal para aprejas.", 
    image: "/san-valentin/franelas-para-parejas.jpeg", 
    price: "Consultar" },

  { id: 5, 
    name: "Colección san valentín", 
    category: 'san-valentín', 
    description: "Diseños exclusivos con estética.", 
    image: "/san-valentin/franelas-para-parejas-2.jpeg", 
    price: "Consultar" },

  { id: 6, 
    name: "Taza love", 
    category: 'tazas', 
    description: "Amor en cada sorbo.", 
    image:  "/san-valentin/taza-love.jpeg", 
    price: "Consultar" },

];

// ---  COMPONENTE DE FONDO: ClawScratches ---
const ClawScratches = ({ className = "" }: { className?: string }) => (
  <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      <g fill="url(#neonGlow)" filter="url(#glow)" opacity="0.6" className="animate-pulse">
        <path d="M10,25 Q12,28 15,40 L17,65 Q14,50 11,35 Z" transform="rotate(-15 15 45)" />
        <path d="M25,20 Q28,25 32,45 L35,75 Q30,55 26,30 Z" transform="rotate(-15 30 45)" />
        <path d="M45,15 Q48,22 55,50 L60,85 Q52,60 47,25 Z" transform="rotate(-15 52 50)" />
        <path d="M70,25 Q73,35 80,60 L85,90 Q75,65 71,35 Z" transform="rotate(-15 77 55)" />
      </g>
    </svg>
    <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 opacity-40"></div>
  </div>
);

// --- Shared Components ---
const btnBase = "inline-flex items-center justify-center gap-2 font-bold transition-all duration-500 active:scale-95 hover:-translate-y-1 cursor-pointer outline-none overflow-hidden relative group";
const btnNeon = `${btnBase} bg-gradient-to-r from-emerald-400 via-cyan-400 to-rose-500 text-slate-950 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]`;
const btnWhatsApp = `${btnBase} bg-[#25D366] text-white hover:bg-[#20ba5a] shadow-lg shadow-green-500/20`;

const SectionHeader = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="mb-16">
    <h2 className={`text-4xl md:text-6xl font-black ${light ? 'text-white' : 'text-slate-900'} uppercase tracking-tighter italic mb-4`}>
      {title}
    </h2>
    {subtitle && <p className="text-slate-500 text-lg font-medium">{subtitle}</p>}
  </div>
);

// --- Pages ---

const HomePage = ({ setPage }: { setPage: (p: Page) => void }) => (
  <div className="animate-in fade-in duration-700 relative">
    <Hero setPage={setPage} />
    
    {/* --- SECCIÓN COLECCIÓN DE TEMPORADA --- */}
      <section 
  className="py-12 md:py-24 relative overflow-hidden transition-colors duration-1000"
  style={{ 
    backgroundColor: `rgba(15, 23, 42, 1)`, 
    backgroundImage: `linear-gradient(to bottom, transparent, ${SEASON_CONFIG.accentColor}20)` 
  }}
>
  <ClawScratches className="opacity-20 scale-110" />
  <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
    
    {/* Banner Superior - Ajuste Dinámico */}
    <div className="flex items-center gap-2 mb-10 md:mb-16">
      <div className="h-px flex-1 opacity-30" style={{ backgroundColor: SEASON_CONFIG.accentColor }}></div>
      <span 
        className="font-black uppercase flex items-center gap-2 text-center"
        style={{ 
          color: SEASON_CONFIG.accentColor,
          // Texto que escala entre 9px y 12px según el ancho
          fontSize: 'clamp(9px, 1.5vw, 12px)',
          letterSpacing: '0.2em'
        }}
      >
        <Sparkles size={14} className="shrink-0" /> Colección Especial: {SEASON_CONFIG.title}
      </span>
      <div className="h-px flex-1 opacity-30" style={{ backgroundColor: SEASON_CONFIG.accentColor }}></div>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div className="text-center lg:text-left">
        
        {/* TÍTULO CON TEXTO DINÁMICO */}
          <h2 
            className="font-black text-white mb-6 md:mb-8 italic tracking-tighter"
            style={{ 
              fontSize: 'clamp(2.4rem, 11vw, 6rem)', 
              lineHeight: '1.2', // Aumentado de 0.9 a 1.2 para que los acentos no se corten
              wordBreak: 'break-word',
              paddingRight: '0.15em', // Espacio vital para la inclinación de la 'N' o la 'Í'
              paddingLeft: '0.05em',  // Balance simétrico por la inclinación
              display: 'block'        // Asegura que el padding se aplique correctamente
            }}
          >
            {SEASON_CONFIG.title.split(' ')[0]} <br />
            <span 
              className="text-transparent bg-clip-text inline-block" // inline-block es clave aquí
              style={{ 
                backgroundImage: `linear-gradient(to right, ${SEASON_CONFIG.accentColor}, #ffffff)`,
                fontSize: 'clamp(1.8rem, 9vw, 5.5rem)',
                paddingRight: '0.2em', // Padding extra para el gradiente y la cursiva
                lineHeight: '1.1'
              }}
            >
              {SEASON_CONFIG.title.split(' ').slice(1).join(' ') || 'DESTACADA'}
            </span>
          </h2>

        <p className="text-slate-400 text-sm md:text-xl mb-8 md:mb-10 max-w-md mx-auto lg:mx-0 font-medium leading-relaxed">
          Diseños exclusivos pensados para esta temporada de {SEASON_CONFIG.title.toLowerCase()}.
        </p>

        <div className="flex justify-center lg:justify-start">
          <button 
            onClick={() => setPage('catalog')}
            className="text-white px-8 py-4 md:py-5 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all transform hover:scale-105 flex items-center gap-3 active:scale-95"
            style={{ 
              backgroundColor: SEASON_CONFIG.accentColor,
              boxShadow: `0 0 30px ${SEASON_CONFIG.accentColor}40` 
            }}
          >
            VER COLECCIÓN <ArrowRight size={18} />
          </button>
        </div>
      </div>
      
      {/* Visual de Imágenes - Ajustado para no empujar el texto */}
      <div className="grid grid-cols-2 gap-4 relative max-w-[450px] mx-auto lg:max-w-none">
        <div className="absolute -inset-4 blur-3xl rounded-full opacity-10" style={{ backgroundColor: SEASON_CONFIG.accentColor }}></div>
        
        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 relative z-10 group shadow-2xl">
          <img 
            src={SEASON_CONFIG.image1} 
            alt={SEASON_CONFIG.title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
          />
        </div>
        
        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 relative z-10 mt-8 group shadow-2xl">
          <img 
            src={SEASON_CONFIG.image2} 
            alt={SEASON_CONFIG.title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
          />
        </div>
      </div>
    </div>
  </div>
</section>

    <FeaturedSection setPage={setPage} />
    <Steps />

    {/* --- INTEGRACIÓN DE RESEÑAS --- */}
    <ReviewsSection />
    
    {/* --- SECCIÓN MARCA LA DIFERENCIA --- */}
    <section className="relative py-16 md:py-32 bg-slate-950 overflow-hidden min-h-[600px] flex items-center justify-center">
      <ClawScratches className="opacity-30 scale-150 rotate-12 translate-x-1/4" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full flex justify-center">
        <div className="relative w-full max-w-[1000px] group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-rose-500/20 rounded-[2.5rem] md:rounded-[5rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] md:rounded-[5rem] p-8 py-16 md:p-24 w-full text-center flex flex-col items-center justify-center shadow-2xl">
            <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[100px] font-black text-white mb-6 md:mb-10 leading-[1.1] md:leading-[0.9] tracking-tighter italic uppercase">
              Marca la <br className="block lg:hidden" /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-rose-500">Diferencia</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base md:text-2xl mb-10 md:mb-14 max-w-xl md:max-w-3xl mx-auto font-medium leading-relaxed">
              No somos solo sublimación. <br className="hidden md:block" />
              Somos el reflejo de tu personalidad en cada detalle.
            </p>
            <div className="w-full flex justify-center">
              <button 
                onClick={() => setPage('catalog')}
                className={`${btnNeon} w-full sm:w-auto px-8 md:px-20 py-5 md:py-7 rounded-xl md:rounded-3xl text-[10px] md:text-xs uppercase tracking-[0.3em] shadow-2xl transition-all hover:scale-105 active:scale-95`}
              >
                Ver catálogo completo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CTASection />
  </div>
);

// --- Catalog Page ---
const CatalogPage = () => {
  const [filter, setFilter] = useState<Category>('todas');
  const [search, setSearch] = useState('');
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesFilter = filter === 'todas' || p.category === filter;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                           p.description.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
      <ClawScratches className="opacity-10 rotate-180" />
      <SectionHeader title="Catálogo" subtitle="Explora nuestras líneas de productos listas para ser personalizadas." light />
      <div className="flex flex-col md:flex-row gap-6 mb-16 items-center relative z-10">
        <div className="flex flex-wrap gap-2 p-1 bg-white/5 rounded-2xl border border-white/10 w-full md:w-auto">
              {/* Filtros de categoría */}
          {(['todas', 'tazas', 'camisetas', 'especiales', 'san-valentín', 'semana santa',' calnaval',] as Category[]).map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === cat ? 'bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Buscar productos..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-white text-sm outline-none focus:border-cyan-400/50 transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
        {filteredProducts.map(product => (
          <div key={product.id} className="group relative bg-slate-900 rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-cyan-400/30 transition-all duration-500">
            <div className="aspect-square overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100" />
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">{product.name}</h3>
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest px-2 py-1 bg-cyan-400/10 rounded-lg">{product.category.replace('-', ' ')}</span>
              </div>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">{product.description}</p>
              <div className="flex items-center justify-between gap-4">
                <span className="text-white font-black text-lg italic">{product.price}</span>
                <a href={`${WA_URL}?text=Hola%20N&C%20Sublimaciones%2C%20quiero%20información%20sobre%3A%20${encodeURIComponent(product.name)}`} target="_blank" rel="noreferrer" className={`${btnWhatsApp} px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest`}>
                  <MessageCircle className="w-4 h-4" /> Consultar
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

//sobre nosotros page 

const AboutPage = () => (
  <div className="pt-32 pb-24 animate-in fade-in slide-in-from-bottom-8 duration-700 relative overflow-hidden">
    <ClawScratches className="opacity-20 -rotate-45 scale-150" />
    <section className="max-w-7xl mx-auto px-6 mb-32 relative z-10">
      <div className="grid md:grid-cols-2 gap-20 items-center">
        <div>
          <SectionHeader title="Nuestra Esencia" subtitle="Tú lo imaginas, nosotros lo creamos." light />
          <div className="space-y-6 text-slate-400 text-lg font-medium leading-relaxed">
            <p>Nacimos de la necesidad de elevar el estándar de los regalos personalizados. En <strong>N&C Sublimación</strong>, no vemos objetos, vemos lienzos esperando ser transformados.</p>
            <p>Nuestra sede combina tecnología de impresión de grado industrial con un ojo artístico meticuloso. Cada taza que sale de nuestro taller es probada para resistir el paso del tiempo.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div>
              <p className="text-4xl font-black text-white mb-2 tracking-tighter italic">+500</p>
              <p className="text-xs font-black uppercase tracking-widest text-slate-600">Proyectos Listos</p>
            </div>
            <div>
              <p className="text-4xl font-black text-white mb-2 tracking-tighter italic">100%</p>
              <p className="text-xs font-black uppercase tracking-widest text-slate-600">Fidelidad Color</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-cyan-500/20 blur-3xl"></div>
          <img src="https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=1000" alt="Proceso de sublimación" className="relative z-10 rounded-[3.5rem] border border-white/10 shadow-2xl" />
        </div>
      </div>
    </section>
  </div>
);

const Hero = ({ setPage }: { setPage: (p: Page) => void }) => (
  <section className="pt-48 pb-32 px-6 overflow-hidden relative bg-slate-950">
    <ClawScratches className="opacity-40 scale-150 rotate-[-15deg] translate-x-[-10%]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
    <div className="max-w-5xl mx-auto text-center relative z-10">
      <div className="inline-flex items-center gap-3 py-2 px-6 rounded-full bg-white/5 text-cyan-400 text-[10px] font-black tracking-[0.3em] uppercase mb-12 border border-white/10 backdrop-blur-sm">
        <Sparkles className="w-3 h-3 animate-pulse" /> Tú lo imaginas, nosotros lo creamos
      </div>
      <h1 className="text-6xl md:text-9xl font-black text-white mb-10 leading-[0.85] tracking-tighter">
        DISEÑO <br />
        <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-rose-500 bg-clip-text text-transparent">SIN LÍMITES</span>
      </h1>
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <button onClick={() => setPage('catalog')} className={`${btnNeon} w-full sm:w-auto px-12 py-5 rounded-2xl text-sm uppercase tracking-widest shadow-2xl`}>Explorar Catálogo</button>
        <button onClick={() => setPage('about')} className="text-white text-xs font-black uppercase tracking-[0.3em] hover:text-cyan-400 transition-colors flex items-center gap-3">Nuestra Historia <ArrowRight className="w-4 h-4" /></button>
      </div>
    </div>
  </section>
);  

const FeaturedSection = ({ setPage }: { setPage: (p: Page) => void }) => (
  <section className="py-32 px-6 bg-slate-950 relative overflow-hidden">
    <ClawScratches className="left-auto right-0 rotate-90 opacity-15 scale-125" />
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="flex justify-between items-end mb-24">
        <SectionHeader title="Destacados" subtitle="Lo más pedido." light />
        <button onClick={() => setPage('catalog')} className="text-xs font-black uppercase tracking-widest text-cyan-400 hover:text-white transition-colors pb-10">
          Ver todo <ArrowRight className="inline w-4 h-4 ml-2" />
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-20">
        <ProductCard product={PRODUCTS[0]} />
        <ProductCard product={PRODUCTS[1]} />
      </div>
    </div>
  </section>
);

const ProductCard = ({ product }: { product: Product }) => (
  <div className="group cursor-pointer">
    <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-slate-900 border border-white/5 mb-10 transition-transform duration-700 group-hover:-translate-y-4">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
    </div>
    <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">{product.name}</h3>
    <p className="text-slate-500 text-lg mb-8 font-medium">{product.description}</p>
  </div>
);

const Steps = () => (
  <section className="py-32 bg-slate-950 relative overflow-hidden">
    <ClawScratches className="opacity-10 translate-y-1/2 scale-150" />
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid md:grid-cols-3 gap-10">
        {[
          { id: "01", title: "ELECCIÓN", desc: "Selecciona el soporte perfecto para tu idea.", color: "border-emerald-500/30" },
          { id: "02", title: "DISEÑO", desc: "Envíanos tu arte o déjanos crearlo por ti.", color: "border-cyan-500/30" },
          { id: "03", title: "ENTREGA", desc: "Recibe tu producto en tiempo récord.", color: "border-rose-500/30" }
        ].map((step) => (
          <div key={step.id} className={`p-12 bg-white/5 rounded-[2.5rem] border ${step.color} group hover:bg-white/10 transition-all duration-500 backdrop-blur-sm`}>
            <span className="text-6xl font-black text-white/5 mb-8 block group-hover:text-white transition-colors duration-700 italic">{step.id}</span>
            <h3 className="text-xl font-black text-white mb-4 uppercase tracking-[0.2em]">{step.title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ReviewsSection = () => (
  <section className="py-24 bg-slate-950 relative overflow-hidden">
    <ClawScratches className="opacity-10 -scale-x-100 translate-y-1/2" />
    
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-4">
          Lo que dicen <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Nuestros Clientes</span>
        </h2>
        <div className="flex justify-center gap-1 text-rose-500">
          {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {REVIEWS.map((review) => (
          <div 
            key={review.id} 
            className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] hover:border-cyan-400/30 transition-all group"
          >
            <div className="flex gap-1 mb-4 text-cyan-400">
              {[...Array(review.stars)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            
            <p className="text-slate-300 italic mb-6 leading-relaxed">
              "{review.content}"
            </p>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-rose-500 flex items-center justify-center font-black text-slate-950 text-xs">
                {review.name[0]}
              </div>
              <div>
                <h4 className="text-white font-black text-sm uppercase tracking-widest">{review.name}</h4>
                <p className="text-slate-500 text-[10px] uppercase font-bold">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-32 px-6 bg-slate-950 relative overflow-hidden">
    <ClawScratches className="opacity-25 scale-150 rotate-[-15deg] translate-x-1/2" />
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-slate-900 to-black rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden border border-white/5 shadow-2xl">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-500/5 blur-[100px] rounded-full"></div>
      <h2 className="text-5xl md:text-8xl font-black text-white mb-10 leading-tight relative z-10 tracking-tighter italic">¿LISTO PARA<br /><span className="text-slate-600">CREAR?</span></h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center relative z-10">
        <a href={WA_URL} target="_blank" rel="noreferrer" className={`${btnWhatsApp} px-14 py-6 rounded-2xl text-xs uppercase tracking-[0.3em] font-black`}>WHATSAPP</a>
        <a href={WA_URL} target="_blank" rel="noreferrer" className={`${btnBase} bg-white text-slate-950 px-14 py-6 rounded-2xl text-xs uppercase tracking-[0.3em] font-black`}>VER TRABAJOS</a>
      </div>
    </div>
  </section>
);



// --- Navbar ---
const Navbar = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => (
  <nav className="fixed top-0 left-0 right-0 bg-slate-950/80 backdrop-blur-xl z-50 border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
      <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setPage('home')}>
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="absolute w-full h-full animate-rotate">
            <defs>
              <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
              <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="50%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
            </defs>
            <text className="neon-glow font-black uppercase tracking-[0.2em]" style={{ fontSize: '9.5px' }}>
              <textPath href="#circlePath" fill="url(#neonGradient)">SUBLIMACIONES • SUBLIMACIONES • </textPath>
            </text>
          </svg>
          <div className="relative z-10 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-white italic tracking-tighter leading-none group-hover:scale-110 transition-transform duration-500">N&C</span>
          </div>
        </div>
        <div className="hidden lg:block">
          <span className="font-bold text-lg tracking-tighter text-white uppercase block leading-none">N&C</span>
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-rose-500 bg-clip-text text-transparent font-black text-xs uppercase tracking-widest">SUBLIMACION</span>
        </div>
      </div>
      <div className="hidden md:flex gap-10 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
        <button onClick={() => setPage('home')} className={`${currentPage === 'home' ? 'text-white' : 'hover:text-cyan-400'} transition-colors`}>Inicio</button>
        <button onClick={() => setPage('catalog')} className={`${currentPage === 'catalog' ? 'text-white' : 'hover:text-cyan-400'} transition-colors`}>Catálogo</button>
        <button onClick={() => setPage('about')} className={`${currentPage === 'about' ? 'text-white' : 'hover:text-cyan-400'} transition-colors`}>Nosotros</button>
      </div>
      <a href={WA_URL} target="_blank" rel="noreferrer" className={`${btnWhatsApp} px-6 py-2.5 rounded-full text-xs uppercase tracking-widest`}>
        <MessageCircle className="w-4 h-4" /> <span>WhatsApp</span>
      </a>
    </div>
  </nav>
);

// --- Footer ---
const Footer = ({ setPage }: { setPage: (p: Page) => void }) => (
  <footer className="bg-slate-950 text-slate-600 py-32 border-t border-white/5 relative overflow-hidden">
    <ClawScratches className="opacity-10 rotate-45 scale-150" />
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-24 relative z-10">
      <div className="space-y-10">
        <div className="flex items-center gap-6 cursor-pointer group" onClick={() => setPage('home')}>
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="absolute w-full h-full animate-rotate">
              <defs>
                <path id="footerCirclePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                <linearGradient id="footerNeonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4ade80" /><stop offset="50%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>
              <text className="neon-glow font-black uppercase tracking-[0.2em]" style={{ fontSize: '9.5px' }}>
                <textPath href="#footerCirclePath" fill="url(#footerNeonGradient)">SUBLIMACIONES • SUBLIMACIONES • </textPath>
              </text>
            </svg>
            <div className="relative z-10 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white italic tracking-tighter leading-none group-hover:scale-110 transition-transform duration-500">N&C</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-2xl tracking-tighter text-white uppercase">N&C</span>
            <span className="text-cyan-400 text-[10px] font-black tracking-[0.3em] uppercase">Studio</span>
          </div>
        </div>
        <p className="text-lg leading-relaxed font-medium text-slate-500 uppercase tracking-tight">Tú lo imaginas, nosotros lo creamos.</p>
      </div>
      <div>
        <h4 className="text-white font-black text-xs mb-10 tracking-[0.4em] uppercase">Mapa</h4>
        <ul className="space-y-4">
          <li><button onClick={() => setPage('home')} className="hover:text-white transition-colors uppercase tracking-widest text-[10px] font-black">Inicio</button></li>
          <li><button onClick={() => setPage('catalog')} className="hover:text-white transition-colors uppercase tracking-widest text-[10px] font-black">Catálogo</button></li>
          <li><button onClick={() => setPage('about')} className="hover:text-white transition-colors uppercase tracking-widest text-[10px] font-black">Nosotros</button></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-black text-xs mb-10 tracking-[0.4em] uppercase">Contacto</h4>
        <a href={WA_URL} target="_blank" rel="noreferrer" className="text-sm font-medium leading-loose text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-widest">Enviar WhatsApp</a>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black tracking-[0.5em] text-slate-800 uppercase relative z-10">
      <span>&copy; {new Date().getFullYear()} N&C SUBLIMACIÓN</span>
      <span>ALL RIGHTS RESERVED</span>
    </div>
  </footer>
);

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const handleSetPage = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-cyan-400 selection:text-slate-950 bg-slate-950 font-['Poppins']">
      <Navbar currentPage={page} setPage={handleSetPage} />
      <main>
        {page === 'home' && <HomePage setPage={handleSetPage} />}
        {page === 'catalog' && <CatalogPage />}
        {page === 'about' && <AboutPage />}
      </main>
      <Footer setPage={handleSetPage} />
    </div>
  );
}