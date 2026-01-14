'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Magnetic } from '../ui/Magnetic';

// --- 1. ASCII SCRAMBLE LINK (LOCKED: SOLID LIME FILL + BLACK TEXT) ---
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

const ScrambleLink = ({ children, href }: { children: string; href: string }) => {
  const [text, setText] = useState(children);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let pos = 0;
    intervalRef.current = setInterval(() => {
      const scrambled = children.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
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
    <motion.a
      href={href}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className="relative px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] font-mono text-white/60 transition-all duration-300 hover:text-black hover:bg-accent hover:shadow-[0_0_20px_rgba(204,255,0,0.6)] flex items-center justify-center"
    >
      {text}
    </motion.a>
  );
};

// --- 2. LIQUID BUTTON (LOCKED: UNCHANGED) ---
const LiquidButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const manageMouseEnter = (e: MouseEvent) => {
      if (!buttonRef.current || !circleRef.current) return;
      const { left, top } = buttonRef.current.getBoundingClientRect();
      circleRef.current.style.top = `${e.clientY - top}px`;
      circleRef.current.style.left = `${e.clientX - left}px`;
      circleRef.current.style.transition = "transform 0.5s ease-out";
      circleRef.current.style.transform = "translate(-50%, -50%) scale(3)";
    };

    const manageMouseLeave = (e: MouseEvent) => {
      if (!buttonRef.current || !circleRef.current) return;
      const { left, top } = buttonRef.current.getBoundingClientRect();
      circleRef.current.style.top = `${e.clientY - top}px`;
      circleRef.current.style.left = `${e.clientX - left}px`;
      circleRef.current.style.transform = "translate(-50%, -50%) scale(0)";
    };

    const button = buttonRef.current;
    button?.addEventListener("mouseenter", manageMouseEnter);
    button?.addEventListener("mouseleave", manageMouseLeave);

    return () => {
      button?.removeEventListener("mouseenter", manageMouseEnter);
      button?.removeEventListener("mouseleave", manageMouseLeave);
    };
  }, []);

  return (
    <Magnetic>
      <button
        ref={buttonRef}
        className="group relative px-8 py-3 rounded-full border border-white/20 bg-transparent text-[10px] font-mono font-bold tracking-[0.2em] uppercase overflow-hidden hover:border-accent/50 transition-colors duration-500 flex items-center justify-center"
      >
        <span className="relative z-10 text-white mix-blend-difference pointer-events-none">
          JOIN NOW
        </span>
        <span
          ref={circleRef}
          className="absolute w-32 h-32 bg-accent rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 scale-0"
          style={{ left: "50%", top: "50%", transformOrigin: "center center" }} 
        />
      </button>
    </Magnetic>
  );
};

// --- 3. MAIN NAVBAR ---
export const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      {/* Logo Area */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-8 left-8 z-[100] h-[44px] flex items-center gap-3 mix-blend-difference"
      >
        {/* LOGO DOT: Solid Lime, Breathing, NO GLOW */}
        <motion.div 
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          // Removed 'shadow-[...]' class here
          className="w-3 h-3 bg-accent rounded-full"
        />
        
        <span className="font-syncopate text-xl font-bold tracking-widest text-white leading-none pt-1">KINETIC</span>
      </motion.div>

      {/* Join Button */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-8 right-8 z-[100] h-[44px] flex items-center"
      >
        <LiquidButton />
      </motion.div>

      {/* Navigation Pill (Frosty Glass Background) */}
      <motion.div
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-8 left-0 w-full z-[90] flex justify-center px-6 pointer-events-none"
      >
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
          className="pointer-events-auto bg-white/5 backdrop-blur-lg border border-white/10 px-10 py-3 rounded-full flex items-center gap-4 shadow-2xl hover:border-accent/30 transition-colors duration-300"
        >
          {['PHILOSOPHY', 'METHOD', 'SPACE', 'MEMBERSHIP'].map((item) => (
            <ScrambleLink key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </ScrambleLink>
          ))}
        </motion.nav>
      </motion.div>
    </>
  );
};