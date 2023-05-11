import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class UpdateBoundedContextsCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            name?: string;
            root?: string;
            sort?: number;
            isActive?: boolean;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}