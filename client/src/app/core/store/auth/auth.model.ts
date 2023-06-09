export interface AuthModel {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly refreshing: boolean;
}
