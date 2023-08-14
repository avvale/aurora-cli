import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class CommonUpdateResourcesCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            code?: string;
            name?: string;
            isActive?: boolean;
            hasAttachments?: boolean;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
