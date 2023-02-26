import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthPaginateClientsHandler } from '../handlers/o-auth-paginate-clients.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Auth('oAuth.client.get')
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