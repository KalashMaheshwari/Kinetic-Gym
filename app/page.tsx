'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis'; // IMPORT LENIS
import { FuturisticShape } from '@/components/ui/FuturisticShape';
import { Philosophy } from '@/components/home/Philosophy';
import { Principles } from '@/components/home/Principles';
import Footer from '@/components/home/Footer'; 
import Navbar from '@/components/layout/Navbar';
import { ArrowRight, ArrowLeft, Zap, Activity, Dumbbell, HeartPulse, Timer, Scan, Check, Shield, Crown, Flame, Cpu, Dna, Anchor, Radio } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate, useScroll, useVelocity, useTransform, useAnimationFrame } from 'framer-motion';

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// --- HELPER COMPONENTS ---
const BrutalLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="font-mono text-[9px] md:text-xs font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-white/70 text-shadow-[0_1px_2px_black] flex items-center gap-2">
    {children}
  </span>
);

const HoverLetter = ({ char }: { char: string }) => (
    <span 
        className="inline-block transition-all duration-200 cursor-default"
        style={{ color: 'white', WebkitTextStroke: '0px transparent' } as React.CSSProperties}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'transparent'; e.currentTarget.style.webkitTextStroke = '2px #CCFF00'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.webkitTextStroke = '0px transparent'; }}
    >
        {char}
    </span>
);

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
  return <span className={className} style={{ WebkitTextStroke: hollow ? '1px #fff' : '0px transparent', color: hollow ? 'transparent' : 'inherit' } as React.CSSProperties}>{display}</span>;
};

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
    return <motion.div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ x: springX, y: springY }} className="hidden md:block">{children}</motion.div>;
};

// --- ANIMATIONS ---
function ParallaxText({ children, baseVelocity = 100 }: { children: React.ReactNode; baseVelocity: number }) {
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
    <div className="overflow-hidden m-0 flex flex-nowrap whitespace-nowrap will-change-transform">
      <motion.div className="flex flex-nowrap gap-12 md:gap-24 items-center" style={{ x }}>
        {children} {children} {children} {children}
      </motion.div>
    </div>
  );
}

function SpotlightCard({ children, className = "", color = "rgba(204, 255, 0, 0.2)" }: { children: React.ReactNode; className?: string, color?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div className={`group relative border border-white/10 bg-[#0a0a0a] overflow-hidden transition-all duration-300 active:scale-95 md:hover:scale-105 md:hover:z-10 md:hover:shadow-2xl md:hover:shadow-black/50 ${className}`} onMouseMove={handleMouseMove}>
      <div className="absolute inset-0 bg-white/[0.02] md:bg-transparent pointer-events-none" />
      <motion.div className="pointer-events-none absolute -inset-px opacity-0 md:group-hover:opacity-100 transition duration-300 mix-blend-screen" style={{ background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 80%)` }} />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

// --- MAIN PAGE ---
export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const spaceSectionRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  // Ref for Mobile Method Horizontal Scroll
  const methodScrollRef = useRef<HTMLDivElement>(null);

  const [activeSlide, setActiveSlide] = useState(1);
  const [activeMethod, setActiveMethod] = useState(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // OPTIMIZED: Only track mouse on desktop to save mobile resources
  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return; 
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  // --- SMOOTH SCROLL (LENIS) SETUP ---
  useEffect(() => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // "Luxury" Easing
        orientation: 'vertical',
        gestureDirection: 'vertical',
        smoothWheel: true,
        touchMultiplier: 2,
    });

    function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // GSAP Integration with Lenis
    // This connects GSAP's scroll trigger to Lenis's smooth update
    // Note: ScrollTrigger.update() usually handled automatically but good to sync
    
    return () => {
        lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
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
    });
    mm.add("(max-width: 767px)", () => {
      if (slidesRef.current) gsap.set(slidesRef.current, { xPercent: 0 });
    });
  }, { scope: container });

  // Mobile Scroll Handler for Methods
  const scrollMethods = (direction: 'left' | 'right') => {
    if (methodScrollRef.current) {
      const scrollAmount = 300; 
      methodScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const protocols = useMemo(() => [
    { title: "Hypertrophy", fullTitle: "STRUCTURAL HYPERTROPHY", content: "Maximal muscle damage. Overloading fibers to force biological adaptation. We utilize eccentric overload and time-under-tension to rupture micro-fibers, demanding repair and growth.", index: "01", color: "#ff3333", icon: <Dumbbell className="w-5 h-5" />, stats: [{ label: "INTENSITY", value: 85 }, { label: "VOLUME", value: 90 }], image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200" },
    { title: "Neural Drive", fullTitle: "NEURAL POTENTIATION", content: "Rewiring the CNS. Moving heavy loads with maximal explosive intent. This phase focuses on recruiting high-threshold motor units to increase raw power output.", index: "02", color: "#33bbff", icon: <Zap className="w-5 h-5" />, stats: [{ label: "INTENSITY", value: 98 }, { label: "SPEED", value: 90 }], image: "https://images.unsplash.com/photo-1550345332-09e3ac987658?q=80&w=1200" },
    { title: "Metabolic", fullTitle: "METABOLIC CAPACITY", content: "Pushing the lactate threshold. High-density work to strip fat and build engine. Short rest periods and compound movements create an oxygen debt that burns calories for hours.", index: "03", color: "#ffaa00", icon: <HeartPulse className="w-5 h-5" />, stats: [{ label: "VOLUME", value: 100 }, { label: "SWEAT", value: 100 }], image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1200" },
    { title: "Restoration", fullTitle: "ACTIVE RESTORATION", content: "Joint mobilization and flow work to ensure structural integrity. We focus on end-range strength and fascia release to prevent injury and accelerate recovery.", index: "04", color: "#00ffaa", icon: <Timer className="w-5 h-5" />, stats: [{ label: "MOBILITY", value: 100 }, { label: "FLOW", value: 90 }], image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200" }
  ], []);

  const slides = useMemo(() => [
    { title: "THE FORGE", subtitle: "HEAVY METAL", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600", description: "Raw iron. Calibrated plates. Monolifts. A sanctuary for heavy lifting where the only metric that matters is the weight on the bar.", specs: "ISO:400 // APERTURE: F/2.8" },
    { title: "THE VOID", subtitle: "RECOVERY", img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1600", description: "Zero-gravity sensory deprivation tanks. Infrared saunas. Cryotherapy chambers. Total system reset for optimal performance.", specs: "TEMP: -110°C // O2: 100%" },
    { title: "THE ARENA", subtitle: "COMBAT", img: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1600", description: "2000sqft of mat space. Heavy bags. Boxing rings. Where agility meets aggression in a controlled environment.", specs: "SURFACE: MATTE // GRIP: HIGH" },
    { title: "THE LAB", subtitle: "BIOMETRICS", img: "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1600", description: "Advanced diagnostics. VO2 max testing. Blood panels. Data-driven training to bio-hack your physiology.", specs: "ANALYSIS: REALTIME // CPU: 99%" }
  ], []);

  return (
    <main ref={container} className="relative bg-black selection:bg-accent selection:text-black w-full overflow-x-hidden" onMouseMove={handleMouseMove}>
      
      <Navbar />

      {/* OPTIMIZED GRAIN (CSS-Based, No SVG Filter Lag) */}
      <div 
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] mix-blend-overlay"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            // If still laggy, replace the above URL with a tiny PNG pattern
        }}
      />

      {/* HERO SECTION */}
      <section id="hero" className="relative w-full bg-black overflow-hidden md:h-screen">
        
        {/* DESKTOP HERO */}
        <div className="hidden md:flex absolute inset-0 flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-60">
               <video autoPlay muted loop playsInline className="w-full h-full object-cover grayscale contrast-125 brightness-75">
                 <source src="/video-bg.mp4" type="video/mp4" />
               </video>
            </div>
            <div className="absolute inset-0 z-10 opacity-80 pointer-events-none scale-100 origin-center">
              <FuturisticShape />
            </div>
            <div className="relative z-20 flex flex-col items-center w-full px-4">
              <h1 className="font-syncopate text-[15vw] md:text-[18vw] font-black leading-[0.8] tracking-tighter text-white mix-blend-exclusion select-none text-center flex">
                {"KINETIC".split('').map((char, i) => <HoverLetter key={i} char={char} />)}
              </h1>
              <div className="w-full max-w-[42vw] mt-8">
                <div className="w-full h-[2px] bg-accent" />
                <div className="flex justify-between items-center mt-4">
                  <BrutalLabel>EST. 2024</BrutalLabel>
                  <span className="text-accent tracking-widest text-xs">///</span>
                  <BrutalLabel>FUTURE</BrutalLabel>
                </div>
              </div>
            </div>
        </div>

        {/* MOBILE HERO (Optimized) */}
        <div className="block md:hidden relative w-full h-[60vh] will-change-transform">
            <img 
              src="/mob-bg.jpg" 
              alt="Background" 
              className="w-full h-full object-cover grayscale contrast-125 brightness-[0.5]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20">
               <div className="mb-6 px-3 py-1 border border-white/20 bg-black/40 backdrop-blur-md rounded-full flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                  <span className="font-mono text-[8px] text-accent/90 tracking-widest">SYSTEM_ONLINE // V.2.0</span>
               </div>
               <h1 className="font-syncopate text-[15vw] font-black leading-[0.8] tracking-tighter text-white select-none text-center flex drop-shadow-2xl">
                 {"KINETIC".split('').map((char, i) => <HoverLetter key={i} char={char} />)}
               </h1>
               <div className="w-full max-w-[85vw] mt-6">
                  <div className="w-full h-[1px] bg-accent shadow-[0_0_10px_#CCFF00]" />
                  <div className="flex justify-between items-center mt-3">
                    <BrutalLabel>EST. 2024</BrutalLabel>
                    <span className="text-accent tracking-widest text-[10px] animate-pulse">///</span>
                    <BrutalLabel>FUTURE</BrutalLabel>
                  </div>
               </div>
            </div>
        </div>
      </section>

      {/* TAPE 1 - With Will-Change optimization */}
      <div className="border-y border-white/10 bg-[#050505] py-2 md:py-8 overflow-hidden relative z-20">
        <ParallaxText baseVelocity={-2}>
           <div className="flex items-center gap-16 md:gap-24 opacity-50 text-white will-change-transform">
              <Scan className="w-8 h-8 md:w-12 md:h-12" />
              <Cpu className="w-8 h-8 md:w-12 md:h-12" />
              <Dna className="w-8 h-8 md:w-12 md:h-12" />
              <Anchor className="w-8 h-8 md:w-12 md:h-12" />
              <Radio className="w-8 h-8 md:w-12 md:h-12" />
              <Activity className="w-8 h-8 md:w-12 md:h-12" />
              <Zap className="w-8 h-8 md:w-12 md:h-12" />
           </div>
        </ParallaxText>
      </div>

      <section id="philosophy">
        <Philosophy />
      </section>
      <Principles />

      {/* METHOD SECTION */}
      <section id="method" className="py-20 md:py-40 px-4 md:px-20 bg-[#080808] relative z-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <motion.div className="hidden md:block absolute w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-screen" style={{ left: mouseX, top: mouseY }} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* HEADER */}
          <div className="mb-16 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8 md:pb-12 relative group">
             <div className="absolute -left-2 -top-2 md:-left-4 md:-top-4 w-6 h-6 md:w-8 md:h-8 border-l-2 border-t-2 border-accent/50" />
             <div className="relative">
                <div className="flex items-center gap-3 mb-2 md:mb-4">
                   <div className="w-2 h-2 bg-accent animate-pulse shadow-[0_0_15px_#CCFF00]" />
                   <BrutalLabel>SYSTEM_V.2.0</BrutalLabel>
                </div>
                <div className="relative overflow-hidden py-1">
                   <h2 className="text-[15vw] md:text-[10rem] font-black tracking-tighter font-syncopate relative z-20 leading-[0.8] select-none text-white">
                      <DecryptedText text="METHOD" speed={30} hollow={true} className="relative z-20" />
                      <RandomFlicker className="absolute inset-0 text-accent z-10 blur-[3px]">METHOD</RandomFlicker>
                   </h2>
                </div>
             </div>
             <div className="md:text-right font-mono text-[10px] md:text-xs text-white/40 max-w-xs leading-relaxed hidden md:block border-l-2 border-accent/20 pl-4">
                <span className="text-accent">/// OPTIMIZATION_LOGIC</span><br/>Advanced protocols designed to force biological adaptation through mechanical tension.
             </div>
          </div>

          {/* DESKTOP METHOD LAYOUT */}
          <div className="hidden md:grid grid-cols-12 gap-16">
            <div className="col-span-4 flex flex-col justify-center gap-4">
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
            <div className="col-span-8 relative h-[600px] z-20">
               <div className="w-full h-full bg-black border border-white/10 shadow-2xl overflow-hidden relative">
                  <AnimatePresence mode='popLayout'>
                    <motion.img key={activeMethod} src={protocols[activeMethod].image} alt="Method" initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 0.6, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none" loading="lazy" />
                  </AnimatePresence>
                  <div className="absolute inset-0 mix-blend-multiply opacity-80 pointer-events-none transition-colors duration-500" style={{ background: `linear-gradient(135deg, black 0%, ${protocols[activeMethod].color} 100%)` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 z-10 p-12 flex flex-col justify-end">
                      <div className="relative mb-12">
                        <div className="flex items-center gap-2 mb-6 opacity-70">
                            <Scan className="w-4 h-4" style={{ color: protocols[activeMethod].color }} />
                            <span className="font-mono text-sm tracking-widest text-white uppercase font-bold">SEQ_0{protocols[activeMethod].index}</span>
                        </div>
                        <h3 className="font-syncopate text-7xl font-black text-white leading-[0.9] mb-8 italic mix-blend-screen">{protocols[activeMethod].fullTitle}</h3>
                        <div className="font-mono text-base text-white/80 leading-relaxed max-w-lg border-l-4 pl-6 py-2 bg-black/40 backdrop-blur-sm" style={{ borderColor: protocols[activeMethod].color }}>{protocols[activeMethod].content}</div>
                      </div>
                  </div>
               </div>
            </div>
          </div>

          {/* MOBILE METHOD LAYOUT */}
          <div className="md:hidden">
             <div className="flex justify-end gap-4 mb-4">
                <button onClick={() => scrollMethods('left')} className="p-3 border border-white/10 bg-white/5 active:bg-white/20"><ArrowLeft className="w-4 h-4 text-white" /></button>
                <button onClick={() => scrollMethods('right')} className="p-3 border border-white/10 bg-white/5 active:bg-white/20"><ArrowRight className="w-4 h-4 text-white" /></button>
             </div>
             <div ref={methodScrollRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide">
                {protocols.map((protocol, i) => (
                   <div key={i} className="min-w-[85vw] snap-center">
                      <div className="bg-black border border-white/10 rounded-sm overflow-hidden h-[500px] relative flex flex-col">
                         <div className="h-1/2 relative overflow-hidden">
                            <img src={protocol.image} alt={protocol.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 border border-white/10">
                               <span className="font-mono text-[10px] text-white">0{i+1}</span>
                            </div>
                         </div>
                         <div className="h-1/2 p-6 flex flex-col justify-between relative bg-[#0a0a0a]">
                            <div className="absolute top-0 left-0 h-[2px] w-full" style={{ backgroundColor: protocol.color }} />
                            <div>
                               <div className="flex items-center gap-2 mb-3 opacity-70">
                                  <span style={{ color: protocol.color }}>{protocol.icon}</span>
                                  <span className="font-mono text-[10px] tracking-widest text-white uppercase">SEQ_0{protocol.index}</span>
                               </div>
                               <h3 className="font-syncopate text-2xl font-black text-white leading-none mb-4">{protocol.title}</h3>
                               <p className="font-mono text-xs text-white/60 leading-relaxed line-clamp-4">
                                  {protocol.content}
                               </p>
                            </div>
                            <div className="flex gap-4 mt-4 pt-4 border-t border-white/5">
                               {protocol.stats.map((stat, idx) => (
                                  <div key={idx}>
                                     <div className="text-[9px] font-mono text-white/40 mb-1">{stat.label}</div>
                                     <div className="text-sm font-bold text-white">{stat.value}%</div>
                                  </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>

        </div>
      </section>

      {/* SPACE SECTION */}
      <section ref={spaceSectionRef} id="space" className="min-h-screen bg-[#050505] relative z-20 flex flex-col md:flex-row overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(204,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(204,255,0,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        <div className="w-full md:w-1/2 h-auto md:h-full flex flex-col justify-center relative z-20 bg-[#050505] border-b md:border-b-0 md:border-r border-white/10 py-16 md:py-0 px-6 md:px-20">
           <div className="absolute top-6 right-6 md:top-12 md:right-12 text-right font-mono text-[9px] md:text-[10px] text-white/50 tracking-widest z-30 hidden md:block">COORDS: 34.05.{activeSlide}1 // 118.24.{9 - activeSlide}5<br/>SECTOR: 0{activeSlide}</div>
           <div className="relative">
              <div className="w-8 md:w-12 h-1 bg-accent mb-6 md:mb-8 shadow-[0_0_15px_rgba(204,255,0,0.5)]" />
              <span className="font-mono text-[10px] md:text-xs text-white/50 tracking-[0.5em] uppercase mb-4 block relative z-10">Architecture / Design</span>
              <h2 className="font-syncopate text-[12vw] md:text-[6vw] font-black leading-[0.8] tracking-tighter uppercase relative z-10" style={{ WebkitTextStroke: '2px #CCFF00', color: 'transparent' }}>THE SPACE</h2>
              <p className="mt-6 md:mt-8 font-mono text-xs md:text-sm text-white/60 max-w-md leading-loose relative z-10">A brutalist environment stripped of distraction. Concrete, steel, and light designed to focus the mind.</p>
           </div>
        </div>
        <div className="w-full md:w-1/2 h-auto md:h-full overflow-hidden relative">
           <div ref={slidesRef} className="flex flex-col md:flex-row h-auto md:h-full w-full md:w-[400%] will-change-transform">
              {slides.map((slide, i) => (
                 <div key={i} className="w-full md:w-1/4 h-[60vh] md:h-full flex flex-col justify-center px-6 md:px-20 border-b md:border-b-0 md:border-r border-white/5 relative bg-[#050505]/50 backdrop-blur-sm group py-12 md:py-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-syncopate text-[30vw] md:text-[20vw] font-black text-white/5 select-none pointer-events-none z-0">0{i+1}</div>
                    <div className={`relative mb-6 md:mb-8 z-10 bg-black border border-white/10 shadow-2xl overflow-hidden aspect-video md:aspect-[16/9] w-full`}>
                       <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-accent z-20" />
                       <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-accent z-20" />
                       <img src={slide.img} alt={slide.title} className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" loading={i > 0 ? "lazy" : "eager"} />
                    </div>
                    <div className="relative z-10">
                       <div className="flex items-center justify-between mb-2 md:mb-4 border-b border-white/10 pb-2">
                          <span className="font-syncopate text-accent text-[10px] md:text-sm tracking-widest">{slide.subtitle}</span>
                          <span className="font-mono text-[8px] md:text-[9px] text-white/40">{slide.specs}</span>
                       </div>
                       <h3 className="font-syncopate text-2xl md:text-5xl font-black text-white uppercase mb-2 md:mb-4">{slide.title}</h3>
                       <p className="font-mono text-white/50 text-[10px] md:text-xs leading-relaxed max-w-sm mb-4 md:mb-8 border-l-2 border-accent/20 pl-4">{slide.description}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* MEMBERSHIP SECTION - With Fail-Safe CSS Grid */}
      <section id="membership" className="py-20 md:py-40 px-4 md:px-20 bg-black relative z-20 overflow-hidden">
        
        {/* --- 1. ANIMATED BACKGROUND LAYER --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <style jsx>{`
                @keyframes grid-flow {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(64px); }
                }
                .animate-grid {
                    animation: grid-flow 2s linear infinite;
                }
            `}</style>
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />
            <div className="absolute inset-0 animate-grid opacity-20" style={{ backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '64px 64px', top: '-64px' }} />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vmax] h-[150vmax] opacity-20 pointer-events-none" style={{ background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(204, 255, 0, 0.4) 360deg)' }} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)]" />
        </div>

        {/* --- CONTENT LAYER --- */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-24">
            <div className="w-full md:w-auto flex flex-col items-start mb-8 md:mb-0">
              <div className="mb-2 md:mb-4">
                 <BrutalLabel><Shield className="w-4 h-4" /> ACCESS_CONTROL</BrutalLabel>
              </div>
              <div className="relative">
                <h2 className="text-4xl sm:text-7xl md:text-9xl font-black tracking-tighter font-syncopate relative z-10 leading-[0.85] select-none text-white text-left">
                    <DecryptedText text="MEMBERSHIP" speed={30} hollow={true} className="relative z-10" />
                    <span className="absolute inset-0 text-white opacity-0 mix-blend-overlay animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]">MEMBERSHIP</span>
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-2 p-1 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm relative">
                <motion.div className="absolute top-1 bottom-1 bg-accent rounded-md z-0" layoutId="billingCycle" initial={false} transition={{ type: "spring", stiffness: 300, damping: 30 }} style={{ left: billingCycle === 'monthly' ? '4px' : '50%', right: billingCycle === 'monthly' ? '50%' : '4px', width: 'calc(50% - 6px)' }} />
                <button onClick={() => setBillingCycle('monthly')} className={`relative z-10 px-6 md:px-8 py-2 md:py-3 font-mono text-[10px] md:text-xs font-bold tracking-widest transition-colors duration-300 ${billingCycle === 'monthly' ? 'text-black' : 'text-white/50'}`}>MONTHLY</button>
                <button onClick={() => setBillingCycle('annual')} className={`relative z-10 px-6 md:px-8 py-2 md:py-3 font-mono text-[10px] md:text-xs font-bold tracking-widest transition-colors duration-300 ${billingCycle === 'annual' ? 'text-black' : 'text-white/50'}`}>ANNUAL</button>
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
                  <div onMouseEnter={() => setHoveredCard(i)} className={`p-8 md:p-10 h-full flex flex-col relative transition-all duration-500`}>
                    <div className="flex justify-between items-start mb-6 md:mb-8 relative z-10">
                      <div className={`p-3 rounded-full border border-white/10 bg-white/5 transition-colors duration-300 ${tier.popular ? 'text-black bg-accent border-accent' : 'text-white group-hover:text-black group-hover:bg-white group-hover:border-white'}`}>{tier.icon}</div>
                      {tier.popular && <span className="text-[10px] font-mono font-bold tracking-widest text-accent border border-accent px-2 py-1">POPULAR</span>}
                    </div>
                    <h3 className="font-syncopate text-2xl md:text-3xl font-bold text-white mb-2">{tier.name}</h3>
                    <div className="text-white/40 font-mono text-[10px] md:text-xs mb-6 md:mb-8">FULL ACCESS GRANTED</div>
                    <div className="flex items-baseline gap-1 mb-6 md:mb-8">
                      <AnimatePresence mode='wait'><motion.span key={billingCycle} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-5xl md:text-6xl font-black text-white tracking-tighter">${billingCycle === 'monthly' ? tier.price.m : tier.price.a}</motion.span></AnimatePresence>
                      <span className="text-xs md:text-sm font-mono text-white/50">/MO</span>
                    </div>
                    <ul className="space-y-3 md:space-y-4 mb-8 md:mb-12 relative z-10 flex-grow">{tier.features.map((feat, idx) => (<li key={idx} className="flex items-start gap-3 text-[10px] md:text-xs font-mono text-white/70"><Check className="w-3 h-3 text-accent mt-0.5 shrink-0" /> {feat}</li>))}</ul>
                    <button className={`w-full py-3 md:py-4 font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 relative z-10 ${tier.popular ? 'bg-accent text-black hover:bg-white' : 'border border-white/20 text-white hover:bg-white hover:text-black'}`}>SELECT PLAN</button>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}