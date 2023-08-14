import { IamDeletedAccountEvent } from './iam-deleted-account.event';

export class IamDeletedAccountsEvent
{
    constructor(
        public readonly accounts: IamDeletedAccountEvent[],
    ) {}
}
