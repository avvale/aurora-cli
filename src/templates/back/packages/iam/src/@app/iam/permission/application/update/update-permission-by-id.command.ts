import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class UpdatePermissionByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name?: string;
            boundedContextId?: string;
            roleIds?: string[];
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}