import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthPaginateClientsHandler } from '../handlers/o-auth-paginate-clients.handler';
import { Pagination } from '../../../../graphql';

@Resolver()
export class OAuthPaginateClientsResolver
{
    constructor(
        private readonly handler: OAuthPaginateClientsHandler,
    ) {}

    @Query('oAuthPaginateClients')
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