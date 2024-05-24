import { IamCreatedRoleEvent } from '@app/iam/role';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreatedRolesEvent
{
    constructor(
        public readonly event: {
            payload: IamCreatedRoleEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
