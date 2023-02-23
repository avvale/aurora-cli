import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthUpdateScopesHandler } from '../handlers/o-auth-update-scopes.handler';
import { OAuthScope, OAuthUpdateScopesInput } from '@api/graphql';

@Resolver()
@Permissions('oAuth.scope.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthUpdateScopesResolver
{
    constructor(
        private readonly handler: OAuthUpdateScopesHandler,
    ) {}

    @Mutation('oAuthUpdateScopes')
    async main(
        @Args('payload') payload: OAuthUpdateScopesInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthScope>
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