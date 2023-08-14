import { IamUpdatedRoleEvent } from './iam-updated-role.event';

export class IamUpdatedRolesEvent
{
    constructor(
        public readonly roles: IamUpdatedRoleEvent[],
    ) {}
}
