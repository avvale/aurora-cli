import {
    AuditingISideEffectRepository,
    AuditingSideEffect,
} from '@app/auditing/side-effect';
import { CQMetadata, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingPaginateSideEffectsService {
    constructor(private readonly repository: AuditingISideEffectRepository) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<AuditingSideEffect>> {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
