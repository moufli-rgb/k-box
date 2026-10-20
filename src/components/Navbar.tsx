import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  ShoppingBag, 
  X, 
  Menu
} from 'lucide-react';

export type NavTab = 'accueil' | 'comment-ca-marche' | 'faire-mon-kbox' | 'contact';

interface NavbarProps {
  currentTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  cartItemCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  cartItemCount,
  onOpenCart
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (tab: NavTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Menu mobile épuré et élégant : les menus l'un après l'autre en grand séparés d'un trait, avec juste la croix pour fermer
  const mobileModal = mobileMenuOpen && mounted && typeof document !== 'undefined' ? (
    createPortal(
      <div 
        className="fixed inset-0 z-[9999] bg-stone-950/45 backdrop-blur-md flex items-center justify-center p-5 overflow-y-auto animate-fade-in"
        onClick={() => setMobileMenuOpen(false)}
        role="dialog"
        aria-modal="true"
      >
        <div 
          className="relative w-full max-w-sm bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-stone-200/80 p-6 sm:p-8 my-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Fermer : juste la croix en haut à droite */}
          <div className="flex justify-end mb-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 -mr-2 -mt-2 text-stone-400 hover:text-stone-950 transition-colors cursor-pointer active:scale-90"
              aria-label="Fermer"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Menus écrits en grand l'un après l'autre séparés d'un trait */}
          <nav className="flex flex-col text-center">
            <button
              type="button"
              onClick={() => handleNavClick('accueil')}
              className={`py-4 font-serif text-2xl tracking-wide transition-colors cursor-pointer border-b border-stone-200/60 ${
                currentTab === 'accueil' ? 'text-stone-950 font-bold' : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              Accueil
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('comment-ca-marche')}
              className={`py-4 font-serif text-2xl tracking-wide transition-colors cursor-pointer border-b border-stone-200/60 ${
                currentTab === 'comment-ca-marche' ? 'text-stone-950 font-bold' : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              Comment ça marche
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('faire-mon-kbox')}
              className={`py-4 font-serif text-2xl tracking-wide transition-colors cursor-pointer border-b border-stone-200/60 ${
                currentTab === 'faire-mon-kbox' ? 'text-stone-950 font-bold' : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              Faire mon K-Box
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className={`py-4 font-serif text-2xl tracking-wide transition-colors cursor-pointer border-b border-stone-200/60 ${
                currentTab === 'contact' ? 'text-stone-950 font-bold' : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              Contact
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="py-4 font-serif text-2xl tracking-wide text-stone-600 hover:text-stone-950 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Panier</span>
              {cartItemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[11px] font-bold font-sans flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </nav>

        </div>
      </div>,
      document.body
    )
  ) : null;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* Brand Name with aligned dot (no color change on hover) */}
        <div 
          onClick={() => handleNavClick('accueil')}
          className="flex items-baseline cursor-pointer py-1 select-none gap-1"
        >
          <span className="font-serif tracking-[0.18em] text-2xl sm:text-3xl font-bold text-stone-900 leading-none">
            K-BOX
          </span>
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-stone-900 inline-block shrink-0 align-baseline" />
        </div>

        {/* Desktop Navigation: ACCUEIL | COMMENT ÇA MARCHE | FAIRE MON K-BOX | CONTACT | PANIER */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-widest uppercase">
          <button
            type="button"
            onClick={() => handleNavClick('accueil')}
            className={`pb-1 transition-all ${
              currentTab === 'accueil'
                ? 'text-stone-900 border-b-2 border-stone-900'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Accueil
          </button>
          
          <button
            type="button"
            onClick={() => handleNavClick('comment-ca-marche')}
            className={`pb-1 transition-all ${
              currentTab === 'comment-ca-marche'
                ? 'text-stone-900 border-b-2 border-stone-900'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Comment ça marche
          </button>
          
          <button
            type="button"
            onClick={() => handleNavClick('faire-mon-kbox')}
            className={`pb-1 transition-all ${
              currentTab === 'faire-mon-kbox'
                ? 'text-stone-900 border-b-2 border-stone-900'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Faire mon K-Box
          </button>
          
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className={`pb-1 transition-all ${
              currentTab === 'contact'
                ? 'text-stone-900 border-b-2 border-stone-900'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Contact
          </button>

          {/* Panier Button */}
          <button
            type="button"
            onClick={onOpenCart}
            className="flex items-center gap-2 pl-3 py-1 text-stone-800 hover:text-stone-900 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Panier</span>
            {cartItemCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={onOpenCart}
            className="relative p-2.5 min-w-[42px] min-h-[42px] text-stone-800 hover:bg-stone-200/50 rounded-xl flex items-center justify-center cursor-pointer active:scale-95"
            aria-label="Panier"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-stone-900 text-white text-[9px] font-bold flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* 3 traits (hamburger menu icon) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2.5 min-w-[42px] min-h-[42px] text-stone-800 hover:bg-stone-200/50 rounded-xl flex items-center justify-center transition-colors cursor-pointer active:scale-95 border border-stone-200/70 bg-white/60"
            aria-label="Ouvrir le menu"
            title="Menu"
          >
            <Menu className="w-5 h-5 text-stone-800" />
          </button>
        </div>

      </div>

      {/* Render Mobile Menu through Portal to break free from header containing block */}
      {mobileModal}
    </header>
  );
};
