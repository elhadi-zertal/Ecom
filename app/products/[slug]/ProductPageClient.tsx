"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Product, DeliveryPrice } from "@/lib/supabase";
import ImageGallery from "@/components/ImageGallery";
import OrderForm from "@/components/OrderForm";

interface ProductPageClientProps {
  product: Product;
  wilayas: DeliveryPrice[];
}

export default function ProductPageClient({ product, wilayas }: ProductPageClientProps) {
  const { t, lang } = useLanguage();

  const name = lang === "ar" ? product.name_ar : product.name_fr;
  const description = lang === "ar" ? product.description_ar : product.description_fr;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-[var(--text-secondary)]">
        <a href="/" className="hover:text-purple-400 transition-colors">
          {t("homeTitle")}
        </a>
        <span className="mx-2">/</span>
        <span className="text-white">{name}</span>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Gallery */}
        <div>
          <ImageGallery images={product.images || []} productName={name} />
        </div>

        {/* Product info */}
        <div className="space-y-6 flex flex-col justify-start">
          <div>
            <h1 className="text-3xl font-black text-white mb-3">{name}</h1>
            <p className="text-4xl font-black text-purple-400">
              {product.price.toLocaleString()} <span className="text-2xl">{t("da")}</span>
            </p>
          </div>

          {description && (
            <div className="glass-card p-5">
              <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>
          )}

          {/* Colors quick preview */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <p className="text-sm text-[var(--text-secondary)] mb-2">{t("color")}</p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <div
                    key={c}
                    title={c}
                    className="w-6 h-6 rounded-full border border-white/20"
                    style={{ background: c.startsWith("#") ? c : undefined, backgroundColor: !c.startsWith("#") ? "#6b7280" : undefined }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px flex-1 bg-[var(--border)]" />
        <span className="text-white font-bold text-lg">{t("orderFormTitle")}</span>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      {/* Order form */}
      <div className="max-w-2xl mx-auto">
        <OrderForm product={product} wilayas={wilayas} />
      </div>
    </div>
  );
}
