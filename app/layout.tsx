import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "متجر الجزائر | Boutique DZ",
  description: "تسوق أفضل المنتجات مع توصيل لجميع ولايات الجزائر",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;800&family=Cairo:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>
          <Header />
          <main className="min-h-screen pt-[60px]">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
