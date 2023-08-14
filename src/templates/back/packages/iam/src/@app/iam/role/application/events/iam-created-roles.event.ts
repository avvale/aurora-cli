import { IamCreatedRoleEvent } from './iam-created-role.event';

export class IamCreatedRolesEvent
{
    constructor(
        public readonly roles: IamCreatedRoleEvent[],
    ) {}
}
