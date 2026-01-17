'use client';

import React, { useEffect, useState } from 'react';
import { 
  motion, 
  useMotionValue, 
  useVelocity, 
  useTransform, 
  useSpring, 
  Variants 
} from 'framer-motion';

export default function Cursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  
  // 1. Raw Inputs (Zero Latency)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Velocity Tilt (Tight & Heavy)
  const mouseVelocityX = useVelocity(mouseX);
  // Range [-30, 30] degrees ensures it leans but doesn't spin
  const rotateVal = useTransform(mouseVelocityX, [-2000, 2000], [-30, 30], { clamp: true });
  const smoothRotate = useSpring(rotateVal, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = () => setCursorVariant('hover');
    const handleMouseLeave = () => setCursorVariant('default');
    const handleTextEnter = () => setCursorVariant('text');
    const handleTextLeave = () => setCursorVariant('default');

    window.addEventListener('mousemove', moveCursor);

    const clickableElements = document.querySelectorAll('a, button, .interactive');
    clickableElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span');
    textElements.forEach((el) => {
        if (!el.closest('a') && !el.closest('button')) {
            el.addEventListener('mouseenter', handleTextEnter);
            el.addEventListener('mouseleave', handleTextLeave);
        }
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clickableElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      textElements.forEach((el) => {
          el.removeEventListener('mouseenter', handleTextEnter);
          el.removeEventListener('mouseleave', handleTextLeave);
      });
    };
  }, [isVisible, mouseX, mouseY]);

  const variants: Variants = {
    default: {
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
    },
    hover: {
      scale: 1.2,
      opacity: 1,
      x: 0,
      y: 0,
    },
    text: {
      scale: 0.8,
      opacity: 1,
      x: 0,
      y: 0,
    }
  };

  return (
    <>
      <style jsx global>{`
        body, a, button, input, textarea {
          cursor: none !important;
        }
      `}</style>

      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none will-change-transform"
        style={{ 
          x: mouseX, 
          y: mouseY,
          rotate: smoothRotate,
          opacity: isVisible ? 1 : 0 
        }}
        variants={variants}
        animate={cursorVariant}
      >
        <div className="relative w-8 h-8 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
            
            {/* LAYER 1: THE FROST (Blurry Inside) */}
            {/* We use clip-path to match the svg arrow shape exactly so the square div doesn't show */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-[3px]"
                style={{
                    clipPath: "polygon(12.5% 12.5%, 42.1% 87.5%, 54.6% 54.6%, 87.5% 42.1%)"
                }}
            />

            {/* LAYER 2: THE ARMOR (Stroke) */}
            <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 32 32" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10"
            >
                <path 
                    d="M4 4L13.5 28L17.5 17.5L28 13.5L4 4Z" 
                    fill="none" 
                    stroke="#99cc00" 
                    strokeWidth="1.5" 
                    strokeLinejoin="round"
                />
            </svg>
        </div>
      </motion.div>
    </>
  );
}