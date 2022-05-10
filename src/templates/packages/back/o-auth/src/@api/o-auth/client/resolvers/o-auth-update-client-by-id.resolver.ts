import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthUpdateClientByIdHandler } from '../handlers/o-auth-update-client-by-id.handler';
import { OAuthClient, OAuthUpdateClientByIdInput } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.client.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpdateClientByIdResolver
{
    constructor(
        private readonly handler: OAuthUpdateClientByIdHandler,
    ) {}

    @Mutation('oAuthUpdateClientById')
    async main(
        @Args('payload') payload: OAuthUpdateClientByIdInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthClient>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}