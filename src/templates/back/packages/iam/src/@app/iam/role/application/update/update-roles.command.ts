import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class UpdateRolesCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            name?: string;
            isMaster?: boolean;
            permissionIds?: string[];
            accountIds?: string[];
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}