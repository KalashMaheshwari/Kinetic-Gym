'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Magnetic } from '../ui/Magnetic';
import { Menu, X, ArrowRight, Instagram, Twitter, Mail } from 'lucide-react';

// --- DESKTOP COMPONENTS (SCRAMBLE & LIQUID) ---
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

const ScrambleLink = ({ children, href }: { children: string; href: string }) => {
  const [text, setText] = useState(children);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let pos = 0;
    intervalRef.current = setInterval(() => {
      const scrambled = children.split("").map((char, index) => {
        if (pos / CYCLES_PER_LETTER > index) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join("");
      setText(scrambled);
      pos++;
      if (pos >= children.length * CYCLES_PER_LETTER) clearInterval(intervalRef.current!);
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current!);
    setText(children);
  };

  return (
    <motion.a href={href} onMouseEnter={scramble} onMouseLeave={stopScramble}
      className="relative px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] font-mono text-white/60 transition-all duration-300 hover:text-black hover:bg-accent hover:shadow-[0_0_20px_rgba(204,255,0,0.6)] flex items-center justify-center">
      {text}
    </motion.a>
  );
};

const LiquidButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn = buttonRef.current;
    const circ = circleRef.current;
    if (!btn || !circ) return;
    const move = (e: MouseEvent) => {
      const { left, top } = btn.getBoundingClientRect();
      circ.style.top = `${e.clientY - top}px`;
      circ.style.left = `${e.clientX - left}px`;
    };
    const enter = () => { circ.style.transform = "translate(-50%, -50%) scale(3)"; };
    const leave = () => { circ.style.transform = "translate(-50%, -50%) scale(0)"; };

    btn.addEventListener("mousemove", move);
    btn.addEventListener("mouseenter", enter);
    btn.addEventListener("mouseleave", leave);
    return () => {
      btn.removeEventListener("mousemove", move);
      btn.removeEventListener("mouseenter", enter);
      btn.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <Magnetic>
      <button ref={buttonRef} className="group relative px-8 py-3 rounded-full border border-white/20 bg-transparent text-[10px] font-mono font-bold tracking-[0.2em] uppercase overflow-hidden hover:border-accent/50 transition-colors duration-500 flex items-center justify-center">
        <span className="relative z-10 text-white mix-blend-difference pointer-events-none">JOIN NOW</span>
        <span ref={circleRef} className="absolute w-32 h-32 bg-accent rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 scale-0 transition-transform duration-500 ease-out" style={{ left: "50%", top: "50%" }} />
      </button>
    </Magnetic>
  );
};

// --- MAIN NAVBAR ---
export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 150);
  });

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // UPDATE: Added all sections
  const navItems = [
    { name: 'HOME', id: 'hero' },
    { name: 'PHILOSOPHY', id: 'philosophy' },
    { name: 'METHOD', id: 'method' },
    { name: 'THE SPACE', id: 'space' },
    { name: 'MEMBERSHIP', id: 'membership' },
  ];

  return (
    <>
      {/* --- DESKTOP NAVBAR --- */}
      <div className="hidden md:block">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          // Removed "mix-blend-difference" below to ensure solid fill
          className="fixed top-8 left-8 z-[100] h-[44px] flex items-center gap-3"
        >
          <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
          <span className="font-syncopate text-xl font-bold tracking-widest text-white leading-none pt-1">
            KINETIC
          </span>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="fixed top-8 right-8 z-[100] h-[44px] flex items-center">
          <LiquidButton />
        </motion.div>

        <motion.div variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: -100, opacity: 0 } }} animate={hidden ? "hidden" : "visible"} transition={{ duration: 0.35 }} className="fixed top-8 left-0 w-full z-[90] flex justify-center px-6 pointer-events-none">
          <nav className="pointer-events-auto bg-white/5 backdrop-blur-lg border border-white/10 px-10 py-3 rounded-full flex items-center gap-4 shadow-2xl">
            {['PHILOSOPHY', 'METHOD', 'SPACE', 'MEMBERSHIP'].map((item) => (
              <ScrambleLink key={item} href={`#${item.toLowerCase()}`}>{item}</ScrambleLink>
            ))}
          </nav>
        </motion.div>
      </div>

      {/* --- MOBILE NAVBAR --- */}
      <div className="md:hidden">
        <div className="fixed top-6 left-6 z-[40] flex items-center gap-2 mix-blend-difference pointer-events-none">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="font-syncopate font-bold text-lg text-white tracking-widest">KINETIC</span>
        </div>

        <motion.button
          onClick={() => setMobileMenuOpen(true)}
          initial={{ x: 100 }} animate={{ x: 0 }} transition={{ delay: 0.5, type: "spring" }}
          className="fixed top-8 right-0 z-50 flex items-center gap-2 bg-accent text-black px-4 py-3 font-mono text-[10px] font-bold tracking-widest origin-right active:scale-95 shadow-2xl"
          style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 10% 100%, 0 50%)' }}
        >
          <span className="mr-1">MENU</span>
          <Menu className="w-3 h-3" />
        </motion.button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
              />

              <motion.div
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 bottom-0 right-0 w-[75%] z-[100] bg-[#050505] border-l border-white/10 flex flex-col shadow-2xl"
              >
                <div className="p-8 flex justify-end border-b border-white/10">
                  <button onClick={() => setMobileMenuOpen(false)} className="text-white/50 hover:text-accent p-2"><X className="w-8 h-8" /></button>
                </div>

                {/* UPDATE: Adjusted gap and font size for mobile menu */}
                <div className="flex-1 flex flex-col justify-center px-8 gap-6">
                  {navItems.map((item, i) => (
                    <motion.div key={item.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + (i * 0.05) }}>
                      <button onClick={() => scrollToSection(item.id)} className="group w-full text-left relative">
                        <span className="font-syncopate text-xl md:text-2xl font-black uppercase text-transparent group-active:text-accent transition-all duration-300" style={{ WebkitTextStroke: '1px white' }}>
                          {item.name}
                        </span>
                      </button>
                    </motion.div>
                  ))}
                </div>

                <div className="p-8 border-t border-white/10 bg-white/5">
                  <button className="w-full py-4 bg-accent text-black font-syncopate font-black tracking-widest text-sm hover:bg-white transition-colors mb-8">JOIN NOW</button>
                  <div className="flex justify-between items-end">
                    <div className="flex gap-6 text-white/40">
                      <Instagram className="w-5 h-5" /><Twitter className="w-5 h-5" /><Mail className="w-5 h-5" />
                    </div>
                    <div className="text-right font-mono text-[10px] text-white/20">SECURE_V.2</div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};