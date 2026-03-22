# ============================================================================
# GCP OAuth モジュール - 変数定義
# ============================================================================

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
  description = "OAuth 同意画面に表示するサポートメールアドレス"
  type        = string
}

variable "application_title" {
  description = "OAuth 同意画面に表示するアプリケーション名"
  type        = string
  default     = "nekomeshi"
}
