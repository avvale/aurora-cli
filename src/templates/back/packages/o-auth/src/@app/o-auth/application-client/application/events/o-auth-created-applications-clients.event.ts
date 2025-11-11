import { OAuthCreatedApplicationClientEvent } from '@app/o-auth/application-client';
import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthCreatedApplicationsClientsEvent {
    constructor(
        public readonly event: {
            payload: OAuthCreatedApplicationClientEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
