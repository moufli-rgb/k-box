import React, { useState } from 'react';
import { X, Database, RotateCcw, Plus, Package, Edit2, Check } from 'lucide-react';
import { GiftItem } from '../types';
import { INITIAL_GIFT_ITEMS } from '../data/mockData';
import { formatFCFA } from '../utils/helpers';

interface AdminStockModalProps {
  catalog: GiftItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateItemStock: (itemId: string, newStock: number) => void;
  onUpdateItemPrice: (itemId: string, newPrice: number) => void;
  onResetCatalog: () => void;
}

export const AdminStockModal: React.FC<AdminStockModalProps> = ({
  catalog,
  isOpen,
  onClose,
  onUpdateItemStock,
  onUpdateItemPrice,
  onResetCatalog
}) => {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);
  const [tempStock, setTempStock] = useState<number>(0);

  if (!isOpen) return null;

  const handleStartEdit = (item: GiftItem) => {
    setEditingItemId(item.id);
    setTempPrice(item.price);
    setTempStock(item.stock);
  };

  const handleSaveEdit = (itemId: string) => {
    onUpdateItemStock(itemId, tempStock);
    onUpdateItemPrice(itemId, tempPrice);
    setEditingItemId(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-300 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Gestion des Stocks & Articles K-Box
              </h2>
              <p className="text-xs text-slate-400">
                Ajustez les stocks et prix en temps réel pour tester le plafond strict de 4 000 FCFA.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onResetCatalog}
              title="Réinitialiser le catalogue par défaut"
              className="p-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Réinitialiser</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto divide-y divide-slate-100">
          <div className="pb-3 text-xs text-slate-500 flex justify-between font-bold uppercase tracking-wider">
            <span>Article & Catégorie</span>
            <span>Prix (FCFA) & Stock</span>
          </div>

          {catalog.map((item) => {
            const isEditing = editingItemId === item.id;

            return (
              <div key={item.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                    <p className="text-[11px] text-slate-400 truncate max-w-xs">{item.description}</p>
                  </div>
                </div>

                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Prix (f)</label>
                      <input
                        type="number"
                        step="100"
                        min="100"
                        value={tempPrice}
                        onChange={(e) => setTempPrice(Math.max(100, Number(e.target.value)))}
                        className="w-20 px-2 py-1 text-xs border border-slate-300 rounded"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Stock</label>
                      <input
                        type="number"
                        min="0"
                        value={tempStock}
                        onChange={(e) => setTempStock(Math.max(0, Number(e.target.value)))}
                        className="w-16 px-2 py-1 text-xs border border-slate-300 rounded"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSaveEdit(item.id)}
                      className="mt-4 p-1.5 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                      title="Enregistrer"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-900 block">
                        {formatFCFA(item.price)}
                      </span>
                      <span className={`text-[11px] font-medium ${item.stock <= 0 ? 'text-rose-600 font-bold' : 'text-slate-500'}`}>
                        {item.stock <= 0 ? 'Rupture' : `${item.stock} en stock`}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleStartEdit(item)}
                      className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded border border-slate-200 transition-colors"
                      title="Modifier prix et stock"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-xl"
          >
            Terminer
          </button>
        </div>

      </div>
    </div>
  );
};
