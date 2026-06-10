"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase, Order } from "@/lib/supabase";

function ThankYouContent() {
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
      <div className="text-[#888888]">{t("loading")}</div>
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

      {/* Estimated Delivery Time Banner */}
      <div className="animate-fade-in-up mb-6 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🚚</span>
          <div className="text-start">
            <span className="text-xs text-[#888888] block">{t("estDeliveryTime")}</span>
            <span className="text-white font-bold text-sm">{t("estDeliveryDays")}</span>
          </div>
        </div>
        <span className="text-xs bg-[var(--accent-green)]/10 text-[var(--accent-green)] px-3 py-1 rounded-full font-bold">
          {lang === "ar" ? "شحن سريع" : "Express"}
        </span>
      </div>

      {/* Order details */}
      {order && (
        <div className="animate-fade-in-up space-y-4 p-6" style={{ background: "#111111", border: "1px solid #222222", borderRadius: "14px" }}>
          <h2 className="font-semibold text-white text-base pb-3" style={{ borderBottom: "1px solid #1a1a1a" }}>
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
            <div className="flex justify-between items-center pt-3" style={{ borderTop: "1px solid #1a1a1a" }}>
              <span className="font-bold text-white text-base">{t("orderTotal")}</span>
              <span className="text-2xl font-black text-white" style={{ letterSpacing: "-0.03em" }}>
                {order.total.toLocaleString()} {t("da")}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Contact Button */}
      {order && (
        <div className="mt-6 animate-fade-in-up">
          <a
            href={`https://wa.me/213555000000?text=${encodeURIComponent(
              `${t("whatsappMessage")} #${order.id.slice(0, 8).toUpperCase()}`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold bg-[#25d366] text-black hover:bg-[#20ba5a] transition-colors duration-200 shadow-lg shadow-green-500/10 cursor-pointer text-sm sm:text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.977h.004c4.368 0 7.928-3.56 7.928-7.927a7.89 7.89 0 0 0-2.325-5.619zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.69-4.98c-.197-.1-.197-.1-.58-.3a.1.1 0 0 0-.01-.01c-.184-.1-.284-.148-.352-.05-.08.1-.3.375-.367.45-.068.075-.137.084-.33.012-.203-.075-.854-.315-1.625-.992-.6-.533-1.005-1.192-1.123-1.4-.118-.208-.013-.32.09-.422.094-.093.208-.24.312-.36.103-.12.137-.2.208-.35.07-.15.035-.28-.017-.38-.052-.1-.47-1.135-.644-1.555-.17-.41-.355-.355-.486-.355h-.414a.8.8 0 0 0-.58.26C4.855 4.3 4.5 4.7 4.5 5.5s.58 1.58.66 1.7c.08.12 1.14 1.74 2.76 2.44.385.166.685.267.923.342.383.12.732.103 1.01.062.308-.045.955-.39 1.09-.77.135-.38.135-.7 0-.77-.043-.07-.145-.1-.343-.2z" />
            </svg>
            <span>{t("contactWhatsapp")}</span>
          </a>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link href="/" className="btn-emerald px-8 py-3 font-bold">
          {t("backToHome")}
        </Link>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#888888]">Loading...</div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}

function Row({ label, value, dir }: { label: string; value: string; dir?: string }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="text-[#888888] flex-shrink-0">{label}</span>
      <span className="text-white font-medium text-end" dir={dir}>{value}</span>
    </div>
  );
}
