import React, { useState } from 'react';
import { Sparkles, Droplets, Sun } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem, ScaleIn } from './ScrollReveal';

export const LubricantGlossExperience: React.FC = () => {
  const [glossLevel, setGlossLevel] = useState<number>(75); // 0 to 100

  // Calculate dynamic visual styling based on lubricant gloss level
  const shineOpacity = (glossLevel / 100).toFixed(2);
  const blurAmount = (12 - (glossLevel / 100) * 8).toFixed(1);

  return (
    <section className="py-24 bg-[#0c0808] text-[#f7f2ea] border-t border-[#231a15] relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[140px] opacity-15 pointer-events-none transition-all duration-500"
        style={{
          background: `radial-gradient(circle, #d4af37 ${glossLevel}%, #a31227 100%)`
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header with Fade Up */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUp delay={0}>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#caa44b] font-medium mb-3">
              <Droplets className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Formulation Science & Sensory Slip</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-serif font-light tracking-tight">
              The Sensory Lubricant & Gloss Glide
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-sm sm:text-base text-[#a39281] mt-3 font-light leading-relaxed">
              Experience our proprietary silk-ester matrix: an engineered melt-on-touch glide that fuses high-impact pigment with weightless, cushiony hydration.
            </p>
          </FadeUp>
        </div>

        {/* Interactive Lab Showcase with Scale In */}
        <ScaleIn delay={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#130e0d] p-8 md:p-12 rounded-3xl border border-[#2b211a] shadow-2xl">
            {/* LEFT: Interactive Texture Swatch Simulator */}
            <div className="lg:col-span-6 flex flex-col items-center">
              {/* The Swatch Plate */}
              <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border border-[#3c2f25] bg-[#080605] flex items-center justify-center p-6 shadow-inner group">
                {/* Swatch Background: Black Obsidian Stone */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40 filter contrast-125 pointer-events-none"
                  style={{ backgroundImage: `url('/src/assets/images/lipstick_bold_category_1793861224749.jpg')` }}
                />

                {/* Swatch Cream Smear SVG with Dynamic Specular Reflectivity */}
                <svg viewBox="0 0 340 180" className="w-full h-full relative z-10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    {/* Base Smear Color (Crimson Bordeaux) */}
                    <linearGradient id="smearBase" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4A0E17" />
                      <stop offset="40%" stopColor="#8B0018" />
                      <stop offset="70%" stopColor="#A31227" />
                      <stop offset="100%" stopColor="#5E192B" />
                    </linearGradient>

                    {/* Dynamic Specular High-Gloss Lubricant Reflection */}
                    <linearGradient id="dynamicGlossHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                      <stop offset="45%" stopColor="#ffffff" stopOpacity={shineOpacity} />
                      <stop offset="55%" stopColor="#fff5d6" stopOpacity={(Number(shineOpacity) * 0.9).toFixed(2)} />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Base Thick Cream Smear Path */}
                  <path
                    d="M 25,120 C 50,65 110,40 180,50 C 250,60 300,105 320,115 C 295,145 230,155 170,140 C 110,125 55,145 25,120 Z"
                    fill="url(#smearBase)"
                    filter="drop-shadow(0 15px 25px rgba(0,0,0,0.85))"
                  />

                  {/* Second Impasto Smear Ridge */}
                  <path
                    d="M 45,110 C 95,55 160,52 230,68 C 285,80 305,108 285,125 C 220,135 155,122 85,128 Z"
                    fill="#A31227"
                    opacity="0.85"
                  />

                  {/* Dynamic Specular Highlight Ribbon driven by slider */}
                  <path
                    d="M 70,85 C 130,55 200,62 270,82 C 220,95 140,88 70,85 Z"
                    fill="url(#dynamicGlossHighlight)"
                    filter={`blur(${blurAmount}px)`}
                  />

                  {/* Liquid Micro-Droplet Glistening Beads (only appear at higher gloss) */}
                  {glossLevel > 40 && (
                    <g className="transition-opacity duration-300">
                      <circle cx="140" cy="70" r="3" fill="#ffffff" opacity={((glossLevel - 40) / 60).toFixed(2)} />
                      <circle cx="210" cy="78" r="2.5" fill="#ffffff" opacity={((glossLevel - 40) / 60).toFixed(2)} />
                      <circle cx="175" cy="115" r="2" fill="#ffffff" opacity={((glossLevel - 40) / 60).toFixed(2)} />
                    </g>
                  )}
                </svg>

                {/* Status Badge in Swatch */}
                <div className="absolute bottom-3 left-3 bg-[#0a0707]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#3b2e25] text-[11px] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                  <span className="text-[#f7f2ea] font-medium">
                    {glossLevel < 35
                      ? 'Powdery Velvet Matte'
                      : glossLevel < 70
                      ? 'Silky Satin Slip'
                      : 'High-Luster Mirror Lacquer'}
                  </span>
                  <span className="text-[#caa44b] font-mono font-bold">({glossLevel}%)</span>
                </div>
              </div>

              {/* Tactile Glide & Shine Slider */}
              <div className="w-full max-w-md mt-6 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="uppercase tracking-[0.15em] text-[#a08f7e] font-medium">
                    Adjust Lubricant Gloss Level
                  </span>
                  <span className="text-[#d4af37] font-mono font-semibold">{glossLevel}%</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={glossLevel}
                  onChange={(e) => setGlossLevel(Number(e.target.value))}
                  className="w-full h-2 bg-[#251d18] rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                />

                <div className="flex justify-between text-[10px] text-[#786656] uppercase tracking-wider">
                  <span>0% Velvet Matte</span>
                  <span>50% Creamy Satin</span>
                  <span>100% Glass Lacquer</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Sensory Technology Pillars with Staggered Fade Up */}
            <StaggerContainer staggerDelay={0.12} className="lg:col-span-6 space-y-4">
              <StaggerItem>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#191311] border border-[#2d221b] hover:border-[#caa44b]/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#281c16] border border-[#443327] flex items-center justify-center text-[#d4af37] shrink-0">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-semibold text-[#f7f2ea] tracking-wide">
                      Zero-Drag Damask Slip Esters
                    </h4>
                    <p className="text-xs text-[#a39281] mt-1 leading-relaxed">
                      Organic camellia and damask rose lipids lower kinetic friction upon contact with the lips, allowing effortless, featherlight application without tugging or bleeding.
                    </p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#191311] border border-[#2d221b] hover:border-[#caa44b]/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#281c16] border border-[#443327] flex items-center justify-center text-[#d4af37] shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-semibold text-[#f7f2ea] tracking-wide">
                      Hyaluronic Plumping Microspheres
                    </h4>
                    <p className="text-xs text-[#a39281] mt-1 leading-relaxed">
                      Dehydrated molecular sponges expand up to 30× within micro-crevices upon moisture absorption, creating an optically sculpted, supple, and cushioned lip volume.
                    </p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#191311] border border-[#2d221b] hover:border-[#caa44b]/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#281c16] border border-[#443327] flex items-center justify-center text-[#d4af37] shrink-0">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-semibold text-[#f7f2ea] tracking-wide">
                      Optical Refractive Prism Matrix
                    </h4>
                    <p className="text-xs text-[#a39281] mt-1 leading-relaxed">
                      Infused with multi-faceted mineral mica that catches ambient rays at a 45° angle, ensuring your lips gleam with couture luminosity in both bright daylight and candlelit dinners.
                    </p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
};
