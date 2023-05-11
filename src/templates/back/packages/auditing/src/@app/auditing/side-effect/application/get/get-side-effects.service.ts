import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { ISideEffectRepository } from '../../domain/side-effect.repository';
import { AuditingSideEffect } from '../../domain/side-effect.aggregate';

@Injectable()
export class GetSideEffectsService
{
    constructor(
        private readonly repository: ISideEffectRepository,
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