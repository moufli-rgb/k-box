import { DominantColor, EventType, FormulaConfig, GiftItem } from '../types';

export const FORMULAS: FormulaConfig[] = [
  {
    id: 'kbox-1',
    code: 'KB-1',
    name: 'K-Box 1 : Box Surprise',
    subtitle: 'La douceur d’un cadeau mystère composé avec amour',
    basePrice: 3000,
    freeDeliveryIncluded: false,
    allowsItemSelection: false,
    allowsCustomText: false,
    description: 'Une sélection délicate et mystère selon le sexe et la couleur dominante choisie.',
    features: [
      'Choix du sexe du destinataire',
      'Choix de la couleur dominante du cadeau',
      'Sélection surprise harmonieuse',
      'Emballage cadeau soigné avec ruban',
      'Retrait gratuit à Orca Déco ou livraison (selon localisation)'
    ]
  },
  {
    id: 'kbox-2',
    code: 'KB-2',
    name: 'K-Box 2 : Box Semi-Personnalisée',
    subtitle: 'Composez l’intérieur selon vos envies et le stock',
    badge: 'Coup de Cœur',
    basePrice: 5000,
    freeDeliveryIncluded: false,
    allowsItemSelection: true,
    allowsCustomText: false,
    description: 'Sélectionnez librement vos articles coups de cœur en stock. Vous pouvez sélectionner ou désélectionner vos cadeaux à tout moment.',
    features: [
      'Choix du sexe et de la couleur dominante (ou couleur personnalisée)',
      'Sélection libre de vos articles préférés selon le stock',
      'Désélection et ajustement facile en un clic',
      'Emballage élégant & ruban satin',
      'Retrait gratuit à Orca Déco ou livraison (selon localisation)'
    ]
  },
  {
    id: 'kbox-3',
    code: 'KB-3',
    name: 'K-Box 3 : Box Personnalisée',
    subtitle: 'Gravure de votre mot doux & livraison offerte',
    badge: 'Livraison Offerte',
    basePrice: 10000,
    freeDeliveryIncluded: true,
    allowsItemSelection: true,
    allowsCustomText: true,
    description: 'Composez librement vos articles, personnalisez avec votre message sur l’emballage, sur un article ou les deux, et profitez de la livraison offerte !',
    features: [
      'Choix du sexe et de la couleur dominante (ou couleur personnalisée)',
      'Sélection libre de vos articles en stock',
      'Personnalisation au choix : Emballage, Article ou Les Deux',
      'Inscription de votre mot / message personnalisé',
      'Livraison offerte incluse (ou retrait à Orca Déco)'
    ]
  }
];

export const BOX_FORMULA_IMAGES: Record<string, string> = {
  'kbox-1': 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80',
  'kbox-2': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
  'kbox-3': 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=800&auto=format&fit=crop&q=80'
};

export const HOME_CAROUSEL_SLIDES = [
  {
    id: 1,
    title: 'Des attentions pensées avec douceur',
    subtitle: 'Pour vos anniversaires, réussites, Noël et moments d’amour.',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&auto=format&fit=crop&q=80',
    tag: 'Frais & Calme'
  },
  {
    id: 2,
    title: 'L’émotion d’une box personnalisée',
    subtitle: 'Inscrivez vos mots les plus tendres sur l’emballage ou sur l’article.',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1200&auto=format&fit=crop&q=80',
    tag: 'Sur Mesure'
  },
  {
    id: 3,
    title: 'Retrait pratique à Orca Déco Jericho',
    subtitle: 'Récupérez gratuitement votre coffret à Orca Déco Jericho (Cotonou) ou faites-vous livrer.',
    imageUrl: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=1200&auto=format&fit=crop&q=80',
    tag: 'Simple & Rapide'
  }
];

export const EVENTS: { id: EventType; label: string; icon: string }[] = [
  { id: 'Anniversaire', label: 'Anniversaire', icon: '🎂' },
  { id: 'Saint-Valentin', label: 'Saint-Valentin', icon: '🌸' },
  { id: 'Noël', label: 'Noël & Fin d’année', icon: '✨' },
  { id: 'Réussite & Diplôme', label: 'Réussite & Diplôme', icon: '🎓' },
  { id: 'Déclaration d’Amour', label: 'Déclaration d’Amour', icon: '💌' },
  { id: 'Fête des Mères/Pères', label: 'Fête des Mères / Pères', icon: '🌿' },
  { id: 'Remerciement', label: 'Juste pour faire plaisir', icon: '🤍' },
  { id: 'Autre', label: 'Autre événement (à préciser)', icon: '✏️' },
];

export const DOMINANT_COLORS: DominantColor[] = [
  {
    id: 'rouge',
    name: 'Rouge',
    hex: '#DC2626',
    secondaryHex: '#FEF2F2',
    ribbonHex: '#991B1B',
    description: 'Chaleureux et éclatant'
  },
  {
    id: 'bleu',
    name: 'Bleu',
    hex: '#2563EB',
    secondaryHex: '#EFF6FF',
    ribbonHex: '#1D4ED8',
    description: 'Élégant et apaisant'
  },
  {
    id: 'noir',
    name: 'Noir',
    hex: '#18181B',
    secondaryHex: '#F4F4F5',
    ribbonHex: '#3F3F46',
    description: 'Sobre, chic et moderne'
  },
  {
    id: 'blanc',
    name: 'Blanc',
    hex: '#F5F5F4',
    secondaryHex: '#FFFFFF',
    ribbonHex: '#D6D3D1',
    description: 'Pur et intemporel'
  },
  {
    id: 'rose',
    name: 'Rose',
    hex: '#EC4899',
    secondaryHex: '#FDF2F8',
    ribbonHex: '#BE185D',
    description: 'Doux et poétique'
  },
  {
    id: 'dore-or',
    name: 'Doré / Or',
    hex: '#D4AF37',
    secondaryHex: '#FDFBF0',
    ribbonHex: '#A17A16',
    description: 'Festif et raffiné'
  },
  {
    id: 'vert',
    name: 'Vert',
    hex: '#16A34A',
    secondaryHex: '#F0FDF4',
    ribbonHex: '#15803D',
    description: 'Naturel et végétal'
  },
  {
    id: 'jaune',
    name: 'Jaune',
    hex: '#EAB308',
    secondaryHex: '#FEFCE8',
    ribbonHex: '#A16207',
    description: 'Lumineux et joyeux'
  },
  {
    id: 'violet',
    name: 'Violet',
    hex: '#9333EA',
    secondaryHex: '#FAF5FF',
    ribbonHex: '#7E22CE',
    description: 'Créatif et chaleureux'
  },
  {
    id: 'custom',
    name: 'Autre couleur',
    hex: '#78716C',
    secondaryHex: '#F5F5F4',
    ribbonHex: '#44403C',
    description: 'Saisissez votre couleur',
    isCustom: true
  }
];

export const INITIAL_GIFT_ITEMS: GiftItem[] = [
  // --- Catégorie 1: Gourmandise (Tous & Enfant) ---
  {
    id: 'item-1',
    name: 'Chocolats Fins Artisanaux',
    category: 'Gourmandise',
    price: 1000,
    stock: 24,
    imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop&q=80',
    description: 'Bouchées chocolatées au cœur fondant praliné.',
    genderTag: 'Tous'
  },
  {
    id: 'item-g2',
    name: 'Biscuits Sablés Pur Beurre & Vanille',
    category: 'Gourmandise',
    price: 800,
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=80',
    description: 'Sablés dorés croustillants parfumés à la gousse de vanille.',
    genderTag: 'Tous'
  },
  {
    id: 'item-g3',
    name: 'Caramels Tendres Fleur de Sel',
    category: 'Gourmandise',
    price: 600,
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=600&auto=format&fit=crop&q=80',
    description: 'Petits caramels fondants au beurre doux et sel marin.',
    genderTag: 'Tous'
  },
  {
    id: 'item-g4',
    name: 'Thé Parfumé Fleur de Jasmin & Fruits',
    category: 'Gourmandise',
    price: 900,
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    description: 'Sachet mousseline de thé doux aux arômes floraux apaisants.',
    genderTag: 'Tous'
  },
  {
    id: 'item-g5',
    name: 'Pâte à Tartiner Praliné Noisette',
    category: 'Gourmandise',
    price: 1200,
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=600&auto=format&fit=crop&q=80',
    description: 'Pot dégustation onctueux aux noisettes torréfiées.',
    genderTag: 'Tous'
  },
  {
    id: 'item-g6',
    name: 'Miel Pur d’Oranger Artisanal',
    category: 'Gourmandise',
    price: 1000,
    stock: 22,
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80',
    description: 'Miel doré récolté avec soin aux notes d’agrumes subtiles.',
    genderTag: 'Tous'
  },
  {
    id: 'item-g7',
    name: 'Boîte de Bonbons Tendres Fruités & Sucettes',
    category: 'Gourmandise',
    price: 700,
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=600&auto=format&fit=crop&q=80',
    description: 'Douceurs acidulées et friandises pour les petits et les gourmands.',
    genderTag: 'Enfant / Mixte'
  },

  // --- Catégorie 2: Beauté & Senteur ---
  {
    id: 'item-2',
    name: 'Bougie Parfumée Fleur de Coton',
    category: 'Beauté & Senteur',
    price: 800,
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=80',
    description: 'Cire végétale parfumée en pot verre, senteur apaisante.',
    genderTag: 'Tous'
  },
  {
    id: 'item-6',
    name: 'Brume Corporelle & d’Ambiance Délicate',
    category: 'Beauté & Senteur',
    price: 1000,
    stock: 16,
    imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop&q=80',
    description: 'Flacon spray nomade aux effluves fraîches et florales.',
    genderTag: 'Femme'
  },
  {
    id: 'item-9',
    name: 'Savon Végétal Karité & Miel',
    category: 'Beauté & Senteur',
    price: 600,
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1607006314187-5785f8c62c3e?w=600&auto=format&fit=crop&q=80',
    description: 'Savon naturel parfumé pour une peau douce et nourrie.',
    genderTag: 'Tous'
  },
  {
    id: 'item-b4',
    name: 'Crème Mains Veloutée Amande Douce',
    category: 'Beauté & Senteur',
    price: 900,
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1608248597359-29918b28f328?w=600&auto=format&fit=crop&q=80',
    description: 'Soin hydratant protecteur au parfum enveloppant d’amande.',
    genderTag: 'Femme'
  },
  {
    id: 'item-b5',
    name: 'Huile Sèche Scintillante & Parfumée',
    category: 'Beauté & Senteur',
    price: 1400,
    stock: 14,
    imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&auto=format&fit=crop&q=80',
    description: 'Sublime le corps et les cheveux d’un éclat satiné.',
    genderTag: 'Femme'
  },
  {
    id: 'item-b6',
    name: 'Diffuseur Senteur Bâtonnets Rotin',
    category: 'Beauté & Senteur',
    price: 1500,
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600&auto=format&fit=crop&q=80',
    description: 'Diffusion douce et continue dans la chambre ou le salon.',
    genderTag: 'Tous'
  },
  {
    id: 'item-b-homme1',
    name: 'Baume Après-Rasage Hydratant Frais',
    category: 'Beauté & Senteur',
    price: 1100,
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=600&auto=format&fit=crop&q=80',
    description: 'Texture non grasse apaisante au cèdre et menthe vivifiante.',
    genderTag: 'Homme'
  },
  {
    id: 'item-b-homme2',
    name: 'Mini Eau de Parfum Notes Boisées & Cuir',
    category: 'Beauté & Senteur',
    price: 1300,
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&auto=format&fit=crop&q=80',
    description: 'Fragrance masculine élégante aux accents d’ambre et vétiver.',
    genderTag: 'Homme'
  },
  {
    id: 'item-b-homme3',
    name: 'Bougie Parfumée Bois de Santal & Ambre',
    category: 'Beauté & Senteur',
    price: 850,
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=80',
    description: 'Effluves chaleureuses et boisées dans un pot verre ambré.',
    genderTag: 'Homme'
  },

  // --- Catégorie 3: Papeterie & Souvenirs ---
  {
    id: 'item-7',
    name: 'Carnet de Notes Toucher Velours',
    category: 'Papeterie & Souvenir',
    price: 1000,
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    description: 'Couverture rigide douce et pages épaisses lignées.',
    genderTag: 'Femme'
  },
  {
    id: 'item-8',
    name: 'Stylo Métal Fin Doré Satiné',
    category: 'Papeterie & Souvenir',
    price: 700,
    stock: 28,
    imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=80',
    description: 'Écriture fluide avec corps doré satiné raffiné.',
    genderTag: 'Femme'
  },
  {
    id: 'item-p-homme1',
    name: 'Carnet Noir Cuir Grainé & Marque-Page',
    category: 'Papeterie & Souvenir',
    price: 1100,
    stock: 19,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    description: 'Carnet sobre et élégant à couverture noire grainée et ruban signet.',
    genderTag: 'Homme'
  },
  {
    id: 'item-p-homme2',
    name: 'Stylo Métal Noir Mat Prestige',
    category: 'Papeterie & Souvenir',
    price: 750,
    stock: 26,
    imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=80',
    description: 'Stylo noir mat haute précision avec détails chrome élégants.',
    genderTag: 'Homme'
  },
  {
    id: 'item-5',
    name: 'Mug Céramique Gravable "Douceur"',
    category: 'Papeterie & Souvenir',
    price: 1200,
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    description: 'Céramique mate au toucher doux pour les boissons chaudes.',
    genderTag: 'Tous'
  },
  {
    id: 'item-3',
    name: 'Mini Peluche Douceur Câlin',
    category: 'Papeterie & Souvenir',
    price: 1500,
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600&auto=format&fit=crop&q=80',
    description: 'Ourson doux avec son petit nœud en satin assorti.',
    genderTag: 'Enfant / Mixte'
  },
  {
    id: 'item-p-enfant1',
    name: 'Carnet Secret Cadenas & Stickers Fantaisie',
    category: 'Papeterie & Souvenir',
    price: 1000,
    stock: 16,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    description: 'Petit journal secret avec stickers colorés pour les enfants.',
    genderTag: 'Enfant / Mixte'
  },
  {
    id: 'item-p-enfant2',
    name: 'Set Crayons Pastels & Gommes Animaux',
    category: 'Papeterie & Souvenir',
    price: 700,
    stock: 22,
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=80',
    description: 'Boîte de crayons tendres et petites gommes rigolotes.',
    genderTag: 'Enfant / Mixte'
  },
  {
    id: 'item-p5',
    name: 'Cadre Photo Minimaliste Bois Clair',
    category: 'Papeterie & Souvenir',
    price: 1100,
    stock: 17,
    imageUrl: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=600&auto=format&fit=crop&q=80',
    description: 'Cadre élégant prêt à accueillir vos plus beaux souvenirs.',
    genderTag: 'Tous'
  },
  {
    id: 'item-p6',
    name: 'Marque-Page Métal Doré Dentelle',
    category: 'Papeterie & Souvenir',
    price: 500,
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
    description: 'Accessoire de lecture précieux orné d’un pompon soyeux.',
    genderTag: 'Femme'
  },

  // --- Catégorie 4: Accessoires & Mode ---
  {
    id: 'item-4',
    name: 'Porte-clé Cuir & Médaille Métal',
    category: 'Accessoire & Mode',
    price: 500,
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80',
    description: 'Finitions soignées en cuir grainé, personnalisable.',
    genderTag: 'Tous'
  },
  {
    id: 'item-10',
    name: 'Bracelet Fin Cordon & Perle Brillante',
    category: 'Accessoire & Mode',
    price: 1500,
    stock: 14,
    imageUrl: 'https://images.unsplash.com/photo-1611591475883-8a306c579899?w=600&auto=format&fit=crop&q=80',
    description: 'Cordon fin ajustable et pendentif minimaliste.',
    genderTag: 'Femme'
  },
  {
    id: 'item-a-homme1',
    name: 'Bracelet Cuir Tressé & Acier Magnétique',
    category: 'Accessoire & Mode',
    price: 1400,
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1611591475883-8a306c579899?w=600&auto=format&fit=crop&q=80',
    description: 'Élégant bracelet masculin en cuir véritable tressé et fermoir acier.',
    genderTag: 'Homme'
  },
  {
    id: 'item-a-homme2',
    name: 'Porte-Cartes Cuir Finition Surpiquée',
    category: 'Accessoire & Mode',
    price: 1200,
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80',
    description: 'Étui cartes compact et soigné en cuir avec compartiments sécurisés.',
    genderTag: 'Homme'
  },
  {
    id: 'item-a-homme3',
    name: 'Porte-clés Décapsuleur Métal & Cuir Brossé',
    category: 'Accessoire & Mode',
    price: 650,
    stock: 24,
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80',
    description: 'Accessoire pratique et élégant en cuir véritable et acier brossé.',
    genderTag: 'Homme'
  },
  {
    id: 'item-11',
    name: 'Miroir de Sac de Poche Gravable',
    category: 'Accessoire & Mode',
    price: 700,
    stock: 22,
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
    description: 'Double miroir de poche finition chrome avec face gravable.',
    genderTag: 'Femme'
  },
  {
    id: 'item-a4',
    name: 'Pochette Zippée Coton Bio & Velours',
    category: 'Accessoire & Mode',
    price: 1200,
    stock: 19,
    imageUrl: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&auto=format&fit=crop&q=80',
    description: 'Pochette polyvalente douce pour maquillage et petits trésors.',
    genderTag: 'Femme'
  },
  {
    id: 'item-a5',
    name: 'Châle Toucher Soie Douce',
    category: 'Accessoire & Mode',
    price: 2000,
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&auto=format&fit=crop&q=80',
    description: 'Étole vaporeuse au drapé fluide, idéale en toute saison.',
    genderTag: 'Femme'
  },
  {
    id: 'item-a-enfant1',
    name: 'Veilleuse Féerique LED Douce Nuit',
    category: 'Accessoire & Mode',
    price: 1200,
    stock: 14,
    imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&auto=format&fit=crop&q=80',
    description: 'Veilleuse miniature poétique diffusant une lueur chaleureuse.',
    genderTag: 'Enfant / Mixte'
  },
  {
    id: 'item-12',
    name: 'Guirlande Micro-LED Féerique',
    category: 'Accessoire & Mode',
    price: 800,
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1512474932049-78ac69eed10c?w=600&auto=format&fit=crop&q=80',
    description: 'Petites lumières chaudes pour illuminer l’intérieur du coffret.',
    genderTag: 'Tous'
  }
];

export const BUSINESS_CONFIG = {
  name: 'K-Box',
  tagline: 'L’Art d’offrir avec tendresse',
  phone: '+229 01 42 81 55 62',
  whatsappRawPhone: '2290142815562',
  email: 'contact@kbox-cadeaux.com',
  pickupLocation: 'Orca Déco Jericho, Cotonou',
  pickupFee: 0,
};
