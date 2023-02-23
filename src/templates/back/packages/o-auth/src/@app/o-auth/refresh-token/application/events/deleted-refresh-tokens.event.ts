import { DeletedRefreshTokenEvent } from './deleted-refresh-token.event';

export class DeletedRefreshTokensEvent
{
    constructor(
        public readonly refreshTokens: DeletedRefreshTokenEvent[],
    ) {}
}