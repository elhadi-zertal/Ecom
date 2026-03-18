import { supabase } from "@/lib/supabase";
import HomeClient from "./HomeClient";

export const revalidate = 60;

export default async function HomePage() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return <HomeClient products={products || []} />;
}
