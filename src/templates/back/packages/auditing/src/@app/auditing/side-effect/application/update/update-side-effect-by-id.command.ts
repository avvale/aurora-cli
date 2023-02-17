import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';

export class UpdateSideEffectByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
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
            tags?: any;
            isRollback?: boolean;
            rollbackSideEffectId?: string;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}