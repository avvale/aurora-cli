import { CreatedAccountEvent } from './created-account.event';

export class CreatedAccountsEvent
{
    constructor(
        public readonly accounts: CreatedAccountEvent[],
    ) {}
}