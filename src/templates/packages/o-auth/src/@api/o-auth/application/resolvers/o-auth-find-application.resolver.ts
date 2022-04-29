import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthFindApplicationHandler } from '../handlers/o-auth-find-application.handler';
import { OAuthApplication } from '../../../../graphql';

@Resolver()
export class OAuthFindApplicationResolver
{
    constructor(
        private readonly handler: OAuthFindApplicationHandler,
    ) {}

    @Query('oAuthFindApplication')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthApplication>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}