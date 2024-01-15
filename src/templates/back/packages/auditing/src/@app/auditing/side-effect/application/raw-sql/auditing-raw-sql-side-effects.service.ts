import { AuditingISideEffectRepository, AuditingSideEffect } from '@app/auditing/side-effect';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
