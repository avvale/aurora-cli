import { IamUpdatedAndIncrementedAccountEvent } from '@app/iam/account';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedAndIncrementedAccountsEvent
{
    constructor(
        public readonly event: {
            payload: IamUpdatedAndIncrementedAccountEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
