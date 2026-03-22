CREATE TABLE cats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  breed TEXT,
  birthday DATE,
  weight_kg NUMERIC(4,2),
  sex TEXT CHECK (sex IN ('male', 'female', 'unknown')) DEFAULT 'unknown',
  is_neutered BOOLEAN DEFAULT false,
  allergies TEXT,
  conditions TEXT,
  photo_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_cats_profile_id ON cats(profile_id);

ALTER TABLE cats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cats" ON cats FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Users can insert own cats" ON cats FOR INSERT WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "Users can update own cats" ON cats FOR UPDATE USING (auth.uid() = profile_id);
CREATE POLICY "Users can delete own cats" ON cats FOR DELETE USING (auth.uid() = profile_id);
