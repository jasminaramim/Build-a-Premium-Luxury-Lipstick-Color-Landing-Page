import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Volume2, VolumeX, Play, Pause } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onExploreClick: () => void;
  onFinderClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const isSeekingRef = useRef(false);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingManual, setIsPlayingManual] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

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

  // GSAP ScrollTrigger to lock viewport and scrub video smoothly with scroll
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=1800', // Natural scroll distance for video playback
      pin: true,
      scrub: 1.1,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);

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

  // Text smoothly dissolves as you scroll so the video takes over 100% of the screen
  const textOpacity = Math.max(0, 1 - scrollProgress * 2.8);
  const textTranslateY = scrollProgress * -25;

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

        {/* Minimal edge vignettes so video is 100% clear and bright */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#0c0908]/70 via-[#0c0908]/15 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#0c0908] via-[#0c0908]/25 to-transparent pointer-events-none" />
      </div>

      {/* 2. Minimal Discreet Controls (Top Right) */}
      <div className="absolute top-20 right-6 sm:right-10 z-30 flex items-center gap-1.5 bg-[#120e0d]/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#3a2e26]/50 shadow-md">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlayingManual ? "Pause video" : "Auto play video"}
          className="p-1 text-[#d4af37] hover:text-white transition-colors"
          title={isPlayingManual ? "Pause continuous playback" : "Auto play reel"}
        >
          {isPlayingManual ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute sound" : "Mute sound"}
          className="p-1 text-[#c8b7a6] hover:text-white transition-colors"
          title={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 text-[#d4af37]" />}
        </button>

        <div className="hidden sm:flex items-center gap-1 pl-1 border-l border-[#2f251f]/80 text-[10px] text-[#baa999] font-mono">
          <span>{Math.round(scrollProgress * 100)}%</span>
        </div>
      </div>

      {/* 3. Little Bit Content - Fades out smoothly on scroll to leave pure video */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-between pt-28 pb-8 pointer-events-none">
        {/* Minimal Left Editorial Text */}
        <div
          className="my-auto max-w-sm sm:max-w-md flex flex-col items-start text-left transition-all duration-300 pointer-events-auto"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
          }}
        >
          <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#d4af37] mb-2 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
            <span>Maison Élixir Paris</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-light text-[#f7f2ea] tracking-tight leading-[1.08] mb-3 drop-shadow-md">
            YOUR COLOR. <br />
            <span className="italic font-normal gold-gradient-text">
              YOUR STATEMENT.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-[#d8cec2] font-light max-w-xs leading-relaxed mb-5 drop-shadow-md">
            Hand-crafted haute rouge in bespoke 24K fluted gold bullet.
          </p>

          <button
            type="button"
            onClick={onExploreClick}
            className="px-5 py-2.5 bg-gradient-to-r from-[#dfba73] via-[#fae2b4] to-[#b88636] text-[#0c0908] text-[10px] uppercase tracking-[0.2em] font-semibold rounded-sm hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-2 group whitespace-nowrap cursor-pointer"
          >
            <span>Explore 16 Shades</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* Minimal Bottom Scroll Scrub Line */}
        <div
          className="w-full flex items-center justify-between text-[11px] text-[#a18e7c] transition-opacity duration-300"
          style={{ opacity: Math.max(0.2, 1 - scrollProgress * 1.5) }}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#d4af37] font-mono">
              Haute Motion
            </span>
            <div className="w-24 sm:w-36 h-[2px] bg-[#221a15] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#dfba73] to-[#b88636] transition-all duration-100 ease-out"
                style={{ width: `${Math.max(4, Math.round(scrollProgress * 100))}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={onExploreClick}
            className="flex items-center gap-1.5 text-[#caa44b] hover:text-white transition-colors cursor-pointer pointer-events-auto"
          >
            <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to scrub film</span>
            <ArrowDown className="w-3 h-3 animate-bounce text-[#d4af37]" />
          </button>
        </div>
      </div>
    </section>
  );
};
