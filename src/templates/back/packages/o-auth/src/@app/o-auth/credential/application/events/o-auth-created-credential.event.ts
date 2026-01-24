export class OAuthCreatedCredentialEvent {
  constructor(
    public readonly grantType: string,
    public readonly accountId: string,
    public readonly username?: string,
    public readonly clientSecret?: string,
    public readonly accessTokenId?: string,
    public readonly refreshToken?: string,
    public readonly redirect?: string,
  ) {}
}
