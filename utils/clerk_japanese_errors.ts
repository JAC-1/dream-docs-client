export default function (code: string): string {
  switch (code) {
    // Start of form specific errors
    case 'form_param_nil':
      return 'メールアドレスをご記入ください';
    case 'form_identifier_not_found':
      // Avoid revealing whether the email exists
      return '認証に失敗しました';
    case 'verification_expired':
      return 'コードの有効期限が切れています';
    // End of form specific errors
    case 'clerk_key_invalid_code':
      // Do not reveal internal key details
      return '内部エラーが発生しました';
    case 'authentication_invalid_code':
      return '認証に失敗しました';
    case 'authorization_header_format_invalid_code':
      return '認証に失敗しました';
    case 'authorization_invalid_code':
      return '権限がありません';
    case 'invalid_csrf_token_code':
      return '不正なリクエストです';
    case 'request_header_missing_code':
      return '不正なリクエストです';
    case 'origin_invalid_code':
      return '不正なリクエストです';
    case 'dev_browser_unauthenticated_code':
      return '認証に失敗しました';
    case 'url_based_session_syncing_disabled_code':
      return '内部エラーが発生しました';
    case 'request_invalid_for_environment_code':
      return '不正なリクエストです';
    case 'request_invalid_for_instance_code':
      return '不正なリクエストです';
    case 'host_invalid_code':
      return '不正なリクエストです';
    case 'external_account_exists_code':
    case 'email_address_exists_code':
    case 'phone_number_exists_code':
    case 'username_exists_code':
      // Use a generic message to prevent user enumeration
      return '認証に失敗しました';
    case 'identifier_not_allowed_access_code':
      return 'アクセスが許可されていません';
    case 'signed_out_code':
      return 'サインアウトしました';
    case 'invalid_user_settings_code':
      return '内部エラーが発生しました';
    case 'invalid_handshake_code':
      return '内部エラーが発生しました';
    // Additional Clerk error codes identified from recent docs
    case 'oauth_invalid_state_code':
    case 'oauth_verification_failed_code':
      return '認証に失敗しました';
    case 'invalid_activation_token_code':
      return '内部エラーが発生しました';
    case 'session_expired_code':
      return 'セッションの有効期限が切れています';
    case 'rate_limit_exceeded_code':
      return 'リクエストが多すぎます。後ほど再試行してください';
    case 'user_not_found_code':
      return '認証に失敗しました';
    case 'user_already_verified_code':
      return '認証に失敗しました';
    default:
      return '不明なエラーが発生しました';
  }
}

