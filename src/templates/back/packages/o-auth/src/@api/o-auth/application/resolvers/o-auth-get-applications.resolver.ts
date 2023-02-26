import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { Auth } from '@aurora/decorators';

// @app
import { OAuthGetApplicationsHandler } from '../handlers/o-auth-get-applications.handler';
import { OAuthApplication } from '@api/graphql';

@Resolver()
@Auth('oAuth.application.get')
export class OAuthGetApplicationsResolver
{
    constructor(
        private readonly handler: OAuthGetApplicationsHandler,
    ) {}

    @Query('oAuthGetApplications')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
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