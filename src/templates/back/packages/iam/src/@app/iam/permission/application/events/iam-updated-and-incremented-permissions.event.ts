import { IamUpdatedAndIncrementedPermissionEvent } from '@app/iam/permission';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedAndIncrementedPermissionsEvent
{
    constructor(
        public readonly event: {
            payload: IamUpdatedAndIncrementedPermissionEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
