import React from 'react';
import { 
  Sparkles, 
  Gift, 
  Palette, 
  MapPin, 
  ShoppingCart, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { formatFCFA } from '../utils/helpers';

interface HowItWorksViewProps {
  onStartBuilder: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onStartBuilder }) => {
  const steps = [
    {
      num: '01',
      title: 'Choisissez votre formule K-Box',
      icon: Gift,
      description: 'Trois formules pensées pour chaque budget et chaque émotion :',
      points: [
        'K-Box 1 (3 000 FCFA) : Box Surprise délicate selon le sexe et la couleur choisie.',
        'K-Box 2 (5 000 FCFA) : Sélectionnez librement vos articles coup de cœur selon vos envies.',
        'K-Box 3 (10 000 FCFA) : Sélection d’articles + gravure de votre mot doux personnalisé + livraison offerte !'
      ]
    },
    {
      num: '02',
      title: 'Personnalisez selon vos envies',
      icon: Palette,
      description: 'Créez une composition sur-mesure et harmonieuse :',
      points: [
        'Pour femme, homme ou enfant.',
        'Couleurs proposées ou saisie libre de votre propre couleur.',
        'Événement suggéré (Anniversaire, Fête...) ou saisie libre de votre propre occasion.',
        'Sélectionnez et désélectionnez vos cadeaux à tout moment selon votre goût.'
      ]
    },
    {
      num: '03',
      title: 'Indiquez le mode de réception',
      icon: MapPin,
      description: 'Une remise en main soignée et adaptée :',
      points: [
        'Point Relais Orca Déco Jericho (Cotonou) : Retrait 100% gratuit.',
        'Livraison à domicile : Tarification douce selon votre quartier ou localisation (offerte avec la K-Box 3 à 10 000 FCFA).'
      ]
    },
    {
      num: '04',
      title: 'Terminez le processus & Ajoutez au panier',
      icon: ShoppingCart,
      description: 'Dès les étapes franchies, ajoutez votre coffret au panier :',
      points: [
        'Le badge de votre panier affiche 1 coffret prêt.',
        'Accédez à tous les détails complets de votre composition.',
        'Un code panier unique et officiel (ex: KB24) vous est attribué.'
      ]
    },
    {
      num: '05',
      title: 'Envoi direct à K-Box sur WhatsApp',
      icon: MessageSquare,
      description: 'Validez votre commande en un clic sur WhatsApp :',
      points: [
        'Cliquez sur « Envoyer votre panier à K-Box » depuis le panier.',
        'WhatsApp s’ouvre directement avec votre code de panier et le récapitulatif complet.',
        'Joignez votre code et capture de transaction afin d’enclencher la préparation et la livraison.'
      ]
    }
  ];

  return (
    <div className="w-full bg-[#FAF8F5] py-10 sm:py-16 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-[11px] uppercase tracking-widest font-semibold text-stone-500 flex items-center justify-center gap-1.5">
            <span className="text-amber-500">✦</span>
            <span>Guide pas à pas</span>
            <span className="text-amber-500">✦</span>
          </span>
          <h1 className="font-brand text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-light tracking-wide">
            Comment composer votre K<span className="text-amber-600/80 font-serif italic mx-0.5 font-normal">·</span>Box ?
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed font-light">
            Composer un coffret cadeau attentionné n’a jamais été aussi simple, doux et transparent.
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-xs hover:border-stone-300 transition-all flex flex-col md:flex-row gap-5 items-start"
              >
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-serif text-2xl font-bold text-stone-400">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2.5 flex-1">
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-stone-900">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600">
                    {step.description}
                  </p>
                  <ul className="space-y-1.5 pt-1">
                    {step.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust reminder */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200/80 flex items-center justify-center gap-2.5 text-xs text-stone-600 text-center">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>La préparation artisanale de votre coffret commence avec soin dès la transmission de votre panier.</span>
        </div>

        {/* Call to action */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onStartBuilder}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl text-xs sm:text-sm uppercase tracking-wider font-medium transition-all shadow-md active:scale-98 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Créer mon premier K-Box</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
