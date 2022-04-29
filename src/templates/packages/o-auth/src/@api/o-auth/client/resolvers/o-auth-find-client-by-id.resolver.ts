import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthFindClientByIdHandler } from '../handlers/o-auth-find-client-by-id.handler';
import { OAuthClient } from '../../../../graphql';

@Resolver()
export class OAuthFindClientByIdResolver
{
    constructor(
        private readonly handler: OAuthFindClientByIdHandler,
    ) {}

    @Query('oAuthFindClientById')
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