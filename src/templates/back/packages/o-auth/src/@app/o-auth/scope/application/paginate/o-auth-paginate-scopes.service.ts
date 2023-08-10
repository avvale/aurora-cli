import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { OAuthIScopeRepository } from '../../domain/o-auth-scope.repository';
import { OAuthScope } from '../../domain/o-auth-scope.aggregate';

@Injectable()
export class OAuthPaginateScopesService
{
    constructor(
        private readonly repository: OAuthIScopeRepository,
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
