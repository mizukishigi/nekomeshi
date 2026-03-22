# ============================================================================
# nekomeshi - 本番環境 (prd)
# ============================================================================
# 状態: プロジェクト作成済み、未設定
# 用途: 本番運用
# ============================================================================

terraform {
  required_version = ">= 1.13.3"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    supabase = {
      source  = "supabase/supabase"
      version = "~> 1.0"
    }
  }

  backend "gcs" {
    bucket = "prd-nekomeshi-tfstate"
    prefix = "terraform/state"
  }
}

# ----------------------------------------------------------------------------
# プロバイダー設定
# ----------------------------------------------------------------------------
provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

provider "supabase" {
  access_token = var.supabase_access_token
}

# ----------------------------------------------------------------------------
# GCP OAuth モジュール
# OAuth 同意画面と API 有効化を管理
# ----------------------------------------------------------------------------
module "gcp_oauth" {
  source = "../../modules/gcp-oauth"

  gcp_project_id    = var.gcp_project_id
  gcp_region        = var.gcp_region
  support_email     = var.support_email
  application_title = "nekomeshi"
}

# ----------------------------------------------------------------------------
# Supabase モジュール
# 認証設定（Google OAuth プロバイダー）を管理
# ----------------------------------------------------------------------------
module "supabase" {
  source = "../../modules/supabase"

  supabase_project_ref       = var.supabase_project_ref
  google_oauth_client_id     = var.google_oauth_client_id
  google_oauth_client_secret = var.google_oauth_client_secret
  app_url                    = var.app_url

  # 本番では新規登録を許可（必要に応じて変更）
  disable_signup = false

  # 本番環境のリダイレクトURL
  additional_redirect_urls = [
    "https://nekomeshi.app/**",
  ]
}

# ----------------------------------------------------------------------------
# 出力
# ----------------------------------------------------------------------------
output "supabase_api_url" {
  description = "Supabase API URL"
  value       = module.supabase.api_url
}

output "supabase_auth_callback_url" {
  description = "Google OAuth コールバックURL"
  value       = module.supabase.auth_callback_url
}
