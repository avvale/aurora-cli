import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthCreateApplicationsHandler } from '../handlers/o-auth-create-applications.handler';
import { OAuthCreateApplicationInput } from '@api/graphql';

@Resolver()
@Auth('oAuth.application.create')
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