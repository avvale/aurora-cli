import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamFindBoundedContextHandler } from '../handlers/iam-find-bounded-context.handler';
import { IamBoundedContext } from '@api/graphql';

@Resolver()
@Permissions('iam.boundedContext.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamFindBoundedContextResolver
{
    constructor(
        private readonly handler: IamFindBoundedContextHandler,
    ) {}

    @Query('iamFindBoundedContext')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamBoundedContext>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}