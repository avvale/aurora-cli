import { IamCreatedRoleAccountEvent } from '@app/iam/role-account';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreatedRolesAccountsEvent
{
    constructor(
        public readonly event: {
            payload: IamCreatedRoleAccountEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
