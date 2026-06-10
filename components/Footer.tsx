"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t, lang } = useLanguage();

  const handleScrollTo = (id: string) => {
    const isProductPage = window.location.pathname.includes("/products/");
    if (isProductPage) {
      window.location.href = `/${id}`;
    } else {
      const el = document.getElementById(id.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer
      style={{
        background: "#050505",
        borderTop: "1px solid #111111",
        color: "#888888",
      }}
      className="py-12 mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8 text-center md:text-start">
          {/* Logo & Store description */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span
                className="font-black text-2xl tracking-tight text-white"
                style={{ letterSpacing: "-0.03em" }}
              >
                Boutique<span className="text-[var(--accent-green)]"> DZ</span>
              </span>
            </Link>
            <p className="text-sm text-[#555555] leading-relaxed max-w-sm mx-auto md:mx-0">
              {lang === "ar"
                ? "متجركم الموثوق للتسوق في الجزائر. جودة عالية، دفع عند الاستلام وتوصيل سريع."
                : "Votre boutique de confiance en Algérie. Produits de qualité, paiement à la livraison et expédition rapide."}
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <h4 className="font-bold text-white text-sm tracking-wider uppercase">
              {lang === "ar" ? "روابط سريعة" : "Liens rapides"}
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/" className="hover:text-white transition-colors duration-200">
                {t("navHome")}
              </Link>
              <button
                onClick={() => handleScrollTo("#products-grid")}
                className="hover:text-white transition-colors duration-200 text-start"
              >
                {t("navProducts")}
              </button>
              <button
                onClick={() => handleScrollTo("#about-section")}
                className="hover:text-white transition-colors duration-200 text-start"
              >
                {t("navAbout")}
              </button>
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h4 className="font-bold text-white text-sm tracking-wider uppercase">
              {lang === "ar" ? "تواصل معنا" : "Suivez-nous"}
            </h4>
            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#111111] hover:bg-white hover:text-black text-[#888888] transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#111111] hover:bg-white hover:text-black text-[#888888] transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#111111] hover:bg-white hover:text-black text-[#888888] transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/213555000000"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-[#111111] hover:bg-[var(--accent-green)] hover:text-black text-[#888888] transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#111111] w-full my-6" />

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#444444]">
          <p>{t("footerRights")}</p>
          <div className="flex gap-4">
            <span className="hover:text-[#666666] cursor-pointer">
              {lang === "ar" ? "الشروط والأحكام" : "Conditions d'utilisation"}
            </span>
            <span className="hover:text-[#666666] cursor-pointer">
              {lang === "ar" ? "سياسة الخصوصية" : "Politique de confidentialité"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
