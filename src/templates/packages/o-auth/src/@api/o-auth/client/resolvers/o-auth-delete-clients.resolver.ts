import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthDeleteClientsHandler } from '../handlers/o-auth-delete-clients.handler';
import { OAuthClient } from '../../../../graphql';

@Resolver()
export class OAuthDeleteClientsResolver
{
    constructor(
        private readonly handler: OAuthDeleteClientsHandler,
    ) {}

    @Mutation('oAuthDeleteClients')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthClient[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}