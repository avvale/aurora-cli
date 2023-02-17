import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurora-ts/core';
import { Pagination } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';
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