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
    <div
      style={{
        background: "#111111",
        border: "1px solid #222222",
        borderRadius: "14px",
        padding: "1.25rem",
      }}
    >
      <h3 className="font-semibold text-sm text-white mb-3 pb-3" style={{ borderBottom: "1px solid #1a1a1a" }}>
        {t("orderSummary")}
      </h3>

      <div className="space-y-2 text-sm mb-3">
        <div className="flex justify-between items-center">
          <span className="text-[#888888]">{t("productPrice")}</span>
          <span className="text-white font-medium">
            {productPrice.toLocaleString()} × {quantity}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[#888888]">{t("deliveryFee")}</span>
          <span className="text-white font-medium">
            {deliveryFee !== null ? `${deliveryFee.toLocaleString()} ${t("da")}` : "—"}
          </span>
        </div>

        {!wilayaNumber && (
          <p className="text-xs text-[#555555] italic text-center py-1">
            {t("selectWilayaFirst")}
          </p>
        )}
      </div>

      <div className="pt-3 flex justify-between items-center" style={{ borderTop: "1px solid #1a1a1a" }}>
        <span className="font-semibold text-white text-sm">{t("total")}</span>
        <span className="text-2xl font-black text-white" style={{ letterSpacing: "-0.03em" }}>
          {total !== null ? `${total.toLocaleString()} ${t("da")}` : "—"}
        </span>
      </div>
    </div>
  );
}
