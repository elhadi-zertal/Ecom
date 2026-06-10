"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type Lang = "ar" | "fr";

const translations = {
  ar: {
    // Navigation
    siteName: "متجر الجزائر",
    toggleLang: "Français",

    // Home
    homeTitle: "منتجاتنا",
    orderNow: "اطلب الآن",
    noProducts: "لا توجد منتجات متاحة حالياً",
    loading: "جاري التحميل...",

    // Product page
    productNotFound: "المنتج غير موجود",
    gallery: "معرض الصور",

    // Order form
    orderFormTitle: "أكمل طلبك",
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "أدخل اسمك الكامل",
    phone: "رقم الهاتف",
    phonePlaceholder: "0555 00 00 00",
    wilaya: "الولاية",
    wilayaPlaceholder: "اختر ولايتك",
    deliveryType: "نوع التوصيل",
    deliveryHome: "توصيل للمنزل",
    deliveryDesk: "توصيل للمكتب",
    color: "اللون",
    quantity: "الكمية",
    note: "ملاحظة (اختياري)",
    notePlaceholder: "أي ملاحظات إضافية...",
    confirmOrder: "تأكيد الطلب",

    // Order summary
    orderSummary: "ملخص الطلب",
    productPrice: "سعر المنتج",
    deliveryFee: "رسوم التوصيل",
    total: "المجموع",
    selectWilayaFirst: "اختر الولاية أولاً",
    da: "دج",

    // Validation errors
    nameRequired: "الاسم الكامل مطلوب",
    phoneRequired: "رقم الهاتف مطلوب",
    phoneInvalid: "رقم الهاتف غير صالح (يجب أن يبدأ بـ 0 ويحتوي على 10 أرقام)",
    wilayaRequired: "الولاية مطلوبة",
    colorRequired: "اختر لوناً",
    quantityMin: "الكمية يجب أن تكون 1 على الأقل",
    submitting: "جاري الإرسال...",

    // Thank you page
    thankYouTitle: "شكراً لك! 🎉",
    thankYouMessage: "تم استلام طلبك بنجاح. سيتواصل معك فريقنا قريباً.",
    orderDetails: "تفاصيل الطلبية",
    orderNumber: "رقم الطلب",
    orderCustomer: "العميل",
    orderPhone: "الهاتف",
    orderWilaya: "الولاية",
    orderDelivery: "التوصيل",
    orderProduct: "المنتج",
    orderColor: "اللون",
    orderQuantity: "الكمية",
    orderTotal: "الإجمالي",
    backToHome: "العودة للرئيسية",

    // Admin
    adminTitle: "لوحة الإدارة",
    adminLogin: "تسجيل الدخول",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    loginBtn: "دخول",
    loginError: "بيانات الدخول غير صحيحة",
    logout: "تسجيل الخروج",
    orders: "الطلبات",
    products: "المنتجات",
    allOrders: "الكل",
    pending: "قيد الانتظار",
    confirmed: "مؤكد",
    delivered: "تم التوصيل",
    canceled: "ملغى",
    noOrders: "لا توجد طلبات",
    date: "التاريخ",
    status: "الحالة",
    addProduct: "إضافة منتج",
    editProduct: "تعديل المنتج",
    deleteProduct: "حذف",
    saveProduct: "حفظ",
    cancelEdit: "إلغاء",
    productNameAr: "اسم المنتج (عربي)",
    productNameFr: "اسم المنتج (فرنسي)",
    productDescAr: "الوصف (عربي)",
    productDescFr: "الوصف (فرنسي)",
    productPriceAdmin: "السعر (دج)",
    productStock: "المخزون",
    productSlug: "الرابط (slug)",
    productColors: "الألوان (مفصولة بفاصلة)",
    productImages: "صور المنتج",
    uploadImages: "رفع صور",
    saving: "جاري الحفظ...",
    deleteConfirm: "هل أنت متأكد من حذف هذا المنتج؟",
    noProducts2: "لا توجد منتجات. أضف منتجاً جديداً.",
    errorOccurred: "حدث خطأ، حاول مجدداً",
    heroTitle: "تسوق بسهولة، توصيل لكل الجزائر",
    heroSubtitle: "أفضل المنتجات بجودة عالية وأسعار تنافسية، مع خدمة الدفع عند الاستلام والتوصيل السريع لباب منزلك أو مكتبك.",
    heroCta: "تسوق الآن",
    trustDelivery: "توصيل لـ 58 ولاية",
    trustCod: "دفع عند الاستلام",
    trustReturns: "إرجاع سهل",
    trustWhatsapp: "دعم على واتساب",
    aboutTitle: "من نحن",
    aboutText: "متجر الجزائر (Boutique DZ) هو وجهتكم الأولى للتسوق الإلكتروني في الجزائر. نسعى لتقديم أفضل المنتجات بجودة عالية وأسعار تنافسية، مع توفير خدمة التوصيل السريع إلى 58 ولاية والدفع عند الاستلام لضمان تجربة تسوق آمنة ومريحة لكم.",
    reviewsTitle: "آراء عملائنا",
    review1Name: "محمد",
    review1Wilaya: "الجزائر العاصمة",
    review1Text: "منتج رائع وتوصيل سريع جداً! تعامل محترف ودفع عند الاستلام مريح للغاية. أنصح بالتعامل معهم.",
    review2Name: "أمينة",
    review2Wilaya: "وهران",
    review2Text: "جودة المنتجات ممتازة، والتوصيل كان لباب المنزل. خدمة العملاء سريعة الاستجابة على الواتساب.",
    review3Name: "خالد",
    review3Wilaya: "قسنطينة",
    review3Text: "تجربة شراء ممتازة وسهلة. وصلني المنتج كما في الصور تماماً. شكراً لكم.",
    cartTitle: "السلة",
    cartEmpty: "السلة فارغة",
    selectProductFirst: "الرجاء اختيار منتج أولاً للطلب",
    navHome: "الرئيسية",
    navProducts: "المنتجات",
    navAbout: "من نحن",
    footerRights: "جميع الحقوق محفوظة © Boutique DZ 2025",
    deliveryHomeFeeText: "توصيل للمنزل",
    deliveryDeskFeeText: "توصيل للمكتب",
    deliveryDetailHelper: "التوصيل: {home} دج للمنزل / {desk} دج للمكتب",
    estDeliveryTime: "وقت التوصيل المتوقع",
    estDeliveryDays: "3-5 أيام",
    contactWhatsapp: "تواصل معنا عبر واتساب",
    whatsappMessage: "مرحباً متجر الجزائر، أود الاستفسار بخصوص طلبي رقم",
  },
  fr: {
    // Navigation
    siteName: "Boutique DZ",
    toggleLang: "عربي",

    // Home
    homeTitle: "Nos produits",
    orderNow: "Commander",
    noProducts: "Aucun produit disponible pour le moment",
    loading: "Chargement...",

    // Product page
    productNotFound: "Produit introuvable",
    gallery: "Galerie photos",

    // Order form
    orderFormTitle: "Finalisez votre commande",
    fullName: "Nom complet",
    fullNamePlaceholder: "Entrez votre nom complet",
    phone: "Numéro de téléphone",
    phonePlaceholder: "0555 00 00 00",
    wilaya: "Wilaya",
    wilayaPlaceholder: "Sélectionnez votre wilaya",
    deliveryType: "Mode de livraison",
    deliveryHome: "Livraison à domicile",
    deliveryDesk: "Livraison au bureau",
    color: "Couleur",
    quantity: "Quantité",
    note: "Note (optionnelle)",
    notePlaceholder: "Remarques supplémentaires...",
    confirmOrder: "Confirmer la commande",

    // Order summary
    orderSummary: "Récapitulatif",
    productPrice: "Prix du produit",
    deliveryFee: "Frais de livraison",
    total: "Total",
    selectWilayaFirst: "Sélectionnez une wilaya d'abord",
    da: "DA",

    // Validation errors
    nameRequired: "Le nom complet est requis",
    phoneRequired: "Le numéro de téléphone est requis",
    phoneInvalid: "Numéro de téléphone invalide (doit commencer par 0 et contenir 10 chiffres)",
    wilayaRequired: "La wilaya est requise",
    colorRequired: "Sélectionnez une couleur",
    quantityMin: "La quantité doit être au moins 1",
    submitting: "Envoi en cours...",

    // Thank you page
    thankYouTitle: "Merci ! 🎉",
    thankYouMessage: "Votre commande a été reçue avec succès. Notre équipe vous contactera bientôt.",
    orderDetails: "Détails de la commande",
    orderNumber: "N° de commande",
    orderCustomer: "Client",
    orderPhone: "Téléphone",
    orderWilaya: "Wilaya",
    orderDelivery: "Livraison",
    orderProduct: "Produit",
    orderColor: "Couleur",
    orderQuantity: "Quantité",
    orderTotal: "Total",
    backToHome: "Retour à l'accueil",

    // Admin
    adminTitle: "Tableau de bord",
    adminLogin: "Connexion admin",
    email: "E-mail",
    password: "Mot de passe",
    loginBtn: "Se connecter",
    loginError: "Identifiants incorrects",
    logout: "Se déconnecter",
    orders: "Commandes",
    products: "Produits",
    allOrders: "Toutes",
    pending: "En attente",
    confirmed: "Confirmée",
    delivered: "Livrée",
    canceled: "Annulée",
    noOrders: "Aucune commande",
    date: "Date",
    status: "Statut",
    addProduct: "Ajouter un produit",
    editProduct: "Modifier le produit",
    deleteProduct: "Supprimer",
    saveProduct: "Enregistrer",
    cancelEdit: "Annuler",
    productNameAr: "Nom du produit (arabe)",
    productNameFr: "Nom du produit (français)",
    productDescAr: "Description (arabe)",
    productDescFr: "Description (français)",
    productPriceAdmin: "Prix (DA)",
    productStock: "Stock",
    productSlug: "Slug",
    productColors: "Couleurs (séparées par virgule)",
    productImages: "Images du produit",
    uploadImages: "Télécharger des images",
    saving: "Enregistrement...",
    deleteConfirm: "Êtes-vous sûr de supprimer ce produit ?",
    noProducts2: "Aucun produit. Ajoutez-en un.",
    errorOccurred: "Une erreur s'est produite, réessayez",
    heroTitle: "Achetez facilement, livraison dans toute l'Algérie",
    heroSubtitle: "Les meilleurs produits aux meilleurs prix, paiement à la livraison et livraison rapide chez vous ou à votre bureau.",
    heroCta: "Acheter maintenant",
    trustDelivery: "Livraison 58 Wilayas",
    trustCod: "Paiement à la livraison",
    trustReturns: "Retour facile",
    trustWhatsapp: "Support sur WhatsApp",
    aboutTitle: "À propos de nous",
    aboutText: "Boutique DZ est votre destination de premier choix pour le shopping en ligne en Algérie. Nous nous efforçons de proposer les meilleurs produits avec une haute qualité et des prix compétitifs, tout en assurant une livraison rapide dans les 58 wilayas et le paiement à la livraison pour vous garantir une expérience d'achat sûre et confortable.",
    reviewsTitle: "Avis de nos clients",
    review1Name: "Mohamed",
    review1Wilaya: "Alger",
    review1Text: "Produit excellent et livraison très rapide ! Service très professionnel et paiement à la livraison très pratique. Je recommande.",
    review2Name: "Amina",
    review2Wilaya: "Oran",
    review2Text: "La qualité des produits est excellente, et la livraison s'est faite à domicile. Le service client est très réactif sur WhatsApp.",
    review3Name: "Khaled",
    review3Wilaya: "Constantine",
    review3Text: "Excellente expérience d'achat simple. Le produit est arrivé exactement comme sur les photos. Merci.",
    cartTitle: "Panier",
    cartEmpty: "Le panier est vide",
    selectProductFirst: "Veuillez choisir un produit d'abord pour commander",
    navHome: "Accueil",
    navProducts: "Produits",
    navAbout: "À propos",
    footerRights: "Tous droits réservés © Boutique DZ 2025",
    deliveryHomeFeeText: "Livraison à domicile",
    deliveryDeskFeeText: "Livraison au bureau",
    deliveryDetailHelper: "Livraison : {home} DA à domicile / {desk} DA au bureau",
    estDeliveryTime: "Délai de livraison estimé",
    estDeliveryDays: "3-5 jours",
    contactWhatsapp: "Contactez-nous sur WhatsApp",
    whatsappMessage: "Bonjour Boutique DZ, je souhaite obtenir des informations sur ma commande",
  },
};

type TranslationKey = keyof typeof translations.ar;

interface LanguageContextType {
  lang: Lang;
  t: (key: TranslationKey) => string;
  toggleLang: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ar",
  t: (key) => key,
  toggleLang: () => {},
  isRTL: true,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored === "ar" || stored === "fr") {
      setLang(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    const next: Lang = lang === "ar" ? "fr" : "ar";
    setLang(next);
    localStorage.setItem("lang", next);
  };

  const t = (key: TranslationKey): string => {
    return translations[lang][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, isRTL: lang === "ar" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
