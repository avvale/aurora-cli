import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class AuditingUpdateSideEffectByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            tags?: string[];
            modelPath?: string;
            modelName?: string;
            operationId?: string;
            operationSort?: number;
            accountId?: string;
            email?: string;
            event?: string;
            auditableId?: string;
            oldValue?: any;
            newValue?: any;
            ip?: string;
            method?: string;
            baseUrl?: string;
            params?: any;
            query?: any;
            body?: any;
            userAgent?: string;
            isRollback?: boolean;
            rollbackSideEffectId?: string;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
