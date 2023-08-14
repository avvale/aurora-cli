import { IamCreatedAccountEvent } from './iam-created-account.event';

export class IamCreatedAccountsEvent
{
    constructor(
        public readonly accounts: IamCreatedAccountEvent[],
    ) {}
}
