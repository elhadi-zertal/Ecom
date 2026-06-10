"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const { t, toggleLang, lang } = useLanguage();
  const { cartCount } = useCart();

  const handleCartClick = () => {
    const isProductPage = window.location.pathname.includes("/products/");
    if (isProductPage) {
      const el = document.getElementById("order-form");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      const el = document.getElementById("products-grid");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "/#products-grid";
      }
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid #1a1a1a",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span
            className="font-black text-xl tracking-tight text-white transition-opacity duration-200 group-hover:opacity-70"
            style={{ letterSpacing: "-0.03em" }}
          >
            Boutique<span className="text-[var(--accent-green)]"> DZ</span>
          </span>
        </Link>

        {/* Nav right */}
        <nav className="flex items-center gap-4">
          {/* Cart Icon */}
          <button
            onClick={handleCartClick}
            className="relative p-2 text-[#888888] hover:text-white transition-colors duration-200 flex items-center justify-center"
            title={t("cartTitle")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--accent-green)] text-black text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center animate-fade-in-up border border-black">
                {cartCount}
              </span>
            )}
          </button>

          {/* Redesigned language toggle switcher pill */}
          <div className="lang-toggle-pill">
            <button
              onClick={() => lang !== "ar" && toggleLang()}
              className={`lang-toggle-btn ${lang === "ar" ? "active" : "inactive"}`}
            >
              عربي
            </button>
            <button
              onClick={() => lang !== "fr" && toggleLang()}
              className={`lang-toggle-btn ${lang === "fr" ? "active" : "inactive"}`}
            >
              FR
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
