import { DeletedAccountEvent } from './deleted-account.event';

export class DeletedAccountsEvent
{
    constructor(
        public readonly accounts: DeletedAccountEvent[],
    ) {}
}