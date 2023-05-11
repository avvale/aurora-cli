import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthFindAccessTokenHandler } from '../handlers/o-auth-find-access-token.handler';
import { OAuthAccessToken } from '@api/graphql';

@Resolver()
@Auth('oAuth.accessToken.get')
export class OAuthFindAccessTokenResolver
{
    constructor(
        private readonly handler: OAuthFindAccessTokenHandler,
    ) {}

    @Query('oAuthFindAccessToken')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthAccessToken>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}