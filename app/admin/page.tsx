"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase, Order } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

type StatusFilter = "all" | "pending" | "confirmed" | "delivered" | "canceled";
type OrderStatus = "pending" | "confirmed" | "delivered" | "canceled";

const STATUS_LABELS: Record<string, string> = {
  pending: "🕐",
  confirmed: "✅",
  delivered: "📦",
  canceled: "❌",
};

export default function AdminDashboard() {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Auth check
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/admin/login");
      } else {
        setAuthed(true);
      }
    });
  }, [router]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const query = supabase
      .from("orders")
      .select("*, products(name_ar, name_fr)")
      .order("created_at", { ascending: false });

    if (filter !== "all") query.eq("status", filter);

    const { data } = await query;
    setOrders((data as Order[]) || []);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    if (authed) fetchOrders();
  }, [authed, fetchOrders]);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    setUpdatingId(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  const filterTabs: { key: StatusFilter; label: string }[] = [
    { key: "all", label: t("allOrders") },
    { key: "pending", label: t("pending") },
    { key: "confirmed", label: t("confirmed") },
    { key: "delivered", label: t("delivered") },
    { key: "canceled", label: t("canceled") },
  ];

  const statusOptions: OrderStatus[] = ["pending", "confirmed", "delivered", "canceled"];

  if (!authed) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-black text-white">{t("adminTitle")}</h1>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2 rounded-lg border border-purple-500/40 text-purple-300 text-sm font-semibold hover:bg-purple-500/10 transition-colors"
          >
            {t("products")}
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] text-sm font-semibold hover:border-red-500/40 hover:text-red-400 transition-colors"
          >
            {t("logout")}
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              filter === tab.key
                ? "bg-purple-600 text-white"
                : "bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-purple-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders table */}
      {loading ? (
        <div className="text-center py-16 text-[var(--text-secondary)]">{t("loading")}</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 text-[var(--text-secondary)]">{t("noOrders")}</div>
      ) : (
        <div className="glass-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--text-secondary)]">
                {[t("orderCustomer"), t("orderPhone"), t("orderWilaya"), t("orderDelivery"), t("orderProduct"), t("orderColor"), t("orderQuantity"), t("orderTotal"), t("status"), t("date")].map((h) => (
                  <th key={h} className="px-4 py-3 text-start font-semibold whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const productName = order.products
                  ? lang === "ar"
                    ? order.products.name_ar
                    : order.products.name_fr
                  : "—";

                return (
                  <tr
                    key={order.id}
                    className="border-b border-[var(--border)] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3 text-white font-medium whitespace-nowrap">
                      {order.customer_name}
                    </td>
                    <td className="px-4 py-3 text-[var(--text-secondary)] whitespace-nowrap" dir="ltr">
                      {order.phone}
                    </td>
                    <td className="px-4 py-3 text-[var(--text-secondary)] whitespace-nowrap max-w-[120px] truncate">
                      {order.wilaya}
                    </td>
                    <td className="px-4 py-3 text-[var(--text-secondary)] whitespace-nowrap">
                      {order.delivery_type === "home" ? t("deliveryHome") : t("deliveryDesk")}
                    </td>
                    <td className="px-4 py-3 text-[var(--text-secondary)] whitespace-nowrap max-w-[120px] truncate">
                      {productName}
                    </td>
                    <td className="px-4 py-3 text-[var(--text-secondary)]">{order.color || "—"}</td>
                    <td className="px-4 py-3 text-[var(--text-secondary)] text-center">{order.quantity}</td>
                    <td className="px-4 py-3 text-purple-400 font-bold whitespace-nowrap">
                      {order.total.toLocaleString()} {t("da")}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        disabled={updatingId === order.id}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        className={`text-xs font-semibold px-2 py-1 rounded-lg border cursor-pointer transition-colors status-${order.status}`}
                        style={{ background: "transparent" }}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s} style={{ background: "#1a1a26", color: "#f0f0f8" }}>
                            {STATUS_LABELS[s]} {t(s as keyof typeof t extends (k: infer K) => string ? K : never)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-[var(--text-secondary)] whitespace-nowrap text-xs">
                      {new Date(order.created_at).toLocaleDateString(lang === "ar" ? "ar-DZ" : "fr-DZ", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
