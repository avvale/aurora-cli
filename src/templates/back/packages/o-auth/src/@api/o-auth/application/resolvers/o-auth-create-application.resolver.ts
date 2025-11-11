import { OAuthApplication, OAuthCreateApplicationInput } from '@api/graphql';
import { OAuthCreateApplicationHandler } from '@api/o-auth/application';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.application.create')
export class OAuthCreateApplicationResolver {
    constructor(private readonly handler: OAuthCreateApplicationHandler) {}

    @Mutation('oAuthCreateApplication')
    async main(
        @Args('payload') payload: OAuthCreateApplicationInput,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthApplication> {
        return await this.handler.main(payload, timezone, auditing);
    }
}
