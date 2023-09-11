import { OAuthApplicationClient } from '@api/graphql';
import { OAuthDeleteApplicationClientByIdHandler } from '@api/o-auth/application-client';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.applicationClient.delete')
export class OAuthDeleteApplicationClientByIdResolver
{
    constructor(
        private readonly handler: OAuthDeleteApplicationClientByIdHandler,
    ) {}

    @Mutation('oAuthDeleteApplicationClientById')
    async main(
        @Args('applicationId') applicationId: string,
        @Args('clientId') clientId: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @Auditing() auditing?: AuditingMeta,
    ): Promise<OAuthApplicationClient>
    {
        return await this.handler.main(
            applicationId,
            clientId,
            constraint,
            timezone,
            auditing,
        );
    }
}
