import { OAuthApplication } from '@api/graphql';
import { OAuthDeleteApplicationsHandler } from '@api/o-auth/application';
import { Auth } from '@aurora/decorators';
import {
    Auditing,
    AuditingMeta,
    QueryStatement,
    Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.application.delete')
export class OAuthDeleteApplicationsResolver {
    constructor(private readonly handler: OAuthDeleteApplicationsHandler) {}

    @Mutation('oAuthDeleteApplications')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthApplication[]> {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            auditing,
        );
    }
}
