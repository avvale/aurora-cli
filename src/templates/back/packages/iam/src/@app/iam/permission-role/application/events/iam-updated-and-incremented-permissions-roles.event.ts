import { IamUpdatedAndIncrementedPermissionRoleEvent } from '@app/iam/permission-role';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedAndIncrementedPermissionsRolesEvent
{
    constructor(
        public readonly event: {
            payload: IamUpdatedAndIncrementedPermissionRoleEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
