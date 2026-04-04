"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const { t, toggleLang, lang } = useLanguage();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(0,0,0,0.75)",
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
            Boutique<span className="text-[#888888]"> DZ</span>
          </span>
        </Link>

        {/* Nav right */}
        <nav className="flex items-center gap-1">
          <button
            onClick={toggleLang}
            className="relative px-4 py-2 text-sm font-medium text-[#888888] hover:text-white transition-all duration-200 group"
          >
            {lang === "ar" ? "FR" : "عر"}
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-white transition-all duration-300 group-hover:w-4/5" />
          </button>
        </nav>
      </div>
    </header>
  );
}
