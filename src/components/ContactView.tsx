import React from 'react';
import { MessageSquare, Phone, MapPin, Clock, Heart, Send } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/mockData';

export const ContactView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 animate-fade-in">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-[11px] font-semibold tracking-widest uppercase text-stone-500 block">
          À votre écoute
        </span>
        <div className="inline-flex items-baseline justify-center">
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium tracking-tight">
            Contactez K-BOX
          </h1>
          <span className="w-1.5 h-1.5 rounded-full bg-stone-900 ml-1 inline-block self-end mb-1" />
        </div>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-1">
          Une question sur une formule ou un événement particulier ? Notre équipe vous répond avec plaisir.
        </p>
      </div>

      {/* Main Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* WhatsApp Card */}
        <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-stone-900">
              Échange direct sur WhatsApp
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Le moyen le plus rapide pour envoyer vos captures de dépôt, confirmer vos adresses ou poser vos questions.
            </p>
          </div>

          <a
            href={`https://wa.me/${BUSINESS_CONFIG.whatsappRawPhone}?text=${encodeURIComponent('Bonjour K-Box, je souhaite avoir des informations sur vos box cadeaux.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-xs active:scale-98"
          >
            <Send className="w-4 h-4" />
            <span>Discuter sur WhatsApp</span>
          </a>
        </div>

        {/* Orca Déco Pickup Card */}
        <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-stone-900">
              Retrait gratuit à Orca Déco
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong>Point Relais Partenaire :</strong><br />
              {BUSINESS_CONFIG.pickupLocation}
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-500 pt-1">
              <Clock className="w-4 h-4 text-stone-400 shrink-0" />
              <span>Lundi au Samedi : 09h00 – 19h30</span>
            </div>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl text-[11px] text-stone-500 border border-stone-200/60">
            ✓ Votre colis vous attend emballé avec soin dès validation de votre commande.
          </div>
        </div>

      </div>

      {/* Customer service phone numbers */}
      <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-center space-y-2">
        <p className="text-xs font-semibold text-stone-700">
          Téléphone & Service Client K-Box :
        </p>
        <p className="text-sm font-bold text-stone-900 font-mono">
          {BUSINESS_CONFIG.phone}
        </p>
        <p className="text-[11px] text-stone-400">
          Disponible 7j/7 pour vous accompagner dans la confection de vos surprises.
        </p>
      </div>

    </div>
  );
};
