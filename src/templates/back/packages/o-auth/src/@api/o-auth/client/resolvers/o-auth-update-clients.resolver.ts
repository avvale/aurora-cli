import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthUpdateClientsHandler } from '../handlers/o-auth-update-clients.handler';
import { OAuthClient, OAuthUpdateClientsInput } from '@api/graphql';

@Resolver()
@Auth('oAuth.client.update')
export class OAuthUpdateClientsResolver
{
    constructor(
        private readonly handler: OAuthUpdateClientsHandler,
    ) {}

    @Mutation('oAuthUpdateClients')
    async main(
        @Args('payload') payload: OAuthUpdateClientsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthClient>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}