import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthUpdateApplicationByIdHandler } from '../handlers/o-auth-update-application-by-id.handler';
import { OAuthApplication, OAuthUpdateApplicationByIdInput } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.application.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpdateApplicationByIdResolver
{
    constructor(
        private readonly handler: OAuthUpdateApplicationByIdHandler,
    ) {}

    @Mutation('oAuthUpdateApplicationById')
    async main(
        @Args('payload') payload: OAuthUpdateApplicationByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthApplication>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}