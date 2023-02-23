import { UpdatedPermissionEvent } from './updated-permission.event';

export class UpdatedPermissionsEvent
{
    constructor(
        public readonly permissions: UpdatedPermissionEvent[],
    ) {}
}