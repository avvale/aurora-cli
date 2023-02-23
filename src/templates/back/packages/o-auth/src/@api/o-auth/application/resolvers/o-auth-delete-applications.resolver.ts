import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// auditing
import { Auditing } from '@api/auditing/shared/decorators/auditing.decorator';
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { OAuthDeleteApplicationsHandler } from '../handlers/o-auth-delete-applications.handler';
import { OAuthApplication } from '@api/graphql';

@Resolver()
@Permissions('oAuth.application.delete')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class OAuthDeleteApplicationsResolver
{
    constructor(
        private readonly handler: OAuthDeleteApplicationsHandler,
    ) {}

    @Mutation('oAuthDeleteApplications')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthApplication[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}