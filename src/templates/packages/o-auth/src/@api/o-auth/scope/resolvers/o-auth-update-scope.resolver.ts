import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthUpdateScopeHandler } from '../handlers/o-auth-update-scope.handler';
import { OAuthScope, OAuthUpdateScopeInput } from '../../../../graphql';

@Resolver()
export class OAuthUpdateScopeResolver
{
    constructor(
        private readonly handler: OAuthUpdateScopeHandler,
    ) {}

    @Mutation('oAuthUpdateScope')
    async main(
        @Args('payload') payload: OAuthUpdateScopeInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthScope>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}