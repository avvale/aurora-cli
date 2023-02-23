import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthUpdateApplicationsHandler } from '../handlers/o-auth-update-applications.handler';
import { OAuthApplication, OAuthUpdateApplicationsInput } from '@api/graphql';

@Resolver()
@Permissions('oAuth.application.update')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthUpdateApplicationsResolver
{
    constructor(
        private readonly handler: OAuthUpdateApplicationsHandler,
    ) {}

    @Mutation('oAuthUpdateApplications')
    async main(
        @Args('payload') payload: OAuthUpdateApplicationsInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthApplication>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}