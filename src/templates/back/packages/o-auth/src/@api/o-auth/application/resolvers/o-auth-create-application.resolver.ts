import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthCreateApplicationHandler } from '../handlers/o-auth-create-application.handler';
import { OAuthApplication, OAuthCreateApplicationInput } from '@api/graphql';

@Resolver()
@Permissions('oAuth.application.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthCreateApplicationResolver
{
    constructor(
        private readonly handler: OAuthCreateApplicationHandler,
    ) {}

    @Mutation('oAuthCreateApplication')
    async main(
        @Args('payload') payload: OAuthCreateApplicationInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthApplication>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}