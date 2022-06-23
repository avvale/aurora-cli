import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthGetScopesHandler } from '../handlers/o-auth-get-scopes.handler';
import { OAuthScope } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.scope.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthGetScopesResolver
{
    constructor(
        private readonly handler: OAuthGetScopesHandler,
    ) {}

    @Query('oAuthGetScopes')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthScope[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}