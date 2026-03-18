"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase, Order } from "@/lib/supabase";

export default function ThankYouPage() {
  const { t, lang } = useLanguage();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) { setLoading(false); return; }
    supabase
      .from("orders")
      .select("*, products(*)")
      .eq("id", orderId)
      .single()
      .then(({ data }) => {
        setOrder(data as Order);
        setLoading(false);
      });
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--text-secondary)]">{t("loading")}</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      {/* Success icon */}
      <div className="text-center mb-10 animate-fade-in-up">
        <div className="w-24 h-24 rounded-full bg-green-500/15 border-2 border-green-500/40 flex items-center justify-center text-5xl mx-auto mb-6">
          ✓
        </div>
        <h1 className="text-3xl font-black text-white mb-3">{t("thankYouTitle")}</h1>
        <p className="text-[var(--text-secondary)] text-lg">{t("thankYouMessage")}</p>
      </div>

      {/* Order details */}
      {order && (
        <div className="glass-card p-6 space-y-4 animate-fade-in-up">
          <h2 className="font-bold text-white text-lg border-b border-[var(--border)] pb-3">
            {t("orderDetails")}
          </h2>

          <div className="space-y-3 text-sm">
            <Row label={t("orderNumber")} value={`#${order.id.slice(0, 8).toUpperCase()}`} />
            <Row label={t("orderCustomer")} value={order.customer_name} />
            <Row label={t("orderPhone")} value={order.phone} dir="ltr" />
            <Row label={t("orderWilaya")} value={order.wilaya} />
            <Row
              label={t("orderDelivery")}
              value={order.delivery_type === "home" ? t("deliveryHome") : t("deliveryDesk")}
            />
            {order.products && (
              <Row
                label={t("orderProduct")}
                value={lang === "ar" ? order.products.name_ar : order.products.name_fr}
              />
            )}
            {order.color && <Row label={t("orderColor")} value={order.color} />}
            <Row label={t("orderQuantity")} value={String(order.quantity)} />
            <div className="flex justify-between items-center pt-3 border-t border-[var(--border)]">
              <span className="font-bold text-white text-base">{t("orderTotal")}</span>
              <span className="text-2xl font-black text-purple-400">
                {order.total.toLocaleString()} {t("da")}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link href="/" className="btn-primary px-8 py-3">
          {t("backToHome")}
        </Link>
      </div>
    </div>
  );
}

function Row({ label, value, dir }: { label: string; value: string; dir?: string }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="text-[var(--text-secondary)] flex-shrink-0">{label}</span>
      <span className="text-white font-medium text-end" dir={dir}>{value}</span>
    </div>
  );
}
