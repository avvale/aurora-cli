import { OAuthApplication } from '@api/graphql';
import { OAuthFindApplicationHandler } from '@api/o-auth/application';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.application.get')
export class OAuthFindApplicationResolver {
    constructor(private readonly handler: OAuthFindApplicationHandler) {}

    @Query('oAuthFindApplication')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthApplication> {
        return await this.handler.main(queryStatement, constraint, timezone);
    }
}
