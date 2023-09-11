import { OAuthApplicationClient } from '@api/graphql';
import { OAuthFindApplicationClientByIdHandler } from '@api/o-auth/application-client';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.applicationClient.get')
export class OAuthFindApplicationClientByIdResolver
{
    constructor(
        private readonly handler: OAuthFindApplicationClientByIdHandler,
    ) {}

    @Query('oAuthFindApplicationClientById')
    async main(
        @Args('applicationId') applicationId: string,
        @Args('clientId') clientId: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthApplicationClient>
    {
        return await this.handler.main(
            applicationId,
            clientId,
            constraint,
            timezone,
        );
    }
}
