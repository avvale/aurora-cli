import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { OAuthFindApplicationByIdHandler } from '../handlers/o-auth-find-application-by-id.handler';
import { OAuthApplication } from '@api/graphql';

@Resolver()
@Permissions('oAuth.application.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthFindApplicationByIdResolver
{
    constructor(
        private readonly handler: OAuthFindApplicationByIdHandler,
    ) {}

    @Query('oAuthFindApplicationById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthApplication>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}