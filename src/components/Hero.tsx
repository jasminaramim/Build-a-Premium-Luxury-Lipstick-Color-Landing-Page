import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onExploreClick: () => void;
  onFinderClick?: () => void;
}

interface HeroColorStage {
  step: string;
  category: string;
  colorName: string;
  hex: string;
  availableHeading: string;
  headingLine1: string;
  headingLine2: string;
  subtitle: string;
}

const HERO_COLOR_STAGES: HeroColorStage[] = [
  {
    step: '01',
    category: 'Reds',
    colorName: 'Ruby Red & Crimson',
    hex: '#A31227',
    availableHeading: '4 Iconic Red Shades Available',
    headingLine1: 'YOUR COLOR.',
    headingLine2: 'SOVEREIGN RED.',
    subtitle: 'Forged in pure red mineral crystals. Hand-crafted with precious damask waxes and a bespoke 24K fluted gold bullet.',
  },
  {
    step: '02',
    category: 'Nudes',
    colorName: 'Caramel Nude & Praline',
    hex: '#B87355',
    availableHeading: '4 Sensual Nude Shades Available',
    headingLine1: 'YOUR STATEMENT.',
    headingLine2: 'SCULPTED NUDE.',
    subtitle: 'A warm golden honeyed veil that mirrors the natural undertones of bare skin under radiant dusk sunlight.',
  },
  {
    step: '03',
    category: 'Pinks',
    colorName: 'Rose Pink & Peony Blush',
    hex: '#D96B8A',
    availableHeading: '4 Dewy Pink Shades Available',
    headingLine1: 'YOUR RADIANCE.',
    headingLine2: 'CASHMERE PINK.',
    subtitle: 'Crushed peony petals and micro-encapsulated hyaluronic moisture spheres delivering 16 hours of saturated comfort.',
  },
  {
    step: '04',
    category: 'Bolds',
    colorName: 'Deep Maroon & Obsidian',
    hex: '#4A0E17',
    availableHeading: '4 Haute Bold Shades Available',
    headingLine1: 'YOUR OBSESSION.',
    headingLine2: 'FEARLESS BOLD.',
    subtitle: 'Blackened garnet drenched in high-luster mirror-gloss lacquer. The ultimate sovereign couture drama.',
  },
];

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onFinderClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const targetTimeRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const isSeekingRef = useRef(false);

  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingManual, setIsPlayingManual] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const currentStage = HERO_COLOR_STAGES[activeStageIndex];

  // Smooth lerp loop for butter-smooth video scrubbing on scroll
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onSeeking = () => {
      isSeekingRef.current = true;
    };
    const onSeeked = () => {
      isSeekingRef.current = false;
    };

    video.addEventListener('seeking', onSeeking);
    video.addEventListener('seeked', onSeeked);

    const smoothVideoScrub = () => {
      if (!isPlayingManual && video.duration && !video.paused) {
        // Keep paused so scrolling controls video frames precisely
        video.pause();
      }

      if (!isPlayingManual && video.duration && Number.isFinite(targetTimeRef.current)) {
        const current = video.currentTime;
        const target = targetTimeRef.current;
        const diff = target - current;

        // Step smoothly if not actively seeking
        if (!isSeekingRef.current && Math.abs(diff) > 0.005) {
          const step = diff * 0.22;
          const nextTime = Math.max(0, Math.min(video.duration - 0.02, current + step));
          video.currentTime = nextTime;
        }
      }

      animFrameRef.current = requestAnimationFrame(smoothVideoScrub);
    };

    animFrameRef.current = requestAnimationFrame(smoothVideoScrub);

    return () => {
      video.removeEventListener('seeking', onSeeking);
      video.removeEventListener('seeked', onSeeked);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlayingManual]);

  // GSAP ScrollTrigger to scrub video and cycle through lipstick color stages on scroll
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=2400', // Comfortable scroll distance to cycle through all 4 lipstick color stages
      pin: true,
      scrub: 1.1,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);

        // Map scroll progress to 4 lipstick color stages
        const stageIndex = Math.min(
          HERO_COLOR_STAGES.length - 1,
          Math.floor(progress * HERO_COLOR_STAGES.length)
        );

        setActiveStageIndex((prev) => {
          if (prev !== stageIndex && textContainerRef.current) {
            // Smooth micro-animation when lipstick color heading changes on scroll
            gsap.fromTo(
              textContainerRef.current,
              { opacity: 0.35, y: 16, filter: 'blur(5px)' },
              { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.55, ease: 'power2.out' }
            );
          }
          return stageIndex;
        });

        if (video && video.duration && !isPlayingManual) {
          targetTimeRef.current = progress * Math.max(0, video.duration - 0.05);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isPlayingManual]);

  const handleVideoLoaded = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlayingManual) {
      video.pause();
      setIsPlayingManual(false);
    } else {
      video.play().then(() => setIsPlayingManual(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const jumpToStage = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const scrollTarget = container.offsetTop + (index / HERO_COLOR_STAGES.length) * 2400;
    window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#0c0908] text-[#f7f2ea] overflow-hidden select-none"
    >
      {/* 1. Full-Screen Cinematic Video - Butter Smooth Scroll Scrubbing */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          muted={isMuted}
          playsInline
          preload="auto"
          onLoadedMetadata={handleVideoLoaded}
          className="w-full h-full object-cover filter brightness-[1.0] contrast-[1.02] transition-transform duration-500 ease-out"
          style={{
            transform: `scale(${1.0 + scrollProgress * 0.04})`,
          }}
          poster="/src/assets/images/hero_model_lipstick_1793861222078.jpg"
        >
          <source src="/heroone.mp4" type="video/mp4" />
          <source src="/videos/heroone.mp4" type="video/mp4" />
          <source src="/videos/hero_fashion_motion.webm" type="video/webm" />
        </video>

        {/* Soft targeted gradient behind the left text so center lipstick video stays 100% visible */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[58%] lg:w-[46%] bg-gradient-to-r from-[#0c0908]/85 via-[#0c0908]/40 to-transparent pointer-events-none" />

        {/* Subtle Ambient Shade Aura shifting gently with the active lipstick color */}
        <div
          className="absolute -left-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px] opacity-25 transition-colors duration-1000 ease-out pointer-events-none"
          style={{ backgroundColor: currentStage.hex }}
        />

        {/* Top/bottom edge fades */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#0c0908]/75 via-[#0c0908]/15 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#0c0908] via-[#0c0908]/30 to-transparent pointer-events-none" />
      </div>

      {/* 2. Floating Video Motion Controls (Top Right) */}
      <div className="absolute top-20 right-6 sm:right-10 z-30 flex items-center gap-1.5 bg-[#120e0d]/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#3a2e26]/60 shadow-lg">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlayingManual ? "Pause video" : "Auto play video"}
          className="p-1 text-[#d4af37] hover:text-white transition-colors cursor-pointer"
          title={isPlayingManual ? "Pause continuous playback" : "Auto play reel"}
        >
          {isPlayingManual ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute sound" : "Mute sound"}
          className="p-1 text-[#c8b7a6] hover:text-white transition-colors cursor-pointer"
          title={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#d4af37]" />}
        </button>

        <div className="flex items-center gap-1.5 pl-2 border-l border-[#2f251f]/80 text-[10px] text-[#baa999] font-mono">
          <span className="text-[#caa44b] font-bold">{Math.round(scrollProgress * 100)}%</span>
        </div>
      </div>

      {/* 3. Hero Main Content - Headings Dynamically Change on Scroll with Available Lipstick Colors */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-between pt-24 pb-8 sm:pb-10">
        {/* Top: 4 Lipstick Color Swatches & Navigation Bar */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 p-1 bg-[#15100e]/80 backdrop-blur-md rounded-full border border-[#352820]/90">
            {HERO_COLOR_STAGES.map((s, idx) => {
              const isActive = idx === activeStageIndex;
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => jumpToStage(idx)}
                  className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#dfba73] to-[#b88636] text-[#0c0908] font-bold shadow-md'
                      : 'text-[#9c8a79] hover:text-white'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-white/20 transition-transform duration-300"
                    style={{ backgroundColor: s.hex }}
                  />
                  <span>{s.category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center-Left: Dynamic Animated Heading Morphs on Scroll */}
        <div ref={textContainerRef} className="my-auto max-w-lg lg:max-w-xl flex flex-col items-start text-left">
          {/* Active Color Badge & Available Count */}
          <div className="flex items-center gap-2.5 mb-3">
            <span
              className="w-3 h-3 rounded-full border border-white/30 shadow-md animate-pulse"
              style={{ backgroundColor: currentStage.hex }}
            />
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#caa44b] font-semibold">
              {currentStage.availableHeading}
            </span>
          </div>

          {/* Dynamic Headline Morphing with Scroll */}
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-serif font-light text-[#f7f2ea] tracking-tight leading-[1.08] mb-4 drop-shadow-md">
            {currentStage.headingLine1} <br />
            <span className="italic font-normal gold-gradient-text">
              {currentStage.headingLine2}
            </span>
          </h1>

          {/* Color Name Tag */}
          <div className="flex items-center gap-2 text-xs text-[#baa999] mb-4">
            <span className="font-mono text-[#d4af37] font-semibold">Color Spotlight:</span>
            <span>{currentStage.colorName}</span>
          </div>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-[#d8cec2] font-light max-w-md leading-relaxed mb-6 tracking-wide drop-shadow-sm">
            {currentStage.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 w-full">
            <button
              type="button"
              onClick={onExploreClick}
              className="px-6 py-2.5 bg-gradient-to-r from-[#dfba73] via-[#fae2b4] to-[#b88636] text-[#0c0908] text-[11px] uppercase tracking-[0.2em] font-semibold rounded-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_8px_20px_rgba(212,175,55,0.2)] flex items-center justify-center gap-2 group whitespace-nowrap cursor-pointer"
            >
              <span>Explore {currentStage.category} Palette</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>

            {onFinderClick && (
              <button
                type="button"
                onClick={onFinderClick}
                className="px-5 py-2.5 bg-[#181311]/75 backdrop-blur-md border border-[#caa44b]/40 text-[#f7f2ea] text-[11px] uppercase tracking-[0.2em] font-medium rounded-sm hover:border-[#dfba73] hover:bg-[#251d19] active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#caa44b]" />
                <span>Find Your Color</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom: Dynamic Scroll Tracker & Active Chapter Line */}
        <div className="w-full pt-4 border-t border-[#2d241e]/60 flex flex-col gap-2.5">
          <div className="w-full h-[2px] bg-[#221a15] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#dfba73] via-[#f5d796] to-[#b88636] transition-all duration-150 ease-out"
              style={{ width: `${Math.max(4, Math.round(scrollProgress * 100))}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-[#a18e7c]">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono text-[#d4af37] uppercase tracking-wider">
                Chapter {currentStage.step} of 04
              </span>
              <span className="text-[#645244]">·</span>
              <span className="text-[11px] text-[#baa999] uppercase tracking-widest">
                {currentStage.category} Collection
              </span>
            </div>

            <button
              type="button"
              onClick={onExploreClick}
              className="flex items-center gap-2 text-[#caa44b] hover:text-white transition-colors cursor-pointer"
            >
              <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to change color heading</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#d4af37]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
