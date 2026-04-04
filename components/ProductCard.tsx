"use client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Product } from "@/lib/supabase";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t, lang } = useLanguage();
  const name = lang === "ar" ? product.name_ar : product.name_fr;
  const mainImage = product.images?.[0] || "/placeholder.jpg";

  return (
    <div
      className="group overflow-hidden flex flex-col"
      style={{
        background: "#111111",
        border: "1px solid #222222",
        borderRadius: "16px",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#333333";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 8px 40px rgba(0,0,0,0.6)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#222222";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#0d0d0d]">
        <Image
          src={mainImage}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23111111'/%3E%3Ctext x='50%25' y='50%25' fill='%23333333' font-size='60' text-anchor='middle' dy='.3em'%3E🛍️%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3
          className="font-semibold text-sm text-white mb-1 truncate leading-snug"
          style={{ letterSpacing: "-0.01em" }}
        >
          {name}
        </h3>
        <p className="text-white font-bold text-base mb-4" style={{ letterSpacing: "-0.02em" }}>
          {product.price.toLocaleString()} {t("da")}
        </p>

        <Link
          href={`/products/${product.slug}`}
          className="btn-primary w-full text-sm py-[10px] mt-auto"
        >
          {t("orderNow")}
        </Link>
      </div>
    </div>
  );
}
