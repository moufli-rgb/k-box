import { CartState, FormulaConfig, OrderRecord } from '../types';
import { BUSINESS_CONFIG } from '../data/mockData';

export function formatFCFA(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
}

/**
 * Generate order / cart code following the format specified in prompt: KB24
 */
export function generateCartCode(): string {
  try {
    const existingOrdersStr = localStorage.getItem('kbox_orders_v1');
    const existingOrders = existingOrdersStr ? JSON.parse(existingOrdersStr) : [];
    if (existingOrders.length === 0) {
      return 'KB24';
    }
    return `KB24-${existingOrders.length + 1}`;
  } catch {
    return 'KB24';
  }
}

/**
 * Computes the total price breakdown for the current cart state
 */
export function calculateCartTotals(cart: CartState, formula: FormulaConfig) {
  const itemsCount = cart.selectedItems.reduce(
    (sum, entry) => sum + entry.quantity,
    0
  );

  const itemsTotal = cart.selectedItems.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0
  );

  const basePrice = formula.basePrice; // 3000 for Box 1, 5000 for Box 2, 10000 for Box 3
  const deliveryFee = 0; // Orca is free, and Box 3 has free delivery included!
  const grandTotal = basePrice + deliveryFee;

  return {
    itemsCount,
    itemsTotal,
    basePrice,
    deliveryFee,
    grandTotal,
    itemBudgetRemaining: 0,
    isBudgetCapReached: false,
    isCountCapReached: false,
  };
}

/**
 * Generates the official WhatsApp message with user specifications
 */
export function buildWhatsAppMessage(order: OrderRecord): string {
  const greeting = `Bonjour K-BOX voici ma commande 🎁`;

  const itemsList = order.items.length > 0 
    ? order.items.map(i => `  • ${i.name} (x${i.quantity})`).join('\n')
    : '  • Sélection surprise selon formule';

  const customizationText = order.customization 
    ? `\nPersonnalisation : ${order.customization.target === 'packaging' ? 'Emballage' : order.customization.target === 'item' ? `Article (${order.customization.targetItemName || 'au choix'})` : 'Emballage & Article'}\nMot à inscrire : "${order.customization.customText}"`
    : '';

  const deliveryInfo = order.deliveryType === 'orca_pickup'
    ? `📍 Mode : Retrait Point Relais Orca Déco Jericho (Cotonou)\n👤 Récupérateur : ${order.recipientName || 'Non spécifié'}\n📞 Téléphone : ${order.recipientPhone || 'Non spécifié'}`
    : `🚚 Mode : Livraison à domicile\n📍 Adresse : ${order.deliveryAddress || 'À préciser'}\n👤 Destinataire : ${order.recipientName || 'Non spécifié'}\n📞 Téléphone : ${order.recipientPhone || 'Non spécifié'}`;

  return `${greeting}

Code Panier : *${order.cartCode}*
Formule : ${order.formulaName}
Montant : *${formatFCFA(order.totalAmount)}*

Événement : ${order.event} (${order.gender})
Couleur : ${order.colorName}
${deliveryInfo}${customizationText ? '\n' + customizationText : ''}

Articles choisis :
${itemsList}

Merci !`;
}

/**
 * Creates the direct wa.me link
 */
export function getWhatsAppUrl(order: OrderRecord, rawPhoneNumber: string = BUSINESS_CONFIG.whatsappRawPhone): string {
  const message = buildWhatsAppMessage(order);
  return `https://wa.me/${rawPhoneNumber}?text=${encodeURIComponent(message)}`;
}
