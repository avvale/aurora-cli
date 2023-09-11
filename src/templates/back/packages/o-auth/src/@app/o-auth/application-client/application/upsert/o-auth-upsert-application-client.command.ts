import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthUpsertApplicationClientCommand
{
    constructor(
        public readonly payload: {
            applicationId: string;
            clientId: string;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
