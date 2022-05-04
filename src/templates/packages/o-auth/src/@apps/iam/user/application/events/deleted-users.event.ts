import { DeletedUserEvent } from './deleted-user.event';

export class DeletedUsersEvent
{
    constructor(
        public readonly users: DeletedUserEvent[],
    ) {}
}