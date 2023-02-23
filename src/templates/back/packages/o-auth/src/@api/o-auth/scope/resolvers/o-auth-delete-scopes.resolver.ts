import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthDeleteScopesHandler } from '../handlers/o-auth-delete-scopes.handler';
import { OAuthScope } from '@api/graphql';

@Resolver()
@Permissions('oAuth.scope.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthDeleteScopesResolver
{
    constructor(
        private readonly handler: OAuthDeleteScopesHandler,
    ) {}

    @Mutation('oAuthDeleteScopes')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthScope[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}