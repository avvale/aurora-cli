import { OAuthCreatedApplicationEvent } from '@app/o-auth/application';
import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthCreatedApplicationsEvent {
    constructor(
        public readonly event: {
            payload: OAuthCreatedApplicationEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
