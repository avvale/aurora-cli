import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthenticationGuard, AuthorizationGuard, Permissions, QueryStatement, Timezone } from '@aurora-ts/core';

// @app
import { IamGetBoundedContextsHandler } from '../handlers/iam-get-bounded-contexts.handler';
import { IamBoundedContext } from '@api/graphql';

@Resolver()
@Permissions('iam.boundedContext.get')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
export class IamGetBoundedContextsResolver
{
    constructor(
        private readonly handler: IamGetBoundedContextsHandler,
    ) {}

    @Query('iamGetBoundedContexts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamBoundedContext[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}