import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthUpsertApplicationHandler } from '../handlers/o-auth-upsert-application.handler';
import { OAuthApplication, OAuthUpdateApplicationByIdInput } from '@api/graphql';

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