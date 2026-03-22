-- ============================================================================
-- Storage バケットとポリシーの作成（冪等）
-- dev環境: 既に手動作成済み → ON CONFLICT / IF NOT EXISTS でスキップされる
-- prd環境: このマイグレーションで自動作成される
-- ============================================================================

-- ----------------------------------------------------------------------------
-- cat-photos バケット（公開読み取り、認証ユーザーのみ書き込み）
-- ----------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'cat-photos',
  'cat-photos',
  true,
  5242880,  -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- SELECT: 誰でも閲覧可
DO $$ BEGIN
  CREATE POLICY "Public read access for cat photos"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'cat-photos');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- INSERT: 認証ユーザーのみアップロード可
DO $$ BEGIN
  CREATE POLICY "Authenticated users can upload cat photos"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'cat-photos');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- UPDATE: 認証ユーザーのみ上書き可
DO $$ BEGIN
  CREATE POLICY "Authenticated users can update cat photos"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'cat-photos')
    WITH CHECK (bucket_id = 'cat-photos');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- DELETE: 認証ユーザーのみ削除可
DO $$ BEGIN
  CREATE POLICY "Authenticated users can delete cat photos"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'cat-photos');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
