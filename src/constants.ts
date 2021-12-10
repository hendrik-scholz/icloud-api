export class Constants {
  public static readonly DEFAULT_RADIX = 10;

  public static readonly DEFAULT_PORT = 3000;

  public static readonly LOGIN_ENDPOINT = 'https://setup.icloud.com/setup/ws/1/accountLogin';
  public static readonly LOGOUT_ENDPOINT = 'https://setup.icloud.com/setup/ws/1/logout';
  public static readonly START_UP_ENDPOINT = 'https://p42-remindersws.icloud.com/rd/startup';
  public static readonly REMINDERS_UP_ENDPOINT = 'https://p42-remindersws.icloud.com/rd/reminders';

  public static readonly HTTP_HEADER_ORIGIN = 'https://www.icloud.com';
  public static readonly HTTP_HEADER_REFERER = 'https://www.icloud.com/';
  public static readonly HTTP_HEADER_SET_COOKIE = 'set-cookie';
  public static readonly HTTP_HEADER_X_APPLE = 'X-APPLE';
  public static readonly HTTP_HEADER_APPLE_ID = 'X-APPLE-ID';
  public static readonly HTTP_HEADER_PASSWORD = 'X-PASSWORD';

  public static readonly HTTP_STATUS_NO_CONTENT = 204;
  public static readonly HTTP_STATUS_BAD_REQUEST = 400;
  public static readonly HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;
}
