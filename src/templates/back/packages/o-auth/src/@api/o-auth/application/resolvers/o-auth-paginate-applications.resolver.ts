import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthPaginateApplicationsHandler } from '../handlers/o-auth-paginate-applications.handler';
import { Pagination } from '@api/graphql';

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