import React, { useState } from 'react';
import { Undertone, LipstickShade, ShadeFinish } from '../types/lipstick';
import { LIPSTICK_SHADES } from '../data/shades';
import confetti from 'canvas-confetti';
import { Sparkles, Check, ShoppingBag } from 'lucide-react';
import { FadeUp, ScaleIn, StaggerContainer, StaggerItem } from './ScrollReveal';

interface ShadeFinderProps {
  onSelectShade: (shade: LipstickShade) => void;
  onAddToCart: (shade: LipstickShade, finish: ShadeFinish) => void;
}

type LookPreference = 'natural' | 'classic' | 'bold' | 'glamorous';

export const ShadeFinder: React.FC<ShadeFinderProps> = ({ onSelectShade, onAddToCart }) => {
  const [selectedUndertone, setSelectedUndertone] = useState<Undertone>('neutral');
  const [selectedLook, setSelectedLook] = useState<LookPreference>('classic');
  const [matchResult, setMatchResult] = useState<LipstickShade[] | null>(null);

  const calculateMatches = () => {
    // Filter matching shades based on undertone and desired mood
    const candidates = LIPSTICK_SHADES.filter((s) => {
      const undertoneMatch = s.undertone === selectedUndertone || s.undertone === 'neutral' || selectedUndertone === 'neutral';
      
      let categoryMatch = true;
      if (selectedLook === 'natural') {
        categoryMatch = s.category === 'nudes' || s.id === 'dusty-rose' || s.id === 'soft-pink';
      } else if (selectedLook === 'classic') {
        categoryMatch = s.category === 'reds' || s.category === 'pinks';
      } else if (selectedLook === 'bold') {
        categoryMatch = s.category === 'bolds' || s.id === 'burgundy-wine' || s.id === 'classic-crimson';
      } else if (selectedLook === 'glamorous') {
        categoryMatch = s.id === 'ruby-red' || s.id === 'cherry-red' || s.id === 'deep-maroon' || s.id === 'berry-kiss';
      }

      return undertoneMatch && categoryMatch;
    });

    const results = (candidates.length >= 2 ? candidates : LIPSTICK_SHADES).slice(0, 3);
    setMatchResult(results);

    // Trigger subtle luxury gold confetti celebration
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#d4af37', '#fae2b4', '#8b0018', '#c21837'],
    });
  };

  return (
    <section id="shade-finder" className="py-24 bg-[#0a0707] text-[#f7f2ea] border-t border-[#231a15] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header with Fade Up */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <FadeUp delay={0}>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#caa44b] font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Interactive Beauty Algorithm</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-serif font-light tracking-tight">
              Find Your Signature Shade
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-sm sm:text-base text-[#a39281] mt-3 font-light leading-relaxed">
              Answer two intuitive colorimetry questions to reveal the lipstick hues genetically tailored to elevate your natural complexion.
            </p>
          </FadeUp>
        </div>

        {/* Finder Interactive Panel with Scale In */}
        <ScaleIn delay={0.15}>
          <div className="bg-[#130e0d] border border-[#2e231c] rounded-3xl p-6 sm:p-10 shadow-2xl">
            {/* Step 1: Select Undertone */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#d4af37]">
                  01. Select Your Skin Undertone
                </span>
                <span className="text-[11px] text-[#8e7a69]">Check wrist veins in natural daylight</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(
                  [
                    {
                      id: 'warm' as Undertone,
                      title: 'Warm Undertone',
                      hint: 'Golden, olive, or yellow cast. Veins appear greenish; gold jewelry flatters best.',
                      color: '#d49b6a',
                    },
                    {
                      id: 'neutral' as Undertone,
                      title: 'Neutral Undertone',
                      hint: 'Balanced peach-pink and ivory. Veins appear blue-green; both gold and silver shine.',
                      color: '#cca088',
                    },
                    {
                      id: 'cool' as Undertone,
                      title: 'Cool Undertone',
                      hint: 'Rosy, fair pink, or bluish cast. Veins appear blue or purple; silver jewelry illuminates.',
                      color: '#d98b9e',
                    },
                  ]
                ).map((u) => {
                  const isSelected = selectedUndertone === u.id;
                  return (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => {
                        setSelectedUndertone(u.id);
                        setMatchResult(null);
                      }}
                      className={`p-5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-[#221814] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                          : 'bg-[#181210] border-[#292019] hover:border-[#423328]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: u.color }} />
                          <h4 className="text-sm font-semibold font-serif text-[#f7f2ea]">{u.title}</h4>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#d4af37]" />}
                      </div>
                      <p className="text-xs text-[#9c8978] leading-relaxed">{u.hint}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Desired Look Preference */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#d4af37]">
                  02. Select Your Desired Look
                </span>
                <span className="text-[11px] text-[#8e7a69]">Daywear vs Haute Evening</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(
                  [
                    { id: 'natural' as LookPreference, title: 'Natural Radiance', subtitle: 'Second-skin nudes & soft petals' },
                    { id: 'classic' as LookPreference, title: 'Timeless Classic', subtitle: 'Iconic reds & sophisticated roses' },
                    { id: 'bold' as LookPreference, title: 'Bold Statement', subtitle: 'Dark chocolates & deep bordeaux' },
                    { id: 'glamorous' as LookPreference, title: 'Haute Glamour', subtitle: 'High-octane scarlet & berry kiss' },
                  ]
                ).map((look) => {
                  const isSelected = selectedLook === look.id;
                  return (
                    <button
                      key={look.id}
                      type="button"
                      onClick={() => {
                        setSelectedLook(look.id);
                        setMatchResult(null);
                      }}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-[#221814] border-[#d4af37] shadow-md'
                          : 'bg-[#181210] border-[#292019] hover:border-[#423328]'
                      }`}
                    >
                      <div className="text-xs font-semibold text-[#f7f2ea]">{look.title}</div>
                      <div className="text-[11px] text-[#9c8978] mt-1">{look.subtitle}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reveal Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={calculateMatches}
                className="px-8 py-4 bg-gradient-to-r from-[#dfba73] via-[#fae2b4] to-[#b88636] text-[#0c0908] text-xs uppercase tracking-[0.22em] font-semibold rounded-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_10px_25px_rgba(212,175,55,0.25)] flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Reveal My Curated Matches</span>
              </button>
            </div>

            {/* Results Display with Staggered Entrance */}
            {matchResult && (
              <FadeUp delay={0.1} className="mt-12 pt-8 border-t border-[#292019]">
                <div className="text-center mb-8">
                  <span className="text-[11px] font-mono text-[#caa44b] uppercase tracking-widest">
                    Match Formulation Complete
                  </span>
                  <h3 className="text-2xl font-serif font-light text-[#f7f2ea] mt-1">
                    Your Signature Color Trio
                  </h3>
                </div>

                <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {matchResult.map((shade, idx) => (
                    <StaggerItem key={shade.id}>
                      <div className="p-5 rounded-2xl bg-[#181210] border border-[#332720] hover:border-[#caa44b] transition-all flex flex-col justify-between h-full">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div
                              className="w-8 h-8 rounded-full border border-white/20 shadow-md"
                              style={{ backgroundColor: shade.hex }}
                            />
                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#251b17] text-[#caa44b]">
                              {idx === 0 ? 'Optimal Match' : 'Companion Shade'}
                            </span>
                          </div>

                          <h4 className="text-lg font-serif font-semibold text-[#f7f2ea]">
                            {shade.name}
                          </h4>
                          <p className="text-xs text-[#a08f7e] mt-1 line-clamp-2">
                            {shade.description}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-[#2a201a] flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              onSelectShade(shade);
                              const el = document.getElementById('shades');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="flex-1 py-2 px-3 bg-[#241b17] hover:bg-[#32251f] text-xs font-medium rounded text-[#f7f2ea] transition-colors text-center cursor-pointer"
                          >
                            Inspect Shade
                          </button>
                          <button
                            type="button"
                            onClick={() => onAddToCart(shade, shade.defaultFinish)}
                            className="p-2 bg-[#d4af37] hover:brightness-110 text-[#0c0908] rounded transition-all cursor-pointer"
                            title="Add to Bag"
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </FadeUp>
            )}
          </div>
        </ScaleIn>
      </div>
    </section>
  );
};
