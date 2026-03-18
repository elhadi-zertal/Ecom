"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AdminLoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(t("loginError"));
      setLoading(false);
      return;
    }

    router.push("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-black text-2xl mx-auto mb-4">
            DZ
          </div>
          <h1 className="text-2xl font-black text-white">{t("adminLogin")}</h1>
        </div>

        <form onSubmit={handleLogin} className="glass-card p-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
              {t("email")}
            </label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              dir="ltr"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">
              {t("password")}
            </label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              dir="ltr"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-900/30 border border-red-500/30 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full py-3">
            {loading ? t("submitting") : t("loginBtn")}
          </button>
        </form>
      </div>
    </div>
  );
}
