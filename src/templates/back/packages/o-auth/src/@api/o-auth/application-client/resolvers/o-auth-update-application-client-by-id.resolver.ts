import { OAuthApplicationClient, OAuthUpdateApplicationClientByIdInput } from '@api/graphql';
import { OAuthUpdateApplicationClientByIdHandler } from '@api/o-auth/application-client';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.applicationClient.update')
export class OAuthUpdateApplicationClientByIdResolver
{
    constructor(
        private readonly handler: OAuthUpdateApplicationClientByIdHandler,
    ) {}

    @Mutation('oAuthUpdateApplicationClientById')
    async main(
        @Args('payload') payload: OAuthUpdateApplicationClientByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthApplicationClient>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}
