import { IamUpdatedAndIncrementedRoleEvent } from './iam-updated-and-incremented-role.event';

export class IamUpdatedAndIncrementedRolesEvent
{
    constructor(
        public readonly roles: IamUpdatedAndIncrementedRoleEvent[],
    ) {}
}
