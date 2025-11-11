import { IamCreatedAccountEvent } from '@app/iam/account';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreatedAccountsEvent {
    constructor(
        public readonly event: {
            payload: IamCreatedAccountEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
