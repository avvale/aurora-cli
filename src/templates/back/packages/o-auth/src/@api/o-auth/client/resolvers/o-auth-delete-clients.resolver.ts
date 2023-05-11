import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthDeleteClientsHandler } from '../handlers/o-auth-delete-clients.handler';
import { OAuthClient } from '@api/graphql';

@Resolver()
@Auth('oAuth.client.delete')
export class OAuthDeleteClientsResolver
{
    constructor(
        private readonly handler: OAuthDeleteClientsHandler,
    ) {}

    @Mutation('oAuthDeleteClients')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthClient[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}