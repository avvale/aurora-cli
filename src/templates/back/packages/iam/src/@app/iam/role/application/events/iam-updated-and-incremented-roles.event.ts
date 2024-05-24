import { IamUpdatedAndIncrementedRoleEvent } from '@app/iam/role';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedAndIncrementedRolesEvent
{
    constructor(
        public readonly event: {
            payload: IamUpdatedAndIncrementedRoleEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
