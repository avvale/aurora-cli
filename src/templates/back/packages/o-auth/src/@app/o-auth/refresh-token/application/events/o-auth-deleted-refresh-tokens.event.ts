import { OAuthDeletedRefreshTokenEvent } from '@app/o-auth/refresh-token';
import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthDeletedRefreshTokensEvent {
    constructor(
        public readonly event: {
            payload: OAuthDeletedRefreshTokenEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
