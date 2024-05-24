import { CQMetadata } from '@aurorajs.dev/core';

export class IamDeletedBoundedContextEvent
{
    constructor(
        public readonly event: {
            payload: {
                id: string;
                name: string;
                root: string;
                sort: number;
                isActive: boolean;
                createdAt: string;
                updatedAt: string;
                deletedAt: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
