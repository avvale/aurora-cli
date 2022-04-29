import { DeletedAccessTokenEvent } from './deleted-access-token.event';

export class DeletedAccessTokensEvent
{
    constructor(
        public readonly accessTokens: DeletedAccessTokenEvent[],
    ) {}
}