import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { OAuthFindApplicationHandler } from '../handlers/o-auth-find-application.handler';
import { OAuthApplication } from '@api/graphql';

@Resolver()
@Permissions('oAuth.application.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthFindApplicationResolver
{
    constructor(
        private readonly handler: OAuthFindApplicationHandler,
    ) {}

    @Query('oAuthFindApplication')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthApplication>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}