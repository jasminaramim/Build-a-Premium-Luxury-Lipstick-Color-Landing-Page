import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenFinder: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenFinder,
  isAudioPlaying,
  onToggleAudio,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0c0908]/92 backdrop-blur-md border-b border-[#2e241f] py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-[#0c0908]/90 via-[#0c0908]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element Brand wordmark */}
        <a
          href="#"
          className="text-xl md:text-2xl font-serif tracking-[0.25em] text-[#f7f2ea] hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 font-medium"
        >
          MAISON ÉLIXIR
        </a>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-[#c0b1a1]">
          <a
            href="#shades"
            className="hover:text-[#f7f2ea] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-300"
          >
            The Shades
          </a>
          <a
            href="#cinematic"
            className="hover:text-[#f7f2ea] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-300"
          >
            Le Film
          </a>
          <a
            href="#categories"
            className="hover:text-[#f7f2ea] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-300"
          >
            Collections
          </a>
          <a
            href="#shade-finder"
            onClick={(e) => {
              e.preventDefault();
              onOpenFinder();
              const el = document.getElementById('shade-finder');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-300 flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            Shade Finder
          </a>
          <a
            href="#story"
            className="hover:text-[#f7f2ea] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-300"
          >
            The Atelier
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Subtle Atelier Ambient Sound Toggle */}
          <button
            type="button"
            onClick={onToggleAudio}
            aria-label="Toggle Salon Sound"
            title={isAudioPlaying ? "Mute salon soundscape" : "Play salon ambient sound"}
            className="w-8 h-8 rounded-full border border-[#3e342b] flex items-center justify-center text-[#a89582] hover:text-[#d4af37] hover:border-[#caa44b] transition-colors"
          >
            {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5 text-[#d4af37]" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            className="px-4 py-2 text-xs font-medium tracking-[0.15em] uppercase text-[#0c0908] bg-gradient-to-r from-[#dfba73] via-[#fae2b4] to-[#b88636] rounded-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_16px_rgba(212,175,55,0.25)] flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag</span>
            <span className="font-mono text-[11px] font-bold px-1.5 py-0.2 bg-[#0c0908] text-[#e8c679] rounded-full">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
