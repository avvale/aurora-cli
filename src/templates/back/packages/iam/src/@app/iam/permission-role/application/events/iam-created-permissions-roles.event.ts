import { IamCreatedPermissionRoleEvent } from '@app/iam/permission-role';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreatedPermissionsRolesEvent {
    constructor(
        public readonly event: {
            payload: IamCreatedPermissionRoleEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
