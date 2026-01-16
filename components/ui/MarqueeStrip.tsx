'use client';

import React from 'react';
import { motion } from 'framer-motion';

const MarqueeStrip = ({ 
  items, 
  direction = "left", 
  speed = 20, 
  className = "" 
}: { 
  items: React.ReactNode[], 
  direction?: "left" | "right", 
  speed?: number, 
  className?: string 
}) => {
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

export default MarqueeStrip;