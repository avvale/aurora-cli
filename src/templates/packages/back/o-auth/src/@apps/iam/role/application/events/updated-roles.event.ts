import { UpdatedRoleEvent } from './updated-role.event';

export class UpdatedRolesEvent
{
    constructor(
        public readonly roles: UpdatedRoleEvent[],
    ) {}
}