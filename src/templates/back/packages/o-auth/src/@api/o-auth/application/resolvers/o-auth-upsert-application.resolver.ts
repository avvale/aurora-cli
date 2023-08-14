import { OAuthApplication, OAuthUpdateApplicationByIdInput } from '@api/graphql';
import { OAuthUpsertApplicationHandler } from '@api/o-auth/application';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.application.upsert')
export class OAuthUpsertApplicationResolver
{
    constructor(
        private readonly handler: OAuthUpsertApplicationHandler,
    ) {}

    @Mutation('oAuthUpsertApplication')
    async main(
        @Args('payload') payload: OAuthUpdateApplicationByIdInput,
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
