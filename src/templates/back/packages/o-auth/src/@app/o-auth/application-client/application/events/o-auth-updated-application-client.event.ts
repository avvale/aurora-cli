import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthUpdatedApplicationClientEvent {
    constructor(
        public readonly event: {
            payload: {
                applicationId: string;
                clientId: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
