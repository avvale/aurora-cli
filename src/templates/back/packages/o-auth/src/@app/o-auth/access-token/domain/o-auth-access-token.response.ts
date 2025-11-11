import { OAuthClientResponse } from '@app/o-auth/client';
import { OAuthRefreshTokenResponse } from '@app/o-auth/refresh-token';

export class OAuthAccessTokenResponse {
    constructor(
        public readonly id: string,
        public readonly rowId: number,
        public readonly clientId: string,
        public readonly accountId: string,
        public readonly token: string,
        public readonly name: string,
        public readonly isRevoked: boolean,
        public readonly expiresAt: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly refreshToken: OAuthRefreshTokenResponse,
        public readonly client: OAuthClientResponse,
    ) {}
}
