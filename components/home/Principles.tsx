'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const Principles = () => {
  return (
    <section className="relative py-32 px-8 md:px-20 bg-black overflow-hidden border-t border-white/5">
       
       {/* Background Watermark */}
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-syncopate text-[20vw] font-black text-[#0a0a0a] leading-none whitespace-nowrap">
            PERFORMANCE
          </span>
       </div>

       <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-start">
          
          {/* Card 1: THE ANTI-GYM */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-mono text-xs font-bold tracking-[0.2em] block mb-6">
              01 / PHILOSOPHY
            </span>
            <h3 className="font-syncopate text-4xl md:text-5xl font-bold text-white mb-8 uppercase tracking-tighter">
              The Anti-Gym
            </h3>
            {/* CHANGED <p> to <div> to prevent nesting errors */}
            <div className="text-neutral-400 font-mono text-sm leading-relaxed tracking-wide max-w-md">
              We reject the neon-lit, mirror-obsessed culture of traditional fitness. Kinetic is a laboratory for human potential. Dark, raw, and focused.
            </div>
          </motion.div>

          {/* Card 2: PRECISION ENGINEERING */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-accent font-mono text-xs font-bold tracking-[0.2em] block mb-6">
              02 / ENGINEERING
            </span>
            <h3 className="font-syncopate text-4xl md:text-5xl font-bold text-white mb-8 uppercase tracking-tighter">
              Precision Engineering
            </h3>
            {/* CHANGED <p> to <div> to prevent nesting errors */}
            <div className="text-neutral-400 font-mono text-sm leading-relaxed tracking-wide max-w-md">
              Every piece of equipment is chosen for biomechanical perfection. Every movement is coached with surgical precision.
            </div>
          </motion.div>

       </div>
    </section>
  );
};