import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthGetClientsHandler } from '../handlers/o-auth-get-clients.handler';
import { OAuthClient } from '../../../../graphql';

@Resolver()
export class OAuthGetClientsResolver
{
    constructor(
        private readonly handler: OAuthGetClientsHandler,
    ) {}

    @Query('oAuthGetClients')
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