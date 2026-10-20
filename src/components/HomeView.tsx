import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { FORMULAS, HOME_CAROUSEL_SLIDES } from '../data/mockData';
import { FormulaId } from '../types';
import { formatFCFA } from '../utils/helpers';

interface HomeViewProps {
  onStartBuilderWithFormula: (formulaId: FormulaId) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onStartBuilderWithFormula }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto advance carousel gently
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HOME_CAROUSEL_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 animate-fade-in">
      
      {/* 1. Hero carrousel pleine largeur (prend toute la longueur) */}
      <section className="w-full relative overflow-hidden min-h-[500px] sm:min-h-[580px] lg:min-h-[620px] flex items-center justify-center border-b border-stone-200/80 group">
        
        {/* Carrousel en arrière-plan avec transitions douces */}
        {HOME_CAROUSEL_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover object-center filter brightness-[0.88]"
              />
              {/* Voile sombre et chaleureux pour assurer une lisibilité et un accueil parfaits */}
              <div className="absolute inset-0 bg-stone-950/45" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-stone-950/50" />
            </div>
          );
        })}

        {/* Contenu de présentation placé DEVANT le carrousel */}
        <div className="relative z-10 p-6 sm:p-12 text-center max-w-2xl mx-auto text-white flex flex-col items-center">
          
          {/* Titre K-BOX avec gros point parfaitement aligné sur la ligne de base */}
          <div className="inline-flex items-baseline justify-center gap-1.5 mb-3">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight font-medium drop-shadow-md leading-none">
              K-BOX
            </h1>
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white inline-block shrink-0 shadow-sm align-baseline" />
          </div>

          {/* Le texte de présentation concis */}
          <p className="text-white/95 text-xs sm:text-sm md:text-base leading-relaxed font-normal max-w-lg mx-auto drop-shadow-sm mb-8">
            Box surprises et coffrets cadeaux raffinés pour célébrer vos plus beaux moments : 
            anniversaires, Saint-Valentin, réussites et douces attentions.
          </p>

          {/* Bouton d'action unique : DÉCOUVRIR avec flèche devant */}
          <div className="flex justify-center w-full">
            <button
              type="button"
              onClick={() => {
                document.getElementById('formules')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-9 py-3.5 rounded-full bg-white text-stone-950 hover:bg-stone-100 font-semibold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2.5 shadow-xl active:scale-98 cursor-pointer group"
            >
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              <span>DÉCOUVRIR</span>
            </button>
          </div>

        </div>

        {/* Indicateurs doux de position du carrousel */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {HOME_CAROUSEL_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentSlide(i)}
              className={`transition-all rounded-full cursor-pointer ${
                i === currentSlide ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Aller au slide ${i + 1}`}
            />
          ))}
        </div>

      </section>

      {/* 2. Les Box en format épuré : sans images et sans informations superflues */}
      <section id="formules" className="max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-24">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] font-semibold tracking-widest uppercase text-stone-500 block mb-1">
            Nos Créations
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-medium">
            Trois formules simples & soignées
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Choisissez la formule qui vous ressemble pour commencer votre composition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {FORMULAS.map((formula) => {
            const shortName = formula.id === 'kbox-1' ? 'K-Box 1' : formula.id === 'kbox-2' ? 'K-Box 2' : 'K-Box 3';

            return (
              <div
                key={formula.id}
                className="bg-white rounded-3xl border border-stone-200/90 p-7 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Titre et Prix */}
                  <div className="mb-6">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                      {shortName}
                    </h3>
                    <div className="mt-3 text-3xl font-serif font-bold text-stone-900">
                      {formatFCFA(formula.basePrice)}
                    </div>
                  </div>

                  {/* Séparateur sobre */}
                  <div className="border-t border-stone-100 my-6" />

                  {/* Caractéristiques essentielles en puces sobres */}
                  <ul className="space-y-3.5 text-xs sm:text-sm text-stone-600">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-stone-900 shrink-0" />
                      <span>Sexe & couleur dominante au choix</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-stone-900 shrink-0" />
                      <span>
                        {formula.allowsItemSelection 
                          ? "Choix d'articles selon stock" 
                          : "Contenu surprise préparé avec soin"}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-stone-900 shrink-0" />
                      <span>
                        {formula.allowsCustomText 
                          ? "Mot personnalisé inclus" 
                          : "Emballage cadeau élégant avec ruban"}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Bouton style pilule noire FAIRE MA K-BOX X -> */}
                <div className="mt-8 pt-4">
                  <button
                    type="button"
                    onClick={() => onStartBuilderWithFormula(formula.id)}
                    className="w-full py-3.5 px-6 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
                  >
                    <span>FAIRE MA {shortName.toUpperCase()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Reassurance douce */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-8 rounded-3xl bg-stone-100/70 border border-stone-200/50">
          <Heart className="w-5 h-5 text-stone-400 mx-auto mb-2" />
          <p className="font-serif text-lg text-stone-800 italic">
            « Chaque box est préparée comme si elle était destinée à l’un de nos proches. »
          </p>
          <p className="text-xs text-stone-500 mt-2">
            Retrait gratuit disponible à <strong>Orca Déco Jericho (Cotonou)</strong> · Validation simple via <strong>WhatsApp</strong>
          </p>
        </div>
      </section>

    </div>
  );
};
