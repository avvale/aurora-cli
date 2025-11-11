import { OAuthDeletedClientEvent } from '@app/o-auth/client';
import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthDeletedClientsEvent {
    constructor(
        public readonly event: {
            payload: OAuthDeletedClientEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
