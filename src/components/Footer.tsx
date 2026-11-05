import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem } from './ScrollReveal';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#080505] text-[#f7f2ea] border-t border-[#1e1713] pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Newsletter & Brand Showcase */}
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#241a15]">
          {/* Brand Info */}
          <StaggerItem className="lg:col-span-5 space-y-4">
            <a
              href="#"
              className="text-2xl font-serif tracking-[0.25em] text-[#f7f2ea] hover:text-[#d4af37] transition-colors block font-medium"
            >
              MAISON ÉLIXIR
            </a>
            <p className="text-xs text-[#a39281] leading-relaxed max-w-sm">
              Place Vendôme fine cosmetics atelier. Crafting timeless red lipsticks, sculptural fluted gold cases, and sensory luxury formulations for the modern connoisseur.
            </p>
            <div className="text-[11px] text-[#7d6b5c] font-mono">
              18 Place Vendôme, 75001 Paris, France
            </div>
          </StaggerItem>

          {/* Navigation Links */}
          <StaggerItem className="lg:col-span-3 grid grid-cols-2 gap-6">
            <div>
              <div className="text-[11px] font-mono uppercase text-[#caa44b] tracking-wider mb-4">
                Collections
              </div>
              <ul className="space-y-2.5 text-xs text-[#9c8978]">
                <li><a href="#shades" className="hover:text-white transition-colors">The 16 Shades</a></li>
                <li><a href="#categories" className="hover:text-white transition-colors">The Reds</a></li>
                <li><a href="#categories" className="hover:text-white transition-colors">The Nudes</a></li>
                <li><a href="#categories" className="hover:text-white transition-colors">The Pinks</a></li>
                <li><a href="#categories" className="hover:text-white transition-colors">The Bold Shades</a></li>
              </ul>
            </div>

            <div>
              <div className="text-[11px] font-mono uppercase text-[#caa44b] tracking-wider mb-4">
                Maison
              </div>
              <ul className="space-y-2.5 text-xs text-[#9c8978]">
                <li><a href="#story" className="hover:text-white transition-colors">The Atelier</a></li>
                <li><a href="#shade-finder" className="hover:text-white transition-colors">Shade Finder</a></li>
                <li><a href="#cinematic" className="hover:text-white transition-colors">Le Film</a></li>
                <li><a href="#story" className="hover:text-white transition-colors">Refill Initiative</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Client Care</a></li>
              </ul>
            </div>
          </StaggerItem>

          {/* Newsletter Subscription */}
          <StaggerItem className="lg:col-span-4 space-y-4">
            <div className="text-[11px] font-mono uppercase text-[#caa44b] tracking-wider">
              The Private Circle
            </div>
            <p className="text-xs text-[#a39281] leading-relaxed">
              Receive private invitations to confidential shade launches, bespoke monogramming events, and haute couture editorial releases.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#181311] border border-[#d4af37]/40 rounded text-xs text-[#d4af37] flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Welcome to the Maison Élixir Private Circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#140e0c] border border-[#33261e] rounded text-xs text-[#f7f2ea] focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-4 py-2 bg-[#d4af37] text-black rounded text-xs uppercase tracking-wider font-semibold hover:brightness-110 transition-all flex items-center justify-center cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </StaggerItem>
        </StaggerContainer>

        {/* Bottom Bar with Fade Up */}
        <FadeUp delay={0.2} className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7d6b5c] gap-4">
          <div>
            © {new Date().getFullYear()} MAISON ÉLIXIR PARIS ATELIER. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#caa44b] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#caa44b] transition-colors">Terms of Couture</a>
            <a href="#" className="hover:text-[#caa44b] transition-colors">Legal Mentions</a>
          </div>
        </FadeUp>
      </div>
    </footer>
  );
};
