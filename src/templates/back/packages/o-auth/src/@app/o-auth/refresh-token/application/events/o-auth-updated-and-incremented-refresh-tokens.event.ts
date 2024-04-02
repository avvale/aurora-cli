import { OAuthUpdatedAndIncrementedRefreshTokenEvent } from './o-auth-updated-and-incremented-refresh-token.event';

export class OAuthUpdatedAndIncrementedRefreshTokensEvent
{
    constructor(
        public readonly refreshTokens: OAuthUpdatedAndIncrementedRefreshTokenEvent[],
    ) {}
}
