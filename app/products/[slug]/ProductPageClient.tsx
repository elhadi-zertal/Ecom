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
    <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-[#555555] flex items-center gap-2">
        <a href="/" className="hover:text-white transition-colors duration-200">
          {t("homeTitle")}
        </a>
        <span className="text-[#333333]">/</span>
        <span className="text-[#888888]">{name}</span>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {/* Gallery */}
        <div>
          <ImageGallery images={product.images || []} productName={name} />
        </div>

        {/* Product info */}
        <div className="space-y-6 flex flex-col justify-start">
          <div>
            <h1
              className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              {name}
            </h1>
            <p
              className="text-3xl font-bold text-white"
              style={{ letterSpacing: "-0.02em" }}
            >
              {product.price.toLocaleString()}{" "}
              <span className="text-xl text-[#888888] font-medium">{t("da")}</span>
            </p>
          </div>

          {description && (
            <div
              style={{
                background: "#111111",
                border: "1px solid #222222",
                borderRadius: "12px",
                padding: "1.25rem",
              }}
            >
              <p className="text-[#888888] leading-relaxed whitespace-pre-line text-sm">
                {description}
              </p>
            </div>
          )}

          {/* Colors quick preview */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <p className="text-sm text-[#555555] mb-2">{t("color")}</p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <div
                    key={c}
                    title={c}
                    className="w-6 h-6 rounded-full"
                    style={{
                      border: "1px solid #333333",
                      background: c.startsWith("#") ? c : "#6b7280",
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-12">
        <div className="h-px flex-1 bg-[#1a1a1a]" />
        <span
          className="text-white font-bold text-sm tracking-widest uppercase"
          style={{ letterSpacing: "0.1em" }}
        >
          {t("orderFormTitle")}
        </span>
        <div className="h-px flex-1 bg-[#1a1a1a]" />
      </div>

      {/* Order form */}
      <div className="max-w-2xl mx-auto">
        <OrderForm product={product} wilayas={wilayas} />
      </div>
    </div>
  );
}
