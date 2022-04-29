import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamFindBoundedContextHandler } from '../handlers/iam-find-bounded-context.handler';
import { IamBoundedContext } from '../../../../graphql';

@Resolver()
export class IamFindBoundedContextResolver
{
    constructor(
        private readonly handler: IamFindBoundedContextHandler,
    ) {}

    @Query('iamFindBoundedContext')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
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