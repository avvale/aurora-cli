import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthFindScopeHandler } from '../handlers/o-auth-find-scope.handler';
import { OAuthScope } from '../../../../graphql';

@Resolver()
export class OAuthFindScopeResolver
{
    constructor(
        private readonly handler: OAuthFindScopeHandler,
    ) {}

    @Query('oAuthFindScope')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthScope>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}