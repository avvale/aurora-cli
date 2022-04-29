import { CreatedPermissionEvent } from './created-permission.event';

export class CreatedPermissionsEvent
{
    constructor(
        public readonly permissions: CreatedPermissionEvent[],
    ) {}
}