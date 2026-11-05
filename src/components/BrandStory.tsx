import React from 'react';
import { FadeUp, ScaleIn, StaggerContainer, StaggerItem } from './ScrollReveal';

export const BrandStory: React.FC = () => {
  return (
    <section id="story" className="py-24 bg-[#0a0706] text-[#f7f2ea] border-t border-[#211914] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main Editorial Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Haute Atelier Photography Card with Scale In */}
          <div className="lg:col-span-5 relative">
            <ScaleIn delay={0.1}>
              <div className="relative rounded-2xl overflow-hidden border border-[#30251d] aspect-[3/4] shadow-2xl group">
                <img
                  src="/src/assets/images/hero_model_lipstick_1793861222078.jpg"
                  alt="Maison Élixir Haute Rouge Couture Model"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0706] via-transparent to-transparent opacity-80" />

                {/* Atelier Stamp Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#120d0c]/90 border border-[#3b2d23] backdrop-blur-md">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#caa44b]">
                    Atelier Place Vendôme · Paris
                  </div>
                  <div className="text-sm font-serif italic text-[#f7f2ea] mt-1">
                    "Color is the immediate translation of confidence into space."
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>

          {/* Right Column: Editorial Narrative & Values with Fade Up */}
          <div className="lg:col-span-7 space-y-6">
            <FadeUp delay={0}>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#d4af37] font-medium">
                <span className="w-6 h-[1px] bg-[#d4af37]" />
                <span>The Atelier Manifesto</span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2 className="text-4xl sm:text-6xl font-serif font-light text-[#f7f2ea] tracking-tight leading-[1.05]">
                MORE THAN A COLOR. <br />
                <span className="italic font-normal gold-gradient-text">IT'S AN ATTITUDE.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-base sm:text-lg text-[#baa998] font-light leading-relaxed">
                Founded at the intersection of Place Vendôme fine jewelry and high-fashion couture pigmentology, MAISON ÉLIXIR was born from a singular conviction: luxury should not compromise comfort.
              </p>
            </FadeUp>

            <FadeUp delay={0.25}>
              <p className="text-sm text-[#9c8978] leading-relaxed">
                Each lipstick bullet is molded with an ergonomic teardrop contour that hugs the natural curve of the lip line in a single effortless gesture. Encased in a solid, fluted 24k gold-plated brass vessel, our cases are forever refillable—designed to be treasured across decades, passed down as bespoke heirlooms.
              </p>
            </FadeUp>

            {/* 3 Pillars with Staggered Entrance */}
            <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#261d17]">
              <StaggerItem>
                <div className="p-3.5 rounded-xl bg-[#130e0c]/60 border border-[#261d17]">
                  <div className="text-xs font-mono uppercase text-[#caa44b] tracking-wider mb-1">
                    01. Sourcing
                  </div>
                  <h4 className="text-sm font-semibold text-[#f7f2ea] font-serif">Pure Pigment</h4>
                  <p className="text-xs text-[#8c7a6a] mt-1">
                    Triple-milled mineral crystals for opaque, full-coverage vibrance in one glide.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="p-3.5 rounded-xl bg-[#130e0c]/60 border border-[#261d17]">
                  <div className="text-xs font-mono uppercase text-[#caa44b] tracking-wider mb-1">
                    02. Eco-Luxury
                  </div>
                  <h4 className="text-sm font-semibold text-[#f7f2ea] font-serif">Refillable Core</h4>
                  <p className="text-xs text-[#8c7a6a] mt-1">
                    100% infinitely recyclable fluted brass with interchangeable color capsules.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="p-3.5 rounded-xl bg-[#130e0c]/60 border border-[#261d17]">
                  <div className="text-xs font-mono uppercase text-[#caa44b] tracking-wider mb-1">
                    03. Integrity
                  </div>
                  <h4 className="text-sm font-semibold text-[#f7f2ea] font-serif">Clean Formulation</h4>
                  <p className="text-xs text-[#8c7a6a] mt-1">
                    Formulated without parabens, mineral oils, or synthetic fragrance. Cruelty-free.
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
