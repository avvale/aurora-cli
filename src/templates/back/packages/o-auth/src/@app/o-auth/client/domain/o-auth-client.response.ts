import { OAuthAccessTokenResponse } from '@app/o-auth/access-token';
import { OAuthApplicationResponse } from '@app/o-auth/application';

export class OAuthClientResponse {
  constructor(
    public readonly id: string,
    public readonly rowId: number,
    public readonly grantType: string,
    public readonly name: string,
    public readonly secret: string,
    public readonly authUrl: string,
    public readonly redirect: string,
    public readonly scopeOptions: any,
    public readonly expiredAccessToken: number,
    public readonly expiredRefreshToken: number,
    public readonly isActive: boolean,
    public readonly isMaster: boolean,
    public readonly applicationIds: string[],
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly deletedAt: string,
    public readonly accessTokens: OAuthAccessTokenResponse[],
    public readonly applications: OAuthApplicationResponse[],
  ) {}
}
