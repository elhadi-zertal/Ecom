"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/supabase";

export default function HomeClient({ products }: { products: Product[] }) {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero section */}
      <div className="text-center mb-14">
        <h1 className="text-4xl sm:text-5xl font-black mb-4">
          <span className="gradient-text">{t("homeTitle")}</span>
        </h1>
        <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
          {t("siteName")}
        </p>
        <div className="mt-6 flex justify-center">
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" />
        </div>
      </div>

      {/* Product grid */}
      {products.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">🛍️</div>
          <p className="text-[var(--text-secondary)] text-lg">{t("noProducts")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <div key={product.id} style={{ animationDelay: `${i * 60}ms` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
