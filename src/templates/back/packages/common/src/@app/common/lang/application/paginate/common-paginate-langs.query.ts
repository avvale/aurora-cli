import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class CommonPaginateLangsQuery
{
    constructor(
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
