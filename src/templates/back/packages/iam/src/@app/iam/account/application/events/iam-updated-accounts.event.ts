import { IamUpdatedAccountEvent } from '@app/iam/account';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedAccountsEvent {
    constructor(
        public readonly event: {
            payload: IamUpdatedAccountEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
