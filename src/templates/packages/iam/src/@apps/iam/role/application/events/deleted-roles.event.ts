import { DeletedRoleEvent } from './deleted-role.event';

export class DeletedRolesEvent
{
    constructor(
        public readonly roles: DeletedRoleEvent[],
    ) {}
}