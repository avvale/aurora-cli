import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class OAuthUpdateApplicationsClientsCommand
{
    constructor(
        public readonly payload: {
            applicationId?: string;
            clientId?: string;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
