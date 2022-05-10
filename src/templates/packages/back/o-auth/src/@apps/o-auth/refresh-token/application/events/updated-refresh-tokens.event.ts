import { UpdatedRefreshTokenEvent } from './updated-refresh-token.event';

export class UpdatedRefreshTokensEvent
{
    constructor(
        public readonly refreshTokens: UpdatedRefreshTokenEvent[],
    ) {}
}