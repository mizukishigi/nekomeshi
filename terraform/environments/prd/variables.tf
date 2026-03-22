# ============================================================================
# 本番環境 (prd) - 変数定義
# ============================================================================

# --- GCP ---
variable "gcp_project_id" {
  description = "GCP プロジェクトID"
  type        = string
}

variable "gcp_region" {
  description = "GCP リージョン"
  type        = string
  default     = "asia-northeast1"
}

variable "support_email" {
  description = "OAuth 同意画面のサポートメールアドレス"
  type        = string
}

# --- Supabase ---
variable "supabase_project_ref" {
  description = "Supabase プロジェクトのリファレンスID"
  type        = string
}

variable "supabase_access_token" {
  description = "Supabase のアクセストークン（Dashboard > Account > Access Tokens で生成）"
  type        = string
  sensitive   = true
}

# --- OAuth ---
variable "google_oauth_client_id" {
  description = "Google OAuth クライアントID"
  type        = string
  sensitive   = true
}

variable "google_oauth_client_secret" {
  description = "Google OAuth クライアントシークレット"
  type        = string
  sensitive   = true
}

# --- アプリケーション ---
variable "app_url" {
  description = "アプリケーションのURL"
  type        = string
}
