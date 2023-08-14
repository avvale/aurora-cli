import { IamDeletedRoleEvent } from './iam-deleted-role.event';

export class IamDeletedRolesEvent
{
    constructor(
        public readonly roles: IamDeletedRoleEvent[],
    ) {}
}
