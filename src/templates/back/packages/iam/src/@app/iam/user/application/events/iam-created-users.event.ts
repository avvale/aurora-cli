import { IamCreatedUserEvent } from '@app/iam/user';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreatedUsersEvent {
    constructor(
        public readonly event: {
            payload: IamCreatedUserEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
