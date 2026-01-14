'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const phrase = "WE DO NOT BUILD BODIES. WE ENGINEER MOVEMENT. KINETIC IS WHERE THE PRIMITIVE MEETS THE PRECISE. A SANCTUARY FOR THOSE WHO REFUSE TO REMAIN STATIC.";

export const Philosophy = () => {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const words = textRef.current?.children;
    if (!words) return;

    gsap.fromTo(words, 
      { 
        y: 100, 
        opacity: 0,
        filter: "blur(10px)"
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        stagger: 0.05, // Smooth ripple effect
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%", // Starts animating when section is 80% in view
          end: "bottom 60%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: container });

  return (
    <section 
      id="philosophy" 
      ref={container} 
      className="min-h-screen w-full bg-black flex flex-col justify-center px-8 md:px-20 py-40 relative z-20"
    >
      {/* HEADER: LINE + [ PHILOSOPHY ] */}
      <div className="flex items-center gap-4 mb-20">
        <div className="w-12 h-[2px] bg-accent" />
        <span className="text-accent font-mono text-xs font-bold tracking-[0.2em] uppercase">
          [ PHILOSOPHY ]
        </span>
      </div>

      {/* MAIN TEXT */}
      <div 
        ref={textRef} 
        className="flex flex-wrap gap-x-6 gap-y-2 max-w-7xl"
      >
        {phrase.split(" ").map((word, i) => (
          <span 
            key={i} 
            className="font-syncopate text-4xl md:text-7xl font-bold uppercase tracking-tighter text-white cursor-pointer transition-colors duration-200 hover:text-accent select-none"
            style={{ willChange: "transform, opacity" }}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
};