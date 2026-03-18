"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const { t, toggleLang, lang } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)]"
      style={{ background: "rgba(10,10,15,0.85)", backdropFilter: "blur(16px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            DZ
          </div>
          <span className="font-bold text-lg text-white group-hover:text-purple-400 transition-colors">
            {t("siteName")}
          </span>
        </Link>

        <button
          onClick={toggleLang}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] text-sm font-semibold text-[var(--text-secondary)] hover:text-white hover:border-purple-500 transition-all duration-200"
        >
          <span className="w-5 h-5 rounded-full border border-current text-xs flex items-center justify-center font-bold">
            {lang === "ar" ? "FR" : "ع"}
          </span>
          {t("toggleLang")}
        </button>
      </div>
    </header>
  );
}
