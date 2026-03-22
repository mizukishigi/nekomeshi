# ============================================================================
# GCP OAuth モジュール
# Google Cloud の OAuth 関連リソースを管理する
# ============================================================================
#
# 【自動化可能】
# - 必要な API の有効化
#
# 【手動設定が必要】
# - OAuth 同意画面の設定（個人プロジェクトでは google_iap_brand が使えないため）
# - OAuth 2.0 クライアントID の作成
#
# 手動設定手順:
# 1. GCP Console (https://console.cloud.google.com) にアクセス
# 2. APIs & Services > OAuth consent screen で同意画面を設定
# 3. APIs & Services > Credentials に移動
# 4. 「CREATE CREDENTIALS」 > 「OAuth client ID」を選択
# 5. Application type: 「Web application」を選択
# 6. 名前: 「nekomeshi-{env}」
# 7. Authorized redirect URIs に以下を追加:
#    - https://{supabase_project_ref}.supabase.co/auth/v1/callback
# 8. 作成後、Client ID と Client Secret を terraform.tfvars に設定
# ============================================================================

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

# ----------------------------------------------------------------------------
# 必要な API の有効化
# ----------------------------------------------------------------------------
resource "google_project_service" "required_apis" {
  for_each = toset([
    "iap.googleapis.com",
    "cloudresourcemanager.googleapis.com",
  ])

  project            = var.gcp_project_id
  service            = each.value
  disable_on_destroy = false
}
