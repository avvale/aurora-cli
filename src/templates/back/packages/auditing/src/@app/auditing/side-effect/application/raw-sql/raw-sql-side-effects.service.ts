import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { ISideEffectRepository } from '../../domain/side-effect.repository';
import { AuditingSideEffect } from '../../domain/side-effect.aggregate';

@Injectable()
export class RawSQLSideEffectsService
{
    constructor(
        private readonly repository: ISideEffectRepository,
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