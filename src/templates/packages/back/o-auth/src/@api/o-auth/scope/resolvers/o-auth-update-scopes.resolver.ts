import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthUpdateScopesHandler } from '../handlers/o-auth-update-scopes.handler';
import { OAuthScope, OAuthUpdateScopesInput } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.scope.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
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
    ): Promise<OAuthScope>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}