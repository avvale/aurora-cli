import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { AuditingISideEffectRepository } from '../../domain/auditing-side-effect.repository';
import { AuditingSideEffect } from '../../domain/auditing-side-effect.aggregate';

@Injectable()
export class AuditingRawSQLSideEffectsService
{
    constructor(
        private readonly repository: AuditingISideEffectRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<AuditingSideEffect[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
