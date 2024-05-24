import { IamUpdatedAndIncrementedUserEvent } from '@app/iam/user';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedAndIncrementedUsersEvent
{
    constructor(
        public readonly event: {
            payload: IamUpdatedAndIncrementedUserEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
