import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthFindClientHandler } from '../handlers/o-auth-find-client.handler';
import { OAuthClient } from '../../../../graphql';

@Resolver()
export class OAuthFindClientResolver
{
    constructor(
        private readonly handler: OAuthFindClientHandler,
    ) {}

    @Query('oAuthFindClient')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthClient>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}