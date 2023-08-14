import { OAuthDeletedRefreshTokenEvent } from './o-auth-deleted-refresh-token.event';

export class OAuthDeletedRefreshTokensEvent
{
    constructor(
        public readonly refreshTokens: OAuthDeletedRefreshTokenEvent[],
    ) {}
}
