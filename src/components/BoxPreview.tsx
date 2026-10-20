import React from 'react';
import { Sparkles, Eye, HelpCircle } from 'lucide-react';
import { CartState, FormulaConfig } from '../types';

interface BoxPreviewProps {
  cart: CartState;
  formula: FormulaConfig;
  itemsTotal: number;
  itemBudgetRemaining: number;
}

export const BoxPreview: React.FC<BoxPreviewProps> = ({
  cart,
  formula,
  itemsTotal
}) => {
  const { color, gender, event, selectedItems, customization } = cart;
  const isBox1 = formula.id === 'kbox-1';
  const isBox3 = formula.id === 'kbox-3';

  return (
    <div className="bg-white rounded-3xl border border-stone-200/80 shadow-2xs p-5 sm:p-6 sticky top-24 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-1.5 text-stone-700">
          <Eye className="w-4 h-4 text-stone-500" />
          <h3 className="font-serif text-xs font-semibold uppercase tracking-wider">
            Aperçu de votre Box
          </h3>
        </div>
        <span className="text-[10px] font-semibold text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded-full">
          {formula.name}
        </span>
      </div>

      {/* 2.5D Realistic Box Simulator with gentle tones */}
      <div 
        className="relative rounded-2xl overflow-hidden p-6 flex flex-col items-center justify-center min-h-[220px] transition-colors duration-500"
        style={{
          background: `radial-gradient(circle at center, ${color.secondaryHex} 30%, #F5F3EF 100%)`
        }}
      >
        {/* Box Container */}
        <div 
          className="relative w-44 sm:w-48 h-44 sm:h-48 rounded-2xl shadow-xl transition-all duration-500 flex flex-col items-center justify-center border border-white/50"
          style={{
            backgroundColor: color.hex,
            boxShadow: `0 16px 30px -10px ${color.hex}60, 0 0 10px rgba(0,0,0,0.08)`
          }}
        >
          {/* Ribbons */}
          <div 
            className="absolute top-0 bottom-0 w-7 shadow-xs"
            style={{ 
              backgroundColor: color.ribbonHex,
              boxShadow: 'inset 0 0 6px rgba(0,0,0,0.2)' 
            }}
          />
          <div 
            className="absolute left-0 right-0 h-7 shadow-xs"
            style={{ 
              backgroundColor: color.ribbonHex,
              boxShadow: 'inset 0 0 6px rgba(0,0,0,0.2)' 
            }}
          />

          {/* Central Ribbon Bow */}
          <div 
            className="absolute z-20 w-10 h-10 rounded-full flex items-center justify-center shadow-md border border-white/30"
            style={{ backgroundColor: color.ribbonHex }}
          >
            <Sparkles className="w-4 h-4 text-white drop-shadow-xs" />
          </div>

          {/* Event Tag */}
          <div className="absolute top-2.5 left-2.5 z-10 bg-white/95 text-stone-800 px-2 py-0.5 rounded text-[10px] font-medium shadow-xs border border-stone-200">
            {event}
          </div>

          {/* Gender tag */}
          <div className="absolute top-2.5 right-2.5 z-10 bg-stone-900/80 text-white px-2 py-0.5 rounded text-[9px] font-medium">
            {gender}
          </div>

          {/* Custom Message Badge on the box (K-Box 3) */}
          {isBox3 && customization?.customText && (
            <div className="absolute bottom-2.5 z-20 max-w-[85%] bg-stone-900/90 text-stone-100 border border-white/20 px-2.5 py-1 rounded-lg text-center shadow-md backdrop-blur-xs">
              <p className="text-[7px] uppercase tracking-wider text-stone-400 font-medium">
                {customization.target === 'packaging' && 'Gravé sur l’emballage'}
                {customization.target === 'item' && 'Inscrit sur l’article'}
                {customization.target === 'both' && 'Emballage & Article'}
              </p>
              <p className="text-[10px] font-serif italic truncate text-white">
                « {customization.customText} »
              </p>
            </div>
          )}

          {/* Box 1 Mystery Watermark */}
          {isBox1 && (
            <div className="absolute z-10 text-white/35 flex flex-col items-center">
              <HelpCircle className="w-10 h-10" />
              <span className="text-[10px] font-medium text-white/70 tracking-wider uppercase mt-1">
                Surprise
              </span>
            </div>
          )}
        </div>

        {/* Selected Items Mini Badges */}
        {!isBox1 && selectedItems.length > 0 && (
          <div className="mt-3.5 z-10 flex flex-wrap items-center justify-center gap-1.5 max-w-full">
            {selectedItems.map(({ item, quantity }) => (
              <span
                key={item.id}
                className="bg-white/90 text-stone-700 text-[10px] font-medium px-2 py-0.5 rounded-full border border-stone-200/80 shadow-2xs flex items-center gap-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                <span className="truncate max-w-[100px]">{item.name}</span>
                {quantity > 1 && <span className="font-bold text-stone-900">x{quantity}</span>}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="space-y-1.5 text-xs text-stone-500 pt-1">
        <div className="flex justify-between">
          <span>Couleur dominante :</span>
          <span className="font-medium text-stone-800">{color.name}</span>
        </div>
        <div className="flex justify-between">
          <span>Destinataire :</span>
          <span className="font-medium text-stone-800">{gender}</span>
        </div>
        <div className="flex justify-between">
          <span>Événement :</span>
          <span className="font-medium text-stone-800">{event}</span>
        </div>
        <div className="flex justify-between">
          <span>Réception :</span>
          <span className="font-medium text-stone-800">
            {cart.delivery.type === 'orca_pickup' ? 'Orca Déco (Gratuit)' : 'Livraison à domicile'}
          </span>
        </div>
      </div>
    </div>
  );
};
