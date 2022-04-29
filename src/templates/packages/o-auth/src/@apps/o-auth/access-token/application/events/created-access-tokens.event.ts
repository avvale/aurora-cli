import { CreatedAccessTokenEvent } from './created-access-token.event';

export class CreatedAccessTokensEvent
{
    constructor(
        public readonly accessTokens: CreatedAccessTokenEvent[],
    ) {}
}