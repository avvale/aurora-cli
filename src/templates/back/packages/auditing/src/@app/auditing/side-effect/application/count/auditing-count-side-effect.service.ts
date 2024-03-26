import { AuditingISideEffectRepository } from '@app/auditing/side-effect';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingCountSideEffectService
{
    constructor(
        private readonly repository: AuditingISideEffectRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<number>
    {
        return await this.repository.count(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}
