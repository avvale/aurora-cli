import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedAndIncrementedPermissionEvent
{
    constructor(
        public readonly event: {
            payload: {
                id: string;
                name: string;
                boundedContextId: string;
                roleIds: string[];
                createdAt: string;
                updatedAt: string;
                deletedAt: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
