import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class UpdatePermissionsCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            name?: string;
            boundedContextId?: string;
            roleIds?: string[];
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}