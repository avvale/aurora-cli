import { IamUpdatedAndIncrementedUserEvent } from './iam-updated-and-incremented-user.event';

export class IamUpdatedAndIncrementedUsersEvent
{
    constructor(
        public readonly users: IamUpdatedAndIncrementedUserEvent[],
    ) {}
}
