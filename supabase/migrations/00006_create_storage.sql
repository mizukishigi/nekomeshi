-- ============================================================================
-- Storage バケットとポリシーの作成（冪等）
-- ============================================================================

-- cat-photos バケット（公開読み取り、認証ユーザーのみ書き込み）
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'cat-photos',
  'cat-photos',
  true,
  5242880,  -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- DROP + CREATE でポリシーを冪等に適用
DO $$
BEGIN
  -- 既存ポリシーを削除（存在しなくてもエラーにならない）
  DROP POLICY IF EXISTS "Public read access" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload cat photos" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can update cat photos" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can delete cat photos" ON storage.objects;
END $$;

-- SELECT: 誰でも閲覧可
CREATE POLICY "Public read access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'cat-photos');

-- INSERT: 認証ユーザーのみアップロード可
CREATE POLICY "Authenticated users can upload cat photos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'cat-photos');

-- UPDATE: 認証ユーザーのみ上書き可
CREATE POLICY "Authenticated users can update cat photos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'cat-photos')
  WITH CHECK (bucket_id = 'cat-photos');

-- DELETE: 認証ユーザーのみ削除可
CREATE POLICY "Authenticated users can delete cat photos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'cat-photos');
