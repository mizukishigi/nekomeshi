CREATE TABLE feeding_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cat_id UUID NOT NULL REFERENCES cats(id) ON DELETE CASCADE,
  food_id UUID NOT NULL REFERENCES foods(id) ON DELETE RESTRICT,
  fed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  amount_g NUMERIC(5,1) NOT NULL,
  appetite_rating SMALLINT CHECK (appetite_rating BETWEEN 1 AND 5),
  stool_condition SMALLINT CHECK (stool_condition BETWEEN 1 AND 5),
  has_vomited BOOLEAN DEFAULT false,
  memo TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_feeding_logs_cat_id ON feeding_logs(cat_id);
CREATE INDEX idx_feeding_logs_fed_at ON feeding_logs(fed_at DESC);
CREATE INDEX idx_feeding_logs_food_id ON feeding_logs(food_id);

ALTER TABLE feeding_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own feeding logs" ON feeding_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM cats WHERE cats.id = feeding_logs.cat_id AND cats.profile_id = auth.uid())
  );
CREATE POLICY "Users can insert own feeding logs" ON feeding_logs
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM cats WHERE cats.id = feeding_logs.cat_id AND cats.profile_id = auth.uid())
  );
CREATE POLICY "Users can update own feeding logs" ON feeding_logs
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM cats WHERE cats.id = feeding_logs.cat_id AND cats.profile_id = auth.uid())
  );
CREATE POLICY "Users can delete own feeding logs" ON feeding_logs
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM cats WHERE cats.id = feeding_logs.cat_id AND cats.profile_id = auth.uid())
  );
