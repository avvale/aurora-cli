import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthPaginateApplicationsHandler } from '../handlers/o-auth-paginate-applications.handler';
import { Pagination } from '../../../../graphql';

@Resolver()
export class OAuthPaginateApplicationsResolver
{
    constructor(
        private readonly handler: OAuthPaginateApplicationsHandler,
    ) {}

    @Query('oAuthPaginateApplications')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
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