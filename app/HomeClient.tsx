"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import ProductCard from "@/components/ProductCard";
import { supabase, Product } from "@/lib/supabase";

function SkeletonCard() {
  return (
    <div
      className="overflow-hidden flex flex-col p-4 animate-pulse"
      style={{
        background: "#111111",
        border: "1px solid #222222",
        borderRadius: "16px",
      }}
    >
      <div className="w-full aspect-square bg-white/5 rounded-lg mb-4" />
      <div className="h-4 bg-white/5 rounded w-3/4 mb-2" />
      <div className="h-4 bg-white/5 rounded w-1/4 mb-6" />
      <div className="h-10 bg-white/5 rounded-xl mt-auto w-full" />
    </div>
  );
}

export default function HomeClient({ products: initialProducts }: { products: Product[] }) {
  const { t, lang } = useLanguage();
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [loading, setLoading] = useState(initialProducts?.length === 0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });
        if (data) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleScrollToProducts = () => {
    const el = document.getElementById("products-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      {/* 1. Homepage Hero Section */}
      <section className="relative w-full py-20 sm:py-32 overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-950 to-neutral-950 border-b border-[#111111]">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-emerald-500/10 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] rounded-full bg-teal-500/10 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 text-center flex flex-col items-center">
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight max-w-4xl tracking-tight"
            style={{ lineHeight: 1.15 }}
          >
            {t("heroTitle")}
          </h1>
          <p className="text-[#888888] text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            {t("heroSubtitle")}
          </p>
          <button
            onClick={handleScrollToProducts}
            className="btn-emerald px-10 py-4 text-base sm:text-lg rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 active:scale-95 transition-all duration-200"
          >
            {t("heroCta")}
          </button>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section className="w-full py-6 bg-[#090909] border-b border-[#111111]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 text-center">
            {/* Delivery */}
            <div className="flex items-center justify-center gap-3 p-3 rounded-xl bg-[#111111]/30 border border-[#222222]/30 hover:border-emerald-500/20 transition-colors duration-300">
              <span className="text-2xl">✅</span>
              <span className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                {t("trustDelivery")}
              </span>
            </div>
            {/* COD */}
            <div className="flex items-center justify-center gap-3 p-3 rounded-xl bg-[#111111]/30 border border-[#222222]/30 hover:border-emerald-500/20 transition-colors duration-300">
              <span className="text-2xl">🔒</span>
              <span className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                {t("trustCod")}
              </span>
            </div>
            {/* Returns */}
            <div className="flex items-center justify-center gap-3 p-3 rounded-xl bg-[#111111]/30 border border-[#222222]/30 hover:border-emerald-500/20 transition-colors duration-300">
              <span className="text-2xl">🔄</span>
              <span className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                {t("trustReturns")}
              </span>
            </div>
            {/* Support */}
            <div className="flex items-center justify-center gap-3 p-3 rounded-xl bg-[#111111]/30 border border-[#222222]/30 hover:border-emerald-500/20 transition-colors duration-300">
              <span className="text-2xl">📞</span>
              <span className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                {t("trustWhatsapp")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main product area */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20" id="products-grid">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
            style={{ letterSpacing: "-0.04em", lineHeight: 1.1 }}
          >
            {t("homeTitle")}
          </h2>
          <div className="w-16 h-1 bg-[var(--accent-green)] mx-auto rounded" />
        </div>

        {/* 3. Products Grid with Skeletons */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32 border border-[#222222] rounded-3xl bg-[#0d0d0d]">
            <p className="text-[#888888] text-lg">{t("noProducts")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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

      {/* 7. About/Reviews Section */}
      <section className="w-full py-20 bg-[#060606] border-t border-[#111111]" id="about-section">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* About Us ("من نحن") */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {t("aboutTitle")}
                </h3>
                <div className="w-12 h-1 bg-[var(--accent-green)] rounded" />
              </div>
              <p className="text-[#888888] text-sm sm:text-base leading-relaxed text-justify">
                {t("aboutText")}
              </p>
              <div className="p-5 rounded-2xl bg-[#111111] border border-[#222222] flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-xl font-bold">
                  📍
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold">
                    {lang === "ar" ? "شحن سريع وآمن" : "Expédition rapide"}
                  </h4>
                  <p className="text-xs text-[#555555]">
                    {lang === "ar"
                      ? "لباب البيت أو المكتب في كل الولايات"
                      : "Chez vous ou au bureau dans toutes les wilayas"}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {t("reviewsTitle")}
                </h3>
                <div className="w-12 h-1 bg-[var(--accent-green)] rounded" />
              </div>

              {/* Reviews Grid */}
              <div className="space-y-4">
                {/* Review 1 */}
                <div className="p-6 rounded-2xl bg-[#111111] border border-[#222222] hover:border-emerald-500/20 transition-all duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-white font-bold text-sm block">
                        {t("review1Name")}
                      </span>
                      <span className="text-xs text-[#555555] block">
                        📍 {t("review1Wilaya")}
                      </span>
                    </div>
                    {/* Stars */}
                    <div className="text-[var(--accent-green)] text-xs font-bold tracking-wider">
                      ★★★★★
                    </div>
                  </div>
                  <p className="text-sm text-[#888888] leading-relaxed">
                    "{t("review1Text")}"
                  </p>
                </div>

                {/* Review 2 */}
                <div className="p-6 rounded-2xl bg-[#111111] border border-[#222222] hover:border-emerald-500/20 transition-all duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-white font-bold text-sm block">
                        {t("review2Name")}
                      </span>
                      <span className="text-xs text-[#555555] block">
                        📍 {t("review2Wilaya")}
                      </span>
                    </div>
                    {/* Stars */}
                    <div className="text-[var(--accent-green)] text-xs font-bold tracking-wider">
                      ★★★★★
                    </div>
                  </div>
                  <p className="text-sm text-[#888888] leading-relaxed">
                    "{t("review2Text")}"
                  </p>
                </div>

                {/* Review 3 */}
                <div className="p-6 rounded-2xl bg-[#111111] border border-[#222222] hover:border-emerald-500/20 transition-all duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-white font-bold text-sm block">
                        {t("review3Name")}
                      </span>
                      <span className="text-xs text-[#555555] block">
                        📍 {t("review3Wilaya")}
                      </span>
                    </div>
                    {/* Stars */}
                    <div className="text-[var(--accent-green)] text-xs font-bold tracking-wider">
                      ★★★★☆
                    </div>
                  </div>
                  <p className="text-sm text-[#888888] leading-relaxed">
                    "{t("review3Text")}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
