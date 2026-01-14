'use client';

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FuturisticShape } from '@/components/ui/FuturisticShape';
import { Philosophy } from '@/components/home/Philosophy';
import { Principles } from '@/components/home/Principles';
import { Instagram, Twitter, Youtube, ArrowRight, Crosshair, Zap, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  
  // Refs for Sections
  const spaceSectionRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // State
  const [activeSlide, setActiveSlide] = useState(1);
  const [activeMethod, setActiveMethod] = useState(0);

  // --- SPACE SECTION SCROLL LOGIC (RESTORED) ---
  useGSAP(() => {
    if (slidesRef.current && spaceSectionRef.current) {
      gsap.to(slidesRef.current, {
        xPercent: -75, // 4 Slides
        ease: "none",
        scrollTrigger: {
          trigger: spaceSectionRef.current,
          pin: true,
          scrub: 1,
          end: "+=3500",
          onUpdate: (self) => {
            if (progressBarRef.current) {
               progressBarRef.current.style.height = `${self.progress * 100}%`;
            }
            const progress = self.progress;
            if (progress < 0.25) setActiveSlide(1);
            else if (progress < 0.5) setActiveSlide(2);
            else if (progress < 0.75) setActiveSlide(3);
            else setActiveSlide(4);
          }
        }
      });
    }
  }, { scope: container });

  // --- UPGRADED PROTOCOL DATA FOR METHOD SECTION ---
  const protocols = [
    { 
      title: "Hypertrophy", 
      fullTitle: "Hypertrophy Protocol",
      content: "Volume-load progression specifically engineered for sarcoplasmic hypertrophy. We manipulate time-under-tension to force adaptation.", 
      index: "01",
      stats: { load: "85%", rep: "8-12", rest: "90s" }
    },
    { 
      title: "Neural Drive", 
      fullTitle: "Neural Drive Enhancement",
      content: "Central Nervous System (CNS) potentiation. High-threshold motor unit recruitment through maximal explosive intent.", 
      index: "02",
      stats: { load: "95%", rep: "1-3", rest: "180s" }
    },
    { 
      title: "Metabolic", 
      fullTitle: "Metabolic Conditioning",
      content: "Anaerobic threshold training designed to improve lactate buffering capacity and mitochondrial density.", 
      index: "03",
      stats: { load: "40%", rep: "20+", rest: "30s" }
    },
    { 
      title: "Restoration", 
      fullTitle: "Mobility & Restoration",
      content: "Structural integrity maintenance. Joint mobilization, soft tissue work, and active recovery protocols.", 
      index: "04",
      stats: { load: "0%", rep: "Flow", rest: "N/A" }
    }
  ];

  // --- RESTORED SLIDES DATA (4 Slides) ---
  const slides = [
    { title: "THE FORGE", subtitle: "HEAVY METAL", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070", description: "Raw iron. Calibrated plates. Monolifts. Strength forged in fire.", specs: "ISO:400 // APERTURE: F/2.8" },
    { title: "THE VOID", subtitle: "RECOVERY", img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070", description: "Zero-gravity sensory deprivation. Cryotherapy. Reset the system.", specs: "TEMP: -110°C // O2: 100%" },
    { title: "THE ARENA", subtitle: "COMBAT", img: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2070", description: "2000sqft of mat space. Heavy bags. Where agility meets raw power.", specs: "SURFACE: MATTE // GRIP: HIGH" },
    { title: "THE LAB", subtitle: "BIOMETRICS", img: "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=2070", description: "Advanced diagnostics. VO2 max testing. Data-driven performance.", specs: "ANALYSIS: REALTIME // CPU: 99%" }
  ];

  return (
    <main ref={container} className="relative bg-black selection:bg-accent selection:text-black">
      
      {/* HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-60">
           <video autoPlay muted loop playsInline className="w-full h-full object-cover grayscale contrast-125 brightness-75">
             <source src="/video-bg.mp4" type="video/mp4" />
           </video>
        </div>
        <div className="absolute inset-0 z-10 opacity-80 pointer-events-none">
          <FuturisticShape />
        </div>
        <div className="relative z-20 flex flex-col items-center w-full px-4">
          <h1 className="font-syncopate text-[18vw] font-black leading-[0.8] tracking-tighter text-white mix-blend-exclusion select-none text-center">
            KINETIC
          </h1>
          <div className="w-full max-w-[42vw] mt-8">
            <div className="w-full h-[2px] bg-accent" />
            <div className="flex justify-between items-center mt-4 font-mono text-xs md:text-sm tracking-[0.3em] text-white font-bold uppercase">
              <span className="opacity-80">EST. 2024</span>
              <span className="text-accent">///</span>
              <span className="opacity-80">FUTURE</span>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY & PRINCIPLES */}
      <Philosophy />
      <Principles />

      {/* --- METHOD SECTION (UPGRADED FRONTEND MASTERPIECE) --- */}
      <section id="method" className="py-40 px-8 md:px-20 bg-[#080808] relative z-20 overflow-hidden">
        
        {/* Background Grid Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-10" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} 
        />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="mb-24 border-b border-white/10 pb-8 flex items-end justify-between">
            <div>
              <span className="text-accent font-mono text-[10px] tracking-[0.5em] uppercase mb-4 block flex items-center gap-2">
                <Zap className="w-3 h-3" /> SYSTEM_PROTOCOLS
              </span>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase font-syncopate text-white">
                METHOD
              </h2>
            </div>
            <div className="hidden md:block text-right font-mono text-xs text-white/40">
              SELECT PROTOCOL_ID<br/>FOR DETAILED ANALYSIS
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* LEFT COLUMN: INTERACTIVE LIST */}
            <div className="lg:col-span-5 flex flex-col gap-2">
              {protocols.map((protocol, i) => (
                <div 
                  key={i}
                  onMouseEnter={() => setActiveMethod(i)}
                  className={`group relative cursor-pointer p-6 border-l-2 transition-all duration-300 ease-out
                    ${activeMethod === i 
                      ? 'border-accent bg-white/5' 
                      : 'border-white/10 hover:border-white/30 hover:bg-white/[0.02]'
                    }
                  `}
                >
                  <div className="flex justify-between items-center relative z-10">
                    <span className={`font-mono text-xs tracking-widest transition-colors duration-300 ${activeMethod === i ? 'text-accent' : 'text-white/40'}`}>
                      0{i+1}
                    </span>
                    <ArrowRight className={`w-4 h-4 transition-all duration-300 ${activeMethod === i ? 'text-accent translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`} />
                  </div>
                  <h3 className={`font-syncopate text-2xl md:text-3xl uppercase font-bold mt-2 transition-colors duration-300 ${activeMethod === i ? 'text-white' : 'text-white/40'}`}>
                    {protocol.title}
                  </h3>
                  
                  {/* Glowing Scanline Effect on Active Item */}
                  {activeMethod === i && (
                    <motion.div 
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* RIGHT COLUMN: HOLOGRAPHIC DATA DISPLAY */}
            <div className="lg:col-span-7 relative h-[500px]">
               <div className="absolute inset-0 border border-white/10 bg-black/50 backdrop-blur-sm p-8 md:p-12 flex flex-col justify-between overflow-hidden shadow-2xl">
                  
                  {/* Decorative Tech Corners */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-white/20" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-white/20" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-white/20" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-accent" />

                  {/* Display Header */}
                  <div className="flex justify-between items-start z-10">
                     <div className="flex items-center gap-3">
                        <Activity className="text-accent w-5 h-5 animate-pulse" />
                        <span className="font-mono text-xs text-accent tracking-widest">
                           ANALYZING: {protocols[activeMethod].title.toUpperCase()}
                        </span>
                     </div>
                     <div className="font-mono text-[10px] text-white/30 text-right">
                        SYS_READY<br/>V.2.0.4
                     </div>
                  </div>

                  {/* Animated Content Transition */}
                  <div className="relative z-10 mt-8">
                     <AnimatePresence mode='wait'>
                        <motion.div
                           key={activeMethod}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -20 }}
                           transition={{ duration: 0.3 }}
                        >
                           <h3 className="font-syncopate text-4xl md:text-5xl font-black text-white leading-none mb-6">
                              {protocols[activeMethod].fullTitle}
                           </h3>
                           <div className="h-[1px] w-full bg-gradient-to-r from-accent to-transparent mb-6" />
                           <p className="font-mono text-sm text-white/70 leading-relaxed max-w-md">
                              {protocols[activeMethod].content}
                           </p>
                        </motion.div>
                     </AnimatePresence>
                  </div>

                  {/* Data Grid */}
                  <div className="grid grid-cols-3 gap-4 mt-auto z-10 pt-12">
                     {Object.entries(protocols[activeMethod].stats).map(([key, value]) => (
                        <div key={key} className="border-t border-white/10 pt-4">
                           <span className="block font-mono text-[10px] text-white/40 uppercase tracking-wider mb-1">{key}</span>
                           <span className="font-syncopate text-xl text-white">{value}</span>
                        </div>
                     ))}
                  </div>

                  {/* Background Large Index Number */}
                  <div className="absolute -bottom-10 -right-10 font-syncopate text-[12rem] font-black text-white/[0.03] select-none pointer-events-none leading-none">
                     {protocols[activeMethod].index}
                  </div>

                  {/* Animated Background Scanline */}
                  <div className="absolute inset-0 z-0">
                     <motion.div 
                        className="w-full h-[2px] bg-accent/20 absolute top-0"
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                     />
                  </div>

               </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SPACE SECTION (RESTORED TO MEMORY VERSION) --- */}
      <section ref={spaceSectionRef} id="space" className="h-screen bg-[#050505] relative z-20 flex overflow-hidden border-t border-white/5">
        
        <div className="absolute inset-0 pointer-events-none opacity-20 animate-[pulse_4s_infinite]" 
             style={{ backgroundImage: 'linear-gradient(rgba(204, 255, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(204, 255, 0, 0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
        />
        
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

        {/* LEFT SIDE: STATIC TITLE */}
        <div className="w-1/2 h-full flex flex-col justify-center relative z-20 bg-[#050505] border-r border-white/10">

           {/* COORDS */}
           <div className="absolute top-12 right-12 text-right font-mono text-[10px] text-white/50 tracking-widest z-30">
              COORDS: {34.05 + activeSlide}.21 // {118.24 - activeSlide}.55<br/>
              SECTOR: 0{activeSlide}
           </div>

           <div className="relative px-12 md:px-20">
              
              {/* Blue Position: Crosshair */}
              <div className="absolute -top-3 left-9 flex flex-col gap-2 opacity-50 z-30">
                 <Crosshair className="w-8 h-8 text-accent animate-[spin_3s_linear_infinite_reverse]" />
              </div>

              {/* Red Position: Rotating Decoration */}
              <div className="absolute right-10 opacity-20 animate-[spin_15s_linear_infinite] pointer-events-none z-0">
                  <svg width="250" height="250" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="5,5" />
                    <circle cx="50" cy="50" r="30" stroke="#CCFF00" strokeWidth="0.5" fill="none" />
                  </svg>
              </div>

              <div className="w-12 h-1 bg-accent mb-8 shadow-[0_0_15px_rgba(204,255,0,0.5)]" />
              
              <span className="font-mono text-xs text-white/50 tracking-[0.5em] uppercase mb-4 block relative z-10">
                Architecture / Design
              </span>
              
              <h2 
                className="font-syncopate text-[6vw] font-black leading-[0.8] tracking-tighter uppercase relative z-10"
                style={{ 
                  WebkitTextStroke: '2px #CCFF00', 
                  color: 'transparent' 
                }}
              >
                THE SPACE
              </h2>
              <p className="mt-8 font-mono text-sm text-white/60 max-w-md leading-loose relative z-10">
                A brutalist environment stripped of distraction. Concrete, steel, and light designed to focus the mind on the task at hand.
              </p>
           </div>

           {/* Bottom Status Bar */}
           <div className="absolute bottom-12 left-12 flex items-end gap-6">
              <div className="h-32 w-1 bg-white/10 relative overflow-hidden rounded-full">
                 <div ref={progressBarRef} className="w-full bg-accent absolute top-0 left-0 shadow-[0_0_10px_#CCFF00]" style={{ height: '0%' }} />
              </div>
              <div className="font-mono text-[10px] text-accent tracking-widest leading-loose">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    SYSTEM: ONLINE
                 </div>
                 <div className="text-white/50">DATA STREAM: ACTIVE</div>
                 <div className="text-white/50">ENCRYPTION: 256-BIT</div>
              </div>
           </div>
        </div>

        {/* RIGHT SIDE: SCROLLING SLIDES */}
        <div className="w-1/2 h-full overflow-hidden relative">
           <div ref={slidesRef} className="flex h-full w-[400%]">
              {slides.map((slide, i) => (
                 <div key={i} className="w-1/4 h-full flex flex-col justify-center px-12 md:px-20 border-r border-white/5 relative bg-[#050505]/50 backdrop-blur-sm">
                    
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-syncopate text-[20vw] font-black text-white/5 select-none pointer-events-none z-0">
                       0{i+1}
                    </div>

                    <div className={`relative mb-8 group z-10 bg-black border border-white/10 shadow-2xl overflow-hidden
                       ${i === 3 ? 'w-4/5 aspect-[4/3] mx-auto' : 'w-full aspect-[16/9]'}
                    `}>
                       <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-accent z-20" />
                       <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-accent z-20" />
                       <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-accent z-20" />
                       <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-accent z-20" />

                       <div className="w-full h-full overflow-hidden relative">
                           <img 
                             src={slide.img} 
                             alt={slide.title}
                             className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" 
                           />
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
                       
                       <p className="font-mono text-white/50 text-xs leading-relaxed max-w-sm mb-8 border-l-2 border-accent/20 pl-4">
                          {slide.description}
                       </p>
                       
                       <button className="flex items-center gap-3 text-white text-xs font-bold tracking-[0.2em] uppercase hover:text-accent transition-colors group">
                          [ VIEW SPECS ] <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                       </button>
                    </div>

                 </div>
              ))}
           </div>
        </div>

      </section>

      {/* MEMBERSHIP SECTION (SIMPLE) */}
      <section id="membership" className="py-40 px-8 md:px-20 relative min-h-screen flex items-center bg-black">
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="text-center mb-32">
            <h2 className="font-syncopate text-7xl md:text-9xl mb-4 text-white">MEMBERSHIP</h2>
            <div className="font-mono text-xs tracking-[0.5em] text-accent uppercase">Select your path</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Initiate', price: '150' },
              { name: 'Overlord', price: '450' },
              { name: 'Apex', price: '950' }
            ].map((tier, i) => (
              <div key={i} className="group p-12 border border-white/10 hover:border-accent transition-all bg-white/5">
                <h3 className="font-syncopate text-4xl mb-8">{tier.name}</h3>
                <div className="flex items-baseline gap-2 mb-12">
                  <span className="text-5xl font-black tracking-tighter">${tier.price}</span>
                </div>
                <button className="w-full py-4 bg-white text-black font-mono font-bold text-xs tracking-widest uppercase hover:bg-accent transition-colors">
                  Join Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-8 border-t border-white/10 flex justify-between items-end bg-black">
        <div className="text-[10vw] font-black font-syncopate leading-none text-white/10">KINETIC</div>
        <div className="flex gap-4">
           <Instagram className="text-white hover:text-accent" />
           <Twitter className="text-white hover:text-accent" />
           <Youtube className="text-white hover:text-accent" />
        </div>
      </footer>
    </main>
  );
}