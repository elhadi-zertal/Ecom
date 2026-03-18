"use client";
import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  const handleThumbnailClick = (idx: number) => {
    if (idx === activeIndex) return;
    setActiveIndex(idx);
    setFadeKey((k) => k + 1);
  };

  const mainImage =
    images?.[activeIndex] ||
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' fill='%231a1a26'/%3E%3Ctext x='50%25' y='50%25' fill='%233d3d52' font-size='80' text-anchor='middle' dy='.3em'%3E🛍️%3C/text%3E%3C/svg%3E";

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div
        key={fadeKey}
        className="relative w-full rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border)]"
        style={{ aspectRatio: "1/1", animation: "fadeInUp 0.3s ease" }}
      >
        <Image
          src={mainImage}
          alt={productName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' fill='%231a1a26'/%3E%3Ctext x='50%25' y='50%25' fill='%233d3d52' font-size='80' text-anchor='middle' dy='.3em'%3E🛍️%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>

      {/* Thumbnails */}
      {images && images.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => handleThumbnailClick(idx)}
              className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                idx === activeIndex
                  ? "border-purple-500 shadow-md shadow-purple-500/30 scale-105"
                  : "border-[var(--border)] hover:border-purple-400 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} ${idx + 1}`}
                fill
                className="object-cover"
                sizes="64px"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%231a1a26'/%3E%3C/svg%3E";
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
