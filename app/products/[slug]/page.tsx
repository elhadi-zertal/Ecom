import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ProductPageClient from "./ProductPageClient";

export const revalidate = 60;

export async function generateStaticParams() {
  const { data: products } = await supabase.from("products").select("slug");
  return (products || []).map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const [{ data: product }, { data: wilayas }] = await Promise.all([
    supabase.from("products").select("*").eq("slug", params.slug).single(),
    supabase.from("delivery_prices").select("*").order("wilaya_number"),
  ]);

  if (!product) notFound();

  return <ProductPageClient product={product} wilayas={wilayas || []} />;
}
