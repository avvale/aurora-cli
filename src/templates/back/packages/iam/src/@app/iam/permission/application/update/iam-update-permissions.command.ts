import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class IamUpdatePermissionsCommand
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
