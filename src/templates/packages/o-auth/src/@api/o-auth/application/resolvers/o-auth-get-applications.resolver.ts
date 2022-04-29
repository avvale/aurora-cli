import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthGetApplicationsHandler } from '../handlers/o-auth-get-applications.handler';
import { OAuthApplication } from '../../../../graphql';

@Resolver()
export class OAuthGetApplicationsResolver
{
    constructor(
        private readonly handler: OAuthGetApplicationsHandler,
    ) {}

    @Query('oAuthGetApplications')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthApplication[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}