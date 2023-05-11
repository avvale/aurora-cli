import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { ISideEffectRepository } from '../../domain/side-effect.repository';
import { AuditingSideEffect } from '../../domain/side-effect.aggregate';

@Injectable()
export class PaginateSideEffectsService
{
    constructor(
        private readonly repository: ISideEffectRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<AuditingSideEffect>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}