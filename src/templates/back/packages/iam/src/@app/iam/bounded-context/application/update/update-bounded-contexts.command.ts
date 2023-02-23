import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';

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