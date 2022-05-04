import { DeletedPermissionEvent } from './deleted-permission.event';

export class DeletedPermissionsEvent
{
    constructor(
        public readonly permissions: DeletedPermissionEvent[],
    ) {}
}