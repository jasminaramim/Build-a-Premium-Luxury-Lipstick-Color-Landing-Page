import React, { useState } from 'react';
import { CartItem } from '../types/lipstick';
import { X, Trash2, Plus, Minus, ShoppingBag, Gift, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Jasmina Ramim',
    email: 'jasminaramim2005@gmail.com',
    address: '42 Rue du Faubourg Saint-Honoré',
    city: 'Paris',
    postalCode: '75008',
    country: 'France',
  });

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.shade.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 75 || subtotal === 0;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderConfirmed(true);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#8b0018', '#fae2b4'],
    });
  };

  const handleFinish = () => {
    onClearCart();
    setOrderConfirmed(false);
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#110d0c] text-[#f7f2ea] border-l border-[#2e231c] shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#292019] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
              <h3 className="text-base font-serif font-semibold tracking-wider uppercase text-[#f7f2ea]">
                Your Atelier Bag ({items.reduce((sum, i) => sum + i.quantity, 0)})
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#9c8978] hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderConfirmed ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <CheckCircle2 className="w-14 h-14 text-[#d4af37] mx-auto" />
                <h4 className="text-2xl font-serif text-[#f7f2ea]">Order #ME-8241 Confirmed</h4>
                <p className="text-xs text-[#a08f7e] leading-relaxed max-w-xs mx-auto">
                  Merci, {formData.name}. Your bespoke lipstick order has been placed with the Paris atelier. Hand-engraving and luxury packaging in progress.
                </p>
                <div className="p-4 bg-[#181210] rounded-xl border border-[#34271f] text-left text-xs space-y-1.5">
                  <div className="text-[#caa44b] font-medium uppercase tracking-wider text-[10px]">
                    Shipping Dispatch
                  </div>
                  <div className="text-[#f7f2ea]">{formData.address}, {formData.city}</div>
                  <div className="text-[#998776]">Express Worldwide Courier (2-3 Business Days)</div>
                </div>
                <button
                  type="button"
                  onClick={handleFinish}
                  className="w-full py-3 bg-[#d4af37] text-black text-xs uppercase tracking-widest font-semibold rounded-sm hover:brightness-110"
                >
                  Return to Atelier
                </button>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Form */
              <form onSubmit={handleCheckoutSubmit} className="space-y-4 animate-fadeIn">
                <div className="text-xs font-mono uppercase tracking-wider text-[#caa44b]">
                  Complimentary White-Glove Checkout
                </div>

                <div>
                  <label className="text-[11px] text-[#9c8978] block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#191311] border border-[#3b2d24] rounded text-sm text-[#f7f2ea] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#9c8978] block mb-1">Email for Atelier Tracking</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#191311] border border-[#3b2d24] rounded text-sm text-[#f7f2ea] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#9c8978] block mb-1">Shipping Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 bg-[#191311] border border-[#3b2d24] rounded text-sm text-[#f7f2ea] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#9c8978] block mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191311] border border-[#3b2d24] rounded text-sm text-[#f7f2ea] focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#9c8978] block mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-3 py-2 bg-[#191311] border border-[#3b2d24] rounded text-sm text-[#f7f2ea] focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                {/* Summary in checkout */}
                <div className="pt-4 border-t border-[#292019] space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#a08f7e]">
                    <span>Total Amount</span>
                    <span className="font-mono text-[#f7f2ea] font-semibold">${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[#a08f7e]">
                    <span>Worldwide Express Delivery</span>
                    <span className="text-[#caa44b] font-medium">Free</span>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="w-1/3 py-3 border border-[#3b2d24] text-xs uppercase tracking-wider text-[#9c8978] rounded-sm hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 bg-gradient-to-r from-[#dfba73] to-[#b88636] text-[#0c0908] text-xs uppercase tracking-[0.2em] font-semibold rounded-sm hover:brightness-110 active:scale-95 shadow-lg"
                  >
                    Confirm & Reserve
                  </button>
                </div>
              </form>
            ) : items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <ShoppingBag className="w-12 h-12 text-[#46382f] mx-auto" />
                <p className="text-sm font-serif text-[#a08f7e]">Your bag is currently empty.</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#201815] hover:bg-[#2e231e] text-[#caa44b] text-xs uppercase tracking-wider rounded-sm transition-colors"
                >
                  Explore Shades
                </button>
              </div>
            ) : (
              /* Itemized List */
              <>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-[#171110] border border-[#2b211a] flex gap-4 items-center"
                    >
                      {/* Swatch preview */}
                      <div
                        className="w-12 h-12 rounded-lg border border-white/20 shadow-inner flex items-center justify-center shrink-0"
                        style={{ backgroundColor: item.shade.hex }}
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-serif font-semibold text-[#f7f2ea] truncate">
                            {item.shade.name}
                          </h4>
                          <span className="text-xs font-mono text-[#d4af37]">
                            ${item.shade.price * item.quantity}
                          </span>
                        </div>

                        <div className="text-[11px] text-[#9c8978] mt-0.5 capitalize">
                          {item.finish.replace('-', ' ')} finish · {item.shade.number}
                        </div>

                        {item.engraving && (
                          <div className="text-[10px] text-[#caa44b] font-serif tracking-widest mt-1">
                            Engraved: "{item.engraving}"
                          </div>
                        )}

                        {/* Quantity Stepper */}
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#241a15]">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded bg-[#221815] text-[#caa44b] flex items-center justify-center hover:bg-[#30231e]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono px-1.5">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded bg-[#221815] text-[#caa44b] flex items-center justify-center hover:bg-[#30231e]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[#7c695a] hover:text-[#e04364] transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Complimentary Gift Box */}
                <div className="p-3.5 rounded-xl bg-[#1e1513] border border-[#3b2b21] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#2c1e19] text-[#d4af37] flex items-center justify-center shrink-0">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <div className="text-[#f7f2ea] font-medium font-serif">Complimentary Parisian Gift</div>
                    <div className="text-[#a08f7e] text-[11px]">Élixir Eau de Parfum (10ml miniature) included</div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer with Subtotal & Checkout */}
          {!orderConfirmed && items.length > 0 && !isCheckingOut && (
            <div className="p-6 border-t border-[#292019] bg-[#0c0908] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#a08f7e]">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#f7f2ea] text-sm font-semibold">${subtotal}</span>
                </div>
                <div className="flex justify-between text-[#a08f7e]">
                  <span>Complimentary Delivery</span>
                  <span className="text-[#caa44b] font-medium">Free</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-4 bg-gradient-to-r from-[#dfba73] via-[#fae2b4] to-[#b88636] text-[#0c0908] text-xs uppercase tracking-[0.2em] font-semibold rounded-sm hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout · ${subtotal}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
