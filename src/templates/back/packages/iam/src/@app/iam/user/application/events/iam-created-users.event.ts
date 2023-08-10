import { IamCreatedUserEvent } from './iam-created-user.event';

export class IamCreatedUsersEvent
{
    constructor(
        public readonly users: IamCreatedUserEvent[],
    ) {}
}
