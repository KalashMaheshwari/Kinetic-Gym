'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FuturisticShape } from '@/components/ui/FuturisticShape';
import { Philosophy } from '@/components/home/Philosophy';
import { Principles } from '@/components/home/Principles';
import { Instagram, Twitter, Youtube, ArrowRight, Crosshair, Zap, Activity, Dumbbell, HeartPulse, Timer, Scan, Check, Shield, Crown, Flame, AlertCircle, Cpu, Dna, Anchor, Radio, MapPin, Mail, Lock } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate, useScroll, useVelocity, useTransform, useAnimationFrame } from 'framer-motion';

// --- FIX 1: Defined 'wrap' locally so you don't need @motionone/utils ---
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// --- 2. MODERN RADAR CLOCK (Massive & Fading Trail) ---
const ModernClock = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date()); 
    const timer = setInterval(() => setTime(new Date()), 50); // High refresh for smooth sweep
    return () => clearInterval(timer);
  }, []);

  if (!time) return <div className="w-64 h-64 rounded-full border border-white/10 bg-[#080808]" />;

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;
  const millis = time.getMilliseconds();

  // Smooth rotation math
  const smoothSec = seconds + millis / 1000;
  const secDeg = smoothSec * 6;
  const minDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  return (
    <div className="relative group scale-75 md:scale-100 origin-right">
       {/* Ambient Back Glow */}
       <div className="absolute inset-0 bg-accent/5 rounded-full blur-3xl opacity-50" />
       
       <div className="w-64 h-64 relative flex items-center justify-center rounded-full bg-[#080808] border border-white/10 shadow-2xl overflow-hidden">
           
           {/* RADAR FADE TRAIL (The requested fade effect) */}
           <div 
             className="absolute inset-0 rounded-full"
             style={{
               background: `conic-gradient(from ${secDeg}deg, transparent 0deg, transparent 270deg, rgba(204, 255, 0, 0.2) 360deg)`,
               transform: 'rotate(180deg)' // Offset to trail behind
             }}
           />

           {/* Inner Dark Face (Masking the center of the gradient) */}
           <div className="absolute inset-2 rounded-full bg-[#050505] border border-white/5" />

           {/* Dial Markers */}
           {[...Array(60)].map((_, i) => {
              const isHour = i % 5 === 0;
              return (
                <div 
                    key={i} 
                    className={`absolute origin-bottom bottom-1/2 left-1/2 -translate-x-1/2 z-10 ${isHour ? 'w-0.5 h-4 bg-white' : 'w-[1px] h-1.5 bg-white/20'}`} 
                    style={{ transform: `translateX(-50%) rotate(${i * 6}deg) translate(0, -110px)` }} 
                />
              )
           })}

           {/* Hour Hand */}
           <div className="absolute w-1.5 h-16 bg-white rounded-full origin-bottom bottom-1/2 left-1/2 -translate-x-1/2 z-20 shadow-black/50 shadow-lg" 
                style={{ transform: `translateX(-50%) rotate(${hourDeg}deg)` }} />
           
           {/* Minute Hand */}
           <div className="absolute w-1 h-24 bg-white/50 rounded-full origin-bottom bottom-1/2 left-1/2 -translate-x-1/2 z-30 mix-blend-overlay" 
                style={{ transform: `translateX(-50%) rotate(${minDeg}deg)` }} />
           
           {/* Second Hand (Sharp Lime) */}
           <div className="absolute w-[2px] h-28 bg-[#CCFF00] origin-bottom bottom-1/2 left-1/2 -translate-x-1/2 z-40 shadow-[0_0_15px_#CCFF00]" 
                style={{ transform: `translateX(-50%) rotate(${secDeg}deg)` }} />
           
           {/* Center Hub */}
           <div className="absolute w-3 h-3 bg-[#080808] border-2 border-[#CCFF00] rounded-full z-50" />
       </div>
    </div>
  );
};

// --- 3. AUTO FLICKER LETTER (FIXED: Types & Logic) ---
const AutoFlickerLetter = ({ char }: { char: string }) => {
    const [isHollow, setIsHollow] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const loop = () => {
            // 40% chance to flicker active per check (Aggressive)
            if (Math.random() > 0.6) {
                setIsHollow(true);
                // Quick glitch state (50ms - 200ms)
                setTimeout(() => setIsHollow(false), 50 + Math.random() * 150);
            }
            // Fast check interval (100ms - 800ms)
            timeout = setTimeout(loop, 100 + Math.random() * 700); 
        };
        loop();
        return () => clearTimeout(timeout);
    }, []);

    return (
        <span 
            className="inline-block transition-none cursor-default select-none"
            // FIX: Cast to CSSProperties to fix red underline
            style={{ 
                color: isHollow ? 'transparent' : 'white', 
                WebkitTextStroke: isHollow ? '2px #CCFF00' : '0px transparent',
                opacity: isHollow ? 0.8 : 1
            } as React.CSSProperties}
        >
            {char}
        </span>
    )
}

// --- 4. HOVER LETTER (HERO - FIXED) ---
const HoverLetter = ({ char }: { char: string }) => {
    return (
        <span 
            className="inline-block transition-all duration-200 cursor-default"
            // FIX: Cast to CSSProperties
            style={{ 
                color: 'white', 
                WebkitTextStroke: '0px transparent' 
            } as React.CSSProperties}
            onMouseEnter={(e) => {
                e.currentTarget.style.color = 'transparent';
                e.currentTarget.style.webkitTextStroke = '2px #CCFF00'; 
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.webkitTextStroke = '0px transparent';
            }}
        >
            {char}
        </span>
    )
}

// --- 5. VELOCITY MARQUEE ---
interface ParallaxProps { children: React.ReactNode; baseVelocity: number; }
function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });
  return (
    <div className="overflow-hidden m-0 flex flex-nowrap whitespace-nowrap">
      <motion.div className="flex flex-nowrap gap-12 md:gap-24 items-center" style={{ x }}>
        {children} {children} {children} {children}
      </motion.div>
    </div>
  );
}

// --- 6. STANDARD MARQUEE ---
const MarqueeStrip = ({ items, direction = "left", speed = 20, className = "" }: { items: React.ReactNode[], direction?: "left" | "right", speed?: number, className?: string }) => {
  return (
    <div className={`w-full overflow-hidden border-y border-white/10 bg-[#050505] py-3 md:py-4 ${className}`}>
      <div className="relative flex whitespace-nowrap">
        <motion.div 
          className="flex gap-8 md:gap-12 items-center min-w-full"
          animate={{ x: direction === "left" ? "-50%" : "0%" }}
          initial={{ x: direction === "left" ? "0%" : "-50%" }}
          transition={{ repeat: Infinity, ease: "linear", duration: speed }}
        >
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              {items.map((item, idx) => (
                <div key={`${i}-${idx}`} className="flex items-center gap-4 text-white/40 font-mono text-[10px] md:text-xs font-bold tracking-[0.2em]">
                  {item}
                </div>
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// --- UTILS ---
const DecryptedText = ({ text, className = "", speed = 30, reveal = true, hollow = false }: { text: string, className?: string, speed?: number, reveal?: boolean, hollow?: boolean }) => {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    if (!reveal) return;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(() => text.split('').map((letter, index) => {
          if (index < iterations) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1; 
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, reveal]);
  
  // FIX: Cast style to CSSProperties
  return <span className={className} style={{ 
      WebkitTextStroke: hollow ? '1px #fff' : '0px transparent', 
      color: hollow ? 'transparent' : 'inherit' 
  } as React.CSSProperties}>{display}</span>;
};

// --- SPOTLIGHT CARD ---
function SpotlightCard({ children, className = "", color = "rgba(204, 255, 0, 0.2)" }: { children: React.ReactNode; className?: string, color?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div className={`group relative border border-white/10 bg-[#0a0a0a] overflow-hidden transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl hover:shadow-black/50 ${className}`} onMouseMove={handleMouseMove}>
      <motion.div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-screen" style={{ background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 80%)` }} />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

const Magnetic = ({ children }: { children: React.ReactNode }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (left + width / 2)) * 0.15);
        y.set((e.clientY - (top + height / 2)) * 0.15);
    };
    const handleMouseLeave = () => { x.set(0); y.set(0); };
    return <motion.div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ x: springX, y: springY }} className="touch-none md:touch-auto">{children}</motion.div>;
};

// --- RANDOM FLICKER ---
const RandomFlicker = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const [opacity, setOpacity] = useState(1);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const triggerFlicker = () => {
      const newOpacity = Math.random() > 0.8 ? 1 : Math.random() * 0.4;
      setOpacity(newOpacity);
      const nextDelay = Math.random() > 0.9 ? Math.random() * 600 : Math.random() * 50;
      timeoutId = setTimeout(triggerFlicker, nextDelay);
    };
    triggerFlicker();
    return () => clearTimeout(timeoutId);
  }, []);
  return <span className={className} style={{ opacity }}>{children}</span>;
};

const BrutalLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="font-mono text-xs font-black tracking-[0.3em] uppercase text-white/70 text-shadow-[0_1px_2px_black] flex items-center gap-2">
    {children}
  </span>
);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const spaceSectionRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  const [activeSlide, setActiveSlide] = useState(1);
  const [activeMethod, setActiveMethod] = useState(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  useGSAP(() => {
    if (slidesRef.current && spaceSectionRef.current) {
      gsap.to(slidesRef.current, {
        xPercent: -75, 
        ease: "none",
        scrollTrigger: {
          trigger: spaceSectionRef.current,
          pin: true,
          scrub: 0.5,
          end: "+=3000",
          onUpdate: (self) => {
            if (progressBarRef.current) progressBarRef.current.style.height = `${self.progress * 100}%`;
            const p = self.progress;
            setActiveSlide(p >= 0.75 ? 4 : p >= 0.5 ? 3 : p >= 0.25 ? 2 : 1);
          }
        }
      });
    }
  }, { scope: container });

  const protocols = useMemo(() => [
    { title: "Hypertrophy", fullTitle: "STRUCTURAL HYPERTROPHY", content: "Maximal muscle damage. Overloading fibers to force biological adaptation.", index: "01", color: "#ff3333", icon: <Dumbbell className="w-5 h-5" />, stats: [{ label: "INTENSITY", value: 85 }, { label: "VOLUME", value: 90 }], image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200" },
    { title: "Neural Drive", fullTitle: "NEURAL POTENTIATION", content: "Rewiring the CNS. Moving heavy loads with maximal explosive intent.", index: "02", color: "#33bbff", icon: <Zap className="w-5 h-5" />, stats: [{ label: "INTENSITY", value: 98 }, { label: "SPEED", value: 90 }], image: "https://images.unsplash.com/photo-1550345332-09e3ac987658?q=80&w=1200" },
    { title: "Metabolic", fullTitle: "METABOLIC CAPACITY", content: "Pushing the lactate threshold. High-density work to strip fat and build engine.", index: "03", color: "#ffaa00", icon: <HeartPulse className="w-5 h-5" />, stats: [{ label: "VOLUME", value: 100 }, { label: "SWEAT", value: 100 }], image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1200" },
    { title: "Restoration", fullTitle: "ACTIVE RESTORATION", content: "Joint mobilization and flow work to ensure structural integrity.", index: "04", color: "#00ffaa", icon: <Timer className="w-5 h-5" />, stats: [{ label: "MOBILITY", value: 100 }, { label: "FLOW", value: 90 }], image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200" }
  ], []);

  const slides = useMemo(() => [
    { title: "THE FORGE", subtitle: "HEAVY METAL", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600", description: "Raw iron. Calibrated plates. Monolifts.", specs: "ISO:400 // APERTURE: F/2.8" },
    { title: "THE VOID", subtitle: "RECOVERY", img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1600", description: "Zero-gravity sensory deprivation.", specs: "TEMP: -110°C // O2: 100%" },
    { title: "THE ARENA", subtitle: "COMBAT", img: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1600", description: "2000sqft of mat space. Heavy bags.", specs: "SURFACE: MATTE // GRIP: HIGH" },
    { title: "THE LAB", subtitle: "BIOMETRICS", img: "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1600", description: "Advanced diagnostics. VO2 max testing.", specs: "ANALYSIS: REALTIME // CPU: 99%" }
  ], []);

  return (
    <main ref={container} className="relative bg-black selection:bg-accent selection:text-black w-full overflow-x-hidden" onMouseMove={handleMouseMove}>
      
      {/* GLOBAL FILM GRAIN */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 opacity-60">
           <video autoPlay muted loop playsInline className="w-full h-full object-cover grayscale contrast-125 brightness-75">
             <source src="/video-bg.mp4" type="video/mp4" />
           </video>
        </div>
        <div className="absolute inset-0 z-10 opacity-80 pointer-events-none">
          <FuturisticShape />
        </div>
        <div className="relative z-20 flex flex-col items-center w-full px-4">
          <h1 className="font-syncopate text-[18vw] font-black leading-[0.8] tracking-tighter text-white mix-blend-exclusion select-none text-center flex">
            {"KINETIC".split('').map((char, i) => <HoverLetter key={i} char={char} />)}
          </h1>
          <div className="w-full max-w-[90vw] md:max-w-[42vw] mt-4 md:mt-8">
            <div className="w-full h-[2px] bg-accent" />
            <div className="flex justify-between items-center mt-4">
              <BrutalLabel>EST. 2024</BrutalLabel>
              <span className="text-accent tracking-widest">///</span>
              <BrutalLabel>FUTURE</BrutalLabel>
            </div>
          </div>
        </div>
      </section>

      {/* --- SCROLL-REACTIVE ICON TAPE (Mid-Site) --- */}
      <div className="border-y border-white/10 bg-[#050505] py-8 overflow-hidden relative z-20">
        <ParallaxText baseVelocity={-2}>
           <div className="flex items-center gap-24 opacity-50 text-white">
              <Scan className="w-12 h-12" />
              <Cpu className="w-12 h-12" />
              <Dna className="w-12 h-12" />
              <Anchor className="w-12 h-12" />
              <Radio className="w-12 h-12" />
              <Activity className="w-12 h-12" />
              <Zap className="w-12 h-12" />
              <Crosshair className="w-12 h-12" />
           </div>
        </ParallaxText>
      </div>

      <Philosophy />
      <Principles />

      {/* METHOD SECTION */}
      <section id="method" className="py-40 px-4 md:px-20 bg-[#080808] relative z-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <motion.div className="absolute w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-screen" style={{ left: mouseX, top: mouseY }} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-12 relative group">
             <div className="absolute -left-4 -top-4 w-8 h-8 border-l-2 border-t-2 border-accent/50 transition-all duration-500 group-hover:w-12 group-hover:h-12 group-hover:border-accent" />
             <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-2 h-2 bg-accent animate-pulse shadow-[0_0_15px_#CCFF00]" />
                   <BrutalLabel>SYSTEM_V.2.0</BrutalLabel>
                </div>
                <div className="relative overflow-hidden py-2">
                   <h2 className="text-8xl md:text-[10rem] font-black tracking-tighter font-syncopate relative z-20 leading-[0.8] select-none text-white">
                      <DecryptedText text="METHOD" speed={30} hollow={true} className="relative z-20" />
                      <RandomFlicker className="absolute inset-0 text-accent z-10 blur-[3px]">METHOD</RandomFlicker>
                   </h2>
                </div>
             </div>
             <div className="md:text-right font-mono text-xs text-white/40 max-w-xs leading-relaxed hidden md:block border-l-2 border-accent/20 pl-4">
                <span className="text-accent">/// OPTIMIZATION_LOGIC</span><br/>Advanced protocols designed to force biological adaptation through mechanical tension.
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4 flex flex-col justify-center gap-4">
              {protocols.map((protocol, i) => (
                <Magnetic key={i}>
                  <div onMouseEnter={() => setActiveMethod(i)} className={`group relative cursor-pointer p-6 border transition-all duration-300 ease-out ${activeMethod === i ? 'bg-white/5 border-white/20 translate-x-4' : 'border-white/5 hover:border-white/10 hover:bg-white/[0.02]'}`}>
                    <div className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300" style={{ backgroundColor: activeMethod === i ? protocol.color : 'transparent', boxShadow: activeMethod === i ? `0 0 20px ${protocol.color}` : 'none' }} />
                    <div className="flex justify-between items-center relative z-10">
                      <div className="flex items-center gap-6">
                         <span className={`font-mono text-sm font-bold transition-colors ${activeMethod === i ? 'text-white' : 'text-white/20'}`}>0{i+1}</span>
                         <h3 className={`font-syncopate text-lg uppercase font-bold transition-colors ${activeMethod === i ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`}>{protocol.title}</h3>
                      </div>
                      <div className={`transition-all duration-300 ${activeMethod === i ? 'opacity-100 scale-110' : 'opacity-0 scale-75'}`} style={{ color: activeMethod === i ? protocol.color : 'white' }}>{protocol.icon}</div>
                    </div>
                  </div>
                </Magnetic>
              ))}
            </div>
            <motion.div className="lg:col-span-8 relative h-[600px] z-20">
               <div className="w-full h-full bg-black border border-white/10 shadow-2xl overflow-hidden relative">
                  <AnimatePresence mode='popLayout'>
                    <motion.img key={activeMethod} src={protocols[activeMethod].image} alt="Method" initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 0.6, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none" loading="lazy" />
                  </AnimatePresence>
                  <div className="absolute inset-0 mix-blend-multiply opacity-80 pointer-events-none transition-colors duration-500" style={{ background: `linear-gradient(135deg, black 0%, ${protocols[activeMethod].color} 100%)` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-end">
                      <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-white/20" />
                      <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-white/20" />
                      <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-white/20" />
                      <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-white/20" />
                      <div className="absolute top-10 right-10 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: protocols[activeMethod].color }} />
                        <BrutalLabel>SYSTEM_ARMED</BrutalLabel>
                      </div>
                      <div className="relative mb-12">
                        <div className="flex items-center gap-2 mb-6 opacity-70">
                            <Scan className="w-4 h-4" style={{ color: protocols[activeMethod].color }} />
                            <span className="font-mono text-sm tracking-widest text-white uppercase font-bold">SEQ_0{protocols[activeMethod].index}</span>
                        </div>
                        <h3 className="font-syncopate text-5xl md:text-7xl font-black text-white leading-[0.9] mb-8 italic mix-blend-screen min-h-[3.6rem]">{protocols[activeMethod].fullTitle}</h3>
                        <div className="font-mono text-sm md:text-base text-white/80 leading-relaxed max-w-lg border-l-4 pl-6 py-2 bg-black/40 backdrop-blur-sm min-h-[5rem]" style={{ borderColor: protocols[activeMethod].color }}>{protocols[activeMethod].content}</div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-white/10 pt-8">
                        {protocols[activeMethod].stats.map((stat, idx) => (
                            <div key={idx}>
                              <div className="flex justify-between text-[10px] font-mono tracking-widest text-white/60 mb-2"><span>{stat.label}</span><span style={{ color: protocols[activeMethod].color }}>{stat.value}%</span></div>
                              <div className="h-1.5 w-full bg-white/10 overflow-hidden rounded-full"><motion.div className="h-full" style={{ backgroundColor: protocols[activeMethod].color }} initial={{ width: 0 }} animate={{ width: `${stat.value}%` }} transition={{ duration: 0.8, ease: "circOut", delay: 0.1 * idx }}/></div>
                            </div>
                        ))}
                      </div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SPACE SECTION */}
      <section ref={spaceSectionRef} id="space" className="h-screen bg-[#050505] relative z-20 flex overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(204,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(204,255,0,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        <div className="w-1/2 h-full flex flex-col justify-center relative z-20 bg-[#050505] border-r border-white/10">
           <div className="absolute top-12 right-12 text-right font-mono text-[10px] text-white/50 tracking-widest z-30">COORDS: 34.05.{activeSlide}1 // 118.24.{9 - activeSlide}5<br/>SECTOR: 0{activeSlide}</div>
           <div className="relative px-12 md:px-20">
              <div className="absolute -top-3 left-9 flex flex-col gap-2 opacity-50 z-30"><Crosshair className="w-8 h-8 text-accent animate-[spin_3s_linear_infinite_reverse]" /></div>
              <div className="absolute right-10 opacity-20 animate-[spin_15s_linear_infinite] pointer-events-none z-0">
                  <svg width="250" height="250" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="5,5" /><circle cx="50" cy="50" r="30" stroke="#CCFF00" strokeWidth="0.5" fill="none" /></svg>
              </div>
              <div className="w-12 h-1 bg-accent mb-8 shadow-[0_0_15px_rgba(204,255,0,0.5)]" />
              <span className="font-mono text-xs text-white/50 tracking-[0.5em] uppercase mb-4 block relative z-10">Architecture / Design</span>
              <h2 className="font-syncopate text-[6vw] font-black leading-[0.8] tracking-tighter uppercase relative z-10" style={{ WebkitTextStroke: '2px #CCFF00', color: 'transparent' }}>THE SPACE</h2>
              <p className="mt-8 font-mono text-sm text-white/60 max-w-md leading-loose relative z-10">A brutalist environment stripped of distraction. Concrete, steel, and light designed to focus the mind.</p>
           </div>
           <div className="absolute bottom-12 left-12 flex items-end gap-6">
              <div className="h-32 w-1 bg-white/10 relative overflow-hidden rounded-full"><div ref={progressBarRef} className="w-full bg-accent absolute top-0 left-0 shadow-[0_0_10px_#CCFF00]" style={{ height: '0%' }} /></div>
              <div className="font-mono text-[10px] text-accent tracking-widest leading-loose">
                 <div className="flex items-center gap-2"><span className="w-2 h-2 bg-accent rounded-full animate-pulse" /> SYSTEM: ONLINE</div>
                 <div className="text-white/50">DATA STREAM: ACTIVE</div>
              </div>
           </div>
        </div>
        <div className="w-1/2 h-full overflow-hidden relative">
           <div ref={slidesRef} className="flex h-full w-[400%] will-change-transform">
              {slides.map((slide, i) => (
                 <div key={i} className="w-1/4 h-full flex flex-col justify-center px-12 md:px-20 border-r border-white/5 relative bg-[#050505]/50 backdrop-blur-sm">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-syncopate text-[20vw] font-black text-white/5 select-none pointer-events-none z-0">0{i+1}</div>
                    <div className={`relative mb-8 group z-10 bg-black border border-white/10 shadow-2xl overflow-hidden ${i === 3 ? 'w-4/5 aspect-[4/3] mx-auto' : 'w-full aspect-[16/9]'}`}>
                       <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-accent z-20" />
                       <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-accent z-20" />
                       <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-accent z-20" />
                       <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-accent z-20" />
                       <div className="w-full h-full overflow-hidden relative">
                           <img src={slide.img} alt={slide.title} className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" loading={i > 0 ? "lazy" : "eager"} />
                           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/20 to-transparent h-[10%] w-full animate-[scan_3s_linear_infinite] pointer-events-none mix-blend-overlay" />
                           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                       </div>
                    </div>
                    <div className="relative z-10">
                       <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                          <span className="font-syncopate text-accent text-sm tracking-widest">{slide.subtitle}</span>
                          <span className="font-mono text-[9px] text-white/40">{slide.specs}</span>
                       </div>
                       <h3 className="font-syncopate text-4xl md:text-5xl font-black text-white uppercase mb-4">{slide.title}</h3>
                       <p className="font-mono text-white/50 text-xs leading-relaxed max-w-sm mb-8 border-l-2 border-accent/20 pl-4">{slide.description}</p>
                       <button className="flex items-center gap-3 text-white text-xs font-bold tracking-[0.2em] uppercase hover:text-accent transition-colors group">[ VIEW SPECS ] <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" /></button>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- MEMBERSHIP SECTION --- */}
      <section id="membership" className="py-40 px-4 md:px-20 bg-black relative z-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-black to-black" />
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <div>
              <BrutalLabel><Shield className="w-4 h-4" /> ACCESS_CONTROL</BrutalLabel>
              <div className="relative mt-4">
                <h2 className="text-7xl md:text-9xl font-black tracking-tighter font-syncopate relative z-10 leading-[0.85] select-none text-white">
                    <DecryptedText text="MEMBERSHIP" speed={30} hollow={true} className="relative z-10" />
                    <span className="absolute inset-0 text-white opacity-0 mix-blend-overlay animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]">MEMBERSHIP</span>
                </h2>
              </div>
            </div>
            
            {/* Toggle Switch */}
            <div className="flex items-center gap-2 mt-8 md:mt-0 p-1 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm relative">
                <motion.div 
                  className="absolute top-1 bottom-1 bg-accent rounded-md z-0"
                  layoutId="billingCycle"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{
                    left: billingCycle === 'monthly' ? '4px' : '50%',
                    right: billingCycle === 'monthly' ? '50%' : '4px',
                    width: 'calc(50% - 6px)'
                  }}
                />
                <button onClick={() => setBillingCycle('monthly')} className={`relative z-10 px-8 py-3 font-mono text-xs font-bold tracking-widest transition-colors duration-300 ${billingCycle === 'monthly' ? 'text-black' : 'text-white/50'}`}>MONTHLY</button>
                <button onClick={() => setBillingCycle('annual')} className={`relative z-10 px-8 py-3 font-mono text-xs font-bold tracking-widest transition-colors duration-300 ${billingCycle === 'annual' ? 'text-black' : 'text-white/50'}`}>ANNUAL</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" onMouseLeave={() => setHoveredCard(null)}>
            
            {[
              { name: 'Initiate', price: { m: '150', a: '120' }, features: ['Open Gym Access', 'Standard Locker', 'Digital App Access', '1 Guest Pass/Mo'], icon: <Scan className="w-6 h-6" />, color: 'rgba(255, 255, 255, 0.3)' },
              { name: 'Overlord', price: { m: '450', a: '360' }, features: ['All Classes Included', 'Recovery Suite', 'Bio-Metric Scan', 'Private Locker'], icon: <Crown className="w-6 h-6" />, color: 'rgba(204, 255, 0, 0.3)', popular: true },
              { name: 'Apex', price: { m: '950', a: '760' }, features: ['24/7 Access', 'Personal Coach (4x)', 'Cryo Unlimited', 'Gear Kit'], icon: <Flame className="w-6 h-6" />, color: 'rgba(255, 255, 255, 0.3)' }
            ].map((tier, i) => {
              const isHovered = hoveredCard === i;
              const isDimmed = hoveredCard !== null && hoveredCard !== i;

              return (
                <SpotlightCard key={i} color={tier.color} className={isDimmed ? 'opacity-40 blur-sm scale-95' : ''}>
                  <div 
                    onMouseEnter={() => setHoveredCard(i)}
                    className={`p-10 h-full flex flex-col relative transition-all duration-500`}
                  >
                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <div className={`p-3 rounded-full border border-white/10 bg-white/5 transition-colors duration-300 ${tier.popular ? 'text-black bg-accent border-accent' : 'text-white group-hover:text-black group-hover:bg-white group-hover:border-white'}`}>
                        {tier.icon}
                      </div>
                      {tier.popular && <span className="text-[10px] font-mono font-bold tracking-widest text-accent border border-accent px-2 py-1">POPULAR</span>}
                    </div>

                    <h3 className="font-syncopate text-3xl font-bold text-white mb-2">{tier.name}</h3>
                    <div className="text-white/40 font-mono text-xs mb-8">FULL ACCESS GRANTED</div>

                    <div className="flex items-baseline gap-1 mb-8">
                      <AnimatePresence mode='wait'>
                        <motion.span 
                          key={billingCycle}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-6xl font-black text-white tracking-tighter"
                        >
                          ${billingCycle === 'monthly' ? tier.price.m : tier.price.a}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-sm font-mono text-white/50">/MO</span>
                    </div>

                    <ul className="space-y-4 mb-12 relative z-10 flex-grow">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs font-mono text-white/70">
                          <Check className="w-3 h-3 text-accent mt-0.5 shrink-0" /> {feat}
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-4 font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 relative z-10
                      ${tier.popular 
                        ? 'bg-accent text-black hover:bg-white' 
                        : 'border border-white/20 text-white hover:bg-white hover:text-black'
                      }
                    `}>
                      SELECT PLAN
                    </button>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- INFORMATIVE FOOTER (Fixed & Thicker) --- */}
      <footer className="bg-black border-t border-white/10 relative overflow-hidden">
        
        {/* TEXT TAPE (Header) */}
        <MarqueeStrip 
          direction="left" 
          items={["HYPERTROPHY PROTOCOL", "MAXIMAL EFFORT", "ATP REGENERATION", "MITOCHONDRIAL DENSITY", "CNS POTENTIATION", "VELOCITY BASED TRAINING"]} 
          className="border-none bg-transparent"
        />

        <div className="max-w-[1400px] mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-4 gap-16 border-t border-white/10">
           
           {/* COL 1: BRAND IDENTITY + SOCIALS (Moved) */}
           <div className="md:col-span-1 flex flex-col justify-between h-full">
              <div>
                 {/* AUTOMATIC FLICKER LOGO */}
                 <div className="mb-8 cursor-default group select-none">
                    <span className="font-syncopate font-black text-5xl text-white flex">
                      {"KINETIC".split('').map((char, i) => <AutoFlickerLetter key={i} char={char} />)}
                    </span>
                 </div>
                 
                 <div className="font-mono text-xs text-white/50 leading-relaxed space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center border border-white/10"><MapPin className="w-4 h-4 text-accent"/></div>
                       <div>SECTOR 07<br/>INDUSTRIAL DISTRICT</div>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center border border-white/10"><Mail className="w-4 h-4 text-accent"/></div>
                       <div>SYSTEM@KINETIC.GYM<br/>ENCRYPTED_CHANNEL</div>
                    </div>
                 </div>
              </div>

              {/* SOCIALS MOVED HERE */}
              <div className="mt-8 flex gap-6">
                 <Instagram className="text-white hover:text-accent cursor-pointer transition-colors w-5 h-5" />
                 <Twitter className="text-white hover:text-accent cursor-pointer transition-colors w-5 h-5" />
                 <Youtube className="text-white hover:text-accent cursor-pointer transition-colors w-5 h-5" />
              </div>
           </div>

           {/* COL 2: NAVIGATION */}
           <div className="md:col-span-1">
              <h4 className="font-mono text-xs text-accent mb-8 tracking-widest font-bold border-b border-white/10 pb-4">NAVIGATION_MODULE</h4>
              <ul className="space-y-4 font-mono text-sm text-white/70">
                 {['MANIFESTO', 'LOCATIONS', 'SHOP_GEAR', 'CAREERS', 'FRANCHISE'].map((item) => (
                    <li key={item} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 group">
                       <span className="w-1 h-1 bg-white/20 group-hover:bg-accent transition-colors"/> {item}
                    </li>
                 ))}
              </ul>
           </div>

           {/* COL 3: LEGAL & INFO */}
           <div className="md:col-span-1">
              <h4 className="font-mono text-xs text-accent mb-8 tracking-widest font-bold border-b border-white/10 pb-4">LEGAL_PROTOCOLS</h4>
              <ul className="space-y-4 font-mono text-xs text-white/50">
                 <li className="hover:text-white cursor-pointer flex items-center gap-2">
                    <Shield className="w-3 h-3" /> PRIVACY_POLICY_V2
                 </li>
                 <li className="hover:text-white cursor-pointer flex items-center gap-2">
                    <Lock className="w-3 h-3" /> DATA_ENCRYPTION
                 </li>
              </ul>
              
              <div className="mt-12 font-mono text-[10px] text-white/30 leading-loose">
                 COPYRIGHT 2024 © KINETIC<br/>
                 ALL RIGHTS RESERVED.<br/>
                 SYSTEM VERSION 2.0.4
              </div>
           </div>

           {/* COL 4: MODERN RADAR CLOCK (Huge & Clean) */}
           <div className="md:col-span-1 flex flex-col items-center md:items-end justify-center">
              <ModernClock />
           </div>
        </div>
      </footer>
    </main>
  );
}