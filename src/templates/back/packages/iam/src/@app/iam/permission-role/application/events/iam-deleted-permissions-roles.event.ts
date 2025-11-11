import { IamDeletedPermissionRoleEvent } from '@app/iam/permission-role';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamDeletedPermissionsRolesEvent {
    constructor(
        public readonly event: {
            payload: IamDeletedPermissionRoleEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
