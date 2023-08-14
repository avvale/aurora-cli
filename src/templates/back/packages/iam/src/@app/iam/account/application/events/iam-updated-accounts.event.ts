import { IamUpdatedAccountEvent } from './iam-updated-account.event';

export class IamUpdatedAccountsEvent
{
    constructor(
        public readonly accounts: IamUpdatedAccountEvent[],
    ) {}
}
