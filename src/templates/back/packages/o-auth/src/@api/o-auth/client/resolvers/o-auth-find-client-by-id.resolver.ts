import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { OAuthFindClientByIdHandler } from '../handlers/o-auth-find-client-by-id.handler';
import { OAuthClient } from '@api/graphql';

@Resolver()
@Permissions('oAuth.client.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthFindClientByIdResolver
{
    constructor(
        private readonly handler: OAuthFindClientByIdHandler,
    ) {}

    @Query('oAuthFindClientById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthClient>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}