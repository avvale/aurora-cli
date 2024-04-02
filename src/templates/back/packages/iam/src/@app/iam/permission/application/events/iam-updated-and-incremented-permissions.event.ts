import { IamUpdatedAndIncrementedPermissionEvent } from './iam-updated-and-incremented-permission.event';

export class IamUpdatedAndIncrementedPermissionsEvent
{
    constructor(
        public readonly permissions: IamUpdatedAndIncrementedPermissionEvent[],
    ) {}
}
