import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedAndIncrementedPermissionRoleEvent
{
    constructor(
        public readonly event: {
            payload: {
                permissionId: string;
                roleId: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
