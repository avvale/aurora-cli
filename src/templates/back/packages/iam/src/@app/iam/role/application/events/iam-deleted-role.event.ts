import { CQMetadata } from '@aurorajs.dev/core';

export class IamDeletedRoleEvent {
    constructor(
        public readonly event: {
            payload: {
                id: string;
                rowId: number;
                name: string;
                defaultRedirection: string;
                hasHiddenVerticalNavigation: boolean;
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
