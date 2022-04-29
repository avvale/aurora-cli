import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IamGetBoundedContextsHandler } from '../handlers/iam-get-bounded-contexts.handler';
import { IamBoundedContext } from '../../../../graphql';

@Resolver()
export class IamGetBoundedContextsResolver
{
    constructor(
        private readonly handler: IamGetBoundedContextsHandler,
    ) {}

    @Query('iamGetBoundedContexts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
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