import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IScopeRepository } from '../../domain/scope.repository';
import { OAuthScope } from '../../domain/scope.aggregate';

@Injectable()
export class PaginateScopesService
{
    constructor(
        private readonly repository: IScopeRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<OAuthScope>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}