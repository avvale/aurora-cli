import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthPaginateScopesHandler } from '../handlers/o-auth-paginate-scopes.handler';
import { Pagination } from '../../../../graphql';

@Resolver()
export class OAuthPaginateScopesResolver
{
    constructor(
        private readonly handler: OAuthPaginateScopesHandler,
    ) {}

    @Query('oAuthPaginateScopes')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}