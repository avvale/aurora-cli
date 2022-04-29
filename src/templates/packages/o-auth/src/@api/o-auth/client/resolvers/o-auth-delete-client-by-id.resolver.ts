import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthDeleteClientByIdHandler } from '../handlers/o-auth-delete-client-by-id.handler';
import { OAuthClient } from '../../../../graphql';

@Resolver()
export class OAuthDeleteClientByIdResolver
{
    constructor(
        private readonly handler: OAuthDeleteClientByIdHandler,
    ) {}

    @Mutation('oAuthDeleteClientById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthClient>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}