import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  MessageSquare, 
  Copy, 
  Check, 
  Gift, 
  Palette, 
  Calendar, 
  MapPin, 
  Sparkles,
  Phone,
  User
} from 'lucide-react';
import { CartState, FormulaConfig, OrderRecord } from '../types';
import { formatFCFA, getWhatsAppUrl } from '../utils/helpers';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartState;
  formula: FormulaConfig;
  cartCode: string;
  hasConfiguredBox: boolean;
  onNavigateToBuilder: () => void;
  onSendOrder: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  formula,
  cartCode,
  hasConfiguredBox,
  onNavigateToBuilder,
  onSendOrder
}) => {
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const isBox3 = formula.id === 'kbox-3';
  const totalItemsCount = cart.selectedItems.reduce((acc, i) => acc + i.quantity, 0);

  const displayEvent = cart.event === 'Autre' && cart.customEventText
    ? cart.customEventText
    : cart.event;

  const displayColor = cart.color.isCustom && cart.customColorText
    ? cart.customColorText
    : cart.color.name;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(cartCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSendToWhatsApp = () => {
    onSendOrder();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/40 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-stone-200">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-brand text-xl font-light text-stone-900 tracking-wide">
                  Votre Panier K<span className="text-amber-600/80 font-serif italic mx-0.5 font-normal">·</span>Box
                </h2>
                <span className="text-amber-500 text-xs">✦</span>
              </div>
              <span className="text-[11px] text-stone-500 block">
                {hasConfiguredBox ? '1 coffret configuré prêt' : 'Aucun coffret configuré'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-5">
          
          {hasConfiguredBox ? (
            <>
              {/* CODE UNIQUE DU PANIER */}
              <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-2xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block">
                    Code unique de votre panier
                  </span>
                  <span className="font-serif text-2xl font-bold tracking-wider text-stone-900">
                    {cartCode}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copié</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              </div>

              {/* DÉTAILS DE LA FORMULE */}
              <div className="p-5 bg-white rounded-2xl border border-stone-200/80 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div>
                    <h3 className="font-serif text-base font-medium text-stone-900">
                      {formula.name}
                    </h3>
                  </div>
                  <span className="font-serif text-lg font-bold text-stone-900">
                    {formatFCFA(formula.basePrice)}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-stone-600 divide-y divide-stone-50">
                  <div className="flex items-center justify-between pt-1">
                    <span className="flex items-center gap-1.5 text-stone-500">
                      <User className="w-3.5 h-3.5" />
                      <span>Destinataire :</span>
                    </span>
                    <span className="font-medium text-stone-900">{cart.gender}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="flex items-center gap-1.5 text-stone-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Événement :</span>
                    </span>
                    <span className="font-medium text-stone-900">{displayEvent}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="flex items-center gap-1.5 text-stone-500">
                      <Palette className="w-3.5 h-3.5" />
                      <span>Couleur dominante :</span>
                    </span>
                    <span className="font-medium text-stone-900">{displayColor}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="flex items-center gap-1.5 text-stone-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Mode de remise :</span>
                    </span>
                    <span className="font-medium text-stone-900">
                      {cart.delivery.type === 'orca_pickup'
                        ? 'Point Relais Orca Déco Jericho (Gratuit)'
                        : isBox3
                        ? 'Livraison à domicile (Offerte)'
                        : 'Livraison à domicile (Selon quartier)'}
                    </span>
                  </div>

                  {cart.delivery.recipientName && (
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-stone-500">Client / Destinataire :</span>
                      <span className="font-medium text-stone-900">{cart.delivery.recipientName}</span>
                    </div>
                  )}

                  {cart.delivery.phone && (
                    <div className="flex items-center justify-between pt-2">
                      <span className="flex items-center gap-1 text-stone-500">
                        <Phone className="w-3 h-3" />
                        <span>Téléphone :</span>
                      </span>
                      <span className="font-medium font-mono text-stone-900">{cart.delivery.phone}</span>
                    </div>
                  )}

                  {cart.delivery.type === 'home_delivery' && cart.delivery.address && (
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-stone-500">Adresse / Quartier :</span>
                      <span className="font-medium text-stone-900">{cart.delivery.address}</span>
                    </div>
                  )}
                </div>

                {/* Mot à inscrire pour K-Box 3 */}
                {isBox3 && cart.customization?.customText && (
                  <div className="p-3 bg-stone-50 rounded-xl text-stone-800 text-xs border border-stone-200/70 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                      Mot doux personnalisé ({cart.customization.target === 'packaging' ? 'Emballage' : cart.customization.target === 'item' ? 'Article' : 'Les deux'})
                    </span>
                    <p className="italic font-serif text-stone-900">
                      « {cart.customization.customText} »
                    </p>
                  </div>
                )}
              </div>

              {/* ARTICLES SÉLECTIONNÉS (Jusqu'à 4) */}
              {formula.allowsItemSelection && cart.selectedItems.length > 0 && (
                <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                      Articles inclus ({totalItemsCount} / 4)
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                      Tarif formule respecté
                    </span>
                  </div>

                  <div className="divide-y divide-stone-100 text-xs text-stone-700">
                    {cart.selectedItems.map(({ item, quantity }) => (
                      <div key={item.id} className="py-2.5 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-8 h-8 rounded-lg object-cover border border-stone-200 shrink-0" 
                          />
                          <span className="truncate">{item.name}</span>
                        </div>
                        <span className="font-semibold text-stone-900 shrink-0">x{quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modifier la box */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToBuilder();
                  }}
                  className="text-xs text-stone-500 hover:text-stone-900 underline font-medium cursor-pointer"
                >
                  Modifier les options de cette box dans l'atelier
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-16 space-y-4">
              <Gift className="w-12 h-12 text-stone-300 mx-auto" />
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-medium text-stone-900">
                  Votre panier est vide
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Composez votre premier coffret dans l'onglet « Faire mon K-Box » puis ajoutez-le au panier.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToBuilder();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <span>Faire mon K-Box</span>
              </button>
            </div>
          )}

        </div>

        {/* BOTTOM ACTION BUTTONS: 
            "non le bouton est a coté en bas acoté du x en bas"
            Placed side by side at the bottom!
        */}
        {hasConfiguredBox && (
          <div className="p-4 sm:p-5 bg-white border-t border-stone-200 space-y-3">
            <div className="flex justify-between items-baseline px-1">
              <span className="font-serif text-sm font-medium text-stone-600">Total Formule :</span>
              <span className="font-serif text-2xl font-bold text-stone-900">
                {formatFCFA(formula.basePrice)}
              </span>
            </div>

            {/* Buttons side by side at the bottom */}
            <div className="flex items-center gap-3">
              {/* Close button with (X.) */}
              <button
                type="button"
                onClick={onClose}
                className="py-3.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <div className="flex items-baseline">
                  <X className="w-4 h-4 translate-y-[2px]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-700 ml-0.5 inline-block" />
                </div>
                <span>Fermer</span>
              </button>

              {/* Main Action Button */}
              <button
                type="button"
                onClick={handleSendToWhatsApp}
                className="flex-1 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-sm active:scale-98 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="truncate">Envoyer votre panier à K-Box</span>
              </button>
            </div>

            <p className="text-[11px] text-stone-400 text-center">
              Code <strong>{cartCode}</strong> transmis avec tous vos détails sur WhatsApp
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
