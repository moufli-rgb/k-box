import React from 'react';
import { Sparkles, ShoppingBag, Smartphone, Truck, MessageSquare } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/mockData';

export const HowItWorks: React.FC = () => {
  return (
    <section id="comment-ca-marche" className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Processus Simple & Transparent</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Comment fonctionne K-Box ?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            De la composition de votre coffret à la livraison, suivez les 4 étapes simples.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          {/* Step 1 */}
          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-amber-900/10 flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center font-extrabold text-sm mb-3">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Choisissez votre formule
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Optez pour <strong>K-Box 1</strong> (Surprise à 3 000f), <strong>K-Box 2</strong> (Semi-personnalisée à 5 000f) ou <strong>K-Box 3</strong> (Gravée & Livraison offerte à 5 000f).
              </p>
            </div>
            <span className="text-[11px] font-semibold text-amber-800">
              Formules adaptées à votre budget
            </span>
          </div>

          {/* Step 2 */}
          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-amber-900/10 flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center font-extrabold text-sm mb-3">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Personnalisez la Box
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Sélectionnez le sexe, la couleur dominante et vos articles (plafond strict garanti de 4 000f). Inscrivez votre mot doux si K-Box 3.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-amber-800">
              Blocage automatique anti-dépassement
            </span>
          </div>

          {/* Step 3 */}
          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-amber-900/10 flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center font-extrabold text-sm mb-3">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Code KB24 & Dépôt
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                À la validation, recevez votre code de panier (ex: <strong>KB24</strong>). Effectuez le dépôt correspondant via Wave, Orange, MTN ou Moov Money.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-amber-800">
              Capture de transaction auprès de l’opérateur
            </span>
          </div>

          {/* Step 4 */}
          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-amber-900/10 flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center font-extrabold text-sm mb-3">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Envoi WhatsApp & Réception
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Cliquez sur le bouton pour joindre votre code et capture sur WhatsApp. Retrait gratuit à <strong>Orca Déco</strong> ou livraison rapide !
              </p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700">
              Livraison enclenchée immédiatement
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
