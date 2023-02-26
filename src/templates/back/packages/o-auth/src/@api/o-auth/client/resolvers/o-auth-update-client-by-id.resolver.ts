import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthUpdateClientByIdHandler } from '../handlers/o-auth-update-client-by-id.handler';
import { OAuthClient, OAuthUpdateClientByIdInput } from '@api/graphql';

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