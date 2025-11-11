import { IamUpdatedPermissionRoleEvent } from '@app/iam/permission-role';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedPermissionsRolesEvent {
    constructor(
        public readonly event: {
            payload: IamUpdatedPermissionRoleEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
