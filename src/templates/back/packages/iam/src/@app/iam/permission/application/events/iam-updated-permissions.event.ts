import { IamUpdatedPermissionEvent } from '@app/iam/permission';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedPermissionsEvent
{
    constructor(
        public readonly event: {
            payload: IamUpdatedPermissionEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
