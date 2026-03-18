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
    <div className="glass-card overflow-hidden group hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-900/20 animate-fade-in-up">
      <div className="relative w-full aspect-square overflow-hidden bg-[var(--bg-input)]">
        <Image
          src={mainImage}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%231a1a26'/%3E%3Ctext x='50%25' y='50%25' fill='%233d3d52' font-size='60' text-anchor='middle' dy='.3em'%3E🛍️%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-base text-white mb-1 truncate">{name}</h3>
        <p className="text-purple-400 font-bold text-xl mb-4">
          {product.price.toLocaleString()} {t("da")}
        </p>

        <Link href={`/products/${product.slug}`} className="btn-primary w-full text-sm py-3">
          {t("orderNow")}
        </Link>
      </div>
    </div>
  );
}
