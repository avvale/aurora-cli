import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthCreateClientHandler } from '../handlers/o-auth-create-client.handler';
import { OAuthClient, OAuthCreateClientInput } from '@api/graphql';

@Resolver()
@Auth('oAuth.client.create')
export class OAuthCreateClientResolver
{
    constructor(
        private readonly handler: OAuthCreateClientHandler,
    ) {}

    @Mutation('oAuthCreateClient')
    async main(
        @Args('payload') payload: OAuthCreateClientInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthClient>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}