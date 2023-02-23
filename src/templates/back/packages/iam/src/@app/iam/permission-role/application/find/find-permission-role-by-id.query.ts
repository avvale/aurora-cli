import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';

export class FindPermissionRoleByIdQuery
{
    constructor(
        public readonly permissionId: string,
        public readonly roleId: string,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}