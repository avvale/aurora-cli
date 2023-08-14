import { IamDeletedPermissionEvent } from './iam-deleted-permission.event';

export class IamDeletedPermissionsEvent
{
    constructor(
        public readonly permissions: IamDeletedPermissionEvent[],
    ) {}
}
