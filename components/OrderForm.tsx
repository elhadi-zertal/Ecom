"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase, Product, DeliveryPrice } from "@/lib/supabase";
import WilayaSelector from "./WilayaSelector";
import ColorSwatch from "./ColorSwatch";
import OrderSummary from "./OrderSummary";

interface OrderFormProps {
  product: Product;
  wilayas: DeliveryPrice[];
}

interface FormErrors {
  name?: string;
  phone?: string;
  wilaya?: string;
  color?: string;
  quantity?: string;
}

export default function OrderForm({ product, wilayas }: OrderFormProps) {
  const { t, lang } = useLanguage();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    wilaya: "",
    deliveryType: "home" as "home" | "desk",
    color: product.colors?.length === 1 ? product.colors[0] : "",
    quantity: 1,
    note: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = t("nameRequired");
    if (!form.phone.trim()) {
      newErrors.phone = t("phoneRequired");
    } else if (!/^0[5-7]\d{8}$/.test(form.phone.replace(/\s/g, ""))) {
      newErrors.phone = t("phoneInvalid");
    }
    if (!form.wilaya) newErrors.wilaya = t("wilayaRequired");
    if (product.colors?.length > 0 && !form.color) newErrors.color = t("colorRequired");
    if (form.quantity < 1) newErrors.quantity = t("quantityMin");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getDeliveryFee = () => {
    const w = wilayas.find((w) => w.wilaya_number === form.wilaya);
    if (!w) return 0;
    return form.deliveryType === "home" ? w.home_price : w.desk_price;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError("");

    const deliveryFee = getDeliveryFee();
    const total = product.price * form.quantity + deliveryFee;

    const selectedWilaya = wilayas.find((w) => w.wilaya_number === form.wilaya);
    const wilayaLabel =
      lang === "ar"
        ? `${form.wilaya} - ${selectedWilaya?.wilaya_name_ar}`
        : `${form.wilaya} - ${selectedWilaya?.wilaya_name_fr}`;

    const { data, error } = await supabase
      .from("orders")
      .insert({
        customer_name: form.name.trim(),
        phone: form.phone.replace(/\s/g, ""),
        wilaya: wilayaLabel,
        delivery_type: form.deliveryType,
        delivery_fee: deliveryFee,
        product_id: product.id,
        color: form.color,
        quantity: form.quantity,
        note: form.note.trim(),
        total,
        status: "pending",
      })
      .select("id")
      .single();

    if (error || !data) {
      setSubmitError(t("errorOccurred"));
      setSubmitting(false);
      return;
    }

    router.push(`/thank-you?orderId=${data.id}`);
  };

  return (
    <div>
      {/* Live Order Summary */}
      <div className="mb-8">
        <OrderSummary
          productPrice={product.price}
          quantity={form.quantity}
          wilayaNumber={form.wilaya}
          deliveryType={form.deliveryType}
          wilayas={wilayas}
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="glass-card p-6 space-y-6">
        <h2 className="text-xl font-bold text-white">{t("orderFormTitle")}</h2>

        {/* Full name */}
        <div>
          <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
            {t("fullName")}
          </label>
          <input
            type="text"
            className="input-field"
            placeholder={t("fullNamePlaceholder")}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
            {t("phone")}
          </label>
          <input
            type="tel"
            className="input-field"
            placeholder={t("phonePlaceholder")}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            dir="ltr"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
        </div>

        {/* Wilaya */}
        <WilayaSelector
          wilayas={wilayas}
          value={form.wilaya}
          onChange={(v) => setForm({ ...form, wilaya: v })}
          error={errors.wilaya}
        />

        {/* Delivery type */}
        <div>
          <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-3">
            {t("deliveryType")}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["home", "desk"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setForm({ ...form, deliveryType: type })}
                className={`p-3 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                  form.deliveryType === type
                    ? "border-purple-500 bg-purple-500/15 text-purple-300"
                    : "border-[var(--border)] text-[var(--text-secondary)] hover:border-purple-400"
                }`}
              >
                <span className="block text-lg mb-1">{type === "home" ? "🏠" : "🏢"}</span>
                {type === "home" ? t("deliveryHome") : t("deliveryDesk")}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        {product.colors && product.colors.length > 0 && (
          <ColorSwatch
            colors={product.colors}
            selectedColor={form.color}
            onSelect={(c) => setForm({ ...form, color: c })}
            label={t("color")}
            error={errors.color}
          />
        )}

        {/* Quantity */}
        <div>
          <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
            {t("quantity")}
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setForm({ ...form, quantity: Math.max(1, form.quantity - 1) })}
              className="w-10 h-10 rounded-lg border border-[var(--border)] text-white font-bold text-xl flex items-center justify-center hover:border-purple-400 hover:text-purple-400 transition-colors"
            >
              −
            </button>
            <input
              type="number"
              min={1}
              className="input-field w-20 text-center"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: Math.max(1, parseInt(e.target.value) || 1) })
              }
            />
            <button
              type="button"
              onClick={() => setForm({ ...form, quantity: form.quantity + 1 })}
              className="w-10 h-10 rounded-lg border border-[var(--border)] text-white font-bold text-xl flex items-center justify-center hover:border-purple-400 hover:text-purple-400 transition-colors"
            >
              +
            </button>
          </div>
          {errors.quantity && <p className="mt-1 text-xs text-red-400">{errors.quantity}</p>}
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
            {t("note")}
          </label>
          <textarea
            className="input-field resize-none"
            rows={3}
            placeholder={t("notePlaceholder")}
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
          />
        </div>

        {submitError && (
          <div className="p-3 rounded-xl bg-red-900/30 border border-red-500/30 text-red-400 text-sm">
            {submitError}
          </div>
        )}

        <button type="submit" disabled={submitting} className="btn-primary w-full py-4 text-base">
          {submitting ? t("submitting") : t("confirmOrder")}
        </button>
      </form>
    </div>
  );
}
