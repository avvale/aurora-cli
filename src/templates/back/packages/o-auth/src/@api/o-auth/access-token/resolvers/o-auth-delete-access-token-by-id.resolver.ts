import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthDeleteAccessTokenByIdHandler } from '../handlers/o-auth-delete-access-token-by-id.handler';
import { OAuthAccessToken } from '@api/graphql';

@Resolver()
@Auth('oAuth.accessToken.delete')
export class OAuthDeleteAccessTokenByIdResolver
{
    constructor(
        private readonly handler: OAuthDeleteAccessTokenByIdHandler,
    ) {}

    @Mutation('oAuthDeleteAccessTokenById')
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