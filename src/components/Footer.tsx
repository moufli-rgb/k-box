import React from 'react';
import { MapPin, Clock, MessageSquare, Heart } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-100 text-stone-600 pt-14 pb-10 border-t border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-stone-200">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-baseline select-none gap-1">
              <span className="font-serif tracking-[0.18em] text-2xl font-bold text-stone-900 leading-none">
                K-BOX
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-stone-900 inline-block shrink-0 align-baseline" />
            </div>
            <p className="text-xs text-stone-500 leading-relaxed max-w-sm pt-1">
              Confection de coffret surprises et cadeaux sur mesure pour tous vos événements marquants, préparés avec délicatesse et bienveillance.
            </p>
          </div>

          {/* Point Relais Orca Déco */}
          <div className="space-y-2.5 text-xs text-stone-600">
            <h4 className="font-serif text-sm font-medium text-stone-900">
              Retrait Partenaire
            </h4>
            <div className="flex items-start gap-2 pt-1">
              <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
              <span>
                <strong>Point Relais Gratuit :</strong><br />
                {BUSINESS_CONFIG.pickupLocation}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
              <span>Du Lundi au Samedi de 09h00 à 19h30</span>
            </div>
          </div>

          {/* Contact & WhatsApp */}
          <div className="space-y-3 text-xs text-stone-600">
            <h4 className="font-serif text-sm font-medium text-stone-900">
              Service Client
            </h4>
            <p className="text-stone-500">
              Assistance personnalisée et envoi de vos paniers directement via WhatsApp.
            </p>
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappRawPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-medium transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp : {BUSINESS_CONFIG.phone}</span>
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-2">
          <p>© {new Date().getFullYear()} K-Box. Tous droits réservés.</p>
          <div className="flex items-center gap-1 text-stone-500">
            <span>Imaginé avec calme et douceur</span>
            <Heart className="w-3 h-3 text-stone-400 fill-stone-400" />
          </div>
        </div>

      </div>
    </footer>
  );
};
