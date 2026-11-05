import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Sliders, Play, Pause, ChevronRight } from 'lucide-react';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingManual, setIsPlayingManual] = useState(false);

  const currentStage = STORY_STAGES[activeStageIndex];

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container) return;

    // Create GSAP ScrollTrigger for smooth scroll-driven video & lipstick story reveal
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=2500', // Scroll distance for thorough storytelling experience
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
          if (prev !== stageIndex && contentRef.current) {
            gsap.fromTo(
              contentRef.current,
              { opacity: 0.35, y: 18, filter: 'blur(5px)' },
              { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.55, ease: 'power2.out' }
            );
          }
          return stageIndex;
        });

        // Scrub video playback time if video is ready and not manually playing
        if (video && video.duration && !isPlayingManual) {
          const targetTime = progress * video.duration;
          if (Number.isFinite(targetTime)) {
            video.currentTime = targetTime;
          }
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isPlayingManual]);

  const toggleManualPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlayingManual) {
      video.pause();
      setIsPlayingManual(false);
    } else {
      video.play();
      setIsPlayingManual(true);
    }
  };

  return (
    <section
      id="cinematic"
      ref={containerRef}
      className="relative w-full h-screen bg-[#0c0908] text-[#f7f2ea] overflow-hidden select-none"
    >
      {/* Background Video Layer scrubbed by ScrollTrigger */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster="/src/assets/images/lipstick_bold_category_1793861224749.jpg"
        >
          {/* Authentic slow motion cosmetic lipstick texture & application video */}
          <source src="/videos/hero_fashion_motion.webm" type="video/webm" />
          <source
            src="https://upload.wikimedia.org/wikipedia/commons/2/2e/%28Fashion_film%29_THYREN_2018_SPIRNG_-_SUMMER_COLLECTION_Fashion_Ad_Film_%28feat.Julia_Ratner%29.webm"
            type="video/webm"
          />
        </video>

        {/* Ambient Color Aura morphing with current lipstick shade */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-color transition-colors duration-1000 ease-out pointer-events-none"
          style={{ backgroundColor: currentStage.hex }}
        />

        {/* Gradient Scrims for immaculate text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0908]/90 via-[#0c0908]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0908] via-transparent to-[#0c0908]/80" />
      </div>

      {/* Main Split Grid Viewport */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-between py-12 md:py-20">
        {/* Top Header Bar inside the cinematic reveal */}
        <div className="flex items-center justify-between border-b border-[#352c26]/60 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#d4af37] font-medium">
              Chapter {currentStage.step} of 04
            </span>
            <span className="text-[#645244]">·</span>
            <span className="text-xs text-[#a39282] uppercase tracking-[0.2em]">
              The Haute Film & Formulation
            </span>
          </div>

          {/* Video Scrub / Play Mode Indicator */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleManualPlayback}
              className="text-xs uppercase tracking-[0.15em] text-[#d4af37] hover:text-[#fff] flex items-center gap-1.5 transition-colors"
            >
              {isPlayingManual ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Motion</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Auto Reel</span>
                </>
              )}
            </button>
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#8c7b6d] font-mono">
              <span>Scroll to Scrub</span>
              <span className="text-[#caa44b] font-bold">{Math.round(scrollProgress * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Center Stage: Kinetic Typography & Interactive Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          {/* Left Column: Kinetic Typography & Haute Storytelling */}
          <div ref={contentRef} className="lg:col-span-7 flex flex-col justify-center">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase font-semibold text-[#caa44b] mb-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentStage.hex }} />
              <span>{currentStage.tagline}</span>
            </div>

            {/* Kinetic Title */}
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-light tracking-tight leading-[0.95] text-[#f7f2ea] mb-6">
              {currentStage.title}
            </h2>

            {/* Editorial Description */}
            <p className="text-base sm:text-lg text-[#c8baa9] font-light leading-relaxed max-w-xl mb-6">
              {currentStage.description}
            </p>

            {/* Sensory Lubricant Glide & Gloss Technology Box (লুব্রিকেন্ট ইফেক্ট) */}
            <div className="p-4 rounded-xl bg-[#181311]/85 border border-[#3c3026] backdrop-blur-md max-w-xl mb-8">
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
                className="px-6 py-3 bg-gradient-to-r from-[#dfba73] to-[#b88636] text-[#0c0908] text-xs uppercase tracking-[0.2em] font-semibold rounded-sm hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-lg"
              >
                <span>Select {currentStage.shadeName}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-3 px-4 py-2.5 rounded-sm bg-[#130f0e]/80 border border-[#342922] text-xs text-[#b8a99a]">
                <span className="font-mono text-[#caa44b]">{currentStage.hex}</span>
                <span>·</span>
                <span className="capitalize">{currentStage.finish}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Architectural Lipstick Tube Rendering with Gloss Reflection */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
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
                <rect x="62" y="190" width="116" height="24" rx="2" fill="url(#scrolledGold)" />

                {/* Engraved Atelier Text */}
                <text
                  x="120"
                  y="205"
                  textAnchor="middle"
                  fill="#3d2a09"
                  fontSize="7.5"
                  fontWeight="700"
                  letterSpacing="2"
                  fontFamily="serif"
                >
                  MAISON ÉLIXIR
                </text>

                {/* Inner Gold Collar */}
                <rect x="75" y="110" width="90" height="80" rx="2" fill="url(#scrolledGold)" />
                <line x1="88" y1="110" x2="88" y2="190" stroke="#876627" strokeWidth="1" opacity="0.6" />
                <line x1="120" y1="110" x2="120" y2="190" stroke="#fff3cf" strokeWidth="1" opacity="0.8" />
                <line x1="152" y1="110" x2="152" y2="190" stroke="#876627" strokeWidth="1" opacity="0.6" />

                {/* Morphing Lipstick Bullet with active Stage Color */}
                <g className="transition-colors duration-700">
                  {/* Bullet Silhouette */}
                  <path
                    d="M 84,110 L 84,60 Q 84,35 120,22 Q 156,35 156,60 L 156,110 Z"
                    fill={currentStage.hex}
                  />

                  {/* Beveled Ergonomic Teardrop Face */}
                  <path
                    d="M 84,60 C 84,40 102,26 120,20 C 138,26 156,40 156,60 C 156,76 132,94 120,94 C 108,94 84,76 84,60 Z"
                    fill={currentStage.hex}
                    filter="brightness(1.15)"
                  />

                  {/* Surface Shading */}
                  <path
                    d="M 84,110 L 84,60 Q 84,35 120,22 Q 156,35 156,60 L 156,110 Z"
                    fill="url(#scrolledShadeGrad)"
                  />

                  {/* Specular Lubricant Glide Sheen Streak */}
                  <path
                    d="M 100,50 Q 103,78 102,109"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.75"
                    filter="blur(0.5px)"
                  />

                  {/* Wet Lip Gloss Droplet Refraction */}
                  <circle cx="126" cy="38" r="2.2" fill="#ffffff" opacity="0.85" />
                  <circle cx="118" cy="65" r="1.5" fill="#ffffff" opacity="0.8" />

                  {/* Monogram Seal */}
                  <text
                    x="120"
                    y="62"
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.25)"
                    fontSize="10"
                    fontWeight="600"
                    fontFamily="serif"
                  >
                    ÉLIXIR
                  </text>
                </g>
              </svg>
            </div>

            {/* Micro Shade Swatch Selector */}
            <div className="flex items-center gap-3 mt-4">
              {STORY_STAGES.map((s, idx) => (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveStageIndex(idx)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    idx === activeStageIndex
                      ? 'scale-125 ring-2 ring-[#d4af37] ring-offset-2 ring-offset-[#0c0908]'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: s.hex }}
                  title={`${s.step}. ${s.shadeName}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Progress Tracker & Scroll Hint */}
        <div className="border-t border-[#2e2621]/80 pt-4 flex items-center justify-between">
          {/* Multi-step progress bar */}
          <div className="flex items-center gap-2 w-full max-w-md">
            {STORY_STAGES.map((s, i) => (
              <div
                key={s.step}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  i <= activeStageIndex ? 'bg-[#d4af37]' : 'bg-[#2a221d]'
                }`}
              />
            ))}
          </div>

          <div className="text-[11px] uppercase tracking-[0.2em] text-[#918171] font-mono">
            Scroll to reveal next formula
          </div>
        </div>
      </div>
    </section>
  );
};
