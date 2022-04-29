import { CreatedRefreshTokenEvent } from './created-refresh-token.event';

export class CreatedRefreshTokensEvent
{
    constructor(
        public readonly refreshTokens: CreatedRefreshTokenEvent[],
    ) {}
}