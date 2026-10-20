import React, { useState } from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  CheckCircle, 
  ShoppingBag, 
  Truck, 
  MapPin, 
  Plus, 
  Minus, 
  Trash2, 
  Palette, 
  User, 
  Calendar, 
  PenTool,
  Lock,
  Search,
  Filter
} from 'lucide-react';
import { 
  CartState, 
  DominantColor, 
  EventType, 
  FormulaConfig, 
  Gender, 
  GiftItem, 
  CustomizationTarget, 
  DeliveryType 
} from '../types';
import { DOMINANT_COLORS, EVENTS } from '../data/mockData';
import { formatFCFA } from '../utils/helpers';

interface BoxCustomizerProps {
  cart: CartState;
  formula: FormulaConfig;
  catalog: GiftItem[];
  itemsTotal: number;
  itemBudgetRemaining: number;
  isBudgetCapReached: boolean;
  onUpdateCart: (updater: (prev: CartState) => CartState) => void;
  onValidateCart: () => void;
}

export const BoxCustomizer: React.FC<BoxCustomizerProps> = ({
  cart,
  formula,
  catalog,
  itemsTotal,
  itemBudgetRemaining,
  isBudgetCapReached,
  onUpdateCart,
  onValidateCart
}) => {
  const [activeTab, setActiveTab] = useState<'options' | 'articles' | 'customization' | 'delivery'>('options');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const isBox1 = formula.id === 'kbox-1';
  const isBox2 = formula.id === 'kbox-2';
  const isBox3 = formula.id === 'kbox-3';

  // Categories list
  const categories = ['all', ...Array.from(new Set(catalog.map((i) => i.category)))];

  const filteredItems = catalog.filter((item) => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handlers for cart customization
  const setGender = (gender: Gender) => {
    onUpdateCart((prev) => ({ ...prev, gender }));
  };

  const setEvent = (event: EventType) => {
    onUpdateCart((prev) => ({ ...prev, event }));
  };

  const setColor = (color: DominantColor) => {
    onUpdateCart((prev) => ({ ...prev, color }));
  };

  const setDeliveryType = (type: DeliveryType) => {
    onUpdateCart((prev) => {
      let fee = 0;
      if (type === 'home_delivery') {
        fee = formula.freeDeliveryIncluded ? 0 : 1000;
      }
      return {
        ...prev,
        delivery: {
          ...prev.delivery,
          type,
          fee
        }
      };
    });
  };

  // Item management with strict 4000f budget cap enforcement
  const addItem = (item: GiftItem) => {
    if (!formula.itemBudgetCap) return;

    // Check if adding this item would exceed the 4000 FCFA budget limit
    if (itemsTotal + item.price > formula.itemBudgetCap) {
      return; // strictly blocked!
    }

    onUpdateCart((prev) => {
      const existing = prev.selectedItems.find((entry) => entry.item.id === item.id);
      if (existing) {
        return {
          ...prev,
          selectedItems: prev.selectedItems.map((entry) =>
            entry.item.id === item.id
              ? { ...entry, quantity: entry.quantity + 1 }
              : entry
          )
        };
      } else {
        return {
          ...prev,
          selectedItems: [...prev.selectedItems, { item, quantity: 1 }]
        };
      }
    });
  };

  const removeItem = (itemId: string) => {
    onUpdateCart((prev) => {
      const existing = prev.selectedItems.find((entry) => entry.item.id === itemId);
      if (!existing) return prev;

      if (existing.quantity > 1) {
        return {
          ...prev,
          selectedItems: prev.selectedItems.map((entry) =>
            entry.item.id === itemId
              ? { ...entry, quantity: entry.quantity - 1 }
              : entry
          )
        };
      } else {
        return {
          ...prev,
          selectedItems: prev.selectedItems.filter((entry) => entry.item.id !== itemId)
        };
      }
    });
  };

  const deleteItem = (itemId: string) => {
    onUpdateCart((prev) => ({
      ...prev,
      selectedItems: prev.selectedItems.filter((entry) => entry.item.id !== itemId)
    }));
  };

  // Customization fields (Box 3)
  const setCustomTarget = (target: CustomizationTarget) => {
    onUpdateCart((prev) => ({
      ...prev,
      customization: {
        target,
        customText: prev.customization?.customText || '',
        targetItemId: prev.customization?.targetItemId
      }
    }));
  };

  const setCustomText = (customText: string) => {
    onUpdateCart((prev) => ({
      ...prev,
      customization: {
        target: prev.customization?.target || 'packaging',
        customText,
        targetItemId: prev.customization?.targetItemId
      }
    }));
  };

  const setCustomItemTarget = (targetItemId: string) => {
    onUpdateCart((prev) => ({
      ...prev,
      customization: {
        target: prev.customization?.target || 'item',
        customText: prev.customization?.customText || '',
        targetItemId
      }
    }));
  };

  return (
    <section id="personnaliser" className="py-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Tabs between customization steps */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs mb-8">
          <button
            onClick={() => setActiveTab('options')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'options'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span>1. Sexe & Couleur</span>
          </button>

          {formula.allowsItemSelection && (
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 relative ${
                activeTab === 'articles'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>2. Articles (Plafond 4 000f)</span>
              {cart.selectedItems.length > 0 && (
                <span className="text-[10px] bg-amber-200 text-amber-950 px-1.5 py-0.2 rounded-full font-bold">
                  {cart.selectedItems.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              )}
            </button>
          )}

          {isBox3 && (
            <button
              onClick={() => setActiveTab('customization')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'customization'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <PenTool className="w-4 h-4" />
              <span>3. Personnalisation (Mot)</span>
              {cart.customization?.customText && (
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              )}
            </button>
          )}

          <button
            onClick={() => setActiveTab('delivery')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'delivery'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>{isBox1 ? '2. Livraison' : isBox3 ? '4. Livraison' : '3. Livraison'}</span>
          </button>
        </div>

        {/* Tab 1: Sexe, Événement et Couleur Dominante */}
        {activeTab === 'options' && (
          <div className="space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            
            {/* Step Header */}
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Étape Initiale
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                Destinataire & Ambiance de votre Coffret
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Personnalisez la thématique de la box selon la personne et l'événement à célébrer.
              </p>
            </div>

            {/* Sexe du destinataire */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                1. Sexe du Destinataire <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Femme', 'Homme', 'Enfant / Mixte'] as Gender[]).map((genderOption) => {
                  const isChecked = cart.gender === genderOption;
                  return (
                    <button
                      key={genderOption}
                      type="button"
                      onClick={() => setGender(genderOption)}
                      className={`p-4 rounded-xl border text-center font-semibold text-sm transition-all flex flex-col items-center justify-center gap-1.5 ${
                        isChecked
                          ? 'border-amber-700 bg-amber-50 text-amber-900 ring-2 ring-amber-600/30 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <User className={`w-5 h-5 ${isChecked ? 'text-amber-700' : 'text-slate-400'}`} />
                      <span>{genderOption}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Événement */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                2. Événement à fêter <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {EVENTS.map((eventItem) => {
                  const isChecked = cart.event === eventItem.id;
                  return (
                    <button
                      key={eventItem.id}
                      type="button"
                      onClick={() => setEvent(eventItem.id)}
                      className={`p-3 rounded-xl border text-left font-medium text-xs transition-all flex items-center gap-2.5 ${
                        isChecked
                          ? 'border-amber-700 bg-amber-50 text-amber-900 ring-1 ring-amber-600/40 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-lg">{eventItem.icon}</span>
                      <span className="truncate">{eventItem.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Couleur dominante */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  3. Couleur Dominante du Cadeau <span className="text-rose-500">*</span>
                </label>
                <span className="text-xs font-semibold text-amber-800">
                  Choisie : {cart.color.name}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {DOMINANT_COLORS.map((col) => {
                  const isChecked = cart.color.id === col.id;
                  return (
                    <div
                      key={col.id}
                      onClick={() => setColor(col)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                        isChecked
                          ? 'border-amber-700 bg-amber-50/50 ring-2 ring-amber-600/30 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {/* Color swatch */}
                      <div 
                        className="w-10 h-10 rounded-lg shadow-sm border border-black/10 shrink-0 flex items-center justify-center relative overflow-hidden"
                        style={{ backgroundColor: col.hex }}
                      >
                        {/* Little ribbon indicator */}
                        <div 
                          className="absolute w-2 h-full"
                          style={{ backgroundColor: col.ribbonHex }}
                        />
                        {isChecked && <CheckCircle className="w-5 h-5 text-white drop-shadow z-10" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {col.name}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {col.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Step Button */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (formula.allowsItemSelection) {
                    setActiveTab('articles');
                  } else {
                    setActiveTab('delivery');
                  }
                }}
                className="px-6 py-2.5 bg-amber-800 text-white rounded-xl text-xs font-semibold hover:bg-amber-900 transition-colors shadow-xs"
              >
                {formula.allowsItemSelection ? 'Continuer : Sélection des Articles →' : 'Continuer vers la Livraison →'}
              </button>
            </div>

          </div>
        )}

        {/* Tab 2: Articles & Strict 4000f Cap Enforcement (K-Box 2 & 3) */}
        {activeTab === 'articles' && formula.allowsItemSelection && (
          <div className="space-y-6">
            
            {/* Real-time Budget Bar Sticky Alert */}
            <div className={`p-4 rounded-2xl border shadow-xs transition-colors ${
              isBudgetCapReached
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : itemBudgetRemaining < 1000
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Plafond Garanti : 4 000 FCFA
                    </span>
                    {isBudgetCapReached && (
                      <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Plafond Atteint
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {isBudgetCapReached 
                      ? '🎯 Votre plafond de 4 000f est atteint ! La plateforme bloque tout ajout supplémentaire pour respecter votre formule.'
                      : `Sélectionnez vos articles selon le stock disponible. Vous disposez encore de ${formatFCFA(itemBudgetRemaining)} de marge.`}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xl font-extrabold tracking-tight">
                    {formatFCFA(itemsTotal)}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold block">
                    / 4 000 FCFA max
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-slate-200 rounded-full mt-3 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    isBudgetCapReached ? 'bg-emerald-600' : 'bg-amber-700'
                  }`}
                  style={{ width: `${Math.min(100, (itemsTotal / 4000) * 100)}%` }}
                />
              </div>
            </div>

            {/* Selected Items Tray */}
            {cart.selectedItems.length > 0 ? (
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Articles Actuellement dans la Box ({cart.selectedItems.reduce((a, b) => a + b.quantity, 0)})
                  </h4>
                  <span className="text-xs font-bold text-amber-800">
                    Sous-total : {formatFCFA(itemsTotal)}
                  </span>
                </div>

                <div className="divide-y divide-slate-100 mt-2">
                  {cart.selectedItems.map(({ item, quantity }) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{item.name}</p>
                          <p className="text-[11px] text-slate-500">
                            {formatFCFA(item.price)} l'unité · {item.category}
                          </p>
                        </div>
                      </div>

                      {/* Quantity buttons */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 hover:bg-slate-200 text-slate-700 transition-colors"
                            title="Diminuer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-slate-900">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => addItem(item)}
                            disabled={itemsTotal + item.price > 4000}
                            className={`p-1.5 transition-colors ${
                              itemsTotal + item.price > 4000
                                ? 'opacity-30 cursor-not-allowed text-slate-400'
                                : 'hover:bg-slate-200 text-slate-700'
                            }`}
                            title={itemsTotal + item.price > 4000 ? 'Plafond 4 000f atteint' : 'Augmenter'}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteItem(item.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-6 bg-white rounded-2xl border border-dashed border-amber-300 text-center space-y-2">
                <ShoppingBag className="w-8 h-8 text-amber-600 mx-auto" />
                <p className="text-xs font-bold text-slate-800">Votre box est encore vide</p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Ajoutez les articles de votre choix ci-dessous dans la limite de 4 000 FCFA.
                </p>
              </div>
            )}

            {/* Catalog Filter and Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Category buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                      categoryFilter === cat
                        ? 'bg-slate-900 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {cat === 'all' ? 'Tous les articles' : cat}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Rechercher un cadeau..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-600"
                />
              </div>
            </div>

            {/* Articles Catalog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => {
                const wouldExceedBudget = itemsTotal + item.price > 4000;
                const isOutOfStock = item.stock <= 0;
                const currentQty = cart.selectedItems.find((e) => e.item.id === item.id)?.quantity || 0;

                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-xl border p-4 flex flex-col justify-between transition-all ${
                      currentQty > 0
                        ? 'border-amber-600/80 ring-1 ring-amber-600/30 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      {/* Image & Price Tag */}
                      <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-slate-100 mb-3">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
                          {formatFCFA(item.price)}
                        </span>
                        <span className="absolute bottom-2 left-2 bg-white/90 text-slate-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs">
                          Stock : {item.stock}
                        </span>
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                        {item.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 mt-0.5 leading-snug">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Action button & blocking feedback */}
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      {isOutOfStock ? (
                        <div className="text-center py-2 px-3 bg-slate-100 text-slate-400 text-xs font-medium rounded-lg">
                          Rupture de stock
                        </div>
                      ) : wouldExceedBudget ? (
                        <div 
                          className="w-full py-2 px-3 bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-not-allowed"
                          title="L’ajout de cet article dépasserait le plafond de 4 000 FCFA"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>Plafond 4000f dépassé (+{formatFCFA(item.price)})</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => addItem(item)}
                            className="flex-1 py-2 px-3 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{currentQty > 0 ? `Ajouter encore (+1)` : 'Ajouter à la box'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Nav to Next Step */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab('options')}
                className="text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                ← Retour Destinataire & Couleur
              </button>

              <button
                type="button"
                onClick={() => {
                  if (isBox3) {
                    setActiveTab('customization');
                  } else {
                    setActiveTab('delivery');
                  }
                }}
                className="px-6 py-2.5 bg-amber-800 text-white rounded-xl text-xs font-semibold hover:bg-amber-900 transition-colors shadow-xs"
              >
                {isBox3 ? 'Continuer : Personnalisation (Mot) →' : 'Continuer vers la Livraison →'}
              </button>
            </div>

          </div>
        )}

        {/* Tab 3: Customization for Box 3 */}
        {activeTab === 'customization' && isBox3 && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Option Exclusive K-Box 3
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                Personnalisation & Gravure sur Mesure
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Le client a la possibilité de choisir s’il veut personnaliser : l’emballage de la box, un article ou les deux.
              </p>
            </div>

            {/* Target choice: packaging / item / both */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Que souhaitez-vous personnaliser ? <span className="text-rose-500">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'packaging' as CustomizationTarget,
                    title: 'L’emballage de la box',
                    desc: 'Dédicace en calligraphie dorée sur le coffret et ruban'
                  },
                  {
                    id: 'item' as CustomizationTarget,
                    title: 'Un article de la box',
                    desc: 'Gravure du prénom ou initiales sur l’article sélectionné'
                  },
                  {
                    id: 'both' as CustomizationTarget,
                    title: 'Les deux (Emballage & Article)',
                    desc: 'Personnalisation complète coffret + article choisi'
                  }
                ].map((targetOption) => {
                  const isChecked = (cart.customization?.target || 'packaging') === targetOption.id;
                  return (
                    <div
                      key={targetOption.id}
                      onClick={() => setCustomTarget(targetOption.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'border-amber-700 bg-amber-50/70 ring-2 ring-amber-600/30 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900">
                          {targetOption.title}
                        </span>
                        {isChecked && <CheckCircle className="w-4 h-4 text-amber-700" />}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {targetOption.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* If target is item or both, choose which item */}
            {(cart.customization?.target === 'item' || cart.customization?.target === 'both') && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Sélectionnez l’article à personnaliser / graver :
                </label>
                {cart.selectedItems.length > 0 ? (
                  <select
                    value={cart.customization?.targetItemId || cart.selectedItems[0]?.item.id}
                    onChange={(e) => setCustomItemTarget(e.target.value)}
                    className="w-full sm:w-96 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-600"
                  >
                    {cart.selectedItems.map(({ item }) => (
                      <option key={item.id} value={item.id}>
                        {item.name} ({formatFCFA(item.price)})
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                    ⚠️ Veuillez d’abord sélectionner au moins un article dans l’onglet <strong>Articles</strong> pour pouvoir le personnaliser.
                  </p>
                )}
              </div>
            )}

            {/* Mot à inscrire field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Mot ou Message à inscrire <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Exemple : « Joyeux Anniversaire Sarah, avec tout mon amour ❤️ » ou « Félicitations Dr. Diallo pour ton diplôme ! »"
                value={cart.customization?.customText || ''}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-amber-600"
                maxLength={120}
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Maximum 120 caractères pour un rendu calligraphique harmonieux.</span>
                <span>{(cart.customization?.customText || '').length} / 120</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveTab('articles')}
                className="text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                ← Retour aux Articles
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('delivery')}
                className="px-6 py-2.5 bg-amber-800 text-white rounded-xl text-xs font-semibold hover:bg-amber-900 transition-colors shadow-xs"
              >
                Continuer vers la Livraison →
              </button>
            </div>
          </div>
        )}

        {/* Tab: Livraison & Coordonnées */}
        {activeTab === 'delivery' && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Dernière étape
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                Lieu & Mode de Réception
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Choisissez entre le retrait gratuit à Orca Déco ou la livraison directe.
              </p>
            </div>

            {/* Delivery mode selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Orca Pickup */}
              <div
                onClick={() => setDeliveryType('orca_pickup')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  cart.delivery.type === 'orca_pickup'
                    ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600/30 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-emerald-700" />
                    <span className="text-sm font-bold text-slate-900">
                      Récupération à Orca Déco
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Gratuit (0 FCFA)
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Venez récupérer votre commande directement à notre point de retrait partenaire à <strong>Orca Déco</strong> dès que le colis est prêt.
                </p>
              </div>

              {/* Home Delivery */}
              <div
                onClick={() => setDeliveryType('home_delivery')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  cart.delivery.type === 'home_delivery'
                    ? 'border-amber-700 bg-amber-50/50 ring-2 ring-amber-600/30 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-amber-700" />
                    <span className="text-sm font-bold text-slate-900">
                      Livraison à Domicile / Bureau
                    </span>
                  </div>
                  {formula.freeDeliveryIncluded ? (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Gratuite Offerte (K-Box 3)
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                      Payante (+1 000 FCFA)
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600">
                  {formula.freeDeliveryIncluded 
                    ? 'La livraison est offerte et incluse dans votre formule K-Box 3 !' 
                    : 'Livraison rapide à votre adresse de votre choix par nos coursiers dédiés.'}
                </p>
              </div>
            </div>

            {/* Recipient Coordinates Form */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Coordonnées du client & destinataire
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Nom & Prénom du destinataire / client <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Sarah Kouamé"
                    value={cart.delivery.recipientName}
                    onChange={(e) =>
                      onUpdateCart((prev) => ({
                        ...prev,
                        delivery: { ...prev.delivery, recipientName: e.target.value }
                      }))
                    }
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Numéro de Téléphone (WhatsApp de préférence) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Ex: 07 00 11 22 33"
                    value={cart.delivery.phone}
                    onChange={(e) =>
                      onUpdateCart((prev) => ({
                        ...prev,
                        delivery: { ...prev.delivery, phone: e.target.value }
                      }))
                    }
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-600"
                  />
                </div>
              </div>

              {cart.delivery.type === 'home_delivery' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Quartier & Adresse de livraison <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Cocody Angré 8ème tranche, après la pharmacie du carrefour..."
                      value={cart.delivery.address || ''}
                      onChange={(e) =>
                        onUpdateCart((prev) => ({
                          ...prev,
                          delivery: { ...prev.delivery, address: e.target.value }
                        }))
                      }
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-600"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Indications complémentaires pour la préparation ou livraison (facultatif)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Ne pas sonner, appeler à l'arrivée / Surprise absolue..."
                  value={cart.delivery.deliveryNotes || ''}
                  onChange={(e) =>
                    onUpdateCart((prev) => ({
                      ...prev,
                      delivery: { ...prev.delivery, deliveryNotes: e.target.value }
                    }))
                  }
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-amber-600"
                />
              </div>
            </div>

            {/* Validation Action Button */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                <span>Cliquez ci-contre pour générer votre code de panier et finaliser.</span>
              </div>

              <button
                type="button"
                onClick={onValidateCart}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-bold text-sm rounded-xl shadow-md shadow-amber-950/20 transition-all flex items-center justify-center gap-2 transform active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 text-amber-200" />
                <span>Valider mon panier</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
