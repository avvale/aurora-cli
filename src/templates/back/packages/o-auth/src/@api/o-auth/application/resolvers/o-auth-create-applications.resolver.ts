import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthCreateApplicationsHandler } from '../handlers/o-auth-create-applications.handler';
import { OAuthCreateApplicationInput } from '@api/graphql';

@Resolver()
@Permissions('oAuth.application.create')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthCreateApplicationsResolver
{
    constructor(
        private readonly handler: OAuthCreateApplicationsHandler,
    ) {}

    @Mutation('oAuthCreateApplications')
    async main(
        @Args('payload') payload: OAuthCreateApplicationInput[],
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
            auditing,
        );
    }
}