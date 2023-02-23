import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { OAuthPaginateScopesHandler } from '../handlers/o-auth-paginate-scopes.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Permissions('oAuth.scope.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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