import React from 'react';
import { X, Package, MessageSquare, Copy, Check, FileCheck, ExternalLink, Sparkles } from 'lucide-react';
import { OrderRecord } from '../types';
import { formatFCFA, getWhatsAppUrl } from '../utils/helpers';

interface OrderHistoryModalProps {
  orders: OrderRecord[];
  isOpen: boolean;
  onClose: () => void;
  onSelectOrderToPay: (order: OrderRecord) => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  orders,
  isOpen,
  onClose,
  onSelectOrderToPay
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-amber-900/20 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-[#1C1410] text-white p-5 sm:p-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Package className="w-4 h-4" />
              <span>Historique Local</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-0.5">
              Mes Paniers & Commandes K-Box
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mx-auto">
                <Package className="w-7 h-7" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">Aucune commande enregistrée</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Personnalisez votre première box cadeau et cliquez sur « Valider mon panier » pour générer votre code de panier KB24.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const isCopied = copiedId === order.cartCode;
                const waUrl = getWhatsAppUrl(order);

                return (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-amber-300 transition-all bg-white shadow-2xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-extrabold text-amber-950 font-mono tracking-wider">
                            {order.cartCode}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyCode(order.cartCode)}
                            className="text-[10px] text-amber-800 hover:underline flex items-center gap-1"
                          >
                            {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            <span>{isCopied ? 'Copié' : 'Copier'}</span>
                          </button>
                        </div>
                        <p className="text-xs font-semibold text-slate-900 mt-0.5">
                          {order.formulaName}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-base font-extrabold text-slate-900">
                          {formatFCFA(order.totalAmount)}
                        </span>
                        <p className="text-[11px] text-slate-400">
                          {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Details list */}
                    <div className="text-xs text-slate-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Événement & Sexe :</span>
                        <span className="font-medium text-slate-900">{order.event} · {order.gender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Couleur dominante :</span>
                        <span className="font-medium text-slate-900">{order.colorName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Livraison :</span>
                        <span className="font-medium text-slate-900">
                          {order.deliveryType === 'orca_pickup' ? 'Point Relais Orca Déco' : `À domicile (${order.deliveryAddress})`}
                        </span>
                      </div>
                      {order.customization?.customText && (
                        <div className="p-2 bg-amber-50 rounded-lg text-amber-900 font-serif italic text-[11px]">
                          « {order.customization.customText} »
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectOrderToPay(order);
                        }}
                        className="text-xs font-semibold text-amber-800 hover:text-amber-950 underline"
                      >
                        Revoir modal de paiement & dépôt
                      </button>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Envoyer sur WhatsApp</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
