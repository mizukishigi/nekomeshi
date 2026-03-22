# ============================================================================
# Supabase モジュール - 変数定義
# ============================================================================

variable "supabase_project_ref" {
  description = "Supabase プロジェクトのリファレンスID"
  type        = string
}

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

variable "app_url" {
  description = "アプリケーションのURL（サイトURL・リダイレクト先）"
  type        = string
}

variable "additional_redirect_urls" {
  description = "追加のリダイレクトURL（開発環境のlocalhostなど）"
  type        = list(string)
  default     = []
}

variable "disable_signup" {
  description = "新規登録を無効にするか"
  type        = bool
  default     = false
}

variable "storage_buckets" {
  description = "作成するストレージバケットの設定"
  type = list(object({
    name             = string
    public           = bool
    file_size_limit  = optional(number)
    allowed_mime_types = optional(list(string))
  }))
  default = []
}
