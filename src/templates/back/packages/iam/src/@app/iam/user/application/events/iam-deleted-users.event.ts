import { IamDeletedUserEvent } from './iam-deleted-user.event';

export class IamDeletedUsersEvent
{
    constructor(
        public readonly users: IamDeletedUserEvent[],
    ) {}
}
