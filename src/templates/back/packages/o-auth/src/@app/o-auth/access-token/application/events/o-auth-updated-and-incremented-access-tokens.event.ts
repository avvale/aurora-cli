import { OAuthUpdatedAndIncrementedAccessTokenEvent } from './o-auth-updated-and-incremented-access-token.event';

export class OAuthUpdatedAndIncrementedAccessTokensEvent
{
    constructor(
        public readonly accessTokens: OAuthUpdatedAndIncrementedAccessTokenEvent[],
    ) {}
}
