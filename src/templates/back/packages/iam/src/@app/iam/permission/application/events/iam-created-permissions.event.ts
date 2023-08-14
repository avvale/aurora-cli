import { IamCreatedPermissionEvent } from './iam-created-permission.event';

export class IamCreatedPermissionsEvent
{
    constructor(
        public readonly permissions: IamCreatedPermissionEvent[],
    ) {}
}
