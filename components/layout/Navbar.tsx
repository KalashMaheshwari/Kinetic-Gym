'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Magnetic } from '../ui/Magnetic';

export const Navbar = () => {
  return (
    <>
      {/* Logo - Top Left */}
      <div className="fixed top-10 left-10 z-[100] flex items-center gap-3 mix-blend-difference">
        <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_#CCFF00]" />
        <span className="text-xl font-black tracking-tighter uppercase text-white">KINETIC</span>
      </div>

      {/* Join Lab - Top Right */}
      <div className="fixed top-10 right-10 z-[100] mix-blend-difference">
        <Magnetic>
          <button className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-black tracking-[0.3em] uppercase hover:bg-accent transition-all duration-500">
            JOIN_LAB
          </button>
        </Magnetic>
      </div>

      {/* Navigation Pill - Centered */}
      <div className="fixed top-10 left-0 w-full z-[100] flex justify-center px-6 pointer-events-none">
        <nav className="pointer-events-auto bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-full flex items-center gap-10 shadow-2xl">
          {['TERMINAL', 'PROTOCOLS', 'SPACES', 'COVENANT'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[10px] font-bold tracking-[0.3em] text-white/40 hover:text-accent transition-colors"
              whileHover={{ y: -1 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>
      </div>
    </>
  );
};
