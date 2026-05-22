import React, { useRef, useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls, useTexture, Sparkles, ContactShadows } from '@react-three/drei';
import { ShoppingBag, ChevronRight, ChevronLeft, Plus, Minus, ArrowRight, Check, ShieldAlert, FlaskConical, Award, Trash2, MessageCircle, X, Send } from 'lucide-react';
import * as THREE from 'three';

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
        <path d="M 10 0 L 15 20 L 5 40 L 20 60 L 10 80 L 15 100" fill="none" stroke={color} strokeWidth="0.5" style={{ filter: `drop-shadow(0 0 2px ${color})` }} />
        <path d="M 90 0 L 85 15 L 95 30 L 80 50 L 90 75 L 85 100" fill="none" stroke={color} strokeWidth="0.5" style={{ filter: `drop-shadow(0 0 2px ${color})` }} />
        <path d="M 15 20 L 30 35 L 20 50" fill="none" stroke={color} strokeWidth="0.3" style={{ filter: `drop-shadow(0 0 2px ${color})` }} />
        <path d="M 85 15 L 70 25 L 75 40" fill="none" stroke={color} strokeWidth="0.3" style={{ filter: `drop-shadow(0 0 2px ${color})` }} />
        <path d="M 50 -10 L 45 20 L 55 40 L 40 60 L 60 80 L 50 110" fill="none" stroke="#fff" strokeWidth="0.2" style={{ filter: `drop-shadow(0 0 5px ${color})` }} />
      </svg>
    </motion.div>
  );
}

// ==========================================
// 3D CAN COMPONENT (Multi-Texture Mapping & Variable Rotation Speed)
// ==========================================
function FantomeCan({ activeFlavor }) {
  const canRef = useRef();
  const angleRef = useRef(0);
  
  // Pre-load all three textures
  const originalTexture = useTexture('/original_texture.png');
  const mojitoTexture = useTexture('/mojito_texture.png');
  const sugarFreeTexture = useTexture('/sugarfree_texture.png');
  
  // Configure textures to wrap perfectly around the cylinder with high-definition anisotropic filtering.
  [originalTexture, mojitoTexture, sugarFreeTexture].forEach(tex => {
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.repeat.set(1.0, 1.0); 
    if (tex !== sugarFreeTexture) {
      tex.offset.set(0.5, 0.0);
    } else {
      tex.offset.set(0.0, 0.0);
    }
    // Set 16x anisotropic filtering for crystal-clear texture rendering at oblique viewing angles
    tex.anisotropy = 16;
  });
  
  let currentTexture = mojitoTexture;
  let tintColor = "#00ff00"; // Default Mojito Green

  if (activeFlavor === 'Original') {
    currentTexture = originalTexture;
    tintColor = "#ff0000"; // Red
  } else if (activeFlavor === 'Sugar Free') {
    currentTexture = sugarFreeTexture;
    tintColor = "#ffffff"; // Silver/White
  }

  const lightRef = useRef();
  
  // Check for debug query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const urlAngle = queryParams.get('angle');
  
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // ── Rotation Logic (Smooth spin-in and stop facing front) ────────
    // Align front logo ("FANTÔME" and Wolf Face) exactly to the center of the viewport
    let FRONT_OFFSET = activeFlavor === 'Sugar Free' ? 240 * Math.PI / 180 : 65 * Math.PI / 180;
    if (urlAngle !== null) {
      FRONT_OFFSET = parseFloat(urlAngle);
    }
    
    // Smoothly interpolate the can't rotation to the front offset
    const lerpFactor = urlAngle !== null ? 1.0 : (1 - Math.exp(-4 * delta));
    angleRef.current = THREE.MathUtils.lerp(angleRef.current, FRONT_OFFSET, lerpFactor);

    if (canRef.current) {
      canRef.current.rotation.y = angleRef.current;
    }

    if (lightRef.current) {
      lightRef.current.intensity = 0.1 + Math.random() * (Math.sin(t * 10) > 0.8 ? 0.2 : 0);
    }
  });

  return (
    <Float 
      speed={urlAngle !== null ? 0 : 3} 
      rotationIntensity={urlAngle !== null ? 0 : 0.8} 
      floatIntensity={urlAngle !== null ? 0 : 2}
    >
      {/* Dynamic lightning point light */}
      <pointLight ref={lightRef} position={[2, 3, 2]} color={tintColor} intensity={0.15} distance={15} decay={2} />
      
      <group ref={canRef}>
        {/* 1. Main cylindrical body with printed wrap texture (open-ended to fit tapered ends) */}
        <mesh>
          <cylinderGeometry args={[1.2, 1.2, 3.5, 64, 1, true]} />
          <meshStandardMaterial 
            map={currentTexture} 
            metalness={activeFlavor === 'Sugar Free' ? 0.85 : 0.85} 
            roughness={activeFlavor === 'Sugar Free' ? 0.15 : 0.20} 
            envMapIntensity={activeFlavor === 'Sugar Free' ? 0.9 : 0.10}
          />
        </mesh>

        {/* 2. Top Tapered Shoulder (dark black aluminum for black cans, silver for sugar free) */}
        <mesh position={[0, 1.875, 0]}>
          <cylinderGeometry args={[1.08, 1.2, 0.25, 64, 1, true]} />
          <meshStandardMaterial 
            color={activeFlavor === 'Sugar Free' ? "#ffffff" : "#121212"} 
            metalness={activeFlavor === 'Sugar Free' ? 1.0 : 0.85} 
            roughness={activeFlavor === 'Sugar Free' ? 0.12 : 0.25} 
          />
        </mesh>

        {/* 3. Top Rim / Rolled Collar (silver metal) */}
        <mesh position={[0, 2.03, 0]}>
          <cylinderGeometry args={[1.10, 1.08, 0.06, 64]} />
          <meshStandardMaterial color="#ffffff" metalness={1.0} roughness={0.10} />
        </mesh>

        {/* 4. Sunken Lid Disc (brushed silver metal) */}
        <mesh position={[0, 2.01, 0]}>
          <cylinderGeometry args={[1.06, 1.06, 0.02, 64]} />
          <meshStandardMaterial color="#e8e8e8" metalness={1.0} roughness={0.18} />
        </mesh>

        {/* 5. Bottom Tapered Heel (dark black aluminum for black cans, silver for sugar free) */}
        <mesh position={[0, -1.875, 0]}>
          <cylinderGeometry args={[1.2, 1.0, 0.25, 64, 1, true]} />
          <meshStandardMaterial 
            color={activeFlavor === 'Sugar Free' ? "#ffffff" : "#121212"} 
            metalness={activeFlavor === 'Sugar Free' ? 1.0 : 0.85} 
            roughness={activeFlavor === 'Sugar Free' ? 0.12 : 0.25} 
          />
        </mesh>

        {/* 6. Bottom Base Rim / Stand (silver metal) */}
        <mesh position={[0, -2.025, 0]}>
          <cylinderGeometry args={[1.0, 1.0, 0.05, 64]} />
          <meshStandardMaterial color="#e0e0e0" metalness={1.0} roughness={0.15} />
        </mesh>

        {/* Color Accent Ring under the bottom base rim */}
        <mesh position={[0, -2.06, 0]} scale={[1.01, 0.03, 1.01]}>
          <cylinderGeometry args={[1, 1, 1, 64]} />
          <meshStandardMaterial color={tintColor} emissive={tintColor} emissiveIntensity={2.0} />
        </mesh>

        {/* ── CAN TOP ASSEMBLY (Reference-accurate pull-tab sitting on sunken lid) ── */}

        {/* D-shaped score groove */}
        <mesh position={[0, 2.033, 0.04]} rotation={[Math.PI / 2, 0.55, 0]}>
          <torusGeometry args={[0.285, 0.016, 6, 44, Math.PI * 1.55]} />
          <meshStandardMaterial color="#888" metalness={0.85} roughness={0.55} />
        </mesh>

        {/* Straight closing segment of the D */}
        <mesh position={[0, 2.033, 0.285]}>
          <boxGeometry args={[0.57, 0.016, 0.016]} />
          <meshStandardMaterial color="#888" metalness={0.85} roughness={0.55} />
        </mesh>

        {/* Rivet (tiny hemisphere dome) */}
        <mesh position={[0, 2.036, 0.25]}>
          <sphereGeometry args={[0.052, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
          <meshStandardMaterial color="#e0e0e0" metalness={1.0} roughness={0.06} />
        </mesh>

        {/* Tab arm (slim, flat lever) */}
        <mesh position={[0, 2.030, 0.04]}>
          <boxGeometry args={[0.12, 0.018, 0.44]} />
          <meshStandardMaterial color="#c8c8c8" metalness={1.0} roughness={0.1} />
        </mesh>

        {/* Rounded nose of arm */}
        <mesh position={[0, 2.030, 0.255]}>
          <cylinderGeometry args={[0.06, 0.06, 0.018, 16]} />
          <meshStandardMaterial color="#c8c8c8" metalness={1.0} roughness={0.1} />
        </mesh>

        {/* Pull ring */}
        <mesh position={[0, 2.040, -0.175]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.105, 0.024, 8, 24]} />
          <meshStandardMaterial color="#e2e2e2" metalness={1.0} roughness={0.07} />
        </mesh>
      </group>
    </Float>
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
        background: `linear-gradient(90deg, black, ${activeColor}08, black)`,
      }}
    >
      {/* Left / right fade masks */}
      <div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, black, transparent)' }} />
      <div className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, black, transparent)' }} />

      <div className="flex whitespace-nowrap hero-ticker-track">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-12 mx-12">
            <span
              className="text-[11px] font-black uppercase tracking-[0.25em] font-outfit"
              style={{ color: activeColor, textShadow: `0 0 8px ${activeColor}88` }}
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
  const flashVariants = {
    animate: {
      opacity: [0, 0, 0.8, 0, 1, 0.2, 0, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "loop",
        times: [0, 0.8, 0.82, 0.83, 0.85, 0.88, 0.9, 1],
        ease: "linear"
      }
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-fantome-black to-fantome-black z-0"></div>

      {/* Background flashes */}
      <motion.div 
        variants={flashVariants}
        animate="animate"
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen"
        style={{ background: `radial-gradient(circle at 50% -20%, ${activeColor}88 0%, transparent 70%)` }}
      />
      <motion.div 
        variants={{
          animate: {
            opacity: [0, 0, 1, 0, 0.5, 0, 0],
            transition: { duration: 4, repeat: Infinity, times: [0, 0.8, 0.82, 0.85, 0.88, 0.92, 1] }
          }
        }}
        animate="animate"
        className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
        style={{ background: 'white' }}
      />
      
      {/* BACKGROUND TEXT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-5 pointer-events-none">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-[12vw] md:text-[10vw] font-black font-outfit uppercase tracking-tighter leading-none whitespace-nowrap opacity-90 select-none"
        >
          <span style={{ color: activeColor, textShadow: `0 0 50px ${activeColor}` }}>UNSEEN</span> POWER
        </motion.h1>
      </div>
      
      <LightningBolts color={activeColor} />
      
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} style={{ pointerEvents: 'auto' }} gl={{ preserveDrawingBuffer: true }}>
          <ambientLight intensity={0.06} />
          
          {/* Moody, low-brightness three-point lighting setup to completely eliminate glare */}
          <directionalLight position={[5, 4, 5]} intensity={0.15} color="#ffffff" />
          <directionalLight position={[-5, 2, 4]} intensity={0.10} color="#ffffff" />
          <directionalLight position={[0, 5, -8]} intensity={0.15} color={activeColor} />
          
          <Environment preset="studio" intensity={0.05} />
          
          <PresentationControls global snap={true} rotation={[0, -Math.PI / 4, 0]}>
             <Suspense fallback={null}>
               <FantomeCan activeFlavor={activeFlavor} />
             </Suspense>
          </PresentationControls>
          
          <Sparkles count={150} scale={12} size={4} speed={0.4} opacity={0.6} color={activeColor} />
          <Sparkles count={50} scale={10} size={10} speed={1} opacity={0.2} color="#ffffff" />
          
          {/* Soft ambient floor shadow beneath the floating can */}
          <ContactShadows position={[0, -3.2, 0]} opacity={0.4} scale={8} blur={2.0} far={4} />
        </Canvas>
      </div>

      {/* Ticker Strip — sits at the bottom edge */}
      <div className="absolute bottom-0 w-full z-20">
        <HeroTicker activeColor={activeColor} />
      </div>

      {/* Foreground UI */}
      <div className="absolute bottom-16 w-full flex flex-col items-center justify-center z-20 pointer-events-none">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-2xl text-white font-semibold tracking-[0.3em] uppercase drop-shadow-lg"
        >
          Premium Energy Catalyst
        </motion.p>
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${activeColor}` }}
          onClick={() => document.getElementById('connect').scrollIntoView({ behavior: 'smooth' })}
          className="mt-8 px-12 py-4 bg-black/50 backdrop-blur-md border-2 text-white font-bold uppercase tracking-[0.2em] rounded-full pointer-events-auto transition-colors duration-300"
          style={{ borderColor: activeColor }}
        >
          Connect Us
        </motion.button>
      </div>
    </div>
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
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-fantome-cyan/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-fantome-gold/5 blur-3xl pointer-events-none" />

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
          <h2 className="text-4xl md:text-6xl font-black font-outfit uppercase leading-tight">
            Scientific <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Formulation.</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed font-light">
            Engineered with high precision. Fantôme delivers a potent energy profile driven by B-Complex vitamins, pure Taurine, and exact Caffeine mapping. Crafted for zero fat accumulation and optimal metabolic acceleration.
          </p>
          
          {/* Quick Metrics */}
          <div className="flex gap-8">
            <div>
              <h4 className="text-3xl font-bold font-outfit" style={{ color: activeColor }}>
                {activeFlavor === 'Sugar Free' ? '75 mg' : '75 mg'}
              </h4>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Caffeine / 250ml</p>
            </div>
            <div className="border-l border-white/10" />
            <div>
              <h4 className="text-3xl font-bold font-outfit" style={{ color: activeColor }}>
                {activeFlavor === 'Sugar Free' ? '15 kcal' : '93.75 kcal'}
              </h4>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Energy / 250ml</p>
            </div>
            <div className="border-l border-white/10" />
            <div>
              <h4 className="text-3xl font-bold font-outfit" style={{ color: activeColor }}>
                {activeFlavor === 'Sugar Free' ? '400 mg' : '800 mg'}
              </h4>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Taurine / 250ml</p>
            </div>
          </div>
        </motion.div>

        {/* Real Nutrition Facts Label Layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="p-8 rounded-3xl glass-panel border border-white/10 bg-black/60 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10 rounded-full pointer-events-none" style={{ backgroundColor: activeColor }} />
          
          <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
            <FlaskConical className="w-6 h-6" style={{ color: activeColor }} />
            <h3 className="font-outfit font-black text-2xl tracking-widest uppercase">LABORATORY SPECIFICATION</h3>
          </div>

          <div className="space-y-4">
            <div className="border-b border-white/10 pb-2">
              <span className="text-xs text-gray-500 uppercase tracking-widest">Typical Values</span>
              <h4 className="text-lg font-bold font-outfit uppercase mt-0.5">{nutrition.servingSize}</h4>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm border-b border-white/5 pb-4">
              {nutrition.values.map((item, idx) => (
                <div key={idx} className="flex justify-between border-b border-white/5 py-1">
                  <span className="text-gray-400">{item.name}</span>
                  <span className="font-bold">{item.val}</span>
                </div>
              ))}
            </div>

            <div>
              <span className="text-xs text-gray-500 uppercase tracking-widest">Active Bio-Elements & Vitamins</span>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2 text-xs">
                {nutrition.bioElements.map((item, idx) => (
                  <div key={idx} className={`flex justify-between py-0.5 border-b border-white/5 ${item.name === 'Vitamin B12' ? 'col-span-2' : ''}`}>
                    <span className="text-gray-400">{item.name}</span>
                    <span className="font-bold text-white">{item.val}</span>
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
        <h2 className="text-4xl md:text-6xl font-black font-outfit uppercase mt-2">
          Formula Variations
        </h2>
      </div>

      <div className="relative flex flex-col lg:flex-row gap-16 items-center justify-center">
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 lg:left-8 z-30 p-4 rounded-full glass-panel hover:bg-white/10 transition-colors border border-white/10 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-0 lg:right-8 z-30 p-4 rounded-full glass-panel hover:bg-white/10 transition-colors border border-white/10 cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 text-white" />
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
            <div className="relative w-full aspect-square rounded-3xl glass-panel p-12 bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center overflow-hidden">
              <div 
                className="absolute inset-0 blur-3xl opacity-25 transition-all duration-500"
                style={{ background: `radial-gradient(circle, ${flavors[currentIdx].color} 0%, transparent 70%)` }}
              />
              {/* Sleek mockup card containing the floating transparent can */}
              <motion.div 
                initial={{ scale: 0.8, rotate: -5, y: 10 }}
                animate={{ scale: 1, rotate: 0, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-56 h-88 rounded-2xl border border-white/10 bg-black/40 shadow-2xl relative z-10 flex flex-col items-center justify-center p-6 overflow-hidden backdrop-blur-md"
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
                  className="h-72 object-contain relative z-20"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  style={{ filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.65))" }}
                />

                {/* Floating bottom shadow under the can */}
                <motion.div 
                  className="absolute bottom-4 w-20 h-2 bg-black/60 rounded-full blur-[3px] mx-auto left-0 right-0 z-10"
                  animate={{ scale: [1, 0.85, 1], opacity: [0.6, 0.35, 0.6] }}
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
              <span className="px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full border" style={{ borderColor: flavors[currentIdx].color, color: flavors[currentIdx].color }}>
                {flavors[currentIdx].flavor}
              </span>
              <h3 className="text-4xl md:text-5xl font-black font-outfit uppercase">
                {flavors[currentIdx].title} Formulation
              </h3>
              <p className="text-gray-400 font-light leading-relaxed">
                {flavors[currentIdx].desc}
              </p>
              
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-white">Full Ingredient Manifest:</h4>
                <p className="text-xs text-gray-400 leading-relaxed bg-black/40 border border-white/5 p-4 rounded-2xl font-light">
                  {flavors[currentIdx].fullIngredients}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
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
    { name: "Mojito", color: "#00FF00", graphic: "/mojito_front.png" },
    { name: "Original", color: "#FF0000", graphic: "/original_front.png" },
    { name: "Sugar Free", color: "#FFFFFF", graphic: "/sugarfree_front.png" }
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
        <h2 className="text-4xl md:text-6xl font-black font-outfit uppercase mt-2">
          Coming Soon
        </h2>
        <p className="text-gray-400 text-sm md:text-base font-light uppercase tracking-widest mt-4">
          The next-generation secure case drop is currently in synchronization
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Exclusive Crate Preview (Single Can removed as requested) */}
        <div className="lg:col-span-6 flex justify-center">
          <motion.div
            whileHover={{ y: -10 }}
            className="w-full max-w-md p-8 rounded-3xl glass-panel border border-white/10 flex flex-col justify-between group bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden"
          >
            {/* Glowing activeColor aura */}
            <div className="absolute top-0 right-0 w-48 h-48 blur-3xl opacity-20 rounded-full pointer-events-none group-hover:opacity-40 transition-opacity" style={{ backgroundColor: currentCrateFlavorInfo.color }} />
            
            <div>
              <div className="flex justify-between items-start">
                <span className="text-xs uppercase tracking-widest font-black" style={{ color: currentCrateFlavorInfo.color }}>24 + 3 Cans Free</span>
                <span className="bg-white/10 border border-white/20 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  COMING SOON
                </span>
              </div>
              
              <h3 className="text-3xl font-black font-outfit uppercase mt-4 text-white">
                {selectedCrateFlavor} Case
              </h3>
              
              <div className="mt-6 aspect-square rounded-2xl bg-black/60 border border-white/5 flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:scale-[1.02]">
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
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 z-20">
                  <div className="p-4 rounded-full bg-black/60 border border-white/10 text-white shadow-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" style={{ color: currentCrateFlavorInfo.color }}>
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white mt-2">TRANSMISSION LOCKED</span>
                </div>
                
                <span className="text-xs font-black uppercase tracking-[0.25em] text-white/10 absolute bottom-12 z-10 font-outfit">FANTÔME SECURE CASE</span>
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-[9px] font-bold bg-black/75 border border-white/10 z-30 tracking-widest uppercase">
                  27 Cans Total
                </div>
              </div>

              {/* Flavor Selector */}
              <div className="mt-6">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 block mb-2.5 font-bold">Preview Crate Flavor</span>
                <div className="flex gap-2">
                  {crateFlavors.map(f => (
                    <button
                      key={f.name}
                      onClick={() => setSelectedCrateFlavor(f.name)}
                      className={`flex-1 py-2 px-3 text-[10px] rounded-xl border transition-all font-black uppercase cursor-pointer text-center ${
                        selectedCrateFlavor === f.name 
                          ? 'bg-white text-black border-white' 
                          : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20'
                      }`}
                      style={selectedCrateFlavor === f.name ? { boxShadow: `0 0 15px ${f.color}50` } : {}}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/5">
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-widest">Target Price</span>
                <h4 className="text-2xl font-bold font-outfit text-white mt-1">{formatPrice(1440)}</h4>
              </div>
              
              <span className="text-xs font-black uppercase tracking-widest text-gray-400 py-3 px-5 rounded-xl border border-white/10 bg-white/5">
                LOCKED
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Cybernetic Terminal UI with Countdown & Alert Sign Up */}
        <div className="lg:col-span-6 space-y-8">
          {/* Terminal Box */}
          <div className="p-8 rounded-3xl glass-panel border border-white/10 bg-black/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10 rounded-full pointer-events-none" style={{ backgroundColor: activeColor }} />
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <h3 className="font-outfit font-black text-xl tracking-widest uppercase text-white">SECURE ACCESS LOCKOUT</h3>
              </div>
              <span className="text-[9px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5">SYS.V_2.0</span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed font-light mb-8">
              The official Fantôme secure case containing our premier energy catalyst variations is currently under orbital dispatch. The single bottle cans for sale are discontinued to prioritize high-capacity case deployments.
            </p>

            {/* Glowing Countdown */}
            <div className="space-y-3 mb-8">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold block">Transmission Synchronization Est. Time</span>
              <div className="grid grid-cols-4 gap-3 text-center">
                {[
                  { label: "DAYS", val: timeLeft.days },
                  { label: "HOURS", val: timeLeft.hours },
                  { label: "MINUTES", val: timeLeft.minutes },
                  { label: "SECONDS", val: timeLeft.seconds }
                ].map((t, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-black/60 border border-white/5 flex flex-col justify-center">
                    <span className="text-2xl md:text-3xl font-black font-outfit tracking-tight" style={{ color: activeColor, textShadow: `0 0 10px ${activeColor}80` }}>
                      {String(t.val).padStart(2, '0')}
                    </span>
                    <span className="text-[8px] text-gray-500 font-bold tracking-widest uppercase mt-1">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Notify Form */}
            <div className="border-t border-white/5 pt-6">
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
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold block">Register for launch authorization</span>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ENTER SECURE EMAIL ADDRESS"
                        className="px-5 py-4 rounded-2xl glass-panel bg-black/60 text-xs uppercase tracking-wider font-semibold border border-white/10 flex-grow focus:outline-none focus:border-white transition-colors"
                        style={{ color: '#fff' }}
                      />
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="px-6 py-4 rounded-2xl bg-white text-black font-bold uppercase tracking-widest text-xs flex items-center justify-center hover:bg-white/90 transition-colors cursor-pointer"
                        style={{ boxShadow: `0 0 20px rgba(255,255,255,0.15)` }}
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
                    className="p-5 rounded-2xl bg-[#00FF00]/5 border border-[#00FF00]/15 flex items-start gap-4"
                  >
                    <div className="p-2 rounded-xl bg-[#00FF00]/10 text-[#00FF00] mt-0.5">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-outfit font-black text-sm uppercase tracking-wider text-white">TRANSMISSION ESTABLISHED</h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">
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
            <div className="p-4 rounded-2xl border border-white/5 bg-white/5 space-y-1">
              <span className="font-bold text-white block uppercase tracking-wider">Priority Distribution</span>
              <p className="text-gray-500 font-light leading-relaxed">Secure Case orders receive automatic express distribution globally.</p>
            </div>
            <div className="p-4 rounded-2xl border border-white/5 bg-white/5 space-y-1">
              <span className="font-bold text-white block uppercase tracking-wider">Discontinued Singles</span>
              <p className="text-gray-500 font-light leading-relaxed">Individual cans removed to focus entirely on specialized 27-can crates.</p>
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
    <section id="campaigns" className="py-32 px-6 max-w-7xl mx-auto relative z-20 border-t border-white/5">
      {/* Glow aura */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none" style={{ backgroundColor: activeColor }} />

      <div className="text-center mb-20">
        <span className="text-sm font-semibold tracking-[0.3em] uppercase" style={{ color: activeColor }}>
          Brand Operations
        </span>
        <h2 className="text-4xl md:text-6xl font-black font-outfit uppercase mt-2">
          Our Campaigns
        </h2>
        <p className="text-gray-400 text-sm md:text-base font-light uppercase tracking-widest mt-4">
          Tactical activations and planetary brand maneuvers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {campaigns.map((camp, idx) => (
          <motion.div
            key={camp.id}
            whileHover={{ y: -8 }}
            className={`rounded-3xl border border-white/10 overflow-hidden bg-black/60 shadow-2xl relative group flex flex-col h-full transform-gpu ${idx === 0 ? "md:col-span-2" : ""}`}
            style={{ contain: "content" }}
          >
            {/* Visual background element */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10 pointer-events-none" />
            
            {/* Hover glow line */}
            <div className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: activeColor }} />

            <div className="relative aspect-[16/10] overflow-hidden bg-black/40 transform-gpu">
              {camp.video ? (
                <video
                  src={camp.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover transform-gpu"
                  style={{ transform: "translate3d(0, 0, 0)", backfaceVisibility: "hidden" }}
                />
              ) : (
                <img
                  src={camp.image}
                  alt={camp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu"
                  style={{ transform: "translate3d(0, 0, 0)", backfaceVisibility: "hidden" }}
                />
              )}
              {/* Badge overlay */}
              <div className="absolute top-6 left-6 z-20 flex gap-2">
                <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-black/85 border border-white/15 text-white">
                  {camp.tag}
                </span>
                <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-white text-black" style={{ boxShadow: `0 0 12px ${activeColor}50` }}>
                  {camp.stat}
                </span>
              </div>
            </div>

            <div className="p-8 relative z-20 space-y-4">
              <h3 className="text-2xl md:text-3xl font-black font-outfit uppercase tracking-wide text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                {camp.title}
              </h3>
              <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">
                {camp.desc}
              </p>
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
    <section className="relative py-32 px-6 border-t border-white/5 bg-black/80 z-20 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full blur-[120px] opacity-10 pointer-events-none" style={{ backgroundColor: activeColor }} />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-5/12"
        >
          <div className="relative rounded-3xl overflow-hidden p-2 glass-panel border border-white/10" style={{ boxShadow: `0 0 40px ${activeColor}15` }}>
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black/50">
              <img 
                src="/founder.png" 
                alt="Shri Ankit Khandelwal - Founder" 
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-3xl font-black font-outfit uppercase tracking-widest text-white mb-2">Shri Ankit Khandelwal</h3>
                <p className="text-sm font-bold uppercase tracking-[0.3em]" style={{ color: activeColor }}>Eminent Entrepreneur</p>
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-outfit uppercase tracking-widest text-white leading-tight">
              The Visionary <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Behind The Power</span>
            </h2>
            <div className="h-1 w-24 rounded-full" style={{ backgroundColor: activeColor, boxShadow: `0 0 15px ${activeColor}` }} />
          </div>
          
          <div className="space-y-8 text-gray-400 font-light leading-relaxed text-lg lg:text-xl">
            <p>
              A first-generation entrepreneur, <strong className="text-white font-bold">Shri Ankit Khandelwal</strong> has built a diversified global business enterprise from the ground up. Driven by a relentless pursuit of excellence and an unyielding work ethic, his journey is a testament to what absolute dedication can achieve.
            </p>
            <p>
              Recognizing a critical gap in the market for a truly premium, scientifically backed energy catalyst, he conceptualized <strong className="text-white font-bold tracking-wider">FANTÔME</strong>. It was designed not merely as a beverage, but as a lifestyle symbol for the relentless, the ambitious, and the unstoppable.
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
    { name: "Instagram", url: "https://www.instagram.com/fantomeenergy", icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> },
    { name: "Twitter", url: "https://twitter.com/fantomeenergy", icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg> },
    { name: "Facebook", url: "https://facebook.com/fantomeenergy", icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> },
    { name: "LinkedIn", url: "https://linkedin.com/company/fantomeenergy", icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> },
    { name: "YouTube", url: "https://youtube.com/fantomeenergy", icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg> }
  ];

  return (
    <section id="connect" className="py-32 px-6 max-w-7xl mx-auto relative z-20 border-t border-white/5">
      <div className="text-center mb-20">
        <span className="text-sm font-semibold tracking-[0.3em] uppercase" style={{ color: activeColor }}>
          Network
        </span>
        <h2 className="text-4xl md:text-6xl font-black font-outfit uppercase mt-2">
          Connect Us
        </h2>
        <p className="text-gray-400 text-sm md:text-base font-light uppercase tracking-widest mt-4">
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
            className="flex flex-col items-center gap-4 p-8 rounded-3xl border border-white/10 bg-black/40 hover:bg-white/5 transition-colors group cursor-pointer"
            style={{ minWidth: "160px" }}
          >
            <div 
              className="text-white group-hover:text-white transition-colors duration-500"
              style={{ filter: `drop-shadow(0 0 10px ${activeColor}40)` }}
            >
              {social.icon}
            </div>
            <span className="font-bold uppercase tracking-widest text-sm text-gray-300 group-hover:text-white">
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
    <footer className="relative border-t border-white/10 bg-black overflow-hidden py-20 px-6 z-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-black font-outfit uppercase tracking-widest text-white">FANTÔME</h2>
          <p className="text-gray-400 font-light max-w-sm">
            Receive transmission updates on biological formula upgrades, new flavor drops, and exclusive team merchandise releases.
          </p>
          <div className="flex gap-4">
            <input 
              type="email" 
              placeholder="ENTER EMAIL TRANSMISSION"
              className="px-6 py-4 rounded-xl glass-panel bg-black/40 text-sm uppercase tracking-wider font-semibold border border-white/10 w-full focus:outline-none focus:border-white transition-colors"
            />
            <button className="p-4 rounded-xl bg-white text-black font-bold uppercase tracking-widest flex items-center justify-center hover:bg-white/80 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Legal Grid Compliance (Real Addresses & FSSAI Lic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-gray-500 font-medium">
          <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-3 bg-black/20">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Manufactured By</h4>
            <p className="font-bold text-gray-300">KOLADIYA INDUSTRIES PVT. LTD.</p>
            <p className="leading-relaxed">
              Plot no. 21 to 26, 3rd Phase Industrial Estate, Navagam, Bhavnagar, Gujarat – 364110
            </p>
            <p className="font-bold uppercase tracking-wider text-gray-400">
              FSSAI Lic. No: <span className="text-white">10722999000112</span>
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-3 bg-black/20">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Marketed By</h4>
            <p className="font-bold text-gray-300">ETHOS GLOBAL FOOD & BEVERAGES PVT. LTD.</p>
            <p className="leading-relaxed">
              Plot No. 10, Nayapalli, Bhubaneswar, Odisha – 751014
            </p>
            <div className="space-y-1">
              <p className="font-bold uppercase tracking-wider text-gray-400">
                FSSAI Lic. No: <span className="text-white">10016031000631</span>
              </p>
              <p>Email: <a href="mailto:info@ethosglobal.in" className="text-white/80 hover:text-white underline">info@ethosglobal.in</a></p>
              <p>Customer Care: <span className="text-white">9090355570</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-bold uppercase tracking-widest">
        <span>© 2026 FANTÔME ENERGY. ALL BIO-SYSTEMS RESERVED.</span>
        <div className="flex items-center gap-6">
          <a 
            href="https://www.instagram.com/fantomeenergy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all group"
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
            <span className="text-white font-bold">Instagram</span>
          </a>
          <span className="w-1 h-1 rounded-full bg-white/20"></span>
          <span style={{ color: activeColor }} className="transition-colors duration-500">UNSEEN POWER</span>
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
      let responseText = "Transmission unverified. For complex inquiries, please contact info@ethosglobal.in or 9090355570.";
      const query = userMsg.text.toLowerCase();

      if (query.includes("flavor") || query.includes("taste")) {
        responseText = "We engineer three core biological catalysts: Mojito (Green), Original (Red), and Sugar Free (Silver).";
      } else if (query.includes("ingredient") || query.includes("caffeine") || query.includes("taurine")) {
        responseText = "Fantôme is formulated with high-grade Taurine (up to 320mg), Caffeine (30mg/100ml), Inositol, and essential B-Complex vitamins for maximum cognitive ignition.";
      } else if (query.includes("buy") || query.includes("price") || query.includes("shop") || query.includes("order")) {
        responseText = "You can procure our premium 27-can crates directly from the Shop section above. Secure case orders receive automatic express distribution globally.";
      } else if (query.includes("shibani") || query.includes("ad") || query.includes("campaign")) {
        responseText = "Our exclusive broadcast campaign with Shibani unleashes unseen power and metabolic acceleration. Watch it in our Campaigns section.";
      } else if (query.includes("sugar free") || query.includes("sugar-free") || query.includes("diet")) {
        responseText = "Our Sugar Free formulation delivers pure power unburdened by carbohydrates, engineered for elite metabolic performance without the glycemic crash.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: responseText, sender: "bot" }]);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] z-[100] cursor-pointer transition-colors duration-500 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{ backgroundColor: activeColor, color: '#000' }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[80vh] z-[101] bg-fantome-black/95 backdrop-blur-xl border rounded-2xl flex flex-col shadow-2xl overflow-hidden"
            style={{ borderColor: `${activeColor}40` }}
          >
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center bg-black/50" style={{ borderColor: `${activeColor}20` }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)]" style={{ borderColor: activeColor, backgroundColor: `${activeColor}20`, color: activeColor }}>
                  <span className="font-outfit font-black text-xs">F</span>
                </div>
                <div>
                  <h3 className="text-white font-outfit font-black uppercase text-sm tracking-wider">Fantôme AI</h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeColor }}></span> Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-white/10 text-white rounded-tr-sm' : 'bg-black/60 border text-gray-300 rounded-tl-sm'}`}
                    style={msg.sender === 'bot' ? { borderColor: `${activeColor}30`, boxShadow: `inset 0 0 10px ${activeColor}10` } : {}}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 border-t bg-black/50 flex gap-2" style={{ borderColor: `${activeColor}20` }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Transmit query..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
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
  const defaultFlavor = queryParams.get('flavor') || 'Mojito';
  const [activeFlavor, setActiveFlavor] = useState(defaultFlavor); // Default core Mojito flavor
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  const flavors = [
    { 
      title: "Mojito", 
      flavor: "Ready to Drink", 
      color: "#00FF00",
      desc: "The absolute standard of premium carbonated energy. Infused with natural wild Mint and zesty Lime juice, structured precisely around B-Complex catalysts to break sensory thresholds.",
      fullIngredients: "Water, Sugar, Acidity Regulator (INS 330), Carbonated Water, Acidity Regulator (INS 331), Caffeine, Permitted Synthetic Food Colour (Green Colour INS 102 & INS 150), Permitted Food Flavour (Mint Flavour), Taurine (0.03%), Inositol (0.02%), Niacinamide (Vit B3), Calcium D-Pantothenate (Vit B5), Pyridoxine Hydrochloride (Vit B6), Cyanocobalamin (Vit B12). Contains Added Flavour (Natural & Nature Identical Flavouring Substances).",
      canGraphic: "/mojito_texture.png",
      canFront: "/mojito_front.png"
    },
    { 
      title: "Original", 
      flavor: "Unseen Power", 
      color: "#FF0000",
      desc: "Our classic adaptation. A violent shockwave of mental clarity and cognitive ignition, utilizing high taurine metrics and immediate energy release regulators.",
      fullIngredients: "Water, Sugar, Acidity Regulator (INS 330), Carbonated Water, Acidity Regulator (INS 331), Caffeine, Permitted Synthetic Food Colour (INS 122 & INS 150), Permitted Food Flavour, Taurine (0.03%), Inositol (0.02%), Niacinamide (Vit B3), Calcium D-Pantothenate (Vit B5), Pyridoxine Hydrochloride (Vit B6), Cyanocobalamin (Vit B12). Contains Added Flavour.",
      canGraphic: "/original_texture.png",
      canFront: "/original_front.png"
    },
    { 
      title: "Sugar Free", 
      flavor: "Unleash The Power", 
      color: "#FFFFFF",
      desc: "Pure power, completely unburdened by carbohydrates. Engineered for elite metabolic performance and sustained neural support without the glycemic crash.",
      fullIngredients: "Water, Sucralose, Acidity Regulator (INS 330), Carbonated Water, Acidity Regulator (INS 331), Caffeine, Permitted Synthetic Food Colour (INS 150), Permitted Food Flavour, Taurine (0.03%), Inositol (0.02%), Niacinamide (Vit B3), Calcium D-Pantothenate (Vit B5), Pyridoxine Hydrochloride (Vit B6), Cyanocobalamin (Vit B12). Contains Added Flavour.",
      canGraphic: "/sugarfree_texture.png",
      canFront: "/sugarfree_front.png"
    }
  ];

  const activeColor = flavors.find(f => f.title === activeFlavor)?.color || '#00FF00';

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

  return (
    <div className="min-h-screen relative bg-fantome-black text-white overflow-hidden">
      {/* Dynamic Header & Announcement */}
      <div className="fixed top-0 w-full z-50 flex flex-col">


        {/* Navigation Bar */}
        <nav className="w-full p-4 md:p-6 pt-2 md:pt-4">
          <div className="max-w-7xl mx-auto glass-panel px-6 py-3 flex justify-between items-center border border-white/10 bg-black/50 rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          {/* Logo with dynamic glow */}
          <div 
            className="font-outfit font-black text-2xl tracking-[0.2em] text-white select-none cursor-pointer transition-all duration-500"
            style={{ textShadow: `0 0 15px ${activeColor}80` }}
          >
            FANTÔME
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex gap-10 text-xs font-bold tracking-[0.15em] uppercase text-gray-400">
            {['Flavors', 'Story', 'Shop', 'Campaigns'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="relative group transition-colors hover:text-white py-2"
              >
                {item}
                <span 
                  className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full group-hover:left-0" 
                  style={{ backgroundColor: activeColor, boxShadow: `0 0 8px ${activeColor}` }}
                />
              </a>
            ))}
          </div>
          
          {/* Bag Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 font-bold text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer hover:scale-105"
            style={{ 
              backgroundColor: `${activeColor}15`, 
              borderColor: `${activeColor}50`,
              boxShadow: `0 0 20px ${activeColor}20`
            }}
          >
            <ShoppingBag className="w-4 h-4" style={{ color: activeColor }} />
            <span className="text-white">Bag ({cartCount})</span>
          </button>
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
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="relative w-full max-w-md h-full bg-fantome-black border-l border-white/10 p-8 flex flex-col justify-between z-10"
            >
              <div>
                <div className="flex justify-between items-center border-b border-white/10 pb-6">
                  <h3 className="text-2xl font-bold font-outfit uppercase">Shopping Bag</h3>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-8 space-y-6 overflow-y-auto max-h-[60vh] pr-2">
                  {cart.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 uppercase tracking-widest font-bold text-sm">
                      Your bag is empty
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-4 rounded-2xl glass-panel border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 blur-2xl opacity-10 rounded-full pointer-events-none" style={{ backgroundColor: item.color }} />
                        <div className="flex gap-4 items-center">
                          <div 
                            className="w-12 h-16 rounded-lg border border-white/10 bg-black/40 flex-shrink-0"
                            style={{
                              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${item.graphic})`,
                              backgroundSize: 'contain',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center'
                            }}
                          />
                          <div>
                            <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: item.color }}>{item.pack}</span>
                            <h4 className="text-sm font-bold font-outfit uppercase text-white mt-0.5">{item.title}</h4>
                            <span className="text-xs font-bold text-gray-400 mt-1 block">
                              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(item.price)} each
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-1">
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                              className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <button 
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-400 flex items-center gap-1 cursor-pointer"
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
                <div className="border-t border-white/10 pt-6">
                  <div className="flex justify-between items-center text-lg font-bold uppercase tracking-wider mb-6">
                    <span>Total</span>
                    <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(cartTotal)}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      setShowCheckoutSuccess(true);
                      setCart([]);
                    }}
                    className="w-full py-4 rounded-2xl bg-white text-black font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer font-outfit"
                  >
                    Checkout
                  </button>
                </div>
              )}
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
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-fantome-black border border-white/10 p-8 rounded-3xl text-center shadow-2xl z-10 overflow-hidden"
            >
              {/* Radial glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-fantome-cyan/10 blur-3xl pointer-events-none" />
              
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-[#00FF00]" style={{ filter: 'drop-shadow(0 0 8px #00FF00)' }} />
              </div>
              
              <h3 className="text-3xl font-black font-outfit uppercase tracking-wider text-white">
                Transmission Received
              </h3>
              
              <p className="text-sm text-gray-400 font-light leading-relaxed mt-4 max-w-xs mx-auto">
                Your premium catalyst order has been verified. Your shipment is being prepared for rapid deployment.
              </p>
              
              <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] text-gray-500 tracking-wider font-bold flex items-center justify-center gap-2 uppercase">
                <ShieldAlert className="w-4 h-4 text-fantome-gold" />
                <span>SECURE BIO-QUANTUM ENCRYPTED CHECKOUT</span>
              </div>
              
              <button 
                onClick={() => setShowCheckoutSuccess(false)}
                className="mt-8 w-full py-4 rounded-2xl bg-white text-black font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all cursor-pointer font-outfit"
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
