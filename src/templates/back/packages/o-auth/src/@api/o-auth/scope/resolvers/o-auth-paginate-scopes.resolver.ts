import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthPaginateScopesHandler } from '../handlers/o-auth-paginate-scopes.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Auth('oAuth.scope.get')
export class OAuthPaginateScopesResolver
{
    constructor(
        private readonly handler: OAuthPaginateScopesHandler,
    ) {}

    @Query('oAuthPaginateScopes')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
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