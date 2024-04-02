import { IamUpdatedAndIncrementedAccountEvent } from './iam-updated-and-incremented-account.event';

export class IamUpdatedAndIncrementedAccountsEvent
{
    constructor(
        public readonly accounts: IamUpdatedAndIncrementedAccountEvent[],
    ) {}
}
