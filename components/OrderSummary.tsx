"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { DeliveryPrice } from "@/lib/supabase";

interface OrderSummaryProps {
  productPrice: number;
  quantity: number;
  wilayaNumber: string;
  deliveryType: "home" | "desk" | "";
  wilayas: DeliveryPrice[];
}

export default function OrderSummary({
  productPrice,
  quantity,
  wilayaNumber,
  deliveryType,
  wilayas,
}: OrderSummaryProps) {
  const { t } = useLanguage();

  const selectedWilaya = wilayas.find((w) => w.wilaya_number === wilayaNumber);
  const deliveryFee =
    selectedWilaya && deliveryType
      ? deliveryType === "home"
        ? selectedWilaya.home_price
        : selectedWilaya.desk_price
      : null;

  const subtotal = productPrice * quantity;
  const total = deliveryFee !== null ? subtotal + deliveryFee : null;

  return (
    <div className="glass-card p-5 space-y-3 sticky top-20">
      <h3 className="font-bold text-base text-white border-b border-[var(--border)] pb-3">
        {t("orderSummary")}
      </h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-[var(--text-secondary)]">{t("productPrice")}</span>
          <span className="text-white font-medium">
            {productPrice.toLocaleString()} × {quantity}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[var(--text-secondary)]">{t("deliveryFee")}</span>
          <span className="text-white font-medium">
            {deliveryFee !== null ? `${deliveryFee.toLocaleString()} ${t("da")}` : "—"}
          </span>
        </div>

        {!wilayaNumber && (
          <p className="text-xs text-[var(--text-secondary)] italic text-center py-1">
            {t("selectWilayaFirst")}
          </p>
        )}
      </div>

      <div className="border-t border-[var(--border)] pt-3 flex justify-between items-center">
        <span className="font-bold text-white">{t("total")}</span>
        <span className="text-2xl font-black text-purple-400">
          {total !== null ? `${total.toLocaleString()} ${t("da")}` : "—"}
        </span>
      </div>
    </div>
  );
}
