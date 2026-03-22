# ============================================================================
# Supabase モジュール - 出力定義
# ============================================================================

output "project_ref" {
  description = "Supabase プロジェクトのリファレンスID"
  value       = var.supabase_project_ref
}

output "api_url" {
  description = "Supabase API URL"
  value       = "https://${var.supabase_project_ref}.supabase.co"
}

output "auth_callback_url" {
  description = "Google OAuth のコールバックURL（GCP OAuth設定で使用）"
  value       = "https://${var.supabase_project_ref}.supabase.co/auth/v1/callback"
}
