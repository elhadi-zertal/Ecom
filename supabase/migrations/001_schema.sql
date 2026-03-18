-- ============================================================
-- Algerian E-Commerce Schema
-- Run this once in the Supabase SQL editor
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PRODUCTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name_ar TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  description_ar TEXT DEFAULT '',
  description_fr TEXT DEFAULT '',
  price NUMERIC(10,2) NOT NULL,
  images TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- DELIVERY PRICES TABLE (all 48 Algerian wilayas)
-- ============================================================
CREATE TABLE IF NOT EXISTS delivery_prices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  wilaya_number TEXT NOT NULL UNIQUE,
  wilaya_name_ar TEXT NOT NULL,
  wilaya_name_fr TEXT NOT NULL,
  home_price NUMERIC(10,2) NOT NULL DEFAULT 400,
  desk_price NUMERIC(10,2) NOT NULL DEFAULT 300
);

-- ============================================================
-- ORDERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  wilaya TEXT NOT NULL,
  delivery_type TEXT NOT NULL CHECK (delivery_type IN ('home', 'desk')),
  delivery_fee NUMERIC(10,2) NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  color TEXT DEFAULT '',
  quantity INTEGER NOT NULL DEFAULT 1,
  note TEXT DEFAULT '',
  total NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','delivered','canceled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Public read for products and delivery_prices
CREATE POLICY "Public can read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public can read delivery_prices" ON delivery_prices FOR SELECT USING (true);

-- Anyone can insert orders
CREATE POLICY "Anyone can insert orders" ON orders FOR INSERT WITH CHECK (true);

-- Authenticated users (admin) can do everything
CREATE POLICY "Admin full access products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access delivery_prices" ON delivery_prices FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access orders" ON orders FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- SEED: 48 ALGERIAN WILAYAS
-- ============================================================
INSERT INTO delivery_prices (wilaya_number, wilaya_name_ar, wilaya_name_fr, home_price, desk_price) VALUES
('01', 'أدرار', 'Adrar', 800, 600),
('02', 'الشلف', 'Chlef', 400, 300),
('03', 'الأغواط', 'Laghouat', 600, 450),
('04', 'أم البواقي', 'Oum El Bouaghi', 450, 350),
('05', 'باتنة', 'Batna', 450, 350),
('06', 'بجاية', 'Béjaïa', 450, 350),
('07', 'بسكرة', 'Biskra', 500, 400),
('08', 'بشار', 'Béchar', 750, 550),
('09', 'البليدة', 'Blida', 400, 300),
('10', 'البويرة', 'Bouira', 400, 300),
('11', 'تمنراست', 'Tamanrasset', 900, 700),
('12', 'تبسة', 'Tébessa', 500, 400),
('13', 'تلمسان', 'Tlemcen', 500, 400),
('14', 'تيارت', 'Tiaret', 450, 350),
('15', 'تيزي وزو', 'Tizi Ouzou', 400, 300),
('16', 'الجزائر', 'Alger', 400, 300),
('17', 'الجلفة', 'Djelfa', 500, 400),
('18', 'جيجل', 'Jijel', 450, 350),
('19', 'سطيف', 'Sétif', 450, 350),
('20', 'سعيدة', 'Saïda', 500, 400),
('21', 'سكيكدة', 'Skikda', 450, 350),
('22', 'سيدي بلعباس', 'Sidi Bel Abbès', 500, 400),
('23', 'عنابة', 'Annaba', 450, 350),
('24', 'قالمة', 'Guelma', 450, 350),
('25', 'قسنطينة', 'Constantine', 450, 350),
('26', 'المدية', 'Médéa', 400, 300),
('27', 'مستغانم', 'Mostaganem', 450, 350),
('28', 'المسيلة', 'M''Sila', 500, 400),
('29', 'معسكر', 'Mascara', 450, 350),
('30', 'ورقلة', 'Ouargla', 650, 500),
('31', 'وهران', 'Oran', 400, 300),
('32', 'البيض', 'El Bayadh', 600, 450),
('33', 'إليزي', 'Illizi', 950, 750),
('34', 'برج بوعريريج', 'Bordj Bou Arréridj', 450, 350),
('35', 'بومرداس', 'Boumerdès', 400, 300),
('36', 'الطارف', 'El Tarf', 450, 350),
('37', 'تندوف', 'Tindouf', 900, 700),
('38', 'تيسمسيلت', 'Tissemsilt', 450, 350),
('39', 'الوادي', 'El Oued', 600, 450),
('40', 'خنشلة', 'Khenchela', 500, 400),
('41', 'سوق أهراس', 'Souk Ahras', 500, 400),
('42', 'تيبازة', 'Tipaza', 400, 300),
('43', 'ميلة', 'Mila', 450, 350),
('44', 'عين الدفلى', 'Aïn Defla', 400, 300),
('45', 'النعامة', 'Naâma', 650, 500),
('46', 'عين تموشنت', 'Aïn Témouchent', 500, 400),
('47', 'غرداية', 'Ghardaïa', 600, 450),
('48', 'غليزان', 'Relizane', 450, 350)
ON CONFLICT (wilaya_number) DO NOTHING;
