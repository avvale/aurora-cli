import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthFindApplicationByIdHandler } from '../handlers/o-auth-find-application-by-id.handler';
import { OAuthApplication } from '@api/graphql';

@Resolver()
@Auth('oAuth.application.get')
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