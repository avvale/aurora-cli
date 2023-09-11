import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class OAuthUpdateApplicationsCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            code?: string;
            name?: string;
            secret?: string;
            isMaster?: boolean;
            clientIds?: string[];
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
