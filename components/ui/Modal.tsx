'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* OPTIMIZED: Reduced blur from xl to md */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 p-8 md:p-16 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 text-white/40 hover:text-accent transition-colors"
            >
              <X size={32} />
            </button>
            
            <span className="text-accent font-mono text-xs tracking-[0.5em] uppercase mb-4 block">
              Details / 01
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-12">
              {title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};