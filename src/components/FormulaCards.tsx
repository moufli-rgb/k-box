import React from 'react';
import { Check, Sparkles, AlertCircle, Truck, Package, HeartHandshake } from 'lucide-react';
import { FORMULAS } from '../data/mockData';
import { FormulaId } from '../types';
import { formatFCFA } from '../utils/helpers';

interface FormulaCardsProps {
  selectedFormulaId: FormulaId;
  onSelectFormula: (id: FormulaId) => void;
}

export const FormulaCards: React.FC<FormulaCardsProps> = ({
  selectedFormulaId,
  onSelectFormula
}) => {
  return (
    <section id="formules" className="py-12 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Nos 3 Formules Officielles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Choisissez la formule K-Box idéale
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            De la box surprise mystère à la box sur mesure gravée avec vos mots, trouvez le cadeau parfait pour célébrer vos êtres chers.
          </p>
        </div>

        {/* 3 Formula Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {FORMULAS.map((formula) => {
            const isSelected = selectedFormulaId === formula.id;
            const isBox3 = formula.id === 'kbox-3';
            const isBox2 = formula.id === 'kbox-2';
            const isBox1 = formula.id === 'kbox-1';

            return (
              <div
                key={formula.id}
                onClick={() => onSelectFormula(formula.id)}
                className={`relative flex flex-col rounded-2xl transition-all duration-200 cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'ring-2 ring-amber-600 bg-amber-50/20 shadow-lg -translate-y-1'
                    : 'border border-slate-200 bg-white hover:border-amber-300 hover:shadow-md'
                }`}
              >
                {/* Header Badge if any */}
                {formula.badge && (
                  <div className={`text-center py-1.5 text-xs font-bold uppercase tracking-wider ${
                    isBox3 
                      ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white' 
                      : 'bg-slate-900 text-amber-300'
                  }`}>
                    {formula.badge}
                  </div>
                )}

                <div className="p-6 sm:p-7 flex-1 flex flex-col">
                  {/* Title & Price */}
                  <div className="border-b border-slate-100 pb-5">
                    <h3 className="text-xl font-bold text-slate-900 mt-1">
                      {formula.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 min-h-[36px]">
                      {formula.subtitle}
                    </p>

                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        {formatFCFA(formula.basePrice)}
                      </span>
                      {formula.packagingFeeIncluded && (
                        <span className="text-[11px] text-slate-500">
                          (4 000f articles + 1 000f emballage & bénéfices)
                        </span>
                      )}
                    </div>

                    {/* Delivery condition badge */}
                    <div className="mt-3 flex items-center gap-1.5 text-xs">
                      {formula.freeDeliveryIncluded ? (
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <Truck className="w-3.5 h-3.5" />
                          Livraison Gratuite Offerte
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          <Truck className="w-3.5 h-3.5" />
                          Retrait Orca Déco gratuit ou livraison (+1 000f)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Highlights / Features */}
                  <div className="py-5 flex-1 space-y-3">
                    <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Caractéristiques :
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Sexe du destinataire & Couleur dominante</span>
                      </li>

                      {/* Content Selection Rule */}
                      {formula.allowsItemSelection ? (
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>Sélection des articles</strong> selon stock avec <strong>plafond strict de 4 000 FCFA</strong>
                          </span>
                        </li>
                      ) : (
                        <li className="flex items-start gap-2">
                          <Package className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          <span>Contenu surprise préparé avec soin par l'équipe K-Box</span>
                        </li>
                      )}

                      {/* Customization Rule */}
                      {formula.allowsCustomText ? (
                        <li className="flex items-start gap-2 bg-amber-50/80 p-2 rounded-lg border border-amber-200/80">
                          <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          <span className="text-amber-900 font-medium">
                            Personnalisation : sur l'emballage, un article ou les deux (mot à inscrire)
                          </span>
                        </li>
                      ) : (
                        <li className="flex items-start gap-2 text-slate-400">
                          <span className="w-4 text-center shrink-0">•</span>
                          <span>Sans gravure de texte personnalisé</span>
                        </li>
                      )}

                      {/* Anti-overdraft guarantee */}
                      {formula.itemBudgetCap && (
                        <li className="flex items-start gap-2 text-slate-600">
                          <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>Système de blocage automatique anti-dépassement à 4 000f</span>
                        </li>
                      )}

                      <li className="flex items-start gap-2">
                        <HeartHandshake className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Validation simplifiée via code KB24 & WhatsApp</span>
                      </li>
                    </ul>
                  </div>

                  {/* Select Button */}
                  <div className="pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectFormula(formula.id);
                        const el = document.getElementById('personnaliser');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        isSelected
                          ? 'bg-amber-800 text-white shadow-sm hover:bg-amber-900'
                          : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Formule Actuelle Sélectionnée</span>
                        </>
                      ) : (
                        <span>Choisir cette formule</span>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
