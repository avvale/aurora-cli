import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class IamUpdateTagByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name?: string;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
