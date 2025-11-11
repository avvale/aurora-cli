import { OAuthDeletedAccessTokenEvent } from '@app/o-auth/access-token';
import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthDeletedAccessTokensEvent {
    constructor(
        public readonly event: {
            payload: OAuthDeletedAccessTokenEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
