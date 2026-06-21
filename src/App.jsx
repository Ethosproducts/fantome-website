import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight, ChevronLeft, Plus, Minus, ArrowRight, Check, ShieldAlert, FlaskConical, Award, Trash2, MessageCircle, X, Send, Volume2, VolumeX, Sun, Moon, Play, ExternalLink } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// HERO TICKER STRIP
// ==========================================
const TICKER_ITEMS = [
  "UNSEEN POWER", "ZERO SUGAR", "THE WOLF RUNS AT NIGHT", "DARK ENERGY", "PREMIUM CATALYST"
];

function HeroTicker({ activeColor, isDarkMode }) {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      className="relative z-20 w-full overflow-hidden py-3 pointer-events-none backdrop-blur-xl"
      style={{
        borderTop: `1px solid ${isDarkMode ? activeColor + '55' : activeColor}`,
        borderBottom: `1px solid ${isDarkMode ? activeColor + '55' : activeColor}`,
        background: isDarkMode 
          ? `linear-gradient(90deg, rgba(2, 6, 12, 0.92), ${activeColor}22, rgba(2, 6, 12, 0.92))` 
          : 'transparent',
        boxShadow: isDarkMode 
          ? `0 0 34px ${activeColor}22, inset 0 0 24px rgba(255,255,255,0.035)` 
          : 'none',
      }}
    >
      <div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none"
        style={{ 
          background: isDarkMode 
            ? 'linear-gradient(to right, rgba(2, 6, 12, 0.98), transparent)' 
            : 'linear-gradient(to right, var(--bg-solid), transparent)' 
        }} />
      <div className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none"
        style={{ 
          background: isDarkMode 
            ? 'linear-gradient(to left, rgba(2, 6, 12, 0.98), transparent)' 
            : 'linear-gradient(to left, var(--bg-solid), transparent)' 
        }} />

      <div className="flex whitespace-nowrap hero-ticker-track">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-10 mx-10 sm:gap-12 sm:mx-12">
            <span className="text-[10px] font-black uppercase tracking-wide font-sans text-white/80 sm:text-[11px]">
              {item}
            </span>
            <span className="text-[8px] font-black" style={{ color: activeColor, opacity: isDarkMode ? 0.45 : 0.8 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
function BackgroundEffects({ activeColor, isSubpage = false }) {
  const effectsRef = useRef(null);

  useEffect(() => {
    if (isSubpage) return; // Skip pointer tracking on subpages
    let frame = 0;
    const handlePointerMove = (event) => {
      if (window.innerWidth < 768) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!effectsRef.current) return;
        effectsRef.current.style.setProperty('--mx', (event.clientX / window.innerWidth - 0.5).toFixed(3));
        effectsRef.current.style.setProperty('--my', (event.clientY / window.innerHeight - 0.5).toFixed(3));
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [isSubpage]);

  const particles = useMemo(() => isSubpage ? [] : Array.from({ length: 18 }, (_, index) => ({
    left: `${12 + ((index * 37) % 78)}%`,
    top: `${16 + ((index * 29) % 68)}%`,
    size: `${4 + (index % 5)}px`,
    delay: `${(index % 7) * 0.55}s`,
    dx: `${index % 2 === 0 ? 22 + (index % 5) * 7 : -24 - (index % 4) * 8}px`,
    dy: `${-26 - (index % 6) * 9}px`
  })), [isSubpage]);
  const sparkles = useMemo(() => isSubpage ? [] : Array.from({ length: 20 }, (_, index) => ({
    left: `${8 + ((index * 31) % 86)}%`,
    top: `${10 + ((index * 43) % 76)}%`,
    delay: `${(index % 9) * 0.38}s`,
    duration: `${3.4 + (index % 5) * 0.7}s`
  })), [isSubpage]);

  // Subpages: render only lightweight ambient beams + aurora (no particles, sparkles, smoke, shooting lights)
  if (isSubpage) {
    return (
      <div
        ref={effectsRef}
        className="fantome-background-effects"
        style={{ '--accent': activeColor }}
        aria-hidden="true"
      >
        <div className="light-beam beam-one" />
        <div className="light-beam beam-two" />
        <div className="aurora-waves">
          <span />
          <span />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={effectsRef}
      className="fantome-background-effects"
      style={{ '--accent': activeColor }}
      aria-hidden="true"
    >
      <div className="light-beam beam-one" />
      <div className="light-beam beam-two" />
      <div className="light-beam beam-three" />

      <div className="aurora-waves">
        <span />
        <span />
        <span />
      </div>

      <div className="wolf-trails">
        <span />
        <span />
        <span />
      </div>

      <div className="mist-layer mist-one" />
      <div className="mist-layer mist-two" />
      <div className="mist-layer mist-three" />

      <div className="rising-smoke">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="sparkle-field">
        {sparkles.map((sparkle, index) => (
          <span
            key={index}
            style={{
              '--sx': sparkle.left,
              '--sy': sparkle.top,
              '--spark-delay': sparkle.delay,
              '--spark-duration': sparkle.duration
            }}
          />
        ))}
      </div>

      <div className="shooting-lights">
        <span />
        <span />
        <span />
      </div>

      <div className="energy-particles">
        {particles.map((particle, index) => (
          <span
            key={index}
            style={{
              '--x': particle.left,
              '--y': particle.top,
              '--size': particle.size,
              '--delay': particle.delay,
              '--dx': particle.dx,
              '--dy': particle.dy
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ==========================================
// HERO SECTION
// ==========================================
function Hero({ activeColor, activeFlavor, flavors = [], setActiveFlavor, isDarkMode }) {
  const heroData = {
    'Sugar Free': {
      eyebrow: 'ZERO SUGAR. FULL POWER.',
      title: 'Fantome Sugar Free',
      image: '/hero_sugarfree.png?v=1',
      bgWolfImage: '/bg_wolf_sugarfree.jpg',
      bgWolfImageLight: '/bg_wolf_sugarfree_light.png',
      bg: '#c7ccd3',
      titleColor: isDarkMode ? '#d6d9de' : '#1e293b',
      eyebrowColor: isDarkMode ? '#a9afb8' : '#475569',
      copyColor: isDarkMode ? '#b7bdc6' : '#334155',
      copy: 'A sharper, lighter charge with the same unseen punch.'
    },
    'Mojito': {
      eyebrow: 'MINT. LIME. NIGHT DRIVE.',
      title: 'Fantome Mojito',
      image: '/hero_mojito.png?v=1',
      bgWolfImage: '/bg_wolf_mojito.jpg',
      bgWolfImageLight: '/bg_wolf_mojito_light.png',
      bg: '#059669',
      titleColor: isDarkMode ? '#22c55e' : '#047857',
      eyebrowColor: isDarkMode ? '#b9f6d2' : '#065f46',
      copyColor: isDarkMode ? '#d7ffe7' : '#065f46',
      copy: 'Refreshing green energy with a clean ready-to-drink finish.'
    },
    'Original': {
      eyebrow: 'PREMIUM ENERGY CATALYST',
      title: 'Fantome Original',
      image: '/hero_original.png?v=1',
      bgWolfImage: '/bg_wolf_original.jpg',
      bgWolfImageLight: '/bg_wolf_original_light.png',
      bg: '#0F2C4A',
      titleColor: isDarkMode ? '#7DD3FC' : '#0369a1',
      eyebrowColor: isDarkMode ? '#BAE6FD' : '#075985',
      copyColor: isDarkMode ? '#E0F2FE' : '#075985',
      copy: 'The core Fantome hit: bold taste, clean can, instant brand recall.'
    }
  };

  const currentHero = heroData[activeFlavor] || heroData['Sugar Free'];
  const isMojitoHero = activeFlavor === 'Mojito';
  const currentIndex = Math.max(0, flavors.findIndex((flavor) => flavor.title === activeFlavor));

  useEffect(() => {
    Object.values(heroData).forEach((hero) => {
      const image = new Image();
      image.src = hero.image;
      image.decoding = 'async';

      const bgImage = new Image();
      bgImage.src = hero.bgWolfImage;
      bgImage.decoding = 'async';

      if (hero.bgWolfImageLight) {
        const bgImageLight = new Image();
        bgImageLight.src = hero.bgWolfImageLight;
        bgImageLight.decoding = 'async';
      }
    });
  }, []);

  const changeHeroFlavor = (direction) => {
    if (!flavors.length || !setActiveFlavor) return;
    const nextIndex = (currentIndex + direction + flavors.length) % flavors.length;
    setActiveFlavor(flavors[nextIndex].title);
  };

  useEffect(() => {
    if (!flavors.length || !setActiveFlavor) return undefined;

    const timer = window.setInterval(() => {
      const activeIndex = Math.max(0, flavors.findIndex((flavor) => flavor.title === activeFlavor));
      const nextIndex = (activeIndex + 1) % flavors.length;
      setActiveFlavor(flavors[nextIndex].title);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [activeFlavor, flavors, setActiveFlavor]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-12 text-white min-[390px]:pt-14 sm:pt-28 md:pt-32" style={{ background: isDarkMode ? `radial-gradient(circle at 78% 42%, ${activeColor}55 0%, rgba(0,0,0,0) 34%), linear-gradient(135deg, #030406 0%, #070b10 44%, #000000 100%)` : `radial-gradient(circle at 78% 42%, ${activeColor}15 0%, rgba(0,0,0,0) 34%), var(--bg-gradient)` }}>
      {/* Dynamic Wolf Background Image */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {Object.entries(heroData).map(([flavorName, hero]) => (
          <div
            key={`${flavorName}-bg-image`}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center select-none"
            style={{
              backgroundImage: `url(${isDarkMode ? hero.bgWolfImage : (hero.bgWolfImageLight || hero.bgWolfImage)})`,
              opacity: activeFlavor === flavorName ? (isDarkMode ? 0.75 : 0.85) : 0,
            }}
          />
        ))}
        {/* Soft overlay gradient to ensure high readability of text */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-50" style={{ background: isDarkMode ? `linear-gradient(90deg, ${activeColor}18 0%, transparent 34%, ${activeColor}12 100%)` : `linear-gradient(90deg, ${activeColor}08 0%, transparent 34%, ${activeColor}05 100%)` }} />
      <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to top, var(--bg-solid), transparent)' }} />
      <button
        type="button"
        onClick={() => changeHeroFlavor(-1)}
        className="absolute top-[62%] -translate-y-1/2 left-3 z-30 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer sm:top-auto sm:translate-y-0 sm:bottom-24 sm:left-12 lg:left-44"
        style={{
          backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.45)' : 'var(--bg-glass-blend)',
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : activeColor,
          color: isDarkMode ? '#ffffff' : activeColor,
          boxShadow: isDarkMode ? '0 0 28px rgba(255,255,255,0.08)' : '0 4px 14px rgba(0,0,0,0.05)',
        }}
        aria-label="Previous flavor"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => changeHeroFlavor(1)}
        className="absolute top-[62%] -translate-y-1/2 right-3 z-30 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer sm:top-auto sm:translate-y-0 sm:bottom-24 sm:right-12 lg:right-44"
        style={{
          backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.45)' : 'var(--bg-glass-blend)',
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : activeColor,
          color: isDarkMode ? '#ffffff' : activeColor,
          boxShadow: isDarkMode ? '0 0 28px rgba(255,255,255,0.08)' : '0 4px 14px rgba(0,0,0,0.05)',
        }}
        aria-label="Next flavor"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className={`relative z-10 mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl grid-cols-1 content-start items-start gap-0 px-5 pb-12 text-center sm:gap-8 sm:px-6 sm:pb-20 md:-mt-10 md:min-h-[calc(100vh-8rem)] md:items-center md:px-10 md:pb-20 lg:-mt-14 lg:px-12 ${isMojitoHero ? 'md:grid-cols-[1.08fr_0.92fr] md:text-right' : 'md:grid-cols-[0.9fr_1.1fr] md:text-left'}`}>
        <div className={`mx-auto max-w-xl pt-0 sm:pt-8 md:pt-0 ${isMojitoHero ? 'md:col-start-2 md:mx-0 md:ml-auto md:mr-4 lg:mr-14 xl:mr-20' : 'md:mx-0'}`}>
          <div className="transition-colors duration-300">
            <p
              className="mb-2 text-[10px] font-black uppercase tracking-[0.16em] min-[390px]:mb-3 sm:mb-7 sm:text-sm md:text-base"
              style={{ color: currentHero.eyebrowColor || 'rgba(255,255,255,0.7)' }}
            >
              {currentHero.eyebrow}
            </p>
            <h1
              className={`mx-auto max-w-[22rem] font-sans text-[2.75rem] font-black leading-[0.88] tracking-normal min-[390px]:text-[3.05rem] sm:max-w-none sm:text-6xl md:text-[3.2rem] lg:text-7xl xl:text-8xl ${isMojitoHero ? 'md:mx-0 md:ml-auto' : 'md:mx-0'}`}
              style={{
                color: currentHero.titleColor || currentHero.bg,
                textShadow: isDarkMode 
                  ? `0 0 28px ${(currentHero.titleColor || currentHero.bg)}3a, 0 8px 36px rgba(0,0,0,0.45)`
                  : `0 2px 10px rgba(15, 23, 42, 0.08)`
              }}
            >
              {currentHero.title.split(' ').slice(0, -1).join(' ')}
              <span className="block">{currentHero.title.split(' ').slice(-1)}</span>
            </h1>
            <p
              className={`mx-auto mt-2 max-w-[20rem] text-[13px] font-semibold leading-5 min-[390px]:mt-3 min-[390px]:text-sm min-[390px]:leading-6 sm:mt-7 sm:max-w-md sm:text-base sm:leading-7 md:text-sm md:leading-6 lg:text-base lg:leading-7 xl:text-lg ${isMojitoHero ? 'md:mx-0 md:ml-auto' : 'md:mx-0'}`}
              style={{ color: currentHero.copyColor || 'rgba(255,255,255,0.78)' }}
            >
              {currentHero.copy}
            </p>
          </div>
          <motion.button
            type="button"
            onClick={() => document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={`mt-6 hidden items-center gap-3 rounded-full border px-7 py-3 text-sm font-black text-white shadow-[0_18px_45px_rgba(0,0,0,0.42)] cursor-pointer sm:mt-9 sm:gap-4 sm:px-9 sm:py-4 sm:text-base md:inline-flex keep-white ${isMojitoHero ? 'md:ml-auto' : ''}`}
            style={{ backgroundColor: isDarkMode ? '#05080d' : activeColor, borderColor: activeColor, boxShadow: isDarkMode ? `0 18px 45px rgba(0,0,0,0.42), 0 0 28px ${activeColor}55` : `0 8px 24px ${activeColor}33` }}
          >
            Connect Us
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 35, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`relative -mt-3 flex min-h-[37svh] items-center justify-center min-[390px]:-mt-4 min-[390px]:min-h-[40svh] sm:min-h-[48vh] md:mt-0 md:min-h-[calc(100vh-11rem)] ${isMojitoHero ? 'md:col-start-1 md:row-start-1 md:justify-start md:-ml-12 lg:-ml-36 xl:-ml-48' : 'md:justify-end md:-mr-4 lg:-mr-12 xl:-mr-16'}`}
        >
          <motion.div
            className="absolute bottom-5 right-[8%] h-16 w-[52%] rounded-full blur-2xl"
            animate={{ backgroundColor: `${activeColor}55`, scale: [1, 1.08, 1] }}
            transition={{ backgroundColor: { duration: 0.5 }, scale: { duration: 1.2, ease: 'easeInOut' } }}
          />
          <div className="relative z-10 h-[41svh] max-h-[760px] w-[78vw] max-w-[460px] min-[390px]:h-[44svh] sm:h-[64vh] sm:max-w-[560px] md:h-[82vh] md:max-w-[680px]">
            {Object.entries(heroData).map(([flavorName, hero]) => (
              <img
                key={flavorName}
                src={hero.image}
                alt={`${flavorName} Fantome can`}
                decoding="async"
                loading="eager"
                className={`absolute left-1/2 top-1/2 h-full w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_32px_45px_rgba(0,0,0,0.58)] transition-[opacity,transform] duration-500 ease-out ${activeFlavor === flavorName ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.985]'}`}
              />
            ))}
            
            {/* Liquid reflection under the can */}
            <div className="absolute left-1/2 top-[100%] h-[30%] w-full -translate-x-1/2 overflow-hidden pointer-events-none select-none"
                 style={{
                   WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 80%)',
                   maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 80%)',
                   opacity: 0.1,
                   filter: 'blur(3px)'
                 }}
            >
              {Object.entries(heroData).map(([flavorName, hero]) => (
                <img
                  key={`${flavorName}-reflection`}
                  src={hero.image}
                  alt=""
                  className={`absolute left-1/2 top-0 h-[333%] w-auto max-w-none object-contain transition-opacity duration-500 ease-out ${activeFlavor === flavorName ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    transform: 'translateX(-50%) scaleY(-1)',
                    transformOrigin: 'top center'
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.button
          type="button"
          onClick={() => document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' })}
          whileTap={{ scale: 0.98 }}
          className="mx-auto mt-2 inline-flex items-center gap-3 rounded-full border px-8 py-3 text-sm font-black text-white shadow-[0_18px_45px_rgba(0,0,0,0.42)] cursor-pointer min-[390px]:mt-3 keep-white md:hidden"
          style={{ backgroundColor: isDarkMode ? '#05080d' : activeColor, borderColor: activeColor, boxShadow: isDarkMode ? `0 18px 45px rgba(0,0,0,0.42), 0 0 28px ${activeColor}55` : `0 8px 24px ${activeColor}33` }}
        >
          Connect Us
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </div>
      <div className="absolute inset-x-0 top-[calc(100svh-2.25rem)] z-[5] -translate-y-full sm:top-[calc(100svh-1.5rem)]">
        <HeroTicker activeColor={activeColor} isDarkMode={isDarkMode} />
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

function StorySection({ activeColor, activeFlavor, isDarkMode }) {
  const nutrition = NUTRITION_DATA[activeFlavor] || NUTRITION_DATA['Mojito'];
  const themedBorder = isDarkMode ? 'rgba(255,255,255,0.1)' : `color-mix(in srgb, ${activeColor} 20%, rgba(15, 23, 42, 0.1))`;
  
  return (
    <section 
      id="story" 
      className="py-32 px-6 max-w-7xl mx-auto relative overflow-hidden transition-all duration-300"
      style={{
        background: isDarkMode ? 'transparent' : `radial-gradient(circle at 10% 30%, ${activeColor}0f 0%, rgba(255,255,255,0) 70%), radial-gradient(circle at 90% 70%, ${activeColor}14 0%, rgba(255,255,255,0) 60%)`
      }}
    >
      
      

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
            <span className="text-sky-300">Formulation</span>
          </h2>
          <p className="text-slate-350 text-lg leading-relaxed font-light">
            Engineered with high precision. Fantôme delivers a potent energy profile driven by B-Complex vitamins, pure Taurine, and exact Caffeine mapping. Crafted for zero fat accumulation and optimal metabolic acceleration.
          </p>
          
          {/* Quick Metrics */}
          <div className="flex gap-8">
            <div>
              <h4 className="text-3xl font-bold font-sans" style={{ color: activeColor }}>
                {activeFlavor === 'Sugar Free' ? '75 mg' : '75 mg'}
              </h4>
              <p className="text-xs text-sky-300 tracking-wide mt-1">Caffeine / 250ml</p>
            </div>
            <div className="border-l" style={{ borderColor: themedBorder }} />
            <div>
              <h4 className="text-3xl font-bold font-sans" style={{ color: activeColor }}>
                {activeFlavor === 'Sugar Free' ? '15 kcal' : '93.75 kcal'}
              </h4>
              <p className="text-xs text-sky-300 tracking-wide mt-1">Energy / 250ml</p>
            </div>
            <div className="border-l" style={{ borderColor: themedBorder }} />
            <div>
              <h4 className="text-3xl font-bold font-sans" style={{ color: activeColor }}>
                {activeFlavor === 'Sugar Free' ? '400 mg' : '800 mg'}
              </h4>
              <p className="text-xs text-sky-300 tracking-wide mt-1">Taurine / 250ml</p>
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
          style={{
            background: isDarkMode ? '' : `linear-gradient(135deg, color-mix(in srgb, ${activeColor} 8%, #ffffff) 0%, color-mix(in srgb, ${activeColor} 3%, #ffffff) 100%)`,
            borderColor: isDarkMode ? '' : `color-mix(in srgb, ${activeColor} 25%, var(--border-glass))`
          }}
        >
          
          
          <div className="flex items-center gap-3 border-b pb-4 mb-6" style={{ borderColor: themedBorder }}>
            <FlaskConical className="w-6 h-6" style={{ color: activeColor }} />
            <h3 className="font-sans font-bold text-2xl tracking-widest uppercase">LABORATORY SPECIFICATION</h3>
          </div>

          <div className="space-y-4">
            <div className="border-b pb-2" style={{ borderColor: themedBorder }}>
              <span className="text-xs text-slate-500 tracking-wide">Typical Values</span>
              <h4 className="text-lg font-bold font-sans uppercase mt-0.5">{nutrition.servingSize}</h4>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm border-b pb-4" style={{ borderColor: themedBorder }}>
              {nutrition.values.map((item, idx) => (
                <div key={idx} className="flex justify-between border-b py-1" style={{ borderColor: themedBorder }}>
                  <span className="text-slate-300">{item.name}</span>
                  <span className="font-bold">{item.val}</span>
                </div>
              ))}
            </div>

            <div>
              <span className="text-xs text-slate-500 tracking-wide">Active Bio-Elements & Vitamins</span>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2 text-xs">
                {nutrition.bioElements.map((item, idx) => (
                  <div key={idx} className={`flex justify-between py-0.5 border-b ${item.name === 'Vitamin B12' ? 'col-span-2' : ''}`} style={{ borderColor: themedBorder }}>
                    <span className="text-slate-300">{item.name}</span>
                    <span className="font-bold text-slate-200">{item.val}</span>
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
// FLAVORS SCROLL SHOWCASE
// ==========================================
function FlavorsSection({ activeColor, setActiveColor, activeFlavor, setActiveFlavor, flavors, isDarkMode }) {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const canRefs = useRef([]);
  const activeScrollIndexRef = useRef(0);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [isFormulaOpen, setIsFormulaOpen] = useState(false);
  const currentIdx = Math.min(Math.max(scrollIndex, 0), flavors.length - 1);
  const currentFlavor = flavors[currentIdx] || flavors[0];
  const activeNutrition = NUTRITION_DATA[currentFlavor.title] || NUTRITION_DATA.Mojito;
  const shortFlavorDesc = currentFlavor.desc.length > 132
    ? `${currentFlavor.desc.slice(0, 132).replace(/\s+\S*$/, '')}.`
    : currentFlavor.desc;

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current || !flavors.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const colors = flavors.map((flavor) => flavor.color);
      const last = Math.max(1, flavors.length - 1);
      bgRef.current.style.setProperty('--formula-color', colors[0]);

      canRefs.current.forEach((can, index) => {
        if (!can) return;
        const travel = Math.min(window.innerWidth * 0.38, 520);
        gsap.set(can, {
          xPercent: -50,
          x: index === 0 ? 0 : travel,
          scale: index === 0 ? 1 : 0.88,
          opacity: index === 0 ? 1 : 0.42,
          zIndex: flavors.length - index,
          force3D: true
        });
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: bgRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        scrub: reduceMotion ? false : 0.85,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const holdSpan = 0.15;
          const moveSpan = (1 - holdSpan * flavors.length) / last;
          let cursor = 0;
          let raw = 0;

          for (let index = 0; index <= last; index += 1) {
            if (self.progress <= cursor + holdSpan || index === last) {
              raw = index;
              break;
            }

            cursor += holdSpan;
            const moveProgress = (self.progress - cursor) / moveSpan;
            if (moveProgress <= 1) {
              raw = index + gsap.parseEase('power2.inOut')(Math.max(0, Math.min(1, moveProgress)));
              break;
            }

            cursor += moveSpan;
          }

          const nextIndex = Math.min(flavors.length - 1, Math.max(0, Math.round(raw)));
          const floor = Math.min(flavors.length - 2, Math.floor(raw));
          const local = Math.min(1, Math.max(0, raw - floor));
          const mixedColor = flavors.length > 1
            ? gsap.utils.interpolate(colors[floor], colors[floor + 1], local)
            : colors[0];

          bgRef.current.style.setProperty('--formula-color', mixedColor);

          canRefs.current.forEach((can, index) => {
            if (!can) return;
            const distance = index - raw;
            const absDistance = Math.abs(distance);
            const travel = Math.min(window.innerWidth * 0.38, 520);
            const centerPull = Math.max(0, 1 - Math.min(absDistance, 1));
            gsap.set(can, {
              xPercent: -50,
              x: distance * travel,
              y: -168 - centerPull * 26,
              yPercent: absDistance * 1.2,
              scale: 1.1 - Math.min(absDistance, 1) * 0.18,
              opacity: Math.max(0.5, 1 - absDistance * 0.44),
              zIndex: Math.round(100 - absDistance * 10),
              force3D: true
            });
          });

          if (nextIndex !== activeScrollIndexRef.current) {
            activeScrollIndexRef.current = nextIndex;
            setScrollIndex(nextIndex);
            setActiveFlavor(flavors[nextIndex].title);
            setActiveColor(flavors[nextIndex].color);
          }
        }
      });

      window.setTimeout(() => ScrollTrigger.refresh(), 250);
    }, sectionRef);

    return () => ctx.revert();
  }, [flavors.length]);

  return (
    <section id="flavors" ref={sectionRef} className="relative z-20 h-[340vh] overflow-visible">
      <div ref={bgRef} className="formula-scroll-stage relative flex h-[100svh] min-h-[560px] items-center overflow-hidden text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(255,255,255,0.16),transparent_34%)] opacity-70" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute left-1/2 top-[16%] h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-white/10 blur-[90px]" />

        <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-start px-5 pb-8 pt-20 text-center sm:px-8 sm:pt-24 md:pb-10 md:pt-[6.25rem] lg:px-12">
          <div className="relative z-20">
            <h2 className="font-sans text-3xl font-black uppercase leading-[0.95] text-white sm:text-4xl md:text-5xl">
              Formula Variations
            </h2>
          </div>

          <div className="relative z-10 -mt-1 flex h-[40vh] min-h-[300px] w-full items-start justify-center sm:h-[42vh] md:mt-0 md:h-[45vh]">
            <div className="absolute top-[50%] left-1/2 h-10 w-64 -translate-x-1/2 rounded-full bg-black/45 blur-xl md:h-12 md:w-80" />
            {flavors.map((flavor, index) => (
              <img
                key={flavor.title}
                ref={(node) => {
                  canRefs.current[index] = node;
                }}
                src={flavor.showcaseImage || flavor.canFront}
                alt={`${flavor.title} Fantome can`}
                loading={index === 0 ? 'eager' : 'lazy'}
                className="absolute left-1/2 top-[58%] h-[38vh] max-h-[430px] w-auto max-w-[82vw] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_38px_52px_rgba(0,0,0,0.62)] will-change-transform sm:h-[42vh] md:h-[46vh] md:max-h-[520px]"
              />
            ))}
          </div>

          <div className="relative z-20 mx-auto -mt-8 w-full max-w-3xl text-center md:-mt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFlavor.title}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-3"
              >
                <h3 className="font-sans text-3xl font-black uppercase leading-[0.92] sm:text-4xl md:text-[2.8rem]">
                  {currentFlavor.title}
                  <span className="block" style={{ color: currentFlavor.color }}>Formulation</span>
                </h3>
                <p className="mx-auto max-w-xl text-xs font-semibold leading-5 text-white/76 sm:text-sm">
                  {currentFlavor.desc}
                </p>
                <div className="rounded-2xl border border-white/12 bg-black/24 p-3 text-left backdrop-blur-md sm:p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="text-xs font-black uppercase tracking-[0.16em] text-white/84">Full Ingredient Manifest</h4>
                    <button
                      type="button"
                      onClick={() => setIsFormulaOpen(true)}
                      className="w-fit rounded-full border px-4 py-2 text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-white/10 cursor-pointer"
                      style={{ borderColor: currentFlavor.color, boxShadow: `0 0 18px ${currentFlavor.color}35` }}
                    >
                      View Formula
                    </button>
                  </div>
                  <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-white/62">
                    {currentFlavor.fullIngredients}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isFormulaOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-black/80 px-3 pb-8 pt-24 backdrop-blur-md sm:items-center sm:p-6"
            onClick={() => setIsFormulaOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              className="max-h-[calc(100svh-7.5rem)] w-full max-w-2xl overflow-hidden rounded-2xl border shadow-2xl sm:max-h-[86vh]"
              style={{
                backgroundColor: isDarkMode ? 'rgba(2,3,5,0.95)' : `color-mix(in srgb, ${flavors[currentIdx].color} 8%, #ffffff)`,
                borderColor: isDarkMode ? 'rgba(56,189,248,0.3)' : `color-mix(in srgb, ${flavors[currentIdx].color} 30%, var(--border-glass))`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 border-b p-4 sm:gap-6 sm:p-6 sm:pb-4"
                style={{ borderColor: isDarkMode ? 'rgba(56,189,248,0.2)' : `color-mix(in srgb, ${flavors[currentIdx].color} 20%, rgba(15, 23, 42, 0.1))` }}
              >
                <div className="min-w-0">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] sm:text-xs sm:tracking-[0.3em]" style={{ color: flavors[currentIdx].color }}>
                    Fully Disclosed
                  </span>
                  <h3 className="mt-1 max-w-[15rem] break-words text-2xl font-bold uppercase leading-[0.95] text-[var(--text-main)] min-[390px]:max-w-none sm:mt-2 sm:text-3xl">{flavors[currentIdx].title} Formula</h3>
                </div>
                <button type="button" onClick={() => setIsFormulaOpen(false)} className="shrink-0 rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 hover:bg-white/10 cursor-pointer">
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>

              <div className="max-h-[calc(100svh-15rem)] overflow-y-auto p-4 pt-5 sm:max-h-[64vh] sm:p-6">
                <div className="grid grid-cols-1 gap-3 min-[430px]:grid-cols-3 sm:gap-4">
                  <div className="rounded-xl border p-3 sm:p-4"
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : `color-mix(in srgb, ${flavors[currentIdx].color} 4%, #ffffff)`,
                      borderColor: isDarkMode ? 'rgba(56,189,248,0.2)' : `color-mix(in srgb, ${flavors[currentIdx].color} 25%, var(--border-glass))`
                    }}
                  >
                    <span className="text-[0.65rem] uppercase tracking-wide text-slate-400 sm:text-xs">Caffeine</span>
                    <strong className="mt-1 block text-xl text-[var(--text-main)] sm:mt-2 sm:text-2xl">75 mg</strong>
                    <p className="mt-1 text-[0.68rem] text-slate-400 sm:text-xs">Per 250 ml can</p>
                  </div>
                  <div className="rounded-xl border p-3 sm:p-4"
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : `color-mix(in srgb, ${flavors[currentIdx].color} 4%, #ffffff)`,
                      borderColor: isDarkMode ? 'rgba(56,189,248,0.2)' : `color-mix(in srgb, ${flavors[currentIdx].color} 25%, var(--border-glass))`
                    }}
                  >
                    <span className="text-[0.65rem] uppercase tracking-wide text-slate-400 sm:text-xs">Sugar</span>
                    <strong className="mt-1 block text-xl text-[var(--text-main)] sm:mt-2 sm:text-2xl">{flavors[currentIdx].title === 'Sugar Free' ? '0 g' : '22.6 g'}</strong>
                    <p className="mt-1 text-[0.68rem] text-slate-400 sm:text-xs">Clearly labeled per can</p>
                  </div>
                  <div className="rounded-xl border p-3 sm:p-4"
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : `color-mix(in srgb, ${flavors[currentIdx].color} 4%, #ffffff)`,
                      borderColor: isDarkMode ? 'rgba(56,189,248,0.2)' : `color-mix(in srgb, ${flavors[currentIdx].color} 25%, var(--border-glass))`
                    }}
                  >
                    <span className="text-[0.65rem] uppercase tracking-wide text-slate-400 sm:text-xs">Taurine</span>
                    <strong className="mt-1 block text-xl text-[var(--text-main)] sm:mt-2 sm:text-2xl">{flavors[currentIdx].title === 'Sugar Free' ? '400 mg' : '800 mg'}</strong>
                    <p className="mt-1 text-[0.68rem] text-slate-400 sm:text-xs">Performance support</p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-2 text-xs sm:mt-6 sm:grid-cols-2 sm:gap-3 sm:text-sm">
                  {activeNutrition.bioElements.map((item) => (
                    <div key={item.name} className="flex justify-between gap-4 border-b py-2 text-[var(--text-sub)]"
                      style={{ borderColor: isDarkMode ? 'rgba(56,189,248,0.1)' : `color-mix(in srgb, ${flavors[currentIdx].color} 15%, rgba(15, 23, 42, 0.08))` }}
                    >
                      <span className="min-w-0 pr-2">{item.name}</span>
                      <strong className="shrink-0 text-[var(--text-main)]">{item.val}</strong>
                    </div>
                  ))}
                </div>
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
function ShopSection({ activeColor, isDarkMode }) {
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
    { name: "Original", color: "#0284C7", graphic: "/original_perfect.png?v=7" },
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
        <p className="text-slate-300 text-sm md:text-base font-light tracking-wide mt-4">
          The next-generation secure case drop is currently in synchronization
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Exclusive Crate Preview (Single Can removed as requested) */}
        <div className="lg:col-span-6 flex justify-center">
          <motion.div
            whileHover={{ y: -10 }}
            className="w-full max-w-md p-8 rounded-3xl glass-panel flex flex-col justify-between group relative overflow-hidden"
            style={{
              background: isDarkMode 
                ? 'linear-gradient(135deg, rgba(8,12,18,0.6) 0%, rgba(5,8,13,0.8) 100%)' 
                : `linear-gradient(135deg, color-mix(in srgb, ${activeColor} 12%, #ffffff) 0%, color-mix(in srgb, ${activeColor} 4%, #ffffff) 100%)`,
              borderColor: isDarkMode ? '' : `color-mix(in srgb, ${activeColor} 30%, var(--border-glass))`
            }}
          >
            {/* Glowing activeColor aura */}
            
            
            <div>
              <div className="flex justify-between items-start">
                <span className="text-xs tracking-wide font-bold" style={{ color: currentCrateFlavorInfo.color }}>24 + 3 Cans Free</span>
                <span className="text-[9px] font-bold tracking-wide px-3 py-1 rounded-full border"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(8,47,73,0.6)' : `color-mix(in srgb, ${activeColor} 15%, #ffffff)`,
                    borderColor: isDarkMode ? 'rgba(14,165,233,0.3)' : `color-mix(in srgb, ${activeColor} 40%, transparent)`,
                    color: isDarkMode ? '#e0f2fe' : `color-mix(in srgb, ${activeColor} 85%, #000000)`
                  }}
                >
                  COMING SOON
                </span>
              </div>
              
              <h3 className="text-3xl font-bold font-sans uppercase mt-4 text-slate-100">
                {selectedCrateFlavor} Case
              </h3>
              
              <div className="mt-6 aspect-square rounded-2xl flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:scale-[1.02]"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(125,211,252,0.1)' : `color-mix(in srgb, ${activeColor} 8%, #ffffff)`,
                  borderColor: isDarkMode ? 'rgba(56,189,248,0.2)' : `color-mix(in srgb, ${activeColor} 25%, var(--border-glass))`
                }}
              >
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
                <div className="absolute inset-0 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 z-20"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(125,211,252,0.1)' : `color-mix(in srgb, ${activeColor} 6%, rgba(255,255,255,0.4))`
                  }}
                >
                  <div className="p-4 rounded-full shadow-2xl border"
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(8,47,73,0.8)' : `color-mix(in srgb, ${activeColor} 10%, #ffffff)`,
                      borderColor: isDarkMode ? 'rgba(14,165,233,0.4)' : `color-mix(in srgb, ${activeColor} 30%, transparent)`,
                      color: activeColor
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" style={{ color: currentCrateFlavorInfo.color }}>
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold tracking-wide text-slate-200 mt-2">TRANSMISSION LOCKED</span>
                </div>
                
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/10 absolute bottom-12 z-10 font-sans">FANTÔME SECURE CASE</span>
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-[9px] font-bold z-30 tracking-widest uppercase border"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(125,211,252,0.25)' : `color-mix(in srgb, ${activeColor} 15%, #ffffff)`,
                    borderColor: isDarkMode ? 'rgba(56,189,248,0.3)' : `color-mix(in srgb, ${activeColor} 35%, transparent)`
                  }}
                >
                  27 Cans Total
                </div>
              </div>

              {/* Flavor Selector */}
              <div className="mt-6">
                <span className="text-[10px] tracking-wide block mb-2.5 font-bold" style={{ color: isDarkMode ? '#7dd3fc' : activeColor }}>Preview Crate Flavor</span>
                <div className="flex gap-2">
                  {crateFlavors.map(f => (
                    <button
                      key={f.name}
                      onClick={() => setSelectedCrateFlavor(f.name)}
                      className={`flex-1 py-2 px-3 text-[10px] rounded-xl border transition-all font-bold uppercase cursor-pointer text-center`}
                      style={{
                        backgroundColor: selectedCrateFlavor === f.name
                          ? f.color
                          : (isDarkMode ? 'rgba(15,23,42,0.4)' : `color-mix(in srgb, ${activeColor} 4%, #ffffff)`),
                        borderColor: selectedCrateFlavor === f.name
                          ? f.color
                          : (isDarkMode ? 'rgba(255,255,255,0.1)' : `color-mix(in srgb, ${activeColor} 15%, var(--border-glass))`),
                        color: selectedCrateFlavor === f.name
                          ? '#ffffff'
                          : (isDarkMode ? 'rgba(248,251,255,0.6)' : `color-mix(in srgb, ${activeColor} 70%, #000000)`),
                        boxShadow: "none"
                      }}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between pt-6 border-t"
              style={{ borderColor: isDarkMode ? 'rgba(56,189,248,0.2)' : `color-mix(in srgb, ${activeColor} 20%, rgba(15, 23, 42, 0.1))` }}
            >
              <div>
                <span className="text-xs text-slate-500 tracking-wide">Target Price</span>
                <h4 className="text-2xl font-bold font-sans text-slate-100 mt-1">{formatPrice(1440)}</h4>
              </div>
              
              <span className="text-xs font-bold tracking-wide py-3 px-5 rounded-xl border"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(8,47,73,0.6)' : `color-mix(in srgb, ${activeColor} 8%, #ffffff)`,
                  borderColor: isDarkMode ? 'rgba(14,165,233,0.3)' : `color-mix(in srgb, ${activeColor} 30%, transparent)`,
                  color: isDarkMode ? '#e2e8f0' : `color-mix(in srgb, ${activeColor} 85%, #000000)`
                }}
              >
                LOCKED
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Cybernetic Terminal UI with Countdown & Alert Sign Up */}
        <div className="lg:col-span-6 space-y-6">
          {/* Terminal Box */}
          <div className="p-8 rounded-3xl glass-panel shadow-2xl relative overflow-hidden border"
            style={{
              background: isDarkMode 
                ? '' 
                : `linear-gradient(135deg, color-mix(in srgb, ${activeColor} 12%, #ffffff) 0%, color-mix(in srgb, ${activeColor} 4%, #ffffff) 100%)`,
              borderColor: isDarkMode ? '' : `color-mix(in srgb, ${activeColor} 30%, var(--border-glass))`
            }}
          >
            
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b pb-4 mb-6"
              style={{ borderColor: isDarkMode ? 'rgba(56,189,248,0.2)' : `color-mix(in srgb, ${activeColor} 20%, rgba(15, 23, 42, 0.1))` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <h3 className="font-sans font-bold text-xl tracking-widest uppercase text-slate-100">SECURE ACCESS LOCKOUT</h3>
              </div>
              <span className="text-[9px] font-mono px-2 py-1 rounded border"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(8,47,73,0.6)' : `color-mix(in srgb, ${activeColor} 8%, #ffffff)`,
                  borderColor: isDarkMode ? 'rgba(56,189,248,0.2)' : `color-mix(in srgb, ${activeColor} 25%, transparent)`,
                  color: isDarkMode ? '#e0f2fe' : `color-mix(in srgb, ${activeColor} 85%, #000000)`
                }}
              >SYS.V_2.0</span>
            </div>

            <p className="text-slate-350 text-sm leading-relaxed font-light mb-8">
              The official Fantôme secure case containing our premier energy catalyst variations is currently under orbital dispatch. The single bottle cans for sale are discontinued to prioritize high-capacity case deployments.
            </p>

            {/* Glowing Countdown */}
            <div className="space-y-3 mb-8">
              <span className="text-[10px] tracking-wide font-bold block" style={{ color: isDarkMode ? '#7dd3fc' : activeColor }}>Transmission Synchronization Est. Time</span>
              <div className="grid grid-cols-4 gap-3 text-center">
                {[
                  { label: "DAYS", val: timeLeft.days },
                  { label: "HOURS", val: timeLeft.hours },
                  { label: "MINUTES", val: timeLeft.minutes },
                  { label: "SECONDS", val: timeLeft.seconds }
                ].map((t, idx) => (
                  <div key={idx} className="p-3 rounded-2xl flex flex-col justify-center border"
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(125,211,252,0.1)' : `color-mix(in srgb, ${activeColor} 10%, #ffffff)`,
                      borderColor: isDarkMode ? 'rgba(56,189,248,0.2)' : `color-mix(in srgb, ${activeColor} 30%, var(--border-glass))`
                    }}
                  >
                    <span className="text-2xl md:text-3xl font-bold font-sans tracking-tight text-slate-100" style={{ textShadow: "none" }}>
                      {String(t.val).padStart(2, '0')}
                    </span>
                    <span className="text-[8px] font-bold tracking-widest uppercase mt-1" style={{ color: isDarkMode ? '#7dd3fc' : activeColor }}>{t.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Notify Form */}
            <div className="border-t pt-6"
              style={{ borderColor: isDarkMode ? 'rgba(56,189,248,0.2)' : `color-mix(in srgb, ${activeColor} 20%, rgba(15, 23, 42, 0.1))` }}
            >
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
                    <span className="text-[10px] tracking-wide font-bold block" style={{ color: isDarkMode ? '#7dd3fc' : activeColor }}>Register for launch authorization</span>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ENTER SECURE EMAIL ADDRESS"
                        className="px-5 py-4 rounded-2xl glass-panel text-xs tracking-wide font-semibold flex-grow focus:outline-none focus:border-sky-500 transition-colors text-slate-100 border"
                        style={{
                          backgroundColor: isDarkMode ? 'rgba(125,211,252,0.1)' : `color-mix(in srgb, ${activeColor} 6%, #ffffff)`,
                          borderColor: isDarkMode ? 'rgba(56,189,248,0.2)' : `color-mix(in srgb, ${activeColor} 25%, var(--border-glass))`
                        }}
                      />
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="px-6 py-4 rounded-2xl text-white font-bold tracking-wide text-xs flex items-center justify-center transition-colors cursor-pointer"
                        style={{
                          backgroundColor: activeColor,
                          boxShadow: "none"
                        }}
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
                    className="p-5 rounded-2xl flex items-start gap-4 border"
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(125,211,252,0.06)' : `color-mix(in srgb, ${activeColor} 8%, #ffffff)`,
                      borderColor: isDarkMode ? 'rgba(56,189,248,0.2)' : `color-mix(in srgb, ${activeColor} 25%, var(--border-glass))`
                    }}
                  >
                    <div className="p-2 rounded-xl mt-0.5 animate-pulse"
                      style={{
                        backgroundColor: isDarkMode ? 'rgba(125,211,252,0.25)' : `color-mix(in srgb, ${activeColor} 15%, #ffffff)`,
                        color: activeColor
                      }}
                    >
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-sm tracking-wide text-slate-100">TRANSMISSION ESTABLISHED</h4>
                      <p className="text-xs text-slate-350 mt-1 leading-relaxed">
                        Security authorization verified. You will receive priority access notifications the microsecond the crate drops.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
function CampaignsSection({ activeColor, isDarkMode }) {
  const [unmutedVideos, setUnmutedVideos] = useState({});
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
    <section id="campaigns" className="py-32 px-6 max-w-7xl mx-auto relative z-20 border-t"
      style={{ borderColor: isDarkMode ? 'rgba(56,189,248,0.2)' : `color-mix(in srgb, ${activeColor} 20%, rgba(15, 23, 42, 0.1))` }}
    >
      {/* Glow aura */}
      

      <div className="text-center mb-20">
        <span className="text-sm font-semibold tracking-[0.3em] uppercase" style={{ color: activeColor }}>
          Brand Operations
        </span>
        <h2 className="text-4xl md:text-6xl font-bold font-sans uppercase mt-2">
          Our Campaigns
        </h2>
        <p className="text-[var(--text-sub)] text-sm md:text-base font-light tracking-wide mt-4">
          Tactical activations and planetary brand maneuvers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {campaigns.map((camp, idx) => (
          <motion.div
            key={camp.id}
            whileHover={{ y: -8 }}
            className={`rounded-3xl overflow-hidden glass-panel relative group flex flex-col h-full transform-gpu border ${idx === 0 ? "md:col-span-2" : ""}`}
            style={{
              contain: "content",
              background: isDarkMode 
                ? '' 
                : `linear-gradient(135deg, color-mix(in srgb, ${activeColor} 12%, #ffffff) 0%, color-mix(in srgb, ${activeColor} 4%, #ffffff) 100%)`,
              borderColor: isDarkMode ? '' : `color-mix(in srgb, ${activeColor} 30%, var(--border-glass))`
            }}
          >
            {/* Visual background element */}
            <div className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: `linear-gradient(to top, color-mix(in srgb, ${activeColor} 20%, transparent) 0%, color-mix(in srgb, ${activeColor} 5%, transparent) 60%, transparent 100%)`
              }}
            />
            
            {/* Hover glow line */}
            <div className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: activeColor }} />

            <div className="relative aspect-[16/10] overflow-hidden transform-gpu"
              style={{
                backgroundColor: isDarkMode ? 'rgba(125,211,252,0.1)' : `color-mix(in srgb, ${activeColor} 8%, #ffffff)`
              }}
            >
              {camp.video ? (
                <>
                  <video
                    src={camp.video}
                    autoPlay
                    muted={!unmutedVideos[camp.id]}
                    loop
                    playsInline
                    preload="none"
                    className="w-full h-full object-cover transform-gpu"
                    style={{ transform: "translate3d(0, 0, 0)", backfaceVisibility: "hidden" }}
                  />
                  <button
                    type="button"
                    onClick={() => setUnmutedVideos((current) => ({
                      ...current,
                      [camp.id]: !current[camp.id]
                    }))}
                    className="absolute bottom-5 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-[0_0_28px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/85 cursor-pointer"
                    aria-label={unmutedVideos[camp.id] ? `Mute ${camp.title}` : `Unmute ${camp.title}`}
                    title={unmutedVideos[camp.id] ? "Mute" : "Unmute"}
                  >
                    {unmutedVideos[camp.id] ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                  </button>
                </>
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
                <span className="px-3 py-1 rounded-full text-[9px] font-bold tracking-wide border text-slate-800"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(125,211,252,0.7)' : `color-mix(in srgb, ${activeColor} 18%, #ffffff)`,
                    borderColor: isDarkMode ? 'rgba(56,189,248,0.3)' : `color-mix(in srgb, ${activeColor} 35%, transparent)`,
                    color: isDarkMode ? '#0f172a' : `color-mix(in srgb, ${activeColor} 90%, #000000)`
                  }}
                >
                  {camp.tag}
                </span>
                <span className="px-3 py-1 rounded-full text-[9px] font-bold tracking-wide text-white"
                  style={{
                    backgroundColor: activeColor,
                    boxShadow: "none"
                  }}
                >
                  {camp.stat}
                </span>
              </div>
            </div>

            <div className="p-8 relative z-20 space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold font-sans uppercase tracking-wide text-[var(--text-main)] group-hover:text-[var(--text-accent)] transition-all duration-300">
                {camp.title}
              </h3>
              <p className="text-[var(--text-sub)] font-light leading-relaxed text-sm md:text-base">
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
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-white font-bold tracking-wide transition-all duration-300 hover:scale-105 shadow-lg no-underline font-sans"
          style={{
            backgroundColor: activeColor
          }}
        >
          <span>More Campaigns</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

// ==========================================
// FOUNDER SECTION
// ==========================================
function FounderSection({ activeColor, isDarkMode }) {
  return (
    <section className="relative py-32 px-6 border-t z-20 overflow-hidden"
      style={{
        borderColor: isDarkMode ? 'rgba(56,189,248,0.2)' : `color-mix(in srgb, ${activeColor} 20%, rgba(15, 23, 42, 0.1))`,
        background: isDarkMode 
          ? 'linear-gradient(135deg, rgba(125, 211, 252, 0.05) 0%, rgba(254, 215, 170, 0.05) 100%)' 
          : `radial-gradient(circle at 10% 20%, color-mix(in srgb, ${activeColor} 12%, #ffffff) 0%, rgba(255, 255, 255, 0) 80%), radial-gradient(circle at 90% 80%, color-mix(in srgb, ${activeColor} 8%, #ffffff) 0%, rgba(255, 255, 255, 0) 80%)`
      }}
    >
      {/* Background ambient glow */}
      
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-5/12"
        >
          <div className="relative rounded-3xl overflow-hidden p-2 glass-panel border"
            style={{
              boxShadow: `0 24px 70px rgba(0,0,0,0.35), 0 0 34px ${activeColor}22`,
              background: isDarkMode 
                ? '' 
                : `linear-gradient(135deg, color-mix(in srgb, ${activeColor} 10%, #ffffff) 0%, color-mix(in srgb, ${activeColor} 3%, #ffffff) 100%)`,
              borderColor: isDarkMode ? '' : `color-mix(in srgb, ${activeColor} 25%, var(--border-glass))`
            }}
          >
            <div className="relative mx-auto w-full max-w-[24rem] aspect-[137/319] rounded-2xl overflow-hidden bg-black">
              <img 
                src="/founder_final.png" 
                alt="Shri Ankit Khandelwal - Founder" 
                loading="lazy"
                className="h-full w-full object-contain object-center transition-all duration-700 hover:scale-[1.01]"
              />
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans tracking-wide text-[var(--text-main)] leading-tight">
              The Visionary <br />
              <span style={{ color: activeColor }}>The Power</span>
            </h2>
            <div className="h-1 w-24 rounded-full" style={{ backgroundColor: activeColor, boxShadow: "none" }} />
          </div>
          
          <div className="space-y-8 text-[var(--text-sub)] font-light leading-relaxed text-lg lg:text-xl">
            <p>
              A first-generation entrepreneur, <strong className="text-[var(--text-main)] font-bold">Shri Ankit Khandelwal</strong> has built a diversified global business enterprise from the ground up. Driven by a relentless pursuit of excellence and an unyielding work ethic, his journey is a testament to what absolute dedication can achieve.
            </p>
            <p>
              Recognizing a critical gap in the market for a truly premium, scientifically backed energy catalyst, he conceptualized <strong className="text-[var(--text-main)] font-bold tracking-wider">FANTÔME</strong>. It was designed not merely as a beverage, but as a lifestyle symbol for the relentless, the ambitious, and the unstoppable.
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
function ConnectSection({ activeColor, isDarkMode }) {
  const socials = [
    { name: "Instagram", url: "https://www.instagram.com/fantomeenergy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> },
    { name: "YouTube", url: "https://www.youtube.com/@FantomeEnergyDrink", icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg> }
  ];

  return (
    <section id="connect" className="py-32 px-6 max-w-7xl mx-auto relative z-20 border-t"
      style={{ borderColor: isDarkMode ? 'rgba(56,189,248,0.2)' : `color-mix(in srgb, ${activeColor} 20%, rgba(15, 23, 42, 0.1))` }}
    >
      <div className="text-center mb-20">
        <span className="text-sm font-semibold tracking-[0.3em] uppercase" style={{ color: activeColor }}>
          Network
        </span>
        <h2 className="text-4xl md:text-6xl font-bold font-sans uppercase mt-2">
          Connect Us
        </h2>
        <p className="text-[var(--text-sub)] text-sm md:text-base font-light tracking-wide mt-4">
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
            className="flex flex-col items-center gap-4 p-8 rounded-3xl border glass-panel hover:bg-[var(--active-color)]/20 hover:border-[var(--active-color)]/40 transition-colors group cursor-pointer"
            style={{
              minWidth: "160px",
              background: isDarkMode 
                ? '' 
                : `linear-gradient(135deg, color-mix(in srgb, ${activeColor} 8%, #ffffff) 0%, color-mix(in srgb, ${activeColor} 2%, #ffffff) 100%)`,
              borderColor: isDarkMode ? '' : `color-mix(in srgb, ${activeColor} 25%, var(--border-glass))`
            }}
          >
            <div 
              className="text-[var(--text-sub)] group-hover:text-[var(--text-main)] transition-colors duration-500"
              style={{ filter: "none" }}
            >
              {social.icon}
            </div>
            <span className="font-bold tracking-wide text-sm text-[var(--text-sub)] group-hover:text-[var(--text-main)] transition-colors">
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
function Footer({ activeColor, isDarkMode }) {
  return (
    <footer className="relative border-t overflow-hidden py-20 px-6 z-20"
      style={{
        borderColor: isDarkMode ? 'rgba(56,189,248,0.2)' : `color-mix(in srgb, ${activeColor} 25%, rgba(15, 23, 42, 0.1))`,
        background: isDarkMode 
          ? 'rgba(15, 23, 42, 0.3)' 
          : `linear-gradient(180deg, color-mix(in srgb, ${activeColor} 18%, #ffffff) 0%, color-mix(in srgb, ${activeColor} 8%, #ffffff) 100%)`
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <img 
              src="/fantome_unseen_power_logo_square.png" 
              alt="Fantôme Logo" 
              className="h-16 w-16 rounded-[1.1rem] border border-white/40 bg-white p-1 shadow-[0_12px_36px_rgba(0,0,0,0.5)] brightness-105 contrast-110"
            />
            <div>
              <h2 className="text-3xl font-black font-sans tracking-wider text-slate-100 leading-none">FANTÔME</h2>
              <span className="text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: activeColor }}>Unseen Power</span>
            </div>
          </div>

        </div>

        {/* Legal Grid Compliance (Real Addresses & FSSAI Lic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-medium"
          style={{ color: isDarkMode ? '#7dd3fc' : `color-mix(in srgb, ${activeColor} 85%, #0f172a)` }}
        >
          <div className="p-5 rounded-2xl glass-panel border space-y-3"
            style={{
              background: isDarkMode 
                ? 'rgba(8, 12, 18, 0.6)' 
                : `linear-gradient(135deg, color-mix(in srgb, ${activeColor} 8%, #ffffff) 0%, color-mix(in srgb, ${activeColor} 2%, #ffffff) 100%)`,
              borderColor: isDarkMode ? '' : `color-mix(in srgb, ${activeColor} 25%, var(--border-glass))`
            }}
          >
            <h4 className="text-[10px] font-bold tracking-wide text-slate-200">Manufactured By</h4>
            <p className="font-bold text-slate-100">KOLADIYA INDUSTRIES PVT. LTD.</p>
            <p className="leading-relaxed text-slate-350">
              Plot no. 21 to 26, 3rd Phase Industrial Estate, Navagam, Bhavnagar, Gujarat – 364110
            </p>
            <p className="font-bold tracking-wide" style={{ color: isDarkMode ? '#7dd3fc' : activeColor }}>
              FSSAI Lic. No: <span className="text-slate-100">10722999000112</span>
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-panel border space-y-3"
            style={{
              background: isDarkMode 
                ? 'rgba(8, 12, 18, 0.6)' 
                : `linear-gradient(135deg, color-mix(in srgb, ${activeColor} 8%, #ffffff) 0%, color-mix(in srgb, ${activeColor} 2%, #ffffff) 100%)`,
              borderColor: isDarkMode ? '' : `color-mix(in srgb, ${activeColor} 25%, var(--border-glass))`
            }}
          >
            <h4 className="text-[10px] font-bold tracking-wide text-slate-200">Marketed By</h4>
            <p className="font-bold text-slate-100">ETHOS GLOBAL FOOD & BEVERAGES PVT. LTD.</p>
            <p className="leading-relaxed text-slate-350">
              Plot No. 10, Nayapalli, Bhubaneswar, Odisha – 751014
            </p>
            <div className="space-y-1">
              <p className="font-bold tracking-wide" style={{ color: isDarkMode ? '#7dd3fc' : activeColor }}>
                FSSAI Lic. No: <span className="text-slate-100">10016031000631</span>
              </p>
              <p>Email: <a href="mailto:info@ethosglobal.in" className="underline" style={{ color: isDarkMode ? '#7dd3fc' : activeColor }}>info@ethosglobal.in</a></p>
              <p>Customer Care: <span className="text-slate-100">9090355570</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold tracking-wide"
        style={{
          borderColor: isDarkMode ? 'rgba(56,189,248,0.2)' : `color-mix(in srgb, ${activeColor} 20%, rgba(15, 23, 42, 0.1))`,
          color: isDarkMode ? 'rgba(255,255,255,0.4)' : `color-mix(in srgb, ${activeColor} 60%, #0f172a)`
        }}
      >
        <span>© 2026 FANTÔME ENERGY.</span>
        <p className="text-[0.68rem] font-bold tracking-[0.14em] text-white/65 sm:text-xs">
          Designed and Developed by Praveen
        </p>
      </div>
    </footer>
  );
}

// ==========================================
// CHATBOT COMPONENT
// ==========================================
function FantomeChatbot({ activeColor, isDarkMode }) {
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
        responseText = "We have three premium flavors available: Mojito (Green), Original (Blue), and Sugar Free (Silver).";
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
        <div
          className="chatbot-bubble relative rounded-full border px-3 py-1 text-[11px] font-black tracking-wide text-white shadow-[0_10px_30px_rgba(0,0,0,0.42)] md:px-4 md:py-1.5 md:text-xs"
          style={{ backgroundColor: isDarkMode ? '#05080d' : 'var(--bg-glass-blend)', borderColor: isDarkMode ? `${activeColor}80` : 'var(--border-glass)', boxShadow: isDarkMode ? `0 10px 30px rgba(0,0,0,0.42), 0 0 22px ${activeColor}55` : 'var(--shadow-main)' }}
        >
          Hi, ask me
          <span className="absolute left-1/2 -bottom-1 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r" style={{ backgroundColor: isDarkMode ? '#05080d' : 'var(--bg-glass-blend)', borderColor: isDarkMode ? `${activeColor}80` : 'var(--border-glass)' }} />
        </div>

        <div className="relative flex flex-col items-center">
          <div className="absolute -top-1 left-1/2 h-3 w-0.5 -translate-x-1/2 bg-slate-700 md:h-4" />
          <div className="absolute -top-4 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-slate-700 bg-white md:-top-5 md:h-4 md:w-4" style={{ boxShadow: `0 0 10px ${activeColor}80` }} />
          <motion.button
            type="button"
            onClick={() => setIsOpen(true)}
            animate={{ boxShadow: [`0 10px 28px ${activeColor}30`, `0 14px 42px ${activeColor}58`, `0 10px 28px ${activeColor}30`] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-16 w-16 rounded-[42%_42%_34%_34%/44%_44%_46%_46%] border shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer md:h-[4.5rem] md:w-[4.5rem] lg:h-20 lg:w-20"
            style={{
              background: `radial-gradient(circle at 50% 18%, rgba(255,255,255,0.95), #d9f4ff 42%, #aee7ff 100%)`,
              borderColor: `${activeColor}80`,
              boxShadow: `0 10px 28px ${activeColor}30`
            }}
          >
            <span className="absolute -left-1 top-1/2 h-6 w-2 -translate-y-1/2 rounded-full bg-slate-700 md:h-7 lg:h-8" />
            <span className="absolute -right-1 top-1/2 h-6 w-2 -translate-y-1/2 rounded-full bg-slate-700 md:h-7 lg:h-8" />
            <span className="absolute left-1/2 top-3 flex h-7 w-11 -translate-x-1/2 items-center justify-center rounded-[999px_999px_16px_16px] bg-slate-800 md:top-4 md:h-8 md:w-14 lg:h-9 lg:w-16">
              <motion.span
                animate={{ opacity: [1, 1, 0.25, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                className="mx-1 h-2 w-2 rounded-full md:h-2 md:w-2 lg:h-2.5 lg:w-2.5"
                style={{ backgroundColor: activeColor }}
              />
              <motion.span
                animate={{ opacity: [1, 1, 0.25, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.05 }}
                className="mx-1 h-2 w-2 rounded-full md:h-2 md:w-2 lg:h-2.5 lg:w-2.5"
                style={{ backgroundColor: activeColor }}
              />
            </span>
            <span className="absolute bottom-3 left-1/2 h-2 w-6 -translate-x-1/2 rounded-full border-b-2 border-slate-700 md:bottom-3.5 md:w-7 lg:bottom-4 lg:w-8" />
            <span className="absolute bottom-1.5 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-slate-700/40 md:w-9 lg:w-10" />
          </motion.button>
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
                  <h3 className="text-slate-100 font-sans font-bold uppercase text-sm tracking-wider">Fantôme AI</h3>
                  <p className="text-[10px] text-slate-350 tracking-wide flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeColor }}></span> Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white transition-colors p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-sky-600 text-white rounded-tr-sm border border-sky-700/30' : 'bg-sky-950/60 border border-sky-500/20 text-slate-100 rounded-tl-sm'}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 border-t flex gap-2" style={{ borderColor: `${activeColor}20` }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Transmit query..."
                className="flex-1 bg-sky-300/40 border border-sky-400/30 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-sky-500 transition-colors"
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
// DEDICATED SUBPAGES
// ==========================================

function DedicatedFlavorsPage({ flavors, activeColor, isDarkMode }) {
  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0]);
  const [isFormulaOpen, setIsFormulaOpen] = useState(false);
  const activeNutrition = NUTRITION_DATA[selectedFlavor.title] || NUTRITION_DATA.Mojito;

  // Refs for GSAP ScrollTrigger
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const dividerRef = useRef(null);

  const specs = {
    "Original": { energy: "High", sweetness: "Bold", sharpness: "Sharp", focus: "Instant" },
    "Mojito": { energy: "Strong", sweetness: "Balanced", sharpness: "Crisp", focus: "Sustained" },
    "Sugar Free": { energy: "Extreme", sweetness: "Zero", sharpness: "Intense", focus: "Peak State" }
  };

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance: eyebrow, title, description stagger in
      gsap.fromTo(
        headerRef.current?.querySelectorAll('.gsap-header-item') || [],
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' }
        }
      );

      // Decorative divider line grows in width
      if (dividerRef.current) {
        gsap.fromTo(dividerRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1, opacity: 1, duration: 1.2, ease: 'power2.out',
            scrollTrigger: { trigger: dividerRef.current, start: 'top 88%', toggleActions: 'play none none none' }
          }
        );
      }

      // Flavor cards: stagger from bottom with slight rotation
      const cards = cardsRef.current?.querySelectorAll('.gsap-flavor-card') || [];
      gsap.fromTo(cards,
        { y: 100, opacity: 0, rotateX: 8 },
        {
          y: 0, opacity: 1, rotateX: 0, duration: 0.85, stagger: 0.18, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', toggleActions: 'play none none none' }
        }
      );

      // Parallax float effect on can images while scrolling
      cards.forEach((card) => {
        const img = card.querySelector('.gsap-can-img');
        if (img) {
          gsap.fromTo(img,
            { y: 30 },
            {
              y: -20, ease: 'none',
              scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
            }
          );
        }
      });

      // Specs rows inside each card fade in
      cards.forEach((card) => {
        const specRows = card.querySelectorAll('.gsap-spec-row');
        gsap.fromTo(specRows,
          { x: -20, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 70%', toggleActions: 'play none none none' }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto z-20">
      {/* Header with GSAP stagger */}
      <div ref={headerRef} className="text-center mb-12">
        <span className="gsap-header-item text-sm font-semibold tracking-[0.3em] uppercase block" style={{ color: activeColor }}>
          The Formulations
        </span>
        <h1 className="gsap-header-item text-4xl md:text-6xl font-bold font-sans uppercase mt-2">
          Formula Variations
        </h1>
        <p className="gsap-header-item text-[var(--text-sub)] text-sm md:text-base font-light tracking-wide mt-4 max-w-xl mx-auto">
          Explore our precisely crafted energy formulas, each engineered for a distinct performance profile.
        </p>
      </div>

      {/* Decorative divider */}
      <div className="flex justify-center mb-16">
        <div
          ref={dividerRef}
          className="h-[2px] w-32 rounded-full origin-center"
          style={{ backgroundColor: activeColor, boxShadow: `0 0 14px ${activeColor}55` }}
        />
      </div>

      {/* Flavor cards grid */}
      <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" style={{ perspective: '1200px' }}>
        {flavors.map((flavor) => {
          const flavorColor = flavor.color;
          const isSelected = selectedFlavor.title === flavor.title;
          const currentSpecs = specs[flavor.title] || specs["Original"];
          return (
            <div
              key={flavor.title}
              className={`gsap-flavor-card rounded-3xl p-6 glass-panel border relative group flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                isSelected ? 'ring-1' : 'hover:border-white/20'
              }`}
              onClick={() => setSelectedFlavor(flavor)}
              style={{
                background: isDarkMode
                  ? 'rgba(15, 23, 42, 0.4)'
                  : `linear-gradient(135deg, color-mix(in srgb, ${flavorColor} 12%, #ffffff) 0%, color-mix(in srgb, ${flavorColor} 4%, #ffffff) 100%)`,
                borderColor: isSelected
                  ? flavorColor
                  : isDarkMode
                    ? 'rgba(255, 255, 255, 0.1)'
                    : `color-mix(in srgb, ${flavorColor} 25%, var(--border-glass))`,
                ringColor: isSelected ? `${flavorColor}44` : undefined,
                transformStyle: 'preserve-3d'
              }}
            >


              {/* Can visual with parallax */}
              <div className="relative aspect-[1/1] w-full flex items-center justify-center rounded-2xl overflow-hidden mb-6"
                style={{
                  background: isDarkMode ? 'rgba(0,0,0,0.2)' : `color-mix(in srgb, ${flavorColor} 6%, #ffffff)`
                }}
              >
                <img
                  src={flavor.showcaseImage || flavor.canFront}
                  alt={flavor.title}
                  className="gsap-can-img h-[80%] w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Flavor text */}
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold font-sans uppercase tracking-wide text-[var(--text-main)]">
                    {flavor.title}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] block mt-1" style={{ color: flavorColor }}>
                    {flavor.flavor}
                  </span>
                  <p className="text-[var(--text-sub)] text-xs mt-3 leading-relaxed">
                    {flavor.desc}
                  </p>
                </div>

                {/* Specs display with scroll animation */}
                <div className="border-t border-b py-4 my-4 space-y-2 text-xs"
                  style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.05)' : `color-mix(in srgb, ${flavorColor} 15%, rgba(15, 23, 42, 0.08))` }}
                >
                  <div className="gsap-spec-row flex justify-between">
                    <span className="text-[var(--text-muted)]">Energy Level</span>
                    <strong className="text-[var(--text-main)]">{currentSpecs.energy}</strong>
                  </div>
                  <div className="gsap-spec-row flex justify-between">
                    <span className="text-[var(--text-muted)]">Sweetness</span>
                    <strong className="text-[var(--text-main)]">{currentSpecs.sweetness}</strong>
                  </div>
                  <div className="gsap-spec-row flex justify-between">
                    <span className="text-[var(--text-muted)]">Focus Profile</span>
                    <strong className="text-[var(--text-main)]">{currentSpecs.focus}</strong>
                  </div>
                </div>

                {/* Single action: View Formula Specs */}
                <div className="mt-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFlavor(flavor);
                      setIsFormulaOpen(true);
                    }}
                    className="w-full py-3 rounded-xl border font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] cursor-pointer text-[var(--text-main)]"
                    style={{
                      borderColor: isDarkMode ? 'rgba(255,255,255,0.12)' : `color-mix(in srgb, ${flavorColor} 30%, var(--border-glass))`,
                      background: isDarkMode ? 'rgba(255,255,255,0.04)' : `color-mix(in srgb, ${flavorColor} 6%, #ffffff)`
                    }}
                  >
                    View Full Formula
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Formula Specs Modal */}
      <AnimatePresence>
        {isFormulaOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-black/80 px-3 pb-8 pt-24 backdrop-blur-md sm:items-center sm:p-6"
            onClick={() => setIsFormulaOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              className="max-h-[calc(100svh-7.5rem)] w-full max-w-2xl overflow-hidden rounded-2xl border shadow-2xl sm:max-h-[86vh]"
              style={{
                backgroundColor: isDarkMode ? 'rgba(2,3,5,0.95)' : `color-mix(in srgb, ${selectedFlavor.color} 8%, #ffffff)`,
                borderColor: isDarkMode ? 'rgba(56,189,248,0.3)' : `color-mix(in srgb, ${selectedFlavor.color} 30%, var(--border-glass))`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 border-b p-4 sm:gap-6 sm:p-6 sm:pb-4"
                style={{ borderColor: isDarkMode ? 'rgba(56,189,248,0.2)' : `color-mix(in srgb, ${selectedFlavor.color} 20%, rgba(15, 23, 42, 0.1))` }}
              >
                <div className="min-w-0">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] sm:text-xs sm:tracking-[0.3em]" style={{ color: selectedFlavor.color }}>
                    Fully Disclosed
                  </span>
                  <h3 className="mt-1 max-w-[15rem] break-words text-2xl font-bold uppercase leading-[0.95] text-[var(--text-main)] min-[390px]:max-w-none sm:mt-2 sm:text-3xl">{selectedFlavor.title} Formula</h3>
                </div>
                <button type="button" onClick={() => setIsFormulaOpen(false)} className="shrink-0 rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 hover:bg-white/10 cursor-pointer">
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>

              <div className="max-h-[calc(100svh-15rem)] overflow-y-auto p-4 pt-5 sm:max-h-[64vh] sm:p-6">
                <div className="grid grid-cols-1 gap-3 min-[430px]:grid-cols-3 sm:gap-4">
                  <div className="rounded-xl border p-3 sm:p-4"
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : `color-mix(in srgb, ${selectedFlavor.color} 4%, #ffffff)`,
                      borderColor: isDarkMode ? 'rgba(56,189,248,0.2)' : `color-mix(in srgb, ${selectedFlavor.color} 25%, var(--border-glass))`
                    }}
                  >
                    <span className="text-[0.65rem] uppercase tracking-wide text-slate-400 sm:text-xs">Caffeine</span>
                    <strong className="mt-1 block text-xl text-[var(--text-main)] sm:mt-2 sm:text-2xl">75 mg</strong>
                    <p className="mt-1 text-[0.68rem] text-slate-400 sm:text-xs">Per 250 ml can</p>
                  </div>
                  <div className="rounded-xl border p-3 sm:p-4"
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : `color-mix(in srgb, ${selectedFlavor.color} 4%, #ffffff)`,
                      borderColor: isDarkMode ? 'rgba(56,189,248,0.2)' : `color-mix(in srgb, ${selectedFlavor.color} 25%, var(--border-glass))`
                    }}
                  >
                    <span className="text-[0.65rem] uppercase tracking-wide text-slate-400 sm:text-xs">Sugar</span>
                    <strong className="mt-1 block text-xl text-[var(--text-main)] sm:mt-2 sm:text-2xl">{selectedFlavor.title === 'Sugar Free' ? '0 g' : '22.6 g'}</strong>
                    <p className="mt-1 text-[0.68rem] text-slate-400 sm:text-xs">Clearly labeled per can</p>
                  </div>
                  <div className="rounded-xl border p-3 sm:p-4"
                    style={{
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : `color-mix(in srgb, ${selectedFlavor.color} 4%, #ffffff)`,
                      borderColor: isDarkMode ? 'rgba(56,189,248,0.2)' : `color-mix(in srgb, ${selectedFlavor.color} 25%, var(--border-glass))`
                    }}
                  >
                    <span className="text-[0.65rem] uppercase tracking-wide text-slate-400 sm:text-xs">Taurine</span>
                    <strong className="mt-1 block text-xl text-[var(--text-main)] sm:mt-2 sm:text-2xl">{selectedFlavor.title === 'Sugar Free' ? '400 mg' : '800 mg'}</strong>
                    <p className="mt-1 text-[0.68rem] text-slate-400 sm:text-xs">Performance support</p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-2 text-xs sm:mt-6 sm:grid-cols-2 sm:gap-3 sm:text-sm">
                  {activeNutrition.bioElements.map((item) => (
                    <div key={item.name} className="flex justify-between gap-4 border-b py-2 text-[var(--text-sub)]"
                      style={{ borderColor: isDarkMode ? 'rgba(56,189,248,0.1)' : `color-mix(in srgb, ${selectedFlavor.color} 15%, rgba(15, 23, 42, 0.08))` }}
                    >
                      <span className="min-w-0 pr-2">{item.name}</span>
                      <strong className="shrink-0 text-[var(--text-main)]">{item.val}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const DedicatedStoryPage = React.memo(function DedicatedStoryPage({ activeColor, isDarkMode }) {
  return (
    <section className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto z-20">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-sm font-semibold tracking-[0.3em] uppercase" style={{ color: activeColor }}>
          The Story
        </span>
        <h1 className="text-4xl md:text-6xl font-bold font-sans uppercase mt-2">
          The Founder
        </h1>
        <p className="text-[var(--text-sub)] text-sm md:text-base font-light tracking-wide mt-4 max-w-xl mx-auto">
          The mind behind the unseen power of Fantôme.
        </p>
      </div>

      {/* Founder Content Grid */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
        <div className="w-full lg:w-5/12 flex justify-center">
          <div className="relative rounded-3xl overflow-hidden p-2 glass-panel border w-full max-w-[24rem]"
            style={{
              boxShadow: `0 24px 70px rgba(0,0,0,0.35), 0 0 34px ${activeColor}22`,
              background: isDarkMode 
                ? '' 
                : `linear-gradient(135deg, color-mix(in srgb, ${activeColor} 10%, #ffffff) 0%, color-mix(in srgb, ${activeColor} 3%, #ffffff) 100%)`,
              borderColor: isDarkMode ? '' : `color-mix(in srgb, ${activeColor} 25%, var(--border-glass))`
            }}
          >
            <div className="relative mx-auto w-full aspect-[137/319] rounded-2xl overflow-hidden bg-black">
              <img 
                src="/founder_final.png" 
                alt="Shri Ankit Khandelwal - Founder" 
                loading="eager"
                className="h-full w-full object-contain object-center"
              />
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-7/12 space-y-8">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans tracking-wide text-[var(--text-main)] leading-tight">
              The Visionary <br />
              <span style={{ color: activeColor }}>The Power</span>
            </h2>
            <div className="h-1 w-24 rounded-full" style={{ backgroundColor: activeColor, boxShadow: "none" }} />
          </div>
          
          <div className="space-y-6 text-[var(--text-sub)] font-light leading-relaxed text-lg lg:text-xl">
            <p>
              A first-generation entrepreneur, <strong className="text-[var(--text-main)] font-bold">Shri Ankit Khandelwal</strong> has built a diversified global business enterprise from the ground up. Driven by a relentless pursuit of excellence and an unyielding work ethic, his journey is a testament to what absolute dedication can achieve.
            </p>
            <p>
              Recognizing a critical gap in the market for a truly premium, scientifically backed energy catalyst, he conceptualized <strong className="text-[var(--text-main)] font-bold tracking-wider">FANTÔME</strong>. It was designed not merely as a beverage, but as a lifestyle symbol for the relentless, the ambitious, and the unstoppable.
            </p>
            <p>
              Under his visionary leadership, Fantôme Energy merges cutting-edge formulation with dark, sophisticated aesthetics, redefining the boundaries of physical and cognitive performance on a global scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

const DedicatedCampaignsPage = React.memo(function DedicatedCampaignsPage({ activeColor, isDarkMode }) {
  const campaigns = [
    {
      id: 'yt-1',
      title: 'Fantôme Energy — Official Ad Campaign',
      platform: 'YouTube',
      url: 'https://youtu.be/nY17PjJHLWA?si=hsNBHW1bZuCYsf_p',
      videoId: 'nY17PjJHLWA',
      thumbnail: 'https://img.youtube.com/vi/nY17PjJHLWA/maxresdefault.jpg',
      tag: 'Official Ad',
    },
    {
      id: 'yt-2',
      title: 'Fantôme Energy — Brand Film',
      platform: 'YouTube',
      url: 'https://youtu.be/YDOju5uljKI?si=vhsCg7DlQy5Sum9e',
      videoId: 'YDOju5uljKI',
      thumbnail: 'https://img.youtube.com/vi/YDOju5uljKI/maxresdefault.jpg',
      tag: 'Brand Film',
    },
    {
      id: 'fb-1',
      title: 'Fantôme Energy — Social Campaign',
      platform: 'Facebook',
      url: 'https://www.facebook.com/share/r/1Adsam4pTG/',
      videoId: null,
      thumbnail: '/campaign_birla.jpg',
      tag: 'Social Media',
    },
    {
      id: 'yt-3',
      title: 'Fantôme Energy — Launch Event Highlights',
      platform: 'YouTube',
      url: 'https://youtu.be/reWlwI_8WJo?si=CvG4GxmZJ5txHl-H',
      videoId: 'reWlwI_8WJo',
      thumbnail: 'https://img.youtube.com/vi/reWlwI_8WJo/maxresdefault.jpg',
      tag: 'Event Highlights',
    },
  ];

  return (
    <section className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto z-20">
      <div className="text-center mb-16">
        <span className="text-sm font-semibold tracking-[0.3em] uppercase" style={{ color: activeColor }}>
          Media Broadcast
        </span>
        <h1 className="text-4xl md:text-6xl font-bold font-sans uppercase mt-2">
          Brand Operations
        </h1>
        <p className="text-[var(--text-sub)] text-sm md:text-base font-light tracking-wide mt-4 max-w-xl mx-auto">
          Explore all our brand activations, ad campaigns, and event highlights across platforms.
        </p>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {campaigns.map((camp, idx) => (
          <a
            key={camp.id}
            href={camp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-3xl overflow-hidden glass-panel shadow-2xl relative group flex flex-col h-full border cursor-pointer no-underline text-slate-200 transition-transform duration-300 hover:-translate-y-2"
            style={{
              contain: 'content',
              background: isDarkMode 
                ? 'rgba(15, 23, 42, 0.4)' 
                : `linear-gradient(135deg, color-mix(in srgb, ${activeColor} 12%, #ffffff) 0%, color-mix(in srgb, ${activeColor} 4%, #ffffff) 100%)`,
              borderColor: isDarkMode ? '' : `color-mix(in srgb, ${activeColor} 30%, var(--border-glass))`
            }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: `linear-gradient(to top, color-mix(in srgb, ${activeColor} 20%, transparent) 0%, color-mix(in srgb, ${activeColor} 5%, transparent) 60%, transparent 100%)`
              }}
            />

            {/* Hover glow line */}
            <div
              className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ backgroundColor: activeColor }}
            />

            {/* Thumbnail */}
            <div className="relative aspect-[16/9] overflow-hidden transform-gpu"
              style={{
                backgroundColor: isDarkMode ? 'rgba(125,211,252,0.1)' : `color-mix(in srgb, ${activeColor} 8%, #ffffff)`
              }}
            >
              <img
                src={camp.thumbnail}
                alt={camp.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu"
                style={{
                  transform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden',
                }}
                onError={(e) => {
                  if (camp.videoId && e.target.src.includes('maxresdefault')) {
                    e.target.src = `https://img.youtube.com/vi/${camp.videoId}/hqdefault.jpg`;
                  }
                }}
              />

              {/* Play button overlay */}
              {camp.videoId && (
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 shadow-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `color-mix(in srgb, ${activeColor} 85%, transparent)` }}
                  >
                    <Play className="w-7 h-7 text-white ml-1" fill="white" />
                  </div>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="px-3 py-1 rounded-full text-[9px] font-bold tracking-wide border text-slate-800"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(125,211,252,0.7)' : `color-mix(in srgb, ${activeColor} 18%, #ffffff)`,
                    borderColor: isDarkMode ? 'rgba(56,189,248,0.3)' : `color-mix(in srgb, ${activeColor} 35%, transparent)`,
                    color: isDarkMode ? '#0f172a' : `color-mix(in srgb, ${activeColor} 90%, #000000)`
                  }}
                >
                  {camp.tag}
                </span>
                <span
                  className="px-3 py-1 rounded-full text-[9px] font-bold tracking-wide text-white"
                  style={{ backgroundColor: activeColor }}
                >
                  {camp.platform}
                </span>
              </div>
            </div>

            {/* Text content */}
            <div className="p-6 relative z-20 space-y-3 flex-1 flex flex-col justify-between">
              <h3 className="text-lg md:text-xl font-bold font-sans uppercase tracking-wide text-[var(--text-main)] group-hover:text-[var(--text-accent)] transition-all duration-300">
                {camp.title}
              </h3>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wide mt-auto pt-2"
                style={{ color: activeColor }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Watch on {camp.platform}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
});

// ==========================================
// MAIN APP COMPONENT
// ==========================================
function App({ page = 'home' }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const [activeFlavor, setActiveFlavor] = useState(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const urlFlavor = queryParams.get('flavor');
    if (urlFlavor) {
      localStorage.setItem('fantome-flavor', urlFlavor);
      return urlFlavor;
    }
    const saved = localStorage.getItem('fantome-flavor');
    return saved !== null ? saved : 'Sugar Free';
  });

  useEffect(() => {
    localStorage.setItem('fantome-flavor', activeFlavor);
  }, [activeFlavor]);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = sessionStorage.getItem('fantome-theme');
    return saved !== null ? saved === 'dark' : true;
  });

  useEffect(() => {
    sessionStorage.setItem('fantome-theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const audioRef = useRef(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.34;
    }
  }, []);

  const flavors = [
    { 
      title: "Original", 
      flavor: "Unseen Power", 
      color: "#0284C7",
      desc: "Our classic adaptation. A violent shockwave of mental clarity and cognitive ignition, utilizing high taurine metrics and immediate energy release regulators.",
      fullIngredients: "Water, Sugar, Acidity Regulator (INS 330), Carbonated Water, Acidity Regulator (INS 331), Caffeine, Permitted Synthetic Food Colour (INS 122 & INS 150), Permitted Food Flavour, Taurine (0.03%), Inositol (0.02%), Niacinamide (Vit B3), Calcium D-Pantothenate (Vit B5), Pyridoxine Hydrochloride (Vit B6), Cyanocobalamin (Vit B12). Contains Added Flavour.",
      canGraphic: "/original_texture.png",
      canFront: "/formula_black_can.png",
      showcaseImage: "/hero_original.png?v=1",
      formulaWide: true
    },
    { 
      title: "Mojito", 
      flavor: "Ready to Drink", 
      color: "#059669",
      desc: "The absolute standard of premium carbonated energy. Infused with natural wild Mint and zesty Lime juice, structured precisely around B-Complex catalysts to break sensory thresholds.",
      fullIngredients: "Water, Sugar, Acidity Regulator (INS 330), Carbonated Water, Acidity Regulator (INS 331), Caffeine, Permitted Synthetic Food Colour (Green Colour INS 102 & INS 150), Permitted Food Flavour (Mint Flavour), Taurine (0.03%), Inositol (0.02%), Niacinamide (Vit B3), Calcium D-Pantothenate (Vit B5), Pyridoxine Hydrochloride (Vit B6), Cyanocobalamin (Vit B12). Contains Added Flavour (Natural & Nature Identical Flavouring Substances).",
      canGraphic: "/mojito_texture.png",
      canFront: "/formula_mojito_can.png",
      showcaseImage: "/hero_mojito.png?v=1",
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
      showcaseImage: "/hero_sugarfree.png?v=1",
      formulaWide: true
    }
  ];

  const activeColor = flavors.find(f => f.title === activeFlavor)?.color || '#059669';

  useEffect(() => {
    document.documentElement.style.setProperty('--active-color', activeColor);
  }, [activeColor]);

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

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMusicPlaying) {
      audio.pause();
      setIsMusicPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsMusicPlaying(true);
    } catch {
      setIsMusicPlaying(false);
    }
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const navItems = [
    { label: 'Home', path: '/', pageKey: 'home' },
    { label: 'Flavors', path: '/flavors', pageKey: 'flavors' },
    { label: 'Story', path: '/story', pageKey: 'story' },
    { label: 'Campaigns', path: '/campaigns', pageKey: 'campaigns' }
  ];

  return (
    <div className={`${isDarkMode ? 'fantome-dark' : 'fantome-light'} min-h-screen relative text-slate-200 overflow-x-hidden bg-transparent`}>
      <audio ref={audioRef} src="/fantome-bg-music.mp3" loop preload="auto" />
      <BackgroundEffects activeColor={activeColor} isSubpage={page !== 'home'} />
      {/* Dynamic Header & Announcement */}
      <div className="fixed top-0 w-full z-50 flex flex-col">
        {/* Navigation Bar */}
        <nav className="w-full px-2 pt-3 sm:px-4 md:px-5 md:pt-5">
          <div className="mx-auto flex w-full max-w-[1720px] flex-row items-center justify-between gap-3 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-start lg:gap-5">
            <button
              type="button"
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setIsMobileMenuOpen(true);
                  return;
                }
                if (page !== 'home') {
                  navigate('/');
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="group flex h-12 w-12 max-w-full items-center justify-center rounded-[0.85rem] border border-white/40 bg-white p-1 text-left shadow-[0_18px_50px_rgba(0,0,0,0.48)] transition-transform duration-300 hover:-translate-y-0.5 cursor-pointer sm:h-20 sm:w-20 sm:rounded-[1.1rem] lg:justify-self-start"
              style={{ boxShadow: `0 18px 50px rgba(0,0,0,0.48), 0 0 24px ${activeColor}28` }}
            >
              <img
                src="/fantome_unseen_power_logo_square.png"
                alt="Fantome Unseen Power"
                className="h-full w-full object-contain brightness-105 contrast-110"
              />
            </button>

            <div className="flex gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex h-12 w-12 flex-col items-center justify-center gap-0.5 rounded-[0.85rem] theme-header-btn cursor-pointer sm:h-20 sm:w-20 sm:rounded-[1.1rem]"
                style={{ boxShadow: `0 18px 50px rgba(0,0,0,0.48), 0 0 24px ${activeColor}24, inset 0 0 18px ${activeColor}20` }}
                aria-label="Toggle visual theme"
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: activeColor }} />
                ) : (
                  <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-300" style={{ color: activeColor }} />
                )}
                <span className="text-[7px] sm:text-[8px] font-black uppercase leading-none tracking-[0.08em] text-slate-200" style={{ color: 'var(--text-sub)' }}>Theme</span>
              </button>

              <button
                type="button"
                onClick={toggleMusic}
                className="flex h-12 w-12 flex-col items-center justify-center gap-0.5 rounded-[0.85rem] theme-header-btn cursor-pointer sm:h-20 sm:w-20 sm:rounded-[1.1rem]"
                style={{ boxShadow: `0 18px 50px rgba(0,0,0,0.48), 0 0 24px ${activeColor}24, inset 0 0 18px ${activeColor}20` }}
                aria-label={isMusicPlaying ? 'Pause background music' : 'Play background music'}
              >
                {isMusicPlaying ? (
                  <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: activeColor }} />
                ) : (
                  <VolumeX className="h-4 w-4 sm:h-5 sm:w-5 text-slate-300" style={{ color: 'var(--text-muted)' }} />
                )}
                <span className="text-[7px] sm:text-[8px] font-black uppercase leading-none tracking-[0.08em] text-slate-200" style={{ color: 'var(--text-sub)' }}>Vibe</span>
              </button>
            </div>

            <div className="hidden rounded-full theme-nav-bar lg:mx-auto lg:flex lg:items-center lg:justify-center px-12 py-3.5 max-w-max">
              <div className="flex items-center gap-4 sm:gap-6">
                {navItems.map((item) => {
                  const isActive = page === item.pageKey;
                  return (
                    <Link
                      key={item.pageKey}
                      to={item.path}
                      className="group relative px-8 py-2 cursor-pointer transition-transform duration-300 hover:-translate-y-0.5 no-underline"
                    >
                      <span
                        className="relative block text-[11px] font-bold uppercase tracking-[0.24em] transition-colors duration-300 sm:text-xs"
                        style={{
                          color: isActive ? 'var(--text-main)' : 'var(--text-sub)'
                        }}
                      >
                        {item.label}
                      </span>
                      <span 
                        className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ${
                          isActive ? 'opacity-100 w-6' : 'opacity-0 w-0 group-hover:opacity-100 group-hover:w-4'
                        }`}
                        style={{ 
                          backgroundColor: activeColor, 
                          boxShadow: `0 0 8px ${activeColor}` 
                        }} 
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
            
            <div className="hidden w-full gap-2 lg:flex lg:w-auto lg:justify-self-end">
              <button
                type="button"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex h-20 w-20 flex-col items-center justify-center gap-1.5 rounded-[1.1rem] theme-header-btn cursor-pointer"
                style={{ boxShadow: `0 18px 50px rgba(0,0,0,0.48), 0 0 24px ${activeColor}24, inset 0 0 18px ${activeColor}20` }}
                aria-label="Toggle visual theme"
              >
                {isDarkMode ? (
                  <Sun className="h-6 w-6" style={{ color: activeColor }} />
                ) : (
                  <Moon className="h-6 w-6 text-slate-300" style={{ color: activeColor }} />
                )}
                <span className="text-[9px] font-black uppercase leading-none tracking-[0.09em] text-slate-200" style={{ color: 'var(--text-sub)' }}>Theme</span>
              </button>

              <button
                type="button"
                onClick={toggleMusic}
                className="flex h-20 w-20 flex-col items-center justify-center gap-1.5 rounded-[1.1rem] theme-header-btn cursor-pointer"
                style={{ boxShadow: `0 18px 50px rgba(0,0,0,0.48), 0 0 24px ${activeColor}24, inset 0 0 18px ${activeColor}20` }}
                aria-label={isMusicPlaying ? 'Pause background music' : 'Play background music'}
              >
                {isMusicPlaying ? (
                  <Volume2 className="h-6 w-6" style={{ color: activeColor }} />
                ) : (
                  <VolumeX className="h-6 w-6 text-slate-300" style={{ color: 'var(--text-muted)' }} />
                )}
                <span className="text-[9px] font-black uppercase leading-none tracking-[0.09em] text-slate-200" style={{ color: 'var(--text-sub)' }}>On Vibe</span>
              </button>
            </div>
          </div>
        </nav>
      </div>
      {/* Hero */}
      {page === 'home' && (
        <Hero
          activeColor={activeColor}
          activeFlavor={activeFlavor}
          flavors={flavors}
          setActiveFlavor={setActiveFlavor}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[90] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex h-full w-[82vw] max-w-xs flex-col border-r border-white/10 bg-slate-950/95 p-5 shadow-[24px_0_80px_rgba(0,0,0,0.55)]"
              style={{ boxShadow: `24px 0 80px rgba(0,0,0,0.55), inset 0 0 28px ${activeColor}18` }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <div className="font-sans text-xl font-black tracking-[0.24em] text-white">FANTOME</div>
                  <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400">Unseen Power</div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-full border border-white/10 bg-white/[0.05] p-2 text-white cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.pageKey}
                    to={item.path}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
                    className="group relative flex w-full items-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-left text-sm font-black uppercase tracking-[0.16em] text-white cursor-pointer no-underline"
                  >
                    <span className="absolute inset-y-0 left-0 w-1 opacity-80 transition-all duration-300 group-hover:w-full group-hover:opacity-15" style={{ backgroundColor: activeColor }} />
                    <span className="relative">{item.label}</span>
                  </Link>
                ))}
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Conditionally Rendered Pages */}
      {page === 'home' && (
        <>
          <StorySection activeColor={activeColor} activeFlavor={activeFlavor} isDarkMode={isDarkMode} />
          <FlavorsSection 
            activeColor={activeColor} 
            setActiveColor={() => {}} 
            activeFlavor={activeFlavor}
            setActiveFlavor={setActiveFlavor}
            flavors={flavors} 
            isDarkMode={isDarkMode}
          />
          <ShopSection activeColor={activeColor} isDarkMode={isDarkMode} />
          <CampaignsSection activeColor={activeColor} isDarkMode={isDarkMode} />
          <FounderSection activeColor={activeColor} isDarkMode={isDarkMode} />
          <ConnectSection activeColor={activeColor} isDarkMode={isDarkMode} />
        </>
      )}

      {page === 'flavors' && (
        <DedicatedFlavorsPage 
          flavors={flavors} 
          activeColor={activeColor} 
          isDarkMode={isDarkMode} 
        />
      )}

      {page === 'story' && (
        <DedicatedStoryPage 
          activeColor={activeColor} 
          isDarkMode={isDarkMode} 
        />
      )}

      {page === 'campaigns' && (
        <DedicatedCampaignsPage 
          activeColor={activeColor} 
          isDarkMode={isDarkMode} 
        />
      )}

      {/* Footer is shared across all pages */}
      <Footer activeColor={activeColor} isDarkMode={isDarkMode} />

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="relative w-full max-w-md h-full bg-slate-950/95 border-l border-white/10 p-8 flex flex-col justify-between z-10"
            >
              <div>
                <div className="flex justify-between items-center border-b border-sky-400/30 pb-6">
                  <h3 className="text-2xl font-bold font-sans uppercase">Shopping Bag</h3>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-xs font-bold tracking-wide text-slate-400 hover:text-white cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-8 space-y-6 overflow-y-auto max-h-[60vh] pr-2">
                  {cart.length === 0 ? (
                    <div className="text-center py-20 text-slate-400 tracking-wide font-bold text-sm">
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
                            <h4 className="text-sm font-bold font-sans uppercase text-slate-100 mt-0.5">{item.title}</h4>
                            <span className="text-xs font-bold text-slate-350 mt-1 block">
                              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(item.price)} each
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-lg p-1">
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              className="p-1 hover:bg-sky-300/40 rounded text-slate-350 hover:text-white transition-colors cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                              className="p-1 hover:bg-sky-300/40 rounded text-slate-350 hover:text-white transition-colors cursor-pointer"
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
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md glass-panel border border-sky-400/35 p-8 text-center shadow-2xl z-10 overflow-hidden"
            >
              <div className="w-16 h-16 rounded-full bg-sky-300/50 border border-sky-400/30 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8" style={{ color: activeColor, filter: `drop-shadow(0 0 8px ${activeColor})` }} />
              </div>
              
              <h3 className="text-3xl font-bold font-sans tracking-wide text-slate-100">
                Transmission Received
              </h3>
              
              <p className="text-sm text-slate-350 font-light leading-relaxed mt-4 max-w-xs mx-auto">
                Your premium catalyst order has been verified. Your shipment is being prepared for rapid deployment.
              </p>
              
              <div className="mt-8 p-4 rounded-2xl bg-sky-300/30 border border-sky-400/30 text-[10px] text-sky-300 tracking-wider font-bold flex items-center justify-center gap-2 uppercase">
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

      <FantomeChatbot activeColor={activeColor} isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;



