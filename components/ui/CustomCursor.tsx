'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null); // The Main Arrow
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Performance tracking
  const xTo = useRef<any>();
  const yTo = useRef<any>();
  
  // Velocity Physics
  const previousPos = useRef({ x: 0, y: 0 });

  useGSAP(() => {
    // 1. Setup QuickTo for zero-latency movement
    xTo.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.05, ease: "power3.out" });
    yTo.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.05, ease: "power3.out" });

    // 2. Mouse Move Logic
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Calculate Velocity for the Tilt Effect
      const dx = clientX - previousPos.current.x;
      
      // Clamp the rotation (max 25 degrees tilt)
      const rotation = gsap.utils.clamp(-25, 25, dx * 1.5);

      // Move Cursor
      xTo.current(clientX);
      yTo.current(clientY);

      // Apply Velocity Tilt
      gsap.to(cursorRef.current, {
        rotation: rotation,
        duration: 0.4,
        ease: "power2.out",
        overwrite: 'auto'
      });

      previousPos.current = { x: clientX, y: clientY };
    };

    // 3. Hover Detection
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.tagName === 'A' || 
                        target.tagName === 'BUTTON' || 
                        target.tagName === 'INPUT' || 
                        target.closest('a') || 
                        target.closest('button') ||
                        target.classList.contains('cursor-pointer');
      setIsHovering(!!clickable);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  // 4. Animation States (Hover/Click)
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (isClicking) {
        // Click: Snap smaller, turn solid Lime
        gsap.to(cursor, { 
            scale: 0.8, 
            duration: 0.1, 
            ease: "power2.out" 
        });
        // Flash color via SVG fill
        gsap.to(cursor.querySelector('path'), { fill: 'rgba(204, 255, 0, 0.6)', duration: 0.1 });

    } else if (isHovering) {
        // Hover: Scale up slightly, stickier feel
        gsap.to(cursor, { 
            scale: 1.2, 
            duration: 0.3, 
            ease: "back.out(1.7)" 
        });
        gsap.to(cursor.querySelector('path'), { fill: 'rgba(255, 255, 255, 0.1)', duration: 0.3 });

    } else {
        // Idle: Standard Dark Frost
        gsap.to(cursor, { 
            scale: 1, 
            duration: 0.3, 
            ease: "power2.out" 
        });
        gsap.to(cursor.querySelector('path'), { fill: 'rgba(10, 10, 10, 0.4)', duration: 0.3 });
    }
  }, [isHovering, isClicking]);

  return (
    <>
      <style jsx global>{`
        @media (min-width: 768px) {
          body, a, button, input { cursor: none !important; }
        }
      `}</style>

      {/* Container - Hidden on mobile */}
      <div className="hidden md:block fixed inset-0 pointer-events-none z-[9999] overflow-visible">
        
        {/* THE CURSOR */}
        <div 
            ref={cursorRef}
            className="fixed top-0 left-0 will-change-transform drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
            style={{ 
                width: '24px',
                height: '24px',
                transform: 'translate(-20%, -20%)', // Align tip
                transformOrigin: '20% 20%', // Pivot around the tip
            }}
        >
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" className="overflow-visible">
                {/* THE SHAPE:
                   Dark translucent fill + Lime Border 
                */}
                <path 
                    d="M2 2L20 8L12 12L8 20L2 2Z" 
                    fill="rgba(10, 10, 10, 0.4)" 
                    stroke="#CCFF00" 
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    style={{
                        backdropFilter: 'blur(4px)', // Optional browser support
                    }}
                />
            </svg>
        </div>

      </div>
    </>
  );
};