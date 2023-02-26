import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthCreateApplicationHandler } from '../handlers/o-auth-create-application.handler';
import { OAuthApplication, OAuthCreateApplicationInput } from '@api/graphql';

@Resolver()
@Auth('oAuth.application.create')
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