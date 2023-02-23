import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { OAuthPaginateClientsHandler } from '../handlers/o-auth-paginate-clients.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Permissions('oAuth.client.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthPaginateClientsResolver
{
    constructor(
        private readonly handler: OAuthPaginateClientsHandler,
    ) {}

    @Query('oAuthPaginateClients')
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