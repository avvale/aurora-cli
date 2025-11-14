import { CQMetadata } from '@aurorajs.dev/core';

export class AuditingUpdatedSideEffectEvent {
    constructor(
        public readonly event: {
            payload: {
                id: string;
                tags: string[];
                modelPath: string;
                modelName: string;
                operationId: string;
                operationSort: number;
                accountId: string;
                email: string;
                event: string;
                auditableId: string;
                oldValue: any;
                newValue: any;
                ip: string;
                method: string;
                baseUrl: string;
                params: any;
                query: any;
                body: any;
                userAgent: string;
                isRollback: boolean;
                rollbackSideEffectId: string;
                createdAt: string;
                updatedAt: string;
                deletedAt: string;
            };
            cQMetadata?: CQMetadata;
        },
    ) {}
}
