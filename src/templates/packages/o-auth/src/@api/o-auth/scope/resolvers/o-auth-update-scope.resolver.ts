import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '../../../../@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthUpdateScopeHandler } from '../handlers/o-auth-update-scope.handler';
import { OAuthScope, OAuthUpdateScopeInput } from '../../../../../graphql';

@Resolver()
@Permissions('oAuth.scope.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
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