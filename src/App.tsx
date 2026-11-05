/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { LIPSTICK_SHADES } from './data/shades';
import { LipstickShade, ShadeCategory, ShadeFinish, CartItem } from './types/lipstick';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScrollRevealVideo } from './components/ScrollRevealVideo';
import { EditorialCategories } from './components/EditorialCategories';
import { ShadeCollection } from './components/ShadeCollection';
import { LubricantGlossExperience } from './components/LubricantGlossExperience';
import { HauteFilmShowcase } from './components/HauteFilmShowcase';
import { ShadeFinder } from './components/ShadeFinder';
import { BrandStory } from './components/BrandStory';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedShade, setSelectedShade] = useState<LipstickShade>(LIPSTICK_SHADES[0]); // Default Ruby Red
  const [categoryFilter, setCategoryFilter] = useState<ShadeCategory | 'all'>('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorGainRef = useRef<GainNode | null>(null);

  // Initial cart with 1 iconic item for instant high-luxury feel
  useEffect(() => {
    setCartItems([
      {
        id: 'init-item-1',
        shade: LIPSTICK_SHADES[0], // Ruby Red
        finish: 'velvet-matte',
        engraving: 'PARIS',
        quantity: 1,
      },
    ]);
  }, []);

  // Soft Parisian Salon Ambient Sound Generator using Web Audio API
  const toggleAudio = () => {
    if (isAudioPlaying) {
      if (oscillatorGainRef.current) {
        oscillatorGainRef.current.gain.setTargetAtTime(0, audioContextRef.current?.currentTime || 0, 0.5);
      }
      setIsAudioPlaying(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioCtx();
        }
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        // Create warm ambient chord drone
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 2);
        gainNode.connect(ctx.destination);
        oscillatorGainRef.current = gainNode;

        const freqs = [174.61, 220.00, 261.63, 329.63]; // F minor 7th warm luxury chord
        freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.connect(gainNode);
          osc.start();
        });

        setIsAudioPlaying(true);
      } catch (err) {
        console.warn('Audio playback not supported:', err);
      }
    }
  };

  const handleAddToCart = (shade: LipstickShade, finish: ShadeFinish, engraving?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.shade.id === shade.id && item.finish === finish && item.engraving === engraving
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prev,
        {
          id: `${shade.id}-${finish}-${Date.now()}`,
          shade,
          finish,
          engraving,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectShadeById = (shadeId: string) => {
    const found = LIPSTICK_SHADES.find((s) => s.id === shadeId);
    if (found) {
      setSelectedShade(found);
      const el = document.getElementById('shades');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToShades = () => {
    const el = document.getElementById('shades');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFinder = () => {
    const el = document.getElementById('shade-finder');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0c0908] text-[#f7f2ea] flex flex-col font-sans selection:bg-[#8B0018] selection:text-white">
      {/* 1. Header Navigation conforming strictly to 3-zone contract */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFinder={scrollToFinder}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={toggleAudio}
      />

      <main className="flex-1">
        {/* 2. Full-Screen Cinematic Hero */}
        <Hero
          onExploreClick={scrollToShades}
          onFinderClick={scrollToFinder}
        />

        {/* 3. Immersive Scroll-Triggered Video & Color Morphing Showcase */}
        <ScrollRevealVideo
          onSelectShadeById={handleSelectShadeById}
        />

        {/* 4. The 4 Large Editorial Category Cards */}
        <EditorialCategories
          onSelectCategory={(cat) => {
            setCategoryFilter(cat);
          }}
        />

        {/* 5. Interactive 16 Lipstick Shades Collection */}
        <ShadeCollection
          selectedShade={selectedShade}
          onSelectShade={setSelectedShade}
          onAddToCart={handleAddToCart}
          activeCategoryFilter={categoryFilter}
          onFilterChange={setCategoryFilter}
        />

        {/* 6. Sensory Lubricant & Gloss Technology Experience */}
        <LubricantGlossExperience />

        {/* 7. Haute Film Showcase (videohero.mp4) */}
        <HauteFilmShowcase />

        {/* 8. Interactive Beauty Undertone & Shade Finder */}
        <ShadeFinder
          onSelectShade={setSelectedShade}
          onAddToCart={handleAddToCart}
        />

        {/* 8. Brand Story & Atelier Savoir-Faire */}
        <BrandStory />
      </main>

      {/* 9. Luxury Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 10. Luxury Atelier Footer */}
      <Footer />
    </div>
  );
}
