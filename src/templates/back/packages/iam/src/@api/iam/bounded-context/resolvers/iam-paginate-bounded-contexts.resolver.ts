import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamPaginateBoundedContextsHandler } from '../handlers/iam-paginate-bounded-contexts.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Permissions('iam.boundedContext.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamPaginateBoundedContextsResolver
{
    constructor(
        private readonly handler: IamPaginateBoundedContextsHandler,
    ) {}

    @Query('iamPaginateBoundedContexts')
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