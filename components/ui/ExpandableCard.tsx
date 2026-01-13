'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface ExpandableCardProps {
  title: string;
  content: string;
  index: string;
}

export const ExpandableCard = ({ title, content, index }: ExpandableCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-white/10 py-8">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between group"
      >
        <div className="flex items-center gap-8">
          <span className="text-xs font-mono opacity-30 group-hover:text-accent transition-colors">{index}</span>
          <h4 className="text-2xl md:text-4xl font-bold tracking-tighter uppercase group-hover:translate-x-4 transition-transform duration-500">
            {title}
          </h4>
        </div>
        <div className={`p-4 rounded-full border border-white/10 group-hover:bg-accent group-hover:text-black transition-all duration-500 ${isExpanded ? 'bg-accent text-black' : ''}`}>
          {isExpanded ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="pt-8 pl-16 max-w-2xl">
          <p className="text-lg text-white/60 leading-relaxed">
            {content}
          </p>
          <button className="mt-8 text-accent font-bold text-xs tracking-widest uppercase flex items-center gap-2 hover:gap-4 transition-all">
            View Full Protocol <Plus size={14} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
