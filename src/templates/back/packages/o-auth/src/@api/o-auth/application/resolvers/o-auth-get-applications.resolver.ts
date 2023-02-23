import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { OAuthGetApplicationsHandler } from '../handlers/o-auth-get-applications.handler';
import { OAuthApplication } from '@api/graphql';

@Resolver()
@Permissions('oAuth.application.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthGetApplicationsResolver
{
    constructor(
        private readonly handler: OAuthGetApplicationsHandler,
    ) {}

    @Query('oAuthGetApplications')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthApplication[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}