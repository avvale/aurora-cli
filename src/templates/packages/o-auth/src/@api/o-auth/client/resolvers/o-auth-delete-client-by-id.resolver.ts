import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthDeleteClientByIdHandler } from '../handlers/o-auth-delete-client-by-id.handler';
import { OAuthClient } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.client.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthDeleteClientByIdResolver
{
    constructor(
        private readonly handler: OAuthDeleteClientByIdHandler,
    ) {}

    @Mutation('oAuthDeleteClientById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthClient>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}