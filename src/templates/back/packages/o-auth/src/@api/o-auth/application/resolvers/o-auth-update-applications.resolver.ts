import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthUpdateApplicationsHandler } from '../handlers/o-auth-update-applications.handler';
import { OAuthApplication, OAuthUpdateApplicationsInput } from '@api/graphql';

@Resolver()
@Auth('oAuth.application.update')
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