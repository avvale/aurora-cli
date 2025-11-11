import { IamDeletedAccountEvent } from '@app/iam/account';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamDeletedAccountsEvent {
    constructor(
        public readonly event: {
            payload: IamDeletedAccountEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
