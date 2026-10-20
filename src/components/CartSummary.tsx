import React from 'react';
import { ShoppingBag, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { CartState, FormulaConfig } from '../types';
import { formatFCFA } from '../utils/helpers';

interface CartSummaryProps {
  cart: CartState;
  formula: FormulaConfig;
  itemsTotal: number;
  basePrice: number;
  deliveryFee: number;
  grandTotal: number;
  onValidateCart: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  cart,
  formula,
  itemsTotal,
  basePrice,
  deliveryFee,
  grandTotal,
  onValidateCart
}) => {
  const isBox3 = formula.id === 'kbox-3';
  const isBox2 = formula.id === 'kbox-2';
  const isBox1 = formula.id === 'kbox-1';

  return (
    <div className="bg-white rounded-2xl border border-amber-900/10 shadow-md p-5 sm:p-6 mt-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-amber-700" />
          Récapitulatif & Panier
        </h3>
        <span className="text-xs font-bold text-amber-800">
          {formula.name}
        </span>
      </div>

      <div className="py-4 space-y-2.5 text-xs text-slate-600">
        {/* Formule Base Cost */}
        <div className="flex justify-between items-center">
          <span>{formula.name} :</span>
          <span className="font-bold text-slate-900">{formatFCFA(basePrice)}</span>
        </div>

        {/* Breakdown for Box 2 and Box 3 */}
        {(isBox2 || isBox3) && (
          <div className="pl-3 border-l-2 border-amber-200 space-y-1 text-[11px] text-slate-500">
            <div className="flex justify-between">
              <span>Articles sélectionnés :</span>
              <span>{formatFCFA(itemsTotal)} / 4 000 FCFA</span>
            </div>
            <div className="flex justify-between">
              <span>Emballage de luxe & bénéfices :</span>
              <span>1 000 FCFA</span>
            </div>
          </div>
        )}

        {/* Customization item badge */}
        {isBox3 && cart.customization?.customText && (
          <div className="flex justify-between items-center text-amber-900 bg-amber-50/80 p-2 rounded-lg border border-amber-200">
            <span className="flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Personnalisation (Mot) :
            </span>
            <span className="font-semibold text-[11px] text-emerald-700">Inclus (0 FCFA)</span>
          </div>
        )}

        {/* Delivery fee */}
        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
          <span>
            {cart.delivery.type === 'orca_pickup' 
              ? 'Retrait à Orca Déco :' 
              : 'Livraison à domicile :'}
          </span>
          <span className={`font-bold ${deliveryFee === 0 ? 'text-emerald-700' : 'text-slate-900'}`}>
            {deliveryFee === 0 ? 'Gratuit (0 FCFA)' : formatFCFA(deliveryFee)}
          </span>
        </div>

        {/* Grand Total */}
        <div className="pt-3 border-t-2 border-slate-900 flex justify-between items-baseline">
          <span className="text-sm font-bold text-slate-900">Total à déposer :</span>
          <span className="text-2xl font-black text-amber-900 tracking-tight">
            {formatFCFA(grandTotal)}
          </span>
        </div>
      </div>

      {/* Primary Validation Button */}
      <button
        type="button"
        onClick={onValidateCart}
        className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shadow-amber-950/20 transition-all flex items-center justify-center gap-2 transform active:scale-98 cursor-pointer"
      >
        <span>Valider mon panier</span>
        <ArrowRight className="w-4 h-4 text-amber-200" />
      </button>

      {/* Guarantees */}
      <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Code de panier <strong>KB24</strong> généré immédiatement</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Dépôt Mobile Money direct sécurisé (Wave, Orange, MTN, Moov)</span>
        </div>
      </div>
    </div>
  );
};
