CREATE TABLE foods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,
  product_name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('dry', 'wet', 'treat')),
  target_age TEXT CHECK (target_age IN ('kitten', 'adult', 'senior', 'all_ages')),
  calories_per_100g NUMERIC(6,1),
  amazon_url TEXT,
  photo_url TEXT,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  is_seed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (brand, product_name)
);

CREATE INDEX idx_foods_brand ON foods(brand);
CREATE INDEX idx_foods_search ON foods USING gin (
  to_tsvector('simple', brand || ' ' || product_name)
);

ALTER TABLE foods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view foods" ON foods FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert foods" ON foods FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Creators can update own foods" ON foods FOR UPDATE USING (auth.uid() = created_by);
