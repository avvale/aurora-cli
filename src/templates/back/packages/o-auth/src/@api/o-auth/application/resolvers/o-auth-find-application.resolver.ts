import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthFindApplicationHandler } from '../handlers/o-auth-find-application.handler';
import { OAuthApplication } from '@api/graphql';

@Resolver()
@Auth('oAuth.application.get')
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