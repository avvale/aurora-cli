import { UpdatedAccountEvent } from './updated-account.event';

export class UpdatedAccountsEvent
{
    constructor(
        public readonly accounts: UpdatedAccountEvent[],
    ) {}
}