"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase, Product } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

type ProductForm = {
  slug: string;
  name_ar: string;
  name_fr: string;
  description_ar: string;
  description_fr: string;
  price: string;
  stock: string;
  colors: string;
  images: string[];
};

const emptyForm = (): ProductForm => ({
  slug: "",
  name_ar: "",
  name_fr: "",
  description_ar: "",
  description_fr: "",
  price: "",
  stock: "0",
  colors: "",
  images: [],
});

export default function AdminProductsPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.replace("/admin/login");
      else { setAuthed(true); fetchProducts(); }
    });
  }, [router]);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    setProducts((data as Product[]) || []);
    setLoading(false);
  };

  const handleEdit = (product: Product) => {
    setEditId(product.id);
    setForm({
      slug: product.slug,
      name_ar: product.name_ar,
      name_fr: product.name_fr,
      description_ar: product.description_ar || "",
      description_fr: product.description_fr || "",
      price: String(product.price),
      stock: String(product.stock),
      colors: (product.colors || []).join(", "),
      images: product.images || [],
    });
    setShowForm(true);
    setFormError("");
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm());
    setFormError("");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(t("deleteConfirm"))) return;
    await supabase.from("products").delete().eq("id", id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    const uploadedUrls: string[] = [];
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage
        .from("product-images")
        .upload(filename, file, { upsert: false });

      if (!error) {
        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(filename);
        uploadedUrls.push(urlData.publicUrl);
      }
    }
    setForm((prev) => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (url: string) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((i) => i !== url) }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name_ar || !form.name_fr || !form.price || !form.slug) {
      setFormError(t("errorOccurred"));
      return;
    }
    setSaving(true);
    setFormError("");

    const payload = {
      slug: form.slug.toLowerCase().replace(/\s+/g, "-"),
      name_ar: form.name_ar,
      name_fr: form.name_fr,
      description_ar: form.description_ar,
      description_fr: form.description_fr,
      price: parseFloat(form.price),
      stock: parseInt(form.stock) || 0,
      colors: form.colors.split(",").map((c) => c.trim()).filter(Boolean),
      images: form.images,
    };

    let error;
    if (editId) {
      ({ error } = await supabase.from("products").update(payload).eq("id", editId));
    } else {
      ({ error } = await supabase.from("products").insert(payload));
    }

    if (error) {
      setFormError(error.message || t("errorOccurred"));
    } else {
      handleCancel();
      fetchProducts();
    }
    setSaving(false);
  };

  if (!authed) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="text-[var(--text-secondary)] hover:text-white transition-colors text-sm"
          >
            ← {t("orders")}
          </Link>
          <h1 className="text-2xl font-black text-white">{t("products")}</h1>
        </div>
        {!showForm && (
          <button
            onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm()); }}
            className="btn-primary py-2 px-5 text-sm"
          >
            + {t("addProduct")}
          </button>
        )}
      </div>

      {/* Product form */}
      {showForm && (
        <form onSubmit={handleSave} className="glass-card p-6 mb-8 space-y-5">
          <h2 className="font-bold text-white text-lg">{editId ? t("editProduct") : t("addProduct")}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">{t("productSlug")}</label>
              <input className="input-field text-sm" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required dir="ltr" placeholder="product-slug" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">{t("productPrice")}</label>
              <input type="number" className="input-field text-sm" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required dir="ltr" placeholder="2500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">{t("productNameAr")}</label>
              <input className="input-field text-sm" value={form.name_ar} onChange={(e) => setForm({ ...form, name_ar: e.target.value })} required dir="rtl" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">{t("productNameFr")}</label>
              <input className="input-field text-sm" value={form.name_fr} onChange={(e) => setForm({ ...form, name_fr: e.target.value })} required dir="ltr" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">{t("productDescAr")}</label>
              <textarea className="input-field text-sm resize-none" rows={3} value={form.description_ar} onChange={(e) => setForm({ ...form, description_ar: e.target.value })} dir="rtl" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">{t("productDescFr")}</label>
              <textarea className="input-field text-sm resize-none" rows={3} value={form.description_fr} onChange={(e) => setForm({ ...form, description_fr: e.target.value })} dir="ltr" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">{t("productStock")}</label>
              <input type="number" className="input-field text-sm" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} dir="ltr" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">{t("productColors")}</label>
              <input className="input-field text-sm" value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} placeholder="أحمر, أزرق, rouge, bleu" />
            </div>
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-2">{t("productImages")}</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {form.images.map((url, i) => (
                <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-[var(--border)] group">
                  <Image src={url} alt="" fill className="object-cover" sizes="64px" />
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="absolute inset-0 bg-red-900/70 text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
              <label className={`w-16 h-16 rounded-xl border-2 border-dashed border-[var(--border)] flex items-center justify-center cursor-pointer text-[var(--text-secondary)] hover:border-purple-400 hover:text-purple-400 transition-colors text-2xl ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
                {uploading ? "⏳" : "+"}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>
            </div>
          </div>

          {formError && (
            <div className="p-3 rounded-xl bg-red-900/30 border border-red-500/30 text-red-400 text-sm">{formError}</div>
          )}

          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="btn-primary py-2 px-6 text-sm">
              {saving ? t("saving") : t("saveProduct")}
            </button>
            <button type="button" onClick={handleCancel} className="px-6 py-2 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] text-sm font-semibold hover:text-white hover:border-white/30 transition-colors">
              {t("cancelEdit")}
            </button>
          </div>
        </form>
      )}

      {/* Product list */}
      {loading ? (
        <div className="text-center py-16 text-[var(--text-secondary)]">{t("loading")}</div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 text-[var(--text-secondary)]">{t("noProducts2")}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="glass-card p-4 flex gap-4 items-start">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[var(--bg-input)] flex-shrink-0">
                {p.images?.[0] ? (
                  <Image src={p.images[0]} alt={p.name_ar} fill className="object-cover" sizes="64px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">🛍️</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm truncate">{p.name_ar}</p>
                <p className="text-[var(--text-secondary)] text-xs truncate">{p.name_fr}</p>
                <p className="text-purple-400 font-bold text-sm mt-1">{p.price.toLocaleString()} دج</p>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => handleEdit(p)} className="text-xs px-3 py-1 rounded-lg border border-purple-500/40 text-purple-300 hover:bg-purple-500/10 transition-colors whitespace-nowrap">
                  {t("editProduct").replace("المنتج", "").replace("le produit", "").trim() || "✏️"}
                </button>
                <button onClick={() => handleDelete(p.id)} className="text-xs px-3 py-1 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">
                  {t("deleteProduct")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
