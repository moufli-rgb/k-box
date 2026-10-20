/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { HowItWorksView } from './components/HowItWorksView';
import { BuilderView } from './components/BuilderView';
import { ContactView } from './components/ContactView';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { 
  CartState, 
  FormulaId, 
  GiftItem, 
  OrderRecord 
} from './types';
import { 
  FORMULAS, 
  DOMINANT_COLORS, 
  INITIAL_GIFT_ITEMS 
} from './data/mockData';
import { calculateCartTotals, generateCartCode, getWhatsAppUrl } from './utils/helpers';

export default function App() {
  // Navigation tab: 'accueil' | 'comment-ca-marche' | 'faire-mon-kbox' | 'contact'
  const [currentTab, setCurrentTab] = useState<NavTab>('accueil');

  // Catalog items adapted by gender
  const [catalog] = useState<GiftItem[]>(() => {
    try {
      const saved = localStorage.getItem('kbox_catalog_v5');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].genderTag) {
          return parsed;
        }
      }
      return INITIAL_GIFT_ITEMS;
    } catch {
      return INITIAL_GIFT_ITEMS;
    }
  });

  // Orders history
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem('kbox_orders_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active selected formula (defaults to K-Box 2 or K-Box 3)
  const [formulaId, setFormulaId] = useState<FormulaId>('kbox-3');

  // Has configured box in cart
  const [hasBoxInCart, setHasBoxInCart] = useState<boolean>(() => {
    try {
      return localStorage.getItem('kbox_has_cart_box') === 'true';
    } catch {
      return false;
    }
  });

  // Unique cart code
  const [cartCode, setCartCode] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('kbox_active_cart_code');
      return saved || 'KB24';
    } catch {
      return 'KB24';
    }
  });

  // Active cart state
  const [cart, setCart] = useState<CartState>({
    formulaId: 'kbox-3',
    event: 'Anniversaire',
    gender: 'Femme',
    color: DOMINANT_COLORS[0],
    selectedItems: [],
    customization: {
      target: 'packaging',
      customText: '',
      targetItemId: undefined,
    },
    delivery: {
      type: 'orca_pickup',
      recipientName: '',
      phone: '',
      fee: 0,
      address: '',
    }
  });

  // Modals
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kbox_orders_v1', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  // Sync cart status to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kbox_has_cart_box', hasBoxInCart ? 'true' : 'false');
      localStorage.setItem('kbox_active_cart_code', cartCode);
    } catch {
      // ignore
    }
  }, [hasBoxInCart, cartCode]);

  // Current formula config
  const currentFormula = FORMULAS.find((f) => f.id === formulaId) || FORMULAS[2];

  // Handle formula change (reset items if not allowed)
  const handleSelectFormula = (id: FormulaId) => {
    setFormulaId(id);
    const newFormula = FORMULAS.find((f) => f.id === id)!;
    
    setCart((prev) => {
      let items = prev.selectedItems;
      if (!newFormula.allowsItemSelection) {
        items = [];
      }
      return {
        ...prev,
        formulaId: id,
        selectedItems: items,
      };
    });
  };

  const handleStartBuilderWithFormula = (id: FormulaId) => {
    handleSelectFormula(id);
    setCurrentTab('faire-mon-kbox');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart calculations
  const {
    itemsTotal,
    basePrice,
    deliveryFee,
    grandTotal,
    itemBudgetRemaining,
    isBudgetCapReached
  } = calculateCartTotals(cart, currentFormula);

  // When user finishes the builder process and clicks "Ajouter au panier (1)"
  const handleAddToCart = () => {
    const code = cartCode || generateCartCode();
    setCartCode(code);
    setHasBoxInCart(true);
    setIsCartDrawerOpen(true);
  };

  // Build the order record
  const createOrderRecord = (): OrderRecord => {
    const finalEvent = cart.event === 'Autre' && cart.customEventText 
      ? cart.customEventText 
      : cart.event;

    const finalColor = cart.color.isCustom && cart.customColorText
      ? cart.customColorText
      : cart.color.name;

    return {
      id: 'order-' + Date.now(),
      cartCode: cartCode,
      createdAt: new Date().toISOString(),
      formulaId: currentFormula.id,
      formulaName: currentFormula.name,
      event: finalEvent,
      gender: cart.gender,
      colorName: finalColor,
      items: cart.selectedItems.map((entry) => ({
        id: entry.item.id,
        name: entry.item.name,
        price: entry.item.price,
        quantity: entry.quantity
      })),
      itemsTotal,
      basePrice,
      deliveryFee,
      totalAmount: grandTotal,
      deliveryType: cart.delivery.type,
      deliveryAddress: cart.delivery.type === 'home_delivery' 
        ? (cart.delivery.address || 'À confirmer selon quartier')
        : 'Point Relais Orca Déco Jericho (Gratuit)',
      recipientName: cart.delivery.recipientName || 'Client K-Box',
      recipientPhone: cart.delivery.phone || 'Non renseigné',
      customization: currentFormula.allowsCustomText && cart.customization?.customText
        ? {
            target: cart.customization.target,
            customText: cart.customization.customText,
            targetItemName: cart.selectedItems.find(i => i.item.id === cart.customization?.targetItemId)?.item.name
          }
        : undefined,
      status: 'en_attente_depot'
    };
  };

  // When user clicks "Envoyer votre panier à K-Box" from the Cart
  const handleSendOrderToWhatsApp = () => {
    const newOrder = createOrderRecord();
    setOrders((prev) => [newOrder, ...prev]);
    setIsCartDrawerOpen(false);

    // Reset cart and remove cart badge number
    setHasBoxInCart(false);
    try {
      localStorage.setItem('kbox_has_cart_box', 'false');
    } catch {
      // ignore
    }
    setCart((prev) => ({
      ...prev,
      selectedItems: [],
      customization: {
        target: 'packaging',
        customText: '',
        targetItemId: undefined,
      },
    }));

    // Open WhatsApp directly with full details and code
    const url = getWhatsAppUrl(newOrder);
    window.open(url, '_blank');
  };

  // Cart badge count: 1 if configured box is added to cart, else 0
  const cartBadgeCount = hasBoxInCart ? 1 : 0;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-stone-800 selection:text-white">
      {/* 
        Navigation: 
        - ACCUEIL
        - COMMENT ÇA MARCHE
        - FAIRE MON K-BOX
        - CONTACT
        - PANIER (avec badge 1 dès l'ajout)
        - Brand: K-BOX avec gros point en bas
        - Pas de bande noire en haut
      */}
      <Navbar
        currentTab={currentTab}
        onNavigate={setCurrentTab}
        cartItemCount={cartBadgeCount}
        onOpenCart={() => setIsCartDrawerOpen(true)}
      />

      {/* Main Content Area according to selected tab */}
      <main className="flex-1 w-full">
        {currentTab === 'accueil' && (
          <HomeView onStartBuilderWithFormula={handleStartBuilderWithFormula} />
        )}

        {currentTab === 'comment-ca-marche' && (
          <HowItWorksView onStartBuilder={() => {
            setCurrentTab('faire-mon-kbox');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        )}

        {currentTab === 'faire-mon-kbox' && (
          <BuilderView
            cart={cart}
            formula={currentFormula}
            catalog={catalog}
            itemsTotal={itemsTotal}
            itemBudgetRemaining={itemBudgetRemaining}
            isBudgetCapReached={isBudgetCapReached}
            onSelectFormula={handleSelectFormula}
            onUpdateCart={setCart}
            onValidateCart={handleAddToCart}
          />
        )}

        {currentTab === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cart={cart}
        formula={currentFormula}
        cartCode={cartCode}
        hasConfiguredBox={hasBoxInCart}
        onNavigateToBuilder={() => {
          setCurrentTab('faire-mon-kbox');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSendOrder={handleSendOrderToWhatsApp}
      />

      {/* Calm & Fresh Footer */}
      <Footer />
    </div>
  );
}
