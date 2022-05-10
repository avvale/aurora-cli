import { UpdatedAccessTokenEvent } from './updated-access-token.event';

export class UpdatedAccessTokensEvent
{
    constructor(
        public readonly accessTokens: UpdatedAccessTokenEvent[],
    ) {}
}