import { OAuthClient, OAuthUpdateClientsInput } from '@api/graphql';
import { OAuthUpdateClientsHandler } from '@api/o-auth/client';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

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
