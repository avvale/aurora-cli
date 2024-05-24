import { IamUpdatedAndIncrementedRoleAccountEvent } from '@app/iam/role-account';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedAndIncrementedRolesAccountsEvent
{
    constructor(
        public readonly event: {
            payload: IamUpdatedAndIncrementedRoleAccountEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
