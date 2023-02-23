import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { OAuthGetClientsHandler } from '../handlers/o-auth-get-clients.handler';
import { OAuthClient } from '@api/graphql';

@Resolver()
@Permissions('oAuth.client.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
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