import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class UpdateQueueByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            prefix?: string;
            name?: string;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}