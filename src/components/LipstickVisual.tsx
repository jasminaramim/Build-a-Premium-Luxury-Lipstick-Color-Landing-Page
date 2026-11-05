import React, { useState } from 'react';
import { LipstickShade, ShadeFinish } from '../types/lipstick';
import { Sparkles, Eye, ShieldCheck, RefreshCw } from 'lucide-react';

interface LipstickVisualProps {
  shade: LipstickShade;
  activeFinish?: ShadeFinish;
  engravingText?: string;
  className?: string;
  interactive?: boolean;
}

export const LipstickVisual: React.FC<LipstickVisualProps> = ({
  shade,
  activeFinish,
  engravingText = '',
  className = '',
  interactive = true,
}) => {
  const finish = activeFinish || shade.defaultFinish;
  const [viewMode, setViewMode] = useState<'bullet' | 'lip'>('bullet');
  const [isHovered, setIsHovered] = useState(false);

  // Compute specular sheen based on finish (matte vs satin vs lubricant gloss)
  const isGloss = finish === 'lacquer-gloss';
  const isSatin = finish === 'satin-cream';
  const isMatte = finish === 'velvet-matte';

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* View Switcher Toggle if interactive */}
      {interactive && (
        <div className="absolute top-2 right-2 z-20 flex items-center bg-[#151110]/80 backdrop-blur-md border border-[#382f2a] p-1 rounded-full text-xs font-medium text-[#c8b7a6]">
          <button
            type="button"
            onClick={() => setViewMode('bullet')}
            className={`px-3 py-1 rounded-full transition-all duration-300 ${
              viewMode === 'bullet'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#aa8024] text-[#0c0908] font-semibold shadow'
                : 'hover:text-white'
            }`}
          >
            Haute Bullet
          </button>
          <button
            type="button"
            onClick={() => setViewMode('lip')}
            className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all duration-300 ${
              viewMode === 'lip'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#aa8024] text-[#0c0908] font-semibold shadow'
                : 'hover:text-white'
            }`}
          >
            <Eye className="w-3 h-3" />
            Lip Try-On
          </button>
        </div>
      )}

      {/* Main Visual Display */}
      <div 
        className="relative w-full aspect-[4/5] max-w-sm flex items-center justify-center p-4 transition-transform duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Ambient atmospheric lighting behind the lipstick */}
        <div 
          className="absolute inset-0 rounded-full blur-3xl opacity-25 transition-colors duration-700 pointer-events-none"
          style={{ backgroundColor: shade.hex }}
        />
        <div className="absolute inset-0 bg-radial from-[#d4af37]/10 via-transparent to-transparent blur-2xl pointer-events-none" />

        {viewMode === 'bullet' ? (
          /* High-Fidelity SVG / Canvas Lipstick Tube & Bullet */
          <div className="relative w-64 h-96 flex items-center justify-center">
            <svg
              viewBox="0 0 280 440"
              className="w-full h-full drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] filter"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* 24K Fluted Gold Gradient for the case */}
                <linearGradient id="goldFluted" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#876627" />
                  <stop offset="15%" stopColor="#eccf79" />
                  <stop offset="30%" stopColor="#bfa04a" />
                  <stop offset="50%" stopColor="#fff2be" />
                  <stop offset="68%" stopColor="#b5943f" />
                  <stop offset="85%" stopColor="#ffe99b" />
                  <stop offset="100%" stopColor="#674e1e" />
                </linearGradient>

                {/* Dark Lacquer Obsidian Black Gradient */}
                <linearGradient id="blackLacquer" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#080707" />
                  <stop offset="25%" stopColor="#1a1817" />
                  <stop offset="50%" stopColor="#302d2a" />
                  <stop offset="75%" stopColor="#12100f" />
                  <stop offset="100%" stopColor="#050404" />
                </linearGradient>

                {/* Dynamic Shade Shading Gradients */}
                <linearGradient id="bulletShadeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
                  <stop offset="20%" stopColor="#ffffff" stopOpacity={isGloss ? '0.35' : isSatin ? '0.2' : '0.08'} />
                  <stop offset="45%" stopColor="#ffffff" stopOpacity={isGloss ? '0.55' : isSatin ? '0.28' : '0.04'} />
                  <stop offset="70%" stopColor="#000000" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.65" />
                </linearGradient>

                {/* Specular Lubricant Gloss Sheen Filter */}
                <linearGradient id="glossHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
                  <stop offset="35%" stopColor="#ffffff" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>

                {/* Soft Bevel Shadow */}
                <radialGradient id="bulletBevelGlow" cx="50%" cy="30%" r="60%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity={isGloss ? '0.4' : isSatin ? '0.2' : '0.05'} />
                  <stop offset="80%" stopColor="#000000" stopOpacity="0.4" />
                </radialGradient>
              </defs>

              {/* Lipstick Drop Shadow */}
              <ellipse cx="140" cy="425" rx="65" ry="12" fill="rgba(0,0,0,0.7)" filter="blur(8px)" />

              {/* LOWER CASE: Piano Black Lacquer Base */}
              <rect x="75" y="240" width="130" height="175" rx="4" fill="url(#blackLacquer)" stroke="#4a3e2e" strokeWidth="0.8" />
              
              {/* Vertical Fluted Gold Accent Insets on Base */}
              <rect x="76" y="240" width="4" height="175" fill="rgba(255,255,255,0.15)" />
              <rect x="200" y="240" width="4" height="175" fill="rgba(0,0,0,0.5)" />

              {/* Lower Gold Trim Ring */}
              <rect x="73" y="405" width="134" height="7" rx="1.5" fill="url(#goldFluted)" />

              {/* MID SECTION: Architectural Fluted Gold Waist */}
              <rect x="72" y="215" width="136" height="28" rx="2" fill="url(#goldFluted)" stroke="#caa44b" strokeWidth="0.5" />
              
              {/* Embossed Brand Wordmark on Gold Ring */}
              <text
                x="140"
                y="233"
                textAnchor="middle"
                fill="#3d2a09"
                fontSize="8.5"
                fontWeight="700"
                letterSpacing="2.5"
                fontFamily="Cinzel, Cormorant Garamond, serif"
              >
                MAISON ÉLIXIR
              </text>

              {/* INNER GOLD CYLINDER (MECHANISM) */}
              <rect x="85" y="125" width="110" height="92" rx="3" fill="url(#goldFluted)" />
              
              {/* Precision Fluting Grooves on Mechanism */}
              <line x1="93" y1="125" x2="93" y2="217" stroke="#8c6a27" strokeWidth="1.2" opacity="0.6" />
              <line x1="102" y1="125" x2="102" y2="217" stroke="#fff4cf" strokeWidth="1" opacity="0.8" />
              <line x1="113" y1="125" x2="113" y2="217" stroke="#8c6a27" strokeWidth="1.2" opacity="0.6" />
              <line x1="124" y1="125" x2="124" y2="217" stroke="#fff4cf" strokeWidth="1" opacity="0.8" />
              <line x1="156" y1="125" x2="156" y2="217" stroke="#8c6a27" strokeWidth="1.2" opacity="0.6" />
              <line x1="167" y1="125" x2="167" y2="217" stroke="#fff4cf" strokeWidth="1" opacity="0.8" />
              <line x1="178" y1="125" x2="178" y2="217" stroke="#8c6a27" strokeWidth="1.2" opacity="0.6" />
              <line x1="187" y1="125" x2="187" y2="217" stroke="#8c6a27" strokeWidth="1.2" opacity="0.6" />

              {/* Custom Laser Engraving on Mechanism */}
              {engravingText && (
                <g>
                  <rect x="96" y="180" width="88" height="20" fill="rgba(60, 42, 10, 0.4)" rx="2" />
                  <text
                    x="140"
                    y="194"
                    textAnchor="middle"
                    fill="#ffe89e"
                    fontSize="9"
                    fontWeight="600"
                    letterSpacing="1.5"
                    fontFamily="Cormorant Garamond, serif"
                  >
                    {engravingText.toUpperCase()}
                  </text>
                </g>
              )}

              {/* LIPSTICK BULLET */}
              <g 
                className="transition-transform duration-500 origin-bottom"
                style={{
                  transform: isHovered ? 'scale(1.02) translateY(-3px)' : 'scale(1)',
                }}
              >
                {/* 1. Base Bullet Cylinder */}
                <path
                  d="M 96,125 L 96,65 Q 96,38 140,24 Q 184,38 184,65 L 184,125 Z"
                  fill={shade.hex}
                />
                
                {/* 2. Beveled Ergonomic Couture Teardrop Slice */}
                <path
                  d="M 96,65 C 96,44 116,28 140,22 C 164,28 184,44 184,65 C 184,82 154,104 140,104 C 126,104 96,82 96,65 Z"
                  fill={shade.hex}
                  filter="brightness(1.12)"
                />

                {/* 3. Shadow/Luminance Overlay across bullet shape */}
                <path
                  d="M 96,125 L 96,65 Q 96,38 140,24 Q 184,38 184,65 L 184,125 Z"
                  fill="url(#bulletShadeGrad)"
                />

                {/* 4. Velvet Matte, Satin Cream, or Lacquer Gloss SPECULAR HIGHLIGHT */}
                {isGloss && (
                  /* Ultra-slick lubricant / high-shine mirror reflections */
                  <g>
                    {/* Primary Gloss Highlight Curve */}
                    <path
                      d="M 124,35 Q 140,26 156,35 Q 146,55 130,50 Z"
                      fill="url(#glossHighlight)"
                    />
                    {/* Specular Glisten Streak along the cylinder */}
                    <path
                      d="M 112,60 Q 115,95 114,124"
                      stroke="#ffffff"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      opacity="0.75"
                      filter="blur(0.8px)"
                    />
                    <path
                      d="M 120,68 Q 122,95 121,118"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      opacity="0.9"
                    />
                    {/* Micro Liquid Dew Refraction Droplet */}
                    <circle cx="148" cy="42" r="2.5" fill="#ffffff" opacity="0.9" filter="blur(0.4px)" />
                    <circle cx="138" cy="74" r="1.5" fill="#ffffff" opacity="0.85" />
                  </g>
                )}

                {isSatin && (
                  /* Luminous Satin Cream Sheen */
                  <g>
                    <path
                      d="M 115,55 Q 118,90 117,124"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      opacity="0.45"
                      filter="blur(1px)"
                    />
                    <ellipse cx="138" cy="48" rx="16" ry="10" fill="#ffffff" opacity="0.22" filter="blur(2px)" />
                  </g>
                )}

                {isMatte && (
                  /* Powdery Velvet Micro-texture rim */
                  <g>
                    <path
                      d="M 97,68 L 97,124"
                      stroke="#ffffff"
                      strokeWidth="1"
                      opacity="0.18"
                    />
                    <path
                      d="M 183,68 L 183,124"
                      stroke="#000000"
                      strokeWidth="1.5"
                      opacity="0.4"
                    />
                  </g>
                )}

                {/* Embossed "ME" Monogram on Bullet Tip */}
                <text
                  x="140"
                  y="70"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.22)"
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="Cormorant Garamond, serif"
                  letterSpacing="1"
                >
                  ÉLIXIR
                </text>
              </g>

              {/* Beveled Rim Collar Ring */}
              <ellipse cx="140" cy="125" rx="55" ry="4" fill="url(#goldFluted)" stroke="#876627" strokeWidth="0.5" />
            </svg>
          </div>
        ) : (
          /* Live Lip Try-On Simulation Mode */
          <div className="relative w-72 h-80 flex flex-col items-center justify-center">
            <div className="relative w-64 h-52 rounded-2xl overflow-hidden border border-[#3e342b] bg-[#120e0d] flex items-center justify-center p-3 shadow-2xl">
              {/* Photorealistic Lips Illustration Vector with Dynamic Lighting & Shade Blend */}
              <svg viewBox="0 0 320 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Skin Tone Gradient */}
                  <radialGradient id="skinBase" cx="50%" cy="50%" r="55%">
                    <stop offset="0%" stopColor="#d8a48f" />
                    <stop offset="60%" stopColor="#bd8572" />
                    <stop offset="100%" stopColor="#9b6858" />
                  </radialGradient>

                  {/* Dynamic Lip Color Fill with Depth */}
                  <linearGradient id="lipGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={shade.hex} stopOpacity="0.9" />
                    <stop offset="45%" stopColor={shade.hex} stopOpacity="1" />
                    <stop offset="100%" stopColor="#1e0509" stopOpacity="0.8" />
                  </linearGradient>

                  {/* Gloss Specular Highlight for Lips */}
                  <linearGradient id="lipGlossSheen" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                    <stop offset="50%" stopColor="#ffffff" stopOpacity={isGloss ? '0.75' : isSatin ? '0.4' : '0.1'} />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Face Canvas Context */}
                <rect width="320" height="220" fill="url(#skinBase)" />

                {/* Philtrum / Cupid's Bow Soft Shadow */}
                <path d="M 148,20 Q 153,60 152,78 M 172,20 Q 167,60 168,78" stroke="#875143" strokeWidth="2.5" opacity="0.35" fill="none" filter="blur(1.5px)" />
                <path d="M 160,20 Q 160,55 160,78" stroke="#f2c8b7" strokeWidth="2" opacity="0.4" fill="none" filter="blur(1px)" />

                {/* Outer Lip Shadow */}
                <ellipse cx="160" cy="116" rx="94" ry="46" fill="#683428" opacity="0.4" filter="blur(6px)" />

                {/* UPPER LIP */}
                <path
                  d="M 68,112 C 90,98 122,80 150,86 C 156,87 160,82 160,82 C 160,82 164,87 170,86 C 198,80 230,98 252,112 C 228,124 195,124 160,123 C 125,124 92,124 68,112 Z"
                  fill="url(#lipGradient)"
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
                />

                {/* LOWER LIP (Voluptuous & Plump) */}
                <path
                  d="M 68,112 C 92,123 125,124 160,123 C 195,124 228,123 252,112 C 242,148 205,166 160,166 C 115,166 78,148 68,112 Z"
                  fill="url(#lipGradient)"
                />

                {/* Inter-labial Shadow (Inner Mouth Gap) */}
                <path
                  d="M 72,112 Q 115,124 160,122 Q 205,124 248,112 Q 205,118 160,119 Q 115,118 72,112 Z"
                  fill="#230a0d"
                />

                {/* Natural Lip Wrinkle Texture & Specular Light */}
                {isGloss && (
                  <g>
                    {/* High-Gloss Wet Finish Sheen */}
                    <ellipse cx="160" cy="144" rx="42" ry="9" fill="url(#lipGlossSheen)" filter="blur(1px)" />
                    <ellipse cx="142" cy="142" rx="14" ry="4" fill="#ffffff" opacity="0.65" filter="blur(0.5px)" />
                    <ellipse cx="178" cy="142" rx="14" ry="4" fill="#ffffff" opacity="0.65" filter="blur(0.5px)" />
                    {/* Cupid's bow glisten */}
                    <path d="M 152,86 Q 160,84 168,86" stroke="#ffffff" strokeWidth="2.5" opacity="0.7" fill="none" filter="blur(0.5px)" />
                  </g>
                )}

                {isSatin && (
                  <g>
                    <ellipse cx="160" cy="143" rx="36" ry="6" fill="#ffffff" opacity="0.3" filter="blur(2px)" />
                    <path d="M 152,86 Q 160,84 168,86" stroke="#ffffff" strokeWidth="1.5" opacity="0.45" fill="none" filter="blur(0.8px)" />
                  </g>
                )}

                {isMatte && (
                  <g>
                    {/* Velvet Powder Light Diffuse */}
                    <ellipse cx="160" cy="142" rx="40" ry="10" fill="#ffffff" opacity="0.08" filter="blur(3px)" />
                  </g>
                )}
              </svg>

              {/* Shade Badge Overlay */}
              <div className="absolute bottom-2 left-2 bg-[#0c0908]/90 border border-[#3c3024] px-2.5 py-1 rounded text-[11px] text-[#f7f2ea] flex items-center gap-1.5 backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: shade.hex }} />
                <span className="font-serif italic font-semibold">{shade.name}</span>
                <span className="text-[#a08975] text-[10px]">· {finish.replace('-', ' ')}</span>
              </div>
            </div>

            <p className="mt-2 text-xs text-[#a08975] text-center">
              Simulated under 5500K daylight luxury studio lighting
            </p>
          </div>
        )}
      </div>

      {/* Shade Swatch Summary Ribbon */}
      <div className="w-full flex items-center justify-between px-4 py-2 mt-2 bg-[#171211]/90 rounded-xl border border-[#2e2621]">
        <div className="flex items-center gap-3">
          <div 
            className="w-7 h-7 rounded-full border-2 border-[#d4af37]/60 shadow-[0_0_12px_rgba(0,0,0,0.5)] flex-shrink-0" 
            style={{ backgroundColor: shade.hex }}
          />
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold font-serif text-[#f7f2ea] tracking-wide">{shade.name}</span>
              <span className="text-[10px] text-[#caa44b] font-mono tracking-wider">{shade.number}</span>
            </div>
            <p className="text-[11px] text-[#9c8978] capitalize">{shade.frenchName} · {shade.undertone} undertone</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-[#f7f2ea] font-mono">${shade.price}</div>
          <span className="text-[10px] text-[#8e7968] uppercase tracking-wider">{finish.replace('-', ' ')}</span>
        </div>
      </div>
    </div>
  );
};
