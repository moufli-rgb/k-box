import React from 'react';
import { Gift, ShieldCheck, Heart, Sparkles, Truck, CheckCircle2 } from 'lucide-react';
import { formatFCFA } from '../utils/helpers';

interface HeroProps {
  onSelectFormula: (id: 'kbox-1' | 'kbox-2' | 'kbox-3') => void;
  onScrollToCustomizer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectFormula, onScrollToCustomizer }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-50/60 via-[#FAF8F5] to-white border-b border-amber-900/5 py-12 lg:py-16">
      {/* Subtle decorative background circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-200/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-rose-200/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-semibold rounded-full tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Célébrez chaque instant précieux avec K-Box</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
              Offrez l’inattendu. <br />
              <span className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-950 bg-clip-text text-transparent italic">
                Des coffrets d'exception
              </span> pour vos événements.
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
              Spécialiste de la vente de box surprises et cadeaux sur mesure pour{' '}
              <strong className="text-slate-900 font-semibold">anniversaires, Saint-Valentin, Noël, réussites d'examens et déclarations</strong>. 
              Choisissez votre formule, personnalisez les couleurs et le contenu, puis validez simplement par WhatsApp.
            </p>

            {/* Value Props Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 bg-white rounded-xl border border-amber-900/10 shadow-2xs">
                <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider mb-1">
                  <Gift className="w-4 h-4" />
                  <span>Dès 3 000 FCFA</span>
                </div>
                <p className="text-xs text-slate-600">Box surprise ou sur mesure avec emballage luxe inclus.</p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-amber-900/10 shadow-2xs">
                <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
                  <Truck className="w-4 h-4" />
                  <span>Retrait Gratuit</span>
                </div>
                <p className="text-xs text-slate-600">À récupérer à <strong>Orca Déco</strong> ou livraison à domicile.</p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-amber-900/10 shadow-2xs">
                <div className="flex items-center gap-2 text-rose-800 text-xs font-bold uppercase tracking-wider mb-1">
                  <Heart className="w-4 h-4" />
                  <span>Personnalisation</span>
                </div>
                <p className="text-xs text-slate-600">Mot à inscrire sur l’emballage, l’article ou les deux (Box 3).</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => {
                  onSelectFormula('kbox-3');
                  onScrollToCustomizer();
                }}
                className="px-6 py-3.5 bg-gradient-to-r from-amber-700 to-amber-900 text-white font-semibold text-sm rounded-xl shadow-md shadow-amber-950/20 hover:from-amber-800 hover:to-amber-950 transition-all flex items-center gap-2 transform active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Composer ma K-Box 3 (5 000 FCFA)</span>
              </button>

              <button
                onClick={() => {
                  onSelectFormula('kbox-1');
                  onScrollToCustomizer();
                }}
                className="px-5 py-3.5 bg-white border border-slate-300 text-slate-800 font-semibold text-sm rounded-xl hover:bg-slate-50 transition-colors"
              >
                Box Surprise (3 000 FCFA)
              </button>
            </div>

            {/* Trust checkmarks */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 pt-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Plafond strict de 4 000 FCFA garanti</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Dépôt sécurisé Wave & Mobile Money</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Code de panier KB24 immédiat</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Banner */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-gradient-to-b from-[#2B1B17] to-[#160E0B] p-6 rounded-2xl shadow-xl text-white border border-amber-500/20">
              
              {/* Gold decorative corner */}
              <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                    Coffret Cadeau K-Box 3
                  </span>
                </div>
                <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded font-medium">
                  Édition Prestige
                </span>
              </div>

              {/* Box presentation preview image */}
              <div className="relative my-4 rounded-xl overflow-hidden aspect-4/3 bg-black/40 border border-amber-500/30 group">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80"
                  alt="K-Box Coffret Cadeau de Luxe"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                
                {/* Floating tags */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 p-4 flex flex-col justify-between">
                  <div className="self-end">
                    <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/40 rounded-full text-[11px] font-bold">
                      Livraison Offerte
                    </span>
                  </div>
                  <div>
                    <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase block">
                      Exemple de personnalisation :
                    </span>
                    <p className="text-white text-sm font-serif italic">
                      « Joyeux Anniversaire Sarah, tout mon amour ❤️ »
                    </p>
                  </div>
                </div>
              </div>

              {/* Mini Quick selector cards */}
              <div className="space-y-2 text-xs">
                <div 
                  onClick={() => { onSelectFormula('kbox-1'); onScrollToCustomizer(); }}
                  className="flex items-center justify-between p-2.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors cursor-pointer"
                >
                  <div>
                    <p className="font-semibold text-white">K-Box 1 : Box Surprise</p>
                    <p className="text-slate-400 text-[11px]">Sexe, couleur dominante, retrait Orca déco ou livraison</p>
                  </div>
                  <span className="font-bold text-amber-300">{formatFCFA(3000)}</span>
                </div>

                <div 
                  onClick={() => { onSelectFormula('kbox-2'); onScrollToCustomizer(); }}
                  className="flex items-center justify-between p-2.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors cursor-pointer"
                >
                  <div>
                    <p className="font-semibold text-white">K-Box 2 : Box Semi-Personnalisée</p>
                    <p className="text-slate-400 text-[11px]">Choix d'articles avec plafond strict 4 000f</p>
                  </div>
                  <span className="font-bold text-amber-300">{formatFCFA(5000)}</span>
                </div>

                <div 
                  onClick={() => { onSelectFormula('kbox-3'); onScrollToCustomizer(); }}
                  className="flex items-center justify-between p-2.5 bg-amber-500/15 border border-amber-500/40 rounded-lg transition-colors cursor-pointer ring-1 ring-amber-400/30"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold text-amber-200">K-Box 3 : Box Personnalisée</p>
                      <span className="text-[10px] bg-amber-400 text-slate-900 px-1 py-0.2 rounded font-bold">Top</span>
                    </div>
                    <p className="text-amber-100/70 text-[11px]">Gravure mot sur mesure + Livraison offerte</p>
                  </div>
                  <span className="font-bold text-amber-300">{formatFCFA(5000)}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Service client réactif 7j/7
                </span>
                <span>Code Panier KB24 instantané</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
