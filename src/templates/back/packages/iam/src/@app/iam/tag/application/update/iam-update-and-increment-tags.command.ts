import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class IamUpdateAndIncrementTagsCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            name?: string;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
