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

