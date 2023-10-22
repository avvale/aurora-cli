import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { AuditingISideEffectRepository } from '../../domain/auditing-side-effect.repository';
import { AuditingSideEffect } from '../../domain/auditing-side-effect.aggregate';

@Injectable()
export class AuditingGetSideEffectsService
{
    constructor(
        private readonly repository: AuditingISideEffectRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AuditingSideEffect[]>
    {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
