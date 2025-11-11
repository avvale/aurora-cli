import { OAuthAccessTokenResponse } from '@app/o-auth/access-token';

export class OAuthRefreshTokenResponse {
    constructor(
        public readonly id: string,
        public readonly rowId: number,
        public readonly accessTokenId: string,
        public readonly token: string,
        public readonly isRevoked: boolean,
        public readonly expiresAt: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly accessToken: OAuthAccessTokenResponse,
    ) {}
}
