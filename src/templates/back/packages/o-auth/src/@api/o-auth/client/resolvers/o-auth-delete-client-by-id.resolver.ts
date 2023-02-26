import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthDeleteClientByIdHandler } from '../handlers/o-auth-delete-client-by-id.handler';
import { OAuthClient } from '@api/graphql';

@Resolver()
@Auth('oAuth.client.delete')
export class OAuthDeleteClientByIdResolver
{
    constructor(
        private readonly handler: OAuthDeleteClientByIdHandler,
    ) {}

    @Mutation('oAuthDeleteClientById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthClient>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            auditing,
        );
    }
}