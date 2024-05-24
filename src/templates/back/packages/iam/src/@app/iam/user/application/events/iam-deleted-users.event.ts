import { IamDeletedUserEvent } from '@app/iam/user';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamDeletedUsersEvent
{
    constructor(
        public readonly event: {
            payload: IamDeletedUserEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
