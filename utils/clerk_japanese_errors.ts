export default function (code: string): string {
  console.log(code);
  switch (code) {
    // Start of form specific errors
    case 'form_param_nil':
      return 'メールアドレスをご記入してください';
    case 'form_param_nil':
      return 'メールアドレスをご記入してください';
    case 'form_identifier_not_found':
      return 'メールアドレスは登録されていません';
    case 'verification_expired':
      return 'コードの有効期限がきりました';
    // End of form specific errors
    case 'clerk_key_invalid_code':
      return '提供されたClerkシークレットキーが無効です。Clerkシークレットキーが正しいことを確認してください。';
    case 'authentication_invalid_code':
      return '無効な認証';
    case 'authorization_header_format_invalid_code':
      return '認証ヘッダーの形式が無効です。';
    case 'authorization_invalid_code':
      return 'このリクエストを実行する権限がありません';
    case 'invalid_csrf_token_code':
      return '無効または不足しているCSRFトークン';
    case 'request_header_missing_code':
      return '無効なリクエストヘッダー';
    case 'origin_invalid_code':
      return '無効なHTTPオリジンヘッダー';
    case 'dev_browser_unauthenticated_code':
      return 'ブラウザが認証されていません';
    case 'url_based_session_syncing_disabled_code':
      return 'このインスタンスではURLベースのセッション同期が無効になっています';
    case 'request_invalid_for_environment_code':
      return '環境に対して無効なリクエスト';
    case 'request_invalid_for_instance_code':
      return 'インスタンスに対して無効なリクエスト';
    case 'host_invalid_code':
      return '無効なホスト';
    case 'external_account_exists_code':
      return 'すでに存在します';
    case 'email_address_exists_code':
      return 'すでに存在します';
    case 'phone_number_exists_code':
      return 'すでに存在します';
    case 'username_exists_code':
      return 'すでに存在します';
    case 'identifier_not_allowed_access_code':
      return 'アクセスが許可されていません。';
    case 'signed_out_code':
      return 'サインアウトしました';
    case 'invalid_user_settings_code':
      return '無効な認証設定';
    case 'invalid_handshake_code':
      return '無効なハンドシェイク';
    default:
      return '不明なエラーが発生しました';
  }
}
