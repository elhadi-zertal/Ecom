"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl mb-6">🔍</div>
      <h1 className="text-4xl font-black text-white mb-3">404</h1>
      <p className="text-[var(--text-secondary)] text-lg mb-8">
        {t("productNotFound")}
      </p>
      <Link href="/" className="btn-primary">
        {t("backToHome")}
      </Link>
    </div>
  );
}
