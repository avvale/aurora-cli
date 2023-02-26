import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthGetClientsHandler } from '../handlers/o-auth-get-clients.handler';
import { OAuthClient } from '@api/graphql';

@Resolver()
@Auth('oAuth.client.get')
export class OAuthGetClientsResolver
{
    constructor(
        private readonly handler: OAuthGetClientsHandler,
    ) {}

    @Query('oAuthGetClients')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthClient[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}