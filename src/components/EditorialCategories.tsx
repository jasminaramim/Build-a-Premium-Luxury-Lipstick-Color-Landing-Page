import React from 'react';
import { CATEGORIES_DATA } from '../data/shades';
import { ShadeCategory } from '../types/lipstick';
import { ArrowUpRight } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from './ScrollReveal';

interface EditorialCategoriesProps {
  onSelectCategory: (category: ShadeCategory) => void;
}

export const EditorialCategories: React.FC<EditorialCategoriesProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="py-24 bg-[#0a0707] text-[#f7f2ea] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header with Smooth Fade Up */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUp delay={0}>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#d4af37] font-medium mb-3">
              <span className="w-6 h-[1px] bg-[#d4af37]" />
              <span>Curated Expressions</span>
              <span className="w-6 h-[1px] bg-[#d4af37]" />
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-serif font-light tracking-tight">
              The Haute Color Chapters
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-sm sm:text-base text-[#a08f7e] mt-3 font-light leading-relaxed">
              Four iconic cosmetic archetypes crafted to embody distinct expressions of timeless Parisian elegance and unbridled confidence.
            </p>
          </FadeUp>
        </div>

        {/* 4 Large Editorial Cards with Smooth Staggered Reveal */}
        <StaggerContainer staggerDelay={0.14} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES_DATA.map((cat) => (
            <StaggerItem key={cat.id}>
              <div
                onClick={() => {
                  onSelectCategory(cat.id);
                  const el = document.getElementById('shades');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative h-[480px] rounded-2xl overflow-hidden cursor-pointer border border-[#2b211a] hover:border-[#caa44b]/60 transition-all duration-700 flex flex-col justify-end p-6 bg-[#120d0b] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              >
                {/* Background Image with Zoom & Dark Scrim */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110 filter brightness-[0.82] contrast-[1.05]"
                  style={{ backgroundImage: `url('${cat.image}')` }}
                />

                {/* Gradient Scrim for WCAG AA text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0707] via-[#0a0707]/65 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Top Accent Index */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-xs tracking-[0.2em] uppercase text-[#caa44b] font-medium">
                  <span>{cat.frenchTitle}</span>
                  <span className="w-7 h-7 rounded-full bg-[#0a0707]/80 backdrop-blur-md border border-[#3b2e24] flex items-center justify-center text-white group-hover:bg-[#d4af37] group-hover:text-black transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                {/* Bottom Editorial Content */}
                <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-1">
                  <span className="text-[11px] font-mono tracking-wider text-[#d4af37] uppercase block mb-1">
                    {cat.shadeCount} Curated Shades
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#f7f2ea] tracking-tight group-hover:text-[#fae2b4] transition-colors">
                    {cat.title}
                  </h3>
                  
                  <p className="text-xs text-[#b8a796] font-light mt-2 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Hover CTA Indicator */}
                  <div className="mt-4 pt-3 border-t border-[#332720] flex items-center justify-between text-[11px] uppercase tracking-[0.15em] text-[#caa44b] opacity-90 group-hover:opacity-100 font-medium">
                    <span>Explore Collection</span>
                    <span className="text-white group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
