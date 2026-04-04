"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { DeliveryPrice } from "@/lib/supabase";

interface WilayaSelectorProps {
  wilayas: DeliveryPrice[];
  value: string;
  onChange: (wilayaNumber: string) => void;
  error?: string;
}

export default function WilayaSelector({ wilayas, value, onChange, error }: WilayaSelectorProps) {
  const { t, lang } = useLanguage();

  return (
    <div>
      <label className="block text-sm font-medium text-[#888888] mb-2">
        {t("wilaya")}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
        style={{
          appearance: "none",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23555555' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "calc(100% - 12px) center",
          paddingInlineEnd: "2.5rem",
        }}
      >
        <option value="">{t("wilayaPlaceholder")}</option>
        {wilayas.map((w) => (
          <option key={w.wilaya_number} value={w.wilaya_number}>
            {w.wilaya_number} - {lang === "ar" ? w.wilaya_name_ar : w.wilaya_name_fr}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
