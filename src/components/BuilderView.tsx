import React, { useState } from 'react';
import { 
  Check, 
  ShoppingBag, 
  MapPin, 
  Truck, 
  Plus, 
  Minus, 
  Trash2, 
  Search,
  ArrowRight,
  Info,
  AlertCircle,
  Lock,
  Cookie,
  Coffee,
  Utensils,
  Flame,
  Sparkles,
  Droplets,
  Flower2,
  BookOpen,
  Key,
  Heart,
  Camera,
  Sun,
  Shirt,
  Gift,
  X,
  Filter
} from 'lucide-react';
import { 
  CartState, 
  DominantColor, 
  EventType, 
  FormulaConfig, 
  FormulaId, 
  Gender, 
  GiftItem, 
  CustomizationTarget, 
  DeliveryType 
} from '../types';
import { FORMULAS, DOMINANT_COLORS, EVENTS } from '../data/mockData';
import { formatFCFA } from '../utils/helpers';

// Helper pour afficher une petite icône selon le type de produit
const getProductIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('chocolat') || n.includes('biscuit') || n.includes('sablé') || n.includes('caramel')) {
    return <Cookie className="w-3.5 h-3.5 text-amber-700 shrink-0" />;
  }
  if (n.includes('thé') || n.includes('tasse') || n.includes('mug') || n.includes('café')) {
    return <Coffee className="w-3.5 h-3.5 text-amber-800 shrink-0" />;
  }
  if (n.includes('miel') || n.includes('tartiner')) {
    return <Utensils className="w-3.5 h-3.5 text-amber-600 shrink-0" />;
  }
  if (n.includes('bougie')) {
    return <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
  }
  if (n.includes('brume') || n.includes('parfum') || n.includes('huile')) {
    return <Sparkles className="w-3.5 h-3.5 text-rose-500 shrink-0" />;
  }
  if (n.includes('savon') || n.includes('crème') || n.includes('baume')) {
    return <Droplets className="w-3.5 h-3.5 text-teal-600 shrink-0" />;
  }
  if (n.includes('fleur') || n.includes('bouquet')) {
    return <Flower2 className="w-3.5 h-3.5 text-pink-500 shrink-0" />;
  }
  if (n.includes('carnet') || n.includes('stylo') || n.includes('carte')) {
    return <BookOpen className="w-3.5 h-3.5 text-indigo-500 shrink-0" />;
  }
  if (n.includes('porte-clés') || n.includes('pince') || n.includes('bijou')) {
    return <Key className="w-3.5 h-3.5 text-stone-600 shrink-0" />;
  }
  if (n.includes('peluche') || n.includes('doudou')) {
    return <Heart className="w-3.5 h-3.5 text-rose-600 shrink-0" />;
  }
  if (n.includes('cadre') || n.includes('photo')) {
    return <Camera className="w-3.5 h-3.5 text-blue-500 shrink-0" />;
  }
  if (n.includes('veilleuse') || n.includes('lumière')) {
    return <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
  }
  if (n.includes('chaussette') || n.includes('textile')) {
    return <Shirt className="w-3.5 h-3.5 text-violet-500 shrink-0" />;
  }
  return <Gift className="w-3.5 h-3.5 text-stone-600 shrink-0" />;
};

interface BuilderViewProps {
  cart: CartState;
  formula: FormulaConfig;
  catalog: GiftItem[];
  itemsTotal: number;
  itemBudgetRemaining: number;
  isBudgetCapReached: boolean;
  onSelectFormula: (id: FormulaId) => void;
  onUpdateCart: (updater: (prev: CartState) => CartState) => void;
  onValidateCart: () => void;
}

export const BuilderView: React.FC<BuilderViewProps> = ({
  cart,
  formula,
  catalog,
  onSelectFormula,
  onUpdateCart,
  onValidateCart
}) => {
  // Always starts on step 1 ('options')
  const [activeStep, setActiveStep] = useState<'options' | 'articles' | 'customization' | 'delivery'>('options');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [validationError, setValidationError] = useState<string | null>(null);

  const isBox1 = formula.id === 'kbox-1';
  const isBox2 = formula.id === 'kbox-2';
  const isBox3 = formula.id === 'kbox-3';

  // Articles automatiquement filtrés selon le genre choisi
  const filteredItems = catalog.filter((item) => {
    const matchesSearch = !searchQuery.trim() || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'Tous' || item.category === selectedCategory;
    const matchesGender = !item.genderTag || 
      item.genderTag === 'Tous' || 
      item.genderTag === cart.gender;
    return matchesSearch && matchesCat && matchesGender;
  });

  // Catégories extraites des articles adaptés
  const categories = ['Tous', ...Array.from(new Set(
    catalog
      .filter((i) => !i.genderTag || i.genderTag === 'Tous' || i.genderTag === cart.gender)
      .map((i) => i.category || 'Autres')
  ))];

  // Items count and budget calculation (Plafond interne de 4000f, sélection non limitée à 4 articles)
  const totalItemCount = cart.selectedItems.reduce((acc, i) => acc + i.quantity, 0);
  const itemsCostTotal = cart.selectedItems.reduce((acc, i) => acc + i.item.price * i.quantity, 0);
  const ITEM_CAP_BUDGET = 4000;
  const remainingBudget = Math.max(0, ITEM_CAP_BUDGET - itemsCostTotal);

  // When switching formula: reset back to step 1 (processus principal de départ)
  const handleFormulaTabClick = (newFormulaId: FormulaId) => {
    onSelectFormula(newFormulaId);
    setActiveStep('options');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Handlers for step 1
  const setGender = (gender: Gender) => {
    setValidationError(null);
    onUpdateCart((prev) => {
      // Remove any items that are incompatible with the new gender
      const updatedSelectedItems = prev.selectedItems.filter(
        (entry) => !entry.item.genderTag || entry.item.genderTag === 'Tous' || entry.item.genderTag === gender
      );
      return { 
        ...prev, 
        gender,
        selectedItems: updatedSelectedItems
      };
    });
  };

  const handleSelectEvent = (eventVal: EventType) => {
    setValidationError(null);
    onUpdateCart((prev) => ({ 
      ...prev, 
      event: eventVal,
      customEventText: eventVal === 'Autre' ? (prev.customEventText || '') : undefined
    }));
  };

  const handleCustomEventChange = (text: string) => {
    setValidationError(null);
    onUpdateCart((prev) => ({
      ...prev,
      event: 'Autre',
      customEventText: text
    }));
  };

  const handleSelectColor = (col: DominantColor) => {
    setValidationError(null);
    onUpdateCart((prev) => ({ 
      ...prev, 
      color: col,
      customColorText: col.isCustom ? (prev.customColorText || '') : undefined
    }));
  };

  const handleCustomColorChange = (colorName: string) => {
    setValidationError(null);
    onUpdateCart((prev) => ({
      ...prev,
      customColorText: colorName,
      color: {
        ...prev.color,
        id: 'custom',
        name: colorName.trim() ? colorName : 'Couleur personnalisée',
        isCustom: true
      }
    }));
  };

  const setDeliveryType = (type: DeliveryType) => {
    setValidationError(null);
    onUpdateCart((prev) => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        type,
        fee: 0
      }
    }));
  };

  // Add item if budget permits
  const addItem = (item: GiftItem) => {
    setValidationError(null);
    if (!formula.allowsItemSelection) return;
    if (remainingBudget < item.price) return;
    if (item.stock <= 0) return;

    onUpdateCart((prev) => {
      const existing = prev.selectedItems.find((e) => e.item.id === item.id);
      if (existing) {
        return {
          ...prev,
          selectedItems: prev.selectedItems.map((e) =>
            e.item.id === item.id ? { ...e, quantity: e.quantity + 1 } : e
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

  // Deselect an item completely
  const deselectItem = (itemId: string) => {
    onUpdateCart((prev) => ({
      ...prev,
      selectedItems: prev.selectedItems.filter((e) => e.item.id !== itemId)
    }));
  };

  const removeItem = (itemId: string) => {
    onUpdateCart((prev) => {
      const existing = prev.selectedItems.find((e) => e.item.id === itemId);
      if (!existing) return prev;

      if (existing.quantity > 1) {
        return {
          ...prev,
          selectedItems: prev.selectedItems.map((e) =>
            e.item.id === itemId ? { ...e, quantity: e.quantity - 1 } : e
          )
        };
      } else {
        return {
          ...prev,
          selectedItems: prev.selectedItems.filter((e) => e.item.id !== itemId)
        };
      }
    });
  };

  const deleteItem = (itemId: string) => {
    deselectItem(itemId);
  };

  // Customization
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
    setValidationError(null);
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
    setValidationError(null);
    onUpdateCart((prev) => ({
      ...prev,
      customization: {
        target: prev.customization?.target || 'item',
        customText: prev.customization?.customText || '',
        targetItemId
      }
    }));
  };

  // Validation stricte des étapes
  const validateStep1 = (): { valid: boolean; error?: string } => {
    if (!cart.gender) {
      return { valid: false, error: 'Veuillez sélectionner le destinataire (Femme, Homme, Enfant / Mixte).' };
    }
    if (!cart.event) {
      return { valid: false, error: 'Veuillez choisir un événement.' };
    }
    if (cart.event === 'Autre' && (!cart.customEventText || !cart.customEventText.trim())) {
      return { valid: false, error: 'Veuillez préciser votre événement avant de passer à l’étape suivante.' };
    }
    if (!cart.color || !cart.color.name) {
      return { valid: false, error: 'Veuillez sélectionner une couleur dominante.' };
    }
    if (cart.color.id === 'custom' && (!cart.customColorText || !cart.customColorText.trim())) {
      return { valid: false, error: 'Veuillez préciser votre couleur personnalisée avant de continuer.' };
    }
    return { valid: true };
  };

  const validateStep2 = (): { valid: boolean; error?: string } => {
    if (!formula.allowsItemSelection) return { valid: true };
    if (totalItemCount === 0) {
      return { valid: false, error: 'Veuillez choisir au moins 1 article pour composer votre box avant de passer à l’étape suivante.' };
    }
    return { valid: true };
  };

  const validateStep3 = (): { valid: boolean; error?: string } => {
    if (!isBox3) return { valid: true };
    if (!cart.customization?.customText || !cart.customization.customText.trim()) {
      return { valid: false, error: 'Veuillez inscrire votre mot ou dédicace pour valider la personnalisation.' };
    }
    return { valid: true };
  };

  const isStep1Valid = validateStep1().valid;
  const isStep2Valid = !formula.allowsItemSelection || validateStep2().valid;
  const isStep3Valid = !isBox3 || validateStep3().valid;

  const navigateToStep = (targetStep: 'options' | 'articles' | 'customization' | 'delivery') => {
    const stepOrder = ['options', 'articles', 'customization', 'delivery'] as const;
    const currentIdx = stepOrder.indexOf(activeStep);
    const targetIdx = stepOrder.indexOf(targetStep);

    // Retour en arrière : toujours permis
    if (targetIdx <= currentIdx) {
      setValidationError(null);
      setActiveStep(targetStep);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    // Avancement : validation obligatoire des étapes précédentes
    const v1 = validateStep1();
    if (!v1.valid) {
      setValidationError(v1.error || 'Veuillez compléter et valider l’étape 1.');
      setActiveStep('options');
      return;
    }

    if (targetStep === 'articles') {
      setValidationError(null);
      setActiveStep('articles');
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    if (formula.allowsItemSelection) {
      const v2 = validateStep2();
      if (!v2.valid) {
        setValidationError(v2.error || 'Veuillez choisir au moins 1 article pour continuer.');
        setActiveStep('articles');
        return;
      }
    }

    if (targetStep === 'customization') {
      setValidationError(null);
      setActiveStep('customization');
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    if (isBox3) {
      const v3 = validateStep3();
      if (!v3.valid) {
        setValidationError(v3.error || 'Veuillez inscrire votre mot personnalisé pour continuer.');
        setActiveStep('customization');
        return;
      }
    }

    setValidationError(null);
    setActiveStep('delivery');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-[11px] font-semibold tracking-widest uppercase text-stone-500 block">
          Atelier de Création
        </span>
        <div className="inline-flex items-baseline justify-center mb-1">
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium">
            Faire mon K-BOX
          </h1>
          <span className="w-1.5 h-1.5 rounded-full bg-stone-900 ml-1 inline-block self-end mb-1" />
        </div>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Personnalisez votre coffret étape par étape puis ajoutez-le au panier.
        </p>
      </div>

      {/* Formula Selector Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-stone-200/80 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-2">
        {FORMULAS.map((f) => {
          const isSelected = f.id === formula.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => handleFormulaTabClick(f.id)}
              className={`p-3.5 rounded-xl text-left transition-all flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${isSelected ? 'text-stone-400' : 'text-stone-400'}`}>
                  {f.code}
                </span>
                <span className="font-serif text-sm font-medium mt-0.5 block truncate">
                  {f.name}
                </span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className={`text-base font-bold font-serif ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                  {formatFCFA(f.basePrice)}
                </span>
                {f.freeDeliveryIncluded && (
                  <span className={`text-[10px] font-semibold ${isSelected ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    Livraison offerte
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Step Navigation Pill Bar avec validation obligatoire */}
      <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-stone-200/80 overflow-x-auto shadow-2xs">
        {/* Étape 1 */}
        <button
          type="button"
          onClick={() => navigateToStep('options')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
            activeStep === 'options' 
              ? 'bg-stone-900 text-white shadow-2xs' 
              : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
          }`}
        >
          {isStep1Valid ? (
            <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${activeStep === 'options' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
              <Check className="w-2.5 h-2.5" />
            </span>
          ) : (
            <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${activeStep === 'options' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'}`}>
              1
            </span>
          )}
          <span>1. Destinataire & Ambiance</span>
        </button>

        {/* Étape 2 (Articles) */}
        {formula.allowsItemSelection && (
          <button
            type="button"
            onClick={() => navigateToStep('articles')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeStep === 'articles' 
                ? 'bg-stone-900 text-white shadow-2xs' 
                : !isStep1Valid
                ? 'text-stone-400 opacity-60'
                : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
            }`}
          >
            {isStep2Valid && totalItemCount > 0 ? (
              <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${activeStep === 'articles' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                <Check className="w-2.5 h-2.5" />
              </span>
            ) : !isStep1Valid ? (
              <Lock className="w-3 h-3 text-stone-400 shrink-0" />
            ) : (
              <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${activeStep === 'articles' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'}`}>
                2
              </span>
            )}
            <span>2. Articles</span>
            {totalItemCount > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${activeStep === 'articles' ? 'bg-white text-stone-900' : 'bg-stone-200 text-stone-800'}`}>
                {totalItemCount}
              </span>
            )}
          </button>
        )}

        {/* Étape 3 (Personnalisation K-Box 3) */}
        {isBox3 && (
          <button
            type="button"
            onClick={() => navigateToStep('customization')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeStep === 'customization' 
                ? 'bg-stone-900 text-white shadow-2xs' 
                : (!isStep1Valid || !isStep2Valid)
                ? 'text-stone-400 opacity-60'
                : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
            }`}
          >
            {isStep3Valid && Boolean(cart.customization?.customText?.trim()) ? (
              <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${activeStep === 'customization' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                <Check className="w-2.5 h-2.5" />
              </span>
            ) : (!isStep1Valid || !isStep2Valid) ? (
              <Lock className="w-3 h-3 text-stone-400 shrink-0" />
            ) : (
              <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${activeStep === 'customization' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'}`}>
                3
              </span>
            )}
            <span>3. Mot à inscrire</span>
          </button>
        )}

        {/* Étape Réception */}
        <button
          type="button"
          onClick={() => navigateToStep('delivery')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
            activeStep === 'delivery' 
              ? 'bg-stone-900 text-white shadow-2xs' 
              : (!isStep1Valid || !isStep2Valid || !isStep3Valid)
              ? 'text-stone-400 opacity-60'
              : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
          }`}
        >
          {(!isStep1Valid || !isStep2Valid || !isStep3Valid) ? (
            <Lock className="w-3 h-3 text-stone-400 shrink-0" />
          ) : (
            <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${activeStep === 'delivery' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'}`}>
              {isBox1 ? '2' : isBox3 ? '4' : '3'}
            </span>
          )}
          <span>{isBox1 ? '2. Réception' : isBox3 ? '4. Réception' : '3. Réception'}</span>
        </button>
      </div>

      {/* Message d'erreur de validation si étape incomplète */}
      {validationError && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs flex items-center gap-2.5 shadow-2xs animate-fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span className="font-semibold">{validationError}</span>
        </div>
      )}

      {/* STEP 1: OPTIONS (Sexe, Événement avec saisie libre, Couleur avec saisie libre) */}
      {activeStep === 'options' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-2xs space-y-7">
          <div>
            <h3 className="font-serif text-xl font-medium text-stone-900">
              Étape 1 : Destinataire & Ambiance
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Harmonisez l'ensemble de votre coffret {formula.name}. Validez cette étape pour débloquer la suite.
            </p>
          </div>

          {/* Sexe */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
              Sexe du destinataire
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Femme', 'Homme', 'Enfant / Mixte'] as Gender[]).map((genderOption) => {
                const isChecked = cart.gender === genderOption;
                return (
                  <button
                    key={genderOption}
                    type="button"
                    onClick={() => setGender(genderOption)}
                    className={`p-3.5 rounded-xl border text-center font-medium text-xs transition-all cursor-pointer ${
                      isChecked
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {genderOption}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Événement & Saisie personnalisée */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
              Événement à célébrer
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {EVENTS.map((eventItem) => {
                const isChecked = cart.event === eventItem.id;
                return (
                  <button
                    key={eventItem.id}
                    type="button"
                    onClick={() => handleSelectEvent(eventItem.id)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center gap-2 cursor-pointer ${
                      isChecked
                        ? 'border-stone-900 bg-stone-100 text-stone-900 font-semibold'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600'
                    }`}
                  >
                    <span>{eventItem.icon}</span>
                    <span className="truncate">{eventItem.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Champ de saisie pour autre événement */}
            {cart.event === 'Autre' && (
              <div className="mt-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5 animate-fade-in">
                <label className="text-xs font-medium text-stone-700 block">
                  Précisez votre événement personnalisé :
                </label>
                <input
                  type="text"
                  placeholder="Ex : Baptême, Baby shower, Promotion professionnelle, Mariage..."
                  value={cart.customEventText || ''}
                  onChange={(e) => handleCustomEventChange(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                />
              </div>
            )}
          </div>

          {/* Couleur dominante & Saisie personnalisée */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                Couleur dominante du cadeau
              </label>
              <span className="text-xs font-medium text-stone-600">
                {cart.color.isCustom && cart.customColorText ? cart.customColorText : cart.color.name}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {DOMINANT_COLORS.map((col) => {
                const isChecked = cart.color.id === col.id;
                return (
                  <div
                    key={col.id}
                    onClick={() => handleSelectColor(col)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                      isChecked
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div 
                      className="w-8 h-8 rounded-lg border border-black/10 shrink-0 flex items-center justify-center relative overflow-hidden"
                      style={{ backgroundColor: col.hex }}
                    >
                      <div className="absolute w-2 h-full" style={{ backgroundColor: col.ribbonHex }} />
                      {isChecked && <Check className="w-4 h-4 text-white z-10" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-stone-900 truncate">{col.name}</p>
                      <p className="text-[10px] text-stone-400 truncate">{col.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Champ de saisie pour autre couleur */}
            {cart.color.id === 'custom' && (
              <div className="mt-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5 animate-fade-in">
                <label className="text-xs font-medium text-stone-700 block">
                  Saisissez votre nuance ou couleur souhaitée :
                </label>
                <input
                  type="text"
                  placeholder="Ex : Lilac pastel, Vert émeraude & or, Jaune moutarde, Terracotta..."
                  value={cart.customColorText || ''}
                  onChange={(e) => handleCustomColorChange(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                />
              </div>
            )}
          </div>

          {/* Valider l'étape 1 et continuer */}
          <div className="pt-4 border-t border-stone-100 flex justify-end">
            <button
              type="button"
              onClick={() => {
                const v1 = validateStep1();
                if (!v1.valid) {
                  setValidationError(v1.error || 'Veuillez compléter cette étape.');
                  return;
                }
                setValidationError(null);
                setActiveStep(formula.allowsItemSelection ? 'articles' : 'delivery');
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
            >
              <span>{formula.allowsItemSelection ? 'Valider l’étape 1 : Choisir les Articles' : 'Valider l’étape 1 : Passer à la Réception'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: ARTICLES (Sélection douce selon stock et contenance - Format Circulaire Économique) */}
      {activeStep === 'articles' && formula.allowsItemSelection && (
        <div className="space-y-4">
          
          {/* BARRE RAPIDE "CONTINUER DIRECTEMENT" POUR ÉVITER DE TROP SCROLLER */}
          <div className="sticky top-20 z-20 bg-[#FAF8F5]/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-stone-200/90 shadow-xs flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-stone-900" />
                <span className="text-xs font-bold text-stone-900 truncate">
                  {totalItemCount > 0 ? `${totalItemCount} article${totalItemCount > 1 ? 's' : ''} dans votre box` : 'Votre sélection de cadeaux'}
                </span>
              </div>
              <span className="text-[11px] text-stone-500 block truncate mt-0.5">
                {remainingBudget <= 400 
                  ? 'Contenance maximale atteinte' 
                  : 'Touchez un article pour le choisir ou le retirer'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                const v2 = validateStep2();
                if (!v2.valid) {
                  setValidationError(v2.error || 'Veuillez choisir au moins 1 article.');
                  return;
                }
                setValidationError(null);
                setActiveStep(isBox3 ? 'customization' : 'delivery');
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
              className="px-4 sm:px-5 py-2 sm:py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-98 shrink-0"
            >
              <span>Valider & Continuer</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>

          {/* PLATEAU RÉSUMÉ DES ARTICLES SÉLECTIONNÉS (Si au moins un article choisi) */}
          {cart.selectedItems.length > 0 && (
            <div className="p-3 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-stone-900" />
                  Dans votre Box ({totalItemCount})
                </span>
                <span className="text-[11px] text-stone-400">
                  Cliquez sur la croix pour retirer
                </span>
              </div>
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                {cart.selectedItems.map(({ item, quantity }) => (
                  <div 
                    key={item.id} 
                    className="flex items-center gap-2 bg-stone-50 border border-stone-200/90 rounded-full pl-1.5 pr-2.5 py-1 shrink-0 shadow-2xs group"
                  >
                    <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-stone-200">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-stone-900 truncate max-w-[120px]">
                        {item.name}
                      </p>
                      {quantity > 1 && (
                        <span className="text-[10px] font-bold text-stone-600 block">
                          Qté : ×{quantity}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => deselectItem(item.id)}
                      className="w-4 h-4 rounded-full bg-stone-200 hover:bg-stone-900 hover:text-white text-stone-600 flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-1"
                      title="Retirer cet article"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RECHERCHE & CATÉGORIES */}
          <div className="space-y-2.5">
            {/* Barre de recherche */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                placeholder="Rechercher un cadeau..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-stone-900 shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-stone-400 hover:text-stone-700 p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Onglets Catégories horizontaux */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => {
                const isCatActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                      isCatActive
                        ? 'bg-stone-900 text-white shadow-2xs'
                        : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* POSITIONNEMENT EN GRILLE CIRCULAIRE UNIQUE */}
          <div className="bg-white rounded-2xl border border-stone-200 p-3.5 sm:p-5 shadow-2xs">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4.5">
              {filteredItems.map((item) => {
                const currentQty = cart.selectedItems.find((e) => e.item.id === item.id)?.quantity || 0;
                const isSelected = currentQty > 0;
                const isOutOfStock = item.stock <= 0;
                const canAddMore = item.stock > currentQty && remainingBudget >= item.price;
                const isBlocked = !isSelected && !canAddMore;

                return (
                  <div
                    key={item.id}
                    className={`flex flex-col items-center text-center p-2 rounded-2xl transition-all duration-200 group relative ${
                      isSelected 
                        ? 'bg-stone-50/80 shadow-2xs ring-1 ring-stone-900/10' 
                        : isBlocked 
                        ? 'opacity-40' 
                        : ''
                    }`}
                  >
                    {/* Cercle avec photo du produit & pastille de sélection */}
                    <button
                      type="button"
                      onClick={() => {
                        if (isOutOfStock || isBlocked) return;
                        if (isSelected) {
                          if (canAddMore) {
                            addItem(item);
                          } else {
                            removeItem(item.id);
                          }
                        } else {
                          addItem(item);
                        }
                      }}
                      disabled={isOutOfStock || isBlocked}
                      className={`relative w-18 h-18 sm:w-22 sm:h-22 rounded-full overflow-hidden bg-stone-100 transition-all duration-300 cursor-pointer block focus:outline-hidden ${
                        isSelected
                          ? 'ring-3 ring-stone-900 ring-offset-2 ring-offset-white shadow-md scale-102'
                          : isBlocked || isOutOfStock
                          ? 'ring-1 ring-stone-200 cursor-not-allowed'
                          : 'ring-1 ring-stone-200'
                      }`}
                      title={item.name}
                    >
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className={`w-full h-full object-cover transition-transform duration-300 ${
                          isSelected ? 'scale-105' : ''
                        } ${isOutOfStock || isBlocked ? 'grayscale-50' : ''}`}
                      />

                      {/* Pastille de sélection active au coin du cercle */}
                      {isSelected && (
                        <div className="absolute top-0 right-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-md border-2 border-white animate-scale-in">
                          {currentQty > 1 ? `×${currentQty}` : <Check className="w-3 h-3 text-white" />}
                        </div>
                      )}

                      {/* Overlay pour rupture */}
                      {isOutOfStock && (
                        <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-2xs flex items-center justify-center">
                          <span className="text-[9px] font-semibold text-white uppercase tracking-wider">
                            Rupture
                          </span>
                        </div>
                      )}
                    </button>

                    {/* Titre de l'article centré sous le cercle */}
                    <div className="mt-2 w-full min-h-[28px] flex flex-col items-center justify-center px-0.5">
                      <h4 className="text-[11px] sm:text-xs font-semibold text-stone-900 leading-snug line-clamp-2">
                        {item.name}
                      </h4>
                      {item.genderTag && item.genderTag !== 'Tous' && (
                        <span className={`text-[9px] font-medium px-1.5 py-0.2 rounded-full mt-0.5 inline-block ${
                          item.genderTag === 'Femme'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                            : item.genderTag === 'Homme'
                            ? 'bg-sky-50 text-sky-700 border border-sky-200/60'
                            : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                        }`}>
                          {item.genderTag}
                        </span>
                      )}
                    </div>

                    {/* Contrôles compacts sous le titre */}
                    <div className="mt-1">
                      {isOutOfStock ? (
                        <span className="text-[10px] text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full inline-block">
                          Épuisé
                        </span>
                      ) : isSelected ? (
                        <div className="flex items-center justify-center gap-1 bg-stone-900 text-white rounded-full px-2 py-0.5 shadow-2xs">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItem(item.id);
                            }}
                            className="text-stone-300 hover:text-white p-0.5 transition-colors cursor-pointer"
                            title={currentQty === 1 ? 'Retirer' : 'Diminuer'}
                            aria-label="Diminuer"
                          >
                            {currentQty === 1 ? <Trash2 className="w-2.5 h-2.5" /> : <Minus className="w-2.5 h-2.5" />}
                          </button>
                          <span className="text-[11px] font-bold px-1 min-w-[14px]">
                            {currentQty}
                          </span>
                          {canAddMore ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                addItem(item);
                              }}
                              className="text-stone-300 hover:text-white p-0.5 transition-colors cursor-pointer"
                              title="Ajouter un autre"
                              aria-label="Ajouter"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          ) : (
                            <span className="w-2" />
                          )}
                        </div>
                      ) : isBlocked ? (
                        <span className="text-[10px] text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full inline-block">
                          Plein
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => addItem(item)}
                          className="text-[10px] font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 px-2.5 py-0.5 rounded-full transition-all flex items-center gap-0.5 cursor-pointer shadow-2xs"
                        >
                          <Plus className="w-2.5 h-2.5" />
                          <span>Choisir</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-8">
                <p className="text-xs text-stone-500">Aucun article ne correspond à votre recherche.</p>
              </div>
            )}
          </div>

          {/* Navigation bas de page */}
          <div className="pt-4 flex items-center justify-between border-t border-stone-200">
            <button
              type="button"
              onClick={() => setActiveStep('options')}
              className="text-xs text-stone-500 hover:text-stone-900 cursor-pointer"
            >
              ← Retour Destinataire
            </button>

            <button
              type="button"
              onClick={() => {
                const v2 = validateStep2();
                if (!v2.valid) {
                  setValidationError(v2.error || 'Veuillez choisir au moins 1 article.');
                  return;
                }
                setValidationError(null);
                setActiveStep(isBox3 ? 'customization' : 'delivery');
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
              className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer flex items-center gap-2 shadow-xs active:scale-98"
            >
              <span>{isBox3 ? 'Valider : Mot à inscrire' : 'Valider : Passer à la Réception'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* STEP 3: PERSONNALISATION K-BOX 3 (10 000 FCFA) */}
      {activeStep === 'customization' && isBox3 && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-2xs space-y-6">
          <div>
            <h3 className="font-serif text-xl font-medium text-stone-900">
              Personnalisation de votre K-Box 3
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Choisissez où inscrire votre dédicace et rédigez votre mot doux.
            </p>
          </div>

          {/* Emplacement de gravure */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
              Où inscrire votre personnalisation ?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'packaging' as CustomizationTarget, title: 'L’emballage de la box', desc: 'Calligraphie soignée sur le coffret' },
                { id: 'item' as CustomizationTarget, title: 'Un article de la box', desc: 'Gravure sur l’article choisi' },
                { id: 'both' as CustomizationTarget, title: 'Les deux (Emballage & Article)', desc: 'Personnalisation complète' }
              ].map((targetOption) => {
                const isChecked = (cart.customization?.target || 'packaging') === targetOption.id;
                return (
                  <div
                    key={targetOption.id}
                    onClick={() => setCustomTarget(targetOption.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <p className="text-xs font-medium text-stone-900">{targetOption.title}</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">{targetOption.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Article ciblé si applicable */}
          {(cart.customization?.target === 'item' || cart.customization?.target === 'both') && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                Article à personnaliser :
              </label>
              {cart.selectedItems.length > 0 ? (
                <select
                  value={cart.customization?.targetItemId || cart.selectedItems[0]?.item.id}
                  onChange={(e) => setCustomItemTarget(e.target.value)}
                  className="w-full sm:w-80 px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-hidden"
                >
                  {cart.selectedItems.map(({ item }) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-xs text-stone-500 italic">
                  Veuillez d'abord choisir au moins un article dans l’étape Articles.
                </p>
              )}
            </div>
          )}

          {/* Mot à inscrire */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
              Mot / Message à inscrire
            </label>
            <textarea
              rows={3}
              placeholder="Ex : « Joyeux Anniversaire Sarah ❤️ » ou « Félicitations pour ta réussite ! »"
              value={cart.customization?.customText || ''}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full px-4 py-3 text-xs sm:text-sm bg-white border border-stone-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-stone-900"
              maxLength={120}
            />
            <div className="flex justify-between text-[11px] text-stone-400">
              <span>Votre message sera élégamment calligraphié ou gravé.</span>
              <span>{(cart.customization?.customText || '').length} / 120</span>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-stone-100">
            <button
              type="button"
              onClick={() => setActiveStep('articles')}
              className="text-xs text-stone-500 hover:text-stone-900 cursor-pointer"
            >
              ← Retour Articles
            </button>
            <button
              type="button"
              onClick={() => {
                const v3 = validateStep3();
                if (!v3.valid) {
                  setValidationError(v3.error || 'Veuillez inscrire votre mot personnalisé.');
                  return;
                }
                setValidationError(null);
                setActiveStep('delivery');
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
              className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer flex items-center gap-2 shadow-xs active:scale-98"
            >
              <span>Valider : Passer à la Réception</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: RÉCEPTION & FINALISATION (Seule étape où l'utilisateur peut ajouter au panier !) */}
      {activeStep === 'delivery' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-2xs space-y-6">
          <div>
            <h3 className="font-serif text-xl font-medium text-stone-900">
              Réception & Finalisation
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Renseignez vos coordonnées de remise pour ajouter votre box au panier.
            </p>
          </div>

          {/* Mode de remise */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Orca Pickup */}
            <div
              onClick={() => setDeliveryType('orca_pickup')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                cart.delivery.type === 'orca_pickup'
                  ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-stone-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-700" />
                  <span>Récupération à Orca Déco</span>
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Gratuit
                </span>
              </div>
              <p className="text-[11px] text-stone-500">
                Point Relais Orca Déco Jericho, Cotonou dès que votre coffret est prêt.
              </p>
            </div>

            {/* Home Delivery */}
            <div
              onClick={() => setDeliveryType('home_delivery')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                cart.delivery.type === 'home_delivery'
                  ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-stone-900 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-stone-700" />
                  <span>Livraison à domicile</span>
                </span>
                <span className="text-[10px] font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-full">
                  {isBox3 ? 'Offerte avec K-Box 3' : 'Selon votre quartier / localisation'}
                </span>
              </div>
              <p className="text-[11px] text-stone-500">
                {isBox3
                  ? 'Livraison 100% offerte incluse dans votre formule K-Box 3 (10 000 FCFA) !'
                  : 'Tarif ajusté selon votre commune ou quartier lors de la remise.'}
              </p>
            </div>
          </div>

          {/* Formulaire coordonnées de retrait ou livraison */}
          <div className="space-y-3 pt-1">
            {validationError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span className="font-medium">{validationError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-stone-800 block mb-1">
                  {cart.delivery.type === 'orca_pickup' 
                    ? 'Nom & Prénom de la personne qui vient récupérer' 
                    : 'Nom & Prénom du destinataire'}{' '}
                  <span className="text-rose-600 font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={cart.delivery.type === 'orca_pickup' ? "Nom & Prénom du récupérateur" : "Ex : Sarah Mensah"}
                  value={cart.delivery.recipientName}
                  onChange={(e) => {
                    setValidationError(null);
                    onUpdateCart((prev) => ({
                      ...prev,
                      delivery: { ...prev.delivery, recipientName: e.target.value }
                    }));
                  }}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-stone-800 block mb-1">
                  {cart.delivery.type === 'orca_pickup'
                    ? 'Numéro de téléphone pour le retrait'
                    : 'Numéro de téléphone (WhatsApp)'}{' '}
                  <span className="text-rose-600 font-bold">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ex : +229 01 00 11 22"
                  value={cart.delivery.phone}
                  onChange={(e) => {
                    setValidationError(null);
                    onUpdateCart((prev) => ({
                      ...prev,
                      delivery: { ...prev.delivery, phone: e.target.value }
                    }));
                  }}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>

            {cart.delivery.type === 'home_delivery' && (
              <div>
                <label className="text-xs font-medium text-stone-800 block mb-1">
                  Quartier & Adresse de livraison <span className="text-rose-600 font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Cotonou - Cadjehoun, Haie Vive, Akpakpa..."
                  value={cart.delivery.address || ''}
                  onChange={(e) => {
                    setValidationError(null);
                    onUpdateCart((prev) => ({
                      ...prev,
                      delivery: { ...prev.delivery, address: e.target.value }
                    }));
                  }}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-stone-900"
                />
              </div>
            )}
          </div>

          {/* Récapitulatif compact optimisé pour l'écran mobile */}
          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-stone-900 block">{formula.name}</span>
              <span className="text-[11px] text-stone-500">
                {cart.event} · {cart.color.isCustom && cart.customColorText ? cart.customColorText : cart.color.name}
              </span>
            </div>
            <div className="text-right">
              <span className="font-bold text-stone-900 text-sm block">{formatFCFA(formula.basePrice)}</span>
              <span className="text-[10px] text-stone-500">
                {cart.delivery.type === 'orca_pickup' ? 'Retrait Orca Déco' : 'Livraison'}
              </span>
            </div>
          </div>

          {/* Validation Action Button */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setActiveStep(isBox3 ? 'customization' : formula.allowsItemSelection ? 'articles' : 'options')}
              className="text-xs text-stone-500 hover:text-stone-900 cursor-pointer"
            >
              ← Retour
            </button>

            <button
              type="button"
              onClick={() => {
                const name = cart.delivery.recipientName?.trim() || '';
                const phone = cart.delivery.phone?.trim() || '';

                if (!name || name.length < 2) {
                  setValidationError(
                    cart.delivery.type === 'orca_pickup'
                      ? 'Veuillez renseigner le nom et prénom de la personne qui vient récupérer la box (obligatoire).'
                      : 'Veuillez renseigner le nom et prénom du destinataire (obligatoire).'
                  );
                  return;
                }

                if (!phone || phone.length < 6) {
                  setValidationError('Veuillez renseigner le numéro de téléphone pour la réception (obligatoire).');
                  return;
                }

                if (cart.delivery.type === 'home_delivery') {
                  const addr = cart.delivery.address?.trim() || '';
                  if (!addr || addr.length < 3) {
                    setValidationError('Veuillez renseigner le quartier et l’adresse de livraison (obligatoire).');
                    return;
                  }
                }

                setValidationError(null);
                onValidateCart();
              }}
              className="w-full sm:w-auto px-7 py-3 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs active:scale-98 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Ajouter au panier (1)</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
