import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  slug: string;
  name_ar: string;
  name_fr: string;
  description_ar: string;
  description_fr: string;
  price: number;
  images: string[];
  colors: string[];
  stock: number;
  created_at: string;
};

export type DeliveryPrice = {
  id: string;
  wilaya_number: string;
  wilaya_name_ar: string;
  wilaya_name_fr: string;
  home_price: number;
  desk_price: number;
};

export type Order = {
  id: string;
  customer_name: string;
  phone: string;
  wilaya: string;
  delivery_type: "home" | "desk";
  delivery_fee: number;
  product_id: string;
  color: string;
  quantity: number;
  note: string;
  total: number;
  status: "pending" | "confirmed" | "delivered" | "canceled";
  created_at: string;
  products?: Product;
};
