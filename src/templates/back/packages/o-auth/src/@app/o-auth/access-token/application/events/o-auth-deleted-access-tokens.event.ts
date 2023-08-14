import { OAuthDeletedAccessTokenEvent } from './o-auth-deleted-access-token.event';

export class OAuthDeletedAccessTokensEvent
{
    constructor(
        public readonly accessTokens: OAuthDeletedAccessTokenEvent[],
    ) {}
}
