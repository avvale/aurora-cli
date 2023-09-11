import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class OAuthUpdateScopeByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            code?: string;
            name?: string;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
