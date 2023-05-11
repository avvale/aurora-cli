import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class DeletePermissionsRolesCommand
{
    constructor(
        public readonly payload: {
            permissionId: string;
            roleId: string;
        } [],
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}