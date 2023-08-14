import { IamUpdatedUserEvent } from './iam-updated-user.event';

export class IamUpdatedUsersEvent
{
    constructor(
        public readonly users: IamUpdatedUserEvent[],
    ) {}
}
