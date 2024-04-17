import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class OAuthMaxApplicationQuery
{
    constructor(
        public readonly column: string,
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}