import { CQMetadata } from '@aurorajs.dev/core';

export class IamUpdatedRoleEvent
{
    constructor(
        public readonly event: {
            payload: {
                id: string;
                name: string;
                isMaster: boolean;
                permissionIds: string[];
                accountIds: string[];
                createdAt: string;
                updatedAt: string;
                deletedAt: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
