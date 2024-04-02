import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class IamUpdateAndIncrementPermissionsRolesCommand
{
    constructor(
        public readonly payload: {
            permissionId?: string;
            roleId?: string;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
