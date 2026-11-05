import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Film, ArrowDown } from 'lucide-react';
import { FadeUp } from './ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

export const HauteFilmShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const isSeekingRef = useRef(false);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingManual, setIsPlayingManual] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Smooth lerp loop for bidirectional & reverse scroll scrubbing
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
        video.pause();
      }

      if (!isPlayingManual && video.duration && Number.isFinite(targetTimeRef.current)) {
        const current = video.currentTime;
        const target = targetTimeRef.current;
        const diff = target - current;

        // Step smoothly forward or reverse
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

  // GSAP ScrollTrigger to pin section and smoothly scrub video forward & in reverse
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=1600', // Comfortable scroll distance for reverse/forward scrubbing
      pin: true,
      scrub: 1.1,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);

        if (video && video.duration && !isPlayingManual) {
          // Bidirectional scrub time mapping
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

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else if (video.requestFullscreen) {
      video.requestFullscreen().catch(() => {});
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#0a0707] text-[#f7f2ea] overflow-hidden select-none flex flex-col justify-between py-12 md:py-16"
    >
      {/* Subtle ambient lighting aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 flex flex-col h-full justify-between">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#2a201a] pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#caa44b] font-medium mb-2">
              <Film className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Cinematic Haute Movement</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f7f2ea] tracking-tight">
              The Sensory Motion & Liquid Pigment
            </h2>
          </div>

          {/* Interactive Scrub Tracker Pill */}
          <div className="flex items-center gap-3 p-1.5 px-3 rounded-full bg-[#16100e]/80 border border-[#3b2d24] backdrop-blur-md self-start sm:self-auto">
            <button
              type="button"
              onClick={togglePlay}
              className="p-1 text-[#d4af37] hover:text-white transition-colors cursor-pointer"
              title={isPlayingManual ? 'Pause' : 'Auto Reel'}
            >
              {isPlayingManual ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="p-1 text-[#c0b09f] hover:text-[#d4af37] transition-colors cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#d4af37]" />}
            </button>

            <div className="h-3 w-[1px] bg-[#3a2c22]" />

            <div className="flex items-center gap-2 text-[11px] font-mono text-[#baa999]">
              <span className="text-[#caa44b] font-bold">{Math.round(scrollProgress * 100)}%</span>
              <span className="hidden sm:inline text-[#8a796a]">Scroll Reverse Scrub</span>
            </div>
          </div>
        </div>

        {/* Center Stage: Cinema Box scrubbed forward and reverse */}
        <div className="my-auto w-full max-w-5xl mx-auto">
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-[#3d2e24] bg-[#0c0908] shadow-[0_30px_70px_rgba(0,0,0,0.95)] group">
            <video
              ref={videoRef}
              muted={isMuted}
              playsInline
              preload="auto"
              onLoadedMetadata={handleVideoLoaded}
              className="w-full h-full object-cover filter brightness-[1.0] contrast-[1.03] transition-transform duration-300"
              style={{
                transform: `scale(${1.0 + scrollProgress * 0.04})`,
              }}
              poster="/src/assets/images/hero_model_lipstick_1793861222078.jpg"
            >
              <source src="/videohero.mp4" type="video/mp4" />
              <source src="/videos/videohero.mp4" type="video/mp4" />
            </video>

            {/* Subtle Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />

            {/* Overlay Badges */}
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-xs pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#120d0c]/85 backdrop-blur-md border border-[#3a2e25] text-[#d4af37] tracking-[0.2em] font-serif uppercase">
                <Sparkles className="w-3 h-3 text-[#d4af37]" />
                <span>Place Vendôme Campaign Film</span>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[10px] text-[#baa999] font-mono tracking-widest uppercase">
                <span>Reverse Scrubbing Active</span>
              </div>
            </div>

            {/* Bottom Bar inside Cinema Frame */}
            <div className="absolute bottom-0 inset-x-0 p-5 flex items-center justify-between z-10 bg-gradient-to-t from-black/95 to-transparent">
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#a99988] font-light">
                  {isPlayingManual ? 'Auto playback' : 'Scroll down to play forward · Scroll up to reverse'}
                </span>
              </div>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-2 rounded-full bg-[#1c1411]/85 hover:bg-[#2b1f1a] text-[#c0b09f] hover:text-[#d4af37] transition-colors cursor-pointer border border-[#3b2d24]"
                title="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Golden Progress Track */}
        <div className="w-full flex items-center justify-between text-[11px] text-[#a18e7c] pt-4 border-t border-[#261d17]">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#d4af37] font-mono">
              Scrub Timeline
            </span>
            <div className="w-32 sm:w-56 h-[2px] bg-[#221a15] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#dfba73] to-[#b88636] transition-all duration-100 ease-out"
                style={{ width: `${Math.max(4, Math.round(scrollProgress * 100))}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#caa44b]">
            <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to reverse / scrub</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#d4af37]" />
          </div>
        </div>
      </div>
    </section>
  );
};
