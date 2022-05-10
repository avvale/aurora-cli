import { UpdatedUserEvent } from './updated-user.event';

export class UpdatedUsersEvent
{
    constructor(
        public readonly users: UpdatedUserEvent[],
    ) {}
}