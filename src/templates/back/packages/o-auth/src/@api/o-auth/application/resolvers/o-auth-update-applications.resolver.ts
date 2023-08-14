import { OAuthApplication, OAuthUpdateApplicationsInput } from '@api/graphql';
import { OAuthUpdateApplicationsHandler } from '@api/o-auth/application';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

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
