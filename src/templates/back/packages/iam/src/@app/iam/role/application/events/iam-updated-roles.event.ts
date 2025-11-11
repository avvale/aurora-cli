import { IamUpdatedRoleEvent } from '@app/iam/role';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedRolesEvent {
    constructor(
        public readonly event: {
            payload: IamUpdatedRoleEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
