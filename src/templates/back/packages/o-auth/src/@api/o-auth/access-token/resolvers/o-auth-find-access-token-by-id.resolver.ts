import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthFindAccessTokenByIdHandler } from '../handlers/o-auth-find-access-token-by-id.handler';
import { OAuthAccessToken } from '@api/graphql';

@Resolver()
@Auth('oAuth.accessToken.get')
export class OAuthFindAccessTokenByIdResolver
{
    constructor(
        private readonly handler: OAuthFindAccessTokenByIdHandler,
    ) {}

    @Query('oAuthFindAccessTokenById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthAccessToken>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}