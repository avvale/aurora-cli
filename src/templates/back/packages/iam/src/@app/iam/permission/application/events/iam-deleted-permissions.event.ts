import { IamDeletedPermissionEvent } from '@app/iam/permission';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamDeletedPermissionsEvent
{
    constructor(
        public readonly event: {
            payload: IamDeletedPermissionEvent[];
            cQMetadata?: CQMetadata;
        },
    ) {}
}
