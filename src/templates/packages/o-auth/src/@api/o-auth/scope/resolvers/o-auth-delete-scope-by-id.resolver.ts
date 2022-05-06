import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '../../../../@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthDeleteScopeByIdHandler } from '../handlers/o-auth-delete-scope-by-id.handler';
import { OAuthScope } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.scope.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthDeleteScopeByIdResolver
{
    constructor(
        private readonly handler: OAuthDeleteScopeByIdHandler,
    ) {}

    @Mutation('oAuthDeleteScopeById')
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