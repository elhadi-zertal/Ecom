"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/supabase";

export default function HomeClient({ products }: { products: Product[] }) {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1
          className="text-5xl sm:text-6xl font-black text-white mb-4"
          style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}
        >
          {t("homeTitle")}
        </h1>
        <p className="text-[#888888] text-base sm:text-lg max-w-md mx-auto leading-relaxed">
          {t("siteName")}
        </p>
      </div>

      {/* Product grid */}
      {products.length === 0 ? (
        <div className="text-center py-32">
          <p className="text-[#888888] text-lg">{t("noProducts")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
