import { OAuthClient, OAuthUpdateClientByIdInput } from '@api/graphql';
import { OAuthUpdateClientByIdHandler } from '@api/o-auth/client';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.client.update')
export class OAuthUpdateClientByIdResolver
{
    constructor(
        private readonly handler: OAuthUpdateClientByIdHandler,
    ) {}

    @Mutation('oAuthUpdateClientById')
    async main(
        @Args('payload') payload: OAuthUpdateClientByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthClient>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
            auditing,
        );
    }
}
