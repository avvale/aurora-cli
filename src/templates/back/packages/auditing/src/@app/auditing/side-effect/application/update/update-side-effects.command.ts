import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class UpdateSideEffectsCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            tags?: any;
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
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}