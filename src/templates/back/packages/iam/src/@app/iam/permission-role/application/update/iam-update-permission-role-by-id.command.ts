import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class IamUpdatePermissionRoleByIdCommand
{
    constructor(
        public readonly payload: {
            permissionId: string;
            roleId: string;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
