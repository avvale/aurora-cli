import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class OAuthUpdateAndIncrementScopesCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            code?: string;
            name?: string;
            roleIds?: string[];
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
