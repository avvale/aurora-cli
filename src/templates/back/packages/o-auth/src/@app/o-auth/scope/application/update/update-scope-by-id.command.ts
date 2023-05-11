import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class UpdateScopeByIdCommand
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