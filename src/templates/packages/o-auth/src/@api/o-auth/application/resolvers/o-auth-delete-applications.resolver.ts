import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthDeleteApplicationsHandler } from '../handlers/o-auth-delete-applications.handler';
import { OAuthApplication } from '../../../../graphql';

@Resolver()
export class OAuthDeleteApplicationsResolver
{
    constructor(
        private readonly handler: OAuthDeleteApplicationsHandler,
    ) {}

    @Mutation('oAuthDeleteApplications')
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