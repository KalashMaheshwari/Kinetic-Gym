'use client';

import React, { useState, useEffect } from 'react';
import { Instagram, Twitter, Youtube, Shield, Lock, MapPin, Mail } from 'lucide-react';
import MarqueeStrip from '@/components/ui/MarqueeStrip';

// --- 1. SUBTLE DIGITAL CLOCK (MOBILE ONLY) ---
const DigitalClock = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000); 
    return () => clearInterval(timer);
  }, []);

  if (!time) return <div className="font-mono text-[10px] text-white/20">SYNC...</div>;

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    // Removed 'py-4' to tighten spacing further, added 'mb-2' instead in parent
    <div className="flex items-center gap-3 font-mono text-xs text-white/40 tracking-widest">
        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
        <span className="text-white">
            {pad(time.getHours())}:{pad(time.getMinutes())}:{pad(time.getSeconds())}
        </span>
        <span className="text-white/20">|</span>
        <span>IST</span>
    </div>
  );
};

// --- 2. ANALOG RADAR CLOCK (DESKTOP ONLY) ---
const ModernClock = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 16); 
    return () => clearInterval(timer);
  }, []);

  if (!time) return <div className="w-64 h-64 rounded-full border border-white/10 bg-black" />;

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;
  const millis = time.getMilliseconds();

  const smoothSec = seconds + millis / 1000;
  const secDeg = smoothSec * 6; 
  const minDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  return (
    <div className="relative group scale-100 origin-right">
       <div className="absolute inset-0 bg-accent/10 rounded-full blur-2xl" />
       <div className="w-64 h-64 relative flex items-center justify-center rounded-full bg-black border border-white/10 shadow-2xl overflow-hidden">
           <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(from 0deg, transparent 0%, rgba(204, 255, 0, 0.1) 80%, rgba(204, 255, 0, 0.8) 100%)`, transform: `rotate(${secDeg}deg)`, transition: 'none' }} />
           <div className="absolute inset-1 rounded-full bg-black/90 backdrop-blur-sm" />
           {[...Array(60)].map((_, i) => (
                <div key={i} className={`absolute origin-bottom bottom-1/2 left-1/2 -translate-x-1/2 z-10 ${i % 5 === 0 ? 'w-0.5 h-3 bg-white' : 'w-[1px] h-1.5 bg-white/30'}`} style={{ transform: `translateX(-50%) rotate(${i * 6}deg) translate(0, -115px)` }} />
           ))}
           <div className="absolute w-1.5 h-16 bg-white rounded-full origin-bottom z-20 shadow-black shadow-lg" style={{ bottom: '50%', left: '50%', transform: `translateX(-50%) rotate(${hourDeg}deg)` }} />
           <div className="absolute w-1 h-24 bg-white rounded-full origin-bottom z-20 shadow-black shadow-lg" style={{ bottom: '50%', left: '50%', transform: `translateX(-50%) rotate(${minDeg}deg)` }} />
           <div className="absolute w-3 h-3 bg-white rounded-full z-30 border-2 border-black" />
           <div className="absolute w-1.5 h-1.5 bg-accent rounded-full z-40" />
       </div>
    </div>
  );
};

const AutoFlickerLetter = ({ char }: { char: string }) => {
    const [isHollow, setIsHollow] = useState(false);
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const loop = () => {
            if (Math.random() > 0.8) { setIsHollow(true); setTimeout(() => setIsHollow(false), 50 + Math.random() * 100); }
            timeout = setTimeout(loop, 200 + Math.random() * 1000); 
        };
        loop();
        return () => clearTimeout(timeout);
    }, []);
    return (
        <span className="inline-block transition-none cursor-default select-none" style={{ color: isHollow ? 'transparent' : 'white', WebkitTextStroke: isHollow ? '1px #CCFF00' : '0px transparent', opacity: isHollow ? 0.7 : 1 } as React.CSSProperties}>
            {char}
        </span>
    )
}

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 relative overflow-hidden">
        <MarqueeStrip items={["HYPERTROPHY PROTOCOL", "MAXIMAL EFFORT", "ATP REGENERATION", "MITOCHONDRIAL DENSITY", "CNS POTENTIATION", "VELOCITY BASED TRAINING"]} className="border-none bg-transparent" />
        
        <div className="max-w-[1400px] mx-auto px-8 py-20 md:py-32 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 border-t border-white/10">
           
           {/* COL 1: INFO */}
           <div className="md:col-span-1 flex flex-col justify-between h-full gap-8">
              <div>
                 <div className="mb-8 cursor-default group select-none">
                    <span className="font-syncopate font-black text-4xl text-white flex">
                      {"KINETIC".split('').map((char, i) => <AutoFlickerLetter key={i} char={char} />)}
                    </span>
                 </div>
                 <div className="font-mono text-xs text-white/50 leading-relaxed space-y-4">
                    <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-accent"/> SECTOR 07, INDUSTRIAL DISTRICT</div>
                    <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-accent"/> SYSTEM@KINETIC.GYM</div>
                 </div>
              </div>
              <div className="flex gap-6">
                 <Instagram className="text-white hover:text-accent cursor-pointer transition-colors w-5 h-5" />
                 <Twitter className="text-white hover:text-accent cursor-pointer transition-colors w-5 h-5" />
                 <Youtube className="text-white hover:text-accent cursor-pointer transition-colors w-5 h-5" />
              </div>
           </div>

           {/* COL 2: NAV */}
           <div className="md:col-span-1">
              <h4 className="font-mono text-xs text-accent mb-8 tracking-widest font-bold border-b border-white/10 pb-4">NAVIGATION_MODULE</h4>
              <ul className="space-y-4 font-mono text-sm text-white/70">
                 {['MANIFESTO', 'LOCATIONS', 'SHOP_GEAR', 'CAREERS', 'FRANCHISE'].map((item) => (
                    <li key={item} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-white/20 group-hover:bg-accent transition-colors"/> {item}</li>
                 ))}
              </ul>
           </div>

           {/* COL 3: LEGAL + COPYRIGHT + MOBILE CLOCK (Merged) */}
           <div className="md:col-span-1 flex flex-col">
              <h4 className="font-mono text-xs text-accent mb-8 tracking-widest font-bold border-b border-white/10 pb-4">LEGAL_PROTOCOLS</h4>
              <ul className="space-y-4 font-mono text-xs text-white/50 mb-12">
                 <li className="hover:text-white cursor-pointer flex items-center gap-2"><Shield className="w-3 h-3" /> PRIVACY_POLICY_V2</li>
                 <li className="hover:text-white cursor-pointer flex items-center gap-2"><Lock className="w-3 h-3" /> DATA_ENCRYPTION</li>
              </ul>

              {/* CLOCK MOVED HERE FOR MOBILE */}
              <div className="block md:hidden mb-4">
                 <DigitalClock />
              </div>

              <div className="font-mono text-[10px] text-white/30 leading-loose">COPYRIGHT 2024 © KINETIC<br/>ALL RIGHTS RESERVED.<br/>SYSTEM VERSION 2.0.4</div>
           </div>

           {/* COL 4: DESKTOP CLOCK ONLY */}
           {/* Added 'hidden md:flex' to prevent empty space on mobile */}
           <div className="hidden md:flex md:col-span-1 flex-col items-center md:items-end justify-center">
                <ModernClock />
           </div>
        </div>
      </footer>
  );
}