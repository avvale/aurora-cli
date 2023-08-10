import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthUpdateApplicationByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            code?: string;
            name?: string;
            secret?: string;
            isMaster?: boolean;
            clientIds?: string[];
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
