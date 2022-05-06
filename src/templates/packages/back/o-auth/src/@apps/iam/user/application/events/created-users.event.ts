import { CreatedUserEvent } from './created-user.event';

export class CreatedUsersEvent
{
    constructor(
        public readonly users: CreatedUserEvent[],
    ) {}
}