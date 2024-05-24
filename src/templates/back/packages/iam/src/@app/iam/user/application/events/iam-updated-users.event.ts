import { IamUpdatedUserEvent } from '@app/iam/user';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedUsersEvent
{
    constructor(
        public readonly event: {
            payload: IamUpdatedUserEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
