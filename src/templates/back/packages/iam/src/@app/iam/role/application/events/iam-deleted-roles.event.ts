import { IamDeletedRoleEvent } from '@app/iam/role';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamDeletedRolesEvent
{
    constructor(
        public readonly event: {
            payload: IamDeletedRoleEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
