import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight, ChevronLeft, Plus, Minus, ArrowRight, Check, ShieldAlert, FlaskConical, Award, Trash2, MessageCircle, X, Send } from 'lucide-react';
import { Link } from 'react-router-dom';


// ==========================================
// 3D LIGHTNING BOLTS (SVG Revert)
// ==========================================
function LightningBolts({ color }) {
  const flashVariants = {
    animate: {
      opacity: [0, 0, 1, 0, 1, 0, 0, 0],
      transition: { duration: 4, repeat: Infinity, times: [0, 0.8, 0.82, 0.85, 0.88, 0.92, 1] }
    }
  };

  return (
    <motion.div 
      className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen"
      variants={flashVariants}
      animate="animate"
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 10 0 L 15 20 L 5 40 L 20 60 L 10 80 L 15 100" fill="none" stroke={color} strokeWidth="0.5" style={{ filter: "none" }} />
        <path d="M 90 0 L 85 15 L 95 30 L 80 50 L 90 75 L 85 100" fill="none" stroke={color} strokeWidth="0.5" style={{ filter: "none" }} />
        <path d="M 15 20 L 30 35 L 20 50" fill="none" stroke={color} strokeWidth="0.3" style={{ filter: "none" }} />
        <path d="M 85 15 L 70 25 L 75 40" fill="none" stroke={color} strokeWidth="0.3" style={{ filter: "none" }} />
        <path d="M 50 -10 L 45 20 L 55 40 L 40 60 L 60 80 L 50 110" fill="none" stroke="#fff" strokeWidth="0.2" style={{ filter: "none" }} />
      </svg>
    </motion.div>
  );
}

// ==========================================
// HERO TICKER STRIP
// ==========================================
const TICKER_ITEMS = [
  "UNSEEN POWER", "ZERO SUGAR", "THE WOLF RUNS AT NIGHT", "DARK ENERGY", "PREMIUM CATALYST"
];

function HeroTicker({ activeColor }) {
  // Duplicate items more times since we have fewer words to ensure seamless loop
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      className="relative w-full overflow-hidden py-3 z-20 pointer-events-none"
      style={{
        borderTop: `1px solid ${activeColor}33`,
        borderBottom: `1px solid ${activeColor}33`,
        background: `linear-gradient(90deg, transparent, ${activeColor}10, transparent)`,
      }}
    >
      {/* Left / right fade masks */}
      <div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #7dd3fc, transparent)' }} />
      <div className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #7dd3fc, transparent)' }} />

      <div className="flex whitespace-nowrap hero-ticker-track">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-12 mx-12">
            <span
              className="text-[11px] font-bold tracking-wide font-sans"
              style={{ color: activeColor, textShadow: "none" }}
            >
              {item}
            </span>
            <span className="text-[8px] opacity-40" style={{ color: activeColor }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// HERO SECTION
// ==========================================
function Hero({ activeColor, activeFlavor }) {
  const heroData = {
    'Sugar Free': {
      eyebrow: 'ZERO SUGAR. FULL POWER.',
      title: 'Fantome Sugar Free',
      image: '/hero_original.png?v=1',
      bg: '#0798d0',
      copy: 'A sharper, lighter charge with the same unseen punch.'
    },
    'Mojito': {
      eyebrow: 'MINT. LIME. NIGHT DRIVE.',
      title: 'Fantome Mojito',
      image: '/hero_mojito.png?v=1',
      bg: '#059669',
      copy: 'Refreshing green energy with a clean ready-to-drink finish.'
    },
    'Original': {
      eyebrow: 'PREMIUM ENERGY CATALYST',
      title: 'Fantome Original',
      image: '/hero_original.png?v=1',
      bg: '#0ea5e9',
      copy: 'The core Fantome hit: bold taste, clean can, instant brand recall.'
    }
  };

  const currentHero = heroData[activeFlavor] || heroData['Sugar Free'];
  return (
    <section className="relative min-h-screen overflow-hidden pt-32 text-white" style={{ background: `radial-gradient(circle at 78% 42%, ${activeColor}55 0%, rgba(0,0,0,0) 34%), linear-gradient(135deg, #030406 0%, #070b10 44%, #000000 100%)` }}>
      <div className="absolute inset-0 pointer-events-none opacity-50" style={{ background: `linear-gradient(90deg, ${activeColor}18 0%, transparent 34%, ${activeColor}12 100%)` }} />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl grid-cols-1 items-center gap-8 px-6 pb-20 md:grid-cols-[0.9fr_1.1fr] md:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl pt-10 md:pt-0"
        >
          <p className="mb-7 text-sm font-black uppercase tracking-[0.18em] text-white/70 md:text-base">
            {currentHero.eyebrow}
          </p>
          <h1 className="font-sans text-6xl font-black leading-[0.92] tracking-normal text-white sm:text-7xl lg:text-8xl">
            {currentHero.title.split(' ').slice(0, -1).join(' ')}
            <span className="block">{currentHero.title.split(' ').slice(-1)}</span>
          </h1>
          <p className="mt-7 max-w-md text-base font-semibold leading-7 text-white/78 md:text-lg">
            {currentHero.copy}
          </p>
          <button
            type="button"
            onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-9 inline-flex items-center gap-4 rounded-full border px-9 py-4 text-base font-black text-white shadow-[0_18px_45px_rgba(0,0,0,0.42)] transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
            style={{ backgroundColor: '#05080d', borderColor: activeColor, boxShadow: `0 18px 45px rgba(0,0,0,0.42), 0 0 28px ${activeColor}55` }}
          >
            Buy now
            <ChevronRight className="h-5 w-5" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 35, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative flex min-h-[52vh] items-end justify-center md:min-h-[calc(100vh-11rem)] md:justify-end"
        >
          <div className="absolute bottom-5 right-[8%] h-16 w-[52%] rounded-full blur-2xl" style={{ backgroundColor: `${activeColor}55` }} />
          <img
            src={currentHero.image}
            alt={`${activeFlavor} Fantome can`}
            className="relative z-10 h-[56vh] max-h-[760px] w-auto max-w-none object-contain drop-shadow-[0_32px_45px_rgba(0,0,0,0.58)] sm:h-[64vh] md:h-[82vh]"
          />
        </motion.div>
      </div>
    </section>
  );
}
// ==========================================
// BRAND STORY & FORMULATION
// ==========================================
// ==========================================
// BRAND STORY & FORMULATION
// ==========================================
const NUTRITION_DATA = {
  'Mojito': {
    servingSize: "Per 100 ml (Approx.)",
    values: [
      { name: "Energy", val: "37.5 kcal" },
      { name: "Total Fat", val: "0 g" },
      { name: "Protein", val: "0 g" },
      { name: "Total Carbohydrate", val: "9.3 g" },
      { name: "Sugar", val: "9.05 g" },
      { name: "Sodium", val: "35 mg" }
    ],
    bioElements: [
      { name: "Taurine", val: "320 mg" },
      { name: "Inositol", val: "20 mg" },
      { name: "Caffeine", val: "30 mg" },
      { name: "Niacin (Vit B3)", val: "2.4 mg" },
      { name: "Pantothenic Acid (Vit B5)", val: "0.9 mg" },
      { name: "Vitamin B6", val: "0.4 mg" },
      { name: "Vitamin B12", val: "0.2 µg" }
    ]
  },
  'Original': {
    servingSize: "Per 100 ml (Approx.)",
    values: [
      { name: "Energy", val: "37.5 kcal" },
      { name: "Total Fat", val: "0 g" },
      { name: "Protein", val: "0 g" },
      { name: "Total Carbohydrate", val: "9.3 g" },
      { name: "Sugar", val: "9.05 g" },
      { name: "Sodium", val: "35 mg" }
    ],
    bioElements: [
      { name: "Taurine", val: "320 mg" },
      { name: "Inositol", val: "20 mg" },
      { name: "Caffeine", val: "30 mg" },
      { name: "Niacin (Vit B3)", val: "2.4 mg" },
      { name: "Pantothenic Acid (Vit B5)", val: "0.9 mg" },
      { name: "Vitamin B6", val: "0.4 mg" },
      { name: "Vitamin B12", val: "0.2 µg" }
    ]
  },
  'Sugar Free': {
    servingSize: "Per 100 ml (Approx.)",
    values: [
      { name: "Energy", val: "6 kcal (= 25 kJ)" },
      { name: "Total Fat", val: "0 g" },
      { name: "Protein", val: "0 g" },
      { name: "Total Carbohydrate", val: "3.0 g" },
      { name: "Sugar", val: "0 g" },
      { name: "Sodium", val: "14 mg" }
    ],
    bioElements: [
      { name: "Taurine", val: "160 mg" },
      { name: "Inositol", val: "20 mg" },
      { name: "Caffeine", val: "30 mg" },
      { name: "Niacin (Vit B3)", val: "0.96 mg" },
      { name: "Pantothenic Acid (Vit B5)", val: "0.9 mg" },
      { name: "Vitamin B6", val: "0.16 mg" },
      { name: "Vitamin B12", val: "0.08 µg" }
    ]
  }
};

function StorySection({ activeColor, activeFlavor }) {
  const nutrition = NUTRITION_DATA[activeFlavor] || NUTRITION_DATA['Mojito'];
  
  return (
    <section id="story" className="py-32 px-6 max-w-7xl mx-auto relative overflow-hidden">
      
      

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <span className="text-sm font-semibold tracking-[0.3em] uppercase" style={{ color: activeColor }}>
            Biological Catalyst
          </span>
          <h2 className="text-4xl md:text-6xl font-bold font-sans uppercase leading-tight">
            Scientific <br />
            <span className="text-sky-950">Formulation</span>
          </h2>
          <p className="text-sky-800 text-lg leading-relaxed font-light">
            Engineered with high precision. Fantôme delivers a potent energy profile driven by B-Complex vitamins, pure Taurine, and exact Caffeine mapping. Crafted for zero fat accumulation and optimal metabolic acceleration.
          </p>
          
          {/* Quick Metrics */}
          <div className="flex gap-8">
            <div>
              <h4 className="text-3xl font-bold font-sans" style={{ color: activeColor }}>
                {activeFlavor === 'Sugar Free' ? '75 mg' : '75 mg'}
              </h4>
              <p className="text-xs text-sky-700 tracking-wide mt-1">Caffeine / 250ml</p>
            </div>
            <div className="border-l border-sky-400/30" />
            <div>
              <h4 className="text-3xl font-bold font-sans" style={{ color: activeColor }}>
                {activeFlavor === 'Sugar Free' ? '15 kcal' : '93.75 kcal'}
              </h4>
              <p className="text-xs text-sky-700 tracking-wide mt-1">Energy / 250ml</p>
            </div>
            <div className="border-l border-sky-400/30" />
            <div>
              <h4 className="text-3xl font-bold font-sans" style={{ color: activeColor }}>
                {activeFlavor === 'Sugar Free' ? '400 mg' : '800 mg'}
              </h4>
              <p className="text-xs text-sky-700 tracking-wide mt-1">Taurine / 250ml</p>
            </div>
          </div>
        </motion.div>

        {/* Real Nutrition Facts Label Layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="p-8 rounded-3xl glass-panel shadow-2xl relative overflow-hidden"
        >
          
          
          <div className="flex items-center gap-3 border-b border-sky-400/30 pb-4 mb-6">
            <FlaskConical className="w-6 h-6" style={{ color: activeColor }} />
            <h3 className="font-sans font-bold text-2xl tracking-widest uppercase">LABORATORY SPECIFICATION</h3>
          </div>

          <div className="space-y-4">
            <div className="border-b border-sky-400/30 pb-2">
              <span className="text-xs text-slate-500 tracking-wide">Typical Values</span>
              <h4 className="text-lg font-bold font-sans uppercase mt-0.5">{nutrition.servingSize}</h4>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm border-b border-sky-400/20 pb-4">
              {nutrition.values.map((item, idx) => (
                <div key={idx} className="flex justify-between border-b border-sky-400/10 py-1">
                  <span className="text-slate-600">{item.name}</span>
                  <span className="font-bold">{item.val}</span>
                </div>
              ))}
            </div>

            <div>
              <span className="text-xs text-slate-500 tracking-wide">Active Bio-Elements & Vitamins</span>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2 text-xs">
                {nutrition.bioElements.map((item, idx) => (
                  <div key={idx} className={`flex justify-between py-0.5 border-b border-sky-400/10 ${item.name === 'Vitamin B12' ? 'col-span-2' : ''}`}>
                    <span className="text-slate-600">{item.name}</span>
                    <span className="font-bold text-slate-800">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// FLAVORS INTERACTIVE CAROUSEL
// ==========================================
function FlavorsSection({ activeColor, setActiveColor, activeFlavor, setActiveFlavor, flavors }) {
  const currentIdx = flavors.findIndex(f => f.title === activeFlavor);
  const [isFormulaOpen, setIsFormulaOpen] = useState(false);
  const activeNutrition = NUTRITION_DATA[flavors[currentIdx].title] || NUTRITION_DATA.Mojito;

  const nextSlide = () => {
    const next = (currentIdx + 1) % flavors.length;
    setActiveFlavor(flavors[next].title);
    setActiveColor(flavors[next].color);
  };

  const prevSlide = () => {
    const prev = (currentIdx - 1 + flavors.length) % flavors.length;
    setActiveFlavor(flavors[prev].title);
    setActiveColor(flavors[prev].color);
  };

  return (
    <section id="flavors" className="py-32 px-6 max-w-7xl mx-auto relative z-20">
      <div className="text-center mb-20">
        <span className="text-sm font-semibold tracking-[0.3em] uppercase" style={{ color: activeColor }}>
          Chemical Breakdown
        </span>
        <h2 className="text-4xl md:text-6xl font-bold font-sans uppercase mt-2">
          Formula Variations
        </h2>
      </div>

      <div className="relative flex flex-col lg:flex-row gap-16 items-center justify-center">
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 lg:left-8 z-30 p-4 rounded-full glass-panel hover:bg-sky-300/60 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 text-slate-800" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-0 lg:right-8 z-30 p-4 rounded-full glass-panel hover:bg-sky-300/60 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 text-slate-800" />
        </button>

        {/* Carousel Content */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full max-w-5xl px-12"
          >
            {/* Visual Preview displaying respective Can artwork background texture */}
            <div className="relative w-full aspect-square rounded-3xl glass-panel p-12 bg-gradient-to-br from-sky-300/40 to-sky-400/20 flex items-center justify-center overflow-hidden">
              <div 
                className="absolute inset-0 blur-3xl opacity-25 transition-all duration-500"
                style={{ background: `radial-gradient(circle, ${flavors[currentIdx].color} 0%, transparent 70%)` }}
              />
              {/* Sleek mockup card containing the floating transparent can */}
              <motion.div 
                initial={{ scale: 0.8, rotate: -5, y: 10 }}
                animate={{ scale: 1, rotate: 0, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`${flavors[currentIdx].formulaWide ? 'w-72 h-48 sm:w-80 sm:h-56 lg:w-96 lg:h-64 bg-white/90 p-0' : 'w-48 h-72 sm:w-52 sm:h-80 lg:w-56 lg:h-88 bg-sky-300/50 p-4 lg:p-6'} rounded-2xl border border-sky-400/30 shadow-2xl relative z-10 flex flex-col items-center justify-center overflow-hidden backdrop-blur-md`}
              >
                {/* Radial glow specific to flavor inside the card */}
                <div 
                  className="absolute inset-0 blur-3xl opacity-20 transition-all duration-500 rounded-full w-32 h-32 m-auto"
                  style={{ background: flavors[currentIdx].color }}
                />
                
                {/* Center floating transparent can */}
                <motion.img 
                  src={flavors[currentIdx].canFront} 
                  alt={flavors[currentIdx].title}
                  className={`${flavors[currentIdx].formulaWide ? 'w-full h-full' : 'w-full h-4/5'} object-contain relative z-20`}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              </motion.div>
            </div>

            {/* Flavors Details */}
            <div className="space-y-8">
              <span className="px-4 py-1 text-xs font-bold tracking-wide rounded-full border" style={{ borderColor: flavors[currentIdx].color, color: flavors[currentIdx].color }}>
                {flavors[currentIdx].flavor}
              </span>
              <h3 className="text-4xl md:text-5xl font-bold font-sans uppercase">
                {flavors[currentIdx].title} Formulation
              </h3>
              <p className="text-slate-600 font-light leading-relaxed">
                {flavors[currentIdx].desc}
              </p>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h4 className="text-sm font-bold tracking-wide text-slate-800">Full Ingredient Manifest:</h4>
                  <button
                    type="button"
                    onClick={() => setIsFormulaOpen(true)}
                    className="w-fit rounded-full border px-4 py-2 text-xs font-bold tracking-wide transition-colors hover:bg-sky-300/30 cursor-pointer"
                    style={{ borderColor: flavors[currentIdx].color, color: flavors[currentIdx].color }}
                  >
                    View Premium Formula
                  </button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed bg-sky-300/30 border border-sky-400/30 p-4 rounded-2xl font-light">
                  {flavors[currentIdx].fullIngredients}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isFormulaOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-6 backdrop-blur-md"
            onClick={() => setIsFormulaOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              className="w-full max-w-2xl rounded-2xl border border-sky-400/30 bg-slate-950/95 p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-6 border-b border-sky-400/20 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: flavors[currentIdx].color }}>
                    Fully Disclosed
                  </span>
                  <h3 className="mt-2 text-3xl font-bold uppercase text-white">{flavors[currentIdx].title} Formula</h3>
                </div>
                <button type="button" onClick={() => setIsFormulaOpen(false)} className="rounded-full p-2 text-slate-300 hover:bg-white/10 cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-sky-400/20 bg-white/5 p-4">
                  <span className="text-xs uppercase tracking-wide text-slate-400">Caffeine</span>
                  <strong className="mt-2 block text-2xl text-white">75 mg</strong>
                  <p className="mt-1 text-xs text-slate-400">Per 250 ml can</p>
                </div>
                <div className="rounded-xl border border-sky-400/20 bg-white/5 p-4">
                  <span className="text-xs uppercase tracking-wide text-slate-400">Sugar</span>
                  <strong className="mt-2 block text-2xl text-white">{flavors[currentIdx].title === 'Sugar Free' ? '0 g' : '22.6 g'}</strong>
                  <p className="mt-1 text-xs text-slate-400">Clearly labeled per can</p>
                </div>
                <div className="rounded-xl border border-sky-400/20 bg-white/5 p-4">
                  <span className="text-xs uppercase tracking-wide text-slate-400">Taurine</span>
                  <strong className="mt-2 block text-2xl text-white">{flavors[currentIdx].title === 'Sugar Free' ? '400 mg' : '800 mg'}</strong>
                  <p className="mt-1 text-xs text-slate-400">Performance support</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {activeNutrition.bioElements.map((item) => (
                  <div key={item.name} className="flex justify-between gap-4 border-b border-sky-400/10 py-2 text-slate-300">
                    <span>{item.name}</span>
                    <strong className="text-white">{item.val}</strong>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ==========================================
// SHOP SECTION (Coming Soon)
// ==========================================
function ShopSection({ activeColor }) {
  const [selectedCrateFlavor, setSelectedCrateFlavor] = useState("Mojito");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 14, hours: 21, minutes: 34, seconds: 45 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const crateFlavors = [
    { name: "Mojito", color: "#059669", graphic: "/mojito_perfect.png?v=7" },
    { name: "Original", color: "#DC2626", graphic: "/original_perfect.png?v=7" },
    { name: "Sugar Free", color: "#475569", graphic: "/sugarfree_perfect.png?v=8" }
  ];

  const currentCrateFlavorInfo = crateFlavors.find(f => f.name === selectedCrateFlavor) || crateFlavors[0];

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <section id="shop" className="py-32 px-6 max-w-7xl mx-auto relative z-20">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 pointer-events-none" style={{ backgroundColor: activeColor }} />

      <div className="text-center mb-20">
        <span className="text-sm font-semibold tracking-[0.3em] uppercase" style={{ color: activeColor }}>
          Official Store
        </span>
        <h2 className="text-4xl md:text-6xl font-bold font-sans uppercase mt-2">
          Coming Soon
        </h2>
        <p className="text-slate-600 text-sm md:text-base font-light tracking-wide mt-4">
          The next-generation secure case drop is currently in synchronization
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Exclusive Crate Preview (Single Can removed as requested) */}
        <div className="lg:col-span-6 flex justify-center">
          <motion.div
            whileHover={{ y: -10 }}
            className="w-full max-w-md p-8 rounded-3xl glass-panel flex flex-col justify-between group bg-gradient-to-br from-sky-300/30 to-sky-400/10 relative overflow-hidden"
          >
            {/* Glowing activeColor aura */}
            
            
            <div>
              <div className="flex justify-between items-start">
                <span className="text-xs tracking-wide font-bold" style={{ color: currentCrateFlavorInfo.color }}>24 + 3 Cans Free</span>
                <span className="bg-sky-300/50 border border-sky-400/30 text-slate-800 text-[9px] font-bold tracking-wide px-3 py-1 rounded-full">
                  COMING SOON
                </span>
              </div>
              
              <h3 className="text-3xl font-bold font-sans uppercase mt-4 text-slate-800">
                {selectedCrateFlavor} Case
              </h3>
              
              <div className="mt-6 aspect-square rounded-2xl bg-sky-300/30 border border-sky-400/30 flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:scale-[1.02]">
                {/* Radial glow background */}
                <div 
                  className="absolute inset-0 blur-2xl opacity-20 transition-all duration-500"
                  style={{ background: `radial-gradient(circle, ${currentCrateFlavorInfo.color} 0%, transparent 70%)` }}
                />

                {/* Center product can image */}
                <img 
                  src={currentCrateFlavorInfo.graphic} 
                  alt={`${currentCrateFlavorInfo.name} Can`}
                  className="h-4/5 object-contain relative z-10"
                  style={{ filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.6))" }}
                />

                {/* Vault Locked overlay */}
                <div className="absolute inset-0 bg-sky-300/20 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 z-20">
                  <div className="p-4 rounded-full bg-sky-300/50 border border-sky-400/30 text-slate-800 shadow-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" style={{ color: currentCrateFlavorInfo.color }}>
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold tracking-wide text-slate-800 mt-2">TRANSMISSION LOCKED</span>
                </div>
                
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-800/10 absolute bottom-12 z-10 font-sans">FANTÔME SECURE CASE</span>
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-[9px] font-bold bg-sky-300/50 border border-sky-400/30 z-30 tracking-widest uppercase">
                  27 Cans Total
                </div>
              </div>

              {/* Flavor Selector */}
              <div className="mt-6">
                <span className="text-[10px] tracking-wide text-sky-850 block mb-2.5 font-bold">Preview Crate Flavor</span>
                <div className="flex gap-2">
                  {crateFlavors.map(f => (
                    <button
                      key={f.name}
                      onClick={() => setSelectedCrateFlavor(f.name)}
                      className={`flex-1 py-2 px-3 text-[10px] rounded-xl border transition-all font-bold uppercase cursor-pointer text-center ${
                        selectedCrateFlavor === f.name 
                          ? 'bg-sky-600 text-white hover:bg-sky-700 border-sky-700' 
                          : 'bg-sky-300/20 text-slate-700 border-sky-400/30 hover:bg-sky-300/50 hover:border-sky-400/50'
                      }`}
                      style={selectedCrateFlavor === f.name ? { boxShadow: "none" } : {}}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between pt-6 border-t border-sky-400/30">
              <div>
                <span className="text-xs text-slate-500 tracking-wide">Target Price</span>
                <h4 className="text-2xl font-bold font-sans text-slate-800 mt-1">{formatPrice(1440)}</h4>
              </div>
              
              <span className="text-xs font-bold tracking-wide text-slate-700 py-3 px-5 rounded-xl border border-sky-400/30 bg-sky-300/50">
                LOCKED
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Cybernetic Terminal UI with Countdown & Alert Sign Up */}
        <div className="lg:col-span-6 space-y-6">
          {/* Terminal Box */}
          <div className="p-8 rounded-3xl glass-panel border border-sky-400/40 shadow-2xl relative overflow-hidden">
            
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-sky-400/30 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <h3 className="font-sans font-bold text-xl tracking-widest uppercase text-slate-800">SECURE ACCESS LOCKOUT</h3>
              </div>
              <span className="text-[9px] font-mono text-sky-900 bg-sky-300/50 px-2 py-1 rounded border border-sky-400/30">SYS.V_2.0</span>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed font-light mb-8">
              The official Fantôme secure case containing our premier energy catalyst variations is currently under orbital dispatch. The single bottle cans for sale are discontinued to prioritize high-capacity case deployments.
            </p>

            {/* Glowing Countdown */}
            <div className="space-y-3 mb-8">
              <span className="text-[10px] tracking-wide text-sky-800 font-bold block">Transmission Synchronization Est. Time</span>
              <div className="grid grid-cols-4 gap-3 text-center">
                {[
                  { label: "DAYS", val: timeLeft.days },
                  { label: "HOURS", val: timeLeft.hours },
                  { label: "MINUTES", val: timeLeft.minutes },
                  { label: "SECONDS", val: timeLeft.seconds }
                ].map((t, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-sky-300/30 border border-sky-400/30 flex flex-col justify-center">
                    <span className="text-2xl md:text-3xl font-bold font-sans tracking-tight text-sky-950" style={{ textShadow: "none" }}>
                      {String(t.val).padStart(2, '0')}
                    </span>
                    <span className="text-[8px] text-sky-800 font-bold tracking-widest uppercase mt-1">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Notify Form */}
            <div className="border-t border-sky-400/30 pt-6">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubscribe} 
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span className="text-[10px] tracking-wide text-sky-800 font-bold block">Register for launch authorization</span>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ENTER SECURE EMAIL ADDRESS"
                        className="px-5 py-4 rounded-2xl glass-panel bg-sky-300/30 text-xs tracking-wide font-semibold border border-sky-400/30 flex-grow focus:outline-none focus:border-sky-500 transition-colors text-slate-800"
                      />
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="px-6 py-4 rounded-2xl bg-sky-600 text-white hover:bg-sky-700 font-bold tracking-wide text-xs flex items-center justify-center transition-colors cursor-pointer"
                        style={{ boxShadow: "none" }}
                      >
                        Authorize
                      </motion.button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-5 rounded-2xl bg-sky-300/20 border border-sky-400/30 flex items-start gap-4"
                  >
                    <div className="p-2 rounded-xl bg-sky-300/40 text-sky-900 mt-0.5 animate-pulse">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-sm tracking-wide text-slate-800">TRANSMISSION ESTABLISHED</h4>
                      <p className="text-xs text-slate-650 mt-1 leading-relaxed">
                        Security authorization verified. You will receive priority access notifications the microsecond the crate drops.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Subtle details bullet points */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl border border-sky-400/30 bg-sky-300/30 space-y-1">
              <span className="font-bold text-slate-800 block tracking-wide">Priority Distribution</span>
              <p className="text-sky-900 font-light leading-relaxed">Secure Case orders receive automatic express distribution globally.</p>
            </div>
            <div className="p-4 rounded-2xl border border-sky-400/30 bg-sky-300/30 space-y-1">
              <span className="font-bold text-slate-800 block tracking-wide">Discontinued Singles</span>
              <p className="text-sky-900 font-light leading-relaxed">Individual cans removed to focus entirely on specialized 27-can crates.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// CAMPAIGNS SECTION
// ==========================================
function CampaignsSection({ activeColor }) {
  const campaigns = [
    {
      id: "adcampaign",
      title: "Our ad Campaign with Shibani",
      tag: "Official Ad",
      desc: "An exclusive energy broadcast campaign featuring Shibani. Unleashing unseen power and metabolic acceleration in high-definition transmission.",
      video: "/adcampaign.mp4",
      stat: "Broadcast Active"
    },
    {
      id: "birla",
      title: "Our Campaign at Times of India Event Hosted at Birla Global University",
      tag: "Event Activation",
      desc: "An elite brand showcase at the prestigious Times of India event, hosted at Birla Global University. Spotlighting the Fantôme premium energy range to academic and corporate leaders.",
      image: "/campaign_birla.jpg",
      stat: "Featured Event"
    },
    {
      id: "launching",
      title: "Our Launching of Fantôme Energy Drink",
      tag: "Grand Launch",
      desc: "The official unveiling of Fantôme Energy Drink. A landmark moment marking the arrival of unseen power into the premium energy market.",
      video: "/launching.mp4",
      stat: "Launch Event"
    }
  ];

  return (
    <section id="campaigns" className="py-32 px-6 max-w-7xl mx-auto relative z-20 border-t border-sky-400/30">
      {/* Glow aura */}
      

      <div className="text-center mb-20">
        <span className="text-sm font-semibold tracking-[0.3em] uppercase" style={{ color: activeColor }}>
          Brand Operations
        </span>
        <h2 className="text-4xl md:text-6xl font-bold font-sans uppercase mt-2">
          Our Campaigns
        </h2>
        <p className="text-sky-900 text-sm md:text-base font-light tracking-wide mt-4">
          Tactical activations and planetary brand maneuvers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {campaigns.map((camp, idx) => (
          <motion.div
            key={camp.id}
            whileHover={{ y: -8 }}
            className={`rounded-3xl overflow-hidden glass-panel border border-sky-400/40 shadow-2xl relative group flex flex-col h-full transform-gpu ${idx === 0 ? "md:col-span-2" : ""}`}
            style={{ contain: "content" }}
          >
            {/* Visual background element */}
            <div className="absolute inset-0 bg-gradient-to-t from-sky-300/40 via-sky-300/10 to-transparent z-10 pointer-events-none" />
            
            {/* Hover glow line */}
            <div className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: activeColor }} />

            <div className="relative aspect-[16/10] overflow-hidden bg-sky-300/30 transform-gpu">
              {camp.video ? (
                <video
                  src={camp.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover transform-gpu"
                  style={{ transform: "translate3d(0, 0, 0)", backfaceVisibility: "hidden" }}
                />
              ) : (
                <img
                  src={camp.image}
                  alt={camp.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu"
                  style={{ transform: "translate3d(0, 0, 0)", backfaceVisibility: "hidden" }}
                />
              )}
              {/* Badge overlay */}
              <div className="absolute top-6 left-6 z-20 flex gap-2">
                <span className="px-3 py-1 rounded-full text-[9px] font-bold tracking-wide bg-sky-300/80 border border-sky-400/30 text-slate-800">
                  {camp.tag}
                </span>
                <span className="px-3 py-1 rounded-full text-[9px] font-bold tracking-wide bg-sky-600 text-white hover:bg-sky-700" style={{ boxShadow: "none" }}>
                  {camp.stat}
                </span>
              </div>
            </div>

            <div className="p-8 relative z-20 space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold font-sans uppercase tracking-wide text-slate-800 group-hover:text-sky-700 transition-all duration-300">
                {camp.title}
              </h3>
              <p className="text-slate-700 font-light leading-relaxed text-sm md:text-base">
                {camp.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* More Campaigns Button */}
      <div className="text-center mt-16">
        <Link
          to="/campaigns"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-sky-600 text-white hover:bg-sky-700 font-bold tracking-wide transition-all duration-300 hover:scale-105 shadow-lg no-underline"
        >
          <span>More Campaigns</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

// ==========================================
// SOCIAL PROOF SECTION
// ==========================================
function SocialProofSection({ activeColor }) {
  const reels = [
    {
      title: "Launch Energy",
      tag: "Nightlife / campus buzz",
      type: "video",
      src: "/launching.mp4"
    },
    {
      title: "Action Campaign",
      tag: "Fitness / high-performance mood",
      type: "video",
      src: "/adcampaign.mp4"
    },
    {
      title: "Retail Hype",
      tag: "Community and local discovery",
      type: "image",
      src: "/campaign_pack_arena.png"
    }
  ];

  return (
    <section id="social-proof" className="py-32 px-6 max-w-7xl mx-auto relative z-20 border-t border-sky-400/30">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
        <div>
          <span className="text-sm font-semibold tracking-[0.3em] uppercase" style={{ color: activeColor }}>
            Community Proof
          </span>
          <h2 className="text-4xl md:text-6xl font-bold font-sans uppercase mt-2">
            Real Hype Signals
          </h2>
        </div>
        <p className="max-w-xl text-slate-600 leading-relaxed">
          Short-form campaign moments help new buyers see Fantome as active, social, and already moving through high-energy spaces like campuses, gyms, gaming nights, and retail counters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reels.map((item) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group overflow-hidden rounded-2xl border border-sky-400/25 bg-slate-950/70 shadow-xl"
          >
            <div className="aspect-[4/5] overflow-hidden bg-black">
              {item.type === "video" ? (
                <video src={item.src} className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" autoPlay muted loop playsInline />
              ) : (
                <img src={item.src} alt={item.title} className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
              )}
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold uppercase text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{item.tag}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// FOUNDER SECTION
// ==========================================
function FounderSection({ activeColor }) {
  return (
    <section className="relative py-32 px-6 border-t border-sky-400/30 bg-[linear-gradient(135deg,rgba(125,211,252,0.1)_0%,rgba(254,215,170,0.1)_100%)] z-20 overflow-hidden">
      {/* Background ambient glow */}
      
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-5/12"
        >
          <div className="relative rounded-3xl overflow-hidden p-2 glass-panel border border-sky-400/40" style={{ boxShadow: "none" }}>
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-sky-200/40">
              <img 
                src="/founder.png" 
                alt="Shri Ankit Khandelwal - Founder" 
                loading="lazy"
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-200/40 via-sky-200/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-3xl font-bold font-sans tracking-wide text-slate-800 mb-2">Shri Ankit Khandelwal</h3>
                <p className="text-sm font-bold tracking-wide" style={{ color: activeColor }}>Eminent Entrepreneur</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-7/12 space-y-10"
        >
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans tracking-wide text-slate-800 leading-tight">
              The Visionary <br />
              <span className="text-slate-800">The Power</span>
            </h2>
            <div className="h-1 w-24 rounded-full" style={{ backgroundColor: activeColor, boxShadow: "none" }} />
          </div>
          
          <div className="space-y-8 text-slate-600 font-light leading-relaxed text-lg lg:text-xl">
            <p>
              A first-generation entrepreneur, <strong className="text-slate-800 font-bold">Shri Ankit Khandelwal</strong> has built a diversified global business enterprise from the ground up. Driven by a relentless pursuit of excellence and an unyielding work ethic, his journey is a testament to what absolute dedication can achieve.
            </p>
            <p>
              Recognizing a critical gap in the market for a truly premium, scientifically backed energy catalyst, he conceptualized <strong className="text-slate-800 font-bold tracking-wider">FANTÔME</strong>. It was designed not merely as a beverage, but as a lifestyle symbol for the relentless, the ambitious, and the unstoppable.
            </p>
            <p>
              Under his visionary leadership, Fantôme Energy merges cutting-edge formulation with dark, sophisticated aesthetics, redefining the boundaries of physical and cognitive performance on a global scale.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// CONNECT SECTION
// ==========================================
function ConnectSection({ activeColor }) {
  const socials = [
    { name: "Instagram", url: "https://www.instagram.com/fantomeenergy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> },
    { name: "YouTube", url: "https://www.youtube.com/@FantomeEnergyDrink", icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg> }
  ];

  return (
    <section id="connect" className="py-32 px-6 max-w-7xl mx-auto relative z-20 border-t border-sky-400/30">
      <div className="text-center mb-20">
        <span className="text-sm font-semibold tracking-[0.3em] uppercase" style={{ color: activeColor }}>
          Network
        </span>
        <h2 className="text-4xl md:text-6xl font-bold font-sans uppercase mt-2">
          Connect Us
        </h2>
        <p className="text-sky-900 text-sm md:text-base font-light tracking-wide mt-4">
          Join the planetary energy transmission
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
        {socials.map((social) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.05 }}
            className="flex flex-col items-center gap-4 p-8 rounded-3xl border border-sky-400/40 glass-panel hover:bg-sky-300/40 transition-colors group cursor-pointer"
            style={{ minWidth: "160px" }}
          >
            <div 
              className="text-slate-800 group-hover:text-slate-800 transition-colors duration-500"
              style={{ filter: "none" }}
            >
              {social.icon}
            </div>
            <span className="font-bold tracking-wide text-sm text-slate-700 group-hover:text-slate-800">
              {social.name}
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// FOOTER / NEWSLETTER / LEGAL COMPLIANCE
// ==========================================
function Footer({ activeColor }) {
  return (
    <footer className="relative border-t border-sky-400/30 bg-sky-300/30 backdrop-blur-xl overflow-hidden py-20 px-6 z-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold font-sans tracking-wide text-slate-800">FANTÔME</h2>
          <p className="text-slate-700 font-light max-w-sm">
            Receive transmission updates on biological formula upgrades, new flavor drops, and exclusive team merchandise releases.
          </p>
          <div className="flex gap-4">
            <input 
              type="email" 
              placeholder="ENTER EMAIL TRANSMISSION"
              className="px-6 py-4 rounded-xl glass-panel bg-sky-300/30 text-sm tracking-wide font-semibold border border-sky-400/30 w-full focus:outline-none focus:border-sky-500 transition-colors text-slate-800"
            />
            <button className="p-4 rounded-xl bg-sky-600 text-white hover:bg-sky-700 font-bold tracking-wide flex items-center justify-center cursor-pointer transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Legal Grid Compliance (Real Addresses & FSSAI Lic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-sky-900 font-medium">
          <div className="p-5 rounded-2xl glass-panel border border-sky-400/40 space-y-3 bg-sky-300/20">
            <h4 className="text-[10px] font-bold tracking-wide text-slate-800">Manufactured By</h4>
            <p className="font-bold text-slate-900">KOLADIYA INDUSTRIES PVT. LTD.</p>
            <p className="leading-relaxed">
              Plot no. 21 to 26, 3rd Phase Industrial Estate, Navagam, Bhavnagar, Gujarat – 364110
            </p>
            <p className="font-bold tracking-wide text-sky-900">
              FSSAI Lic. No: <span className="text-slate-900">10722999000112</span>
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-sky-400/40 space-y-3 bg-sky-300/20">
            <h4 className="text-[10px] font-bold tracking-wide text-slate-800">Marketed By</h4>
            <p className="font-bold text-slate-900">ETHOS GLOBAL FOOD & BEVERAGES PVT. LTD.</p>
            <p className="leading-relaxed">
              Plot No. 10, Nayapalli, Bhubaneswar, Odisha – 751014
            </p>
            <div className="space-y-1">
              <p className="font-bold tracking-wide text-sky-900">
                FSSAI Lic. No: <span className="text-slate-900">10016031000631</span>
              </p>
              <p>Email: <a href="mailto:info@ethosglobal.in" className="text-sky-900/80 hover:text-sky-900 underline">info@ethosglobal.in</a></p>
              <p>Customer Care: <span className="text-slate-900">9090355570</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-sky-400/30 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-sky-800 font-bold tracking-wide">
        <span>© 2026 FANTÔME ENERGY. ALL BIO-SYSTEMS RESERVED.</span>
        <div className="flex items-center gap-6">
          <a 
            href="https://www.instagram.com/fantomeenergy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-sky-400/30 bg-sky-300/30 hover:bg-sky-300/50 transition-all group"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="transition-transform group-hover:scale-110"
              style={{ color: activeColor }}
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span className="text-slate-800 font-bold">Instagram</span>
          </a>
          <span className="w-1 h-1 rounded-full bg-sky-100"></span>
          <span style={{ color: activeColor }} className="font-bold transition-colors duration-500">UNSEEN POWER</span>
        </div>
      </div>
    </footer>
  );
}

// ==========================================
// CHATBOT COMPONENT
// ==========================================
function FantomeChatbot({ activeColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to Fantôme Energy. I am your biological catalyst assistant. How can I augment your experience today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const promoSentRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [isOpen, messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Automated Response Logic
    setTimeout(() => {
      // Default response for complex questions
      let responseText = "For any complex questions, kindly WhatsApp us at our number: +91 9090355570";
      const query = userMsg.text.toLowerCase();

      // Basic questions handling
      if (query.match(/\b(h+i+|h+e+l+o+|h+e+y+|greetings)\b/i)) {
        responseText = "Hello! Welcome to Fantôme Energy. How can I assist you today?";
      } else if (query.includes("flavor") || query.includes("flavour") || query.includes("taste")) {
        responseText = "We have three premium flavors available: Mojito (Green), Original (Red), and Sugar Free (Silver).";
      } else if (query.includes("buy") || query.includes("price") || query.includes("cost") || query.includes("shop") || query.includes("order")) {
        responseText = "Our online shop is coming soon! For now, you can purchase Fantôme Energy from your nearest supermarkets.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: responseText, sender: "bot" }]);

      if (!promoSentRef.current) {
        promoSentRef.current = true;
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            id: Date.now() + 2, 
            text: "Also, don't forget to follow our Instagram and subscribe to our YouTube channel!", 
            sender: "bot" 
          }]);
        }, 1500);
      }
    }, 800);
  };

  return (
    <>
      {/* Floating Assistant */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? 12 : 0 }}
        transition={{ duration: 0.35 }}
        className={`fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-2 ${isOpen ? 'pointer-events-none' : 'pointer-events-auto'}`}
      >
        <div className="relative rounded-full bg-white/90 border border-sky-400/40 px-3 py-1 text-[11px] font-bold tracking-wide text-slate-800 shadow-md">
          Ask me
          <span className="absolute left-1/2 -bottom-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-white border-b border-r border-sky-400/40" />
        </div>

        <div className="relative flex flex-col items-center">
          <div className="absolute -top-1 left-1/2 h-3 w-0.5 -translate-x-1/2 bg-slate-700" />
          <div className="absolute -top-4 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-slate-700 bg-white" style={{ boxShadow: `0 0 10px ${activeColor}80` }} />
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative h-16 w-16 rounded-2xl border border-sky-500/40 bg-sky-100 shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
            style={{ boxShadow: `0 10px 28px ${activeColor}30` }}
          >
            <span className="absolute left-2 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-slate-700" />
            <span className="absolute right-2 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-slate-700" />
            <span className="absolute left-1/2 top-3 flex h-7 w-10 -translate-x-1/2 items-center justify-center rounded-xl bg-slate-800">
              <span className="mx-1 h-2 w-2 rounded-full" style={{ backgroundColor: activeColor }} />
              <span className="mx-1 h-2 w-2 rounded-full" style={{ backgroundColor: activeColor }} />
            </span>
            <span className="absolute bottom-3 left-1/2 h-2 w-5 -translate-x-1/2 rounded-full border-b-2 border-slate-700" />
          </button>
        </div>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[80vh] z-[101] glass-panel flex flex-col shadow-2xl overflow-hidden"
            style={{ borderColor: `${activeColor}40` }}
          >
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center bg-sky-300/30" style={{ borderColor: `${activeColor}20` }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border flex items-center justify-center shadow-sm" style={{ borderColor: activeColor, backgroundColor: `${activeColor}20`, color: activeColor }}>
                  <span className="font-sans font-bold text-xs">F</span>
                </div>
                <div>
                  <h3 className="text-slate-800 font-sans font-bold uppercase text-sm tracking-wider">Fantôme AI</h3>
                  <p className="text-[10px] text-slate-650 tracking-wide flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeColor }}></span> Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-600 hover:text-slate-800 transition-colors p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-sky-600 text-white rounded-tr-sm border border-sky-700/30' : 'bg-sky-300/30 border border-sky-400/30 text-slate-800 rounded-tl-sm'}`}
                    style={msg.sender === 'bot' ? { borderColor: `${activeColor}30`, boxShadow: `inset 0 0 10px ${activeColor}10` } : {}}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 border-t bg-sky-300/30 flex gap-2" style={{ borderColor: `${activeColor}20` }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Transmit query..."
                className="flex-1 bg-sky-300/40 border border-sky-400/30 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-sky-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-12 h-12 rounded-xl flex items-center justify-center disabled:opacity-50 transition-all cursor-pointer"
                style={{ backgroundColor: activeColor, color: '#000' }}
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ==========================================
// MAIN APP COMPONENT
// ==========================================
function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const defaultFlavor = queryParams.get('flavor') || 'Sugar Free';
  const [activeFlavor, setActiveFlavor] = useState(defaultFlavor); // Default core Sugar Free flavor
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  const flavors = [
    { 
      title: "Mojito", 
      flavor: "Ready to Drink", 
      color: "#059669",
      desc: "The absolute standard of premium carbonated energy. Infused with natural wild Mint and zesty Lime juice, structured precisely around B-Complex catalysts to break sensory thresholds.",
      fullIngredients: "Water, Sugar, Acidity Regulator (INS 330), Carbonated Water, Acidity Regulator (INS 331), Caffeine, Permitted Synthetic Food Colour (Green Colour INS 102 & INS 150), Permitted Food Flavour (Mint Flavour), Taurine (0.03%), Inositol (0.02%), Niacinamide (Vit B3), Calcium D-Pantothenate (Vit B5), Pyridoxine Hydrochloride (Vit B6), Cyanocobalamin (Vit B12). Contains Added Flavour (Natural & Nature Identical Flavouring Substances).",
      canGraphic: "/mojito_texture.png",
      canFront: "/formula_mojito_can.png",
      formulaWide: true
    },
    { 
      title: "Original", 
      flavor: "Unseen Power", 
      color: "#DC2626",
      desc: "Our classic adaptation. A violent shockwave of mental clarity and cognitive ignition, utilizing high taurine metrics and immediate energy release regulators.",
      fullIngredients: "Water, Sugar, Acidity Regulator (INS 330), Carbonated Water, Acidity Regulator (INS 331), Caffeine, Permitted Synthetic Food Colour (INS 122 & INS 150), Permitted Food Flavour, Taurine (0.03%), Inositol (0.02%), Niacinamide (Vit B3), Calcium D-Pantothenate (Vit B5), Pyridoxine Hydrochloride (Vit B6), Cyanocobalamin (Vit B12). Contains Added Flavour.",
      canGraphic: "/original_texture.png",
      canFront: "/formula_black_can.png",
      formulaWide: true
    },
    { 
      title: "Sugar Free", 
      flavor: "Unleash The Power", 
      color: "#475569",
      desc: "Pure power, completely unburdened by carbohydrates. Engineered for elite metabolic performance and sustained neural support without the glycemic crash.",
      fullIngredients: "Water, Sucralose, Acidity Regulator (INS 330), Carbonated Water, Acidity Regulator (INS 331), Caffeine, Permitted Synthetic Food Colour (INS 150), Permitted Food Flavour, Taurine (0.03%), Inositol (0.02%), Niacinamide (Vit B3), Calcium D-Pantothenate (Vit B5), Pyridoxine Hydrochloride (Vit B6), Cyanocobalamin (Vit B12). Contains Added Flavour.",
      canGraphic: "/sugarfree_texture.png",
      canFront: "/formula_black_can.png",
      formulaWide: true
    }
  ];

  const activeColor = flavors.find(f => f.title === activeFlavor)?.color || '#059669';

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, delta) => {
    setCart((prevCart) => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const navItems = [
    { label: 'Flavors', target: 'flavors' },
    { label: 'Story', target: 'story' },
    { label: 'Campaigns', target: 'campaigns' }
  ];

  return (
    <div className="fantome-dark min-h-screen relative text-slate-800 overflow-hidden bg-transparent">
      {/* Dynamic Header & Announcement */}
      <div className="fixed top-0 w-full z-50 flex flex-col">
        {/* Navigation Bar */}
        <nav className="w-full px-2 pt-3 sm:px-4 md:px-5 md:pt-5">
          <div className="mx-auto flex w-full max-w-[1720px] flex-col gap-3 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-start lg:gap-5">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex w-fit max-w-full items-center rounded-[1.1rem] border border-white/10 bg-slate-950/90 px-4 py-2.5 text-left shadow-[0_18px_50px_rgba(0,0,0,0.48)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 cursor-pointer lg:justify-self-start"
              style={{ boxShadow: `0 18px 50px rgba(0,0,0,0.48), inset 0 0 20px ${activeColor}18` }}
            >
              <span>
                <span className="block font-sans text-base font-black tracking-[0.24em] text-white transition-colors group-hover:text-sky-200 sm:text-lg">FANTOME</span>
                <span className="hidden text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:block">Unseen Power</span>
              </span>
            </button>

            <div className="w-full overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/85 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:mx-auto lg:max-w-[660px] xl:max-w-[760px]">
              <div className="px-3 py-2.5 sm:px-4">
                <div className="grid grid-cols-3 gap-2">
                  {navItems.map((item) => (
                    <button
                      key={item.target}
                      type="button"
                      onClick={() => document.getElementById(item.target)?.scrollIntoView({ behavior: 'smooth' })}
                      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300/50 hover:bg-white/[0.08] cursor-pointer"
                    >
                      <span className="absolute inset-y-0 left-0 w-1 opacity-80 transition-all duration-300 group-hover:w-full group-hover:opacity-15" style={{ backgroundColor: activeColor }} />
                      <span className="relative block text-[10px] font-black uppercase tracking-[0.14em] text-slate-100 sm:text-xs">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex w-full gap-2 lg:w-auto lg:justify-self-end">
              <button
                onClick={() => setShowComingSoon(true)}
                className="flex flex-1 items-center justify-center gap-2 rounded-[1.1rem] border border-white/10 bg-slate-950/90 px-5 py-3 text-xs font-black uppercase tracking-wide text-white shadow-[0_18px_50px_rgba(0,0,0,0.48)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/[0.10] cursor-pointer lg:flex-none"
                style={{ boxShadow: `inset 0 0 18px ${activeColor}20` }}
              >
                <ShoppingBag className="h-4 w-4" style={{ color: activeColor }} />
                <span>Bag ({cartCount})</span>
              </button>
            </div>
          </div>
        </nav>
      </div>
      {/* Hero */}
      <Hero activeColor={activeColor} activeFlavor={activeFlavor} />

      {/* Brand Story */}
      <StorySection activeColor={activeColor} activeFlavor={activeFlavor} />

      {/* Flavors Section */}
      <FlavorsSection 
        activeColor={activeColor} 
        setActiveColor={() => {}} 
        activeFlavor={activeFlavor}
        setActiveFlavor={setActiveFlavor}
        flavors={flavors} 
      />

      {/* Shop Section */}
      <ShopSection activeColor={activeColor} />

      {/* Campaigns Section */}
      <CampaignsSection activeColor={activeColor} />

      {/* Social Proof Section */}
      <SocialProofSection activeColor={activeColor} />

      {/* Founder Section */}
      <FounderSection activeColor={activeColor} />

      {/* Connect Section */}
      <ConnectSection activeColor={activeColor} />

      {/* Footer */}
      <Footer activeColor={activeColor} />

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-sky-200/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="relative w-full max-w-md h-full bg-sky-300/90 backdrop-blur-md border-l border-sky-400/30 p-8 flex flex-col justify-between z-10"
            >
              <div>
                <div className="flex justify-between items-center border-b border-sky-400/30 pb-6">
                  <h3 className="text-2xl font-bold font-sans uppercase">Shopping Bag</h3>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-xs font-bold tracking-wide text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-8 space-y-6 overflow-y-auto max-h-[60vh] pr-2">
                  {cart.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 tracking-wide font-bold text-sm">
                      Your bag is empty
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-4 rounded-2xl glass-panel border border-sky-400/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 blur-2xl opacity-10 rounded-full pointer-events-none" style={{ backgroundColor: item.color }} />
                        <div className="flex gap-4 items-center">
                          <div 
                            className="w-12 h-16 rounded-lg border border-sky-400/30 bg-sky-200/40 flex-shrink-0"
                            style={{
                              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${item.graphic})`,
                              backgroundSize: 'contain',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center'
                            }}
                          />
                          <div>
                            <span className="text-[10px] tracking-wide font-bold" style={{ color: item.color }}>{item.pack}</span>
                            <h4 className="text-sm font-bold font-sans uppercase text-slate-800 mt-0.5">{item.title}</h4>
                            <span className="text-xs font-bold text-slate-600 mt-1 block">
                              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(item.price)} each
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2 bg-sky-300/40 border border-sky-400/30 rounded-lg p-1">
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              className="p-1 hover:bg-sky-300/40 rounded text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                              className="p-1 hover:bg-sky-300/40 rounded text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <button 
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-[10px] font-bold tracking-wide text-red-500 hover:text-red-400 flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {cart.length > 0 && (
                <div className="border-t border-sky-400/30 pt-6">
                  <div className="flex justify-between items-center text-lg font-bold tracking-wide mb-6">
                    <span>Total</span>
                    <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(cartTotal)}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      setShowCheckoutSuccess(true);
                      setCart([]);
                    }}
                    className="w-full py-4 rounded-2xl bg-sky-600 text-white hover:bg-sky-700 font-bold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
                  >
                    Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {showComingSoon && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowComingSoon(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              className="relative z-10 w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
              style={{ boxShadow: `0 24px 80px rgba(0,0,0,0.65), inset 0 0 28px ${activeColor}20` }}
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                <ShoppingBag className="h-6 w-6" style={{ color: activeColor }} />
              </div>
              <h3 className="font-sans text-3xl font-black uppercase tracking-wide text-white">Coming Soon</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-400">
                Fantome online ordering is getting ready. The bag will open when the store goes live.
              </p>
              <button
                type="button"
                onClick={() => setShowComingSoon(false)}
                className="mt-7 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/[0.1] cursor-pointer"
              >
                Got it
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Success Modal */}
      <AnimatePresence>
        {showCheckoutSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCheckoutSuccess(false)}
              className="absolute inset-0 bg-sky-200/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md glass-panel border border-sky-400/35 p-8 text-center shadow-2xl z-10 overflow-hidden"
            >
              {/* Radial glow */}
              
              
              <div className="w-16 h-16 rounded-full bg-sky-300/50 border border-sky-400/30 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8" style={{ color: activeColor, filter: `drop-shadow(0 0 8px ${activeColor})` }} />
              </div>
              
              <h3 className="text-3xl font-bold font-sans tracking-wide text-slate-800">
                Transmission Received
              </h3>
              
              <p className="text-sm text-slate-600 font-light leading-relaxed mt-4 max-w-xs mx-auto">
                Your premium catalyst order has been verified. Your shipment is being prepared for rapid deployment.
              </p>
              
              <div className="mt-8 p-4 rounded-2xl bg-sky-300/30 border border-sky-400/30 text-[10px] text-sky-900 tracking-wider font-bold flex items-center justify-center gap-2 uppercase">
                <ShieldAlert className="w-4 h-4 text-fantome-gold" />
                <span>SECURE BIO-QUANTUM ENCRYPTED CHECKOUT</span>
              </div>
              
              <button 
                onClick={() => setShowCheckoutSuccess(false)}
                className="mt-8 w-full py-4 rounded-2xl bg-sky-600 text-white hover:bg-sky-700 font-bold tracking-wide transition-all cursor-pointer font-sans"
              >
                Acknowledge Transmission
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <FantomeChatbot activeColor={activeColor} />
    </div>
  );
}

export default App;


