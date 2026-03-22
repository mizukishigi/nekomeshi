# ============================================================================
# Supabase モジュール
# Supabase プロジェクトの設定を管理する
# ============================================================================

# NOTE: supabase プロバイダーは呼び出し元で設定する
terraform {
  required_providers {
    supabase = {
      source  = "supabase/supabase"
      version = "~> 1.0"
    }
  }
}

# ----------------------------------------------------------------------------
# 認証設定
# Google OAuth プロバイダー、サイトURL、リダイレクトURLを管理
# ----------------------------------------------------------------------------
resource "supabase_settings" "this" {
  project_ref = var.supabase_project_ref

  auth = jsonencode({
    # サイトURL（ログイン後のデフォルトリダイレクト先）
    site_url = var.app_url

    # 新規登録の制御
    disable_signup = var.disable_signup

    # 追加のリダイレクトURL
    uri_allow_list = join(",", var.additional_redirect_urls)

    # Google OAuth プロバイダー設定
    external_google_enabled   = true
    external_google_client_id = var.google_oauth_client_id
    external_google_secret    = var.google_oauth_client_secret
  })
}

# ----------------------------------------------------------------------------
# ストレージバケット
# NOTE: supabase/supabase プロバイダーはストレージバケットリソースを
#       公式にはサポートしていない。バケット管理が必要な場合は
#       supabase CLI (supabase storage) または Dashboard から設定する。
#
# 将来的にプロバイダーがサポートした場合のテンプレート:
# resource "supabase_storage_bucket" "buckets" {
#   for_each    = { for b in var.storage_buckets : b.name => b }
#   project_ref = var.supabase_project_ref
#   name        = each.value.name
#   public      = each.value.public
#   file_size_limit  = each.value.file_size_limit
#   allowed_mime_types = each.value.allowed_mime_types
# }
# ----------------------------------------------------------------------------
