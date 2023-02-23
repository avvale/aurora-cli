import { CQMetadata } from '@aurora-ts/core';

export class CreatePermissionsRolesCommand
{
    constructor(
        public readonly payload: {
            permissionId: string;
            roleId: string;
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}