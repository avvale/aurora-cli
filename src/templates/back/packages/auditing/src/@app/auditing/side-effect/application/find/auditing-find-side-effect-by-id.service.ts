import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { AuditingISideEffectRepository } from '../../domain/auditing-side-effect.repository';
import { AuditingSideEffect } from '../../domain/auditing-side-effect.aggregate';
import { AuditingSideEffectId } from '../../domain/value-objects';

@Injectable()
export class AuditingFindSideEffectByIdService
{
    constructor(
        private readonly repository: AuditingISideEffectRepository,
    ) {}

    async main(
        id: AuditingSideEffectId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AuditingSideEffect>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}
