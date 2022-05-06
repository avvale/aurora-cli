import { CreatedRoleEvent } from './created-role.event';

export class CreatedRolesEvent
{
    constructor(
        public readonly roles: CreatedRoleEvent[],
    ) {}
}