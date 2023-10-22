import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class AuditingDeleteSideEffectByIdCommand
{
    constructor(
        public readonly id: string,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
