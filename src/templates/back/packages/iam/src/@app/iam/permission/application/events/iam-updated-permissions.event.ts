import { IamUpdatedPermissionEvent } from './iam-updated-permission.event';

export class IamUpdatedPermissionsEvent
{
    constructor(
        public readonly permissions: IamUpdatedPermissionEvent[],
    ) {}
}
