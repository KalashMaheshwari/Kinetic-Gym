'use client';

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FuturisticShape } from '@/components/ui/FuturisticShape';
import { Magnetic } from '@/components/ui/Magnetic';
import { Modal } from '@/components/ui/Modal';
import { MoveRight, Zap, Target, Activity, ArrowUpRight, Play, Plus, Cpu, Shield, Zap as ZapIcon, Layers, Eye, Wind, Thermometer, ChevronRight, Instagram, Twitter, Youtube } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Philosophy Word Fly-in
    const words = gsap.utils.toArray('.phi-word');
    words.forEach((word: any, i: number) => {
      gsap.from(word, {
        scrollTrigger: {
          trigger: word,
          start: "top 90%",
          end: "top 70%",
          scrub: true,
        },
        x: i % 2 === 0 ? -100 : 100,
        opacity: 0,
        rotate: i % 2 === 0 ? -10 : 10,
      });
    });

    // Horizontal Scroll
    const sections = gsap.utils.toArray('.horizontal-item');
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: horizontalRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + horizontalRef.current?.offsetWidth
      }
    });

    // Watermark Parallax
    gsap.to(".watermark-1", {
      x: -200,
      scrollTrigger: {
        trigger: "body",
        scrub: 2
      }
    });

    // Parallax for outline text
    gsap.to(".outline-parallax", {
      y: -100,
      scrollTrigger: {
        trigger: ".hero-section",
        scrub: true
      }
    });
  }, { scope: container });

  const philosophyText = "We do not build bodies. We engineer movement. Kinetic is where the primitive meets the precise. A sanctuary for those who refuse to remain static.";

  return (
    <main ref={container} className="relative bg-black selection:bg-accent selection:text-black">
      {/* Background Watermarks */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-50">
        <div className="watermark watermark-1 absolute top-1/4 -left-20">PERFORMANCE</div>
        <div className="watermark absolute top-2/3 -right-20 rotate-90">KINETIC</div>
        <div className="absolute top-10 right-10 font-mono text-[10px] opacity-10">
          LAT: 35.6895° N // LON: 139.6917° E
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden grid-pattern">
        <div className="absolute inset-0 z-0 opacity-20">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover grayscale">
            <source src="https://cdn.coverr.co/videos/coverr-man-doing-heavy-weightlifting-2658/1080p.mp4" type="video/mp4" />
          </video>
        </div>

        <FuturisticShape />
        
        <div className="relative z-20 w-full px-8 md:px-20">
          <div className="flex flex-col items-center text-center">
            <div className="reveal mb-8">
              <span className="font-gothic text-4xl md:text-5xl text-white/80 tracking-widest">
                The New Order
              </span>
            </div>
            
            <div className="relative inline-block">
              <h1 className="text-[22vw] md:text-[18vw] font-black leading-[0.75] tracking-tighter uppercase">
                KINETIC
              </h1>
              <div className="absolute -bottom-6 left-0 w-full h-[4px] bg-accent shadow-[0_0_20px_rgba(204,255,0,0.6)]" />
              
              <div className="absolute -bottom-14 left-0 w-full flex justify-between items-center px-2 font-mono text-[10px] tracking-[0.4em] text-white/40">
                <span>FUTURE BODY</span>
                <span className="text-accent font-bold">///</span>
                <span>FUTURE BODY</span>
              </div>
            </div>

            {/* Hollow Text Parallax */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none opacity-10 outline-parallax">
              <h2 className="text-[25vw] font-black uppercase text-transparent" style={{ WebkitTextStroke: '2px white' }}>
                RAW POWER
              </h2>
            </div>

            <div className="mt-40 flex flex-col items-center gap-4 reveal">
              <div className="w-px h-20 bg-gradient-to-b from-accent to-transparent" />
              <span className="text-[10px] font-mono tracking-[0.5em] opacity-40 uppercase">Scroll to explore</span>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-60 px-8 md:px-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            {philosophyText.split(" ").map((word, i) => (
              <span 
                key={i} 
                className="phi-word text-5xl md:text-8xl font-black uppercase tracking-tighter cursor-default hover:text-accent transition-colors duration-300"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* New Cards Section - Gap between Philosophy and Forge */}
      <section className="py-40 px-8 md:px-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="reveal p-12 border border-white/5 bg-black hover:border-accent/30 transition-all group">
            <span className="text-accent font-mono text-[10px] tracking-[0.5em] uppercase mb-8 block">01 / PHILOSOPHY</span>
            <h3 className="text-4xl font-black tracking-tighter uppercase mb-8 group-hover:text-accent transition-colors">The Anti-Gym</h3>
            <p className="font-mono text-sm text-white/40 leading-relaxed">
              We reject the neon-lit, mirror-obsessed culture of traditional fitness. Kinetic is a laboratory for human potential. Dark, raw, and focused.
            </p>
          </div>
          <div className="reveal p-12 border border-white/5 bg-black hover:border-accent/30 transition-all group">
            <span className="text-accent font-mono text-[10px] tracking-[0.5em] uppercase mb-8 block">02 / ENGINEERING</span>
            <h3 className="text-4xl font-black tracking-tighter uppercase mb-8 group-hover:text-accent transition-colors">Precision Engineering</h3>
            <p className="font-mono text-sm text-white/40 leading-relaxed">
              Every piece of equipment is chosen for biomechanical perfection. Every movement is coached with surgical precision.
            </p>
          </div>
        </div>
      </section>

      {/* Horizontal Album Section */}
      <section ref={horizontalRef} className="h-screen overflow-hidden bg-[#050505]">
        <div className="horizontal-inner flex h-full w-[300vw]">
          {[
            { title: "THE FORGE", subtitle: "HEAVY METAL", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070" },
            { title: "THE VOID", subtitle: "RECOVERY", img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070" },
            { title: "THE ARENA", subtitle: "COMBAT", img: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2070" }
          ].map((item, i) => (
            <div key={i} className="horizontal-item w-screen h-full flex items-center px-20 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center w-full">
                <div className="relative aspect-video overflow-hidden group">
                  <img src={item.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <span className="font-gothic text-6xl text-accent mb-8 block">{item.subtitle}</span>
                  <h2 className="text-8xl font-black tracking-tighter uppercase leading-none mb-12">{item.title}</h2>
                  <p className="font-mono text-sm text-white/40 leading-relaxed max-w-md mb-12">
                    [0{i+1}] Engineered for absolute performance. Every square inch of this space is optimized for kinetic output.
                  </p>
                  <button className="flex items-center gap-4 text-accent font-bold tracking-widest uppercase group">
                    VIEW SPECS <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Membership - 3 Options */}
      <section className="py-40 px-8 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <h2 className="font-gothic text-8xl md:text-9xl mb-4">The Covenant</h2>
            <p className="font-mono text-xs tracking-[0.5em] text-accent uppercase">Select your path</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Initiate', price: '150', desc: 'Basic lab access and neural tracking.' },
              { name: 'Overlord', price: '450', desc: 'Full biological optimization suite.' },
              { name: 'Apex', price: '950', desc: '24/7 private lab access and elite coaching.' }
            ].map((tier, i) => (
              <div key={i} className="group p-12 border border-white/5 hover:border-accent/50 transition-all relative overflow-hidden bg-[#0a0a0a]">
                <div className="absolute top-0 right-0 p-8 font-gothic text-6xl opacity-5 group-hover:opacity-20 transition-opacity">
                  {tier.name[0]}
                </div>
                <h3 className="font-gothic text-5xl mb-8">{tier.name}</h3>
                <div className="flex items-baseline gap-2 mb-12">
                  <span className="text-5xl font-black tracking-tighter">${tier.price}</span>
                  <span className="font-mono text-[10px] opacity-40 uppercase">/ Cycle</span>
                </div>
                <p className="font-mono text-sm text-white/40 mb-12 leading-relaxed h-20">{tier.desc}</p>
                <button className="w-full py-6 bg-white text-black font-mono font-bold text-xs tracking-widest uppercase hover:bg-accent transition-colors">
                  Establish Link
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impressive Footer */}
      <footer className="relative pt-40 pb-20 px-8 md:px-20 bg-[#050505] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-40">
          <div className="lg:col-span-2">
            <h2 className="text-7xl font-black tracking-tighter mb-8">KINETIC</h2>
            <p className="font-mono text-sm text-white/40 max-w-md leading-relaxed">
              The future of human performance is not found in the mirror, but in the data. Join the elite 1% who refuse to remain static.
            </p>
          </div>
          
          <div>
            <h5 className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-8">Navigation</h5>
            <ul className="space-y-4 font-mono text-sm">
              {['Terminal', 'Protocols', 'Archive', 'Spaces', 'Covenant'].map(item => (
                <li key={item}><a href="#" className="hover:text-accent transition-colors uppercase tracking-widest">{item}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-8">Connect</h5>
            <div className="flex gap-6">
              <a href="#" className="p-4 border border-white/10 hover:border-accent hover:text-accent transition-all"><Instagram size={20} /></a>
              <a href="#" className="p-4 border border-white/10 hover:border-accent hover:text-accent transition-all"><Twitter size={20} /></a>
              <a href="#" className="p-4 border border-white/10 hover:border-accent hover:text-accent transition-all"><Youtube size={20} /></a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-t border-white/5 pt-12">
          <div className="font-mono text-[10px] opacity-20 uppercase tracking-[0.5em]">
            ©2024 KINETIC LABS // ALL RIGHTS RESERVED
          </div>
          <div className="flex gap-12 font-mono text-[10px] opacity-20 uppercase tracking-[0.5em]">
            <span>Privacy_Protocol</span>
            <span>Terms_of_Service</span>
          </div>
        </div>
        
        {/* Large Background Text in Footer */}
        <div className="absolute -bottom-10 left-0 w-full text-center opacity-[0.02] select-none pointer-events-none">
          <span className="text-[25vw] font-black tracking-tighter leading-none">KINETIC</span>
        </div>
      </footer>
    </main>
  );
}
