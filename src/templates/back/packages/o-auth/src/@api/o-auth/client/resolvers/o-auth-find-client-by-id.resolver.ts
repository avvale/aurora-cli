import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthFindClientByIdHandler } from '../handlers/o-auth-find-client-by-id.handler';
import { OAuthClient } from '@api/graphql';

@Resolver()
@Auth('oAuth.client.get')
export class OAuthFindClientByIdResolver
{
    constructor(
        private readonly handler: OAuthFindClientByIdHandler,
    ) {}

    @Query('oAuthFindClientById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthClient>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}