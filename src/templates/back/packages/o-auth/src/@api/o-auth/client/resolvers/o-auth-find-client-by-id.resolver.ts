import { OAuthClient } from '@api/graphql';
import { OAuthFindClientByIdHandler } from '@api/o-auth/client';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.client.get')
export class OAuthFindClientByIdResolver {
    constructor(private readonly handler: OAuthFindClientByIdHandler) {}

    @Query('oAuthFindClientById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthClient> {
        return await this.handler.main(id, constraint, timezone);
    }
}
