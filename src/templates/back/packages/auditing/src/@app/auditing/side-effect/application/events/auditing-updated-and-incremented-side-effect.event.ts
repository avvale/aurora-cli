export class AuditingUpdatedAndIncrementedSideEffectEvent
{
    constructor(
        public readonly id: string,
        public readonly tags: string[],
        public readonly modelPath: string,
        public readonly modelName: string,
        public readonly operationId: string,
        public readonly operationSort: number,
        public readonly accountId: string,
        public readonly email: string,
        public readonly event: string,
        public readonly auditableId: string,
        public readonly oldValue: any,
        public readonly newValue: any,
        public readonly ip: string,
        public readonly method: string,
        public readonly baseUrl: string,
        public readonly params: any,
        public readonly query: any,
        public readonly body: any,
        public readonly userAgent: string,
        public readonly isRollback: boolean,
        public readonly rollbackSideEffectId: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
