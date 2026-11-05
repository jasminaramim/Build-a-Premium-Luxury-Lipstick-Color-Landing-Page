import React, { useState } from 'react';
import { LipstickShade, ShadeCategory, ShadeFinish } from '../types/lipstick';
import { LIPSTICK_SHADES } from '../data/shades';
import { LipstickVisual } from './LipstickVisual';
import { Sparkles, ShoppingBag, Edit3, Check, Heart } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem, ScaleIn } from './ScrollReveal';

interface ShadeCollectionProps {
  selectedShade: LipstickShade;
  onSelectShade: (shade: LipstickShade) => void;
  onAddToCart: (shade: LipstickShade, finish: ShadeFinish, engraving?: string) => void;
  activeCategoryFilter: ShadeCategory | 'all';
  onFilterChange: (cat: ShadeCategory | 'all') => void;
}

export const ShadeCollection: React.FC<ShadeCollectionProps> = ({
  selectedShade,
  onSelectShade,
  onAddToCart,
  activeCategoryFilter,
  onFilterChange,
}) => {
  const [selectedFinish, setSelectedFinish] = useState<ShadeFinish>(selectedShade.defaultFinish);
  const [engravingText, setEngravingText] = useState<string>('');
  const [isEngravingOpen, setIsEngravingOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  // Filter shades
  const displayedShades = activeCategoryFilter === 'all'
    ? LIPSTICK_SHADES
    : LIPSTICK_SHADES.filter((s) => s.category === activeCategoryFilter);

  const handleShadeSelect = (shade: LipstickShade) => {
    onSelectShade(shade);
    setSelectedFinish(shade.defaultFinish);
  };

  const handleAdd = () => {
    onAddToCart(selectedShade, selectedFinish, engravingText || undefined);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  return (
    <section id="shades" className="py-24 bg-[#0e0a09] border-t border-[#231b17] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header with Fade Up */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#2a211b] pb-8 gap-6">
          <FadeUp delay={0}>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-[#caa44b] font-medium mb-2 flex items-center gap-2">
                <span className="w-6 h-[1px] bg-[#caa44b]" />
                <span>Haute Color Palette</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f7f2ea]">
                16 Iconic Lip Shades
              </h2>
              <p className="text-sm sm:text-base text-[#a39282] font-light mt-2 max-w-xl">
                From cinematic crimsons to second-skin nudes. Select any swatch to experience our pigment formulation in real-time.
              </p>
            </div>
          </FadeUp>

          {/* Category Filter Tabs */}
          <FadeUp delay={0.15}>
            <div className="flex items-center gap-1 p-1 bg-[#161210] border border-[#302620] rounded-lg overflow-x-auto">
              {(['all', 'reds', 'nudes', 'pinks', 'bolds'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onFilterChange(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium rounded transition-all whitespace-nowrap ${
                    activeCategoryFilter === cat
                      ? 'bg-[#d4af37] text-[#0c0908] font-semibold shadow-sm'
                      : 'text-[#9c8a79] hover:text-[#f7f2ea]'
                  }`}
                >
                  {cat === 'all' ? 'All (16)' : cat}
                </button>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Studio Grid: Swatches & Visual Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN: 16 Interactive Swatch Cards with Staggered Entrance */}
          <div className="lg:col-span-7">
            <StaggerContainer staggerDelay={0.05} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {displayedShades.map((shade) => {
                const isSelected = selectedShade.id === shade.id;
                return (
                  <StaggerItem key={shade.id} distance={20}>
                    <button
                      type="button"
                      onClick={() => handleShadeSelect(shade)}
                      className={`group relative text-left p-3.5 rounded-xl border transition-all duration-300 flex flex-col justify-between h-44 w-full ${
                        isSelected
                          ? 'bg-[#1c1614] border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.18)] scale-[1.02]'
                          : 'bg-[#140f0e] border-[#29201a] hover:border-[#4d3c31] hover:bg-[#181311]'
                      }`}
                    >
                      {/* Swatch & Status */}
                      <div className="flex items-start justify-between w-full">
                        {/* Swatch Circle with Gloss Ripple */}
                        <div className="relative">
                          <div
                            className="w-10 h-10 rounded-full border border-white/20 shadow-md transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
                            style={{ backgroundColor: shade.hex }}
                          >
                            {isSelected && (
                              <Check className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                            )}
                          </div>
                          {shade.bestseller && (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#d4af37] rounded-full border border-[#0c0908]" title="Iconic Bestseller" />
                          )}
                        </div>

                        <span className="text-[10px] font-mono text-[#a89582] group-hover:text-[#caa44b] transition-colors">
                          {shade.number}
                        </span>
                      </div>

                      {/* Information */}
                      <div className="mt-4">
                        <h4 className="text-sm font-serif font-semibold text-[#f7f2ea] tracking-wide group-hover:text-[#e4c983] transition-colors line-clamp-1">
                          {shade.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-[#8e7a68] mt-0.5">
                          <span className="font-mono text-[#b3a190]">{shade.hex}</span>
                          <span>·</span>
                          <span className="capitalize">{shade.undertone}</span>
                        </div>
                      </div>

                      {/* Subtle micro tag */}
                      <div className="pt-2 border-t border-[#231b17] flex items-center justify-between text-[10px] text-[#786757]">
                        <span className="capitalize">{shade.category}</span>
                        <span className="text-[#caa44b] font-mono">${shade.price}</span>
                      </div>
                    </button>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            {/* Formula Guarantee Banner with FadeUp */}
            <FadeUp delay={0.25}>
              <div className="mt-8 p-5 bg-[#140f0e] rounded-xl border border-[#2b221c] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#201815] border border-[#3e3128] flex items-center justify-center text-[#d4af37]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#f7f2ea]">
                      Refillable Haute Architecture
                    </h4>
                    <p className="text-xs text-[#9c8978] mt-0.5">
                      Engineered in heavy brass with a satisfying magnetic click. Refill bullets swap in seconds.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-serif italic text-[#caa44b] whitespace-nowrap">
                  100% Vegan & Cruelty-Free
                </span>
              </div>
            </FadeUp>
          </div>

          {/* RIGHT COLUMN: Real-Time Product Stage with ScaleIn */}
          <div className="lg:col-span-5 sticky top-24">
            <ScaleIn delay={0.15}>
              <div className="p-6 rounded-2xl bg-[#140f0e] border border-[#332821] shadow-2xl relative overflow-hidden">
                {/* Gold Ambient Backlight */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-700"
                  style={{ backgroundColor: selectedShade.hex }}
                />

                {/* Product Visual */}
                <LipstickVisual
                  shade={selectedShade}
                  activeFinish={selectedFinish}
                  engravingText={engravingText}
                />

                {/* Shade Details & Customization Controls */}
                <div className="mt-6 pt-6 border-t border-[#281f19]">
                  {/* Description Quote */}
                  <p className="text-sm font-serif italic text-[#d4c6b8] text-center mb-6">
                    "{selectedShade.quote}"
                  </p>

                  {/* Finish Selector Buttons */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="uppercase tracking-[0.15em] text-[#a3907e] font-medium">Select Finish</span>
                      <span className="text-[#caa44b] capitalize font-medium">{selectedFinish.replace('-', ' ')}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {(
                        [
                          { id: 'velvet-matte', label: 'Velvet Matte', desc: 'Powdery 16h' },
                          { id: 'satin-cream', label: 'Satin Cream', desc: 'Silky luminous' },
                          { id: 'lacquer-gloss', label: 'Lacquer Gloss', desc: 'Mirror slip' },
                        ] as const
                      ).map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setSelectedFinish(f.id)}
                          className={`p-2.5 rounded-lg border text-center transition-all ${
                            selectedFinish === f.id
                              ? 'bg-[#221a16] border-[#d4af37] text-[#f7f2ea]'
                              : 'bg-[#110d0c] border-[#292019] text-[#8e7a68] hover:border-[#423328]'
                          }`}
                        >
                          <div className="text-xs font-semibold">{f.label}</div>
                          <div className="text-[10px] text-[#a08d7c] mt-0.5">{f.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Complimentary Laser Engraving Studio */}
                  <div className="mb-6">
                    <button
                      type="button"
                      onClick={() => setIsEngravingOpen(!isEngravingOpen)}
                      className="w-full flex items-center justify-between text-xs py-2 px-3 rounded bg-[#191311] border border-[#2c221b] text-[#c0b09f] hover:text-[#f7f2ea] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Edit3 className="w-3.5 h-3.5 text-[#caa44b]" />
                        <span className="uppercase tracking-[0.15em]">Complimentary Engraving</span>
                      </div>
                      <span className="text-[#caa44b] font-medium">
                        {engravingText ? `"${engravingText}"` : '+ Personalize Case'}
                      </span>
                    </button>

                    {isEngravingOpen && (
                      <div className="mt-2 p-3 bg-[#110d0c] rounded-lg border border-[#382b22] space-y-2 animate-fadeIn">
                        <label className="text-[11px] text-[#9c8978] block">
                          Enter initials or name to be laser-etched in gold (max 10 chars):
                        </label>
                        <input
                          type="text"
                          maxLength={10}
                          value={engravingText}
                          onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                          placeholder="e.g. JASMIN"
                          className="w-full px-3 py-2 bg-[#1b1513] border border-[#3c2f25] rounded text-sm font-serif tracking-[0.2em] text-[#d4af37] focus:outline-none focus:border-[#d4af37]"
                        />
                        <p className="text-[10px] text-[#7c6959]">
                          Preview renders instantly on the fluted gold collar above.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Primary Purchase Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleAdd}
                      className="flex-1 py-3.5 px-6 bg-gradient-to-r from-[#dfba73] via-[#fae2b4] to-[#b88636] text-[#0c0908] text-xs uppercase tracking-[0.2em] font-semibold rounded-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_6px_20px_rgba(212,175,55,0.22)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{addedNotice ? 'Added to Bag ✓' : `Add to Bag · $${selectedShade.price}`}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      aria-label="Wishlist"
                      className={`w-11 h-11 rounded-sm border flex items-center justify-center transition-colors cursor-pointer ${
                        isWishlisted
                          ? 'bg-[#291317] border-[#8b0018] text-[#e04364]'
                          : 'bg-[#1a1412] border-[#362a22] text-[#9c8978] hover:text-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>
      </div>
    </section>
  );
};
