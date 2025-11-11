import { Pagination } from '@api/graphql';
import { OAuthPaginateClientsHandler } from '@api/o-auth/client';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.client.get')
export class OAuthPaginateClientsResolver {
    constructor(private readonly handler: OAuthPaginateClientsHandler) {}

    @Query('oAuthPaginateClients')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
