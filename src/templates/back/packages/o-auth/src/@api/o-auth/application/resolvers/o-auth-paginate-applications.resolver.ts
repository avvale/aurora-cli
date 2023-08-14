import { Pagination } from '@api/graphql';
import { OAuthPaginateApplicationsHandler } from '@api/o-auth/application';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('oAuth.application.get')
export class OAuthPaginateApplicationsResolver
{
    constructor(
        private readonly handler: OAuthPaginateApplicationsHandler,
    ) {}

    @Query('oAuthPaginateApplications')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
