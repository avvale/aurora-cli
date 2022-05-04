import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthFindScopeByIdHandler } from '../handlers/o-auth-find-scope-by-id.handler';
import { OAuthScope } from '../../../../graphql';

@Resolver()
export class OAuthFindScopeByIdResolver
{
    constructor(
        private readonly handler: OAuthFindScopeByIdHandler,
    ) {}

    @Query('oAuthFindScopeById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthScope>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}