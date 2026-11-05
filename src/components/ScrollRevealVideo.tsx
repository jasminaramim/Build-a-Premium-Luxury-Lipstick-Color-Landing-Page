import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ChevronRight, ArrowDown } from 'lucide-react';
import { FadeUp } from './ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealVideoProps {
  onSelectShadeById: (shadeId: string) => void;
}

const STORY_STAGES = [
  {
    step: '01',
    shadeId: 'ruby-red',
    shadeName: 'Ruby Red',
    hex: '#A31227',
    tagline: 'THE ICONIC CRIMSON',
    title: 'BE BOLD.',
    description: 'A sovereign statement forged in pure red mineral crystals. One gesture commands an entire room with cinematic Parisian poise.',
    finish: 'Velvet Matte & Pure Impact',
    lubricantGlide: 'Infused with organic damask rose wax for zero drag and velvety weightless comfort.',
  },
  {
    step: '02',
    shadeId: 'caramel-nude',
    shadeName: 'Caramel Nude',
    hex: '#B87355',
    tagline: 'SCULPTED WARMTH',
    title: 'BE BEAUTIFUL.',
    description: 'A golden honeyed praline veil that mirrors the natural undertones of radiant skin under warm dusk sunlight.',
    finish: 'Satin Cream & Plumping Dew',
    lubricantGlide: 'Ultra-refined botanical slip polymers deliver instantaneous melting on lip contact.',
  },
  {
    step: '03',
    shadeId: 'rose-pink',
    shadeName: 'Rose Pink',
    hex: '#D96B8A',
    tagline: 'CASHMERE POETRY',
    title: 'BE RADIANT.',
    description: 'Delicate peony petals crushed into high-concentration micro-pigments that illuminate the complexion with healthy youth.',
    finish: 'Silk Luster & Dewy Vitality',
    lubricantGlide: 'Micro-encapsulated hyaluronic moisture spheres hydrate continuously for 16 hours.',
  },
  {
    step: '04',
    shadeId: 'deep-maroon',
    shadeName: 'Deep Maroon',
    hex: '#4A0E17',
    tagline: 'NOCTURNAL SOVEREIGNTY',
    title: 'BE YOU.',
    description: 'Blackened garnet drenched in mirror-gloss lacquer. The ultimate expression of fearless luxury and haute couture drama.',
    finish: 'High-Shine Gloss & Obsidian Sheen',
    lubricantGlide: 'Refractive camellia seed nectar creates an optical mirror gloss with zero stickiness.',
  },
];

export const ScrollRevealVideo: React.FC<ScrollRevealVideoProps> = ({ onSelectShadeById }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lipstickRef = useRef<HTMLDivElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const currentStage = STORY_STAGES[activeStageIndex];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create GSAP ScrollTrigger for smooth scroll-driven storytelling lipstick slider
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=2400', // Comfortable scroll distance
      pin: true,
      scrub: 1.2,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);

        // Calculate active story stage (0 to 3)
        const stageIndex = Math.min(
          STORY_STAGES.length - 1,
          Math.floor(progress * STORY_STAGES.length)
        );

        setActiveStageIndex((prev) => {
          if (prev !== stageIndex) {
            // Smooth slow luxury micro-transition on content when stage changes
            if (contentRef.current) {
              gsap.fromTo(
                contentRef.current,
                { opacity: 0.3, y: 22, filter: 'blur(6px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.65, ease: 'power2.out' }
              );
            }
            if (lipstickRef.current) {
              gsap.fromTo(
                lipstickRef.current,
                { scale: 0.96, rotate: -2 },
                { scale: 1, rotate: 0, duration: 0.7, ease: 'power2.out' }
              );
            }
          }
          return stageIndex;
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const jumpToStage = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const scrollTarget = container.offsetTop + (index / STORY_STAGES.length) * 2400;
    window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
  };

  return (
    <section
      id="cinematic"
      ref={containerRef}
      className="relative w-full h-screen bg-[#0c0908] text-[#f7f2ea] overflow-hidden select-none border-t border-[#1e1713]"
    >
      {/* Clean Luxury Dark Background with Dynamic Shade Color Aura (NO background images on the left) */}
      <div className="absolute inset-0 z-0 bg-[#0c0908] overflow-hidden pointer-events-none">
        {/* Soft Radial Shade Glow concentrated on the right side behind the lipstick */}
        <div
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] opacity-35 transition-colors duration-1000 ease-out"
          style={{ backgroundColor: currentStage.hex }}
        />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0c0908]/50 to-[#0c0908]" />
      </div>

      {/* Main Split Grid Viewport */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-between py-12 md:py-16">
        {/* Top Header Bar with Smooth FadeUp */}
        <FadeUp delay={0}>
          <div className="flex items-center justify-between border-b border-[#352c26]/60 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#d4af37] font-medium font-mono">
                Chapter {currentStage.step} of 04
              </span>
              <span className="text-[#645244]">·</span>
              <span className="text-xs text-[#a39282] uppercase tracking-[0.2em]">
                The Haute Pigment & Formulation Slider
              </span>
            </div>

            {/* Stage Selector Pills */}
            <div className="flex items-center gap-2">
              {STORY_STAGES.map((s, idx) => {
                const isActive = idx === activeStageIndex;
                return (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => jumpToStage(idx)}
                    className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-mono transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#d4af37] text-black font-bold shadow-md'
                        : 'text-[#8c7b6d] hover:text-white bg-[#140f0e] border border-[#2b211a]'
                    }`}
                  >
                    {s.step}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeUp>

        {/* Center Stage: Left Clean Kinetic Typography & Right Lipstick Visual Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          {/* Left Column: Pure Clean Haute Storytelling (NO background images) */}
          <div ref={contentRef} className="lg:col-span-7 flex flex-col justify-center">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase font-semibold text-[#caa44b] mb-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentStage.hex }} />
              <span>{currentStage.tagline}</span>
            </div>

            {/* Kinetic Title */}
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light tracking-tight leading-[0.98] text-[#f7f2ea] mb-5">
              {currentStage.title}
            </h2>

            {/* Editorial Description */}
            <p className="text-sm sm:text-base text-[#c8baa9] font-light leading-relaxed max-w-xl mb-6">
              {currentStage.description}
            </p>

            {/* Sensory Lubricant Glide Box */}
            <div className="p-4 rounded-xl bg-[#140e0c]/85 border border-[#30251d] backdrop-blur-md max-w-xl mb-7 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#dfba73] mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Sensory Lubricant Slip & Gloss Matrix</span>
              </div>
              <p className="text-xs text-[#a99988] leading-relaxed">
                {currentStage.lubricantGlide}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onSelectShadeById(currentStage.shadeId)}
                className="px-6 py-3 bg-gradient-to-r from-[#dfba73] to-[#b88636] text-[#0c0908] text-xs uppercase tracking-[0.2em] font-semibold rounded-sm hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Select {currentStage.shadeName}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-3 px-4 py-2.5 rounded-sm bg-[#130f0e]/90 border border-[#342922] text-xs text-[#b8a99a]">
                <span className="font-mono text-[#caa44b]">{currentStage.hex}</span>
                <span>·</span>
                <span className="capitalize">{currentStage.finish}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural 3D Lipstick Tube Rendering with Gloss Reflection */}
          <div ref={lipstickRef} className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 flex items-center justify-center">
              {/* Radial Glow matching the shade color */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-40 transition-colors duration-700"
                style={{ backgroundColor: currentStage.hex }}
              />

              {/* Architectural 3D Lipstick Rendering SVG */}
              <svg viewBox="0 0 240 380" className="w-full h-full drop-shadow-[0_30px_50px_rgba(0,0,0,0.9)]">
                <defs>
                  <linearGradient id="scrolledGold" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7a5a1f" />
                    <stop offset="20%" stopColor="#eccf79" />
                    <stop offset="50%" stopColor="#fff2be" />
                    <stop offset="80%" stopColor="#b5943f" />
                    <stop offset="100%" stopColor="#674e1e" />
                  </linearGradient>

                  <linearGradient id="scrolledShadeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#000" stopOpacity="0.45" />
                    <stop offset="30%" stopColor="#fff" stopOpacity="0.3" />
                    <stop offset="60%" stopColor="#fff" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#000" stopOpacity="0.65" />
                  </linearGradient>

                  {/* High-Gloss Liquid Lubricant Reflection Filter */}
                  <linearGradient id="liquidLubricantReflect" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                    <stop offset="40%" stopColor="#ffffff" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Base Shadow */}
                <ellipse cx="120" cy="365" rx="55" ry="10" fill="rgba(0,0,0,0.8)" filter="blur(6px)" />

                {/* Matte Black & Fluted Gold Tube */}
                <rect x="65" y="210" width="110" height="150" rx="3" fill="#141110" stroke="#3d3229" strokeWidth="1" />
                
                {/* Fluted Vertical Ridges on Case */}
                {Array.from({ length: 9 }).map((_, i) => (
                  <line
                    key={i}
                    x1={75 + i * 11}
                    y1={210}
                    x2={75 + i * 11}
                    y2={360}
                    stroke="rgba(212,175,55,0.22)"
                    strokeWidth="1.5"
                  />
                ))}

                {/* Heavy Gold Center Band */}
                <rect x="65" y="195" width="110" height="15" fill="url(#scrolledGold)" />
                <rect x="65" y="193" width="110" height="2" fill="#fff" opacity="0.4" />

                {/* Monogram Stamp on Band */}
                <text x="120" y="206" fill="#181310" fontSize="7" fontFamily="serif" textAnchor="middle" letterSpacing="2">
                  MAISON ÉLIXIR
                </text>

                {/* Gold Inner Neck */}
                <rect x="75" y="150" width="90" height="45" fill="url(#scrolledGold)" />

                {/* Exposed Lipstick Bullet - Color changes with active scroll stage */}
                <g className="transition-all duration-700 ease-out">
                  {/* The sculpted bullet body */}
                  <path
                    d="M 80,150 L 80,75 C 80,45 105,25 120,25 C 135,25 160,45 160,75 L 160,150 Z"
                    fill={currentStage.hex}
                  />

                  {/* Ergonomic teardrop angle slice */}
                  <path
                    d="M 80,85 C 85,45 110,25 120,25 C 135,25 155,50 160,70 L 80,120 Z"
                    fill="#ffffff"
                    opacity="0.18"
                  />

                  {/* Dimensional shading overlay */}
                  <path
                    d="M 80,150 L 80,75 C 80,45 105,25 120,25 C 135,25 160,45 160,75 L 160,150 Z"
                    fill="url(#scrolledShadeGrad)"
                  />

                  {/* Specular Liquid Gloss Highlight Slanted Ribbon */}
                  <path
                    d="M 100,140 L 115,50 C 117,40 123,40 125,50 L 140,140 Z"
                    fill="url(#liquidLubricantReflect)"
                    filter="blur(1.5px)"
                  />
                </g>
              </svg>

              {/* Floating Monogram Badge on right */}
              <div className="absolute -bottom-2 right-2 px-3 py-1.5 rounded-full bg-[#16110f]/90 border border-[#3a2e26] text-[10px] text-[#caa44b] font-mono tracking-widest backdrop-blur-md shadow-lg">
                <span>{currentStage.finish}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Indicator Bar with Smooth FadeUp */}
        <FadeUp delay={0.1}>
          <div className="w-full flex items-center justify-between text-xs text-[#8c7b6d] border-t border-[#2d241e]/60 pt-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-mono">
                Formula Slide Progress
              </span>
              <div className="w-32 sm:w-48 h-[2px] bg-[#221a15] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#dfba73] to-[#b88636] transition-all duration-100 ease-out"
                  style={{ width: `${Math.max(5, Math.round(scrollProgress * 100))}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[#caa44b]">
              <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to change formulation</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#d4af37]" />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
