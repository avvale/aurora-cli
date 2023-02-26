import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthFindClientHandler } from '../handlers/o-auth-find-client.handler';
import { OAuthClient } from '@api/graphql';

@Resolver()
@Auth('oAuth.client.get')
export class OAuthFindClientResolver
{
    constructor(
        private readonly handler: OAuthFindClientHandler,
    ) {}

    @Query('oAuthFindClient')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthClient>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}