import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthFindAccessTokenByIdHandler } from '../handlers/o-auth-find-access-token-by-id.handler';
import { OAuthAccessToken } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.accessToken.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthFindAccessTokenByIdResolver
{
    constructor(
        private readonly handler: OAuthFindAccessTokenByIdHandler,
    ) {}

    @Query('oAuthFindAccessTokenById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthAccessToken>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}