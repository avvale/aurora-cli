import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthDeleteApplicationsHandler } from '../handlers/o-auth-delete-applications.handler';
import { OAuthApplication } from '@api/graphql';

@Resolver()
@Auth('oAuth.application.delete')
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